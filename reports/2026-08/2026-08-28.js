// 2026-08-28 LLM / Agent 科研日报
window.RESEARCH_REPORTS.push({
  "date": "2026-08-28",
  "title": "LLM / Agent 科研日报",
  "generatedAt": "2026-08-28 09:58（北京时间）",
  "brief": {
    "summary": "今日严格筛选 6 篇，A/B/C 为 3/3/0。最重要的共同主题是 Agent 行为供应链的权限与状态边界：Harness 会把低权限 Tool/Skill 内容重构为更高权限指令；持久 Agent 需要跨查询的信息流控制；工业自演化系统开始训练专门模型决定下一次系统该如何修改；同时 Harness 的确定性约束、Benchmark 的可重放构建和 Loop Runtime State 都成为需要独立版本化的基础设施。",
    "trendAssessment": "本期覆盖 2026-08-27 提交并进入当前公开窗口的 v1 新发论文、当前批次中此前未收录的 v1 新公开工作，以及 2026-08-26 21:30 UTC 更新的 Loop Engineering v2。对 LLM/Agent 供应链安全最直接的趋势是：必须同时保存 instruction provenance、Harness reconstruction rule、跨查询 artifact label、Tool/Skill 权限、Runtime state、Verifier/Benchmark provenance，并在这些组件发生版本变化后执行行为与安全回归。"
  },
  "topPicks": [
    "context-gets-root",
    "spa-persistent-ifc"
  ],
  "topPickRationales": {
    "context-gets-root": "本期最值得精读。论文揭示的是 Harness 层的权限提升：低权限 Tool/Skill 内容在 Context Reconstruction 中被重新包装成 user/system 级有效指令，即使模型本身遵循 instruction hierarchy、自动权限审查也可能被绕过。它直接对应 Skill/Tool/Prompt/Harness 的行为供应链边界，适合扩展为 instruction provenance、Harness-SBOM 和跨 Harness 安全回归。",
    "spa-persistent-ifc": "SPA 把持久 Agent 的防御从单轮 Prompt Injection 推进到跨查询状态安全：规划阶段一次性生成声明式计划，执行阶段通过双格信息流控制限制数据/控制流，并把持久化 Artifact 的安全标签带到后续查询。AgentDojo/AgentDojo-MQ 上攻击成功率可降至约 0–0.2%，但效用损失明显，适合作为跨查询 Runtime Policy 与 Memory/Artifact provenance 的系统基线。"
  },
  "papers": [
    {
      "id": "context-gets-root",
      "title": "When Context Gets Root: Privilege Escalation in LLM Harnesses",
      "url": "https://arxiv.org/abs/2608.27299",
      "authorsAndInstitutions": "作者列表以 arXiv 摘要页为准；论文首页可靠标注机构包括 Nanjing University 与 Honor Device Co., Ltd.。完整作者—机构映射本轮未可靠提取，因此不进一步猜测。",
      "qualitySignals": "作者与机构信号：强/中，南京大学与荣耀机构来源可靠；版本动态：v1 新发，2026-08-27 16:03:57 UTC；开源与数据：未可靠查到官方代码或数据入口。",
      "openSourceAndData": "未可靠查到",
      "tags": ["Agent Security", "Agent Harness", "Prompt Injection", "Tool Use", "Agent Skill", "Runtime Policy", "Supply-chain Security"],
      "summary": "证明 Agent Harness 的 Context Reconstruction 会把低权限 Tool/Skill 内容提升为更高权限指令，从而形成模型权限层之外的指令权限提升。",
      "importance": "现有 Agent 安全通常假设 system/user/tool 消息的权限层级能一路保持到模型输入，但真实 Harness 会把工具输出、Skill Body、项目指令、Sub-agent 结果重新拼装进新的上下文。只要重构过程丢失原始 provenance，模型看到的最终消息层级就可能与内容真实来源不一致。",
      "methodHighlights": "论文统一分析 Claude Code、Codex、Gemini CLI、Qwen Code、OpenCode 等 Coding-Agent Harness 的 Context Reconstruction，并构造 tool-to-user、tool-to-system、delegation、persistent goal、scheduled task、custom sub-agent 等权限提升路径。威胁模型刻意假设模型侧 instruction hierarchy 正确、权限 reviewer 正常，从而把根因隔离到 Harness。",
      "keyFindings": "在 unrestricted execution 条件下，13 个攻击目标在测试的 6 个 Harness 上均可实现；在支持自动权限审查的 3 个 Harness 上，13 个目标也均可实现。论文报告 tool-to-user escalation 后平均攻击成功率约 97.3%，tool-to-system 平均每次尝试约 80.3%，并展示持久目标与计划任务可把一次内容注入转化成后续持续行为。",
      "limitations": "主要针对 Coding-Agent Harness 与作者构造的攻击目标；不同版本 Harness 的具体重构实现可能快速变化。攻击可行性不等于所有默认部署都会产生同样危害，且论文未可靠提供官方开源复现包。",
      "inspiration": "论文直接结论：Instruction Hierarchy 只有在 Harness 保留原始来源与权限时才有意义，Context Reconstruction 本身可以成为权限提升点。研究启发：为每段进入模型上下文的内容绑定 origin、privilege、artifact hash 和 reconstruction path，构建 Instruction-Provenance Graph；Skill、Tool、AGENTS.md/CLAUDE.md、Sub-agent 结果和持久任务都应进入 Harness-SBOM，并在 Harness 更新后重新跑权限回归。",
      "valueJudgment": "非常值得精读并做独立复现，是当前 Agent Harness/Skill 供应链安全非常直接的研究切口。",
      "priority": "A"
    },
    {
      "id": "spa-persistent-ifc",
      "title": "SPA: Securing Persistent LLM Agents Across Queries with Plan-First Information-Flow Control",
      "url": "https://arxiv.org/abs/2608.27234",
      "authorsAndInstitutions": "Dylan Girrens、Guangjing Wang；University of South Florida。",
      "qualitySignals": "作者与机构信号：中，USF 机构可靠确认；版本动态：v1 新发，2026-08-27 15:17:18 UTC；开源与数据：未可靠查到官方代码或数据入口。",
      "openSourceAndData": "未可靠查到",
      "tags": ["Agent Security", "Persistent Agent", "Information Flow Control", "Prompt Injection", "Memory", "Runtime Policy"],
      "summary": "通过计划优先、隔离执行和跨查询标签传播，对持久 Agent 的数据流与控制流执行信息流控制，限制 Prompt Injection 沿持久状态传播。",
      "importance": "持久 Agent 会把工具结果、文件和历史 Artifact 留给之后的查询。攻击者如果能在一次查询中污染内容，后续任务即使没有再次出现攻击文本，也可能沿 Memory/Artifact 继续受影响；单轮 Prompt Guard 无法覆盖这一跨查询传播路径。",
      "methodHighlights": "Planner 每个查询只调用一次，先生成完整声明式计划；Executor 不再自由重规划，而在隔离环境中执行。系统使用双格信息流控制同时追踪 confidentiality/integrity，并将执行结果持久化为带安全标签的 Artifact；后续 Planner 只读取语义元数据而非未经约束的原始值，从结构上限制污染数据重新成为高权限指令。",
      "keyFindings": "在 tool_knowledge 攻击下，论文报告 AgentDojo 攻击成功率为 0.0%，AgentDojo-MQ 为约 0.2%。安全性存在明显效用代价：具体工具 + IFC 配置在 AgentDojo-MQ 的基线任务效用约 35.3%，而无 IFC 的对应基线约 62.5%；抽象工具模式可进一步压低攻击率，但效用更低。",
      "limitations": "Plan-first 结构限制了在线重规划能力；IFC label、Tool abstraction 和 semantic metadata 设计本身成为新的可信基础。论文安全收益伴随明显 utility loss，且未可靠查到官方实现，真实生产 Tool/Memory 的标签维护成本仍待验证。",
      "inspiration": "论文直接结论：跨查询 Persistent Agent 需要把信息流标签与 Artifact 一起持久化，而不能只保护单次 Prompt。研究启发：Memory/Artifact-SBOM 应记录 source、integrity/confidentiality label、plan id、tool version、write/read edge 与 declassification decision；MCP/Tool 结果进入长期 Memory 前执行 label-aware admission。",
      "valueJudgment": "非常值得精读，适合与 AgentRewind、Agentic Transaction、Runtime-SBOM 连起来做跨查询状态安全研究。",
      "priority": "A"
    },
    {
      "id": "astar-evolution",
      "title": "Astar: Learning to Propose Evolution Directions for Self-Evolving Industrial AI Systems",
      "url": "https://arxiv.org/abs/2608.27287",
      "authorsAndInstitutions": "Jinxin Hu、Hao Deng、Haibo Xing、Lingyu Mu、Muyu Zou、Weiqin Yang、Sirui Chen、Bohao Wang、Zhezheng Hao、Hao Zhang、Zulong Chen、Shizhun Wang、Yu Zhang、Xiaoyi Zeng、Jiawei Chen；Alibaba Group、Zhejiang University。",
      "qualitySignals": "作者与机构信号：强，Alibaba Group + Zhejiang University；版本动态：v1 新发，2026-08-27 15:56:40 UTC；开源与数据：未可靠查到官方代码、训练语料或模型入口。",
      "openSourceAndData": "未可靠查到",
      "tags": ["Self-evolving Agent", "Agent Harness", "Industrial AI", "RL", "Software Engineering", "Evaluation"],
      "summary": "训练专门模型从工业系统历史迭代中学习“下一步应该改什么”，把自演化系统最依赖专家经验的 evolution direction proposal 自动化。",
      "importance": "自演化 Agent/AI 系统往往已经能自动写代码、训练和评测，但“应该尝试哪个改动”仍由高级工程师决定。该步骤一旦自动化，就成为影响整个后续代码、训练和部署链的高权限决策点。",
      "methodHighlights": "从真实历史 Commit 构建 evolution corpus，通过 pairwise expansion、执行逻辑过滤和 evolution-intent 去噪处理稀疏、噪声监督；随后采用 mid-training、SFT 和 RL，并用层级提示缩小方向空间、以 Reward Model 作为低成本代理评估器。最终部署到 Lazada 广告系统进行连续演化建议。",
      "keyFindings": "Astar-8B 在真实执行评测中的单提案成功率为 0.6786，明显高于人类专家 0.3229 和最强通用 LLM 0.3071。连续两周 20 轮迭代后，Hitrate@200 提升 23.6%；线上 A/B 测试相对提升 GMV 4.86%、广告收入 1.82%。",
      "limitations": "训练高度依赖特定工业系统历史，跨公司、跨系统迁移能力未知；Reward Model 代理可能引入 Goodhart/评估偏差。论文目标是优化业务指标，不是安全，因此 evolution proposal 是否引入不安全依赖、权限或供应链风险没有系统纳入 Gate。",
      "inspiration": "论文直接结论：Evolution Direction 本身可以被学习并在生产系统持续使用。研究启发：自演化系统应把 proposer model、历史 corpus snapshot、reward model、candidate patch、验证证据和上线结果全部纳入 Evolution-SBOM；安全策略、依赖扫描和行为 regression suite 必须作为 proposer 无权修改的外部控制面。",
      "valueJudgment": "值得精读。直接安全贡献弱于 Top 2，但生产部署和真实迭代闭环的质量信号很强。",
      "priority": "A"
    },
    {
      "id": "harness-predictability",
      "title": "Harness Engineering for Predictable Agentic Systems: An Empirical Study of Deterministic Execution Constraints",
      "url": "https://arxiv.org/abs/2608.26197",
      "authorsAndInstitutions": "Saransh Dhage；Independent Researcher。",
      "qualitySignals": "作者与机构信号：弱/中，单作者独立研究；版本动态：v1 新公开，原始提交 2026-08-25 07:46:50 UTC，进入当前 arXiv 公开批次；开源与数据：未可靠查到官方代码或数据入口。",
      "openSourceAndData": "未可靠查到",
      "tags": ["Agent Harness", "Deterministic Execution", "Coding Agent", "Evaluation", "Runtime Policy"],
      "summary": "用逐层确定性约束研究 Harness 是否真的能提高 Agent 的可重复性、任务成功率和 Token 效率，并显示不成熟约束反而可能造成回归。",
      "importance": "“更严格 Harness 会更可靠”经常被当作工程直觉，但不同约束可能与模型推理方式冲突。若没有逐层消融，Harness 升级导致的行为变化很容易被误归因给模型。",
      "methodHighlights": "构造分阶段 Harness，从初始约束逐步加入 structured planning 等确定性执行机制，在多个模型与任务域上重复运行，测量 Repeatability/Determinism 指标、任务成功、Token 和 Latency，并比较每一层约束的增量效应。",
      "keyFindings": "初始 Harness 并不稳定改善可重复性，例如 Qwen legal 从 0.79 降至 0.68、Gemma legal 从 0.56 降至 0.38；加入 Structured Planning 后，4 个 model×task cell 中 3 个 RR/DI 达 1.000，剩余 Qwen finance 为 0.980，3/4 cell 任务成功率达到 100%。Token 相比基线下降约 14.8%–16.7%；但 Latency 对模型依赖明显，Qwen 加速约 14.2%–24.7%，Gemma 反而增加约 41.4%–47.0%。",
      "limitations": "任务和模型范围有限，且作者为单作者研究；确定性/可重复不等于安全或正确。不同 Agent 产品的 Tool/Prompt/Loop 实现差异可能使具体数字无法迁移。",
      "inspiration": "论文直接结论：Harness 约束需要实测，初始约束可能恶化可靠性，结构化规划才是主要收益来源之一。研究启发：Harness 更新应记录逐层 Constraint Diff，并将 reproducibility、success、latency、token、security regression 一起纳入兼容矩阵，而不是把“更确定”当作天然正向属性。",
      "valueJudgment": "值得阅读和轻量复现，适合作为 Harness 版本回归与可预测性度量参考。",
      "priority": "B"
    },
    {
      "id": "bts-agentbench",
      "title": "BTS-AgentBench: A Deterministic, Replayable Pipeline from Read-Only Telemetry Logs to Agent Benchmarks",
      "url": "https://arxiv.org/abs/2608.27334",
      "authorsAndInstitutions": "作者列表来自 arXiv 摘要页；机构本轮未可靠查到。",
      "qualitySignals": "作者与机构信号：未可靠查到；版本动态：v1 新发，2026-08-27 16:35:52 UTC；开源与数据：官方 GitHub https://github.com/kjy7567/BTS-AgentBench。",
      "openSourceAndData": [{"label":"官方代码与 Benchmark","url":"https://github.com/kjy7567/BTS-AgentBench","note":"论文官方仓库，包含 benchmark 构建与复现材料。"}],
      "tags": ["Agent Benchmark", "Evaluation", "Provenance", "Telemetry", "Tool Use", "Software Engineering"],
      "summary": "把工业只读 Telemetry Log 编译成确定、可重放、可审计的 Agent Benchmark，并用构建一致性与排除控制证明任务并非被数据泄漏或构造捷径污染。",
      "importance": "Agent benchmark 往往缺少构建 provenance：数据如何从生产日志变成任务、工具状态如何生成、训练/验证/测试怎么切分，都会影响评测可信度。若这些环节不可重放，模型/Agent 版本对比就难以归因。",
      "methodHighlights": "从只读 telemetry 出发，以 deterministic compiler 生成多轮任务、逻辑 Tool Store 与 split；设计 contract preflight、construction-exclusion controller 和独立双构建一致性校验，并把同一 pipeline 迁移到第二个工业数据域测试可移植性。",
      "keyFindings": "主发布包含 532 个任务，contract preflight 为零发现，construction-exclusion controller 完成 0/532；两次独立构建在 11 个逻辑 Tool Store export 上完全一致，并精确复现 356/87/89 的 train/dev/test split。迁移到 XAI4HEAT 后产生 204 个 episode，其中 41 个 held-out；控制器仍为 0，GPT-5.5 在 retained execution 上达到 41/41。",
      "limitations": "Benchmark 来自只读 telemetry，无法覆盖真实写操作副作用与授权风险；工业数据经过编译后仍可能保留领域特定偏差。论文重点是 benchmark provenance 而不是 Agent 安全本身。",
      "inspiration": "论文直接结论：工业日志可以被编译成确定、可重放的 Agent Benchmark，并通过构建控制证明其可审计性。研究启发：Evaluation-SBOM 应记录 raw-log snapshot、compiler version、tool-store hash、split manifest、controller result 与 evaluator version；用于 Agent 安全 benchmark 时可进一步加入权限和攻击轨迹。",
      "valueJudgment": "值得阅读和直接运行官方仓库，对可复现 Agent 评测和 Evaluation Supply Chain 很有价值。",
      "priority": "B"
    },
    {
      "id": "loop-engineering-v2",
      "title": "Loop Engineering: Building Blocks, Adoption, and Impact",
      "url": "https://arxiv.org/abs/2608.21884",
      "authorsAndInstitutions": "Jai Lal Lulla、Vahram Nersesyan、Seyedmoein Mohsenimofidi、Christoph Treude、Sebastian Baltes；Singapore Management University、Heidelberg University。",
      "qualitySignals": "作者与机构信号：强/中，SMU + Heidelberg，软件工程实证团队；版本动态：旧论文 v2 更新，v1 为 2026-08-22 09:52:23 UTC，v2 为 2026-08-26 21:30:44 UTC；开源与数据：Supplementary Material 已公开在 Zenodo，包含扫描脚本、heuristic catalog、结果数据、标注协议与代码本、逐仓库证据及归档 GitHub Actions 历史。",
      "openSourceAndData": "官方 Zenodo Supplementary Material 已公开；论文正文提供 DOI 链接，本轮未稳定提取具体 DOI 文本",
      "tags": ["Agent Harness", "Loop Engineering", "Coding Agent", "Runtime State", "Verifier", "Software Engineering", "Supply-chain Security"],
      "summary": "系统化定义“Loop Engineering”——由触发器自动启动 Agent、以机器可检查条件停止、维护持久状态和验证器，并实证测量其在开源仓库中的真实采用情况。",
      "importance": "越来越多 Coding Agent 不再由人逐轮 Prompt，而是由 schedule/repository event 自动触发并持续执行。此时真正决定风险的不只是模型，而是 trigger、stop condition、persistent state、verifier、token budget 和 human escalation；这些通常散落在 CI、配置和外部 Runtime 中。",
      "methodHighlights": "先系统梳理灰色文献，提炼 Loop 的核心组成，再对 36,710 个软件仓库进行启发式扫描并人工复核 256 个候选；同时分析哪些 Loop 特征能从版本库稳定观察，哪些 Runtime State 天然不可见。",
      "keyFindings": "研究确认 256 个 heuristic candidate 中有 217 个真实 autonomous loop，约占扫描仓库的 0.59%；启发式 precision 为 0.868（95% CI 0.820–0.907）。仓库通常提交 loop configuration，但几乎没有提交文献所建议的持久状态文件，Runtime State 大量留在版本控制之外；扫描中也几乎看不到显式 stop condition、budget file、verifier-subagent reference 或 cost log。",
      "limitations": "研究依赖仓库可见痕迹，因此最关键的云端 Runtime State、Secret、Scheduler 和 Provider-side 配置可能不可见；0.59% 不是整个生态真实采用率。v2 仍为 exploratory mining，受作者规则与关键词覆盖影响。",
      "inspiration": "论文直接结论：自动 Agent Loop 已真实存在，但其 Runtime State 和治理证据往往不进入版本控制。研究启发：Loop-SBOM 应跨 Git + CI + Scheduler + Agent Runtime 保存 trigger、stop condition、state artifact、verifier、budget、model/harness version 和 escalation policy，否则传统软件 SBOM 无法覆盖自动 Agent 的真实执行供应链。",
      "valueJudgment": "值得阅读和持续跟踪。直接算法创新不强，但对 Agent Runtime/CI 供应链的现实采用和可审计性非常有价值。",
      "priority": "B"
    }
  ]
});
