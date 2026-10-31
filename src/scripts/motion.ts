/**
 * 1980s Memphis & Neo-Brutalist Portfolio Motion System
 * Implements Animations 1–7 with strict accessibility, reduced-motion compliance,
 * mobile performance guards, and complete listener/observer cleanup.
 */

interface KgNodeMeta {
  id: string;
  code: string;
  label: string;
  subtitle: string;
  description: string;
  connectedTo: string[];
  edgeIds: string[];
  color: string;
  textColor: string;
}

const SCRAMBLE_GLYPHS = '0186/#%*+<>_=[]';

let activeCleanup: (() => void) | null = null;

export function initPortfolioMotion(): void {
  if (activeCleanup) {
    activeCleanup();
    activeCleanup = null;
  }

  const abortController = new AbortController();
  const { signal } = abortController;
  const observers: IntersectionObserver[] = [];
  const timers: number[] = [];
  let rafId: number | null = null;

  const prefersReducedMotion =
    document.documentElement.classList.contains('motion-disabled') ||
    (!document.documentElement.classList.contains('motion-enabled') &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  // Always initialize interactive Knowledge Graph controls (keyboard + hover)
  initKnowledgeGraphWidgets(signal);

  // Tactile click/keyboard press feedback for Neo-Brutalist project cards (Animation 4)
  initProjectCardPress(signal, timers, prefersReducedMotion);

  if (prefersReducedMotion) {
    document.documentElement.classList.remove('motion-ready', 'boot-playing');
    revealAllImmediately();
    return () => {
      abortController.abort();
    };
  }

  document.documentElement.classList.add('motion-ready');

  // -------------------------------------------------------------------------
  // Animation 1: Retro System Boot (500–900 ms, once per navigation)
  // -------------------------------------------------------------------------
  const heroSection = document.querySelector<HTMLElement>('[data-hero-section]');
  const scrambleTargets = Array.from(
    document.querySelectorAll<HTMLElement>('[data-boot-scramble]')
  );
  const bootLeds = Array.from(
    document.querySelectorAll<HTMLElement>('.boot-status-led')
  );

  if (heroSection && scrambleTargets.length > 0) {
    document.documentElement.classList.add('boot-playing');

    const runScrambleSequence = () => {
      if (document.documentElement.classList.contains('motion-disabled')) return;
      bootLeds.forEach((led) => led.classList.add('is-scrambling'));

      const totalSteps = 12;
      const stepMs = 55; // ~660ms scramble duration

      scrambleTargets.forEach((el) => {
        const initialText =
          el.getAttribute('data-boot-initial') || 'SYS.86 // INITIALIZING';
        el.textContent = initialText;
      });

      let currentStep = 0;
      const scrambleInterval = window.setInterval(() => {
        currentStep++;
        const progress = currentStep / totalSteps;

        scrambleTargets.forEach((el) => {
          const finalText =
            el.getAttribute('data-boot-final') || 'SYS.86 // SYSTEM READY';
          if (currentStep >= totalSteps) {
            el.textContent = finalText;
            return;
          }

          const prefixLen = Math.floor(finalText.length * progress);
          let nextStr = finalText.slice(0, prefixLen);
          for (let i = prefixLen; i < finalText.length; i++) {
            const ch = finalText[i];
            if (ch === ' ' || ch === '/' || ch === '.') {
              nextStr += ch;
            } else {
              const randIdx = Math.floor(Math.random() * SCRAMBLE_GLYPHS.length);
              nextStr += SCRAMBLE_GLYPHS[randIdx];
            }
          }
          el.textContent = nextStr;
        });

        if (currentStep >= totalSteps) {
          window.clearInterval(scrambleInterval);
          bootLeds.forEach((led) => led.classList.remove('is-scrambling'));
        }
      }, stepMs);

      timers.push(scrambleInterval);
    };

    runScrambleSequence();

    // Periodically re-run the retro boot status scramble every 8.5s when visible
    const periodicScramble = window.setInterval(() => {
      if (!document.hidden && window.scrollY < 600) {
        runScrambleSequence();
      }
    }, 8500);
    timers.push(periodicScramble);

    const bootCleanTimer = window.setTimeout(() => {
      document.documentElement.classList.remove('boot-playing');
    }, 900);
    timers.push(bootCleanTimer);
  }

  // -------------------------------------------------------------------------
  // Animations 3, 4, 5, 6: IntersectionObserver Scroll-Driven Reveals
  // -------------------------------------------------------------------------
  const scrollRevealSelectors = [
    '[data-heading-highlight]',
    '[data-project-card]',
    '[data-logbook-spine]',
    '[data-logbook-entry]',
    '[data-kg-widget]'
  ].join(', ');

  const revealElements = Array.from(
    document.querySelectorAll<HTMLElement>(scrollRevealSelectors)
  );

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            window.requestAnimationFrame(() => {
              revealElementWithStagger(target, timers);
            });
          } else {
            target.classList.remove('is-inview');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -6% 0px',
        threshold: 0.08
      }
    );

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });

    observers.push(revealObserver);
  } else {
    revealAllImmediately();
  }

  // -------------------------------------------------------------------------
  // Animations 2 & 7: Contained Scroll & Pointer Reactive Memphis Geometry
  // (Desktop only >= 768px, rAF throttled)
  // -------------------------------------------------------------------------
  const memphisShapes = Array.from(
    document.querySelectorAll<HTMLElement>('[data-memphis-shape]')
  );
  const paperEdges = Array.from(
    document.querySelectorAll<HTMLElement>('[data-paper-edge]')
  );

  const updateScrollEffects = () => {
    rafId = null;
    if (window.innerWidth < 768) return;

    const scrollY = window.scrollY;

    // Animation 2: Gentle hero shape scroll reaction (strictly bounded ±14px)
    if (heroSection && scrollY < 900) {
      memphisShapes.forEach((shape) => {
        const speed = parseFloat(shape.dataset.shapeSpeed || '0.05');
        const rotFactor = parseFloat(shape.dataset.shapeRotate || '3');
        const baseRot = parseFloat(shape.dataset.baseRotate || '0');

        const rawY = scrollY * speed;
        const clampedY = Math.max(-14, Math.min(14, rawY));
        const deltaRot = Math.max(
          -6,
          Math.min(6, (scrollY / 320) * rotFactor)
        );

        shape.style.transform = `translate3d(0px, ${clampedY.toFixed(1)}px, 0) rotate(${(baseRot + deltaRot).toFixed(1)}deg)`;
      });
    }

    // Animation 7: Gentle scrapbook paper-edge shift (strictly bounded ±12px)
    const viewportCenter = window.innerHeight * 0.5;
    paperEdges.forEach((divider) => {
      const rect = divider.getBoundingClientRect();
      if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return;

      const dir = divider.dataset.paperDir === 'right' ? -1 : 1;
      const normalized = (viewportCenter - rect.top) / window.innerHeight;
      const shiftPx = Math.max(-12, Math.min(12, normalized * 14 * dir));

      const svg = divider.querySelector<SVGElement>('.paper-edge-svg');
      if (svg) {
        svg.style.setProperty('--paper-offset', `${shiftPx.toFixed(1)}px`);
      }
    });
  };

  const onScroll = () => {
    if (rafId === null) {
      rafId = window.requestAnimationFrame(updateScrollEffects);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true, signal });
  updateScrollEffects();

  // Cleanup registration
  activeCleanup = () => {
    abortController.abort();
    observers.forEach((obs) => obs.disconnect());
    timers.forEach((id) => {
      window.clearTimeout(id);
      window.clearInterval(id);
    });
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  };
}

