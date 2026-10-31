export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  statusBadge: string;
  accentColor: 'yellow' | 'pink' | 'teal' | 'blue';
  summary: string;
  problemContext: string;
  approachHighlights: string[];
  tags: string[];
  note: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  type: string;
  accentColor: 'yellow' | 'pink' | 'teal' | 'blue';
  highlights: string[];
  domains: string[];
}

export interface ResearchTopic {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  accentColor: 'yellow' | 'pink' | 'teal' | 'blue';
  description: string;
  keyConcepts: string[];
}

export interface PhotographyItem {
  id: string;
  frameNumber: string;
  title: string;
  location: string;
  subject: string;
  cameraMeta: string;
  accentColor: 'yellow' | 'pink' | 'teal' | 'blue';
  caption: string;
}

export interface MediaChannel {
  id: 'youtube' | 'podcast' | 'talks';
  code: string;
  label: string;
  title: string;
  handleOrFormat: string;
  cadenceOrBadge: string;
  accentColor: 'yellow' | 'pink' | 'teal' | 'blue';
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface VideoItem {
  id: string;
  tapeCode: string;
  title: string;
  summary: string;
  duration: string;
  publishedLabel: string;
  tags: string[];
  videoUrl: string;
  accentColor: 'yellow' | 'pink' | 'teal' | 'blue';
}

export interface PodcastEpisode {
  id: string;
  episodeCode: string;
  title: string;
  summary: string;
  duration: string;
  guestOrTopic: string;
  listenUrl: string;
  platforms: ('Spotify' | 'Apple Podcasts' | 'YouTube')[];
  accentColor: 'yellow' | 'pink' | 'teal' | 'blue';
}

export interface TalkItem {
  id: string;
  passCode: string;
  title: string;
  event: string;
  location: string;
  date: string;
  type: 'Conference' | 'Guest Lecture' | 'Engineering Tech Talk' | 'Community Meetup';
  summary: string;
  topics: string[];
  slidesUrl: string;
  recordingUrl: string;
  accentColor: 'yellow' | 'pink' | 'teal' | 'blue';
}

export const PROFILE = {
  name: 'Arun Jose',
  monogram: 'AJ',
  role: 'Software Engineer',
  currentOrg: 'Siemens Energy',
  location: 'Denmark',
  education: {
    degree: 'MSc Web Engineering',
    institution: 'Technische Universität Chemnitz',
    location: 'Chemnitz, Germany',
    focus: 'Semantic Web, Distributed Web Systems, Intelligent Information Retrieval & Applied AI'
  },
  heroTagline:
    'Building useful software, exploring intelligent systems, and connecting engineering with research.',
  shortBio:
    'Software Engineer at Siemens Energy in Denmark with an MSc in Web Engineering from TU Chemnitz. Focused on platform engineering, infrastructure observability, DevOps automation, knowledge graphs, and applied AI systems.',
  interests: [
    'Platform Engineering',
    'Infrastructure Monitoring',
    'DevOps and Automation',
    'AI Systems',
    'Knowledge Graphs',
    'Software Intelligence',
    'Applied AI Research'
  ],
  contact: {
    emailPlaceholder: 'arun.jose.placeholder@example.com',
    githubPlaceholder: 'https://github.com/iamarunjose',
    githubHandle: '@iamarunjose',
    linkedinPlaceholder: 'https://www.linkedin.com/in/arunjose-placeholder',
    linkedinHandle: '/in/arunjose-placeholder',
    youtubePlaceholder: 'https://www.youtube.com/@arunjose-placeholder',
    youtubeHandle: '@arunjose',
    podcastPlaceholder: 'https://open.spotify.com/show/arunjose-podcast-placeholder',
    podcastName: 'SYSTEMS & SIGNALS FM // BY ARUN JOSE',
    cvUrl: '/cv',
    location: 'Denmark (CET / CEST)'
  }
};

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'hybrid-semantic-export-control',
    number: 'PRJ-01',
    title: 'Hybrid Semantic Framework for Export Control Compliance',
    category: "Master's Research",
    statusBadge: 'THESIS RESEARCH // TU CHEMNITZ',
    accentColor: 'yellow',
    summary:
      'An applied AI and semantic reasoning framework combining dense vector retrieval with structured knowledge graphs to assist complex regulatory and export control compliance analysis.',
    problemContext:
      'Regulatory export control classifications require multi-hop reasoning across technical specifications and hierarchical legal taxonomies—where pure lexical search misses semantic equivalence and standard vector RAG struggles with strict structural rules.',
    approachHighlights: [
      'Designed a hybrid retrieval pipeline uniting dense semantic embeddings with symbolic Knowledge Graph traversal.',
      'Modeled regulatory domain concepts, dual-use categories, and technical terminology relationships for explainable multi-step matching.',
      'Evaluated retrieval precision, semantic grounding, and reasoning traceability against domain compliance benchmarks.'
    ],
    tags: [
      'Hybrid RAG',
      'Knowledge Graphs',
      'NLP',
      'Semantic Reasoning',
      'Python',
      'Vector Search'
    ],
    note: 'Academic research artifact (MSc Web Engineering). Public conceptual overview only.',
    ctaLabel: 'Explore Research Details',
    ctaHref: '/research#thesis-framework'
  },
  {
    id: 'infrastructure-monitoring-automation',
    number: 'PRJ-02',
    title: 'Infrastructure Monitoring & Automation',
    category: 'Professional Experience',
    statusBadge: 'ENTERPRISE PLATFORM // SIEMENS',
    accentColor: 'teal',
    summary:
      'Design and engineering of resilient observability pipelines, infrastructure health telemetry, and automated operational workflows supporting critical engineering platforms.',
    problemContext:
      'Modern distributed engineering environments generate high-volume telemetry across heterogeneous infrastructure. Reducing alert fatigue and manual operational toil requires structured signal correlation and deterministic automation.',
    approachHighlights: [
      'Built automated health-check, metric aggregation, and alerting workflows to improve operational visibility and incident response.',
      'Engineered self-service CI/CD and infrastructure automation routines to standardize environment provisioning and reduce manual intervention.',
      'Applied platform engineering principles to make monitoring configurations reproducible, version-controlled, and auditable.'
    ],
    tags: [
      'Platform Engineering',
      'Observability',
      'DevOps Automation',
      'CI/CD',
      'Telemetry',
      'Reliability'
    ],
    note: 'High-level professional summary. Confidential internal architecture and proprietary metrics are omitted.',
    ctaLabel: 'View Experience Context',
    ctaHref: '/experience'
  },
  {
    id: 'code-intelligence-lab',
    number: 'PRJ-03',
    title: 'Code Intelligence Lab',
    category: 'Proposed Open-Source Project',
    statusBadge: 'PROPOSED R&D LAB // CONCEPT',
    accentColor: 'pink',
    summary:
      'An experimental open-source workbench exploring how AST parsing, dependency property graphs, and hybrid retrieval can power verifiable repository-scale software intelligence.',
    problemContext:
      'Large codebases contain implicit architectural contracts across modules, configs, and commit histories that flat text chunking fails to capture for developer assistance tools.',
    approachHighlights: [
      'Constructing structural code graphs from syntax trees, call graphs, and module boundaries alongside semantic doc embeddings.',
      'Investigating impact analysis queries, architectural drift detection, and context-aware developer agents.',
      'Designing deterministic evaluation harnesses for code Q&A and automated refactoring suggestions.'
    ],
    tags: [
      'Software Intelligence',
      'Code Graphs',
      'AST Analysis',
      'Developer Productivity',
      'TypeScript',
      'Applied AI'
    ],
    note: 'Proposed personal open-source project currently in specification and architecture phase (no public repository link yet).',
    ctaLabel: 'Read Technical Blueprint',
    ctaHref: '/writing/knowledge-graphs-for-code-intelligence'
  }
];

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    id: 'siemens-energy-dk',
    company: 'Siemens Energy',
    role: 'Software Engineer',
    location: 'Denmark',
    period: '2026–present',
    type: 'Full-Time Role',
    accentColor: 'yellow',
    highlights: [
      'Engineering reliable platform software, infrastructure automation, and internal developer workflows.',
      'Focusing on system observability, operational resilience, and scalable software architecture across engineering systems.',
      'Bridging modern software engineering practices with intelligent automation to streamline engineering delivery.'
    ],
    domains: ['Platform Engineering', 'Software Architecture', 'Automation', 'Observability']
  },
  {
    id: 'siemens-gamesa-de',
    company: 'Siemens Gamesa',
    role: 'Working Student',
    location: 'Germany',
    period: '2023–2026',
    type: 'Working Student (Alongside MSc)',
    accentColor: 'teal',
    highlights: [
      'Contributed to software tooling, infrastructure monitoring workflows, and engineering automation initiatives.',
      'Collaborated with distributed engineering teams while completing the MSc in Web Engineering at TU Chemnitz.',
      'Developed maintainable scripts, dashboards, and integration pipelines to support continuous operations.'
    ],
    domains: ['Infrastructure Monitoring', 'DevOps Tooling', 'Web Engineering', 'Automation']
  },
  {
    id: 'siemens-ag-de',
    company: 'Siemens AG',
    role: 'Working Student',
    location: 'Germany',
    period: '2022',
    type: 'Working Student',
    accentColor: 'pink',
    highlights: [
      'Supported software development, testing automation, and internal web application enhancements.',
      'Worked within structured industrial software lifecycles emphasizing code quality and reliability.'
    ],
    domains: ['Software Development', 'Web Applications', 'Quality Assurance']
  },
  {
    id: 'siemens-gamesa-in',
    company: 'Siemens Gamesa',
    role: 'Software Engineering',
    location: 'India',
    period: '2018–2021',
    type: 'Full-Time Engineering',
    accentColor: 'blue',
    highlights: [
      'Built and maintained enterprise software components, data processing workflows, and engineering support systems.',
      'Established strong foundations in production software delivery, cross-functional collaboration, and lifecycle maintenance.'
    ],
    domains: ['Software Engineering', 'Enterprise Systems', 'Backend & Web', 'Production Support']
  }
];

