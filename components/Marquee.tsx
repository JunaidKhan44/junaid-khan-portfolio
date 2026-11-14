import { skills } from "@/lib/data";

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const loop = [...items, ...items]; // duplicated for a seamless -50% loop
  return (
    <div className={`marquee ${reverse ? "marquee-rev" : ""}`}>
      <ul className="marquee-track">
        {loop.map((t, i) => (
          <li key={`${t}-${i}`} aria-hidden={i >= items.length} className="chip !px-4 !py-2 !text-sm">
            <span className="mr-2 text-accent" aria-hidden="true">◆</span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Marquee() {
  const all = skills.flatMap((g) => g.items);
  const half = Math.ceil(all.length / 2);
  return (
    <div className="relative space-y-3 py-6" aria-label="Technologies I work with">
      <div className="hairline mb-6" aria-hidden="true" />
      <Row items={all.slice(0, half)} />
      <Row items={all.slice(half)} reverse />
      <div className="hairline mt-6" aria-hidden="true" />
    </div>
  );
}
