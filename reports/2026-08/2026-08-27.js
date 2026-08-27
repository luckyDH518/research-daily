// 2026-08-27 LLM / Agent 科研日报
window.RESEARCH_REPORTS.push({
  "date": "2026-08-27",
  "title": "LLM / Agent 科研日报",
  "generatedAt": "2026-08-27 10:01（北京时间）",
  "brief": {
    "summary": "今日严格筛选 5 篇，A/B/C 为 3/2/0。当前 24–36 小时窗口内最值得关注的工作集中在 Agent Harness 即时生成、长期 Memory 的失效约束验证、可审计 Verifier 演化、多 Agent 通信协议，以及长对话中的 episode reconstruction。共同趋势是：模型之外的 Harness、Memory、Verifier 与通信格式已经成为需要独立版本化和回归测试的行为依赖。",
    "trendAssessment": "本期入选均为 2026-08-26 提交的 v1 新发论文，未发现更值得纳入的 v2/v3 重要更新。与 LLM/Agent 供应链安全最直接的启发是：Harness 不应只作为运行脚本，而应记录 memory/planning/action/capability 模块及生成器版本；Memory 不应只按相关性检索，还需显式保存 freshness、supersession 和 provenance；Evaluator/Verifier 的规则更新也应经过 replay validation 后才能进入正式评测链路。"
  },
  "topPicks": ["jit-agent", "stale-constraints-memory"],
  "topPickRationales": {
    "jit-agent": "JIT-Agent 是本期最值得优先阅读的系统工作。它把 Harness 分解为 Memory、Planning、Action 和 Capability Orchestration 四个可执行模块，并训练专门模型按任务即时生成、修复和演化 Harness。固定 backbone 的控制实验中，JIT Harness 在 6 个设置中有 4 个取得最高性能，并在全部 6 个设置中取得最低 token 与 API 成本；官方项目页、GitHub 和 Hugging Face 均已开放。它适合直接扩展为 Harness-SBOM、模型—Harness 兼容矩阵和 Harness 自动更新安全回归。",
    "stale-constraints-memory": "这篇论文与长期 Agent Memory 的 provenance 和 supersession 风险最直接。在固定两条记录的验证预算下，Agent 面对已经被新权威记录撤销的旧约束时，原生分配仍有约 75%–77% 的决策与过期约束一致；只把同一预算中的一个槽位强制给关键 provenance path，就能提升 61–74 个百分点。全部 5,400 个 episode、冻结规格、时间戳证明与分析脚本均已发布，实物信号很强。"
  },
  "papers": [
    {
      "id": "jit-agent",
      "title": "JIT-Agent: Scaling Harness Intelligence via Just-in-Time Harness Evolution",
      "url": "https://arxiv.org/abs/2608.25593",
      "authorsAndInstitutions": "Guibin Zhang、Leo Lu、Fangzhou Xie、Kang Zhu、Junhao Wang、Zhifei Xie、Zhaochen Yu、Zihang Liu、Zhongxiang Sun、Qiankun Li、Yue Liao、Heng Chang、Xiaobin Hu、Qibing Ren、Wangchunshu Zhou、Shuicheng Yan；论文首页显示 LV-NUS Lab 标识，但完整作者—机构映射未可靠查到。",
      "qualitySignals": "作者与机构信号：中，论文首页有 LV-NUS Lab 标识，但完整机构映射未可靠确认；版本动态：v1 新发，2026-08-26 10:05:33 UTC；开源与数据：官方项目页 https://bingreeky.github.io/JIT-site，官方 GitHub https://github.com/bingreeky/JIT，官方 Hugging Face https://huggingface.co/JIT-Agent。",
      "openSourceAndData": [
        {"label":"官方项目页","url":"https://bingreeky.github.io/JIT-site","note":"JIT-Agent 项目页。"},
        {"label":"官方代码","url":"https://github.com/bingreeky/JIT","note":"论文正文直接提供。"},
        {"label":"官方模型","url":"https://huggingface.co/JIT-Agent","note":"JIT-Agent 模型与资源入口。"}
      ],
      "tags": ["Agent Harness","Self-evolution","Memory","Tool","Skill","Runtime Policy","Supply-chain Security"],
      "summary": "训练一个专门的 Harness Intelligence 模型，根据具体任务即时合成、修复并持续演化 Agent Harness，而不是为所有任务预先固定同一运行时。",
      "importance": "Agent 的历史压缩、局部规划、工具与 Skill 暴露、动作循环和恢复策略都会显著改变最终能力。现有 AOT Harness 需要在任务到来前预先优化，面对异构任务和模型版本时容易失配。JIT-Agent 将 Harness 视为可生成、可修复、可持续演化的独立程序制品。",
      "methodHighlights": "统一把 Harness 表示为 Memory、Planning、Action、Capability Orchestration 四模块协议，并用 HarnessFactory 重实现 13 类代表性 Harness。训练分三阶段：任务条件定制、从编译/接口/运行失败中学习修复、使用 Evo-GDPO 从 reward/latency/cost 信号推动 Harness archive 的在线演化。推理时接收任务、协议、Tool/Skill registry 与少量历史 Harness，输出可执行 Harness。",
      "keyFindings": "固定 backbone 的控制实验中，JIT-Agent 在 6 个 backbone×benchmark 设置中有 4 个取得最高性能，并在全部 6 个设置中取得最低 token 和 API 成本；相对每个设置中最便宜的固定 Harness，单例成本降低 14.9%–54.1%，平均 36.0%。24 个 matched backbone×benchmark 比较中，JIT Harness 全部优于 ReAct，平均 +7.6 分。DeepSeek-V4-Flash + JIT 在 DeepSearchQA 达 85.1，较最强固定 Harness +4.7 分且成本下降 49.6%。",
      "limitations": "自动生成 Harness 本身扩大了可执行代码、Tool/Skill 暴露和 Runtime Policy 被错误修改的攻击面。论文重点优化任务表现、延迟和成本，尚未系统加入权限、恶意工具、供应链签名或安全回归作为不可绕过的 Gate；部分结果基于子集 benchmark。",
      "inspiration": "论文直接结论：Harness Intelligence 可以被单独训练，并跨模型家族提升同一 backbone 的能力与效率。研究启发：建立 Harness-SBOM，记录 generator checkpoint、四模块实现、Tool/Skill registry、协议版本、模型版本、验证轨迹和 acceptance evidence；任何自动生成或演化的 Harness 必须先进入 sandbox，并通过安全回归后才能部署。",
      "valueJudgment": "非常值得精读并运行官方代码。它为 Harness 作为独立行为供应链制品提供了完整的生成、修复和演化框架。",
      "priority": "A"
    },
    {
      "id": "stale-constraints-memory",
      "title": "When Stale Constraints Go Unchecked: Budgeted Verification Failures in Inherited Agent Memory",
      "url": "https://arxiv.org/abs/2608.25553",
      "authorsAndInstitutions": "Kazuki Nakayashiki；Glasp。机构来自论文 HTML 首页。",
      "qualitySignals": "作者与机构信号：中，机构信息可靠但单作者且团队学术积累信号有限；版本动态：v1 新发，2026-08-26 09:04:21 UTC；开源与数据：Zenodo DOI https://doi.org/10.5281/zenodo.22108558，包含 5,400 个 episode、冻结规格、SHA256 manifest、OpenTimestamps 证明、分析/重算/生成脚本。",
      "openSourceAndData": [{"label":"官方 Zenodo Artifact","url":"https://doi.org/10.5281/zenodo.22108558","note":"论文直接提供，含全部 episode 与审计材料。"}],
      "tags": ["Agent Memory","Provenance","Supersession","Runtime Policy","Supply-chain Security","Evaluation"],
      "summary": "在固定验证预算下研究 Agent 是否会核验 Memory 中约束的来源和时效，证明旧约束即使已被新权威记录撤销，仍会因验证资源分配错误持续控制行为。",
      "importance": "长期 Agent 会继承经过压缩、整理或跨会话保存的 Memory。一个事实在写入时正确，不代表之后仍然有效；如果检索系统只按相关性分配验证预算，而不显式考虑 freshness 和 supersession，历史约束可能在来源已经失效后继续影响决策。",
      "methodHighlights": "显式建模 immutable historical provenance 与 mutable current/superseded 状态，并固定两条记录的验证预算。比较 Agent 原生分配、把一个槽位重分配到关键 provenance path，以及随机/非关键路径控制。主实验、fresh-wording replication、held-out domain 和修正后的 robustness replication 共发布 5,400 个 episode，并使用冻结规格和时间戳证明。",
      "keyFindings": "约束明确写入 Memory 时，Agent 原生只在约五分之一 episode 检查其 provenance。约束已 superseded 时，原生分配产生 stale-consistent 决策的比例为 77.3%、74.7%、74.7%；将同一预算中的一个槽位重分配给关键路径，current-record-consistent 决策分别提升 +74.0、+72.7、+61.3 个百分点，在每轮 6/6 模型上均为正。主实验 stated+superseded 条件从 22.7% 正确提升至 96.7%。",
      "limitations": "关键路径干预使用了先验知识，因此不是一个可直接部署的 scheduler；论文安装了 Memory 状态，而不是研究 stale memory 如何自然形成。held-out 场景曾发现时间文本不一致，作者进行了事先冻结的修正复现实验，但仍是同团队重复。",
      "inspiration": "论文直接结论：Memory 验证预算的分配，而非预算大小本身，可以解释大量 stale-memory 错误。研究启发：Memory-SBOM 应为每条约束记录 source、authority、valid-from/valid-to、supersedes、verification path 和最后核验时间；检索器要把 freshness/supersession 与 relevance 分离，并在高风险动作前优先验证关键 provenance path。",
      "valueJudgment": "非常值得精读和复现实验。与长期 Agent Memory、运行时授权和行为依赖时效性直接相关，且审计材料完整。",
      "priority": "A"
    },
    {
      "id": "autoverifier",
      "title": "AutoVerifier: Residual-Guided Non-Parametric Optimization for Reference-Based Answer Verification",
      "url": "https://arxiv.org/abs/2608.25637",
      "authorsAndInstitutions": "Zebei Zhao、Zhihao Shi：University of Science and Technology of China；Minqi Shi：Beihang University。机构来自论文 HTML 首页。",
      "qualitySignals": "作者与机构信号：强，USTC + Beihang；版本动态：v1 新发，2026-08-26 11:06:40 UTC；开源与数据：论文说明 supplementary package 包含 artifact README、requirements、prompt templates、派生 schema/hash、code modules、routing ledger 和 aggregate audit records，但本轮未可靠查到独立公开仓库 URL。",
      "openSourceAndData": "论文声明提供补充 Artifact 与审计记录；独立官方仓库 URL 未可靠查到",
      "tags": ["Evaluation","Verifier","LLM Judge","Self-improvement","Evaluation Supply-chain","RLVR"],
      "summary": "让 Verifier 从反复出现的残差错误中生成 rule card，并只有在 replay validation 未发现直接回归时，才把规则提升为确定性代码模块或 Prompt guidance。",
      "importance": "Verifier 决定 RLVR 奖励、模型排名以及自演化 Agent/Skill 是否被接受。如果 Verifier 的隐含等价假设错误，错误会被系统性写入训练和准入链。与重新训练 Judge 相比，AutoVerifier 让规则更新保持可编辑、可审计和可回放。",
      "methodHighlights": "持续收集 verifier residual，抽象成 rule cards；可安全程序化的规则转成 code module，其余保留为 Prompt guidance。每项候选更新必须通过 replay validation 检查旧样本是否发生直接回归；正式 benchmark 前冻结 code modules、Prompt、parser 和 routing order。",
      "keyFindings": "在四个 reference-based verification benchmark 上，官方 GPT-5.4-Mini Prompt 平均准确率 91.03%，AutoVerifier Prompt Only 为 91.29%，Prompt + Code 达 93.05%。代码模块直接处理 2,665 个样本，使 fallback 模型调用从 8,295 降至 5,630，减少 32.13%；所有直接决策保留 route、rule id、Prompt verdict 与 final verdict 用于审计。",
      "limitations": "Verifier 更新基于特定构造源和 reference-based 任务，不能直接外推到开放式 Agent 评测。代码规则虽然可审计，但错误的 rule promotion 仍可能形成新的系统偏差；完整独立公开仓库本轮未可靠确认。",
      "inspiration": "论文直接结论：Verifier 的重复错误可以通过非参数规则记忆和 replay validation 转成稳定改进。研究启发：Evaluation-SBOM 应版本化 verifier code module、Prompt、parser、routing order、支持/反例、promotion evidence 和 benchmark version；Judge/Verifier 更新不能直接覆盖线上版本，而应像软件补丁一样经过 replay regression。",
      "valueJudgment": "值得精读，尤其适合自演化 Agent、Skill Gate 和 RLVR 的评测供应链治理。",
      "priority": "A"
    },
    {
      "id": "routed-graph-handoff",
      "title": "Routed Graph Handoff: Adaptive Format Selection for Multi-Agent LLM Delegation",
      "url": "https://arxiv.org/abs/2608.25277",
      "authorsAndInstitutions": "Pratyay Banerjee、Ankit Chadha；Amazon AGI / Sunnyvale, USA。机构来自论文 HTML 首页。",
      "qualitySignals": "作者与机构信号：强/中，Amazon AGI；版本动态：v1 新发，2026-08-26 01:24:34 UTC；开源与数据：论文 Appendix J 说明将发布 typed-graph schema、全部 Prompt、模型/版本配置、固定 splits 与 evaluation code，但代码和配置为 upon publication，当前未可靠查到已开放仓库。",
      "openSourceAndData": "论文承诺公开 schema、Prompt、配置和评测代码；当前尚未可靠确认已开放官方仓库",
      "tags": ["Multi-agent","Agent Communication","Protocol","Harness","Evaluation","Runtime"],
      "summary": "让轻量 Router 针对每次 Agent 委派，在自然语言和 typed dependency graph 之间选择通信格式，以降低通信成本同时避免结构化协议在需要自适应推理的任务上产生回归。",
      "importance": "多 Agent 系统中，通信格式通常被当成实现细节，但它会改变上下文长度、依赖表达和下游执行方式。对 Agent 供应链而言，message schema、router 和 executor Prompt 都是会改变行为的协议依赖。",
      "methodHighlights": "定义 8 类节点、7 类边关系的 Native Graph Handoff schema，并训练/使用极轻量 Router；Router 每次只花约 155 tokens，在 graph 和 NL 之间选择。实验覆盖 BrowseComp、τ-retail、BFCL、AppWorld，共 1,052+ trajectories，并在 Claude Sonnet 4.5 和 GPT-5 mini orchestrator 上验证。",
      "keyFindings": "Routed 相对 NL-only 在 τ-retail 提升 +12.7pp，并达到 3.2× 压缩；BrowseComp 提升 +8.7pp、2.2× 压缩；BFCL 和 AppWorld 保持不退化。Graph-only 在 AppWorld 会下降 14.6pp，而 Router 通过 89% 情况回退 NL 恢复到 51.7% 对 51.7% 的持平。Router 额外开销约 0.15%。",
      "limitations": "通信格式只覆盖 graph/NL 二选一，真实系统还存在 Tool Call、Binary/JSON、共享 Memory 和隐式状态。Router 本身成为新的决策依赖，且论文代码当前尚未正式开放。性能提升主要是功能与成本指标，并非安全保证。",
      "inspiration": "论文直接结论：Multi-Agent Handoff format 是一等系统设计变量，统一结构化并不总是更好。研究启发：Multi-Agent SBOM 应记录 router version、message schema、executor Prompt、orchestrator model 和 fallback policy；模型或通信协议升级后应重跑 delegation compatibility 和信息损失回归。",
      "valueJudgment": "值得阅读，适合研究 Multi-Agent 通信协议、上下文成本和协议兼容性。",
      "priority": "B"
    },
    {
      "id": "scale-qa-tsim",
      "title": "Reconstructing the Right Episode: Evaluating Interleaved Conversational Memory Beyond Long Context",
      "url": "https://arxiv.org/abs/2608.25655",
      "authorsAndInstitutions": "Zhexi Feng、Ruiyi Zhang、Yongbo Yang、Pengtao Xie；Department of Electrical and Computer Engineering, University of California San Diego。机构来自论文 HTML 首页。",
      "qualitySignals": "作者与机构信号：强，UC San Diego；版本动态：v1 新发，2026-08-26 11:37:03 UTC；开源与数据：官方 GitHub https://github.com/LordTARN1SHED/SCALE-QA，包含 SCALE-QA 数据集、protocol、validation report、exact-evidence audit、deterministic runtime builder 和 TSIM reference implementation。论文已被 EMNLP 2026 Main Conference 接收。",
      "openSourceAndData": [{"label":"官方代码与数据","url":"https://github.com/LordTARN1SHED/SCALE-QA","note":"SCALE-QA 与 TSIM reference implementation。"}],
      "tags": ["Agent Memory","Long Context","RAG","Evaluation","Provenance","Assistant Workflow"],
      "summary": "提出 SCALE-QA 和 TSIM，专门评测长对话中主题交错、没有显式 session 边界时，Memory 能否重建真正决定当前任务的历史 episode。",
      "importance": "长上下文能够容纳证据，不等于 Agent 能找到真正具约束力的那段历史。真实助手线程中多个任务和局部例外会交错，简单 chunk RAG 或完整上下文可能同时包含旧规则和新例外，造成 episode integrity failure。",
      "methodHighlights": "SCALE-QA 包含 3,000 个审计问题、10 个领域，使用扁平无分段 thread 和确定性四选一评分；TSIM 根据语义漂移分割 episode，再用多层次 memory view 和 cluster routing 检索。实验覆盖 128k 全量设置和 1M token 的 400 题诊断。",
      "keyFindings": "TSIM 在三类 backend 下均超过对应最强 baseline，提升 5.6–17.6 个百分点。GPT-4o-mini 128k 下 Full Context 从 16k 的 62.5% 降至 29.8%，TSIM 保持 73.8%。Gemini 2.5 Flash 1M 诊断中，Full Context 用 1.05M tokens、23.87s 得到 87.2%，TSIM 只检索约 1.3k tokens、2.16s 达 96.5%。在 LongMemEval-S 500 题迁移诊断中 TSIM 达 71.0%，高于 context-matched fixed chunks 的 61.2%。",
      "limitations": "数据由反事实构造而非真实助手日志，不能完整覆盖真实隐私与分布；四选一评分便于审计但不能衡量开放式回答、工具后续动作和长文本解释。方法的 ingestion/retrieval 成本高于简单 RAG。",
      "inspiration": "论文直接结论：长 Context 的关键瓶颈不是证据是否可见，而是能否重建使证据具有约束力的正确 episode。研究启发：Memory-SBOM 应保存 episode identity、局部规则、override 关系、evidence span、embedding/index version 和 retrieval path；Compaction、模型或 Memory backend 更新后重跑 episode-integrity regression。",
      "valueJudgment": "值得系统阅读和运行官方 Artifact。直接安全贡献有限，但对长期 Agent Memory 的 provenance、规则覆盖和上下文压缩非常有价值。",
      "priority": "B"
    }
  ]
});