export const RESEARCH_TOPICS: ResearchTopic[] = [
  {
    id: 'masters-thesis',
    code: 'RES-01',
    title: "Master's Thesis: Hybrid Semantic Compliance",
    subtitle: 'MSc Web Engineering — Technische Universität Chemnitz',
    accentColor: 'yellow',
    description:
      'Investigated a Hybrid Semantic Framework for Export Control Compliance—combining structured domain knowledge graphs with dense neural retrieval to resolve high-stakes technical and regulatory ambiguity with traceable evidence.',
    keyConcepts: [
      'Regulatory Ontology Modeling',
      'Multi-Hop Evidence Retrieval',
      'Human-in-the-Loop Verification',
      'Explainable Classification'
    ]
  },
  {
    id: 'hybrid-rag',
    code: 'RES-02',
    title: 'Hybrid Retrieval-Augmented Generation (RAG)',
    subtitle: 'Uniting Vector Similarity & Symbolic Structure',
    accentColor: 'teal',
    description:
      'Exploring retrieval architectures that fuse dense vector embeddings, sparse lexical indexes (BM25), and graph neighborhood traversal so language models remain grounded in explicit structural relationships.',
    keyConcepts: [
      'Reciprocal Rank Fusion',
      'Subgraph Context Assembly',
      'Hallucination Mitigation',
      'Context Window Optimization'
    ]
  },
  {
    id: 'knowledge-graphs',
    code: 'RES-03',
    title: 'Knowledge Graphs & Semantic Engineering',
    subtitle: 'Structured Representations for Complex Domains',
    accentColor: 'pink',
    description:
      'Designing property graphs and semantic schemas that capture entities, dependencies, and provenance across technical documentation, regulatory corpora, and large software repositories.',
    keyConcepts: [
      'Property Graphs & RDF/OWL',
      'Entity Resolution & Linking',
      'Graph-Backed Code Intelligence',
      'Provenance Tracking'
    ]
  },
  {
    id: 'nlp-semantic-reasoning',
    code: 'RES-04',
    title: 'NLP & Semantic Reasoning',
    subtitle: 'Domain-Adapted Language Understanding',
    accentColor: 'blue',
    description:
      'Applying transformer architectures, domain-specific embeddings, and structured constraint decoding to extract reliable machine-actionable insights from dense technical prose.',
    keyConcepts: [
      'Information Extraction',
      'Semantic Similarity Calibration',
      'Structured Output Constraints',
      'Domain Adaptation'
    ]
  },
  {
    id: 'verifiable-ai',
    code: 'RES-05',
    title: 'Future Horizons: Verifiable AI & Knowledge Engineering',
    subtitle: 'Deterministic Guardrails for Intelligent Systems',
    accentColor: 'yellow',
    description:
      'Future research focus on neuro-symbolic verification, citation-grounded generation, and automated consistency checking so AI systems can be trusted in safety- and compliance-critical engineering workflows.',
    keyConcepts: [
      'Neuro-Symbolic Guardrails',
      'Verifiable Citations',
      'Deterministic Policy Checks',
      'Reliable Engineering Agents'
    ]
  }
];

