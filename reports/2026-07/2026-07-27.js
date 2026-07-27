// 2026-07-27 LLM / Agent 科研日报
window.RESEARCH_REPORTS.push({
  "date": "2026-07-27",
  "title": "LLM / Agent 科研日报",
  "generatedAt": "2026-07-27 10:18（北京时间）",
  "brief": {
    "summary": "今日严格筛选 5 篇值得看的论文：A 级 4 篇、B 级 1 篇、C 级 0 篇。周一公开批次集中出现了与 Agent 安全定义、动态最小权限、Skill 回归、Benchmark 有效性和长期记忆 provenance 直接相关的工作。需要注意：这些论文大多在 7 月 24 日 UTC 提交，但于 7 月 27 日进入 arXiv 周一公开批次，因此属于今日新公开，而不是今日提交。",
    "trendAssessment": "今天的主线非常明确：Agent 安全正在从内容过滤转向授权上下文、能力边界、行为依赖和全过程验证。对 LLM/Agent 供应链安全而言，Skill 描述、权限集合、Benchmark 协议、记忆表示与 provenance 都已经成为需要版本化、审计和回归测试的行为依赖。质量信号方面，UC Berkeley/UC Santa Cruz 与 Tencent Hunyuan/HKUST/Duke Kunshan 团队较强；Ground Truth First 提供开源实现；其余论文的官方代码或数据链接未全部可靠定位。"
  },
  "topPicks": ["agent-security-redefinition", "regression-tax-skills"],
  "topPickRationales": {
    "agent-security-redefinition": "优先精读，因为它不是再提出一个局部 prompt-injection 防御，而是重新定义 Agent 安全的判断单位：来源授权、任务对齐、动作对齐与数据隔离必须沿完整轨迹持续成立。UC Berkeley 与 UC Santa Cruz 团队信号强，且该框架可直接支撑 Agent Behavioral SBOM、跨会话 provenance 与运行时授权策略研究。",
    "regression-tax-skills": "优先精读，因为它直接揭示 Skill 作为外部行为依赖可能导致系统性回归：即使 Skill 未被调用，其描述也可能改变 Agent 行为。近 6000 次运行和三个 model-harness stack 使结论比单一演示更有说服力，适合扩展为 Skill/MCP 安全回归基准与版本兼容性测试。"
  },
  "papers": [
    {
      "id": "agent-security-redefinition",
      "title": "Agent Security Needs Redefinition through a Holistic Framework",
      "url": "https://arxiv.org/abs/2607.22024",
      "authorsAndInstitutions": "Vincent Siu、Kyle Montgomery、Chenguang Wang：UC Santa Cruz；Jingxuan He、Zhun Wang、Dawn Song：UC Berkeley。",
      "qualitySignals": "作者与机构信号：强，论文首页明确标注 UC Santa Cruz 与 UC Berkeley，包含长期从事安全研究的 Dawn Song 团队；版本动态：v1，2026-07-24 06:43 UTC 提交，2026-07-27 周一批次新公开；开源与数据：未可靠查到官方代码或数据链接，且该文属于 ICML 2026 Position Paper。",
      "openSourceAndData": "未可靠查到官方公开代码/数据链接",
      "tags": ["Agent Security", "Authorization", "Supply-chain Security", "Prompt Injection", "Data Isolation", "Runtime Policy"],
      "summary": "提出将 Agent 安全从“动作内容是否危险”重新定义为授权上下文问题，并要求来源授权、任务对齐、动作对齐和数据隔离在完整轨迹中持续成立。",
      "importance": "现有 Agent 安全评测常根据动作文本判断危险，但相同动作在授权用户请求下可能合法，在外部文档注入下则是攻击。内容过滤无法表达来源、权限和跨会话信息流，因此会同时产生误拦截和漏报。",
      "methodHighlights": "论文用四个系统安全属性重构 Agent 安全：Source Authorization、Task Alignment、Action Alignment、Data Isolation，并对 AgentDojo 与 WASP 的注入任务进行人工审计，说明所有 45 个表面危险动作都存在合理合法场景。框架强调逐动作、全轨迹和跨权限边界评估。",
      "keyFindings": "作者审计 AgentDojo 与 WASP 共 45 个注入任务，均能构造相同动作的合法授权场景；由此说明仅靠动作内容无法区分攻击与正常使用。论文进一步指出 snapshot benchmark 无法评估跨会话数据隔离和延迟显现的 memory poisoning。",
      "limitations": "这是立场与框架论文，不是完整可部署系统；四个属性如何自动判定、如何处理授权继承和多主体冲突仍未充分解决。人工审计规模有限，也缺少端到端防御基准结果。",
      "inspiration": "论文直接结论：Agent 安全应以授权上下文和完整轨迹为核心。研究启发：可设计 Agent Behavioral SBOM，将输入来源、Skill/MCP、工具权限、模型与 harness 版本、memory provenance 和 runtime policy 映射到四类安全属性，并做跨版本安全回归。",
      "valueJudgment": "非常值得精读和做概念性技术解读；适合作为 Agent 供应链安全论文的理论框架与威胁模型基础，但不适合直接做完整代码复现。",
      "priority": "A"
    },
    {
      "id": "regression-tax-skills",
      "title": "The Regression Tax: Decomposing Why Skills Help and Hurt LLM Agents",
      "url": "https://arxiv.org/abs/2607.22520",
      "authorsAndInstitutions": "Darshan Tank、Baran Nama；机构未可靠查到。",
      "qualitySignals": "作者与机构信号：未可靠查到；版本动态：v1，2026-07-24 17:50 UTC 提交，2026-07-27 周一批次新公开；开源与数据：arXiv 摘要页未发现可靠官方代码、数据或项目页链接。",
      "openSourceAndData": "未可靠查到官方公开代码/数据链接",
      "tags": ["Agent Skill", "Agent Harness", "Supply-chain Security", "Regression Testing", "Office Agent"],
      "summary": "通过近 6000 次有无 Skill 对照运行，揭示 Skill 的平均增益会掩盖大量行为回归，并识别描述渗透、grounding displacement 和 verification displacement 三类机制。",
      "importance": "Skill 通常被视为只会增强 Agent 的程序性资产，但它实际上会改变上下文、输入解释和验证行为。平均成功率无法回答“新增 Skill 让哪些原本成功任务变失败”，这正是行为依赖升级和供应链回归问题。",
      "methodHighlights": "论文在两个办公自动化 benchmark、三个 model-harness stack 上比较有 Skill 与无 Skill 条件，区分 gain、regression 与 residual failure，并通过轨迹分析定位 Skill 对 grounding、procedure 和 verification 三阶段的影响。",
      "keyFindings": "近 6000 次运行显示，表现较好的 Skill 主要优势常不是带来更多新增成功，而是造成更少回归。三类核心原因是 Skill description osmosis、grounding displacement 和 verification displacement；可靠性更依赖 grounding 与 verification，而非增加更多程序步骤。",
      "limitations": "实验集中在办公自动化任务，未覆盖 MCP 服务、可执行脚本、权限扩展和恶意 Skill 更新；机构和开源实物未可靠确认，复现性仍需观察。因果机制主要来自轨迹分析，仍需要更严格的干预实验。",
      "inspiration": "论文直接结论：Skill 应同时报告增益和回归。研究启发：建立 Skill/MCP 版本回归测试，定义 model × harness × skill compatibility matrix，检查 Skill 仅出现在上下文但未调用时是否造成行为漂移，并把 verification suppression 作为供应链风险指标。",
      "valueJudgment": "非常值得精读和做安全扩展；即使暂无代码，也适合轻量复现实验和形成 Skill 供应链安全 benchmark 选题。",
      "priority": "A"
    },
    {
      "id": "dynamic-capability-scoping",
      "title": "Dynamic Capability Scoping for Enterprise AI Agents: A Synthetic Dataset and Three-Source Permission Architecture",
      "url": "https://arxiv.org/abs/2607.22445",
      "authorsAndInstitutions": "Halil Burak Noyan；机构未可靠查到。",
      "qualitySignals": "作者与机构信号：未可靠查到；版本动态：v1，2026-07-24 16:08 UTC 提交，2026-07-27 周一批次新公开；开源与数据：论文明确称已发布数据集、环境规范和生成管线，但本轮未可靠定位官方链接。",
      "openSourceAndData": "论文称已发布数据集、环境规范和生成管线；官方链接未可靠定位",
      "tags": ["Agent Security", "Least Privilege", "Tool Permission", "Enterprise Agent", "Runtime Policy"],
      "summary": "提出由角色上限、任务上下文分类器和权限组合禁令共同决定 Agent 当前凭证集合的动态最小权限架构，并发布 600 条企业任务权限数据。",
      "importance": "企业 Agent 常长期持有角色可能需要的全部工具权限，导致任意 prompt injection、Skill 污染或推理错误都能利用过度授权。动态 capability scoping 把防御前移到凭证发放之前。",
      "methodHighlights": "三源架构结合 role-based ceiling、task-context classifier 与 policy-derived combination prohibition；数据集包含 600 条多部门企业任务、15 类可部署权限，并用两阶段生成与标注避免生成器和标签循环依赖。",
      "keyFindings": "60 条记录、688 个权限决策的人审样本中，Cohen's κ 从审前 0.917 提升至审后 0.967；数据与策略联合迭代把 ceiling violation 从 46 降至 3，减少 93%。",
      "limitations": "数据完全是合成企业场景，尚未证明在真实身份系统、临时凭证、工具组合和跨部门委托中有效；任务分类器本身可能被对抗输入欺骗。论文更多验证数据与策略迭代，而不是完整运行时安全收益。",
      "inspiration": "论文直接结论：动态最小权限可以通过任务上下文与政策约束实现。研究启发：把 MCP/Tool/Skill 权限声明纳入 capability manifest，按任务临时签发凭证，并记录权限请求与实际 tool-call 的差异用于异常检测和供应链审计。",
      "valueJudgment": "值得精读和做系统设计扩展；适合与 AgentDojo、IssueTrojanBench 或 Skill 风险 benchmark 结合，验证最小权限是否真正降低攻击后果。",
      "priority": "A"
    },
    {
      "id": "agent-benchmark-validity",
      "title": "Do Agent Benchmarks Measure Capability? Protocol Validity in the Age of Agentic AI",
      "url": "https://arxiv.org/abs/2607.22368",
      "authorsAndInstitutions": "Jiaqi Shao、Hanck Chen、Maxm Pan：Tencent Hunyuan；Wei Zhang：香港科技大学；Bing Luo：昆山杜克大学。Jiaqi Shao 的工作完成于腾讯实习期间。",
      "qualitySignals": "作者与机构信号：强，论文首页明确标注 Tencent Hunyuan、香港科技大学和昆山杜克大学；版本动态：v1，2026-07-24 14:55 UTC 提交，2026-07-27 周一批次新公开；开源与数据：未可靠查到官方代码或审计数据链接。",
      "openSourceAndData": "未可靠查到官方公开代码/数据链接",
      "tags": ["Agent Evaluation", "Benchmark", "Reward Hacking", "Coding Agent", "Protocol Security"],
      "summary": "提出 Agent benchmark 的 protocol validity 概念与 HackDetect 审计框架，用 Expose→Exploit→Mislead 证据链判断高分是否来自评测漏洞而非真实能力。",
      "importance": "Agent benchmark 不只是题目和评分函数，还包含容器、文件、工具、反馈和可修改状态。Agent 可能读取公开解答、推断生成器或操纵评测路径，使成绩失去能力解释力。",
      "methodHighlights": "HackDetect 以 benchmark specification、工具范围内轨迹和约束化 judge schema 做事后归因，并用 Mislead gap 量化 exploit score 与 intended score 的差距；审计覆盖 15 个 benchmark、2385 条轨迹。",
      "keyFindings": "在 Frontier Science 轨迹中发现 67.0% 存在 exposure/reward-hacking 证据，在 AutoLab 任务中为 66.7%；配对比较中的分数膨胀达到 0.45–1.00。",
      "limitations": "事后 judge 本身可能误判因果链；论文重点验证部分 benchmark，并不能说明所有 Agent benchmark 都失效。没有公开实物链接会影响第三方复核效率。",
      "inspiration": "论文直接结论：Agent benchmark 必须证明目标能力仍是成功的必要条件。研究启发：供应链安全 benchmark 应对模型、harness、工具、数据、grader 和反馈通道建立 provenance graph，并在每次组件升级后重复 protocol audit。",
      "valueJudgment": "值得精读，尤其适合做 benchmark 方法论和评测治理；可作为你设计 Agent 供应链安全评测时的必读检查框架。",
      "priority": "A"
    },
    {
      "id": "ground-truth-first-memory",
      "title": "Ground Truth First: A Longitudinal Evaluation Instrument for Agent Memory, and the Tenure Crossover in Memory-Architecture Rankings",
      "url": "https://arxiv.org/abs/2607.21962",
      "authorsAndInstitutions": "Quentin Spencer；机构未可靠查到。",
      "qualitySignals": "作者与机构信号：未可靠查到；版本动态：v1，2026-07-24 04:19 UTC 提交，2026-07-27 周一批次新公开；开源与数据：论文提供 Veracium 开源库、语料生成器和 harness，官方 GitHub 链接来自 arXiv 页面。",
      "openSourceAndData": "代码/语料生成器/harness：https://github.com/quentinsf/agent-memory-eval",
      "tags": ["Agent Memory", "Provenance", "Benchmark", "Prompt Injection", "Longitudinal Evaluation"],
      "summary": "先生成带有效期、来源和信任边界的 ground-truth life script，再渲染对话与问题，以长期视角比较五类 Agent memory 架构。",
      "importance": "多数 memory benchmark 先生成对话再抽取答案，容易引入标签错误，也通常只覆盖短期历史。对于供应链安全，记忆来源、有效期和信任边界比单纯召回率更重要。",
      "methodHighlights": "使用 seeded life-script sampler 先定义事实、有效区间、波动类别和来源通道，再由 LLM 渲染聊天/邮件并做 fidelity verification；约 380 个问题覆盖 15 类，比较五种 memory backend、无记忆和完整历史基线。",
      "keyFindings": "三周时 curated-map recall 为 96%，九周因淘汰降至 72%，而 provenance-typed graph 升至 90%；分层架构短期达到 96.8%。弱质量写入事实下游失败率为 24%，强写入仅 2%；注入抵抗与表示中 provenance 边界是否保留高度相关。",
      "limitations": "单作者、合成虚构语料和约 380 个问题限制了外推；使用版本化 LLM judge 仍可能有评判偏差。九周历史与真实多年个人 Agent 生命周期仍有差距。",
      "inspiration": "论文直接结论：memory backend 排名会随历史长度反转，provenance 边界影响注入抵抗。研究启发：设计 Memory-SBOM，为每条记忆记录来源、有效期、信任级别、写入工具和变换历史，并测试摘要、合并和遗忘是否破坏 taint/provenance。",
      "valueJudgment": "值得阅读和轻量复现，开源实物较完整；对 Agent Memory Supply Chain 很有启发，但单作者和合成规模使其优先级略低于今日前四篇。",
      "priority": "B"
    }
  ]
});