import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');

const expectedPages = [
  'index.html',
  'projects/index.html',
  'experience/index.html',
  'research/index.html',
  'writing/index.html',
  'writing/engineering-reliable-infrastructure/index.html',
  'writing/knowledge-graphs-for-code-intelligence/index.html',
  'writing/retrieval-augmented-generation/index.html',
  'writing/software-automation-and-developer-productivity/index.html',
  'media/index.html',
  'about/index.html',
  'contact/index.html',
  'cv/index.html',
  '404.html',
  'rss.xml',
  'sitemap-index.xml',
  'Arun_Jose_CV_Placeholder.txt'
];

let failures = 0;

function pass(msg) {
  console.log(`✓ PASS: ${msg}`);
}

function fail(msg) {
  console.error(`✗ FAIL: ${msg}`);
  failures++;
}

console.log('=== ARUN JOSE RETRO MEMPHIS PORTFOLIO — AUTOMATED QA SUITE ===\n');

// 1. Check all expected build artifacts exist
for (const relPath of expectedPages) {
  const fullPath = path.join(distDir, relPath);
  if (fs.existsSync(fullPath)) {
    pass(`Built artifact exists: dist/${relPath}`);
  } else {
    fail(`Missing built artifact: dist/${relPath}`);
  }
}

// 2. Check CSS design tokens in compiled stylesheet
const astroAssetsDir = path.join(distDir, '_astro');
if (fs.existsSync(astroAssetsDir)) {
  const cssFiles = fs.readdirSync(astroAssetsDir).filter((f) => f.endsWith('.css'));
  const combinedCss = cssFiles
    .map((f) => fs.readFileSync(path.join(astroAssetsDir, f), 'utf-8'))
    .join('\n')
    .toUpperCase();

  const requiredHexTokens = ['#FFF7E8', '#FFDE43', '#FF5793', '#38D8C4', '#377AF5', '#171717'];
  for (const hex of requiredHexTokens) {
    if (combinedCss.includes(hex)) {
      pass(`Design token verified in compiled CSS: ${hex}`);
    } else {
      fail(`Missing design token in compiled CSS: ${hex}`);
    }
  }
} else {
  fail('dist/_astro directory not found');
}

// 3. Verify Homepage structure, content, accessibility & SEO
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

const requiredHomeSnippets = [
  'Arun Jose',
  'Building useful software, exploring intelligent systems, and connecting engineering with research.',
  'View My Work',
  'About Me',
  'Hybrid Semantic Framework for Export Control Compliance',
  'Infrastructure Monitoring &amp; Automation',
  'Code Intelligence Lab',
  'Siemens Energy',
  'Siemens Gamesa',
  'Siemens AG',
  'Technische Universität Chemnitz',
  'MTV-86 // YOUTUBE VIDEO DECK',
  'FM.86 // PODCAST CASSETTE DECK',
  'VIP STAGE PASS // CONFERENCE &amp; LECTURE LOG',
  'property="og:title"',
  'rel="canonical"',
  'application/rss+xml'
];

for (const snippet of requiredHomeSnippets) {
  if (indexHtml.includes(snippet)) {
    pass(`Homepage contains required content/metadata: "${snippet.slice(0, 50)}"`);
  } else {
    fail(`Homepage missing required content/metadata: "${snippet}"`);
  }
}

// 4. Verify Accessibility Landmarks & Single H1 per HTML page
const htmlPages = expectedPages.filter((p) => p.endsWith('.html'));
for (const page of htmlPages) {
  const html = fs.readFileSync(path.join(distDir, page), 'utf-8');
  const h1Matches = html.match(/<h1[\s>]/gi) || [];
  if (h1Matches.length === 1) {
    pass(`Page dist/${page} has exactly 1 <h1> heading`);
  } else {
    fail(`Page dist/${page} has ${h1Matches.length} <h1> headings (expected 1)`);
  }

  if (html.includes('<main id="main-content"')) {
    pass(`Page dist/${page} includes accessible <main id="main-content"> landmark`);
  } else {
    fail(`Page dist/${page} missing <main id="main-content"> landmark`);
  }
}

// 5. Verify RSS XML has no <pubDate> for unpublished drafts
const rssXml = fs.readFileSync(path.join(distDir, 'rss.xml'), 'utf-8');
if (!rssXml.includes('<pubDate>')) {
  pass('RSS feed omits <pubDate> for unpublished draft articles');
} else {
  fail('RSS feed unexpectedly assigned <pubDate> to unpublished draft articles');
}

// 6. Verify Animations 1–7 & Reduced Motion Accessibility
const requiredAnimationMarkers = [
  { label: 'Animation 1 (Retro System Boot)', marker: 'data-boot-scramble' },
  { label: 'Animation 1 (Boot Initial Status)', marker: 'SYS.86 // INITIALIZING' },
  { label: 'Animation 1 (Boot Ready Status)', marker: 'SYS.86 // SYSTEM READY' },
  { label: 'Animation 2 (Interactive Memphis Shapes)', marker: 'data-memphis-shape' },
  { label: 'Animation 3 (Scroll-Driven Headline Highlights)', marker: 'data-heading-highlight' },
  { label: 'Animation 4 (Neo-Brutalist Project Cards)', marker: 'data-project-card' },
  { label: 'Animation 5 (Career Logbook Spine)', marker: 'data-logbook-spine' },
  { label: 'Animation 5 (Career Logbook Hinged Entries)', marker: 'data-logbook-entry' },
  { label: 'Animation 6 (Interactive Knowledge Graph SVG)', marker: 'data-kg-widget' },
  { label: 'Animation 7 (Paper-Edge Section Transitions)', marker: 'data-paper-edge' }
];

for (const item of requiredAnimationMarkers) {
  if (indexHtml.includes(item.marker)) {
    pass(`Verified ${item.label}: "${item.marker}"`);
  } else {
    fail(`Missing ${item.label}: "${item.marker}"`);
  }
}

console.log('\n==============================================================');
if (failures > 0) {
  console.error(`Automated checks failed with ${failures} error(s).`);
  process.exit(1);
} else {
  console.log('ALL AUTOMATED DESIGN SYSTEM, ACCESSIBILITY & BUILD CHECKS PASSED!');
}

