# 07: Hackathon intelligence for the Microsoft Premier League Hackathon ("Inside the Game")

_Research date: 2026-10-06, the day the submission window opened. Prepared for the team's internal planning._

> **Evidence tags.**
> - **[V]**: I read it directly from the cited source in this session. These sources were the official rules and repo files, the Microsoft customer story, Microsoft's trademark page, and project READMEs.
> - **[U]**: unverified. This covers search-engine snippets of blocked pages, secondary sources, self-reported claims, background knowledge, and my own inference (marked _inference_).
>
> **Access limits.** The egress proxy blocked `aka.ms`, `developer.microsoft.com` (Reactor), `innovationstudio.microsoft.com`, `news.microsoft.com`, `premierleague.com`, `techcommunity.microsoft.com` and most news and legal sites. The **official rules were read in full** from Microsoft's public GitHub repo. Rule 11.4 says the rules prevail over any website content. The shared web-search quota ran out partway through.
>
> **Provenance note.** Some competitor and past-winner repos (section 2.6, section 4) and two UK case texts (section 6) were found with GitHub MCP search tools. That happened before the coordinator restricted GitHub tool use to this repo. The tools have not been used since. Those findings are public information but are flagged here for transparency.

---

## 1. Executive summary

- **Who runs it.** The official name is "Microsoft Premier League Hackathon". Microsoft sponsors and runs it. The Premier League "will assist with judging the final entries" and is otherwise not involved [V, S1 §2].
- **The challenge.** Build AI apps and agents that turn **synthetic** football events into **explainable match intelligence** through **Ingest → Interpret → Explain → Render → Personalize** [V, S1 §4.1].
- **No starter kit or data.** The official repo `microsoft/insidethegamehackathon` contains only the rules, code of conduct, licence, security file and five AI Skills Navigator playlist links [V, S2]. "No match footage, data, and related materials… will be redistributed to participants" [V, S1 §4.7]. No judges are listed [V, S1 §6].
- **Training sessions.** Microsoft Reactor series S-1709 has two known sessions: _Build AI-powered soccer insights apps with AKS and ACA_ (Oct 14, 16:00–17:00 UTC) and _…with cloud-native Azure Databases_ (Oct 21, 16:00–17:00 UTC). One snippet dates the AKS/ACA session Oct 7 instead [U, S3].
- **Platform.** The site is very likely Microsoft Innovation Studio, which hosted earlier Microsoft hackathons with the same "Projects" page wording [U, inference; S9, S11].
- **Rubric.** The rules reuse the AI Dev Days Hackathon (Feb–Mar 2026) rubric: **5 criteria at 20% each and the same 4 category prizes** [V, S1 §6, S8]. That event's winners are the best guide to what this judging team rewards (section 4).
- **Ties.** Ties are broken on **Technological Implementation** first [V, S1 §6.3]. A pass/fail **Stage One** checks fit to the theme and "the required technologies" [V, S1 §6.1].
- **IP is a disqualification risk.** The video must not contain third-party trademarks or copyrighted music [V, S1 §4.4], and the data must be synthetic [V, S1 §4.7]. The rules grant **no licence** to Premier League or Microsoft marks [V, S1 §11.8], unlike the Agents League rules, which did grant one for Microsoft marks [V, S11]. **Recommendation:** fictional league, clubs and players; crests we draw ourselves; no real footage; a disclaimer; and a swappable "brand pack" layer.
- **Competition.** At least 10 public competitor repos already exist. Several share the same pattern: deterministic stats, LLM narration, a verifier agent, timed overlay JSON and multilingual output [V, S4]. That is now table stakes. We can stand out with a **deployed, event-driven Azure pipeline with measured latency**, **Foundry evaluations**, a **producer human-in-the-loop console**, and a tight 2-minute story [U, inference].

---

## 2. What we know about this hackathon

### 2.1 Dates (Pacific Time) [V, S1 §1, §4.8]
| Milestone | Date |
|---|---|
| Registration | Sep 29, 09:00 → **Oct 20, 12:00 (noon)** |
| Submission period | **Oct 6, 09:00 → Oct 27, 23:59** |
| Judging | Oct 27, 09:00 → **Nov 10, 23:59**. The demo must stay free for judges until this date |
| Winners announced | No later than **Nov 20, 2026** |

