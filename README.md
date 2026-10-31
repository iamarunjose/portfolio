# Arun Jose — 1980s Memphis & Neo-Brutalist Portfolio

Production-ready personal portfolio, research showcase, and MDX technical blog for **Arun Jose** (Software Engineer at Siemens Energy, Denmark; MSc Web Engineering, Technische Universität Chemnitz, Germany).

## Visual Identity & Design System

Enforced by the custom workspace Agent Skill [`.agents/skills/retro-memphis-portfolio/SKILL.md`](./.agents/skills/retro-memphis-portfolio/SKILL.md):

- **Aesthetic**: 1980s Memphis graphic design combined with Neo-Brutalism
- **Design Tokens**:
  - Cream Background: `#FFF7E8`
  - Saturated Yellow: `#FFDE43`
  - Saturated Pink: `#FF5793`
  - Saturated Teal: `#38D8C4`
  - Cobalt Blue: `#377AF5`
  - Stark Ink: `#171717`
- **Typography**: `Archivo Black` & `Space Grotesk` for high-impact display headings with pink/yellow offset layers; `Space Mono` for technical metadata/labels; `Plus Jakarta Sans` for highly readable body copy.

## Routes & Architecture

- `/` — Homepage (Hero with custom retro computer + portrait illustration, Featured Projects, Experience Timeline, Research Spotlight, MDX Technical Blog preview, About & 35mm Photography preview, Contact & CV callout)
- `/projects` — Detailed vintage printed project panels & architectural comparison matrix
- `/experience` — Interactive Siemens career chronology (Denmark, Germany, India) & TU Chemnitz MSc Web Engineering showcase
- `/research` — Master's Thesis (*Hybrid Semantic Framework for Export Control Compliance*), Hybrid RAG SVG pipeline diagram, Knowledge Graphs, NLP & Verifiable AI
- `/writing` & `/writing/[id]` — Retro MDX technical notebook with 4 working draft manuscripts (unpublished drafts omit publication dates by design)
- `/about` — Biography, Software Engineering Philosophy, Research Interests, and 35mm Photography Contact Sheet
- `/contact` — Direct channels (with placeholders for unverified contact URLs) and interactive message composer
- `/cv` — Print-ready (`@media print`) and downloadable Curriculum Vitae sheet
- `/rss.xml` & `/sitemap-index.xml` — Syndication & search indexing

## Development & Verification

Start the background dev server:

```bash
npx astro dev --background
npx astro dev status
npx astro dev logs
npx astro dev stop
```

Build and run the automated QA suite:

```bash
npm run build
npm run check
```
