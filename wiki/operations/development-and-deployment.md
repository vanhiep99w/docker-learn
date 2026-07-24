# Development and deployment

## Supported local environment

`package.json` declares Node.js `>=20.9.0`. The repository uses npm and commits `package-lock.json`, so prefer npm commands and keep lockfile changes synchronized with `package.json`.

```bash
npm install
npm run dev
```

The development server is available at `http://localhost:3000/`; the root route redirects to `/docs/bat-dau/`.

`npm install` also runs the `postinstall` script, `fumadocs-mdx`, which generates the source collection consumed through the `collections/*` TypeScript alias. If generated collection imports fail after switching branches or changing content config, rerun `npm install` or invoke `npx fumadocs-mdx` through the repository's installed dependency rather than editing `.source/`.

## Package scripts

| Command | Repository behavior |
|---|---|
| `npm run dev` | Starts the Next.js development server |
| `npm run lint` | Runs ESLint with Next.js Core Web Vitals rules |
| `npm run types:check` | Regenerates Fumadocs source, generates Next.js route types, then runs `tsc --noEmit` |
| `npm run build` | Runs `next build`; because `output: 'export'`, writes static output to `out/` |
| `npm run preview` | Serves `out/` with the `serve` package |
| `npm start` | Also serves `out/`; it does not start a dynamic Next.js server |

There is no `test`, `deploy`, or Wrangler script in the current `package.json`.

## Generated files

The following are build products, not hand-maintained source:

| Path | Producer | Notes |
|---|---|---|
| `.source/` | `fumadocs-mdx` | Generated collection modules imported by `src/lib/source.ts` |
| `.next/` | Next.js development/build tools | Framework cache and generated route types |
| `out/` | `next build` static export | Cloudflare Pages artifact and local preview root |
| `next-env.d.ts` | Next.js | Generated TypeScript declarations |
| `*.tsbuildinfo` | TypeScript | Incremental compiler state |

All are ignored in `.gitignore`. Delete and regenerate them when diagnosing stale generation; do not patch them to fix source behavior.

## Build pipeline

```text
npm install / npm run types:check
  └─ fumadocs-mdx reads source.config.ts + content/docs
       └─ writes .source

npm run build
  └─ Next.js resolves all static params
       ├─ docs HTML
       ├─ static search output
       ├─ llms.txt and llms-full.txt
       ├─ per-page processed Markdown
       └─ per-page Open Graph images
            └─ writes out/
```

The build cost scales with the curriculum because each source page contributes docs, Markdown, and OG routes, while `/llms-full.txt/` processes the whole corpus.

## Configuration ownership

| File | Owns |
|---|---|
| `source.config.ts` | Content root, page/meta schemas, processed Markdown, Mermaid remark plugin |
| `next.config.mjs` | Fumadocs MDX integration, static export, strict mode, trailing slashes |
| `tsconfig.json` | Strict TypeScript settings, `@/*` and generated `collections/*` aliases |
| `eslint.config.mjs` | Next Core Web Vitals linting and generated-directory ignores |
| `postcss.config.mjs` | Tailwind PostCSS plugin |
| `src/app/global.css` | Tailwind and Fumadocs CSS imports plus scrollbar behavior |
| `wrangler.toml` | Cloudflare Pages project/output settings |

Use current repository config instead of generic setup examples under `.agents/skills/write-docs/references/`; those references include older stack versions and `dist/` examples for other documentation sites.

## Environment-sensitive metadata

`src/app/layout.tsx` builds `metadataBase` from:

```text
NEXT_PUBLIC_SITE_URL ?? http://localhost:3000
```

Set `NEXT_PUBLIC_SITE_URL` to the complete production origin in the deployment environment so canonical Open Graph URLs are not based on localhost. No sample environment file is committed. Do not inspect or document live environment values or secret-bearing files.

This is the only environment variable referenced by the tracked application source at initialization.

## Cloudflare Pages deployment

`wrangler.toml` contains:

```toml
name = "docker-learn"
pages_build_output_dir = "./out"
compatibility_date = "2026-01-01"
```

The repository is therefore configured as a Cloudflare Pages static asset project. It has no Worker entrypoint, Pages Functions, or bindings. The README gives the deployment build settings:

- build command: `npm run build`;
- output directory: `out`;
- deployment Node.js version: 22;
- `NEXT_PUBLIC_SITE_URL`: production site origin.

The normal deployment model is to connect the Git repository in Cloudflare Pages and let pushes trigger builds. The repository does not currently encode a CI workflow or manual deployment script, so dashboard/project settings remain part of the operational configuration and should be reviewed when deployment behavior differs from local output.

## Deployment verification

Before publishing:

1. Run `npm run lint`, `npm run types:check`, and `npm run build`.
2. Run `npm run preview` and navigate directly to representative deep links.
3. Verify `/docs/bat-dau/`, a diagram-heavy page, `/api/search/`, `/llms.txt/`, `/llms-full.txt/`, a per-page `content.md` route, and an OG image route.
4. Confirm `out/` is the configured upload directory; do not substitute the `dist/` path found in generic skill examples.
5. Confirm production has `NEXT_PUBLIC_SITE_URL` set to the public origin.
6. After deployment, test a direct deep-link refresh and a Vietnamese search query.

See [`quality-and-troubleshooting.md`](quality-and-troubleshooting.md) for failure diagnosis.
