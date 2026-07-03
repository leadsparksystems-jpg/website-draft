# LeadSpark Design System

> **For AI models and developers building this site.**
> Read this file **and** [`tokens.css`](./tokens.css) before writing any markup or
> styles. Every colour, size, and spacing value lives in `tokens.css` as a CSS
> custom property — **use the tokens, never hard-code raw values**.
>
> Source of truth is the Figma file `leadspark-project`
> (page *"Home Page - Actual Design"*). This document translates that design +
> the author's design notes into build rules. **Do not invent copy, headings,
> colours, or sizes that aren't defined here or in the Figma file.**

---

## 0. Core mental model

The site is built from **sections → grids → bentos → content wraps → content**.

```
section            (hero-section / universal-section)
└── main-grid      (CSS grid: 12×2 desktop, 8×6 iPad, 6×6 phone)
    └── bento      (hug-bento OR fill-bento — purely aesthetic box, NO padding)
        └── wrap   (content wrap — holds ALL padding + gaps)
            └── content (headings, paragraphs, buttons, images)
```

Two rules that explain almost everything:

1. **Bentos are aesthetic only.** They have a background, a radius, and they
   occupy grid cells. They carry **no padding**. All padding and internal gaps
   live in the **content wrap** inside them.
2. **One bento drives the grid.** The `hug-bento` sizes itself to its content;
   every `fill-bento` in the same grid then fills to match. See §2.

---

## 1. Sections

| Section | Role | Max height (desktop) | Max height (mobile) |
|---|---|---|---|
| `hero-section` | First section on every page | **86vh** | none (content-driven) |
| `universal-section` | Every other section | **100vh** | none (content-driven) |

- Sections are full-width; inner content is capped at `--content-max-width` (1300px).
- `card flip` sections are a `universal-section` variant containing flip cards (§6.3).

---

## 2. Grid system

The `main-grid` is the backbone. It appears as the parent of every bento layout
to keep the whole page on one visual rhythm.

**Fixed rules**
- `width: 100%; height: auto;` — spans the parent, height is content-driven.
- Always use `repeat(N, minmax(0, 1fr))` for **both** rows and columns. The
  `minmax(0, 1fr)` guarantees equal cells that size to the controlling bento.
- Gap and padding come from tokens: `--grid-gap`, `--grid-pad-x`, `--grid-pad-y`.

**Column / row counts (responsive)**

| Breakpoint | Columns × Rows |
|---|---|
| Desktop (≥992px) | **12 × 2** |
| iPad (≤991px) | **8 × 6** |
| Phone (≤767px) | **6 × 6** |

```css
.main-grid {
  display: grid;
  width: 100%;
  height: auto;
  grid-template-columns: repeat(var(--grid-columns), minmax(0, 1fr));
  grid-template-rows: repeat(var(--grid-rows), minmax(0, 1fr));
  gap: var(--grid-gap);
  padding: var(--grid-pad-y) var(--grid-pad-x);
}
```

### 2.1 Locked vs unlocked (combo classes)

`|locked` and `|unlocked` describe the grid's **rows**, not its columns.

- **`main-grid | locked`** — all rows are equal height, defined by
  `grid-template-rows`. Used when there is **one** hug-bento controlling the grid
  and the rest fill its cells. (e.g. the hero grid.)
- **`main-grid | unlocked`** — used when there are **two or more** hug-bentos and
  exact row height is not critical. Rows size to content. (e.g. a section with a
  title hug-bento plus a card hug-bento the other cards match.)

> The `|` in Figma layer names implies a **combo class** (a variant that changes
> one property). You may implement it however is cleanest in code; it does not
> have to be a literal CSS combo class.

---

## 3. Bentos

Two types only.

### `hug-bento`
- `height: auto` (hugs its content vertically), fills its column(s) horizontally.
- **This is the control bento** — it determines the grid's cell/row height, and
  therefore the height of every `fill-bento` in the same grid.
- Usually the most content-heavy box.
- There is normally **one** hug-bento per locked grid. If the author says
  "make X a hug-bento", make **only** X a hug-bento; everything else becomes fill.

### `fill-bento`
- `height: 100%; width: 100%` — fills the cell(s) it spans.
- All content inside **must fit** within it (it does not grow to fit content).

```css
.hug-bento  { height: auto; border-radius: var(--bento-radius); }
.fill-bento { height: 100%; width: 100%; border-radius: var(--bento-radius); }
```