export const ENGINEERING_PHILOSOPHY = [
  {
    code: 'PHIL-01',
    title: 'Observability Is a First-Class Feature',
    color: 'yellow',
    body: 'A system is only as reliable as our ability to understand its internal state from external signals. Clean telemetry, structured logs, and actionable metrics belong in the initial design—not bolted on after an outage.'
  },
  {
    code: 'PHIL-02',
    title: 'Automate Repeatable Toil',
    color: 'teal',
    body: 'Whenever an operational or development task is performed more than twice by hand, it should be codified into a deterministic, version-controlled workflow that frees engineers to solve higher-order problems.'
  },
  {
    code: 'PHIL-03',
    title: 'Connect Research Rigor with Production Pragmatism',
    color: 'pink',
    body: 'Applied AI and knowledge graphs deliver real value when paired with disciplined software engineering: explicit schemas, measurable evaluation harnesses, graceful fallbacks, and clear latency budgets.'
  },
  {
    code: 'PHIL-04',
    title: 'Clarity Over Cleverness',
    color: 'blue',
    body: 'Whether designing an infrastructure pipeline, a graph schema, or a user interface, explicit structure and readable abstractions always outlast opaque complexity.'
  }
];

export const PHOTOGRAPHY_FRAMES: PhotographyItem[] = [
  {
    id: 'nordic-harbor-geometry',
    frameNumber: 'EXP // 01A',
    title: 'Nordic Harbor Geometry',
    location: 'Denmark',
    subject: 'Architectural Lines & Maritime Light',
    cameraMeta: '35MM EQUIV // F/5.6 // 1/500S // ISO 200',
    accentColor: 'yellow',
    caption: 'High-contrast coastal steel structures meeting crisp northern skies.'
  },
  {
    id: 'saxony-industrial-brutalism',
    frameNumber: 'EXP // 02A',
    title: 'Concrete & Tramlines at Dusk',
    location: 'Chemnitz, Germany',
    subject: 'Urban Brutalism & Transit Rhythm',
    cameraMeta: '50MM EQUIV // F/2.8 // 1/125S // ISO 400',
    accentColor: 'pink',
    caption: 'Geometric modernist facades and overhead catenary wires captured after rain.'
  },
  {
    id: 'wind-turbines-horizon',
    frameNumber: 'EXP // 03A',
    title: 'Grid & Wind Horizon',
    location: 'North Sea Coast',
    subject: 'Energy Infrastructure & Minimalist Landscape',
    cameraMeta: '85MM EQUIV // F/8.0 // 1/1000S // ISO 100',
    accentColor: 'teal',
    caption: 'Symmetry and scale where renewable engineering meets open horizon.'
  },
  {
    id: 'monsoon-street-neon',
    frameNumber: 'EXP // 04A',
    title: 'Monsoon Reflections & Signage',
    location: 'South India',
    subject: 'Street Photography & Color Contrast',
    cameraMeta: '28MM EQUIV // F/4.0 // 1/60S // ISO 800',
    accentColor: 'blue',
    caption: 'Saturated hand-painted typography reflecting across wet evening pavement.'
  }
];