function revealElementWithStagger(
  target: HTMLElement,
  timers: number[]
): void {
  if (target.hasAttribute('data-project-card')) {
    const idx = parseInt(target.getAttribute('data-stagger-index') || '0', 10);
    const delayMs = idx * 110;
    target.style.transitionDelay = `${delayMs}ms`;
    target.classList.add('is-inview');

    const clearTimer = window.setTimeout(() => {
      target.style.transitionDelay = '0ms';
    }, delayMs + 500);
    timers.push(clearTimer);
    return;
  }

  target.classList.add('is-inview');
}

function revealAllImmediately(): void {
  document
    .querySelectorAll<HTMLElement>(
      '[data-heading-highlight], [data-project-card], [data-logbook-spine], [data-logbook-entry], [data-kg-widget]'
    )
    .forEach((el) => {
      el.classList.add('is-inview');
      el.style.transitionDelay = '0ms';
    });
}

function initProjectCardPress(
  signal: AbortSignal,
  timers: number[],
  prefersReducedMotion: boolean
): void {
  if (prefersReducedMotion) return;

  const cards = Array.from(
    document.querySelectorAll<HTMLElement>('[data-project-card]')
  );

  cards.forEach((card) => {
    const triggerPress = () => {
      card.classList.add('is-card-pressed');
      const timerId = window.setTimeout(() => {
        card.classList.remove('is-card-pressed');
      }, 150);
      timers.push(timerId);
    };

    card.addEventListener('mousedown', triggerPress, { signal });
    card.addEventListener(
      'keydown',
      (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          triggerPress();
        }
      },
      { signal }
    );
  });
}

