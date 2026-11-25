"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onStartReveal?: () => void;
  onComplete: () => void;
}

export function Preloader({ onStartReveal, onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      onStartReveal?.();
      onComplete();
      setDone(true);
      return;
    }

    const stages = [
      "INITIALIZING SYSTEM",
      "CALIBRATING MOTION GRID",
      "LOADING 06 CASE STUDIES",
      "INTERFACE READY",
    ];

    const ctx = gsap.context(() => {
      const state = { progress: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          setDone(true);
          onComplete();
        },
      });

      tl.fromTo(
        ".preloader-fade",
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, stagger: 0.05, ease: "power3.out" }
      )
        .to(
          state,
          {
            progress: 100,
            duration: 0.85,
            ease: "power2.inOut",
            onUpdate: () => {
              const val = Math.round(state.progress);
              if (counterRef.current) {
                counterRef.current.textContent = String(val).padStart(2, "0");
              }
              if (barRef.current) {
                barRef.current.style.transform = `scaleX(${state.progress / 100})`;
              }
              if (statusRef.current) {
                const stageIdx = Math.min(
                  stages.length - 1,
                  Math.floor((state.progress / 100) * stages.length)
                );
                statusRef.current.textContent = stages[stageIdx];
              }
            },
          },
          "-=0.15"
        )
        .add(() => {
          onStartReveal?.();
        }, "+=0.05")
        .to(
          ".preloader-inner",
          {
            y: -24,
            opacity: 0,
            duration: 0.35,
            ease: "power3.in",
          },
          "<"
        )
        .to(
          containerRef.current,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 0.65,
            ease: "power4.inOut",
          },
          "-=0.15"
        );
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete, onStartReveal]);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      className="preloader-curtain"
      aria-hidden="true"
    >
      <div className="preloader-grid" />
      <div className="preloader-inner">
        <div className="preloader-top preloader-fade">
          <span className="preloader-brand">
            AB<span>®</span>
          </span>
          <span className="preloader-meta">BANDUNG · INFORMATICS ENGINEER</span>
        </div>

        <div className="preloader-center preloader-fade">
          <div className="preloader-counter-row">
            <span className="preloader-label" ref={statusRef}>
              INITIALIZING SYSTEM
            </span>
            <div className="preloader-digits">
              <span ref={counterRef}>00</span>
              <span className="preloader-pct">%</span>
            </div>
          </div>
          <div className="preloader-track">
            <div ref={barRef} className="preloader-bar" />
          </div>
        </div>

        <div className="preloader-bottom preloader-fade">
          <span>PORTOFOLIO / 2026</span>
          <span>NEXT.JS · GSAP · FLUTTER</span>
        </div>
      </div>
    </div>
  );
}
