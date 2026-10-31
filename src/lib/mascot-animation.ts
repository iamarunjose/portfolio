/**
 * Finite-State Machine, Web Animations API & Arcade Mode Controller
 * for 1980s Retro Arcade Mascots: AJ-BOT, BYTE, SPARK, NODE, PIXEL
 * States: idle | walk | jump | wave | celebrate | sleep
 */

export const MASCOT_STATES = [
  'idle',
  'walk',
  'jump',
  'wave',
  'celebrate',
  'sleep'
] as const;

export type MascotState = (typeof MASCOT_STATES)[number];

export type MascotName = 'aj-bot' | 'byte' | 'spark' | 'node' | 'pixel';

export type MascotEvent =
  | 'ENTER'
  | 'HOVER'
  | 'LEAVE'
  | 'CLICK'
  | 'WALK'
  | 'JUMP'
  | 'SLEEP'
  | 'WAKE';

export interface MascotConfig {
  name: MascotName;
  initialState?: MascotState;
  motionDisabled?: boolean;
}

const DEFAULT_READOUTS: Record<MascotName, Record<MascotState, string>> = {
  'aj-bot': {
    idle: 'ONLINE // READY',
    walk: 'PATROL // 8-BIT',
    jump: 'JUMP // BOOST!',
    wave: 'WAVE // HI THERE!',
    celebrate: 'LEVEL UP! ✦',
    sleep: 'SLEEP // STANDBY'
  },
  byte: {
    idle: 'SYSTEM READY',
    walk: 'STEP // BUS 86',
    jump: 'CRT // HOP!',
    wave: 'TILT // SCAN OK',
    celebrate: 'HELLO WORLD',
    sleep: 'CRT // STANDBY'
  },
  spark: {
    idle: 'AUTO // 99.9%',
    walk: 'TURBO RUN ⚡',
    jump: 'VOLT JUMP!',
    wave: 'SPARK READY!',
    celebrate: 'DEPLOYED ⚡',
    sleep: 'IDLE // LOW WATT'
  },
  node: {
    idle: 'KG // EXPLORER',
    walk: 'PATH TRAVERSAL',
    jump: 'HOP // 2-DEGREE',
    wave: 'NODES PULSING',
    celebrate: 'GRAPH LINKED!',
    sleep: 'GRAPH // STANDBY'
  },
  pixel: {
    idle: 'DISK // 1.44MB',
    walk: 'SEEK // TRACK 01',
    jump: 'EJECT // HOP',
    wave: 'PAGE TURN ✎',
    celebrate: 'SAVED TO DISK!',
    sleep: 'WRITE PROTECTED'
  }
};

/**
 * Predictable Finite-State Machine for every arcade mascot.
 * Can be instantiated in both browser and Node test environments.
 */
export class MascotFSM {
  public readonly name: MascotName;
  public state: MascotState;
  public statusText: string;
  public motionDisabled: boolean;
  public offscreen: boolean = false;
  public tabHidden: boolean = false;

  constructor(config: MascotConfig) {
    this.name = config.name;
    this.motionDisabled = Boolean(config.motionDisabled);
    this.state = this.motionDisabled
      ? 'sleep'
      : (config.initialState ?? 'idle');
    this.statusText = DEFAULT_READOUTS[this.name][this.state];
  }

  public isValidState(candidate: string): candidate is MascotState {
    return (MASCOT_STATES as readonly string[]).includes(candidate);
  }

  public setState(next: MascotState, customText?: string): MascotState {
    if (!this.isValidState(next)) return this.state;

    if (
      (this.motionDisabled || this.offscreen || this.tabHidden) &&
      next !== 'sleep'
    ) {
      this.state = 'sleep';
      this.statusText =
        customText ??
        DEFAULT_READOUTS[this.name][next] ??
        DEFAULT_READOUTS[this.name].sleep;
      return this.state;
    }

    this.state = next;
    this.statusText = customText ?? DEFAULT_READOUTS[this.name][next];
    return this.state;
  }

