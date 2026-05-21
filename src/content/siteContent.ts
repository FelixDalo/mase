import type { ComponentType, SVGProps } from 'react';
import {
  CybersecurityIcon,
  DataAiIcon,
  DeliveryIcon,
  StrategyIcon,
} from '../components/icons/principle-icons';

type PrincipleIconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const brandLine = 'Boutique advisory. Executive-level thinking. Business outcomes';

export const heroContent = {
  label: 'TECHNOLOGY, DIGITAL TRANSFORMATION, DATA & AI',
  headline: 'Strategic Advisory. Enterprise Impact.',
  description:
    'We partner with senior leaders to sharpen digital strategy, strengthen technology decisions, unlock data & AI opportunities, and deliver transformation with confidence.',
  primaryCtaLabel: 'Contact Us',
  primaryCtaHref: '#contact',
  secondaryCtaLabel: 'Explore our services',
  secondaryCtaHref: '#services',
  imageUrl: '/Images/hero-consulting-team.png',
};

export const aboutContent = {
  railLabel: 'ABOUT MASE CONSULTING GROUP',
  title: 'Technology-led transformation, built for real business outcomes.',
  copy:
    'We support clients from strategy through execution, helping them define the right technology direction, build stronger operating models, unlock value from data and AI, improve delivery confidence and strengthen resilience.',
  ctaLabel: 'Explore our services',
  ctaHref: '#services',
};

export const homeIntroPoints: Array<{
  title: string;
  text: string;
  icon: PrincipleIconComponent;
}> = [
  {
    title: 'Strategic\nadvisory',
    text: 'Strategic advisory that is practical, focused and executive-led.',
    icon: StrategyIcon,
  },
  {
    title: 'Transformation\ndelivery',
    text: 'Transformation delivery support that improves confidence, governance and impact.',
    icon: DeliveryIcon,
  },
  {
    title: 'Data and\nAI services',
    text: 'Data and AI services that turn information into insight, automation and value.',
    icon: DataAiIcon,
  },
  {
    title: 'Cyber and\ndigital risk',
    text: 'Cyber and digital risk support that strengthens trust and resilience.',
    icon: CybersecurityIcon,
  },
];

export const servicesContent = {
  label: 'SERVICES',
  title: 'Specialist advisory and delivery capabilities.',
  description:
    'Mase Consulting Group combines strategy, technology depth and delivery discipline across the capabilities clients need most.',
  learnMoreLabel: 'Learn more',
  learnMoreHref: '#contact',
};

export const services = [
  {
    slug: 'digital-transformation',
    title: 'Technology & Digital Transformation',
    text:
      'We help organisations shape, mobilise and deliver digital and technology transformation with confidence, aligning strategy, architecture, delivery governance and business outcomes.',
    label: 'Technology & Digital Transformation',
    badges: [
      'CTO/ CIO Advisory',
      'Technology & Digital Strategy',
      'Architecture Services & Design',
      'Technology Delivery & Assurance',
    ],
  },
  {
    slug: 'data-and-ai',
    title: 'Data & AI',
    text:
      'We help organisations turn data into insight, automation and measurable value by defining data strategy, strengthening governance and identifying high-impact AI use cases.',
    label: 'Data & AI',
    badges: [
      'Data & AI Strategy',
      'Data Governance & Management',
      'Data Platforms & Engineering',
      'Predictive Insights, Analytics & BI',
    ],
  },
  {
    slug: 'cloud-solutions',
    title: 'Cloud, Platforms & Enterprise Solutions',
    text:
      'We help clients modernise core technology foundations, improve scalability and enable more agile operations through cloud, platform and infrastructure advisory.',
    label: 'Cloud, Platforms & Enterprise Solutions',
    badges: [
      'Cloud Transformation Advisory',
      'Enterprise Platform Advisory',
      'Infrastructure Modernisation',
      'Systems Integration Advisory',
    ],
  },
  {
    slug: 'cyber-security',
    title: 'Cyber Security & Digital Risk',
    text:
      'We help organisations strengthen resilience, protect digital assets and improve confidence in technology-enabled change.',
    label: 'Cyber Security & Digital Risk',
    badges: [
      'Cyber Security Strategy',
      'Vulnerability Assessments',
      'Digital Risk & Governance',
      'Cyber Resilience & Preparedness',
    ],
  },
  {
    slug: 'operational-modelling',
    title: 'Operating Model, People & Change',
    text:
      'We help organisations embed transformation by aligning people, process, governance, culture and adoption.',
    label: 'Operating Model, People & Change',
    badges: [
      'Target Operating Model Design',
      'Organisational Transformation',
      'Enterprise Change Management',
      'Leadership and Culture Enablement',
    ],
  },
] as const;

