// 2026-08-25 LLM / Agent 科研日报
window.RESEARCH_REPORTS.push({
  "date": "2026-08-25",
  "title": "LLM / Agent 科研日报",
  "generatedAt": "2026-08-25 10:05（北京时间）",
  "brief": {
    "summary": "今日严格筛选仅 1 篇达到精读门槛：A 级 1 篇、B 级 0 篇、C 级 0 篇。北京时间 2026-08-25 上午检查时，arXiv 的 cs.CL、cs.AI、cs.LG、cs.SE 等重点分类仍停留在 2026-08-24 周一公开批次，昨日已收录该批次中 6 篇高价值 v1 论文，因此本期不重复扫描和收录。过去约 24 小时内最值得关注的变化是旧论文 Prompt-Induced Waste in Coding Agents 于 2026-08-24 02:50:34 UTC 更新至 v5：新增/强化了 DeepSeek Harness 扩展和 Harness×effort control 的实证结果，进一步说明 Prompt、推理努力、Harness、工具循环与 Provider 缓存/计费共同决定 Coding Agent 的实际成本和行为。",
    "trendAssessment": "今天没有新的 arXiv 公开批次，因此不形成基于新论文集合的泛化趋势判断。本期唯一 A 级更新继续强化一个重要方向：Coding Agent 的效率和行为不能归因于模型单体；Harness 固定前缀、Tool Schema、Turn Loop、验证策略、Context Compaction、Sub-agent/Workflow 拓扑和 Provider Cache 都是独立行为依赖。对 LLM / Agent 供应链安全与工程治理而言，应把 Prompt、Model、Harness、Tool Surface、Provider/Cache Regime 与隐藏评测器共同纳入 Harness/Runtime-SBOM，并在模型或 Harness 更新后重新执行 cost-per-success、工具调用、验证覆盖和行为兼容回归。"
  },
  "topPicks": ["prompt-induced-waste-v5"],
  "topPickRationales": {
    "prompt-induced-waste-v5": "本期只有这一篇达到精读门槛，因此 Top 2 仅占 1 席。v5 在原有预注册 Prompt/Harness 基准上加入 DeepSeek Harness 0.1.0rc7 扩展：固定 Sonnet 5、任务、Prompt、隐藏评测器和控制器逻辑，仅改变 Harness 后，同一 effort-control 逻辑的成本收益从 Claude Code 下约 19% 放大到 DeepSeek Harness 下约 75%，完整控制栈从约 27% 放大到约 82%。核心价值在于把 Prompt、Harness、Provider Cache 与推理努力明确拆成不同系统变量，适合用于 Harness-SBOM、模型/Harness 升级成本回归和 Agent 行为依赖研究。作者机构 PointFive 可靠确认，官方公开仓库提供 fixtures、hidden evaluators、prompts、runners、telemetry 和 analysis code，质量信号完整。"
  },
  "papers": [
    {
      "id": "prompt-induced-waste-v5",
      "title": "Prompt-Induced Waste in Coding Agents: Reasoning, Effort, Harness Design, and End-to-End Cost",
      "url": "https://arxiv.org/abs/2608.01347",
      "authorsAndInstitutions": "Sarel Weinberger、Amir Hozez；论文 HTML 首页标注机构为 PointFive。",
      "qualitySignals": "作者与机构信号：中，PointFive 机构由论文首页可靠确认，但本轮未进一步核验团队在该研究方向的长期学术积累；版本动态：arXiv:2608.01347 v1 于 2026-08-02 16:10:02 UTC 提交，v5 于 2026-08-24 02:50:34 UTC 更新，本期按旧论文当日 v5 更新纳入；开源与数据：论文直接提供官方公开仓库 https://github.com/PointFiveLabs/prompt-efficiency-benchmark ，包含 benchmark code、task fixtures、prompt variants、raw ledgers、hidden evaluators、runners、telemetry 与 analysis code。",
      "openSourceAndData": [
        {
          "label": "官方代码与实验数据",
          "url": "https://github.com/PointFiveLabs/prompt-efficiency-benchmark",
          "note": "论文参考文献直接链接；包含 benchmark code、fixtures、prompt variants、raw ledgers、hidden evaluators、runners、telemetry 与 analysis code。"
        }
      ],
      "tags": ["Coding Agent", "Agent Harness", "Prompt", "Runtime Policy", "Evaluation", "Cost", "Behavioral Dependency"],
      "summary": "通过预注册、控制变量实验量化 Prompt、显式推理努力、Harness 设计、工具循环和 Provider 缓存/计费如何共同改变 Coding Agent 的实际推理量、成本和成功率，并在 v5 中加入 DeepSeek Harness 扩展验证 Harness×effort control 交互。",
      "importance": "Coding Agent 的成本经常被简化为模型价格、输出 Token 或 Prompt 长度，但实际端到端成本还取决于 Harness 的固定前缀、工具暴露、Turn Loop、验证策略、Context 管理、模型推理努力和 Provider Cache。若不控制这些变量，同一模型的成本差异很容易被错误归因给模型能力或 Prompt 本身。论文因此把 Coding Agent 效率视为系统级变量，而不是单一模型指标。",
      "methodHighlights": "核心基准固定 24 个确定性 Coding Task、可见测试与隐藏确定性测试，覆盖 6 个 500B 级开放推理模型和 Claude Sonnet 5；比较 PI.DEV 与 Claude Code（后者通过固定协议转换网关），使用 18 个冻结 Prompt 变体。核心实验包含 4,644 次有效运行和 2,801 条盲态 Trace 标注，另有 150 个 SWE-bench model-task-effort 配对单元。v5 新增/强化的 DeepSeek Harness 0.1.0rc7 扩展固定 Sonnet 5、5 个任务、Prompt、隐藏评测器、控制器与统计流程，只改变 Harness，并执行 75 次有效比较运行，以隔离 Harness 默认策略对 effort-control 价值的影响。",
      "keyFindings": "多方案比较型 Prompt 在 6 个开放模型上将推理 Token 提高 2.4–7.4 倍但成功率相近；“深入思考”类指令提高 1.6–2.2 倍推理，“确定性”措辞提高 1.3–1.9 倍。匹配的 model-task-prompt 单元中，Claude Code 的固定前缀约为 PI.DEV 的 12–15 倍、Turn 数量约 2–7 倍，在相近成功率下 cost-per-success 高 5–30 倍。v5 DeepSeek Harness 扩展中，Baseline 成本 $0.2753/run，effort-only 降至 $0.0696（-74.7%），full stack 降至 $0.0490（-82.2%），且各 15/15 任务成功；而同一控制逻辑在原 Claude Code 激活基准中 effort-only 约降 19%、full stack 约降 27%，直接显示 Harness 与 effort-control 存在强交互。Provider Prefix Cache 可明显降低账单但不改变行为，因此不能把缓存节省误解释为模型/Agent 行为效率提升。",
      "limitations": "实验任务虽然使用隐藏确定性测试并加入 SWE-bench hard-task effort campaign，但核心 Prompt/Harness 基准仍是受控的 24 个任务；5–30 倍 Harness 成本差异和 2.4–7.4 倍 Prompt 效应不能直接外推到所有生产工作负载。DeepSeek Harness 扩展仅固定 Sonnet 5 和 5 个激活任务，且论文没有把 Harness 内部的 compaction、subagent、workflow topology 等组件逐项做因果拆分。成本还依赖特定 Provider 价格与缓存机制。",
      "inspiration": "论文直接结论：Coding Agent 的成本和行为是 Prompt、模型、显式推理努力、Harness、执行环境/Tool Surface 与 Provider/Cache Regime 的联合函数；Prompt 效应并不跨 Harness 保持不变，同一 effort-control 逻辑的收益也会随 Harness 默认策略显著改变。研究启发：建立 Harness/Runtime-SBOM，固定记录 model version、prompt hash、harness version、system prefix、tool schema、turn/retry/verification policy、context compaction、provider/cache regime、hidden evaluator 与 cost-per-success；任何模型、Harness 或 Tool 更新后都重新执行效率与行为兼容回归，并把“账单优化”和“行为优化”分开报告。",
      "valueJudgment": "非常值得精读和直接复现。它不是安全攻击论文，但对 Agent Harness 作为独立行为依赖、模型/Prompt 版本比较、成本回归和 AI 软件供应链实验设计非常重要，且官方复现材料完整。",
      "priority": "A"
    }
  ]
});
