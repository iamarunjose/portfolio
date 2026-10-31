import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const distDir = path.resolve('dist');
const srcMascotLib = path.resolve('src/lib/mascot-animation.ts');
const srcMascotController = path.resolve('src/lib/mascot-controller.ts');
const srcMascotCss = path.resolve('src/styles/mascot-animations.css');
const srcMascotsWrapperCss = path.resolve('src/styles/mascots.css');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✓ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`✗ FAIL: ${name}`);
    console.error(`  ${err.message}`);
    failed++;
  }
}

console.log('=== RETRO ARCADE MASCOTS — AUTOMATED TEST SUITE (8 CATEGORIES) ===\n');

const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
const projectsHtml = fs.readFileSync(path.join(distDir, 'projects/index.html'), 'utf-8');
const researchHtml = fs.readFileSync(path.join(distDir, 'research/index.html'), 'utf-8');
const writingHtml = fs.readFileSync(path.join(distDir, 'writing/index.html'), 'utf-8');
const articleHtml = fs.readFileSync(
  path.join(distDir, 'writing/engineering-reliable-infrastructure/index.html'),
  'utf-8'
);

const astroDir = path.join(distDir, '_astro');
const compiledCss = fs
  .readdirSync(astroDir)
  .filter((f) => f.endsWith('.css'))
  .map((f) => fs.readFileSync(path.join(astroDir, f), 'utf-8'))
  .join('\n');

const mascotLibSource = fs.readFileSync(srcMascotLib, 'utf-8');
const mascotCssSource = fs.readFileSync(srcMascotCss, 'utf-8');

// ---------------------------------------------------------------------------
// 1. Mascot Rendering & Placement Tests
// ---------------------------------------------------------------------------
test('1.1 Renders all 5 original arcade mascots on Homepage in their designated sections', () => {
  assert.ok(indexHtml.includes('id="hero-ajbot"'), 'Missing AJ-BOT in hero workstation');
  assert.ok(indexHtml.includes('id="footer-ajbot"'), 'Missing decorative AJ-BOT in footer');
  assert.ok(indexHtml.includes('id="hero-byte"'), 'Missing BYTE in hero workstation');
  assert.ok(
    indexHtml.includes('id="spark-home-infrastructure-monitoring-automation"'),
    'Missing SPARK on Infrastructure Monitoring & Automation project card'
  );
  assert.ok(
    indexHtml.includes('id="home-kg-viz-node-mascot"'),
    'Missing NODE in Research & Knowledge Graph section'
  );
  assert.ok(
    indexHtml.includes('id="home-pixel-mascot"'),
    'Missing PIXEL in Technical Writing section'
  );
});

test('1.2 Renders SPARK on /projects, NODE on /research, and PIXEL on /writing', () => {
  assert.ok(
    projectsHtml.includes('id="spark-page-infrastructure-monitoring-automation"'),
    'Missing SPARK on /projects page'
  );
  assert.ok(
    researchHtml.includes('id="research-page-kg-viz-node-mascot"'),
    'Missing NODE on /research page'
  );
  assert.ok(
    writingHtml.includes('id="writing-page-pixel-mascot"'),
    'Missing PIXEL on /writing page'
  );
});

test('1.3 Avoids continuous movement mascots inside long-form MDX article body', () => {
  assert.ok(
    !articleHtml.includes('data-mascot-name="pixel"'),
    'Long-form MDX article body should not have continuous moving PIXEL mascot'
  );
});

// ---------------------------------------------------------------------------
// 2. Animation State Transitions (Finite-State Machine Verification)
// ---------------------------------------------------------------------------
test('2.1 Supports all 6 required states (idle, walk, jump, wave, celebrate, sleep) in FSM & CSS', () => {
  const requiredStates = ['idle', 'walk', 'jump', 'wave', 'celebrate', 'sleep'];
  for (const state of requiredStates) {
    assert.ok(
      mascotLibSource.includes(`'${state}'`),
      `Mascot FSM missing state '${state}'`
    );
    assert.ok(
      mascotCssSource.includes(`data-mascot-state="${state}"`),
      `Mascot CSS missing selector for data-mascot-state="${state}"`
    );
  }
});

