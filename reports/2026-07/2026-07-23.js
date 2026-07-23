// 2026-07-23 科研日报：按月目录拆分，便于网页发布和维护。
window.RESEARCH_REPORTS.push({
  "date": "2026-07-23",
  "title": "LLM / Agent 科研日报",
  "generatedAt": "2026-07-23 12:54（北京时间）",
  "brief": {
    "summary": "今日筛出 7 篇值得看的论文，主题明显偏向 Agent 安全、技能风险、AI 供应链合规、Agentic CI/CD 攻击面、黑盒渗透测试、多 Agent 通道风险、长程执行风险和程序化记忆。今天不是“间接相关”的一天，而是直接出现了多篇可连接 LLM/Agent 供应链安全的论文：第三方 skill、AI artifact 许可证流转、Agentic CI/CD 中的权限与代码意图、黑盒 Agent reconnaissance，以及多 Agent 内部消息通道都是可落地的安全研究对象。今日推荐总数 7 篇；A 级 5 篇，B 级 2 篇，C 级 0 篇。",
    "trendAssessment": "研究趋势正在从“模型是否安全”转向“Agent 依赖的外部组件、技能、数据、代码流水线和执行轨迹是否可信”。这对 AI 软件供应链安全很关键：未来的安全边界不只在模型权重，而在 skill、tool、prompt、harness、数据许可证、CI/CD agent 和长期记忆共同组成的行为供应链。"
  },
  "topPicks": [
    "open-skill-risk",
    "license-laundering"
  ],
  "papers": [
    {
      "id": "open-skill-risk",
      "title": "OpenSkillRisk: Benchmarking Agent Safety When Using Real-World Risky Third-Party Skills",
      "url": "https://arxiv.org/abs/2607.20121",
      "authorsAndInstitutions": "Qiyuan Liu、Tingfeng Hui、Kun Zhan、Kaike Zhang、Ning Miao；机构未在 arXiv 摘要页可靠查到，不作推断。",
      "tags": [
        "Agent",
        "Agent Skill",
        "Supply-chain Security",
        "Benchmark",
        "Runtime Safety"
      ],
      "summary": "构建 OpenSkillRisk，用 263 个来自公开 skill marketplace 的真实风险技能评测 LLM Agent 是否能识别并避免第三方技能带来的执行风险。",
      "importance": "这是今天最直接命中 LLM/Agent 供应链安全的论文。它把第三方 skill 明确视为 Agent 的外部依赖，而不是普通提示词或工具说明；这对应真实部署中的 skill 安装、复用、权限扩展和 marketplace 分发风险。",
      "methodHighlights": "论文收集 263 个风险技能，按威胁类型分为 7 类，并为每个技能配套标准用户任务和沙箱环境；实验覆盖 3 个主流 CLI Agent 框架和 13 个前沿 LLM。结果显示，即使最安全的配置仍约有 17% 场景会执行不安全动作，并归纳出三类失败：未识别风险、识别风险但未阻止执行、超出用户意图范围执行技能指令。",
      "limitations": "基准虽然来自真实 skill marketplace，但仍是受控沙箱，不等价于真实企业权限、凭证、网络和数据边界；风险分类是否覆盖 MCP、跨技能组合、版本漂移和恶意更新仍需核查。论文直接结论是 skill 使用风险评测，不应直接外推为完整供应链防御方案。",
      "inspiration": "非常适合作为 Agent skill 供应链安全选题入口。可以扩展为 skill SBOM、skill provenance、签名发布、权限 manifest、版本更新审计，以及“安装前审查 + 运行时阻断 + 事后审计”的完整 skill 风险治理流程。",
      "valueJudgment": "非常值得精读和复现。若代码与 benchmark 开放度足够高，适合进一步扩展成 MCP / skill marketplace 风险评测基准。",
      "priority": "A"
    },
    {
      "id": "license-laundering",
      "title": "Don't Trust the Label: License Laundering in AI Supply Chains",
      "url": "https://arxiv.org/abs/2607.20300",
      "authorsAndInstitutions": "James Jewitt、Hao Li、Gopi Krishnan Rajbahadur、Bram Adams、Ahmed E. Hassan；机构未在 arXiv 摘要页可靠查到，不作推断。",
      "tags": [
        "AI Supply-chain Security",
        "License Compliance",
        "Dataset",
        "Model",
        "Software Engineering"
      ],
      "summary": "追踪数据集、模型和 GitHub 应用之间的 232,270 条供应链路径，量化 AI artifact 在下游传播中发生许可证缺失、替换和义务丢失的问题。",
      "importance": "这篇论文直接研究 AI 供应链，不是安全启发的间接连接。它提醒我们：AI 资产的风险不仅包括恶意代码和投毒，还包括许可证、归属、再分发权利和合规义务在跨平台传播中被洗掉。",
      "methodHighlights": "论文将 Hugging Face 上的数据集和模型与 GitHub 应用连接成 dataset → model → application 链路，定义两类 license laundering：无许可证 artifact 在下游获得确定标签，以及一种许可证类别在再分发中被替换为另一种。结果显示 62.3% 链路经过至少一个无声明许可证 artifact，且带义务许可证类别端到端保留率均低于 7%。",
      "limitations": "研究重点是许可证元数据与链路追踪，不是恶意攻击检测；许可证语义、平台元数据质量、仓库引用关系和自动链路恢复都可能影响统计结果。它说明合规风险广泛存在，但不直接证明每个个案都构成法律违规。",
      "inspiration": "非常适合扩展到 AI-BOM / Model-BOM / Dataset-BOM。对你的方向而言，可以把许可证、数据来源、模型来源、skill 来源和工具来源统一纳入 AI 软件供应链 provenance graph，研究 Agent 在选择模型、数据和工具时如何读取并执行这些约束。",
      "valueJudgment": "值得精读和做技术解读。复现成本取决于作者是否开放链路数据与抓取管线；即使不复现，也很适合作为 AI 供应链治理背景论文。",
      "priority": "A"
    },
    {
      "id": "agentic-cicd-laundered-code",
      "title": "They'll Verify. They Just Won't Act. How Authority Framing and Laundered Code Turn a Trusted Agentic CI/CD Pipeline Into an Attack Surface",
      "url": "https://arxiv.org/abs/2607.19267",
      "authorsAndInstitutions": "Yohann Sidot；机构未在 arXiv 摘要页可靠查到，不作推断。",
      "tags": [
        "Coding Agent",
        "Agentic CI/CD",
        "Software Supply-chain Security",
        "Prompt Injection",
        "Code Review"
      ],
      "summary": "研究五 Agent CI/CD 流水线中，外部 issue 如何通过权威话术和“观测性功能”伪装，把密钥外传代码推进到审核和部署环节。",
      "importance": "它非常贴近 AI 软件供应链安全：未来代码供应链的关键节点可能不再只是人类开发者和 CI 脚本，而是 triage、developer、security-scan、review、approve/deploy 等多个 Agent 组成的流程。",
      "methodHighlights": "论文构建五 Agent CI/CD pipeline，使用来自多个提供商的生产 LLM，并在 shadow-mode LLM firewall 后执行合成实验。攻击输入是一个外部 issue，要求加入“usage telemetry”功能，实质代码会读取环境变量并外传。论文报告权威 framing 会让下游 verifier 看见问题却仍引用预批准理由继续放行，scanner 对 laundered pull request 的通过率可达 80%，最坏实验单元 compromise 达 55%。",
      "limitations": "样本规模较小，数据 100% 合成，攻击场景和流水线结构较人工；不同企业 CI/CD 权限、代码审查规则和真实安全工具下结果未必等比例复现。但它提出的“验证到了却不行动”是很现实的系统性风险。",
      "inspiration": "可以发展为 Agentic CI/CD Supply-Chain Security。重点不只是检测恶意代码，而是研究外部 issue、Agent 角色权限、预批准元数据、代码意图分析、不可覆盖的安全 veto、以及每个 Agent 的决策链审计。",
      "valueJudgment": "值得精读和安全批判性复现。尤其适合和多 Agent reviewer uptake、权限覆盖、代码意图检测结合成论文选题。",
      "priority": "A"
    },
    {
      "id": "know-your-agent",
      "title": "Know Your Agent: Reconnaissance-Driven Pentesting of AI Agents",
      "url": "https://arxiv.org/abs/2607.19837",
      "authorsAndInstitutions": "Or Zion Eliav、Eyal Lenga、Shir Bernstien、Yisroel Mirsky；机构未在 arXiv 摘要页可靠查到，不作推断。",
      "tags": [
        "Agent Security",
        "Pentesting",
        "Reconnaissance",
        "Prompt Injection",
        "Benchmark"
      ],
      "summary": "提出 KYA 框架，通过黑盒侦察收集 Agent 的能力、约束和弱点画像，再用这些画像生成更强的间接提示注入攻击。",
      "importance": "传统 Agent 安全评测常直接给攻击 payload，而真实攻击往往先侦察系统边界。KYA 把 Agent 渗透测试从一次性攻击推进到“探测 → 建模 → 定制攻击”的流程，更接近真实攻防。",
      "methodHighlights": "论文形式化 agent reconnaissance，识别攻击者希望提取的 knowledge assets 及其如何放大间接提示注入攻击；KYA 自动探测 Agent、建立 target profile，并基于 profile 生成攻击。实验覆盖 agent-security benchmark 和真实 coding agent，并计划释放框架、benchmark 和 baseline。",
      "limitations": "摘要层面尚不能判断其 reconnaissance 是否覆盖工具权限、MCP server、skill 版本和本地文件策略；自动攻击提升可能依赖特定 benchmark。若只停留在 prompt-injection 强化，供应链视角仍需进一步扩展。",
      "inspiration": "适合扩展为 Know Your Agent Supply Chain：不仅侦察模型行为，还侦察 Agent 的 tool graph、skill 来源、权限边界、配置文件、harness 版本和审计日志，从而建立防御侧的 Agent 暴露面清单。",
      "valueJudgment": "值得精读和跟踪代码。它适合做红队 benchmark 扩展，也适合和你关注的 Agent 供应链暴露面映射结合。",
      "priority": "A"
    },
    {
      "id": "channelguard-multi-agent",
      "title": "ChannelGuard: Safe Models Do Not Compose into Safe Multi-Agent Systems",
      "url": "https://arxiv.org/abs/2607.19430",
      "authorsAndInstitutions": "Elias Hossain、Md Mehedi Hasan Nipu、Fatema Tuj Johora Faria、Tasfia Nuzhat Ornee、Maleeha Sheikh；机构未在 arXiv 摘要页可靠查到，不作推断。",
      "tags": [
        "Multi-agent",
        "Agent Security",
        "Prompt Injection",
        "Guardrail",
        "Runtime Policy"
      ],
      "summary": "指出单个模型安全并不意味着多 Agent 系统安全，因为 planner、worker、verifier、synthesizer 之间的内部消息通道也会传播恶意指令。",
      "importance": "它抓住了多 Agent 系统的一个真实薄弱点：安全防护常放在外部输入边界，但 Agent 与 Agent 之间的中间消息、任务委派和结果汇总同样可能成为攻击链的一部分。",
      "methodHighlights": "论文把多 Agent 应用抽象为多个角色和多条内部通信通道，并将攻击面从输入边界扩展到跨 Agent 的 message passing。它强调现有防御多集中在输入过滤或外部 provider-side guard，而缺少对应用内部通道的可解释、可部署监控。",
      "limitations": "当前可见信息更偏问题提出与框架化分析，具体 benchmark 规模、防御实现细节和真实系统覆盖度需要阅读正文核验。它直接讨论多 Agent 通道安全，但不是完整的软件供应链治理框架。",
      "inspiration": "可延展为 Multi-Agent Message SBOM / Channel Policy：为每条 Agent 间通道记录来源、权限、可传递指令类型、是否允许修改目标，以及安全 Agent 的拒绝是否能被上游覆盖。",
      "valueJudgment": "值得阅读和做安全框架解读。与 Agent 供应链安全的连接点在于：内部消息通道也是一种运行时依赖，必须被纳入信任边界和审计范围。",
      "priority": "A"
    },
    {
      "id": "janus-long-horizon-safety",
      "title": "JANUS: Foreseeing Latent Risk for Long-Horizon Agent Safety",
      "url": "https://arxiv.org/abs/2607.19913",
      "authorsAndInstitutions": "Yuan Xiong、Linji Hao、Shizhu He、Yequan Wang、Lijun Li；机构未在 arXiv 摘要页可靠查到，不作推断。",
      "tags": [
        "Agent Safety",
        "Long-Horizon Agent",
        "Risk Prediction",
        "Guardrail",
        "RL"
      ],
      "summary": "提出 Janus，让安全 guard 不只判断当前动作是否违规，而是根据部分轨迹预判长程任务中潜在的延迟风险。",
      "importance": "长程 Agent 的危险通常不是单步动作本身，而是多步组合后的后果。Janus 将 Agent safety 从内容审核推进到执行前的风险预见，这与工具链、权限链和供应链依赖的多步风险高度相关。",
      "methodHighlights": "论文通过多 Agent 模拟合成多样化轨迹，训练一个包含 anticipation 与 adjudication 两个耦合任务的 guard。CoAA-RL 奖励那些能帮助下游安全判断的预测，最终 guard 模型 Vanguard 在四个 Agent 安全基准上提升平均保护率 15.9 个百分点，同时 benign task completion 提升 5.1 个百分点。",
      "limitations": "其核心是轨迹安全预测，不是供应链溯源；风险模拟质量决定上限。面对恶意工具更新、隐藏权限扩大、数据源被污染等真实供应链问题时，还需要 provenance 和权限信息输入。",
      "inspiration": "可扩展为 Supply-Chain-Aware Long-Horizon Guard：把工具来源、版本、权限、签名、调用链和历史异常作为风险预测输入，判断当前看似安全的调用是否会在后续造成越权或数据外泄。",
      "valueJudgment": "值得系统学习和轻量复现。对你的方向更像安全机制组件，而不是完整选题；适合与 skill/MCP provenance 结合。",
      "priority": "B"
    },
    {
      "id": "pro-long-programmatic-memory",
      "title": "PRO-LONG: Programmatic Memory Enables Long-Horizon Reasoning",
      "url": "https://arxiv.org/abs/2607.20064",
      "authorsAndInstitutions": "Alexis Fox、Junlin Wang、Paul Rosu、Bhuwan Dhingra；机构未在 arXiv 摘要页可靠查到，不作推断。",
      "tags": [
        "LLM Agent",
        "Memory",
        "Long-Horizon Reasoning",
        "Context Management",
        "Coding Agent"
      ],
      "summary": "提出 PRO-LONG，用完整结构化交互日志和程序化搜索来替代简单上下文塞入，提升长程探索任务中的 Agent 记忆使用效率。",
      "importance": "长期运行 Agent 的记忆不只是性能模块，也是安全资产。哪些信息被记录、如何检索、是否可篡改、是否可审计，会直接影响 Agent 的后续行为和供应链风险。",
      "methodHighlights": "PRO-LONG 保存完整结构化 interaction log，并利用 coding agent 能力按需搜索历史，而不是把更多历史直接塞进上下文。论文在 ARC-AGI-3 public game set 上报告平均提升 18.0 个百分点，最高达到 76.1% pass@1，同时 token 使用减少 4.2–5.8 倍；相关代码和日志可用性在摘要中有说明。",
      "limitations": "它主要解决长程推理和 token 成本问题，不直接处理恶意记忆、记忆投毒、日志完整性或审计保全。程序化日志搜索若缺少权限和来源标注，可能成为新的攻击面。",
      "inspiration": "适合扩展为可信 Agent memory layer：为每条记忆加入来源、签名、权限、时间、写入主体和不可删除审计标记，并研究攻击者能否通过日志污染改变后续工具调用。",
      "valueJudgment": "值得阅读方法和复现小规模实验。对供应链安全是间接支撑，但能作为长期 Agent 状态治理的系统组件。",
      "priority": "B"
    }
  ]
});
