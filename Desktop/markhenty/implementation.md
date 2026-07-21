# Markhenty Consulting — Website Fixes & Refinement Plan

> **Saved inside the project folder** (`C:\Users\USER\Desktop\markhenty\implementation.md`)
> so it persists across sessions and server restarts.

---

## Context

This is a **Next.js** website for Markhenty Consulting — an African marketing & strategy consultancy.
The project lives at `C:\Users\USER\Desktop\markhenty`.

### Key Asset Locations

| Asset                                        | Path                                                                         |
| -------------------------------------------- | ---------------------------------------------------------------------------- |
| Warrior background (hero bg)                 | `public/images/background-warrior.png`                                       |
| Main mask PNG (hero left floating element)   | `public/images/main-mask.png`                                                |
| Markhenty logo                               | `public/images/markhenty-logo.png`                                           |
| People photo                                 | `public/images/people.png`                                                   |
| Drum art                                     | `public/images/drum-art.png`                                                 |
| Pot art                                      | `public/images/pot-art.png`                                                  |
| Jar art                                      | `public/images/jar-art.png`                                                  |
| African art                                  | `public/images/art.png`                                                      |
| Masks footer                                 | `public/images/masks-footer.png`                                             |
| African pattern tile                         | `public/images/pattern.png`                                                  |
| Icons (drummer, mascot, warrior, mask, drum) | `public/images/*-icon.png`                                                   |
| Structure reference                          | `markhenty-assets/structure.png`                                             |

### Files to Modify

| File                                  | Role                                       |
| ------------------------------------- | ------------------------------------------ |
| `app/_components/HeroSection.tsx`     | Hero section — main landing viewport       |
| `app/_components/Navbar.tsx`          | Top navigation bar                         |
| `app/_components/ServiceBlock.tsx`    | Individual service card blocks             |
| `app/_components/ServicesSection.tsx` | Wrapper for all service blocks             |
| `app/_components/WhoWeAreSection.tsx` | "Qui sommes-nous" section                  |
| `app/_components/ValuesSection.tsx`   | "Nos Valeurs" section                      |
| `app/_components/Footer.tsx`          | Footer with contact form                   |
| `app/globals.css`                     | Global CSS / design tokens                 |
| `app/_lib/data.ts`                    | All data: services, values, icons, contact |

---

## 🎨 CRITICAL RULE: Background Color

> **The site background is WHITE (`#ffffff`) throughout.**
> Do NOT change any section background color without explicitly asking the user first.
> This applies to: ServicesSection, WhoWeAreSection, ValuesSection, page body, etc.

---

## Problems & Confirmed Fixes

### 1. Hero Section — White Overlay Wash

**Problem:** The hero has a `from-white via-white/80 to-transparent` gradient overlay that is too opaque and washes everything out.

**Confirmed Fix (Sample Header 2):**
- Keep `background-warrior.png` as the right-side background (Maasai warrior, **stays in colour — not grayscale** — but desaturated in the actual image file)
- Reduce the white gradient so it **fades from white on the far left to transparent by the middle** of the image
- Logo blue box: top-left, flush with corner
- Title: **"MARKHENTY CONSULTING VOUS ACCOMPAGNE..."** — navy blue, centered horizontally, single line, font-size reduced to fit on one line
- Below title: scroll indicator arrow + "Nos métiers" label
- Bottom of hero: White strip with `pattern.png` tile + 5 blue filled circle icons with labels

### 2. Service Blocks — Completely Wrong Layout

**Confirmed structure (from structure.png + user confirmation):**

```
WHITE page background

Each service block layout:
┌──────────────────────────────────────────────┐
│ [ARTIFACT IMAGE]                             │
│  centered on TOP EDGE of blue box            │
│  (half outside/above, half inside the box)   │
├────────────────┬─────────────────────────────┤
│                │                             │
│   BLUE BOX     │   DARK/GREY BOX             │
│   (title)      │   (description text)        │
│                │                             │
│  blue overlaps │                             │
│  dark by ~20%  │                             │
└────────────────┴─────────────────────────────┘

- Alternates: blue LEFT on odd services, blue RIGHT on even services
- Artifact always on TOP CENTER edge of the blue box, whichever side it's on
- Blue box and dark box overlap horizontally by ~20%
- The dark box has a photographic/textured background image
- No overflow clipping — artifact must be fully visible above the cards
- White space between each service block
```

### 3. Navbar Links — Invisible on Hero

**Problem:** Nav links use `text-[#1a3a8f]` (navy) in transparent state — invisible against the light grey/white hero left side.

