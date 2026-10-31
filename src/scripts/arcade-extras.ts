/**
 * 1980s Memphis & Neo-Brutalist Cool Interactive Extras:
 * 1. TERMINAL.86 Command Palette (Ctrl+K / Header Button)
 * 2. AJ-BOT: INFRA RUNNER 86 Playable 8-Bit Mini-Game
 * 3. Arcade "Achievement Unlocked!" Toast Notification System
 * 4. Custom Memphis Geometric Click Confetti Burst
 * 5. SYNTH.86 FM Procedural Web Audio API Chiptune Sequencer
 * 6. Engineering Blueprint / CAD X-Ray Mode Toggle
 */

import { playArcadeSfx } from '../lib/mascot-animation';

interface AchievementDef {
  id: string;
  icon: string;
  title: string;
  desc: string;
}

const ACHIEVEMENTS: Record<string, AchievementDef> = {
  shades: {
    id: 'shades',
    icon: '🕶️',
    title: '80S COOL SHADES',
    desc: 'Cycled Arun Jose’s animated PORTRAIT.BMP!'
  },
  mascots: {
    id: 'mascots',
    icon: '🤖',
    title: 'ROBOT WHISPERER',
    desc: 'High-fived an 8-bit arcade mascot!'
  },
  graph: {
    id: 'graph',
    icon: '🧠',
    title: 'GRAPH ARCHITECT',
    desc: 'Inspected the Semantic Knowledge Graph!'
  },
  terminal: {
    id: 'terminal',
    icon: '💻',
    title: 'SYSOP HACKER 86',
    desc: 'Launched the TERMINAL.86 interactive shell!'
  },
  game: {
    id: 'game',
    icon: '🕹️',
    title: 'INFRA RUNNER 86',
    desc: 'Played the AJ-BOT 8-bit CRT mini-game!'
  },
  synth: {
    id: 'synth',
    icon: '🎹',
    title: 'SYNTHWAVE MASTER',
    desc: 'Activated SYNTH.86 FM or BLUEPRINT.CAD!'
  }
};

let extrasCleanup: (() => void) | null = null;
const unlockedSet = new Set<string>();

