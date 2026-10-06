# 06: Competitive Landscape & Research: Football AI Analytics, AI Narrative, Explainable Metrics, Automated Recaps

*Compiled 2026-10-06, day 1 of the Microsoft Premier League Hackathon (submission window Oct 6–27, 2026).*

**Evidence legend** (each claim carries one tag):
- **[V]** Verified this session against the cited source. Either I opened the page or repo, or, where the domain was egress-blocked, I checked the claim against the search engine's extract of that exact page. All GitHub repo and licence claims, the official rules, and the Microsoft customer story were opened directly.
- **[U]** Unverified background knowledge (model cutoff June 2026), not re-checked this session. Check it before quoting it publicly. arXiv IDs tagged [U] are as recalled.

> **Research limits.** The shared web-search budget ran out after about 45 searches. Many domains (aws.amazon.com, bundesliga.com, arxiv.org, theanalyst.com, deepmind.google, statsbomb.com, devpost.com, techcommunity.microsoft.com, developer.microsoft.com) are blocked by the session's egress proxy. Public github.com pages, raw.githubusercontent.com and PyPI were reachable, so open-source and licence claims are [V]. **Disclosure:** before the coordinator restricted GitHub MCP tools to this project's repo, I ran a handful of GitHub MCP repository searches. They surfaced the MCP, FPL and LLM-commentary repos in §3 and two of the competitor repos in §1.3 (KumarPadigeri, match_pulse). Every repo cited was then read through its public github.com page, and I made no further GitHub MCP calls. The weakest areas are the vendor profiles tagged [U] in §2.1 and §2.5, and past hackathon winners in §6. A follow-up search pass should start there.

---

## 0. TL;DR

1. **The required feature list is already a shipped broadcast product.** The "Premier League Data Zone" (Genius Sports / Second Spectrum with Premier League Productions, Oct 2023) puts **player names, passing accuracy, shot speeds, sprints, total distance, final-third touches and pitch maps** into an L-bar on live PL broadcasts [V]. Speed/distance triggers and shot speed alone won't differentiate us. The value we can add is *explanation*, *personalisation* and *timing*.
2. **Generated recaps are commodity.** Sportradar's GenAI Automated Content API (recaps within 30 minutes, EPL rolling out in 2026) [V] and the DFL's Claude-on-Bedrock match reports (about 90% of editor time saved) [V] already do this. ESPN's 2024 AI recap left out Alex Morgan's retirement entirely [V]. That failure shows where the gap is: **context and milestones**, not prose.
3. **At least 8 competing entries for this hackathon are already public on GitHub** [V]. They have converged on one template: a multi-agent pipeline (ingest → metrics → narrative → persona → translator → fact-checker), evidence-linked claims, fan vs analyst views, multilingual output, and a momentum chart that is sometimes labelled "controlled/contested/chaotic". **That template is now table stakes** (§1.3).
4. **The judges explicitly score "optimized synthetic data creation"** under Technological Implementation (20%) [V]. A calibrated, scenario-injectable match simulator with planted ground truth is a scored differentiator, not just plumbing.
5. **What the industry and the competing entries do poorly:** (a) *counterfactual* "why" explanations, such as what the better pass was and what pressing changed; (b) **moment importance / leverage** (win-probability swing × surprise × milestone); (c) a **graphics-director agent** that decides *what* goes on screen *when*; (d) **physically grounded pass difficulty** from tracking (Spearman pass probability + xT gain); (e) **live, grounded Q&A over match state**. A review called the PL's own Copilot Companion "useless – at least for now" [V].
6. **Reusable building blocks are mature and mostly permissively licensed:** socceraction (MIT: xT, VAEP), un-xPass (Apache-2.0: pass success, selection and value), LaurieOnTracking (MIT: pitch control, EPV), kloppy (BSD-3), floodlight (MIT: kinematics, approximate entropy), mplsoccer (MIT), Microsoft Agent Framework (MIT). **Avoid copying AGPL code** (Ultralytics YOLO, LargeEventsModel) unless you accept AGPL obligations [V].

---

## 1. The hackathon itself: rules that shape positioning

### 1.1 Official rules (all [V], from [OFFICIAL RULES.md](https://raw.githubusercontent.com/microsoft/insidethegamehackathon/main/OFFICIAL%20RULES.md) in [microsoft/insidethegamehackathon](https://github.com/microsoft/insidethegamehackathon))

- **Dates:** registration Sep 29 to Oct 20, 2026 (12:00 PT). Hackathon period Oct 6 (09:00 PT) to **Oct 27, 2026 (23:59 PT)**. Judging Oct 27 to Nov 10. Winners announced by Nov 20.
- **Challenge text:** *"Football stories do not start and end with the scoreline… build AI-driven applications and agents that help transform synthetic football events into explainable match intelligence."* There are five required stages: Ingest, Interpret, Explain (*"why a moment matters rather than only reporting that it happened"*), Render (*"something that can sit on screen alongside the match"*), and Personalize (*"a data-hungry analyst and a casual fan as two genuinely different experiences"*).
- **Judging:** Stage 1 is pass/fail viability: it must fit the theme and use the hero technologies. Stage 2 has five criteria at **20% each**:
  - **Technological Implementation:** *"creativity and optimized synthetic data creation"*, software quality, leverage of hero technologies, well-documented code.
  - **Agentic Design & Innovation:** *"sophisticated agent orchestration, MCP integration, or multi-agent collaboration"*. *"Is the AI implementation novel, or does it meaningfully improve upon existing approaches?"*
  - **Real-World Impact:** production-deployable?
  - **UX & Presentation:** demo video clarity, *"balanced blend of frontend and backend"*.
  - **Category adherence.**
