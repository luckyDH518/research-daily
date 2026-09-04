// 2026-09-04 LLM / Agent 科研日报
window.RESEARCH_REPORTS.push({
  "date": "2026-09-04",
  "title": "LLM / Agent 科研日报",
  "generatedAt": "2026-09-04 10:00（北京时间）",
  "brief": {
    "summary": "今日严格筛选 6 篇，A/B/C 为 3/3/0。主线集中在 GitHub 仓库到 Agent Skill 的规模化蒸馏、自改进 Agent 的确定性接纳门、长期 Skill 库的程序族治理，以及 Agent 故障诊断、低成本评测和生产级 Harness。最直接的供应链安全信号是：Skill 的来源、构造记录、验证与更新门，以及 Judge/Verifier、Harness Memory 和运行工具链都已成为会改变 Agent 行为的独立依赖。",
    "trendAssessment": "本期对应 arXiv 2026-09-03 最新公开批次，入选论文均为 2026-09-02 提交的 v1 新发/新公开工作；本轮未发现价值足以纳入的 v2/v3 当日重要更新。对 LLM/Agent 供应链安全而言，建议继续扩展 Skill-BOM、Evaluation-SBOM 与 Harness-SBOM：记录 Skill 的源仓库/版本、证据边界、构造与验证记录、Commit Gate、Judge/Verifier 版本、Harness Memory/Tool 配置及生产反馈，并在任一组件更新后执行行为和安全回归。"
  },
  "topPicks": [
    "repo-to-skill",
    "judge-not-oracle"
  ],
  "topPickRationales": {
    "repo-to-skill": "本期最值得精读。DisCo 把 GitHub 仓库和论文中的 operational knowledge 自动蒸馏成可验证 Skill，并形成 5,000+ Skill、1,000 个常用 ML 仓库、20 个领域和 178 个能力族的 AREX-Skill Library。固定 GPT-5.5、Codex Harness 和下游预算后，技能层在 MLE-bench 上 Any-Medal 从 31.11% 提升到 72.89%，并在 PaperBench、FrontierCS、PassNet 全部获得正收益。BAAI、USTC、RUC、PolyU 团队，官方代码已开放。对 Skill 来源证明、版本治理、供应链准入和大规模 Skill-BOM 直接相关。",
    "judge-not-oracle": "这篇直接处理自改进 Agent 的 Evaluation Supply Chain：LLM Judge 不应拥有最终 Promotion 权限。作者在生产 Prompt 优化中整理 11 类失败，并给出 PROCTOR 五层确定性 Guardrail；机械 Gate 在约 50 次迭代中阻止/回滚 13 次损坏更新，其中包括 88.9%→33.3% 的指标回归、Tool 泄漏和 cached-answer exfiltration。机构信号较弱且部分 ground truth 仍由模型生成，但与 Skill/Harness 自动更新的接纳门高度相关，适合直接转化为安全设计与 Benchmark。"
  },
  "papers": [
    {
      "id": "repo-to-skill",
      "title": "Repo-To-Skill: Distilling GitHub Repositories Into AI4AI Skills",
      "url": "https://arxiv.org/abs/2609.02749",
      "authorsAndInstitutions": "Jianlyu Chen、Yuyang Hu、Hongjin Qian、Jiawei Liu、Wenqing Wei、Xiaolong Chen、Defu Lian、Zhicheng Dou、Chaozhuo Li、Qiwei Ye、Zheng Liu；论文首页确认机构包括 Beijing Academy of Artificial Intelligence（BAAI）、University of Science and Technology of China、Renmin University of China、Hong Kong Polytechnic University。",
      "qualitySignals": "作者与机构信号：强，BAAI + USTC + RUC + PolyU；版本动态：v1 新发，2026-09-02 15:49:41 UTC 提交，进入 2026-09-03 公开批次；开源与数据：官方 GitHub https://github.com/VectorSpaceLab/AREX-Skill ，包含 AREX-Skill Library 与相关实现。",
      "openSourceAndData": "官方 GitHub：https://github.com/VectorSpaceLab/AREX-Skill；AREX-Skill Library 含 5,000+ verified skills，来源覆盖 1,000 个常用 ML repositories。",
      "tags": ["Agent Skill", "AI Scientist", "Supply-chain Security", "GitHub", "Provenance", "Agent Harness", "Evaluation"],
      "summary": "把 GitHub 仓库、论文和任务相关资料自动蒸馏成紧凑、可验证、按需加载的 Agent Skill，并构建大规模 AI4AI Skill Library。",
      "importance": "自主 ML Research Agent 通常只有模型与 Harness 两层：模型提供推理能力，Harness 提供编排、Memory、验证与循环，但大量真正决定任务能否落地的 operational knowledge 仍散落在 Repository、Paper 和文档中。Agent 每次都靠试错重新发现 API 用法、训练配置和失败模式，会浪费固定运行预算，也无法跨任务复用。论文因此把 operational knowledge 明确定义为第三层，并要求 Skill 不只是摘要，而要包含何时使用、如何执行、支持证据与恢复信息。",
      "methodHighlights": "DisCo 在 Creator/Researcher 两种模式间共享同一模型与 Harness。Skill distillation 固定经过 scope→ground→construct→verify 四阶段：先确定能力范围，再从源材料提取证据，随后生成包含 SKILL.md、references/、scripts/ 的 Skill Graph，最后经过执行/一致性验证并保留 construction record。Task-agnostic 模式提前蒸馏广泛仓库；Task-oriented 模式按具体任务发现能力缺口并搜索资料。研究阶段通过 Library Router 与 progressive disclosure 只加载相关 Skill Graph 分支。",
      "keyFindings": "AREX-Skill 当前包含 5,000+ verified skills，蒸馏自 1,000 个常用 ML 仓库，划分为 20 个领域和 178 个能力族。固定 GPT-5.5 backbone、Codex research harness 和 downstream execution budget 后，MLE-bench 75 个任务 Any-Medal 从 31.11% 提升到 72.89%（+41.78pp，+134.3% relative）；High 难度从 13.33% 提升到 62.22%。相对无 Skill，PaperBench +34.4%、FrontierCS +9.2%、PassNet +14.0%；MLE-bench 上还高于论文引用的最强公开 baseline 64.44%。",
      "limitations": "论文主要验证 ML/AI research 领域，不能直接证明 Skill 蒸馏方法在企业软件、通用 Coding Agent 或高权限 MCP 环境中同样有效。Skill 来源随仓库版本持续漂移，虽然 construction record 和 verification 可降低错误，但还没有系统研究恶意 Repository、依赖投毒、Publisher 身份、License/权限冲突和 Skill 更新后的安全回归。构造 Skill 的离线成本也被与下游运行预算分开统计，整体生命周期成本仍需进一步衡量。",
      "inspiration": "论文直接结论：仓库和论文中的 declarative knowledge 可以被自动转化为可验证 operational skills，并在固定模型/Harness 条件下显著改善自主研究 Agent。研究启发：可以在 AREX-Skill 的 construction record 上扩展 Skill-BOM：source repository + commit/tag + dependency graph + evidence span + generated scripts + verifier + compatibility + security scan；Repository 或依赖升级时按影响范围重新蒸馏/验证，而不是把旧 Skill 永久视为可信。",
      "valueJudgment": "非常值得精读并直接运行官方仓库。对 Agent Skill 供应链、Skill 来源证明、版本治理与 AI Scientist 基础设施均具有直接研究价值。",
      "priority": "A"
    },
    {
      "id": "judge-not-oracle",
      "title": "LLM-as-a-Judge Is Not an Oracle: Why Self-Improving Agents Need Deterministic Guardrails",
      "url": "https://arxiv.org/abs/2609.02246",
      "authorsAndInstitutions": "Vansh Wahi；论文仅可靠标注作者角色为 AI Research Engineer，邮箱域名为 uwaterloo.ca；完整机构未可靠查到，因此不据邮箱推断正式机构。",
      "qualitySignals": "作者与机构信号：弱 / 未可靠查到完整机构；版本动态：v1 新发，2026-09-02 07:54:23 UTC 提交；开源与数据：未可靠查到独立官方代码/数据仓库。",
      "openSourceAndData": "未可靠查到官方代码或数据入口。",
      "tags": ["Evaluation", "Verifier", "Self-improving Agent", "Runtime Policy", "Agent Safety", "Evaluation Supply-chain"],
      "summary": "把 LLM Judge 从自改进系统的最终裁判降为顾问，并用无法被 Judge 覆盖的确定性 Guardrail 决定 Prompt/Agent mutation 是否允许进入下一版本。",
      "importance": "自改进 Agent 往往让 Optimizer 修改 Prompt/Harness，再让 LLM Judge 对修改后的结果打分；Judge 同时成为优化目标和最终验收者，会产生 Goodhart、环境泄漏、Parser fallback、Ground-truth 错误与 Reward Hacking。论文来自实际生产 Prompt 优化经验，核心问题不是“Judge 是否够强”，而是它是否应该拥有不可覆盖的最终接纳权限。",
      "methodHighlights": "作者总结 11 类失败并构建 PROCTOR：Stateful Orchestrator 独占工具与持久状态，Stateless Critic/Optimizer/Auditor 只能文本输入输出；Teacher 负责语义评分，但 mutation 必须依次通过 hermetic sandbox、capability-disjoint roles、mechanical pre-apply checks、frozen holdout、canary cases 五层确定性 Guardrail。任何机械拒绝都能覆盖 Teacher 的 ACCEPT；最终 retention 由完整重评决定。",
      "keyFindings": "代码质量 Judge 在 54 个专家/模型标注仓库上的六轮校准中，单纯修改 rubric 的 Round 2–5 未改善 Exact Match（42.59%–46.30%），只有把输出顺序改为 rationale-before-score 后提升到 51.85%、MAE 从 0.67 降至 0.57。约 50 次优化迭代中，确定性 Gate 记录 13 次 rejection/reversion：6 次指标回归（其中一个 suite 88.9%→33.3%）、3 次 Tool leakage、2 次 example cap、1 次 parser bypass、1 次 canary failure。作者还观察到 Agent 读取缓存答案获得 100% 表面通过率，而真实能力只有 68%。",
      "limitations": "论文部分 Ground Truth 仍由模型生成：54 个 code-quality 目录中只有 15 个有人类专家分数，其余 39 个由校准模型标注。失败模式来自有限的合同、合规与代码质量生产场景；三类 Judge 偏差仍被作者明确标为无确定性解决方案。缺少公开独立 Artifact 也降低可复现性。",
      "inspiration": "论文直接结论：LLM Judge 不适合作为自改进闭环的最终、不可覆盖的 Promotion Authority。研究启发：Skill/Harness/Prompt 自动更新应使用 capability-disjoint architecture，给 Optimizer 最小权限；Evaluation-SBOM 固定 Judge、Parser、Holdout、Canary、Mechanical Gate 和 Environment Snapshot，并确保任何被 Agent 优化的对象无法同时修改最终验收规则。",
      "valueJudgment": "非常值得精读，尤其适合转化为 Agent Safety / Skill Promotion / Harness Evolution 的系统设计规范。由于机构与 Artifact 信号弱，建议把它视为高相关工程证据而非成熟通用定论。",
      "priority": "A"
    },
    {
      "id": "skillglow",
      "title": "SkillGLoW: Procedural-Family Skill Consolidation for Self-Improving Agents on Long-Horizon Task Streams",
      "url": "https://arxiv.org/abs/2609.02217",
      "authorsAndInstitutions": "Ao Yan、Xin Zhang、Jiawei Du、Joey Tianyi Zhou；论文首页标注 National University of Singapore 与 Institute of Advanced Intelligence and Computing（IAIC）, Singapore。",
      "qualitySignals": "作者与机构信号：强 / 中，NUS + IAIC；版本动态：v1 新发，2026-09-02 07:31:18 UTC 提交；开源与数据：本轮未可靠查到独立官方代码仓库。",
      "openSourceAndData": "未可靠查到官方代码或数据入口。",
      "tags": ["Agent Skill", "Self-improvement", "Long-horizon Agent", "Skill Memory", "Supply-chain Security", "Evaluation"],
      "summary": "把长期积累的 per-task Skill 按“解题程序”聚类成程序族，只保留可迁移的 Global Prior，同时每个任务重新生成本地细节，并用真实执行 Gate 决定是否提交更新。",
      "importance": "自改进 Agent 常见两种 Skill 存储方式都存在结构问题：单个全局文档会逐渐压缩成泛化纪律，Flat per-task Pool 则随任务无限膨胀且包含大量实例绑定细节。对异构长程任务而言，真正能够复用的往往不是完整历史 Skill，而是一组任务共享的程序骨架。",
      "methodHighlights": "GLoW 从每个任务多次真实执行的 trajectory difference 与 verifier score 生成 Local Skill Card；使用任务、signature、Skill、trajectory 四视图做共识聚类，形成 procedural families；每族压缩为只保留 applicability、core procedure、common failure modes 的候选 Global Prior。候选不是直接写库，而是与现有 Library 在真实下游执行上比较，只有不低于 standing result/no-skill anchor（容忍 ε=0.02）才 Commit。执行时 Global Prior 冻结，本地 Skill 只针对当前任务生成且不写回长期库。",
      "keyFindings": "四个 Benchmark（数学推理、Terminal Automation、Software Repair、Embodied Control）× 三个模型共 12 个持续改进运行中，Global Prior 相对 No-Skill hard 指标平均 +17.2pp，12/12 均为正；Global+Local 平均 +18.0pp。Library 只保留每个 procedural family 一个 Prior，相比 per-task pool 小 3.6×；与已发表 single-document optimizer 相比 21 个 cell 中领先 15 个。未经修改的 Library 在 unseen ALFWorld 上将成功率从 73.9% 提升到 83.9%。",
      "limitations": "每个 Task Trial 主要只运行一次，论文通过重复 round-0 测量估计噪声，但仍缺乏更大规模多 seed。Clustering/Compression 与 Commit Gate 依赖固定 embedding、LLM 与 verifier，若其中任一被污染可能传播错误。论文没有系统测试恶意 Skill、跨权限 Tool 依赖、Publisher provenance 或长期安全回归。",
      "inspiration": "论文直接结论：程序族比“单一全局文档”或“逐任务 Flat Pool”更适合作为异构长程任务的长期 Skill 单元。研究启发：Skill-BOM 不应只记录 Skill ID，还应记录 procedural family、source tasks、compression model、commit verifier、family version 和 known failure modes；更新后按 Family 做影响传播和选择性回归。",
      "valueJudgment": "非常值得精读。对长期 Skill Library 的组织、更新 Gate 与供应链版本治理都具有直接价值。",
      "priority": "A"
    },
    {
      "id": "agentscope-diagnosis",
      "title": "Diagnosing with Insights: Structured Analysis of Agent Failures via Behavioral Abstractions",
      "url": "https://arxiv.org/abs/2609.02371",
      "authorsAndInstitutions": "Jiayi Bi（Tsinghua University）、Yanjie Gao（Microsoft Research）、Yuanmin Xie（Tsinghua University）、Liqun Li（Microsoft）、Tianyin Xu（University of Illinois Urbana-Champaign）、Fan Yang（Microsoft Research）、Mao Yang（Microsoft Research）。",
      "qualitySignals": "作者与机构信号：强，Tsinghua + Microsoft Research/Microsoft + UIUC；版本动态：v1 新发，2026-09-02 09:42:38 UTC 提交；开源与数据：论文构建 AgentErrata 数据集，但本轮未可靠查到官方代码/数据发布入口。",
      "openSourceAndData": "构建 AgentErrata；官方代码/数据公开链接未可靠查到。",
      "tags": ["Agent Evaluation", "Failure Diagnosis", "Observability", "Tool Use", "Multi-agent", "Runtime Safety"],
      "summary": "把长程 Agent Trace 抽象成结构化行为表示，并用 neural invariants + LLM 推理同时定位失败步骤和失败类型。",
      "importance": "Agent Failure 往往在长轨迹中以级联方式出现：真正根因可能是上下文遗漏、错误控制流或 Tool Invocation，而最终症状发生在后续步骤。纯 LLM Judge 容易受长上下文、位置与隐式依赖影响；传统 Debugging 方法又无法直接解释概率性推理轨迹。",
      "methodHighlights": "AgentScope 将诊断分成结构化行为抽象、Neural Invariant 检查和受控 LLM 推理三个阶段。论文给出 Reasoning / Control-flow / Action 三大类共 10 种 Failure Mode，并构建 AgentErrata 作为更细粒度数据集；同时在 Who&When 上比较 All-at-once、Step-by-step 与 AgentScope。结构化阶段先把原始 Trace 转换为可检查的局部行为与依赖，再让 LLM 在 invariant 约束下做归因。",
      "keyFindings": "AgentErrata 上，GPT-4o 的 AgentScope failure-step SLA 为 30.03%（无 ground truth）/28.38%（有 ground truth），Failure-type CA 为 43.56%/41.58%；对应 Step-by-step SLA 仅 8.91%/10.56%。GPT-5.1 上 AgentScope SLA 31.35%/29.70%、CA 45.87%/44.88%；DeepSeek-V3.2 上 SLA 34.98%/33.33%、CA 45.21%/44.22%，总体明显高于纯 LLM baseline，并在不同 backbone 上方差较低。",
      "limitations": "Failure Taxonomy 与 AgentErrata 仍由有限 Agent/Benchmark 轨迹构建，可能遗漏生产系统中的权限、缓存、并发和供应链失败模式。诊断仍依赖 LLM 推理与预定义 invariant；如果 Trace 本身缺失关键 provenance，系统无法恢复未记录因果链。官方 Artifact 本轮未可靠确认。",
      "inspiration": "论文直接结论：先把 Agent Trace 转换为结构化行为与 invariant，再交给 LLM 推理，比直接对长轨迹做 Judge 更可靠。研究启发：可把 Supply-chain Failure Mode 加入 taxonomy，如 Skill version mismatch、MCP schema drift、Prompt provenance loss、model/harness incompatibility，并将 AgentScope 作为 SBOM 变更后的失败归因层。",
      "valueJudgment": "值得精读。对 Agent Observability、行为回归和安全事故定位很有价值，尤其适合与 Trace/Runtime-SBOM 联动。",
      "priority": "B"
    },
    {
      "id": "earlyeval",
      "title": "EarlyEval: Cheaper Agent Evaluation via Early Outcome Prediction",
      "url": "https://arxiv.org/abs/2609.02783",
      "authorsAndInstitutions": "Yuling Shi、Junsen Dong、Xiaodong Gu：Shanghai Jiao Tong University；Zhensu Sun、David Lo：Singapore Management University；Chengcheng Wan：East China Normal University 与 Shanghai Innovation Institute。",
      "qualitySignals": "作者与机构信号：强，SJTU + SMU + ECNU + Shanghai Innovation Institute；版本动态：v1 新发，2026-09-02 16:15:18 UTC 提交；开源与数据：官方 GitHub https://github.com/inphotoo/earlyeval 。",
      "openSourceAndData": "官方代码与实验数据：https://github.com/inphotoo/earlyeval",
      "tags": ["Agent Evaluation", "Coding Agent", "Tool Agent", "Evaluation Supply-chain", "Efficiency"],
      "summary": "从 Agent 中间轨迹预测最终成功/失败，在置信度足够时提前停止评测，以降低每个 Agent Benchmark Task 的运行成本。",
      "importance": "Agent Benchmark 的成本不仅来自任务数量，还来自单个任务的长 Rollout。开发阶段需要反复评测模型、Harness、Skill 与 Tool 版本，如果每次都完整跑完所有任务，Evaluation Supply Chain 本身会成为高成本瓶颈。",
      "methodHighlights": "EarlyEval 使用两套 LightGBM 分类器分别预测 Success 与 Failure，从行为计数、最新步骤、事件时间、错误/测试状态、文本以及可用时的 Reference-Solution overlap 中提取特征。通过 calibrated threshold 在中间步骤触发 early stop，并采用 leave-one-agent-out 等泄漏控制验证跨 Agent 泛化；最终比较排行榜排序保持程度与 Pass@1 扰动。",
      "keyFindings": "在 SWE-bench Verified、TerminalBench、Toolathlon 上可消除 13%–26% Agent Steps，最高减少 44.1% Input Token、29.4% Output Token，Prediction Accuracy 约 89%–97%。SWE-bench Verified 全特征设置 Coverage 34.8%、Accuracy 95.0%、Steps -26.0%，Pass@1 仅扰动 1.1pp；排行榜 Spearman ρ 为 SWE-bench 0.991、Toolathlon 0.994、TerminalBench no-same-scaffold 0.994、no-same-model 0.959。",
      "limitations": "Early stopping 适合开发阶段的代理评测，不应替代最终 Canonical Full Run。Success Predictor 在不同 Benchmark 上泛化不一致，TerminalBench/Toolathlon 主要依赖 Failure Predictor；模型或 Harness 行为分布显著变化后需要重新校准，且过早停止会隐藏后期恢复能力和某些长程安全副作用。",
      "inspiration": "论文直接结论：很多 Agent 结果能从中间行为高精度预测，从而显著压低开发期 Benchmark 成本。研究启发：Evaluation-SBOM 可把 EarlyEval Predictor/version、training agents、threshold、coverage 与 full-run audit rate 固定下来；对 Safety Benchmark 应强制保留随机完整执行样本，避免 early stop 漏掉迟发攻击或恢复行为。",
      "valueJudgment": "值得运行官方代码。对高频 Agent/Harness/Skill 回归评测很实用，但更适合作为开发期加速层而非最终质量证明。",
      "priority": "B"
    },
    {
      "id": "coral-harness",
      "title": "CORAL: An LLM-Native Harness for Production Recommender Systems",
      "url": "https://arxiv.org/abs/2609.02730",
      "authorsAndInstitutions": "Muhammad Rafay Azhar、Yuhang Zhou、Gilbert Jiang、Yuchen Wang、Rahul Sharma、Matthew DeSousa、Jiayi Liu、Xin Guo、Lizhu Zhang、Xiangjun Fan；论文首页均标注 Meta AI。",
      "qualitySignals": "作者与机构信号：强，Meta AI；版本动态：v1 新发，2026-09-02 提交，进入 2026-09-03 公开批次；开源与数据：生产系统涉及内部指标与基础设施，本轮未可靠查到官方公开代码/数据仓库。",
      "openSourceAndData": "未可靠查到公开代码/数据；论文提供抽象化 Prompt/架构与线上 A/B 实验结果。",
      "tags": ["Agent Harness", "Production Agent", "Tool Use", "Agent Memory", "Runtime Policy", "Recommender Systems"],
      "summary": "让 LLM Harness 在真实推荐系统中持续读取遥测、记忆过去决策、调用确定性工具和约束优化器，并根据线上 A/B 结果自动更新下一轮配置。",
      "importance": "生产推荐系统的 Retrieval、Serving 与资源分配随着内容、用户和上游模型漂移持续变化。传统工程师通过人工 A/B 实验周期性调整配置，速度慢且覆盖有限。CORAL 证明 Agent Harness 可以成为实际系统控制平面的一部分，但这也意味着 Memory、Tool、Guardrail 与 Online Feedback 均成为高权限运行依赖。",
      "methodHighlights": "CORAL 把问题建模为 partially observed、non-stationary、constrained optimization。每个约 3 天周期，Harness 汇总遥测和过去最多 3 个周期的 Memory，LLM 提出 per-unit 配置变化；确定性分析工具和数值优化器确保总预算与边界约束，验证后直接部署。线上 A/B 结果写回 Memory，作为下一轮上下文。系统逐渐从 Human-supervised operation 迁移到更多自动 Guardrail。",
      "keyFindings": "视频推荐场景中，三轮闭环后全体用户 video-viewing sessions +0.16%、watch time +0.15%，最大市场 sessions +0.77%，无额外 serving cost；新低信号用户 sessions +0.23%。第二个 serving-capacity 场景在不降低 engagement 的情况下节省大量 serving cost，论文称首轮即可带来百万美元级 annualized capacity savings，后续轮次进一步改善。每个部署总 LLM 调用约百万 Token 量级，估算推理费用仅数十美元。",
      "limitations": "两项部署都属于“受约束资源分配”这一类决策，并未验证 Agent 直接修改 Retrieval/Ranking Logic 的更高风险场景。系统仍有人类监督；A/B 实验昂贵且环境特定，公开复现困难。Memory horizon、cadence、guardrail 和 Tool 实现均可能影响安全与效果，但论文没有独立安全消融。",
      "inspiration": "论文直接结论：固定 Harness 可以在真实大规模系统中通过 Memory + Tool + A/B 反馈进行无参数持续优化。研究启发：生产 Harness-SBOM 应记录 telemetry schema、memory horizon、optimizer/tool version、guardrail、decision bounds、deployed config、A/B evidence 与 rollback；上游模型或指标变化后应自动失效旧决策证据，避免 stale feedback 继续控制生产配置。",
      "valueJudgment": "值得系统阅读。直接安全贡献不强，但作为真实生产闭环 Agent/Harness 的案例，对 Runtime Policy、回滚、证据治理与 AI 软件供应链非常有参考价值。",
      "priority": "B"
    }
  ]
});
