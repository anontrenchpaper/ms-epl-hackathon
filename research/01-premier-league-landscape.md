# Premier League technology, data, AI and broadcast-graphics landscape (as of 6 October 2026)

Research brief for our "Inside the Game" (Microsoft x Premier League) hackathon entry.

## How to read this report

- **Method.** About 45 web searches (most in "extended" mode) plus GitHub code search of the official rules file. Direct page fetching (WebFetch) was blocked by the sandbox's egress proxy for every news domain I tried (news.microsoft.com, premierleague.com, geniussports.com, nbcsports.com, wikipedia, substack and others), and the shared web-search budget ran out partway through the broadcaster section. Most claims below therefore rest on search-engine summaries of the linked pages, not on full reads.
- **Confidence tags.**
  - **[V]**: the cited source's search summary states the claim directly.
  - **[V-rules]**: read directly from the official rules text via GitHub code search.
  - **[U]**: background knowledge (training data to roughly mid-2026) or inference that was **not re-verified in this session**. Check these before putting them in the pitch.
- **Dates.** Where a URL carries a date, I give it. "Date unverified" means I could not see the publication date.

---

## Executive summary

- **Microsoft is the PL's "Official Cloud and AI Partner"** under a **five-year deal announced 1 July 2025**. It covers four areas: **fan engagement, match insights and analysis, cloud transformation, organisational productivity**. The PL is moving its core infrastructure to Azure. Launch materials say Azure AI Foundry / Azure OpenAI would power **"real-time data overlays and post-match analysis"**, which is close to this hackathon's brief. [V]
- **What has shipped is mostly conversational.** The **Premier League Companion powered by Copilot** (PL app and website, 2025/26) answers questions over 30+ seasons of stats, 300,000 articles and 9,000 videos. In **February 2026** it was built into Gary Neville's **The Overlap** shows through Sky Media. In **2026/27** it gained a **Fantasy Premier League Companion built on Microsoft Foundry** for the 13m+ FPL managers. Announced next steps include **native-language Q&A with text and audio translation**. [V]
- **No live, explainable, personalised on-screen layer exists yet.** The closest thing is the **Premier League Data Zone**, an L-bar overlay with player IDs, speeds, shot power, pass accuracy, distance and mini-map. Genius Sports (via its Second Spectrum tracking) and Premier League Productions run it on one featured match per round. It shows metrics but does not explain them, and every viewer sees the same thing. [V]
- **The data supply chain is split.** Under Football DataCo, **Genius Sports** handles low-latency/betting data, optical and skeletal tracking (iPhone-based camera rigs), and **semi-automated offside (live since 12 April 2025)**, with a contract running to 2029. **Opta (Stats Perform)** supplies official event data to media and, **from 2025/26, "OptaAI" data-led insights** for broadcasters. [V]
- **The production path changed this season.** From **2026/27** the PL took international production in-house as **Premier League Studios** (Olympia, London), ending 20+ years of IMG/PLP. It serves around 55 broadcast partners in 189 markets with about 6,000 hours a year. Qvest designed the facility. [V]
- **"The platform's rendering partner"** in the rules is not named anywhere I could find. The best candidates: (1) **Genius Sports / Second Spectrum**, whose Data Zone overlays already cover the rules' suggested metrics almost one for one; (2) **AE Live**, which has rendered match graphics for all 380 PLP matches plus the virtual sets. Broadcasters also render their own: Sky's analysis studio runs **Vizrt Viz 5 with Unreal Engine**. Whether Premier League Studios kept AE Live is **unverified**. Our safest design is a **renderer-agnostic, timecoded overlay contract**. [V/U]
- **Broadcasters personalise packaging, not the data layer.** UK rights for 2025–29 are Sky (215+ matches), TNT (52) and BBC highlights; Amazon left. Sky added Multiview, vertical highlights, a personalised "Moments" feed (2026/27) and "Your Multiview". Peacock (US) has Multiview, Key Plays catch-up and a club-matching quiz. None offers per-viewer explanations of the match. [V]
- **International gap.** The world feed is produced once and localised by around 55 rights-holders. The PL is piloting its own DTC service **Premier League+ in Singapore** (launch planned for August 2026 with StarHub), where English, Mandarin, Malay and Tamil are all official languages. Multilingual AI narratives and per-fan overlays fit directly into that DTC strategy. [V for the plan, U for launch status]
- **Our angle:** an evidence-linked, multi-agent "explain layer" that sits between tracking/event data and any renderer. It emits timed overlay cues, plus analyst/casual and multilingual variants, plus recaps. Every claim is traceable to event IDs, and an operator approves cues before they air.

---

## 1. The Microsoft x Premier League partnership

### 1.1 What was announced (1 July 2025)