### 2.2 Challenge wording worth quoting back to judges [V, S1 §4.1]
- "Football stories do not start and end with the scoreline."
- Output must suit "studio, broadcast, or streaming scenarios" and be "responsive enough for live play".
- **Personalize:** "a data-hungry analyst and a casual fan as two genuinely different experiences". This includes favourite club and player, a **player-focused mode** ("focus on the player throughout the match"), language preference, and "a single performance metric a viewer cares about".
- **Render:** outputs should be "timed and machine-readable enough to be rendered as synchronized graphical overlays on a live match feed, **in the way the platform's rendering partner handles overlays in the production path**."
- "A Project that only generates metrics has no audience, and a solution that only personalizes has nothing to personalize." In other words, do both.
- Features to consider:
  - player name tagging, with speed and distance shown when thresholds are hit
  - pass distance, accuracy and **difficulty rating**
  - ball and shot speed
  - **auto-eventing** from video
  - narratives, milestones and recaps
  - explainability ("control vs. chaos, tactical pressure changes, and game rhythm")
  - synthetic dataset innovation
  - multi-language storytelling

### 2.3 The "rendering partner" has not been identified
- Neither the rules nor any page I could reach names the partner [V, S1].
- Microsoft's July 2025 announcement says Foundry "will further enhance the live match experience with **real-time data overlays** and post-match analysis" [U, S13 snippet].
- **Action:** Rule 11.6 says entrants who think a term is ambiguous "must submit a written request for clarification" [V, S1 §11.6]. Ask the organisers which overlay format or protocol the partner uses, either through the site or at the Reactor Q&A.
- **Until they answer**, build a **vendor-neutral overlay contract** [U, inference]:
  - timecoded JSON with match clock, wall-clock time and frame/timecode
  - `display_at`, `duration`, `priority` and safe-area fields
  - delivery over WebSocket or SSE
  - a reference HTML renderer, plus a thin graphics-engine adapter
- Never name or guess the vendor in the submission.

### 2.4 Resources, community, credits, judges
- **Playlists:** GitHub Copilot, Azure AI Foundry, Foundry Agents, Agentic Workflows, Data [V, S2].
- **Repo history:** commits show the repo was converted from the May 2026 Agents League contest repo. Its README was deleted on Sep 28 [V, S2b]. Search engines still show the old Agents League text ("June 4–14"); ignore it [U, observation of snippets].
- **Reactor series description:** "build AI-driven solutions that help transform synthetic football events into explainable match intelligence for broadcast and streaming experiences" [U, S3].
- **Scenario name (likely used in the sessions):** "Synthetic Match Insights Engine for Premier League Studio… an AI insights engine that runs on Azure to explain the game beyond the stats, turning football events into real-time insights, key narratives, and recaps for studio and streaming use" [U, S3b].
- **Azure Databases session:** pairs "Azure SQL, PostgreSQL, and Cosmos DB with vector search and retrieval" [U, S3].
- **No reference sample found:** I found no Azure-Samples football reference repo. One may arrive with the sessions [U].
- **Marketing copy** that a participant appears to have pasted from the site: "compete for a share of **$50,000 USD** in cash prizes, event tickets, and more", using "GitHub, GitHub Copilot, Microsoft Foundry, Azure AI Services, **Microsoft Fabric**… and the Azure cloud-native services" [U, S12]. The rules state an ARV pool of $14,800–$59,200 [V, S1 §8].
- **Discord/forum:** none found. The Agents League had one [V, S11]; check the site [U].
- **Azure credits:** **none mentioned in the rules** [V, S1]. Budget for our own subscription and set cost alerts [U].
- **Judges:** "may be employees of the Promotion Entities or third parties… may change". Premier League staff help judge the final entries [V, S1 §2, §6]. Expect football-authenticity and brand-safety sensitivity in the final round [U, inference].

