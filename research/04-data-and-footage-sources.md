# 04 — Data & Footage Sources: Legal Options and Synthetic Generation

*Research date: 2026-10-06 (Day 1 of the hackathon). Prepared for the Microsoft Premier League Hackathon (Oct 6–27, 2026).*

**Evidence tags:** **[V]** = I checked it against a primary source in this session (a LICENSE file, README, terms PDF, source code, or official docs repo), with the link given. **[U]** = background knowledge or a secondary summary I couldn't re-check, because the egress proxy blocked the domain (Kaggle, figshare, nature.com, pexels.com, learn.microsoft.com, kloppy.pysport.org and others) or because the shared web-search budget ran out partway through. Re-check every **[U]** item before relying on it. None of this is legal advice.

---

## 1. Executive summary and recommendation

**The rules decide the strategy.** Section 4.7 of the Official Rules says *"Projects must use synthetic, football-realistic data"*. The organisers provide no footage. Entrants warrant that any footage they use is licensed, and winners grant Microsoft and the Premier League a perpetual **commercial** licence to the submission (Official Rules §4.7, §4.6, ownership/licence section, read from the local copy of the rules). Each of these points pushes in the same direction:

1. **Make the live feed 100% synthetic.** Generate it ourselves and publish it under our own open licence. It must never contain rows copied from a real provider.
2. **Use real open data only to calibrate distributions** (rates, pass lengths, shot locations, xG/xT surfaces), and only from sources whose licence allows commercial use: **Wyscout public dataset (CC BY 4.0)**, **IDSSE/DFL (CC BY 4.0)** and **SkillCorner open data (MIT)**. Keep the raw files out of our public repo (ship a download script instead) and credit them in a `NOTICE`/datasheet. This is rated **Amber**: the licences allow it, but a strict reading of "must use synthetic data" could object to *any* real-data dependency. Fallback: hand-set parameters from published literature.
3. **Do not use StatsBomb Open Data or Impect Open Data, even for calibration.** Both prohibit commercial exploitation of the data *and of analysis derived from it*, and both forbid redistribution **[V]**. That conflicts directly with the commercial licence winners grant to Microsoft/PL. **Red.**
4. **Synthetic footage.** Use **Google Research Football (GRF)**: Apache-2.0 wrapper, public-domain (Unlicense) engine **[V]**. It renders a 3D broadcast-style view and also gives frame-level ground-truth positions, ball state and game mode **[V]**. That makes a closed loop possible: *simulate → render video → run auto-eventing (detector + tracker + homography) → score it against ground truth*. That loop is our strongest answer to the judging question *"Does the Project demonstrate creativity and optimized synthetic data creation?"*. Caveats: GRF was **archived (read-only) on 19 Aug 2026** and last released on PyPI in Jan 2022 **[V]**, so pin it in Docker. Its bundled kit/logo textures are **named after FC Barcelona and Real Madrid** **[V]** and must be inspected and replaced before any demo-video render.
5. **Optional second renderer.** A lightweight three.js 2.5D "broadcast" renderer driven by our synthetic tracking gives exact camera matrices, which means perfect boxes and keypoints for training and evaluation. It is Green and fully ours.
6. **Real footage, only as an optional robustness test.** **SoccerTrack v2** (10 university amateur matches, panoramic 4K, **CC BY 4.0 including videos**, players' informed consent and ethics approval) **[V]** is the only real-footage source I found that is commercially licensed and consented. Keep it out of the demo video, or show it with clear credit only if useful. Kaggle DFL Bundesliga clips, SoccerNet videos, SportsMOT and the Roboflow football datasets/demo clips derived from DFL are **Red**.
7. **Sora 2 (Azure/Foundry).** Treat it as decorative b-roll at most. It is in preview, generates 4/8/12 s clips at 720p, is available in East US 2 and Sweden Central, *"blocks all IP and photorealistic content"*, and rejects real people and copyrighted music **[V]**. It provides no ground truth, so it is useless for auto-eventing evaluation.
8. **Schema.** Emit events in the **Common Data Format (CDF v0.3.2, Anzer et al. 2025)** shape. It is vendor-neutral and has an MIT-licensed JSON-Schema validator on PyPI **[V]**. Provide adapters to SPADL (socceraction) and a StatsBomb-like view for familiarity. A sample event is in §6.
9. **Publish our synthetic dataset openly** (CC BY 4.0 or CC0) with a datasheet, generator seed, calibration notes and validation report. Use fictional teams, players, kits and stadiums only: no PL clubs, crests, player names or sponsor marks anywhere (rules on third-party trademarks in the video, and on use of Promotion Entities' IP).

---

## 2. Master comparison table

G = Green (safe), A = Amber (usable with care or limits), R = Red (avoid). "Commercial?" and "Redistribute?" describe the *licence*, not the hackathon rules.

| Source | Type | Licence | Commercial? | Redistribute in public repo? | Synthetic? | Rules risk | Notes |
|---|---|---|---|---|---|---|---|
| **Own simulator (Markov/agent-based)** | Events (+ tracking) | Ours (CC BY 4.0/CC0) | Yes | Yes | Yes | **G** | Core recommendation |
| **Google Research Football** | Simulator → tracking, events, rendered video | Apache-2.0 + engine Unlicense **[V]** | Yes | Yes | Yes | **G/A** | Archived 2026-08-19 **[V]**; swap FCB/RM-named kit/logo textures **[V]** |
| footballSimulationEngine (npm) | Simulator (2D, iterative) | MIT (repo LICENSE) / ISC (npm) **[V]** | Yes | Yes | Yes | **G** | v5.0.0, Mar 2026 **[V]**; Node.js |
| RoboCup 2D rcssserver | 11v11 2D sim + logs | LGPL-3.0 **[V]** | Yes | Yes | Yes | **G** | Not visually realistic |
| Unity ML-Agents (SoccerTwos) | 3D toy env | Apache-2.0 **[V]** | Yes | Yes | Yes | **G** | 2v2 toy; Unity Editor terms apply **[U]** |
| rSoccer | Robot-soccer sim | MIT **[V]** | Yes | Yes | Yes | **G** | Robot (SSL/VSSS) soccer, low relevance |
| SoccerSynth-Detection | Synthetic player-detection images | Repo Apache-2.0 **[V]** (dataset on Google Drive) | Likely **[U]** | Likely **[U]** | Yes | **G/A** | Good pre-training data for detectors |
| Spiideo SoccerNet SynLoc | Synthetic 4K images + 3D positions | Registration at research.spiideo.com **[V]**; terms unknown | ? | ? | Yes | **A** | Read terms on sign-up |
| Sora 2 (Azure OpenAI/Foundry) | Generative video | Azure terms; preview **[V]** | Customer-owned output **[U]** | Our outputs | Yes | **A** | 4/8/12 s, 720p; no IP, real people or photorealism **[V]** |
| Wyscout public (Pappalardo 2019) | Events, ~1,941 matches 2017/18 | CC BY 4.0 **[V]** (repackage README) | Yes | Yes, with attribution | No (real) | **A** | Calibration only; real player names |
| IDSSE (Bassek et al. 2025) | Events + TRACAB 25 Hz tracking, 7 matches | CC BY 4.0, authorised by DFL **[V]** | Yes | Yes, credit DFL + paper | No | **A** | Best real tracking+event pair to calibrate from |
| SkillCorner open data | Broadcast tracking (10 fps) + dynamic events | MIT **[V]** | Yes | Yes | No | **A** | Now A-League 2024/25 matches **[V]** |
| Metrica sample data | Tracking + events, 3 anonymised games | No formal licence; "be responsible… acknowledge the source" **[V]** | Unclear | Unclear | No (anonymised real) | **A** | Fine for local experiments; don't ship |
| Dynasty Scouting League 2024 | Events (JSONL) | Apache-2.0 **[V]** | Yes | Yes | No | **A** | Real players; niche |
| **StatsBomb Open Data (+360)** | Events, 360 freeze frames | Custom user agreement **[V]** | **No** (incl. derived analysis) | **No** | No | **R** | §1.2.1–1.2.2 prohibit it |
| **Impect Open Data** | Events (Bundesliga 23/24) | Custom ToU **[V]** | **No** | **No** | No | **R** | Also forbids "edit, alter" |
| PFF FC WC 2022 | Broadcast tracking + events, 64 matches | ToU on request form **[U]** | Unverified | Unverified | No | **R/A** | Couldn't read terms; avoid |
| Opta/Stats Perform feeds | Events | Commercial only **[U]** | No | No | No | **R** | Copy the *format idea* only |
| **Kaggle DFL Bundesliga Data Shootout** | Broadcast video clips | Kaggle comp rules **[U]** | Likely non-commercial | No | No | **R** | Bundesliga marks/players visible |
| Roboflow football datasets/weights & `roboflow/sports` demo clips | Labelled frames, weights, mp4 | Derived from DFL Kaggle data **[V]** | Questionable | No (footage) | No | **R** (footage) / **A** (weights) | Code is MIT **[V]**; YOLOv8 is AGPL-3.0 **[V]** |
| SoccerNet videos | Broadcast video (550+ games) | NDA/gated **[V]** | No | No | No | **R** | Devkit MIT **[V]** |
| SoccerNet labels / GSR / tracking | Annotations + frames | "public" HF access **[V]** | Frames are broadcast content **[U]** | No (frames) | No | **R/A** | Labels useful as format reference |
| SportsMOT | Video clips (MOT) | CC BY-NC 4.0 **[V]** | **No** | NC only | No | **R** | |
| **SoccerTrack v2** | Panoramic 4K amateur video + GSR/BAS labels | **CC BY 4.0 incl. videos** **[V]** | Yes | Yes, with attribution | No (real, consented) | **A/G** | 10 matches, ~900 min, consent + ethics **[V]** |
| SoccerTrack v1 | Fish-eye/drone video | Code GPL-3.0 **[V]**; data licence on Kaggle **[U]** | ? | ? | No | **A** | Prefer v2 |
| TeamTrack | 4K–8K full-pitch MOT video | Code MIT **[V]**; data licence not stated in README **[V]** | ? | ? | No | **A** | Verify the Kaggle licence |
| Pexels / Pixabay / Mixkit stock clips | Short real clips | Free stock licences **[U]** | Yes **[U]** | Not as standalone files **[U]** | No | **A** | Trademarks/people not cleared |
| YouTube "Creative Commons" filter | Real clips | CC BY 3.0 label **[U]** | Yes, if label is valid | n/a | No | **R/A** | ToS forbids downloading **[U]**; mislabelled uploads |
| Wikimedia Commons | Real clips | Per-file CC/PD **[U]** | Usually | Usually (BY-SA share-alike) | No | **A** | Check each file |
| Internet Archive | Mixed | Per-item, unreliable **[U]** | ? | ? | No | **R/A** | |
| Film our own amateur game | Real video | Ours + signed releases **[U]** | Yes | Yes | No | **G** (with releases) | Avoid logos and ads in frame |
| EA FC / FIFA / eFootball game capture | Game video | Publisher EULA + licensed likenesses **[U]** | No | No | "Synthetic" but third-party IP | **R** | Real clubs/players |

---

## 3. Open EVENT and TRACKING data: per-source notes

### 3.1 StatsBomb Open Data (incl. 360): **Red**
- Repo: https://github.com/statsbomb/open-data. User agreement: https://github.com/statsbomb/open-data/blob/master/LICENSE.pdf ("last updated 8 September 2023") **[V]**.
- Key clauses **[V]**: §1.1 use is "for analysis, research and to facilitate the shared ideas & understanding"; §1.2.1 users may not "edit, distort, distribute, reproduce, sell or in any way provide the data to any external or third party"; §1.2.2 may not "commercially exploit the data or any analysis derived from the use of the Service"; §1.4 publications must carry the StatsBomb logo; §7 the data "is the property of StatsBomb".
- The un-xPass README describes this data as "freely available for public non-commercial use" **[V]** (https://github.com/ML-KULeuven/un-xPass).
- **Why Red:** winners' work is licensed to Microsoft/PL "for any non-commercial or commercial purpose". Anything derived from StatsBomb data (calibrated parameters, trained models such as un-xPass weights, xT grids) would fall under §1.2.2. The logo requirement would also put a third-party trademark in our materials. The schema *shape* is still worth knowing: JSON events with `type`, `possession`, `play_pattern`, a 120×80 `location`, `related_events`, `under_pressure`, and dedicated **Pressure** events (type id 17), which match the brief's "pressure events" **[V]** (inspected one file locally; nothing redistributed).

### 3.2 Wyscout public dataset (Pappalardo et al., *Sci. Data* 2019): **Amber (licence Green)**
- Figshare collection https://figshare.com/collections/Soccer_match_event_dataset/4415000 (blocked for me). A kloppy-friendly repackage, https://github.com/koenvo/wyscout-soccer-match-event-dataset, states *"The data sets are released under the CC BY 4.0 License."* **[V]**. The withqwerty/open-football list also gives CC BY 4.0, covering 2017/18 big-five leagues, WC 2018 and Euro 2016, ~1,941 games **[V]** (https://github.com/withqwerty/open-football).
- CC BY 4.0 allows commercial use with attribution. Cite Pappalardo et al. 2019, doi:10.1038/s41597-019-0247-7.
- **Use:** calibrate event-type rates, pass-length/angle distributions, shot locations, and an xT grid we compute ourselves. Contains real player names, so publish aggregates only. It includes the **2017/18 Premier League**; avoid presenting it as PL data.

### 3.3 IDSSE / DFL integrated dataset (Bassek, Rein, Weber, Memmert 2025): **Amber (licence Green)**
- Repo https://github.com/spoho-datascience/idsse-data **[V]**: "The data are provided with authorization of the Deutsche Fussball Liga (DFL). The dataset is licensed under CC-BY 4.0… credit… 1) naming the Deutsche Fußball Liga (DFL) 2) citing this publication". 7 full matches (Bundesliga 1 & 2): official metadata, official event data, TRACAB position data. Data on figshare, doi:10.6084/m9.figshare.28196177.
- kloppy loads it as "Sportec" open data by match id (e.g. `J03WMX` = 1. FC Köln v FC Bayern München) **[V]** (kloppy docs notebook on GitHub).
- **Use:** the only CC BY source with synchronised **25 Hz tracking and official events** **[U on 25 Hz; TRACAB standard]**. Ideal for calibrating speeds, sprint counts, pressure distances, and event-to-tracking timing offsets.

### 3.4 SkillCorner open data: **Amber (licence Green)**
- https://github.com/SkillCorner/opendata, LICENSE = **MIT** ("Copyright (c) 2020 SkillCorner") **[V]**. README: 10 A-League 2024/25 matches of broadcast tracking (10 fps, metres, centre origin, `is_detected` flag), "Dynamic Events", phases of play, season aggregates, 3D body pose for two matches; "we kindly ask that you credit SkillCorner" **[V]**. (Older kloppy docs still list the earlier 9 European 2019/20 matches **[V]**, so the repo contents have changed over time.)
- **Use:** realistic *broadcast-derived* noise patterns (detected vs extrapolated players), which help make our synthetic tracking look like real broadcast tracking.

### 3.5 Metrica Sports sample data: **Amber**
- https://github.com/metrica-sports/sample-data. No LICENSE file (404) **[V]**. README "Legal stuff": "Please be responsible with the use of this data. If you use it for anything public, please acknowledge the source." 3 anonymised games (2 CSV, 1 EPTS/FIFA XML + JSON events), synchronised tracking+events, 105×68 m, 0–1 coordinates **[V]**.
- No explicit grant means no clear commercial licence. Use it locally for prototyping parsers. Don't commit it, and don't base shipped parameters on it alone.

### 3.6 Friends of Tracking / LaurieOnTracking: **Amber**
- https://github.com/Friends-of-Tracking-Data-FoTD/LaurieOnTracking: code is **MIT** **[V]**. It runs on Metrica data (above). Pitch-control and EPV code is useful under MIT; the bundled EPV grid was derived from real data **[U]**, so regenerate it from synthetic or CC BY data.
- "Last Row" (19 Liverpool goal sequences) is unlicensed per open-football **[V]**. Avoid.

### 3.7 PFF FC 2022 World Cup: **Red/Amber**
- Data is free on request, subject to PFF FC Terms of Use **[U]**. Search snippet of https://www.blog.fc.pff.com/blog/pff-fc-release-2022-world-cup-data; the page was blocked. kloppy documents the format: per-game `{game_id}.jsonl.bz2` tracking, single `events.json`, metadata and rosters **[V]** (kloppy docs notebook on GitHub). I couldn't read the ToU, so assume research-only and avoid.

### 3.8 Impect open data: **Red**
- https://github.com/ImpectAPI/open-data, LICENSE.pdf **[V]**: "must not be utilized in any manner that interferes with IMPECT's core business"; users may not "Edit, alter, redistribute, reproduce, sell, or transfer the data", nor "Use the data for any commercial purposes".

### 3.9 Other notes
- **Dynasty Scouting League 2024** (Afriskaut): Apache-2.0 LICENSE **[V]**, JSONL events + match.json **[V]**. Usable for calibration, but small and niche.
- **Opta/Stats Perform, Second Spectrum, Hawk-Eye, TRACAB raw feeds:** no open licences **[U]**. kloppy supports their formats (Opta F7/F24/F73, Stats Perform MA1/MA3/MA25, Second Spectrum, TRACAB, Hawk-Eye) **[V]** (kloppy README), so we can *imitate* their shapes without their data.

---

## 4. Open VIDEO/FOOTAGE: per-source notes

### 4.1 Kaggle "DFL – Bundesliga Data Shootout" (2022): **Red**
- Kaggle was blocked. The standard Kaggle competition rule limits competition data to non-commercial use (competition, forums, academic research/education) unless the competition says otherwise **[U]**. The clips are Bundesliga broadcast/tactical footage with real players, club crests and sponsor boards **[U]**. That fails the rules on third-party trademarks and privacy/IP warranties.
- **Provenance trap [V]:** `roboflow/sports` says *"Original data comes from the DFL - Bundesliga Data Shootout Kaggle competition"*. Its `setup.sh` downloads Kaggle-named clips (`0bfacc_0.mp4`, `2e57b9_0.mp4`, `08fd33_0.mp4`, `573e61_0.mp4`, `121364_0.mp4`) plus detectors trained on that data (https://github.com/roboflow/sports/tree/main/examples/soccer). **Do not use those clips in our repo or video.** The pretrained weights are Amber: derived from questionably licensed data, and they're YOLOv8 (Ultralytics, **AGPL-3.0** **[V]**).

### 4.2 SoccerNet: **Red for footage**
- Devkit https://github.com/SoccerNet/SoccerNet is MIT **[V]**. README **[V]**: raw broadcast videos (`SoccerNet_raw_HQ`, `…_Challenge`) are **gated**, and several sets are **"NDA-gated"**. Access requires signing the SoccerNet NDA and manual approval. Tracking-2023, GSR-2024/2025, calibration, ReID and jersey sets show "public" access on Hugging Face **[V]**, but they contain frames from professional broadcasts (EPL/UCL etc.) **[U]**. Public download doesn't make them commercially licensed. Useful only as **format references** (MOT/GSR label formats, GSR metric).

### 4.3 SportsMOT: **Red**
- https://github.com/MCG-NJU/SportsMOT **[V]**: 240 clips (basketball, football, volleyball) collected from YouTube (Olympics, NCAA, NBA). "licensed under a Creative Commons Attribution-NonCommercial 4.0 International License", with use conditional on the CodaLab competition terms.

### 4.4 SoccerTrack v2: **Amber/Green (best real footage option)**
- https://github.com/AtomScott/SoccerTrack-v2 **[V]**: "10 full-length panoramic 4K matches" with GSR labels (pitch coords, jersey-based IDs, roles, teams) and **BAS labels for 12 actions** (Pass, Drive, Header, High Pass, Out, Cross, Throw In, Shot, Ball Player Block, Player Successful Tackle, Free Kick, Goal). `LICENSE-DATA`: **CC BY 4.0** for "the panoramic 4K videos and the associated GSR, BAS, and MOT annotation files" on Hugging Face (`atomscott/soccertrack-v2`); README: "Both permit commercial use." Landing page **[V]**: "10 university-level amateur matches recorded with BePro camera systems… approximately 900 minutes", "No player names… jersey-number based only", "informed consent", "approval from the university ethics board".
- **Use:** a real-world robustness check for our auto-eventing model (synthetic-trained → real amateur footage), with credit. It isn't synthetic, so keep it out of the core feed. Showing it in the demo video is allowed by the licence, but the BePro camera branding or any visible ads in frame need checking **[U]**.

### 4.5 SoccerTrack v1 and TeamTrack: **Amber**
- SoccerTrack v1 code (now "SportsLabKit") is **GPL-3.0** **[V]**. The dataset lives on Kaggle `atomscott/soccertrack`, licence unverified **[U]**. TeamTrack (4K–8K full-pitch soccer, basketball, handball; >4M boxes) code is MIT **[V]**. The README gives no dataset licence **[V]**, and the data is on Google Drive/Kaggle. Check the Kaggle licence before use. Prefer SoccerTrack v2.

### 4.6 Roboflow Universe football datasets: **Red/Amber**
- Universe pages couldn't be reached. Many football sets are labelled frames from DFL Kaggle clips (confirmed for Roboflow's own three sets **[V]**, §4.1) or from broadcast TV **[U]**. A CC BY label on Universe only covers the annotations the uploader can license; it doesn't cure the provenance of the frames **[U]**.

### 4.7 Stock footage (Pexels, Pixabay, Mixkit, Videvo): **Amber** (all **[U]**, sites blocked)
- **Pexels License:** free use, including commercial, no attribution required; modification allowed. Not allowed: selling unaltered copies, showing identifiable people offensively, implying endorsement, redistributing on other stock sites. Pexels doesn't clear trademarks or model releases for every use.
- **Pixabay Content License:** similar. It specifically warns that content may contain trademarks, logos or recognisable people that aren't cleared, and prohibits standalone redistribution.
- **Mixkit:** free licence allowing commercial use **[U]**. **Videvo:** mixed per-clip licences (some CC BY 3.0, some Videvo Attribution, some premium) **[U]**, so check each clip.
- **Risk:** clips are short, mostly close-ups of amateurs, with kit brands and stadium ads often visible. Fine for a few seconds of b-roll if clean of logos. Poor for auto-eventing (no tactical camera, no ground truth). We also can't commit the files to the repo (standalone redistribution).

### 4.8 YouTube Creative Commons filter: **Red/Amber** **[U]**
- YouTube only offers **CC BY 3.0** as an alternative licence. Uploaders may only mark videos they fully own, but YouTube doesn't verify this. Re-uploads of broadcast matches carrying a false CC label are common. The **YouTube Terms of Service prohibit downloading content** except through YouTube features or with permission, regardless of the CC label. A CC BY video also requires attribution in the derivative. **Avoid.** If a specific clip is essential, get the uploader's written permission and confirm they are the original filmer.

### 4.9 Wikimedia Commons / Internet Archive: **Amber / Red-Amber** **[U]**
- Commons: each file has its own CC BY, CC BY-SA or PD licence. Professional match footage is rare there (broadcast copyright). CC BY-SA would make our derived video share-alike. Internet Archive: rights metadata is uploader-asserted and often unreliable.

### 4.10 Filming our own game: **Green with paperwork** **[U]**
- Get written consent/releases from every identifiable person (video of identifiable people is personal data under UK/EU GDPR), permission from the venue, and avoid branded kit and advertising boards in frame. Mount a high, wide static camera (tripod on a stand or touchline tower) so homography is easy. This gives real footage we fully own, but schedule risk inside a 3-week hackathon is real.

### 4.11 Video-game capture (EA FC, eFootball, Football Manager): **Red** **[U]**
- Publisher EULAs plus licensed club and player likenesses, so third-party trademarks and publicity rights end up in the demo video.

---

## 5. Synthetic data and footage deep dive

### 5.1 Google Research Football (GRF): primary synthetic footage + tracking generator

**Facts [V]** (https://github.com/google-research/football, README/docs/source):
- Licence: Apache-2.0 for the repo. The engine `third_party/gfootball_engine` is a "heavily modified version of GameplayFootball" released under the **Unlicense (public domain)**.
- Status: **archived 19 Aug 2026**. Last code commit Apr 2022 (README touch June 2025). README points to a "new game server: research-football.dev" (GRF League for RL agents). PyPI `gfootball` 2.10.2 (Jan 2022) ships **Windows-only wheels** plus an sdist. On Linux it compiles C++ (Boost.Python, SDL2), and installs are known to break on newer Boost/Python (GitHub issues #311, #317, #241). The `setup.py` pins `gym` ≤ 0.21 (commit #313).
- Scenarios: `11_vs_11_stochastic` (full game, medium), `_easy_`, `_hard_`, plus 11 "academy" drills. Custom scenarios are Python files using `builder.AddPlayer(x, y, role)`. The default full game is `game_duration = 3000` steps.
- Raw observation per step: `ball` [x,y,z], `ball_direction`, `ball_rotation`, `ball_owned_team` (-1/0/1), `ball_owned_player`, per team positions, directions, `tired_factor`, yellow cards, `active` (red-card), roles (GK, CB, LB, RB, DM, CM, LM, RM, AM, CF), `score`, `steps_left`, `game_mode` (Normal, KickOff, GoalKick, FreeKick, Corner, ThrowIn, Penalty), and `frame` (RGB 1280×720 when rendering).
- Coordinates: x ∈ [-1, 1], y ∈ [-0.42, 0.42]; goals at x=±1 spanning y ±0.044. Velocities are per step.
- Dumps: `write_full_episode_dumps`, `write_video` (AVI/WebM), `tracesdir`. Scripts: `dump_to_txt.py`, `dump_to_video.py` (2D minimap video), `replay.py`. Config defaults include `render_resolution_x: 1280`, `video_quality_level` 0–2, `physics_steps_per_frame: 10`, `display_game_stats: True`.
- **Trademark gotcha:** `src/data/teamdata.cpp` names the two teams "Frequentists United" and "Real Bayesians", but loads `images_teams/primeradivision/fcbarcelona_logo.png` / `realmadrid_logo.png` and kit textures `fcbarcelona_kit_0x` / `realmadrid_kit_0x` from `data/databases/default/images_teams/primeradivision/`. I couldn't view the bitmaps. **Before any render that will be published, replace these four files with our own generic kits and crests and rebuild.** Also turn off or restyle the on-screen stats overlay (`display_game_stats=False`) so our own overlay engine provides graphics.

**Time scale [U, verify empirically]:** each env step runs 10 physics steps (`physics_steps_per_frame=10`), i.e. about 0.1 s of simulated time. The default 3000-step "90-minute" match is therefore about 5 minutes of simulated play with an accelerated clock. For football-realistic timestamps, either rescale (×18) or try a custom scenario with `game_duration = 54000` (90 × 60 × 10), then confirm the in-game clock and stamina behave sensibly.

**Setup (recommended: Docker, Ubuntu 20.04 base as upstream uses) [V for commands; versions U]:**
```bash
git clone https://github.com/google-research/football.git && cd football
# replace kit/logo textures first:
#   third_party/gfootball_engine/data/databases/default/images_teams/primeradivision/*
docker build --build-arg DOCKER_BASE=ubuntu:20.04 . -t gfootball
docker run --rm -it -v $PWD/out:/out gfootball bash
# inside the container (headless rendering via a virtual X server):
xvfb-run -s "-screen 0 1920x1080x24" python3 gen_match.py
```
`gen_match.py` (both teams on built-in AI; ground truth + video):
```python
import gfootball.env as football_env
env = football_env.create_environment(
    env_name="11_vs_11_stochastic",          # or a custom scenario with game_duration=54000
    representation="raw",
    number_of_left_players_agent_controls=0,  # built-in AI controls both teams [U: verify step([]) works;
    number_of_right_players_agent_controls=0, #  fallback: action_set='v2' and send action 19 builtin_ai]
    render=True, write_video=True, write_full_episode_dumps=True, logdir="/out",
    other_config_options={"render_resolution_x": 1920, "video_quality_level": 2,
                          "display_game_stats": False, "video_format": "webm"})
obs = env.reset(); done = False; frames = []
while not done:
    obs, reward, done, info = env.step([])
    o = obs[0] if isinstance(obs, list) else obs
    frames.append({k: o[k] for k in ("ball","ball_owned_team","ball_owned_player",
                   "left_team","right_team","left_team_direction","right_team_direction",
                   "game_mode","score","steps_left")})
```

**Turning GRF ground truth into a CDF event stream (our code; Green):**
- Coordinates: `x_m = x * 52.5`, `y_m = y * (34 / 0.42)` (maps the GRF field to a 105×68 m pitch with a centre origin, matching CDF's metre/centre convention **[V for CDF sample]**). The GRF field isn't proportionally 105×68, so the mapping is anisotropic **[U]**.
- Possession change: `ball_owned_team` switches team, or goes -1 → other team.
- Pass: owner changes within a team. Start = last owned location, end = receiver location; `receiver_time` = first owned step.
- Interception/tackle: owner changes across teams. Tag it a tackle if the ball carrier was within ~1.5 m of the winner on the previous step, otherwise an interception (heuristic).
- Shot: ball velocity projected toward the goal mouth above a threshold, followed by a goal (score change), GoalKick/Corner game mode, or a keeper taking possession.
- Set pieces: `game_mode` transitions (Corner, FreeKick, ThrowIn, Penalty, KickOff, GoalKick).
- Pressure: an opponent within 3–5 m of the ball carrier and closing (velocity dot product < 0) for ≥ 0.5 s. Pressure intensity = f(distance, closing speed).
- Speed metrics: per-player speeds and sprints from interpolated positions. Resample 10 Hz → 25 Hz with a Savitzky–Golay or Kalman smoother. Add realistic sensor noise and dropout, using SkillCorner's `is_detected` pattern as the calibration source.
- Validate with kloppy (load our own CDF/JSON via a custom deserializer, or export to Metrica-like CSV) and socceraction (SPADL → xT/VAEP) to check that distributions look football-like.

**Auto-eventing loop (the hackathon's optional feature), fully synthetic:**
1. GRF renders video, giving ground truth for every frame.
2. Detector: **RF-DETR-N/S/M/L (Apache-2.0)**, **RT-DETR**, **D-FINE** or **YOLOX** (all Apache-2.0) **[V]**. Avoid Ultralytics/boxmot (**AGPL-3.0** **[V]**) unless we're comfortable with AGPL obligations; our repo is public anyway, but AGPL plus Microsoft's commercial grant adds friction. Note RF-DETR's Atto/Femto/Pico/XL/2XL models are **PML 1.0**, not Apache **[V]**.
3. Tracker: ByteTrack / BoT-SORT (MIT) **[V]**, or `supervision` (MIT) **[V]**. Team assignment by jersey colour (k-means on crops, as in roboflow/sports, MIT **[V]**). Optional SAM2 (Apache-2.0) **[V]** for masks.
4. Pitch keypoints → homography → metres. Fine-tune on GRF frames and/or SoccerSynth-Detection (Apache-2.0 repo **[V]**).
5. Derive passes and speeds, then **score against GRF ground truth** (precision/recall of passes within ±1 s, RMSE of speed). This gives the judges a measurable metric.

### 5.2 Our own match simulator (feed realism and control): **Green**
A lightweight Python possession-chain simulator generates a full 90-minute event feed in milliseconds, with controllable "storylines" (red card, late winner, high press) for narrative and recap demos:
- **Match level:** team strengths → expected goals via a Poisson/Dixon–Coles-style model **[U, standard literature]**. Sample a scoreline-consistent xG budget.
- **Possession level:** a Markov chain over pitch zones (e.g. a 16×12 grid) with action probabilities {pass, carry, shot, loss}. Transition matrices and pass-length/angle distributions are calibrated from Wyscout CC BY / IDSSE CC BY (or hand-set). Value states with **xT** we compute ourselves (Karun Singh's xT method; socceraction implementation MIT **[V]**).
- **Defensive layer:** pressure events sampled conditional on zone and press intensity, with tackles, interceptions and fouls; cards via a hazard model.
- **Tracking layer (optional):** agent-based movement (formation anchors + ball attraction + marking springs), or drive GRF scenarios from the event script.
- **Feed realism:** emit at wall-clock pace with jitter (0.5–3 s latency), occasional late corrections (event `version` bumps, deletions), as real feeds do.
- Alternative engines: **footballSimulationEngine** (Node, MIT/ISC, active v5.0.0 Mar 2026 **[V]**), or **RoboCup rcssserver** (LGPL-3.0 **[V]**; 11v11 with logs, but robotic-looking).

### 5.3 Rendering synthetic broadcast views from our tracking: **Green**
- **three.js (MIT) [U]** 2.5D scene: pitch texture we draw ourselves, capsule or low-poly players (CC0 asset packs such as Kenney/Quaternius **[U]**, check each pack), a known virtual camera following the ball with broadcast-style pan/zoom. Exact camera intrinsics and extrinsics give perfect 2D boxes, keypoints and homographies for training. Export frames with headless Chromium (Playwright) → ffmpeg.
- **Blender (GPL; renders you produce are yours [U])** for prettier, slower renders.
- **mplsoccer (MIT) [V]** animations for 2D tactical-cam "radar" views in the UI.

### 5.4 Generative video (Sora 2 in Azure OpenAI / Foundry): **Amber, b-roll only**
From the official docs repo (MicrosoftDocs/azure-ai-docs, `articles/foundry/openai/...`, doc dated 03/18/2026) **[V]**:
- "Sora 2 video generation (preview)". Text→video, image→video, video→video, audio generation, remix. API `client.videos.create(model="sora-2", ...)` via the v1 endpoint. Async jobs (1–5 min). Two concurrent jobs; jobs kept 24 h.
- API params: size `1280×720` or `720×1280`; seconds `4 / 8 / 12`. (The concept page also lists more resolutions and 1–20 s, which looks inconsistent; trust the API table.)
- Regions: **East US 2** and **Sweden Central** (standard deployments, model versions 2025-10-06 and 2025-12-08).
- Restrictions: *"Sora 2 blocks all IP and photorealistic content"*; "Copyrighted characters and copyrighted music will be rejected"; "Real people—including public figures—cannot be generated"; input images with human faces rejected; under-18-suitable content only. Limitations include "complex physics… spatial reasoning… precise time-based event sequencing".
- Microsoft's **Customer Copyright Commitment** covers Output Content if the required mitigations are in place **[V]**. Ownership of outputs belongs to the customer per the Microsoft Product Terms **[U]**.
- **Verdict:** can't produce 90-minute, tactically coherent, ground-truthed footage, and photorealism is blocked. Use it only for stylised intro or bumper clips (e.g. "animated stadium at dusk, no logos"), and label them AI-generated in the video.

### 5.5 Academic synthetic football datasets
- **SoccerSynth-Detection** (Qin, Yeung, Umemoto, Fujii; open-starlab) **[V]**: synthetic player images with random lighting, textures and motion blur. Validated with YOLOv8n against SoccerNet-Tracking and SportsMOT. Dataset and a Windows generator on Google Drive. Repo licence Apache-2.0.
- **Spiideo SoccerNet SynLoc** **[V]**: synthetic 4K/FullHD images with 3D world positions for athlete localisation; devkit `Spiideo/sskit`. Download after registering at research.spiideo.com (terms unread → Amber).

### 5.6 Libraries (all licences [V] from LICENSE files or PyPI metadata)
| Library | Licence | Use |
|---|---|---|
| kloppy 3.19.1 (2026-10-03) | BSD-3 | Load, standardise and convert provider formats; CDF export is in open PRs #502/#519 (not merged) **[V]** |
| socceraction 1.5.3 | MIT | SPADL, atomic-SPADL, xT, VAEP |
| mplsoccer 1.8.1 | MIT | Pitch plots/animations |
| floodlight 1.2.0 | MIT | Tracking-data science, IDSSE loaders |
| databallpy 0.8.1 | MIT | Sync tracking+events, pressure/covered-distance features |
| un-xPass | Apache-2.0 | Pass success/selection models (retrain on synthetic, not StatsBomb) |
| common-data-format-validator 0.1.1 | MIT | Validate our feed against CDF v0.3.2 |
| roboflow/sports, supervision | MIT | CV pipeline scaffolding |
| ultralytics, boxmot | **AGPL-3.0** | Avoid or isolate |
| SAM2 | Apache-2.0 | Segmentation |
| ByteTrack, BoT-SORT | MIT | Tracking |
| RF-DETR (N/S/M/L), RT-DETR, D-FINE, YOLOX | Apache-2.0 | Detection |
| gfootball 2.10.2 | Apache-2.0 | Simulator |

---

## 6. Recommended event schema

### 6.1 Options compared
- **Opta F24/F7 [U]:** XML. `<Event type_id period_id min sec team_id outcome x y>` with numeric `<Q qualifier_id value>` children; x/y in 0–100 pitch percentages. Industry-familiar but proprietary and opaque (type and qualifier IDs). Stats Perform's newer MA1/MA3 JSON feeds are supported by kloppy **[V]**.
- **StatsBomb [V]:** rich JSON with explicit Pressure events and 360 freeze frames, 120×80 yd coordinates. The format is familiar, but the documentation is StatsBomb's, so imitate the structure without copying the docs.
- **SPADL [V]:** 23 action types (`pass, cross, throw_in, freekick_crossed, freekick_short, corner_crossed, corner_short, take_on, foul, tackle, interception, shot, shot_penalty, shot_freekick, keeper_save, keeper_claim, keeper_punch, keeper_pick_up, clearance, bad_touch, non_action, dribble, goalkick`), 6 results, 105×68 m. Great for modelling (xT/VAEP), but has no pressure events and no metadata.
- **DFL/Sportec XML [V via IDSSE/kloppy]:** official German league event + 25 Hz position XML. Robust, but heavy and German-league-specific.
- **Second Spectrum / Genius-style tracking JSONL [U]:** 25 Hz frames. Good tracking shape reference.
- **Common Data Format (CDF) [V]:** Anzer, Arnsmeyer, Bauer, Bekkers, Brefeld, Davis, Evans, Kempe, Robertson, Smith & Van Haaren (2025). Covers official match data, metadata, event, tracking, landmark (skeletal) and video. Validator `pip install common-data-format-validator` (CDF v0.3.2, MIT, https://github.com/UnravelSports/common-data-format-validator), with soft/strict/extreme validation modes. Events are JSONL with top-level `match`, `meta`, `event` (+ optional `tracking`). Required event fields: `id, time (UTC ISO), period, type, sub_type, is_successful, outcome_type, receiver_id, receiver_time, receiver_team_id, x, y, x_end, y_end, body_part, related_event_ids`, plus `player_id`/`team_id` (or `official_id` for referee events). Optional `match_clock` "MM:SS.mm", `metrics` {}, `var` {}. Periods: `first_half, second_half, first_half_extratime, second_half_extratime, shootout`. Types include `pass, shot, referee, defending (clearance, interception, pressing, block), goalkeeping, misc (tackle…)`. Metres, centre origin. Snake_case enforced.

### 6.2 Recommendation
**Canonical = CDF v0.3.2 events (JSONL) + CDF meta.json + CDF tracking JSONL (25 Hz),** validated in CI with `common-data-format-validator` in `strict` mode, which tolerates extra keys **[V]**. Put our feed-transport extras in a separate `x_feed` object (sequence number, version, status, emitted_at, synthetic flag, generator seed). Provide adapters: CDF → SPADL (socceraction xT/VAEP), CDF → StatsBomb-like view (UI familiarity), CDF → overlay cues. Transport: Azure Event Hubs / Fabric Eventstream, one JSON message per event, partitioned by `match.id`.

**Sample synthetic events (fictional teams "Riverside Rovers" `t_rvr` v "Harbour Athletic" `t_hbr`):**
```json
{"match": {"id": "syn_m_0001"},
 "meta": {"is_synced": true},
 "event": {"id": "evt_000411", "time": "2026-10-06T19:14:06.200Z", "period": "first_half",
   "type": "pass", "sub_type": null, "is_successful": true, "outcome_type": "successful",
   "player_id": "p_rvr_08", "team_id": "t_rvr",
   "receiver_id": "p_rvr_10", "receiver_time": "2026-10-06T19:14:07.150Z", "receiver_team_id": "t_rvr",
   "x": 4.1, "y": -11.3, "x_end": 17.6, "y_end": -5.9, "body_part": "right_foot",
   "related_event_ids": ["evt_000412"], "match_clock": "29:06.20",
   "metrics": {"xpass": 0.83, "xt_added": 0.021}},
 "tracking": {"frame_id": 43655, "frame_id_end": 43679, "player": {"x": 4.1, "y": -11.3}},
 "x_feed": {"seq": 411, "version": 1, "status": "confirmed", "emitted_at": "2026-10-06T19:14:07.900Z",
   "synthetic": true, "generator": "pitchforge-sim/0.1 + gfootball-2.10.2", "seed": 20261006}}
{"match": {"id": "syn_m_0001"},
 "meta": {"is_synced": true},
 "event": {"id": "evt_000412", "time": "2026-10-06T19:14:07.300Z", "period": "first_half",
   "type": "defending", "sub_type": "pressing", "is_successful": true, "outcome_type": "pressure",
   "player_id": "p_hbr_06", "team_id": "t_hbr",
   "receiver_id": null, "receiver_time": null, "receiver_team_id": null,
   "x": 18.9, "y": -6.4, "x_end": null, "y_end": null, "body_part": null,
   "related_event_ids": ["evt_000411"], "match_clock": "29:07.30",
   "metrics": {"pressure_distance_m": 1.7, "closing_speed_mps": 4.2}},
 "tracking": {"frame_id": 43682, "player": {"x": 18.9, "y": -6.4}},
 "x_feed": {"seq": 412, "version": 1, "status": "confirmed", "emitted_at": "2026-10-06T19:14:08.600Z",
   "synthetic": true, "generator": "pitchforge-sim/0.1 + gfootball-2.10.2", "seed": 20261006}}
```
(Mapping notes: possession changes = derived `misc`/`defending` events plus a `possession` block in our state store; tackles = `misc`/`tackle` per the CDF sub_type description **[V]**; cards = `referee` + `official_id`.)

---

## 7. Recommended strategy and risk analysis

### 7.1 Plan (3 weeks)
- **Week 1:**
  - Python simulator emitting CDF JSONL at live pace into Event Hubs, with fictional teams and players from a generator. Add a check that names don't collide with real PL players (best effort).
  - Validator in CI.
  - Dockerised GRF that produces 1 full match: dumps, 1080p video, swapped kits/crests.
- **Week 2:**
  - GRF → CDF converter (events + 25 Hz tracking).
  - Calibration notebook (Wyscout CC BY + IDSSE CC BY; raw data downloaded at runtime, never committed).
  - Distribution checks (pass length, passes/match, shots/match, PPDA, speed/sprint profiles).
  - Datasheet.
- **Week 3:**
  - Auto-eventing on GRF video (RF-DETR + ByteTrack + homography), scored against ground truth.
  - Optional SoccerTrack v2 robustness test.
  - Publish the dataset (Hugging Face or GitHub release) under CC BY 4.0 with seeds, `NOTICE` and a datasheet ("Datasheets for Datasets" style: motivation, composition, generation process, calibration sources, known biases, intended use, licence).

### 7.2 Risk register against the rules
| Option | Rules clause at risk | Rating | Mitigation |
|---|---|---|---|
| Own simulator + GRF synthetic feed | "must use synthetic, football-realistic data" (satisfies it) | **G** | Publish generator + seed |
| GRF rendered video in demo | "Not include third party trademarks" | **A → G** | Replace FCB/RM-named textures; disable stats overlay; review every frame |
| Calibrating from Wyscout/IDSSE/SkillCorner | Synthetic-only rule; third-party data authorisation | **A** | Aggregate parameters only; credit (Pappalardo et al.; DFL + Bassek et al.; SkillCorner); no raw data in repo; offer a literature-only parameter set |
| Calibrating from StatsBomb/Impect | Third-party data T&Cs; commercial licence to MS/PL | **R** | Don't |
| Kaggle DFL / SoccerNet / SportsMOT / Roboflow-DFL clips | Footage warranty, trademarks, privacy | **R** | Don't |
| SoccerTrack v2 real footage | Synthetic-only rule (if central); privacy | **A** | Optional robustness test only; CC BY credit; consented players |
| Stock clips | Trademarks/people in video | **A** | Only logo-free b-roll, if any |
| Sora 2 b-roll | Preview service terms; AI disclosure | **A** | Stylised, logo-free, labelled; no people likeness |
| Ultralytics YOLO in pipeline | Open-source compliance (§ on OSS) | **A** | Prefer Apache-2.0 detectors |
| Real PL clubs, players, crests in data or UI | Trademarks, publicity, Promotion Entities' IP | **R** | Fictional everything |
| Background music in demo video | "copyrighted music" | **A** | Use self-made/royalty-free with licence on file, or none |

### 7.3 Open questions to put to organisers (Discord/FAQ)
1. Does "must use synthetic data" permit calibrating a generator from CC BY real datasets (aggregates only)?
2. Is any real footage acceptable for testing auto-eventing if commercially licensed and consented (e.g., SoccerTrack v2)?
3. Can we show Premier League branding at all (as a Promotion Entity), or should everything be neutral?

---

## 8. Limitations of this research
- The egress proxy blocked figshare, nature.com, Kaggle, PMC, pexels/pixabay, learn.microsoft.com, kloppy.pysport.org, gradientsports.com, socceraction docs and others. The shared WebSearch budget ran out early in the session. Microsoft docs were read from the public **MicrosoftDocs/azure-ai-docs** GitHub source instead, and licences from raw GitHub files. Items marked **[U]** (Kaggle DFL rules, PFF ToU, stock-footage licences, YouTube ToS, Microsoft output-ownership wording, GRF time scale, `step([])` with zero agents) need a quick manual check in a normal browser.

---

## Sources
Rules
- Official Rules (local copy provided by coordinator): §4.6–4.7, OSS clause, licence-to-sponsor clause, judging criteria.

Event/tracking data
- StatsBomb Open Data repo & user agreement PDF: https://github.com/statsbomb/open-data , https://github.com/statsbomb/open-data/blob/master/LICENSE.pdf
- Wyscout public dataset: https://figshare.com/collections/Soccer_match_event_dataset/4415000 ; repackage stating CC BY 4.0: https://github.com/koenvo/wyscout-soccer-match-event-dataset ; paper doi:10.1038/s41597-019-0247-7
- IDSSE: https://github.com/spoho-datascience/idsse-data ; https://www.nature.com/articles/s41597-025-04505-y ; https://doi.org/10.6084/m9.figshare.28196177
- SkillCorner: https://github.com/SkillCorner/opendata (LICENSE, README)
- Metrica: https://github.com/metrica-sports/sample-data
- Impect: https://github.com/ImpectAPI/open-data (README, LICENSE.pdf)
- Dynasty Scouting League: https://github.com/Afriskaut/dynasty-scouting-league-2024-open-data
- PFF FC blog (blocked; via search snippet): https://www.blog.fc.pff.com/blog/pff-fc-release-2022-world-cup-data
- Curated list: https://github.com/withqwerty/open-football
- LaurieOnTracking: https://github.com/Friends-of-Tracking-Data-FoTD/LaurieOnTracking

Video
- roboflow/sports soccer example: https://github.com/roboflow/sports/tree/main/examples/soccer
- SoccerNet devkit/NDA: https://github.com/SoccerNet/SoccerNet ; GSR: https://github.com/SoccerNet/sn-gamestate ; tracking: https://github.com/SoccerNet/sn-tracking
- SportsMOT: https://github.com/MCG-NJU/SportsMOT
- SoccerTrack v2: https://github.com/AtomScott/SoccerTrack-v2 , https://atomscott.github.io/SoccerTrack-v2/ , https://huggingface.co/datasets/atomscott/soccertrack-v2
- SoccerTrack v1 / SportsLabKit: https://github.com/AtomScott/SoccerTrack ; TeamTrack: https://github.com/AtomScott/TeamTrack
- Kaggle DFL competition (blocked): https://www.kaggle.com/competitions/dfl-bundesliga-data-shootout

Synthetic generation
- Google Research Football: https://github.com/google-research/football (README; gfootball/doc/observation.md, saving_replays.md, docker.md, api.md; gfootball/env/__init__.py, config.py; scenarios; third_party/gfootball_engine/LICENSE; src/data/teamdata.cpp); PyPI https://pypi.org/project/gfootball/ ; GRF League https://research-football.dev/
- footballSimulationEngine: https://github.com/GallagherAiden/footballSimulationEngine ; https://www.npmjs.com/package/footballsimulationengine
- RoboCup rcssserver: https://github.com/rcsoccersim/rcssserver ; rSoccer: https://github.com/robocin/rSoccer ; Unity ML-Agents: https://github.com/Unity-Technologies/ml-agents
- SoccerSynth-Detection: https://github.com/open-starlab/SoccerSynth-Detection ; Spiideo SynLoc: https://github.com/Spiideo/sskit
- Sora 2 docs (source): https://github.com/MicrosoftDocs/azure-ai-docs/blob/main/articles/foundry/openai/concepts/video-generation.md , includes `concepts-video-generation-1/2.md`, `video-generation-rest.md`, `foundry-models/includes/model-matrix/deployments-standard.md`, `responsible-ai/includes/openai-customer-copyright-commitment-content.md`

Libraries/standards
- kloppy: https://github.com/PySport/kloppy (README, docs notebooks; PRs #502, #519)
- socceraction (SPADL config): https://github.com/ML-KULeuven/socceraction ; un-xPass: https://github.com/ML-KULeuven/un-xPass
- mplsoccer https://github.com/andrewRowlinson/mplsoccer ; floodlight https://github.com/floodlight-sports/floodlight ; databallpy https://github.com/Alek050/databallpy
- CDF validator & samples: https://github.com/UnravelSports/common-data-format-validator ; https://pypi.org/project/common-data-format-validator/
- Detectors/trackers: https://github.com/ultralytics/ultralytics , https://github.com/roboflow/rf-detr , https://github.com/lyuwenyu/RT-DETR , https://github.com/Peterande/D-FINE , https://github.com/Megvii-BaseDetection/YOLOX , https://github.com/ifzhang/ByteTrack , https://github.com/NirAharon/BoT-SORT , https://github.com/mikel-brostrom/boxmot , https://github.com/facebookresearch/sam2 , https://github.com/roboflow/supervision