  public transition(event: MascotEvent): MascotState {
    switch (event) {
      case 'SLEEP':
        return this.setState('sleep');

      case 'WAKE':
        return this.setState('idle');

      case 'ENTER':
        if (this.name === 'aj-bot') {
          return this.setState('walk', 'WALK // ENTERING');
        }
        if (this.name === 'byte') {
          return this.setState('idle', 'SYSTEM READY');
        }
        return this.setState('idle');

      case 'HOVER':
        if (this.name === 'spark') {
          return this.setState('walk', 'TURBO RUN ⚡');
        }
        return this.setState('wave');

      case 'LEAVE':
        return this.setState('idle');

      case 'WALK':
        return this.setState('walk');

      case 'JUMP':
        return this.setState('jump');

      case 'CLICK':
        if (this.name === 'byte') {
          return this.setState('celebrate', 'HELLO WORLD');
        }
        return this.setState('celebrate');

      default:
        return this.state;
    }
  }

  public setMotionDisabled(disabled: boolean): MascotState {
    this.motionDisabled = disabled;
    if (disabled) {
      this.state = 'sleep';
      this.statusText =
        this.name === 'byte' ? 'SYSTEM READY' : DEFAULT_READOUTS[this.name].idle;
    } else if (!this.offscreen && !this.tabHidden) {
      this.state = 'idle';
      this.statusText = DEFAULT_READOUTS[this.name].idle;
    }
    return this.state;
  }
}

const MOTION_STORAGE_KEY = 'arun_portfolio_motion_disabled';
const ARCADE_STORAGE_KEY = 'arun_portfolio_arcade_mode';
const SFX_MUTE_STORAGE_KEY = 'arun_portfolio_sfx_muted';
let sharedAudioCtx: AudioContext | null = null;
let activeMascotCleanup: (() => void) | null = null;

/**
 * Synthesize subtle 1980s 8-bit retro sound effects via Web Audio API.
 * Strictly user-interaction-initiated, only when Arcade Mode is ON and SFX is unmuted.
 * Never autoplays music.
 */
