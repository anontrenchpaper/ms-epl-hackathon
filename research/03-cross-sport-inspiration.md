# 03 — Cross-Sport & Media-Industry Inspiration

**For:** Microsoft x Premier League "Inside the Game" hackathon (Oct 6–27, 2026)
**Compiled:** 2026-10-06
**Scope:** The best current examples of (a) data overlays on live broadcasts, (b) personalised and alternate broadcasts, (c) AI-generated narratives, recaps and commentary, and (d) ways of explaining machine-learning output to casual fans. The report ends with a synthesis written for a Premier League entry built on synthetic data and Azure.

> **How this was researched (read first)**
> - About 65 web searches, mostly in "extended" mode. **WebFetch was blocked by the sandbox egress proxy for every domain tried**, including aboutamazon.com, sportsvideo.org, wikipedia.org, awfulannouncing.com and hashtagsports.com. Claims marked as sourced therefore rest on **search-result summaries of the linked pages, not full-page reads**. Treat exact numbers as "reported by" the linked outlet.
> - The **shared web-search budget ran out** partway through, so DAZN, Netflix, Bundesliga, LaLiga and the accessibility topics could not be verified. Anything tagged **[BK]** comes from background knowledge (training data, cutoff mid-2026), was **not re-verified in this session**, and has no URL. Check it before quoting it to judges.
> - Dates are given wherever the source carried one.

---

## 0. TL;DR: ten ideas worth stealing