function initKnowledgeGraphWidgets(signal: AbortSignal): void {
  const widgets = Array.from(
    document.querySelectorAll<HTMLElement>('[data-kg-widget]')
  );

  widgets.forEach((widget) => {
    const metaScript = widget.querySelector<HTMLScriptElement>(
      'script[data-kg-metadata]'
    );
    if (!metaScript || !metaScript.textContent) return;

    let nodesData: KgNodeMeta[] = [];
    try {
      nodesData = JSON.parse(metaScript.textContent) as KgNodeMeta[];
    } catch {
      return;
    }

    const nodeMap = new Map<string, KgNodeMeta>(
      nodesData.map((n) => [n.id, n])
    );

    const svgNodes = Array.from(
      widget.querySelectorAll<SVGGElement>('[data-kg-node]')
    );
    const svgEdges = Array.from(
      widget.querySelectorAll<SVGLineElement>('[data-kg-edge]')
    );
    const filterBtns = Array.from(
      widget.querySelectorAll<HTMLButtonElement>('[data-kg-filter]')
    );

    const inspectorCode = widget.querySelector<HTMLElement>(
      '[data-kg-inspector-code]'
    );
    const inspectorTitle = widget.querySelector<HTMLElement>(
      '[data-kg-inspector-title]'
    );
    const inspectorSubtitle = widget.querySelector<HTMLElement>(
      '[data-kg-inspector-subtitle]'
    );
    const inspectorDesc = widget.querySelector<HTMLElement>(
      '[data-kg-inspector-desc]'
    );
    const inspectorLinks = widget.querySelector<HTMLElement>(
      '[data-kg-inspector-links]'
    );

    let lockedNodeId: string | null = null;
    let isPointerInside = false;

    const highlightNode = (nodeId: string | null) => {
      // Update toolbar button states
      filterBtns.forEach((btn) => {
        const filterVal = btn.getAttribute('data-kg-filter');
        const isActive =
          (nodeId === null && filterVal === 'all') || filterVal === nodeId;
        btn.setAttribute('aria-pressed', String(isActive));
        if (isActive) {
          btn.classList.add('bg-ink', 'text-yellow');
          btn.classList.remove('bg-paper', 'text-ink');
        } else {
          btn.classList.remove('bg-ink', 'text-yellow');
          btn.classList.add('bg-paper', 'text-ink');
        }
      });

      if (!nodeId || !nodeMap.has(nodeId)) {
        svgNodes.forEach((n) => {
          n.classList.remove('is-kg-active', 'is-kg-dimmed');
        });
        svgEdges.forEach((e) => {
          e.classList.remove('is-kg-highlighted', 'is-kg-dimmed');
        });
        return;
      }

      const meta = nodeMap.get(nodeId)!;
      const activeSet = new Set<string>([nodeId, ...meta.connectedTo]);
      const activeEdges = new Set<string>(meta.edgeIds);

      svgNodes.forEach((n) => {
        const id = n.getAttribute('data-kg-node') || '';
        n.classList.toggle('is-kg-active', id === nodeId);
        n.classList.toggle('is-kg-dimmed', !activeSet.has(id));
      });

      svgEdges.forEach((e) => {
        const edgeId = e.getAttribute('data-kg-edge') || '';
        const isConn = activeEdges.has(edgeId);
        e.classList.toggle('is-kg-highlighted', isConn);
        e.classList.toggle('is-kg-dimmed', !isConn);
      });

      // Update live inspector panel
      if (inspectorCode) inspectorCode.textContent = `${meta.code} // SELECTED`;
      if (inspectorTitle) inspectorTitle.textContent = meta.label;
      if (inspectorSubtitle) inspectorSubtitle.textContent = meta.subtitle;
      if (inspectorDesc) inspectorDesc.textContent = meta.description;

      if (inspectorLinks) {
        inspectorLinks.innerHTML = '';
        meta.connectedTo.forEach((neighborId) => {
          const neighbor = nodeMap.get(neighborId);
          if (!neighbor) return;
          const badge = document.createElement('span');
          badge.className = 'memphis-tag';
          badge.style.backgroundColor = neighbor.color;
          badge.style.color = neighbor.textColor;
          badge.textContent = neighbor.label;
          inspectorLinks.appendChild(badge);
        });
      }
    };

    svgNodes.forEach((nodeEl) => {
      const nodeId = nodeEl.getAttribute('data-kg-node');
      if (!nodeId) return;

      nodeEl.addEventListener(
        'mouseenter',
        () => {
          highlightNode(nodeId);
        },
        { signal }
      );

      nodeEl.addEventListener(
        'focus',
        () => {
          highlightNode(nodeId);
        },
        { signal }
      );

      nodeEl.addEventListener(
        'click',
        () => {
          lockedNodeId = lockedNodeId === nodeId ? null : nodeId;
          highlightNode(lockedNodeId);
        },
        { signal }
      );

      nodeEl.addEventListener(
        'keydown',
        (e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            lockedNodeId = lockedNodeId === nodeId ? null : nodeId;
            highlightNode(lockedNodeId ?? nodeId);
          }
        },
        { signal }
      );
    });

    const svgCanvas = widget.querySelector<SVGElement>('.kg-svg-canvas');
    if (svgCanvas) {
      svgCanvas.addEventListener(
        'mouseenter',
        () => {
          isPointerInside = true;
        },
        { signal }
      );
      svgCanvas.addEventListener(
        'mouseleave',
        () => {
          isPointerInside = false;
          highlightNode(lockedNodeId);
        },
        { signal }
      );
    }

    filterBtns.forEach((btn) => {
      btn.addEventListener(
        'click',
        () => {
          const val = btn.getAttribute('data-kg-filter');
          lockedNodeId = val === 'all' ? null : val;
          highlightNode(lockedNodeId);
        },
        { signal }
      );
    });

    // Periodic auto-traversal motion across the Knowledge Graph nodes from time to time
    const autoCycleIds: (string | null)[] = [
      'kg',
      'rag',
      'nlp',
      'ast',
      'compliance',
      'telemetry',
      null
    ];
    let autoIdx = 0;
    const autoInterval = window.setInterval(() => {
      if (
        document.hidden ||
        isPointerInside ||
        lockedNodeId !== null ||
        document.documentElement.classList.contains('motion-disabled')
      ) {
        return;
      }
      const nextNodeId = autoCycleIds[autoIdx % autoCycleIds.length];
      autoIdx++;
      highlightNode(nextNodeId);
    }, 3000);

    signal.addEventListener('abort', () => {
      window.clearInterval(autoInterval);
    });
  });
}

