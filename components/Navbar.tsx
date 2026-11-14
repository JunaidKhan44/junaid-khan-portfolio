
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "@/lib/data";

function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    setTheme(
      document.documentElement.dataset.theme === "light" ? "light" : "dark"
    );
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = next;

    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage unavailable
    }

    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full
        border border-line bg-surface text-lg transition
        hover:border-accent"
    >
      <span aria-hidden="true">
        {theme === "dark" ? "☀" : "☾"}
      </span>
    </button>
  );
}

export function Navbar() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = nav
      .map((n) => document.getElementById(n.id))
      .filter((e): e is HTMLElement => !!e);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      {
        rootMargin: "-30% 0px -60% 0px",
      }
    );

    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-3">
      <nav
        aria-label="Primary"
        className={`
          mx-auto flex max-w-6xl items-center justify-between
          rounded-full px-4 py-2 sm:px-6
          border border-line/70
          bg-surface/90 backdrop-blur-2xl
          transition-all duration-300
          ${
            scrolled
              ? "shadow-xl shadow-black/15"
              : "shadow-md shadow-black/5"
          }
        `}
      >
        {/* Logo */}
        <a
          href="#home"
          className="shrink-0 font-display text-lg font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          <span className="gradient-text">J</span>unaid
          <span className="text-accent">.</span>
        </a>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                aria-current={active === n.id ? "location" : undefined}
                className={`
                  relative block whitespace-nowrap rounded-full
                  px-3.5 py-2 text-sm transition-colors
                  ${
                    active === n.id
                      ? "text-fg"
                      : "text-muted hover:text-fg"
                  }
                `}
              >
                {active === n.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                  />
                )}

                {n.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />

          <a
            href={site.cvHref}
            download
            className="btn btn-primary hidden !px-4 !py-2 sm:inline-flex"
          >
            CV
          </a>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full
              border border-line bg-surface lg:hidden"
          >
            <span aria-hidden="true" className="text-lg">
              {open ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mt-3 rounded-3xl border border-line
              bg-surface/95 p-4 shadow-xl backdrop-blur-2xl lg:hidden"
          >
            <ul className="grid gap-1">
              {nav.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    onClick={() => setOpen(false)}
                    className={`
                      block rounded-2xl px-4 py-3 text-base
                      ${
                        active === n.id
                          ? "bg-surface-2 text-fg"
                          : "text-muted hover:text-fg"
                      }
                    `}
                  >
                    {n.label}
                  </a>
                </li>
              ))}

              <li>
                <a
                  href={site.cvHref}
                  download
                  className="btn btn-primary mt-2 w-full justify-center"
                >
                  Download CV
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