### 2.5 Prizes and categories [V, S1 §4.2, §8]
| Prize | Per member | Category definition (key words) |
|---|---|---|
| Grand Prize, 1st | $4,000 e-gift + digital PL match ticket (~$1,000) + $50 PL store voucher + social feature | "most complete and compelling solution… innovative use of the Microsoft AI platform" |
| Grand Prize, 2nd | $2,500 + ticket + voucher | runner-up |
| Best Use of Microsoft Foundry | $1,500 + voucher | "faster innovation, improved developer productivity, and scalable AI experiences that would be difficult… through traditional approaches" |
| Best Enterprise Solution | $1,500 + voucher | "clear path to enterprise adoption… reliability, transparency, and controls required for use in production" |
| Best Multi-Agent System (called "Best Multi-Agent Orchestration" in §8) | $1,500 + voucher | "distinct roles, coordinate through shared state and effective handoffs, recover from failures… an end-to-end outcome a single agent could not achieve". Names GitHub Copilot, Agent Framework, **A2A** |
| Best Azure Cloud Native Integration | $1,500 + voucher | AKS, Container Apps, Functions, Logic Apps, "AI-optimized data platforms"; event-driven, automation, operational excellence |

Other rules [V, S1 §3, §4.3, §6.2]:
- Each project can win at most **one Grand Prize and one Category Prize**, and judges may reassign the category.
- Teams have **up to 4** members.
- The project must be **newly created after Sep 29**.
- Hero technologies: Microsoft Foundry, Agent Framework, Azure MCP, GitHub Copilot Agent Mode, Fabric, GitHub SDK, GitHub CLI, Azure Apps and AI Services, Azure databases.
- Residents of Brazil, Quebec, Russia, Crimea, Cuba, Iran, North Korea, Sudan and Syria cannot enter.

### 2.6 Competitor snapshot as of Oct 6 (READMEs read) [V, S4 unless marked]
| Repo | Angle |
|---|---|
| kaanoguzkan/insidethegamehackathon ("MatchMind") | Agent Framework, 24 MCP tools, verifier agent checks every claim, 5 Hz tracking sim, 528+ tests, EN/ES/TR. Its README says the Azure deployment is untested |
| ALISAEED-1/matchmind | Agent Framework + Foundry Local. Overlay cards with `display_at_ms`/`duration_ms`. Circuit-breaker router. EN/UR/AR |
| abhiiiesh/MatchMind | Azure OpenAI, Speech, Bicep. **Uses StatsBomb data and real fixtures ("Arsenal vs Liverpool 2024")**, a probable rules and IP problem [U, inference] |
| helenapedro (MatchLens AI) | Foundry hosted agents. Three parallel analysts plus a composer. Targets Multi-Agent |
| OlatunbosunIbiyinka/matcheyes | Synthetic scenarios with "planted truth" used for evaluation. Evidence verification |
| tahawinner25-ai/… | Fictional "Northbridge FC vs Harbor City". Evidence panel. CI |
| PRO-VISION, bikilath, KumarPadigeri, aj0khi | Phi-3.5 via Foundry Local, a pure-Python simulator, fact-checked recaps, early scaffolds |

**Gaps nobody shows yet** [U, inference]:
- a live, deployed event-driven Azure pipeline with latency SLOs
- Foundry evaluations used as a CI gate
- a producer approval console for on-air graphics
- accessibility modes

---

## 3. The partnership story and quotable facts

Attribute everything below to Microsoft or the Premier League, and never imply endorsement.

**Partnership announcement, Jul 1, 2025** [S13]:
- The partnership aims to "transform how **1.8 billion fans in 189 countries** engage with the **world's most-watched football league**" [U, snippet].
- Microsoft is "official cloud and AI partner", modernising "digital infrastructure, **broadcast match analysis** and organizational operations" [U, snippet].
- The **Premier League Companion powered by Copilot** draws on "over 30 seasons of stats, 300,000 articles and 9,000 videos" [U, snippet].
- Foundry "will further enhance the live match experience with **real-time data overlays and post-match analysis**" [U, snippet].
- **Richard Masters, CEO, Premier League:** "This partnership will help us engage with fans in new ways – from personalised content to **real-time match insights**." [U, snippet]
- **Judson Althoff, EVP & CCO, Microsoft:** "We are pleased to partner with the Premier League to bring innovative and interactive experiences to football fans around the world." [U, snippet]

