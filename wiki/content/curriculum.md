# Curriculum model and status

## Product intent

Docker Learn is organized as a guided Vietnamese curriculum rather than an alphabetical command reference. The root landing page (`content/docs/index.mdx`) describes a progression from mental models, through daily Docker use, into data/network/security concerns and finally production or orchestration topics. The sidebar order in `content/docs/meta.json` encodes the same progression.

The content aims to explain operational consequences, not merely list flags: what Docker solves, how images and containers differ, where state lives, how namespaces affect networking, how privilege affects risk, and how to troubleshoot in an evidence-driven order. Completed guides use runnable examples, comparisons, diagrams, cautions, cleanup steps, and official references; `content/docs/buildkit/index.mdx` is a representative example.

## Navigation is part of the domain model

There are two metadata levels:

- `content/docs/meta.json` gives the curriculum title and orders all 22 sections.
- `content/docs/<section>/meta.json` gives the section's Vietnamese display title and explicitly orders its pages.

Every current section directory and MDX file is represented in these arrays. Fumadocs uses the metadata to build the page tree in `src/app/docs/layout.tsx`. A file can exist and compile yet still be misplaced or absent from intended navigation if metadata is not updated correctly.

The root `content/docs/index.mdx` is a source page, but `/` currently redirects directly to `/docs/bat-dau/`. Readers can still reach the root docs page through `/docs/` if it is linked or entered directly.

## Current inventory

At initialization, the working tree contains 258 MDX files: one root curriculum page plus 257 pages distributed across 22 sections. A page with only frontmatter is treated here as a placeholder. This produces 77 substantive pages and 181 placeholders.

### Completed sections

| Order | Source directory | Display title | Pages | Status |
|---:|---|---|---:|---|
| 1 | `content/docs/bat-dau/` | Bắt đầu | 7 | Substantive |
| 2 | `content/docs/nen-tang-container/` | Nền tảng container | 11 | Substantive |
| 3 | `content/docs/cai-dat-va-moi-truong/` | Cài đặt và môi trường | 8 | Substantive |
| 4 | `content/docs/docker-cli/` | Docker CLI | 12 | Substantive |
| 5 | `content/docs/images-va-dockerfile/` | Images và Dockerfile | 16 | Substantive |
| 6 | `content/docs/buildkit/` | BuildKit và Buildx | 10 | Substantive |
| 7 | `content/docs/container-lifecycle/` | Container lifecycle | 12 | Substantive |

The 76 section pages above, plus the expanded root `content/docs/index.mdx` in the current working tree, make up the 77 substantive pages.

### Structured placeholder sections

| Order | Source directory | Display title | Pages |
|---:|---|---|---:|
| 8 | `content/docs/storage/` | Storage và dữ liệu | 11 |
| 9 | `content/docs/networking/` | Networking | 14 |
| 10 | `content/docs/docker-compose/` | Docker Compose | 15 |
| 11 | `content/docs/registry-va-distribution/` | Registry và distribution | 10 |
| 12 | `content/docs/security/` | Security | 15 |
| 13 | `content/docs/tai-nguyen-va-hieu-nang/` | Tài nguyên và hiệu năng | 10 |
| 14 | `content/docs/observability-va-troubleshooting/` | Observability và troubleshooting | 14 |
| 15 | `content/docs/production-operations/` | Vận hành production | 13 |
| 16 | `content/docs/development-va-cicd/` | Development và CI/CD | 13 |
| 17 | `content/docs/docker-swarm/` | Docker Swarm | 11 |
| 18 | `content/docs/kubernetes-va-docker/` | Kubernetes và Docker | 8 |
| 19 | `content/docs/docker-internals/` | Docker internals | 13 |
| 20 | `content/docs/he-sinh-thai-va-thay-the/` | Hệ sinh thái và công cụ thay thế | 8 |
| 21 | `content/docs/labs-va-case-studies/` | Labs và case studies | 13 |
| 22 | `content/docs/tham-khao/` | Tham khảo | 13 |

These pages are not empty files: each has valid title/description frontmatter and a planned position. For example, `content/docs/docker-compose/meta.json` progresses from Compose concepts and services through networks, volumes, secrets, interpolation, dependency handling, reuse, production patterns, and troubleshooting. The page bodies still need authoring.

## Roadmap encoded in the repository

The uncommitted curriculum landing-page expansion in `content/docs/index.mdx` states this priority order:

1. Docker Compose, Storage, and Networking for daily work.
2. Security and Observability for real-environment risk and diagnosis.
3. Registry, CI/CD, and Production operations for the build-to-deploy path.
4. Kubernetes, Swarm, internals, and alternatives for advanced study.

This is the clearest current source for business prioritization. Do not infer that sidebar order alone means all earlier placeholders must be completed before any later topic; use the landing-page priorities and explicit user direction together.

## Evolution pattern from git history

The repository began with the full curriculum skeleton and application shell in one initialization commit. Content has since been completed section-by-section:

1. Getting started
2. Container fundamentals
3. Installation and environment
4. Docker CLI
5. Images and Dockerfile
6. Container lifecycle
7. BuildKit and Buildx

Follow-up commits within a section have refined navigation, diagrams, callout rendering, and deprecated-page handling. This history suggests that a content batch should include a coherent section review, not only prose insertion: check section index, sequence, cross-links, diagrams, and metadata together.

## Stale documentation warning

`README.md` has not changed since the initial curriculum commit and still says the repository has 261 placeholder pages. Current source and history contradict that inventory. Continue to use the README for setup and high-level structure, but use `content/docs/`, metadata, and recent commits for content status.

## Guidance for curriculum changes

- Preserve Vietnamese as the lesson language and retain standard English technical identifiers where translation would be less precise.
- Start with the section `index.mdx` and `meta.json` to understand the local learning sequence.
- Read adjacent completed sections to maintain the progression and avoid re-explaining canonical concepts.
- Prefer one canonical explanation and link to it from later lessons.
- Keep hands-on examples safe: identify destructive host/data operations, state expected output, and provide cleanup where appropriate.
- Do not present a placeholder title/description as completed content.
- When removing deprecated topics, update metadata and inbound links in the same change.
- For labs and case studies, validate prerequisites against earlier curriculum sections instead of assuming external knowledge.

See [`authoring-workflow.md`](authoring-workflow.md) for the file-level workflow and [`../operations/quality-and-troubleshooting.md`](../operations/quality-and-troubleshooting.md) for validation.