export const MEDIA_CHANNELS: MediaChannel[] = [
  {
    id: 'youtube',
    code: 'CH-01 // MTV-86 VHS',
    label: 'YouTube Channel',
    title: 'Arun Jose // Engineering & AI Systems',
    handleOrFormat: '@arunjose • Video Deep-Dives & Architecture Walkthroughs',
    cadenceOrBadge: 'ON AIR • VIDEO DECK',
    accentColor: 'pink',
    description:
      'Visual engineering breakdowns covering Knowledge Graphs, Hybrid RAG architectures, Kubernetes & platform observability, and software engineering career insights in Europe.',
    ctaLabel: 'Subscribe on YouTube →',
    ctaHref: 'https://www.youtube.com/@arunjose-placeholder'
  },
  {
    id: 'podcast',
    code: 'CH-02 // FM.86 TAPE',
    label: 'Audio & Video Podcast',
    title: 'Systems & Signals FM',
    handleOrFormat: 'Hosted by Arun Jose • Spotify / Apple / YouTube',
    cadenceOrBadge: 'STEREO 86 • CASSETTE DECK',
    accentColor: 'teal',
    description:
      'Candid conversations and solo transmissions on building resilient platforms, bridging academic AI research with industrial engineering, and life across India, Germany, and Denmark.',
    ctaLabel: 'Listen on Podcast Deck →',
    ctaHref: 'https://open.spotify.com/show/arunjose-podcast-placeholder'
  },
  {
    id: 'talks',
    code: 'CH-03 // STAGE PASS',
    label: 'Tech Talks & Speaking',
    title: 'Conferences, Lectures & Engineering Talks',
    handleOrFormat: 'Keynotes, Workshops, Panels & University Sessions',
    cadenceOrBadge: 'VIP STAGE PASS',
    accentColor: 'yellow',
    description:
      'Speaking on Hybrid Semantic RAG, Knowledge Graphs for compliance & code intelligence, observability-first platform engineering, and developer productivity.',
    ctaLabel: 'Invite Arun to Speak →',
    ctaHref: '/contact'
  }
];

