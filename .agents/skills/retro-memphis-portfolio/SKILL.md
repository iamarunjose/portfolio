---
name: retro-memphis-portfolio
description: >-
  Enforces the 1980s Memphis graphic design and Neo-Brutalism design system for this portfolio project.
  Use this skill for every design, UI, layout, component, and styling change in this portfolio website development.
---

# Retro Memphis Portfolio Design System

This skill enforces the official **1980s Memphis + Neo-Brutalist** visual language, design tokens, typography, component rules, anti-patterns, and quality standards for all website development in this portfolio project. Activate and follow these rules for every design, UI, layout, and styling change.

---

## 1. Visual Identity

- **Core Aesthetic**: 1980s Memphis graphic design combined with Neo-Brutalism.
- **Surfaces**: Cream paper-like backgrounds (`#FFF7E8`) paired with vibrant horizontal section backgrounds.
- **Color Palette**: Saturated yellow, pink, teal, and cobalt blue with stark black ink accents.
- **Borders & Depth**: Thick black outlines (`#171717`) and hard offset shadows (zero blur).
- **Display Typography**: Bold oversized headings with playful overlapping color layers.
- **Supporting Text**: Monospaced supporting text (`Space Mono`) paired with a highly readable sans-serif.
- **Motifs & Patterns**: Geometric decorations, squiggles, halftone dots, and zigzag patterns.
- **Layout Structure**: Asymmetric magazine-like layouts with strong visual rhythm.
- **Graphics**: Flat illustrated artwork and retro computer graphics (window chrome, pixel/vector icons, vintage print framing).

---

## 2. Design Tokens

Always use the following canonical palette tokens (via CSS variables or utility classes):

| Token | Hex Value | Role / Usage |
| :--- | :--- | :--- |
| **Background** | `#FFF7E8` | Primary cream paper-like background surface |
| **Yellow** | `#FFDE43` | Saturated accent, section backgrounds, badges, button fills, heading layers |
| **Pink** | `#FF5793` | Saturated accent, rotated labels, interactive highlights, decorative shapes |
| **Teal** | `#38D8C4` | Saturated accent, horizontal section bands, card headers, badges |
| **Blue** | `#377AF5` | Cobalt blue accent, links, primary interactive panels, geometric motifs |
| **Ink** | `#171717` | Primary text, thick borders/outlines (`2px`–`4px`), and hard offset shadows |

### Recommended CSS Custom Properties

```css
:root {
  --color-bg: #FFF7E8;
  --color-yellow: #FFDE43;
  --color-pink: #FF5793;
  --color-teal: #38D8C4;
  --color-blue: #377AF5;
  --color-ink: #171717;

  --border-thick: 3px solid var(--color-ink);
  --shadow-hard-sm: 4px 4px 0px var(--color-ink);
  --shadow-hard-md: 6px 6px 0px var(--color-ink);
  --shadow-hard-lg: 8px 8px 0px var(--color-ink);
}
```

---

## 3. Typography

- **Heading Font**: `Archivo Black` or `Space Grotesk` (bold/black weights, uppercase or high-impact display styling, tight tracking, playful overlapping color offset layers).
- **Body & Supporting Font**: `Space Mono` (for metadata, tags, labels, captions, code, and supporting text) combined with a highly readable sans-serif for longer prose.
- **Hierarchy & Scale**:
  - Large, commanding display text that anchors asymmetric layouts.
  - High contrast between ultra-heavy display headings and crisp monospaced/sans-serif body text.
  - Accessible minimum font sizes (`>= 16px` / `1rem` for body text) and comfortable line heights (`1.5`–`1.65` for body, `0.95`–`1.1` for oversized headings).

---

## 4. Component Rules

- **Shadows**: Always use **hard offset shadows** (e.g., `box-shadow: 6px 6px 0 #171717`) rather than diffuse, blurred floating shadows.
- **Buttons**: Distinctive, colorful buttons (`#FFDE43`, `#FF5793`, `#38D8C4`, `#377AF5`) with visible thick `#171717` borders and hard shadows. Interactive press/hover states should crisp-shift the button position against the shadow (e.g., `translate(2px, 2px)` with reduced shadow offset).
- **Project Cards**: Styled like **vintage printed panels** or retro software windows—featuring thick black borders, hard offset shadows, framed illustrations/previews, monospaced metadata tags, and high-contrast color blocking.
- **Section Headings**: Pair bold oversized headings with **colorful rotated labels/badges** (e.g., `-2deg` to `3deg` rotation, `#FF5793` or `#FFDE43` background, `#171717` border, `Space Mono` text).
- **Responsiveness**: Fully responsive layouts across desktop, tablet, and mobile viewports. Magazine-style asymmetric grids on desktop must collapse cleanly into readable, well-spaced vertical flows on mobile without horizontal overflow.
- **Motion**: Restrained, snappy motion (`100ms`–`200ms` step or crisp cubic-bezier transitions) that reinforces tactile button presses and card interactions without reducing usability. Honor `prefers-reduced-motion`.

---

## 5. Strict Anti-Patterns (Avoid)

Never introduce any of the following styles or patterns:

- **Glassmorphism** (`backdrop-filter: blur()`, translucent frosted cards, subtle white borders).
- **Generic SaaS dashboards** (uniform rounded bento grids, muted slate/indigo palettes, metric sparkline widgets).
- **Apple-style minimalism** (stark white/gray surfaces, ultra-thin hairlines, oversized product mockups floating in void).
- **Corporate blue-and-white templates** (sterile enterprise layouts, stock photography).
- **Excessive gradients** (multi-stop mesh gradients, neon glow washes, soft color fades—stick to flat solid color fills and halftone/geometric patterns).
- **Generic AI-generated abstract blobs** (organic SVG blobs, blurry floating orbs).
- **Unnecessary 3D effects** (WebGL gimmicks, heavy perspective transforms, realistic drop shadows, skeuomorphic bevels).

---

## 6. Quality & Verification Workflow

For every page or component created or modified:

1. **Reference Comparison**: Always compare implemented pages against the uploaded design reference at both **desktop** and **mobile** resolutions.
2. **Responsive Layout Checks**: Verify that asymmetric compositions, oversized headings, rotated labels, and decorative Memphis geometry do not cause unintended horizontal scrollbars or clipped content on small screens.
3. **Accessibility & Readability**:
   - Ensure text remains crisp and readable against all colored section backgrounds (`#171717` ink on `#FFF7E8`, `#FFDE43`, `#38D8C4`, `#FF5793`; verify contrast ratios on `#377AF5`).
   - Maintain semantic HTML landmarks, heading hierarchy (`h1`–`h3`), keyboard focus rings (`outline: 3px solid #171717`), and accessible button/link labels.
4. **Functional Verification**: Confirm all interactive elements (navigation, buttons, project links, filters, forms) are fully functional across viewports.

