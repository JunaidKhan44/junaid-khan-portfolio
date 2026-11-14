# Junaid Khan — Portfolio (Next.js 15 · TypeScript · Tailwind v4 · Framer Motion)

## Run locally
```bash
npm install
cp .env.example .env.local   # optional: add GITHUB_TOKEN, set NEXT_PUBLIC_SITE_URL
npm run dev                  # http://localhost:3000
```

## Quality checks
```bash
npm run lint
npm run typecheck
npm run build && npm start
```

## Deploy (Vercel)
Import the repo, set `NEXT_PUBLIC_SITE_URL` (your domain) and optionally `GITHUB_TOKEN`
(fine-grained, public read-only; add `read:user` only if you want the contribution calendar).
Tokens stay server-side. Any Node host works with `npm run build && npm start`.

## Where things live
- `lib/data.ts` — all content (experience, skills, projects, certificates, links). Edit here.
- `lib/github.ts` — server-only GitHub API layer (profile, repos, events, optional contribution calendar), cached 1h, handles rate limits/errors.
- `components/` — sections; `Certifications.tsx` is the carousel, `RepoExplorer.tsx` the repo cards.
- `public/cv.pdf` — currently your LinkedIn profile export; replace with your real CV, keeping the filename.

## Needs your input
- Real CV PDF (the old site pointed to `assets/pdf/Junaid-Khan-Resume-26.pdf`, which wasn't in the ZIP).
- Verification links for the Great Learning, Simplilearn (codes 4609347 / 4752192 are on the certificates) credentials.
- Live demo / repo links for projects, if any can be public.
- `NEXT_PUBLIC_SITE_URL` once the domain is known.
