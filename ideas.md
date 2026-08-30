# SK-CERT CyberGame 2026 Showcase — Design Direction

## Three directions considered

### Theme Name: Quiet Command Center

Very Brief Intro: A light, executive-grade case-study interface that treats the repository like an evidence room: precise, calm, and easy to scan. Navy, paper white, and a single signal-blue accent create a credible security portfolio without leaning on cyberpunk tropes.

Probability: 0.07

### Theme Name: Field Notes / Red Team Ledger

Very Brief Intro: An editorial notebook treatment with warm stock paper, red annotation marks, and evidence-card layouts. Human and investigative, but more expressive and less corporate.

Probability: 0.04

### Theme Name: Control Surface

Very Brief Intro: A dark interface with fluorescent status accents and modular data panels, inspired by security operations centers and mission dashboards. High energy and technical, but intentionally not selected for this brief.

Probability: 0.02

## Selected approach: Quiet Command Center

### Design Movement
Swiss International Typographic Style, translated into a contemporary enterprise-security case study. The site should feel like an analyst's briefing: structured, confident, and legible before it is decorative.

### Core Principles

1. **Evidence over ornament.** Every visual element should help a reviewer understand the project, its scope, or the work behind it.
2. **Hierarchy before density.** Use a clear editorial rhythm, short labels, generous white space, and strong section anchors.
3. **Calm authority.** Light surfaces and restrained navy-blue accents should communicate trust without generic SaaS gloss.
4. **Inspectable work.** Repository links, categories, artifact counts, and challenge families should be easy to verify.

### Color Philosophy

Paper white and cool mist keep the page open and professional. Ink navy carries the primary authority of headings and navigation. Signal blue is reserved for calls to action, active states, and evidence markers, so it feels like a deliberate system indicator rather than decoration. A muted citron marker is used sparingly for small status highlights and the logo mark, bringing a human note to an otherwise disciplined palette.

### Layout Paradigm

Use a split-rail editorial layout rather than a centered marketing page. A narrow left rail provides the project label and section index on desktop; the main column carries the case study with staggered evidence blocks. On mobile, the rail collapses into a compact top bar and section index. The composition should feel like a portfolio brief being reviewed, not a landing page being sold.

### Signature Elements

1. A vertical project index with small section numbers and hairline rules.
2. Evidence cards with monospace metadata, tiny blue markers, and a raised paper surface.
3. A schematic “challenge map” motif: connected category nodes and a subtle coordinate-grid texture.

### Interaction Philosophy

Interactions should feel like inspecting a dossier. Hover states reveal a little more context through color and translation rather than loud effects. Repository links should be direct and clearly labeled. The section index should smoothly jump to content but remain instant and keyboard accessible.

### Animation

Use restrained entrance reveals only when the user has not requested reduced motion: fade-and-rise for major blocks, 30–60ms stagger between related evidence items, and a 160ms ease-out for buttons. Avoid looping glows or typewriter effects. On hover, links may translate 2–3px or expose an arrow; cards can lift 2px with a soft shadow. Respect `prefers-reduced-motion` by removing nonessential transitions.

### Typography System

Display: **DM Sans** in 700/800 for confident headings with a contemporary enterprise tone.

Body: **Source Sans 3** in 400/500/600 for readable narrative copy and metadata labels.

Technical: **IBM Plex Mono** in 400/500 for repo paths, challenge IDs, and system-style annotations.

Hierarchy rule: oversized but compact page title; section headings should be strong and short; labels remain uppercase with increased tracking; body copy should never exceed a comfortable measure.

### Brand Essence

A verifiable field guide to one practitioner's SK-CERT CyberGame 2026 challenge work—built for technical reviewers who value clarity, evidence, and method.

Personality adjectives: precise, curious, composed.

### Brand Voice

Headlines are direct, specific, and evidence-led. CTAs say exactly what the next action is. Microcopy avoids hype and uses language such as “Inspect the write-ups,” “View repository,” and “Challenge families covered.”

Example line 1: **A working record of how the challenges were understood, tested, and documented.**

Example line 2: **Open the repository to inspect the reasoning, artifacts, and solution notes.**

### Wordmark & Logo

Use a compact symbol derived from a split shield and a cursor bracket: two offset navy planes forming a protected aperture, with a citron square acting as the “signal.” It must work without text at favicon size and beside the wordmark in the header. The wordmark itself uses a custom-spaced uppercase treatment rather than a default brand font.

### Signature Brand Color

**Signal Blue — #185ADB.** It is a clear, legible indicator color that feels technical and ownable without becoming neon.

## Content grounding notes

The repository is titled `SK-CERT-CYBERGAME-2026` and presents write-ups and solution artifacts for SK-CERT CyberGame 2026 challenges. The visible top-level challenge families are Offensive Security, Cryptography, OSINT, Forensics, and Malware Analysis. The repository README describes challenge text, write-ups, and supporting images/scripts/files; GitHub metadata observed during inspection shows 105 commits, 2 forks, 3 stars, and Python as the displayed language. The showcase must present these as repository evidence, not as unsupported competition rankings or claims.
