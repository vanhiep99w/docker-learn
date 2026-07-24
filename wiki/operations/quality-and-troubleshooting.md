# Quality and troubleshooting

## Quality model

The repository has no test files, test runner configuration, or CI workflow at initialization. Its automated quality gates are static analysis, generated type checks, and a full static export. These gates validate the publisher and MDX compilation, but they do not prove that Docker commands in lessons are safe, current, or semantically correct.

Use layered validation:

1. **Source consistency** — frontmatter, navigation metadata, links, and local conventions.
2. **Static tooling** — lint, generated route/content types, TypeScript.
3. **Full export** — all dynamic slugs, Markdown routes, search output, and OG images generate.
4. **Browser checks** — navigation, responsive layout, themes, diagrams, search, copy/view actions.
5. **Technical content checks** — execute lesson commands in an appropriate disposable environment and compare expected behavior.

## Automated commands

Run from the repository root:

```bash
npm run lint
npm run types:check
npm run build
```

| Gate | Catches | Does not catch |
|---|---|---|
| `npm run lint` | TypeScript/React/Next lint violations and Core Web Vitals rule issues | Broken lesson links, Docker command validity, visual regressions |
| `npm run types:check` | MDX source-generation errors, Next route typing issues, TypeScript errors | Production export failures, browser-only rendering problems |
| `npm run build` | Static-generation failures across docs and generated routes | Search relevance, diagram appearance, technical correctness of prose |

Run `npm run preview` after a successful build to inspect the exact `out/` artifact rather than only development-mode behavior.

## Change-specific validation matrix

| Change area | Required targeted checks |
|---|---|
| MDX prose only | Frontmatter, heading/TOC structure, links, commands, `types:check`, build |
| New/renamed/deleted page | Section `meta.json`, inbound links, sidebar order, docs route, Markdown route, OG route |
| Root/section metadata | Full sidebar progression and all declared entries |
| Mermaid content | MDX build, light theme, dark theme, narrow viewport, failure fallback if renderer changed |
| Search | Index rebuild plus accented/unaccented Vietnamese queries and direct result navigation |
| Shared route constants | Docs, Markdown, OG, GitHub source, and navigation links |
| Page renderer/components | Rich pages containing tables, callouts, code, relative links, and diagrams |
| Dependencies/config | Clean install where practical, generated source, type check, full build, preview |
| Cloudflare settings | Local `out/`, dashboard build/output values, production deep links, metadata URLs |

## Navigation consistency

Each section directory should match the root metadata, and each section's MDX files should match its page list. A targeted local check can be written with Node.js; the important invariants are:

- every directory under `content/docs/` is declared in `content/docs/meta.json`;
- every root metadata entry points to a real section directory;
- every section MDX basename appears in that section's `meta.json` pages array;
- every declared page has a corresponding `.mdx` file.

At wiki initialization, these invariants pass for all 22 sections and 258 MDX pages. Continue to rely on current-tree checks rather than the stale README page count.

## Common failure paths

### Generated collection import fails

**Symptoms:** TypeScript cannot resolve `collections/server`, `.source` modules are missing, or content changes are not reflected.

**Checks:**

1. Confirm dependencies are installed.
2. Run `npm run types:check`, whose first step is `fumadocs-mdx`.
3. If stale output is suspected, remove `.source/` and regenerate it.
4. Inspect `source.config.ts` and the changed MDX/frontmatter for the first generation error.

Do not edit `.source/` directly.

### Page is missing or in the wrong sidebar position

**Likely cause:** the page basename is absent or misplaced in `content/docs/<section>/meta.json`, or the section is absent/misplaced in `content/docs/meta.json`.

**Checks:** compare actual filenames with metadata, inspect the generated docs tree, and verify that the slug is not only reachable directly but correctly ordered.

### Internal link redirects or returns 404

**Likely causes:** missing final slash, stale slug after a rename, or a link that omits the `/docs` prefix.

**Checks:** search `content/docs/` for the old slug, use `/docs/<section>/<page>/`, and test direct navigation against `npm run preview`.

### Mermaid code appears as text or does not render

**Build-side checks:**

- the fence language is `mermaid`;
- the fence is not indented;
- `remarkMdxMermaid` remains registered in `source.config.ts`;
- `Mermaid` remains registered in `src/components/mdx.tsx`.

**Browser-side checks:** inspect the fallback message from `src/components/mermaid.tsx`, test both themes, and check the browser console. The renderer deliberately catches errors and shows source chart text.

### Search results are poor for Vietnamese text

Both `src/app/api/search/route.ts` and `src/components/search.tsx` initialize Orama with `language: 'english'`. This is a configuration watchpoint, not proof of a specific defect. Reproduce with representative Vietnamese queries before changing analyzers, and keep server/build and client language settings aligned.

### Copy/view-as-Markdown fails

The page renderer derives a URL from `getPageMarkdownUrl`, while `src/app/llms.mdx/docs/[[...slug]]/route.ts` removes the final `content.md` segment before resolving the source page. Check shared route constants, generated static params, and the corresponding file under `out/llms.mdx/docs/`.

### Open Graph image fails to build

The OG handler renders every source page at 1200×630. Check page title/description data, `getPageImage` segment generation, static params, and build logs. A page addition increases OG generation work even if the docs HTML itself renders in development.

### Production metadata uses localhost

`NEXT_PUBLIC_SITE_URL` was not set during the production build. Set it to the full public origin in Cloudflare Pages and rebuild; the fallback in `src/app/layout.tsx` is intended for local development.

### Deployment serves no files or stale files

Confirm Cloudflare Pages uploads `out/`, not `dist/`. `wrangler.toml` and current README agree on `out/`; generic authoring skill references that mention `dist/` describe other project templates.

## Review expectations

A reviewer should distinguish publisher correctness from curriculum correctness. For a completed lesson, ask for evidence that version-sensitive commands and claims were checked against official sources and, when practical, executed. For application changes, ask for a production-like static build and direct route checks. For navigation changes, review the learning sequence, not only JSON validity.
