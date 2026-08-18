// 2026-08-18 LLM / Agent 科研日报
window.RESEARCH_REPORTS.push({
  "date": "2026-08-18",
  "title": "LLM / Agent 科研日报",
  "generatedAt": "2026-08-18 10:03（北京时间）",
  "brief": {
    "summary": "今日严格筛选 6 篇值得看的论文：A 级 3 篇、B 级 3 篇、C 级 0 篇。北京时间 2026-08-18 上午检查时，arXiv 重点分类当前仍显示 2026-08-17 周一公开批次；本期只补充该 24–36 小时公开/更新窗口中昨日未纳入且值得看的工作，避免重复昨日 HELIX、Agentic Transaction、MOOSEDev 等论文。共同主线是：Skill 的有效性与失效机制、Agent 的可恢复执行、GUI/Tool 副作用原子性、行为策略抽象、长期科研状态和多 Agent 消息价值，都越来越需要以可验证的运行证据和版本化依赖来描述。",
    "trendAssessment": "今日最值得关注的是行为依赖从‘有没有某个组件’进一步转向‘这个组件在何种条件下真正起作用、失效后如何恢复、版本变化如何改变行为’。Demystifying Agent Skills 说明 Skill 的主要收益来自程序性锚定而不是简单知识注入，且 Skill 池增大后实际使用精度会快速下降；AgentRewind 说明长程执行失败后，保留经过控制的 checkpoint 与 rewind memory 明显优于简单继续或完全重启；LegacyWorld 把真实 GUI Agent 的成功与原子失败分开评价。ATLAS、ScienceFlow 和 Wrong but Useful 则分别提供跨版本行为模型、可恢复研究状态和消息因果价值的证据。与供应链安全最直接的延展是 Skill compatibility/admission、checkpoint provenance、runtime rollback contract、行为模型 diff 与多 Agent 消息 lineage。今日未发现比这些更值得纳入的 v2/v3 重要更新。"
  },
  "topPicks": [
    "demystifying-agent-skills",
    "agentrewind"
  ],
  "topPickRationales": {
    "demystifying-agent-skills": "优先精读，因为它直接回答‘Skill 为什么有效、又为什么会失效’，而不是只报告平均 benchmark 增益。研究跨框架整理 8,135 条试验记录并对 Skill 作用机制做人工验证，发现主要收益来自 procedural anchoring，而显式知识注入占比很低；同时 Skill 池从 5 增长到 100 时，实际使用精度从 29.6% 降到 3.3%，暴露出检索、选择和兼容性瓶颈。Princeton、UCSD、Stanford、USC、JHU 团队质量信号强。非常适合扩展为 Skill 安装/升级兼容矩阵、Skill admission 和版本行为回归。",
    "agentrewind": "优先精读，因为它把长程 Agent 的‘失败后恢复’从简单 retry/restart 提升为可对齐的执行 checkpoint、环境恢复与 rewind memory。MettleBench 含 82 个任务、640 个验收条件；GPT-5.4 条件下 AgentRewind 的任务成功率达到 87.8±1.2%，高于 Continue 62.2±2.1% 和 Restart+Experiences 78.0±2.4%。论文来自清华、国科大/中科院等团队，并开放 recorder 与 benchmark 数据。很适合扩展为 Tool/MCP side-effect、checkpoint provenance、幂等和补偿事务研究。"
  },
  "papers": [
    {
      "id": "demystifying-agent-skills",
      "title": "Demystifying Agent Skills: Why They Work—Until They Don’t",
      "url": "https://arxiv.org/abs/2608.14036",
      "authorsAndInstitutions": "论文首页确认作者来自 Princeton University、University of California San Diego、Stanford University、University of Southern California、Johns Hopkins University；具体作者—机构映射以论文首页为准。",
      "qualitySignals": "作者与机构信号：强，来自 Princeton、UCSD、Stanford、USC、JHU；版本动态：arXiv:2608.14036 v1，2026-08-14 提交，进入 2026-08-17 周一公开批次；开源与数据：未可靠查到官方代码或数据仓库。",
      "openSourceAndData": "未可靠查到",
      "tags": ["Agent Skill", "Evaluation", "Behavioral Dependency", "Supply-chain Security", "Agent Harness"],
      "summary": "系统分析 Agent Skill 的真实增益来源和失效条件，发现主要收益来自程序性锚定，但随着 Skill 池扩大，检索与实际使用精度快速恶化。",
      "importance": "Agent Skill 已被大量用于编码、终端操作和通用 Agent，但很多工作只比较‘有 Skill/无 Skill’的最终成功率，无法解释 Skill 究竟通过什么机制改善行为，也无法解释为什么同一 Skill 在不同框架、任务和上下文中会失效。对 Skill 供应链而言，如果不知道收益来自知识、流程约束还是工具提示，就无法建立稳定的兼容测试和升级验收。",
      "methodHighlights": "论文归一化整理跨框架、跨任务的 8,135 条 Skill 试验记录，并用开放编码与人工复核构建失效/作用机制分类。分析区分 procedural anchoring、knowledge injection、retrieval/selection、context compatibility 等机制，并比较不同 Skill pool 规模下的实际使用情况；人工验证部分包含 238 个有效唯一标签，并对聚合标签进行一致性检查。",
      "keyFindings": "在 matched comparisons 中，Skills 相对 Workflow Memory 平均提高 6.06 个百分点；65.7% 的有效帮助被归因于 procedural anchoring，而显式 knowledge injection 仅约 4.5%。Skill pool 从 5 增长到 100 时，actual-use precision 从 29.6% 降到 3.3%，说明大规模 Skill 库的主要瓶颈逐渐转向检索和选择。论文还发现常见失效来自 brittle assumptions、incompatible contexts 和 insufficient adaptation。人工聚合验证 exact agreement 为 95.8%，Cohen's κ=0.952。",
      "limitations": "分析依赖已有试验记录与特定 Agent/benchmark 组合，不能直接外推到所有 Skill marketplace；分类仍包含研究者判断。论文主要解释 Skill 的功能机制与失效，并未直接研究恶意 Skill、权限滥用、签名或供应链攻击。",
      "inspiration": "论文直接结论：Skill 的主要作用机制更接近程序性锚定而非单纯知识注入，且 Skill 库扩大后检索/实际使用精度明显下降。研究启发：建立 `task × model × harness × skill version × skill pool` 兼容矩阵；Skill 发布或升级时除相关性检索外，还应做实际使用、环境假设、工具依赖和行为差分回归，并把失效标签写入 Skill-BOM。",
      "valueJudgment": "非常值得精读。适合作为 Skill 机制分析、Skill routing、版本兼容和供应链准入研究的基础工作。",
      "priority": "A"
    },
    {
      "id": "agentrewind",
      "title": "AgentRewind: Recoverable Execution for Long-Horizon LLM Agents",
      "url": "https://arxiv.org/abs/2608.14380",
      "authorsAndInstitutions": "论文 PDF 首页确认作者机构包括 University of Chinese Academy of Sciences、Tsinghua University IIIS、Zhongguancun Academy、Institute of Automation, Chinese Academy of Sciences。",
      "qualitySignals": "作者与机构信号：强，清华、国科大/中科院等；版本动态：arXiv:2608.14380 v1，2026-08-14 提交，进入 2026-08-17 公开批次；开源与数据：官方 Agent recorder `Futuresis/replay-agent-recorder` 与 MettleBench 数据/代码 `Kelvin-Coffee/MettleBench` 已由论文提供。",
      "openSourceAndData": [{"label": "Agent recorder", "url": "https://github.com/Futuresis/replay-agent-recorder", "note": "论文官方链接"}, {"label": "MettleBench", "url": "https://github.com/Kelvin-Coffee/MettleBench", "note": "论文官方 benchmark/data 链接"}],
      "tags": ["Agent", "Runtime Recovery", "Checkpoint", "Agent Memory", "Tool Use", "Supply-chain Security"],
      "summary": "提出把 Agent 上下文与可控外部环境对齐保存的 checkpoint，并通过 rewind memory 从失败前的可信状态恢复长程执行。",
      "importance": "长程 Agent 失败后，简单继续容易继承错误状态，完全重启又会丢掉已验证进展；如果 Tool、文件、环境和上下文不能一起恢复，所谓‘回退’也可能只是文本层面的幻觉。论文因此把恢复问题定义为上下文状态、环境状态和经验状态的同步恢复。",
      "methodHighlights": "AgentRewind 记录 Agent context 与受控环境状态的对齐 checkpoint；发生失败时回退到早期可恢复状态，并生成只保留必要经验的 rewind memory，避免把完整失败轨迹继续污染后续决策。作者同时构建 MettleBench，包含 82 个长程任务和 640 个验收条件，并与 Continue、Restart+Experiences、Safety Review 等策略比较。",
      "keyFindings": "GPT-5.4 条件下：Continue 任务成功率 62.2±2.1%、Restart+Experiences 78.0±2.4%、Safety Review 34.1±1.2%、AgentRewind 87.8±1.2%；对应 checklist completion 为 81.4±1.0%、88.8±1.2%、54.4±2.1%、94.3±0.5%。GPT-5.4 mini 下 AgentRewind 为 51.2±4.2%，高于 Continue 33.7±0.7% 与 Restart 43.1±1.4%。Terminal-Bench 2.0 上 AgentRewind 任务成功率 83.1%，Continue 为 78.7%，Restart 为 70.8%。12 组主要比较中 11 组经 Holm 校正后显著。",
      "limitations": "方法依赖可恢复、可控制的外部环境；真实支付、邮件、远端 SaaS 等不可逆副作用不能仅靠 checkpoint 自动回滚。Rewind memory 仍可能携带错误归因；保存环境快照和对齐状态也有额外存储与基础设施成本。",
      "inspiration": "论文直接结论：对齐保存上下文与环境状态、并从失败前 checkpoint 重新执行，明显优于简单继续或完全重启。研究启发：为 Tool/MCP 定义 rollback、idempotency、compensation 和 checkpoint capability，并将 `model/harness/tool version × environment snapshot × failure provenance × resume decision` 写入 Runtime-SBOM。",
      "valueJudgment": "非常值得精读和复现，尤其适合 Agent runtime safety、长程恢复、Tool 副作用和事务式执行研究。",
      "priority": "A"
    },
    {
      "id": "legacyworld",
      "title": "LegacyWorld: Atomicity-Aware Evaluation of GUI Agents for Legacy Workflows",
      "url": "https://arxiv.org/abs/2608.14131",
      "authorsAndInstitutions": "论文首页确认作者机构包括 Technical University of Munich、University of Groningen；Thilo Reintjes 标注来自 Schub, Germany。论文已被 ICSME 2026 Industry Track 接收。",
      "qualitySignals": "作者与机构信号：强/中，TUM、University of Groningen，且有 ICSME 2026 Industry Track 接收信号；版本动态：arXiv:2608.14131 v1，2026-08-14 提交并进入 2026-08-17 公开批次；开源与数据：官方复现仓库 `ThiloReintjes/LegacyWorld` 已开放。",
      "openSourceAndData": [{"label": "LegacyWorld 官方 GitHub", "url": "https://github.com/ThiloReintjes/LegacyWorld", "note": "包含 benchmark catalog、prompts、validators、runs 与脚本"}],
      "tags": ["GUI Agent", "Runtime Policy", "Atomicity", "Human-Agent Interaction", "Evaluation", "Software Engineering"],
      "summary": "构建面向真实 Windows legacy workflow 的 GUI Agent benchmark，把‘完成任务’和‘失败后是否保持可接受系统状态’分开评价。",
      "importance": "GUI Agent 可能在管理员、临床或业务系统中执行不可逆操作。只看最终 success 会忽略一种关键安全失败：任务虽然没有完成，却已经把系统留下在错误或危险状态。LegacyWorld 将 atomicity 明确作为独立评价目标。",
      "methodHighlights": "benchmark 包含 28 个 Windows GUI workflow，在 fresh VM 上运行，并用 task contract 与 validator 区分 valid success、valid failure 和 unsafe side effect。任务覆盖 legacy 管理、牙科/临床等应用；作者同时比较 expert prompts 与视频生成 prompts，以测试指令质量变化对成功率和原子性的影响。",
      "keyFindings": "Expert prompt 条件下，GPT-5.4 valid success 3.6%、valid failure 96.4%、unsafe side effect 0%；Claude Opus 4.6 valid success 78.6%、unsafe side effect 10.7%；Sonnet valid success 75.0%、unsafe 17.9%；Kimi valid success 42.9%、unsafe 35.7%。视频生成 prompt 会显著降低有效完成，例如 Opus 由 78.6% 降到 50.0%、Sonnet 由 75.0% 降到 53.6%，但部分模型仍能保持较高原子性。",
      "limitations": "只有 28 个 Windows workflow，且 benchmark 依赖 VM、validator 和 legacy application 的具体实现。Atomicity 由任务定义的可接受终态决定，无法覆盖所有现实副作用；不同桌面环境、模型和 computer-use harness 的外推仍需验证。",
      "inspiration": "论文直接结论：GUI Agent 评测需要把有效成功与原子失败分开，不能把所有失败等价处理。研究启发：为 Tool/MCP/GUI action 建立 side-effect contract，记录 pre-state、commit point、post-state、compensation 和 validator；在模型或 harness 升级时执行 atomicity regression。",
      "valueJudgment": "值得精读和复现。它把 Agent 执行安全从‘回答正确’推进到真实系统状态完整性。",
      "priority": "A"
    },
    {
      "id": "atlas-agent-strategies",
      "title": "ATLAS: Discovering Agent Strategies through LLM-Guided Abstraction and Automata Learning",
      "url": "https://arxiv.org/abs/2608.14352",
      "authorsAndInstitutions": "论文首页确认 Ignacio D. Lopez-Miguel、Andreas Happe、Jürgen Cito、Ezio Bartocci、Martin Tappler 来自 TU Wien，Bettina Könighofer 来自 TU Graz；论文被 ACM/IEEE MODELS 2026 接收。",
      "qualitySignals": "作者与机构信号：强，TU Wien + TU Graz，并有 MODELS 2026 接收信号；版本动态：arXiv:2608.14352 v1，2026-08-14 提交，进入 2026-08-17 公开批次；开源与数据：官方 replication package 通过 Figshare DOI 开放。",
      "openSourceAndData": [{"label": "ATLAS replication package", "url": "https://doi.org/10.6084/m9.figshare.32841767", "note": "包含 learned models、abstract/concrete traces 与源码"}],
      "tags": ["Agent", "Behavior Modeling", "Automata Learning", "Runtime Monitoring", "Security", "Evaluation"],
      "summary": "把 Agent 轨迹先抽象成结构化事件，再用自动机学习得到可解释的策略模型，用于审计、运行时监控和跨模型知识迁移。",
      "importance": "Agent trace 通常又长又高度具体，难以直接比较两个模型版本或 harness 是否采用了不同策略。ATLAS 尝试把轨迹压缩成可检查的行为状态机，使‘策略变化’成为可观测对象，而不是只依赖最终成功率。",
      "methodHighlights": "方法先由 LLM 将低层工具/行动轨迹映射为高层语义事件，再使用 Alergia 等 automata learning 构建 labelled Markov chain。案例研究在 12 台有漏洞的 Linux VM 上运行渗透测试 Agent，每台多次采样，并把 learned strategy 用于小模型的动态指导和 symbolic transfer。",
      "keyFindings": "在 ministral-8b 上，baseline 成功率约 5.0%，使用动态 ATLAS strategy guidance 后达到 28.3%；ministral-14b baseline 约 1.7%，dynamic guidance 达 38.3%，guided variant 约 21.7%。结果显示从 frontier Agent 轨迹提取的抽象策略能够显著帮助较小模型，但不同指导方式效果差异很大。",
      "limitations": "案例只覆盖 12 个渗透测试 VM，行为抽象依赖 LLM，因此抽象 prompt 或模型版本变化可能导致策略模型漂移。Markov/自动机抽象会丢失连续上下文和丰富语义，也不能单独提供形式化安全保证。",
      "inspiration": "论文直接结论：Agent 行为轨迹可以被抽象为可学习、可迁移的策略模型。研究启发：把 learned automaton/Markov model 作为 Behavior Artifact，与 `model × harness × tools × prompt version` 绑定；版本升级时做 automata diff，检测新出现的危险状态、循环和工具路径。",
      "valueJudgment": "值得方法论阅读和轻量复现，尤其适合行为回归、Agent 策略审计和跨版本漂移检测。",
      "priority": "B"
    },
    {
      "id": "scienceflow",
      "title": "ScienceFlow: A Long-horizon Agent for ML Research, Scientific Discovery and Beyond",
      "url": "https://arxiv.org/abs/2608.14354",
      "authorsAndInstitutions": "论文首页标注 ScienceFlow Team，Noah’s Ark Lab, Huawei。",
      "qualitySignals": "作者与机构信号：强，Huawei Noah’s Ark Lab；版本动态：arXiv:2608.14354 v1，2026-08-14 提交，进入 2026-08-17 公开批次；开源与数据：官方 ScienceFlow 项目页已由论文提供。",
      "openSourceAndData": [{"label": "ScienceFlow 官方项目页", "url": "https://huawei-noah.github.io/noah-research/ScienceFlow/website/", "note": "论文官方链接"}],
      "tags": ["Agent", "Long-horizon Research", "Agent Memory", "Runtime State", "ML Research", "Self-improvement"],
      "summary": "通过可恢复的 executable research state、分阶段证据管理和长期执行控制，让 Agent 在 MLE-bench 等科研任务中持续迭代实验。",
      "importance": "科研 Agent 的瓶颈不仅是单步推理，而是数十到数百步实验中如何保留可复用代码、数据、模型、结果和失败证据。如果只保留文本摘要，重新启动后容易丢失真正可执行的研究状态。",
      "methodHighlights": "ScienceFlow 将长期研究过程拆成可验证的 execution segments，并把工作区中的代码、模型、实验结果等作为 recoverable executable state。ESTRA 在 live/archived state 中选择 anchor，evidence-aware controller 决定下一步执行和回退，使 Agent 可以跨阶段恢复、复用和比较实验。",
      "keyFindings": "在完整 MLE-bench 75 个任务上，Any-Medal 为 70.22±1.18%，比作者列出的最强已报告 baseline 高 4.92 个百分点；Medium split 为 74.56±0.88%，提升 10.52 个百分点；Lite 为 80.30±1.52%，High 为 44.44±2.22%。案例中通过恢复和复用研究状态把 validation loss 从 0.1100 降到 0.0597。",
      "limitations": "科研 Agent 需要较高计算、执行和评测预算，不同 leaderboard 结果可能使用不同模型和资源，横向比较需要谨慎。论文主要关注科研效率，没有直接研究 archived state 污染、恶意代码、数据来源可信度和供应链攻击。",
      "inspiration": "论文直接结论：长期科研任务中，可执行状态的保存、恢复和证据驱动控制明显优于只靠文本记忆。研究启发：建立 Research-State SBOM，记录代码/数据 hash、环境、依赖、模型 checkpoint、实验输出、来源和恢复点；任何工具链或数据更新后只复用仍满足 provenance/validity 的状态。",
      "valueJudgment": "值得系统阅读。直接安全贡献有限，但对长期 Agent 状态管理、科研自动化和可恢复执行很有参考价值。",
      "priority": "B"
    },
    {
      "id": "wrong-but-useful",
      "title": "Wrong but Useful: Trajectory Value Beyond Answer Correctness in Multi-Agent Messages",
      "url": "https://arxiv.org/abs/2608.14375",
      "authorsAndInstitutions": "作者列表以 arXiv 摘要页为准；机构本轮未能从论文首页可靠确认，机构未可靠查到。",
      "qualitySignals": "作者与机构信号：未可靠查到；版本动态：arXiv:2608.14375 v1，2026-08-14 提交，进入 2026-08-17 公开批次；开源与数据：arXiv ancillary files 提供 reproducibility artifact。",
      "openSourceAndData": [{"label": "arXiv reproducibility artifact", "url": "https://arxiv.org/src/2608.14375/anc/reproducibility_artifact.zip", "note": "arXiv ancillary artifact"}],
      "tags": ["Multi-agent", "Evaluation", "Causal Analysis", "Agent Communication", "Behavioral Dependency"],
      "summary": "用同一整合器在‘显示/隐藏某条候选消息’的受控重放中衡量消息的轨迹价值，证明内容错误的消息仍可能显著帮助后续 Agent 得到正确结果。",
      "importance": "多 Agent 系统常按消息自身是否正确来筛选、打分或删除中间结果，但一条错误答案可能包含有用的分解、局部约束或搜索方向。如果把 correctness 当作唯一价值指标，会错误丢弃真正帮助后续轨迹的信息。",
      "methodHighlights": "DHD 方法缓存多条独立生成的 Agent message，并在保持 integrator 其余条件一致的情况下，对同一消息做 shown/hidden replay，直接测量其对最终正确性的边际影响。实验覆盖 Omni-MATH-2、JEEBench、SciBench、LAB、MaScQA，并测试不同模型。",
      "keyFindings": "所有模型—benchmark 组合中都观察到 wrong-but-helpful messages；在那些‘错误消息会改变最终结果’的样本里，每个模型都有超过 40% 的变化是帮助性的。受控重复实验的统计检验 p=0.0002。候选消息数 K 从 0 增到 5 时，gpt-oss-120b 宏平均约 +1.6 个百分点、Gemma 约 +0.3 个百分点，但不同任务并不单调；candidate availability 相对最终 K=5 accuracy 仍高出约 4.2–36.2 个百分点，说明整合器利用消息的能力仍是瓶颈。",
      "limitations": "价值估计依赖特定 integrator、消息生成分布和 benchmark；错误消息在推理题上‘有用’不意味着在有真实工具副作用的环境中安全。DHD 重放成本较高，难以直接用于所有生产消息。",
      "inspiration": "论文直接结论：消息自身正确性与对后续轨迹的因果价值不是同一指标。研究启发：Multi-agent message store 应记录 source agent、model/harness version、shown/hidden replay evidence 和 downstream effect；消息保留/淘汰不能只看 correctness，可进一步加入安全标签、provenance 和污染传播分析。",
      "valueJudgment": "值得阅读，适合作为 Multi-agent 通信、消息记忆淘汰和因果 provenance 的方法论参考。",
      "priority": "B"
    }
  ]
});