- **Deal:** five-year strategic partnership. Microsoft becomes **"Official Cloud and AI Partner of the Premier League."** The headline was *"personalize the fan experience with AI for 1.8 billion people"* (fans in 189 countries) [V]. Sources: [Microsoft Source, 1 Jul 2025](https://news.microsoft.com/source/2025/07/01/premier-league-and-microsoft-announce-five-year-strategic-partnership-to-personalize-the-fan-experience-with-ai-for-1-8-billion-people/); [PL partner page](https://www.premierleague.com/en/about/partners/microsoft); [PL news](https://www.premierleague.com/en/news/4338015/premier-league-announces-partnership-with-microsoft); [CNBC, 1 Jul 2025](https://www.cnbc.com/2025/07/01/english-premier-league-integrates-microsoft-ai-into-fan-app.html).
- **Four focus areas:** *fan engagement, match insights and analysis, cloud transformation, organisational productivity* [V]. Sources: [Yahoo Finance/Reuters wire](https://finance.yahoo.com/news/premier-league-microsoft-partner-enhance-095543263.html); [SportsPro Tech Stack 2025/26](https://www.sportspro.com/commercial-guide/premier-league/data-analytics/tech-stack/).
- **Cloud:** the PL is migrating core technology infrastructure to Azure. Back-office moves to **Microsoft 365, Power Platform and Dynamics 365 (Finance & Operations)**, and PL staff use **Microsoft 365 Copilot** [V]. Sources: [DCD](https://www.datacenterdynamics.com/en/news/premier-league-agrees-five-year-cloud-and-ai-deal-with-microsoft/); [SportsPro Tech Stack](https://www.sportspro.com/commercial-guide/premier-league/data-analytics/tech-stack/); [Microsoft customer story](https://www.microsoft.com/en/customers/brand-collections/premier-league-innovations).
- **Broadcast/match insights:** launch coverage says the PL will use **Azure AI Foundry services, including Azure OpenAI in Foundry Models, to provide "real-time data overlays" in the live match experience and power post-match analysis** [V]. Sources: [Advanced Television, 2 Jul 2025](https://www.advanced-television.com/2025/07/02/microsoft-premier-league-digital-parnership/); [Microsoft IR release](https://microsoft.gcs-web.com/news-releases/news-release-details/premier-league-and-microsoft-announce-five-year-strategic). *This is the strongest official hook for our project: we would be building a version of what the partnership already promised.*
- **Richard Masters (PL CEO)** is quoted as saying the partnership will help the League *"engage with fans in new ways—from personalised content to real-time match insights"* [V, via secondary summary of the release]. Source: [DCD](https://www.datacenterdynamics.com/en/news/premier-league-agrees-five-year-cloud-and-ai-deal-with-microsoft/).
- **Match officials / coaches / Surface:** I found **no evidence** that the partnership covers referee or coaching tools. Searches returned nothing on Copilot for PGMOL or Surface for clubs. Treat any such claim as unverified.

### 1.2 Premier League Companion (app and web, from 2025/26)

- Launched with the **relaunched PL app and website** in summer 2025. The app also introduced **myPremierLeague** (personalise the app and alerts around clubs, players and matches), **Matchday Live** (verified live scores, stats, reporting, links to official broadcasts) and **Matchday stories** (vertical storytelling from every ground) [V]. Sources: [PL: new fan-facing platforms](https://www.premierleague.com/en/news/4337361/premier-league-launches-new-fan-facing-platforms-as-part-of-digital-transformation); [PL app page](https://www.premierleague.com/en/pl-app); [Broadcast Now](https://www.broadcastnow.co.uk/tech-innovation/fan-engagement-premier-league-overhauls-app-and-website/5206642.article).
- **What it does:** it draws on **30+ seasons of stats, 300,000 articles and 9,000 videos** plus near-real-time data in season. Typical prompts: archive discovery ("great derby matches", "iconic moments"), club/player updates ("Update me on Tottenham Hotspur"), news summaries ("latest injury news"). It is reached through the Copilot icon and **is personalised if you join myPremierLeague** [V]. Source: [PL: "What is the Premier League Companion"](https://www.premierleague.com/en/news/4345260/what-is-the-premier-league-companion).
- **Roadmap stated at launch:** *open-text Q&A in fans' native languages through text and audio translation*, plus AI-powered fantasy management [V]. Sources: [Lowyat.NET, 2025](https://www.lowyat.net/2025/357877/premier-league-copilot-companion-tool/); [Microsoft Source EMEA feature](https://news.microsoft.com/source/emea/features/premier-league-microsoft-partnership/). I could not verify whether multilingual Q&A has shipped as of October 2026 [U].
- **Reception:** TechRadar ran *"The Premier League Companion is a new AI-powered tool for soccer fans, but it's useless – at least for now"* (2025, exact date unverified). The headline points to an early, largely pre-prompted experience [V for the headline; body not read]. Source: [TechRadar](https://www.techradar.com/computing/artificial-intelligence/the-premier-league-companion-is-a-new-ai-powered-tool-for-soccer-fans-but-its-useless-at-least-for-now). Fan-forum aggregators claim a **~20% engagement uplift**. Treat that as unverified marketing [U]. Source: [WindowsForum thread](https://windowsforum.com/threads/premier-league-azure-ai-partnership-copilot-fan-companion-drives-20-engagement-rise.391512/).

### 1.3 The Overlap integration (February 2026)

- From **12 February 2026 to the end of the 2025/26 season**, the Companion was integrated into **Gary Neville's The Overlap**: *Stick to Football*, *The Breakdown*, *The Fan Debate*, social cutdowns, and a **30-second TV spot during PL matches**. Pundits (Neville, Roy Keane, Jill Scott and others) used Copilot to "settle debates" with official data. **Sky Media** brokered the deal [V]. Sources: [Sky Media](https://www.skymedia.co.uk/news/microsoft-brings-ai-insight-to-football-conversations-with-the-premier-league-companion-on-the-overlap/); [Advanced Television, 17 Feb 2026](https://www.advanced-television.com/2026/02/17/microsoft-launches-premier-league-companion-format-with-the-overlap/); [Broadcast Now](https://www.broadcastnow.co.uk/tech-innovation/the-overlap-integrates-ai-powered-premier-league-data/5214138.article); [Prolific North](https://www.prolificnorth.co.uk/news/microsoft-ai-partnership-brings-real-time-premier-league-companion-data-to-gary-nevilles-overlap-podcasts/).
- **Why it matters for us:** Microsoft has already put Copilot into broadcast-style content as a **studio tool for pundits**. A hackathon entry that extends this into live, timed, on-screen output for the studio continues the same storyline.

### 1.4 Fantasy Premier League Companion (2026/27)

- For the season that **kicked off 21 August 2026**, FPL's **13m+ managers** get the **FPL Companion powered by Copilot, built using Microsoft Foundry**, using Azure OpenAI, an OpenAI GPT-5.x model (search summaries quote the PL article as "Chat GPT 5.4"; exact model unverified) and official PL data. It explains rules and FAQs to beginners and lets engaged managers dig into match and game data [V]. Sources: [PL: How the FPL Companion can help you in 2026/27](https://www.premierleague.com/en/news/4685134/how-the-fantasy-premier-league-companion-can-help-you-in-202627); [Microsoft Source EMEA](https://news.microsoft.com/source/emea/features/fantasy-premier-league-companion-gives-managers-a-new-tool-for-success/); [Technology Record](https://www.technologyrecord.com/article/microsoft-copilot-powered-fantasy-premier-league-companion-to-debut-this-season); [AI Magazine](https://aimagazine.com/news/how-premier-league-uses-microsoft-ai-to-guide-fpl-managers); [@MSFTnews on X](https://x.com/MSFTnews/status/2082151376084218246).
- Microsoft's own description: *"helps managers make more informed decisions each week using official Premier League data, personalized team insights and conversational AI"* [V, X post above].
- Reported future additions: more languages, voice interaction, deeper FPL integration [V, summary-level]. Source: [AI Magazine](https://aimagazine.com/news/how-microsoft-is-powering-the-premier-league-with-ai).

### 1.5 Vocabulary to echo in our pitch

These phrases come from the official materials above and the hackathon rules [V-rules: `OFFICIAL RULES.md` in `microsoft/insidethegamehackathon`].

| Phrase | Where it comes from |
|---|---|
| "Official Cloud and AI Partner" | PL partner page |
| "personalise the fan experience with AI for 1.8 billion people / fans in 189 countries" | Microsoft release title |
| "fan engagement, match insights and analysis, cloud transformation, organisational productivity" | Four pillars |
| "real-time data overlays and post-match analysis" | Launch coverage of Foundry use |
| "Premier League Companion powered by Copilot", "near real-time data", "tailored insights and bespoke content discovery at scale" | PL Companion explainer |
| "official Premier League data, personalized team insights and conversational AI" | FPL Companion |
| "make every match feel made for every fan", "explainable match intelligence", "timed and machine-readable enough to be rendered as synchronized graphical overlays on a live match feed" | Hackathon rules |
| "a Project that only generates metrics has no audience, and a solution that only personalizes has nothing to personalize" | Hackathon rules: quote this back to the judges |

Naming note [U]: Microsoft renamed **Azure AI Foundry → Microsoft Foundry** in late 2025. The 2025 PL materials say "Azure AI Foundry"; the 2026 FPL materials say "Microsoft Foundry". Use **Microsoft Foundry**.

### 1.6 Other PL digital partners worth knowing

- **Adobe** is "official digital fan experience partner". **Adobe Express and Firefly** are integrated into the PL app and site for fan-made images and video (custom kits, badges, FPL team art) [V]. Source: [SportsPro Tech Stack 2025/26](https://www.sportspro.com/commercial-guide/premier-league/data-analytics/tech-stack/). Implication: generative visual creativity for fans is already claimed by Adobe. Our differentiation should be **match intelligence and explanation**, not image generation.

### 1.7 The hackathon itself (context)

- The "Inside the Game: Developer Hackathon" runs on Microsoft Reactor (series S-1709). Listed learning sessions: **14 Oct 2026**, AI soccer-insights apps on **AKS / Azure Container Apps** (play styles, counterattacks, player patterns); **21 Oct 2026**, **Azure SQL, PostgreSQL, Cosmos DB** with PL-inspired scenarios [V]. Source: [Microsoft Reactor S-1709](https://developer.microsoft.com/en-us/reactor/series/S-1709/).
- **Competitive signal:** several public team repos already exist. Examples: *MatchMind* (timed on-screen graphics, analyst vs casual, EN/ES/TR), *MatchLens AI* (multi-agent), *MatchEyes*, and a multi-agent "fact-checked recaps" project on Microsoft Agent Framework [V, from GitHub search summaries]. Sources: [MatchMind](https://github.com/abhiiiesh/MatchMind); [KumarPadigeri/inside-the-game](https://github.com/KumarPadigeri/inside-the-game); [matcheyes](https://github.com/OlatunbosunIbiyinka/matcheyes). **The baseline is already crowded**, so differentiation has to be real (see section 8).

---

## 2. Official data and tracking providers

### 2.1 How PL data rights are structured

- **Football DataCo (FDC)** sells PL/EFL/SPFL data rights. Its two partners are **Genius Sports** and **Opta (Stats Perform)** [V]. Source: [SportsPro Tech Stack](https://www.sportspro.com/commercial-guide/premier-league/data-analytics/tech-stack/).
- **Genius Sports:** exclusive official **low-latency / betting data** partner since 2019, **extended through 2028/29**. It is also **"Official Tracking Data partner"**, supplying computer-vision/AI tracking insight to all 44 PL and Championship clubs [V]. Sources: [Genius newsroom: extension through 2029](https://www.geniussports.com/newsroom/genius-sports-and-football-dataco-extend-exclusive-official-data-partnership-through-2029/); [Sportico, 2024](https://www.sportico.com/business/sports-betting/2024/premier-league-extends-genius-sports-1234792053/); [Genius: tracking expansion](https://www.geniussports.com/newsroom/genius-sports-extends-official-betting-data-partnership-with-football-dataco-and-secures-ai-powered-tracking-technology-expansion-with-the-english-premier-league-and-english-football-league/).
- **Opta / Stats Perform:** exclusive collector and supplier of **official event data to media**: leagues, clubs, match centres, scoreboards, apps, and **broadcasters' on-screen graphics, studio analysis and commentary**. Under the **expanded deal (announced 12–13 Dec 2024)**, from **2025/26** Opta and **OptaAI** generate *"advanced AI-powered, data-led insights"* for FDC competitions, branded a *"new entertainment dimension"* [V]. Sources: [Stats Perform](https://www.statsperform.com/insights/expanded-partnership-with-football-dataco/); [SVG Europe](https://www.svgeurope.org/blog/news-roundup/stats-perform-expands-official-media-data-partnership-with-football-dataco/); [SBC News, 13 Dec 2024](https://sbcnews.co.uk/sportsbook/2024/12/13/stats-perform-provides-premier-league-insights-to-football-dataco/); [Inside World Football, 13 Dec 2024](https://www.insideworldfootball.com/2024/12/13/stats-perform-adds-ai-opta-expanded-football-dataco-deal/).
  - **Implication:** "AI-generated insights" as such is not new to PL broadcasters. OptaAI already produces them. Our novelty has to come from **live timing, explanation with evidence, per-viewer personalisation, language, and agentic orchestration into overlays**.

### 2.2 Optical / skeletal tracking and semi-automated offside

- **Real-time graphics deal (Oct 2022):** a Genius Sports agreement brought real-time tracking graphics to PL coverage (player running speed, shot velocity), available to Sky, BT Sport (now TNT) and Viaplay [V]. Sources: [Broadband TV News, 27 Oct 2022](https://www.broadbandtvnews.com/2022/10/27/new-data-partnership-to-change-view-of-premier-league/); [BT Community thread](https://community.bt.com/t5/TV-Content-including-TNT-Sports/Premier-League-to-introduce-real-time-graphics-and-data-into-its/td-p/2259019).
- **Skeletal tracking:** Genius's **Second Spectrum** tech captures sub-second positional data on every player and the ball at every PL ground. It reportedly uses up to ~30 cameras (custom rigs of **iPhones**) and models skeletal points per player at high frame rates. Reported figures vary between "29 skeletal points at 100 fps" and "10,000 surface points 200 times per second", so treat exact numbers as marketing [V for the existence, U for the numbers]. Sources: [Genius newsroom](https://www.geniussports.com/newsroom/football-dataco-expands-official-data-partnership-with-genius-sports-to-include-sub-second-skeletal-tracking-for-the-premier-league/); [Broadcast Now](https://www.broadcastnow.co.uk/tech-innovation/genius-sports-brings-skeletal-tracking-to-the-premier-league/5175903.article); [ESPN on SAOT and iPhones, 2025](https://www.espn.com/soccer/story/_/id/44038727/premier-league-fa-cup-semi-automated-var-offside-all-need-know).
- **SAOT:** developed by the PL, PGMOL and Genius Sports; **first used in the PL on 12 April 2025** (Matchweek 32, Man City v Crystal Palace) after FA Cup live use. It plots players in 3D and **generates virtual graphics for in-stadium and broadcast** [V]. Sources: [Genius newsroom](https://www.geniussports.com/newsroom/premier-league-to-bring-in-semi-automated-offside-technology-on-12-april-after-non-live-testing-and-live-operation-in-fa-cup/); [PL explainer](https://www.premierleague.com/en/news/4256036); [SVG Europe](https://www.svgeurope.org/blog/headlines/genius-sports-to-supply-semi-automated-offside-technology-for-the-premier-league/); [Training Ground Guru](https://trainingground.guru/premier-league-to-introduce-semi-automated-offsides-on-april-12th/).
- **GeniusIQ:** Genius's AI/computer-vision platform "automat[ing] the collection of real-time data and process[ing] it into new forms of insight and visualisations". It is used in the PL and was extended to the European Leagues in **August 2025** [V]. Source: [SportsPro, Aug 2025](https://www.sportspro.com/news/genius-sports-european-leagues-data-geniusiq-august-2025/).
- **Hawk-Eye (Sony)** [U, not re-verified]: provides PL **goal-line technology** (since 2013/14) and the **VAR replay infrastructure** at Stockley Park. It was *not* chosen for PL SAOT. Its **HawkAR / SkeleTRACK** 3D augmented-reality storytelling is live in tennis (ATP) [V for HawkAR]. Source: [Hawk-Eye HawkAR](https://www.hawkeyeinnovations.com/hawkar).

### 2.3 Premier League Data Zone: the closest existing thing to our brief

- **What it is:** a **data-driven alternate broadcast** from Premier League Productions and Genius Sports. **Player names/IDs, passing accuracy, shot speeds, sprints, total distance, touches in the final third, pitch maps / player mini-map** are woven into the live broadcast through an **L-bar**, using augmented visuals and overlays powered by **Second Spectrum** tracking. It also integrates **official FPL updates and rankings** [V]. Sources: [Genius newsroom](https://www.geniussports.com/newsroom/premier-league-productions-partners-with-genius-to-deliver-ground-breaking-premier-league-data-zone/); [SportBusiness](https://www.sportbusiness.com/news/genius-sports-plp-roll-out-premier-league-data-zone-worldwide/); [Broadcast Now](https://www.broadcastnow.co.uk/broadcasting/premier-league-productions-to-deliver-data-zone-broadcasts/5186505.article); [Broadcast Now: PLP trials augmented broadcasts](https://www.broadcastnow.co.uk/tech-innovation/premier-league-productions-trials-augmented-broadcasts/5181397.article); [Soccerscene](https://www.soccerscene.com.au/premier-league-productions-combine-with-genius-sports-to-bring-premier-league-data-zone/). Launch dates appear to be trials in 2023 and rollout around early 2024 [U].
- **Distribution:** **one featured match per round**, available in 185+ countries. Used by **NBC Sports (debuted exclusively on Peacock for an Arsenal–Liverpool match), Sky Sports, Optus Sport, ESPN Brazil, Canal+ France** [V]. Source: [NBC Sports Pressbox](https://www.nbcsports.com/pressbox/premier-league/press-releases/premier-league-data-zone-enhanced-viewing-experience-debuts-exclusively-on-peacock-for-this-sundays-arsenal-liverpool-match).
- **Limits we can exploit:** it is one fixed feed per round. It shows **numbers, not reasons**: no "why this matters", no control-vs-chaos or momentum narrative. It is **not personalised** (same overlay for analyst and casual fan, no favourite-player focus) and, as far as I can tell, **English-only** [U].
- **Status under Premier League Studios (2026/27):** not verified. Assume it continues because Genius's tracking contract runs to 2029 [U].

### 2.4 PL-owned data surfaces

- **PL app/website "Matchday Live"** (live stats, reporting), **Stats Centre**, match centre pages, the Companion, FPL [V for Matchday Live; U for current Stats Centre feature set]. Sources: [PL app page](https://www.premierleague.com/en/pl-app); [PL new platforms](https://www.premierleague.com/en/news/4337361/premier-league-launches-new-fan-facing-platforms-as-part-of-digital-transformation).
- **"Player Radar":** I could not verify a PL product by that name. Do not cite it [U].
- **Officiating transparency (2026/27):** **Key Match Incidents Panel verdicts are published weekly on the PL website and app**. Ref Cam audio can be aired as near-live replays (see section 4.4) [V]. Sources: [Sports Buzzfeed](https://www.sportsbuzzfeed.com/football/article/premier-league-var-changes-2026-27-referee-audio-k); [Yahoo Sports](https://sports.yahoo.com/articles/premier-league-let-hear-referees-155824661.html).

---

## 3. The production path: who renders overlays?

### 3.1 From PLP (IMG) to Premier League Studios

- Clubs voted in **November 2024** to bring international production and distribution in-house from **2026/27**, ending the ~20-year IMG partnership (Premier League Productions). PLP delivered **~6,000 hours a season to ~55 international broadcast partners in 189 markets**, including all 380 matches [V]. Sources: [SVG, 22 Nov 2024](https://www.sportsvideo.org/2024/11/22/premier-league-to-establish-in-house-media-operations-business-for-2026-27-season/); [PL/IMG joint statement](https://www.premierleague.com/en/news/4172032); [Deadline, Nov 2024](https://deadline.com/2024/11/premier-league-img-partnership-ends-1236185112/).
- **Premier League Studios** is based at **One Olympia, Kensington** (73,000 sq ft, 20-year lease). **Qvest** designed and implemented the facility (announced Sept 2025). **Andy Beale** (ex-BT Sport) is director of technology. IMG's run ended in **May 2026** [V]. Sources: [Insider Sport, 9 Jun 2025](https://insidersport.com/2025/06/09/premier-league-olympia-hq-media/); [Inside World Football, 10 Jun 2025](https://www.insideworldfootball.com/2025/06/10/epl-eyes-house-production-via-london-based-premier-league-studios/); [Advanced Television, 12 Sep 2025](https://www.advanced-television.com/2025/09/12/qvest-designs-production-facility-for-premier-league/); [TVBEurope](https://www.tvbeurope.com/live-production/qvest-to-design-and-implement-new-production-facility-for-english-premier-league); [Deadline, May 2026](https://deadline.com/2026/05/img-premier-league-production-end-of-era-1236917732/).
- Masters has said in-house production **"provides option for future DTC service"** [V, headline]. Source: [Broadcast Now](https://www.broadcastnow.co.uk/broadcasting/premier-league-chief-move-to-in-house-production-provides-option-for-future-dtc-service/5209609.article).

### 3.2 Graphics vendors on record

| Vendor | Role on record | Status 2026/27 |
|---|---|---|
| **AE Live** (formerly Alston Elliot) | Broadcast and virtual graphics for PLP at Stockley Park: **match graphics across all 380 games** plus PLP's virtual sets. The 2022/23 virtual set was designed by Jago and built on **Zero Density Reality Engine (Unreal), Stype RedSpy tracking** [V]. Also did **BT Sport PL graphics** [V]. | Continuity with Premier League Studios **unverified** [U] |
| **Boost Graphics** (EMG / Gravity Media) | Unreal Engine, Cesium, Cinema 4D animations "exclusively for the Premier League" (12 animations in 2023, 80 variants in 2024) [V] | Unverified [U] |
| **Genius Sports / Second Spectrum** | Data-driven augmented overlays (Data Zone L-bar, player IDs, speed, mini-map) and SAOT virtual offside graphics [V] | Tracking contract to 2029 [V]; Data Zone status [U] |
| **Vizrt** | Sky's mixed-reality analysis studio (MNF): **Unreal inside Viz 5** [V]; Viaplay's PL output [V] | Broadcaster-side |
| **Hawk-Eye (Sony)** | GLT/VAR replay graphics [U]; HawkAR in tennis [V] | Not the PL's SAOT/AR provider |

Sources: [AE Live: Premier League](https://www.ae.live/work/premier-league); [NewscastStudio, 22 Nov 2022](https://www.newscaststudio.com/2022/11/22/ae-live-premier-league-virtual-set/); [Broadcast Now: AE Live/BT Sport](https://www.broadcastnow.co.uk/production/ae-live-scores-bt-sport-premier-league-graphics/5163826.article); [NewscastStudio: Boost Graphics, 17 Dec 2024](https://www.newscaststudio.com/2024/12/17/boost-graphics-subsidiary-of-emg-gravity-media-delivers-graphics-for-major-english-football-league/); [Broadcast Bridge](https://www.thebroadcastbridge.com/content/entry/20943/boost-graphics-delivers-stunning-visual-graphics-for-major-english-football); [SVG Europe: Sky mixed-reality studio](https://www.svgeurope.org/blog/headlines/breaking-the-lines-sky-sports-unveils-mixed-reality-presentation-studio-for-monday-night-football-and-us-open-tennis-coverage/); [TV Technology: Viaplay/Vizrt](https://www.tvtechnology.com/news/viaplay-taps-vizrt-to-increase-live-premier-league-content-output).

### 3.3 Who is "the platform's rendering partner"?

The rules say outputs should be *"timed and machine-readable enough to be rendered as synchronized graphical overlays on a live match feed, in the way the platform's rendering partner handles overlays in the production path"* [V-rules]. The rules file does not mention Genius, Opta, Hawk-Eye or tracking at all (GitHub code search returned zero hits for those terms).

My assessment, which is inference [U]:

1. **Most likely meaning: Genius Sports (Second Spectrum).** It is the PL's official tracking partner and already renders **data-driven overlays synced to the PL feed** (Data Zone). Its metrics match the rules' "suggested features" closely: player name tagging, speed/distance, pass accuracy, shot speed.
2. **Second candidate: AE Live** (or whoever now runs Premier League Studios' template graphics engine). It is the conventional "rendering partner" in a production path, taking data into templates on air across all 380 matches.
3. **Possibly generic.** The phrase may just mean "a downstream renderer you don't build". Either way, the judges want **clean, timed, structured cues**, not burned-in video.

**Design consequence:** emit a **renderer-agnostic overlay cue stream**. Each cue carries match clock and wall-clock/timecode, `event_ids` evidence, `template_id`, data fields, priority, TTL and audience/language variants. Then show two or three consumers: our own HTML/WebGL overlay for the demo, plus a stub adapter showing how the same cues would feed a Viz/Unreal-style template or a Data-Zone-style L-bar. Say "renderer-agnostic", not "we integrate with Genius/Vizrt", unless we really do.

---

## 4. UK broadcaster stats and graphics practice

### 4.1 Rights 2025/26–2028/29

- **Sky Sports:** packages B–E, **at least 215 live matches a season**, including all final-day games. **TNT Sports:** package A, **52 matches** (Saturday 12:30 plus two midweek rounds). **BBC:** highlights of all 380. **Amazon Prime Video** (20 matches/season in the previous cycle) **reportedly did not bid**. Total about **£6.7bn** [V]. Sources: [Inside World Football](https://insideworldfootball.com/?p=146632); [IMDb/Deadline wire](https://m.imdb.com/news/ni64350134); [Sky Group](https://skygroup.sky/en-gb/article/sky-sports-remains-the-undisputed-home-for-sport-fans-in-the-uk-until-the-end-of-the-decade-).

### 4.2 Sky Sports

- **2025/26 (announced Aug 2025):** **Multiview** (every concurrent live match, moving ground to ground with dedicated commentary); **Fanalysis** partnership (fan player ratings and manager verdicts fed into broadcasts); **Extra Time** reaction show; **vertical highlights** in the Sky Sports app [V]. Sources: [Sky Group](https://skygroup.sky/article/sky-sports-unveils-its-biggest-ever-premier-league-season-with-record-breaking-live-coverage-and-unmissable-super-sundays); [ISPreview, Aug 2025](https://www.ispreview.co.uk/index.php/2025/08/sky-uk-increases-its-premier-league-tv-sports-content-and-coverage.html); [TVBEurope](https://www.tvbeurope.com/media-consumption/sky-sports-prepares-for-premier-league-kick-off-with-multiview-vertical-highlights-and-more); [Broadcast Now](https://www.broadcastnow.co.uk/broadcasting/sky-sports-unveils-new-features-and-host-for-record-breaking-premier-league-coverage/5207758.article).
- **2026/27:** **"Moments"**, a personalised vertical-video feed by chosen sports, teams and competitions; **"Your Multiview"** (up to four live Sky Sports events on one screen, Aug 2026); Sky Glass/Stream team pages and start-from-beginning [V]. Sources: [Sky Sports: Moments](https://www.skysports.com/football/news/13572529/moments-on-the-sky-sports-app-your-new-personal-video-feed-of-highlights-viral-clips-reaction-and-more); [The Luxe Review, 19 Aug 2026](https://theluxereview.com/2026/08/19/new-sky-multiview-feature-lets-sports-fans-watch-four-live-events-on-a-single-screen/); [TechBuzz Ireland, 20 Aug 2026](https://techbuzzireland.com/2026/08/20/sky-launches-your-multiview-allowing-customers-to-watch-up-to-four-live-sky-sports-events-simultaneously-on-one-screen/).
- **Studio analysis:** Monday Night Football uses a **mixed-reality studio**: enhanced touchscreen and table, **3D virtual reconstructions** where the camera can go anywhere and players can be moved "to show what could have happened", and an **LED floor** for tactics. It runs on **Vizrt Viz 5 with Unreal Engine** [V; studio launch date unverified]. Sources: [SVG Europe](https://www.svgeurope.org/blog/headlines/breaking-the-lines-sky-sports-unveils-mixed-reality-presentation-studio-for-monday-night-football-and-us-open-tennis-coverage/); [Televisual](https://www.televisual.com/news/sky-sports-debuts-studio-on-monday-night-football/). Historical note [U]: the early MNF touchscreen era used **Piero** (BBC R&D, later Red Bee/Ericsson, then reportedly acquired by Ross Video) and Vizrt's Libero/Arena family. Not re-verified.
- **Gap:** Sky personalises **what you watch** (Moments, Multiview, team pages). It does not personalise **the data and explanation layer** inside a live match.

### 4.3 TNT Sports, BBC, Amazon

- **TNT Sports:** no 2025–26 PL-specific graphics innovations surfaced in my searches. AE Live previously did BT Sport's PL graphics [V, see above]. Source gap; the web-search budget ran out here.
- **BBC Match of the Day** [U]: the post-Lineker era from 2025/26 has a rotating presenter team (Gabby Logan, Mark Chapman, Kelly Cates). Highlights for all 380 matches [V for rights]. I found no verified BBC AI/data-graphics innovation.
- **Amazon Prime Video** [U]: during 2019/20–2024/25 (about 20 matches a season) Prime used **X-Ray** for live stats and line-ups in-stream. It is a precedent for viewer-controlled data panels, and it no longer exists for UK PL rights.

### 4.4 League-mandated broadcast innovations

- **2025/26:** touchline **substitution interviews**, limited **dressing-room cameras** (no team talks), pitch-side camera access for goal celebrations [V]. Sources: [Goal](https://www.goal.com/en/lists/premier-league-introduce-substitution-interviews-2025-26-tv-coverage-us-style-innovations/blt48504c0c730ce2db); [NBS Sport, 27 Jun 2025](https://nbssport.co.ug/2025/06/27/premier-league-to-revolutionize-tv-coverage-with-in-game-interviews/).
- **2026/27:** **Ref Cam** grows from ~20 to ~45 matches. Broadcasters may air **referee–player audio** (one or two incidents per round, as near-live replays; no VAR audio, per IFAB). **KMI Panel verdicts** are published weekly [V]. Sources: [Future Sport Feed: PL 2026/27 Innovation Playbook](https://futuresportfeed.substack.com/p/premier-league-epl-202627-innovation); [Goal](https://www.goal.com/en-us/lists/no-more-secrets-premier-league-broadcasters-set-expose-explosive-pitch-conversations-players-referees/blt1b1d7e5d23a9836b); [Yahoo Sports](https://sports.yahoo.com/articles/premier-league-let-hear-referees-155824661.html).
- Implication: the league is actively pushing **transparency and explanation** this season. An "explain the moment" product fits that direction.

---

## 5. Fan-facing personalisation already on the market

| Surface | What's personalised | Source |
|---|---|---|
| PL app (myPremierLeague) | Alerts and content around chosen clubs, players, matches; Companion responses personalised when logged in | [PL](https://www.premierleague.com/en/news/4345260/what-is-the-premier-league-companion) [V] |
| PL Companion | Conversational Q&A over the archive, news and stats; multilingual and audio "coming" | [Lowyat](https://www.lowyat.net/2025/357877/premier-league-copilot-companion-tool/) [V] |
| FPL Companion (2026/27) | Squad advice and rules help using the manager's own team | [PL](https://www.premierleague.com/en/news/4685134/how-the-fantasy-premier-league-companion-can-help-you-in-202627) [V] |
| Adobe Firefly in PL app | Fan-generated kits, badges, FPL art | [SportsPro](https://www.sportspro.com/commercial-guide/premier-league/data-analytics/tech-stack/) [V] |
| Sky Sports app | "Moments" personal vertical feed; vertical highlights; Your Multiview | [Sky Sports](https://www.skysports.com/football/news/13572529/moments-on-the-sky-sports-app-your-new-personal-video-feed-of-highlights-viral-clips-reaction-and-more) [V] |
| Peacock (US, 2026/27) | Multiview, **"Catch Up with Key Plays"**, Live Actions, "Find Your Match" club-matching quiz, Live Picks predictions | [NBCUniversal](https://www.nbcuniversal.com/article/2026-27-premier-league-season-kicks-one-month-across-platforms-nbcuniversal-nbc-sports-studio-team) [V] |
| Data Zone | Not personalised; one alternate feed per round | [Genius](https://www.geniussports.com/newsroom/premier-league-productions-partners-with-genius-to-deliver-ground-breaking-premier-league-data-zone/) [V] |
| Clubs | Not researched in depth (tool limits). Known example [U]: Liverpool and Google DeepMind's **TacticAI** (2024 research on corner-kick tactics), which is coaching-facing, not fan-facing | (unverified) |

Accessibility (audio description, simplified-language modes, sign language) was **not verified** in this session. I know of no PL-wide AI audio-description product [U]. Treat it as a probable gap and verify before claiming "first".

---

## 6. International distribution and language

- **Scale:** PL content reaches **189 countries/markets** via **~55 international broadcast partners**, now fed by Premier League Studios [V]. Sources: [SVG](https://www.sportsvideo.org/2024/11/22/premier-league-to-establish-in-house-media-operations-business-for-2026-27-season/); [Microsoft Source](https://news.microsoft.com/source/2025/07/01/premier-league-and-microsoft-announce-five-year-strategic-partnership-to-personalize-the-fan-experience-with-ai-for-1-8-billion-people/).
- **Model:** one international production (world feed plus graphics) is localised by each rights-holder: local commentary, studio, graphics language. Smaller rights-holders get the world feed's English-language graphics [U, standard industry practice].
- **Key territories** (2026/27 holders are mostly [U], not re-verified in this session):
  - **USA:** NBCUniversal (NBC, USA Network, **Peacock**, **Telemundo/Universo** for Spanish) [V for NBC/Peacock 2026/27; U for the Spanish detail]. Source: [NBC Sports Pressbox](https://www.nbcsports.com/pressbox/press-releases/the-2026-27-premier-league-season-kicks-off-in-one-month-across-platforms-of-nbcuniversal-with-nbc-sports-studio-team-on-site-in-u-k).
  - **India:** JioStar (JioHotstar / Star Sports), with multiple Indian-language commentary feeds [U].
  - **Australia:** **Stan Sport** (Nine) from 2025/26, replacing Optus Sport [U]. Optus was a Data Zone adopter [V].
  - **Sub-Saharan Africa:** SuperSport (MultiChoice, now under Canal+) [U]. **MENA:** beIN Sports [U]. **France:** Canal+ (Data Zone adopter) [V]. **Brazil:** ESPN (Data Zone adopter) [V].
  - **Singapore:** **Premier League+**, the PL's first DTC service, announced **27 Feb 2026**. It streams all 380 matches plus a 24/7 channel, **launching from August 2026 with StarHub** (six-year deal), and could be repeated in other markets [V for the announcement; **launch status unverified**]. Sources: [Broadband TV News, 27 Feb 2026](https://www.broadbandtvnews.com/2026/02/27/premier-league-to-launch-direct-to-consumer-streaming-platform-in-singapore/); [Broadcast Now](https://www.broadcastnow.co.uk/broadcasting/premier-league-to-launch-d2c-streaming-service-in-singapore/5214353.article); [ESPN](https://www.espn.com/soccer/story/_/id/48044798/premier-league-launch-direct-streaming-premier-league-plus-singapore); [Malay Mail, 27 Feb 2026](https://www.malaymail.com/news/sports/2026/02/27/premier-league-to-launch-streaming-service-in-singapore-next-season/210553).
- **Gaps where AI multilingual narratives add value:**
  1. **DTC (Premier League+)** has no local broadcaster to localise graphics, captions or analysis, so the PL must do it itself. Singapore alone has four official languages (English, Mandarin, Malay, Tamil).
  2. **Long-tail languages** that no rights-holder produces commentary for, such as diaspora fans in markets where only English or one local language is offered.
  3. **Text/graphic narratives** cost far less to localise than live commentary. A "narrative cue" can be generated once with evidence and rendered in N languages with **terminology control** (player names, club names, football idiom).
  4. The **Companion roadmap** already promises native-language Q&A with audio translation [V]. Live in-match multilingual explanation extends that promise.

---

## 7. Gaps and opportunities (what does not exist yet)

1. **Explanation layer in the live feed.** Data Zone shows *what* (speed 34 km/h, 92% passing). OptaAI gives text insights to broadcasters. Nothing public produces **live, evidence-linked "why this matters" cues** (momentum shifts, control vs chaos, pressure changes, rhythm) timed for on-screen rendering [V for the existing products; the "nothing public" claim is my assessment, U].
2. **Per-viewer overlays.** Broadcasters personalise packaging (Moments, Multiview, Key Plays). Nobody personalises the **in-match data and explanation layer**: analyst vs casual depth, favourite-club framing, **player-focus mode**, single-metric mode [U assessment].
3. **Multilingual, terminology-safe narratives** for DTC and long-tail markets. Promised for the Companion, not shown for live match graphics [V/U].
4. **Trust and provenance.** PL officiating is moving toward transparency (KMI Panel, Ref Cam audio). An AI layer whose every claim links to source event IDs, with a confidence score and a human approval step, fits both the league's mood and Microsoft's Responsible AI story [U assessment].
5. **Operator co-pilot for the gallery.** Premier League Studios now produces all 380 matches in-house with a newly built operation. An agent that **proposes graphics cues to a human graphics operator** (accept / edit / reject, with audit trail) is an enterprise story that doesn't threaten the rendering vendor [U assessment].
6. **Automated, personalised recaps.** Sky does vertical highlights and the PL does Matchday stories. Personalised **text + graphic recaps** (by club, player, language, depth) generated from the event log within minutes of full time are not offered on official surfaces [U assessment].
7. **Synthetic data as a product.** Real tracking data is locked behind Genius and Opta contracts. A credible **synthetic event + tracking generator** with tunable team styles lets the PL, broadcasters and developers prototype graphics without licensing real data, and it scores directly under the judging criterion on "synthetic data creation quality" [V-rules for the criterion].
8. **Accessibility:** AI audio-description narration and plain-language mode, driven by the same cue stream. Probably unserved [U].

### Capability map

| Existing capability | Who provides it | What we could build that's new |
|---|---|---|
| Conversational archive and stats Q&A (Premier League Companion) | Microsoft Copilot / Azure OpenAI on PL app and web | **In-match** companion: "why did that just matter?" answered from the live event state, with cited event IDs |
| FPL advice chatbot | Microsoft Foundry, FPL Companion (2026/27) | FPL-aware overlay mode: live "your captain's involvement" cues during the match |
| Pundit debate-settling with data (The Overlap) | Copilot via Sky Media | Studio "producer agent" that surfaces the 3 best talking points per phase, with evidence, for presenters |
| Official event data and AI insights for media | Opta / Stats Perform (OptaAI from 2025/26) | Live, **timed** insight cues tied to match clock and audience profile, not static notes |
| Optical/skeletal tracking; SAOT | Genius Sports / Second Spectrum | Synthetic tracking generator plus derived metrics (pass difficulty, pressure index) with explainable formulas |
| Data Zone L-bar overlay (one match per round, same for all) | Genius Sports + PLP (now Premier League Studios) | **Per-viewer** overlay stream: analyst/casual, club, player-focus, language; any match |
| Match graphics templates and virtual sets | AE Live (PLP era), Boost Graphics; Vizrt/Unreal at Sky | Renderer-agnostic **overlay cue contract** (JSON plus timecode) with adapters; operator approval UI |
| Personal video feeds, Multiview, Key Plays | Sky (Moments, Your Multiview), Peacock | Personalised **narrative recaps** and milestone alerts from the event log, multilingual |
| Ref Cam audio, KMI Panel verdicts | PL / PGMOL | Plain-language "decision explainer" cards (synthetic incidents only, clearly labelled) |
| World-feed graphics in English; local commentary by rights-holders | Premier League Studios + ~55 broadcasters | Multilingual narrative captions with glossary/terminology control for DTC (Premier League+) and long-tail markets |
| Fan creative tools | Adobe Express / Firefly | Not our lane. Avoid overlapping |

---

## 8. Implications for our entry

1. **Pitch it as the promised "real-time data overlays and post-match analysis" pillar, delivered agentically.** Open with the July 2025 language: Foundry, "real-time data overlays", "match insights and analysis". Then show what Copilot already does (Companion, Overlap, FPL) and position our entry as **the live-match, on-screen counterpart to the Companion**. Do not pitch "a chatbot about football"; that already exists.
2. **Build an explanation layer, not another metrics dashboard.** Data Zone and OptaAI already exist, and the competing public repos already do analyst-vs-casual and EN/ES/TR. Our moat should be:
   - (a) **explanations grounded in evidence**: each cue lists `event_ids` and the derived-metric formula, with an automated verifier agent that rejects unsupported claims;
   - (b) **phase-level football concepts** (control vs chaos, pressure shift, rhythm/tempo) defined transparently;
   - (c) a **player-focus mode** that follows one player all match.
3. **Make the output renderer-agnostic and production-shaped.** Publish a versioned **Overlay Cue schema** (timecode, match clock, template id, payload, priority, TTL, audience/language variants, evidence). Demo it with our own browser overlay synced to a video or animated pitch, and include a one-page "how this plugs into a Data-Zone-style L-bar / Viz-Unreal template" note. Don't claim integration with Genius, AE Live or Vizrt. Say "designed for the production path's rendering partner".
4. **Human-in-the-loop operator console** (this targets the Best Enterprise Solution prize). A gallery operator approves or edits proposed cues. Show latency, cue acceptance rate and audit log. That gives Premier League Studios a credible adoption story and matches Microsoft's Responsible AI messaging.
5. **Multi-agent design with clear roles** (targets the Best Multi-Agent System prize): Ingest/State agent → Insight/Pattern agent → Explainer agent → Fact-check/Verifier agent → Personalisation and Localisation agent → Cue Scheduler/Director agent → Recap agent. Use **Microsoft Agent Framework** on **Foundry**, expose match-state tools through **MCP**, and show agent traces.
6. **Azure-native architecture** (targets the Best Azure Cloud Native Integration prize): Event Hubs (live synthetic stream) → Container Apps or AKS agents (matches the 14 Oct session) → Cosmos DB/PostgreSQL state (matches the 21 Oct session) → SignalR/Web PubSub to overlay clients → Fabric for post-match analytics. Mention **Microsoft Fabric** and **GitHub Copilot** explicitly, since both are listed hero tech.
7. **Treat synthetic data as a first-class deliverable.** Ship a generator with tunable team "styles" (high press, counter-attack), realistic event and tracking distributions, and a validation report. It earns marks under Technological Implementation and sidesteps Genius/Opta licensing. Say so in the pitch.
8. **Lead the personalisation demo with a global market.** Show one moment rendered three ways: analyst English, casual Mandarin or Malay, and a player-focus view, framed around **Premier League+ Singapore (DTC)** and "1.8 billion fans in 189 countries". Use a terminology glossary so player and club names never get mistranslated.
9. **Stay inside the guardrails.** Use synthetic data only, with no real player likenesses unless synthetic or permitted. Avoid betting framing, because Genius's betting business makes this sensitive for the PL. Label any "decision explainer" as illustrative.
10. **Verify before pitching.** Items tagged [U] should be checked by a teammate with normal web access: AE Live's status under Premier League Studios, Data Zone in 2026/27, the Premier League+ launch, the Companion's multilingual rollout, international rights-holders, and the BBC/TNT details.

---

## Sources

Official / primary
- Microsoft Source, "Premier League and Microsoft announce five-year strategic partnership…", 1 Jul 2025: https://news.microsoft.com/source/2025/07/01/premier-league-and-microsoft-announce-five-year-strategic-partnership-to-personalize-the-fan-experience-with-ai-for-1-8-billion-people/
- Microsoft IR copy of release: https://microsoft.gcs-web.com/news-releases/news-release-details/premier-league-and-microsoft-announce-five-year-strategic
- Microsoft Source EMEA feature: https://news.microsoft.com/source/emea/features/premier-league-microsoft-partnership/
- Microsoft Source EMEA, FPL Companion: https://news.microsoft.com/source/emea/features/fantasy-premier-league-companion-gives-managers-a-new-tool-for-success/
- Microsoft customer stories: https://www.microsoft.com/en/customers/brand-collections/premier-league-innovations ; https://www.microsoft.com/en-us/customers/brand-collections/premier-league-transforming-fan-experiences
- @MSFTnews on X (FPL Companion): https://x.com/MSFTnews/status/2082151376084218246
- Premier League: partner page https://www.premierleague.com/en/about/partners/microsoft ; partnership news https://www.premierleague.com/en/news/4338015/premier-league-announces-partnership-with-microsoft ; Companion explainer https://www.premierleague.com/en/news/4345260/what-is-the-premier-league-companion ; new platforms https://www.premierleague.com/en/news/4337361/premier-league-launches-new-fan-facing-platforms-as-part-of-digital-transformation ; FPL Companion 2026/27 https://www.premierleague.com/en/news/4685134/how-the-fantasy-premier-league-companion-can-help-you-in-202627 ; SAOT explainer https://www.premierleague.com/en/news/4256036 ; PL/IMG statement https://www.premierleague.com/en/news/4172032 ; app https://www.premierleague.com/en/pl-app
- Hackathon: Microsoft Reactor S-1709 https://developer.microsoft.com/en-us/reactor/series/S-1709/ ; official rules (GitHub, microsoft/insidethegamehackathon, `OFFICIAL RULES.md`)
- Genius Sports newsroom: Data Zone https://www.geniussports.com/newsroom/premier-league-productions-partners-with-genius-to-deliver-ground-breaking-premier-league-data-zone/ ; FDC extension to 2029 https://www.geniussports.com/newsroom/genius-sports-and-football-dataco-extend-exclusive-official-data-partnership-through-2029/ ; skeletal tracking https://www.geniussports.com/newsroom/football-dataco-expands-official-data-partnership-with-genius-sports-to-include-sub-second-skeletal-tracking-for-the-premier-league/ ; tracking expansion https://www.geniussports.com/newsroom/genius-sports-extends-official-betting-data-partnership-with-football-dataco-and-secures-ai-powered-tracking-technology-expansion-with-the-english-premier-league-and-english-football-league/ ; SAOT 12 April https://www.geniussports.com/newsroom/premier-league-to-bring-in-semi-automated-offside-technology-on-12-april-after-non-live-testing-and-live-operation-in-fa-cup/
- Stats Perform, expanded FDC partnership: https://www.statsperform.com/insights/expanded-partnership-with-football-dataco/
- NBC Sports Pressbox, Data Zone on Peacock: https://www.nbcsports.com/pressbox/premier-league/press-releases/premier-league-data-zone-enhanced-viewing-experience-debuts-exclusively-on-peacock-for-this-sundays-arsenal-liverpool-match ; 2026/27 season release https://www.nbcsports.com/pressbox/press-releases/the-2026-27-premier-league-season-kicks-off-in-one-month-across-platforms-of-nbcuniversal-with-nbc-sports-studio-team-on-site-in-u-k ; https://www.nbcuniversal.com/article/2026-27-premier-league-season-kicks-one-month-across-platforms-nbcuniversal-nbc-sports-studio-team
- Sky: https://skygroup.sky/article/sky-sports-unveils-its-biggest-ever-premier-league-season-with-record-breaking-live-coverage-and-unmissable-super-sundays ; https://skygroup.sky/en-gb/article/sky-sports-remains-the-undisputed-home-for-sport-fans-in-the-uk-until-the-end-of-the-decade- ; Moments https://www.skysports.com/football/news/13572529/moments-on-the-sky-sports-app-your-new-personal-video-feed-of-highlights-viral-clips-reaction-and-more ; Sky Media/Overlap https://www.skymedia.co.uk/news/microsoft-brings-ai-insight-to-football-conversations-with-the-premier-league-companion-on-the-overlap/
- AE Live, Premier League work: https://www.ae.live/work/premier-league
- Hawk-Eye HawkAR: https://www.hawkeyeinnovations.com/hawkar

Trade and news press
- Advanced Television: 2 Jul 2025 https://www.advanced-television.com/2025/07/02/microsoft-premier-league-digital-parnership/ ; 17 Feb 2026 https://www.advanced-television.com/2026/02/17/microsoft-launches-premier-league-companion-format-with-the-overlap/ ; 12 Sep 2025 https://www.advanced-television.com/2025/09/12/qvest-designs-production-facility-for-premier-league/
- CNBC, 1 Jul 2025: https://www.cnbc.com/2025/07/01/english-premier-league-integrates-microsoft-ai-into-fan-app.html
- DCD: https://www.datacenterdynamics.com/en/news/premier-league-agrees-five-year-cloud-and-ai-deal-with-microsoft/
- Yahoo Finance: https://finance.yahoo.com/news/premier-league-microsoft-partner-enhance-095543263.html
- SportsPro: Tech Stack 2025/26 https://www.sportspro.com/commercial-guide/premier-league/data-analytics/tech-stack/ ; Genius/European Leagues Aug 2025 https://www.sportspro.com/news/genius-sports-european-leagues-data-geniusiq-august-2025/ ; PLP split analysis https://www.sportspro.com/insights/analysis/premier-league-media-production-img-plp-split/
- Broadcast Now: app overhaul https://www.broadcastnow.co.uk/tech-innovation/fan-engagement-premier-league-overhauls-app-and-website/5206642.article ; Overlap https://www.broadcastnow.co.uk/tech-innovation/the-overlap-integrates-ai-powered-premier-league-data/5214138.article ; Data Zone https://www.broadcastnow.co.uk/broadcasting/premier-league-productions-to-deliver-data-zone-broadcasts/5186505.article ; augmented trials https://www.broadcastnow.co.uk/tech-innovation/premier-league-productions-trials-augmented-broadcasts/5181397.article ; skeletal tracking https://www.broadcastnow.co.uk/tech-innovation/genius-sports-brings-skeletal-tracking-to-the-premier-league/5175903.article ; DTC option https://www.broadcastnow.co.uk/broadcasting/premier-league-chief-move-to-in-house-production-provides-option-for-future-dtc-service/5209609.article ; Singapore DTC https://www.broadcastnow.co.uk/broadcasting/premier-league-to-launch-d2c-streaming-service-in-singapore/5214353.article ; Sky features https://www.broadcastnow.co.uk/broadcasting/sky-sports-unveils-new-features-and-host-for-record-breaking-premier-league-coverage/5207758.article ; AE Live/BT Sport https://www.broadcastnow.co.uk/production/ae-live-scores-bt-sport-premier-league-graphics/5163826.article
- SVG / SVG Europe: in-house media ops, 22 Nov 2024 https://www.sportsvideo.org/2024/11/22/premier-league-to-establish-in-house-media-operations-business-for-2026-27-season/ ; Stats Perform https://www.svgeurope.org/blog/news-roundup/stats-perform-expands-official-media-data-partnership-with-football-dataco/ ; SAOT https://www.svgeurope.org/blog/headlines/genius-sports-to-supply-semi-automated-offside-technology-for-the-premier-league/ ; Sky MR studio https://www.svgeurope.org/blog/headlines/breaking-the-lines-sky-sports-unveils-mixed-reality-presentation-studio-for-monday-night-football-and-us-open-tennis-coverage/
- Deadline: Nov 2024 https://deadline.com/2024/11/premier-league-img-partnership-ends-1236185112/ ; May 2026 https://deadline.com/2026/05/img-premier-league-production-end-of-era-1236917732/
- Insider Sport, 9 Jun 2025: https://insidersport.com/2025/06/09/premier-league-olympia-hq-media/
- Inside World Football: 10 Jun 2025 https://www.insideworldfootball.com/2025/06/10/epl-eyes-house-production-via-london-based-premier-league-studios/ ; 13 Dec 2024 https://www.insideworldfootball.com/2024/12/13/stats-perform-adds-ai-opta-expanded-football-dataco-deal/ ; UK rights https://insideworldfootball.com/?p=146632
- TVBEurope (Qvest): https://www.tvbeurope.com/live-production/qvest-to-design-and-implement-new-production-facility-for-english-premier-league ; Sky kick-off https://www.tvbeurope.com/media-consumption/sky-sports-prepares-for-premier-league-kick-off-with-multiview-vertical-highlights-and-more
- NewscastStudio: AE Live virtual set, 22 Nov 2022 https://www.newscaststudio.com/2022/11/22/ae-live-premier-league-virtual-set/ ; Boost Graphics, 17 Dec 2024 https://www.newscaststudio.com/2024/12/17/boost-graphics-subsidiary-of-emg-gravity-media-delivers-graphics-for-major-english-football-league/
- Broadcast Bridge (Boost Graphics): https://www.thebroadcastbridge.com/content/entry/20943/boost-graphics-delivers-stunning-visual-graphics-for-major-english-football
- TV Technology (Viaplay/Vizrt): https://www.tvtechnology.com/news/viaplay-taps-vizrt-to-increase-live-premier-league-content-output
- Televisual (Sky MNF studio): https://www.televisual.com/news/sky-sports-debuts-studio-on-monday-night-football/
- SportBusiness (Data Zone worldwide): https://www.sportbusiness.com/news/genius-sports-plp-roll-out-premier-league-data-zone-worldwide/
- Soccerscene (Data Zone): https://www.soccerscene.com.au/premier-league-productions-combine-with-genius-sports-to-bring-premier-league-data-zone/
- Broadband TV News: 27 Oct 2022 https://www.broadbandtvnews.com/2022/10/27/new-data-partnership-to-change-view-of-premier-league/ ; 27 Feb 2026 https://www.broadbandtvnews.com/2026/02/27/premier-league-to-launch-direct-to-consumer-streaming-platform-in-singapore/
- ESPN: SAOT/iPhones https://www.espn.com/soccer/story/_/id/44038727/premier-league-fa-cup-semi-automated-var-offside-all-need-know ; Premier League+ https://www.espn.com/soccer/story/_/id/48044798/premier-league-launch-direct-streaming-premier-league-plus-singapore
- Malay Mail, 27 Feb 2026: https://www.malaymail.com/news/sports/2026/02/27/premier-league-to-launch-streaming-service-in-singapore-next-season/210553
- Sportico, 2024: https://www.sportico.com/business/sports-betting/2024/premier-league-extends-genius-sports-1234792053/
- SBC News, 13 Dec 2024: https://sbcnews.co.uk/sportsbook/2024/12/13/stats-perform-provides-premier-league-insights-to-football-dataco/
- Training Ground Guru (SAOT date): https://trainingground.guru/premier-league-to-introduce-semi-automated-offsides-on-april-12th/
- ISPreview, Aug 2025: https://www.ispreview.co.uk/index.php/2025/08/sky-uk-increases-its-premier-league-tv-sports-content-and-coverage.html
- The Luxe Review, 19 Aug 2026: https://theluxereview.com/2026/08/19/new-sky-multiview-feature-lets-sports-fans-watch-four-live-events-on-a-single-screen/
- TechBuzz Ireland, 20 Aug 2026: https://techbuzzireland.com/2026/08/20/sky-launches-your-multiview-allowing-customers-to-watch-up-to-four-live-sky-sports-events-simultaneously-on-one-screen/
- Goal (2025/26 innovations): https://www.goal.com/en/lists/premier-league-introduce-substitution-interviews-2025-26-tv-coverage-us-style-innovations/blt48504c0c730ce2db ; (Ref Cam audio) https://www.goal.com/en-us/lists/no-more-secrets-premier-league-broadcasters-set-expose-explosive-pitch-conversations-players-referees/blt1b1d7e5d23a9836b
- NBS Sport, 27 Jun 2025: https://nbssport.co.ug/2025/06/27/premier-league-to-revolutionize-tv-coverage-with-in-game-interviews/
- Yahoo Sports (referee audio): https://sports.yahoo.com/articles/premier-league-let-hear-referees-155824661.html
- Sports Buzzfeed (2026/27 VAR changes): https://www.sportsbuzzfeed.com/football/article/premier-league-var-changes-2026-27-referee-audio-k
- Future Sport Feed (2026/27 innovation playbook, Substack; secondary): https://futuresportfeed.substack.com/p/premier-league-epl-202627-innovation
- Lowyat.NET (Companion roadmap, 2025): https://www.lowyat.net/2025/357877/premier-league-copilot-companion-tool/
- TechRadar (Companion critique): https://www.techradar.com/computing/artificial-intelligence/the-premier-league-companion-is-a-new-ai-powered-tool-for-soccer-fans-but-its-useless-at-least-for-now
- Technology Record (FPL Companion): https://www.technologyrecord.com/article/microsoft-copilot-powered-fantasy-premier-league-companion-to-debut-this-season
- AI Magazine: https://aimagazine.com/news/how-microsoft-is-powering-the-premier-league-with-ai ; https://aimagazine.com/news/how-premier-league-uses-microsoft-ai-to-guide-fpl-managers
- Prolific North (Overlap): https://www.prolificnorth.co.uk/news/microsoft-ai-partnership-brings-real-time-premier-league-companion-data-to-gary-nevilles-overlap-podcasts/
- WindowsForum (secondary aggregator; engagement-uplift claim, low confidence): https://windowsforum.com/threads/premier-league-azure-ai-partnership-copilot-fan-companion-drives-20-engagement-rise.391512/
- IMDb news wire (Amazon did not renew): https://m.imdb.com/news/ni64350134

Competing hackathon repos (competitive intel)
- https://github.com/abhiiiesh/MatchMind ; https://github.com/KumarPadigeri/inside-the-game ; https://github.com/OlatunbosunIbiyinka/matcheyes ; https://github.com/tahawinner25-ai/inside-the-game-explainable-match-intelligence
