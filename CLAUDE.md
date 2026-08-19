# Irrigant / Helios — Landing Page

Single-file static site: `index.html` (self-contained — inline CSS + JS, no build step).
Real assets: `irrigant-logo.png`, `assets/logos/` (data-source logos).

## Design System
Always read `DESIGN.md` before any visual or UI change. Fonts (Geist / DM Sans /
JetBrains Mono), colors, spacing, motion, and the aesthetic direction live there.
Do not deviate without explicit approval. All numeric/model data renders in
JetBrains Mono — keep it that way.

## Notes
- Waitlist posts to Formspree (`xojpodak`). Contact: marcotrotta909@gmail.com,
  henrylachtur@gmail.com, (208) 994-8295.
- The hero product widget is an **illustrative** demo (synthetic model in
  `index.html` script), labeled as such. It is not a live prediction — keep the
  disclaimer if the logic changes.
- The widget has two panes: the forecast call on the left, an **Ask Helios**
  scripted chat on the right. Both are driven by the same `SCENES` array, so a
  scene's answer must stay consistent with the numbers its own scene produces.
  The thread clears when the field changes — never show an answer next to a
  different field's call.
- **Pricing carries no per-acre figure.** Both `index.html` and `pricing.html`
  say pricing is quoted per operation. Do not reintroduce a specific number
  (the old copy said ~$10/acre) without explicit approval.
- Data-source logos in `assets/logos/`: OpenET, NOAA, NASA, University of Idaho
  and Stanford are official files. `openet.svg` ships its wordmark white for
  dark backgrounds; ours is recoloured `#231f20` for the light page, and the
  untouched original is kept as `openet-on-dark.svg`. AgriMet publishes no
  downloadable logo, so it is a styled HTML wordmark (`.wm-agrimet`) in its
  brand colours — replace it with an `<img>` if an official file turns up.
- Logo heights are tuned per mark via the inline `--lh` custom property so the
  six sit on one optical baseline. Adjust `--lh`, not the box.
