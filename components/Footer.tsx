import { site } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-line px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-sm text-muted">
        <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <ul className="flex flex-wrap gap-5">
          <li><a className="hover:text-accent" href={site.links.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a className="hover:text-accent" href={site.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a className="hover:text-accent" href={site.links.linktree} target="_blank" rel="noopener noreferrer">Linktree</a></li>
          <li><a className="hover:text-accent" href="#home">Back to top ↑</a></li>
        </ul>
      </div>
    </footer>
  );
}
