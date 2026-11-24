// English copy for mosiken.org — Mosiken LLC (Wyoming, USA).

export default {
  lang: 'en',
  htmlLang: 'en',
  ogLocale: 'en_US',
  ogImage: 'og.png',
  ogImageAlt: 'Mosiken — Build What Comes Next.',
  brand: 'Mosiken',
  legalName: 'Mosiken LLC',
  commentTitle: 'MOSIKEN LLC · mosiken.org',
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
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    switchLang: '中文',
    switchLangLabel: 'View this page in Simplified Chinese',
    menu: 'Menu',
    theme: 'Switch theme',
    place: 'Registered in Wyoming, USA',
    placeShort: 'Mosiken LLC · Registered in Wyoming, USA',
    localTime: 'Wyoming time',
    clockFallback: 'Mountain Time',
    site: 'Site',
    legal: 'Legal',
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
    lead: 'For product inquiries, commercial licensing, partnerships, or general correspondence, contact Mosiken LLC at',
  },

  products: {
    veynod: {
      category: 'AI-Agent Collaboration &amp; Orchestration',
      short: 'Active development',
      full: 'Public preview · Active product development',
      lead: 'Veynod provides a shared cloud and desktop environment for teams of AI agents to coordinate software and knowledge work.',
      body: 'Operated on Mosiken LLC’s dedicated product domain (veynod.com), Veynod brings tasks, shared project context, agent execution, review steps, and human decisions into one connected workflow. Paid team and developer subscriptions are planned upon general availability.',
      tags: ['Multi-Agent Systems', 'SaaS Platform', 'Workflow Orchestration', 'Human Oversight'],
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
      body: 'Its design combines natural-language direction, responsive voice interaction, precise visual and timeline targeting, non-destructive editing, and multi-model workflows. The objective is to let creators express what they want to change while retaining full control over source media and the final result.',
      tags: ['AI Video Editing', 'Creative Workflows', 'Multimodal Interaction', 'Non-Destructive Editing'],
      links: ['Development repository'],
      beats: ['Direction in words or voice', 'Visual and timeline targeting', 'Non-destructive edit'],
      alt: 'Animated diagram: a spoken or typed instruction finds its target in the frame and on the timeline, and the edit is applied as a separate layer while the source media stays whole.',
    },
    serendipity: {
      category: 'AI-Native Social Discovery',
      short: 'Research &amp; design',
      full: 'Research and product design',
      lead: 'Serendipity is an exploratory mobile application built around deeper understanding and more intentional real-world connections.',
      body: 'Its concept uses conversational onboarding, individual preference modeling, and AI-agent-assisted matching to help people discover compatible connections while preserving user choice, privacy, and autonomy.',
      tags: ['Mobile Application', 'Conversational AI', 'Agent-Assisted Matching', 'Human Connection'],
      links: [],
      beats: ['Conversational onboarding', 'Preference modeling', 'Agent-assisted matching', 'Your choice'],
      alt: 'Animated diagram: a conversation becomes a private preference model, an agent compares it with others, and a suggested connection waits for the person to choose.',
    },
    sheetos: {
      aka: 'SheetMetal OS',
      category: 'Engineering &amp; Fabrication Software',
      short: 'Available',
      full: 'Available · Commercial desktop &amp; mobile software',
      lead: 'SheetOS supports sheet-metal engineering workflows, from field measurements and parametric calculations to unfolded geometry and production-ready drawings.',
      body: 'Built for practical fabrication scenarios, SheetOS converts dimensional inputs into accurate flat-pattern layouts and CAD-ready DXF files for downstream manufacturing. Android and Windows editions are available today via Mosiken LLC’s product portal (sushiheng.com), with an iOS edition in preparation for the Apple App Store.',
      tags: ['Sheet-Metal CAD', 'Parametric Geometry', 'Desktop &amp; Mobile App', 'DXF Export'],
      links: ['sushiheng.com'],
      beats: ['Field measurements', 'Parametric calculation', 'Unfolded geometry', 'DXF output'],
      alt: 'Animated diagram: a cone is measured, its flat pattern is calculated and unfolded, and the outline is handed over as a DXF drawing. Move the pointer over it to change the dimensions.',
    },
  },

  home: {
    title: 'Mosiken LLC | AI-Native Software &amp; Digital Product Development',
    description: 'Mosiken LLC is an independent software company registered in Wyoming, USA, developing AI-native SaaS platforms, creative tools, mobile applications, and specialized engineering software.',
    eyebrow: 'Mosiken LLC · Independent software company · Wyoming, USA',
    // [word, accent] — one line per entry
    hero: [[['Build', false]], [['What', false], ['Comes', false]], [['Next.', true]]],
    heroLabel: 'Build What Comes Next.',
    sub: 'Mosiken LLC builds original software products for users in the United States and worldwide — spanning AI-agent collaboration, creative workflows, mobile applications, and precision engineering tools.',
    primary: 'Explore Our Products',
    secondary: 'Contact Mosiken',
    introLabel: 'Introduction',
    introTitle: 'Technology should do more than look impressive.',
    intro: 'At Mosiken LLC, we turn emerging ideas into focused, commercial-grade software products. Our work spans AI-native interaction, intelligent coordination, digital creativity, and specialized engineering tools built for real tasks.',
    portfolioLabel: 'Portfolio',
    portfolioTitle: 'Four directions. One product mindset.',
    portfolio: 'Some of our products are commercially available today; others are in active engineering or research. Each starts with the same question: what could software make meaningfully better?',
    missionLabel: 'Mission',
    mission: 'To turn ambitious ideas into useful software that expands what individuals and teams can create, coordinate, and accomplish.',
    aboutLink: 'About Mosiken LLC',
  },

  productsPage: {
    title: 'Products | Veynod, ANCS, Serendipity &amp; SheetOS | Mosiken LLC',
    description: 'Veynod, ANCS, Serendipity, and SheetOS: four original software products developed by Mosiken LLC, distributed across web, desktop, and mobile platforms.',
    label: 'Products',
    note: 'Each product below is developed and operated by Mosiken LLC and labeled with its current release stage. Commercial distribution spans direct web subscriptions, desktop licenses, Google Play, and upcoming Apple App Store releases.',
  },

  about: {
    title: 'About Mosiken LLC | Independent Software Company',
    description: 'Mosiken LLC is an independent software company registered in Wyoming, USA, founded and wholly owned by Chen Su.',
    label: 'About',
    heading: 'Independent thinking. Purposeful engineering.',
    lead: 'Mosiken LLC develops original software products from concept to commercial release. We work across multiple disciplines because important problems rarely fit into a single category. What connects our products is a focus on thoughtful user experiences, robust software foundations, and the practical value of new technology.',
    companyLabel: 'Company',
    company: [
      '<strong>Mosiken LLC is an independent software company organized in the State of Wyoming, United States, founded and wholly owned by Chen Su.</strong> We research, design, and develop proprietary software products across AI-agent collaboration, intelligent creative workflows, mobile social discovery, and specialized engineering CAD tools.',
      'Our focus is on building and operating original first-party software rather than reselling or white-labeling third-party tools. We design systems around real workflows and ship software across cloud SaaS, desktop (Windows and macOS), and mobile platforms (iOS and Android).',
      'Mosiken LLC serves individual professionals and teams in the United States and internationally through digital software licenses, SaaS subscriptions, and global app marketplaces including the Apple App Store and Google Play.',
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
      ['Practical experimentation', 'Explore boldly, test assumptions, and distinguish shipped products from research concepts.'],
    ],
    factsLabel: 'Corporate facts',
    facts: {
      company: 'Legal entity',
      companyValue: 'Mosiken LLC',
      founder: 'Founder &amp; Managing Member',
      founderValue: 'Chen Su',
      hq: 'Jurisdiction',
      hqValue: 'State of Wyoming, USA (Filing ID: 2026-002137028)',
      regOffice: 'Registered office',
      regOfficeValue: '30 N Gould St Ste R, Sheridan, WY 82801, USA',
      industry: 'Industry',
      industryValue: 'Software Publishing, SaaS &amp; Mobile Application Development',
      focus: 'Distribution',
      focusValue: 'Direct web SaaS, desktop licenses, Apple App Store &amp; Google Play',
      portfolio: 'Products',
      contact: 'Official email',
    },
  },

  contact: {
    title: 'Contact | Mosiken LLC',
    description: 'For product support, commercial inquiries, partnerships, or legal correspondence, contact Mosiken LLC at contact@mosiken.org.',
    topicsLabel: 'Start an email about',
    topics: [
      ['Product & Customer Support', 'Product &amp; customer support'],
      ['Commercial Licensing & Partnerships', 'Commercial licensing &amp; partnerships'],
      ['Legal & Compliance Inquiry', 'Legal, privacy &amp; compliance'],
    ],
    whereLabel: 'Corporate details',
    facts: {
      company: 'Legal entity',
      companyValue: 'Mosiken LLC',
      founder: 'Founder &amp; Managing Member',
      founderValue: 'Chen Su',
      location: 'Jurisdiction',
      locationValue: 'State of Wyoming, USA (Filing ID: 2026-002137028)',
      regOffice: 'Registered office',
      regOfficeValue: '30 N Gould St Ste R, Sheridan, WY 82801, USA',
      time: 'Wyoming time',
      web: 'Official website',
    },
  },

  privacyPage: {
    title: 'Privacy Policy | Mosiken LLC',
    description: 'Privacy Policy governing websites, SaaS platforms, desktop software, and mobile applications operated by Mosiken LLC.',
    label: 'Legal · Privacy',
    heading: 'Privacy Policy',
    lead: 'Effective Date: November 18, 2026 · Last Updated: November 24, 2026. This Privacy Policy explains how Mosiken LLC collects, uses, and safeguards information across our websites and software products.',
    sections: [
      [
        '1. Data Controller &amp; Scope',
        [
          '<strong>Mosiken LLC</strong> (“Mosiken,” “we,” “us,” or “our”), a limited liability company organized under the laws of the State of Wyoming, United States (Filing ID: 2026-002137028; Registered Office: 30 N Gould St Ste R, Sheridan, WY 82801, USA), is the operator and data controller for <strong>mosiken.org</strong>, our dedicated product domains including <strong>veynod.com</strong> and <strong>sushiheng.com</strong>, and our proprietary desktop, web, and mobile software applications (including <strong>Veynod</strong>, <strong>ANCS</strong>, <strong>Serendipity</strong>, and <strong>SheetOS</strong>, collectively the “Services”).',
          'For privacy inquiries or data subject requests, you may contact our managing member directly at <a class="link" href="mailto:contact@mosiken.org">contact@mosiken.org</a>.',
        ],
      ],
      [
        '2. Information We Collect',
        [
          '<strong>Account &amp; Contact Information:</strong> When you register for an account, purchase a license or subscription, or contact us by email, we collect your name, email address, account preferences, and correspondence records.',
          '<strong>Billing &amp; Transaction Metadata:</strong> Paid subscriptions, software licenses, and in-app purchases are processed by PCI-DSS compliant third-party payment platforms, such as Stripe, Apple App Store, and Google Play. Mosiken LLC receives confirmation of payment status, plan tier, and billing country, and <strong>never</strong> collects or stores full credit card numbers or bank credentials on our servers.',
          '<strong>Workspace, CAD &amp; Project Content:</strong> Depending on the product you use, we process user-supplied inputs such as parametric geometry dimensions in SheetOS (many calculations run locally on your device), task orchestration data in Veynod, or user-submitted media and prompts in AI-enabled features solely to provide the requested functionality.',
          '<strong>Technical &amp; Diagnostic Data:</strong> We collect minimal server logs and crash diagnostics (such as browser or OS version, IP address for security rate-limiting, and error traces) necessary to keep the Services reliable and secure.',
        ],
      ],
      [
        '3. How We Use Information',
        [
          'We use collected information strictly to: (a) deliver, maintain, authenticate, and improve our software products; (b) fulfill software licenses, subscriptions, and customer support requests; (c) send essential transactional notices such as receipts, security alerts, and policy updates; and (d) detect fraud, abuse, or unauthorized access.',
          '<strong>No Sale of Personal Data:</strong> Mosiken LLC does not sell, rent, or broker your personal information to data brokers or third-party advertisers. Private project files and engineering drawings are not used to train public foundation models without your explicit opt-in consent.',
        ],
      ],
      [
        '4. Infrastructure &amp; Third-Party Processors',
        [
          'We rely on reputable infrastructure and service providers (including Cloudflare for network delivery and security, cloud hosting providers in the United States, and payment processors such as Stripe, Apple, and Google) bound by confidentiality and data-processing obligations. Information may be processed and stored in the United States and other jurisdictions where our infrastructure providers operate.',
        ],
      ],
      [
        '5. Data Retention &amp; Security',
        [
          'We retain personal data only as long as necessary to provide active Services, comply with United States tax and accounting obligations, or resolve disputes. We apply industry-standard safeguards including TLS encryption in transit, access controls, and least-privilege credential management.',
        ],
      ],
      [
        '6. Your Privacy Rights',
        [
          'Depending on your jurisdiction (including U.S. state privacy laws, the GDPR/UK GDPR, and other applicable frameworks), you have the right to request access to, correction of, export of, or deletion of your personal information. To exercise these rights, email <a class="link" href="mailto:contact@mosiken.org">contact@mosiken.org</a> from the address associated with your account. We respond to verified requests within 30 days.',
        ],
      ],
      [
        '7. Children’s Privacy &amp; Policy Updates',
        [
          'Our Services are intended for general professional and adult audiences and are not directed to children under 13 (or 16 where applicable). Material updates to this Privacy Policy will be posted on this page with an updated revision date.',
        ],
      ],
    ],
  },

  termsPage: {
    title: 'Terms of Service | Mosiken LLC',
    description: 'Terms of Service governing access to websites, SaaS subscriptions, desktop applications, and mobile software published by Mosiken LLC.',
    label: 'Legal · Terms',
    heading: 'Terms of Service',
    lead: 'Effective Date: November 18, 2026 · Last Updated: November 24, 2026. These Terms of Service form a binding legal agreement between you and Mosiken LLC.',
    sections: [
      [
        '1. Contracting Entity &amp; Acceptance',
        [
          'These Terms of Service (“Terms”) govern your access to and use of the websites (including <strong>mosiken.org</strong>, <strong>veynod.com</strong>, and <strong>sushiheng.com</strong>), cloud services, desktop software, and mobile applications published by <strong>Mosiken LLC</strong>, a Wyoming limited liability company (Registered Office: 30 N Gould St Ste R, Sheridan, WY 82801, USA). By accessing or using our Services, you agree to these Terms.',
        ],
      ],
      [
        '2. Software License &amp; Account Responsibility',
        [
          'Subject to your compliance with these Terms and payment of applicable fees, Mosiken LLC grants you a limited, non-exclusive, non-transferable, revocable license to use our software applications and SaaS platforms for your personal or internal business workflows.',
          'You are responsible for maintaining the confidentiality of your account credentials and for all activity occurring under your account. You may not reverse-engineer, redistribute, sublicense, or circumvent technical licensing controls in our proprietary software except where open-source components explicitly permit doing so under their respective licenses.',
        ],
      ],
      [
        '3. Subscriptions, App Store Purchases &amp; Refunds',
        [
          '<strong>Direct Web &amp; SaaS Billing:</strong> Subscriptions and software licenses purchased directly from Mosiken LLC are billed in U.S. dollars (USD) or displayed local currencies via our authorized payment processors. Recurring subscriptions renew automatically at the end of each billing cycle unless canceled prior to renewal in your account settings or by contacting <a class="link" href="mailto:contact@mosiken.org">contact@mosiken.org</a>.',
          '<strong>Apple App Store &amp; Google Play Purchases:</strong> When you download or subscribe to a Mosiken LLC mobile application through the Apple App Store or Google Play, billing, renewals, cancellations, and refund requests are governed by Apple’s or Google’s respective marketplace terms.',
          '<strong>Refunds:</strong> For direct web purchases, if our software fails to perform materially as documented and our support team cannot resolve the issue within 14 days of initial purchase, you may request a full refund by emailing <a class="link" href="mailto:contact@mosiken.org">contact@mosiken.org</a>.',
        ],
      ],
      [
        '4. Acceptable Use',
        [
          'You agree not to use Mosiken LLC Services to violate any applicable law, infringe third-party intellectual property rights, transmit malicious code, abuse API or compute quotas, or generate unlawful, deceptive, or harmful content.',
        ],
      ],
      [
        '5. Intellectual Property &amp; User Output',
        [
          'Mosiken LLC retains all right, title, and interest in and to our software, visual interfaces, trademarks (including Mosiken, Veynod, ANCS, Serendipity, and SheetOS), and underlying documentation. You retain ownership of the original data, source media, CAD inputs, and generated DXF or project outputs you create using the Services.',
        ],
      ],
      [
        '6. Pre-Release Features &amp; Engineering Disclaimer',
        [
          '<strong>Beta &amp; Research Products:</strong> Products or features labeled “In development,” “Preview,” or “Research” are provided on an experimental “as-is” basis and may change or be discontinued.',
          '<strong>Engineering &amp; Fabrication Verification (SheetOS):</strong> SheetOS is a calculation and drafting aid for trained technicians and engineers. Material thickness, bend allowances, kerf compensation, and shop equipment vary; <strong>you are solely responsible for independently verifying all dimensions, tolerances, and DXF layouts prior to cutting, welding, or manufacturing.</strong>',
        ],
      ],
      [
        '7. Disclaimers &amp; Limitation of Liability',
        [
          'TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE SERVICES ARE PROVIDED “AS IS” AND “AS AVAILABLE” WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. IN NO EVENT SHALL MOSIKEN LLC OR ITS MANAGING MEMBER BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR MANUFACTURING SCRAP DAMAGES, OR FOR AGGREGATE CLAIMS EXCEEDING THE GREATER OF USD $100 OR THE AMOUNT PAID BY YOU TO MOSIKEN LLC IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.',
        ],
      ],
      [
        '8. Governing Law &amp; Contact',
        [
          'These Terms are governed by the laws of the <strong>State of Wyoming, United States</strong>, without regard to conflict-of-law principles. Any legal notices or customer inquiries may be directed to Mosiken LLC at <a class="link" href="mailto:contact@mosiken.org">contact@mosiken.org</a>.',
        ],
      ],
    ],
  },

  lost: {
    title: 'Page not found | Mosiken LLC',
    description: 'This page is not on the chart.',
    label: 'Error 404',
    heading: 'No story here.',
    lead: 'This page is not on the chart. It may have moved, or it may never have existed.',
    home: 'Back to home',
    products: 'See the products',
  },

  social: {
    title: 'Mosiken LLC — Build What Comes Next.',
    description: 'Original software products by Mosiken LLC across AI collaboration, creative technology, mobile applications, and engineering.',
  },

  org: {
    slogan: 'Build What Comes Next.',
    description: 'Mosiken LLC is an independent software company registered in Wyoming, USA, founded by Chen Su, developing AI-native platforms, creative tools, mobile applications, and specialized engineering software.',
  },
};