- Spanning cells uses `grid-column: span N` / `grid-row: span N`.
- `fill-bento | green` = green variant, background `--color-green`, white text.

---

## 4. Content wraps

Wraps live **inside** bentos and own all padding + gaps. There are reusable
"main" wraps and a few unique ones. Typically **one parent wrap per bento**.

| Wrap | Used for | Token group |
|---|---|---|
| `hero_content-wrap` | Hero bento inner layout | `--hero-wrap-*` |
| `hug_bento-content-wrap` | Content of a hug-bento | (uses text-wrap tokens) |
| `fill_bento-wrap-small` | Reused in most small fill bentos; child elements also fill | `--fill-wrap-*` |
| `content-layout-wrap` | Groups text-wraps + button-wraps into a column | — |
| `text-wrap` | Wraps one heading/paragraph cluster | `--text-wrap-*` |
| `button-wrap` | Wraps CTA(s); `| right` aligns them right | `--button-wrap-*` |
| `center-content-wrap` | Centered stat/label cluster | — |
| `stacked-card-wrap` | Icon/image + heading + paragraph card | — |
| `hz-fill-wrap` | Horizontal fill row (text block in cards) | — |
| `horizontal-text-wrap` | Row on desktop, **stacks vertical on mobile** | — |

- `| centered` variants center their children.
- `stretch-wrap` must use `height: auto` on mobile so a hug-bento actually hugs.

---

## 5. Typography

Two families:
- **Bricolage Grotesque** — all headings and the CTA label.
  Lock variable-font axes: `font-variation-settings: var(--font-heading-variation)`.
- **DM Mono** — all paragraph / body copy.

### 5.1 The four heading types

There are **exactly four** heading types. **Do not create new ones.**

| Type | Font / weight | Desktop size | Case | Where used |
|---|---|---|---|---|
| **Hero heading** | Bricolage **Bold** | 72px | UPPERCASE | Hero section only (occasionally a large CTA section) |
| **Section heading** | Bricolage **SemiBold** | 38px | Capitalize | Most sections; both conversion + SEO headings |
| **Secondary / sub heading** | Bricolage **Medium** | 20px | Capitalize | Under hero/section headings; keyword-heavy; also on some cards (e.g. stats) |
| **Card heading** | Bricolage **Medium** | 24px | Capitalize | Smaller important bentos (visible on the canvas) |

Paragraph (not a heading): **DM Mono Regular 16px**, colour `--color-paragraph`.

Colours: headings use `--color-ink`; muted secondary headings use `--color-muted`;
on a green bento, headings are white (`--color-on-green`).

### 5.2 CRITICAL — semantic HTML vs visual headings

Visual heading style ≠ HTML heading level. The visual styles above are **classes**,
applied independently of `<h1>`–`<h6>`.

- **`hero-heading` is conversion copy — it is NOT the `<h1>`.**
- The **`<h1>`** is for crawlers: the **first `secondary-heading` on each page** is
  the `<h1>` (it sits under the hero heading and is keyword-rich).
- `<h1>`/`<h2>` tags are assigned for SEO, decoupled from visual size. Apply the
  visual class for looks and the semantic tag for structure, separately.

### 5.3 Responsive type

- Desktop uses fixed px (tokens).
- **iPad and phone use `vw`** (via `clamp()` in `tokens.css`) so type scales with
  the viewport — never px on mobile/iPad headings.
- Line-heights: hero 120%, section 110%, secondary 120%.
- The phone-mode px in the Figma *text* collection is intentionally ignored — the
  vw values are authoritative. (This applies to the text collection **only**;
  honour phone mode in all other collections.)

### 5.4 Paragraph blocks

`paragraph | blocks` — a paragraph with the `blocks` combo class is capped at
**`max-width: 50%` of its parent** in code (the ~500px cap seen in Figma is a
design-canvas approximation; use 50% in code).

---

## 6. Components

### 6.1 CTA button (`cta-button`)

Pill-shaped primary action. Two variants: Desktop and Mobile.

- Shape: `border-radius: var(--btn-radius)` (200px). Fill: `--color-ember`.
- Label: Bricolage **Medium**, **UPPERCASE**, colour `--color-on-ember`
  (dark green), letter-spacing `--tracking-button`.