1. **A predict → reveal loop on the pitch.** Amazon's *Defensive Alerts* puts a red circle under a likely blitzer *before* the snap. Casual fans "see the red circle and recognise something might happen" ([AP via WSLS, Jan 2025](https://www.wsls.com/tech/2025/01/10/prime-videos-use-of-ai-next-gen-stats-on-nfl-games-is-helping-viewers-understand-the-game-better/)). Football version: highlight the likely runner in behind or the player about to trigger the press, then show whether it happened.
2. **"Not just who's winning, but why."** IBM's *Key Moments* (Wimbledon June 2026, US Open Aug 2026) adds an explanation of which points shifted momentum on top of a live win-probability model ([IBM, Aug 24 2026](https://newsroom.ibm.com/2026-08-24-ibm-and-the-usta-introduce-new-ai-powered-fan-experiences-for-2026-us-open); [artificialintelligence-news](https://www.artificialintelligence-news.com/news/wimbledon-ibm-ai-tools-live-match-coverage/)). This is the closest existing product to our brief of "explainable match intelligence".
3. **One game, several feeds for different audiences.** ESPN runs the main *MNF* broadcast, the *ManningCast* (personality), *Funday Football* (kids, animated from tracking data) and *MNF Playbook with Next Gen Stats* (avid fans, a "meeting-room" data-cast) on the same game ([ESPN Press Room, Dec 2025](https://espnpressroom.com/us/press-releases/2025/12/espn-to-debut-mnf-playbook-with-next-gen-stats-dec-22-an-nfl-data-cast-aimed-at-avid-fans-complements-monday-night-football-and-espn-nfl-postseason-slate/)). That is the brief's "analyst vs casual fan" requirement, already shipped.
4. **Re-render the game from tracking data in a new visual style.** *Toy Story* (2023), *The Simpsons* (2024), *Dunk the Halls* (NBA, 2024) and *Monsters Funday Football* (Dec 2025) all fuse NFL RFID data with Hawk-Eye skeletal tracking (29 points per player, about 50 updates a second) and render the result in Unreal ([TechRadar](https://www.techradar.com/streaming/entertainment/its-a-lot-of-data-processed-around-50-times-per-second-sonys-beyond-sports-on-how-the-simpsons-funday-football-came-to-be); [SVG, Dec 2025](https://www.sportsvideo.org/2025/12/08/monsters-funday-football-espns-latest-live-animation-effort-advances-the-altcast-art-form-again/)). We can do a 2D version from synthetic x/y data.
5. **Personalised AI recap with a synthetic voice.** Peacock's *Your Daily Olympic Recap*: an AI Al Michaels voice, about 10 minutes long, built from 3 favourite sports plus topics, about 7 million variants ([Comcast](https://corporate.comcast.com/press/releases/peacock-personalized-olympic-recaps-voice-al-michaels-generated-with-ai)).
6. **Catch-up for latecomers.** Prime's *Rapid Recap* (AI highlights of 2 minutes or less, then straight into live play) and Apple MLS *Key Plays* catch-up ([Digital Trends](https://www.digitaltrends.com/home-theater/mls-season-pass-catch-up-feature/)).
7. **A grounded match chatbot.** IBM *Match Chat* runs on watsonx Orchestrate agents and Granite, tuned to the event's editorial style, with suggested prompts, and it even answers name-pronunciation questions ([IBM US Open 2025](https://newsroom.ibm.com/2025-08-18-ibm-and-the-usta-roll-out-ai-powered-fan-experiences-for-2025-us-open)).
8. **A producer storytelling console.** F1's *Track Pulse* (AWS) gathers battles, predictions and fastest sectors in one place for the production team and builds the on-screen graphics. F1 claims a "47% increase in viewer understanding" ([AWS Media blog](https://aws.amazon.com/blogs/media/f1-revs-up-race-day-broadcasts-with-real-time-data-storytelling/)).
9. **Accessibility feeds as first-class feeds.** JioHotstar's IPL coverage offers 12 languages plus an Indian Sign Language feed and an audio-descriptive feed ([BestMediaInfo, 2026](https://bestmediainfo.com/mediainfo/mediainfo-digital/jiostar-sharpens-ipl-2026-digital-play-with-dedicated-hindi-feed-and-20-viewing-options-11403249)).
10. **Microsoft's own sports-AI precedent is the NBA.** NBA *Insights* in the NBA App runs on Azure OpenAI and explains "the why behind key game moments" ([Microsoft customer story](https://www.microsoft.com/en/customers/story/19758-national-basketball-association-azure-open-ai-service)). Judges from Microsoft will know this one, so referencing it is smart.

---

## 1. NFL

### 1.1 Next Gen Stats (AWS): the modelling backbone
- **Completion Probability (CP)** was NGS's first ML model, launched in 2018. It uses 10 on-field measurements, including pass distance, the QB's distance to the nearest rusher and the receiver's separation from the nearest defender, and outputs a league-average likelihood that the pass is completed ([NFL video explainer](https://amp.nfl.com/videos/next-gen-stats-completion-probability-explained); [Amazon Science](https://amazon.science/latest-news/how-aws-scientists-help-create-the-nfls-next-gen-stats)).
- **CP 2.0 (2025)** was rebuilt with **"occlusion-aware separation"**. A throw counts as harder when a defender sits directly in the ball's path and is contesting the catch point, which separates genuinely tight windows from "scheme-driven layups" ([NFL.com, 2025 metrics](https://mobile-www.nfl.com/news/next-gen-stats-new-advanced-metrics-you-need-to-know-for-the-2025-nfl-season); [4for4, 2026](https://www.4for4.com/2026/preseason/understanding-nfl-next-gen-stats-2026)).
- **How it is explained on air:** commentators rarely say "probability". They say a throw was **difficult**: "a 23% completion probability, and he made it". The model's output becomes a *degree of difficulty* that makes a highlight more impressive. NGS data goes to broadcast partners such as ESPN in real time ([Computerworld NZ](https://www2.computerworld.co.nz/article/print/650342/how-nfl-predicting-pass-completion-using-aws-sagemaker/)).
- **Football transfer:** xG and pass-difficulty models do the same job. Present them as "how hard was that?" rather than "what was the probability?"

### 1.2 Amazon Prime Video: Prime Vision with Next Gen Stats and Prime Insights
Prime Vision is an **alternate stream** that works as a lab. Features debut there and then "graduate" to the main telecast ([Deadline, Sep 2025](https://deadline.com/2025/09/amazon-leans-into-data-thursday-night-football-nfl-season-1236528004/)).

| Feature | What it does | Explaining device | Source |
|---|---|---|---|
| **Defensive Alerts** | Billed as "the first predictive behaviour AI model in a live NFL broadcast". A neural network reads pre-snap x/y positions, player relationships and acceleration, then flags likely blitzers | **Red circle** under the player, shown before the snap | [aboutamazon](https://www.aboutamazon.com/news/entertainment/thursday-night-football-amazon-prime-video-ai-features); [AP/WSLS](https://www.wsls.com/tech/2025/01/10/prime-videos-use-of-ai-next-gen-stats-on-nfl-games-is-helping-viewers-understand-the-game-better/) |
| **Pressure Alert** (2024) | Highlights defenders attacking the backfield during the live play | On-field highlight | [SVG, Sep 2024](https://www.sportsvideo.org/2024/09/10/nfl-kickoff-2024-tnf-on-prime-video-continues-to-push-the-ai-envelope-with-new-set-of-prime-insights/) |
| **Coverage ID** (2024) | Names the defensive scheme (man or zone) before the snap | Text label | same |
| **Defensive Vulnerability** (2024) | The first feature to highlight **areas** of the field rather than players: "where the offence will, or *should*, attack" | Zone shading | same |
| **Prime Targets** | Marks the receiver who is open and likely to convert | **Green orb** | [Rotowire review](https://www.rotowire.com/article/thursday-night-football-on-prime-a-review-of-the-new-aws-powered-features-74898); [Boardroom](https://boardroom.tv/amazon-thursday-night-football-tech/) |
| **Pocket Health** (2025) | AI gauge of how well the offensive line is holding | **Gauge** that fills as pressure builds | [Awful Announcing](https://awfulannouncing.com/amazon/thursday-night-football-prime-vision-new-features.html) |
| **Fourth Down Territory / Field Goal Target Zones** | Shows coaches' go-for-it and kick decisions in real time | Field overlay | [SVG 2024](https://www.sportsvideo.org/2024/09/10/nfl-kickoff-2024-tnf-on-prime-video-continues-to-push-the-ai-envelope-with-new-set-of-prime-insights/) |
| **Key Plays** | A bank of highlights that grows during the game and can be watched on demand | Side rail | [SVG 2023](https://www.sportsvideo.org/2023/08/24/thursday-night-football-deep-dive-amazon-prime-video-embraces-hdr-ai-and-next-gen-stats-in-year-two-of-exclusive-nfl-package/) |
| **Rapid Recap** | AI-compiled catch-up of 2 minutes or less, then drops the viewer into live play | Pre-roll | same; [TechCrunch](https://techcrunch.com/?p=2589889) |
| **X-Ray** | Live NGS stats (time to throw, yards after contact, separation). Flip the phone or press "up" on the remote. Also fan polls | Overlay or side panel | [SVG 2021](https://www.sportsvideo.org/2021/11/18/prime-video-adds-new-fan-polls-on-x-ray-for-thursday-night-football-coverage/); [Amazon 2019](https://press.aboutamazon.com/2019/9/amazon-prime-video-launches-new-features-for-thursday-night-football-allowing-nfl-fans-around-the-globe-to-customize-their-streaming-experience) |

- **The camera is part of the explanation.** Prime Vision uses the **High-Sky** (skycam) as its primary angle, the "Madden view" that shows all 22 players. Social mentions reportedly went from 4,921 over the first nine broadcasts to 315,046 over seven games after the switch ([AP/WSLS](https://www.wsls.com/tech/2025/01/10/prime-videos-use-of-ai-next-gen-stats-on-nfl-games-is-helping-viewers-understand-the-game-better/)). **Lesson:** overlays need a view where the whole shape is visible. For football, render on a top-down or tactical view, or a "broadcast-wide" synthetic camera.
- **2026 (fifth exclusive season, opened Sep 17 2026):** Prime Insights return on Prime Vision. Coverage ID, Defensive Alerts and Pressure Alert now also appear on the **main** broadcast, and there is a new **personalised bet tracker with FanDuel** ([Albany Herald, Sep 2026](https://albanyherald.com/sports/prime-video-kicks-off-fifth-season-of-thursday-night-football/); [Awful Announcing](https://awfulannouncing.com/amazon/prime-videos-thursday-night-football-broadcast-includes-a-personalized-bet-tracking-experience-with-fanduel.html)). Prime is also bringing TNF production in-house ([NewscastStudio, Jul 28 2026](https://www.newscaststudio.com/2026/07/28/prime-video-to-bring-thursday-night-football-production-in-house/)). *Uncertainty:* I could not open the 2026 press release, so I cannot list any brand-new 2026 insights.

### 1.3 ESPN alt-casts: one game, several audiences
- **ManningCast** (personality watch-along): fifth season in 2025 with 12 telecasts on ESPN2/ESPN+. It averaged about 800k viewers in 2024 ([NewscastStudio](https://www.newscaststudio.com/2025/09/03/manningcast-2025-season-debut/); [Awful Announcing](https://awfulannouncing.com/espn/manningcast-audience-numbers-million-peyton-eli.html)). One summary reports a 2026 opener of 1.5M (+86%) ([Front Office Sports](https://frontofficesports.com/article/monday-night-football-espn-viewership/)). *Unverified, page not readable.*
- **MNF Playbook with Next Gen Stats** (from Dec 22 2025; data-cast "aimed at avid fans"): built on a **22-man all-field camera**, with live run/pass probabilities, expected target distributions and blitz likelihoods from Adrenaline's **TruPlay AI** (370,000+ plays). ESPN says it "looks and feels more like an NFL meeting room than a standard telecast" ([ESPN Press Room](https://espnpressroom.com/us/press-releases/2025/12/espn-to-debut-mnf-playbook-with-next-gen-stats-dec-22-an-nfl-data-cast-aimed-at-avid-fans-complements-monday-night-football-and-espn-nfl-postseason-slate/); [SVG on Adrenaline, Mar 2026](https://www.sportsvideo.org/2026/03/10/svg-new-sponsor-spotlight-adrenalines-casey-huke-talks-data-driven-storytelling-and-espns-mnf-playbook-alcasts/)). **This is our "analyst mode".**
- **Funday Football (animated, rendered from tracking data). The most relevant precedent for us:**
  - *Toy Story Funday Football* (Oct 2023, Falcons–Jaguars) won **3 Sports Emmys** ([NFL.com](https://www.nfl.com/news/the-simpsons-funday-football-streams-live-dec-9-on-disney-espn-a-real-time-animated-monday-night-football-game-for-bengals-cowboys); [Northeastern](https://news.northeastern.edu/2023/10/03/espn-toy-story-football-game/)).
  - *The Simpsons Funday Football* (Dec 9 2024, Bengals–Cowboys): NGS RFID data was fused with **Hawk-Eye optical skeletal tracking (29 points per player, 12 cameras)**. Sony's **Beyond Sports** pipeline then "analyses, validates, enhances, translates to a 3D environment and streams in real time", rendered in **Unreal**, with data processed **about 50 times a second** ([PR Newswire](https://www.prnewswire.com/news-releases/sonys-beyond-sports-technology-powers-upcoming-espn-monday-night-football-alternate-presentationthe-simpsons-funday-football-302302935.html); [TechRadar](https://www.techradar.com/streaming/entertainment/its-a-lot-of-data-processed-around-50-times-per-second-sonys-beyond-sports-on-how-the-simpsons-funday-football-came-to-be); [Design News](https://www.designnews.com/industry/how-espn-engineered-live-players-on-the-simpsons-funday-football-broadcast); [SVG](https://www.sportsvideo.org/2024/12/09/the-simpsons-funday-football-inside-the-tech-that-espn-and-the-nfl-use-to-bring-springfield-to-life/)).
  - *Dunk the Halls* (Dec 2024) was the first animated NBA game, with Mickey and Minnie, and the first NBA game on Disney+ ([SVG](https://www.sportsvideo.org/2024/12/23/dunk-the-halls-espn-refine-animated-altcast-tech-and-ops-with-a-helping-hand-from-mickey-and-minnie/)). *Big City Greens Classic* did the same for the NHL in 2023.
  - *Monsters Funday Football* (Dec 8 2025, Eagles–Chargers) ran across ESPN2, Disney+, Disney Channel, Disney XD and NFL+. Better RFID-plus-optical fusion "removes many occlusion issues", especially in pile-ups. The broadcast added 30 minutes of new Pixar animation and 5,000 animated monsters in the crowd ([SVG, Oct 2025](https://www.sportsvideo.org/2025/10/27/espn-announces-monsters-funday-football-the-latest-real-time-animated-broadcast-to-air-alongside-monday-night-football-on-december-8/)). Beyond Sports and ESPN extended the deal to NFL, NHL, NBA and **WNBA** for 2025/26 ([Beyond Sports](https://www.beyondsports.nl/news/sonys-beyond-sports-and-espn-expand-collaboration-to-bring-additional-animated-telecasts-to-nfl-nhl-nba-and-wnba-fans-in-202526-season-starting-with-monsters-funday-football)).
  - **Football transfer:** we already have synthetic x/y data. A **"Kids/Retro mode" that re-renders the match** as a 2D top-down pixel-art or club-mascot view (Canvas/WebGL in the browser), with simplified captions, is cheap to build and shows "two genuinely different experiences" convincingly.
- **Kids casts [BK]:** Nickelodeon's slime-themed NFL Wild Card game (2021 onward) and the *Super Bowl LVIII* Nickelodeon alt-cast (Feb 2024) used AR slime cannons and kid-friendly explainers. Not re-verified here.

### 1.4 YouTube NFL Sunday Ticket and NFL+
- **Custom multiview** (any 2–4 games, now on mobile too), a **Key Plays** rail, and a **Scores & Stats** side panel with Teams/Scores/Stats/Key Plays/Fantasy tabs. **Fantasy-tailored key plays and multiviews** were announced. **"Watch With" creator streams** (iShowSpeed and Tom Grossi in English, Robegrill and SKabeche in Spanish) can be swapped into the main window ([YouTube Blog, 2025](https://blog.youtube/news-and-events/2025-nfl-season/); [Deadline, Aug 2025](https://deadline.com/2025/08/youtube-sets-2025-nfl-game-plan-sunday-ticket-watch-with-1236497766/); [9to5Google](https://9to5google.com/2024/08/20/youtube-tv-nfl-sunday-ticket-multiview/)).
- **NFL+ [BK]:** live local and primetime games on mobile; Premium adds condensed replays and All-22 film. Not re-verified.

---

## 2. NBA (and Microsoft's own sports-AI track record)

### 2.1 The NBA x Microsoft partnership
- Announced **Apr 16 2020**. Microsoft became the **Official AI Partner** and Official Cloud and Laptop Partner of the NBA, WNBA, G League and USA Basketball, and built a **direct-to-consumer platform on Azure** using ML for "next-generation, personalised game broadcasts" ([Microsoft News](https://news.microsoft.com/2020/04/16/nba-announces-new-multiyear-partnership-with-microsoft-to-redefine-and-personalize-the-fan-experience/)).
- **NBA CourtOptix (2021):** an AI system over player and ball spatial data, first used to drive data-plus-highlight posts on NBA social channels. The stack is Azure Data Lake, Azure ML, Azure Databricks, Airflow, MLflow, Delta Lake, Azure Functions, Cosmos DB, AKS and **Event Hubs** ([NBA.com](https://www.nba.com/news/nba-courtoptix); [Microsoft customer story](https://www.microsoft.com/en/customers/story/859765-nba-media-entertainment-azure); [GeekWire](https://www.geekwire.com/2021/nba-using-microsoft-cloud-ai-power-courtoptix-bring-enhanced-stats-fans/)). *I found no source tying CourtOptix to **Fabric** or **Azure OpenAI**. Treat that link as unconfirmed.*
- **NBA Insights (2024–25 NBA App):** powered by **Azure OpenAI**. A continuous **text feed** that "highlights the *why* behind key game moments" and connects in-game moments to player, team and league context. The NBA also uses GenAI to **localise recaps into French, Portuguese and Spanish** ([Microsoft customer story](https://www.microsoft.com/en/customers/story/19758-national-basketball-association-azure-open-ai-service); [Azure on X](https://x.com/Azure/status/1901347842725191965)). The same app release added **multiview (4 games)**, **smart rewind with key plays highlighted**, several recap lengths, synced stats and an AI **"Dunk Score"** that grades jump distance, style and force ([NBA PR](https://pr.nba.com/nba-app-launches-new-digital-features-highlighted-by-multiview-ahead-of-the-2024-25-season); [TV Tech](https://www.tvtechnology.com/news/nba-app-gets-an-upgrade-with-multiview-ai-powered-insights-and-other-new-features)).
- **Takeaway for judges:** the Microsoft-blessed pattern is **Azure OpenAI narrating structured data with context ("the why")**, combined with **GenAI localisation**. Build on that and say so.

### 2.2 Second Spectrum: the original "modes" idea
The **Clippers CourtVision** stream (2018–19) offered three AR modes. **Coach Mode** drew plays live. **Player Mode** floated real-time shooting percentages over each player. **Mascot Mode** added fan-friendly animations. There were also **frame-by-frame make probabilities** ([The Ringer](https://www.theringer.com/2018/10/19/nba/los-angeles-clippers-second-spectrum-courtvision-steve-ballmer); [GeekWire](https://www.geekwire.com/2018/future-sports-viewing-steve-ballmers-l-clippers-debut-new-augmented-reality-nba-experience/); [AWS M&E](https://aws.amazon.com/blogs/media/la-clippers-take-the-clippers-courtvision-viewing-experience-to-the-next-level-with-aws)). ESPN's *Full Court Press* carried it to a national audience ([Engadget](https://www.engadget.com/2019-03-01-second-spectrum-full-court-press-espn3-broadcast.html)). *I could not verify the specifics of "Dragon", Second Spectrum's later tracking platform, this session.* The **Coach, Player and Mascot** split is still the cleanest template for persona modes.

### 2.3 New NBA media deal (2025–26)
- **Prime Video NBA:** a Prime Vision alt-feed with an **above-the-rim camera**. Prime Insights include **mismatch detection**, catch-and-shoot 3P%, dribbles per shot, half-court pace, and an **"attention" or gravity stat** that measures how closely a player is guarded and the space that creates for teammates ([ppc.land](https://ppc.land/prime-video-launches-interactive-betting-and-ai-features-for-nba-coverage/); [Basketball Insiders](https://www.basketballinsiders.org/news/prime-video-unveils-betting-and-ai-features-for-nba-streaming/)).
- **Peacock:** *On the Bench*, a team-centric analyst alt-cast ([Solzy](https://solzyatthemovies.com/2025/10/23/how-amazon-prime-peacock-and-espn-are-competing-for-nba-viewers/)), and **Courtside Live / Rinkside Live**, which are selectable immersive feeds plus a vertical highlights hub ([NBC Sports Pressbox](https://www.nbcsports.com/pressbox/press-releases/peacock-adds-unprecedented-fan-first-features-rinkside-live-and-courtside-live-for-nbc-sports-coverage-of-the-milan-cortina-2026-olympic-winter-games-and-the-nba)).

### 2.4 "Inside the Game" branding check
- The only Microsoft use found is the hackathon itself: **"Inside the Game: Developer Hackathon"** on Microsoft Reactor (series S-1709), presented by Microsoft and the Premier League. Its workshops include "Build AI-powered soccer insights apps with **AKS and ACA**" ([Microsoft Reactor](https://developer.microsoft.com/en-us/reactor/series/S-1709/)).
- **Competitive intel:** public GitHub repos from other entrants already exist, e.g. *MatchLens AI* (specialised agents, evidence-citing recap) and *MatchMind* (timed on-screen graphics, every number traced to computed evidence) ([helenapedro/inside-the-game](https://github.com/helenapedro/inside-the-game); [kaanoguzkan/insidethegamehackathon](https://github.com/kaanoguzkan/insidethegamehackathon)). **"Evidence-traced numbers" is quickly becoming table stakes**, so we will need to stand out on presentation and personalisation.
- Unrelated name clashes: TNT's *Inside the NBA* is a different show. Microsoft published the *NBA Inside Drive* video games in the early 2000s ([Wikipedia](https://en.wikipedia.org/wiki/NBA_Inside_Drive_2004)).

---

## 3. Formula 1

- **F1 Insights powered by AWS** began in 2018 with 3 insights and has grown to about 20 ([AWS ML blog](https://aws.amazon.com/blogs/machine-learning/accelerating-innovation-how-serverless-machine-learning-on-aws-powers-f1-insights/); [About Amazon EU](https://www.aboutamazon.eu/news/aws/insights-powered-by-aws-help-to-improve-formula-1-viewing-experience)). Highlights:
  - **Battle Forecast:** predicts **how many laps** until the chasing car is within "striking distance", then shows an **"overtake difficulty" rating**. A forecast in natural units, followed by a categorical difficulty, is a model pattern worth copying.
  - **Pit Strategy Battle:** predicted gap after both cars pit, plus **% chance of overtake** (undercut and overcut).
  - **Car Analysis, Braking Performance, Exit Speed, Projected Knockout Time** ([dev.to summary](https://dev.to/aws-builders/how-formula-1-insights-are-powered-by-aws-3ndb); [About Amazon](https://www.aboutamazon.com/news/aws/f1-ai-insights-grand-prix)).
- **Track Pulse** (AWS) is a **storytelling tool for the production team**. It brings live battles, championship predictions, top speeds and fastest sectors into one place and "quickly creates the graphics that will pop up on screen". F1 reports a **47% increase in viewer understanding** ([AWS M&E blog](https://aws.amazon.com/blogs/media/f1-revs-up-race-day-broadcasts-with-real-time-data-storytelling/)).
- **StatBot** (AWS GenAI) mines historical race data so broadcasters can pull stats in moments. Partners have had access since 2025 ([BlackBook Motorsport](https://www.blackbookmotorsport.com/features/f1-aws-artificial-intelligence-pete-samara-neil-ralph-gen-ai/); [About Amazon UK](https://www.aboutamazon.co.uk/news/aws/f1-british-grand-prix-silverstone)).
- **Apple TV F1 (US, 2026):** up to **30 extra live feeds**, a **Driver Tracker** bird's-eye map, a **mixed onboard feed that switches automatically** between onboard cameras, **podium feeds that follow P1–P3**, **4-up multiview** with team presets, and a new **"immersive sidebar" data overlay** shown alongside the main feed ([SVG, Mar 2026](https://www.sportsvideo.org/2026/03/06/apple-tv-kicks-off-f1-era-in-u-s-with-driver-tracker-on-board-cameras-multiview-sky-sports-feed/)). One secondary source mentions **AI radio transcriptions** ([jonathansblog](https://jonathansblog.co.uk/formula-1-live-timing-car-stats); *low-confidence source*).
- **Football transfer:** a "Player-Focus mode" can borrow the **auto-switching onboard** idea: an auto-director that follows one chosen player. "Battle Forecast" maps onto "pressure building: a goal likely in the next 10 minutes?" and "duel forecasts".

---

## 4. Tennis and golf (IBM watsonx): the most mature "explain AI to fans" programme

| Event / year | Feature | What it is | Source |
|---|---|---|---|
| Wimbledon 2023 | **AI Commentary**, **AI Draw Analysis** | GenAI audio and captions on highlight clips. Draw "favourability" built from the **IBM Power Index** | [IBM 2023](https://newsroom.ibm.com/2023-06-21-IBM-Brings-Generative-AI-Commentary-and-AI-Draw-Analysis-to-the-Wimbledon-Digital-Experience) |
| Wimbledon 2024 | **Catch Me Up** | Pre- and post-match **player cards** written by Granite in Wimbledon's editorial style, using Sportradar data | [TechFinitive](https://www.techfinitive.com/wimbledon-catch-me-up/); [Computer Weekly](https://www.computerweekly.com/news/366589037/IBM-deploys-GenAI-to-power-new-Wimbledon-features) |
| Wimbledon 2025 | **Match Chat**, **Likelihood to Win** | Live Q&A agent (watsonx Orchestrate + Granite). Win projection that updates through the match | [IBM UK, Jun 2025](https://uk.newsroom.ibm.com/IBM-at-Wimbledon-2025) |
| US Open 2025 | **Match Chat** (all 254 singles matches), **Key Points**, **SlamTracker LTW**, **AI Commentary** | Suggested prompts or free text, including player **pronunciations**. **Three-bullet takeaways** | [IBM, Aug 2025](https://newsroom.ibm.com/2025-08-18-ibm-and-the-usta-roll-out-ai-powered-fan-experiences-for-2025-us-open) |
| Masters 2025 | **Hole Insights 2.0**, **AI Narration** | About **20,000 shot clips** with AI audio and captions in **English and Spanish**. Hole projections from 180,000+ historical shots | [PR Newswire](https://www.prnewswire.com/news-releases/ibm-tees-up-watsonx-ai-powered-digital-fan-features-for-the-2025-masters-tournament-302420438.html) |
| Masters 2026 (Mar 23) | **Vault Search**, **Enhanced Hole Insights**, **AI Predictive Modeling** | Conversational search over 50+ years of final rounds. Players ranked on **6 weighted attributes**. Agentic layer on watsonx Orchestrate | [IBM, Mar 2026](https://newsroom.ibm.com/2026-03-23-ibm-debuts-new-ai-enabled-digital-experiences-for-the-90th-masters-tournament) |
| Wimbledon 2026 (Jun 22) | **Key Moments**, upgraded **Match Chat** (answers include photos and video) | Explains **which plays shifted momentum and why**, e.g. long rallies and double faults. Archive of 15,000+ assets turned into a knowledge graph | [IBM, Jun 2026](https://newsroom.ibm.com/2026-06-22-wimbledon-and-ibm-introduce-new-ai-powered-fan-experiences-and-modernized-digital-platforms-for-the-championships-2026); [AI News](https://www.artificialintelligence-news.com/news/wimbledon-ibm-ai-tools-live-match-coverage/) |
| US Open 2026 (Aug 24) | **Live Updates Homepage** (prioritised by **favourite players**), **Serve Quality**, **Key Moments**, **Enhanced Match Chat** | Serve Quality uses limb tracking: **21 points at 50 fps**. Key Moments shows "not just who's winning, but why" | [IBM, Aug 2026](https://newsroom.ibm.com/2026-08-24-ibm-and-the-usta-introduce-new-ai-powered-fan-experiences-for-2026-us-open); [Fox Business](https://www.foxbusiness.com/sports/ibm-continuing-enhance-fan-experience-new-ai-powered-features-us-open-including-serve-quality) |

**What IBM teaches about explaining AI:**
1. **Probability first, explanation layered on top.** LTW came first; *Key Moments* explains the swings later.
2. **Suggested prompts** lower the barrier for casual fans, so they don't face a blank chat box.
3. **House editorial style**: models tuned to the event's tone keep AI copy on-brand. Football version: a "Premier League house style" system prompt.
4. **Short forms:** three-bullet *Key Points* and *Catch Me Up* cards.
5. **Multilingual narration** of every clip, not just the hero highlight.

---

## 5. Baseball, hockey, cricket, rugby

- **MLB Statcast and Gameday 3D:** Hawk-Eye cameras in every park feed **Gameday 3D**, which **re-creates every MLB game live in a 3D environment** ([MLB.com](https://www.mlb.com/news/mlb-gameday-3d-guide)). This is another "render the game from tracking data" precedent, used for low-bandwidth "watching" when there is no video. Statcast-powered strike zones and ball-flight trails are standard broadcast furniture. ESPN's **Home Run Derby: Statcast Edition** (Jul 2025) tracked homers with live drones and AR tracing ([SVG](https://www.sportsvideo.org/2025/07/14/live-from-mlb-all-star-2025-espns-home-run-derby-statcast-edition-to-track-the-homers-with-live-drone-ar-smart-tracing/)).
- **NHL EDGE / EDGE IQ (AWS):** **Face-off Probability** shows *before the puck drops* who is likely to win ([AWS ML blog](https://aws.amazon.com/blogs/machine-learning/face-off-probability-part-of-nhl-edge-iq-predicting-face-off-winners-in-real-time-during-televised-games/); [NHL.com](https://www.nhl.com/news/nhl-amazon-unveil-new-face-off-probability-stat-331301168)). At the 4 Nations Face-Off: **Projected Goal Rate** from 27 factors at sub-second latency, **Ice Tilt** (territorial momentum), and **Opportunity Analysis** ([AWS M&E](https://aws.amazon.com/blogs/media/nhl-4-nations-face-off-revolutionizing-hockey-analytics-with-aws)). There is also an "advanced stats for everybody" redesign of the EDGE site ([NHL.com](https://www.nhl.com/news/nhl-edge-site-new-look-has-advanced-statistics-for-everybody)). *Football transfer:* **"Ice Tilt" becomes a "Pitch Tilt" momentum bar**, and Face-off Probability becomes a set-piece or aerial-duel win probability shown before the delivery.
- **Cricket, JioStar/JioHotstar (IPL 2025–26):** **12 languages** (English, Hindi, Tamil, Telugu, Kannada, Punjabi, Bhojpuri, Haryanvi, Marathi, Bengali, Gujarati, Malayalam) plus **Indian Sign Language** and **audio-descriptive** feeds. Five camera choices (**Hero Cam**, Stump Cam, Batter Cam, Field View, multi-view). **MaxView** is a vertical, swipe-up-for-key-moments experience. **AI auto-generated full-match highlights** arrive within minutes, and there is a **dedicated Hindi watch-along digital feed** with ex-players. More than 20 feeds in total ([BestMediaInfo, 2026](https://bestmediainfo.com/mediainfo/mediainfo-digital/jiostar-sharpens-ipl-2026-digital-play-with-dedicated-hindi-feed-and-20-viewing-options-11403249); [Business Standard](https://www.business-standard.com/cricket/ipl/english-to-tamil-full-list-of-commentators-for-ipl-2025-s-13-feed-telecast-125032200432_1.html); [JioStar report](https://www.jiostar.com/news/from-stadiums-to-screens-jiostars-tata-ipl-2025-a-year-of-firsts-report-highlights-how-a-billion-viewers-came-together-to-celebrate-cricket/)).
- **CricViz WinViz:** a simulation-based **ball-by-ball win % "worm"** used by the ICC, Sky and Fox. It answers "Who's winning?" for casual followers and became ML-powered in Jun 2023 ([CricViz app listing](https://apps.apple.com/gb/app/cricviz/id1044644979); [Ellipse Data](https://ellipsedata.com/?p=642)).
- **Rugby, Six Nations with AWS:** the **Kick Predictor** gives a conversion or penalty success probability, *computed during the break in play*, from location, game time, home/away, score and kicker history. **Tackle success maps** show dominant tackles by location as a proxy for gain-line momentum ([ITPro](https://www.itpro.com/cloud/cloud-computing/354606/six-nations-broadcasts-to-get-aws-machine-learning-stats); [Computer Weekly](https://www.computerweekly.com/news/252477240/How-AWS-is-helping-boost-rugby-fans-engagement-in-the-Guinness-Six-Nations-championship)). *Timing lesson:* show the predictive graphic **in the dead-ball window** before the event.

---

## 6. Olympics

- **Peacock "Your Daily Olympic Recap" (Paris 2024):** fans opted in to **three favourite sports** and topics (behind-the-scenes, top competition, viral moments, international teams). They received a **~10-minute daily recap** narrated by an **AI re-creation of Al Michaels' voice** (trained on his NBC appearances, with his participation), which **greeted users by name**. Around **7 million variants** were possible, drawn from 5,000 hours of coverage ([Comcast](https://corporate.comcast.com/press/releases/peacock-personalized-olympic-recaps-voice-al-michaels-generated-with-ai); [TV Tech](https://tvtechnology.com/news/peacock-to-use-ai-generated-al-michaels-for-recaps-of-olympic-games-highlights)). *For Milano Cortina 2026, Peacock's announcements stress* **Rinkside Live**, **Discovery Multiview (4-up)**, **vertical "Can't Miss Highlights"**, **Prediction Games** and **Gold Zone**. I found no evidence the AI-Michaels recap returned ([Peacock blog](https://www.peacocktv.com/blog/peacock-new-features-for-watching-2026-winter-olympics); [TheWrap](https://www.thewrap.com/industry-news/business/peacock-platform-updates-2026-winter-olympics/)).
- **OBS Paris 2024:** **Automatic Highlights Generation** (Intel Geti) packaged tailored highlights for 30+ sports, and 15 national broadcasters used the clips. **AI athlete-position tracking** ran for open-course sports, and **stroboscopic analysis** for diving, athletics and gymnastics ([Intel Newsroom](https://newsroom.intel.com/artificial-intelligence/intel-at-the-olympic-games-paris-2024); [heise](https://heise.de/en/news/8K-video-streams-and-live-athlete-tracking-AI-at-the-Paris-Olympics-9822948.html)).
- **OBS Milano Cortina 2026:** AI-segmented **360° replays in about 15–20 seconds**. **"Spacetime Slices"** merge multiple moments of an athlete's movement into one image. An **automatic media-description system** tags and summarises clips so they can be found with natural-language search ([SVG Europe](https://www.svgeurope.org/blog/headlines/milano-cortina-2026-obs-makes-significant-breakthrough-with-ai-for-capture-and-replays-at-winter-games/); [CGTN](https://news.cgtn.com/news/2026-02-08/AI-replays-cloud-broadcast-to-shape-how-we-watch-Milano-Cortina-2026-1KAIGs9jwas/p.html)). *Football transfer:* "Spacetime Slices" become a **"ghost trail"** of a player's run drawn from synthetic tracking.

---

## 7. Esports: the closest architectural analogue

Esports broadcasts are **built entirely from a data feed rather than from cameras**, which is exactly our situation with synthetic events.
- **Riot x AWS "Win Probability"** (MSI 2023, then LoL Worlds 2023) uses SageMaker on in-game data. It is framed as showing "**how teams have fared when in similar competitive scenarios**", a reference-class explanation. Riot built a self-serve ML workflow that ships new broadcast stats in about **6 weeks**, and **Global Power Rankings** came next ([SVG](https://www.sportsvideo.org/2023/10/16/riot-games-aws-bring-win-probability-model-to-esports-broadcasts/); [AWS Games blog](https://aws.amazon.com/blogs/gametech/how-aws-powered-global-power-rankings-for-lol-esports-worlds-2024/)).
- **The data → HUD pipeline.** **GRID** provides official live data over **REST and WebSocket** for LoL, VALORANT, CS2, Dota 2 and R6, plus **GRID Insights** AI predictions on air ([GRID](https://grid.gg/products/live-data/); [Ministry of Sport](https://ministryofsport.com/grid-esports-launches-ai-predictive-analytics-product-for-esports-broadcasts/)). **LHM.gg** and the open-source **hud-manager** render **HTML/web HUDs** (scorebars, player panels, stat pop-ups) from that feed, with "AI observers" ([LHM overlays](https://lhm.gg/overlays); [GitHub hud-manager](https://github.com/lexogrine/hud-manager); [LHM blog: what makes a good LoL overlay](https://lhm.gg/blog/what-makes-a-good-lol-broadcast-overlay)).
- **Football transfer:** copy the architecture literally. Synthetic event stream → enrichment and ML → **overlay-event bus (WebSocket)** → **HTML/CSS overlay layer** composited over the video, using the same component library for every persona mode.

---

## 8. Streaming platforms: personalisation conventions

- **Apple TV / MLS:** auto-generated **Key Plays** with **Catch Up** when joining late. Broadcasts in **English, Spanish and French** (French for Canadian clubs), plus a **home radio-call audio option**. From 2026 all MLS matches are included in the Apple TV subscription ([Digital Trends](https://www.digitaltrends.com/home-theater/mls-season-pass-catch-up-feature/); [Apple Support](https://support.apple.com/en-us/111113); [Variety](https://variety.com/2025/tv/news/apple-tv-major-league-soccer-no-extra-cost-worldwide-paywall-1236581405/)). One fan site claims an xG, pressing-intensity and pass-network overlay ([themlspulse](https://themlspulse.com/mls-season-pass)), but **I could not confirm this from Apple**. Treat it as doubtful.
- **Peacock:** multiview, **Gold Zone** whip-around, vertical highlights, **Live Actions** (add an upcoming event without leaving the stream), prediction games (see §6).
- **YouTube:** multiview, Key Plays, fantasy-personalised plays, **creator watch-alongs** (see §1.4).
- **Prime Video:** X-Ray, Key Plays, Rapid Recap, Prime Vision, betting tracker (see §1.2).
- **DAZN, Netflix live sport:** *not researched (search budget exhausted).* [BK] DAZN has added multiview, in-app "FanZone"-style social and betting features, and AI-assisted highlight clipping. Netflix has added live NFL Christmas games and live events, but has been conservative with interactive overlays. Verify before citing.

---

## 9. Accessibility and inclusive personalisation

Verified this session:
- **JioHotstar** ships **Indian Sign Language** and **audio-description** feeds as standard IPL options, alongside 12 languages ([BestMediaInfo](https://bestmediainfo.com/mediainfo/mediainfo-digital/jiostar-sharpens-ipl-2026-digital-play-with-dedicated-hindi-feed-and-20-viewing-options-11403249)).
- **AI narration and localisation at scale:** NBA GenAI recaps in FR/PT/ES ([Microsoft](https://www.microsoft.com/en/customers/story/19758-national-basketball-association-azure-open-ai-service)). Masters AI Narration in EN/ES ([PR Newswire](https://www.prnewswire.com/news-releases/ibm-tees-up-watsonx-ai-powered-digital-fan-features-for-the-2025-masters-tournament-302420438.html)). US Open AI Commentary with **subtitles** ([IBM](https://newsroom.ibm.com/2025-08-18-ibm-and-the-usta-roll-out-ai-powered-fan-experiences-for-2025-us-open)).
- **Pronunciation help** in IBM Match Chat (same source). This is small but inclusive.
- **Kids modes:** Funday Football and Dunk the Halls (§1.3).

Background knowledge, **not verified this session [BK]**:
- **Field of Vision** (Irish start-up) built a **tactile tablet** that uses computer vision to follow the ball and vibrate under a blind fan's fingers, and trialled it at football and rugby venues.
- **Stadium audio-descriptive commentary** for blind and partially sighted fans is standard at Premier League grounds, and broadcasters such as the BBC have trialled audio-described sport.
- **Sign-language avatars:** NHK (Japan) built automatic CG sign-language for sports results. Qatar's Mada centre showcased Arabic sign-language avatar work around the 2022 World Cup. Swiss public media (SWISS TXT/SRG) have piloted sign-language avatars. *I could not identify "Ludo" commentary. Please confirm the name.*
- **AI dubbing and voice:** several football leagues and broadcasters (LaLiga and Bundesliga partners, among others) have piloted AI voice translation of highlights and commentary, and ElevenLabs is the most-cited vendor. Verify specific deals before citing.
- **Low-bandwidth, text-first:** BBC Sport live text commentary and the PL app's live-text timeline are the incumbent "text-first" football experience. An **SSE text stream plus a tiny SVG mini-pitch** is a credible "data-saver mode".
- **Betting-free modes:** Prime's 2026 FanDuel tracker shows the opposite trend toward betting integration. A **"no odds, no betting" toggle** (and a default-off for under-18 or "Family" mode) is an easy responsible-design win.

---

## 10. Football-specific precedents the judges will know [BK, verify]

- **Premier League x Microsoft (announced around July 2025):** a multi-year partnership that made Microsoft the PL's cloud and AI partner, including a Copilot-powered **"Premier League Companion"** in the PL app and fantasy-player tooling. *Verify wording and date. This is directly relevant context for the pitch.*
- **LaLiga x Microsoft "Beyond Stats":** Azure-powered advanced metrics (expected goals, pass difficulty, pressure and so on) shown on LaLiga broadcasts and in its apps. This is Microsoft's football precedent.
- **Bundesliga Match Facts powered by AWS:** xGoals, Shot Speed, Most Pressed Player, Average Positions, Pressure Handling, Skeleton/"Win Probability" and others, shown on air with short explanatory names. This is the best existing catalogue of **football** ML overlays to benchmark against.
- **Genius Sports / Second Spectrum** are the PL's tracking and data partners from 2025. Their **semi-automated offside** graphics show how the PL already renders tracking-derived 3D graphics.

---

## 11. Synthesis A: Top 15 transferable concepts for a PL entry

Each line gives the source idea and how we would build it with synthetic data and Azure. Suggested Azure building blocks: **Event Hubs** (event ingest), **Azure Functions / Container Apps / AKS** (enrichment and agents; the hackathon workshops use AKS and ACA), **Azure OpenAI in Azure AI Foundry** (narration, chat, persona rewriting), **Azure AI Speech** (neural TTS; prebuilt voices, **never** a cloned real commentator), **Azure AI Translator**, **Azure Web PubSub or SignalR** (pushing overlay events), **Cosmos DB** (state and user prefs), **Azure AI Search** (RAG over match and season facts), **Fabric Real-Time Intelligence** (optional KQL analytics), **Azure AI Content Safety** (guarding generated text).

| # | Concept (source) | How we'd do it with synthetic data + Azure |
|---|---|---|
| 1 | **Predict → reveal "Danger Alert"** (Prime *Defensive Alerts*) | A classifier on synthetic tracking frames scores "player likely to make a run in behind" or "press trigger imminent". Push a ring-under-player overlay event, then show a "✓ called it" or "✗" resolution card 5 s later |
| 2 | **Live win-probability worm + Key Moments "why"** (WinViz, IBM LTW and *Key Moments*) | A Markov or logistic model over score, time, xG and red cards gives a WP time-series. When ΔWP exceeds a threshold, GPT writes a one-sentence "why" citing the triggering events (IDs attached for evidence) |
| 3 | **Persona modes on one data spine** (Second Spectrum Coach/Player/Mascot; ESPN alt-casts) | One enriched event bus, with persona-specific templates and prompts: *Analyst* (numbers, xT, PPDA, shape), *Casual* (words, emojis, analogies), *Kids/Funday* (2D cartoon re-render). Same overlay components, different density settings |
| 4 | **Data-cast tactical camera** (Prime High-Sky; MNF Playbook all-22) | A top-down synthetic "All-22" pitch canvas, rendered from x/y in WebGL or Canvas next to or over the video. Analyst mode makes it primary; casual mode keeps it as a mini-map |
| 5 | **Animated re-render in a new style** (Funday Football; MLB Gameday 3D) | The same synthetic tracking drives a stylised 2D or low-poly 3D renderer (pixel-art, club-crest avatars). Ship it as "Matchday Toon" mode |
| 6 | **Rapid Recap / Catch Me Up** (Prime; Apple MLS; IBM) | On join, an agent ranks missed events by ΔWP and xG, picks the top N, and generates a 30–90 s scripted recap with TTS plus synchronised clip or overlay cues, then drops the viewer back into live |
| 7 | **Personalised daily recap** (Peacock AI Michaels) | Inputs are favourite club and player, language and "one metric I care about". GPT writes the script, Azure Speech voices it in a prebuilt neural voice, the timeline is assembled from event IDs. Greet the user by name |
| 8 | **Grounded Match Chat with suggested prompts** (IBM *Match Chat*) | Azure OpenAI with function-calling over a match-state API and AI Search. Chips like "Why did they change shape?" and "Compare Saka vs last 5". Every answer cites event IDs |
| 9 | **Pressure / Pocket Health gauge** (Prime *Pocket Health*, *Pressure Alert*) | A "Build-up Health" or "Press Intensity" gauge computed from defender distances to the ball carrier and passing lanes in synthetic frames. It fills red as pressure builds |
| 10 | **Open-teammate orb** (Prime *Prime Targets*) | A pass-option model scores each teammate (xT gain × completion probability). Analyst mode puts a green orb on the best option; Coach mode adds "should've played it" counterfactual cards |
| 11 | **Shape / Coverage ID** (Prime *Coverage ID*) | Cluster synthetic positions to label the defensive block (4-4-2 mid-block, high press, back five) and show it as a label at restarts. Casual copy reads "They're sitting deep and daring X to break them down" |
| 12 | **Set-piece predictor in the dead-ball window** (Six Nations *Kick Predictor*; NHL *Face-off Probability*) | A penalty or free-kick conversion and aerial-duel win probability, displayed only during stoppages. That respects the timing convention and avoids clutter in open play |
| 13 | **Battle Forecast / momentum tilt** (F1 *Battle Forecast*; NHL *Ice Tilt*) | A "Pitch Tilt" bar (territory and xT share over a rolling 5 minutes) plus a "goal threat building" forecast in natural units ("about 1 big chance expected in the next 10 minutes") with a categorical label |
| 14 | **Producer console** (F1 *Track Pulse*, *StatBot*) | An operator view listing ranked candidate graphics (story score, freshness, evidence) with one-click "take to air". It shows the system is broadcast-workflow-ready, which matters to PL judges |
| 15 | **Accessible and multilingual feeds** (JioHotstar ISL/AD; NBA localisation; Masters narration) | Per-viewer language through Translator plus Speech. An **audio-description mode** (spoken spatial play-by-play: "ball on the left touchline, 30 yards out"), a **text-first data-saver mode**, a **betting-free toggle** and **colour-blind-safe palettes** |

Honourable mentions: **Player-Focus auto-director** (F1 mixed onboard: follow one player's events and heat), **creator or personality "Watch With" style** (YouTube; ManningCast) done as an LLM persona voice, **3-bullet Key Points** (US Open), and **"Spacetime Slices" ghost trails** of a run (OBS 2026).

---

## 12. Synthesis B: Explaining ML outputs to casual fans

| Pattern | Example in the wild | How to apply |
|---|---|---|
| **Anchor on the pitch, not in a table** | Red circle (Defensive Alerts); green orb (Prime Targets); Player Mode % over heads | Put AR rings, arrows or zones under players. Casual mode shows no numbers at all |
| **Prediction then visible resolution** | Defensive Alerts before the snap; Peacock Prediction Games | Show "called it" or "missed" after each prediction, and a running **model scorecard** ("7/9 alerts correct today") to build trust |
| **Difficulty framing** | NFL CP: "a 23% throw" | "Only 1 in 12 of these goes in" for low-xG goals; "a 1-in-4 pass" for a through-ball |
| **Frequency / reference-class wording** | Riot WP: "how teams fared in similar scenarios" | "Teams 1–0 up at 70' with a man down win about 55% of the time" |
| **Probability plus the delta, with a cause** | IBM Key Moments; WinViz worm | "Arsenal win chance 62% → 41% ▼ after the red card (Rice, 58')". Always name the triggering event |
| **Named drivers ("why" tooltip)** | NGS CP's 10 inputs; Six Nations Kick Predictor factors | Show the top 3 contributing factors as chips: "distance 24 m ↓", "2 defenders in lane ↓", "weak foot ↓" (SHAP-style in analyst mode, plain words in casual mode) |
| **Categorical labels over decimals** | F1 "overtake difficulty"; Coverage ID "Man/Zone" | Likely / Toss-up / Long shot. Round to 5% and never show 63.27% |
| **Forecast in natural units** | F1 Battle Forecast "laps until striking distance" | "Expect a chance within about 8 minutes", "Legs: 85% of sprint capacity left" |
| **Counterfactual / "should have"** | Prime *Defensive Vulnerability* ("where the offence should attack") | "Square ball to Palmer = 0.31 xG vs 0.07 taken." Analyst mode only, and phrased respectfully |
| **Analogy and persona** | Funday Football characters; Mascot Mode | Kids mode: "That pass was like threading a needle!" One analogy per event at most |
| **Short-form summaries** | US Open *Key Points* (3 bullets); *Catch Me Up* cards | A 3-bullet half-time summary; a player card before a substitution |
| **Ask-why chat with suggested prompts** | IBM Match Chat | Chips under each overlay: "Why?", "Compare", "Explain like I'm new" |
| **Honest uncertainty** | (implicit everywhere: "projected", "likelihood") | Use "projected" or "model estimate" labels and a confidence chip (●●○). **Suppress** alerts below a calibration threshold, and show nothing rather than noise |
| **Evidence and provenance** | Competitor repos emphasise traced numbers | Every generated sentence carries the event IDs it used. In analyst mode, tapping a number opens the computation |

---

## 13. Synthesis C: Broadcast overlay design patterns and conventions

### 13.1 The overlay vocabulary
| Element | Use | Seen in |
|---|---|---|
| **Score bug** (persistent) | Score, clock, team codes, red cards. A small **WP or "metric I care about" slot** could be added | All football broadcasts (PL places it top-left [BK]) |
| **Lower third** | Player ID, stat card, quote, "Key Moment" caption. Enters and exits with animation | Universal |
| **Insight pop-up / card** | One model insight plus a "why" line. Corner placement, auto-dismiss | Prime Insights, NBA Insights (text feed) |
| **Ticker / crawl** | Other scores, fantasy points, translated captions | YouTube Scores & Stats panel |
| **Side rail / sidebar** | Key Plays list, live stats, chat. **Squeezes the video rather than covering it** | Apple F1 "immersive sidebar"; YouTube side panel; X-Ray |
| **Telestration** | Freeze-frame arrows, passing lanes, shape lines | Coach Mode; analyst studios |
| **AR player tags / rings** | Ground-plane rings, name pins, orbs, zones | Defensive Alerts, Prime Targets, Second Spectrum |
| **Radar / mini-map** | Top-down dots of all 22 players plus the ball | F1 Driver Tracker, esports minimaps, MLB Gameday 3D |
| **Worm / momentum bar** | WP over time, Pitch Tilt | WinViz, NHL Ice Tilt |
| **Gauge** | Pressure or "health" meters | Prime Pocket Health |
| **Full data-cast layout** | Tactical cam primary, video in PiP | MNF Playbook, Prime Vision |
| **Vertical / mobile** | Swipe for key moments and angles | JioHotstar MaxView, Peacock Can't Miss Highlights |
| **Multiview / PiP swap** | Persona commentary or alternate feed in PiP, swappable | YouTube "Watch With", multiview |

### 13.2 Timing and sync conventions (practical rules)
- **Use the dead-ball window for predictive graphics** (Kick Predictor is computed "during a break in play"; Face-off Probability shows before the drop). In open play, use only **minimal on-pitch markers** (rings) and no text panels.
- **Event-triggered with dwell and cooldown [BK conventions]:** lower thirds hold about 4–8 s, insight cards about 6–10 s, and there is a per-persona cooldown so that **no more than one text card is on screen at a time**. Casual mode allows fewer than about 1 card per 2 minutes of open play; analyst mode can be denser. Size text to a reading speed of about 160–180 words per minute (subtitle norms).
- **Priority queue:** goal > red card > penalty > big WP swing > user's favourite player > generic stat. Persona and preferences re-weight the queue.
- **Sync on match clock and frame timestamps, not wall clock.** Overlay events carry `t_start`/`t_end` in match time (plus video PTS), so the same overlay stream can be replayed against VOD or a delayed feed. Esports HUDs work this way: game-state feed → HTML overlay.
- **Latency budget:** Funday Football processes at about 50 Hz and NHL PGR runs at sub-second latency. For our demo, target **< 1 s from event to overlay** for markers and **< 3 s** for LLM text. **Pre-generate** likely narration variants while play is live, or use templates for the first beat and LLM elaboration second.

### 13.3 Safe areas and visual hygiene [BK, verify against EBU R 95 / SMPTE ST 2046-1]
- 16:9 HD: **action-safe ≈ 93%** of width and height (3.5% margins) and **graphics/title-safe ≈ 90%** (5% margins). Keep the score bug and text inside graphics-safe. For mobile vertical crops, keep critical elements in the centre 9:16 column or re-flow them to a vertical layout.
- Don't cover the **ball or the attacking third**. Place cards opposite the play side (overlays can know the ball position from tracking, which is an advantage of synthetic data).
- **Colour-blind safety:** Prime's red-circle and green-orb pairing would fail for red-green colour-blind viewers on its own. Pair colour with **shape and icon** (ring vs diamond) and offer a CVD palette. Avoid clashes with team kit colours by using neutral overlay hues and putting team colour only on edges.
- **Legibility:** large sans-serif, high contrast, a semi-opaque backplate, and no more than about 2 lines in a lower third.

### 13.4 A minimal overlay-event contract (recommendation)
```json
{
  "id": "ov_000123", "type": "insight_card | ring | worm | lower_third | minimap",
  "match_time": "67:12.4", "t_start_ms": 4032400, "dwell_ms": 7000, "priority": 70,
  "anchor": {"space": "pitch", "x": 82.1, "y": 34.0, "player_id": "P_19"},
  "variants": {
    "analyst": {"title": "xG 0.07 → alt 0.31", "body": "Square ball to #10 was on (2 v 1)"},
    "casual":  {"title": "So close!", "body": "A pass across was the easier chance"},
    "kids":    {"title": "Ooh!", "body": "A teammate was wide open!"}
  },
  "lang": "en-GB", "evidence": ["ev_8812", "ev_8813", "trk_4032000"], "confidence": 0.78
}
```
One stream, persona variants generated ahead of time, and a client that renders by preference. This makes "two genuinely different experiences from the same intelligence" easy to demonstrate side by side.

---

## 14. Demo suggestion: show it twice, side by side

Play the same 90 seconds of synthetic match in a split screen:
- **Left, "Analyst":** All-22 tactical cam primary, pressure gauge, open-option orbs, WP worm with SHAP chips, counterfactual card, model scorecard.
- **Right, "Casual / Kids / Spanish":** broadcast-style view with one ring before a dangerous run, a single plain-language "why" sentence when WP swings, a Spanish TTS line, and a toggle into the "Matchday Toon" re-render.
Then trigger a **Rapid Recap** for a "late joiner" and a **Match Chat** question with an evidence-linked answer.

---

## 15. Gaps and follow-ups (not done because of tool limits)
- Full-page verification of the 2026 Prime Video TNF press release (any brand-new 2026 insights).
- DAZN and Netflix 2025–26 feature specifics; Bundesliga Match Facts list; LaLiga Beyond Stats; **the Premier League x Microsoft 2025 partnership wording** (high priority for the pitch).
- Accessibility specifics: Field of Vision trials, the "Ludo" reference, sign-language avatars in sport, ElevenLabs and other football dubbing deals.
- Second Spectrum "Dragon" specifics; any CourtOptix ↔ Fabric / Azure OpenAI linkage.
- EBU R 95 safe-area figures (quoted here from memory).

---

## Sources (retrieved via search this session; page contents seen as search summaries)

**NFL / Amazon / ESPN / YouTube**
- https://www.aboutamazon.com/news/entertainment/thursday-night-football-amazon-prime-video-ai-features
- https://www.aboutamazon.com/news/aws/prime-video-thursday-night-football-next-gen-stats-ai-features
- https://deadline.com/2025/09/amazon-leans-into-data-thursday-night-football-nfl-season-1236528004/
- https://awfulannouncing.com/amazon/thursday-night-football-prime-vision-new-features.html
- https://awfulannouncing.com/amazon/prime-videos-thursday-night-football-broadcast-includes-a-personalized-bet-tracking-experience-with-fanduel.html
- https://www.sportsvideo.org/2024/09/10/nfl-kickoff-2024-tnf-on-prime-video-continues-to-push-the-ai-envelope-with-new-set-of-prime-insights/
- https://www.sportsvideo.org/2023/08/24/thursday-night-football-deep-dive-amazon-prime-video-embraces-hdr-ai-and-next-gen-stats-in-year-two-of-exclusive-nfl-package/
- https://www.sportsvideo.org/2026/09/17/prime-video-embarks-on-fifth-exclusive-season-of-ithursday-night-football-i-with-innovation-experience-in-tow/
- https://albanyherald.com/sports/prime-video-kicks-off-fifth-season-of-thursday-night-football/
- https://www.newscaststudio.com/2026/07/28/prime-video-to-bring-thursday-night-football-production-in-house/
- https://www.wsls.com/tech/2025/01/10/prime-videos-use-of-ai-next-gen-stats-on-nfl-games-is-helping-viewers-understand-the-game-better/
- https://www.rotowire.com/article/thursday-night-football-on-prime-a-review-of-the-new-aws-powered-features-74898
- https://boardroom.tv/amazon-thursday-night-football-tech/
- https://techcrunch.com/?p=2589889
- https://www.sportsvideo.org/2021/11/18/prime-video-adds-new-fan-polls-on-x-ray-for-thursday-night-football-coverage/
- https://press.aboutamazon.com/2019/9/amazon-prime-video-launches-new-features-for-thursday-night-football-allowing-nfl-fans-around-the-globe-to-customize-their-streaming-experience
- https://amp.nfl.com/videos/next-gen-stats-completion-probability-explained
- https://amazon.science/latest-news/how-aws-scientists-help-create-the-nfls-next-gen-stats
- https://mobile-www.nfl.com/news/next-gen-stats-new-advanced-metrics-you-need-to-know-for-the-2025-nfl-season
- https://www.4for4.com/2026/preseason/understanding-nfl-next-gen-stats-2026
- https://www2.computerworld.co.nz/article/print/650342/how-nfl-predicting-pass-completion-using-aws-sagemaker/
- https://espnpressroom.com/us/press-releases/2025/12/espn-to-debut-mnf-playbook-with-next-gen-stats-dec-22-an-nfl-data-cast-aimed-at-avid-fans-complements-monday-night-football-and-espn-nfl-postseason-slate/
- https://www.sportsvideo.org/2026/03/10/svg-new-sponsor-spotlight-adrenalines-casey-huke-talks-data-driven-storytelling-and-espns-mnf-playbook-alcasts/
- https://www.newscaststudio.com/2025/09/03/manningcast-2025-season-debut/
- https://awfulannouncing.com/espn/manningcast-audience-numbers-million-peyton-eli.html
- https://frontofficesports.com/article/monday-night-football-espn-viewership/
- https://www.prnewswire.com/news-releases/sonys-beyond-sports-technology-powers-upcoming-espn-monday-night-football-alternate-presentationthe-simpsons-funday-football-302302935.html
- https://www.techradar.com/streaming/entertainment/its-a-lot-of-data-processed-around-50-times-per-second-sonys-beyond-sports-on-how-the-simpsons-funday-football-came-to-be
- https://www.designnews.com/industry/how-espn-engineered-live-players-on-the-simpsons-funday-football-broadcast
- https://www.sportsvideo.org/2024/12/09/the-simpsons-funday-football-inside-the-tech-that-espn-and-the-nfl-use-to-bring-springfield-to-life/
- https://www.nfl.com/news/the-simpsons-funday-football-streams-live-dec-9-on-disney-espn-a-real-time-animated-monday-night-football-game-for-bengals-cowboys
- https://news.northeastern.edu/2023/10/03/espn-toy-story-football-game/
- https://www.sportsvideo.org/2024/12/23/dunk-the-halls-espn-refine-animated-altcast-tech-and-ops-with-a-helping-hand-from-mickey-and-minnie/
- https://www.sportsvideo.org/2025/10/27/espn-announces-monsters-funday-football-the-latest-real-time-animated-broadcast-to-air-alongside-monday-night-football-on-december-8/
- https://www.sportsvideo.org/2025/12/08/monsters-funday-football-espns-latest-live-animation-effort-advances-the-altcast-art-form-again/
- https://www.beyondsports.nl/news/sonys-beyond-sports-and-espn-expand-collaboration-to-bring-additional-animated-telecasts-to-nfl-nhl-nba-and-wnba-fans-in-202526-season-starting-with-monsters-funday-football
- https://blog.youtube/news-and-events/2025-nfl-season/
- https://deadline.com/2025/08/youtube-sets-2025-nfl-game-plan-sunday-ticket-watch-with-1236497766/
- https://9to5google.com/2024/08/20/youtube-tv-nfl-sunday-ticket-multiview/

**NBA / Microsoft**
- https://news.microsoft.com/2020/04/16/nba-announces-new-multiyear-partnership-with-microsoft-to-redefine-and-personalize-the-fan-experience/
- https://www.nba.com/news/nba-courtoptix
- https://www.microsoft.com/en/customers/story/859765-nba-media-entertainment-azure
- https://www.geekwire.com/2021/nba-using-microsoft-cloud-ai-power-courtoptix-bring-enhanced-stats-fans/
- https://www.microsoft.com/en/customers/story/19758-national-basketball-association-azure-open-ai-service
- https://x.com/Azure/status/1901347842725191965
- https://pr.nba.com/nba-app-launches-new-digital-features-highlighted-by-multiview-ahead-of-the-2024-25-season
- https://www.tvtechnology.com/news/nba-app-gets-an-upgrade-with-multiview-ai-powered-insights-and-other-new-features
- https://www.theringer.com/2018/10/19/nba/los-angeles-clippers-second-spectrum-courtvision-steve-ballmer
- https://www.geekwire.com/2018/future-sports-viewing-steve-ballmers-l-clippers-debut-new-augmented-reality-nba-experience/
- https://aws.amazon.com/blogs/media/la-clippers-take-the-clippers-courtvision-viewing-experience-to-the-next-level-with-aws
- https://www.engadget.com/2019-03-01-second-spectrum-full-court-press-espn3-broadcast.html
- https://ppc.land/prime-video-launches-interactive-betting-and-ai-features-for-nba-coverage/
- https://www.basketballinsiders.org/news/prime-video-unveils-betting-and-ai-features-for-nba-streaming/
- https://solzyatthemovies.com/2025/10/23/how-amazon-prime-peacock-and-espn-are-competing-for-nba-viewers/
- https://developer.microsoft.com/en-us/reactor/series/S-1709/
- https://github.com/helenapedro/inside-the-game
- https://github.com/kaanoguzkan/insidethegamehackathon
- https://en.wikipedia.org/wiki/NBA_Inside_Drive_2004

**F1**
- https://aws.amazon.com/blogs/machine-learning/accelerating-innovation-how-serverless-machine-learning-on-aws-powers-f1-insights/
- https://www.aboutamazon.eu/news/aws/insights-powered-by-aws-help-to-improve-formula-1-viewing-experience
- https://www.aboutamazon.com/news/aws/f1-ai-insights-grand-prix
- https://dev.to/aws-builders/how-formula-1-insights-are-powered-by-aws-3ndb
- https://aws.amazon.com/blogs/media/f1-revs-up-race-day-broadcasts-with-real-time-data-storytelling/
- https://www.blackbookmotorsport.com/features/f1-aws-artificial-intelligence-pete-samara-neil-ralph-gen-ai/
- https://www.aboutamazon.co.uk/news/aws/f1-british-grand-prix-silverstone
- https://www.sportsvideo.org/2026/03/06/apple-tv-kicks-off-f1-era-in-u-s-with-driver-tracker-on-board-cameras-multiview-sky-sports-feed/
- https://jonathansblog.co.uk/formula-1-live-timing-car-stats

**Tennis / Golf (IBM)**
- https://newsroom.ibm.com/2023-06-21-IBM-Brings-Generative-AI-Commentary-and-AI-Draw-Analysis-to-the-Wimbledon-Digital-Experience
- https://www.techfinitive.com/wimbledon-catch-me-up/
- https://www.computerweekly.com/news/366589037/IBM-deploys-GenAI-to-power-new-Wimbledon-features
- https://uk.newsroom.ibm.com/IBM-at-Wimbledon-2025
- https://newsroom.ibm.com/2025-08-18-ibm-and-the-usta-roll-out-ai-powered-fan-experiences-for-2025-us-open
- https://www.prnewswire.com/news-releases/ibm-tees-up-watsonx-ai-powered-digital-fan-features-for-the-2025-masters-tournament-302420438.html
- https://newsroom.ibm.com/2026-03-23-ibm-debuts-new-ai-enabled-digital-experiences-for-the-90th-masters-tournament
- https://newsroom.ibm.com/2026-06-22-wimbledon-and-ibm-introduce-new-ai-powered-fan-experiences-and-modernized-digital-platforms-for-the-championships-2026
- https://www.artificialintelligence-news.com/news/wimbledon-ibm-ai-tools-live-match-coverage/
- https://www.forbes.com/sites/timnewcomb/2026/06/29/wimbledon-goes-high-tech-with-fan-focused-digital-experience/
- https://newsroom.ibm.com/2026-08-24-ibm-and-the-usta-introduce-new-ai-powered-fan-experiences-for-2026-us-open
- https://www.foxbusiness.com/sports/ibm-continuing-enhance-fan-experience-new-ai-powered-features-us-open-including-serve-quality

**MLB / NHL / Cricket / Rugby**
- https://www.mlb.com/news/mlb-gameday-3d-guide
- https://www.sportsvideo.org/2025/07/14/live-from-mlb-all-star-2025-espns-home-run-derby-statcast-edition-to-track-the-homers-with-live-drone-ar-smart-tracing/
- https://aws.amazon.com/blogs/machine-learning/face-off-probability-part-of-nhl-edge-iq-predicting-face-off-winners-in-real-time-during-televised-games/
- https://www.nhl.com/news/nhl-amazon-unveil-new-face-off-probability-stat-331301168
- https://aws.amazon.com/blogs/media/nhl-4-nations-face-off-revolutionizing-hockey-analytics-with-aws
- https://www.nhl.com/news/nhl-edge-site-new-look-has-advanced-statistics-for-everybody
- https://bestmediainfo.com/mediainfo/mediainfo-digital/jiostar-sharpens-ipl-2026-digital-play-with-dedicated-hindi-feed-and-20-viewing-options-11403249
- https://www.business-standard.com/cricket/ipl/english-to-tamil-full-list-of-commentators-for-ipl-2025-s-13-feed-telecast-125032200432_1.html
- https://www.jiostar.com/news/from-stadiums-to-screens-jiostars-tata-ipl-2025-a-year-of-firsts-report-highlights-how-a-billion-viewers-came-together-to-celebrate-cricket/
- https://apps.apple.com/gb/app/cricviz/id1044644979
- https://ellipsedata.com/?p=642
- https://www.itpro.com/cloud/cloud-computing/354606/six-nations-broadcasts-to-get-aws-machine-learning-stats
- https://www.computerweekly.com/news/252477240/How-AWS-is-helping-boost-rugby-fans-engagement-in-the-Guinness-Six-Nations-championship

**Olympics / Streaming / Esports**
- https://corporate.comcast.com/press/releases/peacock-personalized-olympic-recaps-voice-al-michaels-generated-with-ai
- https://tvtechnology.com/news/peacock-to-use-ai-generated-al-michaels-for-recaps-of-olympic-games-highlights
- https://www.peacocktv.com/blog/peacock-new-features-for-watching-2026-winter-olympics
- https://www.thewrap.com/industry-news/business/peacock-platform-updates-2026-winter-olympics/
- https://www.nbcsports.com/pressbox/press-releases/peacock-adds-unprecedented-fan-first-features-rinkside-live-and-courtside-live-for-nbc-sports-coverage-of-the-milan-cortina-2026-olympic-winter-games-and-the-nba
- https://newsroom.intel.com/artificial-intelligence/intel-at-the-olympic-games-paris-2024
- https://heise.de/en/news/8K-video-streams-and-live-athlete-tracking-AI-at-the-Paris-Olympics-9822948.html
- https://www.svgeurope.org/blog/headlines/milano-cortina-2026-obs-makes-significant-breakthrough-with-ai-for-capture-and-replays-at-winter-games/
- https://news.cgtn.com/news/2026-02-08/AI-replays-cloud-broadcast-to-shape-how-we-watch-Milano-Cortina-2026-1KAIGs9jwas/p.html
- https://www.digitaltrends.com/home-theater/mls-season-pass-catch-up-feature/
- https://support.apple.com/en-us/111113
- https://variety.com/2025/tv/news/apple-tv-major-league-soccer-no-extra-cost-worldwide-paywall-1236581405/
- https://themlspulse.com/mls-season-pass
- https://www.sportsvideo.org/2023/10/16/riot-games-aws-bring-win-probability-model-to-esports-broadcasts/
- https://aws.amazon.com/blogs/gametech/how-aws-powered-global-power-rankings-for-lol-esports-worlds-2024/
- https://grid.gg/products/live-data/
- https://ministryofsport.com/grid-esports-launches-ai-predictive-analytics-product-for-esports-broadcasts/
- https://lhm.gg/overlays
- https://lhm.gg/blog/what-makes-a-good-lol-broadcast-overlay
- https://github.com/lexogrine/hud-manager
