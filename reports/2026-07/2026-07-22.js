// 2026-07-22 科研日报：按月目录拆分，便于网页发布和维护。
window.RESEARCH_REPORTS.push({
  "date": "2026-07-22",
  "title": "LLM / Agent 科研日报",
  "generatedAt": "2026-07-22 10:06（北京时间）",
  "brief": {
    "summary": "今日 7 篇推荐集中在三条主线：Agent 的持久状态与检索证据安全、长上下文下的可靠性与成本控制、以及技能和能力资产的可检索化。最值得精读的是两篇安全论文：一篇把本地 Agent 的自状态篡改变成可分析的 OS 防御问题，另一篇揭示“事实都是真的”也能误导多跳 RAG。",
    "trendAssessment": "研究重心正从“模型会不会被提示注入”扩展到“Agent 依赖的状态、文档呈现、技能包和工具输出是否可被操纵”。共同信号是：仅靠通用自检或内容真实性不够，系统需要外部检查、工作负载条件化监控、可审计的证据链，以及对上下文预算的工程约束。"
  },
  "topPicks": [
    "self-state-attacks",
    "salience-induction"
  ],
  "papers": [
    {
      "id": "self-state-attacks",
      "title": "Self-State Attacks on Self-Hosted AI Agents: How Far Can OS Defenses Go?",
      "url": "https://arxiv.org/abs/2607.17986",
      "authorsAndInstitutions": "Yimeng Chen、Nathanaël Denis、Roberto Di Pietro、Jürgen Schmidhuber；KAUST 生成式 AI 卓越中心，Jürgen Schmidhuber 同时隶属 The Swiss AI Lab, IDSIA-USI/SUPSI。",
      "tags": [
        "Agent 安全",
        "供应链安全",
        "持久状态",
        "OS 防御"
      ],
      "summary": "定义“自状态攻击”：被诱导失控的本地 Agent 借合法文件写权限篡改自己的记忆、指令或配置，从而持续改变后续行为。",
      "importance": "它把 Agent 安全的关键资产从提示词延伸到 memory、AGENTS.md、工具清单和配置文件；这正贴近 LLM/Agent 供应链中的技能、状态与运行时完整性问题。",
      "methodHighlights": "提出目标、机制、粒度、时间四轴攻击空间；在代表性自托管 Agent 的多类工作负载上注入 23 个攻击单元、43 种具体操作，并比较访问控制、工作负载条件化检测与周期备份的组合。",
      "limitations": "威胁模型已假定 Agent 的决策过程先被攻陷，重点只在 OS 层的后果与防御；作者也证明部分合法与恶意写入在系统调用层结构性不可区分，不能把分层防御理解为彻底解决。",
      "inspiration": "适合作为“Agent 自状态供应链”选题的威胁模型起点：把技能、记忆、配置分层建模，为每层定义签名、最小写权限、不可变快照和可回滚审计。",
      "valueJudgment": "值得做技术解读和复现实验。其价值不只是一组攻击，而是清楚说明为什么权限隔离单独不足，并给出可落地的监控与恢复分工。",
      "priority": "A"
    },
    {
      "id": "salience-induction",
      "title": "Salience Induction against Multi-Hop RAG Agents: Threat and Defense",
      "url": "https://arxiv.org/abs/2607.17535",
      "authorsAndInstitutions": "Xingfu Zhou、Pengfei Wang、Yuan Zhou、Wei Xie、Xu Zhou；均来自 National University of Defense Technology（中国）。",
      "tags": [
        "RAG 安全",
        "Agent",
        "多跳推理",
        "供应链安全"
      ],
      "summary": "提出 Salience Induction：攻击者不注入假事实或指令，只调整事实的位置、强调和语义邻近性，就能让多跳 RAG Agent 绑定到错误实体。",
      "importance": "它说明“来源真实、无提示注入”并不等于推理安全；对企业知识库、开放网页 RAG 和文档供应链而言，版式与叙述方式本身也是攻击面。",
      "methodHighlights": "归纳六类显著性编辑算子，构建满足真实性与隐蔽性约束的 proposer-verifier 流程，并发布 524 样本、144 测试样本的 SalientWiki-MH；在 5 个模型家族和 3 类 Agent 架构上测试。30% 编辑预算下攻击成功率 83.3%，其 Salience Normalization 防御将标准攻击降至 15.3%。",
      "limitations": "基准以构造的 Wikipedia 多跳问答为主，真实企业文档、复杂权限与检索排序下的迁移性仍待验证；自适应攻击下仍有 23.6% 成功率，防御不是终点。",
      "inspiration": "可延展到 Agent 技能/插件描述的“呈现完整性”：除内容签名外，研究如何规范化元数据、排序与强调信号，避免检索或路由被真实但误导的描述劫持。",
      "valueJudgment": "非常值得精读、技术解读和复现。它提出了比“真假”更细的证据安全维度，也提供了攻击、数据集和轻量防御的完整闭环。",
      "priority": "A"
    },
    {
      "id": "agent-skills-long-contexts",
      "title": "How Agent Skills Fail under Long Contexts: A White-Box Study in Code Auditing",
      "url": "https://arxiv.org/abs/2607.17937",
      "authorsAndInstitutions": "Yue Xue；Independent Researcher。",
      "tags": [
        "Agent Skills",
        "长上下文",
        "软件工程 Agent",
        "评测"
      ],
      "summary": "在白盒代码审计任务中，技能被正确加载也不代表 Agent 会持续执行其中每一项要求；长上下文会放大遗漏、编辑漂移和检查失败。",
      "importance": "对 Agent 技能供应链很直接：技能文件不是可执行保证，必须把关键要求转化为独立、外部、可验证的检查，而不能依赖 Agent 自己记住。",
      "methodHighlights": "固定任务与 24 项工件检查，只改变上下文长度和相关性；将失败分为需求丢失、编辑漂移、检查失败、运行时/评测器失败四类。主任务中 gpt-5.4-mini 从干净上下文的 8/10 通过降至两种长上下文的 3/10；详细外部清单达到 10/10。",
      "limitations": "样本量很小且主效应的 Fisher 检验仅趋势级；第二个任务没有同样退化，作者也明确不主张存在通用的上下文长度阈值。",
      "inspiration": "可把技能发布流程拆成“自然语言技能 + 机器可检验契约 + 独立验证器”，并研究长上下文、技能组合与外部检查在供应链中的失效边界。",
      "valueJudgment": "适合做方法论解读和小规模复现。它的贡献是透明失败分类，而非提出万能长上下文理论；对工程实践尤其有用。",
      "priority": "B"
    },
    {
      "id": "drnoise",
      "title": "DRNoise: Benchmarking Deep Research Agents in Misleading Evidence Environments",
      "url": "https://arxiv.org/abs/2607.17291",
      "authorsAndInstitutions": "Jun Nie、Zhiqin Yang、Zhenheng Tang、Yonggang Zhang、Xiaowen Chu、Xinmei Tian、Bo Han；Hong Kong Baptist University、University of Science and Technology of China、The Hong Kong University of Science and Technology。",
      "tags": [
        "Deep Research Agent",
        "证据安全",
        "RAG",
        "评测"
      ],
      "summary": "构建 DRNoise，测试深度研究 Agent 面对一篇“看起来合理但直接给出错误答案”的文档时，能否继续用两条间接证据链完成核验。",
      "importance": "这对应真实信息供应链的核心风险：Agent 可能已经找到了真记录，却因一份答案式摘要而过早停止，最终给出有引用但错误的结论。",
      "methodHighlights": "100 个任务覆盖 10 类证据操作；每题有两条支撑唯一答案的间接记录链，噪声条件仅额外加入一份直接冲突的普通文档。实验显示单份误导文档可使强 Agent 准确率下降 66–88 个百分点，并将主要机制定位为 verification inertia（验证惰性）。",
      "limitations": "任务是受控合成的操作记录环境，不能直接等同开放网页的来源声誉、时效性和恶意 SEO；它刻画的是证据使用策略，而非完整的网页攻击面。",
      "inspiration": "可用于设计 Agent 供应链的“证据终止条件”：高风险结论必须满足多源交叉、冲突解释和可追溯的记录级证据，而非仅获得一条直接答案。",
      "valueJudgment": "值得精读并作为安全评测基线参考。其 paired clean/noisy 设计特别适合区分“能力不足”与“已具能力但部署失当”。",
      "priority": "B"
    },
    {
      "id": "agent-capability-retrieval",
      "title": "Adapting Embedding Models for Agent Capability Retrieval",
      "url": "https://arxiv.org/abs/2607.17347",
      "authorsAndInstitutions": "Tingwei Chen、Yunxiao Shi、Zhengdong Chu、Qingsong Wen、Min Xu；arXiv 页面未列出机构，待以正式版本核验。",
      "tags": [
        "Agent Marketplace",
        "Capability Retrieval",
        "Skills",
        "Embedding"
      ],
      "summary": "研究如何把通用文本检索模型适配为“从 Agent、工具包和技能包的混合目录中检索可执行能力”的检索器。",
      "importance": "Agent 市场的发现层会决定用户最终加载哪个技能或工具；能力检索若不可靠，既影响可用性，也会放大描述投毒、同名伪装和供应链选择风险。",
      "methodHighlights": "在 AgentSelect 的公开元数据能力画像上微调 BGE-base、KaLM-v1.5、EasyRec，并迁移到未见过的 MuleRun 原生 Agent 与含 50 个技能、1,000 查询的 ClawHub 基准；作者报告适配在两个目录均有帮助。",
      "limitations": "论文目前只报告公开元数据画像和有限目录的迁移，代码与数据待发表后发布；没有直接评估恶意技能描述、身份认证或安全约束下的检索鲁棒性。",
      "inspiration": "可把安全属性并入 capability profile，例如来源、签名、权限、依赖、风险标签和行为证据，研究“能力匹配 + 信任匹配”而不只是语义相似度。",
      "valueJudgment": "适合关注 Agent 市场与技能供应链的人做定向学习；可作为后续安全检索或安全路由研究的基础，但现阶段复现价值受代码数据未发布限制。",
      "priority": "C"
    },
    {
      "id": "progressive-disclosure",
      "title": "Is Progressive Disclosure All You Need for Long-Context Agents?",
      "url": "https://arxiv.org/abs/2607.17598",
      "authorsAndInstitutions": "Yifeng He、Jicheng Wang：University of California, Davis；Yinzhe Zhao：Zhejiang University；Hao Chen：The University of Hong Kong。",
      "tags": [
        "长上下文",
        "Agent Skills",
        "RAG",
        "评测"
      ],
      "summary": "首次受控比较原始文档导航、单层渐进披露技能包、双层路由技能包和混合检索，结论是渐进披露在大语料规模下有效，但层级越深不一定越好。",
      "importance": "技能包正在成为 Agent 知识与流程供应链的基本封装；这篇论文给出证据：它主要节省上下文导航，而不是替代模型能力或一切检索。",
      "methodHighlights": "在三个 Agent harness、三个模型家族的长文档问答设置中比较多种设计。单书任务的收益依赖 harness；扩展到多书库时，单层披露比直接读原文退化更慢，而第二层路由无收益且有时明显伤害准确率。",
      "limitations": "实验围绕书级问答与特定 harness，不能直接外推到代码库、动态工具 API 或对抗性技能目录；作者也只验证了有限的语料规模和路由深度。",
      "inspiration": "对技能供应链的设计启示是：优先一层、可审计的索引与按需加载；不要为“更智能”堆叠路由层级，并把路由描述本身纳入安全审查。",
      "valueJudgment": "值得精读和复现其中的单层/多层对照。它为工程上流行的 progressive disclosure 提供了难得的边界条件，而不是口号式背书。",
      "priority": "B"
    },
    {
      "id": "swe-pruner-pro",
      "title": "SWE-Pruner Pro: The Coder LLM Already Knows What to Prune",
      "url": "https://arxiv.org/abs/2607.18213",
      "authorsAndInstitutions": "Yuhang Wang、Yuling Shi、Shaoqiu Zhang、Jialiang Liang、Shilin He、Siyu Ye、Yuting Chen、Kai Cai、Xiaodong Gu；arXiv HTML 未完整列出作者机构，通讯邮箱域名指向 Shanghai Jiao Tong University。",
      "tags": [
        "Coding Agent",
        "Context Pruning",
        "软件工程",
        "效率"
      ],
      "summary": "利用编码 Agent 自身读工具输出时产生的内部表示，直接判断每一行该保留还是剪掉，避免再调用一个独立的剪枝模型。",
      "importance": "长轨迹 Agent 的工具输出是成本和可靠性瓶颈；若可在 Agent 内部复用已有表示，能同时降低上下文供应链的带宽、成本和无关信息暴露。",
      "methodHighlights": "冻结 Agent 骨干，在工具输出预填充阶段读取最后层表示；用带长度嵌入的轻量头输出行级 keep/prune，并使用样本平衡 focal loss。两种开源骨干、四个多轮基准上最高节省 39% token，作者报告部分设置任务质量不降甚至提升。",
      "limitations": "评估集中于两种开源骨干和特定代码/终端基准；行级标签依赖外部 LLM 标注，跨模型和跨工具格式的泛化、以及错剪关键安全证据的代价仍需进一步评估。",
      "inspiration": "可研究“安全感知剪枝”：对权限变更、依赖安装、外部指令和凭证相关输出设置不可剪或需审计的保留规则，把效率优化与安全证据保全结合。",
      "valueJudgment": "适合做实现向技术解读和工程复现。方法紧凑，系统收益明确；但部署前应补充针对安全关键输出的保真度评测。",
      "priority": "B"
    }
  ]
});
