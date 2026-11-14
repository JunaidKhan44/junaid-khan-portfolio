import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = { id: string; label: string; title: string; intro?: string; children: ReactNode; wide?: boolean };

export function Section({ id, label, title, intro, children, wide }: Props) {
  return (
    <section id={id} className="relative px-5 py-20 sm:px-8 md:py-28">
      <div className={`mx-auto ${wide ? "max-w-7xl" : "max-w-6xl"}`}>
        <Reveal>
          <p className="section-label">{label}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">{title}</h2>
          {intro ? <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{intro}</p> : null}
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
