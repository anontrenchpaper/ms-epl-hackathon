# Shortlist, scoring and recommendation

> Input: the 50-idea catalogue ([`idea-catalogue.md`](idea-catalogue.md)) plus research reports 01–07. Output: a scored shortlist, four flagship product concepts, one recommendation with MVP cut lines, a 3-week plan and the decisions to make tomorrow.

## 1. What the research changed

1. **The median entry already exists, and it's public.** Ten or more competitor repos appeared on day one. The common template is *multi-agent pipeline + fact-checker + analyst/casual personas + translation + momentum + evidence links*. One even labels windows "controlled / contested / chaotic", and the strongest has a 5 Hz tracking simulator, an MCP server with 24 tools, and planted-truth evaluation (`research/06` §1.3, `research/07` §2.6). **Doing the brief well is now table stakes. We need at least two things nobody else has.**
2. **Most "suggested features" are already on PL broadcasts.** The Genius Sports/PLP **Data Zone** shows player tags, speeds, pass accuracy and shot speed; Bundesliga Match Facts has Speed Alert, Win Probability and Momentum. What's missing everywhere is *explanation, personalisation of the live picture, and trust* (`research/01` §7, `research/02` §9).
3. **Microsoft's own PL story is conversational so far.** The Companion, the FPL Companion on Microsoft Foundry, and Copilot on *The Overlap* are all chat. The July 2025 partnership language promised **"real-time data overlays and post-match analysis"** on Foundry, and nobody has shown that yet. We can build that promise (`research/01` §1).
4. **Synthetic data is unclaimed territory.** The official repo has no dataset (rules plus five learning playlists only), and the judging rubric explicitly scores "creativity and optimized synthetic data creation". StatsBomb open data is **Red**: its terms ban commercial use of anything derived from it, and winners license their entry to Microsoft/PL commercially (`research/04`).
5. **The judges' template is AI Dev Days 2026** (same criteria, same categories). Its winners shared a pattern: *deterministic numbers, LLM words, a verifier between them*, visible traces, real Azure deployment with IaC and observability, a judge-first README, and no overclaiming (`research/07` §4).

## 2. Our differentiators (things the median entry won't have)

| # | Differentiator | Why it's defensible | Ideas |
|---|---|---|---|
| **D-1** | **A synthetic *broadcast picture*, with overlays on it, per viewer.** | Competitors show dashboards and text. We show a believable broadcast frame from a virtual camera driven by synthetic tracking, with graphics anchored in 3-D on the grass. It's visually unforgettable and carries zero footage-rights risk. (The renderer already exists: `mockups/assets/pitch.js`.) | D2, B1, B2 |
| **D-2** | **A Director agent with broadcast grammar, plus a human approval console.** | Decides which cue, when, for whom, under dwell, cooldown, priority and safe-area rules, and logs *why*. Studio Copilot keeps a human in the loop. Nobody ships this (white space in `research/02` §9 and `research/06` §7b). | C7, C1, E3 |
| **D-3** | **A "why engine" with counterfactuals and a Moment Importance Index.** | Driver decomposition plus "the pass not played", ranked by importance = probability leverage × surprise × milestone rarity × persona affinity. It answers "explain why it matters" better than a label. | A1, A7, A10 |
| **D-4** | **Scenario-injectable synthetic engine with a validation report and a published dataset.** | "Rain-soaked derby, red card at 58', late winner": an LLM plans it, a simulator realises it, validators score realism. Planted scenarios double as ground truth for our detectors. | D1, D6 |
| **D-5** | **Inclusive personalisation beyond analyst/casual.** | Player-Focus mode, an audio-described cast and localisation (not just translation). Real-world impact judges remember. | B2, B10, B4 |

## 3. Scored shortlist

Scale 1–5. The first five columns mirror the judging criteria (20% each). "Edge" = differentiation vs the public competitors. "Fit" = feasibility for 2 people in 3 weeks. Total = sum of the first five + Edge + Fit (max 35).

