---
name: New API — document-first interface
description: Notion-inspired typography, calm document surfaces and precise controls across the entire frontend.
colors:
  primary: "#0075de"
  canvas: "#ffffff"
  ink: "#191918"
  muted: "#f7f7f5"
  secondary-text: "#6f6e69"
  border: "#e9e9e6"
  sidebar: "#f7f7f5"
  sidebar-active: "#eaeae7"
  sidebar-active-text: "#37352f"
  pale-blue: "#e7f3fe"
  secondary-action-text: "#005bab"
  input-border: "#d9d9d5"
  pale-green: "#e1f3e7"
  pale-sand: "#f6f3ed"
typography:
  display:
    fontFamily: "Inter Variable, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif"
    fontSize: "clamp(2.5rem, 5.9vw, 5.25rem)"
    fontWeight: 650
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Inter Variable, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    letterSpacing: "-0.011em"
rounded:
  sm: "0.225rem"
  md: "0.3rem"
  lg: "0.375rem"
  xl: "0.525rem"
spacing:
  control-gap: "8px"
  content: "24px"
  section: "80px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.lg}"
    height: "32px"
    padding: "0 10px"
  button-secondary:
    backgroundColor: "{colors.pale-blue}"
    textColor: "{colors.secondary-action-text}"
    rounded: "{rounded.lg}"
    height: "32px"
    padding: "0 10px"
  sidebar-item-active:
    backgroundColor: "{colors.sidebar-active}"
    textColor: "{colors.sidebar-active-text}"
    rounded: "{rounded.md}"
    height: "32px"
    padding: "8px"
  input:
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    height: "32px"
    padding: "4px 10px"
  badge-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.sm}"
    height: "20px"
    padding: "2px 8px"
  card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "16px 0"
---

# Design System: New API

## Overview

**Creative North Star: "The clarity of a document, the capability of an AI gateway."**

The user pinned Notion's public website as the reference. The implemented New API interface uses white space, black typography, blue primary actions and restrained pastel surfaces. Authenticated pages use a quiet document workspace with a warm gray sidebar.

The default theme shares this foundation across public pages and operational tools. Dark mode and explicit user theme, font, radius, density and content-layout preferences remain supported. The tokens above describe the default light theme and density; component overrides and user preferences can change their rendered values.

**Key Characteristics:**

- White document canvas
- Inter typography
- Blue actions
- Warm gray navigation
- Small semantic radii

## Colors

[theme.css](web/src/styles/theme.css) owns the shared semantic tokens. Blue identifies actions and keyboard focus; gray identifies navigation and selection. Success, warning and destructive colors keep their semantic meanings. The homepage pastel surface variables live in [notion.css](web/src/styles/notion.css); pale blue also backs the shared secondary action.

Dark mode uses `#191919` for the canvas, `#202020` for cards/sidebar, `#eeedea` for text and `#75baff` for primary actions. Dark primary text is `#152333`. Existing optional theme presets remain user choices.

**The Semantic Token Rule.** Reuse shared semantic variables so dark mode and saved theme preferences carry through new surfaces.

## Typography

Self-hosted Inter provides the default face, with native CJK fallbacks. [index.css](web/src/styles/index.css) loads the font assets; [theme-presets.css](web/src/styles/theme-presets.css) applies explicit Public Sans and serif preferences. The Anthropic preset defaults to serif. The resolver's `system` value uses the Inter-backed default stack, rather than bypassing it for the browser font.

Use regular weight for table values, medium weight for controls and semibold headings. Shared controls and table values use the small text size (14px at the default density); badges use 12px. Inputs use 16px on mobile and 14px from the 768px breakpoint. The hero uses the display token above, while its description uses 18px with a 1.7 line height, reducing to 16px below 768px. Keep code and identifiers monospace. Hero display sizes belong to marketing, not dense operational tools.

## Layout

The fixed public header spans the viewport, with a 1440px maximum inner wrapper and a 64px navigation row. The homepage has a centered hero, a 1040px workspace preview and 1120px content sections. The feature and setup sections use 80px vertical padding, increasing at desktop breakpoints. These marketing widths and spacing are surface choices, not requirements for operational tools.

