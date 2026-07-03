# LeadSpark — Website

Agency website for LeadSpark. Design derives from the Figma file
`leadspark-project` (page *"Home Page - Actual Design"*).

## Design system (read this first)

Anyone — human or AI — building UI for this site must read, in order:

1. **[`design-system/DESIGN_SYSTEM.md`](./design-system/DESIGN_SYSTEM.md)** — the
   build rules: sections, grid, hug/fill bentos, content wraps, the four heading
   types (and the crawler `<h1>` rule), components, and responsive behaviour.
2. **[`design-system/tokens.css`](./design-system/tokens.css)** — every colour,
   type size, spacing, radius, and shadow as CSS custom properties, with
   Desktop / iPad / Phone breakpoint modes.

**Rules of the road**

- Use the tokens. Never hard-code a raw colour, size, or spacing value.
- Don't invent copy, headings, colours, or sizes not defined in the design
  system or the Figma file.
- Headings: apply the **visual** style (class) and the **semantic** tag
  (`<h1>`/`<h2>`) independently — see §5.2 of the design system.

## Breakpoints (Webflow defaults)

| Name | Width |
|---|---|
| Desktop | ≥ 992px |
| iPad | ≤ 991px |
| Phone | ≤ 767px |