| Idea | Tech | Agentic | Impact | UX | Category | Edge | Fit | **Total** |
|---|---|---|---|---|---|---|---|---|
| **C7 + C1 Director + Studio Copilot** | 4 | 5 | 5 | 4 | 5 | 5 | 4 | **32** |
| **A1 Moment Explainer (+ importance index)** | 4 | 4 | 5 | 5 | 4 | 4 | 5 | **31** |
| **D2 Synthetic broadcast renderer** | 5 | 2 | 4 | 5 | 4 | 5 | 4 | **29** |
| **B2 Player Focus mode** | 4 | 3 | 4 | 5 | 4 | 4 | 5 | **29** |
| **D1 Scenario Lab (lite)** | 5 | 4 | 4 | 4 | 4 | 4 | 3 | **28** |
| **E1 Agent Newsroom (+ E4 resilience)** | 5 | 5 | 3 | 3 | 5 | 2 | 4 | **27** |
| **A7 Counterfactual "pass not played"** | 4 | 3 | 4 | 4 | 3 | 5 | 4 | **27** |
| **A2 Control vs Chaos (decomposed)** | 4 | 3 | 4 | 5 | 4 | 3 | 4 | **27** |
| **B1 Fan Lens modes** | 3 | 3 | 4 | 5 | 5 | 2 | 5 | **27** |
| **B6 Ask the Match (MCP)** | 4 | 5 | 4 | 4 | 4 | 2 | 4 | **27** |
| **B10 Audio-described cast** | 3 | 3 | 5 | 4 | 3 | 5 | 4 | **27** |
| **B4 Polyglot localisation** | 3 | 3 | 5 | 4 | 4 | 2 | 5 | **26** |
| **B5 Catch Me Up** | 3 | 3 | 4 | 5 | 4 | 3 | 4 | **26** |
| **C5 Recap Factory** | 3 | 4 | 4 | 4 | 4 | 2 | 4 | **25** |
| **A6 Predict → Reveal + scorecard** | 4 | 3 | 4 | 5 | 3 | 4 | 2 | **25** |
| **B9 Funday / Kids cast** | 3 | 2 | 3 | 5 | 3 | 5 | 3 | **24** |
| **C6 Pundit Debate** | 3 | 5 | 3 | 4 | 3 | 3 | 3 | **24** |
| **D3 Vision loop** | 5 | 2 | 3 | 4 | 4 | 4 | 1 | **23** |

These are judgement calls meant to start tomorrow's discussion, not settle it.

## 4. Four flagship concepts (bundles)

Each concept answers all five stages. They differ in **where the hero is**.

### Concept 1 · "HALFSPACE": the explain layer between match data and every screen ⭐ *recommended*
*Working name: the half-space is where creative players live, between the lines. Check availability before committing.*
- **Hero:** the same 90 seconds of a synthetic match, explained live on a believable broadcast picture, personalised per viewer, with a producer approving what airs.
- **Spine:** Scenario Lab-lite → Event Hubs → metrics engine → **Agent Newsroom** (Scout · Analyst · Tactician · Historian · Storyteller · Editor) → **Director** → Overlay Cue Contract → Web PubSub → overlay player + Studio Copilot.
- **Surfaces:** Broadcast overlay player (Casual / Analyst / Player Focus / language / audio-described) · Studio Copilot (approve-to-air, commentator whisper, half-time pack) · Ask the Match (MCP) · Catch Me Up and the Recap Factory.
- **Covers:** D-1, D-2, D-3, D-4 (lite), D-5.
- **Mockups:** 01, 02, 03, 04, 06, 07, 10, 15, 16, 19, 20.

### Concept 2 · "TWIN PITCH": synthetic football, closed loop
- **Hero:** the data engine. Prompt a storyline → a simulated, rendered match → the vision model auto-events it → scored against ground truth → explained overlays.
- **Strength:** maximum Technological Implementation and synthetic-data score; deeply original.
- **Risk:** CV on synthetic video is the riskiest work in the catalogue; the fan experience gets thinner.
- **Mockups:** 08, 09, 01.

### Concept 3 · "FAN LENS": every match made for every fan
- **Hero:** a consumer streaming app. Modes, player focus, languages, audio description, kids re-render, catch-up, alerts, Ask the Match.
- **Strength:** best UX and real-world-impact story, a great video.
- **Risk:** closest to the competitor median (personas + translation); agentic depth is less visible.
- **Mockups:** 03, 04, 05, 10, 11, 14, 15, 18.

### Concept 4 · "STUDIO COPILOT": the enterprise production tool
- **Hero:** Premier League Studios' gallery. Ranked story leads, a fact-checked graphics rundown, approve-to-air, commentator whisper, half-time pack, audit log, SLAs.
- **Strength:** the strongest Enterprise prize story and a clear buyer (the PL took production in-house this season).
- **Risk:** less fan delight; the PL judges also care about fans.
- **Mockups:** 06, 13, 12, 17, 07.

### Why Concept 1
- It is the only bundle that hits **all five differentiators** while reusing the strongest pieces of the other three as *surfaces* rather than separate products.
- It turns the partnership's own promise ("real-time data overlays… on Foundry") into a working thing, and frames it as the live-match counterpart to the Copilot Companion. It doesn't compete with what Microsoft already shipped.
- It is honest about scope: Concepts 2–4 become stretch goals and roadmap slides, not commitments.

## 5. Category strategy (decide tomorrow)

A project can win one Grand Prize **and** one Category Prize, and "Adherence to Hackathon Category" is 20% of the score.

