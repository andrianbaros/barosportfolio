"use client";

import { useEffect, useRef } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
}

const CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ/#";

export function ScrambleText({ text, className = "" }: ScrambleTextProps) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.textContent = text;
      return;
    }

    let rafId = 0;
    let hasPlayed = false;

    const runScramble = () => {
      if (hasPlayed) return;
      hasPlayed = true;
      const start = performance.now();
      const duration = 520;

      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const lockedCount = Math.floor(progress * text.length);

        let result = "";
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (ch === " " || ch === "/" || ch === "·" || ch === "—") {
            result += ch;
          } else if (i < lockedCount) {
            result += ch;
          } else {
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        el.textContent = result;

        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          el.textContent = text;
        }
      };

      rafId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          runScramble();
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      el.textContent = text;
    };
  }, [text]);

  return (
    <span ref={spanRef} className={className} aria-label={text}>
      {text}
    </span>
  );
}
