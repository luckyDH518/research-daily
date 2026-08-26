// 2026-08-26 LLM / Agent 科研日报
window.RESEARCH_REPORTS.push({
  "date": "2026-08-26",
  "title": "LLM / Agent 科研日报",
  "generatedAt": "2026-08-26 10:02（北京时间）",
  "brief": {
    "summary": "今日严格筛选 4 篇，A/B/C 为 3/1/0。当前 24–36 小时窗口内较有价值的工作集中在 Agent Harness、Skill 生成、科学 Agent 评测和面向轻量模型的 Meta-Harness 优化。它们共同说明：模型能力之外，Harness、Skill、环境、工具协议和任务包结构会直接决定 Agent 的可执行能力与评测结果。与供应链安全最直接的关联是，这些组件应被作为可版本化的行为依赖，并保存 provenance、环境快照、工具契约和验证证据。",
    "trendAssessment": "本期未发现新的 v2/v3 重要更新，入选论文均为窗口内 v1 新发/新公开。研究趋势从单纯比较模型，转向评测和优化模型—Harness—环境联合系统：Prime Agent 通过持久 REPL、记忆、Skill 和恢复机制提高长程任务上限；SkillAlchemy 将开放世界来源材料编译为有证据边界的 Skill；EarthVerse 将动态科学调查中的证据选择、单位一致性和 provenance 纳入端到端评测；MetaCaster 则把 Agent 当作轻量预测器的工程师。对 LLM/Agent 供应链安全而言，应建立 Model/Harness/Skill/Environment/Evaluator 的联合 SBOM，并在任一组件升级后进行行为与成本回归。"
  },
  "topPicks": ["prime-agent", "skillalchemy"],
  "topPickRationales": {
    "prime-agent": "Prime Agent 是本期最值得优先阅读的系统型工作。它把持久 REPL、Continual Harness、Memory、Skill、Sub-agent、Recovery 和资源核算统一放入长程 Agent 运行时，并直接测量 Harness 对模型真实上限的影响。论文报告 ARC-AGI-3 RHAE Best@1 从 30% 提升到 95.5%，且代码已公开。它适合作为 Harness-SBOM、跨模型运行时兼容和长程恢复实验的基线。作者机构未可靠查到，但官方代码和系统实物信号强。",
    "skillalchemy": "SkillAlchemy 与 Skill 供应链的关系最直接。它不是把外部材料直接拼进 Prompt，而是先通过对比证据识别隐含要求，再按证据支持范围接纳程序内容，最后编译为 grammar-guided Skill package。87 个 SkillsBench v1.1 任务上相对 no-skill 提升 19.9pp，相对最强自动基线提升 8.6pp。它适合扩展为 source-grounded Skill admission、证据范围检查和 Skill-BOM。"
  },
  "papers": [
    {
      "id": "prime-agent",
      "title": "Prime Agent: A Self-Improving RLM Harness",
      "url": "https://arxiv.org/abs/2608.23552",
      "authorsAndInstitutions": "Seth Karten、Alex L. Zhang、Kevin Thomas、Sebastian Müller、Elie Bakouch、Daniel Auras、Mika Senghaas、Fares Obeid、Konstantin Dunas、Johannes Hagemann、Sami Jaghouar；机构未可靠查到。",
      "qualitySignals": "作者与机构信号：未可靠查到；版本动态：v1 新发，2026-08-24 17:54:19 UTC；开源与数据：官方代码 https://github.com/PrimeIntellect-ai/prime-agent，论文摘要页直接提供。",
      "openSourceAndData": [{"label":"官方代码","url":"https://github.com/PrimeIntellect-ai/prime-agent","note":"Prime Agent 开源 harness。"}],
      "tags": ["Agent Harness","Long-horizon Agent","Coding Agent","Memory","Skill","Runtime Policy","Self-improvement"],
      "summary": "提出一个面向长程评测和 Coding Agent 的开源 Harness：持久 IPython REPL 承载递归语言模型式上下文处理，Continual Harness 保存历史、Memory、Skill、Prompt 和 Sub-agent 规格，并统一处理恢复、验证和资源核算。",
      "importance": "长程 Agent 的失败很多时候来自 Harness 的上下文管理、恢复和资源控制，而不是模型本身。现有评测若只比较裸模型，容易把 Harness 失败误判为模型能力上限。Prime Agent 直接把这些运行时组件显式化。",
      "methodHighlights": "系统包含持久 REPL、Continual Harness、递归 Sub-agent、Agents View、执行恢复、验证与资源记账，并用于长上下文 Coding、GPU kernel、emulator 构建、ARC-AGI-3 和 Factorio 等任务。",
      "keyFindings": "ARC-AGI-3 RHAE Best@1 从 30% 提升到 95.5%；在长上下文 Coding、GPU-kernel generation、emulator construction 和 autonomous nanoGPT speedrun 上匹配或超过原生及常用 Harness。Factorio 实验显示 refinement 可持续推进技术树，专用 Sub-agent 支持并行工作。",
      "limitations": "摘要未给出完整的跨模型消融和成本分解；Prime Agent 的收益高度依赖具体任务、工具和资源预算。Harness 本身也会引入新的权限、依赖和版本漂移风险。",
      "inspiration": "论文直接结论：持久化上下文、恢复、Skill、Sub-agent 和资源核算可以显著抬高长程 Agent 的可执行上限。研究启发：建立 Harness-SBOM，记录 REPL/runtime、Memory、Skill、Prompt、Sub-agent、Tool、恢复策略、模型版本和资源预算，并在 Harness 升级后进行行为回归。",
      "valueJudgment": "非常值得精读和运行官方代码。适合作为长程 Agent Harness、安全回归和模型—运行时联合评测基线。",
      "priority": "A"
    },
    {
      "id": "skillalchemy",
      "title": "SkillAlchemy: Open-World Agent Skill Creation",
      "url": "https://arxiv.org/abs/2608.23417",
      "authorsAndInstitutions": "Hengjun Wang、Shuyue Wei、Boyi Liu、Jun Yang、Yongxin Tong；机构未可靠查到。",
      "qualitySignals": "作者与机构信号：未可靠查到；版本动态：v1 新发，2026-08-24 15:58:57 UTC；开源与数据：未可靠查到官方代码、数据或项目页。",
      "openSourceAndData": "未可靠查到",
      "tags": ["Agent Skill","Skill Creation","Provenance","Supply-chain Security","Evidence","Evaluation"],
      "summary": "研究从开放世界材料创建 Agent Skill：从 underspecified brief 和 source-access specification 出发，发现被遗漏但与行为相关的要求，按证据支持范围接纳程序，再编译为 grammar-guided Skill package。",
      "importance": "Skill 往往来自外部文档、网页、代码和经验轨迹。如果把来源材料直接当作可信提示，容易把不适用、过度泛化或未经授权的操作带入 Skill。SkillAlchemy 关注的是 Skill 的证据边界和准入，而不是单纯生成更多文本。",
      "methodHighlights": "框架包括 contrastive evidence、evidence-supported scope admission 和 grammar-guided compilation。实验在 SkillsBench v1.1 的 87 个任务上比较 no-skill、自动基线和人工 Skill。",
      "keyFindings": "相对 no-skill，Pass Rate 提升 19.9 个百分点；相对最强自动基线提升 8.6 个百分点；性能接近人工整理 Skill。结果说明来源材料的发现、范围约束和结构化编译比直接拼接外部文本更可靠。",
      "limitations": "作者机构、代码与数据开放情况本轮未可靠确认；实验规模为 87 个任务，不能代表所有开放世界来源。论文摘要也未说明对恶意来源、权限冲突和跨模型兼容的完整覆盖。",
      "inspiration": "论文直接结论：对开放世界材料进行证据约束和范围接纳，可以提升 Skill 创建质量。研究启发：Skill-BOM 应记录 source、evidence span、admitted scope、compiler version、publisher、tool/permission dependency 和 safety regression；Skill 更新前先做 source-grounded admission。",
      "valueJudgment": "值得精读，尤其适合作为 Skill 准入、来源证明和供应链安全扩展的基础。",
      "priority": "A"
    },
    {
      "id": "earthverse",
      "title": "EarthVerse: Benchmarking Scientific Agents Across Dynamic Earth Systems and Natural Hazards",
      "url": "https://arxiv.org/abs/2608.23525",
      "authorsAndInstitutions": "Zhiqing Cui、Xinxiang Yin、Yihong Tang、Xinglang Zhang、Yuanzhe Hu、Siru Zhong、Weidong Tang、Yuxuan Liang、Weijia Li、Ming Jin、Shirui Pan、Yuhao Kang、Dingyi Zhuang、Jinhua Zhao；机构未可靠查到。",
      "qualitySignals": "作者与机构信号：未可靠查到；版本动态：v1 新发，2026-08-24 17:29:16 UTC；开源与数据：论文摘要页说明提供可执行 ground truth、task-specific rubric 和可复现任务包，独立代码链接未可靠查到。",
      "openSourceAndData": "论文声明提供可执行 ground truth、任务级 rubric 和可复现任务包；官方代码链接未可靠查到",
      "tags": ["Scientific Agent","Agent Evaluation","Tool Use","Evidence Provenance","Memory","Reasoning"],
      "summary": "构建面向动态地球系统和自然灾害的科学 Agent benchmark，要求 Agent 在异构事件包中选择兼容证据、执行透明计算、协调来源差异并保留 provenance。",
      "importance": "科学 Agent 的可靠性不只取决于单步答案，还取决于证据、时间尺度、单位、计算和解释链能否保持一致。EarthVerse 把这些链条放入端到端包级调查任务，适合测量真实科学工作流中的行为依赖。",
      "methodHighlights": "包含 405 个可复现任务、199 个有文档记录的事件和 19 个灾害家族；每个任务有细粒度 answer units、可执行 ground truth 和任务级 rubric，并控制工具使用协议。",
      "keyFindings": "在 25 个模型/Agent 系统上，最佳平均 answer-unit accuracy 为 84.65%，但最高 Strict@95 只有 34.81%。差距表明 Agent 能完成局部步骤，却常常无法维持跨证据、尺度、单位、计算和物理解释的一致链条。",
      "limitations": "领域集中在地球系统与自然灾害，不能直接外推到通用 Agent。任务包、工具和 rubric 仍然由 benchmark 作者定义；官方代码开放情况本轮未可靠确认。",
      "inspiration": "论文直接结论：科学 Agent 的端到端一致性远低于单步正确率。研究启发：把 evidence source、tool version、unit handling、memory、provenance 和 rubric 纳入 Scientific-Agent-SBOM，并在数据源或工具更新后重跑链式回归。",
      "valueJudgment": "值得系统阅读，适合作为证据链、工具选择和科学 Agent provenance 的 benchmark 参考。",
      "priority": "B"
    },
    {
      "id": "metacaster",
      "title": "MetaCaster: Meta-Harness-Optimized Agent for End-to-End Few-Shot Learning of Lightweight Time Series Forecasters",
      "url": "https://arxiv.org/abs/2608.23473",
      "authorsAndInstitutions": "ChengAo Shen、Wenchao Yu、Fangyu Wu、Dongjin Song、Hanghang Tong、Dongsheng Luo、Wei Cheng、Haifeng Chen、Jingchao Ni；机构未可靠查到。",
      "qualitySignals": "作者与机构信号：未可靠查到；版本动态：v1 新发，2026-08-24 16:40:25 UTC；开源与数据：未可靠查到官方代码或数据入口。",
      "openSourceAndData": "未可靠查到",
      "tags": ["Agent","Meta-learning","Harness","Time-series","Tool Use","Model Selection"],
      "summary": "提出面向少样本轻量时间序列预测器的 Meta-Harness 优化 Agent，让 Agent 负责数据生成、模型选择和训练准备，而不是直接承担最终预测。",
      "importance": "这项工作说明 Agent 可以作为部署前工程层，为受资源和隐私约束的场景自动准备专用小模型。对供应链安全而言，Meta-Harness、生成数据、候选预测器和最终部署模型共同构成新的行为与模型依赖链。",
      "methodHighlights": "框架使用 agentic data generation 和 meta-harness optimization，把少量样本与文本上下文转化为轻量 forecaster 训练数据，再在 18 个数据集、23 个轻量 forecaster 和 14 个基线中比较。",
      "keyFindings": "论文报告在 18 个数据集、23 个轻量 forecaster 和 14 个基线上的数据效率与计算效率优势，同时保持较高预测质量。摘要未给出单一统一的平均提升数字。",
      "limitations": "机构与官方代码/数据本轮未可靠查到；结果依赖时间序列数据分布、候选模型库和 Meta-Harness 策略。生成数据和自动模型选择也可能引入隐藏偏差或数据污染。",
      "inspiration": "论文直接结论：Agent 可以作为中间工程师，用少量样本准备专用轻量预测器。研究启发：记录 data generator、candidate forecaster、harness、evaluation split、deployment constraints 和 model artifact provenance，并对生成数据和部署模型做污染与回归检查。",
      "valueJudgment": "值得了解，但与 LLM/Agent 供应链安全的直接关联弱于前三篇，适合作为 Agent-as-engineer 和 Meta-Harness 的补充案例。",
      "priority": "B"
    }
  ]
});
