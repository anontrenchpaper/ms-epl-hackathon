# Technology stack: proposal for discussion

> A synthesis of [`research/05-azure-microsoft-stack.md`](../research/05-azure-microsoft-stack.md), which has the deep dive, sources, cost model and full risk register, shaped around the recommended concept in [`ideas/shortlist-and-recommendation.md`](../ideas/shortlist-and-recommendation.md).
> Diagram: [`mockups/png/20-architecture.png`](../mockups/png/20-architecture.png).
>
> ⚠️ Research was done with restricted web access. Product names, GA status and prices are from Microsoft Learn source files and search summaries as of 6 Oct 2026. Re-check anything marked *verify* before relying on it.

## 1. Design principles

1. **Deterministic numbers, LLM words, a verifier in between.** Metrics come from code. LLMs explain them, and a Verifier agent checks every number against match state before anything airs. This is the pattern Microsoft hackathon winners keep using (`research/07` §4).
2. **Template first, LLM second.** Goals, cards, speed tags and pass-quality cards render in under a second from templates. LLM explanations arrive as a progressive enhancement inside a configurable broadcast delay (~6 s), the way broadcast delay hides production latency.
3. **One contract in, one contract out.** A `MatchEvent` schema in (CDF v0.3.2-compatible, `research/04` §6) and an `OverlayCue` schema out (below), so any renderer can consume us. *Renderer-agnostic, designed for the production path's rendering partner.*
4. **Every agent has a narrow job, a cheap model, a timeout and a fallback.** Degraded mode is "templates only", never "nothing".
5. **Evidence or silence.** Every cue carries `evidence: [event_ids]` and a confidence. Low confidence means the cue is held or labelled provisional.
6. **Everything as code.** Bicep + `azd`, GitHub Actions with OIDC, evals in CI, no portal clicks.

## 2. The stack by layer

| Layer | Choice | Why this one | Alternatives / notes |
|---|---|---|---|
| **Synthetic source** | Our own possession-chain + agent-based simulator (Python), replayed by a **Container Apps job** at 1×–10× | Full control, scenario injection, clean licence; calibrate distributions from CC BY 4.0 references only (*ask organisers*) | Google Research Football: Apache-2.0 but **archived Aug 2026**, Windows-only wheels, and it bundles real-club textures (`research/04` §5.1) |
| **Synthetic picture** | Browser renderer (our `pitch.js` virtual camera → animated canvas/WebGL, three.js if time allows) | A "broadcast feed" with zero footage rights; overlays anchored in 3-D | Sora 2 for b-roll only (no ground truth, IP blocks) |
| **Event backbone** | **Azure Event Hubs** (Standard, Kafka endpoint) | The canonical Azure streaming ingress; partition per match | Event Grid for discrete notifications (RecapReady) |
| **Ingest / normalise** | **Azure Functions (Flex Consumption)**, Event Hubs trigger | Schema validation, idempotent de-dupe, instant template cues; scales to zero | Container Apps + KEDA for the heavier metrics engine |
| **Event store + shared state** | **Azure Cosmos DB** (NoSQL): `events`, `matchState`, `insights`, `cues`, `checkpoints`, `fans` | Change feed triggers agents; Agent Framework checkpoints persist to Cosmos; free tier available | PostgreSQL if the team prefers SQL. The Oct 21 Reactor session covers both |
| **Metrics engine** | Python on **Azure Container Apps** (KEDA on Event Hubs lag) | Pass difficulty, speeds, pressure, momentum, chaos index + causes, importance index; uses `socceraction` (MIT), `un-xPass` (Apache-2.0), `kloppy` (BSD-3) | Fabric RTI KQL for windowed aggregates (stretch) |
| **Agents** | **Microsoft Agent Framework 1.x** (Python) graph workflow, deployed as a **Foundry hosted agent** | GA, checkpointing, human-in-the-loop, A2A, MCP, AG-UI, OpenTelemetry; per-agent Entra identity, scale to zero | **Don't** use the Foundry visual workflow designer (retires 1 Dec 2026). Pin MAF versions: minors have broken things |
| **Models** | Hot path: `gpt-5.4-nano/mini` or `GPT-6-Luna` · Warm: `GPT-6.1-Sol` / `gpt-5.4` · Cold (recaps, eval judge): `GPT-6 Astra` *(names per Learn docs, verify)* | Latency and cost tiering; structured JSON outputs; one call returns every persona/language variant | `model-router` for Ask the Match; **Foundry Local** as an offline fallback for judging |
| **Tools** | **Match-State MCP server** on **Azure Functions MCP triggers**, attached via the **Foundry Toolbox** | Hits "MCP integration" in the rubric; also usable from GitHub Copilot agent mode in VS Code | Azure MCP Server 2.0 for ops tasks; APIM can front it as an MCP gateway (stretch) |
| **Grounding** | **Azure AI Search** (Foundry IQ): fictional season history, glossary, Laws of the Game | Milestones and context without hallucination | Free tier is enough |
| **Real-time fan-out** | **Azure Web PubSub** (groups per match × persona × language) | Push cues to thousands of overlay clients | SignalR Service is equivalent; Web PubSub is simpler for plain WebSockets |
| **Front-ends** | React + TypeScript on **Azure Static Web Apps**: overlay player, Studio Copilot console, Scenario Lab | Free tier, GitHub Actions built in, Entra auth | AG-UI protocol for live agent state in the console |
| **Voice & language** | **Azure AI Speech** (HD neural voices, SSML) · **Azure AI Translator** (custom glossary, LLM choice) · **Voice Live** for spoken Q&A | Localisation, audio description, voiced recaps | `gpt-realtime-translate` (GA) for live commentary translation: stretch, reported deployment issues |
| **Vision (stretch)** | Detector + ByteTrack + team clustering on **Container Apps serverless GPU** (T4) | Auto-eventing scored against synthetic ground truth | Mind the **AGPL** on Ultralytics YOLO; prefer an Apache/MIT detector (e.g. RT-DETR) |
| **Analytics (stretch)** | **Fabric Real-Time Intelligence**: Eventstream → Eventhouse → Real-Time Dashboard + Activator | Hits the "Fabric" hero tech and "AI-optimised data platforms" | The Fabric trial excludes Data agent and AI features; capacity costs money unless paused |
| **Distribution (stretch)** | Event Grid → **Logic Apps** agent loop | Recap distribution; low-code agent in the chain | |

## 3. Agent roster (first cut)

| Agent | Job | Model tier | Tools | Output | Fallback |
|---|---|---|---|---|---|
| **Scout** | Detect candidate moments from metric thresholds and importance index | none / nano | `get_window`, `get_state` | `Candidate{type, event_ids, importance}` | Rules only |
| **Analyst** | Quantify: probabilities, pass difficulty, drivers, counterfactual | nano | `compute_*`, `counterfactual(event_id)` | `Insight{claim, metric, drivers[], evidence[], confidence}` | Skip the counterfactual |
| **Tactician** | Phase segmentation: control/chaos, pressure shifts, rhythm change-points | mini | `get_phases`, `get_shape` | `PhaseChange{…}` | Rules only |
| **Historian** | Milestones, records, firsts vs the fictional history | mini | AI Search | `Context{…}` | Omit context |
| **Storyteller** | Words: analyst + casual + kids variants in one structured call | Sol | glossary | `Narrative{variants}` | Template text |
| **Editor (Verifier)** | Re-check every number and name against state; style, bias and safety | nano + deterministic | `verify_claim`, Content Safety | `verdict` | Block → template |
| **Director** | Pick template, priority, `display_at`, dwell, cooldown; log rationale | rules + nano | `get_on_screen`, `publish_cue` | `OverlayCue` | Priority rules only |
| **Personaliser / Localiser** | Fan-out by persona × club × language; glossary-safe names | Luna / Translator | Translator, Speech | per-group cues | English template |
| **Recap** (A2A) | HT/FT packs, Catch Me Up, multi-format recaps | Astra | everything above | `Recap` | Text-only recap |

Human-in-the-loop: **Studio Copilot** subscribes to cues *before* `display_at` and can approve, hold, edit or retract. Retracting sends a correction cue (compensating transaction).

## 4. The Overlay Cue Contract (draft)

```json
{
  "schema_version": "0.1",
  "cue_id": "cue_000123",
  "match_id": "syn-har-kma-001",
  "template": "why_it_matters.lower_third",
  "match_clock": "67:12.4",
  "display_at_ms": 4038400,
  "dwell_ms": 7000,
  "priority": 70,
  "anchor": { "space": "pitch", "x": 75.0, "y": 40.7, "player_id": "HAR-10" },
  "payload": { "prob_before": 0.03, "prob_after": 0.17, "pass_quality": 82, "lines_broken": 2 },
  "variants": {
    "casual":  { "en-GB": "Marchetti's pass just cut out six Kingsmoor players…" },
    "analyst": { "es-ES": "Pase entre líneas de Marchetti: rompe dos líneas…" }
  },
  "evidence": ["evt-4821", "evt-4820", "trk-4038000"],
  "confidence": 0.86,
  "rationale": "Δ goal chance +14 pts (top 2% this match); viewer follows HAR",
  "approval": { "required": true, "state": "approved", "by": "producer-1", "at": "67:13.0" },
  "trace_id": "00-4bf92f…"
}
```

Adapters: our web overlay (React/SVG on the synthetic render), an **OBS/vMix browser source** (shows the cues can sit on any feed), and a stub "broadcast template" adapter that maps `template` + `payload` to a graphics engine's field names.

## 5. Engineering practices (what judges will look for)

- **Repo layout:** `src/simulator`, `src/replayer`, `src/ingest` (Functions), `src/metrics`, `src/mcp` (Functions MCP), `src/agents` (MAF workflow), `src/web` (overlay, console, lab), `infra/` (Bicep + AVM), `evals/`, `docs/adr/`, `azure.yaml`.
- **Contracts:** JSON Schema for `MatchEvent`, `Insight`, `OverlayCue`, `FanProfile`, validated at the edges and in tests.
- **Tests:** unit tests for metrics; property tests for the state reducer (same events → same state); workflow tests with a mock chat client; **golden-match replay** snapshot tests; a load test (20 matches × 10×).
- **CI/CD:** GitHub Actions with OIDC → lint/type/test → `azd provision --preview` → deploy `dev` → smoke → **Foundry evaluation gate** (groundedness, tool-call accuracy, persona fit, safety) → `demo`. Dependabot, CodeQL, secret scanning.
- **Observability:** OpenTelemetry GenAI conventions → Application Insights; a `trace_id` on every cue; SLO dashboard (p95 event→cue latency, fallback rate, verifier block rate).
- **Responsible AI:** evidence gating; Content Safety; prompt-injection tests on any free-text event field; human approval mode; "AI-generated" labels; no betting framing; prebuilt voices only; a transparency note.
- **Docs:** a judge-first README ("Judging this? Start here in 5 minutes"), architecture diagram, agent table, ADRs (e.g. *ADR-001 Agent Framework over Foundry designer workflows*), runbook for the resilience drill, cost note.
- **GitHub hero tech, used authentically:** Copilot agent mode for day-to-day work; the **Copilot coding agent** on well-scoped issues (e.g. "add metric X with tests"), with PRs left visible in the repo history; `gh` CLI scripts for release and demo setup.

## 6. Costs (lean build)

Roughly **$35–225/month, most likely under $120**, if everything scales to zero and Fabric/APIM/GPU stay off except during demos (`research/05` §7). Token maths: about **$0.25 per simulated match** on a small hot-path model, about **$4.50** on a mid-tier model. Prompt caching and "one call returns all variants" cut that further. **Set Cost Management budgets at 50/80/100% on day 1.**

Credits to check: Azure free account ($200 / 30 days), Azure for Students, Visual Studio subscriber credit, and whether the organisers provide passes (*ask*).

## 7. Top risks

| Risk | Mitigation |
|---|---|
| **Model quota** on new/free subscriptions (some models are Tier 5/6 only) | Deploy models on day 1 in two regions (Sweden Central / East US 2); request quota now; tier models; Foundry Local fallback |
| **LLM latency** breaks "live" | Template-first, broadcast delay buffer, small models, one structured call per moment, timeouts |
| **Preview features** in the demo path | Keep the core on GA services; label previews in the README |
| **Framework churn** (MAF minors) | Pin versions; upgrade in a dedicated PR with replay tests |
| **Scope** | MVP cut lines in the shortlist doc; feature freeze Oct 22 |
| **IP** | Fictional league everywhere; no real footage/data redistribution; disclaimer card |