export function playArcadeSfx(
  kind: MascotName | 'toggle' | 'hover',
  enabled: boolean
): void {
  if (!enabled || typeof window === 'undefined') return;
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioCtx) return;

  try {
    if (!sharedAudioCtx) {
      sharedAudioCtx = new AudioCtx();
    }
    if (sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume();
    }

    const now = sharedAudioCtx.currentTime;
    const osc = sharedAudioCtx.createOscillator();
    const gain = sharedAudioCtx.createGain();
    osc.type = 'square';

    if (kind === 'hover') {
      gain.gain.setValueAtTime(0.06, now);
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.setValueAtTime(783.99, now + 0.035);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(sharedAudioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
      return;
    }

    gain.gain.setValueAtTime(0.12, now);

    if (kind === 'aj-bot' || kind === 'toggle') {
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.055);
      osc.frequency.setValueAtTime(783.99, now + 0.11);
      osc.frequency.setValueAtTime(1046.5, now + 0.165);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
      osc.connect(gain);
      gain.connect(sharedAudioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.26);
    } else if (kind === 'byte') {
      osc.frequency.setValueAtTime(784, now);
      osc.frequency.setValueAtTime(987.77, now + 0.06);
      osc.frequency.setValueAtTime(1174.66, now + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(sharedAudioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (kind === 'spark') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(987.77, now);
      osc.frequency.linearRampToValueAtTime(440, now + 0.09);
      osc.frequency.linearRampToValueAtTime(1318.5, now + 0.18);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(sharedAudioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } else {
      osc.type = 'triangle';
      gain.gain.setValueAtTime(0.15, now);
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.06);
      osc.frequency.setValueAtTime(880, now + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(sharedAudioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    }
  } catch {
    // Ignore audio context restrictions
  }
}

/**
 * Web Animations API burst sequences for tactile interaction feedback
 */
function playWebAnimationBurst(
  stageEl: HTMLElement,
  name: MascotName,
  action: 'enter' | 'hover' | 'click'
): void {
  const svgEl = stageEl.querySelector<SVGElement>('.mascot-svg');
  if (!svgEl || typeof svgEl.animate !== 'function') return;

  if (action === 'enter' && name === 'aj-bot') {
    // AJ-BOT walks into view (-22px -> 0px), jumps with squash-and-stretch, and settles
    svgEl.animate(
      [
        { transform: 'translate3d(-22px, 0, 0) scale(1, 1)', offset: 0 },
        { transform: 'translate3d(-10px, -3px, 0) scale(1, 1)', offset: 0.25 },
        { transform: 'translate3d(0, 0, 0) scale(1.12, 0.86)', offset: 0.45 },
        { transform: 'translate3d(0, -14px, 0) scale(0.92, 1.1)', offset: 0.68 },
        { transform: 'translate3d(0, 0, 0) scale(1.08, 0.92)', offset: 0.88 },
        { transform: 'translate3d(0, 0, 0) scale(1, 1)', offset: 1 }
      ],
      { duration: 920, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
    );
    return;
  }

  if (action === 'click') {
    if (name === 'spark') {
      svgEl.animate(
        [
          { transform: 'translate3d(0, 0, 0) rotate(0deg) scale(1)' },
          { transform: 'translate3d(8px, -4px, 0) rotate(8deg) scale(1.08)' },
          { transform: 'translate3d(-6px, -12px, 0) rotate(-6deg) scale(1.1)' },
          { transform: 'translate3d(0, 0, 0) rotate(0deg) scale(1)' }
        ],
        { duration: 540, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
      );
    } else if (name === 'node') {
      svgEl.animate(
        [
          { transform: 'translate3d(0, 0, 0)' },
          { transform: 'translate3d(7px, -7px, 0)' },
          { transform: 'translate3d(-7px, -5px, 0)' },
          { transform: 'translate3d(0, 0, 0)' }
        ],
        { duration: 640, easing: 'ease-in-out' }
      );
    } else if (name === 'pixel') {
      svgEl.animate(
        [
          { transform: 'translate3d(0, 0, 0) scaleX(1)' },
          { transform: 'translate3d(0, -10px, 0) scaleX(0.1)' },
          { transform: 'translate3d(0, -10px, 0) scaleX(-1)' },
          { transform: 'translate3d(0, 0, 0) scaleX(1)' }
        ],
        { duration: 620, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
      );
    } else {
      svgEl.animate(
        [
          { transform: 'translate3d(0, 0, 0) scale(1, 1)' },
          { transform: 'translate3d(0, -12px, 0) scale(0.94, 1.08)' },
          { transform: 'translate3d(0, 0, 0) scale(1.1, 0.9)' },
          { transform: 'translate3d(0, 0, 0) scale(1, 1)' }
        ],
        { duration: 520, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
      );
    }
  }
}

/**
 * Initialize all 5 arcade mascots, Arcade Mode, SFX Mute control,
 * BYTE pointer eye-tracking, IntersectionObservers, and visibility guards.
 */
export function initMascotSystem(): () => void {
  if (activeMascotCleanup) {
    activeMascotCleanup();
    activeMascotCleanup = null;
  }

  const abortController = new AbortController();
  const { signal } = abortController;
  const timers: number[] = [];
  const observers: IntersectionObserver[] = [];
  let eyeRafId: number | null = null;

  // Default state on load: MOTION: ON, ARCADE MODE: ON, SFX: ON
  let isMotionDisabled = false;
  let isArcadeMode = true;
  let isSfxMuted = false;

  const syncControlHud = () => {
    document.documentElement.classList.toggle(
      'motion-enabled',
      !isMotionDisabled
    );
    document.documentElement.classList.toggle(
      'motion-disabled',
      isMotionDisabled
    );
    document.documentElement.classList.toggle(
      'arcade-mode-active',
      isArcadeMode && !isMotionDisabled
    );

    document
      .querySelectorAll<HTMLButtonElement>('[data-motion-toggle]')
      .forEach((btn) => {
        btn.setAttribute('aria-pressed', String(!isMotionDisabled));
        const labelSpan = btn.querySelector<HTMLElement>(
          '[data-motion-toggle-label]'
        );
        if (labelSpan) {
          labelSpan.textContent = isMotionDisabled
            ? 'MOTION: OFF'
            : 'MOTION: ON';
        }
      });

    document
      .querySelectorAll<HTMLButtonElement>('[data-arcade-toggle]')
      .forEach((btn) => {
        btn.setAttribute('aria-pressed', String(isArcadeMode));
        const labelSpan = btn.querySelector<HTMLElement>(
          '[data-arcade-toggle-label]'
        );
        if (labelSpan) {
          labelSpan.textContent = isArcadeMode
            ? 'ARCADE MODE: ON'
            : 'ARCADE MODE: OFF';
        }
      });

    document
      .querySelectorAll<HTMLButtonElement>('[data-arcade-mute]')
      .forEach((btn) => {
        btn.setAttribute('aria-pressed', String(isSfxMuted));
        const labelSpan = btn.querySelector<HTMLElement>(
          '[data-arcade-mute-label]'
        );
        if (labelSpan) {
          labelSpan.textContent = isSfxMuted ? 'SFX: MUTED' : 'SFX: ON';
        }
      });
  };

  syncControlHud();

  // Unlock Web Audio API on first user gesture when Arcade Mode & SFX are ON
  let audioUnlocked = false;
  const unlockAudioOnFirstGesture = () => {
    if (audioUnlocked) return;
    audioUnlocked = true;
    if (isArcadeMode && !isSfxMuted && !isMotionDisabled) {
      playArcadeSfx('toggle', true);
    }
  };
  window.addEventListener('pointerdown', unlockAudioOnFirstGesture, {
    once: true,
    passive: true,
    signal
  });
  window.addEventListener('keydown', unlockAudioOnFirstGesture, {
    once: true,
    passive: true,
    signal
  });

  // Play subtle 8-bit feedback when clicking portfolio buttons/cards in Arcade Mode
  document.addEventListener(
    'click',
    (e: MouseEvent) => {
      if (!isArcadeMode || isSfxMuted || isMotionDisabled) return;
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest('[data-mascot-stage], [data-arcade-toggle], [data-arcade-mute], [data-motion-toggle]')) {
        return;
      }
      if (target.closest('.memphis-btn, [data-project-card], [data-kg-filter], .kg-node')) {
        playArcadeSfx('hover', true);
      }
    },
    { passive: true, signal }
  );

  const stageElements = Array.from(
    document.querySelectorAll<HTMLElement>('[data-mascot-stage]')
  );

  const instances = new Map<
    HTMLElement,
    {
      fsm: MascotFSM;
      applyDomState: () => void;
      resetTimer: number | null;
    }
  >();

  stageElements.forEach((stageEl) => {
    const name = (stageEl.dataset.mascotName as MascotName) || 'aj-bot';
    const initialState = (stageEl.dataset.mascotState as MascotState) || 'idle';
    const interactive = stageEl.dataset.mascotInteractive === 'true';

    const fsm = new MascotFSM({
      name,
      initialState,
      motionDisabled: isMotionDisabled
    });

    const statusBadge = stageEl.querySelector<HTMLElement>(
      '[data-mascot-status]'
    );
    const byteScreenText = stageEl.querySelector<SVGTextElement>(
      '[data-byte-screen-text]'
    );

    const applyDomState = () => {
      stageEl.setAttribute('data-mascot-state', fsm.state);
      stageEl.setAttribute('data-mascot-offscreen', String(fsm.offscreen));
      if (statusBadge) {
        statusBadge.textContent = fsm.statusText;
      }
      if (byteScreenText) {
        byteScreenText.textContent =
          fsm.statusText === 'HELLO WORLD' ? 'HELLO WORLD' : 'SYSTEM READY';
      }
    };

    const instance = { fsm, applyDomState, resetTimer: null as number | null };
    instances.set(stageEl, instance);
    applyDomState();

    const scheduleReturnToIdle = (delayMs: number) => {
      if (instance.resetTimer !== null) {
        window.clearTimeout(instance.resetTimer);
      }
      instance.resetTimer = window.setTimeout(() => {
        if (!fsm.motionDisabled && !fsm.offscreen && !fsm.tabHidden) {
          fsm.transition('WAKE');
          applyDomState();
        }
      }, delayMs);
      timers.push(instance.resetTimer);
    };

    if (interactive) {
      stageEl.addEventListener(
        'pointerenter',
        (e: PointerEvent) => {
          if (e.pointerType !== 'mouse' || fsm.motionDisabled) return;
          if (fsm.state === 'celebrate') return;
          fsm.transition('HOVER');
          applyDomState();
          playArcadeSfx('hover', isArcadeMode && !isSfxMuted && !isMotionDisabled);
        },
        { signal }
      );

      stageEl.addEventListener(
        'pointerleave',
        (e: PointerEvent) => {
          if (e.pointerType !== 'mouse' || fsm.motionDisabled) return;
          if (fsm.state === 'celebrate') return;
          fsm.transition('LEAVE');
          applyDomState();
        },
        { signal }
      );

      const handleActivate = () => {
        fsm.transition('CLICK');
        applyDomState();

        if (!fsm.motionDisabled) {
          playWebAnimationBurst(stageEl, name, 'click');
          playArcadeSfx(name, isArcadeMode && !isSfxMuted);
        }

        if (name === 'node') {
          const kgWidget = stageEl.closest('[data-kg-widget]');
          if (kgWidget) {
            const kgFilterBtn = kgWidget.querySelector<HTMLButtonElement>(
              '[data-kg-filter="kg"]'
            );
            kgFilterBtn?.click();
          }
        }

        scheduleReturnToIdle(1500);
      };

      stageEl.addEventListener('click', handleActivate, { signal });
      stageEl.addEventListener(
        'keydown',
        (e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleActivate();
          }
        },
        { signal }
      );
    }
  });

  // BYTE CRT Mascot: Eyes follow nearby pointer movement (desktop only)
  const bytePupilGroups = Array.from(
    document.querySelectorAll<SVGGElement>('[data-byte-pupils]')
  );
  if (bytePupilGroups.length > 0) {
    let lastClientX = 0;
    let lastClientY = 0;

    const updateByteEyes = () => {
      eyeRafId = null;
      if (isMotionDisabled || window.innerWidth < 768) return;

      bytePupilGroups.forEach((pupilGroup) => {
        const stageEl = pupilGroup.closest<HTMLElement>('[data-mascot-stage]');
        if (!stageEl || stageEl.dataset.mascotOffscreen === 'true') return;

        const rect = stageEl.getBoundingClientRect();
        const cx = rect.left + rect.width * 0.5;
        const cy = rect.top + rect.height * 0.5;
        const dx = lastClientX - cx;
        const dy = lastClientY - cy;
        const dist = Math.hypot(dx, dy);

        if (dist < 360 && dist > 1) {
          const tx = Math.max(-2, Math.min(2, (dx / 180) * 2));
          const ty = Math.max(-1.5, Math.min(1.5, (dy / 180) * 1.5));
          pupilGroup.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
        } else {
          pupilGroup.style.transform = 'translate3d(0, 0, 0)';
        }
      });
    };

    window.addEventListener(
      'pointermove',
      (e: PointerEvent) => {
        if (e.pointerType !== 'mouse' || isMotionDisabled) return;
        lastClientX = e.clientX;
        lastClientY = e.clientY;
        if (eyeRafId === null) {
          eyeRafId = window.requestAnimationFrame(updateByteEyes);
        }
      },
      { passive: true, signal }
    );
  }

  // Animated 4-Expression PORTRAIT.BMP Window (Classic -> Smile -> Laugh -> 80s Sunglasses)
  const portraitWindow = document.querySelector<SVGGElement>('[data-portrait-window]');
  const portraitFileEl = document.querySelector<SVGTextElement>('[data-portrait-file]');
  const portraitCaptionEl = document.querySelector<SVGTextElement>('[data-portrait-caption]');
  if (portraitWindow && portraitFileEl && portraitCaptionEl) {
    const portraitStates = [
      { file: 'PORTRAIT.BMP', caption: 'ARUN JOSE // PORTRAIT' },
      { file: 'SMILE_86.BMP', caption: 'ARUN JOSE // SMILE ✦' },
      { file: 'LAUGH_86.BMP', caption: 'ARUN JOSE // LAUGH ★' },
      { file: 'SHADES_86.BMP', caption: 'ARUN JOSE // 80S COOL' }
    ];
    let pIdx = 0;
    const portraitTimer = window.setInterval(() => {
      if (isMotionDisabled || document.hidden) return;
      pIdx = (pIdx + 1) % portraitStates.length;
      portraitFileEl.textContent = portraitStates[pIdx].file;
      portraitCaptionEl.textContent = portraitStates[pIdx].caption;
    }, 1800);
    timers.push(portraitTimer);

    portraitWindow.addEventListener(
      'click',
      () => {
        if (isMotionDisabled) return;
        pIdx = (pIdx + 1) % portraitStates.length;
        portraitFileEl.textContent = portraitStates[pIdx].file;
        portraitCaptionEl.textContent = portraitStates[pIdx].caption;
        playArcadeSfx('aj-bot', isArcadeMode && !isSfxMuted);
      },
      { signal }
    );
  }

  // Viewport Activation & Off-screen Pause via IntersectionObserver
  if ('IntersectionObserver' in window) {
    const mascotObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const stageEl = entry.target as HTMLElement;
          const inst = instances.get(stageEl);
          if (!inst) return;

          const { fsm, applyDomState } = inst;
          if (entry.isIntersecting) {
            const wasOffscreen = fsm.offscreen;
            fsm.offscreen = false;
            if (!fsm.motionDisabled && !fsm.tabHidden) {
              fsm.transition('ENTER');
              applyDomState();

              if (fsm.name === 'aj-bot') {
                // Sequence: walk into view -> jump -> wave -> idle
                playWebAnimationBurst(stageEl, 'aj-bot', 'enter');
                const jumpTimer = window.setTimeout(() => {
                  if (!fsm.motionDisabled && !fsm.offscreen) {
                    fsm.setState('jump', 'JUMP // BOOST!');
                    applyDomState();
                  }
                }, 400);
                const waveTimer = window.setTimeout(() => {
                  if (!fsm.motionDisabled && !fsm.offscreen) {
                    fsm.setState('wave', 'WAVE // HI!');
                    applyDomState();
                  }
                }, 820);
                const idleTimer = window.setTimeout(() => {
                  if (!fsm.motionDisabled && !fsm.offscreen) {
                    fsm.setState('idle');
                    applyDomState();
                  }
                }, 1450);
                timers.push(jumpTimer, waveTimer, idleTimer);
              } else if (wasOffscreen) {
                fsm.setState('idle');
                applyDomState();
              }
            } else {
              applyDomState();
            }
          } else {
            fsm.offscreen = true;
            fsm.transition('SLEEP');
            applyDomState();
          }
        });
      },
      { rootMargin: '40px 0px', threshold: 0.08 }
    );

    stageElements.forEach((el) => mascotObserver.observe(el));
    observers.push(mascotObserver);
  }

  // Arcade Mode Playful Patrol Interval (Active only when Arcade Mode is ON)
  let arcadePatrolInterval: number | null = null;
  const updateArcadePatrol = () => {
    if (arcadePatrolInterval !== null) {
      window.clearInterval(arcadePatrolInterval);
      arcadePatrolInterval = null;
    }

    if (!isArcadeMode || isMotionDisabled) return;

    const cycleStates: MascotState[] = [
      'walk',
      'jump',
      'wave',
      'celebrate',
      'idle'
    ];
    let step = 0;
    arcadePatrolInterval = window.setInterval(() => {
      if (isMotionDisabled || !isArcadeMode || document.hidden) return;
      step++;
      let idx = 0;
      instances.forEach(({ fsm, applyDomState }, stageEl) => {
        const nextState = cycleStates[(step + idx) % cycleStates.length];
        idx++;
        if (!fsm.offscreen) {
          if (fsm.name === 'byte' && nextState === 'celebrate') {
            fsm.setState('celebrate', 'HELLO WORLD');
          } else {
            fsm.setState(nextState);
          }
          applyDomState();
          if (nextState === 'celebrate' || nextState === 'jump') {
            playWebAnimationBurst(stageEl, fsm.name, 'click');
          }
        }
      });
    }, 2400);
    timers.push(arcadePatrolInterval);
  };

  // Start Arcade Mode patrol immediately when Arcade Mode is ON (default)
  updateArcadePatrol();

  // Browser Tab Visibility Guard
  const onVisibilityChange = () => {
    const hidden = document.hidden;
    document.documentElement.classList.toggle('mascot-tab-hidden', hidden);
    instances.forEach(({ fsm, applyDomState }) => {
      fsm.tabHidden = hidden;
      fsm.transition(hidden ? 'SLEEP' : 'WAKE');
      applyDomState();
    });
  };
  document.addEventListener('visibilitychange', onVisibilityChange, { signal });

  // Bind ARCADE MODE Toggle
  document
    .querySelectorAll<HTMLButtonElement>('[data-arcade-toggle]')
    .forEach((btn) => {
      btn.addEventListener(
        'click',
        () => {
          isArcadeMode = !isArcadeMode;
          try {
            localStorage.setItem(ARCADE_STORAGE_KEY, String(isArcadeMode));
          } catch {
            // ignore storage errors
          }
          if (isArcadeMode) {
            isSfxMuted = false;
            try {
              localStorage.setItem(SFX_MUTE_STORAGE_KEY, 'false');
            } catch {
              // ignore storage errors
            }
            playArcadeSfx('toggle', !isMotionDisabled);
            instances.forEach(({ fsm, applyDomState }) => {
              if (!fsm.offscreen && !fsm.motionDisabled) {
                fsm.setState('wave');
                applyDomState();
              }
            });
          } else {
            isSfxMuted = true;
            try {
              localStorage.setItem(SFX_MUTE_STORAGE_KEY, 'true');
            } catch {
              // ignore storage errors
            }
            instances.forEach(({ fsm, applyDomState }) => {
              if (!fsm.offscreen && !fsm.motionDisabled) {
                fsm.setState('idle');
                applyDomState();
              }
            });
          }
          syncControlHud();
          updateArcadePatrol();
        },
        { signal }
      );
    });

  // Bind Independent SFX Mute Control
  document
    .querySelectorAll<HTMLButtonElement>('[data-arcade-mute]')
    .forEach((btn) => {
      btn.addEventListener(
        'click',
        () => {
          isSfxMuted = !isSfxMuted;
          try {
            localStorage.setItem(SFX_MUTE_STORAGE_KEY, String(isSfxMuted));
          } catch {
            // ignore storage errors
          }
          syncControlHud();
          if (!isSfxMuted && isArcadeMode && !isMotionDisabled) {
            playArcadeSfx('toggle', true);
          }
        },
        { signal }
      );
    });

  // Bind Decorative Motion Toggle Button
  document
    .querySelectorAll<HTMLButtonElement>('[data-motion-toggle]')
    .forEach((btn) => {
      btn.addEventListener(
        'click',
        () => {
          isMotionDisabled = !isMotionDisabled;
          try {
            localStorage.setItem(
              MOTION_STORAGE_KEY,
              String(isMotionDisabled)
            );
          } catch {
            // ignore storage errors
          }
          syncControlHud();
          updateArcadePatrol();
          instances.forEach(({ fsm, applyDomState }) => {
            fsm.setMotionDisabled(isMotionDisabled);
            applyDomState();
          });
        },
        { signal }
      );
    });

  const cleanup = () => {
    abortController.abort();
    observers.forEach((obs) => obs.disconnect());
    timers.forEach((id) => {
      window.clearTimeout(id);
      window.clearInterval(id);
    });
    if (eyeRafId !== null) {
      window.cancelAnimationFrame(eyeRafId);
      eyeRafId = null;
    }
    instances.clear();
  };

  activeMascotCleanup = cleanup;
  return cleanup;
}
