import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const outDir = path.resolve('public/linkedin-brochure');
const artifactDir = 'C:/Users/Arun Jose/.gemini/antigravity/brain/2c634e79-e4f6-41bf-9d1b-dec23fd803ae';
fs.mkdirSync(outDir, { recursive: true });

const sharedStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  :root {
    --bg: #FFF7E8;
    --paper: #FFFDF9;
    --yellow: #FFDE43;
    --pink: #FF5793;
    --teal: #38D8C4;
    --blue: #377AF5;
    --ink: #171717;
    --font-display: 'Archivo Black', 'Arial Black', 'Impact', sans-serif;
    --font-sans: 'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif;
    --font-mono: 'Space Mono', 'Consolas', 'Courier New', monospace;
  }
  html, body {
    background: var(--ink);
    color: var(--ink);
    font-family: var(--font-sans);
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .brochure-page {
    width: 1080px;
    height: 1350px;
    background-color: var(--bg);
    background-image:
      linear-gradient(to right, rgba(23, 23, 23, 0.08) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(23, 23, 23, 0.08) 1px, transparent 1px);
    background-size: 36px 36px;
    border: 8px solid var(--ink);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    page-break-after: always;
    break-after: page;
  }
  .top-bar {
    background: var(--ink);
    color: var(--bg);
    font-family: var(--font-mono);
    font-size: 16px;
    font-weight: 700;
    padding: 14px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 5px solid var(--ink);
    letter-spacing: 0.05em;
  }
  .top-bar-badge {
    background: var(--pink);
    color: var(--ink);
    padding: 4px 12px;
    border: 2px solid var(--bg);
    font-size: 14px;
    font-weight: 700;
  }
  .bottom-bar {
    background: var(--yellow);
    color: var(--ink);
    border-top: 5px solid var(--ink);
    padding: 16px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: var(--font-mono);
    font-size: 16px;
    font-weight: 700;
  }
  .page-content {
    flex: 1;
    padding: 40px 48px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    z-index: 2;
  }
  .memphis-label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 8px 18px;
    border: 3.5px solid var(--ink);
    box-shadow: 5px 5px 0px var(--ink);
    color: var(--ink);
  }
  .hero-title {
    font-family: var(--font-display);
    font-weight: 900;
    text-transform: uppercase;
    line-height: 0.94;
    letter-spacing: -0.025em;
    color: var(--ink);
    text-shadow:
      5px 5px 0px var(--yellow),
      10px 10px 0px var(--pink);
  }
  .section-title {
    font-family: var(--font-display);
    font-weight: 900;
    text-transform: uppercase;
    line-height: 0.98;
    letter-spacing: -0.02em;
    color: var(--ink);
    text-shadow:
      4px 4px 0px var(--yellow),
      8px 8px 0px var(--pink);
  }
  .card {
    background: var(--paper);
    border: 4px solid var(--ink);
    box-shadow: 8px 8px 0px var(--ink);
  }
  .window-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 18px;
    border-bottom: 4px solid var(--ink);
    font-family: var(--font-mono);
    font-size: 15px;
    font-weight: 700;
    text-transform: uppercase;
  }
  .dots {
    display: flex;
    gap: 7px;
    align-items: center;
  }
  .dot {
    width: 14px;
    height: 14px;
    border-radius: 999px;
    border: 2.5px solid var(--ink);
    display: inline-block;
  }
  .tag {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 700;
    padding: 5px 12px;
    border: 2.5px solid var(--ink);
    background: var(--bg);
    box-shadow: 3px 3px 0px var(--ink);
  }
  .bg-yellow { background-color: var(--yellow); color: var(--ink); }
  .bg-pink { background-color: var(--pink); color: var(--ink); }
  .bg-teal { background-color: var(--teal); color: var(--ink); }
  .bg-blue { background-color: var(--blue); color: #FFFFFF; }
  .bg-paper { background-color: var(--paper); color: var(--ink); }
  .bg-cream { background-color: var(--bg); color: var(--ink); }
  .bg-ink { background-color: var(--ink); color: var(--bg); }
  @page {
    size: 1080px 1350px;
    margin: 0;
  }
`;

// PAGE 1: COVER
const page1Html = `
<section class="brochure-page">
  <div class="top-bar">
    <span>■ SYS.86 // ARUN_JOSE.PORTFOLIO // LINKEDIN BROCHURE</span>
    <span class="top-bar-badge">PAGE 01 / 05</span>
  </div>

  <div class="page-content">
    <!-- Top Identity Row -->
    <div style="display:flex; align-items:center; justify-content:space-between;">
      <div style="display:flex; align-items:center; gap:18px;">
        <div style="width:68px; height:68px; background:var(--yellow); border:4px solid var(--ink); box-shadow:6px 6px 0px var(--pink); display:flex; align-items:center; justify-content:center; font-family:var(--font-display); font-weight:900; font-size:32px;">
          AJ
        </div>
        <div>
          <div style="font-family:var(--font-display); font-weight:900; font-size:26px; text-transform:uppercase;">ARUN JOSE</div>
          <div style="font-family:var(--font-mono); font-weight:700; font-size:15px; color:#333;">SOFTWARE ENGINEER // DENMARK</div>
        </div>
      </div>
      <div style="display:flex; gap:12px;">
        <span class="memphis-label bg-yellow" style="transform:rotate(-2deg);">SIEMENS ENERGY</span>
        <span class="memphis-label bg-teal" style="transform:rotate(2deg);">MSc TU CHEMNITZ</span>
      </div>
    </div>

    <!-- Giant Display Title + Quote -->
    <div style="margin-top:12px;">
      <div class="hero-title" style="font-size:112px;">ARUN JOSE</div>
      <div class="card" style="margin-top:22px; padding:26px 30px; border-left:14px solid var(--pink);">
        <p style="font-size:28px; font-weight:800; line-height:1.32; color:var(--ink);">
          “Building useful software, exploring intelligent systems, and connecting engineering with research.”
        </p>
      </div>
    </div>

    <!-- Centerpiece 80s Memphis Workstation & Portrait Illustration -->
    <div class="card" style="overflow:hidden;">
      <div class="window-bar bg-blue">
        <div class="dots">
          <span class="dot bg-yellow"></span>
          <span class="dot bg-pink"></span>
          <span class="dot bg-teal"></span>
          <span style="margin-left:8px;">WORKSTATION_86 // ENGINEER + RESEARCHER BENCH</span>
        </div>
        <span style="background:var(--yellow); color:var(--ink); padding:2px 10px; border:2px solid var(--ink); font-size:13px;">AI + INFRA</span>
      </div>
      <div style="padding:24px; background:var(--bg); display:grid; grid-template-columns: 320px 1fr; gap:24px; align-items:center;">
        <!-- 1980s Memphis Illustrated Portrait Box -->
        <div class="card" style="background:var(--pink); padding:0; overflow:hidden; text-align:center;">
          <div style="background:var(--pink); border-bottom:4px solid var(--ink); padding:8px 14px; display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-weight:700; font-size:13px;">
            <span style="display:flex; gap:6px; align-items:center;">
              <span style="width:11px; height:11px; border-radius:99px; background:var(--yellow); border:2px solid var(--ink); display:inline-block;"></span>
              <span style="width:11px; height:11px; border-radius:99px; background:var(--teal); border:2px solid var(--ink); display:inline-block;"></span>
              <span style="margin-left:4px;">PORTRAIT.BMP</span>
            </span>
            <span>8-BIT</span>
          </div>
          <div style="padding:12px; background:var(--paper);">
            <img src="../images/arun-portrait-memphis.jpg" alt="Arun Jose 1980s Memphis Portrait" style="width:100%; height:210px; object-fit:cover; object-position:center center; border:3.5px solid var(--ink); display:block;" />
            <div style="margin-top:10px; background:var(--yellow); border:3px solid var(--ink); padding:6px; font-family:var(--font-mono); font-weight:700; font-size:13px;">
              ARUN JOSE // PORTRAIT
            </div>
          </div>
        </div>

        <!-- Retro CRT Knowledge Graph Terminal -->
        <div style="display:flex; flex-direction:column; gap:14px;">
          <div style="background:var(--ink); border:4px solid var(--ink); padding:18px; color:var(--bg); box-shadow:6px 6px 0px var(--pink);">
            <div style="display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:14px; font-weight:700; color:var(--teal); border-bottom:2px solid #333; padding-bottom:8px; margin-bottom:12px;">
              <span>> KNOWLEDGE_GRAPH_ENGINE.SYS</span>
              <span style="color:var(--yellow);">[ONLINE]</span>
            </div>
            <svg viewBox="0 0 500 135" style="width:100%; height:130px; display:block;">
              <line x1="80" y1="65" x2="210" y2="40" stroke="#FFDE43" stroke-width="4"/>
              <line x1="80" y1="65" x2="190" y2="105" stroke="#38D8C4" stroke-width="4"/>
              <line x1="210" y1="40" x2="360" y2="50" stroke="#FF5793" stroke-width="4"/>
              <line x1="190" y1="105" x2="360" y2="100" stroke="#FFDE43" stroke-width="4"/>
              <line x1="210" y1="40" x2="360" y2="100" stroke="#38D8C4" stroke-width="3" stroke-dasharray="6 6"/>

              <circle cx="80" cy="65" r="30" fill="#FF5793" stroke="#FFF7E8" stroke-width="3.5"/>
              <text x="80" y="70" text-anchor="middle" font-family="Space Mono, monospace" font-weight="700" font-size="14" fill="#171717">RAG</text>

              <circle cx="210" cy="40" r="30" fill="#FFDE43" stroke="#FFF7E8" stroke-width="3.5"/>
              <text x="210" y="45" text-anchor="middle" font-family="Space Mono, monospace" font-weight="700" font-size="14" fill="#171717">KG</text>

              <circle cx="190" cy="105" r="26" fill="#377AF5" stroke="#FFF7E8" stroke-width="3.5"/>
              <text x="190" y="110" text-anchor="middle" font-family="Space Mono, monospace" font-weight="700" font-size="13" fill="#FFF7E8">AST</text>

              <rect x="320" y="25" width="145" height="42" fill="#38D8C4" stroke="#FFF7E8" stroke-width="3"/>
              <text x="392" y="51" text-anchor="middle" font-family="Space Mono, monospace" font-weight="700" font-size="13" fill="#171717">OBSERVABILITY</text>

              <rect x="320" y="78" width="145" height="42" fill="#FFDE43" stroke="#FFF7E8" stroke-width="3"/>
              <text x="392" y="104" text-anchor="middle" font-family="Space Mono, monospace" font-weight="700" font-size="13" fill="#171717">VERIFIABLE AI</text>
            </svg>
          </div>

          <!-- Core Focus Pills -->
          <div style="display:flex; flex-wrap:wrap; gap:10px;">
            <span class="tag bg-yellow">Platform Engineering</span>
            <span class="tag bg-teal">Infrastructure Monitoring</span>
            <span class="tag bg-pink">DevOps & Automation</span>
            <span class="tag bg-paper">Knowledge Graphs</span>
            <span class="tag bg-yellow">Software Intelligence</span>
            <span class="tag bg-teal">Applied AI Research</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Callout Banner -->
    <div class="card bg-pink" style="padding:18px 28px; display:flex; align-items:center; justify-content:space-between;">
      <span style="font-family:var(--font-display); font-weight:900; font-size:22px; text-transform:uppercase;">
        1980s MEMPHIS × NEO-BRUTALIST PORTFOLIO LAUNCH
      </span>
      <span style="background:var(--yellow); border:3px solid var(--ink); padding:6px 16px; font-family:var(--font-mono); font-weight:700; font-size:15px; box-shadow:4px 4px 0px var(--ink);">
        SWIPE FOR TOUR →
      </span>
    </div>
  </div>

  <div class="bottom-bar">
    <span>ARUN JOSE // SOFTWARE ENGINEER @ SIEMENS ENERGY</span>
    <span>[BROCHURE PAGE 01 / 05] →</span>
  </div>
</section>
`;

// PAGE 2: FEATURED PROJECTS
const page2Html = `
<section class="brochure-page" style="background-color: var(--teal);">
  <div class="top-bar">
    <span>■ FEATURED WORK // VINTAGE PRINTED PROJECT PANELS</span>
    <span class="top-bar-badge" style="background:var(--yellow);">PAGE 02 / 05</span>
  </div>

  <div class="page-content">
    <div>
      <span class="memphis-label bg-yellow" style="transform:rotate(-1.5deg);">CASE STUDIES // 01–03</span>
      <div class="section-title" style="font-size:74px; margin-top:12px;">FEATURED PROJECTS</div>
      <p style="font-size:21px; font-weight:700; margin-top:8px; color:var(--ink);">
        Bridging academic applied AI research, enterprise platform reliability, and open-source software intelligence.
      </p>
    </div>

    <!-- 3 Project Panels -->
    <div style="display:flex; flex-direction:column; gap:24px;">
      <!-- Project 1 -->
      <div class="card">
        <div class="window-bar bg-yellow">
          <div class="dots">
            <span class="dot bg-paper"></span>
            <span class="dot bg-pink"></span>
            <span class="dot bg-teal"></span>
          </div>
          <span>PRJ-01 // MASTER'S RESEARCH (TU CHEMNITZ)</span>
          <span style="background:var(--pink); padding:2px 10px; border:2px solid var(--ink);">THESIS ARTIFACT</span>
        </div>
        <div style="padding:22px 26px;">
          <div style="font-family:var(--font-display); font-weight:900; font-size:27px; text-transform:uppercase;">
            Hybrid Semantic Framework for Export Control Compliance
          </div>
          <p style="font-size:18px; line-height:1.45; margin-top:8px; color:#222;">
            Unites dense vector retrieval with symbolic Knowledge Graph traversal to resolve multi-hop regulatory classifications with traceable, explainable evidence chains.
          </p>
          <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:14px;">
            <span class="tag bg-yellow">Hybrid RAG</span>
            <span class="tag bg-Cream">Knowledge Graphs</span>
            <span class="tag bg-Cream">Semantic Reasoning</span>
            <span class="tag bg-Cream">NLP</span>
            <span class="tag bg-Cream">Vector Search</span>
          </div>
        </div>
      </div>

      <!-- Project 2 -->
      <div class="card">
        <div class="window-bar bg-pink">
          <div class="dots">
            <span class="dot bg-paper"></span>
            <span class="dot bg-yellow"></span>
            <span class="dot bg-teal"></span>
          </div>
          <span>PRJ-02 // PROFESSIONAL EXPERIENCE</span>
          <span style="background:var(--yellow); padding:2px 10px; border:2px solid var(--ink);">ENTERPRISE PLATFORM</span>
        </div>
        <div style="padding:22px 26px;">
          <div style="font-family:var(--font-display); font-weight:900; font-size:27px; text-transform:uppercase;">
            Infrastructure Monitoring & Automation
          </div>
          <p style="font-size:18px; line-height:1.45; margin-top:8px; color:#222;">
            Resilient observability pipelines, high-signal health telemetry, and reproducible CI/CD automation routines designed to eliminate manual operational toil.
          </p>
          <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:14px;">
            <span class="tag bg-teal">Platform Engineering</span>
            <span class="tag bg-Cream">Observability</span>
            <span class="tag bg-Cream">DevOps Automation</span>
            <span class="tag bg-Cream">CI/CD</span>
            <span class="tag bg-Cream">Reliability</span>
          </div>
        </div>
      </div>

      <!-- Project 3 -->
      <div class="card">
        <div class="window-bar bg-blue">
          <div class="dots">
            <span class="dot bg-yellow"></span>
            <span class="dot bg-pink"></span>
            <span class="dot bg-teal"></span>
          </div>
          <span>PRJ-03 // PROPOSED OPEN-SOURCE PROJECT</span>
          <span style="background:var(--yellow); color:var(--ink); padding:2px 10px; border:2px solid var(--ink);">R&D CONCEPT</span>
        </div>
        <div style="padding:22px 26px;">
          <div style="font-family:var(--font-display); font-weight:900; font-size:27px; text-transform:uppercase;">
            Code Intelligence Lab
          </div>
          <p style="font-size:18px; line-height:1.45; margin-top:8px; color:#222;">
            Experimental workbench combining AST parsing, dependency property graphs, and hybrid retrieval for verifiable repository-scale impact analysis and developer tools.
          </p>
          <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:14px;">
            <span class="tag bg-pink">Software Intelligence</span>
            <span class="tag bg-Cream">Code Graphs</span>
            <span class="tag bg-Cream">AST Analysis</span>
            <span class="tag bg-Cream">Developer Productivity</span>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-yellow" style="padding:14px 22px; font-family:var(--font-mono); font-size:14px; font-weight:700;">
      GOVERNANCE NOTE: Public overviews highlight methodology & patterns; confidential internal architectures are strictly omitted.
    </div>
  </div>

  <div class="bottom-bar">
    <span>FEATURED PROJECTS // RESEARCH & PLATFORM ENGINEERING</span>
    <span>[BROCHURE PAGE 02 / 05] →</span>
  </div>
</section>
`;

// PAGE 3: RESEARCH & HYBRID RAG ARCHITECTURE
const page3Html = `
<section class="brochure-page">
  <div class="top-bar">
    <span>■ APPLIED AI RESEARCH // SEMANTIC & GRAPH SYSTEMS</span>
    <span class="top-bar-badge" style="background:var(--teal);">PAGE 03 / 05</span>
  </div>

  <div class="page-content">
    <div>
      <span class="memphis-label bg-pink" style="transform:rotate(1.5deg);">RESEARCH LAB // TU CHEMNITZ & BEYOND</span>
      <div class="section-title" style="font-size:70px; margin-top:12px;">HYBRID RAG & GRAPHS</div>
      <p style="font-size:20px; font-weight:700; margin-top:8px; color:#222;">
        Combining neural language models with explicit symbolic structures for verifiable, grounded engineering intelligence.
      </p>
    </div>

    <!-- Custom SVG Architecture Diagram Card -->
    <div class="card">
      <div class="window-bar bg-blue">
        <span>FIG 02 // HYBRID_SEMANTIC_COMPLIANCE_PIPELINE.SVG</span>
        <span style="background:var(--yellow); color:var(--ink); padding:2px 10px; border:2px solid var(--ink);">ARCHITECTURE</span>
      </div>
      <div style="padding:20px 28px; background:var(--bg);">
        <svg viewBox="0 0 900 280" style="width:100%; height:245px; display:block;">
          <!-- Query Box -->
          <rect x="24" y="88" width="175" height="114" fill="#171717"/>
          <rect x="16" y="80" width="175" height="114" fill="#FFDE43" stroke="#171717" stroke-width="4"/>
          <text x="103" y="128" text-anchor="middle" font-family="Space Mono, monospace" font-weight="700" font-size="17" fill="#171717">TECHNICAL SPEC</text>
          <text x="103" y="152" text-anchor="middle" font-family="Space Mono, monospace" font-weight="700" font-size="17" fill="#171717">&amp; REGULATORY</text>
          <text x="103" y="176" text-anchor="middle" font-family="Space Mono, monospace" font-weight="700" font-size="17" fill="#171717">QUERY</text>

          <!-- Connector Lines -->
          <path d="M191 115 L285 65" stroke="#171717" stroke-width="5" fill="none"/>
          <path d="M191 165 L285 215" stroke="#171717" stroke-width="5" fill="none"/>

          <!-- Channel 1: Dense Vector -->
          <rect x="293" y="22" width="270" height="98" fill="#171717"/>
          <rect x="285" y="14" width="270" height="98" fill="#38D8C4" stroke="#171717" stroke-width="4"/>
          <text x="420" y="54" text-anchor="middle" font-family="Space Mono, monospace" font-weight="700" font-size="18" fill="#171717">DENSE VECTOR INDEX</text>
          <text x="420" y="78" text-anchor="middle" font-family="Space Mono, monospace" font-weight="700" font-size="14" fill="#171717">Semantic Embeddings &amp; Recall</text>
          <text x="420" y="98" text-anchor="middle" font-family="Space Mono, monospace" font-size="13" fill="#171717">[Captures Conceptual Equivalence]</text>

          <!-- Channel 2: Knowledge Graph -->
          <rect x="293" y="168" width="270" height="98" fill="#171717"/>
          <rect x="285" y="160" width="270" height="98" fill="#FF5793" stroke="#171717" stroke-width="4"/>
          <text x="420" y="200" text-anchor="middle" font-family="Space Mono, monospace" font-weight="700" font-size="18" fill="#171717">KNOWLEDGE GRAPH</text>
          <text x="420" y="224" text-anchor="middle" font-family="Space Mono, monospace" font-weight="700" font-size="14" fill="#171717">Ontology &amp; Multi-Hop Traversal</text>
          <text x="420" y="244" text-anchor="middle" font-family="Space Mono, monospace" font-size="13" fill="#171717">[Enforces Structural Rules]</text>

          <!-- Connectors to Fusion -->
          <path d="M555 65 L645 115" stroke="#171717" stroke-width="5" fill="none"/>
          <path d="M555 215 L645 165" stroke="#171717" stroke-width="5" fill="none"/>

          <!-- Fusion Output Box -->
          <rect x="653" y="64" width="230" height="156" fill="#171717"/>
          <rect x="645" y="56" width="230" height="156" fill="#FFFDF9" stroke="#171717" stroke-width="4"/>
          <rect x="645" y="56" width="230" height="36" fill="#377AF5" stroke="#171717" stroke-width="4"/>
          <text x="760" y="80" text-anchor="middle" font-family="Space Mono, monospace" font-weight="700" font-size="15" fill="#FFFFFF">HYBRID REASONER</text>
          <text x="760" y="122" text-anchor="middle" font-family="Space Mono, monospace" font-weight="700" font-size="17" fill="#171717">RANK FUSION +</text>
          <text x="760" y="148" text-anchor="middle" font-family="Space Mono, monospace" font-weight="700" font-size="17" fill="#171717">TRACEABLE EVIDENCE</text>
          <text x="760" y="174" text-anchor="middle" font-family="Space Mono, monospace" font-weight="700" font-size="17" fill="#171717">&amp; VERIFICATION</text>
        </svg>
      </div>
    </div>

    <!-- 4 Research Pillars Grid -->
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:22px;">
      <div class="card" style="padding:22px; border-top:10px solid var(--yellow);">
        <div style="font-family:var(--font-mono); font-size:14px; font-weight:700; color:var(--blue);">RES-01 // MASTER'S THESIS</div>
        <div style="font-family:var(--font-display); font-weight:900; font-size:22px; text-transform:uppercase; margin-top:6px;">
          Export Control Compliance AI
        </div>
        <p style="font-size:16px; line-height:1.45; margin-top:8px;">
          Modeled regulatory hierarchies and technical concepts to assist complex classification with human-in-the-loop verification.
        </p>
      </div>

      <div class="card" style="padding:22px; border-top:10px solid var(--teal);">
        <div style="font-family:var(--font-mono); font-size:14px; font-weight:700; color:var(--blue);">RES-02 // HYBRID RETRIEVAL</div>
        <div style="font-family:var(--font-display); font-weight:900; font-size:22px; text-transform:uppercase; margin-top:6px;">
          Vector + Symbolic Graph RAG
        </div>
        <p style="font-size:16px; line-height:1.45; margin-top:8px;">
          Fusing dense embeddings, lexical BM25 precision, and graph neighborhood assembly to mitigate hallucinations.
        </p>
      </div>

      <div class="card" style="padding:22px; border-top:10px solid var(--pink);">
        <div style="font-family:var(--font-mono); font-size:14px; font-weight:700; color:var(--blue);">RES-03 // SEMANTIC SYSTEMS</div>
        <div style="font-family:var(--font-display); font-weight:900; font-size:22px; text-transform:uppercase; margin-top:6px;">
          Knowledge Graphs & NLP
        </div>
        <p style="font-size:16px; line-height:1.45; margin-top:8px;">
          Property graphs, entity linking, and domain-adapted NLP for technical corpora and large software repositories.
        </p>
      </div>

      <div class="card" style="padding:22px; border-top:10px solid var(--blue);">
        <div style="font-family:var(--font-mono); font-size:14px; font-weight:700; color:var(--blue);">RES-04 // FUTURE HORIZONS</div>
        <div style="font-family:var(--font-display); font-weight:900; font-size:22px; text-transform:uppercase; margin-top:6px;">
          Verifiable AI Engineering
        </div>
        <p style="font-size:16px; line-height:1.45; margin-top:8px;">
          Neuro-symbolic guardrails, citation-grounded generation, and deterministic policy checks for critical systems.
        </p>
      </div>
    </div>
  </div>

  <div class="bottom-bar">
    <span>APPLIED AI RESEARCH // HYBRID RAG & KNOWLEDGE GRAPHS</span>
    <span>[BROCHURE PAGE 03 / 05] →</span>
  </div>
</section>
`;

// PAGE 4: EXPERIENCE & PHILOSOPHY
const page4Html = `
<section class="brochure-page" style="background-color: var(--yellow);">
  <div class="top-bar">
    <span>■ SIEMENS ENGINEERING JOURNEY // DENMARK • GERMANY • INDIA</span>
    <span class="top-bar-badge" style="background:var(--pink);">PAGE 04 / 05</span>
  </div>

  <div class="page-content">
    <div>
      <span class="memphis-label bg-teal" style="transform:rotate(-1.5deg);">CAREER CHRONOLOGY & CRAFT</span>
      <div class="section-title" style="font-size:68px; margin-top:12px;">EXPERIENCE & TENETS</div>
      <p style="font-size:20px; font-weight:700; margin-top:8px; color:var(--ink);">
        International engineering experience across Siemens organizations paired with graduate research in Germany.
      </p>
    </div>

    <!-- Timeline Stack -->
    <div style="display:flex; flex-direction:column; gap:16px;">
      <div class="card" style="padding:18px 24px; display:flex; align-items:center; justify-content:space-between; border-left:14px solid var(--teal);">
        <div>
          <div style="font-family:var(--font-mono); font-size:14px; font-weight:700; color:var(--blue);">STEP 01 // FULL-TIME ROLE • DENMARK</div>
          <div style="font-family:var(--font-display); font-weight:900; font-size:26px; text-transform:uppercase; margin-top:2px;">
            Siemens Energy — Software Engineer
          </div>
          <p style="font-size:16px; margin-top:4px; color:#222;">
            Platform engineering, infrastructure automation, system observability, and resilient software delivery.
          </p>
        </div>
        <span class="memphis-label bg-yellow" style="white-space:nowrap;">2026–PRESENT</span>
      </div>

      <div class="card" style="padding:18px 24px; display:flex; align-items:center; justify-content:space-between; border-left:14px solid var(--pink);">
        <div>
          <div style="font-family:var(--font-mono); font-size:14px; font-weight:700; color:var(--blue);">STEP 02 // WORKING STUDENT • GERMANY</div>
          <div style="font-family:var(--font-display); font-weight:900; font-size:26px; text-transform:uppercase; margin-top:2px;">
            Siemens Gamesa — Working Student
          </div>
          <p style="font-size:16px; margin-top:4px; color:#222;">
            Infrastructure monitoring workflows, DevOps tooling, and engineering automation alongside MSc studies.
          </p>
        </div>
        <span class="memphis-label bg-teal" style="white-space:nowrap;">2023–2026</span>
      </div>

      <div class="card" style="padding:18px 24px; display:flex; align-items:center; justify-content:space-between; border-left:14px solid var(--blue);">
        <div>
          <div style="font-family:var(--font-mono); font-size:14px; font-weight:700; color:var(--blue);">STEP 03 // WORKING STUDENT • GERMANY</div>
          <div style="font-family:var(--font-display); font-weight:900; font-size:26px; text-transform:uppercase; margin-top:2px;">
            Siemens AG — Working Student
          </div>
          <p style="font-size:16px; margin-top:4px; color:#222;">
            Software development, automated testing workflows, and internal web engineering enhancements.
          </p>
        </div>
        <span class="memphis-label bg-pink" style="white-space:nowrap;">2022</span>
      </div>

      <div class="card" style="padding:18px 24px; display:flex; align-items:center; justify-content:space-between; border-left:14px solid var(--yellow);">
        <div>
          <div style="font-family:var(--font-mono); font-size:14px; font-weight:700; color:var(--blue);">STEP 04 // FULL-TIME ENGINEERING • INDIA</div>
          <div style="font-family:var(--font-display); font-weight:900; font-size:26px; text-transform:uppercase; margin-top:2px;">
            Siemens Gamesa — Software Engineering
          </div>
          <p style="font-size:16px; margin-top:4px; color:#222;">
            Enterprise software components, backend & web workflows, and production engineering lifecycle delivery.
          </p>
        </div>
        <span class="memphis-label bg-cream" style="white-space:nowrap;">2018–2021</span>
      </div>
    </div>

    <!-- Education + Philosophy Row -->
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
      <div class="card bg-teal" style="padding:20px 24px;">
        <div style="font-family:var(--font-mono); font-size:13px; font-weight:700;">ACADEMIC CREDENTIAL // GERMANY</div>
        <div style="font-family:var(--font-display); font-weight:900; font-size:24px; text-transform:uppercase; margin-top:4px;">
          MSc Web Engineering
        </div>
        <div style="font-family:var(--font-mono); font-size:15px; font-weight:700; margin-top:4px;">
          Technische Universität Chemnitz
        </div>
        <p style="font-size:15px; margin-top:8px; line-height:1.4;">
          Specialized in Semantic Web, Distributed Systems & Applied AI.
        </p>
      </div>

      <div class="card bg-paper" style="padding:20px 24px;">
        <div style="font-family:var(--font-mono); font-size:13px; font-weight:700; color:var(--pink);">ENGINEERING PHILOSOPHY</div>
        <div style="font-family:var(--font-display); font-weight:900; font-size:22px; text-transform:uppercase; margin-top:4px;">
          Observability & Automation First
        </div>
        <p style="font-size:15px; margin-top:8px; line-height:1.4;">
          Treat telemetry as a first-class feature, codify repeatable toil, and pair AI research with deterministic guardrails.
        </p>
      </div>
    </div>
  </div>

  <div class="bottom-bar" style="background:var(--paper);">
    <span>* NOTE: Verify exact roles and dates before final publication</span>
    <span>[BROCHURE PAGE 04 / 05] →</span>
  </div>
</section>
`;

// PAGE 5: WRITING, DESIGN SYSTEM & CONTACT CTA
const page5Html = `
<section class="brochure-page" style="background-color: var(--pink);">
  <div class="top-bar">
    <span>■ TECHNICAL WRITING, DESIGN TOKENS & COLLABORATION</span>
    <span class="top-bar-badge" style="background:var(--yellow);">PAGE 05 / 05</span>
  </div>

  <div class="page-content">
    <div>
      <span class="memphis-label bg-yellow" style="transform:rotate(-1.5deg);">MDX BLOG & ARCHITECTURE</span>
      <div class="section-title" style="font-size:70px; margin-top:12px; color:var(--paper); -webkit-text-stroke: 3px var(--ink); text-shadow: 5px 5px 0px var(--yellow), 10px 10px 0px var(--ink);">
        WRITING & CONNECT
      </div>
    </div>

    <!-- 4 MDX Draft Articles Grid -->
    <div class="card" style="padding:24px 28px;">
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:3px solid var(--ink); padding-bottom:12px; margin-bottom:18px;">
        <span style="font-family:var(--font-display); font-weight:900; font-size:24px; text-transform:uppercase;">
          TECHNICAL NOTEBOOK // 4 MDX WORKING DRAFTS
        </span>
        <span class="tag bg-yellow">RSS + MDX</span>
      </div>
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
        <div style="background:var(--bg); border:3px solid var(--ink); padding:14px 16px; box-shadow:4px 4px 0px var(--ink);">
          <div style="font-family:var(--font-mono); font-size:12px; font-weight:700; color:var(--blue);">DRAFT // VOL-01</div>
          <div style="font-family:var(--font-display); font-weight:900; font-size:18px; text-transform:uppercase; margin-top:4px;">
            Engineering Reliable Infrastructure
          </div>
          <div style="font-size:14px; margin-top:4px;">Observability, Signals & Self-Healing Workflows</div>
        </div>
        <div style="background:var(--bg); border:3px solid var(--ink); padding:14px 16px; box-shadow:4px 4px 0px var(--ink);">
          <div style="font-family:var(--font-mono); font-size:12px; font-weight:700; color:var(--blue);">DRAFT // VOL-02</div>
          <div style="font-family:var(--font-display); font-weight:900; font-size:18px; text-transform:uppercase; margin-top:4px;">
            Knowledge Graphs for Code Intelligence
          </div>
          <div style="font-size:14px; margin-top:4px;">ASTs, Call Hierarchies & Property Graphs</div>
        </div>
        <div style="background:var(--bg); border:3px solid var(--ink); padding:14px 16px; box-shadow:4px 4px 0px var(--ink);">
          <div style="font-family:var(--font-mono); font-size:12px; font-weight:700; color:var(--blue);">DRAFT // VOL-03</div>
          <div style="font-family:var(--font-display); font-weight:900; font-size:18px; text-transform:uppercase; margin-top:4px;">
            Hybrid Retrieval-Augmented Generation
          </div>
          <div style="font-size:14px; margin-top:4px;">Bridging Vector Search & Symbolic Graphs</div>
        </div>
        <div style="background:var(--bg); border:3px solid var(--ink); padding:14px 16px; box-shadow:4px 4px 0px var(--ink);">
          <div style="font-family:var(--font-mono); font-size:12px; font-weight:700; color:var(--blue);">DRAFT // VOL-04</div>
          <div style="font-family:var(--font-display); font-weight:900; font-size:18px; text-transform:uppercase; margin-top:4px;">
            Software Automation & Productivity
          </div>
          <div style="font-size:14px; margin-top:4px;">Designing Low-Friction Engineering Platforms</div>
        </div>
      </div>
    </div>

    <!-- Design System & Tech Stack Showcase -->
    <div class="card bg-cream" style="padding:22px 28px;">
      <div style="font-family:var(--font-mono); font-size:14px; font-weight:700; text-transform:uppercase; margin-bottom:12px;">
        PORTFOLIO ARCHITECTURE & 1980s MEMPHIS DESIGN TOKENS
      </div>
      <div style="display:flex; align-items:center; justify-content:space-between; gap:14px;">
        <div style="display:flex; gap:10px;">
          <div style="padding:10px 14px; background:#FFF7E8; border:3px solid #171717; font-family:var(--font-mono); font-weight:700; font-size:13px;">#FFF7E8</div>
          <div style="padding:10px 14px; background:#FFDE43; border:3px solid #171717; font-family:var(--font-mono); font-weight:700; font-size:13px;">#FFDE43</div>
          <div style="padding:10px 14px; background:#FF5793; border:3px solid #171717; font-family:var(--font-mono); font-weight:700; font-size:13px;">#FF5793</div>
          <div style="padding:10px 14px; background:#38D8C4; border:3px solid #171717; font-family:var(--font-mono); font-weight:700; font-size:13px;">#38D8C4</div>
          <div style="padding:10px 14px; background:#377AF5; color:#FFF; border:3px solid #171717; font-family:var(--font-mono); font-weight:700; font-size:13px;">#377AF5</div>
        </div>
        <div style="font-family:var(--font-mono); font-size:14px; font-weight:700;">
          ASTRO 7 • TYPESCRIPT • TAILWIND • MDX
        </div>
      </div>
    </div>

    <!-- Final CTA Card -->
    <div class="card bg-yellow" style="padding:28px 32px; border-width:5px; box-shadow:10px 10px 0px var(--ink);">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:24px;">
        <div>
          <span class="memphis-label bg-teal" style="font-size:14px; padding:5px 12px;">OPEN FOR COLLABORATION</span>
          <div style="font-family:var(--font-display); font-weight:900; font-size:38px; text-transform:uppercase; margin-top:10px;">
            LET'S CONNECT ON LINKEDIN
          </div>
          <p style="font-size:18px; font-weight:700; margin-top:6px;">
            Platform Engineering • Observability • Knowledge Graphs • Applied AI Research
          </p>
        </div>
        <div style="background:var(--paper); border:4px solid var(--ink); padding:18px 22px; box-shadow:6px 6px 0px var(--ink); font-family:var(--font-mono); font-size:14px; font-weight:700; min-width:300px;">
          <div style="margin-bottom:6px;"><span style="background:var(--yellow); padding:1px 6px; border:2px solid var(--ink); margin-right:6px;">LOC</span> DENMARK</div>
          <div style="margin-bottom:6px;"><span style="background:var(--teal); padding:1px 6px; border:2px solid var(--ink); margin-right:6px;">ORG</span> SIEMENS ENERGY</div>
          <div style="margin-bottom:6px;"><span style="background:var(--pink); padding:1px 6px; border:2px solid var(--ink); margin-right:6px;">EDU</span> MSc TU CHEMNITZ</div>
          <div style="background:var(--yellow); border:2.5px solid var(--ink); padding:7px 10px; text-align:center; margin-top:10px; box-shadow:3px 3px 0px var(--ink);">
            PORTFOLIO LINK IN POST ↓
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="bottom-bar">
    <span>ARUN JOSE // PORTFOLIO & RESEARCH BROCHURE</span>
    <span>[PAGE 05 / 05 // END OF TRANSMISSION]</span>
  </div>
</section>
`;

const pages = [page1Html, page2Html, page3Html, page4Html, page5Html];

// Write combined 5-page HTML document
const combinedHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Arun Jose — 5-Page LinkedIn Portfolio Brochure</title>
  <style>${sharedStyles}</style>
</head>
<body>
  ${pages.join('\n')}
</body>
</html>`;

const combinedPath = path.join(outDir, 'index.html');
fs.writeFileSync(combinedPath, combinedHtml);

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

// Export each individual page as a 1080x1350 PNG
pages.forEach((pageMarkup, idx) => {
  const num = idx + 1;
  const singleHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Page ${num}</title>
  <style>${sharedStyles} html, body { width: 1080px; height: 1350px; overflow: hidden; }</style>
</head>
<body>
  ${pageMarkup}
</body>
</html>`;
  const singleHtmlPath = path.join(outDir, `page-${num}.html`);
  fs.writeFileSync(singleHtmlPath, singleHtml);

  const pngPath = path.join(outDir, `page-${num}.png`);
  const fileUrl = `file:///${singleHtmlPath.replace(/\\/g, '/')}`;

  execFileSync(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--hide-scrollbars',
    '--window-size=1080,1350',
    `--screenshot=${pngPath}`,
    fileUrl
  ]);

  // Also copy to artifact directory so we can embed in carousel
  fs.copyFileSync(pngPath, path.join(artifactDir, `linkedin-brochure-page-${num}.png`));
  console.log(`Rendered Page ${num} PNG: ${pngPath}`);
});

// Export combined 5-page PDF for LinkedIn Document Carousel upload
const pdfPath = path.join(outDir, 'Arun_Jose_LinkedIn_Brochure_5Pages.pdf');
const combinedUrl = `file:///${combinedPath.replace(/\\/g, '/')}`;
execFileSync(chromePath, [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--print-to-pdf-no-header',
  `--print-to-pdf=${pdfPath}`,
  combinedUrl
]);
console.log(`Rendered 5-Page LinkedIn PDF: ${pdfPath}`);
