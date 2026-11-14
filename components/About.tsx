import Image from "next/image";
import { about, site } from "@/lib/data";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { assetPath } from "@/lib/utils";

export function About({ years }: { years: number }) {
  return (
    <Section id="about" label="01 — About" title="Engineering secure systems that scale">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <p className="text-lg leading-relaxed">{about.summary}</p>
          <p className="mt-4 leading-relaxed text-muted">{about.detail}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {about.highlights.map((h) => (
              <li key={h} className="glass flex items-start gap-3 rounded-2xl p-4 text-sm">
                <span className="mt-0.5 text-accent" aria-hidden="true">◆</span>
                {h}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <div>
              <p className="font-display text-4xl font-semibold gradient-text">{years}+</p>
              <p className="text-xs uppercase tracking-widest text-muted">Years in software</p>
            </div>
            <a href={site.cvHref} download className="btn btn-ghost">Download CV ↓</a>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="glass relative overflow-hidden rounded-3xl p-2">
   
<Image
  src={assetPath("/assets/img/about2.png")}
  alt="Illustration of a developer workspace"
  width={1536}
  height={1024}
  sizes="(min-width: 1024px) 480px, 100vw"
  className="h-auto w-full rounded-[1.25rem]"
/>

          </div>
        </Reveal>
      </div>
    </Section>
  );
}
