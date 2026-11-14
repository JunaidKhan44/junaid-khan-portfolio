import Image from "next/image";
import { projects } from "@/lib/data";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Projects() {
  return (
    <Section
      id="projects"
      label="04 — Featured work"
      title="Projects I’ve contributed to"
      intro="Enterprise and open-source projects highlighting my contributions to scalable systems and real-world applications. Source code is proprietary or maintained in upstream repositories, so live demos are unavailable."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={(i % 2) * 0.08}>
            <article className="glass card-hover group flex h-full flex-col overflow-hidden rounded-3xl">
              {p.image ? (
                <div className="relative aspect-[16/8] overflow-hidden bg-surface-2">
                  <Image
                    src={p.image}
                    alt={`${p.name} logo or screenshot`}
                    fill
                    sizes="(min-width: 768px) 560px, 100vw"
                    className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ) : null}
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="section-label !text-[0.68rem]">{p.kind}</p>
                <h3 className="mt-2 font-display text-xl font-semibold">{p.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <li key={s} className="chip">{s}</li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
