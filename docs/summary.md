# AI Workshops — Presentation Site

A single-page React + Vite marketing site for the 17-workshop AI programme described in
`workshops/`. Built to make a factory decision-maker curious and to sell the *format*,
without handing over the workshop content.

## Running it

```bash
npm install
npm run dev      # http://localhost:5180
npm run build    # production bundle into dist/
npm run preview  # serve the built bundle
```

No backend. No environment variables. React 19 + Vite 7 and nothing else — no UI kit,
no CSS framework, no animation library.

## Design language

The visual system is modelled on the JetBrains / TeamCity marketing pages:

| Element | Choice |
|---|---|
| Canvas | Near-black `#0b0b0f`, with two light "paper" sections for rhythm |
| Accent | One gradient — blue `#21b8ff` → violet `#9b5cff` → green `#00e8a2` |
| Display type | Inter 800/900, tracking down to `-0.05em`, very large headlines |
| Eyebrows & metadata | JetBrains Mono, uppercase, wide tracking |
| Geometry | 4px radii, 1px hairline grids, flat colour blocks, triangle marks |
| Motion | Restrained: hover lifts, one marquee, no scroll-jacking |

All colour, type and spacing decisions live as custom properties in
`src/styles/global.css`. Component styles sit next to their component
(`Hero.jsx` / `Hero.css`).

## Page structure

| # | Section | Job it does |
|---|---|---|
| 1 | Hero | The hook: *"Your team does not need an AI presentation. They need one hour and a real document."* Plus the free offer and four stats |
| 2 | Ticker | A marquee of the documents that actually hurt — SOPs nobody follows, the two-day KPI pack — so visitors self-identify |
| 3 | Problem | Two-column comparison: typical AI training vs. this programme |
| 4 | How it works | Four steps, with **step 2 (your preparation)** deliberately highlighted, plus an anatomy bar showing 30 of the 60 minutes are hands-on |
| 5 | Prep | The effort message in full: anonymized documents, 30–60 min per person, keep/remove rules |
| 6 | Catalog | All 17 workshops, filterable, expandable — teaser depth only |
| 7 | Deliverables | The six assets clients keep |
| 8 | Audience & tools | 11 departments, no technical background, works inside existing licences |
| 9 | Programs | Free / Core / Accelerator, with the free tier first |
| 10 | FAQ | Eight questions, led by *"Why do we have to prepare anonymized documents?"* |
| 11 | Contact | Form that composes a prefilled `mailto:` — no backend, nothing stored |

## How the content boundary is enforced

The site never renders workshop material. `src/data/workshops.js` is a hand-written
marketing layer; the source files in `workshops/` are not imported, parsed or bundled
anywhere. Per workshop it exposes only:

- a **hook** — one provocative line
- a **promise** — what changes afterwards
- 3 **outcomes** — results, phrased as deliverables
- the **artifacts** it feeds
- what the participant must **bring**
- duration, audience, track, price

Deliberately absent: the 60-minute agendas, the five exercises per session, every
prompt, the facilitator demos, the answer keys. Each expanded card closes with
*"Full agenda, exercises and facilitator prompts shared with booked cohorts"*, and
the catalogue intro says the same thing — so the omission reads as scarcity rather
than as a thin page.

## The "this needs effort from you" message

The brief asked that visitors understand preparation is required. It appears five
times, escalating:

1. **Hero** — "their own anonymized documents", underlined in accent green
2. **How it works, step 2** — the only step with a gradient top rule and a green
   *"Your effort. Non-negotiable."* badge
3. **Prep section** — a full section: the time budget, and a keep/remove rules card
   styled as a file
4. **Every workshop card** — an amber "You bring" block with a specific document
5. **FAQ, first two questions** — why it is required, and what counts as anonymized,
   including the blunt version: teams that skip it "get an interesting hour and
   nothing to file"

## Judgment calls you may want to change

- **Which workshops are free.** Workshop 01 (AI Foundations) and Workshop 09
  (Safe & Responsible AI Use), plus the 45-minute scoping call. Rationale: 09 is the
  one that builds trust with IT and Compliance, and giving it away costs little.
  Set via `price: 'free' | 'paid'` in `src/data/workshops.js`.
- **No prices shown.** Paid tiers say "Quoted" with a basis ("per department cohort",
  "per plant"). Add figures if you want to filter enquiries harder.
- **Placeholders to replace before launch:** `hello@ai-workshops.example`
  (`src/components/Contact.jsx`) and the `https://example.com/` canonical and
  `og:url` values in `index.html`.
- **No testimonials, logos or metrics.** Nothing was invented. The stat band uses
  only verifiable programme facts (17 / 60 / 6 / 11).
- **Cohort size (8–16) and preparation time (30–60 min)** are stated as firm
  numbers on the site; they are not in the source material, so confirm they match
  how you actually intend to run sessions.

## Code review pass

A senior review ran over the finished code; findings were applied.

**Fixed — correctness**

- Mobile menu could leave `body { overflow: hidden }` with no way to release it:
  opening the sheet below 1020px then crossing the breakpoint (rotating a tablet)
  hid both the sheet and the burger while the page stayed scroll-locked. Now closed
  by a `matchMedia` listener.
- `<select>` lost its custom caret on focus — the `background` shorthand was
  resetting `background-image`. Now `background-color`.
- The anatomy bar overflowed between ~720px and 1000px: the 8%-grow segments had
  roughly 24px of content box for their labels. Stack breakpoint raised to 1000px.