- **Prizes:** Grand Prize 1st ($4,000 cash per member plus a $1,000 ticket and $50 voucher) and 2nd ($2,500 cash plus ticket and voucher). Four category prizes at $1,500 cash per member: **Best Use of Microsoft Foundry**, **Best Enterprise Solution**, **Best Multi-Agent System** (*"distinct roles, coordinate through shared state and effective handoffs, recover from failures, and deliver an end-to-end outcome a single agent could not"*), and **Best Azure Cloud Native Integration** (AKS, Container Apps, Functions, Logic Apps).
- **Hero technologies:** Microsoft Foundry, Agent Framework, Azure MCP, GitHub Copilot Agent Mode, Fabric, GitHub SDK/CLI, Azure Apps & AI Services, Azure databases.
- **Data:** *"Projects must use synthetic, football-realistic data."* No footage is provided. Any footage you source must be fully licensed. The demo video must not include third-party trademarks or copyrighted music. **Open source is allowed** as long as the submission *"enhances and builds upon"* it and licences are respected.
- **Submission:** demo video **under 2 minutes**, public GitHub repo, and a written pitch. Teams can have up to 4 members.
- The resource playlists cover GitHub Copilot, Azure AI Foundry, Foundry Agents, Agentic Workflows and Data ([RESOURCE PLAYLISTS.md](https://raw.githubusercontent.com/microsoft/insidethegamehackathon/main/RESOURCE%20PLAYLISTS.md)) [V]. The Microsoft Reactor series page is [S-1709](https://developer.microsoft.com/en-us/reactor/series/S-1709/) [V].

**Implications:**
- Don't use real club or player names or crests in the demo (trademark risk). Invent clubs, or keep "favourite club" generic.
- Training a generator on StatsBomb open data is legally grey for anything beyond non-commercial research ([licence note](https://github.com/statsbomb/open-data)) [V]. Prefer calibrating a simulator to *published aggregate* distributions, or use CC-BY data such as the DFL IDSSE dataset (§3).

### 1.2 What the PL/Microsoft partnership already does, so judges will compare against it

- **Premier League Companion (Copilot):** natural-language Q&A over 30+ seasons of stats, about 300k articles and about 9k videos. Multilingual and voice support were planned ([Lowyat](https://www.lowyat.net/2025/357877/premier-league-copilot-companion-tool/), [Microsoft Source, Jul 1 2025](https://news.microsoft.com/source/2025/07/01/premier-league-and-microsoft-announce-five-year-strategic-partnership-to-personalize-the-fan-experience-with-ai-for-1-8-billion-people/)) [V].
- **Published architecture** ([Microsoft customer story, Nov 18 2025](https://www.microsoft.com/en/customers/story/25725-premier-league-azure-ai-foundry)) [V]:
  - Cosmos DB as the hub
  - Data Factory and Databricks ingesting from 10+ APIs
  - Azure OpenAI with AI Search RAG
  - **Semantic Kernel** orchestrating a multi-agent system
  - **Azure Managed Redis** for sub-500 ms latency
  - 8,000 transactions per second
  - 60 million users and a +20% year-on-year consumption increase
- **The Overlap (Gary Neville):** pundits use Companion insights in shows, from Feb 12, 2026 to season end ([Sky Media](https://www.skymedia.co.uk/news/microsoft-brings-ai-insight-to-football-conversations-with-the-premier-league-companion-on-the-overlap/)) [V].
- **Critique:** TechRadar called it *"useless – at least for now"* ([TechRadar](https://www.techradar.com/computing/artificial-intelligence/the-premier-league-companion-is-a-new-ai-powered-tool-for-soccer-fans-but-its-useless-at-least-for-now)) [V, headline only]. **The opening:** Companion is archive Q&A. It does not explain the live match on screen.

### 1.3 Competing entries already public (all [V], fetched Oct 6, 2026)

| Repo | What it does | Notable |
|---|---|---|
| [abhiiiesh/MatchMind](https://github.com/abhiiiesh/MatchMind) | 7 micro-agents (Ingestion, Metrics, Context/RAG, Narrative, Persona, Translator, Fact-Checker); GPT-4o; **Azure AI Speech** neural commentary in 6 languages; Cosmos DB RAG; Container Apps; Bicep | Uses StatsBomb open data plus 4 "PL fixtures". Targets Grand Prize and Multi-Agent. |
| [kaanoguzkan/insidethegamehackathon](https://github.com/kaanoguzkan/insidethegamehackathon) (also called "MatchMind") | Simulator producing **100 synthetic matches with 5 Hz tracking**, pitch control, offside lines, pass options; **"pressing collapse" detection evaluated against planted truth** (15/16 seeds); verifier with 100% narrative verification; Agent Framework + **MCP (24 tools)**; template fallbacks | **The strongest competitor seen so far.** It already does planted-truth evaluation. |
| [OlatunbosunIbiyinka/matcheyes](https://github.com/OlatunbosunIbiyinka/matcheyes) | Deterministic facts → moment/momentum detection → agentic investigation with *competing explanations* → evidence audit → personalisation; evaluation against planted ground truth | Strong on lineage and provenance |
| [mberry19932025/PRO-VISION](https://github.com/mberry19932025/PRO-VISION) | Fan, analyst and broadcast lenses; 9-event excerpt; **Phi-3.5-mini via Foundry Local**; EN/ES lower-thirds; "fan memories" export | On-device angle |
| [helenapedro/inside-the-game](https://github.com/helenapedro/inside-the-game) ("MatchLens AI") | Parallel lens agents, Coordinator, evidence-cited recap; Foundry hosted agents | Design phase |
| [tahawinner25-ai/…](https://github.com/tahawinner25-ai/inside-the-game-explainable-match-intelligence) | Next.js; seeded simulator; Zod-validated events; evidence panel with confidence and alternatives | Mobile-first |
| [bikilath/inside-the-game](https://github.com/bikilath/inside-the-game) | Pure-Python simulator (~2,500 events, `press_intensity`/`directness` knobs); field tilt; 5-minute windows labelled **controlled / contested / chaotic** using relative thresholds | Has already taken the "control vs chaos" label |
| [KumarPadigeri/inside-the-game](https://github.com/KumarPadigeri/inside-the-game) | Agent Framework multi-agent, fact-checked recaps, Docker | Early |

**Takeaway:** "multi-agent + fact-checker + persona + translation + momentum + evidence links" will be the median entry. We need at least two features that none of these have (see §7c).

---

## 2. Commercial landscape

### 2.1 Data, tracking and "intelligence" providers

**Stats Perform / Opta**
- **OptaAI Studio** launched Aug 2024 with three tools:
  - **Opta Search:** trend and record research.
  - **Opta Live:** low-latency live dashboard with "metrics and predictions".
  - **Opta Graphics:** AI-generated branded graphics.
  - Sources: [SVG Europe](https://www.svgeurope.org/blog/news-roundup/stats-perform-launches-ai-fuelled-optaai-studio/), [SVG](https://www.sportsvideo.org/2024/10/15/optaai-studio-boost-audience-revenues-with-ai-fueled-analysis-stats-and-insights/) [V].
- It powered **200+ data stories for BBC Sport at Euro 2024** and won *Broadcast Technology of the Year 2025* ([Stats Perform](https://www.statsperform.com/insights/broadcast-technology-of-the-year-award/)) [V].
- **Opta Vision** (tracking plus events) metrics ([Stats Perform](https://www.statsperform.com/resource/opta-vision-redefining-football-analysis-2025-26), [The Analyst](https://theanalyst.com/articles/opta-vision-stats-tracking-data-premier-league)) [V]:
  - **Pressure Intensity**
  - **Line-Breaking Passes**
  - **Shape Analysis**
  - **Pass Predictions** ("assesses the impact of every pass")
  - **Off-Ball Runs** (new 2025)
  - **Playing Styles**, which splits each possession into five rule-based phases (new 2025)
- **Opta "Momentum"** (part of Opta Predictions) assigns every on-ball action a value for how it changes scoring likelihood. Values are **summed per minute and compared between teams**, then shown as a bar per minute ([Flashscore explainer](https://www.flashscore.com/news/momentum/YgzwGjeU/), [Defector](https://defector.com/what-on-earth-is-match-momentum)) [V].
- Opta Power Rankings is a global club strength rating, not live momentum [U].
- **Opta Analyst** (theanalyst.com) is the consumer editorial brand [U].

**Genius Sports (owns Second Spectrum)**
- Acquired Second Spectrum, the EPL, NBA and MLS tracking provider, in 2021 ([Nasdaq PR](https://www.nasdaq.com/press-release/genius-sports-acquires-second-spectrum-the-official-data-tracking-and-analytics)) [V]. Official tracking provider to Football DataCo [V].
- **Premier League Data Zone** (Oct 2023, Premier League Productions) is a live L-bar showing **player names, passing accuracy, shot speeds, sprints, total distance, final-third touches, pitch maps and FPL updates**. Adopted by NBC, Sky, Optus, ESPN Brazil and Canal+ ([SVG](https://www.sportsvideo.org/2023/10/05/premier-league-productions-partners-with-genius-sports-to-deliver-premier-league-data-zone/), [Soccerscene](https://www.soccerscene.com.au/premier-league-productions-combine-with-genius-sports-to-bring-premier-league-data-zone/)) [V].
- **GeniusIQ** (Aug 2024) is the ML/GenAI platform underneath Data Zone ([BusinessWire](https://businesswire.com/news/home/20240808054635/en/Genius-Sports-Launches-GeniusIQ-to-Accelerate-the-AI-Revolution-in-Global-Sport)) [V].
- **BetVision** is a low-latency stream with augmentations and "touch a player to bet" ([Silicon Canals](https://siliconcanals.com/genius-sports-launches-betvision-a-game-changing-immersive-sports-betting-experience-including-nfl-live-game-video/)) [V]. Serie A betting-stream rights run through 2029 ([BusinessWire](https://www.businesswire.com/news/home/20250804278927/en/Genius-Sports-Secures-Exclusive-Official-Data-and-Betting-Streaming-Rights-with-Lega-Serie-A-Through-2029-to-Power-Next-Generation-BetVision-Product)) [V].
- PL **semi-automated offside** runs on GeniusIQ ([Sportcal](https://www.sportcal.com/newsletters/genius-in-as-semi-automated-offside-tech-supplier-for-epl)) [V].
- FANHub is Genius's fan-engagement/game platform [U].

**Hudl StatsBomb**
- **360** data: positions of all visible players at each event.
- **OBV** (On-Ball Value), a possession-state model of the change in probability of scoring minus conceding.
- **IQ**, the analytics platform.
- 3,400+ events per match ([Hudl](https://www.hudl.com/products/statsbomb)) [V].
- StatsBomb also published an LLM paper, **"TacticalGPT"**, on predicting tactical decisions ([PDF](https://blogarchive.statsbomb.com/uploads/2023/10/TacticalGPT-Uncovering-the-Potential-of-LLMs-for-Predicting-Tactical-Decisions-in-Professional-Football.pdf)) [V, title only].
- **Wyscout** (Hudl since 2019) is the video-scouting and event-data platform [U].

**SkillCorner**
- Tracking from **broadcast video** (claimed up to 98% accuracy vs in-stadium systems, 45+ competitions).
- **Physical** metrics: distance in speed zones, accelerations, PSV-99.
- **Game Intelligence**: off-ball runs, pressure, passing options ([skillcorner.com](https://www.skillcorner.com)) [V].
- Free **open data**: 10 A-League 2024/25 matches at 10 fps, dynamic events with EPV, pressure and difficulty, physical aggregates, phases of play, and 3D body pose. MIT-licensed repo, credit requested ([SkillCorner/opendata](https://github.com/SkillCorner/opendata)) [V].

**Other providers**
- **Kognia:** Barcelona-based. Automatic tactical tagging from video alone, "200+ situations per match", clips with tactical overlays, feedback in the coach's language. Clients include Barça and Villarreal ([Soccerscene](https://www.soccerscene.com.au/kognia-sports-using-artificial-intelligence-to-advantage/)) [V].
- **Spiideo + Signality:** Spiideo (AI auto-production cameras) completed its acquisition of Signality (optical tracking and data from video) in Dec 2024 ([SVG](https://www.sportsvideo.org/2024/12/19/spiideo-completes-acquisition-of-signality/)) [V].
- **Veo / Pixellot:** AI cameras for grassroots and semi-pro football with auto-follow, auto-highlights and basic stats [U].
- **Hawk-Eye (Sony):** VAR replay, goal-line technology and skeletal tracking in many leagues [U].
- **Track160 / Sportlogiq:** broadcast or single-camera skeletal and event extraction [U, not re-checked].
- **TRACAB (ex-ChyronHego):** optical tracking used by the DFL [U].
- **Sportec Solutions:** DFL subsidiary and official Bundesliga data provider. It co-built an AI live-commentary solution with AWS ([AWS blog](https://aws.amazon.com/blogs/media/revolutionizing-fan-engagementcer-bundesliga-generative-ai-powered-live-commentary/)) [V].
- **SciSports** (recruitment analytics, BallJames 3D tracking) and **Zone14**: [U], low confidence. Not relevant to broadcast storytelling.

### 2.2 League-owned explainable metrics (closest analogues to "explain why it matters")

**Bundesliga Match Facts (AWS)**
- Shot Speed, Keeper Efficiency, Ball Recovery Time, **Pressure Handling** (escape rate under pressure), **Win Probability** (from goal difference, time left, xG, Skill and Set-Piece Threat), Set Piece Threat, Skill, **Most Pressed Player**, Attacking Zones, Passing Profile, **Speed Alert**, xGoals, and **Match Momentum** ([Bundesliga](https://bundesliga.com/en/bundesliga/news/pressure-handling-win-probability-join-bundesliga-match-facts-powered-by-aws-21390), [BMF zone](https://www.bundesliga.com/en/bundesliga/stats/bmf-zone/2025-2026), [Match Momentum](https://www.bundesliga.com/en/bundesliga/news/bundesliga-match-facts-aws-match-momentum-34052)) [V].
- *Speed Alert is essentially our "speed trigger", already on air.*

**DFL generative AI**
- Automated **match reports** using **Claude on Amazon Bedrock**. Lambda feeds OpenSearch for prompt construction. Structure: intro, pre-game, 1st half, 2nd half, stats, MVP. Inputs include live-blog text, events *with win probabilities*, history and line-ups.
- Claimed **90% editor time saved**, plus 80% faster stories and 75% faster video localisation.
- **"MatchMade"** fan companion with text-to-SQL ([ZenML LLMOps DB](https://zenml.io/llmops-database/scaling-content-production-and-fan-engagement-with-gen-ai), [SVG Europe](https://www.svgeurope.org/blog/headlines/live-from-the-supercup-dfl-uses-ai-to-scale-content-creation/)) [V].

**LaLiga Beyond Stats (Microsoft Azure)**
- **50 new metrics**: positional data, carries, **pressure acts**, passing, transitions, goalkeeper, physical.
- 19 fixed cameras at 25 Hz, about **3.5 M data points per game**.
- Azure ML, Databricks and Power BI; English and Spanish ([SVG Europe](https://www.svgeurope.org/blog/headlines/laliga-and-microsoft-unveil-beyond-stats-football-analysis-portal/), [LaLiga](https://newsletter.laliga.es/global-futbol/laliga-and-microsoft-create-beyond-stats-a-statistics-system-that-enhances-the-fan-experience-thanks-to-big-data)) [V].
- **This is the direct Microsoft precedent. Cite it in the pitch.**

### 2.3 On-screen graphics stack (the "Render" stage in industry)

- **Vizrt:** Viz Libero (touchscreen tactical analysis for studio and half-time); **Viz Arena 6** (AR and virtual ads, AI calibration, "10× faster to air"); **Viz Flowics** (HTML5 data-driven live graphics) ([SVG, Sep 2025](https://www.sportsvideo.org/2025/09/16/vizrt-launches-ai-powered-advancements-to-speed-up-augmented-reality-sports-production/), [SVG Europe](https://www.svgeurope.org/blog/headlines/vizrt-targets-live-sports-with-new-viz-arena-enhanced-libero-platforms/)) [V].
- **Ross Video:** XPression real-time graphics and Piero sports analysis [U].
- **Chyron:** PRIME graphics [U].
- **Implication:** broadcasters drive templates from **data feeds** (JSON over HTTP or WebSocket) [U]. Producing a clean **overlay spec** (template id, data bindings, priority, dwell time, safe area) that a Flowics-style HTML layer can render reads as "production-ready" to judges.

### 2.4 Automated highlights and clipping

- **WSC Sports:** real-time AI highlights for Lega Serie A, a 5-year LFP deal (Ligue 1/2), and Premier Sports (LaLiga) ([WSC](https://wsc-sports.com/blog/news/lega-serie-a-utilizing-ai-technology-by-wsc-sports-to-create-real-time-highlights/), [SportsMint](https://sportsmintmedia.com/wsc-sports-to-develop-ai-powered-highlights-for-ligue-1-following-five-year-deal-with-lfp-media/)) [V].
- **Magnifi (VideoVerse):** CV, audio and NLP key-moment detection. Acquired by Media Minute in Sep 2025 ([The Desk](https://thedesk.net/2025/09/media-minute-acquires-videoverse/)) [V].
- **Auto-clipping by key moment is commodity.** *Ranking* moments per persona is less common.

### 2.5 AI narrative and commentary

- **IBM watsonx at Wimbledon:**
  - AI-generated spoken commentary on highlight reels.
  - **Catch Me Up** (2024): AI player-story cards.
  - **Match Chat** (2025): near-real-time Q&A built on **watsonx Orchestrate agents + Granite**, fine-tuned on "the language of Wimbledon".
  - Sources: [TechRadar](https://www.techradar.com/pro/wimbledon-2025-is-set-to-be-the-smartest-championships-yet-and-it-might-help-me-fall-in-love-tennis-again), [New Electronics](https://newelectronics.co.uk/content/blogs/wimbledon-embraces-generative-ai) [V].
  - Similar AI narration has run at the US Open and the Masters [U].
- **Bundesliga AI live commentary:** AWS with Sportec Solutions, real-time text commentary from live event data [V] ([AWS blog](https://aws.amazon.com/blogs/media/revolutionizing-fan-engagementcer-bundesliga-generative-ai-powered-live-commentary/)).
- **Ligue 1+ and CAMB.AI:** the 2026 Trophée des Champions (Jan 8, 2026) was billed as the first European match with **live AI-translated (dubbed) commentary** in Italian. It carried an on-screen caveat that quality may vary ([Ligue 1](https://ligue1.com/en/articles/l1_article_4006-2026-trophee-des-champions-to-become-first-european-football-match-with-ai-dubbed-commentary)) [V].
- **MLS NEXT Pro** demoed voice-preserving AI commentary in FR, ES and PT in Apr 2024 [U, search-tool summary only].
- **FootyHub TV** streams all 2026 World Cup matches on YouTube with fully AI commentators ([footyhub.tv](https://footyhub.tv/)) [V].
- **Sportradar GenAI Automated Content API:** live June 12, 2026. Previews 2 days before kickoff, **recaps within 30 minutes**, JSON keyed to Sportradar IDs, EN-US/UK, multilingual in premium tiers. EPL, LaLiga and Bundesliga roll out through autumn 2026 ([Sportradar changelog](https://developer.sportradar.com/sportradar-updates/changelog/genai-automated-content-api-now-available)) [V].
- **ESPN (Sept 2024):** AI recaps for NWSL and PLL with human review. Its launch post had a wrong record, and **the recap of Alex Morgan's final match didn't mention her** ([TPA](https://www.readtpa.com/p/espns-ai-fumble-how-robot-recaps), [AI Incident DB](https://incidentdatabase.ai/cite/785/)) [V]. **Lesson: milestones and human context must be first-class data.**
- **Twelve Football** (Sweden; David Sumpter):
  - **ScoutGPT** writes scouting reports and can be adapted to *match commentary and summaries* ([Training Ground Guru](https://trainingground.guru/articles/chatgpt-for-scouting-masterclass)) [V].
  - Its research formalises **"wordalisation"**: compute statistics, map them through a *normative model* to descriptive categories, then fill structured prompt templates ([arXiv 2503.15509](https://arxiv.org/abs/2503.15509)) [V].
  - A follow-up turns **xG model feature contributions into words** ([arXiv 2504.00767](https://arxiv.org/html/2504.00767v1)) [V]. **This is the closest published method to our "Explain" stage. Copy the pattern, not the code.**
- AP and Yahoo automated sports stories (Automated Insights, Data Skrive, United Robots in the Nordics) exist mainly for lower leagues [U, not re-checked].

---

## 3. Open-source building blocks (licences checked this session [V])

| Project | What it gives us | Licence | Use |
|---|---|---|---|
| [ML-KULeuven/socceraction](https://github.com/ML-KULeuven/socceraction) (PyPI 1.5.3) | SPADL action format, **xT** (16×12 grid, value-iteration, `rate()` = xT_end − xT_start), **VAEP** (P(score/concede) within next **10 actions**) | MIT | Core action valuation on synthetic events |
| [ML-KULeuven/un-xPass](https://github.com/ML-KULeuven/un-xPass) | **Pass success**, **pass selection** and **pass value** models (SoccerMap CNN or XGBoost); "creativity" = rare and valuable (KDD 2023) | Apache-2.0 | Direct template for a **pass difficulty rating** |
| [ML-KULeuven/soccer_xg](https://github.com/ML-KULeuven/soccer_xg) | xG pipelines (logistic regression and XGBoost; penalty and free-kick defaults) | Apache-2.0 | xG baseline |
| [Friends-of-Tracking/LaurieOnTracking](https://github.com/Friends-of-Tracking-Data-FoTD/LaurieOnTracking) | **Spearman pitch control**, **EPV**, velocities, tracking movies | MIT | Pass-option and space explanations |
| [PySport/kloppy](https://github.com/PySport/kloppy) (3.19.1) | Vendor-neutral event and tracking model; 12+ providers | BSD-3 | Make our synthetic schema kloppy-compatible ("drop in real feeds later") |
| [floodlight-sports/floodlight](https://github.com/floodlight-sports/floodlight) (1.2.0) | Kinematics, metabolic power, Voronoi space control, **approximate entropy**, centroids | MIT | Sprint/HSR, chaos/entropy |
| [andrewRowlinson/mplsoccer](https://github.com/andrewRowlinson/mplsoccer) (1.8.1) | Pitch plots, heatmaps, pass maps, radars | MIT | Analyst-view static graphics |
| databallpy (0.8.1) | Load and sync event + tracking | MIT | Optional |
| [roboflow/sports](https://github.com/roboflow/sports) | Football CV: YOLOv8 player/ball/pitch-keypoint detection, **team classification via SigLIP → UMAP → KMeans**, tracking, **radar view**; datasets from the DFL Bundesliga Data Shootout (Kaggle) | MIT, **but YOLOv8/Ultralytics is AGPL-3.0** | Only if we do video auto-eventing |
| supervision (0.30.7) | CV utilities: tracking, annotators | MIT | Same |
| [abdullahtarek/football_analysis](https://github.com/abdullahtarek/football_analysis) (~1k★) | YOLO + KMeans shirt colour + optical-flow camera compensation + perspective transform → **per-player speed and distance** | **No licence**: do not copy | Reference only |
| [calvinyeungck/Football-Match-Event-Forecast](https://github.com/calvinyeungck/Football-Match-Event-Forecast) | **NMSTPP** transformer point process: next event time, zone and action; HPUS possession metric | Apache-2.0 | Event generator or "what happens next" predictor |
| [nvsclub/LargeEventsModel](https://github.com/nvsclub/LargeEventsModel) | **Large Event Models** (Mendes-Neves et al.): predict next event type, location and outcome → **simulate matches** | **AGPL** | Re-implement the idea; don't vendor the code |
| [google-research/football](https://github.com/google-research/football) | 3D football engine with raw positions and **video rendering** (archived Aug 19, 2026) | Apache-2.0 [U] | **Legal synthetic video** for an auto-eventing demo |
| [jyrao/MatchTime](https://github.com/jyrao/MatchTime) / [jyrao/UniSoccer](https://github.com/jyrao/UniSoccer) | Video → commentary models (EMNLP 2024; CVPR 2025) | MatchTime: unstated; UniSoccer: MIT | Research reference; heavy |
| [SoccerNet/sn-caption](https://github.com/SoccerNet/sn-caption), [sn-echoes](https://github.com/SoccerNet/sn-echoes) | Dense captioning challenge; Whisper ASR commentary transcripts | Data under NDA; check | Style corpus for commentary tone |
| [microsoft/agent-framework](https://github.com/microsoft/agent-framework) | Sequential, concurrent, handoff and group orchestration; checkpointing; HITL; OpenTelemetry; A2A; MCP | MIT | Hero tech |
| [withqwerty/football-docs](https://github.com/withqwerty/football-docs) | MCP server indexing docs for 30 football data providers ("LLMs get football data specifics wrong constantly") | MIT | Dev-time aid; shows MCP + football is a live pattern |
| [kumarbaibhav6/tactical-mcp](https://github.com/kumarbaibhav6/tactical-mcp) | FastMCP + DuckDB over StatsBomb WC 2022 (query_shots, query_events, pass_network) | data: non-commercial | MCP tool-design reference |
| FPL MCP servers ([x402-fpl-api](https://github.com/dohyung1/x402-fpl-api), [lewis-king/fpl-mcp-server](https://github.com/lewis-king/fpl-mcp-server)) | Captain picks, transfers, differentials | various | Fan-persona "FPL angle" idea |
| LLM commentary demos: [MatchCaster](https://github.com/hippograndet/MatchCaster), [ably-labs](https://github.com/ably-labs/football-data-live-ai-commentary) | MatchCaster: **two LLM roles** (play-by-play plus an analyst scheduled in "quiet windows"), a pre-generated buffer that stays ahead of the playhead, template fallback, Piper TTS. Ably: 4-second event batching, pub/sub | unstated | **Architecture patterns** for live commentary pacing |

**Open datasets for calibrating the simulator:**
- [StatsBomb open data](https://github.com/statsbomb/open-data): events and 360; attribution required; non-commercial [V].
- [SkillCorner opendata](https://github.com/SkillCorner/opendata) [V].
- [Metrica sample data](https://github.com/metrica-sports/sample-data): 3 anonymised games, tracking + events; no formal licence; acknowledge [V].
- **DFL IDSSE**: 7 Bundesliga matches with TRACAB tracking + official events, **CC-BY 4.0** ([spoho-datascience/idsse-data](https://github.com/spoho-datascience/idsse-data); Bassek et al., *Scientific Data* 2025) [V]. **The cleanest licence for calibrating speeds and distances.**
- Wyscout public dataset (Pappalardo et al., *Sci Data* 2019, CC-BY 4.0) [U] ([paper](https://www.nature.com/articles/s41597-019-0247-7)).

---

## 4. Academic research (2019–2026)

*Most of the papers below are [U]. arXiv IDs are as recalled; arxiv.org was blocked this session.*

### 4.1 AI-assistant coaching and tactics
- **TacticAI** (DeepMind × Liverpool FC): geometric deep learning on graphs of corner kicks. It predicts the receiver and whether a shot follows, and *generates* player-position adjustments. **Experts preferred its suggestions over existing tactics about 90% of the time.** *Nature Communications*, Mar 2024; [arXiv 2310.10553](https://arxiv.org/abs/2310.10553) [U]. Lesson for us: **counterfactual "what should have happened" suggestions plus expert-preference evaluation.**
- **Game Plan: What AI can do for Football…** (Tuyls et al., JAIR 2021; [arXiv 2011.09192](https://arxiv.org/abs/2011.09192)) [U] proposes an "Automated Video Assistant Coach" that combines statistical learning, game theory and computer vision. It is a good framing reference for the pitch.

### 4.2 Commentary generation
- **From event or play data:** Taniguchi et al., *"Generating Live Soccer-Match Commentary from Play Data"*, AAAI 2019 [U]. This is the classic structured-data → commentary setup, which matches ours.
- **From video:**
  - **SoccerNet-Caption** (CVPRW 2023; dense video captioning, ~470 games; [arXiv 2304.04565](https://arxiv.org/abs/2304.04565)) [U].
  - **GOAL** (CIKM 2023, knowledge-grounded commentary benchmark; [arXiv 2303.14655](https://arxiv.org/abs/2303.14655)) [U].
  - **MatchTime/MatchVoice** (EMNLP 2024 oral): re-aligns noisy commentary timestamps with contrastive alignment and generates commentary with LLaMA-3 ([repo](https://github.com/jyrao/MatchTime)) [V].
  - **UniSoccer** (CVPR 2025, SoccerReplay-1988 dataset) [V].
  - **SoccerNet-Echoes** (2024, Whisper ASR of broadcast commentary; [arXiv 2405.07354](https://arxiv.org/abs/2405.07354)) [V].
  - **SoccerAgent/SoccerBench** (2025, multi-agent soccer QA with tool use) [U, low confidence on details].
- **Takeaway:** the academic SOTA is *video-grounded* and heavy. Our edge is **data-grounded, latency-aware, persona-aware** narration, which these benchmarks don't evaluate.

### 4.3 LLM data-to-text and explainability
- **Wordalisation** (Sumpter, Pálmason et al., 2025): statistics → normative model (z-scores to words such as "excellent" or "below average") → structured prompt ([arXiv 2503.15509](https://arxiv.org/abs/2503.15509)) [V].
- **Explaining footballing-action ML models in words** (2025; [arXiv 2504.00767](https://arxiv.org/html/2504.00767v1)) [V]. It verbalises xG feature contributions.
- **Explainable xG with SHAP / Break-Down:** Cavus & Biecek, *"Explainable expected goal models for performance analysis in football analytics"* (2022; [arXiv 2206.07212](https://arxiv.org/abs/2206.07212)) [U].
- **TacticalGPT** (StatsBomb Conference 2023) [V].

### 4.4 Event modelling and synthetic match generation (key for the "synthetic data" score)
- **Seq2Event** (Simpson et al., KDD 2022): a transformer predicts the next event's type and location from a sequence; introduces a possession-utilisation metric (poss-util) [U] ([ACM DOI 10.1145/3534678.3539138](https://dl.acm.org/doi/10.1145/3534678.3539138)).
- **NMSTPP** (Yeung, Sit & Fujii, 2023): a neural marked spatio-temporal point process for next-event time, zone and action, plus the **HPUS** metric ([repo](https://github.com/calvinyeungck/Football-Match-Event-Forecast), Apache-2.0) [V].
- **Large Event Models** (Mendes-Neves, Meireles & Mendes-Moreira, 2024–25): trained on Wyscout v3 data, they forecast type, location and outcome autoregressively and **simulate full matches** (including what-ifs) ([repo](https://github.com/nvsclub/LargeEventsModel), AGPL) [V].
- **Google Research Football** (Kurach et al., 2019; [arXiv 1907.11180](https://arxiv.org/abs/1907.11180)) [V]. An engine that produces positions *and* video.

### 4.5 Action and possession valuation, pitch control, win probability
- **xT:** Karun Singh, 2018–19 ([blog](https://karun.in/blog/expected-threat.html)) [U]. Implemented in socceraction [V].
- **VAEP:** Decroos et al., KDD 2019 ([arXiv 1802.07127](https://arxiv.org/abs/1802.07127)) [U], verified in code [V].
- **xT vs VAEP comparison:** Van Roy et al., 2020 [V, via socceraction citations].
- **Pitch control:**
  - Spearman 2018, *"Beyond Expected Goals"* (Sloan), with default parameters [V] in LaurieOnTracking: v_max 5 m/s, reaction time 0.7 s, σ 0.45, λ 4.3 (GK ×3), ball speed 15 m/s.
  - **Physics-based pass probability:** Spearman et al., Sloan 2017 [U].
- **EPV:** Fernández, Bornn & Cervone (Sloan 2019; *Machine Learning* 2021) [U].
- **SoccerMap:** Fernández & Bornn, ECML-PKDD 2020; [arXiv 2010.10202](https://arxiv.org/abs/2010.10202) [U]. Pass probability surfaces; used in un-xPass [V].
- **un-xPass:** Robberechts, Van Roy & Davis, KDD 2023 [V].
- **In-game win probability:** Robberechts, Van Haaren & Davis, *"A Bayesian approach to in-game win probability in soccer"*, KDD 2021 ([arXiv 1906.05029](https://arxiv.org/abs/1906.05029)) [U].

### 4.6 Physical demands
- **Bradley et al. 2009**, *J Sports Sci* 27(2), "High-intensity running in English FA Premier League soccer matches" (DOI 10.1080/02640410802512775) [U]. It defines the widely reused speed bands: **high-speed running 19.8–25.1 km/h, sprinting >25.1 km/h** (often written ">25.2").

---

## 5. Metric cookbook: definitions we can implement fast on synthetic data

Coordinates are a 105 × 68 m pitch with the attacking direction normalised to +x.

| Metric | Definition / formula | Source |
|---|---|---|
| **xG** | P(goal \| shot features). Logistic regression on distance *d* to goal centre, goal-mouth angle θ = arctan(7.32·x / (x² + y² − 3.66²)) (x = distance from goal line, y = lateral offset), body part, assist type, situation (open play, set piece, counter), plus pressure. Calibrate so open-play conversion is about 10–11% [U]. Explain with SHAP-style contributions verbalised with wordalisation. | soccer_xg [V]; Cavus & Biecek [U] |
| **xT** | 16×12 grid. Iterate xT(z) = s(z)·g(z) + m(z)·Σ_z′ T(z→z′)·xT(z′) to convergence (ε = 1e-5). Action value = xT(end) − xT(start), successful moves only. | socceraction code [V]; Singh [U] |
| **VAEP** | V(aᵢ) = [P_score(Sᵢ) − P_score(Sᵢ₋₁)] − [P_concede(Sᵢ) − P_concede(Sᵢ₋₁)], probabilities over the **next 10 actions**. | socceraction code [V] |
| **OBV** | StatsBomb's possession-state model of Δ(P(goal for) − P(goal against)) per action. Use VAEP as our open equivalent. | Hudl [V] |
| **Pitch control / EPV** | Per-location probability that a team controls the ball first, from player arrival times (v_max 5 m/s, reaction 0.7 s) and a sigmoid of uncertainty σ = 0.45. EPV = expected possession outcome given state. | LaurieOnTracking [V] |
| **PPDA** | Opponent passes in their defensive 60% of the pitch ÷ our defensive actions (tackles, interceptions, challenges, fouls) in that zone. Lower means a more intense press. | Trainor/StatsBomb 2014 [U] |
| **Field tilt** | Our final-third passes (or touches) ÷ both teams' final-third passes. | Community metric [U]; used by bikilath [V] |
| **Possession value** | Σ ΔxT (or VAEP) over a possession. "Dangerous possession" = value > 0.05 or ends in a shot. | Derived |
| **Pass difficulty (proposal)** | **p̂ = P(complete \| length, forward angle, passer pressure, defenders in a 2 m corridor along the lane, nearest defender to receiver, receiver speed, height)**. **Difficulty = 1 − p̂**, shown as a **1–10 rating**. Physical variant: p̂ from intercept-time pitch control at the pass destination. **Pass Quality** = completed × (1 − p̂) × max(ΔxT, 0), i.e. risky *and* valuable, the un-xPass idea. | un-xPass [V]; Spearman [V/U] |
| **Pressure index (proposal)** | For the ball carrier: P = Σ_defenders max(0, 1 − dᵢ/5 m) × (1 + closing_speedᵢ/5). "Under pressure" if P > 0.5 (about one defender within 2.5 m). Team pressing intensity = pressures per opponent-possession minute. | StatsBomb ~5-yard pressure convention [U]; Opta Vision Pressure Intensity [V]; Bundesliga escape rate [V] |
| **Momentum** | Opta-style: per minute, Σ action values (xT/VAEP) for team A − Σ for team B. Display as bars. Smooth with an EWMA (half-life about 3 minutes) to find **turning points** (sign changes or slope extremes). | Opta momentum [V] |
| **Win probability (fast)** | Remaining goals per team ~ Poisson(λ·(90 − t)/90), with λ blending the pre-match rate and live xG rate. P(win) = Σ over k₁, k₂ with (score_A + k₁) > (score_B + k₂). Adjust for red cards. **Leverage** of a moment = |ΔWP| (realised or expected). | Robberechts 2021 [U]; BMF Win Probability [V] |
| **Chaos index (proposal)** | Per rolling 5-minute window, z-scored against the match median (the relative-threshold idea in bikilath [V]): **C = mean(z(turnovers/min), z(H_zone), z(σ_ΔxT), z(duels+loose balls/min), z(Σ\|ΔWP\|))**. H_zone = Shannon entropy of zone-to-zone ball transitions ÷ log K. **Control** = opposite pole: long sequences, high possession share, high field tilt, low within-team entropy. Report the **decomposition** ("chaos ↑ mainly from turnovers ↑ 2.1σ after the 61' press change"). | Floodlight approximate entropy [V]; HPUS [V]; our design |
| **Game rhythm / tempo** | Effective-play events/min; median seconds between passes within a possession; passes per sequence; **direct speed** = metres progressed upfield per second of possession [U, Opta usage]. Detect **rhythm changes** with CUSUM or Bayesian change-point detection on the tempo series. | Derived |
| **Sprint / HSR** | HSR 19.8–25.1 km/h; **sprint > 25.1/25.2 km/h** (Bradley 2009 [U]); SkillCorner uses about 20–25 and >25 km/h bands plus **PSV-99** (99th-percentile speed) [V/U]. A sprint *event* = above threshold for ≥ 1 s [U]. Acceleration event > 3 m/s² [U]. Compute speed from smoothed positions (Savitzky–Golay, 10–25 Hz). | floodlight kinematics [V] |
| **Ball / shot speed** | v = \|Δp\|/Δt on smoothed ball track. Shot speed = max over the first 0.2 s after the strike [U]. Realistic shots ≈ 60–120 km/h; passes ≈ 30–80 km/h [U]. Bundesliga airs "Shot Speed" [V]. | Derived |

**Synthetic-data checklist** (aim to match these distributions so judges see "football-realistic" data, all [U]):
- ~1,000–1,100 passes per match (kaanoguzkan reports 1,103 [V]) at ~78–85% completion.
- ~24–27 shots and ~2.6–2.9 goals per match.
- ~100–115 km total distance per team.
- Per outfield player: ~10–12 km, ~20–40 sprints, top speed ~32–36 km/h.
- Ball in play ~55–60 minutes.

---

## 6. Hackathon-specific lessons

**Past winners: limited evidence.** I could not verify past winners this session (search budget exhausted; devpost and techcommunity blocked). The Microsoft [AI_Agents_Hackathon](https://github.com/microsoft/AI_Agents_Hackathon) repo (archived Mar 2026) does not list winners [V]. Relevant precedents [U, verify]:
- **Kaggle NFL Big Data Bowl**: annual; judged on football relevance, novelty, rigour and clarity of visual storytelling.
- **DFL Bundesliga Data Shootout** (Kaggle 2022): event detection from video. Its data underpins roboflow/sports [V].
- **Google Cloud × MLB hackathon** (2025): personalised highlight and fan-experience themes.

**What this judging scheme rewards** (from the [rules](https://raw.githubusercontent.com/microsoft/insidethegamehackathon/main/OFFICIAL%20RULES.md) [V]):
1. A **demo under 2 minutes** that shows the *same moment* rendered two ways (analyst vs casual, EN vs ES) side by side. UX is 20%.
2. **Visible agent orchestration**: a trace panel showing handoffs, shared state and recovery from failure. These are explicit Multi-Agent criteria.
3. **Synthetic data creation** shown as a feature: scenario knobs, seeds, and validation against real-world distributions.
4. **MCP integration**: expose match state as MCP tools. Named in the Agentic criterion.
5. **Production signals**: IaC, health checks, latency budget, cost per match, evaluation scores. These cover Impact and Enterprise.
6. **Novelty vs existing approaches**: say explicitly what Opta, Bundesliga, Data Zone and Companion don't do, and show it.

---

## 7. Synthesis

### 7a. Landscape map

| Layer | Incumbents | Open source / academic | Hackathon competitors |
|---|---|---|---|
| Capture (video → tracking/events) | Second Spectrum/Genius, Hawk-Eye, TRACAB, SkillCorner, Signality/Spiideo, Kognia, Veo/Pixellot | roboflow/sports, SoccerNet, GRF | (none, all synthetic) |
| Data model & metrics | Opta (Vision, Momentum, xG), StatsBomb (360, OBV), Wyscout, Bundesliga Match Facts, LaLiga Beyond Stats | socceraction, un-xPass, soccer_xg, LaurieOnTracking, kloppy, floodlight | Basic stats, xG, momentum, field tilt; one has pitch control |
| Explanation / narrative | Twelve (wordalisation), OptaAI Studio, DFL reports (Claude/Bedrock), Bundesliga live commentary, IBM watsonx, Sportradar GenAI API | Wordalisation, MatchTime, GOAL, TacticAI (counterfactuals) | LLM recaps + fact-check + evidence links (everyone) |
| Render | Vizrt (Libero/Arena/Flowics), Ross, Chyron, Data Zone L-bar | mplsoccer | Web dashboards, heatmaps, pass networks |
| Distribute / clip | WSC Sports, Magnifi | — | — |
| Personalise / converse | PL Companion (Copilot), Bundesliga MatchMade, Wimbledon Match Chat, Ligue 1+ AI dub | FPL MCP servers | Persona toggle + translation (everyone) |

### 7b. Commodity vs differentiating

**Commodity (necessary, not sufficient):**
- Live counters: possession, shots, pass %
- xG and a momentum bar chart
- Heatmaps and pass networks
- LLM recap with an analyst/casual tone switch
- Machine translation
- Multi-agent pipeline with a fact-checker
- Evidence links to event IDs
- "Controlled/contested/chaotic" window labels
- Neural TTS commentary
- Speed and distance read-outs

**Differentiating (rare or absent in both products and competing entries):**
1. **Counterfactual explanations**: the better option that was missed, from pitch control plus xT. TacticAI-style.
2. **Moment importance**: WP leverage × surprise (1 − p̂) × milestone rarity × persona relevance, which drives *what gets airtime*.
3. **Graphics-director agent**: a broadcast-grade decision layer (priority queue, cooldowns, dwell time, collision with live action, safe-area layout) emitting overlay specs.
4. **Physically grounded pass difficulty / quality** with natural-language reasons.
5. **Explainable chaos/control decomposition plus rhythm change-points**, rather than a bare label.
6. **Scenario-injectable simulator** ("director mode": inject a red card, tactical switch or fatigue) with planted-truth detector benchmarks.
7. **Context and milestone engine**, the fix for the ESPN failure.
8. **Live grounded Q&A over the current match through MCP**, which the PL Companion lacks.
9. **Player-focus mode** with trigger-based name tags and a personal storyline across the match.

### 7c. Ten most promising angles for a 2-person, 3-week team (ranked by value ÷ effort)

1. **"Why-engine" with counterfactuals (core novelty).** For each key moment, output (a) the driver decomposition (top 3 contributing metrics with Δσ) and (b) one counterfactual: "Passing to #10 had 0.71 completion probability and +0.04 xT vs the chosen 0.38 / +0.01." Use synthetic tracking, pitch control and xT. Neither the competing entries nor Data Zone do this. *Effort: medium.*
2. **Moment Importance Index + milestone engine.** Score = w₁·|ΔWP| + w₂·(1 − p̂_event) + w₃·milestone rarity + w₄·persona affinity. It drives recaps, clips and overlays. Ship a "milestones" table (firsts, streaks, records, debuts, Nth goal) in the synthetic league history. *Effort: low–medium. Pitch line: "we can't forget Alex Morgan."*
3. **Graphics-director agent plus overlay spec.** An agent that, every tick, picks at most 1–2 overlays from candidates under rules (no overlay during an attacking-third possession, minimum 6–8 s dwell, 30 s cooldown per template, priority by importance). It emits JSON rendered as HTML5 over a pitch/video canvas, Flowics-style. This *is* the Render stage done like a broadcaster. *Effort: medium.*
4. **Scenario-injectable synthetic simulator with planted truth (scored criterion).** Event + 10 Hz tracking generator with knobs for press intensity, tempo, directness and fatigue, plus **event injection** (red card at 55', press change at 61'). Publish a validation page comparing distributions to the reference ranges in §5, and a detector benchmark (precision/recall of "press collapse", "rhythm change", "momentum swing"). kaanoguzkan has part of this, so go further with injection API, validation report and kloppy-compatible export. *Effort: medium–high.*
5. **Pass Difficulty 1–10 and "Pass of the Match".** A logistic model on synthetic features, or physics-based. The overlay shows difficulty, ΔxT and three reason chips ("31 m · 2 in lane · under pressure"), explained via wordalisation. *Effort: low–medium.*
6. **Persona engine as wordalisation, not just tone.** One fact layer and multiple normative mappings:
   - analyst: numbers, percentiles, model names
   - casual: analogies, no jargon
   - kid/new fan: rules explained
   - FPL manager: points impact
   Add a **favourite-club lens** (whose fortunes the moment changes) and a football **glossary-controlled translation**: per-language term tables so "pressing" or "xG" don't get mistranslated. Ligue 1+ needed a quality caveat [V]. *Effort: low–medium.*
7. **Chaos ↔ Control meter with decomposition and rhythm change-points.** Go beyond a label: a dial plus "because" chips, with CUSUM change-points annotated on the timeline ("tempo +18% after 61' substitution"). *Effort: low.*
8. **Live match Q&A via MCP (second screen).** Expose `get_state`, `get_moment(id)`, `explain(metric, window)`, `compare_players`, `counterfactual(event_id)` as MCP tools (Azure MCP / Agent Framework). Fans ask "why are we losing control?" and get grounded answers with evidence links. *Effort: medium. Strong on the Agentic criterion.*
9. **Player-focus mode.** Pick a player: name tag appears on sprint > 25.2 km/h, top-speed records, distance milestones (5 km, 10 km), duels won. The player's own mini-narrative and end-of-match personal recap. Speed/distance overlays are Data Zone parity; the *personal storyline* is the differentiator. *Effort: low.*
10. **Dual-voice audio commentary paced by importance.** Play-by-play plus an analyst who speaks only in quiet windows, the MatchCaster pattern [V]. Azure Speech SSML prosody scales with the importance index, with a pre-generated buffer and template fallback. *Effort: medium. Do only after items 1–5.*

*Stretch (skip unless ahead):* auto-eventing from **synthetic video** rendered with Google Research Football → roboflow-style detection → events. This shows a "video → events → stories" loop with no rights issues. Mind the AGPL on YOLO.

### 7d. Concrete reuse plan (with licences)

- **Metrics:**
  - socceraction (MIT) for xT and VAEP.
  - soccer_xg (Apache-2.0) as the xG baseline, or our own logistic regression.
  - un-xPass (Apache-2.0) as the model design for pass success and value. Re-train on synthetic data.
  - LaurieOnTracking (MIT) for pitch control and EPV; port it to vectorised NumPy.
  - floodlight (MIT) for kinematics and entropy.
- **Data contracts:** kloppy (BSD-3) dataclasses as the target schema.
- **Simulator calibration:** IDSSE (CC-BY 4.0) for speeds and distances; StatsBomb and Wyscout distributions (attribution, non-commercial) for aggregates only.
- **Next-event model:** NMSTPP (Apache-2.0) design, or re-implement the LEM idea. **Do not vendor LargeEventsModel (AGPL).**
- **Orchestration:** Microsoft Agent Framework (MIT) on Foundry; MCP server for match state; Azure AI Speech for voice; Cosmos DB / Redis for live state (mirrors the PL's own architecture [V]).
- **Rendering:** mplsoccer (MIT) for static analyst graphics; HTML5/SVG overlay layer for live use.
- **Avoid copying:** abdullahtarek/football_analysis (no licence), MatchCaster/ably demos (no licence). Patterns only.

---

## Open questions and gaps to verify next

- Exact PL tracking sprint threshold (25.2 vs 25.0 km/h) and Opta "direct speed" definition [U].
- IBM US Open/Masters 2025 AI features, Hawk-Eye/SMT, Track160, Sportlogiq, Ross Piero, SciSports and Zone14 current offerings [U].
- Past Microsoft/AWS/Google sports-hackathon winners and their judge feedback (not researched; budget exhausted).
- Whether the Bundesliga Match Momentum model is xT-based (page blocked).
- Licence of the MatchTime code and the SoccerNet-Echoes data.

---

## Sources

**Hackathon and PL/Microsoft:**
- [OFFICIAL RULES.md](https://raw.githubusercontent.com/microsoft/insidethegamehackathon/main/OFFICIAL%20RULES.md)
- [microsoft/insidethegamehackathon](https://github.com/microsoft/insidethegamehackathon)
- [RESOURCE PLAYLISTS.md](https://raw.githubusercontent.com/microsoft/insidethegamehackathon/main/RESOURCE%20PLAYLISTS.md)
- [Reactor S-1709](https://developer.microsoft.com/en-us/reactor/series/S-1709/)
- [MS customer story](https://www.microsoft.com/en/customers/story/25725-premier-league-azure-ai-foundry)
- [MS Source Jul 2025](https://news.microsoft.com/source/2025/07/01/premier-league-and-microsoft-announce-five-year-strategic-partnership-to-personalize-the-fan-experience-with-ai-for-1-8-billion-people/)
- [Lowyat](https://www.lowyat.net/2025/357877/premier-league-copilot-companion-tool/)
- [Sky Media](https://www.skymedia.co.uk/news/microsoft-brings-ai-insight-to-football-conversations-with-the-premier-league-companion-on-the-overlap/)
- [TechRadar on Companion](https://www.techradar.com/computing/artificial-intelligence/the-premier-league-companion-is-a-new-ai-powered-tool-for-soccer-fans-but-its-useless-at-least-for-now)

**Competing entries:**
- [abhiiiesh/MatchMind](https://github.com/abhiiiesh/MatchMind)
- [kaanoguzkan/insidethegamehackathon](https://github.com/kaanoguzkan/insidethegamehackathon)
- [matcheyes](https://github.com/OlatunbosunIbiyinka/matcheyes)
- [PRO-VISION](https://github.com/mberry19932025/PRO-VISION)
- [helenapedro](https://github.com/helenapedro/inside-the-game)
- [tahawinner25-ai](https://github.com/tahawinner25-ai/inside-the-game-explainable-match-intelligence)
- [bikilath](https://github.com/bikilath/inside-the-game)
- [KumarPadigeri](https://github.com/KumarPadigeri/inside-the-game)
- [match_pulse](https://github.com/nelson-cololo2/match_pulse)

**Commercial:**
- [SVG Europe OptaAI Studio](https://www.svgeurope.org/blog/news-roundup/stats-perform-launches-ai-fuelled-optaai-studio/)
- [SVG OptaAI](https://www.sportsvideo.org/2024/10/15/optaai-studio-boost-audience-revenues-with-ai-fueled-analysis-stats-and-insights/)
- [Stats Perform award](https://www.statsperform.com/insights/broadcast-technology-of-the-year-award/)
- [Opta Vision 2025/26](https://www.statsperform.com/resource/opta-vision-redefining-football-analysis-2025-26)
- [The Analyst Opta Vision](https://theanalyst.com/articles/opta-vision-stats-tracking-data-premier-league)
- [Flashscore momentum](https://www.flashscore.com/news/momentum/YgzwGjeU/)
- [Defector momentum](https://defector.com/what-on-earth-is-match-momentum)
- [GeniusIQ](https://businesswire.com/news/home/20240808054635/en/Genius-Sports-Launches-GeniusIQ-to-Accelerate-the-AI-Revolution-in-Global-Sport)
- [PL Data Zone (SVG)](https://www.sportsvideo.org/2023/10/05/premier-league-productions-partners-with-genius-sports-to-deliver-premier-league-data-zone/)
- [Data Zone (Soccerscene)](https://www.soccerscene.com.au/premier-league-productions-combine-with-genius-sports-to-bring-premier-league-data-zone/)
- [Second Spectrum acquisition](https://www.nasdaq.com/press-release/genius-sports-acquires-second-spectrum-the-official-data-tracking-and-analytics)
- [BetVision](https://siliconcanals.com/genius-sports-launches-betvision-a-game-changing-immersive-sports-betting-experience-including-nfl-live-game-video/)
- [Serie A BetVision](https://www.businesswire.com/news/home/20250804278927/en/Genius-Sports-Secures-Exclusive-Official-Data-and-Betting-Streaming-Rights-with-Lega-Serie-A-Through-2029-to-Power-Next-Generation-BetVision-Product)
- [Genius SAOT](https://www.sportcal.com/newsletters/genius-in-as-semi-automated-offside-tech-supplier-for-epl)
- [Hudl StatsBomb](https://www.hudl.com/products/statsbomb)
- [TacticalGPT](https://blogarchive.statsbomb.com/uploads/2023/10/TacticalGPT-Uncovering-the-Potential-of-LLMs-for-Predicting-Tactical-Decisions-in-Professional-Football.pdf)
- [SkillCorner](https://www.skillcorner.com)
- [Kognia](https://www.soccerscene.com.au/kognia-sports-using-artificial-intelligence-to-advantage/)
- [Spiideo–Signality](https://www.sportsvideo.org/2024/12/19/spiideo-completes-acquisition-of-signality/)
- [WSC Serie A](https://wsc-sports.com/blog/news/lega-serie-a-utilizing-ai-technology-by-wsc-sports-to-create-real-time-highlights/)
- [WSC LFP](https://sportsmintmedia.com/wsc-sports-to-develop-ai-powered-highlights-for-ligue-1-following-five-year-deal-with-lfp-media/)
- [Magnifi/VideoVerse](https://thedesk.net/2025/09/media-minute-acquires-videoverse/)
- [Vizrt AI AR](https://www.sportsvideo.org/2025/09/16/vizrt-launches-ai-powered-advancements-to-speed-up-augmented-reality-sports-production/)
- [Viz Arena/Libero](https://www.svgeurope.org/blog/headlines/vizrt-targets-live-sports-with-new-viz-arena-enhanced-libero-platforms/)
- [BMF Pressure Handling & Win Probability](https://bundesliga.com/en/bundesliga/news/pressure-handling-win-probability-join-bundesliga-match-facts-powered-by-aws-21390)
- [BMF zone](https://www.bundesliga.com/en/bundesliga/stats/bmf-zone/2025-2026)
- [BMF Match Momentum](https://www.bundesliga.com/en/bundesliga/news/bundesliga-match-facts-aws-match-momentum-34052)
- [AWS Bundesliga AI commentary](https://aws.amazon.com/blogs/media/revolutionizing-fan-engagementcer-bundesliga-generative-ai-powered-live-commentary/)
- [ZenML DFL GenAI](https://zenml.io/llmops-database/scaling-content-production-and-fan-engagement-with-gen-ai)
- [SVG Europe DFL Supercup](https://www.svgeurope.org/blog/headlines/live-from-the-supercup-dfl-uses-ai-to-scale-content-creation/)
- [LaLiga Beyond Stats (SVG Europe)](https://www.svgeurope.org/blog/headlines/laliga-and-microsoft-unveil-beyond-stats-football-analysis-portal/)
- [LaLiga newsletter](https://newsletter.laliga.es/global-futbol/laliga-and-microsoft-create-beyond-stats-a-statistics-system-that-enhances-the-fan-experience-thanks-to-big-data)
- [Wimbledon 2025 (TechRadar)](https://www.techradar.com/pro/wimbledon-2025-is-set-to-be-the-smartest-championships-yet-and-it-might-help-me-fall-in-love-tennis-again)
- [New Electronics](https://newelectronics.co.uk/content/blogs/wimbledon-embraces-generative-ai)
- [Ligue 1 AI dub](https://ligue1.com/en/articles/l1_article_4006-2026-trophee-des-champions-to-become-first-european-football-match-with-ai-dubbed-commentary)
- [FootyHub TV](https://footyhub.tv/)
- [Sportradar GenAI API](https://developer.sportradar.com/sportradar-updates/changelog/genai-automated-content-api-now-available)
- [ESPN AI recap (TPA)](https://www.readtpa.com/p/espns-ai-fumble-how-robot-recaps)
- [AI Incident DB 785](https://incidentdatabase.ai/cite/785/)
- [Twelve masterclass](https://trainingground.guru/articles/chatgpt-for-scouting-masterclass)

**Research:**
- [Wordalisation arXiv 2503.15509](https://arxiv.org/abs/2503.15509)
- [ML explanations in words arXiv 2504.00767](https://arxiv.org/html/2504.00767v1)
- [TacticAI arXiv 2310.10553](https://arxiv.org/abs/2310.10553)
- [Game Plan arXiv 2011.09192](https://arxiv.org/abs/2011.09192)
- [SoccerNet-Caption arXiv 2304.04565](https://arxiv.org/abs/2304.04565)
- [GOAL arXiv 2303.14655](https://arxiv.org/abs/2303.14655)
- [SoccerNet-Echoes arXiv 2405.07354](https://arxiv.org/abs/2405.07354)
- [VAEP arXiv 1802.07127](https://arxiv.org/abs/1802.07127)
- [SoccerMap arXiv 2010.10202](https://arxiv.org/abs/2010.10202)
- [Win probability arXiv 1906.05029](https://arxiv.org/abs/1906.05029)
- [Explainable xG arXiv 2206.07212](https://arxiv.org/abs/2206.07212)
- [Seq2Event DOI](https://dl.acm.org/doi/10.1145/3534678.3539138)
- [GRF arXiv 1907.11180](https://arxiv.org/abs/1907.11180)
- [xT blog](https://karun.in/blog/expected-threat.html)
- [Wyscout open data paper](https://www.nature.com/articles/s41597-019-0247-7)

**Open source:**
- [socceraction](https://github.com/ML-KULeuven/socceraction)
- [un-xPass](https://github.com/ML-KULeuven/un-xPass)
- [soccer_xg](https://github.com/ML-KULeuven/soccer_xg)
- [LaurieOnTracking](https://github.com/Friends-of-Tracking-Data-FoTD/LaurieOnTracking)
- [kloppy](https://github.com/PySport/kloppy)
- [floodlight](https://github.com/floodlight-sports/floodlight)
- [mplsoccer](https://github.com/andrewRowlinson/mplsoccer)
- [roboflow/sports](https://github.com/roboflow/sports) and its [soccer example](https://github.com/roboflow/sports/tree/main/examples/soccer)
- [football_analysis](https://github.com/abdullahtarek/football_analysis)
- [NMSTPP](https://github.com/calvinyeungck/Football-Match-Event-Forecast)
- [LargeEventsModel](https://github.com/nvsclub/LargeEventsModel)
- [Google Research Football](https://github.com/google-research/football)
- [MatchTime](https://github.com/jyrao/MatchTime)
- [UniSoccer](https://github.com/jyrao/UniSoccer)
- [sn-caption](https://github.com/SoccerNet/sn-caption)
- [sn-echoes](https://github.com/SoccerNet/sn-echoes)
- [agent-framework](https://github.com/microsoft/agent-framework)
- [football-docs](https://github.com/withqwerty/football-docs)
- [tactical-mcp](https://github.com/kumarbaibhav6/tactical-mcp)
- [mcp-soccer-data](https://github.com/yeonupark/mcp-soccer-data)
- [x402-fpl-api](https://github.com/dohyung1/x402-fpl-api)
- [fpl-mcp-server](https://github.com/lewis-king/fpl-mcp-server)
- [MatchCaster](https://github.com/hippograndet/MatchCaster)
- [ably-labs commentary](https://github.com/ably-labs/football-data-live-ai-commentary)
- [StatsBomb open-data](https://github.com/statsbomb/open-data)
- [SkillCorner opendata](https://github.com/SkillCorner/opendata)
- [Metrica sample-data](https://github.com/metrica-sports/sample-data)
- [IDSSE](https://github.com/spoho-datascience/idsse-data)
- [AI_Agents_Hackathon](https://github.com/microsoft/AI_Agents_Hackathon)
- PyPI metadata for socceraction, kloppy, mplsoccer, floodlight, databallpy, supervision, ultralytics, sportslabkit (checked Oct 6, 2026)
