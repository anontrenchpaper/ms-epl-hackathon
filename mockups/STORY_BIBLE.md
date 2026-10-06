# Mockup story bible

Every concept mockup uses the same fictional universe, so the deck reads as one story.
Everything is **synthetic and fictional**. There are no real clubs, players, crests, league marks or broadcaster brands, which keeps us inside the hackathon rules (synthetic data, no third‑party trademarks).

## The match

| | Home | Away |
|---|---|---|
| Club | **Harbour City** (HAR) | **Kingsmoor Athletic** (KMA) |
| Colour | Blue `#2f6bff` shirts, navy `#0e1a3a` shorts | Red `#e8434f` shirts, off‑white `#f4f1ea` shorts |
| Manager | Ines Halvorsen | Gareth Mole |
| Shape | 4‑3‑3, possession, patient build‑up | 4‑4‑2 mid/low block, switches to an aggressive high press after 58' |

- **Competition label:** "SYN" / *Synthetic League* (never "Premier League" inside a mockup frame)
- **Live state used in most mockups:** `HAR 1–1 KMA`, clock **67:12**
- **Goals:** 12' Castell (KMA 0–1) · 41' Achterberg (HAR 1–1) · 84' Calloway (HAR 2–1, the winner, for full‑time / recap mockups)
- **Other beats:** 58' KMA substitution (#10 Ferrante off, #14 Doyle‑Akande on) and switch to high press → "chaos" phase 58'–66' · 67' Marchetti's line‑breaking pass to Calloway (pass quality 82/100, goal chance 3% → 17%) · 71' Achterberg shot saved (xG 0.21, shot speed 104 km/h) · 76' KMA #6 Kalem booked · 79' KMA go to a back five

### Harbour City (blue)
`1 Nils Ortega (GK)` · `2 Jonah Varela (RB)` · `5 Marek Dunne (CB)` · `4 Reece Holloway (CB)` · `3 Sami Rook (LB)` · `6 Theo Marchetti (DM)` · `8 Arlo Mensah (CM)` · `10 Ezra Calloway (AM, the creative star)` · `7 Luka Brennan (RW)` · `9 Dami Achterberg (ST)` · `11 Kofi Lindqvist (LW)`

### Kingsmoor Athletic (red)
`1 Pieter Vos (GK)` · `2 Ollie Strand (RB)` · `5 Bastien Roux (CB)` · `6 Yusuf Kalem (CB)` · `3 Finn Harlow (LB)` · `7 Jory Pike (RM)` · `8 Idris Vane (CM)` · `4 Mateus Quill (CM)` · `11 Tomas Reyna (LM)` · `9 Rio Castell (ST)` · `10 Nico Ferrante (ST)` · sub `14 Remi Doyle‑Akande`

### Key numbers (keep consistent)
- Calloway: 8.9 km covered, 19 sprints, top speed **33.4 km/h** (season best), 54 touches, 9 receptions between the lines (league avg 4.1)
- Possession 58%–42% HAR; shots 11–7; xG 1.64–0.88 (at 67')
- Chaos index peaked at **74** (61'); control phases 0–57' and 67'+

## Personas (for personalisation mockups)
| Persona | Where | Language | Mode | Follows |
|---|---|---|---|---|
| **Priya** | Mumbai | Hindi / English | Casual | Harbour City, Calloway |
| **Diego** | Madrid | Spanish | Analyst | neutral, loves pressing data |
| **Amara** | Lagos | English | Fantasy manager | Calloway (captain), Castell |
| **Kenji** | Osaka | Japanese | Tactician | Kingsmoor |
| **Sam** | Leeds | English | Audio‑described (low vision) | Harbour City |
| **Leo (age 9)** | Manchester | English | Kids | Harbour City |

## Visual language
- Use `assets/theme.css` (tokens: `--lime #c8ff3d` primary accent, `--cyan #3ad7ff`, `--coral #ff5d6c`, `--amber #ffb648`, `--violet #9c8cff`, `--mint #4ff0b0`; ink `#070b17`).
- Fonts: Barlow Condensed (display, uppercase), Inter (UI), JetBrains Mono (numbers/data).
- Every frame is `.frame` (1920×1080). Bottom‑left `.mock-title` = "Concept NN · Name". Bottom‑right `.mock-note` = "Concept mockup · synthetic data · fictional clubs and players".
- `assets/pitch.js` gives `Pitch.broadcast(svg, {scene, dim, camera})` for a synthetic broadcast camera render (scenes: `linebreak`, `shot`, `press`, or a custom scene object `{ball:[x,y,z], home:[{n,x,y}], away:[...], camera:{pos,target,fov}}`), plus `Pitch.tactical(svg, {x,y,w,h})` for top‑down boards. See `01-moment-explainer.html` for usage.
- Explainability pattern: every AI claim shows **evidence** (count of similar events / event IDs), **model + confidence**, and a plain‑English **"why"**.
- No betting odds, no alcohol/gambling references, no real brands.
