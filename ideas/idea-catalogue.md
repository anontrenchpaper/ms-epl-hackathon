# Idea catalogue: casting the wide net

> 50 ideas for the Microsoft Premier League Hackathon ("Inside the Game"), grouped into six themes. Each one is tied to (a) the five-stage pipeline the rules require, (b) what already exists (so we know what's new), (c) the agentic and Azure angle, and (d) the prize it helps win. The visual mockup for an idea is linked where one exists (`mockups/png/NN-*.png`).
>
> Shortlist, scoring and the recommended product: see [`shortlist-and-recommendation.md`](shortlist-and-recommendation.md).

## Legend

| Field | Meaning |
|---|---|
| **Stages** | Which of the rules' five stages the idea exercises: **In**gest · **Int**erpret · **Ex**plain · **Re**nder · **Pe**rsonalise |
| **Effort** | S = days · M = ~1 week for one person · L = most of the 3 weeks |
| **Wow** | ★ to ★★★★★: how strongly it lands in a 2-minute demo video |
| **New?** | How far beyond what leagues/broadcasters already ship (see `research/01–03`) |
| **Prize fit** | GP = Grand Prize · FDY = Best Use of Microsoft Foundry · ENT = Best Enterprise Solution · MAS = Best Multi-Agent System · ACN = Best Azure Cloud Native Integration |

## At a glance

| # | Idea | One-liner | Effort | Wow | Mockup |
|---|---|---|---|---|---|
| **A** | **On-screen intelligence** | *Broadcast overlays that explain, not just report* | | | |
| A1 | Moment Explainer | "Why it matters" lower-third with a probability swing, evidence and confidence | M | ★★★★★ | [01](../mockups/png/01-moment-explainer.png) |
| A2 | Control vs Chaos pulse | A 2-D match-state axis (momentum × chaos) with phase annotations | M | ★★★★★ | [02](../mockups/png/02-control-vs-chaos.png) |
| A3 | Pass Quality card | Distance, ball speed, completion probability, lines broken → difficulty 0–100 | S | ★★★★ | [01](../mockups/png/01-moment-explainer.png) |
| A4 | Speed-trigger player tags | AR name tags that appear only when a speed/distance threshold or record fires | S | ★★★ | [01](../mockups/png/01-moment-explainer.png), [04](../mockups/png/04-player-focus.png) |
| A5 | Shot DNA | Explainable xG → xGOT with factor bars and shot speed | S | ★★★★ | [16](../mockups/png/16-shot-dna.png) |
| A6 | Predict → Reveal alerts | Ring the likely runner *before* it happens, resolve "called it ✓ / ✗", keep a public model scorecard | M | ★★★★★ | — |
| A7 | The Pass Not Played | Counterfactual ghost pass: the option the model rated higher | M | ★★★★ | [19](../mockups/png/19-ghost-pass.png) |
| A8 | Pressure gauge & press escapes | Live pressure on the ball carrier, "escaped the press" moments, ball-recovery clock | M | ★★★ | [02](../mockups/png/02-control-vs-chaos.png) |
| A9 | Shape Shift | "What changed after X": before/after team shape at goals, subs, red cards | M | ★★★ | [15](../mockups/png/15-ask-the-match.png) |
| A10 | Milestone Radar | Records, firsts and streaks detected live against a synthetic history | S | ★★★ | — |
| A11 | Win-chance worm + "why" | A win-probability line that annotates *which* event moved it (no betting framing) | S | ★★★ | — |
| A12 | Game Rhythm heartbeat | Tempo as an ECG: passes/min, rhythm breaks, "the game just slowed down" | S | ★★★ | [02](../mockups/png/02-control-vs-chaos.png) |
| **B** | **Personalised fan experiences** | *Same intelligence, genuinely different experiences* | | | |
| B1 | Fan Lens modes | Casual · Analyst · Kids · Fantasy · Tactician · Audio-described from one cue stream | M | ★★★★★ | [03](../mockups/png/03-fan-lens.png) |
| B2 | Player Focus mode | Follow one player all match: dimmed world, live stats, micro-narrative | M | ★★★★★ | [04](../mockups/png/04-player-focus.png) |
| B3 | One-Metric mode | Pick one metric you care about; the whole overlay reorganises around it | S | ★★★ | — |
| B4 | Polyglot localisation | Not translation: register, idiom, RTL, glossary-safe names, neural voices | M | ★★★★ | [05](../mockups/png/05-polyglot.png) |
| B5 | Catch Me Up | Late-joiner recap ranked by impact, voiced, spoiler-safe, then back to live | M | ★★★★ | [10](../mockups/png/10-catch-me-up.png) |
| B6 | Ask the Match | Grounded second-screen Q&A (text + real-time voice) with event-ID citations | M | ★★★★ | [15](../mockups/png/15-ask-the-match.png) |
| B7 | Edge-of-Seat alerts | Personal thresholds ("my club's win chance swings > 15 pts") → push notifications | S | ★★★ | [18](../mockups/png/18-edge-of-seat.png) |
| B8 | Two Dressing Rooms | Partisan-but-fair narration for home and away fans, with a fairness check | S | ★★★ | [17](../mockups/png/17-auto-recap.png) |
| B9 | Funday / Kids cast | Re-render the match from tracking data in a toy-box style, with kid-level explainers | M | ★★★★★ | [11](../mockups/png/11-kids-funday.png) |
| B10 | Audio-described cast | Spatial play-by-play for blind/low-vision fans, haptics, density control | M | ★★★★ | [14](../mockups/png/14-accessibility-cast.png) |
| B11 | Fantasy live layer | Your (fictional) fantasy squad's live implications as on-screen cues | S | ★★★ | [18](../mockups/png/18-edge-of-seat.png) |
| B12 | Coach Mode | 10-second "what's a low block?" explainers and quizzes at stoppages | S | ★★★ | [11](../mockups/png/11-kids-funday.png) |
| B13 | Season storylines | Personal narrative arcs that follow "your" player or club across matches | M | ★★★ | — |
| B14 | Data-saver / text-first | A tiny live feed of narrative cues for low-bandwidth markets | S | ★★ | — |
| **C** | **Studio & production tools** | *For the gallery, the commentary box and the studio* | | | |
| C1 | Studio Copilot | Producer console: ranked story leads → fact-checked → approved → on air | M | ★★★★ | [06](../mockups/png/06-studio-copilot.png) |
| C2 | Commentator Whisper | Novelty-aware stat prompts for commentators, never repeating, always sourced | S | ★★★ | [06](../mockups/png/06-studio-copilot.png) |
| C3 | Half-time Pack | Three talking points + telestration board + counter-points, ready in < 60 s | M | ★★★★ | [13](../mockups/png/13-halftime-pack.png) |
| C4 | Telestration Agent | "Show me the press at 34 minutes" → finds the sequence, draws the board | L | ★★★★ | [13](../mockups/png/13-halftime-pack.png) |
| C5 | Recap Factory | Report, social cards, vertical short, audio, per-club and per-language, minutes after FT | M | ★★★★ | [17](../mockups/png/17-auto-recap.png) |
| C6 | Pundit Debate | Two grounded AI personas argue a moment; a moderator finds agreement; fans vote | M | ★★★★ | [12](../mockups/png/12-pundit-debate.png) |
| C7 | Graphics Director | An agent that decides which cue, when, for whom, and logs why | M | ★★★★ | [07](../mockups/png/07-agent-newsroom.png) |
| C8 | Trust Layer | Provenance ledger, verifier agent, confidence gating, audit trail, policy controls | M | ★★★ | [06](../mockups/png/06-studio-copilot.png) |
| C9 | Clip Factory | Vertical shorts with captions cut from the synthetic broadcast render | M | ★★★ | [17](../mockups/png/17-auto-recap.png) |
| **D** | **Synthetic data & vision** | *The data substrate (and a scoring criterion in its own right)* | | | |
| D1 | Scenario Lab | Prompt-to-match: an LLM writes the storyline, a simulator makes it physically plausible, validators keep it realistic | L | ★★★★★ | [08](../mockups/png/08-scenario-lab.png) |
| D2 | Synthetic broadcast renderer | Our virtual "main camera" render driven by synthetic tracking (no footage rights needed) | M | ★★★★ | [01](../mockups/png/01-moment-explainer.png) |
| D3 | Vision loop | Auto-eventing CV on synthetic footage, scored against perfect ground truth | L | ★★★★★ | [09](../mockups/png/09-vision-loop.png) |
| D4 | Fictional league universe | Clubs, players, histories, rivalries, so milestones and narratives have context | S | ★★ | `mockups/STORY_BIBLE.md` |
| D5 | What-If simulator | Monte-Carlo re-simulation from the live state ("had they kept 11 men…") | M | ★★★★ | — |
| D6 | Open synthetic dataset | Publish the dataset with a datasheet and validation report | S | ★★ | [08](../mockups/png/08-scenario-lab.png) |
| D7 | Feed guardian | Detects late, duplicate or out-of-order events and heals the stream | S | ★★ | [07](../mockups/png/07-agent-newsroom.png) |
| **E** | **Agentic platform plays** | *How it's built is part of what wins* | | | |
| E1 | Agent Newsroom | Specialised agents around a shared match-state blackboard, A2A handoffs, recovery | L | ★★★★ | [07](../mockups/png/07-agent-newsroom.png) |
| E2 | Match-State MCP server | Open MCP server for live football state: any agent (even GitHub Copilot) can query the match | S | ★★★ | [15](../mockups/png/15-ask-the-match.png) |
| E3 | Overlay Cue Contract | Renderer-agnostic, timecoded JSON cues + adapters (web, OBS/vMix, broadcast template) | S | ★★★ | — |
| E4 | Chaos-engineered resilience | Kill agents mid-match on camera; show the system degrade gracefully and recover | S | ★★★★ | [07](../mockups/png/07-agent-newsroom.png) |
| E5 | Evaluation harness | Faithfulness, hallucination rate, latency SLOs and a "model scorecard" via Foundry evals | M | ★★ | — |
| E6 | Agent Factory | GitHub Copilot coding agent turns an issue ("add a metric") into a new tested metric agent | M | ★★★ | — |
| **F** | **Moonshots** | *High-risk, high-memorability* | | | |
| F1 | Match sonification | Tension and rhythm rendered as ambient sound (also an accessibility channel) | S | ★★★ | [14](../mockups/png/14-accessibility-cast.png) |
| F2 | Decision explainer | Laws-of-the-Game-grounded explainer for fouls, offsides and cards (synthetic incidents) | M | ★★★ | — |
| F3 | Grassroots edition | The same pipeline on a phone-filmed amateur match (impact story, roadmap slide) | L | ★★★ | — |
| F4 | In-stadium AR | Point a phone at the pitch, see your personal overlays (concept slide only) | L | ★★★★ | — |

---

## A. On-screen intelligence: overlays that explain, not just report

The Premier League's closest existing product is the Genius Sports / PLP **Data Zone** L-bar: player IDs, speeds, pass accuracy, one featured match per round, *the same for every viewer, numbers without reasons* (`research/01`). Bundesliga Match Facts (AWS) is the most mature league programme, but it mostly puts a single number on air (`research/02`). The white space is **explanation, with evidence, timed for the screen**.

### A1. Moment Explainer ("why it matters")
- **What:** When a moment crosses a significance threshold (pass value, goal-probability swing, pressure release), a lower-third explains *why* in one sentence. It shows the before→after probability, the evidence ("214 similar passes"), the model and a confidence level, and the analyst can "hold for the maths".
- **Stages:** Int · **Ex** · **Re** · Pe. **Precedent:** IBM *Key Moments* (tennis), NBA *Insights* on Azure OpenAI, Bundesliga Win Probability (fires only on significant swings). **New here:** football, live, with evidence and confidence on screen.
- **Agentic angle:** Scout detects → Analyst quantifies → Storyteller words it → Editor verifies claims against the event IDs → Producer times it.
- **Azure:** Foundry Agent Service + Agent Framework workflow, Azure Web PubSub to the overlay client.
- **Prize fit:** GP, MAS, FDY. **Effort:** M. **Mockup:** 01.

### A2. Control vs Chaos pulse
- **What:** A two-axis match state. *Momentum* (who is on top: the Bundesliga's published recipe of a 5-minute decayed window scaled 0–10 per team) × *Chaos* (turnovers/min, average possession duration, transition count, possession-entropy, foul clusters). It shows as a bottom ribbon with shaded CONTROL/CHAOS phases, annotated by an agent ("58' Kingsmoor sub + high press → chaos index +38").
- **Stages:** Int · **Ex** · **Re**. **Precedent:** Bundesliga *Match Momentum* (Sept 2025), Opta momentum, NHL *Ice Tilt*. **New:** the *chaos* axis. The rules literally ask for "control vs chaos, tactical pressure changes, game rhythm patterns" and nobody ships it.
- **Agentic angle:** Tactician agent segments the match into phases and explains phase changes.
- **Azure:** Fabric Real-Time Intelligence (Eventhouse/KQL windowed aggregations) or a Functions/Container Apps stream processor.
- **Prize fit:** GP, ACN. **Effort:** M. **Mockup:** 02.

### A3. Pass Quality card and pass difficulty rating
- **What:** For notable passes: distance, ball speed, completion probability (xPass), lines broken, opponents bypassed, pressure on passer/receiver → a 0–100 difficulty rating with a grade.
- **Stages:** In · **Int** · Ex · Re. **Precedent:** Bundesliga *Passing Profile* (26 features per pass), open-source `unxpass`. **New:** "lines broken" and "opponents bypassed" computed from synthetic tracking, plus a plain-English grade.
- **Prize fit:** GP (it directly answers the rules' "pass quality" feature). **Effort:** S. **Mockup:** 01.

### A4. Speed-trigger player tags
- **What:** AR name tags appear only when something is worth tagging: sprint > 30 km/h, a season-best top speed, 10 km covered, shot > 100 km/h. They carry record context ("fastest by a Harbour City player this season").
- **Stages:** In · Int · **Re** · Pe. **Precedent:** Bundesliga *Speed Alert*, Data Zone tags. **New:** threshold + context + personal (your player gets tagged first).
- **Prize fit:** GP (the rules' "player identification" feature). **Effort:** S. **Mockups:** 01, 04.

### A5. Shot DNA
- **What:** Explainable xG → xGOT, with SHAP-style factor bars ("angle +, through-ball +, two defenders in lane −") and shot speed. Casual mode gets one sentence ("a good chance, not a great one").
- **Stages:** Int · **Ex** · Re. **Precedent:** AWS SageMaker Clarify xGoals explanations (blog only, not on air), LaLiga Goal Probability. **New:** explanations *on air*, in two registers.
- **Prize fit:** GP. **Effort:** S. **Mockup:** 16.

### A6. Predict → Reveal alerts (with a public model scorecard)
- **What:** Before the moment, ring the player most likely to run in behind or trigger the press. Five seconds later, resolve it: "called it ✓" or "✗". A running scorecard ("7/9 alerts right today") builds trust in the machine, which is explainability through *track record*.
- **Stages:** Int · **Ex** · **Re**. **Precedent:** Prime Video *Defensive Alerts* (NFL). **New:** football, with honest public calibration.
- **Agentic angle:** Forecaster agent + Referee/Judge agent that grades the forecasts.
- **Prize fit:** GP, FDY (Foundry evaluations as a live product feature). **Effort:** M. **Mockup:** worth adding in round two.

### A7. The Pass Not Played (counterfactual)
- **What:** Analyst mode shows the ghost of the option the model rated higher (e.g. through-ball +0.11 xT at 46% vs sideways +0.01 at 94%), with risk/reward language. It is phrased respectfully, as "the machine's view", not "he got it wrong".
- **Stages:** Int · **Ex** · Re · Pe. **Precedent:** Prime *Prime Targets* (open-receiver orb), Sky's 3D reconstructions in the studio. **New:** live and automated.
- **Prize fit:** GP. **Effort:** M. **Mockup:** 19.

### A8. Pressure gauge & press escapes
- **What:** Pressure on the ball carrier (opponents within 5 m, closing speed), "escaped the press" moments, and a ball-recovery clock after turnovers.
- **Precedent:** Bundesliga *Most Pressed Player / Pressure Handling / Ball Recovery Time*. **Prize fit:** GP. **Effort:** M.

### A9. Shape Shift ("what changed after X")
- **What:** After a goal, a sub or a red card, a before/after average-shape graphic plus one sentence ("Kingsmoor dropped 8 m deeper and went to a back five").
- **Precedent:** Bundesliga *Average Positions: Trends*. **Effort:** M.

### A10. Milestone Radar
- **What:** A Historian agent compares live events with a synthetic multi-season history: "first Harbour City midfielder to complete 3 line-breaking passes in a half since 2023". It needs D4 (the fictional universe). **Effort:** S.

### A11. Win-chance worm + "why"
- **What:** A win-probability line where every big swing is labelled with its cause. **Careful:** frame it as "chance to win", never as odds. The PL's data partner runs a betting business, and the rules forbid content that "reflects negatively on the goodwill of Microsoft". **Effort:** S.

### A12. Game Rhythm heartbeat
- **What:** Tempo as an ECG line (passes/min, time between actions), with rhythm-break detection ("the game's heartbeat dropped 40% after the booking"). It can fold into A2. **Effort:** S.

---

## B. Personalised fan experiences: "every match made for every fan"

The rules: *"the same intelligence reaches a data-hungry analyst and a casual fan as two genuinely different experiences"*. Leagues personalise **apps** (feeds, chat, ticker styles). Nobody personalises **the live on-screen layer** (`research/02` §9). Competing public repos already do "analyst vs casual + EN/ES" (`research/01` §1.7), so our version must go further: player focus, accessibility, localisation and catch-up, all from one cue stream.

### B1. Fan Lens modes
- **What:** One renderer-agnostic cue stream, many client-side renderings: Casual, Analyst, Kids, Fantasy, Tactician, Audio-described, Player focus, One-metric. Density, vocabulary, metrics and cadence change per mode (e.g. casual ≤ 1 text card per 2 minutes of open play).
- **Precedent:** ESPN's four Monday-night feeds, Second Spectrum Coach/Player/Mascot modes, the Bundesliga ticker's writing styles. **New:** per-viewer, on the live picture.
- **Agentic angle:** Personaliser agent turns each cue into persona variants *ahead of time* (pre-generation hides LLM latency).
- **Azure:** Cosmos DB fan profiles, Web PubSub groups per persona/language.
- **Prize fit:** GP, FDY. **Effort:** M. **Mockup:** 03.

### B2. Player Focus mode
- **What:** The fan picks a player. The world dims, their ring and live stats stay, a heat map builds, and a micro-narrative explains their off-ball game ("Vane can't decide whether to follow him"). Explicitly suggested in the rules.
- **Precedent:** F1 onboard/driver tracker, Player Cam experiments. **New:** synthetic tracking makes it possible for *every* player, in every match.
- **Prize fit:** GP. **Effort:** M. **Mockup:** 04.

### B3. One-Metric mode
- **What:** The fan picks one metric (pressing, sprint count, passes into the box…). Score bug slot, alerts and narrative reorganise around it. Cheap to build on B1. **Effort:** S.

### B4. Polyglot localisation
- **What:** Narratives localised, not just translated: register (tactical vs casual), local idiom ("pase entre líneas"), typography (French spacing), RTL layouts, glossary-locked names, neural voices. Framed around "fans in 189 countries" and the PL's Singapore DTC pilot (four official languages).
- **Precedent:** LaLiga × Microsoft Azure OpenAI subtitles/translation pilots, the DFL localised world-feed PoC (Aug 2026). **New:** per-fan localisation on the overlay layer, with terminology control.
- **Azure:** Azure AI Translator (custom glossary) + Azure OpenAI for register + Azure AI Speech neural voices.
- **Prize fit:** GP, FDY. **Effort:** M. **Mockup:** 05.

### B5. Catch Me Up
- **What:** Join late, get a 40-second voiced story of what you missed, ranked by impact (probability swings, xG), spoiler-safe if you're watching delayed, then dropped back into live with "what to watch now".
- **Precedent:** Prime *Rapid Recap*, Apple MLS Key Plays, IBM *Catch Me Up*, Peacock's AI recaps. **Prize fit:** GP. **Effort:** M. **Mockup:** 10.

### B6. Ask the Match
- **What:** A grounded second-screen assistant that answers "why did Kingsmoor switch to a back five?" with event-ID citations, a mini chart and a formation diagram. It also has a real-time voice mode. It uses MCP tools over live match state.
- **Precedent:** PL *Companion* (archive Q&A, not live in-match), IBM *Match Chat*, Bundesliga *Captain* (June 2026). **New:** live-state grounding with visible tool traces.
- **Azure:** Foundry agent + our Match-State MCP server (E2), gpt-realtime / Voice Live for voice.
- **Prize fit:** FDY, MAS. **Effort:** M. **Mockup:** 15.

### B7. Edge-of-Seat alerts
- **What:** Personal thresholds become push notifications: tension > 85, "my club's win chance swings > 15 pts", "my player does something top-1%", with quiet hours. It brings fans *into* the live match.
- **Azure:** Logic Apps or Functions + Notification Hubs. **Effort:** S. **Mockup:** 18.

### B8. Two Dressing Rooms
- **What:** Home-fan and away-fan narration of the same facts. Partisan in tone, identical in evidence, with an Editor agent running a fairness check. **Effort:** S. **Mockup:** 17.

### B9. Funday / Kids cast
- **What:** The same synthetic tracking re-rendered in a toy-box style with kid-level explanations ("a secret space between the red team's lines!") and a glossary.
- **Precedent:** ESPN/Disney *Funday Football* (Toy Story, Simpsons, Monsters Inc., built from live tracking in Unreal). **New:** football. Synthetic tracking means **no footage-rights problem at all**.
- **Prize fit:** GP (memorable demo moment). **Effort:** M. **Mockup:** 11.

### B10. Audio-described cast
- **What:** Spatial play-by-play for blind and low-vision fans ("ball with Marchetti, centre circle… sharp pass forward, 18 metres"), stereo-panned ball position, haptic pulses, a density control.
- **Precedent:** JioHotstar's audio-descriptive IPL feed. **New:** generated from data, any match, any language. It has strong real-world impact and is probably unserved in the PL (`research/01` §5).
- **Azure:** Azure AI Speech (SSML, prosody), Web Audio panning client-side. **Effort:** M. **Mockup:** 14.

### B11. Fantasy live layer
- **What:** Your (fictional) fantasy squad's live consequences as cues ("your captain: +9"). **Careful:** the official FPL Companion is a Microsoft Foundry product, so use a fictional fantasy game and don't use the FPL mark. **Effort:** S.

### B12. Coach Mode micro-learning
- **What:** At stoppages, 10-second explainers or quizzes tied to what just happened ("that was a low block, here's why"). **Precedent:** Bundesliga *Captain* Coach Mode. **Effort:** S.

### B13. Season storylines
- **What:** Persistent narrative arcs ("Calloway's drought", "Halvorsen under pressure"). The system tells you when tonight's match advances *your* storylines. **Effort:** M.

### B14. Data-saver / text-first
- **What:** A < 5 KB/min live narrative feed for low-bandwidth markets. It is the same cue stream rendered as text. **Effort:** S.

---

## C. Studio and production tools: for the gallery, the commentary box and the studio

Microsoft's shipped PL products are conversational (Companion, FPL Companion, Copilot on *The Overlap*). The PL took international production in-house this season (**Premier League Studios**), which makes operator-facing tooling a credible enterprise story (`research/01` §3, §7).

### C1. Studio Copilot
- **What:** A producer's console. Ranked story leads (score, novelty, confidence, provenance) → graphics rundown (Drafted → Fact-checked → Approved → On air) → program/preview monitors, with a compliance strip (fact-check, bias, brand-safe, latency). **Human approval required for on-air graphics.**
- **Precedent:** F1 *Track Pulse* (AWS) producer console, the Bundesliga *Data Story Finder*. **New:** agentic, evidence-gated, approval-first.
- **Prize fit:** ENT, GP. **Effort:** M. **Mockup:** 06.

### C2. Commentator Whisper
- **What:** A feed of short, sourced stat prompts for the commentary box, ranked by relevance and novelty, never repeating a stat the commentator already used. **Effort:** S. **Mockup:** 06.

### C3. Half-time Pack
- **What:** At 45', three talking points, each with one stat, evidence, a telestration board and a "counter-point" from a sceptic agent. Exportable as template JSON for the studio touchscreen. **Effort:** M. **Mockup:** 13.

### C4. Telestration Agent
- **What:** Voice command: "show me the press at 34 minutes" → the agent finds the sequence in the event log and renders a tactical replay with arrows and zones. **Effort:** L.

### C5. Recap Factory
- **What:** At full time: report, social carousel, vertical short, 60-second audio, per-club spins, six languages, fact-checked and published in ~3 minutes. **Effort:** M. **Mockup:** 17.

### C6. Pundit Debate
- **What:** Two fictional AI personas ("The Analyst" vs "The Old Pro") debate a moment, both grounded in the same evidence. A moderator agent summarises where they agree, and fans vote. It *visibly* demonstrates multi-agent collaboration in the product itself. **Never imitate real pundits.** **Effort:** M. **Mockup:** 12.

### C7. Graphics Director (with decision log)
- **What:** The agent that decides *which* cue to show, *when*, *for whom*, under dwell/cooldown/priority rules, and logs a rationale ("shown because the goal-chance swing was +14 pts and this viewer follows Harbour City"). `research/02` §9 flags this as white space.
- **Prize fit:** MAS, ENT. **Effort:** M. **Mockup:** 07.

### C8. Trust Layer
- **What:** A provenance ledger (every sentence → event IDs), a verifier agent, confidence gating (low-confidence cues held or marked "provisional"), Azure AI Content Safety, an audit trail, policy-as-config. **Prize fit:** ENT. **Effort:** M.

### C9. Clip Factory
- **What:** Vertical shorts with burnt-in captions, cut from the synthetic broadcast render around key events. **Effort:** M.

---

## D. Synthetic data and vision: the substrate, and a scoring criterion in itself

The rules require synthetic data, the official repo ships **no dataset** (only rules and learning playlists), and a judging question asks: *"Does the Project demonstrate creativity and optimized synthetic data creation?"* Most teams will hand-roll a random event generator. A credible engine is a moat (`research/04`).

### D1. Scenario Lab: prompt-to-match synthetic engine
- **What:** A Planner LLM turns a storyline ("a rain-soaked derby, early away goal, red card at 58', late home winner") into a match script. An agent-based simulator realises it as 25 Hz tracking + events, and validators compare distributions with published references (pass lengths, shots/match, PPDA, xG/shot) to give a realism score. Seeded, versioned, exportable.
- **Agentic angle:** Planner → Simulator → Validator → (repair loop) is itself a multi-agent workflow.
- **Prize fit:** GP (synthetic-data criterion), FDY. **Effort:** L (a "lite" version is M). **Mockup:** 08.

### D2. Synthetic broadcast renderer
- **What:** Our virtual "main camera" (pinhole projection, perspective-correct pitch, players and ground-plane graphics) rendering synthetic tracking. It already exists as `mockups/assets/pitch.js`. Animating it in the browser (or three.js) gives us a "live match feed" to overlay on, with **zero footage-rights risk**. **Effort:** M.

### D3. Vision loop: auto-eventing scored against ground truth
- **What:** Run detection (YOLO-family) → tracking (ByteTrack) → team classification → pitch homography → event classifier on the *synthetic* footage. Because it is synthetic, every frame has perfect labels, so we can publish precision/recall for pass detection and the speed error. It answers the rules' "auto-eventing" bullet credibly.
- **Azure:** Azure Container Apps serverless GPU (or Azure ML) for inference.
- **Prize fit:** GP, ACN. **Effort:** L. **Mockup:** 09.

### D4. Fictional league universe
- **What:** Generated clubs, players, bios, multi-season histories and rivalries (see `mockups/STORY_BIBLE.md`), so narratives and milestones have context. It is required anyway for IP safety. **Effort:** S.

### D5. What-If simulator
- **What:** From the current state, re-simulate the rest of the match N times under a counterfactual ("had they kept 11 men…") and explain the difference as a distribution. **Effort:** M.

### D6. Open synthetic dataset
- **What:** Publish the generated matches (CC BY 4.0) with a datasheet, a schema (SPADL/kloppy-compatible) and a validation report. It makes a good CV line too. **Effort:** S.

### D7. Feed guardian
- **What:** An ingest agent that detects late, duplicate or out-of-order events, quarantines them and heals the state. It is real-world plumbing that judges from production backgrounds respect. **Effort:** S.

---

## E. Agentic platform plays: how it's built is part of what wins

Two of five judging criteria (Technological Implementation, Agentic Design) plus three of four category prizes are about *how* it's built.

### E1. Agent Newsroom
- **What:** Specialised agents (Ingest, Scout, Analyst, Tactician, Historian, Storyteller, Editor, Producer, Localiser, Personaliser) coordinating through a shared match-state blackboard, with A2A handoffs, checkpoints, retries and template fallbacks. The ops view shows traces, per-hop latency and recovery.
- **Prize fit:** MAS (its criteria list reads like a spec for this: distinct roles, shared state, handoffs, recovery). **Effort:** L. **Mockup:** 07.

### E2. Match-State MCP server
- **What:** An open-source MCP server exposing live match state, metrics and cue publishing. Our agents use it, and so can any MCP client, including GitHub Copilot agent mode in VS Code ("@match what's the chaos index?"), which makes a fun dev-tool demo beat. **Prize fit:** FDY, MAS (it hits the "MCP integration" judging line). **Effort:** S.

### E3. Overlay Cue Contract
- **What:** A versioned JSON schema for timecoded overlay cues (match clock + PTS, template, payload, priority, TTL, persona/language variants, evidence, confidence) with adapters: our web overlay, an OBS/vMix browser source, a broadcast-template stub. This answers the rules' "in the way the platform's rendering partner handles overlays" without claiming any vendor integration. **Effort:** S.

### E4. Chaos-engineered resilience demo
- **What:** On camera, kill the Storyteller mid-match (Azure Chaos Studio or a fault-injection flag). Overlays keep flowing on template text, then upgrade when it recovers. Ten seconds of video that *proves* "recovers from failures". **Effort:** S.

### E5. Evaluation harness
- **What:** Foundry evaluations for groundedness/faithfulness, hallucination rate, toxicity, translation quality and latency SLOs, run in CI on every PR against a fixed synthetic match. Surface a live "model scorecard" in the product (pairs with A6). **Prize fit:** ENT, FDY. **Effort:** M.

### E6. Agent Factory
- **What:** Use the GitHub Copilot coding agent to turn a templated issue ("add metric: progressive carries") into a new metric module + tests + docs via PR. It shows developer productivity at scale and uses GitHub hero tech authentically. **Effort:** M.

---

## F. Moonshots

- **F1. Match sonification:** tension and rhythm as an evolving ambient soundtrack. It is also an accessibility channel (pairs with B10).
- **F2. Decision explainer:** Laws-of-the-Game RAG explains synthetic fouls, offsides and cards in plain language. It matches the PL's 2026/27 transparency push (Ref Cam, KMI panel), but stay clearly synthetic and illustrative.
- **F3. Grassroots edition:** the same pipeline on a phone-filmed amateur match (film your own five-a-side, with consent). It is a powerful "real-world impact" roadmap slide.
- **F4. In-stadium AR:** your personal overlays through a phone camera. Concept slide only.

---

## Guardrails that apply to every idea

1. **Synthetic data only.** Fictional clubs, players and league; no real crests, kits, names or likenesses; no club or league marks in the demo video (rules §4.4, §4.7, §4.11).
2. **No betting framing.** "Chance to win", never odds (rules §4.4 content restrictions; the PL's data partner has a betting business).
3. **No impersonation.** Prebuilt neural voices only, never a cloned commentator or pundit; fictional personas.
4. **Evidence or silence.** No claim on screen without event IDs behind it; low confidence → hold or label "provisional".
5. **Renderer-agnostic language.** "Designed for the production path's rendering partner", never "integrates with <vendor>" unless it truly does.
