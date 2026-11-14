"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent as RPointerEvent } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { certifications, type Cert } from "@/lib/data";
import { Section } from "./Section";

const pad = (n: number) => String(n).padStart(2, "0");

export function Certifications() {
  const reduce = useReducedMotion();
  const rowRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const rafRef = useRef(0);
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false });

  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState<Cert | null>(null);

  /** Coverflow: tilt/scale/fade each card by its distance from the centre of the row. */
  const layout = useCallback(() => {
    const el = rowRef.current;
    if (!el) return;
    const centre = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(el.children).forEach((node, i) => {
      const li = node as HTMLElement;
      const c = li.offsetLeft + li.offsetWidth / 2;
      const dist = c - centre;
      const d = Math.max(-1, Math.min(1, dist / (li.offsetWidth * 1.15)));
      const a = Math.abs(d);
      if (!reduce) {
        li.style.setProperty("--rot", `${(-d * 24).toFixed(2)}deg`);
        li.style.setProperty("--s", (1 - a * 0.14).toFixed(3));
        li.style.setProperty("--o", (1 - a * 0.5).toFixed(3));
      }
      if (Math.abs(dist) < bestDist) {
        bestDist = Math.abs(dist);
        best = i;
      }
    });
    setActive(best);
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, [reduce]);

  const scrollToIndex = useCallback(
    (i: number) => {
      const el = rowRef.current;
      if (!el) return;
      const idx = (i + certifications.length) % certifications.length;
      const li = el.children[idx] as HTMLElement | undefined;
      if (!li) return;
      el.scrollTo({ left: li.offsetLeft + li.offsetWidth / 2 - el.clientWidth / 2, behavior: reduce ? "auto" : "smooth" });
    },
    [reduce],
  );

  useEffect(() => {
    layout();
    const el = rowRef.current;
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(layout);
    };
    el?.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Start with the newest certificate centred.
    scrollToIndex(0);
    return () => {
      el?.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [layout, scrollToIndex]);

  // Optional auto-advance: off by default, never with reduced motion, pauses on hover/focus.
  useEffect(() => {
    if (!playing || paused || reduce || open) return;
    const id = setInterval(() => scrollToIndex(active + 1), 3200);
    return () => clearInterval(id);
  }, [playing, paused, reduce, open, active, scrollToIndex]);

  // Lightbox via the native <dialog> (focus trap + Esc for free).
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  /* Mouse drag-to-scroll (touch and trackpads already scroll natively). */
  const onDown = (e: RPointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = rowRef.current;
    if (!el) return;
    drag.current = { down: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false };
  };
  const onMove = (e: RPointerEvent<HTMLUListElement>) => {
    const el = rowRef.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (!drag.current.moved && Math.abs(dx) > 5) {
      drag.current.moved = true;
      el.classList.add("dragging");
    }
    if (drag.current.moved) el.scrollLeft = drag.current.startLeft - dx;
  };
  const endDrag = () => {
    drag.current.down = false;
    rowRef.current?.classList.remove("dragging");
    // keep `moved` until the click that follows the drag has been swallowed
    setTimeout(() => (drag.current.moved = false), 0);
  };

  /* Tilt + glare on hover (mouse only). */
  const onTilt = (e: RPointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || reduce) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${((px - 0.5) * 12).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${((0.5 - py) * 10).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
  };
  const onTiltEnd = (e: RPointerEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  const current = certifications[active] ?? certifications[0];

  return (
    <Section
      id="certifications"
      label="06 — Certifications"
      title="Continuous learning"
      intro="Drag, swipe or use the arrows. Click the centred card to view the full certificate."
      wide
    >
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Certifications"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="relative"
      >
        {/* Ambient glow in the active certificate's colour */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 mx-auto h-72 max-w-3xl rounded-full blur-3xl transition-colors duration-700"
          style={{ background: `color-mix(in srgb, ${current.accent} 22%, transparent)` }}
        />

        {/* Counter + controls */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <p className="font-display leading-none" aria-live="polite">
            <span className="gradient-text text-6xl font-semibold sm:text-7xl">{pad(active + 1)}</span>
            <span className="ml-2 text-xl text-muted">/ {pad(certifications.length)}</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-pressed={playing}
              disabled={!!reduce}
              onClick={() => setPlaying((p) => !p)}
              className="chip cursor-pointer !px-4 !py-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {playing ? "❚❚ Pause" : "▶ Auto-play"}
            </button>
            <button type="button" aria-label="Previous certificate" onClick={() => scrollToIndex(active - 1)} className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface transition hover:border-accent hover:bg-surface-2">←</button>
            <button type="button" aria-label="Next certificate" onClick={() => scrollToIndex(active + 1)} className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface transition hover:border-accent hover:bg-surface-2">→</button>
          </div>
        </div>

        {/* Full-bleed coverflow row */}
        <ul
          ref={rowRef}
          className="cert-row relative left-1/2 w-screen -translate-x-1/2"
          style={{ paddingInline: "calc(50% - min(39vw, 190px))" }}
          tabIndex={0}
          aria-label="Certificate cards"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") { e.preventDefault(); scrollToIndex(active + 1); }
            if (e.key === "ArrowLeft") { e.preventDefault(); scrollToIndex(active - 1); }
          }}
        >
          {certifications.map((c, i) => (
            <li
              key={c.name}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${certifications.length}: ${c.name}`}
              className="w-[78vw] max-w-[380px] sm:w-[380px]"
              style={{ "--c": c.accent } as CSSProperties}
            >
              <div className="cert-3d">
                <article
                  className="cert-tilt glass relative overflow-hidden rounded-3xl"
                  onPointerMove={onTilt}
                  onPointerLeave={onTiltEnd}
                >
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 z-10 h-1" style={{ background: `linear-gradient(90deg, transparent, ${c.accent}, transparent)` }} />
                  <button
                    type="button"
                    className="relative block aspect-[4/3] w-full overflow-hidden bg-surface-2 text-left"
                    aria-label={i === active ? `View ${c.name} full size` : `Bring ${c.name} to the centre`}
                    onClick={() => {
                      if (drag.current.moved) return;
                      if (i === active) setOpen(c);
                      else scrollToIndex(i);
                    }}
                  >
                    <Image src={c.image} alt={`Certificate: ${c.name}, issued by ${c.issuer}`} fill sizes="380px" draggable={false} className="object-cover" />
                    <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-[0.7rem] text-white backdrop-blur">⤢ View</span>
                  </button>
                  <div className="p-5">
                    <p className="font-mono text-xs uppercase tracking-wider" style={{ color: c.accent }}>{c.date}</p>
                    <h3 className="mt-2 font-display text-lg font-semibold leading-snug">{c.name}</h3>
                    <p className="mt-1 text-sm text-muted">{c.issuer}</p>
                    {c.verifyUrl ? (
                      <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex text-sm font-medium text-accent hover:underline">
                        Verify credential ↗
                      </a>
                    ) : null}
                  </div>
                  <span aria-hidden="true" className="cert-glare" />
                </article>
              </div>
            </li>
          ))}
        </ul>

        {/* Progress + dots */}
        <div className="mx-auto mt-2 flex max-w-md items-center gap-4">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-surface-2" aria-hidden="true">
            <div className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2" style={{ width: `${Math.max(6, progress * 100)}%`, transition: "width 0.15s linear" }} />
          </div>
          <div className="flex gap-2">
            {certifications.map((c, i) => (
              <button
                key={c.name}
                type="button"
                aria-label={`Go to certificate ${i + 1}`}
                aria-current={i === active}
                onClick={() => scrollToIndex(i)}
                className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-accent" : "w-2 bg-line hover:bg-muted"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <dialog
        ref={dialogRef}
        className="cert-dialog"
        aria-label={open ? `${open.name} certificate` : "Certificate"}
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
      >
        {open ? (
          <div className="relative">
            <button
              type="button"
              autoFocus
              onClick={() => dialogRef.current?.close()}
              aria-label="Close certificate"
              className="absolute -top-12 right-0 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
            >
              ✕
            </button>
            <Image
              src={open.image}
              alt={`Certificate: ${open.name}, issued by ${open.issuer}`}
              width={1600}
              height={1200}
              sizes="94vw"
              className="h-auto max-h-[82vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
            />
            <p className="mt-3 text-center text-sm text-white/80">
              {open.name} · {open.issuer} · {open.date}
            </p>
          </div>
        ) : null}
      </dialog>
    </Section>
  );
}
