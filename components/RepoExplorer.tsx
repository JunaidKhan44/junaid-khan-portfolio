"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Repo } from "@/lib/github";

const LANG_COLORS: Record<string, string> = {
  Java: "#b07219", Kotlin: "#A97BFF", Python: "#3572A5", TypeScript: "#3178c6", JavaScript: "#f1e05a",
  HTML: "#e34c26", CSS: "#563d7c", Shell: "#89e051", Vue: "#41b883", Go: "#00ADD8", "C#": "#178600",
  Dockerfile: "#384d54", PLSQL: "#dad8d8", SCSS: "#c6538c", Dart: "#00B4AB",
};

const fmtDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(iso));

type Sort = "stars" | "recent";

export function RepoExplorer({ repos }: { repos: Repo[] }) {
  const reduce = useReducedMotion();
  const [lang, setLang] = useState<string>("All");
  const [sort, setSort] = useState<Sort>("stars");
  const [showAll, setShowAll] = useState(false);

  const languages = useMemo(() => {
    const set = new Set<string>();
    repos.forEach((r) => r.language && set.add(r.language));
    return ["All", ...set];
  }, [repos]);

  const list = useMemo(() => {
    const filtered = lang === "All" ? repos : repos.filter((r) => r.language === lang);
    return [...filtered].sort((a, b) =>
      sort === "stars"
        ? b.stargazers_count - a.stargazers_count || +new Date(b.pushed_at) - +new Date(a.pushed_at)
        : +new Date(b.pushed_at) - +new Date(a.pushed_at),
    );
  }, [repos, lang, sort]);

  const visible = showAll ? list : list.slice(0, 6);

  if (repos.length === 0) {
    return <p className="glass rounded-2xl p-6 text-muted">No public repositories to show yet.</p>;
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter repositories by language">
          {languages.map((l) => (
            <button
              key={l}
              type="button"
              aria-pressed={lang === l}
              onClick={() => { setLang(l); setShowAll(false); }}
              className={`chip cursor-pointer ${lang === l ? "!border-accent !text-fg" : ""}`}
            >
              {l}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-muted">
          Sort
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-fg"
          >
            <option value="stars">Most starred</option>
            <option value="recent">Recently updated</option>
          </select>
        </label>
      </div>

      <motion.ul layout={!reduce} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((r) => (
            <motion.li
              key={r.id}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              <a
                href={r.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass card-hover flex h-full flex-col rounded-2xl p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="break-all font-mono text-sm font-semibold text-accent">{r.name}</h3>
                  {r.fork ? <span className="chip shrink-0 !py-0.5 !text-[0.65rem]">fork</span> : null}
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {r.description ?? "No description provided."}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                  {r.language ? (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: LANG_COLORS[r.language] ?? "var(--accent-2)" }} aria-hidden="true" />
                      {r.language}
                    </span>
                  ) : null}
                  <span aria-label={`${r.stargazers_count} stars`}>★ {r.stargazers_count}</span>
                  <span aria-label={`${r.forks_count} forks`}>⑂ {r.forks_count}</span>
                  <span className="ml-auto">Updated {fmtDate(r.pushed_at)}</span>
                </div>
              </a>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {list.length === 0 ? <p className="mt-4 text-muted">No repositories match this filter.</p> : null}

      {list.length > 6 ? (
        <div className="mt-6 text-center">
          <button type="button" onClick={() => setShowAll((v) => !v)} className="btn btn-ghost">
            {showAll ? "Show fewer" : `Show all ${list.length} repositories`}
          </button>
        </div>
      ) : null}
    </div>
  );
}
