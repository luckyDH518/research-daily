// 2026-09-11 LLM / Agent 科研日报
window.RESEARCH_REPORTS.push({
  "date": "2026-09-11",
  "title": "LLM / Agent 科研日报",
  "generatedAt": "2026-09-11 10:00（北京时间）",
  "brief": {
    "summary": "今日严格筛选 6 篇，A/B/C=3/3/0。主线集中在 Skill 的执行形态、程序约束审计、Harness 自演化、Tool 菜单依赖、共享 Memory 内核化和黑盒 Agent 红队。对 LLM / Agent 供应链安全而言，最值得关注的是 Skill/Subagent 边界、可执行契约、Harness patch provenance、Tool dependency path 与 Memory kernel policy。",
    "trendAssessment": "Agent 系统正在把越来越多行为从模型本身外移到 Harness、Skill、Tool menu、Memory kernel 和 verifier 中。研究重点也从单纯提升任务成功率转向：这些外部行为依赖如何被模块化、约束、审计和安全更新。今天没有值得纳入的 v2/v3 重要更新。"
  },
  "topPicks": ["subagents-vs-agent-skills", "contracteval"],
  "topPickRationales": {
    "subagents-vs-agent-skills": "直接回答 Skill 应该如何执行：同一 Skill 包作为主上下文注入还是独立 Subagent，会产生显著不同的长程行为。Cornell + Microsoft Research Cambridge，围绕 SkillsBench 和 OpenHands 做受控比较，适合延展 Skill 执行隔离、输入输出契约和 Skill-BOM。",
    "contracteval": "把自然语言 Prompt/Policy/SOP 转成查询激活的义务图，再与实际 Trace 对齐，能发现输出看似正确但跳过前置检查、分支或不变量的结构性失败。Oracle Health AI + MBZUAI；非常适合做 Harness/Runtime Policy 合规审计和评测供应链。"
  },
  "papers": [
    {
      "id": "subagents-vs-agent-skills",
      "title": "Subagents vs Agent Skills: Executing Reusable Knowledge for Long-Horizon Agentic Tasks",
      "url": "https://arxiv.org/abs/2609.09233",
      "authorsAndInstitutions": "Wasu Top Piriyakulkij、Rachel Lawrence、Alicia Curth、Sushrut Karmalkar、Niranjani Prasad；Cornell University、Microsoft Research Cambridge。",
      "qualitySignals": {
        "authorInstitution": "强：Cornell University + Microsoft Research Cambridge。",
        "version": "v1 新公开；原始提交 2026-09-07 20:14 UTC，进入 2026-09-10 arXiv 新公开批次。",
        "openSource": "未可靠查到论文对应的官方代码/数据仓库。"
      },
      "openSourceAndData": "未可靠查到",
      "tags": ["Agent Skill", "Subagent", "Agent Harness", "Long-horizon Agent", "Supply-chain Security"],
      "summary": "证明同一个 Skill 包在长程任务中若以独立 Subagent 执行，并具有清晰输入输出契约，可比直接把 SKILL.md 注入主上下文更稳健。",
      "importance": "现有 Agent Skill 通常把说明文件加载进主 Agent 上下文，随着 Tool Trace、历史和 Skill 增多会持续挤占上下文；Skill 内容正确并不代表执行形态正确。",
      "methodHighlights": "在 OpenHands + SkillsBench 上比较两种执行方式：主 Agent 直接读取 Skill，或将同一 Skill 包封装为独立 Subagent。作者从成功轨迹合成带输入/输出契约的程序化 Skill，并额外加入干扰 Tool 测试上下文压力。",
      "keyFindings": "原始、缺少 I/O 契约的 SkillsBench Skill 上，直接 Skill 注入不弱于 Subagent；换成程序化、契约驱动 Skill 后趋势反转，Subagent 在各模型上占优。GPT-5.3 Codex 与 Kimi K2.6 条件下，Subagent 在超过 80% 任务中降低峰值上下文长度，但总 Token 成本更高。",
      "limitations": "主实验仅覆盖 SkillsBench 的 64 个可合成任务和 OpenHands；Subagent 的优势依赖 Skill 足够自包含，且会增加通信 Token。没有直接测试恶意 Skill、权限隔离或跨 Subagent 信息泄漏。",
      "inspiration": "论文直接结论：Skill 的执行方式本身是关键设计变量。研究启发：Skill-BOM 不应只记录文件，还应记录 executionMode、input/output contract、allowed tools、context boundary 与 parent-child delegation policy，并对 Skill→Subagent 转换做安全回归。",
      "valueJudgment": "非常值得精读，适合直接延展 Agent Skill 执行隔离与供应链安全。",
      "priority": "A"
    },
    {
      "id": "contracteval",
      "title": "ContractEval: Query-Conditioned Execution Matching for Procedural Instruction Conformance",
      "url": "https://arxiv.org/abs/2609.09458",
      "authorsAndInstitutions": "Praphul Singh、Shanu Kumar、Akshat Agarwal、Ganesh Kumar；论文首页可靠显示 Oracle Health AI、MBZUAI，完整作者—机构映射未完全可靠解析。",
      "qualitySignals": {
        "authorInstitution": "强 / 中：Oracle Health AI + MBZUAI 来源可靠。",
        "version": "v1 新公开；原始提交 2026-09-08 21:21 UTC，进入 2026-09-10 公开批次。",
        "openSource": "作者声明将发布 framework、audited contracts、prompts 与 benchmark artifacts；截至本轮未可靠查到已开放官方仓库。"
      },
      "openSourceAndData": "未可靠查到（论文声明将发布）",
      "tags": ["Agent Evaluation", "Runtime Policy", "Trace", "Compliance", "Supply-chain Security"],
      "summary": "将自然语言程序、Prompt 或 Policy 转成查询激活的义务图，再检查 Agent 的输出/Trace 是否真正满足必须的前置条件、分支、顺序和不变量。",
      "importance": "Agent 最终答案可能表面正确，但实际跳过资格检查、先后依赖或安全约束；输出评分和普通 Trace Judge 都缺少‘这次查询到底必须满足哪些义务’的显式分母。",
      "methodHighlights": "先把 Instruction Artifact 编译成层次任务网络，再按用户查询裁剪为 active obligation graph；随后从输出/Trace 提取 observed graph，通过层次匹配检测 omission、wrong branch、ordering、extra action、invariant breach 与 output-contract violation。",
      "keyFindings": "10 个 audited contracts、200 个 clean executions、1,400 个总案例中，4 个 output-only Judge 平均检测率 0.495、定位率 0.400；trace-aware Judge 为 0.570/0.468，最强 trace-aware Judge 仍漏掉 29.0% 的扰动。Gold expected/observed graphs 条件下 ContractEval 检测并定位全部受控扰动。",
      "limitations": "目前是 10-contract 的受控 SOP 型测试；真实 Agent 的 Tool failure、retry、多轮恢复和复合失败更复杂。自动图抽取仍依赖 LLM，不能视作合规保证。",
      "inspiration": "论文直接结论：程序遵循需要显式表示 query-active obligations。研究启发：可把 Harness Prompt、Skill 说明、MCP Policy 和组织 SOP 编译为 Policy-BOM/Contract Graph，并在 Runtime Trace 上做结构化合规回归。",
      "valueJudgment": "非常值得精读，适合作为 Agent Runtime Policy 与评测供应链的基础方法。",
      "priority": "A"
    },
    {
      "id": "robustsgpo",
      "title": "RobustSGPO: Search-Space Control for Agent Harness Evolution",
      "url": "https://arxiv.org/abs/2609.09646",
      "authorsAndInstitutions": "Zibo Zhao 等 12 人；Wuhan University、Kuaishou Technology。",
      "qualitySignals": {
        "authorInstitution": "强：武汉大学 + 快手科技。",
        "version": "v1 新公开；2026-09-09 03:00 UTC 提交，进入 2026-09-10 公开批次。",
        "openSource": "未可靠查到官方代码仓库。"
      },
      "openSourceAndData": "未可靠查到",
      "tags": ["Agent Harness", "Self-evolution", "Prompt Optimization", "Evaluation", "Supply-chain Security"],
      "summary": "给自动 Harness 优化增加明确的 edit scope、patch 校验、版本保留和迁移重评估，避免语义梯度搜索只在局部 Prompt 修改里反复打转。",
      "importance": "Harness 自演化真正的难点不只在‘生成一个更好的 Prompt’，还在允许改什么、实际改了什么、错误 patch 是否被拒绝，以及任务分布变化后旧版本能否安全复用。",
      "methodHighlights": "将每轮修改拆成 requested edit、patch construction/check、retained snapshot search；候选必须通过静态/安全检查和 paired replay 才能接纳，并按 edit category 保存替代版本，任务转移时重新评分。",
      "keyFindings": "120 tasks、95 runs、7,350 candidate attempts。周期 1→2→3 权限调度比固定最大权限最终 test score 高 0.28；RobustSGPO 在 30 个 held-out tasks 上 completion 从 60.0% 提至 80.0%，质量 3.77→4.14。",
      "limitations": "实验集中于 AgentX brainstorming workflow，搜索预算高达 20M tokens；没有直接覆盖安全攻击、恶意 Harness patch 或真实 Coding Agent runtime。",
      "inspiration": "论文直接结论：Harness Evolution 需要显式控制搜索空间与历史版本。研究启发：Harness-SBOM 应记录 parent snapshot、requested scope、actual diff、validator、replay evidence、promotion/rollback state，避免自动优化产生不可审计漂移。",
      "valueJudgment": "值得精读，和自演化 Harness 的版本治理高度相关。",
      "priority": "A"
    },
    {
      "id": "state-path-tool-menu",
      "title": "The Menu Is an Execution Prior: State-Path Tool Menus for Online Agents",
      "url": "https://arxiv.org/abs/2609.09395",
      "authorsAndInstitutions": "Bo Yan、Weikai Lin、Song Wang；University of Central Florida、University of Rochester。",
      "qualitySignals": {
        "authorInstitution": "强 / 中：UCF + University of Rochester；EMNLP 2026 Main。",
        "version": "v1 新公开；2026-09-08 19:46 UTC 提交。",
        "openSource": "官方 GitHub 已开放。"
      },
      "openSourceAndData": "https://github.com/Met2348/State-Path",
      "tags": ["Tool Use", "Agent", "MCP", "Tool Routing", "Runtime Policy"],
      "summary": "把 Tool Menu 视为执行先验：不仅选择和请求最相关的工具，还显式补齐产生后续参数所需的前置 Tool，并按可执行顺序排序。",
      "importance": "大 Tool Library 中只做语义相关性检索容易只找到最终动作，却漏掉生成其输入的前置工具；Agent 因而不是‘不会调用’，而是根本没拿到完整可执行链。",
      "methodHighlights": "构建 state-path encoder 表示当前状态下可执行 Tool、输出—输入依赖与历史路径；retriever 先覆盖入口、缺失输入 producer 和 final action，再由 reranker 把 producer 放到 consumer 前。",
      "keyFindings": "ToolBench 在线成功率从 0.737 提至 0.898；32-tool State-Path menu 的完整链覆盖高于官方 128-tool list。只加结构化 input/output 字段即可使 dependency-edge accuracy 提升 4.8pp、path-replay success 提升 5.0pp。",
      "limitations": "重点是 Tool 可用性与执行链，不直接评价权限、恶意 Tool 或副作用安全；菜单构建 P95 约 0.55 秒，也引入额外运行时组件。",
      "inspiration": "论文直接结论：Tool Menu 会塑造可执行路径。研究启发：Tool/MCP-SBOM 应记录 producer-consumer dependency、state precondition、menu version 与 routing evidence；安全 Router 可以在完整链上进一步叠加权限与风险约束。",
      "valueJudgment": "值得精读并运行官方代码。",
      "priority": "B"
    },
    {
      "id": "kernel-managed-shared-memory",
      "title": "Kernel-Managed Shared Memory for System-Wide Personalization",
      "url": "https://arxiv.org/abs/2609.10144",
      "authorsAndInstitutions": "Ryan Lum、Yongfeng Zhang；Rutgers University, Department of Computer Science。",
      "qualitySignals": {
        "authorInstitution": "强 / 中：Rutgers University，机构由论文 PDF 首页可靠确认。",
        "version": "v1 新公开；2026-09-09 提交，进入 2026-09-10 公开批次。",
        "openSource": "未可靠查到本文独立官方代码或数据仓库。"
      },
      "openSourceAndData": "未可靠查到",
      "tags": ["Agent Memory", "Multi-agent", "Privacy", "Runtime Policy", "Agent Kernel"],
      "summary": "将多 Agent 共享 Memory 的检索、隐私过滤和 Prompt 注入统一放到系统内核，而不是让每个 Agent 各自管理长期记忆。",
      "importance": "多 Agent 系统中如果每个 Agent 独立检索和注入用户信息，隐私边界、写入顺序和检索策略会分散到多个应用层实现，容易产生不一致。",
      "methodHighlights": "在 AIOS 上实现 kernel-managed shared memory：Agent 只写结构化、带标签的 Memory，由 Kernel 集中完成排序、隐私执行、检索和上下文注入，并与 Mem0、标准 RAG 注入和全量上下文拼接比较。",
      "keyFindings": "3 个模型、1,800 trials。与相同底层存储的 unmanaged Mem0 相比，个性化评分提升 2.4–4.0/5；GPT-4o profile usage 从 1.05 到 4.69。相对 full-context，2/3 模型性能统计持平，同时端到端延迟下降 15%–61%。",
      "limitations": "论文重点是个性化收益和系统效率，尚未系统评测恶意 Memory 写入、跨 Agent prompt injection、撤销或访问控制绕过。",
      "inspiration": "论文直接结论：Memory 管理适合作为系统级能力集中治理。研究启发：Memory-SBOM 可把 writer identity、tag、privacy label、retrieval policy、injector/kernel version 与 consumer agent 绑定，为跨 Agent Memory provenance 和最小披露提供基础。",
      "valueJudgment": "值得阅读，尤其适合多 Agent Memory 权限与治理方向。",
      "priority": "B"
    },
    {
      "id": "black-box-agent-redteam",
      "title": "Black-Box Red Teaming of Agentic AI: A Taxonomy-Driven Framework for Automated Risk Discovery",
      "url": "https://arxiv.org/abs/2609.09647",
      "authorsAndInstitutions": "Divyanshu Kumar、Nitin Aravind Birur、Tanay Baswa、Sahil Agarwal、Prashanth Harshangi；Enkrypt AI。",
      "qualitySignals": {
        "authorInstitution": "中：Enkrypt AI；论文标注 AAAI Workshop on LLM-based Multi-Agent Systems。",
        "version": "v1 新公开；2026-09-09 03:00 UTC 提交。",
        "openSource": "未可靠查到官方代码或数据仓库。"
      },
      "openSourceAndData": "未可靠查到",
      "tags": ["Agent Security", "Red Teaming", "Multi-agent", "Tool Use", "Prompt Injection"],
      "summary": "提出只依赖系统基本描述的 Agent 黑盒红队框架，用七类风险 taxonomy 自动生成多步对抗场景并分析不同 Agent 架构的风险。",
      "importance": "生产 Agent 会读取不可信输入、调用真实 Tool 并持久化状态，单轮聊天安全测试无法覆盖规划、Memory、Tool 和多 Agent 协作产生的组合风险。",
      "methodHighlights": "SAGE-RT 按七个风险域自动生成每域 120 个 adversarial scenarios，以 CrewAI 单 Agent 和 AutoGen 多 Agent、4 个基础模型进行黑盒执行，并用 LLM Judge + 人工验证分类风险。",
      "keyFindings": "论文报告平均 governance risk 56.25%，多 Agent privacy risk 65%，部分 agent-behavior vulnerability 达 85%。结果显示架构选择本身显著影响安全暴露面。",
      "limitations": "风险比例依赖生成场景和 LLM Judge；只覆盖 CrewAI/AutoGen 与有限模型，且没有公开 Artifact，复现信号弱于今日其他论文。",
      "inspiration": "论文直接结论：无需内部访问也能系统发现 Agent 架构级风险。研究启发：可将黑盒 red-team cases 与 Harness/Skill/MCP 版本绑定，形成每次组件升级后的 Safety Regression Corpus。",
      "valueJudgment": "值得阅读并跟踪后续 Artifact，适合作为 Agent 安全评测框架补充。",
      "priority": "B"
    }
  ]
});
