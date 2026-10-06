# 02 · What the other "big five" leagues (and FIFA/UEFA/MLS) do with data, AI, broadcast graphics and fan personalisation

*Research date: 2026-10-06. Prepared for the Microsoft Premier League Hackathon (6–27 Oct 2026).*

---

## How to read this report (method and confidence)

- **[V] = verified this session.** The claim came from web-search results that cite the linked page. Publication dates are given where known. **Caveat:** the network egress proxy blocked direct page fetches for nearly every domain (bundesliga.com, dfl.de, aws.amazon.com, laliga.com, svgeurope.org, kaggle.com and others). So most [V] facts come from search-engine extracts of those pages, not from reading the full page. Only microsoft.com customer stories and GitHub were readable in full.
- **[U] = background knowledge, not re-verified this session.** The shared web-search budget (200 calls per turn across all parallel agents) ran out partway through. That happened after the Bundesliga and LaLiga research and before Serie A, Ligue 1, UEFA, MLS and FIFA. Those sections therefore rest mostly on prior knowledge (to about mid-2026) and are flagged **UNVERIFIED**. Every [U] item has a suggested query so a teammate can confirm it in a follow-up session.
- I retried one Ligue 1+ search after the coordinator's priority note, and it was refused again (budget still exhausted). So **Ligue 1+ features and Serie A partners remain [U]** and are the top items for a follow-up session.
- The three GitHub repositories cited (IDSSE dataset, kloppy, Metrica sample data) are public pages read with WebFetch, not with the GitHub MCP tools.
- Some terms in the hackathon brief, such as "Pressing Intensity", "Distance" and "Goal Probability" as separate Bundesliga facts, do not match the official names exactly. Corrections are noted inline.

---

## 1. Executive summary