- Trailing circular "arrow" chip on the right with an inset shadow.
- Shadows: `--shadow-button` (outer), `--shadow-button-arrow-inset` (arrow chip).
- Padding/gap/label-size switch by breakpoint via `--btn-*` tokens
  (desktop `pl 32 / pr 6 / py 6 / gap 16 / 16px`; mobile `pl 16 / pr 4 / py 4 / gap 12 / 11px`).
- Sits inside a `button-wrap`; `button-wrap | right` right-aligns it.

### 6.2 Page link (`page link`)

Secondary/text-style link used alongside the CTA (e.g. case-study sections).
Pair with `cta-button` inside the same `button-wrap`.

### 6.3 Flip card (`flip_card-{n}`)

- A card with a **flip animation on hover** that reveals hidden text; flips back
  on hover-out. Use **natural easing**.
- Default and flipped faces are both defined in the Figma design-system page.
- Front commonly shows a stat (e.g. a big number) + a `secondary-heading | white`
  and a "(Flip to learn more)" affordance.

### 6.4 Stat / center-content card

`center-content-wrap` → `text-wrap | centered` containing
`secondary-heading | centered` + `section-heading | green | centered` +
`secondary-heading | centered`. Centered stat cluster used in hero side cells.

### 6.5 Dark CTA card (`fill-bento | green`)

Full-width **dark-green** bento — background is `--color-ink` (#273730), *not*
`--color-green`; `--color-green` (#40775f) and `--color-light-brand` (#a9d8c0)
are used as inline **text** accents. Contains a soft-ember **star** icon, a large
cream `section-heading` (with `Free` highlighted in light-brand), a `text-wrap`
of bullet points divided by a `vertical-line`, and a right-aligned `cta-button`.
Text on this bento is cream (`--color-surface`).

---

## 7. Images

- **`eye-image`**: despite being "fill" in Figma, in code it must be
  **`height: 70%` of its parent** with **`width: auto`**. **Never stretch or
  warp it** — preserve aspect ratio.
- `LEADSPARK` logo banner: lives in a `logo-banner-wrap` fill-bento (vertical
  banner). On mobile hero, its inner container must be `position: absolute` so
  the tall image does not inflate grid row heights.

---

## 8. Responsive specifics (hero)

From the design notes, for the **mobile hero grid**:
- `grid-template-rows: repeat(6, minmax(0, 1fr))`.
- The hug-bento is the **hero content** bento; the fill-bento is the **LEADSPARK**
  bento.
- Hero content + LEADSPARK occupy **4 rows**; the bottom two bentos take **2 rows**.

---

## 9. Token quick-reference

All values below are CSS custom properties in [`tokens.css`](./tokens.css).

**Colour** — `--color-page-bg` `#d9d2ca` · `--color-surface` `#e5ded7` ·
`--color-ink` `#273730` · `--color-ember` `#e8a075` · `--color-ember-strong`
`#d8602f` · `--color-green` `#40775f` · `--color-paragraph` (ink 80%) ·
`--color-muted` (ink 60%).

**Type** — families `--font-heading` (Bricolage), `--font-body` (DM Mono);
sizes `--font-hero` `--font-section` `--font-secondary` `--font-card`
`--font-body-size`.

**Layout** — `--content-max-width` 1300px · `--grid-columns/-rows/-gap` ·
`--bento-radius` 8px · `--hero-max-height` 86vh · `--section-max-height` 100vh.

**Spacing** — `--hero-wrap-*` · `--fill-wrap-*` · `--text-wrap-*` ·
`--logo-wrap-*` · `--button-wrap-*`.

**Button** — `--btn-radius` 200px · `--btn-fill` · `--btn-pad-*` · `--btn-gap` ·
`--shadow-button` · `--shadow-button-arrow-inset`.

---

## 10. Open items to confirm (flagged assumptions)

These are **not** from the file — verify before treating as final:

1. **iPad spacing modes** — only Desktop + Phone spacing values were exposed in
   Figma; iPad currently inherits desktop. Confirm iPad-specific padding/gaps.
2. **Card-heading responsive sizes** — not present in the notes' responsive
   image; currently interpolated (`2vw` iPad / `2.8vw` phone).
3. **`clamp()` min/max bounds** on fluid type — sensible defaults, tunable.
4. **`text-wrap` phone bottom padding** — not in file; set to 24px.
5. **On-green foreground** — using `#ffffff`; confirm it isn't the cream surface.
