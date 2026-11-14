import "server-only";
import { site } from "./data";

const API = "https://api.github.com";
const REVALIDATE = 3600; // seconds

export type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  topics?: string[];
  pushed_at: string;
};

export type GhProfile = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

export type Activity = {
  id: string;
  type: "push" | "pr" | "issue" | "create" | "star" | "fork" | "release" | "other";
  repo: string;
  url: string;
  label: string;
  date: string;
  external: boolean; // repo owned by someone else
};

export type ContribDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

export type Contributions = { total: number; days: ContribDay[] } | null;

export type GithubData =
  | {
      ok: true;
      profile: GhProfile;
      repos: Repo[];
      languages: { name: string; count: number }[];
      activity: Activity[];
      contributions: Contributions;
      fetchedAt: string;
    }
  | { ok: false; reason: "rate-limit" | "not-found" | "network" | "unknown"; message: string };

function headers(): HeadersInit {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "junaid-khan-portfolio",
  };
  const token = process.env.GITHUB_TOKEN; // server only
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

class GhError extends Error {
  constructor(public reason: "rate-limit" | "not-found" | "network" | "unknown", message: string) {
    super(message);
  }
}

async function gh<T>(path: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API}${path}`, { headers: headers(), next: { revalidate: REVALIDATE } });
  } catch {
    throw new GhError("network", "Could not reach the GitHub API.");
  }
  if (res.status === 404) throw new GhError("not-found", "GitHub user not found.");
  if (res.status === 403 || res.status === 429) {
    throw new GhError("rate-limit", "GitHub API rate limit reached. Please try again later.");
  }
  if (!res.ok) throw new GhError("unknown", `GitHub API responded with ${res.status}.`);
  return (await res.json()) as T;
}

type RawEvent = {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload: {
    action?: string;
    ref_type?: string;
    commits?: unknown[];
    size?: number;
    pull_request?: { html_url: string; title: string; merged?: boolean };
    issue?: { html_url: string; title: string };
    release?: { html_url: string; name: string | null; tag_name: string };
  };
};

function mapEvent(e: RawEvent, user: string): Activity | null {
  const repoUrl = `https://github.com/${e.repo.name}`;
  const external = e.repo.name.split("/")[0].toLowerCase() !== user.toLowerCase();
  const base = { id: e.id, repo: e.repo.name, date: e.created_at, external };
  switch (e.type) {
    case "PushEvent": {
      const n = e.payload.size ?? e.payload.commits?.length ?? 0;
      return { ...base, type: "push", url: repoUrl, label: n ? `Pushed ${n} commit${n === 1 ? "" : "s"}` : "Pushed commits" };
    }
    case "PullRequestEvent": {
      const pr = e.payload.pull_request;
      const verb = pr?.merged ? "Merged" : e.payload.action === "opened" ? "Opened" : "Updated";
      return { ...base, type: "pr", url: pr?.html_url ?? repoUrl, label: `${verb} pull request${pr?.title ? `: ${pr.title}` : ""}` };
    }
    case "IssuesEvent": {
      const i = e.payload.issue;
      return { ...base, type: "issue", url: i?.html_url ?? repoUrl, label: `${e.payload.action ?? "Updated"} issue${i?.title ? `: ${i.title}` : ""}` };
    }
    case "CreateEvent":
      return { ...base, type: "create", url: repoUrl, label: `Created ${e.payload.ref_type ?? "repository"}` };
    case "WatchEvent":
      return { ...base, type: "star", url: repoUrl, label: "Starred a repository" };
    case "ForkEvent":
      return { ...base, type: "fork", url: repoUrl, label: "Forked a repository" };
    case "ReleaseEvent": {
      const r = e.payload.release;
      return { ...base, type: "release", url: r?.html_url ?? repoUrl, label: `Published release ${r?.name || r?.tag_name || ""}`.trim() };
    }
    default:
      return null;
  }
}

/** Contribution calendar needs GraphQL + a token. Returns null when unavailable (never fabricated). */
async function fetchContributions(user: string): Promise<Contributions> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;
  try {
    const res = await fetch(`${API}/graphql`, {
      method: "POST",
      headers: { ...headers(), "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{totalContributions weeks{contributionDays{date contributionCount contributionLevel}}}}}}`,
        variables: { login: user },
      }),
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as {
      data?: {
        user?: {
          contributionsCollection: {
            contributionCalendar: {
              totalContributions: number;
              weeks: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }[];
            };
          };
        };
      };
    };
    const cal = json.data?.user?.contributionsCollection.contributionCalendar;
    if (!cal) return null;
    const levels: Record<string, 0 | 1 | 2 | 3 | 4> = {
      NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4,
    };
    const days = cal.weeks.flatMap((w) =>
      w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount, level: levels[d.contributionLevel] ?? 0 })),
    );
    return { total: cal.totalContributions, days };
  } catch {
    return null;
  }
}

export async function getGithubData(): Promise<GithubData> {
  const user = site.githubUser;
  try {
    const [profile, rawRepos, rawEvents, contributions] = await Promise.all([
      gh<GhProfile>(`/users/${user}`),
      gh<Repo[]>(`/users/${user}/repos?per_page=100&sort=pushed&type=owner`),
      gh<RawEvent[]>(`/users/${user}/events/public?per_page=50`).catch(() => [] as RawEvent[]),
      fetchContributions(user),
    ]);

    const repos = rawRepos
      .filter((r) => !r.archived)
      .sort((a, b) => b.stargazers_count - a.stargazers_count || +new Date(b.pushed_at) - +new Date(a.pushed_at));

    const counts = new Map<string, number>();
    for (const r of repos) if (r.language && !r.fork) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
    const languages = [...counts.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);

    const activity = rawEvents.map((e) => mapEvent(e, user)).filter((a): a is Activity => a !== null).slice(0, 8);

    return { ok: true, profile, repos, languages, activity, contributions, fetchedAt: new Date().toISOString() };
  } catch (err) {
    if (err instanceof GhError) return { ok: false, reason: err.reason, message: err.message };
    return { ok: false, reason: "unknown", message: "Something went wrong loading GitHub data." };
  }
}
