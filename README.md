# SK-CERT CyberGame 2026 Showcase

> A detailed, in-page archive of cybersecurity challenge analysis, solution workflows, write-ups, flags, screenshots, code excerpts, and supporting artefacts from SK-CERT CyberGame 2026.

**Live website:** [itatipaul.github.io](https://itatipaul.github.io/)

**Project author:** [itatipaul](https://github.com/itatipaul)

## Overview

This repository contains the source code for a portfolio-style website documenting work completed during **SK-CERT CyberGame 2026**. The website transforms the original challenge archive into a readable, evidence-led case-study experience rather than a simple collection of external links.

Every challenge record is represented inside the webpage. Visitors can browse the full catalogue, filter by security domain and documentation status, and open an individual challenge to read the available material in context. Where the repository contains the relevant evidence, the case-study view presents the original challenge statement, write-up text, reasoning, commands, code, screenshots, supporting files, workflow evidence, and documented flag or result.

The site is intentionally transparent about coverage. If a challenge does not contain a write-up, screenshot, flag, or other supporting evidence in the source archive, the webpage labels that material as unavailable rather than inventing or inferring it.

## Challenge coverage

The showcase currently indexes **82 challenge records** across five technical domains:

| Domain | Focus areas represented in the archive |
| --- | --- |
| **Offensive Security** | Web, service, and application attack surfaces, including probing, exploitation, and validation workflows. |
| **Cryptography** | Encoding layers, flawed constructions, elliptic-curve puzzles, and RSA-focused problem solving. |
| **OSINT** | Open-source investigation involving targets, contextual clues, lore, travellers, and public information. |
| **Forensics** | Network signals, telemetry, volatile incidents, document analysis, and evidence extraction. |
| **Malware Analysis** | Static analysis, reverse engineering, executable inspection, payload behavior, and ransomware analysis. |

## Website features

### In-page challenge case studies

Challenge cards open into detailed in-page records. The reader keeps the challenge statement, workflow evidence, write-up content, screenshots, source excerpts, artefact context, and result information together so visitors can understand both the outcome and the method.

### Write-ups and source material

Readable Markdown, text, PDF-extracted content, source files, command output, and code excerpts are rendered inside the case-study reader whenever they are present in the repository archive. Long source material is preserved in a scrollable evidence panel for inspection.

### Flags and results

Repository-documented flags and result values are shown in a dedicated result panel. Each available flag includes a copy control and the source filename where it was detected. Challenges without an explicit documented flag are marked **Not documented**.

### Screenshot evidence

Available repository screenshots are displayed alongside the challenge record. Selecting an image opens a fullscreen viewer with:

- Captions based on the original repository path

- Zoom out and zoom in controls

- Current zoom percentage

- Reset zoom control

- Backdrop and close-button dismissal

- Escape-key support

### Reading accessibility controls

The detailed reader includes four text-size levels and a high-contrast mode for more comfortable long-form reading. Controls are keyboard accessible and the layout adapts for smaller screens.

### Search and filtering

The challenge catalogue supports:

- Free-text search across challenge titles, paths, families, and available descriptions

- Filtering by security domain

- Filtering by write-up availability

- Clear coverage counts showing how many records are currently displayed

- In-page inspection without requiring visitors to leave the website

## Technology

| Layer | Technology |
| --- | --- |
| Frontend | React 19 and TypeScript |
| Build tool | Vite 7 |
| Styling | Tailwind CSS 4 with project-specific CSS tokens |
| Icons | Lucide React |
| Routing | Wouter-compatible static application shell |
| Deployment | GitHub Actions and GitHub Pages |
| Content model | Repository-derived JSON data with local in-page rendering |

## Project structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Pages deployment workflow
├── client/
│   ├── index.html                  # Document shell and metadata
│   └── src/
│       ├── components/             # Shared UI and template components
│       ├── contexts/               # Theme context
│       ├── pages/
│       │   └── Home.tsx             # Main showcase and case-study reader
│       ├── index.css                # Enterprise visual system and reader styles
│       ├── main.tsx                 # React entry point
│       └── repositoryContent.json   # Extracted challenge and evidence model
├── server/                         # Template compatibility server code
├── shared/                         # Shared compatibility types/constants
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── vite.config.ts
```

The GitHub Pages workflow publishes the static frontend output from `dist/public`. The `server/` directory is retained for template compatibility and is not required by GitHub Pages at runtime.

## Run locally

### Requirements

Install the following before running the project:

- Node.js 20 or newer

- pnpm 10 or newer

- Git

### Install dependencies

```bash
pnpm install
```

### Start the development server

```bash
pnpm dev
```

Open the local URL printed by Vite, usually:

```
http://localhost:3000/
```

### Run checks

Type-check the project without emitting files:

```bash
pnpm check
```

Create a production build:

```bash
pnpm build
```

The frontend build is written to `dist/public`.

## GitHub Pages deployment

The repository includes `.github/workflows/deploy.yml`, which automatically builds and publishes the site whenever changes are pushed to the `main` branch.

The workflow performs these steps:

1. Checks out the repository.

1. Installs pnpm using the version declared by `package.json`.

1. Installs the locked dependencies.

1. Runs the production build.

1. Uploads `dist/public` as a GitHub Pages artefact.

1. Deploys the artefact using GitHub Pages.

To publish an update:

```bash
git add .
git commit -m "Update cybersecurity showcase"
git push origin main
```

Then open the repository’s **Actions** tab to monitor the build and deployment jobs.

## Content provenance

The website content was derived from the public SK-CERT CyberGame 2026 challenge archive and adapted into a standalone case-study presentation.

- [Original SK-CERT-CYBERGAME-2026 repository](https://github.com/itatipaul/SK-CERT-CYBERGAME-2026)

- [Published showcase](https://itatipaul.github.io/)

GitHub is used as the source repository and publishing platform. The published website is designed so visitors can read the challenge material, write-ups, workflows, flags, screenshots, and supporting evidence in-page without needing to navigate back to the source repository.

## Documentation and coverage policy

This showcase does not fabricate missing challenge details. A challenge may be present in the catalogue while having incomplete documentation. In those cases, the reader explicitly indicates which materials were found and which were not detected.

Flags are shown only when an explicit flag or result value is present in the extracted repository content. Supporting filenames and source paths are retained to make the evidence trail auditable.

## Status

The showcase is published and maintained as a static portfolio website. New write-ups, screenshots, corrections, and content improvements can be added by updating the repository-derived content model and pushing a new commit to `main`.

## Credits

Built as a personal cybersecurity competition showcase by **itatipaul**. The visual direction is a light enterprise case-study system designed to prioritize clarity, evidence, and technical reading comfort.
