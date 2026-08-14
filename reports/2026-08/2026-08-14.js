// 2026-08-14 LLM / Agent 科研日报
window.RESEARCH_REPORTS.push({
  "date": "2026-08-14",
  "title": "LLM / Agent 科研日报",
  "generatedAt": "2026-08-14 10:00（北京时间）",
  "brief": {
    "summary": "今日严格筛选 6 篇值得看的论文：A 级 3 篇、B 级 3 篇、C 级 0 篇。arXiv 重点分类当前进入 2026-08-13 周四公开批次。本期最集中的是 Agent Skill、Harness、Tool 与 Memory 这些模型外行为依赖：Skill-Induced Failures 直接证明相关 Skill 也会让 Agent 失败或成本翻倍；Harness-IF 显示同一规则放在 system prompt、project file、tool/skill description 或 user instruction 上，遵从性显著不同；VAKRA 进一步把自然语言 tool-use policy、API 与检索组合到可执行 benchmark。其余论文分别覆盖工具故障恢复、Skill-Harness 自演化和 Agent Memory 的成本—准确率权衡。",
    "trendAssessment": "今日趋势从‘Skill 是否有用’推进到‘Skill/Harness/Tool/Memory 如何成为可测量、可回归、可治理的行为依赖’。对 LLM/Agent 供应链安全最直接的启发是：Skill 安装和升级必须做差分行为测试；Harness 的不同 instruction surface 要纳入兼容矩阵；Tool provider 的瞬态、持久和静默故障应被主动注入测试；Memory backend 与 backbone 组合应作为独立部署配置做成本与正确性回归。质量信号方面，Agent Skills Can Be Harmful 来自华中科技大学、Microsoft Research/Microsoft、UIUC；Harness-IF 来自 ByteDance Seed、清华、北大；VAKRA 来自 IBM 且代码与数据已开放；SHAPER 来自 Microsoft Research/Northeastern。"
  },
  "topPicks": [
    "skill-induced-failures",
    "harness-if"
  ],
  "topPickRationales": {
    "skill-induced-failures": "优先精读，因为它直接回答‘一个看似相关的 Skill 为什么会让 Agent 变差’，并用差分执行把失败归因到具体 Skill。论文在 SkillsBench 与 SWE-Skills-Bench 上确认 307 个 Skill-induced failures，其中 125 个功能失败、182 个效率退化；Task-Implementation Fault 占功能失败 68.8%，Excessive Procedure 占效率退化 62.6%。这对 Skill admission、升级回归、差分行为审计和 Skill-BOM 都非常直接，且团队来自 HUST、Microsoft Research/Microsoft、UIUC。",
    "harness-if": "优先精读，因为它把 Coding Agent 的‘指令面’本身变成评测维度：system prompt、tool description、skill description、project file、user instruction 上的同类规则并不等价。12 个 frontier model 上 AP-Acc 均低于普通准确率，说明传统指标会把模型本来就会做的行为误计为 instruction following；冲突实验还显示优先级并不简单服从 prompt 深度。它非常适合用于 model × harness × instruction-surface 安全回归，机构信号强。"
  },
  "papers": [
    {
      "id": "skill-induced-failures",
      "title": "Agent Skills Can Be Harmful: An Empirical Study of Skill-Induced Failures in LLM Agents",
      "url": "https://arxiv.org/abs/2608.11888",
      "authorsAndInstitutions": "Gen Dong（Huazhong University of Science and Technology；工作在 Microsoft Research 实习期间完成）、Yanjie Gao / Fan Yang（Microsoft Research）、Liqun Li（Microsoft）、Tianyin Xu（University of Illinois Urbana-Champaign）、Yu Hua（Huazhong University of Science and Technology）。机构来自论文 HTML 首页。",
      "qualitySignals": "作者与机构信号：强，HUST、Microsoft Research/Microsoft、UIUC；版本动态：arXiv:2608.11888 v1，2026-08-12 10:15:19 UTC 提交，进入 2026-08-13 公开批次；开源与数据：论文未可靠提供独立官方代码/数据仓库，SkillTriage 与 307-case 分析数据是否公开待核验。",
      "openSourceAndData": "未可靠查到官方代码或数据仓库。",
      "tags": ["Agent Skill", "Supply-chain Security", "Coding Agent", "Behavioral Dependency", "Evaluation", "Software Engineering"],
      "summary": "通过差分执行把 Agent 的功能失败和成本退化归因到具体加载 Skill，并构建 SkillTriage 自动分析根因。",
      "importance": "现有 Skill benchmark 往往只报告平均 pass-rate 提升或下降，无法判断失败究竟来自基础模型、环境、Verifier 还是 Skill。更危险的是，相关 Skill 也可能因为默认值、模板、依赖、路径或验证流程不适配当前任务而反复误导 Agent，这类问题非常接近真实 Skill marketplace 的升级和复用风险。",
      "methodHighlights": "论文固定任务、Verifier、模型、Agent runtime、仓库/容器状态，只改变 Skill setup，比较 with-skill 与 no-skill，或两个语义相近 Skill。基于 SkillsBench 和 SWE-Skills-Bench，再从公共 Skill 站点检索语义匹配 Skill，将潜在配对从 826 扩展到 20,664；最终人工确认 307 个 Skill-induced failures，并用差分证据构建 SkillTriage。",
      "keyFindings": "最终确认 125 个功能失败与 182 个高置信效率退化。功能失败中 Task-Implementation Fault 86/125（68.8%），其中错误填写 required element 46 例、遗漏 required element 36 例；Artifact Misplacement 24 例，Environment Mismatch 13 例。效率退化中 Excessive Procedure 114/182（62.6%），其中 excessive verification 67 例、heavy implementation pipeline 30 例。SkillTriage 对功能失败根因精确匹配 111/125（88.8%），对效率退化匹配 132/182（72.5%）。",
      "limitations": "主要执行配置使用 OpenCode 1.15.1 + Claude Opus 4.6，结果不能直接外推到所有模型/Harness。差分 reference run 是 pseudo-oracle，不是真实因果干预的完整证明；公共 Skill 的语义检索也可能改变样本分布。论文分析的是误导/低效 Skill，不等价于恶意供应链攻击。",
      "inspiration": "论文直接结论：Skill 即便主题相关，也可能引发功能失败与巨大效率退化，且根因常在实现细节、环境状态、路径和过度流程，而非单纯‘Skill 不相关’。研究启发：Skill 安装/更新应执行 with-skill vs no-skill / old-version 的差分行为回归，并记录 model、harness、repository state、toolchain、token/time、Verifier 结果，形成 Skill-BOM 的 behavioral compatibility evidence。",
      "valueJudgment": "非常值得精读和做复现/扩展。与 Skill 供应链安全、Skill admission 和版本回归高度直接。",
      "priority": "A"
    },
    {
      "id": "harness-if",
      "title": "Harness-IF: Evaluating Instruction Following Across Instruction Surfaces in Coding Agents",
      "url": "https://arxiv.org/abs/2608.11727",
      "authorsAndInstitutions": "Zining Huang、Haoran Que、Hong Zeng、Ge Zhang、Zuo Wang、Jin Chen、Haodong Wang、Zhongfei Hou、Changxin Pu、Shen Yan、Wenhao Huang。论文 PDF 首页标注：ByteDance Seed；部分作者同时来自 Tsinghua University、Peking University，相关工作在 ByteDance Seed 完成。",
      "qualitySignals": "作者与机构信号：强，ByteDance Seed + Tsinghua University + Peking University；版本动态：arXiv:2608.11727 v1，2026-08-12 07:07:57 UTC 提交，进入 2026-08-13 公开批次；开源与数据：未可靠查到官方 benchmark/code 仓库。",
      "openSourceAndData": "未可靠查到官方代码或 benchmark 仓库。",
      "tags": ["Coding Agent", "Agent Harness", "Instruction Following", "Agent Skill", "Runtime Policy", "Evaluation"],
      "summary": "把 system prompt、tool/skill description、project file 与 user instruction 等不同指令表面纳入统一 Coding Agent instruction-following benchmark，并用 prior control 区分真正遵从与行为巧合。",
      "importance": "Coding Agent 实际读取的并不是单一 prompt，而是一个由 system prompt、工具描述、Skill、CLAUDE.md/项目规则和用户请求组成的指令栈。传统 IF benchmark 多把规则放在 user turn，无法判断同一规则换到不同 Harness surface 后是否仍被执行，也容易把模型本来就会做的行为误认为遵从。",
      "methodHighlights": "Harness-IF 建立 642-rule library，60 个真实多轮 coding items 中有 256 条规则得到 execution-grounded verdict。规则可放置在 system prompt、tool description、skill description、project file、user instruction 五个可配置表面。Against-Prior Accuracy 只统计与无提示默认行为相反的规则；另有 counterbalanced conflict pilot 测不同 surface 冲突时的实际 precedence。",
      "keyFindings": "12 个 frontier model 的普通 accuracy 为 72.1–85.9%，AP-Acc 为 66.1–78.6%；所有模型在 against-prior rules 上都更差，下降 3.6–7.4 点，平均 5.81 点，说明聚合准确率系统性高估 compliance。冲突 pilot 中，整体 precedence 不服从简单 prompt depth：system prompt、project file、user instruction 总体领先 tool 与 skill description。",
      "limitations": "主 benchmark 只有 60 个 multi-turn coding items，冲突 pilot 也只有 9 个 build；不同实际 Agent 产品对 surface 的拼接顺序和权限规则可能不同。Benchmark 评价‘是否遵从’，不直接判断规则本身是否安全或授权正确。",
      "inspiration": "论文直接结论：同一 operational rule 在不同 instruction surface 上并不等价，且普通 IF accuracy 会混入模型先验。研究启发：将 system prompt、project file、Skill、Tool description、Memory 和 user instruction 作为独立的 Behavioral-SBOM surface，模型或 Harness 升级时对每个 surface 和冲突组合做回归，尤其关注高权限 policy 是否会被低权限 Skill/Tool 文本压制。",
      "valueJudgment": "非常值得精读。对于 Agent instruction hierarchy、Prompt/Skill/Harness 兼容性和安全回归是直接可用的方法论。",
      "priority": "A"
    },
    {
      "id": "vakra",
      "title": "VAKRA: Evaluating Multi-Hop Reasoning Across APIs and Retrieval Under Tool-Use Policies",
      "url": "https://arxiv.org/abs/2608.12282",
      "authorsAndInstitutions": "Ankita Rajaram Naik、Anupama Murthi、Benjamin Elder、Siyu Huo、Raavi Gupta、Abhinav Jain、Praveen Venkateswaran、Abdulhamid Adebayo、Danish Contractor；论文 HTML 首页标注 IBM, Yorktown Heights, NY, USA。",
      "qualitySignals": "作者与机构信号：强，IBM Research；版本动态：arXiv:2608.12282 v1，2026-08-12 提交并进入 2026-08-13 公开批次；开源与数据：官方 GitHub `IBM/VAKRA` 与 Hugging Face `ibm-research/VAKRA` 已开放。",
      "openSourceAndData": [{"label":"VAKRA 官方 GitHub","url":"https://github.com/IBM/VAKRA","note":"论文 HTML 直接提供"},{"label":"VAKRA 官方 Hugging Face","url":"https://huggingface.co/datasets/ibm-research/VAKRA","note":"论文 HTML 直接提供"}],
      "tags": ["Agent", "Tool Use", "RAG", "Runtime Policy", "MCP", "Evaluation"],
      "summary": "构建一个同时包含可执行 API、检索、多跳链与自然语言 Tool-Use Policy 的企业 Agent benchmark，并用实际重放工具调用验证整条轨迹。",
      "importance": "真实企业 Agent 常同时面对 CRM/BI API、文档检索和政策约束，而现有 benchmark 往往分别测 tool calling、RAG 或 policy adherence。这样无法暴露跨源实体对齐、schema 映射和政策解释在一条轨迹中叠加后的失败。",
      "methodHighlights": "VAKRA 基于 62 个领域构建超过 8,000 个本地可执行 API，并配套文档索引。任务包括不同 API abstraction、2–5 hop structured reasoning、API+RAG joint reasoning，以及自然语言 tool-use policies。采用固定 ReAct Harness，以减少 Agent architecture 混杂；预测工具调用被重新执行以验证正确性并允许多种合法路径。",
      "keyFindings": "最强模型在 single-hop endpoint-style 任务上为 70.4%，在 compositional BI APIs 上下降到约 50–51%；随着 reasoning depth 增加，多数模型准确率下降超过 50%。带 policy 的不可回答问题上准确率最低只有 2.4%。错误主要集中在实体消歧、跨源 grounding、schema alignment 等语言推理步骤，而非单纯工具调用语法。",
      "limitations": "数据生成部分依赖 LLM，并使用 BIRD-SQL 与构造文档环境，仍与真实企业系统存在差异。固定 ReAct Harness 有利于模型比较，但不能说明其他 Harness 下的绝对表现。Policy 主要是 benchmark 内自然语言约束，并不等价于生产权限系统。",
      "inspiration": "论文直接结论：API、检索与 tool-use policy 一旦组合，多跳 Agent 的性能显著下降，尤其在语言介导的跨源步骤。研究启发：可将 MCP server/tool schema、retriever snapshot、policy version 与 execution trace 一起纳入 Evaluation-SBOM，并扩展恶意/过期 tool output、policy conflict 与权限边界测试。",
      "valueJudgment": "值得精读和直接使用。官方代码与数据完整，适合作为 Tool/MCP/Policy 供应链评测基础。",
      "priority": "A"
    },
    {
      "id": "bench2robust",
      "title": "Retry, Switch, or Abstain? Learning Strategy-Aware Tool-Use Policies via Controlled Error Injection",
      "url": "https://arxiv.org/abs/2608.11977",
      "authorsAndInstitutions": "Chaoran Chen、Vy Nguyen、Ziji Zhang、Abhinav Gullapalli、Ziyi Wang、Yuxuan Lu、Dakuo Wang、Jing Huang、Zhou Yu、Jin Lai；论文 HTML 首页标注 Amazon。",
      "qualitySignals": "作者与机构信号：强，Amazon；版本动态：arXiv:2608.11977 v1，2026-08-12 12:08:39 UTC 提交，进入 2026-08-13 公开批次；开源与数据：未可靠查到官方代码或 benchmark artifact。",
      "openSourceAndData": "未可靠查到官方代码或数据链接。",
      "tags": ["Agent Tool", "Runtime Reliability", "Fault Injection", "Agent Memory", "RL", "Supply-chain Security"],
      "summary": "把原本无故障的 Tool benchmark 转成可控制瞬态、持久和静默故障的环境，训练 Agent 学会 retry、switch 或正确 abstain。",
      "importance": "真实 Agent 依赖的 API/MCP/Tool 不会永远成功：可能超时、持续不可用或返回静默错误。多数 benchmark 却假设工具可靠，使部署系统缺乏‘何时重试、何时换路径、何时停止’的策略性恢复能力。",
      "methodHighlights": "Bench2Robust 给现有多轮 tool-use benchmark 注入受控错误，并通过 scenario-controlled solvability 构造必须 retry、switch 或在所有路径耗尽后 abstain 的 episode。论文比较不训练的 Bayesian Tool Memory（记录环境特定恢复知识）与 curriculum-controlled RL，并评估二者组合。",
      "keyFindings": "7 个模型、4 个家族和两类 multi-turn benchmark 中都出现明显 robustness gap。Held-out Retail 上，BTM 无需训练最多提升 16.8 个百分点；RL 学到无需 inference-time BTM 也有效的恢复行为。二者结合在故障注入下达到 40.8–45.5%，同时保持 failure-free performance。策略分解显示 BTM 更强于瞬态 retry，RL 对持久故障的 switch/避免过早升级更重要。",
      "limitations": "故障模型仍是受控注入，无法覆盖真实 SaaS/MCP provider 的所有异常语义与依赖级联。BTM 本身会成为新的 runtime state 依赖，错误或过期故障统计也可能误导 Agent。开源 artifact 本轮未可靠确认。",
      "inspiration": "论文直接结论：工具鲁棒性需要环境恢复知识与学习到的策略互补。研究启发：对 MCP Server、Tool Provider、LLM API 做供应链 chaos testing，并把 failure class、provider/version、retry budget、fallback path、BTM state 与最终 decision 记录进 Runtime-SBOM。",
      "valueJudgment": "值得阅读和工程复现，尤其适合作为 MCP/Tool 依赖故障与降级策略的基准框架。",
      "priority": "B"
    },
    {
      "id": "shaper-skill-harness",
      "title": "Self-Evolving Embodied Agents via Skill-Harness Evolution",
      "url": "https://arxiv.org/abs/2608.11350",
      "authorsAndInstitutions": "Peidong Wang、Zhiming Ma、Ying Chang、Xufang Luo、Xiaocui Yang、Shi Feng、Yuqing Yang、Dongsheng Li；论文 HTML 首页标注 Microsoft Research，并包含 Northeastern University 作者关联。",
      "qualitySignals": "作者与机构信号：强，Microsoft Research + Northeastern University；版本动态：arXiv:2608.11350 v1，2026-08-11 18:55:58 UTC 提交并进入 2026-08-13 cs.CL 公开列表；开源与数据：未可靠查到独立官方代码仓库。",
      "openSourceAndData": "未可靠查到官方代码仓库；论文附录完整公开 seed/evolved skill、harness 与优化 prompts。",
      "tags": ["Embodied Agent", "Agent Skill", "Agent Harness", "Self-evolution", "Runtime Policy", "Robotics"],
      "summary": "冻结模型和执行器，只通过目标环境 rollout 联合演化可复用 Skill 与 context-code Harness，实现无需参数训练的 embodied adaptation。",
      "importance": "Agent 适应环境并不一定需要更新模型权重。Skill 与 Harness 已经能决定任务拆解、证据保留、恢复策略和传给 planner 的上下文，因此它们本身就是可以独立演化的行为组件，同时也带来版本漂移和自修改风险。",
      "methodHighlights": "SHAPER 将系统拆成 frozen VLM planner、frozen executor、textual skill 与 Python context-code harness。Rollout 后先由 judge/summarizer 产生结构化诊断，再先优化 Skill、后固定 Skill 优化 Harness；候选 Harness 受 sandbox/runtime contract 限制并经验证集选择。实验覆盖 VLABench 与 ESI-Bench 两种不同 action interface。",
      "keyFindings": "VLABench 上 Seed Agent 28.25%，完整 Skill-Harness evolution 达 34.50%，比 seed +6.25 点、比 same-data SFT +10.50 点。ESI-Bench 231-question subset 上 micro accuracy 从 Seed 32.5% 提升到 Evolved Skill 41.1%，再到 SHAPER 49.8%；macro average 为 31.2%→38.6%→42.9%。演化成本按 API 等价 token 估计约 $2.25（VLABench）和 $2.83（ESI-Bench），不含模拟器/GPU。",
      "limitations": "主要验证 benchmark 中的 frozen 27B planner 与特定执行器，尚未验证真实机器人和跨 embodiment transfer。自演化 Skill/Harness 可能吸收错误 rollout 或恶意环境反馈，论文并不以 adversarial safety 为主。Harness optimizer 生成代码也引入新的可执行供应链面。",
      "inspiration": "论文直接结论：Skill 与 Harness 的联合外部演化可以显著改善冻结 Agent。研究启发：自修改 Skill/Harness 必须进入隔离候选区，记录 input trajectories、optimizer model、diff、sandbox validation、runtime contract 和 acceptance evidence；对环境污染、恶意反馈和跨版本兼容做独立安全回归。",
      "valueJudgment": "值得精读。直接安全贡献有限，但对‘Skill + Harness 是可演化软件制品’这一供应链视角非常重要。",
      "priority": "B"
    },
    {
      "id": "agentic-memory-serving-cost",
      "title": "Total Recall at What Cost? Benchmarking the Serving Cost of Agentic Memory Systems",
      "url": "https://arxiv.org/abs/2608.11879",
      "authorsAndInstitutions": "Natchanon Pollertlam、Witchayut Kornsuwannawit；Bricks Technology, Thailand。机构来自论文 HTML 首页。",
      "qualitySignals": "作者与机构信号：中，机构可可靠确认，但团队长期 Agent Memory 学术积累本轮未进一步核验；版本动态：arXiv:2608.11879 v1，2026-08-12 10:05:29 UTC 提交，进入 2026-08-13 公开批次；开源与数据：未可靠查到作者官方复现仓库。",
      "openSourceAndData": "未可靠查到官方代码、结果或数据仓库。",
      "tags": ["Agent Memory", "Long-term Agent", "Serving Cost", "RAG", "Evaluation", "Behavioral Dependency"],
      "summary": "系统比较 Mem0、Hindsight、Mastra Observational Memory 与 rolling window/full transcript 的长期服务成本和回答准确率。",
      "importance": "Agent Memory 常被描述为减少长期上下文成本的基础设施，但真实系统内部可能进行额外摘要、检索、写入或模型调用，导致‘对话更长所以 Memory 更省钱’这一简单推断失效。部署时 Memory backend 与 backbone 的组合本身就是需要独立评测的系统依赖。",
      "methodHighlights": "论文比较三种真实 Memory 系统、固定 rolling window 和 full-transcript baseline，覆盖两种 backbone、最长 400 turns；成本 benchmark 与 665 个 LoCoMo question 的回答准确率配对，并建立 break-even 分析和 held-out cost model。",
      "keyFindings": "只用 conversation length 与 message size 的成本模型对 Memory 系统误差达到 18–69%，说明内部 memory behavior 是关键成本来源。不同系统的 break-even 从几十轮就开始省钱到 400 轮内始终不省钱都有；准确率范围 21–54%，且 backbone 对成本的影响与 Memory system 本身同量级，没有单一方案同时统治成本与准确率。",
      "limitations": "成本 benchmark 使用合成对话，准确率只在 LoCoMo 上验证；Hindsight ingest backbone 未完全受 benchmark 控制，provider routing 也会造成成本方差。成本模型是描述性的，不直接解释内部机制，也未覆盖 Memory 污染与权限安全。",
      "inspiration": "论文直接结论：Memory 的成本不能仅由上下文长度预测，Memory backend × backbone 组合决定实际 break-even 和准确率。研究启发：把 Memory backend、embedding/model、write/retrieval policy、provider pricing/version、token accounting 与 accuracy/security regression 纳入 Memory-SBOM；模型或 backend 更新时重新计算成本—正确性前沿。",
      "valueJudgment": "值得阅读，特别适合做 Agent Memory 架构选型和系统性 Evaluation-SBOM；安全关联主要来自部署依赖治理的延展。",
      "priority": "B"
    }
  ]
});
