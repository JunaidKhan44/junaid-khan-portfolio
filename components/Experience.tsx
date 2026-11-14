import { experience } from "@/lib/data";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section id="experience" label="03 — Experience" title="Where I’ve worked">
      <ol className="relative space-y-8 border-l border-line pl-6 sm:pl-10">
        {experience.map((job, i) => (
          <li key={`${job.company}-${job.period}`} className="relative">
            <span
              aria-hidden="true"
              className={`absolute -left-[1.95rem] top-7 h-3 w-3 rounded-full border-2 border-bg sm:-left-[2.95rem] ${job.current ? "bg-accent shadow-[0_0_0_6px_color-mix(in_srgb,var(--accent)_25%,transparent)]" : "bg-accent-2"}`}
            />
            <Reveal delay={i * 0.05}>
              <article className="glass card-hover rounded-3xl p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl font-semibold">
                    {job.role} <span className="text-muted">· {job.company}</span>
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-wider text-accent">{job.period}</p>
                </div>
                <p className="mt-3 text-muted">{job.summary}</p>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed">
                  {job.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {job.stack.map((s) => (
                    <li key={s} className="chip">{s}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
