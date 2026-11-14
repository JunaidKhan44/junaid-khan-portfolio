"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/data";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "LinkedIn", value: "junaid-k", href: site.links.linkedin },
  { label: "GitHub", value: `@${site.githubUser}`, href: site.links.github },
  { label: "Linktree", value: "junaidk.official7", href: site.links.linktree },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // No backend: the form opens the visitor's mail client with the message pre-filled.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  const field = "w-full rounded-2xl border border-line bg-surface px-4 py-3 text-sm outline-none transition focus:border-accent";

  return (
    <Section id="contact" label="09 — Contact" title="Let’s build something together" intro="Have a project, a role or a collaboration in mind? Reach out through any channel below.">
      <div className="grid gap-8 lg:grid-cols-2">
        <Reveal>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {channels.map((c) => (
              <li key={c.label}>
                <a href={c.href} target={c.href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer" className="glass card-hover flex items-center justify-between rounded-2xl p-5">
                  <span>
                    <span className="block text-xs uppercase tracking-widest text-muted">{c.label}</span>
                    <span className="mt-1 block break-all font-medium">{c.value}</span>
                  </span>
                  <span aria-hidden="true" className="text-accent">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <form onSubmit={onSubmit} className="glass space-y-4 rounded-3xl p-6 sm:p-8">
            <div>
              <label htmlFor="c-name" className="mb-1.5 block text-sm text-muted">Name</label>
              <input id="c-name" required autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} />
            </div>
            <div>
              <label htmlFor="c-email" className="mb-1.5 block text-sm text-muted">Email</label>
              <input id="c-email" type="email" required autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={field} />
            </div>
            <div>
              <label htmlFor="c-msg" className="mb-1.5 block text-sm text-muted">Message</label>
              <textarea id="c-msg" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={field} />
            </div>
            <button type="submit" className="btn btn-primary w-full justify-center">Compose email →</button>
            <p className="text-xs text-muted">This opens your email app with the message ready to send.</p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
