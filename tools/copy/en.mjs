// English copy. Source: the Mosiken company profile and brand content kit.

export default {
  lang: 'en',
  htmlLang: 'en',
  ogLocale: 'en_US',
  ogImage: 'og.png',
  ogImageAlt: 'Mosiken — Build What Comes Next.',
  brand: 'Mosiken',
  legalName: 'Mosiken LLC',
  commentTitle: 'MOSIKEN · mosiken.org',
  comment: ["He'ershingenmosiken is not one place. It is two.", `The second one: 67°44'45"N 12°45'19"E.`],

  ui: {
    skip: 'Skip to content',
    homeLabel: 'Mosiken home',
    navLabel: 'Primary',
    footerNavLabel: 'Footer',
    home: 'Home',
    products: 'Products',
    about: 'About',
    contact: 'Contact',
    privacy: 'Privacy',
    terms: 'Terms',
    menu: 'Menu',
    theme: 'Switch theme',
    place: 'Registered in Wyoming, USA',
    placeShort: 'Registered in Wyoming, USA',
    localTime: 'Local time',
    clockFallback: 'Mountain Time',
    site: 'Site',
    rights: '© 2026 Mosiken LLC. All rights reserved.',
    top: 'Back to top',
    scroll: 'Scroll',
    copy: 'Copy address',
    keywords: 'Keywords',
    jumpLabel: 'Products on this page',
  },

  connect: {
    label: 'Contact',
    title: 'Have a reason to connect?',
    lead: 'For product inquiries, partnerships, or general correspondence, contact us at',
  },

  products: {
    veynod: {
      category: 'AI-Agent Collaboration &amp; Orchestration',
      short: 'Active development',
      full: 'Public website · Active product development',
      lead: 'Veynod provides a shared environment for teams of AI agents to coordinate work.',
      body: 'It brings tasks, shared project context, agent execution, review steps, and human decisions into one connected workflow. The goal is to make multi-agent development more structured, observable, and manageable without forcing people to supervise every individual step.',
      tags: ['Multi-Agent Systems', 'Agent Coordination', 'Workflow Orchestration', 'Human Oversight'],
      links: ['veynod.com', 'Repository'],
      beats: ['Tasks', 'Agent execution', 'Review', 'Human decision'],
      alt: 'Animated diagram: tasks cross a shared board from agent execution to review, and a person is called on only at the final decision.',
    },
    ancs: {
      aka: 'AI Native Creator Studio',
      category: 'AI-Native Video Creation &amp; Editing',
      short: 'In development',
      full: 'In development',
      lead: 'ANCS explores a more direct way to make and edit video.',
      body: 'Its design combines natural-language direction, responsive voice interaction, precise visual and timeline targeting, non-destructive editing, and multi-model workflows. The objective is to let creators express what they want to change while retaining control over source media and the final result.',
      tags: ['AI Video Editing', 'Creative Workflows', 'Multimodal Interaction', 'Non-Destructive Editing'],
      links: ['Development repository'],
      beats: ['Direction in words or voice', 'Visual and timeline targeting', 'Non-destructive edit'],
      alt: 'Animated diagram: a spoken or typed instruction finds its target in the frame and on the timeline, and the edit is applied as a separate layer while the source media stays whole.',
    },
    serendipity: {
      category: 'AI-Native Social Discovery',
      short: 'Research &amp; design',
      full: 'Research and product design',
      lead: 'Serendipity is an exploratory social product built around deeper understanding and more intentional real-world connections.',
      body: 'Its concept uses conversational onboarding, individual preference modeling, and AI-agent-assisted matching to help people discover compatible connections while preserving user choice, privacy, and autonomy.',
      tags: ['Social Discovery', 'Conversational AI', 'Agent-Assisted Matching', 'Human Connection'],
      links: [],
      beats: ['Conversational onboarding', 'Preference modeling', 'Agent-assisted matching', 'Your choice'],
      alt: 'Animated diagram: a conversation becomes a private preference model, an agent compares it with others, and a suggested connection waits for the person to choose.',
    },
    sheetos: {
      aka: 'SheetMetal OS',
      category: 'Engineering &amp; Fabrication Software',
      short: 'Available',
      full: 'Available · Ongoing product evolution',
      lead: 'SheetOS supports sheet-metal engineering workflows, from field measurements and parametric calculations to unfolded geometry and production-ready drawings.',
      body: 'Built for practical fabrication scenarios, the software helps users convert dimensional inputs into usable layouts and DXF output for downstream manufacturing processes. Android and Windows applications are available, with iOS planned for the Apple App Store.',
      tags: ['Sheet-Metal Design', 'Parametric Geometry', 'Fabrication', 'DXF Export'],
      links: ['sushiheng.com'],
      beats: ['Field measurements', 'Parametric calculation', 'Unfolded geometry', 'DXF output'],
      alt: 'Animated diagram: a cone is measured, its flat pattern is calculated and unfolded, and the outline is handed over as a DXF drawing. Move the pointer over it to change the dimensions.',
    },
  },

  home: {
    title: 'Mosiken | AI-Native Software &amp; Digital Product Development',
    description: 'Mosiken LLC is a software company registered in Wyoming, USA, developing AI-native platforms, creative tools, social applications, and specialized engineering software. Explore our products.',
    eyebrow: 'Independent software company · Registered in Wyoming, USA',
    // [word, accent] — one line per entry
    hero: [[['Build', false]], [['What', false], ['Comes', false]], [['Next.', true]]],
    heroLabel: 'Build What Comes Next.',
    sub: 'We create original software for a changing world — from AI-agent teamwork and intelligent creative tools to meaningful digital experiences and precision engineering workflows.',
    primary: 'Explore Our Products',
    secondary: 'Contact Mosiken',
    introLabel: 'Introduction',
    introTitle: 'Technology should do more than look impressive.',
    intro: 'At Mosiken, we turn emerging ideas into focused, useful products. Our work spans AI-native interaction, intelligent coordination, digital creativity, and specialized tools built for real tasks.',
    portfolioLabel: 'Portfolio',
    portfolioTitle: 'Four directions. One product mindset.',
    portfolio: 'Some of our products are available today. Others are actively being developed or explored. Each starts with the same question: what could software make meaningfully better?',
    missionLabel: 'Mission',
    mission: 'To turn ambitious ideas into useful software that expands what individuals and teams can create, coordinate, and accomplish.',
    aboutLink: 'About Mosiken',
  },

  productsPage: {
    title: 'Products | Veynod, ANCS, Serendipity &amp; SheetOS | Mosiken',
    description: 'Veynod, ANCS, Serendipity, and SheetOS: four original software products from Mosiken LLC, each labeled with the stage it is at today.',
    label: 'Products',
    note: 'Product maturity varies. Each product is labeled with the stage it is at today.',
  },

  about: {
    title: 'About Mosiken | Independent Software Company',
    description: 'Mosiken LLC is an independent software company registered in Wyoming, USA. We research, design, and develop original digital products that make complex technology more useful and accessible.',
    label: 'About',
    heading: 'Independent thinking. Purposeful engineering.',
    lead: 'Mosiken develops original software products from concept to implementation. We work across multiple disciplines because important problems rarely fit into a single category. What connects our products is a focus on thoughtful user experiences, robust software foundations, and the practical value of new technology.',
    companyLabel: 'Company',
    company: [
      '<strong>Mosiken LLC is an independent software company registered in Wyoming, USA.</strong> We research, design, and develop original digital products that make complex technology more useful and accessible. Our portfolio spans AI-agent collaboration, intelligent creative workflows, AI-native social experiences, and specialized engineering tools.',
      'Our focus is on developing original products rather than simply packaging existing tools. We explore emerging interaction models, design systems around the work people actually need to accomplish, and turn promising ideas into usable software through iterative engineering.',
      'We combine product thinking with hands-on software engineering, moving from early concepts and experimentation to commercial desktop, web, and mobile applications.',
    ],
    portfolioLink: 'See the portfolio',
    missionLabel: 'Mission',
    visionLabel: 'Vision',
    vision: 'A future where intelligent software adapts to human intent, simplifies complex work, and opens up new possibilities for everyday life and professional practice.',
    buildLabel: 'How we build',
    principles: [
      ['Product-first thinking', 'Start with an important user problem, not a fashionable technology.'],
      ['AI-native design', 'Use intelligent systems where they fundamentally improve the experience.'],
      ['Engineering discipline', 'Favor reliable foundations, clear workflows, and measurable progress.'],
      ['Practical experimentation', 'Explore boldly, test assumptions, and distinguish working products from research concepts.'],
    ],
    factsLabel: 'At a glance',
    facts: {
      company: 'Company',
      founder: 'Founder',
      founderValue: 'Chen Su',
      hq: 'Registration',
      industry: 'Industry',
      industryValue: 'Software Development &amp; Digital Products',
      focus: 'Focus',
      focusValue: 'Original software products, AI-native applications, and product research and development',
      portfolio: 'Portfolio',
      contact: 'Contact',
    },
  },

  contact: {
    title: 'Contact | Mosiken',
    description: 'For product inquiries, partnerships, or general correspondence, contact Mosiken LLC at contact@mosiken.org.',
    topicsLabel: 'Start an email about',
    topics: [
      ['Product inquiry', 'Product inquiries'],
      ['Partnership', 'Partnerships'],
      ['General correspondence', 'General correspondence'],
    ],
    whereLabel: 'Registration',
    facts: { company: 'Company', founder: 'Founder', founderValue: 'Chen Su', location: 'Registration', time: 'Local time', web: 'Website' },
  },

  privacyPage: {
    title: 'Privacy Policy | Mosiken',
    description: 'Privacy Policy governing websites, SaaS platforms, desktop software, and mobile applications operated by Mosiken LLC.',
    label: 'Privacy',
    heading: 'Privacy Policy',
    lead: 'Effective November 18, 2026. This policy explains how Mosiken LLC collects, uses, and protects information across our websites and software products.',
    sections: [
      [
        'Controller &amp; Scope',
        [
          '<strong>Mosiken LLC</strong> (Wyoming Filing ID: 2026-002137028; Registered Office: 30 N Gould St Ste R, Sheridan, WY 82801, USA) operates <strong>mosiken.org</strong>, our dedicated product domains (including <strong>veynod.com</strong> and <strong>sushiheng.com</strong>), and our desktop, web, and mobile applications (<strong>Veynod</strong>, <strong>ANCS</strong>, <strong>Serendipity</strong>, and <strong>SheetOS</strong>).',
          'For privacy inquiries or data requests, contact us at <a class="link" href="mailto:contact@mosiken.org">contact@mosiken.org</a>.',
        ],
      ],
      [
        'Information We Collect',
        [
          '<strong>Account &amp; Contact Data:</strong> When you create an account, purchase a license or subscription, or write to us, we collect your name, email address, account settings, and correspondence.',
          '<strong>Billing Metadata:</strong> Purchases and subscriptions are processed by PCI-DSS compliant providers such as Stripe, the Apple App Store, and Google Play. Mosiken LLC receives payment confirmation and plan status, and never stores full payment card numbers on our servers.',
          '<strong>Product Inputs &amp; Diagnostics:</strong> We process project parameters, CAD dimensions, and workflow inputs solely to deliver requested software features, alongside minimal diagnostic and security logs.',
        ],
      ],
      [
        'Use &amp; Data Protection',
        [
          'We use information solely to operate, maintain, secure, and improve our software, fulfill subscriptions and support requests, and send transactional notices.',
          '<strong>No Sale of Personal Data:</strong> Mosiken LLC does not sell or rent personal data to third parties or data brokers. Private project files and engineering drawings are never used to train public models without explicit opt-in consent.',
        ],
      ],
      [
        'Retention &amp; Your Rights',
        [
          'We retain personal information only as long as required to provide active services or meet U.S. tax and legal obligations, protected with TLS encryption in transit and strict access controls.',
          'You may request access to, correction of, export of, or deletion of your personal data at any time by emailing <a class="link" href="mailto:contact@mosiken.org">contact@mosiken.org</a>.',
        ],
      ],
    ],
  },

  termsPage: {
    title: 'Terms of Service | Mosiken',
    description: 'Terms of Service governing websites, SaaS platforms, desktop applications, and mobile software published by Mosiken LLC.',
    label: 'Terms',
    heading: 'Terms of Service',
    lead: 'Effective November 18, 2026. These terms form a binding agreement between you and Mosiken LLC governing your use of our websites and software.',
    sections: [
      [
        'Agreement &amp; Entity',
        [
          'These Terms of Service govern access to websites (including <strong>mosiken.org</strong>, <strong>veynod.com</strong>, and <strong>sushiheng.com</strong>), cloud services, desktop software, and mobile applications published by <strong>Mosiken LLC</strong>, a Wyoming limited liability company (30 N Gould St Ste R, Sheridan, WY 82801, USA).',
        ],
      ],
      [
        'License &amp; Acceptable Use',
        [
          'Subject to these Terms and applicable fees, Mosiken LLC grants you a limited, non-exclusive, non-transferable license to use our software for personal or internal business workflows. You may not reverse-engineer, redistribute, or abuse our proprietary services or APIs, except where open-source licenses explicitly permit.',
        ],
      ],
      [
        'Billing &amp; Refunds',
        [
          'Direct web subscriptions and licenses are billed in USD or displayed currencies and may be canceled prior to renewal. Mobile purchases through the Apple App Store or Google Play are governed by Apple’s or Google’s respective store terms. For direct purchases experiencing unresolved material defects within 14 days, contact <a class="link" href="mailto:contact@mosiken.org">contact@mosiken.org</a> for a refund.',
        ],
      ],
      [
        'Disclaimers &amp; Law',
        [
          '<strong>Engineering Verification:</strong> SheetOS is a drafting and calculation aid; users must independently verify all dimensions, tolerances, and DXF layouts prior to fabrication or manufacturing.',
          'TO THE MAXIMUM EXTENT PERMITTED BY LAW, SERVICES ARE PROVIDED “AS IS” WITHOUT WARRANTIES, AND AGGREGATE LIABILITY SHALL NOT EXCEED THE GREATER OF USD $100 OR AMOUNTS PAID TO MOSIKEN LLC IN THE PRIOR TWELVE MONTHS. Governed by the laws of the <strong>State of Wyoming, USA</strong>.',
        ],
      ],
    ],
  },

  lost: {
    title: 'Page not found | Mosiken',
    description: 'This page is not on the chart.',
    label: 'Error 404',
    heading: 'No story here.',
    lead: 'This page is not on the chart. It may have moved, or it may never have existed.',
    home: 'Back to home',
    products: 'See the products',
  },

  social: {
    title: 'Mosiken — Build What Comes Next.',
    description: 'Original software products across AI collaboration, creative technology, human connection, and engineering.',
  },

  org: {
    slogan: 'Build What Comes Next.',
    description: 'Mosiken LLC is a software company registered in Wyoming, USA, developing AI-native platforms, creative tools, intelligent applications, and specialized engineering software.',
  },
};
