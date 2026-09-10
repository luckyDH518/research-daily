// 2026-09-10 LLM / Agent 科研日报
window.RESEARCH_REPORTS.push({
  "date": "2026-09-10",
  "title": "LLM / Agent 科研日报",
  "generatedAt": "2026-09-10 10:00（北京时间）",
  "brief": {
    "summary": "今日严格筛选 5 篇，A/B/C=3/2/0。主线集中在 Harness 权限、Agent Memory 撤销、状态—策略联合自演化，以及跨主体授权与 Tool 数据生成。对 LLM / Agent 供应链安全而言，今天最直接的对象是 capability、memory validity、state-policy lineage 与 tool-use training data。",
    "trendAssessment": "研究正在从‘模型是否识别恶意文本’转向‘宿主是否以结构化权限、撤销状态和执行证据约束真实副作用’。同时，Skill/Harness/Memory 的更新逐渐需要跨版本效用验证，Tool 数据合成也从静态过滤走向闭环反馈。"
  },
  "topPicks": ["capscope-authority", "revoked-memory-authority"],
  "topPickRationales": {
    "capscope-authority": "最直接对应 Harness/Tool/MCP 安全：把权限存放在模型上下文之外，并按主体、效果类型和资源范围做最小授权。北京大学团队，LMPL 2026，提供完整 artifact，质量信号强。",
    "revoked-memory-authority": "直接揭示 Memory 生命周期安全缺口：被系统标记为 revoked 的旧政策仍可能被默认检索并驱动危险动作。覆盖 5 个主流 Memory 系统、9 个模型，并开源代码，适合扩展 Memory-SBOM 与撤销回归。"
  },
  "papers": [
    {
      "id": "capscope-authority",
      "title": "Authority Is Not a String: A Capability-Scoped Harness for Prompt-Injection-Resistant Coding Agents",
      "url": "https://arxiv.org/abs/2609.08371",
      "authorsAndInstitutions": "Dimitrios Stamatios Bouras、Yihan Dai、Sergey Mechtaev；北京大学计算机学院 / HCST Key Lab。",
      "qualitySignals": {
        "authorInstitution": "强：北京大学团队，且论文进入 LMPL 2026。",
        "version": "v1 新发；2026-09-08 07:37 UTC 提交，进入 2026-09-09 公开批次。",
        "openSource": "官方 Figshare artifact，包含代码、任务、变异器、Harness 与决策日志。"
      },
      "openSourceAndData": "https://figshare.com/s/86184ed20f66d1f0cf91",
      "tags": ["Agent", "Agent Harness", "Prompt Injection", "Tool Use", "MCP", "Supply-chain Security"],
      "summary": "在 Harness 层把权限建模为按主体持有的类型化 capability，并在每次 Tool Call 前检查，阻止间接提示注入把文本影响转化为越权副作用。",
      "importance": "Coding Agent 读取 README、AGENTS.md、Skill、源码与 Tool Output 时，低可信文本可能诱导高权限操作；全局 allowlist 无法表达不同 Sub-agent 的权限差异。",
      "methodHighlights": "先仅基于可信用户请求与文件树生成任务权限上限，再由宿主校验并冻结；Read/Write/Exec 权限独立存于模型上下文外，Sub-agent 只能从父权限中收窄继承。",
      "keyFindings": "300 次运行中，ambient/global-policy 基线的恶意效果执行为 33–47/75，CapScope 为 3/75；正常修复成功 68/75，与基线 68–72/75 接近。",
      "limitations": "仍依赖宿主完整中介所有副作用，允许范围内的命令仍可能执行不可信代码；不解决机密性与所有传递副作用。",
      "inspiration": "论文直接结论：模型可被注入，但越权效果可由 Harness capability 阻断。研究启发：Capability-BOM 应记录 principal、effect、scope、mint、delegation 与每次 invoke 证据，并用于 MCP/Skill 最小权限回归。",
      "valueJudgment": "非常值得精读与复现，适合作为 Harness/Tool 供应链安全基础设计。",
      "priority": "A"
    },
    {
      "id": "revoked-memory-authority",
      "title": "Revoked but Still Authoritative: An Empirical Study of Revocation Enforcement in Agent-Memory Systems",
      "url": "https://arxiv.org/abs/2609.08258",
      "authorsAndInstitutions": "Yi Ting Shen、Kentaroh Toyoda、Alex Leung；Vulcan Research, AIFT，新加坡。",
      "qualitySignals": {
        "authorInstitution": "中：工业研究团队，机构可靠确认。",
        "version": "v1 新发；2026-09-08 05:03 UTC 提交。",
        "openSource": "官方 GitHub 已开放。"
      },
      "openSourceAndData": "https://github.com/VulcanLab/Memory-Rebirth-Attack",
      "tags": ["Agent Memory", "Revocation", "Runtime Policy", "Supply-chain Security", "Agent Safety"],
      "summary": "实测主流 Agent Memory 系统中，已被标记为失效的旧政策仍可能在默认检索中返回并压过新政策，继续驱动 Agent 做出危险动作。",
      "importance": "长期 Agent 需要保留历史，但‘保留记录’与‘继续赋予行为权威’不能混为一谈；仅有 provenance 不能解决合法旧政策被后续撤销的问题。",
      "methodHighlights": "覆盖 Graphiti/Zep、mem0、langmem、cognee，构造 revoked/current 冲突政策，跨 9 场景、9 模型、6 防御条件测量 retrieval exposure 与 unsafe-action rate，并实现 retrieval-time guard。",
      "keyFindings": "两个暴露 revoked 状态的系统中，旧记录均 81/81 被返回且排名高于新记录；Graphiti 和 mem0(exp.) 的 unsafe-action rate 分别 44.2% 与 42.1%，合计 43.1%；store-level filter 可降为 0。",
      "limitations": "各 Memory 系统的 revocation API 与默认行为差异较大；实验集中于单次读取决策，虽有附录扩展但仍不能覆盖所有真实多 Agent 写回模式。",
      "inspiration": "论文直接结论：软撤销必须在读取时强制执行。研究启发：Memory-SBOM 应保存 status、validity interval、supersedes、retrieval policy 与 last-verified，并在模型/后端升级后执行撤销回归。",
      "valueJudgment": "非常值得精读和直接跑官方代码。",
      "priority": "A"
    },
    {
      "id": "experience-funnel",
      "title": "Experience Funnel: A State-Policy Alternating Loop for Self-Evolving Agents",
      "url": "https://arxiv.org/abs/2609.08919",
      "authorsAndInstitutions": "Wenbo Gao 等；Huawei、香港理工大学、Renmin University of China。",
      "qualitySignals": {
        "authorInstitution": "强：Huawei + PolyU + RUC。",
        "version": "v1 新发；2026-09-08 15:48 UTC 提交。",
        "openSource": "未可靠查到官方代码或数据入口。"
      },
      "openSourceAndData": "未可靠查到",
      "tags": ["Self-evolving Agent", "Agent Skill", "Agent Harness", "Post-training", "Behavioral Dependency"],
      "summary": "把快速更新的文本状态（Skill/Harness）与慢速更新的参数策略交替演化，并只把跨版本仍有用的经验内化进模型。",
      "importance": "显式 Skill/Harness 更新快但依赖外部上下文，参数策略更稳定但更新慢；两者如果独立演化会产生版本错配。",
      "methodHighlights": "先将交互经验写入可编辑状态，再根据状态前后行为效用筛选可迁移轨迹，进行 transition-aware distillation，并让新策略反过来更新下一轮状态。",
      "keyFindings": "SearchQA 上 State-only 61.1%、Policy-only 62.8%、完整循环 63.6%；跨版本筛选 01+11 经验时 state-free policy 达 63.0%，比不筛选 58.9% 高 4.1pp。",
      "limitations": "实验预算跨环境不完全一致，开放代码未可靠确认；尚未系统研究恶意经验、Skill 污染或安全回归。",
      "inspiration": "论文直接结论：State 与 Policy 会逐渐形成版本耦合。研究启发：Evolution-SBOM 应记录 state version、policy checkpoint、source trajectory、selection rule 与 promotion evidence，防止旧 Skill 在新策略下静默失效。",
      "valueJudgment": "值得精读，尤其适合自演化 Agent 与 Skill/Harness 版本兼容研究。",
      "priority": "A"
    },
    {
      "id": "cross-substrate-authority",
      "title": "Beyond Agent Harnesses: Cross-Substrate Authority for Multi-Agent Systems",
      "url": "https://arxiv.org/abs/2609.08472",
      "authorsAndInstitutions": "Yang Li、Sergey Volkov、Hai Liu、Zongsi Xu、Xiyu Chen、Tuo Zhou、Dian Shao、Hao Sun、Ye Luo；HKU、HKUST、Shenzhen University、Jiangxi Science and Technology Normal University。",
      "qualitySignals": {
        "authorInstitution": "强 / 中：HKU、HKUST 等机构可靠确认。",
        "version": "v1 新发；进入 2026-09-09 公开批次。",
        "openSource": "未可靠查到官方代码仓库。"
      },
      "openSourceAndData": "未可靠查到",
      "tags": ["Multi-agent", "Authorization", "Runtime Policy", "Provenance", "Supply-chain Security"],
      "summary": "证明最终文件与可见 Memory 完全相同，也可能因为外部授权状态不同而要求相反的安全动作，因此规划可见状态不足以决定授权。",
      "importance": "Multi-Agent 系统的授权信息可能分散在 Git、运行记录、审批服务与外部注册表中；只看最终 Workspace 会产生 observation aliasing。",
      "methodHighlights": "构造 observation-equivalent paired worlds，分别测试 raw authority receipt、typed relation 和 execution-time validator，并用 matched-intent 设计隔离规划与执行 Gate 的贡献。",
      "keyFindings": "实验 1 中 authority-blind 证据 0/32 成功，raw receipt 与 typed relation 均 32/32；实验 3 将固定 unsafe intents 的实际危险效果从 6/16 降至 0/16。",
      "limitations": "使用受控 micro-benchmark，且没有公开代码；结论仍需在真实多 Agent 文件/审批系统中验证。",
      "inspiration": "论文直接结论：授权不能只绑定 artifact identity。研究启发：Runtime-SBOM 应额外记录 attempt、actor、artifact、approval 与 downstream-use authority，并在执行点重新验证。",
      "valueJudgment": "值得阅读，适合作为多 Agent 权限 provenance 的方法论参考。",
      "priority": "B"
    },
    {
      "id": "toolloop",
      "title": "ToolLoop: Closed-Loop Tool-Use Data Synthesis via Decomposed Generation and Dynamic Self-Feedback",
      "url": "https://arxiv.org/abs/2609.09072",
      "authorsAndInstitutions": "Min Zeng、Yuzhou Liu、Zhenyu Cao、Hanxiu Chen、Heng Li、Caiquan Liu、Yafei Wen、Xiaoxin Chen；vivo AI Lab。",
      "qualitySignals": {
        "authorInstitution": "强 / 中：vivo AI Lab，论文已被 EMNLP 2026 Main 接收。",
        "version": "v1 新发；进入 2026-09-09 公开批次。",
        "openSource": "未可靠查到官方代码仓库。"
      },
      "openSourceAndData": "未可靠查到",
      "tags": ["Tool Use", "LLM Training", "Agent", "Data Synthesis", "Evaluation"],
      "summary": "把 Tool-use 数据生成拆成函数构造、用户查询反推、Tool Call 前向生成和动态自反馈闭环，提高合成数据质量与效率。",
      "importance": "Tool Agent 后训练高度依赖合成轨迹；静态 generate-then-filter 容易产生类型分布失衡和大量低价值样本。",
      "methodHighlights": "先构造候选函数与 Ground Truth，再反推出自然用户请求，前向生成 Tool Call，并根据验证结果动态修正，而不是只做一次静态过滤。",
      "keyFindings": "ToolLoop-4B 仅用 11K 合成样本在 BFCL 获得 86.40%，高于 APIGen-4B 的 83.11%（60K）和 ToolMind-4B 的 83.53%（55K）。",
      "limitations": "重点是功能性 Tool Calling，不直接覆盖恶意 Tool、MCP 权限、副作用安全与训练数据投毒。",
      "inspiration": "论文直接结论：闭环自反馈能以更少样本提升 Tool-use 能力。研究启发：Tool-training SBOM 应记录函数 schema、生成器、验证器、反馈迭代和数据版本，防止合成偏差或恶意 schema 被规模化固化。",
      "valueJudgment": "值得阅读与轻量复现，安全关联主要来自训练数据供应链延展。",
      "priority": "B"
    }
  ]
});