1. **The Bundesliga/DFL × AWS stack is the closest real-world version of our required pipeline.** It runs Ingest (25 Hz tracking plus event data over Kafka), Interpret (16 "Bundesliga Match Facts"), Explain (SHAP-explained xGoals, a Data Story Finder with story templates), Render (Vizrt auto-clips, cloud-automated graphics) and Personalise (Amazon Personalize Shorts and the "Captain" agent). The newest pieces, from September 2025 to August 2026, are **Match Momentum**, **3D skeletal tracking plus AI auto-event detection**, the **"Captain" multi-agent fan companion** (June 2026) and a **Localised World Feeds proof of concept** with AI multi-language commentary (Supercup, August 2026). [V]
2. **LaLiga × Microsoft is the sponsor-relevant precedent.** Its pieces are Mediacoach optical tracking (about 3.5M data points per match), **Beyond Stats** (50+ advanced metrics on Azure ML, Databricks and Power BI), a **Goal Probability broadcast graphic computed within about 30 seconds**, and Azure OpenAI pilots. The pilots cover near-real-time multi-language subtitles (Whisper plus GPT-3.5), automatic translation, match briefings and personalised content, and, as of February 2025, **real-time translation that keeps the commentator's voice and tone**. Our entry can position itself as "taking LaLiga's Microsoft playbook to the Premier League and closing the loop to the live overlay." [V]
3. **Per-viewer personalisation of the broadcast layer itself is still largely unbuilt.** Leagues personalise apps: feeds, shorts, chat agents, ticker writing styles. On-screen graphics remain one feed for everyone, or at most one per language (the DFL's localisation PoC). An agent that decides which overlay to show, to whom, when, and why, and logs that decision, is white space.
4. **Explainability is shallow on air.** AWS demonstrated SHAP explanations for xGoals, but broadcasts mostly show a single number (xG 0.07, momentum bar). Plain-language "because…" explanations tuned to an analyst or a casual fan, with uncertainty shown, are rare.
5. **Writing-style personas are proven.** The Bundesliga's GenAI live ticker writes each event in parallel styles ("Sports Journalist", "Casual", "Bro (Gen Z)") and languages within about 7 seconds of the event, and Captain offers three expertise levels. This maps directly onto our "analyst vs casual fan" requirement. [V]

---

## 2. Bundesliga / DFL (partner: AWS; data subsidiary: Sportec Solutions)

### 2.1 Bundesliga Match Facts (BMF) powered by AWS: the full list and timeline

As of September 2025 there are **16 official Match Facts**: Shot Speed, Keeper Efficiency, Ball Recovery Time, Pressure Handling, Win Probability, Set Piece Threat, Skill, Most Pressed Player, Attacking Zones, Average Positions: Trends, Shot Efficiency, Passing Profile, Speed Alert, Average Positions, xGoals, and Match Momentum (the newest). They are generated from "3.6 million data points" per game in real time and appear as broadcast graphics and in the official app. [V] ([Bundesliga.com, Match Momentum announcement, Sept 2025](https://www.bundesliga.com/en/bundesliga/news/bundesliga-match-facts-aws-match-momentum-34052); [DFL](https://www.dfl.de/en/innovation/bundesliga-match-facts-match-momentum-expands-the-data-offering/))

> Correction to the brief: there is no BMF called "Pressing Intensity"; the pressing facts are **Most Pressed Player**, **Pressure Handling** and **Ball Recovery Time**. "Goal Probability" is the per-shot value produced by **xGoals**, not a separate fact. "Distance" (distance covered) is a standard tracking stat, not one of the 16 BMF.

| Introduced | Match Fact(s) | Source |
|---|---|---|
| May 2020 (launch) | xGoals (per-shot goal probability), Average Positions, Speed Alert, plus others in the launch set | [V] [Business Wire, 26 May 2020](https://www.businesswire.com/news/home/20200526005205/en/Amazon-Web-Services-and-Bundesliga-to-Deliver-Real-Time-Game-Analysis-with-Bundesliga-Match-Facts-Powered-by-AWS) |
| Feb 2021 | "Three more real-time statistics", probably Most Pressed Player, Attacking Zones and Average Positions: Trends (exact trio not confirmed) | [V/partly] [Advanced Television, 11 Feb 2021](https://www.advanced-television.com/2021/02/11/aws-bundesliga-launch-new-match-facts/); [SVG Europe](https://www.svgeurope.org/blog/headlines/bundesliga-match-facts-enhanced-with-three-more-real-time-statistics-from-aws/) |
| Sept 2021 | Shot Efficiency, Passing Profile | [V] [Amazon press, Sept 2021](https://press.aboutamazon.com/2021/9/aws-and-bundesliga-to-debut-two-new-bundesliga-match-facts-for-the-2021-22-european-football-season) |
| Mar 2022 (debut 4 Mar, Bielefeld v Augsburg) | Set Piece Threat, Skill | [V] [Business Wire, 2 Mar 2022](https://www.businesswire.com/news/home/20220302005404/en/AWS-and-Bundesliga-Debut-Two-New-Match-Facts-Giving-Fans-Insight-into-Germany%E2%80%99s-Top-Football-Players-and-Teams); [Broadcast Now](https://broadcastnow.co.uk/production/bundesliga-adds-set-piece-threat-and-skill-match-facts/5168243.article) |
| Sept 2022 | Pressure Handling, Win Probability | [V] [Business Wire, 29 Sept 2022](https://www.businesswire.com/news/home/20220929005810/en/AWS-and-DFL-Unveil-Two-New-Bundesliga-Match-Facts-for-the-2022%E2%80%9323-German-Football-Season) |
| 2022–23 (reported April 2023) | Keeper Efficiency (xSaves), Ball Recovery Time | [V] [Bundesliga.com](https://www.bundesliga.com/en/bundesliga/news/new-match-facts-aws-keeper-efficiency-xsaves-ball-recovery-time-23071); [Dutch IT Channel, 14 Apr 2023](https://www.dutchitchannel.nl/news/228344/deutsche-fussball-liga-en-aws-lanceren-nieuwe-real-time-bundesliga-statistieken) |
| Nov 2023 (Matchday 10, Der Klassiker) | Shot Speed | [V] [SVG, 3 Nov 2023](https://www.sportsvideo.org/2023/11/03/dfl-aws-add-new-shot-speed-stat-to-bundesliga-match-facts/) |
| 18 Sept 2025 (Matchday 4) | **Match Momentum** (16th BMF) | [V] [DFL](https://www.dfl.de/en/innovation/bundesliga-match-facts-match-momentum-expands-the-data-offering/); [AWS M&E blog, ~24 Sept 2025](https://aws.amazon.com/blogs/media/bundesliga-match-fact-match-momentum-revealing-the-games-invisible-pulse/) |

**How the key facts work and how they are explained (all [V]):**

- **xGoals.** This is the probability that a shot becomes a goal, computed in real time for every shot. Features come from live ball and player positions: angle to goal, distance, the shooter's speed, defenders in the line of the shot, and goalkeeper coverage. The model is XGBoost on SageMaker, trained on more than 40,000 Bundesliga shots since 2017. AWS published a method for explaining each prediction with **SageMaker Clarify / SHAP** feature attributions. ([AWS ML blog: Explaining xGoals with SageMaker Clarify](https://aws.amazon.com/blogs/machine-learning/explaining-bundesliga-match-facts-xgoals-using-amazon-sagemaker-clarify/); [Bundesliga xG explainer](https://www.bundesliga.com/en/bundesliga/news/expected-goals-xg-and-goal-probability-explained-13847))
- **Shot Efficiency.** Goals scored minus xGoals. On TV it appears as a **red down-arrow** for under-performance and a **green up-arrow** for over-performance, a very readable casual-fan encoding. ([SVG Europe](https://www.svgeurope.org/blog/headlines/dfl-and-aws-debut-new-bundesliga-match-facts-for-shot-efficiency-and-passing-profile/?print=1))
- **Passing Profile / xPass.** An ML model trained on about 2 million passes computes **26 characteristics per pass**, including distance to the receiver, defenders in between, pressure on passer and receiver, and ball height. It outputs a completion probability and a **difficulty score**. This is directly relevant to our "pass quality (distance, accuracy, difficulty)" feature. ([AWS ML blog: Passing Profile deep dive](https://aws.amazon.com/blogs/machine-learning/the-development-of-bundesliga-match-fact-passing-profile-a-deep-dive-into-passing-in-football))
- **Most Pressed Player.** Counts significant pressure received, using the number of nearby opponents, their distance to the ball carrier, and the direction of their movement. **Pressure Handling** adds an "escape rate": how often a player keeps the ball under high pressure. **Ball Recovery Time** measures how many seconds a team needs to win the ball back after losing it. ([Bundesliga.com](https://bundesliga.com/en/bundesliga/news/pressure-handling-win-probability-join-bundesliga-match-facts-powered-by-aws-21390); [AWS ML blog: Ball Recovery Time](https://aws.amazon.com/blogs/machine-learning/bundesliga-match-fact-ball-recovery-time-quantifying-teams-success-in-pressing-opponents-on-aws/))
- **Win Probability.** Highlights *swings* after goals, red cards and substitutions. The graphic fires only when the change is significant: it is event-triggered, not shown permanently. ([AWS ML blog: Win Probability](https://aws.amazon.com/blogs/machine-learning/bundesliga-match-fact-win-probability-quantifying-the-effect-of-in-game-events-on-winning-chances-using-machine-learning-on-aws/))
- **Skill.** Four archetypes: *Finisher*, *Initiator*, *Ball Winner*, *Sprinter*. If a player is in the league-wide top 10 for a skill, they are **highlighted in the broadcast or app when substitutions are shown**, which is contextual triggering at a natural pause. ([AWS ML blog: Skill](https://aws.amazon.com/blogs/machine-learning/bundesliga-match-fact-skill-quantifying-football-player-qualities-using-machine-learning-on-aws))
- **Speed Alert / Shot Speed.** Sprint top speed, ranked against player, team, season and all-time records. Shot speed is the maximum ball speed over the flight trajectory, taken from tracking data. The Data Story Finder flags all goals above **100 km/h** to commentators. Reported example: Harry Kane's fastest shot of 2025/26 against Stuttgart was 128 km/h from 24.8 m with only 3% goal probability *(attribution: AWS Bundesliga case-study material via search extract; not verified on the page)*. ([SVG](https://www.sportsvideo.org/2023/11/03/dfl-aws-add-new-shot-speed-stat-to-bundesliga-match-facts/); [AWS case study](https://aws.amazon.com/solutions/case-studies/bundesliga-case-study/))
- **Average Positions: Trends.** Shows how a team's shape changes after a red card, goal or substitution, with and against the ball. This is an "explain what changed" fact.
- **Match Momentum (newest).** Every minute, each team's offensive actions over the **last 5 minutes** are aggregated, weighted by importance, given a **time-decay** factor, smoothed and scaled to **0–10 per team**. The displayed value is the **difference** between the teams over time, and the calculation **resets each half**. It is shown at significant shifts, complete momentum reversals, or key events. It runs as a Sportec Solutions engine in an **AWS Fargate** container, fed by **Amazon MSK (Kafka)** streams of 25 Hz positional data and DataHub event data. ([DFL](https://www.dfl.de/en/innovation/bundesliga-match-facts-match-momentum-expands-the-data-offering/); [AWS M&E blog](https://aws.amazon.com/blogs/media/bundesliga-match-fact-match-momentum-revealing-the-games-invisible-pulse/))

### 2.2 Architecture and latency

- **Tracking.** Player and ball positions are captured at **25 Hz**, about 3.6M data points per match. ([AWS ML blog, xGoals](https://aws.amazon.com/blogs/machine-learning/explaining-bundesliga-match-facts-xgoals-using-amazon-sagemaker-clarify/)) The historical supplier was ChyronHego's **TRACAB**, with Gen5 rolled out to all 36 stadiums for 2019/20 at about 7 cm average accuracy and **below 300 ms latency**. ([SVG Europe](https://www.svgeurope.org/blog/news-roundup/chyronhego-rolls-out-tracab-gen5-following-stamp-of-approval-from-the-dfl/?print=1)) EA announced its acquisition of TRACAB in Feb 2025. ([Lowpass](https://www.lowpass.cc/p/ea-tracab-acquisition-3d-sports-data); [VGC](https://www.videogameschronicle.com/news/we-expect-ground-breaking-new-features-ea-acquires-realism-tech-for-ea-sports-fc-series)) *The vendor behind the 2025/26 3D system was not confirmed this session.*
- **End-to-end speed.** TechTarget reports that "the whole process takes 500 milliseconds", with about 24 cameras, AWS Lambda preparing visualisation data, and distribution to the app and to national and international broadcasts in more than 200 countries. ([TechTarget](https://www.techtarget.com/searchbusinessanalytics/feature/Bundesliga-delivering-insight-to-fans-via-AWS)) *Treat the 500 ms as a best-case pipeline figure, not glass-to-glass latency.*
- **ML.** SageMaker (XGBoost for xGoals; models for pass difficulty and others) plus SageMaker Clarify for explanations.
- **3D skeletal tracking (from 2025/26).** 21 body points per player (head, shoulders, hips, joints, toes) are used for SAOT, and DFL also announced referee announcements to the stadium for 2025/26. ([DFL: changes for 2025-26](https://www.dfl.de/en/news/changes-for-the-2025-26-season-referee-announcements-player-tracking-offside-detection/); [SVG Europe, SportsInnovation 2026](https://www.svgeurope.org/blog/headlines/sportsinnovation-2026-inside-the-bundesligas-new-3d-tracking-system-and-how-it-could-be-used-for-broadcast-analysis/))
- **Automated Event Detection (AED).** Sportec Solutions with AWS built AI that classifies passes, duels, throw-ins and shots in real time from skeletal tracking, replacing manual loggers. The model was trained on hundreds of annotated clips per event type, and **each detected event carries a "confidence score"**. ([DFL: Automated event detection becomes a reality](https://www.dfl.de/en/innovation/automated-event-detection-becomes-a-reality/); [Football Business Journal](https://www.footballbusinessjournal.com/post/dfl-launches-automated-event-detection-system-powered-by-skeletal-tracking))

### 2.3 Broadcast rendering

- **Bundesliga In-Match Analysis** (AWS plus Vizrt). Automatically generated **video clips with graphics or AR**, triggered by Match Facts, for example "a goal with particularly low goal probability or an exceptionally fast sprint". It debuted on Matchday 27 (Der Klassiker, 2024/25) on the international feed and the DFL Tactical Feed, which serves more than 70 media partners in over 200 countries. It was rolled out to selected broadcasts in 2025/26 and shortlisted for the Leaders Sport Awards 2025. ([DFL](https://www.dfl.de/en/innovation/further-improved-visualisation-of-match-data-in-football-broadcasting/); [Leaders](https://leadersinsport.com/sport-business/leaders-events/leaders-sport-awards/2025-shortlist/bundesliga-in-match-analysis/))
- **Bundesliga 2 cloud-automated graphics.** Sportcast streams the base signal into AWS, where lineups, score, replays, penalties and stats overlays are added automatically from Sportec data (WSC Sports technology, since 2021/22). The DFL says international broadcasts of Bundesliga 2 **more than doubled and reach quadrupled**. ([Bundesliga Group](https://www.bundesliga-group.com/innovation/enhancing-live-feeds-of-bundesliga-2-matches-using-artificial-intelligence/); [SVG Europe](https://www.svgeurope.org/blog/headlines/dfl-extends-its-international-product-portfolio-with-live-graphics-and-highlight-clips-for-bundesliga-2-transmissions/))
- **Localised World Feeds (PoC, Supercup, August 2026).** AI localises the English world-feed commentary **and on-screen graphics** into many languages, as subtitles and audio, in the AWS cloud, with low latency as a hard requirement. ([SVG Europe: AI multi-language world feeds PoC](https://www.svgeurope.org/blog/headlines/ai-paving-the-way-to-multi-language-bundesliga-world-feeds-in-new-poc/); [SVG Europe: Drones, data and localisation](https://www.svgeurope.org/blog/headlines/drones-data-and-localisation-more-innovation-for-the-new-bundesliga-season/))
- **AI-driven automated production trial** (Sportcast, MRMC, Pixelscope). 18 tracking cameras drive five robotic broadcast cameras, with all processing done on site in real time. **RefCam**: a referee headset camera over private 5G (Riedel), used more often in 2025/26, subject to IFAB approval. ([SVG Europe, SportsInnovation 2026](https://www.svgeurope.org/blog/headlines/sportsinnovation-2026-bundesliga-prepares-for-the-future-with-trial-of-automated-match-production/); [SVG, Apr 2026](https://www.sportsvideo.org/2026/04/07/a-new-pov-refcams-rise-in-the-bundesliga-signals-a-potential-new-era-for-soccer-broadcasts/))

### 2.4 Generative AI and personalisation (AWS is the DFL's "Official Generative AI Provider" since the 2024 expansion)

- **Data Story Finder (2.0).** Checks the Match Facts against **predefined story templates** and pushes stories to commentators through the Commentary Live System "in milliseconds". AWS reports about **2,500 stories per season**, all 306 matches covered with almost no manual analysis, and **20% editorial efficiency gains**. ([AWS case study](https://aws.amazon.com/solutions/case-studies/bundesliga-case-study/); [AWS M&E blog](https://aws.amazon.com/blogs/media/bundesliga-data-story-finder-delivering-fans-the-stories-they-love/))
- **GenAI Live Ticker.** Each event (from about 1,600 per match) triggers a Lambda that prompts **Amazon Bedrock**. Commentary appears **within about 7 seconds**, in several languages and **styles at once: "Sports Journalist", "Casual", "Bro (Gen Z)"**. ([AWS M&E blog](https://aws.amazon.com/blogs/media/revolutionizing-fan-engagementcer-bundesliga-generative-ai-powered-live-commentary/); [re:Invent 2024 write-up](https://zenn.dev/kiiwami/articles/3b0b5f728bc20329?locale=en))
- **AI-generated "Stories".** About 4,000 articles a season (around 800 words each) become swipeable vertical slides. The text is written by **Anthropic's Claude on Amazon Bedrock**, and match frames are pulled from the TV feed using event timestamps (Rekognition). Live in the app since 2024/25. ([DFL: AI-generated stories](https://www.dfl.de/en/innovation/creating-ai-generated-stories-for-the-bundesliga-channels/); [DFL: CMS relies on AI language model](https://www.dfl.de/en/innovation/new-content-management-system-relies-on-ai-language-model/))
- **Video localisation / dubbing.** Amazon Transcribe produces a transcript, Bedrock turns it into a script, and **DeepDub** generates the voice-over. Reported results: **75% less processing time, 5× content volume**. ([ZenML LLMOps DB](https://www.zenml.io/llmops-database/ai-powered-fan-engagement-and-content-personalization-for-global-football-audiences))
- **Bundesliga Shorts plus Amazon Personalize.** Native 9:16 video, with the DFL claiming to be the first league to produce a match natively in 9:16. Personalised ordering is credited with **+67% articles read per user and +17% dwell time**. ([AWS M&E blog](https://aws.amazon.com/blogs/media/bundesliga-boosts-app-engagement-with-shorts-powered-by-amazon-personalize))
- **"Captain" agentic AI companion (launched about 1–3 June 2026).** A conversational assistant in the app, in German and English, covering live stats, history, tactics, trivia and **personalised video playlists** (for example "Show me all Harry Kane's headed goals"). It has three skill levels and **proactive personalised storylines and live-match quizzes**. **Coach Mode** is a daily quiz that adapts to the fan's knowledge level, with country leaderboards. It also covers World Cup 2026 data. Architecture: a **multi-agent router on Amazon Bedrock and Amazon Nova** with a **text-to-SQL** loop. An LLM turns the question into SQL, **Athena** runs it on **S3 Tables**, and a second LLM call writes the answer, which keeps answers grounded in official data. ([AWS M&E blog, ~1 June 2026](https://aws.amazon.com/blogs/media/how-bundesliga-built-captain-an-ai-agent-for-fans-using-amazon-bedrock/); [SVG, 3 June 2026](https://www.sportsvideo.org/2026/06/03/bundesliga-launches-ai-assistant-captain-in-official-app-developed-with-aws/); [DFL](https://www.dfl.de/en/innovation/smart-companion-for-fans-in-the-bundesliga-app-new-ai-feature-captain-provides-video-content-data-and-historical-knowledge-on-individual-request/); [Bundesliga.com](https://www.bundesliga.com/en/bundesliga/news/captain-chat-ai-coach-mode-world-cup-quiz-aws-37625))

### 2.5 Open data and competitions

- **Kaggle "DFL – Bundesliga Data Shootout"** (30 Jul–13 Oct 2022, US$25k). Participants had to detect *play*, *challenge* and *throw-in* events in broadcast video, the direct ancestor of our "auto-eventing from video". Training data held 3,586 play, 624 challenge and 172 throw-in events. ([Bundesliga.com](https://bundesliga.com/en/aws-bundesliga-data-shootout); [GitHub solution](https://github.com/Kelvin-Doremi/Kaggle-DFL))
- **Open DFL dataset (IDSSE).** Seven Bundesliga and Bundesliga 2 matches with metadata, event data and TRACAB positional data under **CC-BY 4.0**. Bassek et al., *Scientific Data* 12:195 (2025); data on Figshare (DOI 10.6084/m9.figshare.28196177). It is a good template for **realistic synthetic event schemas**, and **kloppy** (BSD-3) reads Sportec/DFL, TRACAB, Metrica, StatsBomb and other formats. [V, read in full] ([GitHub: idsse-data](https://github.com/spoho-datascience/idsse-data); [GitHub: kloppy](https://github.com/PySport/kloppy); [GitHub: Metrica sample data, anonymised](https://github.com/metrica-sports/sample-data))

### 2.6 Bundesliga feature table

| Feature | What it shows | How it's explained | Audience | Platform | Tech partner | Transferable idea for our PL entry |
|---|---|---|---|---|---|---|
| xGoals / goal probability | Chance a shot scores (0–100%) | Single % on screen; SHAP attributions published (angle, distance, defenders, GK coverage, speed) | Both | Broadcast, app | AWS SageMaker, Clarify | Show xG plus the top 3 reasons in plain words; analysts get the numbers, casual fans a sentence |
| Shot Efficiency | Goals minus xG | Red-down / green-up arrows | Casual | Broadcast, app | AWS | Colour and arrow encoding for over- or under-performance against expectation |
| Passing Profile / xPass | Pass difficulty and completion probability (26 features) | Difficulty rating | Analyst to casual | Broadcast, app | AWS SageMaker | "Pass of the match" card with difficulty, distance, defenders bypassed |
| Most Pressed Player / Pressure Handling / Ball Recovery Time | Pressure received; escape rate; seconds to win the ball back | Rankings, seconds counter | Both | Broadcast, app | AWS | Live "pressure meter" plus "escaped the press" moment detector |
| Win Probability | WP swings | Fires only on significant swings | Casual | Broadcast | AWS | Event-triggered "this changed everything" overlay with a WP delta and its cause |
| Skill (4 archetypes) | Top-10 player archetypes | Shown at substitutions | Casual | Broadcast, app | AWS | Contextual player card when the player-focus target enters or features |
| Speed Alert / Shot Speed | Top sprint / shot km/h vs records | Record comparisons; >100 km/h goals flagged | Casual | Broadcast, app | AWS | Speed and distance-triggered player name tags |
| Average Positions: Trends | Shape change after red card, goal or sub | Before and after shape | Analyst | Broadcast | AWS | "What changed after X" shape-shift overlay |
| Match Momentum | Attacking threat difference, 5-min decayed window, 0–10 | Shown at reversals and key events | Both | Broadcast, app | Sportec, AWS Fargate/MSK | Momentum ribbon, plus our own "control vs chaos" axis |
| In-Match Analysis | Auto clips plus AR graphics on data triggers | Clip shows the anomaly | Both | Int'l / tactical feed | AWS, Vizrt | Rule-and-agent "director" that triggers overlays and replays from thresholds |
| Data Story Finder | Template-matched narratives | Text to commentators | Pro (commentators) | Commentary system | AWS | Deterministic story detector feeding the LLM narrator, so stories are grounded |
| GenAI Live Ticker | Event commentary in about 7 s | Styles: journalist / casual / Gen Z, multi-language | Casual | App, web | Amazon Bedrock | Persona and language switch on our narrative layer |
| Stories / Shorts / Personalize | Vertical recaps; personalised feed | Visual slides | Casual, young | App | Bedrock (Claude), Rekognition, Personalize | Auto vertical recap cards ordered by favourite club and player |
| Captain + Coach Mode | Chat Q&A, playlists, proactive storylines, quizzes | 3 expertise levels | Both | App | Bedrock, Nova, Athena | "Ask the match" agent with grounded tool calls and a knowledge-level dial |
| Localised World Feeds (PoC) | Commentary and graphics in many languages | Subtitles and AI audio | Global | World feed | AWS | Language personalisation of overlays and narration |
| AED (auto event detection) | Events from skeletal tracking | Confidence score per event | Internal / pro | Data feed | Sportec, AWS | Show confidence on auto-detected events; send low-confidence ones to a human or a second agent |

---

## 3. LaLiga (partners: Microsoft; LaLiga Tech / Globant → Sportian)

### 3.1 The Microsoft relationship (timeline)

- **May 2021.** LaLiga and Microsoft announce a global digital-transformation partnership. ([Microsoft Source, 19 May 2021](https://news.microsoft.com/source/2021/05/19/laliga-teams-up-with-microsoft-to-digitally-transform-football-globally-and-reimagine-a-new-era-in-sports/))
- **2021–22: Beyond Stats launched.** A fan-facing web portal of advanced metrics, with free matchday analysis in **English and Spanish**. ([LaLiga: Beyond Stats unveiled](https://www.laliga.com/en-GB/news/laliga-and-microsoft-unveil-beyond-stats-an-advanced-football-analysis-project-that-provides-in-depth-insights-into-game-play); [Broadcast Now](https://www.broadcastnow.co.uk/tech-innovation/laliga-and-microsoft-reveal-beyond-stats/5164039.article); [Beyond Stats hub](https://www.laliga.com/en-GB/beyondstats))
- **About early 2022: near-real-time Goal Probability on the broadcast.** The model expresses each chance as 0–100%, **calculated within 30 seconds** so broadcasters can insert it "almost immediately". It uses a "goalscoring efficiency variable" based on the positioning of both teams' players. The model runs on Azure ML. ([LaLiga](https://www.laliga.com/en-GB/news/laliga-takes-pioneering-step-by-adding-advanced-near-real-time-goal-probability-graphics-to-its-broadcasts-thanks-to-microsoft-technology); [TVBEurope](https://www.tvbeurope.com/live-production/laliga-employs-microsoft-azures-ai-for-goal-probability-graphics); [Broadcast Now](https://www.broadcastnow.co.uk/production/laliga-unveils-goal-probability-stats/5166793.article)) *The exact month was not verified.*
- **5 July 2023: Microsoft customer story** (read in full). **Mediacoach** is LaLiga Tech's match-data visualisation platform, in use for over a decade. It is integrated with **Azure ML, Azure Databricks** (advanced metrics) and **Power BI** (visual analysis). **50 new metrics** span Positional Data, Carries, Pressure Acts, Passing, Transitions, Goalkeeper and Physical Performance, and the Goal Probability model is computed within 30 s. ([Microsoft customer story](https://www.microsoft.com/en/customers/story/1655714713994650971-laliga-media-and-entertainment-microsoft-azure))
- **17 Aug 2023: Globant + LaLiga Tech + Microsoft Azure OpenAI pilots.**
  1. **NRT multi-language subtitles** for live matches (Whisper plus GPT-3.5), including features for hearing-impaired viewers.
  2. **Automatic content translation** (GPT-3.5/4).
  3. **Mediacoach real-time metrics** for coaching staff.
  4. **Match briefings and highly personalised content** for fans and clubs, aimed at reducing churn.

  ([Globant IR, 17 Aug 2023](https://investors.globant.com/2023-08-17-Globant-and-LaLiga-Tech-to-Pilot-Generative-AI-Applications-to-Reinvent-Sports-Tactics-and-Broadcasting); [PR Newswire](https://www.prnewswire.com/news-releases/globant-and-laliga-tech-to-pilot-generative-ai-applications-to-reinvent-sports-tactics-and-broadcasting-301903424.html); [Broadcast Now](https://www.broadcastnow.co.uk/tech-innovation/laliga-tech-globant-and-microsoft-partner-on-genai-in-sport-broadcasting/5184981.article))
- **3 Dec 2024: Azure Arc customer story** (read in full). Hybrid edge across **42 stadiums** keeps latency low for "more than 3 million data points per match that we process in real time". AI optimises fixture scheduling across more than 3 million kick-off combinations per weekend. Stated plan: "incorporating generative AI to further personalize statistics shared with clubs and fans." ([Microsoft customer story](https://www.microsoft.com/en/customers/story/19743-laliga-azure-arc))
- **14 Feb 2025: Microsoft Spain press release.** Beyond Stats has 50+ metrics with about 3.5M data points per match processed in near real time. Microsoft 365 Copilot is used internally. LaLiga and Microsoft are **working on simultaneous translation and real-time subtitling of matches with Azure OpenAI, "with the same voice and tone as the commentator" in other languages**. ([Microsoft News Center Spain](https://news.microsoft.com/es-es/2025/02/14/laliga-transforma-la-experiencia-futbolistica-y-su-gestion-interna-con-la-ia-de-microsoft/); [CIO España](https://www.cio.com/article/3825937/laliga-transforma-la-experiencia-futbolistica-y-su-gestion-interna-mediante-ia.html)) *Whether this went live at scale by October 2026 was not verified.*
- The Beyond Stats hub now describes its metrics as built "through collaboration with **Microsoft Copilot** and MediaCoach", and Beyond Stats and Microsoft run a **case-study initiative with clubs**. ([LaLiga Beyond Stats](https://www.laliga.com/en-GB/beyondstats); [LaLiga news](https://www.laliga.com/en-GB/news/beyond-stats-and-microsoft-launch-a-case-study-initiative-with-clubs))
- An earlier **Azure conversational AI** (a LaLiga chatbot/assistant) is documented on the Azure blog. *Details were not verified because the page was blocked.* ([Azure blog](https://azure.microsoft.com/en-us/blog/laliga-entertains-billions-with-azure-based-conversational-ai/))

### 3.2 Data capture

Mediacoach uses **16–19 fixed high-resolution perimeter cameras** per stadium. Sources differ: the Microsoft story says "up to 16" and press reports say 19. The cameras track ball, players and referee **25 times a second**, giving about **3.5M data points per game** and about **2,000 metrics per player**. Clubs get **Surface Pro tablets** with real-time Mediacoach access on the bench. ([TVBEurope](https://www.tvbeurope.com/live-production/laliga-employs-microsoft-azures-ai-for-goal-probability-graphics); [LaLiga BI article](https://www.laliga.com/en-US/news/laliga-paves-the-way-for-the-future-of-bi-and-analytics-in-football-thanks-to-mediacoach-and-the-beyond-stats-project))

> **Metric names requested in the brief.** "Pass Probability", "Defensive Lines" and "Pressure" were **not confirmed as official Beyond Stats metric names** in this session. Confirmed: Goal Probability, plus the categories Positional Data, Carries, Pressure Acts, Passing, Transitions, Goalkeeper and Physical Performance. Earlier counts of "21" and "24" new metrics later became "50+".

### 3.3 Broadcast production innovations ([U], UNVERIFIED; search budget exhausted)

From prior knowledge, LaLiga's in-house production (LaLiga / Mediapro era) has been an early adopter of:
- **Cinematic-style cameras** with shallow depth of field for close-ups and celebrations.
- **Virtual stands and crowd audio** during 2020 behind-closed-doors matches, using crowd sounds from EA Sports FIFA. This may be what the brief calls "LaLiga Virtual".
- **Tunnel and dressing-room cameras**, drones and aerial cams.
- **360° and volumetric replays**.

*Verify with: "LaLiga cinematic camera broadcast", "LaLiga virtual stands Vizrt 2020", "LaLiga 2025-26 broadcast innovations".*

### 3.4 LaLiga feature table

| Feature | What it shows | How it's explained | Audience | Platform | Tech partner | Transferable idea for our PL entry |
|---|---|---|---|---|---|---|
| Goal Probability (near real time) | 0–100% chance a chance becomes a goal, within about 30 s | On-screen % graphic; based on positioning of both teams | Casual and analyst | Broadcast | Microsoft Azure ML | Prove sub-30 s Ingest → Explain → Render latency on Azure; show the % with a one-line "why" |
| Beyond Stats portal (50+ metrics) | Carries, Pressure Acts, Transitions, Passing, GK, physical | Matchday articles in EN and ES; Power BI visuals | Analyst / engaged fan | Web | Azure ML, Databricks, Power BI, Copilot | Analyst-mode drill-down panel next to the casual overlay |
| Mediacoach | About 2,000 metrics per player for clubs | Tablets on the bench | Pro | Club tools | LaLiga Tech/Globant, Azure, Surface | "Coach view" persona (tactical) vs "fan view" |
| NRT multilingual subtitles | Live speech to multilingual subtitles | Text overlay, accessibility | Global, hearing-impaired | Stream | Azure OpenAI (Whisper, GPT-3.5) | Live captions and translated narration via Azure AI Speech/Translator |
| Real-time translation keeping the commentator's voice (in development, 2025) | Dubbed commentary in other languages | Same voice and tone | Global | Stream | Azure OpenAI | Language as a first-class personalisation axis; voice-preserving TTS demo |
| Match briefings and personalised content | Pre/post-match briefings tailored to fans and clubs | LLM-written | Casual | App, web | Azure OpenAI (GPT-4) | Personalised pre-match "what to watch for" and post-match recap per fan |
| Edge plus cloud (Azure Arc) | Low-latency processing in 42 stadiums | n/a | Ops | Infra | Azure Arc | Architecture slide: edge ingest, cloud agents |

---

## 4. Serie A / Lega Serie A ([U], UNVERIFIED)

*No verified searches were possible for Serie A; treat everything below as hypotheses to check.*

- **Domestic broadcast.** DAZN holds the main domestic rights for 2024–29, with Sky co-exclusive on a subset of matches. DAZN Italy layers its own stats graphics and app features, such as live stats and in-app engagement. *Verify: "DAZN Serie A 2024-2029 rights Sky co-exclusive", "DAZN Serie A stats overlay app features".*
- **League production and international feed.** Lega Serie A has moved towards in-house production and international distribution with its own media centre. *Exact partners and AI usage were not verified.* Verify: "Lega Serie A international broadcast centre production partner", "Serie A AI highlights".
- **Officiating tech.** Serie A was an early domestic adopter of **semi-automated offside technology**, reportedly from 2022–23. *Provider not verified.* Verify: "Serie A semi-automated offside 2022-23 provider".
- **Data and AI partners.** We could not confirm a hyperscaler-branded, fan-facing advanced-stats product comparable to BMF (AWS) or Beyond Stats (Microsoft). **If confirmed absent, that is itself a finding:** Serie A is a candidate "fast-follower" market for an exportable PL-style product. Verify: "Lega Serie A official data partner Stats Perform OR Genius Sports OR Sportradar", "Lega Serie A Microsoft OR AWS OR Google Cloud partnership".

| Feature | What it shows | How it's explained | Audience | Platform | Tech partner | Transferable idea |
|---|---|---|---|---|---|---|
| DAZN stats overlays (UNVERIFIED) | Live team and player stats | Standard graphics | Casual | Stream | DAZN | Rights-holder vs league-produced graphics: our overlays should be league-agnostic and broadcaster-pluggable |
| SAOT (UNVERIFIED provider) | Offside decisions with 3D animation | 3D replay | Casual | Broadcast | n/a | 3D or 2D re-animation from tracking to explain decisions |

---

## 5. Ligue 1 / LFP: Ligue 1+ ([U], UNVERIFIED)

- **Ligue 1+.** LFP Media launched its own direct-to-consumer streaming channel in **August 2025** after the DAZN deal collapsed. It carries most Ligue 1 matches each round, and pay-TV and telco partners also distribute it. Reported pricing is around €15/month. LFP later claimed subscriber milestones of about 1M; *figures and dates are unverified.* Verify: "Ligue 1+ launch August 2025 price subscribers", "Ligue 1+ platform technology provider".
- **Personalisation, data and AI.** *Not verified.* Possible features include multiplex and multicam, live stats, and magazine shows. We found no confirmed AWS, Google or Microsoft-branded AI fan feature for Ligue 1+. Verify: "Ligue 1+ data features stats multicam", "LFP Media AI partnership".
- **Strategic point.** Ligue 1+ is the first big-five league to own the whole distribution layer to fans. That is the **precondition for per-viewer personalised overlays**, because a league that controls the player can render client-side graphics per fan. Our PL demo can make the same argument for a PL-owned stream or app layer.

| Feature | What it shows | How it's explained | Audience | Platform | Tech partner | Transferable idea |
|---|---|---|---|---|---|---|
| Ligue 1+ league-owned OTT (UNVERIFIED details) | Live matches, magazines | n/a | All | OTT app | LFP Media (partners unverified) | Owning the player enables per-viewer client-side overlays, which is our architecture's selling point |

---

## 6. UEFA, FIFA, MLS and others ([U], UNVERIFIED unless marked)

**UEFA**
- **SAOT and a connected ball.** SAOT is used in the Champions League. Euro 2024 used a ball with a sensor for contact detection alongside SAOT. *Unverified details.*
- **Amazon Prime Video holds UCL packages** in the UK (from 2024/25, the Tuesday first-pick match), Germany (Tuesday top match) and Italy (top midweek match). *Unverified.* Verify: "Prime Video Champions League UK Tuesday first pick 2024-25", "Prime Video Champions League Germany Italy rights".
- **Transferable:** streaming rights-holders such as Prime Video already ship in-stream stats features (for example X-Ray). Our overlay layer should be designed as a **streaming-native, toggleable layer**, not burned-in graphics.

**FIFA**
- **Enhanced Football Intelligence** (since Qatar 2022) publishes metrics such as line breaks, offers to receive, pressing and phases of play, aimed at coaches and fans. *Unverified this session.*
- **FIFA Club World Cup 2025 (USA).** Live **referee body-cam** footage on broadcast, SAOT, and global streaming on DAZN. *Unverified this session.* (The Bundesliga's RefCam is verified above.)
- **World Cup 2026.** Lenovo is the FIFA technology partner. Reported: AI tools for team analysts and **AI-built 3D digital avatars of every player** to make offside visualisations more accurate. *Unverified.* Verify: "FIFA World Cup 2026 Lenovo 3D player avatars offside", "Lenovo Football AI Pro".
- The Bundesliga's Captain already includes **World Cup 2026 data** [V], showing that league agents are expanding beyond their own competition.

**MLS**
- **Apple TV.** A 10-year global deal (2023–2032), with MLS Season Pass folded into the Apple TV subscription from 2026. Multilingual commentary in English, Spanish and French for Canadian clubs. *Unverified this session.*
- **MLS × Google Cloud.** Reported multi-year AI and cloud partnership (2025) for AI-generated content and insights. *Unverified.* Verify: "MLS Google Cloud partnership Gemini AI".

**Eredivisie / others.** Not researched (search budget).

| Body | Feature | What it shows | Audience | Platform | Partner | Transferable idea |
|---|---|---|---|---|---|---|
| FIFA (UNVERIFIED) | Enhanced Football Intelligence | Line breaks, phases of play, pressure | Analyst | Broadcast, web | FIFA | Adopt a "line-break" event and "phase of play" labels in our synthetic schema |
| FIFA (UNVERIFIED) | Referee body cams; 3D avatars for offside | Official's POV; accurate limb offside | Casual | Broadcast | Lenovo (WC26) | Avatar or skeleton rendering of synthetic tracking for "explain the decision" |
| UEFA / Prime (UNVERIFIED) | Streaming-native stats | In-stream overlays | Casual | OTT | Amazon | Toggleable personal overlay layer |
| MLS (UNVERIFIED) | Multilingual feeds; Google Cloud AI content | Language choice; AI content | Global | OTT, app | Apple, Google Cloud | Language as a personalisation axis |

---

## 7. Premier League context (for positioning; [U], UNVERIFIED)

- Microsoft and the Premier League announced a multi-year partnership in mid-2025. It includes an AI "Premier League Companion" in PL digital products, built on Azure OpenAI / Copilot. *Verify the exact date, product name and features before quoting this in the pitch.*
- Data and tracking: Genius Sports (Second Spectrum) is reported as the PL's official data and tracking partner from 2025/26. *Verify.*
- **Positioning:** the Bundesliga has a mature AWS stack and LaLiga has a Microsoft analytics stack. Our entry should show the **Microsoft-native, end-to-end, agentic and per-viewer** version that neither currently ships.

---

## 8. Ranked transferable concepts (most inspiring first)

1. **Event-triggered "moments that matter" overlays.** From: Win Probability swings, In-Match Analysis, Data Story Finder. Graphics fire only when a threshold is crossed: a WP swing above X, xG below 5% scored, a shot above 100 km/h, a sprint above 34 km/h. An agent attaches a one-line **why**. This maps directly to the Ingest → Interpret → Explain → Render pipeline and the judging criteria.
2. **Momentum plus "control vs chaos" ribbon.** From: Match Momentum. Reuse the published recipe: a 5-minute window, weighted actions, time decay, 0–10 per team, the difference between teams, reset each half. Add a second axis the Bundesliga lacks, **chaos**: transitions per minute, turnover rate, possession entropy. That gives "rhythm" in 2D: dominant-controlled, dominant-chaotic, and so on.
3. **Explainable xG with plain-language reasons.** From: SageMaker Clarify / SHAP and LaLiga Goal Probability. For each shot, show the top three contributions, for example "tight angle −8%, two defenders in line −5%, keeper off his line +3%". Use Azure ML's interpretability tooling or SHAP in our own pipeline. Analysts get the numbers, casual fans a sentence.
4. **Persona and expertise dial for narration.** From: the GenAI ticker styles (Journalist, Casual, Gen Z) and Captain's three skill levels. One grounded fact gets several renderings. The analyst/casual split is a hackathon requirement, so cite this as industry precedent.
5. **Template-grounded storytelling, so the LLM never invents.** From: Data Story Finder. A deterministic detector (templates and thresholds over the event and stat store) proposes candidate stories with evidence. The LLM only words and ranks them. This answers the judges' likely hallucination question and shows "agentic design".
6. **Pass quality card.** From: Passing Profile and xPass (26 features). Distance, defenders bypassed, pressure on passer and receiver, height, completion probability and a difficulty rating. Add a "hardest completed pass" milestone and a per-player passing fingerprint.
7. **Speed and distance-triggered player name tags.** From: Speed Alert and Shot Speed. Tag a player when a sprint, distance or shot-speed threshold fires, with record context such as "fastest by a Spurs player this season". This meets the "real-time player name tagging" suggestion.
8. **"Ask the match" agent grounded by text-to-SQL or tool calls.** From: Captain. Fans ask questions and the agent queries our synthetic event store and returns an answer, a clip pointer or an overlay. Captain's multi-agent routing pattern (router, stats agent, video agent, quiz agent) is easy to rebuild with Azure AI Foundry agents.
9. **Language as a first-class axis.** From: Localised World Feeds, LaLiga's voice-preserving translation and NRT subtitles. Localise overlay strings and narration (Azure AI Translator and Speech). For the demo, switch the same moment between English, Spanish and Hindi or Arabic live.
10. **Pressure narrative.** From: Most Pressed Player, Pressure Handling and Ball Recovery Time. A live pressure gauge on the ball carrier and an "escaped the press" moment. A Ball Recovery Time clock after turnovers explains pressing teams to casual fans.
11. **Contextual player cards at natural pauses.** From: Skill archetypes shown at substitutions. In player-focus mode, surface the player's archetype and live form when they enter or at stoppages. Do not clutter open play.
12. **"What changed after X".** From: Average Positions: Trends. After a goal, red card or substitution, show a before/after shape and an agent sentence ("Arsenal dropped 8 m deeper after going ahead").
13. **Auto vertical recap stories.** From: Bundesliga Stories (Claude on Bedrock) and Shorts with Personalize. Post-match, generate 6–8 swipeable cards per fan (club-centric, player-centric), with frames chosen by event timestamps.
14. **Confidence-scored auto-events.** From: DFL Automated Event Detection. Our synthetic, or video-derived, events carry a confidence score. Low-confidence events are held back or marked "provisional" on the overlay. This is a responsible-AI talking point.
15. **Coach Mode micro-learning.** From: Captain. During stoppages, offer casual fans a 10-second "what is a low block?" card or quiz tied to what just happened.

---

## 9. White space: what nobody visibly ships yet (as of Oct 2026, per this research)

1. **Per-viewer personalised graphics on the live video.** Personalisation lives in apps (feeds, chat, ticker styles). Broadcast graphics are shared, or at most per language (the DFL PoC). A client-rendered overlay layer that differs per fan (club, player focus, expertise, language) and is synced to the stream timecode is open ground.
2. **An agentic graphics director that explains itself.** Today, story-finding (text for commentators) and graphics rendering (Vizrt clips) are separate systems. An agent that decides *which* overlay to show, *when*, and *for whom*, and logs a rationale ("shown because the WP swing was 23% and the user follows Arsenal"), is not public anywhere.
3. **Uncertainty shown to fans.** No league shows confidence intervals or model confidence on air. A subtle confidence indicator, or "provisional" auto-events, would be novel and on-brand for Microsoft Responsible AI.
4. **Counterfactual "why it mattered".** For example, "If he'd squared it, xG was 0.41 vs 0.06 for the shot taken", or "this clearance saved an expected 0.3 goals". The research exists (pass value and xT models), but broadcasts don't explain decisions counterfactually.
5. **A "chaos" or "game state" axis.** Momentum measures who is attacking. Nobody shows whether the game is structured or chaotic: transitions, broken play, rhythm and tempo changes. That matches the hackathon's "control vs chaos" prompt.
6. **Market-aware framing.** The same moment narrated with local relevance, such as a player's home country, the fan's timezone (catch-up recap), or fantasy implications. Localisation today means translation, not cultural or contextual adaptation.
7. **Synthetic-data-first development.** Leagues build on proprietary tracking. A **synthetic match generator** with realistic event and tracking distributions (modelled on open schemas like the IDSSE dataset or kloppy's formats) is a reusable, privacy-safe product for testing overlays and agents. It is also exactly what this hackathon rewards.
8. **Accessibility beyond subtitles.** LaLiga mentions hearing-impaired subtitles. Audio-described data for blind and low-vision fans ("pressure rising on the left") and cognitive-load-adaptive overlays are largely absent.

---

## 10. Suggested follow-up verification queries (for a later session)

- "LaLiga 2025-26 broadcast innovations cinematic camera referee cam"
- "Beyond Stats metrics list expected pass defensive line height"
- "LaLiga Azure OpenAI real-time translation live matches launched 2025 2026"
- "Lega Serie A data partner AI 2025 2026" and "DAZN Serie A stats features"
- "Ligue 1+ subscribers 2026 features stats multicam AI"
- "FIFA World Cup 2026 Lenovo 3D avatars offside AI"
- "MLS Google Cloud AI partnership features"
- "Premier League Microsoft partnership Premier League Companion Copilot features"
- "Bundesliga 3D tracking provider 2025-26 (TRACAB / other)"

---

## 11. Sources

**Bundesliga / DFL / AWS**
- Bundesliga.com: Match Momentum expands the data offering (Sept 2025). https://www.bundesliga.com/en/bundesliga/news/bundesliga-match-facts-aws-match-momentum-34052
- DFL: Match Momentum expands the data offering (Sept 2025). https://www.dfl.de/en/innovation/bundesliga-match-facts-match-momentum-expands-the-data-offering/
- AWS M&E blog: Match Momentum, revealing the game's invisible pulse (~24 Sept 2025). https://aws.amazon.com/blogs/media/bundesliga-match-fact-match-momentum-revealing-the-games-invisible-pulse/
- Business Wire: BMF powered by AWS launch (26 May 2020). https://www.businesswire.com/news/home/20200526005205/en/Amazon-Web-Services-and-Bundesliga-to-Deliver-Real-Time-Game-Analysis-with-Bundesliga-Match-Facts-Powered-by-AWS
- Advanced Television: AWS, Bundesliga launch new Match Facts (11 Feb 2021). https://www.advanced-television.com/2021/02/11/aws-bundesliga-launch-new-match-facts/
- Amazon press: Shot Efficiency and Passing Profile (Sept 2021). https://press.aboutamazon.com/2021/9/aws-and-bundesliga-to-debut-two-new-bundesliga-match-facts-for-the-2021-22-european-football-season
- Business Wire: Set Piece Threat and Skill (2 Mar 2022). https://www.businesswire.com/news/home/20220302005404/en/AWS-and-Bundesliga-Debut-Two-New-Match-Facts-Giving-Fans-Insight-into-Germany%E2%80%99s-Top-Football-Players-and-Teams
- Business Wire: Pressure Handling and Win Probability (29 Sept 2022). https://www.businesswire.com/news/home/20220929005810/en/AWS-and-DFL-Unveil-Two-New-Bundesliga-Match-Facts-for-the-2022%E2%80%9323-German-Football-Season
- Bundesliga.com: Keeper Efficiency and Ball Recovery Time (2023). https://www.bundesliga.com/en/bundesliga/news/new-match-facts-aws-keeper-efficiency-xsaves-ball-recovery-time-23071
- SVG: Shot Speed (3 Nov 2023). https://www.sportsvideo.org/2023/11/03/dfl-aws-add-new-shot-speed-stat-to-bundesliga-match-facts/
- AWS ML blog: Explaining xGoals with SageMaker Clarify. https://aws.amazon.com/blogs/machine-learning/explaining-bundesliga-match-facts-xgoals-using-amazon-sagemaker-clarify/
- AWS ML blog: Passing Profile deep dive. https://aws.amazon.com/blogs/machine-learning/the-development-of-bundesliga-match-fact-passing-profile-a-deep-dive-into-passing-in-football
- AWS ML blog: Skill. https://aws.amazon.com/blogs/machine-learning/bundesliga-match-fact-skill-quantifying-football-player-qualities-using-machine-learning-on-aws
- AWS ML blog: Win Probability. https://aws.amazon.com/blogs/machine-learning/bundesliga-match-fact-win-probability-quantifying-the-effect-of-in-game-events-on-winning-chances-using-machine-learning-on-aws/
- AWS ML blog: Ball Recovery Time. https://aws.amazon.com/blogs/machine-learning/bundesliga-match-fact-ball-recovery-time-quantifying-teams-success-in-pressing-opponents-on-aws/
- SVG Europe: Shot Efficiency and Passing Profile (2021). https://www.svgeurope.org/blog/headlines/dfl-and-aws-debut-new-bundesliga-match-facts-for-shot-efficiency-and-passing-profile/?print=1
- TechTarget: Bundesliga delivering insight to fans via AWS (500 ms). https://www.techtarget.com/searchbusinessanalytics/feature/Bundesliga-delivering-insight-to-fans-via-AWS
- SVG Europe: TRACAB Gen5 rollout. https://www.svgeurope.org/blog/news-roundup/chyronhego-rolls-out-tracab-gen5-following-stamp-of-approval-from-the-dfl/?print=1
- Lowpass: EA–TRACAB acquisition (Feb 2025). https://www.lowpass.cc/p/ea-tracab-acquisition-3d-sports-data
- DFL: Changes for 2025-26 (referee announcements, tracking, offside). https://www.dfl.de/en/news/changes-for-the-2025-26-season-referee-announcements-player-tracking-offside-detection/
- DFL: Automated event detection becomes a reality. https://www.dfl.de/en/innovation/automated-event-detection-becomes-a-reality/
- Football Business Journal: DFL AED. https://www.footballbusinessjournal.com/post/dfl-launches-automated-event-detection-system-powered-by-skeletal-tracking
- SVG Europe: SportsInnovation 2026, 3D tracking. https://www.svgeurope.org/blog/headlines/sportsinnovation-2026-inside-the-bundesligas-new-3d-tracking-system-and-how-it-could-be-used-for-broadcast-analysis/
- SVG Europe: SportsInnovation 2026, automated production trial. https://www.svgeurope.org/blog/headlines/sportsinnovation-2026-bundesliga-prepares-for-the-future-with-trial-of-automated-match-production/
- SVG Europe: Drones, data and localisation (2026/27 season). https://www.svgeurope.org/blog/headlines/drones-data-and-localisation-more-innovation-for-the-new-bundesliga-season/
- SVG Europe: AI multi-language world feeds PoC. https://www.svgeurope.org/blog/headlines/ai-paving-the-way-to-multi-language-bundesliga-world-feeds-in-new-poc/
- SVG: RefCam (7 Apr 2026). https://www.sportsvideo.org/2026/04/07/a-new-pov-refcams-rise-in-the-bundesliga-signals-a-potential-new-era-for-soccer-broadcasts/
- DFL: Further improved visualisation (In-Match Analysis). https://www.dfl.de/en/innovation/further-improved-visualisation-of-match-data-in-football-broadcasting/
- Leaders in Sport: In-Match Analysis (2025 shortlist). https://leadersinsport.com/sport-business/leaders-events/leaders-sport-awards/2025-shortlist/bundesliga-in-match-analysis/
- Bundesliga Group: AI-enhanced Bundesliga 2 live feeds. https://www.bundesliga-group.com/innovation/enhancing-live-feeds-of-bundesliga-2-matches-using-artificial-intelligence/
- AWS case study: Bundesliga data into AI-powered stories (Data Story Finder). https://aws.amazon.com/solutions/case-studies/bundesliga-case-study/
- AWS M&E blog: Data Story Finder. https://aws.amazon.com/blogs/media/bundesliga-data-story-finder-delivering-fans-the-stories-they-love/
- AWS M&E blog: GenAI live commentary. https://aws.amazon.com/blogs/media/revolutionizing-fan-engagementcer-bundesliga-generative-ai-powered-live-commentary/
- re:Invent 2024 session write-up (Zenn). https://zenn.dev/kiiwami/articles/3b0b5f728bc20329?locale=en
- ZenML LLMOps DB: DFL AI fan engagement. https://www.zenml.io/llmops-database/ai-powered-fan-engagement-and-content-personalization-for-global-football-audiences
- DFL: AI-generated stories. https://www.dfl.de/en/innovation/creating-ai-generated-stories-for-the-bundesliga-channels/
- DFL: CMS relies on AI language model. https://www.dfl.de/en/innovation/new-content-management-system-relies-on-ai-language-model/
- AWS M&E blog: Shorts with Amazon Personalize. https://aws.amazon.com/blogs/media/bundesliga-boosts-app-engagement-with-shorts-powered-by-amazon-personalize
- AWS case study: Bundesliga and Amazon Nova. https://aws.amazon.com/solutions/case-studies/bundesliga-nova-case-study/
- AWS M&E blog: How Bundesliga built Captain (~1 June 2026). https://aws.amazon.com/blogs/media/how-bundesliga-built-captain-an-ai-agent-for-fans-using-amazon-bedrock/
- SVG: Bundesliga launches Captain (3 June 2026). https://www.sportsvideo.org/2026/06/03/bundesliga-launches-ai-assistant-captain-in-official-app-developed-with-aws/
- DFL: Captain smart companion. https://www.dfl.de/en/innovation/smart-companion-for-fans-in-the-bundesliga-app-new-ai-feature-captain-provides-video-content-data-and-historical-knowledge-on-individual-request/
- Bundesliga.com: Captain in the app. https://www.bundesliga.com/en/bundesliga/news/captain-chat-ai-coach-mode-world-cup-quiz-aws-37625
- Bundesliga.com: AWS Bundesliga Data Shootout. https://bundesliga.com/en/aws-bundesliga-data-shootout
- GitHub: IDSSE open DFL dataset (read in full). https://github.com/spoho-datascience/idsse-data
- GitHub: kloppy (read in full). https://github.com/PySport/kloppy
- GitHub: Metrica sample data (read in full). https://github.com/metrica-sports/sample-data

**LaLiga / Microsoft**
- Microsoft Source: LaLiga and Microsoft partnership (19 May 2021). https://news.microsoft.com/source/2021/05/19/laliga-teams-up-with-microsoft-to-digitally-transform-football-globally-and-reimagine-a-new-era-in-sports/
- LaLiga: Beyond Stats unveiled. https://www.laliga.com/en-GB/news/laliga-and-microsoft-unveil-beyond-stats-an-advanced-football-analysis-project-that-provides-in-depth-insights-into-game-play
- LaLiga: Beyond Stats hub. https://www.laliga.com/en-GB/beyondstats
- LaLiga: Goal Probability graphics. https://www.laliga.com/en-GB/news/laliga-takes-pioneering-step-by-adding-advanced-near-real-time-goal-probability-graphics-to-its-broadcasts-thanks-to-microsoft-technology
- LaLiga: BI and Analytics, Mediacoach and Beyond Stats. https://www.laliga.com/en-US/news/laliga-paves-the-way-for-the-future-of-bi-and-analytics-in-football-thanks-to-mediacoach-and-the-beyond-stats-project
- LaLiga: Beyond Stats and Microsoft club case-study initiative. https://www.laliga.com/en-GB/news/beyond-stats-and-microsoft-launch-a-case-study-initiative-with-clubs
- TVBEurope: Azure AI Goal Probability graphics. https://www.tvbeurope.com/live-production/laliga-employs-microsoft-azures-ai-for-goal-probability-graphics
- Broadcast Now: Goal Probability stats. https://www.broadcastnow.co.uk/production/laliga-unveils-goal-probability-stats/5166793.article
- Broadcast Now: Beyond Stats. https://www.broadcastnow.co.uk/tech-innovation/laliga-and-microsoft-reveal-beyond-stats/5164039.article
- Microsoft customer story: LaLiga data and AI at scale (5 July 2023, read in full). https://www.microsoft.com/en/customers/story/1655714713994650971-laliga-media-and-entertainment-microsoft-azure
- Microsoft customer story: LaLiga Azure Arc (3 Dec 2024, read in full). https://www.microsoft.com/en/customers/story/19743-laliga-azure-arc
- Microsoft News Center Spain: LaLiga and Microsoft AI (14 Feb 2025). https://news.microsoft.com/es-es/2025/02/14/laliga-transforma-la-experiencia-futbolistica-y-su-gestion-interna-con-la-ia-de-microsoft/
- CIO España (Feb 2025). https://www.cio.com/article/3825937/laliga-transforma-la-experiencia-futbolistica-y-su-gestion-interna-mediante-ia.html
- Globant IR: GenAI pilots with LaLiga Tech and Microsoft (17 Aug 2023). https://investors.globant.com/2023-08-17-Globant-and-LaLiga-Tech-to-Pilot-Generative-AI-Applications-to-Reinvent-Sports-Tactics-and-Broadcasting
- PR Newswire (same release). https://www.prnewswire.com/news-releases/globant-and-laliga-tech-to-pilot-generative-ai-applications-to-reinvent-sports-tactics-and-broadcasting-301903424.html
- Broadcast Now: LaLiga Tech, Globant and Microsoft GenAI. https://www.broadcastnow.co.uk/tech-innovation/laliga-tech-globant-and-microsoft-partner-on-genai-in-sport-broadcasting/5184981.article
- Azure blog: LaLiga conversational AI (not opened). https://azure.microsoft.com/en-us/blog/laliga-entertains-billions-with-azure-based-conversational-ai/

**Serie A, Ligue 1, UEFA, FIFA, MLS, Premier League:** no sources verified in this session (search budget exhausted). See the verification queries in section 10.