export const servicesDetailed = [
  {
    slug: 'digital-transformation',
    title: 'Technology & Digital Transformation',
    sidebarLabel: 'Technology & Digital',
    description:
      'We help organisations shape, mobilise and deliver digital and technology transformation with confidence, aligning strategy, architecture, delivery governance and business outcomes.',
    capabilities: [
      'Technology Strategy & CIO Advisory',
      'Digital Transformation Strategy',
      'Agile Delivery & Transformation PMO',
      'Enterprise Architecture & Solution Design',
      'Technology Delivery Assurance & Quality Engineering',
      'Change Management & Transformation Enablement',
      'Delivery Mobilisation and Governance',
    ],
  },
  {
    slug: 'data-and-ai',
    title: 'Data & AI',
    sidebarLabel: 'Data & AI',
    description:
      'We help organisations turn data into insight, automation and measurable value by defining data strategy, strengthening governance and identifying high-impact AI use cases.',
    capabilities: [
      'Data & AI Strategy',
      'Data Governance & Management',
      'Data Platforms & Engineering',
      'Business Intelligence & Analytics',
      'AI Use Case Discovery and Prioritisation',
      'Predictive Analytics and Decision Support',
      'AI Operating Model and Adoption',
    ],
  },
  {
    slug: 'cloud-solutions',
    title: 'Cloud, Platforms & Enterprise Solutions',
    sidebarLabel: 'Cloud & Platforms',
    description:
      'We help clients modernise core technology foundations, improve scalability and enable more agile operations through cloud, platform and infrastructure advisory.',
    capabilities: [
      'Cloud Transformation Advisory',
      'Enterprise Platform Advisory',
      'Infrastructure Modernisation',
      'Systems Integration Advisory',
      'Digital Workplace Enablement',
      'Platform Delivery and Deployment',
      'Managed Technology Advisory',
    ],
  },
  {
    slug: 'cyber-security',
    title: 'Cyber Security & Digital Risk',
    sidebarLabel: 'Cyber Security',
    description:
      'We help organisations strengthen resilience, protect digital assets and improve confidence in technology-enabled change.',
    capabilities: [
      'Cyber Security Strategy',
      'Vulnerability Assessments',
      'Digital Risk & Governance',
      'Cyber Resilience & Preparedness',
      'Cloud and Infrastructure Security Advisory',
      'Security Awareness and Training',
      'Risk Remediation Roadmaps',
    ],
  },
  {
    slug: 'operational-modelling',
    title: 'Operating Model, People & Change',
    sidebarLabel: 'People & Change',
    description:
      'We help organisations embed transformation by aligning people, process, governance, culture and adoption.',
    capabilities: [
      'Target Operating Model Design',
      'Organisational Transformation',
      'Enterprise Change Management',
      'Leadership and Culture Enablement',
      'Workforce and Capability Transformation',
      'Training and Adoption Support',
      'Transformation Communications',
    ],
  },
] as const;

export const serviceSlugMap = {
  'digital-transformation': 0,
  'data-and-ai': 1,
  'cloud-solutions': 2,
  'cyber-security': 3,
  'operational-modelling': 4,
} as const;

export const activeServiceStorageKey = 'mase-active-service';

export const industriesContent = {
  label: 'INDUSTRIES',
  title: 'Practical advisory for complex, fast-changing environments.',
  description:
    'We support organisations across sectors where technology, operating model and delivery decisions carry real weight.',
};

export const industries = [
  {
    title: 'Government & Public Sector',
    kicker: 'Explore Government',
    text:
      'Supporting digital government, citizen services, operating model change and secure technology modernisation.',
    image: '/Images/industry-government.jpg',
  },
  {
    title: 'Financial Services',
    kicker: 'Explore Financial Services',
    text:
      'Helping banks, insurers and financial institutions modernise platforms, strengthen data capability, manage risk and improve customer journeys.',
    image: '/Images/industry-financial.jpg',
  },
  {
    title: 'Energy & Resources',
    kicker: 'Explore Energy & Resources',
    text:
      'Supporting asset-intensive organisations with operational intelligence, data, digital platforms and transformation delivery.',
    image: '/Images/industry-energy.jpg',
  },
  {
    title: 'Telecommunications & Media',
    kicker: 'Explore Telecoms & Media',
    text:
      'Helping telecoms and media organisations modernise platforms, improve digital services and enable data-driven growth.',
    image: '/Images/industry-telecom.jpg',
  },
  {
    title: 'Consumer & Retail',
    kicker: 'Explore Consumer & Retail',
    text:
      'Helping organisations improve customer experience, digital operations, data insight and scalable technology platforms.',
    image: '/Images/industry-retail.jpg',
  },
  {
    title: 'Healthcare & Life Sciences',
    kicker: 'Explore Healthcare',
    text:
      'Supporting secure digital transformation, data governance, operating model change and service improvement.',
    image: '/Images/industry-healthcare.jpg',
  },
] as const;

export const approachContent = {
  label: 'APPROACH',
  title: [
    'A practical, outcome-focused',
    'engagement model from strategy',
    'through execution.',
  ],
  ariaLabel:
    'A practical, outcome-focused engagement model from strategy through execution.',
  description:
    'We work with clients through a clear sequence, moving from discovery and shaping into mobilisation, delivery and sustainable adoption.',
};

export const approachSteps = [
  ['Discover', 'Understand the strategic ambition, current challenges, technology landscape, operating model and value opportunities.'],
  ['Shape', 'Define the target outcomes, roadmap, operating model, governance and delivery approach.'],
  ['Mobilise', 'Set up the programme, delivery structures, workstreams, reporting, roles and decision forums.'],
  ['Deliver', 'Support execution through advisory, delivery management, quality assurance, change management and partner coordination.'],
  ['Embed', 'Build capability, transfer knowledge, track value and support sustainable adoption.'],
] as const;

export const contactContent = {
  label: 'CONTACT',
  title: "Let's talk about your transformation goals.",
  description:
    'Whether you are shaping a new strategy, modernising technology, exploring data and AI, or strengthening delivery confidence, we would welcome a conversation.',
  submitLabel: 'Submit enquiry',
  socialLinks: [
    {
      href: 'https://www.linkedin.com',
      label: 'LinkedIn',
    },
  ],
  fields: ['Name', 'Organisation', 'Email', 'Phone', 'Area of Interest'] as const,
};
