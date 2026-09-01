// 2026-09-01 LLM / Agent 科研日报
window.RESEARCH_REPORTS.push({
  "date": "2026-09-01",
  "title": "LLM / Agent 科研日报",
  "generatedAt": "2026-09-01 10:00（北京时间）",
  "brief": {
    "summary": "今日严格筛选 6 篇，A/B/C 为 3/3/0。主线集中在 Agent 插件、Skill 与 Harness 从“提示附件”进一步变成具有维护关系、可恢复性约束、路由条件和运行时故障域的软件制品。Claude Code 插件市场的大规模实证显示，自然语言说明与实现脚本会形成新的共演化依赖；EvoUndo 说明能力提升但不可安全撤销的自演化修改并不少见；SkillFeed 则证明 Skill 是否适用不仅由任务决定，还受用户约束影响。LoopArena、openJiuwen 与 Logos 分别从外层循环控制、动态 Harness 与跨进程故障恢复补全运行时治理链。",
    "trendAssessment": "本期对应 2026-08-31 arXiv 最新公开批次。5 篇为 2026-08-28 提交后于 8 月 31 日公开的 v1，Logos 则在 2026-08-31 更新到 v2，明确按旧论文当日更新处理。对 LLM/Agent 供应链安全最直接的趋势是：Plugin/Skill/Harness 应拥有类似软件包的版本、共演化依赖、适用条件、恢复语义与运行时故障域记录；后续可以把脚本-说明耦合、Skill 适配范围、Harness mutation、Controller、进程拓扑和恢复证据统一纳入 Behavioral SBOM。"
  },
  "topPicks": [
    "agent-plugin-coevolution",
    "evoundo"
  ],
  "topPickRationales": {
    "agent-plugin-coevolution": "本期最值得精读。论文首次对 Claude Code 插件市场做大规模维护与共演化分析，覆盖 1,926 个仓库、8,351 个插件和 77,773 次提交，发现 skills/ 中自然语言说明与实现脚本的共同变更有 78% 属于功能耦合，直接提供了 Agent 插件供应链的真实生态证据。Queen’s University SAIL 团队信号较强，官方数据集已开放，适合继续做 Plugin-BOM、变更影响分析和脚本/说明不同步检测。",
    "evoundo": "EvoUndo 直接研究自演化 Harness 的可恢复性：600 个未见任务中有 197 个能力提升 mutation 无法通过恢复验证，传统修复在这些自然失败上为 0/197；扩展恢复语言后可恢复 180/197，且最终 461/478 个能力正向 mutation 可被接纳。它与 Agent Runtime/供应链安全高度相关，特别适合扩展为 Harness mutation 的 undo gate、状态证据和不可逆副作用治理。"
  },
  "papers": [
    {
      "id": "agent-plugin-coevolution",
      "title": "On the Maintenance and Co-evolution of Agent Plugins: An Empirical Study of Claude Code Plugin Marketplaces",
      "url": "https://arxiv.org/abs/2608.28497",
      "authorsAndInstitutions": "Ahmed Hereiz、Yingzhe Lyu、Hao Li、Bram Adams、Ahmed E. Hassan；论文首页确认均来自 Queen’s University Software Analysis and Intelligence Lab (SAIL), Kingston, Canada。",
      "qualitySignals": "作者与机构信号：强，Queen’s University SAIL 为长期软件工程实证研究团队；版本动态：v1 新发，2026-08-28 16:27:35 UTC 提交，进入 2026-08-31 公开批次；开源与数据：官方数据集 https://github.com/SAILResearch/agentic_plugin_marketplace 。",
      "openSourceAndData": "官方数据集：https://github.com/SAILResearch/agentic_plugin_marketplace",
      "tags": ["Agent Plugin", "Agent Skill", "MCP", "Supply-chain Security", "Software Engineering", "Maintenance"],
      "summary": "对 Claude Code 插件市场进行大规模实证研究，刻画自然语言指令、脚本、配置、Skill、Hook、MCP 等组件的维护与共演化关系。",
      "importance": "Agent 插件已经把 SKILL.md、脚本、Hook、MCP/LSP 配置和 Agent 定义打包成可分发行为制品，但传统软件供应链方法默认主要制品是源代码。若插件内部的自然语言说明和实现脚本需要同步演化，而维护工具只跟踪代码依赖，就可能出现静默不一致和行为漂移。",
      "methodHighlights": "作者通过 GitHub Code Search 发现 Claude Code marketplace.json，去重并按社区采用度筛选仓库，最终分析 1,926 个仓库、2,018 个 marketplace、8,351 个插件和 77,773 次提交；结合 Conventional Commits 重分类、AI 共著识别、关联规则和人工功能耦合分类，研究组件结构、维护类型与共变关系。",
      "keyFindings": "插件相关提交活动在 Claude Code 插件体系推出后的六个月增长 8.8×；61.3% 插件面向软件工程任务；feature commit 占 39.6%，高于传统 OSS 对照的 17.2%；Claude 共著 34.9% 的提交。34.4% 插件组合多个组件类型；多数组件可独立维护，但 skills/ 内 Script–Markdown 共变中 78% 被人工判定为功能耦合，主要来自接口、内部逻辑和变量同步变化。",
      "limitations": "数据仅覆盖公开 GitHub marketplace，并使用至少 10 stars 的主筛选阈值，因此会遗漏私有、企业和低热度生态；共变不自动等于依赖关系，人工分类仍有主观性；论文研究维护行为而非直接测量漏洞或攻击。",
      "inspiration": "论文直接结论：Agent 插件是一类与传统软件包不同的 AI-native 制品，其中自然语言和实现代码会形成可观测的维护耦合。研究启发：Plugin/Skill-BOM 应记录组件级依赖、instruction-script pairing、MCP/Hook 配置、版本与共同变更证据；发布或升级插件时应检查说明与脚本是否同步，并对受影响的行为路径做回归。",
      "valueJudgment": "非常值得精读并直接使用公开数据集，适合作为 Agent 插件供应链、Skill 共演化和维护工具研究的生态基础。",
      "priority": "A"
    },
    {
      "id": "evoundo",
      "title": "EvoUndo: Recoverability-Constrained Self-Evolution for LLM Agent Harnesses",
      "url": "https://arxiv.org/abs/2608.28363",
      "authorsAndInstitutions": "Tanmay Sah、Dolly Sah、Harshul Jain、Tanya Sah；论文首页均标注 Independent Researcher。",
      "qualitySignals": "作者与机构信号：弱，独立研究者，机构背书有限；版本动态：v1 新发，2026-08-28 14:15:36 UTC 提交，进入 2026-08-31 公开批次；开源与数据：未可靠查到官方代码或数据入口。",
      "openSourceAndData": "未可靠查到",
      "tags": ["Agent Harness", "Self-evolution", "Recoverability", "Runtime Policy", "Supply-chain Security"],
      "summary": "给 Agent 自我修改加入独立的可恢复性验证，要求能力提升 mutation 不仅向前有效，还必须能在反事实状态中安全撤销。",
      "importance": "自演化 Agent 会修改 Prompt、Tool、Middleware、资源和 Harness。传统评价只看 mutation 是否提升任务能力，却忽略修改写入持久状态后是否还能在不同未来状态中恢复；对运行时自动升级而言，这相当于软件更新只有安装路径、没有可靠卸载路径。",
      "methodHighlights": "EvoUndo 把候选表示为前向 mutation、状态 witness、恢复程序与 effect contract，独立审计实际副作用，并在开发态和隐藏反事实状态上做 round-trip 恢复验证。论文进一步做 2×2 诊断粒度×恢复语言表达力实验，区分状态地址 grounding 与恢复语言本身的表达瓶颈。",
      "keyFindings": "600 个未见 self-evolution 任务中，478 个产生能力正向 mutation，其中 197 个恢复失败。基础表示下四类 verifier-guided 修复均为 0/197；扩展恢复语言且使用粗粒度诊断后恢复 180/197（91.4%），最终使 461/478（96.44%）能力正向 mutation 可接纳。对基础语言足够的 S0，精确地址 grounding 将恢复从 0/48 提至 38/48；对需扩展语言的 S1，恢复达到 142/143。",
      "limitations": "恢复语言并非完备；实验主要针对可控软件状态，分布式外部服务、不可逆金融/物理动作需要补偿事务而非简单 undo；主模型与任务族仍有限，诊断与表达力的交互存在模型依赖。",
      "inspiration": "论文直接结论：能力提升不足以成为自演化修改的接纳条件，恢复语言表达力和状态 grounding 是独立瓶颈。研究启发：Harness/Skill 自动升级应采用 mutation + witness + undo/compensation + effect contract 的提交格式，并把恢复测试设置为不可绕过的 promotion gate。",
      "valueJudgment": "非常值得精读，尤其适合与 Agentic Transaction、AgentRewind 一起形成自演化 Runtime Safety 研究线。",
      "priority": "A"
    },
    {
      "id": "skillfeed",
      "title": "Beyond Task-Only Matching: Personalized Skill Routing with Counterfactual Evaluation",
      "url": "https://arxiv.org/abs/2608.28241",
      "authorsAndInstitutions": "Tianle Wang、Yanghe Zou、Xiang Liu、Ziyao Huang、Chenchen Fu、Weiwei Wu；论文正文列出 Southeast University 计算机/软件学院、The Chinese University of Hong Kong、City University of Hong Kong。",
      "qualitySignals": "作者与机构信号：强/中，东南大学 + 香港中文大学 + 香港城市大学，来源可靠；版本动态：v1 新发，2026-08-28 11:55:56 UTC 提交，进入 2026-08-31 公开批次；开源与数据：官方项目页 http://www.aiskillfeed.com ，本轮未可靠确认独立官方 GitHub。",
      "openSourceAndData": "官方项目页：http://www.aiskillfeed.com；独立代码仓库未可靠查到",
      "tags": ["Agent Skill", "Skill Routing", "Personalization", "Retrieval", "Supply-chain Security"],
      "summary": "把 Skill 路由从只看任务语义扩展为同时考虑用户约束，在相同任务但不同用户条件下选择不同且真正适用的 Skill。",
      "importance": "Skill marketplace 扩大后，语义相关不等于可安全使用。相同任务在语言、平台权限、预算、技术熟练度等用户条件不同的情况下，适用 Skill 可能完全不同；task-only router 会把不兼容的流程错误注入 Agent。",
      "methodHighlights": "论文构造 profile-counterfactual benchmark，固定任务、只改变用户 profile，从而让参考 Skill 随约束变化；SkillFeed 先进行任务-Skill 对齐，再检索 Skill 正文证据，并通过 profile-conditioned reranker 区分语义相似但约束冲突的候选。Benchmark 含 228K 候选 Skill 与 329 个标注实例。",
      "keyFindings": "SkillFeed-Bench 上 Top-1/Hit@1 达 75.1%，比对应预训练路由基线高 23.1 个百分点；Profile conditioning 在 profile-sensitive 查询上贡献 18.6 个百分点，在 profile-counterfactual 样本上贡献 35.1 个百分点。",
      "limitations": "Benchmark 标注规模仅 329 个实例，profile 约束仍是显式描述；现实系统中的权限、组织政策、动态 Tool 可用性和恶意 Skill 不一定能被同样方式建模。路由正确也不代表 Skill 本身安全。",
      "inspiration": "论文直接结论：Skill suitability 取决于任务与用户 profile 的联合条件。研究启发：安全感知 Skill Router 应进一步加入权限、平台、预算、Publisher、版本、MCP/Tool 依赖和风险等级；Skill-BOM 应保存 validated profile scope，防止跨用户/跨环境误用。",
      "valueJudgment": "值得精读和做路由扩展实验，对大规模 Skill Marketplace 的兼容性与最小权限选择很有价值。",
      "priority": "A"
    },
    {
      "id": "looparena",
      "title": "LoopArena: Benchmarking Models as Runtime Controllers for Loop Engineering",
      "url": "https://arxiv.org/abs/2608.28281",
      "authorsAndInstitutions": "Yi Wang、Haopeng Zhang、Chengxiang Huang、Rui Dai、Kaikui Liu、Piotr Koniusz、Xiangxiang Chu；论文 HTML 的机构字段解析不完整，本轮不猜测完整作者机构。",
      "qualitySignals": "作者与机构信号：未可靠查到完整机构映射；版本动态：v1 新发，2026-08-28 12:44:54 UTC 提交，进入 2026-08-31 公开批次；开源与数据：官方代码、Benchmark 与结果 https://github.com/AMAP-ML/LoopArena 。",
      "openSourceAndData": "官方代码与 Benchmark：https://github.com/AMAP-ML/LoopArena",
      "tags": ["Coding Agent", "Loop Engineering", "Runtime Controller", "Evaluation", "Agent Harness"],
      "summary": "固定实际写代码的 Worker，只更换控制模型，单独评价谁更会决定长程 Agent 下一步应实现、验证、恢复还是停止。",
      "importance": "端到端 Coding Agent 分数把模型写代码能力与外层 Loop 控制混在一起，无法判断失败来自 Worker 还是 Controller；而真实长程 Loop 常因过早停止、遗漏验证、错误预算分配或相信过期进度而失败。",
      "methodHighlights": "LoopArena 将被测模型设为 Controller，固定 Worker 和 Reporter，设计 Type I 下一步 Contract 选择、Type II 任务切片闭环控制和 Type III 全任务闭环控制三个层级，并提供 no-control/fixed-control 对照。",
      "keyFindings": "Type III 全任务 Strict Success Rate 最高仅 24.69%；GPT-5.5 的 Type I/II/III 分别为 87.78%、51.85%、24.69%。Type II 相比 Type III 平均降低 64.4% 估算推理成本，并在主 Core criterion 上保持高度相似的 Controller 排序（Spearman ρ=0.9747）。固定控制在 Type II 从 39.51% 提升到 46.91%，但 Type III 与无控制都为 18.52%，说明短切片收益不能直接外推全程。",
      "limitations": "Type III 仅 27 个全任务案例，且结论依赖固定 Worker/Reporter 与特定评测标准；不同 Worker、Harness、预算和安全要求可能改变 Controller 排名。Benchmark 主要测任务控制，不直接测恶意指令、权限或供应链攻击。",
      "inspiration": "论文直接结论：Loop Controller 可以作为独立评价对象，且全任务控制远比局部下一步判断困难。研究启发：Loop-SBOM 应记录 Controller、Worker、Reporter、Contract schema、stop rule、budget 与 verifier；模型/Harness 升级后应单独做控制层回归而不是只看整体 SWE-bench。",
      "valueJudgment": "值得系统阅读和直接运行公开 Benchmark，适合 Loop Engineering、Runtime Policy 和 Evaluation-SBOM 研究。",
      "priority": "B"
    },
    {
      "id": "openjiuwen-harness",
      "title": "openJiuwen: Beyond Static Harnesses for Long-Horizon Coding Agents",
      "url": "https://arxiv.org/abs/2608.27969",
      "authorsAndInstitutions": "openJiuwen Team（Tao Yu 等 19 位作者）；论文首页明确标注 Huawei Technologies Co., Ltd.。",
      "qualitySignals": "作者与机构信号：强，华为/openJiuwen 工程团队；版本动态：v1 新发，2026-08-28 提交并进入 2026-08-31 公开批次；开源与数据：官方源码 https://github.com/openJiuwen-ai/jiuwenswarm 。",
      "openSourceAndData": "官方源码：https://github.com/openJiuwen-ai/jiuwenswarm",
      "tags": ["Coding Agent", "Agent Harness", "Multi-agent", "Runtime Adaptivity", "Software Engineering"],
      "summary": "用统一执行底座、Rail 能力组合与动态运行时控制，把单 Agent、委派 Sub-agent 与 Swarm Flow 放进同一可组合 Harness。",
      "importance": "长程 Coding Agent 会持续产生新的诊断、任务进度、上下文相关性和执行结果，固定 Harness 很难在任务过程中根据这些证据调整上下文、反馈与停止逻辑；同时多 Agent 和能力扩展也使 orchestration 越来越难维护。",
      "methodHighlights": "openJiuwen 强调 Structural Composability 与 Runtime Adaptivity：使用共享执行语义和 Rail 组合能力，并围绕固定模型策略动态调整 Context Management、Goal Mode、LSP 被动反馈、自反思、委派和 Swarm Flow。",
      "keyFindings": "SWE-bench Verified 达 82.6%，比作者选择的最强官方榜单点估计高 3.4pp；Terminal-Bench 2.1 达 87.19%，高 3.39pp。SWE-bench 按预估修复时长分桶时，<15 分钟与 15 分钟–1 小时任务分别达到 91.75% 与 81.23%；作者明确指出当前 Benchmark 没有把工具可用性等因素与其他 Harness 机制完全隔离，因此不能把全部增益作单组件因果归因。",
      "limitations": "系统比较包含工具、上下文、反思、多 Agent 等多个同时变化的 Harness 因素，组件级因果贡献仍不清晰；主要评测集中在 SWE-bench Verified 与 Terminal-Bench 2.1，成本、安全、权限和供应链攻击并非主要目标。",
      "inspiration": "论文直接结论：固定模型周围的 Harness 运行时可以通过可组合和自适应机制显著改变长程 Coding Agent 表现。研究启发：Harness-SBOM 应固定 Rail/Tool/LSP/Context/Goal/Reflection/Swarm 配置；任何 Harness 升级都需要在同模型条件下做功能、成本与安全行为 diff。",
      "valueJudgment": "值得系统阅读和工程复现，尤其适合研究 Harness 作为独立软件层的版本治理与组合风险。",
      "priority": "B"
    },
    {
      "id": "logos-cross-process-harness",
      "title": "Logos: An Agent Harness on a Cross-Process Bus",
      "url": "https://arxiv.org/abs/2608.28553",
      "authorsAndInstitutions": "Hanzhang Jia、Liheng Zeng、Hao Cheng、Yi Gao、Bo Ma；v2 首页列出 University of Sussex、Zhejiang Gongshang University、Shanghai Shuyuan Information Technology Co., Ltd.。",
      "qualitySignals": "作者与机构信号：中，学术与工业混合团队，当前仍为 draft；版本动态：v1 于 2026-08-28 17:30:10 UTC 提交，v2 于 2026-08-31 05:59:16 UTC 更新，属于旧论文当日 v2 更新；开源与数据：未可靠查到官方代码仓库。",
      "openSourceAndData": "未可靠查到",
      "tags": ["Agent Harness", "Distributed Systems", "Tool Use", "Fault Tolerance", "Multi-agent"],
      "summary": "把 Agent Plugin/Tool 从单进程共享故障域拆成跨进程总线上的独立节点，以 append-only transcript 作为共享事实源并支持故障后恢复。",
      "importance": "单进程 Harness 把 Tool、Plugin、Session 放在同一个故障域，任一组件崩溃可能同时中断全部会话；随着 Agent 能力动态装配和长期运行，进程拓扑、故障隔离与幂等恢复开始成为运行时可靠性的一部分。",
      "methodHighlights": "Logos 采用类似 ROS 的 peer-process bus，每个 Plugin 成为独立进程，只共享 append-only transcript；论文从可逆组合 calculus 与模型调用的无状态接口推导跨进程条件，并实现注册、广播、热插拔、路由恢复和 transcript 驱动的重放。",
      "keyFindings": "3,500 次并发调用没有丢失、重复或错配；100 个进程同时竞争同一 node id 时仅一个注册成功。80 个会话在 Tool Call 周期四个不同 kill point 上均恢复完成且没有重复副作用；12 个端到端 Session 经 6 次进程 Kill 全部恢复。单次 bus hop 中位成本约 0.215ms，相对 177ms 的模型首 Token 延迟约为 1/823。",
      "limitations": "当前仍是 draft，实验主要在单机受控环境完成；分布式网络分区、外部不可逆服务和真实多租户 Provider 尚未充分覆盖。没有可靠开放代码使独立复现成本较高。",
      "inspiration": "论文直接结论：Agent 组合不必绑定单进程，跨进程隔离可以缩小故障域并保留 transcript 驱动的恢复语义。研究启发：Runtime-SBOM 应增加 plugin process identity、bus/protocol version、session/transcript id、idempotency 与 recovery evidence，并把 MCP/Tool crash 作为供应链故障注入的一部分。",
      "valueJudgment": "值得阅读，系统方向与 Harness 可靠性高度相关；由于仍为早期 draft 且代码未可靠开放，优先级低于本期前三篇。",
      "priority": "B"
    }
  ]
});