**Microsoft customer story, Nov 18, 2025: "Premier League drives deep fan connection with Microsoft Foundry and Azure Cosmos DB"** [V, S14]:
- Headline stats: "**Engagement up 20% YOY**" and "**8,000 transactions per second**".
- "Azure Managed Redis helps maintain **sub-500-millisecond latency** for live interactions."
- The agents are "fueled by Foundry" and "orchestrated and connected with **Semantic Kernel**".
- Cosmos DB is "the central hub for structured match and player data".
- Governance: "**Every data interaction—from API ingestion to AI output—is logged and auditable, maintaining full data lineage and accountability.**"
- Roadmap: "deeper integration of generative AI into fan and editorial workflows… vertical video and fantasy integrations".
- **Alexandra Willis, Director of Digital Media & Audience Development:** personalised experiences "which put each fan in control of the clubs, players, matches and stories most relevant to them."
- **Will Brass, CCO:** "More than 1.8 billion fans in 189 countries engage with the Premier League. The Premier League Companion is a storytelling platform…" Fans want "data and insights which **deepen their understanding of what they are watching**". Also "**60 million users** across our website and app so far this season."

**Later developments** (all snippets):
- Companion insights appeared in Sky's _The Overlap_, "created in partnership with Sky Media and Microsoft", from mid-February 2026 [U, S15, secondary].
- The **Fantasy Premier League Companion powered by Copilot**, built on Microsoft Foundry and Azure OpenAI, was announced Jul 27, 2026 [U, S16].

**How this fits our pitch** [U, inference]: Microsoft's story is personalised, real-time, explainable, multilingual and auditable insight at global scale. Our line: "_the match-day layer beside the Companion: from event to explained on-screen moment in under 500 ms, for every fan, in any language, every claim traceable to events._"

---

## 4. What past winners of Microsoft hackathons had in common

**Why AI Dev Days is the right comparison.** AI Dev Days 2026 had identical criteria and categories, a 2-minute video, a public repo **and a required architecture diagram**, and was run by the "Azure Developer and Solutions Marketing teams" [V, S8].

