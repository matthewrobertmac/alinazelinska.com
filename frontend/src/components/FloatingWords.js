import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiVolume2 } from 'react-icons/fi';
import { floatingWords } from '../data/content';
import './FloatingWords.css';

/*
 * The Living Lexicon
 *
 * Ukrainian words condense out of scattered letters, drift around the portrait at
 * different depths (parallax + depth-of-field), part around the cursor, and
 * dissolve back into letters when their time is up. Hover a word to read it;
 * click to catch it in gold and hear it spoken.
 *
 * The stage spans the whole hero (below the header) and floats above the portrait, but
 * words steer around keep-out zones (the copy block and any other text, passed as
 * `avoidRefs`) so they never cross the headline or text, and nudge apart from each other. They're born in visible free space, slide out along the
 * nearest edge if they drift into a zone, and dissolve when they drift off-stage (a fresh
 * word forms elsewhere). Desktop only: below 900px it isn't rendered.
 *
 * Positions are written straight to the DOM from a single rAF loop — React
 * only re-renders when a word is born, dies, or is caught.
 */

// Breathing room between a word and the copy it avoids
const KEEP_OUT_PAD = 36;
const DESKTOP = '(min-width: 900px)';

const rand = (min, max) => min + Math.random() * (max - min);

const findUkrainianVoice = () => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  return window.speechSynthesis.getVoices().find((v) => v.lang?.toLowerCase().startsWith('uk')) || null;
};

const speak = (text) => {
  const voice = findUkrainianVoice();
  if (!voice) return false;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voice;
  utterance.lang = voice.lang;
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
  return true;
};

let nextId = 0;

// Font size by depth: far words ~20px, the nearest ~64px
const sizeFor = (z) => 20 + z * 44;

// Is a word (centre x,y; half-width; height) overlapping the keep-out rectangle?
const insideKeepOut = (k, x, y, halfW, height) =>
  !!k && x + halfW > k.left && x - halfW < k.right && y + height / 2 > k.top && y - height / 2 < k.bottom;
const insideAny = (zones, x, y, halfW, height) => zones.some((k) => insideKeepOut(k, x, y, halfW, height));

