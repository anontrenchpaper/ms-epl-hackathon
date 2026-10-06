# Azure learning plan: learn by building this

> Goal: go from "basic Azure" to confidently designing, deploying and operating an AI-agent system on Azure **during** the hackathon, ending with portfolio-grade evidence. Every learning step below is tied to a piece of the build, so nothing is learned in the abstract.
>
> Sources: the official hackathon learning playlists (in `microsoft/insidethegamehackathon` → `RESOURCE PLAYLISTS.md`) and `research/05` §8. Verify course names and exam codes on Microsoft Learn; the research had restricted web access.

## 0. Official starting points (from the hackathon repo)

| Playlist | Link | When |
|---|---|---|
| GitHub Copilot | https://aka.ms/asn/ghcopilot | Week 0, an hour; then use it every day |
| Azure AI Foundry | https://aka.ms/asn/foundry | Week 0–1 |
| Foundry Agents | https://aka.ms/asn/foundryagents | Week 1 |
| Agentic Workflows | https://aka.ms/asn/agenticworkflows | Week 1–2 |
| Data | https://aka.ms/asn/data | Week 1 |

Reactor "Inside the Game" sessions (series S-1709, dates from search snippets, so verify): **Oct 14** AI insights apps on AKS / Container Apps · **Oct 21** Azure SQL / PostgreSQL / Cosmos DB.

## 1. The concepts that make everything else easy (learn these first, ~1 day)

1. **The resource model:** tenant → subscription → resource group → resource; regions and quotas. *Why it matters here:* model quota is our #1 risk.
2. **Identity:** Entra ID, RBAC role assignments, **managed identities** (no keys in code), Key Vault. *Exercise:* give the ingest Function a managed identity that can write to Cosmos DB, with no connection string.
3. **Infrastructure as code:** Bicep + **Azure Verified Modules**, deployed with the **Azure Developer CLI (`azd`)**. *Exercise:* `azd init` from a template, `azd up`, `azd down --purge`.
4. **Observability:** Application Insights, Log Analytics, OpenTelemetry traces. *Exercise:* follow one event from Event Hubs to an overlay cue via its `trace_id`.
5. **Cost management:** budgets, alerts, scale-to-zero. *Exercise:* set budgets at 50/80/100% before you deploy anything else.

## 2. Week-by-week, mapped to the build

| Week | You build | You learn | Hands-on resources |
|---|---|---|---|
| **0** (Oct 6–8) | Subscription, budgets, a Foundry project, model deployments, `azd` skeleton, GitHub Actions with **OIDC** (no secrets) | Resource model, identity, quotas, azd, federated credentials | `mslearn-ai-agents` lab 01 (agent in portal + VS Code); `azd` docs; "GitHub Actions + OIDC to Azure" on Learn |
| **1** (Oct 9–15) | Event Hubs → Functions (Flex) → Cosmos DB → Web PubSub; replayer on Container Apps | Event-driven architecture, triggers and bindings, change feed, scaling (KEDA) | Event Hubs, Functions, Cosmos change feed and Web PubSub quickstarts; **Reactor Oct 14** |
| **2** (Oct 16–22) | Agent Framework workflow as a Foundry hosted agent; MCP server on Functions; evaluations in CI | Agent orchestration patterns, MCP, A2A, checkpointing, human-in-the-loop, evals | `mslearn-ai-agents` labs **03 MCP**, **07 Agent Framework**, **08 multi-agent**, **09 A2A**; `microsoft/agent-framework` samples (checkpoint, HITL, hosted agents); `Azure-Samples/remote-mcp-functions-python`; **Reactor Oct 21** |
| **3** (Oct 23–27) | Resilience drill, load test, dashboards, README, video | Operational excellence, SLOs, Well-Architected, how to present architecture | Azure Architecture Center: *AI agent orchestration patterns*, *Cloud design patterns* (Retry, Circuit Breaker, Event Sourcing, CQRS, Compensating Transaction) |

## 3. A suggested split that maximises your Azure learning

If your partner leans towards data, front-end or simulation, take the **platform track**: infra, pipelines, identity, agents hosting, CI/CD, observability. It is the most transferable Azure skill set and maps directly to AZ-204/AZ-400-style work. Pair on the agent workflow so you both understand it end to end.

## 4. After the hackathon (turn it into credentials)

- **AZ-204 (Developing Solutions for Microsoft Azure):** much of it you will have done for real (Functions, Cosmos DB, Event Hubs, identity, monitoring).
- **The AI engineer exam** (AI-102, or its 2026 successor focused on agents; research suggests "AI-103", *verify on Learn*).
- **Microsoft Applied Skills** credentials for agents/Foundry: shorter, practical assessments, good for a CV.
- **AZ-400** later if DevOps appeals.

## 5. Portfolio checklist (what makes this CV-worthy whether or not we win)

- [ ] Public repo with a judge-first README, architecture diagram, ADRs and a one-command deploy (`azd up`)
- [ ] The 2-minute demo video, plus a longer 5–8 minute technical walkthrough
- [ ] A write-up blog post: "Building a real-time multi-agent explain layer on Azure", covering what worked, what didn't, cost, latency numbers
- [ ] The published synthetic dataset + datasheet (citable)
- [ ] An open-source Match-State MCP server others can reuse
- [ ] Evaluation results (groundedness, latency SLOs) in the README: real numbers beat adjectives
- [ ] LinkedIn post tagging the hackathon, with the video