| Winner (award) | Why it stood out |
|---|---|
| **TrafficIQ**: AI Dev Days, Best Use of Foundry (award self-reported, linked to the official post) [V README, U award; S17] | 6 agents on **Foundry Agent Service** with 56 tools. Three-tier router with context handoff. Dynamics 365 **MCP server**. **One-script IaC** (Key Vault, Foundry project, models, Static Web App, Entra app). Interactive architecture diagram, screenshot gallery, YouTube demo |
| **ProPR**: AI Dev Days, Best Enterprise (self-reported) [V README, U award; S18] | Full **audit trail of AI calls and tool use**. Per-tenant credential isolation and RBAC. Token-aware cost design. Docker Compose plus **Azure Container Apps**. Layered documentation |
| **PRism**: AI Dev Days, Grand Prize, Agentic DevOps (self-reported, and corroborated by a teammate's site) [V README, U award; S19] | 4 parallel specialists plus a verdict agent sharing **one JSON contract**. **Deterministic heuristics plus LLM explanation**. Azure MCP + GitHub MCP. **Content Safety**. ACA, AI Search, **OpenTelemetry → App Insights**, Bicep. **Free usage budget for judges** (500 runs). Sample output in the README |
| **Quipu**: AI Dev Days, Grand Prize, Build AI Apps & Agents [U, S10 title only] | Details unavailable |
| **RiskWise**: AI Agents Hackathon 2025, Best Overall, $20k; 18,000+ registrants, 570 submissions [V via mirror of official showcase, S21] | Real, costly domain problem. Multi-source data. **NL query plus visual risk insights**. Semantic Kernel + Azure AI Agent Service |
| **ModelProof** (Best JS/TS) and **Apollo** (Best C#), same event [V via mirror, S21] | Trust layer (dual-LLM cross-check, live hallucination and toxicity audit). Named sub-agents with self-reflective RAG and citations |
| **ARGUS**: Agents League 2026, Hack for Good (self-reported) [V README, U award; S22] | **Deterministic scoring, LLMs only write explanations**. Audit timeline. WCAG 2.1 AA. The author later admitted overstated claims ("Semantic Kernel was listed… but never imported") |

**Patterns to copy** [U, synthesis from the rows above]:
1. **Start with a named user and a costly problem in the first 15 seconds.** For us: a producer who needs an explained graphic in seconds, and a fan who wants their own view.
2. **Use specialist agents with distinct roles, a shared contract and visible handoffs, and show failure recovery.** The Multi-Agent category text asks for exactly this [V, S1 §4.2].
3. **Deterministic numbers, LLM words, a verifier between them, and evidence links to event IDs.** This is what "explainable" means here.
4. **Make the reasoning visible.** Show agent badges, traces, timelines and confidence.
5. **Deploy on Azure for real.** Use IaC, observability, Content Safety, Key Vault and managed identity, and give judges a free usage path.
6. **Write a judge-first README.** Include a "Judging this? Start here (5 minutes)" block [V example, S24], a diagram, an agent table, the data contract, sample output, CI and tests, and a mapping to each criterion.
7. **Never overclaim.** Judges can read the code (ARGUS lesson).

---

## 5. Demo video and submission playbook

### 5.1 Hard requirements [V, S1 §4.4, §4.9]
- The video must be **under 2:00**: "Judges are not required to watch beyond two (2) minutes." Aim for 1:50–1:55.
- It must show the project **functioning** on its platform.
- Use a **public** YouTube, Vimeo, Facebook Video or Youku URL.
- No third-party trademarks or copyrighted music or material.
- Materials must be in English, or include an English translation.

### 5.2 Script for 1:52 (about 260 words at ~145 wpm) [U, recommendation]
| Time | Beat | Screen |
|---|---|---|
| 0:00–0:08 | Hook: "Football stories don't end with the scoreline." An overlay animates in | Our synthetic pitch render |
| 0:08–0:20 | Problem: the producer needs *why*, live; the fan wants *their* club and player | Producer console and fan phone, split screen |
| 0:20–1:15 | The five stages live: events stream → metrics → agent explanation with evidence chips → producer approves → timed overlay on the feed → same moment as Analyst vs Casual vs another language | Real UI with an agent-trace sidebar |
| 1:15–1:30 | Trust: click an overlay to see its event IDs; the verifier blocks a false stat; kill an agent and the fallback still renders | Trace view |
| 1:30–1:45 | 15-second architecture: Foundry agents / Agent Framework / MCP / Event Hubs → Container Apps → Cosmos DB → Web PubSub, plus live p95 latency | Animated diagram |
| 1:45–1:52 | Close: tagline, repo URL, synthetic-data disclaimer | End card |

**Production tips** [U, recommendation]:
- Record each beat separately and edit; don't attempt one 2-minute take.
- 1080p, 16:9, browser zoom about 125%, notifications hidden.
- Human voice, or an Azure AI Speech neural voice, which also shows the stack.
- Burn in captions **and** upload an SRT; English captions on any non-English overlay.
- No music, or a track whose licence text we keep. Content ID claims can hit "royalty-free" tracks.
- Add YouTube chapters. Put the repo, live URL and disclaimer in the description.
- Keep a backup recording in case the live demo fails.

### 5.3 Project page contents
The **elevator pitch** naming "which Microsoft and Azure technologies used" is required [V, S1 §4.4]. Testing access is required, with credentials if the demo is private [V, S1 §4.8]. An architecture diagram was mandatory at AI Dev Days [V, S8] and is advisable here [U].

Recommended order [U]:
1. Elevator pitch
2. Problem → five-stage mapping
3. Hero tech table: one line and a code path for each
4. Architecture diagram
5. Agent table (role, tools, inputs/outputs, failure handling)
6. Responsible AI: grounding, verifier, Content Safety, evaluations, human-in-the-loop, accessibility
7. Synthetic-data statement
8. Judge testing path (90 seconds) plus local run instructions
9. Primary category, justified against its wording
10. Production roadmap

---

## 6. IP and trademark safe harbour (not legal advice)

### 6.1 What the rules say
- The video must not include "third party trademarks, or copyrighted music or other material" without permission [V, S1 §4.4].
- The submission must not infringe "copyright, trademark, patent, contract, and/or privacy rights" [V, S1 §4.11].
- "Projects must use synthetic, football-realistic data". Any footage must be properly licensed [V, S1 §4.7].
- Use of the organisers' IP is allowed "solely to the extent provided for in these Official Rules", and the rules provide none [V, S1 §11.8]. The Agents League rules, by contrast, explicitly allowed Microsoft marks [V, S11].
- A post-deadline fix for infringing material is at the Sponsor's discretion only [V, S1 §5].

### 6.2 Legal background
- **Badges and the Premier League emblem are copyright artistic works.** In _FAPL v Panini UK_ [2003] EWCA Civ 995, the "incidental inclusion" defence failed for badges on kits because they were integral to the product's appeal [V, S25 text mirror]. So even a crest seen "in passing" on a kit is risky.
- **False endorsement by real people is actionable passing off** under _Irvine v Talksport_ [2002] EWHC 367 (Ch), followed in _Fenty v Arcadia_ [2015] EWCA Civ 3 [V that the citation exists, S26 metadata; U on detail]. US right-of-publicity law adds further risk [U].
- **Fake stats about real players** risk defamation and the rules' ban on "disparaging" content [V for the ban, S1 §4.4; U for defamation].
- **Microsoft's guidelines:** logos "can never be used without an express license", and "Don't imply an affiliation, endorsement, sponsorship, or approval". Naming products in text ("built on Microsoft Azure") is fine [V, S27].

### 6.3 Recommended approach [U, recommendation]
1. **Fictional league name.** No "Premier", "EPL" or "PL", no lion or crown, no purple-and-cyan look. Saying "built for the Microsoft Premier League Hackathon" as plain fact is fine.
2. **Fictional clubs** generated by us. Avoid real city-plus-nickname pairs and the near-misses unlicensed games use ("Man Red", "North London") [U, background]. Draw SVG geometric crests ourselves and use generic kits.
3. **Fictional players.** Check generated names against real top-flight squads. Use numbers, silhouettes or avatars. No faces that look like real players.
4. **No real or game footage** (broadcast clips, highlights, EA FC capture; one participant planned the latter [V, S12]). "Alongside the match" means **our own synthetic 2D/3D render** from generated tracking. Any auto-eventing video must be self-filmed with written consent, or synthetic.
5. **No real event datasets** (StatsBomb, Opta). Calibrating to public aggregate rates is acceptable, but document the method and ship no real data.
6. **Disclaimer** at the start and end of the video and in the README: "All leagues, clubs, players and matches are fictional and synthetically generated. Not affiliated with or endorsed by the Premier League, its clubs or players."
7. **Brand-pack layer.** Keep colours, fonts, crests, names and sponsor slots in a runtime theme manifest, and switch themes on camera. This shows a licensed partner could drop in official assets with no code change: ready for the Premier League without infringing anything.
8. **Audio.** No anthems, chants or broadcaster stings. Keep any music licence in the repo.
9. **Microsoft marks.** Text only. Use Azure architecture icons only after checking their terms [U, verify]. No logos on title cards.
10. **Tone.** No betting or odds features (a brand-safety judgment call). Nothing negative about real referees or clubs. Nothing reflecting badly on Microsoft's goodwill [V for the last, S1 §4.4].

---

## 7. Winning checklist

### 7.1 Judging criteria, 20% each [V for the criteria text, S1 §6.2; checklist items are U recommendations]
**1. Technological Implementation (first tie-breaker)**
- [ ] A synthetic generator that is "creative and optimized": seedable, with planted-truth labels, a calibration report, a tracking rate of 5–25 Hz, and tactical presets.
- [ ] At least 4 hero technologies used for real, each with a code path:
  - Foundry agents with evaluations and tracing
  - Agent Framework
  - Azure MCP or our own MCP server
  - GitHub Copilot Agent Mode (visible in commits or docs)
  - Cosmos DB, Azure SQL or PostgreSQL with vector search
  - optionally Fabric Real-Time Intelligence
- [ ] Typed contracts (JSON Schema), tests, a CI badge, `azd`/Bicep IaC, and Well-Architected-style documentation (the rubric links Cloud Apps best practices).

**2. Agentic Design & Innovation**
- [ ] Distinct agents sharing a state store, with handoffs visible in the UI.
- [ ] MCP tools; consider **A2A** between the producer and fan agents.
- [ ] One novel element, e.g. a counterfactual "why it mattered" agent, a verifier agent, or an overlay-priority planner.

**3. Real-World Impact**
- [ ] Measured p50/p95 latency from event to overlay, throughput, cost per match, and evaluation scores.
- [ ] A production path: overlay adapter, brand pack, operator approval, audit log, SLOs. Use the partnership facts from section 3.

**4. User Experience & Presentation**
- [ ] Analyst and casual-fan experiences that are genuinely different.
- [ ] Player-focus mode and multilingual output.
- [ ] Broadcast-safe, readable overlays.
- [ ] Balanced frontend and backend.
- [ ] The video from section 5.

**5. Category adherence**
- [ ] One primary category, with README text that mirrors its wording.

### 7.2 Category prizes [definitions V, S1 §4.2; tactics U]
| Category | What to show |
|---|---|
| Foundry | Foundry Agent Service hosted agents, model deployments and routing, **evaluations in CI**, tracing, Content Safety, versioning. Quantify "faster innovation" (e.g., minutes to add a language or persona) |
| Enterprise | Producer approval (human in the loop), RBAC roles, full audit and lineage (echoing the Premier League's "logged and auditable" line [V, S14]), Key Vault + managed identity, cost guardrails, SLO dashboard, threat model, multi-tenant brand packs |
| Multi-Agent | Ingest/State, Stats-MCP, Tactical Analyst, Storyteller, Verifier, Personalizer and Overlay Director agents with **shared state**; **on-camera failure recovery**; parallel work under a latency budget that a single agent could not meet |
| Cloud Native | Event Hubs → Functions/Container Apps (KEDA) or AKS → Cosmos DB change feed → Web PubSub/SignalR → Static Web Apps; Logic Apps for recap distribution; App Insights; load-test chart. This matches the Reactor session topics [U, S3] |

**Strategy** [U, inference]: build for the Grand Prize, with **Multi-Agent** or **Cloud Native** as the primary category, since those are where we can be most measurably ahead of the competitor repos. Make Foundry and Enterprise features strong enough that we still score well if judges reassign the category.

### 7.3 Logistics
- [ ] **Everyone registers before Oct 20, 12:00 PT** and the team names a Representative [V, S1 §1, §4.10].
- [ ] The repo is public, the first commit is after Sep 29, it has a licence, and there are no secrets [V for public and new, S1 §4.3–4.4].
- [ ] The live demo stays free until Nov 10, 23:59 PT [V, S1 §1, §4.8], with budget alerts on [U].
- [ ] The video is public, under 2:00, captioned, has no third-party marks or music, and includes the disclaimer [V for the requirements, S1 §4.4].
- [ ] Ask the organisers in writing about the rendering-partner format [V for the mechanism, S1 §11.6].
- [ ] Attend the Reactor sessions on Oct 14 and 21 [U, S3].
- [ ] Submit on Oct 26, one day early, and re-check all links in an incognito window [U].

---

## Sources
_[F] fetched and read; [G] read from public GitHub (raw file, web page, or GitHub search before the scope restriction); [S] search-engine snippet only (page blocked)._

- **S1** Official Rules [G]: https://github.com/microsoft/insidethegamehackathon/blob/main/OFFICIAL%20RULES.md
- **S2** Resource playlists [G]: https://github.com/microsoft/insidethegamehackathon/blob/main/RESOURCE%20PLAYLISTS.md · **S2b** commits [F]: https://github.com/microsoft/insidethegamehackathon/commits/main
- **S3** Reactor series [S]: https://developer.microsoft.com/en-us/reactor/series/S-1709/ · **S3b** [S]: https://developer.microsoft.com/en-us/reactor/events/27536/ · Hackathon site (blocked): https://aka.ms/insidethegame
- **S4** Competitor repos [F/G]: https://github.com/abhiiiesh/MatchMind · https://github.com/helenapedro/inside-the-game · https://github.com/kaanoguzkan/insidethegamehackathon · https://github.com/mberry19932025/PRO-VISION · https://github.com/bikilath/inside-the-game · https://github.com/ALISAEED-1/matchmind · https://github.com/OlatunbosunIbiyinka/matcheyes · https://github.com/tahawinner25-ai/inside-the-game-explainable-match-intelligence · https://github.com/KumarPadigeri/inside-the-game · https://github.com/aj0khi/soccer-hackathon-project
- **S8** AI Dev Days Hackathon README and rules [G]: https://github.com/Azure/AI-Dev-Days-Hackathon
- **S9** Innovation Studio links in prior-hackathon repos [G]: https://github.com/HELALI-Amin-24005915/Analogy-Engine · https://github.com/theAdityaNVS/incidentiq-agents-league
- **S10** AI Dev Days winners post (blocked) [S]: https://techcommunity.microsoft.com/blog/azure-events/announcing-the-ai-dev-days-hackathon-winners/4513528 · digest [G]: https://github.com/sujithq/updates/blob/main/digests/2026-W21.md
- **S11** Agents League rules [G]: https://github.com/microsoft/Agents-League-AISF-Regulations/blob/main/OFFICIAL%20RULES.md
- **S12** Participant README quoting site copy [G]: https://github.com/conradgarnett/microsoft-premier-league
- **S13** Partnership release, Jul 1 2025 [S]: https://news.microsoft.com/source/2025/07/01/premier-league-and-microsoft-announce-five-year-strategic-partnership-to-personalize-the-fan-experience-with-ai-for-1-8-billion-people/ · https://www.premierleague.com/en/news/4338015/premier-league-announces-partnership-with-microsoft
- **S14** Microsoft customer story, Nov 18 2025 [F]: https://www.microsoft.com/en/customers/story/25725-premier-league-azure-ai-foundry
- **S15** Companion × The Overlap [S]: https://windowsforum.com/threads/ai-powered-premier-league-companion-joins-the-overlap-for-real-time-broadcast-insights.402717/
- **S16** FPL Companion [S]: https://news.microsoft.com/source/emea/features/fantasy-premier-league-companion-gives-managers-a-new-tool-for-success/ · https://www.premierleague.com/en/news/4685134/how-the-fantasy-premier-league-companion-can-help-you-in-202627 · https://x.com/MSFTnews/status/2082151376084218246
- **S17** TrafficIQ [F]: https://github.com/raghavmishrad365/TrafficIQ
- **S18** ProPR [F]: https://github.com/meister-dev-ai/propr
- **S19** PRism [F]: https://github.com/soni-ishan/PRism
- **S21** AI Agents Hackathon 2025 showcase (mirror) [G]: https://github.com/BreahzelbubKunda/AIAgentsHack/blob/main/docs/winners.md · original: https://techcommunity.microsoft.com/blog/azuredevcommunityblog/ai-agents-hackathon-2025-%E2%80%93-category-winners-showcase/4415088
- **S22** ARGUS [F/G]: https://github.com/iarjunganesh/argus
- **S24** Judge-first README example [G]: https://github.com/TrickyDanceMoves/jml-agent-fleet
- **S25** _FAPL v Panini_ [2003] EWCA Civ 995 (text mirror) [G]: https://github.com/LegalWiseGenieKTH/thesis-legalresearch-hybrid · canonical (not fetched): https://www.bailii.org/ew/cases/EWCA/Civ/2003/995.html
- **S26** _Fenty v Arcadia_ [2015] EWCA Civ 3 → _Irvine v Talksport_ [2002] EWHC 367 (Ch) (dataset metadata) [G]: same repo as S25 · canonical (not fetched): https://www.bailii.org/ew/cases/EWCA/Civ/2015/3.html
- **S27** Microsoft Trademark & Brand Guidelines [F]: https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks
