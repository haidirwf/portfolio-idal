# Design System: Haidar Rauf Portfolio (Network Engineer & Tech Architect)

## 1. Visual Theme & Atmosphere
- **Atmosphere:** Art-Gallery Airy with Cockpit-Precise technical metadata. Dark-mode native, clinical, restrained, and modern.
- **Density:** 5/10 (Balanced for readability & network topology clarity)
- **Variance:** 7/10 (Asymmetric, left-aligned, track-tight headers with high-density tabular metadata)
- **Motion:** 6/10 (Fluid spring physics, subtle hardware-accelerated micro-animations)

## 2. Color Palette & Roles
- **Background Canvas:** Zinc-950 (`#09090b`) — Primary dark background surface
- **Card Surface:** Zinc-900 / Oklch-Card (`#18181b`) — Elevated card container surface
- **Primary Text:** White Ink (`#f8fafc`) — High-contrast primary headers and titles
- **Muted Foreground:** Zinc-400 (`#a1a1aa`) — Subtitles, paragraphs, and descriptions
- **Border Structural:** Zinc-800 (`#27272a`) — 1px subtle structural dividers and card borders
- **Primary Accent:** Slate Cyan / Emerald Neutral — Single accent for focus rings, status badges, and topology nodes

## 3. Typography Rules
- **Display / Headers:** `Geist Sans` — Track-tight (`tracking-tight`), heavy weight-driven hierarchy (`font-bold`).
- **Body Text:** `Geist Sans` — Relaxed leading (`leading-relaxed`), max-width 65 characters (`max-w-2xl`).
- **Monospace & Data:** `Geist Mono` (`font-mono`) — Strictly used for network protocols (`OSPF`, `EIGRP`, `BGP`), IP addresses, certification IDs (`2601NA9959`), timestamps, and tech tags.
- **Banned:** `Inter`, `Times New Roman`, generic system fonts, oversaturated text gradient fills.

## 4. Component Stylings
- **Buttons:** Tactile feedback on active click (`active:scale-[0.98]`). No neon outer glow. Outline and ghost variants for secondary actions.
- **Cards:** `shadcn/ui` Card composition (`border-border/80 bg-card/60 rounded-xl`). Used only when elevation communicates hierarchy.
- **Inputs & Search:** Left-aligned Lucide search icons, subtle focus rings (`focus:ring-2 focus:ring-primary/50`).
- **Badges:** `font-mono text-[10px] bg-primary/10 text-primary border-primary/20` for certifications and tags.
- **Modal Overlays:** `Glassmorphism` — `bg-background/80 backdrop-blur-sm` with custom spring animation for external link confirmation on mobile.

## 5. Layout Principles
- **Grid Architecture:** Asymmetric 2-column or 3-column responsive grids.
- **Mobile First:** Single-column collapse on screens `< 768px`. Touch target minimum `44px`.
- **Full Viewport:** `min-h-[100dvh]` to prevent iOS Safari viewport jumping.
- **Spacing:** Generous padding (`py-12 px-4 sm:px-6`).

## 6. Motion & Interaction
- **Spring Physics:** `stiffness: 100, damping: 20` for card hovers and modal entry.
- **Subtle Background Floating Icons:** Low opacity (`text-muted-foreground/15`) network engineering floating icons (`Router`, `Server`, `Wifi`, `Cpu`, `Globe`). Hidden on mobile screens (`hidden sm:block`) to prevent visual clutter.

## 7. Anti-Patterns (Banned)
- No emojis anywhere in UI text
- No `Inter` or generic serif fonts
- No pure black (`#000000`)
- No neon/purple outer glow shadows
- No oversaturated multi-color accents
- No 3-column equal card feature rows on mobile
- No AI copywriting clichés ("Elevate", "Seamless", "Next-Gen")
