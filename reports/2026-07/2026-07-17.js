// 2026-07-17 科研日报：按月目录拆分，便于网页发布和维护。
window.RESEARCH_REPORTS.push({
  "date": "2026-07-17",
  "title": "arXiv LLM / Agent 论文日报",
  "generatedAt": "2026-07-17 10:00（北京时间）",
  "brief": {
    "summary": "本期重点检查 arXiv 于 7 月 16 日公布、实际提交时间集中在 7 月 15 日 UTC 的论文，筛出 8 篇。没有发现直接聚焦 LLM/Agent 供应链安全、模型依赖投毒、Agent 插件供应链或软件包供应链攻击的高质量新论文，因此不硬凑安全主题；重点转向 Agent 可靠性、运行时组件、记忆、工具适应、跨设备执行和推理模型后训练。",
    "trendAssessment": "当天的信号不在模型参数规模，而在 Agent 外围系统的可控性与可靠性：从固定记忆规则转向学习型控制，从一次性优化转向持续优化与回归控制，从静态工具选择转向可靠性漂移适应，从干净检索转向不可信证据压力测试。可收敛为“面向动态依赖与不可信外部组件的 Agent 运行时供应链安全框架”。"
  },
  "topPicks": [
    "deepstress",
    "memory-controlled-process"
  ],
  "papers": [
    {
      "id": "memory-controlled-process",
      "title": "Memory as a Controlled Process: Learned Adaptive Memory Management for LLM Agents",
      "url": "https://arxiv.org/abs/2607.13591",
      "authorsAndInstitutions": "Eric Hanchen Jiang、Zhi Zhang、Yuchen Wu、Levina Li、Dong Liu、Xiao Liang、Rui Sun、Yubei Li、Edward Sun、Haozheng Luo、Zhaolu Kang、Aylin Caliskan、Kai-Wei Chang、Ying Nian Wu；arXiv 摘要页未可靠列出完整机构。v1，提交于 2026-07-15 UTC。",
      "tags": [
        "LLM",
        "Agent",
        "Memory",
        "Online Learning",
        "Context Management"
      ],
      "summary": "将 Agent 的记忆读取、计划复用、重新检索、压缩与遗忘建模为可学习的控制过程，而非固定的向量相似度检索规则。",
      "importance": "长期运行 Agent 不能只“有记忆”，还需在不同任务阶段学会何时使用、使用什么和何时忘记。MemCon 直接挑战“每次检索 Top-k、固定阈值写入”的人工规则，也同时关联性能、成本与持续学习。",
      "methodHighlights": "把记忆操作建模为 MDP，以轻量 contextual bandit 和 UCB 探索学习是否检索、检索多少、是否注入已有计划、是否重新检索以及压缩/遗忘；不需额外预训练或 LLM 调用。覆盖 6 个 benchmark、3 种 Agent 框架和 3 种 LLM backbone，报告最高 15.2 个百分点成功率提升和 5%–20% token 节省。",
      "limitations": "轻量 bandit 的状态表示能否覆盖开放环境的复杂记忆依赖仍待验证；任务级二元奖励难以归因到某次操作。普通性能策略的“忘记”还可能删除审计记录、攻击证据或关键异常，且未直接处理记忆投毒与跨任务污染。",
      "inspiration": "可发展为安全感知 Memory Controller：按来源写入可信度与 provenance、在写入前检测投毒、将高风险工具结果保存为不可遗忘审计日志，并把安全风险与性能收益共同写入奖励。",
      "valueJudgment": "值得精读，也适合中等规模复现；尤其应重点分析状态空间、奖励设计和遗忘策略。",
      "priority": "A"
    },
    {
      "id": "deepstress",
      "title": "DeepStress: Stress-Testing Deep Search Agents",
      "url": "https://arxiv.org/abs/2607.13920",
      "authorsAndInstitutions": "Ismael Rousseau、Geraldine Damnati、Frederic Bechet；arXiv 摘要页未可靠标明机构。v1，提交于 2026-07-15 UTC。",
      "tags": [
        "Agent",
        "Deep Search",
        "RAG",
        "Evaluation",
        "Retrieval Security",
        "Robustness"
      ],
      "summary": "以可控合成检索环境系统测试搜索 Agent 面对不可信、不相关或事实错误证据时的行为。",
      "importance": "多数 Deep Research 和搜索 Agent benchmark 默认检索结果可信，难以测出恶意网页、SEO 污染、错误文档和冲突证据下的脆弱性。该工作把可信度、相关性和事实性拆开调节，与 RAG 投毒、检索供应链安全直接相关。",
      "methodHighlights": "构建可控合成检索环境，独立操纵文档可信度、相关性和事实正确性；在 HotpotQA 与 BrowseCompPlus 上测试多个搜索 Agent，并设计指标描述模型参数知识与外部证据冲突时的决策，同时分析失败路径与证据交互而非只看最终准确率。",
      "limitations": "合成环境未必覆盖真实互联网的社会工程、网页结构干扰和动态内容；未包含来源身份冒充、引用链污染、时间过期和工具返回篡改，且论文仅 9 页，实验深度需以正文进一步核实。",
      "inspiration": "可提出 Agent Retrieval Supply-Chain Benchmark：模拟恶意数据供应商、被污染知识库、受入侵搜索 API，并将文档 provenance、签名、SBOM 类元数据加入决策，测量 Agent 是否识别“高相关但低可信”的证据。",
      "valueJudgment": "非常值得技术解读，复现成本预计不高，也很适合作为安全论文的选题起点。",
      "priority": "A"
    },
    {
      "id": "agent-optimizers-compound",
      "title": "Do Agent Optimizers Compound? A Continual-Learning Evaluation on Terminal-Bench 2.0",
      "url": "https://arxiv.org/abs/2607.14004",
      "authorsAndInstitutions": "Wenxiao Wang、Priyatham Kattakinda、Soheil Feizi；论文注明为 RELAI 技术报告，完整作者机构需以正文为准。v1，提交于 2026-07-15 UTC。",
      "tags": [
        "Agent",
        "Coding Agent",
        "Agent Optimization",
        "Continual Learning",
        "Regression"
      ],
      "summary": "研究 Agent harness 经连续多轮自动优化后，性能提升能否累积，还是会出现迁移退化和旧能力回归。",
      "importance": "真实部署里 prompt、工具策略和运行时配置会持续修改；一次优化有效不代表下一轮仍有效，缺少回归控制时甚至可能让未见任务跌破原始 baseline。",
      "methodHighlights": "基于 Terminal-Bench 2.0 做两阶段 continual-learning 评测，对比 GEPA、Meta Harness 和 RELAI-VCL，在相同预算下考察首次优化、迁移与二次优化。论文报告 RELAI-VCL 是唯一同时保持正迁移并在第二阶段继续提升的方法，lifelong average pass rate 为 76.4%。",
      "limitations": "评测方法来自相关团队，可能存在方法选择或实验设计偏向；范围集中在 Terminal-Bench，sealed evaluation 严格性、benchmark 记忆和自动 harness patch 的安全来源仍需核查。",
      "inspiration": "可扩展为带安全回归控制的 Agent 自动优化：每次 prompt、tool policy 或 skill 更新后执行安全回归，检查权限绕过，并为 Agent 配置建立版本、签名与可追溯变更链。",
      "valueJudgment": "值得精读，尤其适合连接软件工程中的持续集成、回归测试和供应链治理。",
      "priority": "A"
    },
    {
      "id": "self-evolving-harnesses",
      "title": "Self-Evolving Agent Harnesses via Gated Semantic Quality-Diversity",
      "url": "https://arxiv.org/abs/2607.13683",
      "authorsAndInstitutions": "Xiaotian Luo、Fengxingyu Wang、Chuanrui Hu、Dizhan Xue、Yafeng Deng；arXiv 摘要页未可靠标明机构。v1，提交于 2026-07-15 UTC。",
      "tags": [
        "Agent",
        "Self-Evolving Agent",
        "Harness Optimization",
        "Evaluation",
        "Quality-Diversity"
      ],
      "summary": "LLM 负责诊断 Agent 失败并提出 harness 修改，而采样、显著性检验和性能归因交由确定性代码完成，以减少自评噪声与过拟合。",
      "importance": "冻结模型时真正可优化的是 prompt、知识注入、运行时控制和工具配置；而“提出修改”与“确认修改有效”必须解耦，否则 Agent 生成的 patch 很容易只对训练任务有效。",
      "methodHighlights": "LLM 负责失败诊断和 patch proposal，确定性代码负责采样、统计检验与提升归因；以 WHERE × WHY 失败类型组织质量多样性 archive，只有统计验证通过的 patch 才能入库。论文在 7 个领域、冻结模型条件下报告测试集约 9–15.5 个百分点提升。",
      "limitations": "性能显著性不代表 patch 符合安全规范；自动 patch 仍可能带来漏洞，sealed test 对真实分布变化的覆盖、patch 来源可信度、依赖注入与恶意 proposal 的威胁模型均未充分处理。",
      "inspiration": "可做 Policy-Gated Secure Harness Evolution：在性能 gate 外增加安全、权限和 provenance gate，要求 patch 经静态检查、沙箱执行和攻击测试，并记录生成模型、输入数据、依赖版本与评测结果。",
      "valueJudgment": "适合做方法解读和安全批判性分析，复现难度中等。",
      "priority": "A"
    },
    {
      "id": "devicesworld",
      "title": "DevicesWorld: Benchmarking Cross-Device Agents in Heterogeneous Environments",
      "url": "https://arxiv.org/abs/2607.13465",
      "authorsAndInstitutions": "Huatao Li、Xinwei Geng、Yuheng Wang、Yutong Li、Runde Yang、Hantao Chen、Shu Yao、Jingru Fan、Xuhui Ren、Yuanyuan Zhao、Fei Huang、Chen Qian；机构需以论文正文为准。v1，提交于 2026-07-15 UTC。",
      "tags": [
        "Agent",
        "Cross-Device Agent",
        "Benchmark",
        "HCI",
        "IoT",
        "软件工程"
      ],
      "summary": "提出涵盖移动端、桌面与 IoT 的可执行 benchmark，测试 Agent 完成具有跨设备前后依赖的真实任务的能力。",
      "importance": "真实用户流程常跨设备，而现有 benchmark 多是单环境。最强系统成功率仅 12.5%，说明当前 Agent 离跨设备、跨状态自动化还有显著距离，也暴露身份、状态同步和信息传递的信任问题。",
      "methodHighlights": "包含 6,140 个任务，整合 mobile、desktop、IoT 三类环境；每项任务提供自然语言目标、参与设备、初始状态、可执行动作、规则验证器和清理流程，通过设备状态与生成文件自动验证。五个前沿 Agent 中最佳成功率为 12.5%。",
      "limitations": "多数任务为预构建环境，和真实设备生态、厂商 API、权限系统仍有差异；自动 verifier 可能只看最终状态而遗漏隐私泄漏，模板化/近重复任务与设备信任、凭证跨域传播、IoT 供应链风险也需进一步审查。",
      "inspiration": "可研究跨设备 Agent 信任链：验证手机、PC、IoT 工具来源，约束凭证和敏感数据跨设备传递，并引入 device/tool attestation 和最小权限。",
      "valueJudgment": "值得做 benchmark 解读；完整复现成本高，更适合选取子集进行安全扩展。",
      "priority": "B"
    },
    {
      "id": "set-shifting-harnessed-agents",
      "title": "Set-shifting Behavioral Test for Harnessed Agents",
      "url": "https://arxiv.org/abs/2607.13396",
      "authorsAndInstitutions": "Ziwei Ye；arXiv 摘要页未标明机构。v1，提交于 2026-07-15 UTC。",
      "tags": [
        "Agent",
        "Tool Use",
        "Behavioral Evaluation",
        "Adaptation",
        "Reliability"
      ],
      "summary": "测试 Agent 在会话过程中工具可靠性悄然变化后，能否放弃旧习惯并切换到新的可靠工具。",
      "importance": "现实中的 API、模型、插件和数据源会动态变化，但 Agent 容易固化为少数调用模式。它与第三方插件更新、API 降级、供应商被入侵等供应链场景高度相关。",
      "methodHighlights": "借鉴认知心理学 set-shifting，为同一任务提供功能冗余、可靠性不同的工具，在隐藏边界改变可靠工具组，并为每次 shift 配置 no-shift control；设计 set-shifting accuracy 衡量所有 shift 后窗口是否路由到正确工具组，也发现工具描述方式显著影响路由。",
      "limitations": "实验主要使用可控工具库，离真实插件生态尚远；单作者短论文，实验规模与统计稳定性应重点审查。变化为预设可靠性，尚未覆盖有策略的恶意工具，且连续窗口全正确的指标可能过严。",
      "inspiration": "可转化为 Agent Dependency Drift / Tool Supply-Chain Drift：模拟插件升级后的行为变化、同名工具替换和依赖劫持，测试 Agent 是否依据运行时证据降低工具信任，并研究签名、信誉分与动态路由。",
      "valueJudgment": "概念价值高，适合快速复现和扩展；单独作为完整研究的实验厚度可能有限。",
      "priority": "B"
    },
    {
      "id": "post-training-shifts-confidence",
      "title": "Post-Training Shifts Confidence: A Three-Stage Analysis of How SFT, RL, and OPD Shape Pre-, Intra-, and Post-CoT Calibration",
      "url": "https://arxiv.org/abs/2607.13753",
      "authorsAndInstitutions": "Shuhao Li、Guodong Du、Anhao Zhao、Wanyu Lin、Tianyu Yuan、Xiaoyu Shen；arXiv 摘要页未可靠列出机构。v1，提交于 2026-07-15 UTC。",
      "tags": [
        "LLM",
        "Reasoning",
        "Post-training",
        "Calibration",
        "SFT",
        "RL",
        "Distillation"
      ],
      "summary": "分析 SFT、RL 与 on-policy distillation 如何分别影响模型在推理前、推理中和推理后的置信度可靠性。",
      "importance": "置信度并非稳定统一的量：OPD 更适合推理前难度估计，SFT 更适合早停，RL 更适合最终轨迹聚合。这影响 Agent 是否继续思考、调用外部工具或请求人工确认。",
      "methodHighlights": "把评估划分为 pre-CoT、intra-CoT、post-CoT，控制比较 SFT、RL 和 OPD；提出 PosConf，只使用相对位置中可靠区间的置信信号。在 RL answer aggregation 上较多数投票提升 6.1 个百分点，在严格 token budget 下 OPD early stopping 最高提升 4.3 个百分点。",
      "limitations": "实验集中于数学推理，向开放环境 Agent 的迁移未明；自报告置信度未必等于真实不确定性，位置区间也可能依模型、训练法与任务分布变化，且未研究对抗输入下的置信度操纵。",
      "inspiration": "可设计 Agent 风险控制：低置信时禁止高风险工具调用，工具结果与参数知识冲突时二次验证，并将 provenance 风险与置信度结合；还可研究恶意上下文诱导虚假高置信。",
      "valueJudgment": "值得系统学习与实验复现，但对供应链安全属于间接支撑。",
      "priority": "B"
    },
    {
      "id": "gflowrl",
      "title": "GFlowRL: Scaling Distribution-Matching RL to Large Language Models",
      "url": "https://arxiv.org/abs/2607.13394",
      "authorsAndInstitutions": "Xiaodong Liu、Michael Xu、Jack W. Stokes、Paul Smolensky、Doug Burger、Jianfeng Gao；作者构成显示可能与 Microsoft Research 有关，但 arXiv 摘要页未完整标注机构，因此不作确定陈述。v1，提交于 2026-07-15 UTC。",
      "tags": [
        "LLM",
        "RL",
        "Post-training",
        "Reasoning",
        "Red Teaming",
        "GFlowNet"
      ],
      "summary": "移除 GFlowNet 式 LLM 强化学习的辅助 partition network，以 batch 内 Monte Carlo 估计实现更稳定的大规模分布匹配训练。",
      "importance": "传统 reward-maximizing RL 易集中到少数高奖励推理路径，降低多样性。GFlowRL 试图将按奖励分布采样多种高质量路径的目标扩展到 235B MoE 模型，并在数学、代码和自动红队攻击上展示结果。",
      "methodHighlights": "以 rollout group 内 Monte Carlo 估计替代 learned partition function，加入 rollout/trainer drift 的 importance-sampling correction 与 asymmetric flow-gap clipping；覆盖 dense 与 MoE，最大测试至 235B，并在 Codeforces、数学和 adversarial red-teaming benchmark 上报告较强表现。",
      "limitations": "训练规模大，独立复现门槛高；多个 SOTA 声明需核对算力、模型与基线公平性。较高攻击成功率有双重用途风险，和 Agent 系统/供应链安全的直接联系偏弱，代码仍处于“将发布”状态。",
      "inspiration": "更适合作为后训练前沿储备：可研究分布匹配 RL 是否生成更多样化的供应链攻击路径，或反向用于生成覆盖更广的安全测试样本。",
      "valueJudgment": "值得阅读方法和实验章节；不建议个人完整复现，可做小模型原理验证。",
      "priority": "B"
    }
  ]
});
