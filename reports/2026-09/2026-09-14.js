// 2026-09-14 LLM / Agent 科研日报
window.RESEARCH_REPORTS.push({
  "date": "2026-09-14",
  "title": "LLM / Agent 科研日报",
  "generatedAt": "2026-09-14 10:00（北京时间）",
  "brief": {
    "summary": "今日严格筛选 6 篇，A/B/C=3/3/0。主线集中在 Agentic Unlearning 的多通道泄漏、Skill 注册表扫描与运行时动作治理、Repository SKILL 优化、并行 Tool Agent 恢复、部署验证与长期 Memory 生命周期。对 LLM / Agent 供应链安全而言，最值得关注的是：不能把模型级安全证明直接外推到 Agent 部署，也不能把 Skill 发布前扫描等同于运行时授权。",
    "trendAssessment": "今天的共同趋势是安全边界继续从模型输出外移到部署表面：权重、Prompt、Retrieval、Tool Observation、SKILL.md、实际命令、长期 Memory 与真实部署环境都可能形成不同风险通道。供应链治理应同步记录 source substrate、runtime consequence、skill provenance、tool trace、memory lifecycle 和 deployment evidence。今日未发现值得纳入的 v2/v3 重要更新。"
  },
  "topPicks": ["k-bench-agentic-unlearning", "scan-skill-govern-action"],
  "topPickRationales": {
    "k-bench-agentic-unlearning": "直接证明模型级 unlearning 证书在 Agent 部署中可能失效：秘密会从最终答案迁移到 CoT、Tool Call、Tool Observation、Retrieval 或 Summary 等通道。UTS + CSIRO，官方代码与资产已开放；非常适合延展为 Agent 数据/模型供应链的多通道删除与撤销评测。",
    "scan-skill-govern-action": "直接研究 Skill 供应链中‘发布前判恶意’与‘运行时是否允许执行’的差异。66,192 个 ClawHub Skill 版本、真实 Agent 命令和确定性运行时 Gate 均有实证，并公开完整 Harness 与记录，适合直接作为 Skill/MCP Runtime Governance 基线。"
  },
  "papers": [
    {
      "id": "k-bench-agentic-unlearning",
      "title": "K-Bench: A Benchmark for LLM Unlearning in Agentic Deployments",
      "url": "https://arxiv.org/abs/2609.12808",
      "authorsAndInstitutions": "Guangsheng Yu、Yanna Jiang、Baihe Ma、Xu Wang：University of Technology Sydney；Qin Wang：CSIRO Australia。",
      "qualitySignals": {
        "authorInstitution": "强：University of Technology Sydney + CSIRO，机构由 PDF 首页可靠确认。",
        "version": "v1 新公开；2026-09-11 13:04 UTC 提交，进入 2026-09-14 arXiv 公开批次。",
        "openSource": "官方代码与资产已开放：OniReimu/kbench、kbench/kbench-assets。"
      },
      "openSourceAndData": "https://github.com/OniReimu/kbench",
      "tags": ["Agent", "Unlearning", "Privacy", "Tool Use", "RAG", "Supply-chain Security"],
      "summary": "把 LLM unlearning 从最终回答评测扩展到 Agent 的六个可观测通道，并按权重、Prompt 与 Retrieval 三类秘密来源分别判断是否真正遗忘。",
      "importance": "传统 TOFU/MUSE 主要检查最终答案或参数记忆，但部署成 ReAct Agent 后，秘密还可能经 Tool Observation、Retrieval、CoT 等路径泄漏，因此模型级‘已删除’并不等于部署级不可恢复。",
      "methodHighlights": "K-Bench 对 CoT、Tool Call、Tool Observation、Retrieval、Answer、Summary 六通道做联合观察；秘密分别注入参数、上下文和两类检索底座，并以 K-Score 同时约束遗忘、保留能力和 Agent 稳定性。",
      "keyFindings": "在 Prompt 或 Retrieval 中含秘密时，TOFU/MUSE 可报告无泄漏，但部署 Agent 仍在 22%–86% 查询中泄漏；结构化 Retrieval 中，过滤最终答案后秘密迁移到 Tool Observation，整体泄漏率几乎不变。对 20 个已发表权重级方法的评测中，没有方法被证明真正移除秘密，且最优方法随基础模型变化。",
      "limitations": "主要基于 ReAct scaffold、有限基础模型与预定义秘密注入方式；多通道观察仍不等于覆盖所有真实 SaaS、MCP、日志或隐藏状态泄漏面。",
      "inspiration": "论文直接结论：模型级 unlearning 证书不能直接外推到 Agent 部署。研究启发：Unlearning-SBOM 应记录 secret substrate、model/prompt/retrieval version、observable channels、tool trace、deletion method 与 post-deployment leak test，并对模型、Retriever 或 Harness 更新重新验证。",
      "valueJudgment": "非常值得精读和复现，适合发展 Agent 数据撤销、Memory 删除与模型供应链安全评测。",
      "priority": "A"
    },
    {
      "id": "scan-skill-govern-action",
      "title": "Scan the Skill, Govern the Action: Composing Registry Verdicts with Runtime Consequence Control",
      "url": "https://arxiv.org/abs/2609.12001",
      "authorsAndInstitutions": "Rohit Taneja、Travis Weber；Pheo Inc。",
      "qualitySignals": {
        "authorInstitution": "中：Pheo Inc，机构由 PDF 首页可靠确认；主题与 Agent Skill 安全高度相关。",
        "version": "v1 新公开；2026-09-10 00:19 UTC 提交，进入 2026-09-14 公开批次。",
        "openSource": "官方代码、语料复现脚本、live-agent harness、逐命令记录与 benchmark 已开放。"
      },
      "openSourceAndData": "https://github.com/pheo-ai/open-agent-trust-system",
      "tags": ["Agent Skill", "Supply-chain Security", "Runtime Policy", "Tool Use", "MCP", "Software Supply Chain"],
      "summary": "将 Skill 发布前恶意检测与 Agent 运行时动作授权拆成两个独立安全层，用确定性 Gate 判断具体动作在当前机器和操作者策略下是否允许。",
      "importance": "Skill Registry 的 Clean/Suspicious/Malicious 判定回答的是制品是否恶意，却不能回答某个 Agent 在当前主机、凭据和合规策略下是否允许执行该动作；静态 SKILL.md 也不能完整约束实际生成的命令。",
      "methodHighlights": "分析 66,192 个 ClawHub Skill 版本，并运行真实 Agent 跟随 Skill 文档执行；提出 OATS，在 Tool/Command 真正执行前使用无模型参与的确定性 resolver，将 consequence class、resource 和 operator risk policy 映射为允许/保持/阻断决策。",
      "keyFindings": "705 个来自 135 个发布者、被所有扫描器与 Registry Judge 判 Clean 的 Skill 仍指示了许多组织会禁止的动作；人工审计检测器精度 92%。144 条真实 Agent 命令中，34.7% 的 consequence class 未出现在文档代码块；53 个已清理 Skill 中 Agent 有 23 次尝试高风险动作，Gate 全部阻止。",
      "limitations": "单个 live-agent 配置和有限命令表面不能代表全部 Skill/MCP 行为；动作解析 Gate 看不到未落地为显式 Tool/Command 的隐性伤害，且策略阈值仍依赖组织自身风险定义。",
      "inspiration": "论文直接结论：Skill 恶意性与运行时许可是不同命题。研究启发：Skill/MCP-SBOM 应同时记录 publisher/version/scanner verdict 与 runtime consequence class、resource、credential scope、operator policy、decision evidence；发布前扫描和运行时 Gate 应组合而不是互相替代。",
      "valueJudgment": "非常值得精读和直接复现，是今天最贴近 Agent Skill 软件供应链安全的系统工作。",
      "priority": "A"
    },
    {
      "id": "skill-issue-repository-skills",
      "title": "Skill Issue: Lessons from Optimizing Repository SKILLs for Coding Agents",
      "url": "https://arxiv.org/abs/2609.12742",
      "authorsAndInstitutions": "Mykhailo Kozyrev：Technical University of Munich、JetBrains Research；Andrei Kozyrev：JetBrains Research；Anton Podkopaev：Constructor University Bremen、JetBrains Research。",
      "qualitySignals": {
        "authorInstitution": "强：JetBrains Research + TUM + Constructor University，机构由 PDF 首页可靠确认。",
        "version": "v1 新公开；2026-09-11 11:41 UTC 提交。",
        "openSource": "未可靠查到论文对应的官方代码或数据仓库。"
      },
      "openSourceAndData": "未可靠查到",
      "tags": ["Coding Agent", "Agent Skill", "Software Engineering", "Evaluation", "Repository Knowledge"],
      "summary": "用真实仓库历史中的合并 PR 构造更困难的 Skill 优化任务，并比较自动优化后的 SKILL.md 是否真正让同一 Coding Agent 比无文档时更强。",
      "importance": "Repository SKILL 正成为与代码共同版本化的行为依赖，但已有 Skill optimizer 往往依赖过小的合成任务，强 Agent 在没有 Skill 时也能饱和，导致优化分数缺乏区分力。",
      "methodHighlights": "从三个 Kotlin 仓库挖掘 merged PR，在固定 base commit 上回退变更形成任务；同一 Agent 分别在有/无候选 SKILL.md 情况下执行，用真实增益而不是文档风格作为优化目标，并比较 GEPA 与 SkillOpt。",
      "keyFindings": "三个 Kotlin 仓库中，GEPA 找到的文档平均提升约 4.9 个百分点；SkillOpt 仅比 seed 高约 0.1 个百分点。作者同时指出，在单仓库可提供的数据规模下，4.9pp 仍无法与 Agent 的运行方差可靠区分。",
      "limitations": "只有三个 Kotlin Repository，统计功效有限；没有直接测恶意或过期 Skill，也没有评估 Skill 更新后对权限、安全和依赖行为的影响。",
      "inspiration": "论文直接结论：Repository SKILL 优化需要困难、真实且有无 Skill 对照的任务。研究启发：Skill Promotion 不应只看训练 Benchmark，应加入 paired no-skill baseline、跨 commit holdout、安全回归与维护者审查，并把 SKILL.md 视为代码仓库中的正式版本化依赖。",
      "valueJudgment": "值得精读，尤其适合做 Repository Skill 质量评测与 Skill-BOM。",
      "priority": "A"
    },
    {
      "id": "pararecover",
      "title": "ParaRecover: A Process-Level Benchmark for Error Localization and Recovery in Parallel Tool-Use Agents",
      "url": "https://arxiv.org/abs/2609.12345",
      "authorsAndInstitutions": "Bowen Guan、Zhentao Yin、Yanming Shen；机构本轮未可靠查到。",
      "qualitySignals": {
        "authorInstitution": "未可靠查到；论文已被 EMNLP 2026 Main 接收。",
        "version": "v1 新公开；2026-09-11 02:09 UTC 提交。",
        "openSource": "官方代码与 benchmark 数据已开放。"
      },
      "openSourceAndData": "https://github.com/gbw206/ParaRecover",
      "tags": ["Tool Use", "Agent Evaluation", "Error Recovery", "Parallel Agent", "Software Engineering"],
      "summary": "专门评测并行 Tool Agent 在中间执行失败后能否定位根因、理解依赖传播并做最小化重规划，而不是只看最终任务是否成功。",
      "importance": "并行工具调用中，一个参数、依赖或 Tool 选择错误会跨分支传播；传统 final-success 与单次 tool-call accuracy 无法区分‘偶然成功’和真正具备恢复能力的 Agent。",
      "methodHighlights": "建立覆盖规划依赖、Tool 选择与参数匹配的 14 类错误 taxonomy，共 10,626 个实例，并提出 SDE rubric，从结构完整性、诊断推理和演化策略三个层面评价 replanning。",
      "keyFindings": "超过 10 个主流 LLM 的实验显示，即使前沿模型仍明显受困于多轮错误传播、隐式 Tool failure 和精确重规划；SDE rubric 还能作为监督信号提升 reflective recovery。论文已开放数据和评测脚本。",
      "limitations": "Benchmark 是预定义错误注入与工具依赖图，不能完整覆盖真实 MCP/SaaS 中的权限、并发、外部状态变化与不可逆副作用。",
      "inspiration": "论文直接结论：Tool Agent 恢复能力需要过程级评价。研究启发：Tool/MCP Regression 可记录 error origin→dependency propagation→diagnosis→repair diff→replay evidence，并在 Tool Schema、Model 或 Harness 更新后专门重测恢复链。",
      "valueJudgment": "值得系统阅读和直接使用官方 benchmark。",
      "priority": "B"
    },
    {
      "id": "reality-final-verifier",
      "title": "Reality Is the Final Verifier: On Two Key Gaps in Agentic Software Engineering",
      "url": "https://arxiv.org/abs/2609.12039",
      "authorsAndInstitutions": "Alexander Krentsel、Shubham Agarwal、Mert Cemri、Shu Liu、Sidharth Sankhe、Ziming Mao、Matei Zaharia、Ion Stoica；UC Berkeley。",
      "qualitySignals": {
        "authorInstitution": "强：UC Berkeley，作者团队包含 Matei Zaharia、Ion Stoica；机构由 PDF 首页可靠确认。",
        "version": "v1 新公开；2026-09-10 17:58 UTC 提交。",
        "openSource": "本文为方法论/框架论文，未可靠查到独立官方代码或数据。"
      },
      "openSourceAndData": "未可靠查到",
      "tags": ["Coding Agent", "Evaluation", "Reward Hacking", "Runtime Monitoring", "Software Engineering"],
      "summary": "提出 requirement gap 与 model gap 两类不可彻底闭合的部署差距，并主张 Agentic Software Engineering 从一次性验证转向持续 assurance-revision loop。",
      "importance": "测试、形式验证和 Benchmark 都只验证‘需求 R 在环境模型 M 下是否满足’，但真实利益相关者意图与真实部署世界始终可能偏离 R/M；Agent reward hacking 和 hallucination 都可以由这两个缺口统一解释。",
      "methodHighlights": "提出 two-gap framework：requirement gap 描述需求与真实意图的差异，model gap 描述评测环境与真实世界的差异；随后将部署拒绝、现场证据与人类判断反馈到需求、环境模型和 evaluator 的持续修订。",
      "keyFindings": "本文主要是系统化框架而非新 benchmark，没有统一实验提升数字。关键结论是：开放变化环境中无法一般性证明两个 gap 永久闭合，因此部署证据必须成为持续验证的一部分，现实环境才是最终 verifier。",
      "limitations": "缺少新的大规模实证；如何量化两个 gap、如何选择部署监控信号以及怎样控制 assurance 成本仍需具体系统实现。",
      "inspiration": "论文直接结论：预部署验证始终是现实部署的代理。研究启发：AI 软件供应链的 Promotion Evidence 应有有效期，Model/Harness/Skill 更新或环境漂移后自动失效，并把 deployment incident、human rejection 与 rollback 反馈进下一版验证集。",
      "valueJudgment": "值得作为 Agentic SE 安全与评测方法论阅读，实证复现价值低于 benchmark 类论文。",
      "priority": "B"
    },
    {
      "id": "lifefuse-mem",
      "title": "LifeFuse-Mem: Lifecycle-Aware State Fusion Against Temporary Overwriting for Long-Term Memory",
      "url": "https://arxiv.org/abs/2609.12436",
      "authorsAndInstitutions": "Hanyu Zhao、Yuqian Feng、Zhenyu Song、Yuanchao Cheng、Yance Jiao、Tengfei Pan、Li Du；Beijing Academy of Artificial Intelligence、University of Chinese Academy of Sciences、Institute of Software CAS、National University of Defense Technology。",
      "qualitySignals": {
        "authorInstitution": "强：BAAI + UCAS + Institute of Software CAS + NUDT，机构由 PDF 首页可靠确认。",
        "version": "v1 新公开；2026-09-11 04:56 UTC 提交。",
        "openSource": "未可靠查到官方代码或数据入口。"
      },
      "openSourceAndData": "未可靠查到",
      "tags": ["Agent Memory", "Long-term Memory", "Behavioral Drift", "Runtime Policy"],
      "summary": "显式区分长期有效知识和仅当前阶段有效的信息，避免临时上下文被错误写成永久 Memory 并覆盖稳定状态。",
      "importance": "长期 Agent 的 Memory 不只有内容正确性，还存在生命周期语义：沙箱会话中的临时例外、临时用户状态或短期环境信息如果被持久化，会造成后续行为漂移。",
      "methodHighlights": "训练写入阶段加入 lifecycle label，并使用独立 Memory component 与生命周期感知更新，让 durable 与 transient 信息局部演化；读取阶段使用 phase-aware readout，针对 temporary-overwrite 建立受控评测。",
      "keyFindings": "在受控 anti-overwrite benchmark 上，LifeFuse-Mem 提高 acquisition-controlled retention 并减少临时信息覆盖；在两个公开 long-memory benchmark 上保持总体竞争力。论文摘要未给出适合统一引用的单一提升数字，因此不人为补写。",
      "limitations": "生命周期标签在训练时可得是较强假设；现实 Agent 的 policy、用户偏好与环境状态可能生命周期模糊，也未覆盖恶意 Memory poisoning 与显式撤销。",
      "inspiration": "论文直接结论：显式生命周期信号可降低临时信息覆盖长期状态。研究启发：Memory-SBOM 应增加 lifecycle、validFrom/validUntil、scope、supersedes/revocation 与 writer provenance，并将临时安全例外默认设为不可持久化。",
      "valueJudgment": "值得阅读，对长期 Agent Memory 治理和行为依赖生命周期有直接启发。",
      "priority": "B"
    }
  ]
});
