// 2026-07-28 LLM / Agent 科研日报
window.RESEARCH_REPORTS.push({
  "date": "2026-07-28",
  "title": "LLM / Agent 科研日报",
  "generatedAt": "2026-07-28 13:20（北京时间）",
  "brief": {
    "summary": "今日严格筛选 6 篇：A 级 4 篇、B 级 2 篇、C 级 0 篇。核心主题是 Agent 行为依赖链的可信性：第三方 API Router 可篡改 Coding Agent 的模型响应并影响仓库级动作；Agent Skill 正在成为具备身份、版本、回滚与生命周期的独立软件制品；基于 Chain-of-Thought 的安全审计可能漏掉模型通过无语义 filler token 完成的不可见计算；同时，StateAct、SpecBox 与 TLA+-Bench 分别从 harness、sandbox runtime 与可执行验证角度提高 Agent 系统的可控性和可测量性。",
    "trendAssessment": "今天最值得关注的趋势是，LLM/Agent 供应链安全正在从 package 和 prompt 扩展到 Router、Skill、harness、sandbox、grader 与内部推理可见性。质量信号方面，上海交通大学/北京大学/北京航空航天大学、University of Maryland、Salesforce AI Research、Loyola University Chicago、北航/Leeds/Sydney 等团队参与；Skillware 出现 v2 更新；Router 论文、Skillware 与 TLA+-Bench 提供官方代码或证据材料。"
  },
  "topPicks": [
    "third-party-router-cost",
    "skillware-v2"
  ],
  "topPickRationales": {
    "third-party-router-cost": "今日最优先精读。论文直接把第三方 LLM API Router 定义为 Coding Agent 执行链中的信任边界，并通过 SIDEL 在 Claude Code、Codex、Cursor、OpenCode 上测试 router-side injection；无附加防护时，代表性 harness 在各注入等级的防御成功率为 0%。机构与实物信号强，官方代码和 400 条恶意注入样本可用于复现和扩展。",
    "skillware-v2": "它为 Agent Skill 提供了软件工程意义上的独立身份、Host/Runtime 关系、版本维护、回滚和生命周期连续性，直接契合 Skill/MCP 供应链治理。v2 在今日 replacement 批次公开，论文使用 138,133 条去重 SKILL.md 记录和 13 个固定版本实现作为证据，并开放设计模式材料，适合作为 Skill-BOM、兼容性和安全回归研究的概念基础。"
  },
  "papers": [
    {
      "id": "third-party-router-cost",
      "title": "Where Is the Cost of Third-Party API Routers in Agentic Software Development?",
      "url": "https://arxiv.org/abs/2607.23624",
      "authorsAndInstitutions": "Donghao Fu（上海交通大学、北京航空航天大学）、Jingxin Li（北京大学）、Xue Jiang（北京大学）、Yihong Dong（上海交通大学）；论文首页同时注明相关工作在上海交通大学 RISE-X Lab 实习期间完成。",
      "qualitySignals": "作者与机构信号：强，来自上海交通大学、北京大学和北京航空航天大学；版本动态：v1 新发，2026-07-26 12:15 UTC 提交，进入 2026-07-28 新公开批次；开源与数据：官方代码与 SIDEL 框架 https://github.com/Riyasushin/SIDE ，论文说明包含 400 条人工设计的恶意注入样本。",
      "openSourceAndData": "官方代码：https://github.com/Riyasushin/SIDE；数据：SIDEL 仓库中的 400 条 router-side malicious injection 样本与实验框架",
      "tags": ["Coding Agent", "LLM Supply-chain Security", "API Router", "Software Supply-chain Security", "Tool Injection", "Benchmark"],
      "summary": "系统验证第三方 LLM API Router 可在模型提供方与 Coding Agent 之间篡改响应，使恶意工具调用转化为真实仓库级动作。",
      "importance": "Coding Agent 常通过统一 API Router 接入多个模型提供方，而 Router 可以看到并修改 system prompt、仓库上下文、tool schema 和 tool-call payload。现有客户端权限控制通常默认 Agent 收到的就是上游模型生成的原始响应；论文指出这个假设在 Router 介入后失效，因此 Router 已成为 LLM 软件供应链中的高权限中间件。",
      "methodHighlights": "提出 SIDEL，用于记录、重放、注入和防御评估；设计四级干预：完整响应替换、追加恶意动作、LLM 润色注入、基于 token 分布混合的隐蔽注入。实验覆盖 Claude Code、Codex、Cursor、OpenCode，区分上游 provider response、router-delivered response 与最终 repository action，并测试白名单执行控制和 LLM review。",
      "keyFindings": "论文报告，在未增加额外缓解措施时，Claude Code 等代表性配置在四个注入等级上的 defense success rate 均为 0%；Router 干预能显著改变仓库级动作，白名单和 LLM review 可降低部分风险，但不能恢复端到端控制。",
      "limitations": "威胁模型假设 Router 具有合法明文中介能力且上游 provider 诚实；实验使用固定的四类干预、四个 Coding Agent 和人工构造样本，不能直接代表全部商业 Router 与部署配置。论文主要证明完整性风险，不等于量化现实生态中恶意 Router 的普遍性。",
      "inspiration": "论文直接结论：Router 是 Coding Agent 执行信任链中的独立安全边界，客户端防护不足以保证 provider output 与实际执行一致。研究启发：可设计 provider-signed response、tool-call 内容签名、端到端 attestation、Router-SBOM、模型响应到 repository diff 的完整性证明，以及 Router 版本更新安全回归测试。",
      "valueJudgment": "强烈建议精读和复现。官方代码、数据与端到端实验框架完整，适合作为 LLM/Coding Agent 供应链安全 benchmark 和系统防御论文的直接基线。",
      "priority": "A"
    },
    {
      "id": "skillware-v2",
      "title": "Skillware: A Software Ontology and Engineering Lifecycle for Persistent Behavioral Artifacts",
      "url": "https://arxiv.org/abs/2607.18970",
      "authorsAndInstitutions": "Haodi Fan、Zucong Lan；论文首页邮箱域名为 metainflow.cn，官方材料仓库属于 MetaInFLow，但论文未明确列出完整机构名称，因此机构仅作弱关联，不作进一步推断。",
      "qualitySignals": "作者与机构信号：中，作者、邮箱域名和官方仓库具有一致的 MetaInFLow 关联，但完整 paper-level affiliation 未明确；版本动态：v1 于 2026-07-21 11:03 UTC 提交，v2 于 2026-07-26 06:24 UTC 更新，并进入 2026-07-28 replacement 公开批次；开源与数据：官方设计模式与证据材料 https://github.com/MetaInFLow/skillware-patterns 。",
      "openSourceAndData": "官方材料：https://github.com/MetaInFLow/skillware-patterns；证据语料涉及 138,133 条去重 SKILL.md 记录、20,556 个 repository identifiers、15 个类别边界案例和 13 个固定 revision 工程实现",
      "tags": ["Agent Skill", "Skillware", "Supply-chain Security", "Software Engineering", "Behavioral Artifact", "Lifecycle"],
      "summary": "把 Agent Skill 从提示文件提升为具有独立软件身份、Host/Runtime 执行关系和版本生命周期的持久行为制品。",
      "importance": "Agent Skill 已包含自然语言指令、metadata、scripts、assets、hooks、package manifest 和 tests，但现有讨论缺少一个明确的软件对象边界。没有身份和生命周期抽象，就难以讨论 Skill 的版本、兼容性、维护、回滚、供应链来源和安全责任。",
      "methodHighlights": "定义 Skill Artifact、Skillware Unit、Agent Host、Agent Runtime、Situated Performance 与 Task Outcome 等实体，并提出三个类别条件：行为主导性、独立软件身份、Host 执行关系；用 Lifecycle Continuity 描述更新、维护、回滚和删除过程中的身份延续。证据来自 Agent Skills 规范、大规模 SKILL.md 语料、独立研究、边界案例和固定 revision 工程实现。",
      "keyFindings": "论文在 138,133 条去重 SKILL.md 记录与 20,556 个 repository identifiers 中观察到重复的软件制品边界、独立身份、激活路径和生命周期压力，并用 15 个边界案例与 13 个固定版本实现验证其分类框架。该工作提供的是本体与证据框架，而不是性能提升 benchmark。",
      "limitations": "论文偏软件本体和概念框架，尚未提供统一的跨 Agent Host 行为等价测试、版本兼容性指标或安全执行系统；数据规模大但不能证明所有 Skill 都具备高质量软件生命周期。v2 具体变化在摘要页未详细列出。",
      "inspiration": "论文直接结论：Skill 应作为可获取、安装、激活、更新、维护、回滚和移除的独立软件制品管理。研究启发：可据此设计 Skill-BOM、签名与 provenance、capability manifest、Host compatibility matrix、transitive Skill/MCP dependency graph、版本安全回归和 identity-preserving update policy。",
      "valueJudgment": "非常值得精读和做概念解读；适合作为 Agent Skill 供应链安全论文的术语、对象模型与生命周期基础。复现价值主要在语料分析和工程模式验证，而非模型训练。",
      "priority": "A"
    },
    {
      "id": "invisible-reasoning",
      "title": "Not All LLM Reasoning is Visible in the Chain-of-Thought",
      "url": "https://arxiv.org/abs/2607.22925",
      "authorsAndInstitutions": "Vatsal Baherwani、Tom Goldstein、Ashwinee Panda；作者官方页面显示与 University of Maryland CS / Tom Goldstein 研究组具有明确关联，但本轮未从论文首页可靠提取统一 affiliation。",
      "qualitySignals": "作者与机构信号：强，作者团队来自 University of Maryland 相关研究组并长期研究 LLM、安全与隐私；版本动态：v1 新发，2026-07-24 21:32 UTC 提交，进入 2026-07-28 新公开批次；开源与数据：未可靠查到官方代码或数据链接。",
      "openSourceAndData": "未可靠查到官方公开代码/数据链接",
      "tags": ["LLM", "Reasoning", "Chain-of-Thought", "AI Safety", "Monitoring", "Alignment"],
      "summary": "证明部分前沿模型能利用无语义 filler token 完成影响结果的计算，使关键推理完全不出现在可解释的 Chain-of-Thought 中。",
      "importance": "很多 Agent runtime monitor、policy reviewer 和安全审计依赖 CoT、scratchpad 或自然语言轨迹来判断模型意图。如果模型能在表面无语义 token 中执行有后果的计算，那么“监控推理文本”并不等于监控模型实际计算，尤其会削弱基于 CoT 的越权、欺骗和供应链攻击检测。",
      "methodHighlights": "在三个合成推理任务上测试 13 个前沿模型，比较无 filler 与不同 filler token 条件；进一步构造隐藏模运算约束，测试模型是否能在不牺牲主任务准确率的情况下满足不可见目标，并研究 RL/SFT 是否能形成可泛化的 filler-token 计算行为。",
      "keyFindings": "多种模型从 filler token 中获得最高 13 个百分点的准确率提升；Claude Opus 4.5 能在保持主任务准确率的同时满足隐藏模运算约束。RL 会让 Qwen3-235B 对 filler 内容形成偏好，但 RL 或 SFT 未产生在测试时稳定持续的 filler benefit。",
      "limitations": "任务主要是合成推理与隐藏约束，尚不能证明现实 Coding Agent 或工具调用场景中已广泛存在同等程度的隐形目标计算；filler-token 效应跨模型差异明显。论文揭示 CoT monitoring 的结构性盲点，但未给出成熟防御。",
      "inspiration": "论文直接结论：输出 token 中的显式 CoT 不能保证覆盖模型全部有后果的计算。研究启发：Agent 安全不能只审计 narration，应结合 tool-call、hidden-state probes、外部状态变化、权限边界和独立执行 verifier；对 model update 还应测试 invisible-reasoning regression。",
      "valueJudgment": "强烈建议精读和做安全解读。轻量复现价值高，尤其适合作为“CoT 监控不足以保证 Agent 安全”的实验依据。",
      "priority": "A"
    },
    {
      "id": "stateact",
      "title": "StateAct: Program State, before Pixels, for Long-Horizon Computer-Use Agents",
      "url": "https://arxiv.org/abs/2607.22798",
      "authorsAndInstitutions": "Yan Yang、Xiangru Jian、Ziyang Luo、Zirui Zhao、Yutong Dai、Ziji Shi、Hanshu Yan、Jun Hao Liew、Silvio Savarese、Junnan Li；Salesforce AI Research。",
      "qualitySignals": "作者与机构信号：强，Salesforce AI Research；版本动态：v1 新发，2026-07-24 14:17 UTC 提交，进入 2026-07-28 新公开批次；开源与数据：未可靠查到官方代码仓库。",
      "openSourceAndData": "未可靠查到官方公开代码链接；实验基准为 OSWorld 2.0，并额外比较 OSWorld-Verified、WindowsAgentArena、AndroidWorld 和 MobileWorld",
      "tags": ["Computer-Use Agent", "Agent Harness", "State Grounding", "Verification", "Long-Horizon Agent", "Software Engineering"],
      "summary": "让主 Agent 直接通过代码读写程序状态，仅把少量不可避免的视觉交互委派给 GUI 子 Agent，并用独立 finish gate 检查持久化结果。",
      "importance": "现有 computer-use Agent 主要通过截图行动，但截图是程序状态的有损渲染，难以确认公式、隐藏行、DOM、文件保存状态等真实交付物。StateAct 把 action、verification 和 memory 都锚定到可查询的程序状态，体现 harness 对 Agent 能力和可验证性的决定性影响。",
      "methodHighlights": "主 Agent 使用 bash、Python 和文件编辑器操作状态；GUI 专家仅处理不可脚本化子目标；独立 finish gate 不读取主 Agent 的自述，只重新检查持久化制品；通过 fresh-context delegation、compaction 和外部计划维持数百步任务。",
      "keyFindings": "在 OSWorld 2.0 上，Claude Opus 4.8 的 binary success 从 20.6% 提升到 26.9%，partial success 从 54.8% 提升到 61.6%，单任务成本约降低 9 倍。GUI 子 Agent 只用于 28/108 个任务、占主 Agent steps 的 1.1%；仅代码、无 GUI 子 Agent 的版本 partial success 为 45.9%。",
      "limitations": "直接状态访问扩大了 Agent 对文件、DOM 和应用 backend 的能力边界，若权限和 provenance 控制不足，也可能放大攻击影响；finish gate 主要发现结构错误，无法独立重算价值正确性，并放过了多数到达 gate 的非满分任务。实验依赖特定商业模型和内部 SFR-CUA。",
      "inspiration": "论文直接结论：长程 computer-use 应优先锚定真实程序状态而非截图。研究启发：可将 state access 视为高权限 capability，配合最小权限、read/write provenance、state diff、不可变审计日志和独立 policy gate，形成安全的 Agent harness。",
      "valueJudgment": "值得精读和系统学习。安全供应链关联属于扩展启发，但其 actor/verifier 分离与 state-based audit 对 Agent runtime 设计非常重要。",
      "priority": "A"
    },
    {
      "id": "tla-plus-bench",
      "title": "TLA+-Bench: An Execution-Grounded Benchmark and Dataset for Natural-Language to TLA+ Specification Generation",
      "url": "https://arxiv.org/abs/2607.23425",
      "authorsAndInstitutions": "Arslan Bisharat、Eric Spencer、Brian Ortiz、Khushboo Bhadauria、Mujtaba Nazari、Beatriz Santos、Anisa Ramos、TaiNing Wang、George K. Thiruvathukal、Konstantin Läufer、Mohammed Abuhamad；Loyola University Chicago。",
      "qualitySignals": "作者与机构信号：中，Loyola University Chicago 的软件工程与形式化方法团队；版本动态：v1 新发，2026-07-26 02:49 UTC 提交，进入 2026-07-28 新公开批次；开源与数据：代码与 grading tools https://github.com/LUC-AI4FM/tla_benchmark ，数据集通过 Zenodo 发布。",
      "openSourceAndData": "代码与评分工具：https://github.com/LUC-AI4FM/tla_benchmark；数据集：https://doi.org/10.5281/zenodo.21310317（论文注明正式发布时可解析）",
      "tags": ["LLM", "Formal Verification", "Software Engineering", "Benchmark", "TLA+", "Execution-Grounded Evaluation"],
      "summary": "构建由 TLA+ 模型检查器执行验证的自然语言到形式规约 benchmark，区分语法有效与语义正确。",
      "importance": "LLM 生成安全关键软件规约时，文本相似度、能否解析或有限测试都不能证明正确。TLA+-Bench 使用可执行模型检查器作为精确 oracle，揭示 benchmark 的 grader、接口提示和 vacuity screening 本身会大幅改变能力结论。",
      "methodHighlights": "包含 403 个 model-checked gold 和 897 个 parse-only silver 规约，来自 13 个公开仓库；每个规约配四种模型生成描述、难度和类别标签。通过 SANY parser、TLC model checker、行为非空和 property non-vacuity 检查形成 correctness envelope。",
      "keyFindings": "同一批模型输出仅因 grader 选择不同，正确率可从 10.0% 降至 1.7%；加入是否提供接口名称后，范围扩大到 18.7%–1.7%，相差 11 倍。最强模型默认仅 16% 正确，提供接口名称后 26%；开源模型最高约 1%，但所有模型的可解析率显著高于真实正确率。",
      "limitations": "TLA+ 任务专业且数据来自有限公开项目，不能代表一般 Coding Agent；模型检查结果只对给定 configuration 和有限 state space 精确，仍需防止 vacuous pass。论文模板存在未来会议占位信息，不应据此推断已被接收。",
      "inspiration": "论文直接结论：LLM 形式规约评测必须使用 execution-grounded oracle，并公开 grader 假设。研究启发：Agent 安全 benchmark 也应发布可执行环境、policy oracle、grader provenance 和 correctness envelope，避免 harness 或评测配置造成虚假安全结论。",
      "valueJudgment": "值得阅读和直接复现；实物完整，尤其适合作为 Agent/Coding Agent 安全 benchmark 设计与可执行验证方法的参考。",
      "priority": "B"
    },
    {
      "id": "specbox",
      "title": "SpecBox: Speculative Sandbox Scheduling for Efficient LLM Agent Serving",
      "url": "https://arxiv.org/abs/2607.23933",
      "authorsAndInstitutions": "Yihui Zhang、Tianyu Wo、Jinghao Wang、Menghao Zhang、Cangzhou Yuan、Li Li、Chunming Hu、Renyu Yang（北京航空航天大学），Xiaoyang Sun（University of Leeds），Albert Y. Zomaya（The University of Sydney）。",
      "qualitySignals": "作者与机构信号：强，北航、University of Leeds 与 University of Sydney；版本动态：v1 新发，2026-07-27 02:10 UTC 提交，并在 2026-07-28 批次作为 cs.DC 主类、cs.AI/cs.LG 交叉列表公开；开源与数据：未可靠查到官方代码链接。",
      "openSourceAndData": "未可靠查到官方公开代码/trace 数据链接",
      "tags": ["Agent Runtime", "MCP", "Sandbox", "Serving Systems", "Performance", "Runtime Policy"],
      "summary": "通过在模型生成过程中预测即将发生的工具调用，提前预热 MCP sandbox，并结合依赖图预取、结果缓存和共享内存传输降低 Agent serving 延迟与内存。",
      "importance": "MCP/Tool Agent 需要大量隔离 sandbox：长期保留浪费资源，按需启动又产生严重冷启动。SpecBox 说明 runtime 对意图、sandbox dependency graph 和工具切换的预测已成为 Agent 基础设施的一部分，也形成新的行为依赖和隔离边界。",
      "methodHighlights": "使用 keyword matching 与 streaming semantic embedding 在生成中途预测工具意图并预热 sandbox；在 sandbox dependency graph 上做 context-aware stochastic prefetch；通过 semantic result cache 消除重复调用，并使用 out-of-band shared-memory transport 实现 artifact 零拷贝传输。",
      "keyFindings": "在高并发多轮 Agent traces 上，相比按需 sandbox baseline，P99 端到端延迟最高降低 2.9 倍；相比永久预留 sandbox，峰值内存降低 45.9%。",
      "limitations": "工作主要优化性能，没有系统评估 speculative prewarm、semantic cache、dependency graph 和共享内存通道带来的跨租户信息泄露、缓存污染或权限提前扩张风险；官方代码与 traces 未可靠开放，复现成本和环境要求较高。",
      "inspiration": "论文直接结论：speculative sandbox scheduling 可以同时改善尾延迟和资源利用。研究启发：应研究安全感知预热，保证提前创建 sandbox 不等于提前授予 capability；cache key、tenant isolation、artifact provenance 和 dependency graph poisoning 都可成为 MCP runtime 供应链安全选题。",
      "valueJudgment": "值得系统阅读，偏系统工程，完整复现成本较高。对供应链安全的价值主要在 runtime attack surface 与安全扩展。",
      "priority": "B"
    }
  ]
});