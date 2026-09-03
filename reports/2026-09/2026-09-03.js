// 2026-09-03 LLM / Agent 科研日报
window.RESEARCH_REPORTS.push({
  "date": "2026-09-03",
  "title": "LLM / Agent 科研日报",
  "generatedAt": "2026-09-03 10:00（北京时间）",
  "brief": {
    "summary": "今日严格筛选 6 篇，A/B/C 为 3/3/0。主线集中在多日自主开发中的 Harness-of-Harness、自改进级联中的 Verifier 盲区、Tool 使用边界学习、长程 Agent 轨迹折叠、Multi-Agent 多错误依赖归因，以及 Agent 安全评测的构念有效性。最直接的供应链安全信号是：Harness、Verifier、Tool Router、Trace Compiler 与评测协议都已经成为会改变 Agent 行为和安全判断的独立软件依赖。",
    "trendAssessment": "本期对应 2026-09-02 arXiv 最新公开批次，入选 6 篇均为 2026-09-01 提交的 v1 新发论文，未发现更值得纳入的 v2/v3 当日重要更新。对 LLM/Agent 供应链安全而言，建议继续扩展 Harness-SBOM、Evaluation-SBOM、Tool/MCP-SBOM 与 Trace/Runtime-SBOM：记录 Harness 版本、角色权限、Verifier、Tool Router、Trace Schema、Benchmark 协议与独立验证证据，并在这些组件更新后做行为和安全回归。"
  },
  "topPicks": [
    "harness-of-harness",
    "cheap-verifiers-blind-spots"
  ],
  "topPickRationales": {
    "harness-of-harness": "本期最值得精读。HoH 直接把现有 Coding Agent Harness 外再加一层持续规划—开发—独立 QA 循环，并显式维护 artifact state、evidence state、角色权限和版本化历史。三类 harness–model 配置上三轮平均相对提升 52.25%，最大 82.86%；FrontierSWE 上 Codex+GPT-5.5 从 HoH@3 的 39.33% dominance 继续升到 HoH@10 的 72.67%。上海人工智能实验室团队，GitHub 与项目页均已开放。对 Harness-SBOM、长期 Agent 状态治理与软件供应链回归高度直接。",
    "cheap-verifiers-blind-spots": "这篇揭示 Evaluation/Verifier 供应链中的核心闭环风险：廉价 Verifier 的盲区会随着 Student 变强而扩大，而系统所有内部指标又通过同一个 Verifier 计算，导致真实交付错误率可升到 32%，Dashboard 仍稳定显示约 3%。强 Verifier 可把盲区降至约 0.05，但需要对近一半 hard-MATH 流量付 frontier 成本。官方代码、数据和图表脚本已开放，适合直接复现并扩展到 Skill/Harness Promotion Gate。"
  },
  "papers": [
    {
      "id": "harness-of-harness",
      "title": "Harness-of-Harness: Multi-Day Autonomous Software Development with Continual Improvement",
      "url": "https://arxiv.org/abs/2609.01481",
      "authorsAndInstitutions": "Haoyang Yan、Min-le Su、Hangfan Zhang、Zhanhao Li、Chen Zhang、Shao Zhang、Yang Chen、Lei Bai、Shuyue Hu；论文首页确认机构为 Shanghai Artificial Intelligence Laboratory（上海人工智能实验室）。",
      "qualitySignals": "作者与机构信号：强，上海人工智能实验室；版本动态：v1 新发，2026-09-01 16:17:18 UTC 提交；开源与数据：官方 GitHub https://github.com/Flesymeb/HarnessOfHarness ，项目页 https://flesymeb.github.io/HarnessOfHarness/ ，包含游戏、开发轨迹与展示材料。",
      "openSourceAndData": "官方 GitHub：https://github.com/Flesymeb/HarnessOfHarness；项目页：https://flesymeb.github.io/HarnessOfHarness/",
      "tags": ["Coding Agent", "Agent Harness", "Software Engineering", "Runtime Policy", "Agent Skill", "MCP", "Supply-chain Security"],
      "summary": "在现有 Coding Agent Harness 之上增加持续规划、开发、独立 QA 与跨循环状态管理，使自主软件项目能够跨数十轮持续改进。",
      "importance": "单次 Coding Agent episode 很难覆盖真实软件项目的长期演化。随着修改累积，Agent 会遗忘早期需求、重复修复、破坏已验证行为，或把自测结果误当最终验收。HoH 把 artifact state 与 evidence state 分离，并让 Planner、Developer、QA Tester 拥有不同权限和证据边界，从而把长期开发变成可版本化、可验证的循环。",
      "methodHighlights": "HoH 固定底层 model+harness，外层运行 planning–coding–testing 循环。Planner 只读当前项目并结合历史证据选择一个有界增量；Developer 是唯一写入者，执行 baseline–change–retest；QA 对冻结候选进行独立黑盒/白盒验证。计划、报告、历史通过 progressive disclosure 暴露；MCP、专家模型和领域工具按角色组织，Markdown Skill 提供按需指导；项目和证据都保留版本历史。",
      "keyFindings": "在 GameCraft-Bench、FrontierSWE、ProgramBench 的 Codex+GPT-5.5、OpenCode+DeepSeek-V4-Pro、Pi+MiniMax-M3 三组配置中，HoH@3 平均相对提升 52.25%，最大提升 82.86%。GameCraft-Bench 在相同三次开发 pass 下，HoH 71.52 对 Vanilla Continuation 58.24；FrontierSWE 的 Codex+GPT-5.5 dominance 从 Vanilla 27.33%、HoH@3 39.33% 提升到 HoH@10 72.67%。多日案例完成 70+ 循环，记录 81 个问题，65 个关闭，17 个曾因后续回归而重新打开。",
      "limitations": "主实验每个 task-condition 只运行一次模型生成，模型客户端不提供统一随机种子；多日 FPS 案例是单个开放式项目，不能直接代表一般软件开发；HoH 增加额外 token 和执行成本，且角色权限、Skill/MCP、版本历史本身也成为新的高权限依赖。",
      "inspiration": "论文直接结论：跨循环 artifact continuity、evidence continuity 与独立 QA 能显著改善长期自主软件开发。研究启发：Harness-SBOM 应记录底层 harness/model、角色权限、MCP/Skill、artifact commit、evidence packet、QA verifier 和 rollback point；任何 Harness、Tool 或 Skill 更新后都应触发回归并绑定被验证候选的不可混淆身份。",
      "valueJudgment": "非常值得精读并直接运行官方仓库。适合作为长期 Coding Agent、Harness 治理和 AI 软件供应链研究的基础系统。",
      "priority": "A"
    },
    {
      "id": "cheap-verifiers-blind-spots",
      "title": "Cheap Verifiers, Large Blind Spots: Measuring the Reliability Cost of Cost-Saving Cascades",
      "url": "https://arxiv.org/abs/2609.01345",
      "authorsAndInstitutions": "Dushyant Rajput；论文首页确认机构为 AltSlate Labs LLP。",
      "qualitySignals": "作者与机构信号：中，工业研究机构，单作者；版本动态：v1 新发，2026-09-01 14:53:41 UTC 提交；开源与数据：官方 GitHub https://github.com/AltSlate-Labs/cascade-blindspot ，包含代码、数据、测量文件和图表脚本。",
      "openSourceAndData": "官方代码与数据：https://github.com/AltSlate-Labs/cascade-blindspot",
      "tags": ["Evaluation", "Verifier", "Self-improvement", "Safety", "LLM Cascade", "Evaluation Supply-chain"],
      "summary": "证明廉价 Verifier 驱动的自改进级联会系统性漏掉 Student 的错误，而且系统自身的 Dashboard 可能完全看不见真实质量恶化。",
      "importance": "很多 Agent/LLM 系统用廉价模型处理大多数请求，再把难例交给强模型验证，并进一步把 Verifier 拒绝的样本用于 Student 自我改进。如果 Verifier 的盲区同时决定放行、训练数据和监控指标，整个系统会形成闭环偏差：错误既不会被纠正，也不会被监控看到。",
      "methodHighlights": "论文在 GSM8K、hard-MATH 等任务上实测不同 Student/Verifier 规模组合，定义 Verifier blind spot β，即 Student 错误但 Verifier 接受的比例；随后运行基于 Verifier 拒绝样本的 corrective fine-tuning 闭环，并对比真实 gold error 与系统内 verifier-estimated error。作者还给出两群体守恒解释，说明内环指标可持续改善而真实质量不变或恶化。",
      "keyFindings": "固定 gpt-4o-mini Verifier 时，β 随 Student 从 0.5B 扩到大模型由约 0.12 上升到最高约 0.55，并在 7B–32B 区间形成高位平台；hard-MATH 上使用强 Verifier 可把 β 降到约 0.05–0.09，但约 46% 查询需要升级到强模型。Qwen2.5-7B + gpt-4o-mini 的 corrective loop 中，系统 Dashboard 始终约 3% error，而真实用户侧 error 从 14% 升至 32%；naive corrective fine-tuning 在测试的 cross-family 与 same-family Teacher 下均未改善小 Student，反而退化。",
      "limitations": "部分训练实验只有单 seed；结论集中在 QA/数学级联，不等同于所有 Agent Judge 场景；理论上界依赖论文的两群体抽象。强 Verifier 能缓解盲区，但会显著削弱原本的成本优势。",
      "inspiration": "论文直接结论：任何通过自身 Verifier 计算的指标，都不能单独证明该自改进级联可靠。研究启发：Evaluation-SBOM 应保存 Verifier 型号/版本、盲区审计集、gold/外部验证、false accept/false reject、升级率和训练数据来源；Skill、Harness 或 Agent 更新的 Promotion Gate 必须有独立于生成闭环的外部验证器。",
      "valueJudgment": "非常值得精读和直接复现。对自演化 Agent、Judge/Verifier 可靠性和 Evaluation Supply Chain 高度相关。",
      "priority": "A"
    },
    {
      "id": "cobra-tool-boundary",
      "title": "CoBRA: Learning Tool-Use Boundaries via Counterfactual Margins",
      "url": "https://arxiv.org/abs/2609.00967",
      "authorsAndInstitutions": "Wenhao Zou（WeChat, Tencent；University of Chinese Academy of Sciences）、Xianglong Liu、Wendong Bi、Hanjie Wang（WeChat, Tencent）、Simin Zhao（Wuhan University）；论文 HTML 的最后一位作者/邮箱排版存在错位，本日报不据此进一步推断。",
      "qualitySignals": "作者与机构信号：强，腾讯微信团队 + 国科大/武汉大学，且论文被 EMNLP 2026 接收；版本动态：v1 新发，2026-09-01 09:24:11 UTC 提交；开源与数据：当前未可靠查到已公开官方代码仓库，论文仅说明在许可允许时发布代码/Prompt/派生元数据。",
      "openSourceAndData": "未可靠查到已公开官方代码/数据入口",
      "tags": ["Tool Use", "Agent", "RAG", "MCP", "Runtime Policy", "Evaluation"],
      "summary": "用同一模型的“无 Tool”和“强制 Tool”反事实轨迹估计工具的实例级边际价值，并据此训练 Agent 学会什么时候真正该调用 Tool。",
      "importance": "Agent 不仅会因 Tool 使用错误失败，也会因“本不该调用却调用”产生额外成本、噪声、隐私暴露和错误传播。传统 Router 多依据绝对置信度或最终 Reward，无法直接回答 Tool 对当前实例的边际收益。",
      "methodHighlights": "CoBRA 从同一 Qwen3-4B 构造 internal/external expert，对同一 Query 分别无工具回答和强制检索，计算 reward margin，将数据划分为 internal-favored、external-favored 和 ambiguous。随后用 clear-margin 样本做 Boundary-Aware SFT，再通过 MARS-RL 的 reference-split rollout、分支归一化和 counterfactual marginal advantage 优化工具边界。",
      "keyFindings": "一般 QA 中，强制 Tool Expert 相比内部 Expert 的 jEM 在 in-domain 提升 19.15pp、OOD 提升 27.88pp，说明 Tool 有价值但并非所有实例都需要。在生产规模音乐场景，训练后 tool-call rate 从 39.3% 降到 25.1%，agentic hybrid reward 从 2.428 升到 2.680；离线 Hit@5/平均相关性达到 0.93/0.77，高于 internal-only 0.83/0.62、tool baseline 0.85/0.63 和 cold-start 0.90/0.70，factuality 为 0.997。",
      "limitations": "核心实验主要围绕 Qwen3-4B 与检索 Tool，尚未覆盖多模型、多 Tool、可执行 MCP/高风险 API；边际估计依赖 scorer、retriever 和 paired rollout 质量；成本主要按调用次数建模，未完整纳入隐私、安全、延迟和真实 API 价格。",
      "inspiration": "论文直接结论：Tool 使用应按实例级反事实边际收益学习，而不是固定阈值或任务类别。研究启发：Tool/MCP-SBOM 可记录 Tool version、schema、cost、risk、counterfactual benefit 与 route decision；高权限 Tool 的边际收益目标应进一步加入安全/权限成本，避免“任务有帮助”被误当作“可安全调用”。",
      "valueJudgment": "非常值得精读。对 Tool/MCP 选择、Runtime Policy 和最小必要调用研究具有直接价值。",
      "priority": "A"
    },
    {
      "id": "parsing-live-trace",
      "title": "Parsing the Stream: A Live Trace Model for Long-Horizon Agents and Their Observers",
      "url": "https://arxiv.org/abs/2609.01466",
      "authorsAndInstitutions": "Egor Pakhomov、Erik Nijkamp；论文首页确认均来自 Salesforce AI Research。",
      "qualitySignals": "作者与机构信号：强，Salesforce AI Research；版本动态：v1 新发，2026-09-01 16:03:54 UTC 提交；开源与数据：官方 GitHub https://github.com/SalesforceAIResearch/tracelab ，官方 Hugging Face 数据集 https://huggingface.co/datasets/Salesforce/tracelab-comprehend 。",
      "openSourceAndData": "代码：https://github.com/SalesforceAIResearch/tracelab；数据：https://huggingface.co/datasets/Salesforce/tracelab-comprehend",
      "tags": ["Long-horizon Agent", "Trace", "Observability", "Agent Memory", "Runtime State", "Evaluation"],
      "summary": "把不断增长的 Agent 原始轨迹折叠为 append-only 事件账本与类型化运行状态，并分别编译成人类观察者和 Agent 自身需要的视图。",
      "importance": "长程 Agent Trace 同时超出人类监控者和 Agent Context Window 的可处理范围。直接总结全文会丢失可审计结构，直接塞全量历史又成本高、容易失败。论文把 Trace 视为运行时数据结构，而不是一串聊天文本。",
      "methodHighlights": "系统维护 append-only event ledger，并增量 fold 为 typed run state，再针对 observer/agent 两类消费者生成不同编译视图。研究一方面用监控问题测观察者视图，另一方面用 120-link 顺序依赖任务测 Agent 侧 running-statistic state，并与 full-context、scratchpad 等策略对照。",
      "keyFindings": "观察者侧，编译视图相对受预算限制的 raw-trace 单次读取使用约 14–15× 更少输入 token、成本低 5–7×，准确率 0.85–0.87 对 0.48。Agent 侧 120-link clean protocol 中，fold 30/30 成功，full-context 8/30；但 prompt-level scratchpad 也达到 30/30 且成本更低（约 $0.97/run 对 fold $1.59），因此 fold 的额外优势主要是确定性可审计和同时服务观察者。",
      "limitations": "部分监控问题与 view schema 共设计，作者明确限制可迁移结论；合成 benchmark 与系统共同开发；scratchpad 在该任务上更便宜，说明复杂 fold 并非所有场景都必要；真实个人 working transcript 因隐私未开放。",
      "inspiration": "论文直接结论：类型化、可审计的 Trace Fold 可以显著压缩观察和 Agent 续接成本。研究启发：Trace/Runtime-SBOM 应记录 event schema、fold version、source event id、consumer view 与 compaction transform；Harness 或 Trace Compiler 更新后需要验证关键信息是否丢失、权限/安全事件是否被摘要覆盖。",
      "valueJudgment": "值得精读并运行官方代码。适合 Agent Observability、Runtime State 和可审计上下文管理。",
      "priority": "B"
    },
    {
      "id": "edge-error-dependency",
      "title": "EDGE: Error Dependency Graph-Guided Multi-Error Attribution in Multi-Agent LLM Systems",
      "url": "https://arxiv.org/abs/2609.01360",
      "authorsAndInstitutions": "Jun Hou、Priya Pitre、Yi Fang、Xuan Wang；论文首页确认均来自 Virginia Tech。",
      "qualitySignals": "作者与机构信号：强，Virginia Tech，论文正式发表于 EMNLP 2026；版本动态：v1 新发，2026-09-01 15:00:54 UTC 提交；开源与数据：官方 GitHub https://github.com/JuneHou/EDGE ，包含代码和实验 Artifact。",
      "openSourceAndData": "官方代码与实验 Artifact：https://github.com/JuneHou/EDGE",
      "tags": ["Multi-agent", "Agent Evaluation", "Error Attribution", "Causal Analysis", "Observability", "Safety"],
      "summary": "把 Multi-Agent Trace 中多个错误显式组织为依赖图，并用反事实 rollout 验证因果子图，从而比单一 root-cause 归因更接近真实错误传播。",
      "importance": "Multi-Agent 系统中的一个上游错误常会诱发后续多个表面错误。只标记“哪个 Agent/哪一步错了”无法区分根因与传播后果，也难以决定修复位置。对安全事件而言，这会造成错误归因和无效修复。",
      "methodHighlights": "EDGE 从观测错误事件构建 Error Dependency Graph，再使用 counterfactual rollout 验证更可靠的 causal subset；图结构引导两阶段 LLM-as-judge 归因。实验覆盖 TRAIL（GAIA 与 SWE-Bench，148 条长 Trace、841 个错误实例）和 MAST（393 条 AG2 Multi-Agent Trace、1,560 个正类标签）。",
      "keyFindings": "EDGE 在多数模型/设置上提高多错误类别归因。TRAIL-GAIA 的 parent recall 中，GPT-oss-120B 的 Planning/Coordination 从 9.0 提升到 46.6（+37.6pp），Mistral-Small 从 7.4 到 31.2（+23.8pp），Gemini-2.5-Pro 从 26.5 到 50.8（+24.3pp）；但部分 System Execution recall 会下降，说明图传播并非无条件有益。论文所有 headline 数字为单次运行点估计。",
      "limitations": "LLM 推理具有非确定性，作者明确不保证复现实验得到完全相同数字；图构建与反事实验证仍依赖当前错误抽取和 Judge；部分类别/指标出现负增益，说明错误传播模型可能把错误关联放大。",
      "inspiration": "论文直接结论：错误之间的依赖结构是比孤立 root-cause 更有用的诊断先验。研究启发：Multi-Agent Runtime-SBOM 可将 message/action/tool/error 组织为因果 lineage，安全事件发生时区分 original violation、propagated failure 与 repair attempt，并将 graph version/judge version 纳入审计。",
      "valueJudgment": "值得精读并使用官方 Artifact。对 Multi-Agent Debugging、Failure Provenance 和 Safety Incident Attribution 有较高价值。",
      "priority": "B"
    },
    {
      "id": "guardrail-construct-validity",
      "title": "When Guardrails Look Effective: Construct Validity Failures in LLM Agent Commerce Evaluation",
      "url": "https://arxiv.org/abs/2609.01519",
      "authorsAndInstitutions": "Peiying Zhu（Blossom AI）、Sidi Chang（Blossom AI Labs）；论文首页分别标注 San Francisco 与 Tokyo。",
      "qualitySignals": "作者与机构信号：中，工业研究团队；版本动态：v1 新发，2026-09-01 16:48:13 UTC 提交；开源与数据：arXiv 直接提供匿名官方 Artifact https://anonymous.4open.science/r/a2a-evaluation-artifact-staging-2F25/ 。",
      "openSourceAndData": "官方匿名 Artifact：https://anonymous.4open.science/r/a2a-evaluation-artifact-staging-2F25/",
      "tags": ["Agent Evaluation", "Guardrails", "Evaluation Supply-chain", "Multi-agent", "Safety", "Human-Agent Interaction"],
      "summary": "审计一个 LLM Agent 商业仿真案例，证明 Guardrail 的表面收益可能来自协议、采样和激励设置差异，而不是 Guardrail 本身。",
      "importance": "Agent Safety 评测很容易把“模拟输出看起来像政策效果”误当成真正测到了对应安全机制。如果 guarded/unguarded 条件的 Tool Schema、Chooser、Agent Incentive 或采样协议同时变化，就无法把最终指标差异归因于 Guardrail。",
      "methodHighlights": "论文提出 construct-validity contract，依次检查 incentive validity、protocol isolation、stochastic stability 和 welfare accounting；一旦任一关键条件不满足，就返回 INVALID/INCONCLUSIVE，而不是继续做政策结论。案例在可配置酒店买卖 Agent Testbed 中重新控制 offer schema、buyer chooser 和多次生成。",
      "keyFindings": "原实现报告三组 welfare gain 为 +87.4、+35.0、+28.8；固定 schema 与 buyer chooser 后变为 +7.2、-13.9、+23.8。14B 条件下四个最大单生成 effect 平均 +229，但每个 profile-condition 做三次生成后均值仅 +37.6，95% bootstrap CI [-34.2,109.3]，generation residual 占 49.9% 变异。最终原结果因 protocol isolation 被判 INVALID，控制后研究仍因 incentive/stochastic stability 不足而 INCONCLUSIVE。",
      "limitations": "这是一个特定商业仿真案例和较小 Workshop 论文，不能证明一般 Guardrail 无效；实验集中于 Qwen2.5 1.5B–14B 梯度；构念有效性 Contract 需要研究者预先明确待测机制，开放式 Agent Safety 场景可能更复杂。",
      "inspiration": "论文直接结论：在协议、激励和随机稳定性未验证前，Agent Guardrail 的表面效果不可归因。研究启发：Evaluation-SBOM 应锁定 Agent Prompt、Tool/Offer Schema、Chooser、Sampling、Judge、Seed/replicate 与目标机制；Safety Benchmark 必须先做 construct-validity preflight，再比较系统版本。",
      "valueJudgment": "值得阅读并借鉴其评测协议，尤其适合 Agent Safety Benchmark 和 Guardrail 实验设计。",
      "priority": "B"
    }
  ]
});