**Fix:** Keep `text-[#1a3a8f]` in transparent state (since the left side of the hero IS white/light, they WILL be visible). When scrolled → white bg → keep `text-[#1a3a8f]`.

### 4. Footer Background Opacity

**Fix:** Increase masks background image opacity from `opacity-[0.03]` to `opacity-[0.05]`.

---

## Detailed Implementation Steps

### Step 1 — `HeroSection.tsx` Full Rebuild

**Layout structure:**
```
┌─────────────────────────────────────────────────────────┐
│ [NAVBAR - fixed above]                                  │
│                                                         │
│  [main-mask.png]    MARKHENTY CONSULTING                │
│   floating left     VOUS ACCOMPAGNE...                  │
│   (coloured mask)   (navy blue, one line, centered)     │
│                                                         │
│                     ⌃ Nos métiers                       │
│                                                         │
│ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│ [WHITE PATTERN STRIP: 5 blue circle icons + labels]    │
└─────────────────────────────────────────────────────────┘

Background: background-warrior.png — right side, grayscale filter
White gradient: left 0% opaque white → right 50% transparent (ends at middle)
```

- Remove: `bg-[#f8f7f2]` cream background → use `bg-white`
- Reduce gradient: `from-white via-white/60 to-transparent` with `bg-gradient-to-r`
- Title: `text-[#1a3a8f]` navy, single line, `text-2xl md:text-3xl lg:text-4xl`, centered in the right column
- Nos Métiers strip: white background with `pattern.png` tile, blue filled circle icons, navy labels

### Step 2 — `ServiceBlock.tsx` Full Rebuild

**Key rules:**
1. `overflow: visible` on ALL parent wrappers so artifact is never clipped
2. Blue box and dark box are rendered as two adjacent divs, with the blue box offset to overlap the dark one by ~20% of the card height (using negative margin or transform)
3. Artifact image: `position: absolute`, `top: 0`, `left: 50%`, `transform: translate(-50%, -50%)` relative to the blue box → places it at the top-center edge, half outside
4. Alternates: odd = blue LEFT, even = blue RIGHT (artifact always follows the blue box)
5. White space (`mb-16` or `gap-16`) between blocks
6. Page/section background = **WHITE** (no dark overlay on ServicesSection)

### Step 3 — `ServicesSection.tsx`

- Change `style={{ background: '#0f172a' }}` → `style={{ background: '#ffffff' }}`
- Remove amber/blue decorative blurs (they glow against dark bg, look wrong on white)
- Section header text: change from `text-white` to `text-[#1a3a8f]`
- ⚠️ **MUST ASK USER before changing the background** — confirmed: white

### Step 4 — `Navbar.tsx`

- Logo blue box: positioned top-left, `absolute top-0 left-0`
- Nav links transparent state: `text-[#1a3a8f]` (keeps navy, visible on white/light hero left)
- Scrolled state: same `text-[#1a3a8f]` on white bg

### Step 5 — `Footer.tsx`

- Masks background: `opacity-[0.03]` → `opacity-[0.05]`

---

## Verification Checklist

- [ ] Hero: white bg left, warrior image right (desaturated), white gradient ends at middle
- [ ] Hero: floating main-mask.png on the left side
- [ ] Hero: navy blue title on ONE line, centered
- [ ] Hero: scroll arrow + "Nos métiers" label
- [ ] Hero: white pattern strip bottom with 5 blue circle icons
- [ ] Navbar: logo blue box top-left, navy links visible
- [ ] ServicesSection: WHITE background
- [ ] Service blocks: blue box overlaps dark box by ~20%, artifact at top-center edge of blue box
- [ ] Service blocks: alternates blue-left / blue-right
- [ ] Artifacts fully visible (no clipping)
- [ ] Who We Are section: (ask user before changing its background)
- [ ] Values section: white background, 3 blue circle icon cards
- [ ] Footer: masks bg at opacity-[0.05]
- [ ] No build errors (`npm run dev` runs cleanly)
- [ ] Site background = WHITE everywhere (no unauthorized color changes)

---

## Tech Stack Notes

- **Framework:** Next.js (App Router) with TypeScript
- **Styling:** Tailwind CSS v4 (via `@import "tailwindcss"` in globals.css)
- **Animation:** Framer Motion
- **3D Artifacts:** React Three Fiber + Three.js (`@react-three/fiber`, `@react-three/drei`)
- **Images:** Next.js `<Image>` component with `fill` prop for responsive images
- **Fonts:** Montserrat (Google Fonts, loaded in layout.tsx)

> **IMPORTANT:** This project uses a newer version of Next.js/Tailwind. Always check
> `node_modules/next/dist/docs/` before making framework-specific changes.
