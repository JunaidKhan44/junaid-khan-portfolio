import { achievements, education, recommendations } from "@/lib/data";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Education() {
  return (
    <Section id="education" label="07 — Education" title="Academic background">
      <div className="grid gap-5 md:grid-cols-2">
        {education.map((e, i) => (
          <Reveal key={e.school} delay={i * 0.08}>
            <div className="glass card-hover rounded-3xl p-7">
              <span className="text-2xl" aria-hidden="true">🎓</span>
              <h3 className="mt-3 font-display text-xl font-semibold">{e.degree}</h3>
              <p className="mt-1 text-muted">{e.school}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Achievements() {
  return (
    <Section id="achievements" label="08 — Highlights" title="Achievements & recommendations">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.06}>
            <div className="glass card-hover h-full rounded-3xl p-6">
              <p className="font-display text-lg font-semibold gradient-text">{a.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{a.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <h3 className="mt-14 font-display text-xl font-semibold">What colleagues say</h3>
      <p className="mt-1 text-xs text-muted">Feedback from colleagues and leaders I've had the opportunity to work with.</p>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {recommendations.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.07}>
            <figure className="glass h-full rounded-3xl p-6">
              <blockquote className="text-sm leading-relaxed">{r.text}</blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold">{r.name}</span>
                <span className="block text-muted">{r.role}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
