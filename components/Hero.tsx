"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { roles, site } from "@/lib/data";

function useTyping(words: string[], enabled: boolean) {
  const [text, setText] = useState(enabled ? "" : words[0]);

  useEffect(() => {
    if (!enabled) return;
    let w = 0;
    let i = 0;
    let deleting = false;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = words[w];
      i += deleting ? -1 : 1;
      setText(word.slice(0, i));
      let delay = deleting ? 35 : 70;
      if (!deleting && i === word.length) {
        deleting = true;
        delay = 1600;
      } else if (deleting && i === 0) {
        deleting = false;
        w = (w + 1) % words.length;
        delay = 350;
      }
      t = setTimeout(tick, delay);
    };
    t = setTimeout(tick, 400);
    return () => clearTimeout(t);
  }, [words, enabled]);

  return text;
}

export function Hero({ years, githubHandle }: { years: number; githubHandle: string }) {
  const reduce = useReducedMotion();
  const typed = useTyping(roles, !reduce);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, reduce ? 0 : 80]);
  const opacity = useTransform(scrollY, [0, 500], [1, reduce ? 1 : 0.2]);

  const item = (d: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: d, ease: [0.2, 0.8, 0.2, 1] as const } };

  return (
   <section
  id="home"
  className="relative flex min-h-screen items-center overflow-hidden px-5 pb-16 pt-28 sm:px-8 scroll-mt-24">
      <div className="grid-bg" aria-hidden="true" />
      <div className="orb -left-24 top-24 h-80 w-80 bg-accent/25" aria-hidden="true" />
      <div className="orb -right-24 bottom-10 h-96 w-96 bg-accent-2/25 [animation-delay:-6s]" aria-hidden="true" />
      <motion.div style={{ y, opacity }} className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
        <motion.p {...item(0.05)} className="section-label inline-flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent" aria-hidden="true" />
          Let’s connect and collaborate
        </motion.p>

        <motion.h1 {...item(0.15)} className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl md:text-8xl">
          Hi, I’m <span className="gradient-text">Junaid Khan</span>
        </motion.h1>

        <motion.p {...item(0.25)} className="mt-5 font-display text-xl text-muted sm:text-3xl">
          {site.title} · <span className="caret text-fg" aria-hidden="true">{typed}</span>
          <span className="sr-only">{roles.join(", ")}</span>
        </motion.p>

        <motion.p {...item(0.35)} className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {site.tagline}. {years}+ years across enterprise tax ERP, open-source cloud-native platforms and secure API delivery — Java, Kotlin, Python, microservices, cloud and DevSecOps.
        </motion.p>

        <motion.div {...item(0.45)} className="mt-9 flex flex-wrap gap-3">
          <a href="#projects" className="btn btn-primary">View projects <span aria-hidden="true">→</span></a>
          <a href="#contact" className="btn btn-ghost">Contact me</a>
          <a href={site.cvHref} download className="btn btn-ghost">Download CV <span aria-hidden="true">↓</span></a>
        </motion.div>

        <motion.ul {...item(0.55)} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
          <li><a className="hover:text-accent" href={site.links.github} target="_blank" rel="noopener noreferrer">GitHub · @{githubHandle}</a></li>
          <li><a className="hover:text-accent" href={site.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a className="hover:text-accent" href={site.links.linktree} target="_blank" rel="noopener noreferrer">Linktree</a></li>
          <li><a className="hover:text-accent" href={`mailto:${site.email}`}>{site.email}</a></li>
        </motion.ul>
        </div>

        <motion.div {...item(0.5)} className="relative hidden lg:block" aria-hidden="true">
          <div className="glass spot relative rounded-3xl p-1">
            <div className="flex items-center gap-2 border-b border-line px-5 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-amber-300/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
              <span className="ml-3 font-mono text-xs text-muted">junaid.kt</span>
            </div>
            <pre className="overflow-hidden px-6 py-5 font-mono text-[0.8rem] leading-7">
              <code>
                <span className="text-accent-2">val</span> junaid = <span className="text-accent">Engineer</span>(
                {"\n"}  role = <span className="text-amber-300">&quot;Senior Software Engineer, Enterprise Architecture&quot;</span>,
                {"\n"}  languages = <span className="text-amber-300">&quot;Java, Kotlin, Python AI/ML, Apache Groovy&quot;</span>,
                {"\n"}  focus = <span className="text-amber-300">&quot;J2EE, Microservices, ML/LLM&quot;</span>,
                {"\n"}  openSource = <span className="text-amber-300">&quot;OpenNMS Horizon, Meridian, Zenith SPoG, Lokahi&quot;</span>,
                {"\n"}  enterprice = <span className="text-amber-300">&quot;IRIS 2.0, 3.0, NSTR, PRA, MIS, LMS&quot;</span>,
                {"\n"})
              </code>
            </pre>
          </div>
          <span className="glass float-slow absolute -left-8 -top-6 rounded-2xl px-4 py-2 font-mono text-xs">Spring Boot</span>
          <span className="glass float-slower absolute -right-6 top-1/3 rounded-2xl px-4 py-2 font-mono text-xs">Kafka</span>
          <span className="glass float-slow absolute -bottom-6 left-10 rounded-2xl px-4 py-2 font-mono text-xs">Kubernetes</span>
        </motion.div>
      </motion.div>

      <a href="#about" aria-label="Scroll to About" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-xs text-muted sm:block">
        <span className="flex h-10 w-6 justify-center rounded-full border border-line pt-2">
          <span className="h-2 w-1 animate-bounce rounded-full bg-accent" />
        </span>
      </a>
    </section>
  );
}
