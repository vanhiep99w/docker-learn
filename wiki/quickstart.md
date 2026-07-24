# Docker Learn repository quickstart

Docker Learn is a Vietnamese-language Docker curriculum delivered as a statically exported documentation website. It combines a large MDX content tree with a small Next.js/Fumadocs application that renders navigation, search, diagrams, social images, and machine-readable Markdown feeds. The project is documentation-first: most product behavior lives in `content/docs/`, while `src/` is the publishing shell.

## Rule loading

Before modifying repository files:

1. Read the reviewed global rules in [`wiki/_rules.md`](_rules.md).
2. Read every section `_rules.md` applicable to the files you will touch. No section-specific rule files exist at the time of this initialization, but future sections may add them.
3. If applicable rule files conflict, stop and report the conflict.
4. Do not modify any `wiki/**/_rules.md` outside the approved Harness proposal and apply workflow.

## What is in the repository

| Area | Role | Start here |
|---|---|---|
| `content/docs/` | Vietnamese Docker curriculum, page frontmatter, and sidebar ordering | [`content/curriculum.md`](content/curriculum.md) |
| `src/app/` | Next.js App Router pages and statically generated route handlers | [`architecture/routes-and-interfaces.md`](architecture/routes-and-interfaces.md) |
| `src/components/` | Fumadocs provider/search integration and client-side Mermaid rendering | [`architecture/system-overview.md`](architecture/system-overview.md) |
| `src/lib/` | Fumadocs source loader, route constants, repository link configuration | [`architecture/system-overview.md`](architecture/system-overview.md) |
| `source.config.ts` | MDX collection schema, processed Markdown generation, Mermaid transform | [`content/authoring-workflow.md`](content/authoring-workflow.md) |
| Build/config files | Next.js static export, TypeScript, ESLint, Tailwind, and Cloudflare Pages settings | [`operations/development-and-deployment.md`](operations/development-and-deployment.md) |
| `.agents/skills/write-docs/` | Maintainer guidance and reusable authoring references | [`content/authoring-workflow.md`](content/authoring-workflow.md) |

Generated directories such as `.source/`, `.next/`, and `out/` are not source of truth and are ignored by Git. Regenerate them through the package scripts rather than editing them.

## Current product state

The curriculum navigation defines **22 ordered sections** in `content/docs/meta.json`. The working tree currently contains **258 MDX pages**: **77 substantive pages** and **181 frontmatter-only placeholders**. Completed content is concentrated in:

- Bắt đầu (Getting started)
- Nền tảng container (Container fundamentals)
- Cài đặt và môi trường (Installation and environment)
- Docker CLI
- Images và Dockerfile
- BuildKit và Buildx
- Container lifecycle

The remaining 15 curriculum sections are structured in navigation but still contain placeholder pages. See the exact status and intended learning progression in [`content/curriculum.md`](content/curriculum.md).

The root `README.md` still describes the repository's initial state as “261 placeholder pages.” That statement predates the sequence of content-completion commits and should not be used as the current inventory. Also preserve the existing uncommitted work in `content/docs/index.mdx`; it expands the curriculum landing page and is not part of the wiki initialization.

## Request and build flow

```text
content/docs/**/*.mdx + meta.json
             │
             ▼
 source.config.ts / fumadocs-mdx
             │
             ▼
       generated .source
             │
             ▼
 src/lib/source.ts ──► docs UI, search index, Markdown feeds, OG images
             │
             ▼
       next build (static export)
             │
             ▼
             out/ ──► Cloudflare Pages
```

There is no application database, backend service, authentication flow, or runtime state in this repository. Route handlers are designed for static generation; deployment serves the generated `out/` tree.

## Local setup

Requirements are defined in `package.json`:

- Node.js 20.9 or newer
- npm

```bash
npm install
npm run dev
```

Open `http://localhost:3000/`. The home route redirects to `/docs/bat-dau/`, not the curriculum root. Useful pre-change checks are:

```bash
npm run lint
npm run types:check
npm run build
npm run preview
```

`npm run build` writes the static export to `out/`; `npm run preview` serves that directory locally. There is no automated test suite or CI workflow, so content and route changes also require targeted browser checks. See [`operations/quality-and-troubleshooting.md`](operations/quality-and-troubleshooting.md).

## Where to go next

### Architecture

- [`architecture/system-overview.md`](architecture/system-overview.md) — system boundaries, MDX compilation, static export, and important design decisions.
- [`architecture/routes-and-interfaces.md`](architecture/routes-and-interfaces.md) — user-facing docs routes, search, Markdown/LLM interfaces, OG images, and Mermaid behavior.

### Curriculum and authoring

- [`content/curriculum.md`](content/curriculum.md) — learning sequence, section status, metadata ownership, and content roadmap.
- [`content/authoring-workflow.md`](content/authoring-workflow.md) — how to add or revise pages without breaking navigation or MDX rendering.

### Operations and quality

- [`operations/development-and-deployment.md`](operations/development-and-deployment.md) — local development, generated files, static export, and Cloudflare Pages deployment.
- [`operations/quality-and-troubleshooting.md`](operations/quality-and-troubleshooting.md) — validation matrix, known watchpoints, and failure diagnosis.

## Change-oriented starting points

| Change | Begin with | Validate |
|---|---|---|
| Write or complete a Docker lesson | Existing neighboring pages and the section `meta.json` | Frontmatter, links, MDX rendering, `types:check`, build |
| Add, remove, or rename a lesson | `content/docs/<section>/meta.json` and all inbound links | Metadata consistency, generated routes, sidebar order |
| Reorder curriculum sections | `content/docs/meta.json` | Sidebar progression and landing-page guidance |
| Change page rendering | `src/app/docs/[[...slug]]/page.tsx`, `src/components/mdx.tsx` | Representative rich MDX pages, copy/view actions, metadata |
| Change search | `src/app/api/search/route.ts`, `src/components/search.tsx` | Vietnamese queries in the production-like static build |
| Change Mermaid support | `source.config.ts`, `src/components/mermaid.tsx` | Light/dark themes, invalid diagram fallback, static build |
| Change public routes | `src/lib/shared.ts` plus the relevant route file | Static params, trailing slashes, links, build output |
| Change deployment | `next.config.mjs`, `wrangler.toml`, `package.json` | `out/` contents and Cloudflare Pages settings |

## Backlog

- **Content-level technical accuracy audit** — `content/docs/`: the initial wiki maps the curriculum and authoring system but does not independently validate every Docker command or external claim in 77 long-form guides.
- **Visual design and accessibility deep dive** — `src/app/global.css`: customization is currently small, so this run documents the publishing architecture and change checks rather than performing a dedicated UI audit.