export const YOUTUBE_VIDEOS: VideoItem[] = [
  {
    id: 'yt-hybrid-rag-kg',
    tapeCode: 'VHS-01 // CH-A',
    title: 'Why Vector Search Alone Fails: Building Hybrid RAG with Knowledge Graphs',
    summary:
      'A step-by-step architecture walkthrough showing how combining dense vector embeddings with explicit graph traversal eliminates hallucinations in high-stakes compliance and engineering domains.',
    duration: '18:42',
    publishedLabel: 'FEATURED EPISODE',
    tags: ['Hybrid RAG', 'Knowledge Graphs', 'Applied AI'],
    videoUrl: 'https://www.youtube.com/@arunjose-placeholder',
    accentColor: 'pink'
  },
  {
    id: 'yt-observability-platform',
    tapeCode: 'VHS-02 // CH-A',
    title: 'Observability-First Platform Engineering: From Raw Logs to Actionable Signals',
    summary:
      'How we design resilient monitoring pipelines, health checks, and automated runbooks so distributed industrial systems stay observable under load.',
    duration: '14:15',
    publishedLabel: 'SYSTEMS DEEP-DIVE',
    tags: ['Observability', 'Platform Engineering', 'DevOps'],
    videoUrl: 'https://www.youtube.com/@arunjose-placeholder',
    accentColor: 'yellow'
  },
  {
    id: 'yt-codebase-graphs',
    tapeCode: 'VHS-03 // CH-B',
    title: 'Turning Repositories into Knowledge Graphs with AST Parsing',
    summary:
      'Live coding session: parsing TypeScript and Python ASTs into a queryable dependency graph to give AI coding agents deterministic architectural context.',
    duration: '22:10',
    publishedLabel: 'CODE LAB',
    tags: ['AST', 'Software Intelligence', 'Developer Tools'],
    videoUrl: 'https://www.youtube.com/@arunjose-placeholder',
    accentColor: 'teal'
  },
  {
    id: 'yt-eu-eng-journey',
    tapeCode: 'VHS-04 // CH-B',
    title: 'From India to Germany & Denmark: MSc Web Engineering to Siemens Energy',
    summary:
      'Practical lessons on studying MSc Web Engineering at TU Chemnitz, working student roles in Germany, and transitioning into full-time software engineering in Denmark.',
    duration: '16:08',
    publishedLabel: 'CAREER LOG',
    tags: ['Career in Europe', 'TU Chemnitz', 'Software Engineering'],
    videoUrl: 'https://www.youtube.com/@arunjose-placeholder',
    accentColor: 'blue'
  }
];

