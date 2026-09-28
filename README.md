# Adrian portfolio

A small portfolio built with Next.js, TypeScript, Tailwind CSS, a shadcn/ui-style Button component and Motion. Project pages are generated from [`src/data/projects.ts`](src/data/projects.ts). No GitHub API calls or project credentials run in the browser.

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Before publishing, run:

```bash
npm run lint
npm run typecheck
npm run build
```

## Update a project

Add or edit one object in `src/data/projects.ts`. Set `featured: true` for the large cards, or `false` for More Projects. The same object provides the case-study route at `/projects/[slug]`. Use `demoUrl` and `sourceUrl` only for publicly accessible links that have been checked. A private repository should keep those fields absent and use `repository: "Private repository"`.

The visual components in `src/components/project-visual.tsx` are **illustrative interface concepts**, not screenshots of the actual products. The media section on each case study lists the real assets still needed. Replace concepts with reviewed screenshots and approved recordings when they are available; never label an illustrative visual as actual product evidence.

## Content and privacy

The case studies distinguish local prototypes from verified deployments. No private repository URL, token, customer record or private source content is embedded in the site. Several BookFlow repositories and the two short-video repositories are consolidated into single project stories. A local, ignored `inventory.private.md` records the repo-to-story mapping; it is intentionally excluded from Git.

Before publication, confirm the biography, contact method and permission to show each project. No live demos are linked because none was verified during preparation. Real project media still needs review and redaction.

## Vercel

Import the repository as a Next.js project. `NEXT_PUBLIC_SITE_URL` may be left unset for the first deployment; the site uses Vercel's production URL when available. After the final address is known, set `NEXT_PUBLIC_SITE_URL` to its full HTTPS origin (without a trailing slash) and redeploy. Do not create this variable with an empty value. It controls absolute metadata and sitemap URLs. No other environment variables are required for the portfolio itself. The project has a generated favicon, OpenGraph image, metadata, robots route and sitemap route.

## Asset checklist

| Project | Real material to add |
| --- | --- |
| BookFlow AI | Search screen, service/time selection, confirmation, 10–20 second booking recording |
| Univer | Upload/status view, redacted output note, pipeline diagram, short recording |
| Lead Hunter | Redacted research result, validation flow, review walkthrough |
| Business Diagnostic | Interview screen, redacted report |
| LectureAI | Lecture workspace, flashcard and quiz views |
| Beauty Bot | Redacted customer conversation and owner view |
| Shorts Studio | Approved output video, pipeline diagram, editing/output view |

Use neutral mockups until the real material is approved. Avoid faces, phone numbers, customer names and unpublished business data in captures.
