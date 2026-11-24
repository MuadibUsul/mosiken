// 简体中文文案 —— 统一对应美国怀俄明州法定实体 Mosiken LLC（中文品牌名：衍川）。
// 按中文读者的语感写，中英文与数字之间留半角空格。

export default {
  lang: 'zh',
  htmlLang: 'zh-CN',
  ogLocale: 'zh_CN',
  ogImage: 'og-zh.png',
  ogImageAlt: '衍川 · Mosiken LLC — 下一步，造出来。',
  brand: '衍川',
  legalName: 'Mosiken LLC',
  commentTitle: 'MOSIKEN LLC（衍川） · mosiken.org',
  comment: [],

  ui: {
    skip: '跳到正文',
    homeLabel: '衍川首页',
    navLabel: '主导航',
    footerNavLabel: '页脚导航',
    home: '首页',
    products: '产品',
    about: '关于',
    contact: '联系',
    privacy: '隐私政策',
    terms: '服务条款',
    switchLang: 'English',
    switchLangLabel: 'Switch to English',
    menu: '菜单',
    theme: '切换主题',
    place: '美国怀俄明州注册（Mosiken LLC）',
    placeShort: 'Mosiken LLC · 美国怀俄明州注册',
    localTime: '怀俄明时间',
    clockFallback: '北美山区时间',
    site: '导航',
    legal: '法律条款',
    rights: '© 2026 Mosiken LLC（中文品牌：衍川）保留所有权利',
    top: '回到顶部',
    scroll: '向下',
    copy: '复制邮箱',
    keywords: '关键词',
    jumpLabel: '本页产品',
  },

  connect: {
    label: '联系',
    title: '想聊点什么？',
    lead: '产品支持、商业授权、合作洽谈或合规咨询，欢迎致信 Mosiken LLC：',
  },

  products: {
    veynod: {
      category: 'AI 智能体协作与编排',
      short: '持续开发中',
      full: '公开预览 · 持续开发中',
      lead: 'Veynod 是一个让 AI 智能体组队协作、共同推进软件与知识工作的云端与桌面环境。',
      body: '由 Mosiken LLC 旗下独立产品站点（veynod.com）承载运营，把任务、共享上下文、智能体执行、评审环节和人的决策串进同一条工作流，正式版将面向开发者与团队提供 SaaS 订阅服务。',
      tags: ['多智能体系统', 'SaaS 平台', '工作流编排', '人工把关'],
      links: ['veynod.com', '代码仓库'],
      beats: ['任务', '智能体执行', '评审', '人工决策'],
      alt: '动画示意：任务在共享看板上依次经过智能体执行和评审，只有到最后决策时才需要人来拍板。',
    },
    ancs: {
      aka: 'AI 原生创作工作室',
      category: 'AI 原生视频创作与剪辑',
      short: '开发中',
      full: '开发中',
      lead: 'ANCS 在探索一种更直接的视频创作与剪辑方式。',
      body: '它把自然语言指挥、即时响应的语音交互、画面和时间轴上的精准定位、非破坏性编辑以及多模型协作揉在一起。创作者只要说出想改哪里，原始素材和最终成片始终由自己掌控。',
      tags: ['AI 视频剪辑', '创作工作流', '多模态交互', '非破坏性编辑'],
      links: ['开发仓库'],
      beats: ['用文字或语音下指令', '在画面和时间轴上定位', '非破坏性修改'],
      alt: '动画示意：一句文字或语音指令在画面和时间轴上找到目标，修改作为单独的图层叠加上去，原始素材保持完整。',
    },
    serendipity: {
      category: 'AI 原生社交发现',
      short: '研究与设计中',
      full: '研究与产品设计阶段',
      lead: 'Serendipity 是一款探索中的移动社交应用，希望让人与人彼此了解得更深，在现实里相遇得更用心。',
      body: '它用自然对话代替填表完成引导，为每个人建立偏好模型，再由 AI 智能体协助匹配，帮你找到真正合拍的人。选择权、隐私和自主权始终留在用户自己手里。',
      tags: ['移动应用', '对话式 AI', '智能体辅助匹配', '人与人的连接'],
      links: [],
      beats: ['对话式引导', '偏好建模', '智能体辅助匹配', '由你决定'],
      alt: '动画示意：一段对话变成私密的偏好模型，智能体拿它和其他人比对，建议的连接要等本人点头才会成立。',
    },
    sheetos: {
      aka: 'SheetMetal OS',
      category: '钣金工程与加工软件',
      short: '已上线',
      full: '已上线 · 商业桌面与移动软件',
      lead: 'SheetOS 覆盖钣金工程的整条链路：从现场测量、参数计算，到展开放样和可直接下料的图纸。',
      body: '专为真实加工现场打造，输入尺寸即可生成展开放样排版与标准 DXF 文件。Android 与 Windows 版本已通过 Mosiken LLC 旗下产品门户（sushiheng.com）上线提供，iOS 版本正准备上架 Apple App Store。',
      tags: ['钣金 CAD', '参数化几何', '桌面与移动应用', 'DXF 导出'],
      links: ['sushiheng.com'],
      beats: ['现场测量', '参数计算', '展开放样', '导出 DXF'],
      alt: '动画示意：测量一个圆台，算出并展开它的放样图，再把轮廓导出为 DXF 图纸。把指针移到图上可以改变尺寸。',
    },
  },

  home: {
    title: '衍川 · Mosiken LLC | AI 原生软件与数字产品研发',
    description: 'Mosiken LLC（中文品牌：衍川）是一家注册于美国怀俄明州的独立软件公司，研发 AI 原生 SaaS 平台、创作工具、移动应用与专业工程软件。',
    eyebrow: 'Mosiken LLC（衍川） · 美国怀俄明州注册独立软件公司',
    hero: [[['下一步，', false]], [['造出来。', true]]],
    heroLabel: '下一步，造出来。',
    sub: 'Mosiken LLC（中文品牌：衍川）面向美国及全球用户打造原创软件产品——横跨 AI 智能体协作、智能创作工具、移动应用与精密工程软件。',
    primary: '看看我们的产品',
    secondary: '联系我们',
    introLabel: '简介',
    introTitle: '技术不该只是看起来厉害。',
    intro: '在 Mosiken LLC（衍川），我们把前沿想法打磨成专注、可靠的商业级软件产品。工作横跨 AI 原生交互、智能协同、数字创作，以及解决真实工程任务的专业工具。',
    portfolioLabel: '产品',
    portfolioTitle: '四个方向，同一套产品思维。',
    portfolio: '部分产品已正式商用上线，其余产品正处于研发或设计阶段。它们都从同一个问题出发：软件还能把什么事真正变好？',
    missionLabel: '使命',
    mission: '把有野心的想法，做成好用的软件，让个人和团队能创造、能协作、能成事。',
    aboutLink: '关于 Mosiken LLC',
  },

  productsPage: {
    title: '产品 | Veynod、ANCS、Serendipity 与 SheetOS | Mosiken LLC（衍川）',
    description: 'Veynod、ANCS、Serendipity 与 SheetOS：Mosiken LLC（衍川）旗下的四款原创软件产品，覆盖 Web、桌面端与移动端。',
    label: '产品',
    note: '以下全部产品均由 Mosiken LLC 自研并运营，分发渠道涵盖官网直订 SaaS、桌面软件授权、Google Play 以及即将上线的 Apple App Store。',
  },

  about: {
    title: '关于 Mosiken LLC（衍川） | 独立软件公司',
    description: 'Mosiken LLC（中文品牌：衍川）是一家依法注册于美国怀俄明州的独立软件公司，由创始人 Chen Su 全资持有并管理。',
    label: '关于',
    heading: '想得独立，做得扎实。',
    lead: 'Mosiken LLC（中文品牌：衍川）从早期构想到商业发行，自研原创软件产品。把不同领域的产品串在一起的，是我们始终坚持的三件事：用心的交互体验、扎实的工程底座，以及新技术的实际价值。',
    companyLabel: '公司主体',
    company: [
      '<strong>Mosiken LLC（中文品牌名：衍川）是一家依法设立并注册于美国怀俄明州（State of Wyoming, USA）的独立软件有限责任公司，由创始人 Chen Su 全资持有并担任管理成员。</strong>我们研究、设计并开发自有知识产权的软件产品，覆盖 AI 智能体协作、智能创作工作流、移动社交应用与专业钣金工程软件。',
      '我们专注于第一方原创软件研发与长线运营，而非转售或简单套壳第三方工具。产品形态横跨云端 SaaS、桌面端（Windows 与 macOS）以及移动端（iOS 与 Android）。',
      'Mosiken LLC 通过线上软件授权、SaaS 订阅以及 Apple App Store、Google Play 等全球应用商店，面向美国及全球个人专业用户与团队提供数字产品服务。',
    ],
    portfolioLink: '看看我们的产品',
    missionLabel: '使命',
    visionLabel: '愿景',
    vision: '我们期待这样的未来：智能软件顺着人的意图工作，把复杂的事变简单，为日常生活和专业工作打开新的可能。',
    buildLabel: '我们怎么做',
    principles: [
      ['产品优先', '从一个真实重要的用户问题出发，而不是从一项时髦的技术概念出发。'],
      ['AI 原生', '只在能从根本上改善体验的地方引入智能系统。'],
      ['工程纪律', '看重可靠的底座、清晰的流程和可验证的交付质量。'],
      ['务实迭代', '大胆探索，严谨验证，清楚区分已上线商业产品与早期研究概念。'],
    ],
    factsLabel: '公司登记概览',
    facts: {
      company: '法定主体名称',
      companyValue: 'Mosiken LLC（中文品牌：衍川）',
      founder: '创始人与管理成员',
      founderValue: 'Chen Su',
      hq: '注册司法管辖区',
      hqValue: '美国怀俄明州（州备案号：2026-002137028）',
      regOffice: '法定注册地址',
      regOfficeValue: '30 N Gould St Ste R, Sheridan, WY 82801, USA',
      industry: '所属行业',
      industryValue: '软件发行、SaaS 平台与移动应用开发',
      focus: '分发渠道',
      focusValue: 'Web SaaS 订阅、桌面授权、Apple App Store 与 Google Play',
      portfolio: '旗下产品',
      contact: '官方联系邮箱',
    },
  },

  contact: {
    title: '联系我们 | Mosiken LLC（衍川）',
    description: '产品支持、商业合作或法律合规事宜，欢迎致信 Mosiken LLC 官方邮箱 contact@mosiken.org。',
    topicsLabel: '写封邮件，聊聊',
    topics: [
      ['Product & Customer Support', '产品与客户支持'],
      ['Commercial Licensing & Partnerships', '商业授权与合作洽谈'],
      ['Legal & Compliance Inquiry', '法律、隐私与合规事务'],
    ],
    whereLabel: '法定主体信息',
    facts: {
      company: '法定主体名称',
      companyValue: 'Mosiken LLC（中文品牌：衍川）',
      founder: '创始人与管理成员',
      founderValue: 'Chen Su',
      location: '注册司法管辖区',
      locationValue: '美国怀俄明州（州备案号：2026-002137028）',
      regOffice: '法定注册地址',
      regOfficeValue: '30 N Gould St Ste R, Sheridan, WY 82801, USA',
      time: '怀俄明时间',
      web: '官方网站',
    },
  },

  privacyPage: {
    title: '隐私政策 | Mosiken LLC（衍川）',
    description: 'Mosiken LLC 旗下网站、SaaS 平台、桌面软件与移动应用的隐私政策。',
    label: '法律条款 · 隐私',
    heading: '隐私政策',
    lead: '生效日期：2026 年 11 月 18 日 · 最近更新：2026 年 11 月 24 日。本隐私政策说明 Mosiken LLC 如何收集、使用与保护与我们网站及软件产品相关的信息。',
    sections: [
      [
        '1. 数据控制者与适用范围',
        [
          '<strong>Mosiken LLC</strong>（中文品牌：衍川，以下简称“我们”）是一家依据美国怀俄明州法律设立的有限责任公司（州备案号：2026-002137028；法定注册地址：30 N Gould St Ste R, Sheridan, WY 82801, USA），系官方网站 <strong>mosiken.org</strong>、产品独立域名（含 <strong>veynod.com</strong>、<strong>sushiheng.com</strong>）以及旗下桌面端、Web 端与移动端软件产品（含 <strong>Veynod</strong>、<strong>ANCS</strong>、<strong>Serendipity</strong> 与 <strong>SheetOS</strong>，统称“本服务”）的运营主体与数据控制者。',
          '如有任何隐私相关问题或数据权利请求，请直接发送邮件至 <a class="link" href="mailto:contact@mosiken.org">contact@mosiken.org</a>。',
        ],
      ],
      [
        '2. 我们收集的信息类型',
        [
          '<strong>账户与联系信息：</strong>当您注册账户、购买软件授权或订阅、或通过电子邮件联系我们时，我们会收集您的姓名、电子邮箱地址、账户偏好及往来通信记录。',
          '<strong>账单与交易元数据：</strong>付费订阅、软件许可及应用内购买均通过符合 PCI-DSS 标准的第三方支付与分发平台（如 Stripe、Apple App Store 与 Google Play）处理。Mosiken LLC 仅接收支付状态、订阅档位及账单国家等确认信息，<strong>绝不会</strong>在自有服务器上收集或存储您的完整银行卡号或支付凭证。',
          '<strong>工作区、工程参数与项目内容：</strong>根据您所使用的具体产品，我们仅在提供对应功能所需的范围内处理您主动输入的数据（例如 SheetOS 中的钣金几何尺寸参数，其中核心展开计算主要在本地设备完成；或 Veynod 中的任务协同上下文）。',
          '<strong>技术与诊断日志：</strong>为保障服务安全与稳定运行，我们会收集最小必要的访问与崩溃诊断信息（如操作系统或浏览器版本、用于安全限流的 IP 地址及错误日志）。',
        ],
      ],
      [
        '3. 信息使用方式与承诺',
        [
          '我们仅将所收集的信息用于：（a）交付、维护、验证并持续改进软件产品功能；（b）履行软件授权、订阅服务与客户支持；（c）发送交易收据、安全通知与重要条款更新；（d）防范欺诈、滥用或未授权访问。',
          '<strong>绝不出售个人数据：</strong>Mosiken LLC 绝不向数据经纪商或第三方广告商出售、出租或交易您的个人信息。未经您的明确授权同意，您的私有工程图纸与项目内容不会用于训练公开基础模型。',
        ],
      ],
      [
        '4. 基础设施与第三方处理方',
        [
          '我们使用受严格保密与数据处理协议约束的知名基础设施与服务商（包括提供网络加速与安全防护的 Cloudflare、位于美国的云托管服务商，以及 Stripe、Apple、Google 等支付与应用分发平台）。相关数据可能会在美国及上述基础设施服务商运营所在的司法管辖区进行处理与存储。',
        ],
      ],
      [
        '5. 数据留存与安全保护',
        [
          '我们仅在提供有效服务、履行美国税务与会计合规义务或解决争议所必需的期限内保留相关数据，并采用传输层 TLS 加密、访问权限控制及最小权限原则保护数据安全。',
        ],
      ],
      [
        '6. 您的隐私权利',
        [
          '根据您所在地区的适用法律（包括美国各州隐私法规、GDPR 等），您有权申请查询、更正、导出或删除您的个人信息。请使用与您账户关联的邮箱发送请求至 <a class="link" href="mailto:contact@mosiken.org">contact@mosiken.org</a>，我们将在核实身份后的 30 日内予以回复。',
        ],
      ],
      [
        '7. 未成年人保护与政策更新',
        [
          '本服务面向专业人士及成年用户，不针对 13 周岁（或适用法律规定的更高年龄）以下儿童。若本隐私政策发生重大变更，我们将在本页面发布最新版本并更新顶部修订日期。',
        ],
      ],
    ],
  },

  termsPage: {
    title: '服务条款 | Mosiken LLC（衍川）',
    description: '管辖 Mosiken LLC 旗下网站、SaaS 订阅、桌面应用与移动软件使用的服务条款。',
    label: '法律条款 · 服务协议',
    heading: '服务条款',
    lead: '生效日期：2026 年 11 月 18 日 · 最近更新：2026 年 11 月 24 日。本服务条款构成您与 Mosiken LLC 之间具有法律约束力的协议。',
    sections: [
      [
        '1. 签约主体与条款接受',
        [
          '本服务条款（以下简称“本条款”）管辖您对 <strong>Mosiken LLC</strong>（美国怀俄明州有限责任公司，法定注册地址：30 N Gould St Ste R, Sheridan, WY 82801, USA）所运营网站（含 <strong>mosiken.org</strong>、<strong>veynod.com</strong>、<strong>sushiheng.com</strong>）、云服务、桌面软件及移动应用的访问与使用。访问或使用本服务即表示您同意受本条款约束。',
        ],
      ],
      [
        '2. 软件许可与账户责任',
        [
          '在您遵守本条款并按约支付适用费用的前提下，Mosiken LLC 授予您一项有限的、非排他的、不可转让且可撤销的许可，以便您在个人或内部业务工作流中使用我们的软件产品与 SaaS 平台。',
          '您须妥善保管账户凭据并对账户下的活动负责。除开源组件各自许可证另有明确允许外，您不得对我们的专有软件进行反向工程、二次分发、转授权或绕过技术授权校验。',
        ],
      ],
      [
        '3. 订阅计费、应用商店购买与退款政策',
        [
          '<strong>官网与 SaaS 直接计费：</strong>直接向 Mosiken LLC 购买的软件许可与订阅以美元（USD）或页面所示币种通过授权支付服务商结算。周期性订阅将在每个计费周期届满时自动续订，您可随时在续订前通过账户设置或致信 <a class="link" href="mailto:contact@mosiken.org">contact@mosiken.org</a> 取消续订。',
          '<strong>Apple App Store 与 Google Play 购买：</strong>若您通过 Apple App Store 或 Google Play 下载或订阅 Mosiken LLC 的移动应用，其扣款、续订、取消及退款规则适用 Apple 或 Google 平台各自的商店条款。',
          '<strong>退款保障：</strong>对于官网直接购买的订单，若软件出现实质性功能故障且我们在首次购买后 14 日内无法协助解决，您可发邮件至 <a class="link" href="mailto:contact@mosiken.org">contact@mosiken.org</a> 申请全额退款。',
        ],
      ],
      [
        '4. 合规使用规范',
        [
          '您承诺不利用 Mosiken LLC 的服务从事任何违反适用法律法规、侵犯第三方知识产权、传播恶意代码、滥用接口或算力配额，或生成违法、欺诈及有害内容的行为。',
        ],
      ],
      [
        '5. 知识产权与用户成果归属',
        [
          'Mosiken LLC 拥有本服务相关软件代码、界面设计、文档及商标（含 Mosiken、衍川、Veynod、ANCS、Serendipity 与 SheetOS）的全部知识产权。您在使用本服务过程中输入的原始数据、素材以及导出的 DXF 图纸或项目成果，其权利归您所有。',
        ],
      ],
      [
        '6. 预览版说明与工程制造免责声明',
        [
          '<strong>开发中与研究阶段产品：</strong>标注为“开发中”、“预览”或“研究与设计”的产品或功能按“现状”提供，可能随时调整或下线。',
          '<strong>钣金工程复核义务（SheetOS）：</strong>SheetOS 系面向专业技术人员与工程师的计算与放样辅助工具。鉴于板材厚度、折弯系数、切割割缝补偿及现场设备存在差异，<strong>您必须在下料切割、折弯焊接或投产前独立复核全部尺寸、公差与 DXF 图纸。</strong>',
        ],
      ],
      [
        '7. 免责声明与责任限制',
        [
          '在适用法律允许的最大范围内，本服务按“现状”及“可用”状态提供，不附带任何明示或暗示担保。无论何种情形，Mosiken LLC 及其管理成员均不对任何间接损失、附带损失、停工或材料报废损失承担责任；我们承担的累计赔偿责任上限不超过 100 美元（USD $100）或您在索赔前十二（12）个月内向 Mosiken LLC 实际支付的服务费用（以较高者为准）。',
        ],
      ],
      [
        '8. 适用法律与联系方式',
        [
          '本条款受<strong>美国怀俄明州（State of Wyoming, USA）</strong>法律管辖并据其解释（不含冲突法规则）。任何法律通知或客户咨询请发送至 <a class="link" href="mailto:contact@mosiken.org">contact@mosiken.org</a>。',
        ],
      ],
    ],
  },

  lost: {
    title: '页面不存在 | Mosiken LLC（衍川）',
    description: '海图上没有这一页。',
    label: '404',
    heading: '这里没有故事。',
    lead: '海图上没有这一页。它可能搬走了，也可能从来就不存在。',
    home: '回到首页',
    products: '看看产品',
  },

  social: {
    title: '衍川 · Mosiken LLC — 下一步，造出来。',
    description: 'Mosiken LLC（中文品牌：衍川）原创软件产品，横跨 AI 协作、创意技术、移动应用与工程软件。',
  },

  org: {
    slogan: '下一步，造出来。',
    description: 'Mosiken LLC（中文品牌：衍川）是一家注册于美国怀俄明州的独立软件公司，由 Chen Su 创立，研发 AI 原生平台、创作工具、移动应用与专业工程软件。',
  },
};