test('2.2 Finite-State Machine transitions deterministically for all 5 characters', () => {
  // Verify character state transition rules in FSM
  assert.ok(
    mascotLibSource.includes("this.setState('walk', 'WALK // ENTERING')"),
    'AJ-BOT ENTER transition should walk into view first'
  );
  assert.ok(
    mascotLibSource.includes("this.setState('idle', 'SYSTEM READY')"),
    'BYTE ENTER transition should initialize CRT display with SYSTEM READY'
  );
  assert.ok(
    mascotLibSource.includes("this.setState('celebrate', 'HELLO WORLD')"),
    'BYTE CLICK transition should display HELLO WORLD'
  );
  assert.ok(
    mascotLibSource.includes("this.setState('walk', 'TURBO RUN ⚡')"),
    'SPARK HOVER transition should trigger fast run'
  );
});

// ---------------------------------------------------------------------------
// 3. Click Interactions, Pointer Eye Tracking & Arcade Mode
// ---------------------------------------------------------------------------
test('3.1 Click interaction triggers celebrate state, updates BYTE screen to HELLO WORLD, and runs Web Animations API', () => {
  assert.ok(
    mascotLibSource.includes("stageEl.addEventListener('click', handleActivate"),
    'Missing click event listener on interactive mascot stages'
  );
  assert.ok(
    mascotLibSource.includes('data-byte-screen-text') &&
      indexHtml.includes('data-byte-screen-text'),
    'Missing BYTE CRT screen text element for SYSTEM READY -> HELLO WORLD transition'
  );
  assert.ok(
    mascotLibSource.includes('data-byte-pupils') &&
      indexHtml.includes('data-byte-pupils'),
    'Missing BYTE pointer-tracking pupil group (data-byte-pupils)'
  );
  assert.ok(
    mascotLibSource.includes('svgEl.animate('),
    'Missing Web Animations API sequence in mascot-animation.ts'
  );
});

test('3.2 Renders ARCADE MODE toggle, SFX control, and MOTION toggle as ON by default', () => {
  assert.ok(
    indexHtml.includes('id="arcade-mode-toggle"') &&
      indexHtml.includes('data-arcade-toggle') &&
      indexHtml.includes('ARCADE MODE: ON'),
    'ARCADE MODE toggle button in Header should default to ARCADE MODE: ON'
  );
  assert.ok(
    indexHtml.includes('id="arcade-mute-toggle"') &&
      indexHtml.includes('data-arcade-mute') &&
      indexHtml.includes('SFX: ON'),
    'SFX toggle button in Header should default to SFX: ON'
  );
  assert.ok(
    indexHtml.includes('id="motion-toggle-btn"') &&
      indexHtml.includes('MOTION: ON'),
    'MOTION toggle button in Header should default to MOTION: ON'
  );
  assert.ok(
    fs.existsSync(srcMascotController) && fs.existsSync(srcMascotsWrapperCss),
    'Missing src/lib/mascot-controller.ts or src/styles/mascots.css'
  );
});

// ---------------------------------------------------------------------------
// 4. Keyboard Interactions & Accessibility
// ---------------------------------------------------------------------------
test('4.1 Interactive mascots are keyboard accessible (role="button", tabindex="0", Enter & Space)', () => {
  assert.ok(
    indexHtml.includes('id="hero-ajbot"') &&
      indexHtml.includes('role="button"') &&
      indexHtml.includes('tabindex="0"'),
    'Interactive mascots must have role="button" and tabindex="0"'
  );
  assert.ok(
    mascotLibSource.includes("e.key === 'Enter' || e.key === ' '"),
    'Mascot keyboard handler must support both Enter and Space keys'
  );
});