const Lexicon = ({ avoidRefs }) => {
  const { t, i18n } = useTranslation();
  // English visitors get the transliteration too; Ukrainian and Russian readers already read Cyrillic.
  const showTr = i18n.resolvedLanguage === 'en';
  const gloss = (entry) => t(`widgets.lexicon.gloss.${entry.tr}`, { defaultValue: entry.en });
  const stageRef = useRef(null);
  const simRef = useRef(new Map());
  // Keep-out rectangles (copy, portrait) in stage coordinates, padded
  const keepOutRef = useRef([]);
  const inUseRef = useRef(new Set());
  const pointerRef = useRef({ x: -9999, y: -9999, px: 0, py: 0, sx: 0, sy: 0, active: false });
  const reducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const [words, setWords] = useState([]);
  const [caught, setCaught] = useState(() => new Set());
  const [hasVoice, setHasVoice] = useState(false);
  const [blooms, setBlooms] = useState([]);

  useEffect(() => {
    if (!window.speechSynthesis) return undefined;
    const check = () => setHasVoice(!!findUkrainianVoice());
    check();
    window.speechSynthesis.addEventListener?.('voiceschanged', check);
    return () => window.speechSynthesis.removeEventListener?.('voiceschanged', check);
  }, []);

  const pickEntry = useCallback(() => {
    const available = floatingWords.filter((w) => !inUseRef.current.has(w.uk));
    const pool = available.length ? available : floatingWords;
    const entry = pool[Math.floor(Math.random() * pool.length)];
    inUseRef.current.add(entry.uk);
    return entry;
  }, []);

  // Where a word can be seen: below the faded top edge, above the fold, inside the stage.
  const visibleBand = () => {
    const stage = stageRef.current;
    const w = stage?.clientWidth || window.innerWidth;
    const h = stage?.clientHeight || window.innerHeight;
    const top = 70;
    const bottom = Math.min(h, window.innerHeight - (stage ? stage.getBoundingClientRect().top + window.scrollY : 0)) - 30;
    return { w, h, top, bottom: Math.max(bottom, top + 100) };
  };

  const makeWord = useCallback(
    (initial = false) => {
      const { w, top, bottom } = visibleBand();
      const entry = pickEntry();
      // Bias toward the far plane so the near, large words stay rare and special.
      const z = Math.pow(Math.random(), 1.4);
      const id = ++nextId;
      const halfW = (sizeFor(z) * Array.from(entry.uk).length * 0.3) / 2;
      let x = rand(halfW + 8, w - halfW - 8);
      let y = rand(top, bottom);
      for (let tries = 0; tries < 60 && insideAny(keepOutRef.current, x, y, halfW + 12, sizeFor(z) + 12); tries++) {
        x = rand(halfW + 8, w - halfW - 8);
        y = rand(top, bottom);
      }
      simRef.current.set(id, {
        x,
        y,
        halfW,
        halfH: sizeFor(z) * 0.6,
        ox: 0,
        oy: 0,
        z,
        phase: rand(0, Math.PI * 2),
        born: performance.now() + (initial ? rand(0, 2400) : 0),
        life: rand(16000, 28000),
        state: 'forming',
        entry: entry.uk,
        hover: false,
        el: null,
      });
      return {
        id,
        entry,
        z,
        letters: Array.from(entry.uk).map(() => ({
          sx: rand(-70, 70),
          sy: rand(-50, 50),
          sr: rand(-50, 50),
        })),
      };
    },
    // visibleBand only reads refs and the window
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pickEntry]
  );

  const retire = useCallback(
    (id) => {
      const sim = simRef.current.get(id);
      if (!sim || sim.state === 'dissolving') return;
      sim.state = 'dissolving';
      sim.el?.classList.remove('is-formed');
      sim.el?.classList.add('is-dissolving');
      setTimeout(() => {
        simRef.current.delete(id);
        if (sim.entry) inUseRef.current.delete(sim.entry);
        const fresh = makeWord();
        setWords((prev) => [...prev.filter((w) => w.id !== id), fresh]);
      }, 1600);
    },
    [makeWord]
  );

  // Seed the stage.
  useEffect(() => {
    const count = window.innerWidth < 1200 ? 14 : 16;
    setWords(Array.from({ length: count }, () => makeWord(true)));
    const sims = simRef.current;
    const inUse = inUseRef.current;
    return () => {
      sims.clear();
      inUse.clear();
    };
  }, [makeWord]);

  // Measure the keep-out elements relative to the stage (layout only changes on resize).
  useEffect(() => {
    const stage = stageRef.current;
    // Each entry is a ref or a CSS selector (for elements that don't take a ref)
    const avoid = (avoidRefs || [])
      .map((item) => (typeof item === 'string' ? document.querySelector(item) : item.current))
      .filter(Boolean);
    if (!stage || !avoid.length) return undefined;
    const measure = () => {
      const s = stage.getBoundingClientRect();
      keepOutRef.current = avoid.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          left: r.left - s.left - KEEP_OUT_PAD,
          right: r.right - s.left + KEEP_OUT_PAD,
          top: r.top - s.top - KEEP_OUT_PAD,
          bottom: r.bottom - s.top + KEEP_OUT_PAD,
        };
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    avoid.forEach((el) => ro.observe(el));
    // The copy, badge and note animate in on load; re-measure once they've settled.
    const settles = [1200, 3200].map((ms) => setTimeout(measure, ms));
    return () => {
      ro.disconnect();
      settles.forEach(clearTimeout);
    };
  }, [avoidRefs]);

  // The single animation loop.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    let raf = 0;
    let visible = true;
    let last = performance.now();

    const io = new IntersectionObserver(([e]) => {
      const wasVisible = visible;
      visible = e.isIntersecting;
      if (visible && !wasVisible) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(stage);

    function tick(now) {
      if (!visible) return;
      const dt = Math.min(now - last, 50) / 16.67;
      last = now;
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      const p = pointerRef.current;

      // Ease the parallax origin toward the pointer.
      p.sx += (p.px - p.sx) * 0.05 * dt;
      p.sy += (p.py - p.sy) * 0.05 * dt;

      const t = now * 0.00012;

      // Words gently nudge apart so they don't stack into an unreadable pile.
      const live = [...simRef.current.values()].filter((s) => s.el && s.state !== 'caught' && s.state !== 'dissolving');
      for (let i = 0; i < live.length; i++) {
        for (let j = i + 1; j < live.length; j++) {
          const a = live[i];
          const b = live[j];
          const ox = a.halfW + b.halfW + 10 - Math.abs(a.x - b.x);
          const oy = a.halfH + b.halfH + 6 - Math.abs(a.y - b.y);
          if (ox > 0 && oy > 0) {
            // Separate along the axis that needs the smaller move
            const push = Math.min(0.9, (ox < oy ? ox : oy) * 0.05) * dt;
            if (ox < oy) {
              const dir = a.x < b.x ? -1 : 1;
              a.x += dir * push;
              b.x -= dir * push;
            } else {
              const dir = a.y < b.y ? -1 : 1;
              a.y += dir * push;
              b.y -= dir * push;
            }
          }
        }
      }

      simRef.current.forEach((s, id) => {
        if (!s.el) return;
        // Swap the size estimate for the word's real rendered size (layout ignores letter transforms)
        if (!s.measured) {
          const uk = s.el.querySelector('.lex-uk');
          if (uk && uk.offsetWidth) {
            s.halfW = uk.offsetWidth / 2;
            s.halfH = uk.offsetHeight / 2;
            s.measured = true;
          }
        }

        if (s.state === 'forming' && now >= s.born) {
          s.state = 'alive';
          s.el.classList.add('is-formed');
        }
        if (s.state === 'alive' && !s.hover && now - s.born > s.life) {
          retire(id);
        }

        const still = reducedMotion.current || s.state === 'caught' || s.hover;
        if (!still) {
          // A slow, curling current — nearer words travel a little faster.
          const speed = 0.12 + s.z * 0.28;
          const angle =
            Math.sin(s.y * 0.0021 + t + s.phase) * 1.4 + Math.cos(s.x * 0.0017 - t * 1.3) * 1.1;
          s.x += Math.cos(angle) * speed * dt + 0.06 * dt;
          s.y += Math.sin(angle) * speed * 0.7 * dt;

          // Drifted off-stage: let it dissolve and form a fresh word somewhere visible.
          if (s.state === 'alive' && (s.x > w + s.halfW || s.x < -s.halfW || s.y > h + s.halfH || s.y < -s.halfH)) {
            retire(id);
          }
        }

        // Words part around the cursor like reeds around a hand in water.
        let tx = 0;
        let ty = 0;
        if (p.active && s.state !== 'caught' && !s.hover) {
          const dx = s.x + s.ox - p.x;
          const dy = s.y + s.oy - p.y;
          const dist = Math.hypot(dx, dy);
          const radius = 170;
          if (dist < radius && dist > 0.01) {
            const force = (1 - dist / radius) ** 2 * 60;
            tx = (dx / dist) * force;
            ty = (dy / dist) * force;
          }
        }
        s.ox += (tx - s.ox) * 0.08 * dt;
        s.oy += (ty - s.oy) * 0.08 * dt;

        const depth = s.z - 0.35;
        let px = s.x + s.ox - p.sx * depth * 40;
        let py = s.y + s.oy - p.sy * depth * 28;

        // Keep out of the zones, judged on where the word is actually drawn: slide it out by the
        // nearest exit that doesn't lead into another zone. Drift is slow, so corrections are tiny
        // and read as the word flowing along the edge.
        if (s.state !== 'caught') {
          const zones = keepOutRef.current;
          for (let pass = 0; pass < 2; pass++) {
            const k = zones.find((zone) => insideKeepOut(zone, px, py, s.halfW, s.halfH * 2));
            if (!k) break;
            const exits = [
              { d: px + s.halfW - k.left, dx: -1, dy: 0 },
              { d: k.right - (px - s.halfW), dx: 1, dy: 0 },
              { d: py + s.halfH - k.top, dx: 0, dy: -1 },
              { d: k.bottom - (py - s.halfH), dx: 0, dy: 1 },
            ]
              .map((e) => ({ ...e, d: e.d + 1 }))
              .sort((a, b) => a.d - b.d);
            const band = visibleBand();
            const ok = (e) => {
              const nx = px + e.dx * e.d;
              const ny = py + e.dy * e.d;
              return (
                !insideAny(zones.filter((z) => z !== k), nx, ny, s.halfW, s.halfH * 2) &&
                ny - s.halfH > band.top - 40 &&
                ny + s.halfH < band.bottom + 40 &&
                nx - s.halfW > -20 &&
                nx + s.halfW < band.w + 20
              );
            };
            const exit = exits.find(ok) || exits[0];
            s.x += exit.dx * exit.d;
            s.y += exit.dy * exit.d;
            px += exit.dx * exit.d;
            py += exit.dy * exit.d;
          }
        }
        s.el.style.transform = `translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0) translate(-50%, -50%)`;
      });

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [retire]);

  // Pointer tracking relative to the stage.
  useEffect(() => {
    const stage = stageRef.current;
    const host = stage?.parentElement;
    if (!host) return undefined;
    const move = (e) => {
      const r = stage.getBoundingClientRect();
      const p = pointerRef.current;
      p.x = e.clientX - r.left;
      p.y = e.clientY - r.top;
      p.px = (e.clientX - r.left) / r.width - 0.5;
      p.py = (e.clientY - r.top) / r.height - 0.5;
      p.active = e.pointerType !== 'touch';
    };
    const leave = () => {
      pointerRef.current.active = false;
      pointerRef.current.px = 0;
      pointerRef.current.py = 0;
    };
    host.addEventListener('pointermove', move);
    host.addEventListener('pointerleave', leave);
    return () => {
      host.removeEventListener('pointermove', move);
      host.removeEventListener('pointerleave', leave);
    };
  }, []);

  const setHover = (id, on) => {
    const s = simRef.current.get(id);
    if (!s) return;
    s.hover = on;
    s.el?.classList.toggle('is-hover', on);
  };

  const addBloom = (x, y) => {
    const id = ++nextId;
    setBlooms((b) => [...b, { id, x, y }]);
    setTimeout(() => setBlooms((b) => b.filter((bl) => bl.id !== id)), 1100);
  };

  const toggleCatch = (word, event) => {
    event.stopPropagation();
    const s = simRef.current.get(word.id);
    if (!s) return;

    if (s.state === 'caught') {
      s.state = 'alive';
      s.born = performance.now() - s.life * 0.4;
      setCaught((prev) => {
        const next = new Set(prev);
        next.delete(word.id);
        return next;
      });
      return;
    }

    s.state = 'caught';
    s.el?.classList.add('is-formed');
    const r = stageRef.current.getBoundingClientRect();
    addBloom(event.clientX - r.left, event.clientY - r.top);
    setCaught((prev) => new Set(prev).add(word.id));
    if (hasVoice) speak(word.entry.uk);
  };

  return (
    <>
      <div ref={stageRef} className="lexicon" aria-hidden="true">
        {words.map((word) => {
          const isCaught = caught.has(word.id);
          const size = sizeFor(word.z);
          const blur = Math.max(0, (0.25 - word.z) * 4);
          return (
            <div
              key={word.id}
              ref={(el) => {
                const s = simRef.current.get(word.id);
                if (s) s.el = el;
              }}
              className={`lex-word ${word.z > 0.55 ? 'is-near' : ''} ${isCaught ? 'is-caught' : ''}`}
              style={{
                '--size': `${size}px`,
                '--blur': `${blur.toFixed(2)}px`,
                '--rest': (0.32 + word.z * 0.4).toFixed(2),
                zIndex: isCaught ? 40 : Math.round(word.z * 20),
              }}
              onPointerEnter={(e) => e.pointerType !== 'touch' && setHover(word.id, true)}
              onPointerLeave={() => setHover(word.id, false)}
              onClick={(e) => toggleCatch(word, e)}
              role="button"
              tabIndex={-1}
              aria-label={`${word.entry.uk} — ${gloss(word.entry)}`}
            >
              <span className="lex-uk" lang="uk">
                {Array.from(word.entry.uk).map((ch, i) => (
                  <span
                    key={i}
                    className="lex-letter"
                    style={{
                      '--i': i,
                      '--sx': `${word.letters[i].sx}px`,
                      '--sy': `${word.letters[i].sy}px`,
                      '--sr': `${word.letters[i].sr}deg`,
                    }}
                  >
                    {ch}
                  </span>
                ))}
              </span>
              <span className="lex-gloss">
                {showTr && (
                  <>
                    <span className="lex-tr">{word.entry.tr}</span>
                    <span className="lex-dot">·</span>
                  </>
                )}
                <span className="lex-en">{gloss(word.entry)}</span>
              </span>
              {isCaught && hasVoice && (
                <button
                  type="button"
                  className="lex-speak"
                  onClick={(e) => {
                    e.stopPropagation();
                    speak(word.entry.uk);
                  }}
                  aria-label={t('widgets.lexicon.hear', { word: word.entry.uk })}
                >
                  <FiVolume2 />
                </button>
              )}
            </div>
          );
        })}

        {blooms.map((b) => (
          <span key={b.id} className="lex-bloom" style={{ left: b.x, top: b.y }} />
        ))}
      </div>

    </>
  );
};

// Rendered only where there's room beside the copy; phones and small tablets skip it entirely.
const FloatingWords = ({ avoidRefs }) => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP);
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);
  return enabled ? <Lexicon avoidRefs={avoidRefs} /> : null;
};

export default FloatingWords;