**Fixed — accessibility**

- Catalogue filters were `role="tablist"` / `role="tab"` with no tabpanels, which
  promises arrow-key navigation that did not exist and made `aria-selected` describe
  nothing. Now a `role="group"` of `aria-pressed` toggle buttons, and the result
  count is a `role="status"` so filtering is announced.
- Focus ring was invisible on the light sections (accent green is 1.5:1 against the
  paper background) and suppressed entirely on form fields with no replacement.
- Three contrast failures: input placeholders (2.6:1), the timeline minute labels
  over the gradient's violet stop (3.3:1), both now pass AA.
- Added a skip link, Escape-to-close with focus restore on the mobile menu,
  `aria-controls`, and a scrollable sheet so the CTA cannot be stranded off-screen
  in landscape. The ticker's duplicated marquee half is now hidden from AT instead
  of the whole band.

**Fixed — robustness and quality**

- `.section--paper` now remaps the dark-canvas tokens instead of overriding
  components one at a time, so any shared piece dropped into a light section cannot
  render white-on-white. The one deliberately dark card inside re-declares the dark set.
- Sticky offsets derived from a single `--hdr-h` token rather than three unrelated
  magic numbers.
- Google Fonts moved from a CSS `@import` to a preconnected `<link>`, removing a
  serialized round trip from the critical path.
- Added `color-scheme: dark`, Open Graph and canonical metadata, form `name` /
  `autoComplete` attributes, and a length cap on the note field (long `mailto:`
  bodies are silently dropped by some Windows mail handlers).
- Removed dead CSS and unused tokens; the fast-pilot set is now one `fastPilot`
  flag on the data instead of a hardcoded index list.

**Also changed during build-out:** the two hero/CTA glows were built with
`filter: blur(120px)` over ~1500px elements — replaced with stacked radial
gradients, which look the same and cost nothing to composite. The sticky header is
solid rather than translucent-with-blur, because a see-through bar washes out over
the light sections and made the white nav text illegible.

## Verified

- `npm run build` clean, no warnings (56 modules, 28.7 kB CSS / 235 kB JS, 6.5 kB +
  73 kB gzipped).
- Walked every section in Chrome at 1536px, and the hero, header, prep and catalogue
  at 390px and 760px.
- No horizontal overflow at any width tested (`scrollWidth` 1521 vs. 1536 viewport).
- Filtering, card expansion and the FAQ accordion all confirmed working, with correct
  `aria-pressed` / `aria-expanded` state.

## File map

```
index.html                  meta, fonts, favicon
vite.config.js              dev server on port 5180
src/main.jsx                entry
src/App.jsx                 section order
src/data/workshops.js       ALL copy — workshops, programs, FAQ, deliverables
src/styles/global.css       tokens, buttons, chips, typography, layout
src/components/*.jsx|.css   one component + one stylesheet per section
```

Editing copy means editing `src/data/workshops.js` only. Editing the look means
editing the tokens at the top of `src/styles/global.css`.


---
The site is running at http://localhost:5180 — open it in your browser.

What was built

A React 19 + Vite single-page site, JetBrains/TeamCity design language: near-black canvas, one blue→violet→green gradient, Inter 900 display type, JetBrains Mono eyebrows, hairline grids, two light "paper" sections for rhythm. No CSS framework, no UI kit.

Eleven sections, ordered as a sales argument: hero hook → a marquee of the documents that actually hurt → typical-training-vs-this comparison → the 4-step process → the preparation section → all 17 workshops (filterable) → the six deliverables → departments & tools → free/Core/Accelerator tiers → FAQ → contact form.

The content boundary holds. src/data/workshops.js is a hand-written marketing layer — nothing in workshops/ is imported or bundled. Per workshop the site shows a hook, a promise, three outcomes, the artifacts it feeds, and what to bring. The agendas, the five exercises per session, every prompt and the facilitator demos are absent, and each card says so: "Full agenda, exercises and facilitator prompts shared with booked cohorts."

The effort message escalates five times — underlined in the hero, a green "Your effort. Non-negotiable." badge on step 2 of the process, a full section with keep/remove rules styled as a file, an amber "You bring" block on every card, and the first two FAQs.

Judgment calls to check

- Free workshops: I made 01 (Foundations) and 09 (Safe & Responsible AI) free plus the scoping call — 09 buys trust with IT and Compliance cheaply. One field in the data file if you disagree.
- Placeholders to replace: hello@ai-workshops.example and the https://example.com/ canonical/og:url.
- Cohort size 8–16 and 30–60 min prep are stated firmly on the site but aren't in your source material — confirm they match how you'll run it.
- No testimonials, logos or client metrics: nothing was invented.

Code review

A senior review ran and its findings are applied. One real blocker: the mobile menu could leave the page permanently scroll-locked — open it below 1020px, then rotate a tablet past the breakpoint, and both the sheet and the burger hid while body { overflow: hidden } stayed. Also fixed: the <select> lost its caret on focus (background shorthand resetting background-image), the timeline bar overflowed between 720–1000px, the catalogue filters claimed role="tablist" with no tabpanels, and three contrast failures. Plus a skip link, Escape-to-close with focus restore, and .section--paper now remaps tokens instead of overriding components.

Two things I changed while building: the hero/CTA glows used filter: blur(120px) on ~1500px elements — swapped for stacked radial gradients, identical look, no compositing cost; and the sticky header is solid rather than translucent, because a see-through bar washed out over the light sections and made the nav text illegible.

---