export function initArcadeExtras(): void {
  if (extrasCleanup) {
    extrasCleanup();
    extrasCleanup = null;
  }

  const abortController = new AbortController();
  const { signal } = abortController;
  const timers: number[] = [];

  // ---------------------------------------------------------------------------
  // Helper: Check if sound / motion are active
  // ---------------------------------------------------------------------------
  const isMotionOn = () =>
    !document.documentElement.classList.contains('motion-disabled');
  const isSoundOn = () => {
    const muteBtn = document.querySelector<HTMLElement>('[data-arcade-mute]');
    const isMuted = muteBtn?.getAttribute('aria-pressed') === 'true';
    return isMotionOn() && !isMuted;
  };

  // ---------------------------------------------------------------------------
  // 1. Arcade "Achievement Unlocked!" Toast System
  // ---------------------------------------------------------------------------
  const toastEl = document.querySelector<HTMLElement>('[data-achievement-toast]');
  const toastIcon = document.querySelector<HTMLElement>('[data-achievement-icon]');
  const toastCount = document.querySelector<HTMLElement>('[data-achievement-count]');
  const toastTitle = document.querySelector<HTMLElement>('[data-achievement-title]');
  const toastDesc = document.querySelector<HTMLElement>('[data-achievement-desc]');
  let toastHideTimer: number | null = null;

  const unlockAchievement = (key: keyof typeof ACHIEVEMENTS) => {
    if (unlockedSet.has(key)) return;
    const def = ACHIEVEMENTS[key];
    if (!def) return;

    unlockedSet.add(key);
    if (!toastEl || !toastIcon || !toastCount || !toastTitle || !toastDesc) return;

    toastIcon.textContent = def.icon;
    toastCount.textContent = `${unlockedSet.size}/6`;
    toastTitle.textContent = def.title;
    toastDesc.textContent = def.desc;

    toastEl.classList.remove('opacity-0', 'translate-y-[-16px]');
    toastEl.classList.add('opacity-100', 'translate-y-0');

    playArcadeSfx('aj-bot', isSoundOn());

    if (toastHideTimer !== null) {
      window.clearTimeout(toastHideTimer);
    }
    toastHideTimer = window.setTimeout(() => {
      toastEl.classList.add('opacity-0', 'translate-y-[-16px]');
      toastEl.classList.remove('opacity-100', 'translate-y-0');
    }, 3400);
    timers.push(toastHideTimer);
  };

  // Hook achievements to user interactions
  document.addEventListener(
    'click',
    (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest('[data-portrait-window]')) {
        unlockAchievement('shades');
      } else if (target.closest('[data-mascot-stage]')) {
        unlockAchievement('mascots');
      } else if (target.closest('[data-kg-node], [data-kg-filter]')) {
        unlockAchievement('graph');
      }
    },
    { passive: true, signal }
  );

  // ---------------------------------------------------------------------------
  // 2. Memphis Geometric Click Confetti Burst
  // ---------------------------------------------------------------------------
  const burstLayer = document.getElementById('arcade-click-burst-layer');
  const BURST_GLYPHS = ['✦', '▲', '■', '●', '◆', '★'];
  const BURST_COLORS = ['#FFDE43', '#FF5793', '#38D8C4', '#377AF5'];

  document.addEventListener(
    'pointerdown',
    (e: PointerEvent) => {
      if (!isMotionOn() || !burstLayer) return;
      // Spawn 6 crisp Memphis geometric particles at click point
      for (let i = 0; i < 6; i++) {
        const span = document.createElement('span');
        const angle = (Math.PI * 2 * i) / 6 + (Math.random() * 0.4 - 0.2);
        const dist = 22 + Math.random() * 26;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist;
        const rot = Math.round((Math.random() - 0.5) * 140);

        span.textContent = BURST_GLYPHS[i % BURST_GLYPHS.length];
        span.style.position = 'fixed';
        span.style.left = `${e.clientX - 6}px`;
        span.style.top = `${e.clientY - 6}px`;
        span.style.color = BURST_COLORS[i % BURST_COLORS.length];
        span.style.textShadow = '1.5px 1.5px 0px #171717';
        span.style.fontFamily = 'Space Mono, monospace';
        span.style.fontSize = '13px';
        span.style.fontWeight = '700';
        span.style.pointerEvents = 'none';
        span.style.userSelect = 'none';
        burstLayer.appendChild(span);

        if (typeof span.animate === 'function') {
          const anim = span.animate(
            [
              { transform: 'translate3d(0, 0, 0) scale(0.6) rotate(0deg)', opacity: 1 },
              {
                transform: `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0) scale(1.15) rotate(${rot}deg)`,
                opacity: 0
              }
            ],
            { duration: 480, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
          );
          anim.onfinish = () => span.remove();
        } else {
          window.setTimeout(() => span.remove(), 480);
        }
      }
    },
    { passive: true, signal }
  );

  // ---------------------------------------------------------------------------
  // 3. Engineering Blueprint / CAD X-Ray Mode Toggle
  // ---------------------------------------------------------------------------
  let isBlueprintMode = false;
  document
    .querySelectorAll<HTMLButtonElement>('[data-blueprint-toggle]')
    .forEach((btn) => {
      btn.addEventListener(
        'click',
        () => {
          isBlueprintMode = !isBlueprintMode;
          document.documentElement.classList.toggle(
            'blueprint-mode-active',
            isBlueprintMode
          );
          btn.setAttribute('aria-pressed', String(isBlueprintMode));
          const label = btn.querySelector<HTMLElement>(
            '[data-blueprint-toggle-label]'
          );
          if (label) {
            label.textContent = isBlueprintMode
              ? 'BLUEPRINT: ON'
              : 'BLUEPRINT: OFF';
          }
          playArcadeSfx('byte', isSoundOn());
          if (isBlueprintMode) {
            unlockAchievement('synth');
          }
        },
        { signal }
      );
    });

  // ---------------------------------------------------------------------------
  // 4. SYNTH.86 FM Procedural Chiptune Sequencer
  // ---------------------------------------------------------------------------
  const synthToggleBtn = document.querySelector<HTMLButtonElement>(
    '[data-synth-toggle]'
  );
  const synthEq = document.querySelector<HTMLElement>('[data-synth-eq]');
  let synthPlaying = false;
  let synthTimer: number | null = null;
  let synthCtx: AudioContext | null = null;

  // 1980s Synthwave Arpeggio Notes (C minor -> Ab major -> F minor -> G7)
  const SYNTH_ARP_NOTES = [
    261.63, 311.13, 392.0, 523.25, // Cm
    207.65, 261.63, 311.13, 415.3, // Ab
    174.61, 207.65, 261.63, 349.23, // Fm
    196.0, 246.94, 293.66, 392.0 // G
  ];
  let synthStep = 0;

  const stopSynthLoop = () => {
    synthPlaying = false;
    if (synthTimer !== null) {
      window.clearInterval(synthTimer);
      synthTimer = null;
    }
    if (synthToggleBtn) {
      synthToggleBtn.setAttribute('aria-pressed', 'false');
      synthToggleBtn.textContent = '▶ PLAY SYNTH';
      synthToggleBtn.classList.remove('bg-yellow');
      synthToggleBtn.classList.add('bg-teal');
    }
    synthEq?.classList.remove('is-playing');
  };

  const startSynthLoop = () => {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;

    if (!synthCtx) {
      synthCtx = new AudioCtx();
    }
    if (synthCtx.state === 'suspended') {
      synthCtx.resume();
    }

    synthPlaying = true;
    unlockAchievement('synth');
    if (synthToggleBtn) {
      synthToggleBtn.setAttribute('aria-pressed', 'true');
      synthToggleBtn.textContent = '■ STOP SYNTH';
      synthToggleBtn.classList.remove('bg-teal');
      synthToggleBtn.classList.add('bg-yellow');
    }
    synthEq?.classList.add('is-playing');

    synthTimer = window.setInterval(() => {
      if (!synthPlaying || document.hidden || !synthCtx) return;
      const freq = SYNTH_ARP_NOTES[synthStep % SYNTH_ARP_NOTES.length];
      synthStep++;

      try {
        const now = synthCtx.currentTime;
        const osc = synthCtx.createOscillator();
        const gain = synthCtx.createGain();
        osc.type = synthStep % 4 === 1 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.055, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
        osc.connect(gain);
        gain.connect(synthCtx.destination);
        osc.start(now);
        osc.stop(now + 0.11);
      } catch {
        // Ignore audio errors
      }
    }, 125); // 118 BPM 16th-note arpeggio
    timers.push(synthTimer);
  };

  synthToggleBtn?.addEventListener(
    'click',
    () => {
      if (synthPlaying) {
        stopSynthLoop();
      } else {
        startSynthLoop();
      }
    },
    { signal }
  );

  // ---------------------------------------------------------------------------
  // 5. TERMINAL.86 Interactive Command Palette (Ctrl+K or Button)
  // ---------------------------------------------------------------------------
  const termModal = document.querySelector<HTMLElement>('[data-terminal-modal]');
  const termOutput = document.querySelector<HTMLElement>('[data-terminal-output]');
  const termForm = document.querySelector<HTMLFormElement>('[data-terminal-form]');
  const termInput = document.querySelector<HTMLInputElement>('[data-terminal-input]');

  const openTerminal = () => {
    if (!termModal) return;
    termModal.classList.remove('hidden');
    termModal.classList.add('flex');
    playArcadeSfx('byte', isSoundOn());
    unlockAchievement('terminal');
    window.setTimeout(() => termInput?.focus(), 40);
  };

  const closeTerminal = () => {
    if (!termModal) return;
    termModal.classList.add('hidden');
    termModal.classList.remove('flex');
  };

  const executeTerminalCommand = (rawCmd: string) => {
    if (!termOutput) return;
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    playArcadeSfx('hover', isSoundOn());

    if (cmd === 'clear' || cmd === 'cls') {
      termOutput.innerHTML = '';
      return;
    }

    const promptLine = document.createElement('div');
    promptLine.className = 'text-yellow font-bold mt-2';
    promptLine.textContent = `C:\\ARUN_JOSE> ${rawCmd}`;
    termOutput.appendChild(promptLine);

    const response = document.createElement('div');
    response.className = 'text-[#00FF66] pl-2 border-l-2 border-teal';

    if (cmd === 'help') {
      response.innerHTML = `
        <div>AVAILABLE COMMANDS:</div>
        <div>• <span class="text-yellow">whois arun</span> — Profile, role &amp; education summary</div>
        <div>• <span class="text-yellow">skills</span> — Platform Engineering, Observability &amp; AI stack</div>
        <div>• <span class="text-yellow">siemens</span> — Career logbook at Siemens Energy, Gamesa &amp; AG</div>
        <div>• <span class="text-yellow">thesis</span> — Hybrid Semantic Framework for Export Control Compliance</div>
        <div>• <span class="text-yellow">media</span> — Podcast, Tech Talks &amp; YouTube Channel (/media)</div>
        <div>• <span class="text-yellow">mascot party</span> — Trigger all 5 arcade mascots to celebrate!</div>
        <div>• <span class="text-yellow">play game</span> — Launch AJ-BOT: INFRA RUNNER 86 mini-game</div>
        <div>• <span class="text-yellow">sudo hire arun</span> — Open direct contact &amp; collaboration channels</div>
      `;
    } else if (cmd.includes('whois') || cmd === 'arun' || cmd === 'about') {
      response.innerHTML = `
        <div class="text-teal font-bold">ARUN JOSE // SOFTWARE ENGINEER (DENMARK)</div>
        <div>• Current: Software Engineer @ Siemens Energy</div>
        <div>• Education: MSc Web Engineering, TU Chemnitz (Germany)</div>
        <div>• Focus: Platform Engineering, Infrastructure Monitoring, Hybrid RAG &amp; Knowledge Graphs.</div>
      `;
    } else if (cmd === 'skills' || cmd === 'stack') {
      response.innerHTML = `
        <div>[PLATFORM &amp; INFRA]: Kubernetes, CI/CD Automation, Observability, Prometheus/Grafana, Telemetry</div>
        <div>[AI &amp; RESEARCH]: Knowledge Graphs, Hybrid RAG, Dense Vector Retrieval, AST Code Intelligence, Python, TypeScript</div>
      `;
    } else if (cmd.includes('siemens') || cmd === 'experience') {
      response.innerHTML = `
        <div>• <span class="text-yellow">Siemens Energy (Denmark)</span> — Software Engineer (Platform &amp; Observability)</div>
        <div>• <span class="text-teal">Siemens Gamesa</span> — Working Student / Software Engineering</div>
        <div>• <span class="text-pink">Siemens AG</span> — Working Student / Software Automation</div>
      `;
    } else if (cmd.includes('thesis') || cmd.includes('research')) {
      response.innerHTML = `
        <div class="text-yellow font-bold">MASTER'S THESIS @ TU CHEMNITZ:</div>
        <div>"Hybrid Semantic Framework for Export Control Compliance" — Combines dense vector retrieval (RAG) with structured Knowledge Graphs for verifiable regulatory reasoning.</div>
      `;
    } else if (
      cmd.includes('media') ||
      cmd.includes('podcast') ||
      cmd.includes('youtube') ||
      cmd.includes('talk')
    ) {
      response.innerHTML = `
        <div class="text-pink font-bold">ON AIR // BROADCAST_86 STUDIO:</div>
        <div>• <span class="text-yellow">YouTube (MTV-86)</span> — Deep-dives on Hybrid RAG, Knowledge Graphs &amp; Platform Observability</div>
        <div>• <span class="text-teal">Podcast (FM.86)</span> — Systems &amp; Signals FM (Spotify, Apple, YouTube)</div>
        <div>• <span class="text-pink">Tech Talks</span> — Conference talks, lectures &amp; Speaker Kit at <a href="/media" class="underline text-yellow">/media</a></div>
      `;
    } else if (cmd.includes('mascot') || cmd.includes('party')) {
      response.innerHTML = `<div class="text-pink font-bold">🎉 MASCOT PARTY ACTIVATED! All 5 arcade mascots are celebrating!</div>`;
      document
        .querySelectorAll<HTMLElement>('[data-mascot-stage][data-mascot-interactive="true"]')
        .forEach((el) => el.click());
    } else if (cmd.includes('game') || cmd === 'play') {
      response.innerHTML = `<div class="text-teal font-bold">🕹️ Launching AJ-BOT: INFRA RUNNER 86...</div>`;
      closeTerminal();
      openGameModal();
    } else if (cmd.includes('hire') || cmd.includes('contact')) {
      response.innerHTML = `
        <div class="text-yellow font-bold">✔ ACCESS GRANTED // READY TO COLLABORATE!</div>
        <div>Connect via <a href="/contact" class="underline text-teal">/contact</a> or <a href="/cv" class="underline text-pink">/cv</a>.</div>
      `;
      playArcadeSfx('aj-bot', isSoundOn());
    } else {
      response.innerHTML = `<span class="text-pink">Command not recognized: "${cmd}". Type <span class="text-yellow">help</span> for available commands.</span>`;
    }

    termOutput.appendChild(response);
    termOutput.scrollTop = termOutput.scrollHeight;
  };

  document
    .querySelectorAll<HTMLElement>('[data-terminal-open]')
    .forEach((btn) => {
      btn.addEventListener('click', openTerminal, { signal });
    });

  document
    .querySelectorAll<HTMLElement>('[data-terminal-close]')
    .forEach((btn) => {
      btn.addEventListener('click', closeTerminal, { signal });
    });

  document
    .querySelectorAll<HTMLButtonElement>('[data-term-cmd]')
    .forEach((chip) => {
      chip.addEventListener(
        'click',
        () => {
          const cmd = chip.getAttribute('data-term-cmd') || 'help';
          executeTerminalCommand(cmd);
        },
        { signal }
      );
    });

  termForm?.addEventListener(
    'submit',
    (e: Event) => {
      e.preventDefault();
      if (!termInput) return;
      executeTerminalCommand(termInput.value);
      termInput.value = '';
    },
    { signal }
  );

  // ---------------------------------------------------------------------------
  // 6. AJ-BOT: INFRA RUNNER 86 Playable 8-Bit Mini-Game
  // ---------------------------------------------------------------------------
  const gameModal = document.querySelector<HTMLElement>('[data-game-modal]');
  const canvas = document.querySelector<HTMLCanvasElement>('[data-game-canvas]');
  const scoreEl = document.querySelector<HTMLElement>('[data-game-score]');
  const hiScoreEl = document.querySelector<HTMLElement>('[data-game-hiscore]');
  let gameRafId: number | null = null;
  let gameActive = false;
  let score = 0;
  let hiScore = 120;
  let gameOver = false;

  const bot = { x: 56, y: 150, vy: 0, width: 28, height: 30, grounded: true };
  const GROUND_Y = 180;
  let obstacles: { x: number; w: number; h: number; type: 'err' | 'kg'; collected?: boolean }[] = [];
  let frameCount = 0;

  const resetGame = () => {
    score = 0;
    gameOver = false;
    frameCount = 0;
    bot.y = GROUND_Y - bot.height;
    bot.vy = 0;
    bot.grounded = true;
    obstacles = [
      { x: 340, w: 26, h: 28, type: 'err' },
      { x: 500, w: 22, h: 22, type: 'kg' }
    ];
    if (scoreEl) scoreEl.textContent = '0000';
  };

  const triggerJump = () => {
    if (!gameActive) return;
    if (gameOver) {
      resetGame();
      return;
    }
    if (bot.grounded) {
      bot.vy = -10.5;
      bot.grounded = false;
      playArcadeSfx('spark', isSoundOn());
    }
  };

  const runGameLoop = () => {
    if (!gameActive || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Cream Sky + Grid
    ctx.fillStyle = '#171717';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle CRT Gridlines
    ctx.strokeStyle = 'rgba(56, 216, 196, 0.14)';
    ctx.lineWidth = 1;
    for (let gx = 0; gx < canvas.width; gx += 26) {
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx, GROUND_Y);
      ctx.stroke();
    }
    for (let gy = 0; gy < GROUND_Y; gy += 26) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(canvas.width, gy);
      ctx.stroke();
    }

    // Ground Strip
    ctx.fillStyle = '#38D8C4';
    ctx.fillRect(0, GROUND_Y, canvas.width, canvas.height - GROUND_Y);
    ctx.fillStyle = '#FFDE43';
    ctx.fillRect(0, GROUND_Y, canvas.width, 4);

    if (!gameOver) {
      frameCount++;
      if (frameCount % 6 === 0) {
        score++;
        if (score > hiScore) hiScore = score;
        if (scoreEl) scoreEl.textContent = String(score).padStart(4, '0');
        if (hiScoreEl) hiScoreEl.textContent = String(hiScore).padStart(4, '0');
      }

      // Physics
      bot.vy += 0.58;
      bot.y += bot.vy;
      if (bot.y >= GROUND_Y - bot.height) {
        bot.y = GROUND_Y - bot.height;
        bot.vy = 0;
        bot.grounded = true;
      }

      // Spawn obstacles & KG nodes
      const lastX = obstacles.length > 0 ? obstacles[obstacles.length - 1].x : 200;
      if (lastX < canvas.width - 150) {
        const isBonus = Math.random() > 0.62;
        obstacles.push({
          x: canvas.width + 20 + Math.random() * 60,
          w: isBonus ? 24 : 26,
          h: isBonus ? 24 : 28,
          type: isBonus ? 'kg' : 'err'
        });
      }

      obstacles.forEach((obs) => {
        obs.x -= 4.4;
        const obsY = obs.type === 'kg' ? GROUND_Y - 68 : GROUND_Y - obs.h;

        // Collision check
        const hitX = bot.x + 4 < obs.x + obs.w && bot.x + bot.width - 4 > obs.x;
        const hitY = bot.y + 4 < obsY + obs.h && bot.y + bot.height - 2 > obsY;

        if (hitX && hitY && !obs.collected) {
          if (obs.type === 'kg') {
            obs.collected = true;
            score += 25;
            if (score > hiScore) hiScore = score;
            playArcadeSfx('aj-bot', isSoundOn());
          } else {
            gameOver = true;
            playArcadeSfx('byte', isSoundOn());
          }
        }
      });

      obstacles = obstacles.filter((o) => o.x > -40 && !o.collected);
    }

    // Draw Obstacles & Bonus KG Nodes
    obstacles.forEach((obs) => {
      const obsY = obs.type === 'kg' ? GROUND_Y - 68 : GROUND_Y - obs.h;
      if (obs.type === 'kg') {
        ctx.fillStyle = '#FFDE43';
        ctx.fillRect(obs.x, obsY, obs.w, obs.h);
        ctx.strokeStyle = '#FFF7E8';
        ctx.lineWidth = 2;
        ctx.strokeRect(obs.x, obsY, obs.w, obs.h);
        ctx.fillStyle = '#171717';
        ctx.font = 'bold 9px monospace';
        ctx.fillText('KG+', obs.x + 3, obsY + 15);
      } else {
        ctx.fillStyle = '#FF5793';
        ctx.fillRect(obs.x, obsY, obs.w, obs.h);
        ctx.strokeStyle = '#FFF7E8';
        ctx.lineWidth = 2;
        ctx.strokeRect(obs.x, obsY, obs.w, obs.h);
        ctx.fillStyle = '#171717';
        ctx.font = 'bold 9px monospace';
        ctx.fillText('500', obs.x + 3, obsY + 17);
      }
    });

    // Draw 8-Bit AJ-BOT Player
    ctx.fillStyle = '#38D8C4';
    ctx.fillRect(bot.x + 3, bot.y, 22, 13); // Head
    ctx.fillStyle = '#171717';
    ctx.fillRect(bot.x + 6, bot.y + 3, 16, 6); // Visor
    ctx.fillStyle = '#FFDE43';
    ctx.fillRect(bot.x + 8, bot.y + 4, 4, 4); // Left Eye
    ctx.fillRect(bot.x + 16, bot.y + 4, 4, 4); // Right Eye
    ctx.fillStyle = '#377AF5';
    ctx.fillRect(bot.x + 2, bot.y + 13, 24, 12); // Body
    ctx.fillStyle = '#FFDE43';
    ctx.fillRect(bot.x + 7, bot.y + 16, 14, 6); // Chest AJ badge

    // Alternating pixel legs
    const legOffset = frameCount % 8 < 4 ? 2 : 0;
    ctx.fillStyle = '#FF5793';
    ctx.fillRect(bot.x + 5, bot.y + 25, 6, 5 - legOffset);
    ctx.fillRect(bot.x + 17, bot.y + 25, 6, 3 + legOffset);

    if (gameOver) {
      ctx.fillStyle = 'rgba(23, 23, 23, 0.82)';
      ctx.fillRect(90, 48, 340, 88);
      ctx.strokeStyle = '#FFDE43';
      ctx.lineWidth = 3;
      ctx.strokeRect(90, 48, 340, 88);
      ctx.fillStyle = '#FF5793';
      ctx.font = 'bold 15px monospace';
      ctx.fillText('ALERT: 500_ERR COLLISION!', 145, 82);
      ctx.fillStyle = '#FFF7E8';
      ctx.font = 'bold 11px monospace';
      ctx.fillText('PRESS SPACE OR CLICK TO REDEPLOY', 148, 112);
    }

    gameRafId = window.requestAnimationFrame(runGameLoop);
  };

  const openGameModal = () => {
    if (!gameModal) return;
    gameModal.classList.remove('hidden');
    gameModal.classList.add('flex');
    gameActive = true;
    unlockAchievement('game');
    resetGame();
    if (gameRafId !== null) window.cancelAnimationFrame(gameRafId);
    gameRafId = window.requestAnimationFrame(runGameLoop);
  };

  const closeGameModal = () => {
    if (!gameModal) return;
    gameModal.classList.add('hidden');
    gameModal.classList.remove('flex');
    gameActive = false;
    if (gameRafId !== null) {
      window.cancelAnimationFrame(gameRafId);
      gameRafId = null;
    }
  };

  document
    .querySelectorAll<HTMLElement>('[data-game-open]')
    .forEach((btn) => {
      btn.addEventListener('click', openGameModal, { signal });
    });

  document
    .querySelectorAll<HTMLElement>('[data-game-close]')
    .forEach((btn) => {
      btn.addEventListener('click', closeGameModal, { signal });
    });

  canvas?.addEventListener('pointerdown', triggerJump, { signal });
  document
    .querySelector<HTMLElement>('[data-game-jump]')
    ?.addEventListener('click', triggerJump, { signal });
  document
    .querySelector<HTMLElement>('[data-game-restart]')
    ?.addEventListener('click', resetGame, { signal });

  // Global Keyboard Shortcuts (Ctrl+K for Terminal, Escape to close, Space in Game)
  window.addEventListener(
    'keydown',
    (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openTerminal();
        return;
      }
      if (e.key === 'Escape') {
        closeTerminal();
        closeGameModal();
        return;
      }
      if (gameActive && (e.key === ' ' || e.key === 'ArrowUp')) {
        e.preventDefault();
        triggerJump();
      }
    },
    { signal }
  );

  extrasCleanup = () => {
    abortController.abort();
    stopSynthLoop();
    if (gameRafId !== null) {
      window.cancelAnimationFrame(gameRafId);
      gameRafId = null;
    }
    timers.forEach((id) => {
      window.clearTimeout(id);
      window.clearInterval(id);
    });
  };
}

