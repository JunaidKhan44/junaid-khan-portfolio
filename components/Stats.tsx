"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

type Stat = { label: string; value: number; suffix?: string };

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(value);
      return;
    }
    const controls = animate(0, value, { duration: 1.4, ease: [0.2, 0.8, 0.2, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} aria-label={`${value}${suffix}`}>
      {n}
      {suffix}
    </span>
  );
}

export function Stats({ stats }: { stats: Stat[] }) {
  return (
    <section aria-label="At a glance" className="px-5 py-14 sm:px-8">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="glass card-hover flex flex-col-reverse rounded-3xl p-6 text-center">
            <dt className="mt-1 text-xs uppercase tracking-widest text-muted">{s.label}</dt>
            <dd className="gradient-text font-display text-4xl font-semibold sm:text-5xl">
              <Counter value={s.value} suffix={s.suffix} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