Authenticated pages use the existing responsive sidebar and independently scrollable content. [layout-provider.tsx](web/src/context/layout-provider.tsx) defaults to the `sidebar` variant and `icon` collapse behavior; saved layout cookies take precedence. [theme-customization.ts](web/src/lib/theme-customization.ts) defaults to full-width content and the default preset, font, radius and density. Section titles have generous space above them; actions stay close to their heading.

Below 768px the illustrative preview sidebar disappears, headings scale down and action rows wrap. The hero preserves whole words, including the Chinese word 网关, through its `word-break: keep-all` rule. Real application tables retain their existing horizontal scroll or mobile-card behavior. Hidden public navigation is inert until opened.

## Elevation & Depth

Prefer flat surfaces and hairline separators. Shared cards use a one-pixel foreground ring; dropdown menus retain functional shadows and rings. This is not a global ban on elevation. Large decorative fields of glass, colored glows, grid overlays and gradient text are outside the default document language. Existing functional overlays keep their focus, viewport and scrolling behavior.

## Shapes

The default base radius is 0.375rem (6px with a 16px root). Semantic radii are multipliers of that base: small labels use 0.6, compact controls and sidebar items use 0.8, standard buttons and inputs use 1, and shared cards and dialogs use 1.4. User radius preferences remain authoritative. The homepage preview and feature panels have their own 10px corners. Round shapes remain appropriate for avatars and switch thumbs.

## Components

Reuse the existing business components and Base UI primitives. [notion.css](web/src/styles/notion.css) styles the homepage composition and shared browser surfaces; it does not replace route logic.

### Buttons

[button.tsx](web/src/components/ui/button.tsx) defaults to a blue primary button, 32px high with 10px horizontal padding, medium 14px text and the base radius. The secondary variant uses pale blue. Primary hover uses 90% primary color; keyboard focus uses a ring-colored border and a three-pixel ring at 50% opacity. Color transitions take 150ms; ordinary pressed buttons move down one pixel. Homepage hero actions explicitly increase to 40px high.

### Inputs / Fields

[input.tsx](web/src/components/ui/input.tsx) uses a 32px-high transparent field, an input-colored border, the base radius and 10px horizontal padding. Placeholder text uses the muted foreground. Focus changes the border to the ring color and adds a three-pixel inset ring at 50% opacity. [search.tsx](web/src/components/search.tsx) is an outline button that opens search; its placeholder uses the muted foreground without added text opacity.

### Chips

[badge.tsx](web/src/components/ui/badge.tsx) defaults to the primary variant, with a 20px height, small radius and medium 12px text. The secondary variant uses the secondary surface and text colors; semantic status colors are applied through existing variants or call-site overrides.

### Cards / Containers

[card.tsx](web/src/components/ui/card.tsx) uses the card surface, a foreground ring at 10% opacity and the extra-large radius. The default vertical padding and internal gap are 16px; content has 16px horizontal padding. Its small size reduces these to 12px.

### Navigation

[sidebar.tsx](web/src/components/ui/sidebar.tsx) uses neutral active states, the medium radius, 32px default item heights and 14px text. Active items use medium weight; keyboard focus uses a two-pixel sidebar ring. This shared navigation is distinct from the decorative homepage preview sidebar.

### Tables and workspace preview

[table.tsx](web/src/components/ui/table.tsx) uses 14px text, regular-weight cell values, tabular numerals, 40px header cells and 60px default body rows. [workspace-preview.tsx](web/src/features/home/components/workspace-preview.tsx) reuses Table, Badge and Tabs, labels its example data as Preview, translates its Protocol column, and supports mouse and keyboard tab selection. Preview rows override the shared row height to 46px.

[data-table-view.tsx](web/src/components/data-table/core/data-table-view.tsx) establishes the named `data-table` inline-size container. [table-empty.tsx](web/src/components/data-table/core/table-empty.tsx) spans the columns with a 400px-high cell, then places a sticky, start-aligned empty block at `100cqi`, capped at the full table width. This keeps the message centered within the visible container while the table scrolls horizontally.

## Do's and Don'ts

### Do:

- Do use the shared tokens, a clear heading hierarchy, readable gray text and visible focus states.
- Do preserve translations, navigation destinations, loading/error states and legal attribution.
- Do label homepage example data as Preview.
- Do keep New API / QuantumNous branding and existing user theme preferences.

### Don't:

- Don't present this product as Notion.
- Don't add arbitrary saturated backgrounds, oversized pills or decorative gradients to the default document language.
- Don't invent customer or performance metrics.
