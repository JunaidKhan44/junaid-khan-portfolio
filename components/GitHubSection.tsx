import Image from "next/image";
import { getGithubData, type Activity } from "@/lib/github";
import { site } from "@/lib/data";
import { RepoExplorer } from "./RepoExplorer";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

const fmt = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(iso));

const ICON: Record<Activity["type"], string> = {
  push: "⇡", pr: "⥂", issue: "!", create: "+", star: "★", fork: "⑂", release: "⚑", other: "•",
};

export function GitHubSkeleton() {
  return (
    <Section id="github" label="05 — Open source" title="Live from GitHub">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading GitHub data">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-36 rounded-2xl" />
        ))}
      </div>
    </Section>
  );
}

export async function GitHubSection() {
  const data = await getGithubData();

  if (!data.ok) {
    return (
      <Section id="github" label="05 — Open source" title="Live from GitHub">
        <div role="status" className="glass rounded-3xl p-8 text-center">
          <p className="font-display text-lg font-semibold">GitHub data is unavailable right now</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">{data.message} You can still browse everything directly on GitHub.</p>
          <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-6">
            Open github.com/{site.githubUser} →
          </a>
        </div>
      </Section>
    );
  }

  const { profile, repos, languages, activity, contributions } = data;
  const totalLang = languages.reduce((s, l) => s + l.count, 0);
  const external = activity.filter((a) => a.external && (a.type === "pr" || a.type === "issue" || a.type === "push"));
  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);

  return (
    <Section
      id="github"
      label="05 — Open source"
      title="Live from GitHub"
      intro="Pulled from the public GitHub API for @JunaidKhan44 and refreshed hourly. Nothing here is hand-edited."
    >
      <Reveal>
        <div className="glass flex flex-wrap items-center gap-6 rounded-3xl p-6">
          <Image src={profile.avatar_url} alt={`${profile.login} avatar`} width={72} height={72} className="rounded-full border border-line" />
          <div className="min-w-0 flex-1">
            <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="font-display text-xl font-semibold hover:text-accent">
              {profile.name ?? profile.login} <span className="font-mono text-sm text-muted">@{profile.login}</span>
            </a>
            {profile.bio ? <p className="mt-1 text-sm text-muted">{profile.bio}</p> : null}
          </div>
          <dl className="grid grid-cols-3 gap-6 text-center">
            {[
              ["Repos", profile.public_repos],
              ["Stars", totalStars],
              ["Followers", profile.followers],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col-reverse">
                <dt className="text-xs uppercase tracking-widest text-muted">{k}</dt>
                <dd className="font-display text-2xl font-semibold gradient-text">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>

      {languages.length > 0 ? (
        <Reveal delay={0.05}>
          <div className="mt-6">
            <p className="mb-2 text-xs uppercase tracking-widest text-muted">Languages across original repositories</p>
            <div className="flex h-2.5 overflow-hidden rounded-full bg-surface-2" role="img" aria-label={`Languages: ${languages.map((l) => `${l.name} ${l.count}`).join(", ")}`}>
              {languages.map((l, i) => (
                <span key={l.name} style={{ width: `${(l.count / totalLang) * 100}%`, opacity: 1 - i * 0.09 }} className="bg-gradient-to-r from-accent to-accent-2" />
              ))}
            </div>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
              {languages.map((l) => (
                <li key={l.name}>{l.name} · {l.count}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      ) : null}

      <div className="mt-10">
        <RepoExplorer repos={repos} />
      </div>

      {contributions ? (
        <Reveal>
          <div className="glass mt-10 rounded-3xl p-6">
            <p className="font-display text-lg font-semibold">{contributions.total.toLocaleString("en-GB")} contributions in the last year</p>
            <div className="mt-4 overflow-x-auto pb-2">
              <div className="grid grid-flow-col grid-rows-7 gap-[3px]" style={{ width: "max-content" }} role="img" aria-label="Contribution calendar for the last year">
                {contributions.days.map((d) => (
                  <span key={d.date} title={`${d.count} on ${d.date}`} className={`heat-${d.level} h-[11px] w-[11px] rounded-[3px]`} />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      ) : null}

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="glass h-full rounded-3xl p-6">
            <h3 className="font-display text-lg font-semibold">Recent public activity</h3>
            {activity.length === 0 ? (
              <p className="mt-3 text-sm text-muted">No recent public activity to display.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {activity.map((a) => (
                  <li key={a.id} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-surface-2 text-xs text-accent" aria-hidden="true">{ICON[a.type]}</span>
                    <a href={a.url} target="_blank" rel="noopener noreferrer" className="min-w-0 hover:text-accent">
                      <span className="block truncate">{a.label}</span>
                      <span className="block truncate font-mono text-xs text-muted">{a.repo} · {fmt(a.date)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="glass h-full rounded-3xl p-6">
            <h3 className="font-display text-lg font-semibold">Open-Source Contributions</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Contributed to <span className="text-fg">OpenNMS Lokahi</span> during my tenure at DataQ Health (Jan 2024 – Dec 2025), helping modernize OpenNMS Horizon through cloud-native engineering, microservices architecture, and distributed systems development.
            </p>
            <p className="mt-5 text-xs uppercase tracking-widest text-muted">Recent public activity in other people’s repositories</p>
            {external.length === 0 ? (
              <p className="mt-2 text-sm text-muted">No recent public repository events are currently available in the GitHub activity feed. GitHub's public events API provides a limited history of approximately 90 days.</p>
            ) : (
              <ul className="mt-3 space-y-2 text-sm">
                {external.map((a) => (
                  <li key={a.id}>
                    <a href={a.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                      <span className="block truncate">{a.label}</span>
                      <span className="block truncate font-mono text-xs text-muted">{a.repo} · {fmt(a.date)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
