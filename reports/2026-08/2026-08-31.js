// 2026-08-31 LLM / Agent 科研日报
window.RESEARCH_REPORTS.push({
  "date": "2026-08-31",
  "title": "LLM / Agent 科研日报",
  "generatedAt": "2026-08-31 10:02（北京时间）",
  "brief": {
    "summary": "今日严格筛选 5 篇，A/B/C 为 2/3/0。主线集中在 Agent 行为依赖的运行时治理：RAG 外部文档可成为隐蔽投毒载体；上下文、长期记忆与压缩策略本身可以通过 RL 学习；运行监控开始复用 speculative-decoding 模块；工具调用错误可以从模型隐藏状态中提前检测；Agent Memory 的收益则被证明具有明显的数据分布依赖。整体上，RAG corpus、context-management policy、monitor/probe 与 memory representation 都应被视为可版本化、可回归的行为供应链组件。",
    "trendAssessment": "本期覆盖 2026-08-31 arXiv 新公开批次中此前未收录的高价值工作。今日未发现值得替换这些工作的 v2/v3 重要更新。对 LLM/Agent 供应链安全最直接的趋势是：除了模型、Prompt、Skill 与 Harness，还必须把 RAG corpus/index、context-management toolset、monitor/probe、tool-calling model state 与 memory representation 纳入 Runtime/Evaluation SBOM，并在版本变化后进行安全与行为回归。"
  },
  "topPicks": [
    "camodocs",
    "contextpilot"
  ],
  "topPickRationales": {
    "camodocs": "本期最值得精读。CamoDocs 直接攻击 RAG 数据供应链，通过把恶意文档伪装进正常内容、降低查询重叠和嵌入异常，绕过多类已有防御；在 GPT-5.4-mini 和 Claude-Haiku-4.5 上平均攻击成功率仍达 61.80% 和 55.09%。论文已开放官方代码，且有 SNU/CMU 团队信号，适合扩展为知识库准入、文档 provenance、索引版本和 RAG-SBOM 研究。",
    "contextpilot": "ContextPilot 把上下文管理从固定 Harness 规则升级为 Agent 可学习的主动策略，加入规划、长期记忆与软卸载工具，并用动作级信用分配训练。它提示 context-management policy 本身就是高影响行为依赖；模型、工具集或压缩策略升级后需要做长期任务回归。团队来自清华、腾讯优图和上海 AI Lab，官方项目页、代码和模型均已开放。"
  },
  "papers": [
    {
      "id": "camodocs",
      "title": "CamoDocs: A Poisoning Attack Against Retrieval-Augmented Language Models Using Camouflaged Documents",
      "url": "https://arxiv.org/abs/2608.28389",
      "authorsAndInstitutions": "Jaewon Jung、Haizhong Zheng、Hongsun Jang、Jaeyong Song、Beidi Chen、Jinho Lee。可靠公开信息显示工作涉及 Seoul National University AISys Lab，并与 Carnegie Mellon University 的 Beidi Chen 团队合作；Haizhong Zheng 为 CMU 博士后。",
      "qualitySignals": "作者与机构信号：强，SNU + CMU 合作且论文已被 EMNLP 2026 接收；版本动态：v1 新发，2026-08-28 14:44:28 UTC，进入 2026-08-31 公开批次；开源与数据：官方代码 https://github.com/jaewonalive/CamoDocs 。",
      "openSourceAndData": "官方代码：https://github.com/jaewonalive/CamoDocs",
      "tags": ["RAG", "Knowledge Poisoning", "Supply-chain Security", "LLM Security", "Retrieval"],
      "summary": "提出一种不直接包含目标查询、而是把恶意文档伪装进良性内容分布的 RAG 投毒攻击，从而降低查询重叠与嵌入异常带来的可检测性。",
      "importance": "RAG 把外部语料、用户可编辑文档和公共知识库直接接入模型推理链，因此文档来源与索引内容已经成为推理时供应链。已有投毒攻击常把目标查询写入恶意文档以提高召回，但这种做法会留下明显的词法和嵌入空间痕迹，较容易被过滤。",
      "methodHighlights": "CamoDocs 先合成良性与恶意草稿并分块，再在良性块中替换选定 token，引入 dispersion token 以拉散恶意文档的嵌入分布，随后进行连贯性过滤，最后把良性掩护内容与目标攻击内容合并。核心优势是避免直接 query inclusion，同时兼顾可读性与检索命中。",
      "keyFindings": "跨 7 类 RAG 防御、3 个开放权重模型和 3 个 benchmark，攻击保持较高平均成功率；在闭源模型上，GPT-5.4-mini 平均 ASR 为 61.80%，Claude-Haiku-4.5 为 55.09%。TrustRAG 一类大量删除文档的聚类防御可降低攻击成功率，但在 NeoQA 等依赖检索的任务上会带来明显效用损失。",
      "limitations": "攻击依赖攻击者能够向 RAG corpus 注入文档，并基于当前检索/嵌入流程优化；不同企业知识库、权限体系和索引策略下效果可能变化。论文重点证明攻击可行性，并未给出覆盖未知投毒策略的通用防御。",
      "inspiration": "论文直接结论：RAG 投毒可以在不直接复制查询的情况下保持较高攻击成功率，并降低常见 query-overlap 检测的有效性。研究启发：RAG-SBOM 应记录 document hash、publisher/source、ingestion time、index/embedding version、retriever、poison score 与 quarantine decision；知识库或嵌入模型更新后应重新跑 corpus-level 与 query-level poisoning regression。",
      "valueJudgment": "非常值得精读和复现，直接对应 AI 软件供应链中的知识库/检索层投毒与来源治理。",
      "priority": "A"
    },
    {
      "id": "contextpilot",
      "title": "ContextPilot: Teaching Agents for Proactive Context Management via Fine-grained RL",
      "url": "https://arxiv.org/abs/2608.28476",
      "authorsAndInstitutions": "Zhuoshi Pan、Qizhi Pei、Junru Lu、Honglin Lin、H. Vicky Zhao、Di Yin、Xing Sun；论文首页确认机构为 Tsinghua University、Tencent Youtu Lab、Shanghai AI Lab。",
      "qualitySignals": "作者与机构信号：强，清华 + 腾讯优图 + 上海 AI Lab，且被 EMNLP 2026 Main 接收；版本动态：v1 新发，2026-08-28 16:01:08 UTC；开源与数据：项目页 https://tencent.github.io/ContextPilot ，代码 https://github.com/Tencent/ContextPilot ，模型见 Hugging Face ContextPilot collection。",
      "openSourceAndData": "项目页：https://tencent.github.io/ContextPilot；代码：https://github.com/Tencent/ContextPilot；模型：https://huggingface.co/collections/panzs19/contextpilot",
      "tags": ["Agent", "Context Management", "Memory", "RL", "Harness", "Behavioral Dependency"],
      "summary": "让 Agent 主动决定何时规划、写长期记忆、搜索、压缩或卸载上下文，并针对上下文编辑动作设计细粒度 RL 信用分配。",
      "importance": "长程 Agent 如果持续拼接所有历史，工作上下文会不断膨胀；传统 Harness 多依靠固定截断或摘要规则，而主动上下文管理虽然更灵活，但现有工具集通常只覆盖搜索、删除与总结，且训练时把最终奖励粗粒度地分给所有中间编辑动作。",
      "methodHighlights": "ContextPilot 扩展上下文工具集，加入全局规划、长期记忆和软上下文卸载；训练侧根据上下文变化和熵变化识别关键编辑决策做局部分支采样，再利用所有经过该动作的后续分支估计动作级 advantage，从而把信用分配落到具体 context-management action。",
      "keyFindings": "论文在长上下文 QA 与 deep-search 任务上跨多种基础模型测试，报告 ContextPilot 在保持更紧凑工作上下文的同时持续优于现有主动上下文管理基线。arXiv 摘要未给出一个可统一引用的单一提升数字；论文原文的主要结论是性能与 token/context compactness 同时改善。",
      "limitations": "上下文编辑策略被训练后会成为新的高影响运行时状态；错误记忆、过度压缩或被污染的工具结果可能被模型主动保留/放大。当前实验主要集中在 QA 与 deep search，尚未直接评价恶意 context injection、权限信息丢失和长期安全回归。",
      "inspiration": "论文直接结论：上下文管理可以作为独立可学习能力，通过更丰富工具和细粒度 RL 改善长程任务。研究启发：Context/Harness-SBOM 应记录 context toolset、compression/offloading policy、memory store、training checkpoint、model version 与关键编辑 trace；模型或 Harness 升级后应重新测信息保真、污染传播与关键约束是否被错误删除。",
      "valueJudgment": "非常值得精读和运行官方实现，对长期 Agent Harness、Memory 与运行时行为依赖治理都很关键。",
      "priority": "A"
    },
    {
      "id": "speculative-probing",
      "title": "Speculative Probing: LLM Monitoring at Speculative-Decoding Cost",
      "url": "https://arxiv.org/abs/2608.28099",
      "authorsAndInstitutions": "Collin Zhang、Tingwei Zhang、Vitaly Shmatikov。作者机构未从 arXiv 摘要页可靠展开；Vitaly Shmatikov 为长期从事计算机安全研究的知名学者，但本期机构字段不作额外推断。",
      "qualitySignals": "作者与机构信号：强/中，包含长期安全研究团队信号，但本轮完整机构映射未可靠查到；版本动态：v1 新发，2026-08-28 09:07:58 UTC；开源与数据：未可靠查到官方代码或数据入口。",
      "openSourceAndData": "未可靠查到",
      "tags": ["LLM Monitoring", "Agent Security", "Safety", "Speculative Decoding", "Runtime Monitoring"],
      "summary": "复用 speculative-decoding 模块与已有 KV cache，通过训练 soft prompt 把草稿模块变成低开销序列分类器，用于实时安全与行为监控。",
      "importance": "实时 Agent/LLM 监控通常在准确率和推理开销之间二选一：隐藏状态线性探针便宜但表达能力有限，独立 Guard/Judge 模型更强却需要额外完整推理。",
      "methodHighlights": "方法在目标序列末尾附加训练得到的 soft prompt，利用 speculative-decoding 模块访问已有 KV cache 完成序列分类；由于缓存已驻留 GPU，额外分类成本接近 speculative decoding 的现有开销，而不需要再运行一个完整 Guard LLM。",
      "keyFindings": "论文在 Qwen3.5-4B/9B/27B 与 MiniCPM4.1-8B 上覆盖 4 类分类任务。小型 probe 持续优于 zero-shot GPT-5.4-mini；在多语言 Prompt Safety 上可匹配或超过 Qwen3Guard-Gen-8B、Llama-Guard-3-8B 等专用 8B 安全分类器。摘要未报告统一单一准确率数字。",
      "limitations": "需要可访问 speculative-decoding 模块和 KV cache，闭源 API 部署不一定具备相同条件。Probe 训练分布、模型层结构和 speculative module 版本变化后，监控质量都可能漂移。",
      "inspiration": "论文直接结论：推理加速基础设施可以同时承担低开销监控。研究启发：Runtime-SBOM 中应把 speculative module、probe soft prompt、model checkpoint、KV-cache policy 与监控阈值一起版本化；模型量化、蒸馏或服务端升级后重新校准监控器。",
      "valueJudgment": "值得精读，尤其适合作为低成本 Agent Runtime Monitor 与安全观测基础设施的参考。",
      "priority": "B"
    },
    {
      "id": "tool-call-probes",
      "title": "The Calls are Coming from Inside the Model: Investigating Probe-based Detection of Tool-Calling Errors in LLMs",
      "url": "https://arxiv.org/abs/2608.27750",
      "authorsAndInstitutions": "Eric Yeats、Brendan Kennedy、Loc Truong、John Buckheit、Jung Lee、Jesse Friedbaum、John Emanuello、Henry Kvinge；机构未可靠查到。",
      "qualitySignals": "作者与机构信号：未可靠查到；版本动态：v1 新公开，原始提交 2026-08-27 22:26:25 UTC，进入 2026-08-31 当前公开窗口；开源与数据：未可靠查到官方代码或数据入口。",
      "openSourceAndData": "未可靠查到",
      "tags": ["Tool Use", "Agent Security", "LLM Probing", "Runtime Monitoring", "Function Calling"],
      "summary": "在 18 个 Tool-Calling LLM 上用隐藏状态线性探针识别错误工具调用，包括普通日志很难发现的“参数类型正确但值错误”场景。",
      "importance": "Tool Call 进入真实系统后可能直接改变外部状态，而现有日志通常只能检查 schema、类型和返回码；语义上错误但格式合法的参数可能顺利通过传统 instrumentation。",
      "methodHighlights": "论文基于 Berkeley Function Calling Leaderboard 构建正确/错误 Tool Call 对，并在不同模型层隐藏状态上训练线性探针，系统分析模型大小、探针层和 post-training 类型对检测效果的影响，同时测试对未见错误类型的泛化。",
      "keyFindings": "跨 18 个 Tool-Calling LLM，Probe 对多类错误均具有有效检测能力，包括参数值错误但类型正确的情况；检测效果受模型大小、层位置和 post-training 类型显著影响，并能泛化到训练中未出现的新错误类型。摘要未提供统一的单一准确率/AUROC 数字。",
      "limitations": "Probe 依赖白盒隐藏状态，闭源 Tool Agent 很难直接采用；线性可分性也可能随模型版本、量化和后训练变化而改变。检测错误不等于阻止副作用，还需要与 Runtime Gate 配合。",
      "inspiration": "论文直接结论：Tool-Calling Error 在模型内部状态中存在可探测信号。研究启发：Tool/MCP-SBOM 可记录 model checkpoint、probe layer、probe version、tool schema、error taxonomy 与 block/allow policy；模型或 Tool Schema 变动后应做语义参数错误回归，而不只做 schema validation。",
      "valueJudgment": "值得阅读和轻量复现，对 Tool/MCP Runtime 安全监控有直接延展价值。",
      "priority": "B"
    },
    {
      "id": "uaq-agent-memory",
      "title": "What Makes Agent Memory Useful for Reliable Unanswerable Question Handling?",
      "url": "https://arxiv.org/abs/2608.27924",
      "authorsAndInstitutions": "Chuanyuan Tan、Junjie Yu、Yuxin Wang、Yining Zheng、Xipeng Qiu、Wenliang Chen；机构未可靠查到。",
      "qualitySignals": "作者与机构信号：中，作者中包含长期 NLP/LLM 研究者，但本轮论文首页机构未可靠提取；版本动态：v1 新发，2026-08-28 05:00:28 UTC；开源与数据：未可靠查到官方代码或项目页。",
      "openSourceAndData": "未可靠查到",
      "tags": ["Agent Memory", "RAG", "Reliability", "Unanswerable QA", "Behavioral Dependency"],
      "summary": "系统比较 Agent Memory 在不可回答问题处理中的作用，发现 Memory 的收益更依赖可迁移的行为指导，而不是存更多轨迹或更多事实。",
      "importance": "不可回答问题是 Agent 可靠性的关键边界。Memory 可能帮助 Agent 学会何时拒答，但也可能把某个数据集上的回答模式、错误启发式或过度拒答策略迁移到新环境。",
      "methodHighlights": "在统一 Agentic RAG 框架下比较 4 类代表性 Memory 方法、3 个 UAQ 数据集和 2 个基础模型，并区分 cross-model reuse 与 cross-dataset transfer；进一步分析 procedural/rule-based memory、trajectory shaping 和 decision guidance 等表示方式。",
      "keyFindings": "Memory 在部分设置下能提升 UAQ，但并非普遍有效，且面对 dataset shift 较脆弱；跨模型 Memory 复用通常比跨数据集迁移更可行。收益更多通过 decision guidance 保留，而非 trajectory shaping；procedural/rule-based memory 往往更可靠。摘要未提供统一单一提升数字。",
      "limitations": "结论集中在 UAQ 与 Agentic RAG 场景，不能直接外推到 Tool Agent、Coding Agent 或开放世界长期 Memory。Memory 的真实性、权限、过期与污染风险不是本论文重点。",
      "inspiration": "论文直接结论：Memory 的有效性主要取决于可迁移行为指导，dataset shift 比 base-model shift 更容易破坏效果。研究启发：Memory-SBOM 应记录 source dataset/domain、representation type、decision rule、model/harness version 与 validated transfer scope；跨域部署前必须做拒答率、过度拒答和错误迁移回归。",
      "valueJudgment": "值得阅读，对 Memory 迁移、可靠性和行为依赖版本治理有较强参考价值。",
      "priority": "B"
    }
  ]
});