export const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: 'pod-ep-01',
    episodeCode: 'EP.01 // SIDE A',
    title: 'Bridging Academic AI Research & Industrial Software Reliability',
    summary:
      'Why production engineering needs deterministic guardrails around LLMs—and how semantic schemas keep AI systems auditable in the real world.',
    duration: '34 MIN',
    guestOrTopic: 'TOPIC: VERIFIABLE AI & ENGINEERING',
    listenUrl: 'https://open.spotify.com/show/arunjose-podcast-placeholder',
    platforms: ['Spotify', 'Apple Podcasts', 'YouTube'],
    accentColor: 'teal'
  },
  {
    id: 'pod-ep-02',
    episodeCode: 'EP.02 // SIDE A',
    title: 'The Art of Eliminating Engineering Toil Through Automation',
    summary:
      'Stories from platform and infrastructure operations: spotting hidden manual bottlenecks, designing self-healing scripts, and building tools engineers actually love.',
    duration: '29 MIN',
    guestOrTopic: 'TOPIC: PLATFORM & DEVOPS AUTOMATION',
    listenUrl: 'https://open.spotify.com/show/arunjose-podcast-placeholder',
    platforms: ['Spotify', 'Apple Podcasts', 'YouTube'],
    accentColor: 'yellow'
  },
  {
    id: 'pod-ep-03',
    episodeCode: 'EP.03 // SIDE B',
    title: 'Knowledge Graphs Explained over Coffee: Entities, Edges & Reasoning',
    summary:
      'An approachable audio guide to property graphs, ontologies, and why connecting data points beats isolated tables when domains get complex.',
    duration: '31 MIN',
    guestOrTopic: 'TOPIC: SEMANTIC WEB & GRAPHS',
    listenUrl: 'https://open.spotify.com/show/arunjose-podcast-placeholder',
    platforms: ['Spotify', 'Apple Podcasts', 'YouTube'],
    accentColor: 'pink'
  },
  {
    id: 'pod-ep-04',
    episodeCode: 'EP.04 // SIDE B',
    title: 'Engineering Culture Across Borders: India, Germany & Nordic Work-Life',
    summary:
      'Reflections on adapting to new engineering cultures, communication styles, and building a fulfilling international career in tech.',
    duration: '38 MIN',
    guestOrTopic: 'TOPIC: GLOBAL TECH & CULTURE',
    listenUrl: 'https://open.spotify.com/show/arunjose-podcast-placeholder',
    platforms: ['Spotify', 'Apple Podcasts', 'YouTube'],
    accentColor: 'blue'
  }
];