test('4.2 Decorative footer mascot is hidden from assistive technologies (aria-hidden="true", no tabindex)', () => {
  const footerMatch = indexHtml.match(/<div[^>]*id="footer-ajbot"[^>]*>/);
  assert.ok(footerMatch, 'Could not find #footer-ajbot element');
  const tag = footerMatch[0];
  assert.ok(
    tag.includes('aria-hidden="true"'),
    'Decorative #footer-ajbot must have aria-hidden="true"'
  );
  assert.ok(
    !tag.includes('tabindex="0"'),
    'Decorative #footer-ajbot must not be in keyboard tab order'
  );
});

// ---------------------------------------------------------------------------
// 5. Reduced-Motion Behavior & Visible Motion Toggle
// ---------------------------------------------------------------------------
test('5.1 Respects prefers-reduced-motion in CSS and JS and provides visible MOTION toggle button', () => {
  assert.ok(
    compiledCss.includes('prefers-reduced-motion:reduce') ||
      compiledCss.includes('prefers-reduced-motion: reduce'),
    'Compiled CSS missing @media (prefers-reduced-motion: reduce)'
  );
  assert.ok(
    indexHtml.includes('id="motion-toggle-btn"') &&
      indexHtml.includes('data-motion-toggle'),
    'Missing visible decorative motion toggle button in Header'
  );
  assert.ok(
    mascotCssSource.includes('html.motion-disabled .mascot-stage *'),
    'Missing html.motion-disabled CSS pause rule'
  );
});

// ---------------------------------------------------------------------------
// 6. Mobile Responsiveness & Touch Guard
// ---------------------------------------------------------------------------
test('6.1 Uses tap instead of hover on mobile touch pointers and locks avatar dimensions to prevent CLS', () => {
  assert.ok(
    mascotLibSource.includes("e.pointerType !== 'mouse'"),
    'Hover listener must ignore touch pointers so mobile uses tap interactions'
  );
  assert.ok(
    mascotCssSource.includes('contain: layout style') &&
      mascotCssSource.includes('.mascot-avatar-wrap'),
    'Mascot stage must lock layout dimensions to prevent Cumulative Layout Shift'
  );
});

// ---------------------------------------------------------------------------
// 7. Animation Cleanup & Off-screen / Tab-Hidden Pause
// ---------------------------------------------------------------------------
test('7.1 Pauses animations when off-screen or browser tab is hidden and cleans up listeners/observers', () => {
  assert.ok(
    mascotLibSource.includes('IntersectionObserver') &&
      mascotLibSource.includes('data-mascot-offscreen'),
    'Missing IntersectionObserver off-screen pause logic'
  );
  assert.ok(
    mascotLibSource.includes('visibilitychange') &&
      mascotLibSource.includes('mascot-tab-hidden'),
    'Missing document visibilitychange handler to pause animations when tab is hidden'
  );
  assert.ok(
    mascotLibSource.includes('abortController.abort()') &&
      mascotLibSource.includes('obs.disconnect()'),
    'Missing complete listener and observer cleanup in initMascotSystem'
  );
});

// ---------------------------------------------------------------------------
// 8. GitHub Pages Production Build Compatibility
// ---------------------------------------------------------------------------
test('8.1 Production build generates valid static HTML/CSS/JS bundles for GitHub Pages', () => {
  const jsFiles = fs.readdirSync(astroDir).filter((f) => f.endsWith('.js'));
  assert.ok(jsFiles.length > 0, 'Expected compiled client JS bundle in dist/_astro');
  const combinedJs = jsFiles
    .map((f) => fs.readFileSync(path.join(astroDir, f), 'utf-8'))
    .join('\n');
  assert.ok(
    combinedJs.includes('HELLO WORLD') && combinedJs.includes('SYSTEM READY'),
    'Compiled client JS bundle must include mascot state machine logic'
  );
});

console.log(`\n==============================================================`);
console.log(`MASCOT TEST SUITE SUMMARY: ${passed} passed, ${failed} failed`);
if (failed > 0) {
  process.exit(1);
}

