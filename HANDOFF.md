# LeadSpark — Session Handoff

## What This Project Is
LeadSpark agency homepage for Irish trades businesses. Marketing landing page with a custom bento grid design system, built in **Next.js 15 + TypeScript + Tailwind CSS**.

---

## Branch
`claude/design-system-guidelines-32ecmp` on `leadsparksystems-jpg/website-draft`

---

## Project Structure
```
app/
  layout.tsx          ← fonts (Bricolage Grotesque, DM Mono), metadata, imports home.css + tokens.css
  page.tsx            ← composes all sections
  globals.css         ← Tailwind + token imports
components/
  sections/
    Hero.tsx
    Problem.tsx
    AuditCTA.tsx
    FlipCards.tsx     ← "use client" — React state for flip toggle
  ui/
    cta-button.tsx    ← reusable CTA button component
lib/
  utils.ts            ← cn() helper (clsx + tailwind-merge, for shadcn)
design-system/
  tokens.css          ← ALL design tokens (colours, spacing, typography, breakpoints)
  DESIGN_SYSTEM.md    ← full build rules, naming conventions, layout system
css/
  home.css            ← all page styles — consumes tokens.css variables
index.html            ← original static HTML (kept for reference, not the live version)
graphify-out/         ← knowledge graph of the codebase (run /graphify query "..." to explore)
```

---

## Design System Overview

### Figma Source
Key: `y9g1mGTTKJfEsvTowGqRIS` — file `leadspark-project`, page `Home Page - Actual Design`

### Layout System
- **`main-grid`** — 12-col desktop, 8-col iPad, 6-col phone CSS grid
- **`main-grid--locked`** — hero only, fixed proportional column widths
- **`main-grid--unlocked`** — all other sections, fluid columns
- **`bento`** — grid cell. Two types:
  - `fill-bento` — fills 100% height of its grid row
  - `hug-bento` — height determined by content
- **`universal-section`** — wraps all non-hero sections

### Breakpoints (from tokens.css)
- Desktop: `≥992px`
- iPad: `≤991px` — non-hero sections switch to flex column
- Phone: `≤767px` — 8px side padding, flip cards become grow/shrink

### Typography
- **Bricolage Grotesque** — headings and CTA labels
- **DM Mono** — paragraphs and body copy
- Four heading classes: `hero-heading`, `section-heading`, `secondary-heading`, `card-heading`
- **Important:** visual class ≠ HTML heading level. `hero-heading` is a `<p>`. First `secondary-heading` is the real `<h1>` for SEO.

### Colours (key tokens)
```
--color-ink: #273730          (dark green — primary text)
--color-surface: #e5ded7      (cream — card backgrounds)
--color-page-bg: #d9d2ca      (warm grey — page background)
--color-green: #3a5c4e        (brand green — accents)
--color-light-brand: #8bc4a8  (light green — stat values)
--color-ember: #c44b2b        (ember red — END highlight)
```

---

## Current Page Sections

### 1. Hero
- Logo banner (vertical LEADSPARK text), hero heading, H1, paragraph, CTA button, stat card
- `max-height: 86vh` on desktop
- Grid: `main-grid--locked`

### 2. Problem
- Intro text + CTA, then 4 numbered cards in a 2×2 grid on iPad/phone
- Cards: "01 Someone searches..." → "04 For those who do find you..."

### 3. Audit CTA (id="audit")
- Dark green bento (`fill-bento--green`)
- Free website & visibility audit offer
- All CTAs on the page currently link to `#audit`

### 4. Case Study + Flip Cards
- Arctic Wellness case study intro + testimonial
- Two flip cards: dark (€10k-30k stat) and cream (Over 80% stat)
- **Desktop:** 3D CSS flip — Y-axis (dark card), X-axis (cream card) on hover
- **Mobile:** grow/shrink — default 50/50, tapped card = 70/30
- React state manages open/close. `IntersectionObserver` resets on scroll-out.

---

## Key CSS Decisions (important context)

### Flip Cards
- Desktop flip is pure CSS hover (`perspective: 1200px`, `transform-style: preserve-3d`, `backface-visibility: hidden`)
- Mobile uses `is-open` class toggled by React. CSS `:has(.flip-card.is-open)` drives the flex ratios.
- Mobile sticky `:hover` is neutralised explicitly before `is-open` rules (otherwise touch devices keep hover state after tap)
- `touchend` + `e.preventDefault()` used for mobile tap (not `click` — fires late on mobile)

### Green Bento Text
- All text inside `.fill-bento--green` is forced white via a global rule in `home.css`
- Utility classes `.light-brand`, `.cream`, `.brand-green` override per-element within it

### Audit Card Padding
- Uses `--hero-wrap-pad-y` and `--hero-wrap-pad-x` tokens (not the smaller fill-bento tokens)

---

## Tools Installed (this cloud environment)
- **Graphify** — `pip install graphifyy` + `graphify install`. Knowledge graph in `graphify-out/`. Use `/graphify query "..."` to explore.
- **Headroom** — `pip install "headroom-ai[all,mcp]"` + `headroom mcp install`. Auto-compresses context, no command needed.
- **shadcn dependencies** — `clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react`, `@radix-ui/react-slot` installed. Ready for `npx shadcn@latest add <component>`. Note: `shadcn init` network call fails in this cloud env — add components manually or run init locally.

---

## What's Next (planned work)

### Immediate
- **Multi-step audit form** — the main CTA captures lead info. Fields: name, business type, website URL, location, what they're struggling with. Use shadcn Form + react-hook-form + zod for validation. This is the primary next build task.
- **Additional pages** — case study page (Arctic Wellness full story), pricing/packages page
- **CMS** — blog or testimonials (likely Contentful or Sanity)

### Design
- All remaining sections still need to be built (only 4 sections exist so far — Figma has more)
- Read `DESIGN_SYSTEM.md` and `tokens.css` before touching any styles — everything must use tokens

### Stack note
- Project is Now **Next.js 15 + TypeScript + Tailwind + shadcn-ready**
- Old `index.html` is kept for visual reference only — `app/page.tsx` is the live version
- Add new shadcn components with: `npx shadcn@latest add button` etc.

---

## How to Start a New Session
1. Read this file + `design-system/DESIGN_SYSTEM.md` + `design-system/tokens.css`
2. Read `css/home.css` for current styles
3. Check `app/page.tsx` and `components/` for current React structure
4. Run `/graphify query "..."` to explore the codebase knowledge graph
5. Build on branch `claude/design-system-guidelines-32ecmp`