export const TECH_TALKS: TalkItem[] = [
  {
    id: 'talk-hybrid-semantic-compliance',
    passCode: 'STAGE-PASS // 01',
    title: 'Hybrid Semantic Frameworks: Uniting Knowledge Graphs & Dense Retrieval for Compliance',
    event: 'Research Colloquium & Applied AI Session',
    location: 'Chemnitz, Germany / Hybrid',
    date: '2024',
    type: 'Guest Lecture',
    summary:
      'Presented the architecture and evaluation findings from my Master’s thesis on resolving regulatory ambiguity in export control compliance using graph-grounded RAG.',
    topics: ['Hybrid RAG', 'Knowledge Graphs', 'Explainable AI'],
    slidesUrl: '/research',
    recordingUrl: '/media#youtube-deck',
    accentColor: 'yellow'
  },
  {
    id: 'talk-observability-resilience',
    passCode: 'STAGE-PASS // 02',
    title: 'Designing Telemetry & Automated Diagnostics for Distributed Infrastructure',
    event: 'Platform & Infrastructure Engineering Lightning Talk',
    location: 'Denmark',
    date: '2025',
    type: 'Engineering Tech Talk',
    summary:
      'Shared practical patterns for turning noisy infrastructure alerts into high-signal telemetry dashboards and deterministic automated remediation workflows.',
    topics: ['Observability', 'Infrastructure Monitoring', 'Automation'],
    slidesUrl: '/projects',
    recordingUrl: '/media#podcast-deck',
    accentColor: 'teal'
  },
  {
    id: 'talk-codebase-knowledge-graphs',
    passCode: 'STAGE-PASS // 03',
    title: 'Graph-Backed Code Intelligence: Giving AI Agents Structural Memory',
    event: 'Developer Tooling & AI Engineering Meetup',
    location: 'Nordics / Online',
    date: '2025',
    type: 'Community Meetup',
    summary:
      'Demonstrated how AST-derived dependency graphs allow developer tools and AI assistants to reason over cross-module impact without blowing up token budgets.',
    topics: ['AST Parsing', 'Code Intelligence', 'Agentic Workflows'],
    slidesUrl: '/writing',
    recordingUrl: '/media#youtube-deck',
    accentColor: 'pink'
  }
];

export const SPEAKER_KIT = {
  headline: 'INVITE ARUN TO SPEAK, GUEST ON YOUR PODCAST, OR COLLABORATE',
  formats: [
    'Conference Keynotes & Track Talks (25–45 min)',
    'Podcast Guest Appearances & Live Engineering Panels',
    'University Guest Lectures & Applied AI Workshops',
    'Internal Engineering Tech Talks (Platform, Observability & Knowledge Graphs)'
  ],
  signatureTopics: [
    'Hybrid RAG & Knowledge Graphs in High-Stakes Domains',
    'Observability-First Platform Engineering & Automation',
    'Graph-Backed Code Intelligence & AST Tooling',
    'International Software Engineering Career (India → Germany → Denmark)'
  ],
  shortSpeakerBio:
    'Arun Jose is a Software Engineer at Siemens Energy in Denmark and holds an MSc in Web Engineering from TU Chemnitz, Germany. His work bridges resilient platform engineering, infrastructure observability, and applied AI research in Knowledge Graphs and Hybrid Retrieval-Augmented Generation. Beyond engineering, he shares systems insights through his YouTube channel, podcast, and technical talks.'
};