| Option | For | Against |
|---|---|---|
| **Best Azure Cloud Native Integration** *(my lean)* | Real-time sport is the archetypal event-driven workload: Event Hubs → Container Apps/KEDA → Cosmos change feed → Web PubSub → Durable Functions, plus Chaos Studio and Load Testing. Few competitors lead with it. It matches your goal of getting genuinely good at Azure deployment. | We must *show* operational excellence (SLOs, scaling, failure drills, IaC), not just list services. |
| **Best Multi-Agent System** | Our newsroom matches its wording (distinct roles, shared state, handoffs, recovery). | It is the most crowded category: nearly every competitor leads with multi-agent. |
| **Best Use of Microsoft Foundry** | Foundry Agent Service, evaluations, model router and tracing used deeply. Microsoft's FPL Companion precedent is Foundry. | Needs Foundry-specific depth to beat Foundry-maximalist entries. |
| **Best Enterprise Solution** | Studio Copilot + Trust Layer is a strong story. | Fan-facing delight then plays second fiddle. |

Judges can reassign categories, so build the agentic depth regardless. It also scores under the Agentic criterion for the Grand Prize.

## 6. MVP cut lines for Concept 1

| Priority | Scope |
|---|---|
| **Must** (feature-complete by Oct 22) | Synthetic simulator v1 with 3 injectable scenarios + a validation page · replayer → Event Hubs · metrics: pass difficulty, speed/distance triggers, momentum, chaos index *with causes*, importance index · agents: Scout, Analyst, Storyteller, Editor (verifier), Director, Personaliser/Localiser on Microsoft Agent Framework + Foundry · Overlay Cue Contract + Web PubSub · overlay player on the **animated** synthetic render with Casual / Analyst / Player Focus + 3 languages · Studio Copilot approve queue · Match-State MCP server + Ask the Match (text) · Bicep/azd + GitHub Actions + App Insights traces · judge-first README |
| **Should** | Counterfactual "pass not played" · Catch Me Up · Recap Factory (text + audio) · audio-described mode · on-camera resilience drill (kill the Storyteller) · Foundry evaluations in CI · Fabric RTI ops dashboard |
| **Could** | Vision loop on synthetic video · Funday/kids render · Pundit Debate · real-time voice Q&A · Edge-of-Seat alerts |
| **Won't** | Real footage, real clubs/players/marks, betting framing, cloned voices, real open-data redistribution |

## 7. Three-week plan (today is Tue 6 Oct; submission closes Tue 27 Oct, 23:59 PT)

| When | Person A, platform & Azure (you, if you want the Azure learning) | Person B, data, metrics & front-end | Together |
|---|---|---|---|
| **Wk 0** (Oct 6–8) | Azure subscription + budget alerts · Foundry project · `azd` skeleton · GitHub Actions with OIDC | Event schema (CDF/SPADL-compatible) · simulator spike · animate `pitch.js` in the browser | **Register** · pick concept, name, category · low-fi designs |
| **Wk 1** (Oct 9–15) | Event Hubs + replayer on Container Apps · Cosmos match state · Web PubSub · App Insights/OTel | Simulator v1 + 3 scenarios · metrics engine v1 · overlay player skeleton | First end-to-end "event → overlay" by Thu 15 · Reactor session Oct 14 (ACA/AKS) |
| **Wk 2** (Oct 16–22) | Agent Framework workflow (Scout→Editor→Director) · MCP server · Foundry evals in CI · Studio Copilot API | Persona/locale variants · Player Focus · Studio Copilot UI · validation page | **Registration closes Tue Oct 20, 12:00 PT** · Reactor Oct 21 (databases) · feature freeze Oct 22 |
| **Wk 3** (Oct 23–27) | Resilience drill · load test · cost check · README + architecture | Polish, accessibility pass, captions | Record the video Oct 24–25 · submit **Mon Oct 26** (one day of buffer) |

## 8. Decisions for tomorrow's session

1. **Concept and working name:** Concept 1 or a different blend?
2. **Declared category:** Cloud Native (my lean) vs Multi-Agent vs Foundry.
3. **Synthetic engine:** our own possession-chain simulator (recommended) vs Google Research Football. GRF was archived in Aug 2026, ships Windows-only wheels, and bundles Barcelona/Real Madrid textures we'd have to replace (`research/04` §5.1).
4. **Languages:** Python (Agent Framework, data science) + TypeScript/React (overlay, console)?
5. **Azure budget:** who owns the subscription, credits (Azure free account / Students / Visual Studio), a hard budget alert.
6. **Rules clarifications** to email the organisers (§11.6 allows written requests): who is "the platform's rendering partner"? May public CC BY 4.0 datasets be used *only to calibrate* the synthetic generator's distributions?
7. **Register both team members now.** Registration closes Oct 20 and the submission period has already started.
