// 2026-07-31 LLM / Agent 科研日报
window.RESEARCH_REPORTS.push({
  "date": "2026-07-31",
  "title": "LLM / Agent 科研日报",
  "generatedAt": "2026-07-31 10:00（北京时间）",
  "brief": {
    "summary": "今日严格筛选 5 篇值得看的论文：A 级 3 篇、B 级 2 篇、C 级 0 篇。今日公开批次集中讨论 instruction hierarchy、长程 Agent 人工监督、Agent 失败知识的可复用表示、依赖一致性 RAG 缓存，以及可复现的 agentic-search harness。",
    "trendAssessment": "今日主线是 Agent 安全与可靠性控制从单一 prompt 规则向模型内部层级控制、可观测与可干预运行界面、轨迹失败知识、依赖指纹和环境 provenance 扩展。对 LLM/Agent 供应链安全而言，system/user/tool 指令优先级、模型 KV-cache 干预、AgentGUI 与自动 drift prevention、runtime skill、文档与工具版本指纹、检索环境和 tool contract 都应纳入版本化、审计和回归测试。质量信号方面，V-Steer 来自 UIUC 且已被 COLM 2026 接收；AgentGUI 提供项目页、代码与演示；AdaMAST 为旧论文当日 replacement 更新且来自 Berkeley/Databricks 等强团队；SimpleWikiSearch 提供代码和数据。"
  },
  "topPicks": ["v-steer", "agentgui"],
  "topPickRationales": {
    "v-steer": "优先精读，因为它直接处理 system、user、history 与 tool output 冲突这一 Agent 安全核心问题，并用训练外、一次 prefill 的 KV-cache value steering 恢复高优先级指令影响。UIUC 团队、COLM 2026 接收和官方代码构成强质量信号；适合扩展到 prompt/tool provenance、模型版本兼容和运行时策略回归。",
    "agentgui": "优先精读，因为它把长程 Agent 的人工监督从日志阅读转化为可视化、手动与自动 steering 控制面。用户研究显示关键轨迹信息定位加快 38%，自动 drift prevention 对小模型最高提升 34 个百分点；代码、项目页和 demo 完整，适合进一步研究可审计运行时、人工审批和多 Agent 控制台。"
  },
  "papers": [
    {
      "id": "v-steer",
      "title": "Steering Instruction Hierarchies at Inference Time",
      "url": "https://arxiv.org/abs/2607.26228",
      "authorsAndInstitutions": "Siqi Zeng、Sewoong Lee、Han Zhao、Julia Hockenmaier；University of Illinois Urbana-Champaign，Siebel School of Computing and Data Science。",
      "qualitySignals": "作者与机构信号：强，论文首页明确标注 UIUC，且论文已作为 COLM 2026 conference paper 发表；版本动态：arXiv:2607.26228 v1，2026-07-28 20:06 UTC 提交，进入当前公开窗口；开源与数据：官方代码 https://github.com/cindy2000sh/v-steer。",
      "openSourceAndData": [{"label":"官方代码","url":"https://github.com/cindy2000sh/v-steer","note":"V-Steer 实现与实验配置"}],
      "tags": ["LLM", "Agent Security", "Instruction Hierarchy", "Prompt Injection", "Tool Output", "Runtime Policy"],
      "summary": "通过编辑 prompt 位置的 KV-cache value vectors，在无需训练的情况下恢复高优先级指令对模型输出的控制。",
      "importance": "Agent 依赖 system、developer、user、history 和 tool output 之间的指令优先级维持安全边界，但前沿模型常被低优先级内容压过。单纯重复层级规则或依赖 prompt engineering 不能稳定解决冲突，而重新训练成本高且受模型版本约束。",
      "methodHighlights": "V-Steer 用第一步 next-token 的 Direct Logit Attribution 定位低优先级 span 贡献超过高优先级 span 的 attention heads，然后仅在 prefill 后对相应 cached value vectors 做 boost/suppress 编辑。方法不修改 fused attention kernel，修改后的 KV cache 可在后续解码复用，避免每 token 干预。",
      "keyFindings": "在 7B–70B 的 Llama 和 Qwen 模型上，受控角色冲突 benchmark 的 primary-constraint accuracy 从低于 18% 提升到最高 92%；在更广的 instruction hierarchy 评测中，方法在四个模型规模中的三个匹配或超过训练型 SoTA，并保持几乎不变的解码速度。",
      "limitations": "方法需要识别高、低优先级 span，并能访问开源模型内部 KV cache，因此难以直接用于闭源 API。对复杂多段冲突、跨轮次权限变化和恶意适应性攻击的覆盖仍有限，内部 steering 也不等于端到端工具权限控制。",
      "inspiration": "论文直接结论：模型内部 value-cache steering 可在推理时加强 instruction hierarchy。研究启发：可把 system prompt、Skill、MCP tool output、memory 和 runtime policy 的来源与优先级写入 provenance manifest，并对模型版本更新后的 hierarchy compliance 做安全回归。",
      "valueJudgment": "非常值得精读和轻量复现；与 prompt/tool 供应链安全直接相关，代码和实验信号较强。",
      "priority": "A"
    },
    {
      "id": "agentgui",
      "title": "AgentGUI: An Interface for Observing and Steering Long-Running AI Agents",
      "url": "https://arxiv.org/abs/2607.26300",
      "authorsAndInstitutions": "Xuan Zhao、Jiwoong Sohn、Qinyue Zheng、Michael Moor；机构信息未从摘要页可靠确认，官方代码位于 ETH Medical AI Lab 组织，但不据此推断全部作者机构。",
      "qualitySignals": "作者与机构信号：中，官方项目和代码由研究团队维护，但论文摘要页未完整列出机构；版本动态：arXiv:2607.26300 v1，2026-07-28 21:47 UTC 提交；开源与数据：项目页 https://agent-gui-project.github.io ，官方代码 https://github.com/eth-medical-ai-lab/agent-gui ，并提供 demo 视频。",
      "openSourceAndData": [{"label":"项目主页","url":"https://agent-gui-project.github.io","note":"系统介绍与演示"},{"label":"官方代码","url":"https://github.com/eth-medical-ai-lab/agent-gui","note":"AgentGUI 开源实现"}],
      "tags": ["Agent", "Human-in-the-loop", "Runtime Policy", "Observability", "Long-running Agent", "Multi-agent"],
      "summary": "提供一个本地 GUI，用于同时观察、理解和人工或自动 steering 多个长程 Agent 会话。",
      "importance": "Agent 的自主任务持续时间和并发会话数量增长后，原始日志难以支持及时监督。人工很难定位关键轨迹、理解状态漂移并在不可逆动作前介入，形成运行时可观测性和控制缺口。",
      "methodHighlights": "AgentGUI 将多框架 Agent 轨迹统一可视化，支持手动 steering、自动 drift prevention 和跨开源/闭源 Agent 框架协调。系统强调本地部署，降低轨迹数据外泄，并把监督行为嵌入长期任务工作流。",
      "keyFindings": "受控用户研究中，参与者定位 Agent trace 关键元素的时间缩短 38%，p=0.023；自动 drift prevention 在 0.8B–9B 模型阶梯上对小型本地 Agent 的任务完成率最高提升 34 个百分点，每个模型使用 50 次运行。",
      "limitations": "用户研究规模和任务范围有限，自动 drift 判定本身可能误拦截或漏报；GUI 提升可见性不等于完成授权、数据隔离和工具调用验证。多框架适配层也会成为新的供应链依赖。",
      "inspiration": "论文直接结论：可视化与 steering 能改善长程 Agent 的监督效率和任务稳定性。研究启发：可加入 action provenance、Skill/MCP 版本、权限变化、不可逆动作审批和 tamper-evident trace，使 GUI 成为 Agent 运行时安全控制面。",
      "valueJudgment": "值得精读和试用；开源实物完整，适合扩展为 Agent 安全运营台和人工审批研究。",
      "priority": "A"
    },
    {
      "id": "adamast-taxonomy",
      "title": "Fantastic Adaptive Taxonomies and How to Use Them",
      "url": "https://arxiv.org/abs/2607.16387",
      "authorsAndInstitutions": "Mert Cemri、Andrei Cojocaru、Melissa Pan、Shu Liu、Shubham Agarwal、Alexander Krentsel、Jay Tang、Kannan Ramchandran、Joseph E. Gonzalez、Matei Zaharia、Alex Dimakis、Ion Stoica；论文团队包含 UC Berkeley、Databricks 等，具体作者映射以论文首页为准。",
      "qualitySignals": "作者与机构信号：强，包含长期从事系统与 Agent 研究的 Berkeley/Databricks 团队；版本动态：旧论文当日 replacement 更新，原始 v1 于 2026-07-17 提交，本次更新进入当前 replacement 列表，具体新版本号与变更摘要需以 arXiv submission history 核验；开源与数据：本轮未可靠定位官方代码入口。",
      "openSourceAndData": "未可靠查到官方公开代码/数据入口",
      "tags": ["Coding Agent", "Agent Skill", "Failure Taxonomy", "Runtime Monitoring", "SWE-bench", "Evaluation"],
      "summary": "从 Agent 自身执行轨迹自动归纳可复用失败分类，并将其用于系统搜索、运行时 Skill 和轨迹选择。",
      "importance": "原始 Agent trace 长、实例化且缺乏稳定词汇，难以跨任务积累失败经验。自由文本反思还会随模型和 prompt 漂移，无法成为可靠的回归与治理接口。",
      "methodHighlights": "AdaMAST 从目标系统轨迹中归纳 system-level、role-specific 和 domain-specific 三轴失败代码，每个名称、定义和证据模式都从轨迹生成，无需人工标注。相同 taxonomy 被复用于 agent-system search、runtime feedback 和 trajectory selection。",
      "keyFindings": "taxonomy-coded diagnosis 在五个 benchmark 上均优于自由文本反思；SWE-agent 在 SWE-bench Verified Mini 上从 60% 提升到 70%，Claude Code 作为 runtime skill 从 64.0% 提升到 70.7%；AdaMAST-Judge 在 Terminal-Bench 2.0 上相对 Pass@1 提升 8–15 个百分点。",
      "limitations": "自动归纳的 taxonomy 仍可能受生成模型偏差影响，并可能把偶然失败模式固化为运行时规则。不同领域 taxonomy 共享代码较少，说明迁移能力有限；当前 replacement 的具体修改内容未可靠确认。",
      "inspiration": "论文直接结论：结构化失败 taxonomy 比原始 trace 和自由文本反思更适合作为 Agent 改进接口。研究启发：可将失败代码、证据 trace、模型/harness/Skill 版本和修复状态纳入 Behavioral SBOM，作为供应链升级后的回归知识库。",
      "valueJudgment": "非常值得跟踪；团队和实验质量信号强，且与 runtime skill 和行为回归高度相关。",
      "priority": "A"
    },
    {
      "id": "fincacheserve",
      "title": "FinCacheServe: Dependency-Consistent Answer Reuse for Cost-Efficient RAG Serving over Mutable Enterprise Documents",
      "url": "https://arxiv.org/abs/2607.26076",
      "authorsAndInstitutions": "Lingteng Zeng、Yifan Jin；机构未可靠查到。",
      "qualitySignals": "作者与机构信号：未可靠查到；版本动态：arXiv:2607.26076 v1，2026-07-14 提交并进入当前新公开列表；开源与数据：论文描述 vLLM 实现和 SEC-derived workloads，但未可靠查到官方代码或数据入口。",
      "openSourceAndData": "未可靠查到官方公开代码/数据入口",
      "tags": ["RAG", "Caching", "Data Provenance", "Tool Fingerprint", "Model Version", "Supply-chain Security"],
      "summary": "把 RAG 答案缓存与文档版本、证据、工具、模型和解码配置绑定，避免复用已过期依赖生成的答案。",
      "importance": "普通语义缓存只判断请求相似，却不能保证底层文件、证据块、tool output、模型或解码配置未变化。在企业文档持续更新时，这会产生静默的 stale answer 和数据供应链一致性问题。",
      "methodHighlights": "FinCacheServe 将答案视为带 dependency manifest 的 serving object，以 enterprise intent 建索引，同时用 document version、evidence fingerprint、tool fingerprint、model identity 和 decoding configuration 作为复用 gate，并在 vLLM 上实现。",
      "keyFindings": "在 2,230-request 的 7B trace 上跳过 53.27% LLM 调用且未观察到 dependency-stale 输出；三组 32B 运行中跳过 53.31% 的 544 个请求，高于 versioned semantic caching 的 38.97% 和 grounded-style reuse 的 22.43%；每个 dependency-fresh 2s-SLO 成功的估算能耗降低 44.30%。",
      "limitations": "实验集中于 SEC 衍生金融文档与有限模型，zero observed stale outputs 不等于形式化保证。fingerprint 只能检测被纳入 manifest 的依赖，无法覆盖外部 API 状态、隐藏 prompt 或不透明模型更新。",
      "inspiration": "论文直接结论：RAG 缓存必须基于依赖一致性而非仅语义相似。研究启发：可把相同思想扩展到 Agent response、Skill output 和 tool-result cache，形成包含模型、prompt、document、tool 和 policy 版本的可验证 cache SBOM。",
      "valueJudgment": "值得阅读和系统复现，直接关联 RAG 与工具数据供应链的一致性治理。",
      "priority": "B"
    },
    {
      "id": "simplewikisearch",
      "title": "SimpleWikiSearch: A Clean Offline Wikipedia Environment for Agentic Search",
      "url": "https://arxiv.org/abs/2607.26070",
      "authorsAndInstitutions": "Guanming Xiong、Penghui Zhang；机构未可靠查到。",
      "qualitySignals": "作者与机构信号：未可靠查到；版本动态：arXiv:2607.26070 v1，进入当前公开列表；开源与数据：论文提供官方代码和数据入口，具体仓库由 arXiv 原文链接给出。",
      "openSourceAndData": "论文在 arXiv 原文提供官方代码与数据链接；本轮未可靠提取具体 URL",
      "tags": ["Agentic Search", "RAG", "Agent Harness", "Benchmark", "Reproducibility", "Tool Contract"],
      "summary": "提供一个语料、索引、工具接口和评测协议均明确可运行的离线 Wikipedia Agent 搜索环境。",
      "importance": "Agentic-search 分数不仅取决于模型，还受 Wikipedia snapshot、清洗、chunking、retrieval backend、tool schema、observation format 和答案提交规则影响。环境细节未说明会导致 benchmark 不可复现和排名失真。",
      "methodHighlights": "系统从完整英文 Wikipedia dump 构建清洗语料、keyword/dense indexes，并只暴露 search、open_url 和 submit_answer 三个明确工具；在六个 QA 数据集上提供开源模型基线和商业模型 random-300 子集。",
      "keyFindings": "论文的主要贡献是指定并发布可运行 reference environment，而非新 Agent 算法。实验表明在统一语料、检索和工具契约下可进行可复现比较，并减少不同系统因环境隐藏差异造成的混淆。",
      "limitations": "Wikipedia 离线环境不能代表动态网页、权限、恶意内容和真实网络失败；最小工具接口可能低估复杂搜索 Agent 的能力与风险。论文摘要未给出完整的安全对抗实验。",
      "inspiration": "论文直接结论：Agentic-search 评测必须显式固定环境与 tool contract。研究启发：可建立 Search-Evaluation SBOM，记录语料快照、chunker、index、retriever、tool schema、harness、grader 与模型版本，并注入检索污染和版本漂移测试。",
      "valueJudgment": "值得阅读和作为 benchmark 基础设施使用；安全贡献间接，但对评测供应链可复现性很重要。",
      "priority": "B"
    }
  ]
});
