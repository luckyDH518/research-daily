// 2026-08-13 LLM / Agent 科研日报
window.RESEARCH_REPORTS.push({
  "date": "2026-08-13",
  "title": "LLM / Agent 科研日报",
  "generatedAt": "2026-08-13 10:00（北京时间）",
  "brief": {
    "summary": "今日严格筛选 6 篇值得看的论文：A 级 3 篇、B 级 3 篇、C 级 0 篇。arXiv 重点分类当前进入 2026-08-12 周三公开批次。本期主线非常集中：Agent Skill、Prompt/CLAUDE.md、Harness、模型与运行时状态正在形成一套真实的行为供应链，需要像传统软件配置项一样进行版本、依赖、审计和回归管理。GitSkills 首次给出百万级 Skill 生态数据，ACM 直接提出跨 LangGraph/CrewAI/OpenAI Agents SDK 的统一配置治理模型；Catastrophic Remembering 揭示 Agent context 文件为何持续膨胀。其余论文分别覆盖 Cursor 静态规则文件安全、Harness 跨语言/模型迁移，以及跨 Agent 生命周期的持续软件演化。",
    "trendAssessment": "今日最明显的趋势是：Agent 系统的风险已经从单次 prompt/input 层扩展到长期配置制品与软件生命周期。Skill 没有中心 registry/包管理器且大量通过复制传播；Prompt/Harness 会随着长期使用积累行为约束；模型替换和语言生态变化会改变同一 Harness 的有效性；长期 Coding Agent 需要明确版本历史和 accepted state。对 LLM/Agent 供应链安全而言，下一步值得重点做 Skill-BOM、Agentic Configuration Graph、Prompt/Harness provenance、跨模型兼容矩阵、安装/升级安全回归和可撤销的长期状态管理。质量信号方面，GitSkills 已公开 Zenodo/Hugging Face/GitHub 数据；ACM 提供官方参考实现与评测 artifacts；One Recipe 提供官方代码；Persistent Recursive Worlds 提供官方项目页。"
  },
  "topPicks": [
    "agentic-configuration-management",
    "gitskills"
  ],
  "topPickRationales": {
    "agentic-configuration-management": "优先精读，因为它直接把 prompts、skills、tools、models、policies、workflows、runtime observations 统一定义为可独立版本化的 Agentic Configuration Items，并用 Configuration/Evolution/Assurance/Runtime 四张图表达依赖、历史、治理证据和运行 provenance。它在 LangGraph、CrewAI、OpenAI Agents SDK 上运行 27 个治理场景和 9 个定量影响传播案例，参考实现与 artifacts 已公开。对 Agent-BOM、配置漂移检测、模型/Skill/MCP 升级影响分析最直接。",
    "gitskills": "优先精读，因为它第一次把 Agent Skill 生态规模化为可研究的数据对象：3,797,117 个 SKILL.md、282,200 个 GitHub 仓库、1,877,981 个不同内容，且约 50.5% 文件是逐字节复制。数据保留 path、hash、folder contents、脚本/参考文件和部分 commit history，并明确提出无 registry 条件下的 Skill 复制与潜在供应链攻击研究问题。数据已经公开，极适合直接做 Skill provenance、恶意派生、版本漂移与 marketplace 安全 benchmark。"
  },
  "papers": [
    {
      "id": "agentic-configuration-management",
      "title": "Agentic Configuration Management (ACM): A Reference Configuration Model for Governed Agentic Systems",
      "url": "https://arxiv.org/abs/2608.11166",
      "authorsAndInstitutions": "Audrey Quessada-Vial（PwC；arXiv 作者栏直接标注）。",
      "qualitySignals": "作者与机构信号：中，作者机构 PwC 可由 arXiv 摘要页直接确认；版本动态：arXiv:2608.11166 v1，2026-08-11 17:28:39 UTC 提交，进入 2026-08-12 公开批次；开源与数据：官方 GitHub `audreyqvial/ACM`，包含 Python reference implementation 与 evaluation artifacts。",
      "openSourceAndData": [{"label":"ACM 官方 GitHub","url":"https://github.com/audreyqvial/ACM","note":"arXiv 摘要页直接给出；包含参考实现与评测 artifacts"}],
      "tags": ["Agent","Supply-chain Security","Agent Harness","Runtime Policy","Configuration Management","Provenance"],
      "summary": "提出跨框架的 Agent 配置治理模型，把模型、Prompt、Skill、Tool、Policy、Workflow 与 Runtime Observation 统一成可版本化配置项并追踪依赖与影响传播。",
      "importance": "现代 Agent 的行为由模型之外的大量配置共同决定，但现有 LLMOps/AgentOps 更偏向编排和观测，缺少类似软件配置管理的统一对象模型。因此模型升级、Skill 替换、Prompt 修改或 Tool 变更后，很难系统回答‘哪些下游行为与治理证据受影响’。",
      "methodHighlights": "ACM 定义 Agentic Configuration Item、不可变 revision/baseline、配置与运行时分离，并组织为 Configuration、Evolution、Assurance、Runtime 四张互联图。不同框架原生配置先通过 semantic projection 映射到 canonical Configuration Graph，再由统一治理语义执行生命周期、assurance、eligibility、impact propagation 和 runtime replay。参考实现覆盖 LangGraph、CrewAI 与 OpenAI Agents SDK。",
      "keyFindings": "Campaign A 在三个框架上执行 27 个治理场景；379 个测试全部通过且无 skipped，其中 24 个场景无偏差通过、3 个带已记录偏差通过。Campaign B 包含 9 个 impact propagation 案例，每例重复 5 次，得到相同 impacted set、治理状态和定量指标；语义投影中的节点、关系、分支覆盖均达到 100%，且 transitive propagation 能发现 one-hop 检查遗漏的影响。",
      "limitations": "这是 reference-model/conformance 型评估，不是对真实生产系统安全性的独立验证。只覆盖三种 Agent 框架，且 framework introspection 能力不同；一些动态语义需要 adapter metadata。治理语义是否足以覆盖 MCP、复杂多 Agent 委派和闭源模型隐藏版本变化仍需扩展。",
      "inspiration": "论文直接结论：异构 Agent 框架可以被投影到统一的治理配置模型，并以确定性方式进行版本、依赖、影响与运行 provenance 管理。研究启发：可把它直接扩展为 Agent-BOM / Behavioral SBOM，把 Skill、MCP server、Prompt、模型 checkpoint、Harness、Policy、Judge 与数据源作为 ACI；任何更新先计算影响集，再触发针对性的安全回归与重新授权。",
      "valueJudgment": "非常值得精读和工程复现。它不是单一攻击/防御论文，但提供了把 Agent 行为供应链正式工程化的完整骨架。",
      "priority": "A"
    },
    {
      "id": "gitskills",
      "title": "GitSkills: A Dataset of Agent Skills on GitHub",
      "url": "https://arxiv.org/abs/2608.10906",
      "authorsAndInstitutions": "Giuseppe Destefanis（University College London）；Daniel Graziotin、Matteo Vaccargiu（University of Hohenheim）；Marco Ortu（University of Cagliari）。机构来自论文 PDF 首页。",
      "qualitySignals": "作者与机构信号：强，UCL、University of Hohenheim、University of Cagliari，且论文已标注将发表于 MSR 2027；版本动态：arXiv:2608.10906 v1，2026-08-11 13:28:27 UTC 提交；开源与数据：完整 SQLite 数据在 Zenodo，Parquet mirror 在 Hugging Face，样例在作者 GitHub。",
      "openSourceAndData": [{"label":"GitSkills Zenodo 数据","url":"https://doi.org/10.5281/zenodo.21875637","note":"论文官方完整 SQLite 数据"},{"label":"GitSkills Hugging Face","url":"https://huggingface.co/datasets/mvaccargiu/gitskills","note":"论文官方 Parquet mirror"},{"label":"GitSkills GitHub Sample","url":"https://github.com/giuseppedestefanis/gitskills-sample","note":"论文官方样例仓库"}],
      "tags": ["Agent Skill","Supply-chain Security","Dataset","Provenance","Software Engineering","GitHub"],
      "summary": "构建迄今大规模的 GitHub Agent Skill 数据集，保留 Skill 文件、内容哈希、仓库路径、伴随脚本/资料和部分提交历史。",
      "importance": "Skill 没有中心 package manager 或 registry，且由模型在运行时概率性选择加载；传统编译器/类型系统也不会验证 Skill 是否被正确选择。大量 Skill 通过复制文件夹传播，使其天然带有来源、派生、过期和恶意篡改问题，但此前缺少人口级数据基础。",
      "methodHighlights": "作者使用 GitHub code-search 与 REST API 的只读采集管线，通过文件大小分区绕过单查询 1,000 结果限制，最终收集全部 filename matches。数据按内容 hash 去重但保留所有 occurrence，并为代表项保存正文、front matter、folder siblings、仓库元数据和部分 commit history；作者账号做不可逆匿名化。",
      "keyFindings": "数据包含 3,797,117 个 SKILL.md occurrence，来自 282,200 个仓库和 195,841 个账号，按 hash 得到 1,877,981 个不同内容；约 50.5% 收集到的文件是逐字节复制。`artifact_siblings` 达 7,264,865 条，commit history 覆盖 458,548 个代表 Skill。论文还明确把‘复制后的 Skill 是否新增 command execution/network access’作为供应链研究问题。",
      "limitations": "GitHub Code Search 只覆盖默认分支、文件大小与活跃度满足索引条件的公开仓库，因此数据是下界；代表 Skill 的 folder/commit history 不一定等于其他复制项。论文当前主要是数据集论文，不直接给出恶意 Skill 比例或因果安全结论。",
      "inspiration": "论文直接结论：Agent Skill 已形成百万级、无中心 registry、靠复制扩散的软件制品生态。研究启发：可基于该数据集构建 Skill-SBOM 与 genealogy graph，检测 fork/copy 后新增脚本、网络访问、危险命令、license/provenance 变化和版本漂移，并与 SkillTrace/ElasticBack 一类攻击基准联动。",
      "valueJudgment": "非常值得直接下载数据并做研究。对 Skill 供应链安全而言，这是一个难得的现成大规模实验底座。",
      "priority": "A"
    },
    {
      "id": "catastrophic-remembering",
      "title": "Why Does CLAUDE.md Keep Growing? Catastrophic Remembering in Agentic Coding",
      "url": "https://arxiv.org/abs/2608.11095",
      "authorsAndInstitutions": "Kushal Chakrabarti；South Park Commons。机构来自论文 HTML 首页。",
      "qualitySignals": "作者与机构信号：中，South Park Commons 可可靠确认，但单作者团队在该方向的长期学术积累未进一步核验；版本动态：arXiv:2608.11095 v1，2026-08-11 16:00:55 UTC 提交；开源与数据：论文声明释放派生表与重建代码，但本轮未可靠定位独立官方仓库 URL。",
      "openSourceAndData": "论文明确说明会发布派生表与重建代码；官方仓库 URL 本轮未可靠查到。",
      "tags": ["Coding Agent","Prompt","CLAUDE.md","Memory","Behavioral Dependency","Software Engineering"],
      "summary": "提出‘灾难性记忆’现象：Agentic coding context 文件因为失去指令加入时的理由而几乎只增不减，并用显式 rationale comment 显著抑制膨胀。",
      "importance": "CLAUDE.md、AGENTS.md、copilot-instructions.md 已经是 Coding Agent 的长期行为配置，但删除一条旧指令存在回归风险；如果没人记得它为什么被加入，维护者会偏向继续追加而不是删除，最终导致 prompt/configuration debt。",
      "methodHighlights": "论文追踪 1,867 个公开仓库中的 1,801 个多版本 context 文件、299,440 次版本转移和 247,694 个 instruction lifetime，并用 competing-risk/hazard 分析区分 staleness、fragility 与 imperfect recall。随后反向构造 IFEval 可验证世界，使最优 prompt cover 已知，并比较无 comment、噪声 comment 与带 latent rationale comment 三种维护机制。",
      "keyFindings": "真实仓库中 instruction count 在生命周期内平均增长 +226%，每次 commit 净增加约 4.9 条指令，且删除 hazard 随年龄下降（log-hazard -0.032/commit）。受控实验中，带 rationale 的 prompt comments 将 excess instructions 从 +211.3% 降到 +1.4%，去除 99.3% excess；WildIFEval 设置下 instruction-following 最多提升 23.1%（11.6pp）。",
      "limitations": "研究覆盖公开 GitHub 的 Agent context 文件，未测非英语指令，也未证明同一机制直接适用于 system prompt 或 Skill 文件。WildIFEval 结果依赖 LLM judge，作者明确没有人类 ground truth；自动依据 comment 删除安全规则仍可能造成真实回归。",
      "inspiration": "论文直接结论：长期 Agent 配置的增长与‘理由 provenance’丢失有关，记录为什么加入一条规则能提高可删除性。研究启发：Prompt/Skill/Harness 每次变更应存 `rule + rationale + triggering failure + evidence + version`，类似 ADR；未来可以做 context-config debt detector 与安全规则的可撤销/过期管理。",
      "valueJudgment": "值得精读。它把长期 prompt 文件从‘上下文’重新定义为需要维护 provenance 的软件配置制品，对 Agent 配置供应链非常有启发。",
      "priority": "A"
    },
    {
      "id": "cursorrules-study",
      "title": "A Study of Cursorrules Files in GitHub Open Source Projects",
      "url": "https://arxiv.org/abs/2608.10622",
      "authorsAndInstitutions": "Shuang Sun、Jafar Akhoundali、Arina Kudriavtseva、Sengim Karayalçin、Olga Gadyatskaya；Leiden Institute of Advanced Computer Science, Leiden University。机构来自论文 HTML 首页。",
      "qualitySignals": "作者与机构信号：强，Leiden University/LIACS，且论文已发表于 ICSOFT 2026；版本动态：arXiv:2608.10622 v1，2026-08-11 08:08:49 UTC 提交；开源与数据：论文提及配套 repository/76 个属性，但本轮未可靠提取官方仓库 URL。",
      "openSourceAndData": "论文提供配套 repository 与数据属性说明，但本轮未可靠查到可直接核验的官方 URL。",
      "tags": ["Prompt","Coding Agent","Software Engineering","Security","Configuration","Supply-chain Security"],
      "summary": "对 12,110 个 GitHub `.cursorrules` 文件进行大规模实证分析，刻画 Coding Agent 静态规则文件的演化、维护和安全内容。",
      "importance": "静态 Agent prompt/config 文件正逐渐像代码配置一样进入仓库，但现有 prompt engineering 研究多关注对话 prompt。此类长期文件会影响所有后续 Agent 代码生成，因此其维护质量、安全规则覆盖和敏感信息泄漏都属于 AI 软件供应链的一部分。",
      "methodHighlights": "作者从 11,427 个 GitHub 仓库采集 12,110 个 `.cursorrules`，结合 commit/repository metadata 做定量分析，并随机抽取 65 个文件进行开放编码，形成 65-code codebook，专门分析工程实践、安全内容与潜在 security smells。",
      "keyFindings": "67.3% 文件创建后从未修改，95.8% 文件只有单一贡献者维护；安全相关 guidance 在编码实例中约占 4.4%，security smells 约占 1.5%。作者发现暴露本地路径、硬编码敏感参数、内部资源链接和相互矛盾规则等风险；`.cursorrules` 与后续 `.mdc` 格式在主题上具有连续性。",
      "limitations": "`.cursorrules` 已成为 legacy 格式，且样本大量来自小型、低活跃甚至 toy repositories，因此不能直接代表大型企业 Coding Agent 配置。安全 smell 是启发式风险模式，不等于真实漏洞或可利用攻击。",
      "inspiration": "论文直接结论：Coding Agent 静态规则文件的安全要求覆盖很低，并存在可观测的敏感信息/冲突 smell。研究启发：可建立 Prompt-Config Linter，对 CLAUDE.md、AGENTS.md、.mdc、skills front matter 做 secrets/path/internal URL、冲突规则、权限声明和 provenance 检查。",
      "valueJudgment": "值得阅读并转化为工程扫描规则；相较 Top 3，贡献更偏生态实证而非新的 Agent 算法或安全机制。",
      "priority": "B"
    },
    {
      "id": "one-recipe-many-harnesses",
      "title": "One Recipe, Many Harnesses: What Self-Evolution Encodes Across Languages and Models",
      "url": "https://arxiv.org/abs/2608.10178",
      "authorsAndInstitutions": "Siqi Yang、Qianlan Yang、Yu-Xiong Wang：University of Illinois Urbana-Champaign；Siqi Yang、Saurabh Pujar、Martin Hirzel：IBM。机构映射来自论文 PDF 首页。",
      "qualitySignals": "作者与机构信号：强，UIUC 与 IBM；版本动态：arXiv:2608.10178 v1，2026-08-10 19:45:45 UTC 提交并进入 2026-08-12 公开窗口；开源与数据：论文 HTML 明确给出官方 GitHub 代码入口。",
      "openSourceAndData": "官方代码：论文 HTML 首页明确提供 GitHub 链接；本轮网页工具未稳定解析具体仓库 URL。",
      "tags": ["Agent Harness","Self-evolution","Coding Agent","Model Version","Software Engineering","Behavioral Dependency"],
      "summary": "固定同一套 Harness 自演化配方，在 8 种编程语言 × 3 个模型上分析自演化 Harness 究竟编码了哪些通用纪律、模型补偿和生态特定知识。",
      "importance": "Harness 经常和模型一起变化，但排行榜很难区分收益来自模型、语言生态还是 scaffold。对供应链而言，如果 Harness 从模型 A/语言 X 直接复制到模型 B/语言 Y，其行为兼容性并没有保证。",
      "methodHighlights": "TRIAGE 将 Harness 拆为 system prompt、workflow hooks、lessons memory、tool implementations 四个可版本化 slot；每次修改必须由 typed failure signal 触发并写成可证伪 contract。实验固定 evolution recipe，在 Multi-SWE-Bench 的 8 种语言和 Claude Haiku 4.5、GPT-5-mini、DeepSeek-V4-Flash 三个模型上运行，并留出独立 test split。",
      "keyFindings": "Evolved Harness 在 24 个 language×model cell 中大多优于 minimal seed，并在 14/24 cell 匹配或超过 mini-SWE-agent。20%–40% Harness 内容绑定具体语言生态；跨语言 transplant 在 20 个 ordered pair 中 18 个有正收益，但 14/20 仍低于 native evolution；通用 distillation 在 Java/C++/TypeScript 仅恢复 48%–68% native gain。",
      "limitations": "只研究 code-fixing/Multi-SWE-Bench，且 skills、sub-agents、多 Agent orchestration 明确不在范围内。task policy 与 outer-loop driver 使用同一底层模型，模型能力和 evolution-driver 能力仍有耦合；没有直接做恶意 Harness 或供应链攻击实验。",
      "inspiration": "论文直接结论：Harness 存在可迁移的通用纪律，但也有显著的 model/language ecosystem margin。研究启发：Harness 发布应携带 compatibility matrix 和适用环境声明，任何模型、工具链或语言生态升级都应触发行为回归，而不能把 Harness 当作无条件可移植配置。",
      "valueJudgment": "值得精读，尤其适合建立 `model × harness × toolchain` 兼容矩阵和 Harness 版本治理。",
      "priority": "B"
    },
    {
      "id": "persistent-recursive-worlds-v2",
      "title": "Persistent Recursive Worlds Enable Autonomous Software Evolution",
      "url": "https://arxiv.org/abs/2608.10450",
      "authorsAndInstitutions": "Beichen Huang、Zhenyu Liang、Bowen Zheng、Ran Cheng；Department of Data Science and Artificial Intelligence, The Hong Kong Polytechnic University。机构来自论文 PDF 首页。",
      "qualitySignals": "作者与机构信号：强，香港理工大学；版本动态：v1 于 2026-08-11 04:04:00 UTC 提交，v2 于 2026-08-12 08:44:05 UTC 更新，属于今日窗口内的 v2 更新；开源与数据：官方项目页 `genesis.evox.group`，提供系统与实验材料入口。",
      "openSourceAndData": [{"label":"EvoX Genesis 项目页","url":"https://genesis.evox.group/","note":"论文首页官方项目页"}],
      "tags": ["Coding Agent","Multi-agent","Software Evolution","Provenance","Agent Harness","Model Version"],
      "summary": "提出‘persistent recursive world’：不让单个 Agent 永久存活，而让被接受的软件版本、路径上下文、约束和验证历史持续存在，支持跨 Agent 甚至跨模型长期演化。",
      "importance": "真实软件项目寿命远长于单个 Agent session。传统方案强调 persistent agent/memory，但长期工程更需要保证 accepted code、test、constraints 与 lineage 连续，否则 agent replacement、模型升级或多 Agent 委派会丢失历史约束。",
      "methodHighlights": "Genesis 把每个局部世界定位为 accepted version + repository path，短生命周期 Agent 只提出局部 change；recursive delegation 在路径层级展开，parent 根据测试、约束和集成证据决定 accept/reject，只有 accepted consequence 才推进持久版本。系统分别评估从零构造、跨模型继续开发和科学软件重实现。",
      "keyFindings": "DeepSeek V4 Flash 在约 123.4 小时、1,019 个 agent episode、US$44.38 模型 token 成本下，从零构建约 248,989 行的 Rust C compiler，通过完整 c-testsuite 及大多数 LLVM/Csmith 测试；GLM 5.2 生成的 compiler world 在重复 Agent 替换后保持完整测试表现。另将 13 个 MESA 模块从 100k+ Fortran 行重实现为近 90k Rust 行，六个 workload 的 median speedup 为 1.55–6.87×。",
      "limitations": "论文证明的是报告环境下的长程工程能力，不隔离每种 persistent record/recursive mechanism 的因果贡献；作者明确指出尚未做‘相同代码、不同非代码开发记录’的因果对照。成本统计主要是 model-token，不代表完整基础设施成本；真实生产权限/供应链攻击也未覆盖。",
      "inspiration": "论文直接结论：长期软件演化可以把‘项目版本’而非‘长期 Agent’作为连续性载体。研究启发：安全上可以把 accepted version、test evidence、dependency lock、Skill/Harness/模型版本和 delegated contribution provenance 绑定为不可变 lineage；Agent/模型替换只允许在同一可验证 world 上继续，而不是重新继承未经审计的自由文本 memory。",
      "valueJudgment": "值得系统阅读。对长期 Coding Agent、跨模型替换和软件供应链 provenance 有较强系统设计价值，但直接安全贡献弱于前三篇。",
      "priority": "B"
    }
  ]
});
