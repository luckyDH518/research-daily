// 2026-07-20 科研日报：按月目录拆分，便于网页发布和维护。
window.RESEARCH_REPORTS.push({
  "date": "2026-07-20",
  "title": "arXiv LLM / Agent 论文日报",
  "generatedAt": "2026-07-20 10:00（北京时间）",
  "brief": {
    "summary": "今日严格筛出 6 篇值得关注的论文。直接命中 LLM/Agent 供应链攻击、Coding Agent 依赖投毒、MCP/Skill 供应链安全的高质量新论文仍未出现；多 Agent 的相关错误、通信瓶颈和 Agent RL 训练稳定性则构成了重要信号。",
    "trendAssessment": "Agent 研究正从“堆叠更多 Agent”转向独立性、通信压缩和训练动力学。与供应链安全的交点在于：共享模型、提示、MCP、Skill、RAG 与服务商会形成相关故障域；应将它们建模为 Agent Dependency Graph 并评估其安全性。"
  },
  "topPicks": [
    "honest-quorum",
    "multi-agent-information-bottleneck"
  ],
  "papers": [
    {
      "id": "honest-quorum",
      "title": "The Honest Quorum Problem: Epistemic Byzantine Fault Tolerance for Agentic Infrastructure",
      "url": "https://arxiv.org/abs/2607.16109",
      "authorsAndInstitutions": "Jun He、Deying Yu；arXiv 摘要页未可靠列出机构。v1，提交于 2026-07-17 16:43 UTC，并进入 7 月 20 日公开批次。",
      "tags": [
        "Agent",
        "多 Agent",
        "Agent 安全",
        "Byzantine Fault Tolerance",
        "Agent Infrastructure",
        "信任"
      ],
      "summary": "论文指出传统 BFT 把“非故障节点”视为语义正确，但多个诚实 Agent 仍可能因共享模型、提示或工具链而共同犯错，并据此提出 Epistemic Byzantine Fault Tolerance。",
      "importance": "它把多 Agent 的安全假设从“节点是否恶意”推进到“错误是否相关”。对 Agent 供应链尤其关键：五个共享模型、数据、提示或工具来源的 Agent，并不等价于五个独立投票者。",
      "methodHighlights": "提出认识错误预算 e_delta 与不确定性预算 u_epsilon，推导同时满足语义有效性、共识与活性的 quorum 阈值；并用数值分析说明，只有真正降低尾部相关风险的多样性才有帮助。创新点是将语义错误和相关性显式写入 BFT 条件。",
      "limitations": "偏理论，尚未在大规模真实 Agent 基础设施中验证；错误与不确定性预算难以可靠估计，也未直接覆盖 prompt injection、Skill 投毒或 MCP 攻击。",
      "inspiration": "非常适合延伸为 Supply-Chain-Aware EBFT：构建 Agent Fault Domain Graph，把模型来源、训练数据、提示、MCP、Skill、记忆与 RAG 写入相关故障域，再设计真正独立的安全 quorum。",
      "valueJudgment": "非常值得精读，适合作为理论框架和论文选题基础；不以复现为重点，价值在于向供应链相关故障与实证验证扩展。",
      "priority": "A"
    },
    {
      "id": "multi-agent-information-bottleneck",
      "title": "When Do Multi-Agent Systems Help? An Information Bottleneck Perspective",
      "url": "https://arxiv.org/abs/2607.16133",
      "authorsAndInstitutions": "Wendi Yu、Lianhao Zhou、Xiangjue Dong、Sai Sudarshan Barath、Declan Staunton、Byung-Jun Yoon、Xiaoning Qian、James Caverlee、Shuiwang Ji；arXiv 摘要页未可靠列出完整机构。v1，提交于 2026-07-17 17:13 UTC，并进入 7 月 20 日公开批次。",
      "tags": [
        "多 Agent",
        "LLM Agent",
        "Information Bottleneck",
        "上下文",
        "Agent Communication"
      ],
      "summary": "论文认为多 Agent 的优势不一定来自更多、更强的 Agent，而可能来自受限消息传递迫使系统压缩上下文、过滤无关信息。",
      "importance": "它为“何时拆分 Agent 有益”给出更可检验的解释：弱 Agent 会受益于合适的信息瓶颈，强 Agent 的收益会收缩甚至反转。这也提示安全通信不能只追求更多上下文。",
      "methodHighlights": "以信息瓶颈中的 beta 权衡刻画 relay 的信息压缩，模拟无限 relay，并在 5 个 benchmark、3 个模型规模上做 18 组实验。创新点是把多 Agent 协作收益与通信压缩联系起来，而不是仅比较角色数量。",
      "limitations": "实验任务与开放式工作流仍有距离；压缩会带来语义遗漏，未研究恶意消息、prompt injection 或工具调用场景。",
      "inspiration": "可发展为 Security-Aware Information Bottleneck：在 Agent relay 中同时压缩上下文、保留任务必要信息与来源证据，减少注入指令和不可信内容在链路中的传播。",
      "valueJudgment": "值得系统学习、技术解读和理论扩展；特别适合与 Agent 安全通信、最小可信中继和上下文隔离结合。",
      "priority": "A"
    },
    {
      "id": "reasoning-pretraining-posttraining",
      "title": "Understanding Reasoning from Pretraining to Post-Training",
      "url": "https://arxiv.org/abs/2607.16097",
      "authorsAndInstitutions": "Jingyan Shen、Ang Li、Salman Rahman、Yifan Sun、Micah Goldblum、Matus Telgarsky、Pavel Izmailov；arXiv 摘要页未可靠列出完整机构。v1，提交于 2026-07-17 16:31 UTC，并进入 7 月 20 日公开批次。",
      "tags": [
        "LLM",
        "Reasoning",
        "Pretraining",
        "Post-training",
        "RL",
        "Scaling"
      ],
      "summary": "论文用国际象棋构建可控训练流水线，研究预训练如何影响后训练和强化学习阶段的推理表现。",
      "importance": "它提醒研究者：后训练中的推理与安全表现不能脱离预训练基础单独讨论。预训练损失可预测部分 post-RL 表现，这与当前 reasoning 和 RL 训练的趋势直接相关。",
      "methodHighlights": "从人类棋局预训练、合成轨迹 SFT 到棋题 RL，覆盖 5M 至 1B 参数规模，并以数学领域进行部分迁移检查。创新点是用结构化、可验证环境分解预训练与后训练的作用。",
      "limitations": "国际象棋并不等价于通用推理；其状态结构清晰、奖励可验证，未覆盖工具使用、幻觉和开放环境中的对抗内容。",
      "inspiration": "可研究“安全能力从预训练到 RL”的传递：例如预训练中对危险 shell 模式、依赖来源和权限边界的理解，能否在 Agent 后训练中转化为稳定的安全工具选择。",
      "valueJudgment": "值得精读其受控实验设计；适合为安全后训练与 Agentic RL 的数据、指标和消融设计提供参考。",
      "priority": "A"
    },
    {
      "id": "muon-agentic-rl",
      "title": "When Does Muon Help Agentic Reinforcement Learning?",
      "url": "https://arxiv.org/abs/2607.16169",
      "authorsAndInstitutions": "Kai Ruan、Jinghao Lin、Zihe Huang、Ziqi Zhou、Qianshan Wei、Xuan Wang、Hao Sun；arXiv 摘要页未可靠列出完整机构。v2，于 2026-07-20 17:21 UTC 更新；v1 首次提交于 2026-07-17 17:49 UTC。",
      "tags": [
        "Agent",
        "Agentic RL",
        "RL",
        "Optimizer",
        "Muon",
        "Post-training"
      ],
      "summary": "论文研究 Muon 优化器何时能帮助 Agentic RL，并比较其与 AdamW 在不同优势估计和学习率配置下的表现。",
      "importance": "长轨迹、稀疏奖励和高方差让 Agentic RL 对优化器与估计器耦合更敏感；这类训练动力学会影响能力提升是否稳定、是否可复现。",
      "methodHighlights": "在 ALFWorld 与 Qwen2.5-0.5B 上比较 AdamW、Muon、GiGPO、GRPO 与 GraphGPO；报告 Muon 与 GiGPO 组合从 0.290 提升至 0.546。创新点是将优化器选择放到 Agentic RL 的具体训练条件中分析。",
      "limitations": "仅报告单一随机种子、一个主要任务和小模型；对超参数敏感性、不同环境与大模型上的稳定性仍需更充分验证。",
      "inspiration": "安全强化学习实验应控制优化器、奖励估计与训练轨迹，否则攻击防御或安全能力的差异可能只是训练动力学造成的混杂因素。",
      "valueJudgment": "适合快速阅读与方法核对，不建议作为首要复现项目；对设计 Agent 安全 RL 实验的控制变量有实际价值。",
      "priority": "B"
    },
    {
      "id": "continuitybench",
      "title": "ContinuityBench: A Benchmark and Systems Study of Stateful Failover in Multi-Provider LLM Routing",
      "url": "https://arxiv.org/abs/2607.15899",
      "authorsAndInstitutions": "Vishal Pandey、Gopal Singh；arXiv 摘要页未可靠列出机构。v1，提交于 2026-07-17 12:12 UTC，并进入 7 月 20 日公开批次。",
      "tags": [
        "LLM Systems",
        "多服务商路由",
        "可靠性",
        "上下文",
        "基础设施"
      ],
      "summary": "论文评测并实现多服务商 LLM 路由中的有状态故障转移，使服务切换后仍可保持对话和 Agent 轨迹连续性。",
      "importance": "Agent 运行越来越依赖多服务商，故障转移不应只看 API 可用性，还必须维持上下文、工具状态和执行意图；这也是 AI 基础设施供应链韧性的现实问题。",
      "methodHighlights": "提出带 History Forwarding 的有状态代理，并以 Continuity Preservation Rate 与 Continuity Loss Objective 衡量；在 750 个故障事件中报告 99.2% 的 CPR，显著优于无状态方案。",
      "limitations": "跨服务商转发上下文会带来隐私、保留与合规问题；系统提示、工具权限和模型行为的差异也可能使“连续”变成静默的安全漂移。",
      "inspiration": "可扩展为 Provider Supply-Chain Failover Security：在切换时验证上下文来源、系统提示、工具权限和模型/供应商策略的兼容性，并记录可审计的状态迁移。",
      "valueJudgment": "值得作为系统基线阅读；适合做多服务商 Agent 可靠性与供应链安全结合的工程原型。",
      "priority": "B"
    },
    {
      "id": "pagedweight",
      "title": "PagedWeight: Efficient MoE LLM Serving with Dynamic Quality-Aware Weight Quantization",
      "url": "https://arxiv.org/abs/2607.16184",
      "authorsAndInstitutions": "Yuchen Yang、Yifan Zhao、Anisha Dasgupta、Sasa Misailovic；arXiv 摘要页未可靠列出完整机构。v1，提交于 2026-07-17 17:58 UTC，并进入 7 月 20 日公开批次。",
      "tags": [
        "LLM Systems",
        "MoE",
        "Serving",
        "Quantization",
        "KV Cache"
      ],
      "summary": "论文通过动态、质量感知的专家权重量化释放显存给 KV cache，以提高 MoE LLM 的在线服务效率。",
      "importance": "长轨迹 Agent 的上下文与 KV cache 成本会快速增长，推理系统优化决定了可执行任务长度和部署成本；但效率优化也可能改变行为稳定性。",
      "methodHighlights": "针对不同专家动态选择量化精度，报告在保持质量的条件下可节省约 72% 权重显存，并将释放内存用于更长的 KV cache。创新点是把量化粒度与专家质量、在线资源分配结合。",
      "limitations": "主要是系统论文，需要进一步检查量化开销、专家敏感性、不同硬件与真实 Agent 工作负载上的稳定性；尚未讨论行为或安全影响。",
      "inspiration": "可以研究 Quantization-Induced Security Drift：不同量化、路由和专家配置是否会改变 Agent 的拒绝、工具选择或安全 guardrail，从而形成新的运行时供应链风险。",
      "valueJudgment": "对 LLM 系统与长上下文部署值得了解；与供应链安全的联系较间接，不建议优先复现。",
      "priority": "C"
    }
  ]
});
