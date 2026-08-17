// 2026-08-17 LLM / Agent 科研日报
window.RESEARCH_REPORTS.push({
  "date": "2026-08-17",
  "title": "LLM / Agent 科研日报",
  "generatedAt": "2026-08-17 10:02（北京时间）",
  "brief": {
    "summary": "今日严格筛选 5 篇值得看的论文：A 级 3 篇、B 级 2 篇、C 级 0 篇。arXiv 已进入 2026-08-17 周一公开批次。本期主线集中在 Harness、事务式运行时、MCP 项目记忆与协议级授权：HELIX 把 Harness 拆成可追踪、可组合、可审计的干预单元，并把执行结果转成下一轮模型更新数据；Agentic Transaction 将 Skill、Tool、Workspace 与 Memory 纳入语义 ACID 约束；MOOSEDev 用带 provenance、lifecycle、supersession 的知识图谱替代纯向量式项目记忆；Mandato 将授权约束下沉到 MCP 协议代理；LSP 研究则说明工具接口是否更“语义化”并不自动意味着更省 token 或更可靠。",
    "trendAssessment": "今日趋势非常适合用 Behavioral SBOM 来理解：真正需要版本化和回归的不只是模型，还包括 Harness recipe、runtime policy、Skill hub、Memory schema、MCP tool interface、授权 mandate、workspace state 与 verifier。与 LLM/Agent 供应链安全最直接的是 HELIX 的 source-traceable harness、Agentic Transaction 的失败状态隔离与事务式 Skill、MOOSEDev 的 memory provenance/supersession，以及 Mandato 的签名授权链。质量信号方面，Agentic Transaction 来自清华并开放官方代码；MOOSEDev 有 NeSy 2026 Industry Track 接收信号与官方 benchmark artifact；HELIX 与 LSP 论文均提供官方代码。今日未发现比这些更值得纳入的 v2/v3 重要更新。"
  },
  "topPicks": [
    "helix",
    "agentic-transaction"
  ],
  "topPickRationales": {
    "helix": "优先精读，因为它直接把 Harness 定义为可版本化、可组合、可追溯的行为依赖，而不是模糊的‘外部脚手架’。HELIX 将不同 Agent runtime 分解为 typed ports、atoms、recipes、product shells 和 runtime policies，并为每次 rollout 绑定 recipe、lockfile、模型、轨迹、测试、workspace effect 与 policy evidence。65 个候选中找到比 Pi 任务覆盖率高 4.0% 的固定 Harness，完整 portfolio 的 verified coverage 最多增加 58.0%，还能产生 438 条 SFT/critic/filter/preference 训练记录。对 Harness-SBOM、模型升级兼容矩阵和递归自我改进安全非常直接；官方代码已由 arXiv 原文给出。",
    "agentic-transaction": "优先精读，因为它把 Agent 的长程执行明确建模为具有语义 Atomicity、Consistency、Isolation、Durability 的 transaction，并把 Skill、Tool、Memory、Workspace 与 recovery 放进同一运行语义。清华团队在 KramaBench 上报告 ACID-Agent 相对 Claude Code 最高提升 10.6 个百分点；去掉 failed-step isolation 后环境域得分下降 11.7 个百分点，直接说明失败状态传播会污染后续执行。官方代码已开放，适合扩展为 Tool/Skill side-effect、rollback、idempotency 与 transaction-aware provenance benchmark。"
  },
  "papers": [
    {
      "id": "helix",
      "title": "HELIX: Model-Harness Co-evolution for Recursive Self-Improvement",
      "url": "https://arxiv.org/abs/2608.13951",
      "authorsAndInstitutions": "Tianyu Fan、Chao Huang。论文 HTML 未可靠标注作者机构，机构未可靠查到。",
      "qualitySignals": "作者与机构信号：未可靠查到；版本动态：arXiv:2608.13951 v1，2026-08-14 04:44:53 UTC 提交，进入 2026-08-17 周一公开批次；开源与数据：arXiv 原文提供官方 GitHub `HKUDS/HELIX`，并描述了可导出的 verified sibling records。",
      "openSourceAndData": [
        {
          "label": "HELIX 官方 GitHub",
          "url": "https://github.com/HKUDS/HELIX",
          "note": "arXiv HTML 原文直接提供"
        }
      ],
      "tags": ["Agent Harness", "Self-improvement", "Behavioral Dependency", "Supply-chain Security", "Coding Agent", "Provenance"],
      "summary": "把不同 Agent runtime 分解成可组合、可锁定、可审计的 Harness 组件，并将 Harness 演化产生的成败轨迹同时用于当前执行优化和下一轮模型更新。",
      "importance": "Agent 的行为不仅由模型决定，system prompt、context construction、tool schema、permission、turn loop、retry、compaction、stopping 和 verifier 都由 Harness 控制。若模型升级而 Harness 固定，或 Harness 自动变化却没有 provenance，就难以判断能力变化来自哪里，也难以安全地复现、回滚和生成训练数据。",
      "methodHighlights": "HELIX 将 OpenCode、Pi Mono、Nanobot、Hermes Agent 抽象为 typed ports、common/personality atoms、packs、recipes、product shells 与 runtime policies。每个 recipe 经编译后生成确定性 lockfile，并在运行前做 conformance、boundary、source-purity 检查；运行后 evidence plane 绑定 recipe、模型、任务、尝试次数、runtime trace、workspace effect、verifier 与 policy evidence。框架把一次 Harness evolution 同时当成 deployment optimization 和 verified sibling data generation。",
      "keyFindings": "完整 product contract 暴露 96 个 ports；理论组合空间为 4^5=1,024 或独立选择 acceptance 时 4^6=4,096。实际一轮评估 65 个候选，找到一个固定 Harness 比 Pi 的 task coverage 高 4.0%；完整 portfolio 的 post-hoc verified coverage 最多提高 58.0%。对选中成员做 repeated run 和官方 SWE-bench 验证后，200-slot sibling slice 产生 438 条可用于 SFT、critic、filter 与 preference 的 verified records。",
      "limitations": "目前只验证了一轮 code-repair Harness evolution，尚未完成论文设想中的多轮模型更新—Harness rebuild 闭环。Portfolio oracle coverage 不是可直接部署的路由性能；不同 Harness 组件的具体因果贡献也未被完全分离。自动演化 Harness 本身会扩大权限、tool schema、retry policy 与安全规则变化的攻击面。",
      "inspiration": "论文直接结论：Harness 是模型行为和后续训练数据的共同决定因素，必须保持干预身份、配置和证据可追踪。研究启发：建立 Harness-SBOM，记录 `model × recipe × lockfile × prompt × tools × permission policy × turn loop × acceptance × verifier`，模型或 Harness 任一升级时重新做跨版本行为回归，并把 policy violation、unsafe permission 与 regression sibling 纳入训练数据。",
      "valueJudgment": "非常值得精读和复现，直接适合作为 Harness 供应链、递归自我改进安全与 Behavioral SBOM 的基础系统。",
      "priority": "A"
    },
    {
      "id": "agentic-transaction",
      "title": "Agentic Transaction: Towards ACID-Compliant Agent Systems",
      "url": "https://arxiv.org/abs/2608.13900",
      "authorsAndInstitutions": "Zhaoyan Sun、Xiaoxiao Wang、Guoliang Li；论文 HTML 首页均标注 Tsinghua University。",
      "qualitySignals": "作者与机构信号：强，清华大学数据库团队；版本动态：arXiv:2608.13900 v1，2026-08-14 03:13:54 UTC 提交，进入 2026-08-17 公开批次；开源与数据：官方 GitHub `TsinghuaDatabaseGroup/ACID-Agent` 已开放，包含 Agent 实现、KramaBench 集成、Docker 执行环境与 trace/cost logging。",
      "openSourceAndData": [
        {
          "label": "ACID-Agent 官方 GitHub",
          "url": "https://github.com/TsinghuaDatabaseGroup/ACID-Agent",
          "note": "论文 HTML 与官方仓库直接对应"
        }
      ],
      "tags": ["Agent", "Runtime Policy", "Agent Skill", "Memory", "Transaction", "Supply-chain Security"],
      "summary": "将长程 Agent 执行重新解释为语义事务，用 Atomicity、Consistency、Isolation、Durability 管理 Tool、Skill、Workspace、Memory 和失败恢复。",
      "importance": "长程 Agent 会修改文件、调用外部工具、并行运行 sub-agent 并维护持久状态，单个失败步骤如果直接写入 workspace 或 memory，可能污染后续整个轨迹。传统 ReAct 式执行缺乏统一的 commit、rollback、isolation 与 durability 语义。",
      "methodHighlights": "论文提出 Semantic Atomicity/Consistency/Isolation/Durability。ACID-Agent 将 exploration-execution-validation 视为事务单元，只在验证通过后 commit；失败步骤隔离，不写入后续 memory/workspace。Skill hub 被设计为带事务保障的复用单元；consistency 结合执行错误、decision/code confidence divergence 与 LLM reflection；并行 Agent 使用隔离 workspace 与依赖感知协调；durability 通过 transaction-aware memory、append-only workspace 和 provenance trace 实现。",
      "keyFindings": "KramaBench 含 104 个任务、1,700 个真实数据文件、24 个数据源和 6 个领域。Qwen3.5-397B-A17B 下，Claude Code 总分 64.0，ACID-Agent 74.6；论文将其概括为最高 10.6 个百分点提升。GLM-5.2 下为 74.2 对 77.4。环境域三次运行中，Claude Code 为 63.9±30.9，ACID-Agent 为 88.9±18.6。消融中去掉 failed-step isolation 后环境域由 90.0 降到 78.3，下降 11.7 个百分点。",
      "limitations": "当前主要是 data-agent proof of concept，事务语义并未覆盖所有不可回滚的真实外部副作用。系统使用多个 LLM-based confidence/reflection 组件，本身仍可能误判；为了更可靠的探索与验证增加了 code steps、token 和成本。论文中的 ACID 是语义类比与系统设计原则，不等同于数据库层面的严格形式化保证。",
      "inspiration": "论文直接结论：失败状态隔离、commit-or-retry 与 transaction-aware memory 可提高 Agent 的稳定性。研究启发：把 Tool/Skill 的 side-effect、idempotency key、compensation、workspace snapshot、memory commit 与 model/harness version 纳入 Runtime-SBOM；对 MCP server、Skill 与外部 SaaS 建立可声明的 transaction capability 和 rollback contract。",
      "valueJudgment": "非常值得精读和跑官方代码。适合发展成 Agent runtime safety、Tool/Skill side-effect 控制和事务式供应链依赖研究。",
      "priority": "A"
    },
    {
      "id": "moosedev",
      "title": "Ontology-Grounded Project Memory for Coding Agents",
      "url": "https://arxiv.org/abs/2608.13662",
      "authorsAndInstitutions": "James Adam；论文 HTML 首页标注 Trivyn。",
      "qualitySignals": "作者与机构信号：中，工业团队 Trivyn，论文已被 NeSy 2026 Industry Track 接收；版本动态：arXiv:2608.13662 v1，2026-08-13 18:03:00 UTC 提交并进入当前公开批次；开源与数据：官方 GitHub `Trivyn/moosedev` 提供 benchmark harness、CodeGraph corpus export、public-corpus transcripts 与逐项 verdict。",
      "openSourceAndData": [
        {
          "label": "MOOSEDev 官方 GitHub",
          "url": "https://github.com/Trivyn/moosedev",
          "note": "论文 HTML 直接提供，含 bench artifacts"
        }
      ],
      "tags": ["Coding Agent", "Agent Memory", "MCP", "Provenance", "Knowledge Graph", "Software Engineering"],
      "summary": "把 Coding Agent 的项目记忆表示成带类型、生命周期、provenance 与 supersession 关系的知识图谱，并通过 MCP 暴露给 Agent。",
      "importance": "传统 Markdown/向量记忆很难回答‘哪些决策仍然有效’‘哪项规则已被新决策取代’‘当前集合是否完整’‘某项约束是否不存在’等结构性问题。对长期 Coding Agent 而言，错误或过期记忆会直接影响架构决策和后续改动。",
      "methodHighlights": "MOOSEDev 用两个小型 OWL ontology 与 SHACL shape 表示 architecture decisions、lessons、constraints、rationales、anti-patterns；记录携带 author、timestamp、lifecycle 与 supersession。底层 MOOSE 引擎将 LLM 视为受限传感器，结构匹配、ontology traversal、evidence fusion 和 trace 主要是确定性的。系统通过 MCP 提供 typed capture、context retrieval、NL/SPARQL query、lifecycle 与 integrity 工具。",
      "keyFindings": "在中立公开语料中构建 835 个 typed records，并与生产 vector-memory 条件比较。Set completeness、negation、supersession traversal 上，typed graph 分别达到 1.00、0.98、0.98；Mem0 为 0.18、0.06、0.27，notes search 为 0.08、0.00、0.12。简单 relevance retrieval 上差距较小：graph coverage 0.82，Mem0 约 0.67–0.90；最大规模 634 records 时 graph hit@5 0.84、Mem0 0.60。四组 reversal、四个模型、两种 delivery regime 的 40 次测试中，graph 全部返回 current answer。",
      "limitations": "核心 neurosymbolic engine MOOSE 是专有系统，公开 benchmark 可以复现比较但不能完整复现生产引擎。结构化查询在大集合上 token 成本可能很高，例如 122-item completeness 约 78k–167k tokens。论文是公司内部长期使用的 case study，外部项目与多团队协作下的 ontology 建模成本仍需验证。",
      "inspiration": "论文直接结论：项目记忆中的 supersession、absence、set-completeness 等结构问题不能可靠地只靠 top-k 向量检索解决。研究启发：Memory-SBOM 应记录 `record type × origin × author × timestamp × lifecycle × supersedes × affected component × validity`，MCP 返回 memory 时附带 provenance 与 current/superseded 状态，并在代码或依赖版本变化时自动 invalidate 相关 memory。",
      "valueJudgment": "值得精读和运行 benchmark artifact。对 Coding Agent Memory provenance、MCP 项目记忆和长期配置债务非常直接。",
      "priority": "A"
    },
    {
      "id": "mandato",
      "title": "Mandato: Protocol-Level Enforcement of Digitally Signed Mandates on AI Agent Actions with Cryptographically Chained Audit Trails",
      "url": "https://arxiv.org/abs/2608.14074",
      "authorsAndInstitutions": "Giovanni Racioppi；机构未可靠查到。",
      "qualitySignals": "作者与机构信号：未可靠查到；版本动态：arXiv:2608.14074 v1，2026-08-14 08:33:43 UTC 提交，进入 2026-08-17 公开批次；开源与数据：摘要仅描述 reference system implementation status 与 quantitative evaluation plan，本轮未可靠查到官方代码或数据入口。",
      "openSourceAndData": "未可靠查到官方代码、数据或 benchmark。",
      "tags": ["MCP", "Agent Security", "Authorization", "Runtime Policy", "Audit", "Supply-chain Security"],
      "summary": "提出一个对 MCP/tool call 透明的治理代理，以数字签名 mandate 约束 Agent 可调用的工具、参数、上下文和有效期，并把允许/拒绝决策写入哈希链审计日志。",
      "importance": "当前 Agent 的工具授权通常写在应用代码或 prompt 中，难以独立验证授权主体、授权期限、参数范围和委派链，也很难证明某次动作确实经过了当时有效的授权检查。",
      "methodHighlights": "Mandato 将授权表示成 machine-readable、cryptographically signed mandate，声明 principal、允许工具、参数约束、上下文条件、有效期和代表谁行动。MCP-transparent proxy 在 protocol 层对每个 tool call 做 mandate-chain decision，分离 decision point 与 enforcement point，并记录 permit/deny 及证据到 append-only hash-chained audit log；论文还讨论 qualified timestamp 和法规映射。",
      "keyFindings": "当前论文主要给出 mandate model、decision semantics、reference architecture 与 implementation status，并提出后续量化评测计划，包括 enforcement overhead、audit completeness 和 tamper-evidence verification cost。论文尚未报告足够的实证数字，因此不能把其安全有效性视为已验证结论。",
      "limitations": "缺少已完成的大规模实验、攻击评测和真实 MCP 生态兼容性数据。数字签名只能证明 mandate 来源与完整性，不能证明授权策略本身合理；mandate-chain 解析、撤销、时钟、身份密钥和 proxy 本身都会成为新的可信计算基与供应链依赖。",
      "inspiration": "论文直接结论：Tool/MCP 授权可以从应用内部逻辑提升为可签名、可审计的协议级 artifact。研究启发：把 `principal × delegate × MCP server × tool × parameter constraint × policy version × validity × revocation` 纳入 Capability-BOM，并与 Skill/MCP package 签名、运行日志和不可逆动作审批联动。",
      "valueJudgment": "方向高度相关，值得阅读其授权数据模型，但由于定量验证尚未完成，优先级低于今天三篇有实证和开放 artifact 的工作。",
      "priority": "B"
    },
    {
      "id": "lsp-coding-agents",
      "title": "Does a Language Server Save Tokens for Coding Agents? A Measurement Methodology and Preliminary Study",
      "url": "https://arxiv.org/abs/2608.13568",
      "authorsAndInstitutions": "Pengcheng Xu；机构未可靠查到。",
      "qualitySignals": "作者与机构信号：未可靠查到；版本动态：arXiv:2608.13568 v1，原始提交为 2026-06-29 04:09:18 UTC，但进入 2026-08-17 当前新公开列表，本期标记为 v1 新公开，不将原始提交日期误写为公开批次日期；开源与数据：arXiv 摘要页直接提供官方 GitHub 代码与数据链接。",
      "openSourceAndData": "arXiv 摘要页提供官方 GitHub 代码与数据链接；具体仓库地址本轮未稳定提取，页面中标记为官方 this URL。",
      "tags": ["Coding Agent", "Tool Use", "LSP", "MCP", "Retrieval", "Software Engineering"],
      "summary": "以 tokens-to-success 为核心指标，对 Coding Agent 使用 grep 与 Language Server Protocol 语义检索做控制变量实验，发现 LSP 并不普遍节省 token，也不总能提高真实代码修改成功率。",
      "importance": "Coding Agent 的 Tool 接口经常被当成‘越结构化越先进’，但 Tool schema、索引启动、per-symbol round trip、返回内容粒度和模型自身工具偏好都会改变最终成本与正确性。LSP 还常作为 MCP server 暴露，因此这类工具接口属于实际 Harness 依赖。",
      "methodHighlights": "论文设计五臂 ablation，控制语义检索与其他混杂因素，以 tokens-to-success 衡量真实任务成本；覆盖 Python/TypeScript repository 和 Claude Opus 4.8、Sonnet 4.6、Haiku 4.5。任务包括 symbol localization、reference completeness 和经真实测试验证的 multi-file rename。",
      "keyFindings": "在 symbol-named localization 上，LSP 相比 lexical grep 多消耗约 6%–118% token，而且 Agent 在可自由选择时几乎不用语义工具（0–6%）。Reference 任务中 LSP 提高 precision，但通常不节省 token，只对最弱模型有成本收益；模型会自发约一半时间选择 LSP。真实 multi-file rename 中 grep 全部成功，location-only LSP 漏掉 call site 而失败约四分之三；完整、预热并返回行文本的 LSP-MCP 可追回大部分差距，但仍遗漏 comments/strings。",
      "limitations": "论文是 preliminary study，模型、仓库和任务覆盖有限；结果不能推广为‘grep 普遍优于 LSP’。LSP server 的实现质量、索引状态与返回格式会影响表现，且并未评估安全漏洞、恶意 Language Server 或 tool poisoning。",
      "inspiration": "论文直接结论：语义 Tool 不应仅因接口更结构化就被假设为更省 token 或更可靠，Tool 选择应按任务、模型和 lexical noise 自适应。研究启发：Tool-SBOM 除版本和 provider 外，应记录接口能力边界、索引状态、返回覆盖类型、成本与已知盲区；模型或 MCP/LSP server 升级后执行 task-class-specific 回归。",
      "valueJudgment": "值得做工程解读和轻量复现，特别适合补充 Coding Agent Tool/MCP 接口的兼容性与成本治理。",
      "priority": "B"
    }
  ]
});
