import { skills } from "@/lib/data";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Skills() {
  return (
    <Section id="skills" label="02 — Skills" title="Technical toolbox" intro="Technologies I’ve worked with across enterprise, open-source and cloud-native projects, grouped by area.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((g, i) => (
          <Reveal key={g.title} delay={(i % 4) * 0.07}>
            <div className="glass card-hover h-full rounded-3xl p-6">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-surface-2 font-mono text-accent" aria-hidden="true">{g.icon}</span>
              <h3 className="mt-4 font-display text-lg font-semibold">{g.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li key={s} className="chip">{s}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
