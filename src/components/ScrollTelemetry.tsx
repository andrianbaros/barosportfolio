"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Language } from "@/data/translations";

interface ScrollTelemetryProps {
  lang: Language;
}

const sectionMeta = [
  { id: "home", code: "00", label: { id: "BERANDA", en: "INTRO" } },
  { id: "about", code: "01", label: { id: "TENTANG", en: "ABOUT" } },
  { id: "work", code: "02", label: { id: "KARYA", en: "WORK" } },
  { id: "toolkit", code: "03", label: { id: "KEAHLIAN", en: "STACK" } },
  { id: "experience", code: "04", label: { id: "PERJALANAN", en: "JOURNEY" } },
  { id: "contact", code: "05", label: { id: "KONTAK", en: "CONTACT" } },
];

export function ScrollTelemetry({ lang }: ScrollTelemetryProps) {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const bar = progressBarRef.current;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lastShown = false;

    const mainTrigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const pct = Math.round(self.progress * 100);
        if (pctRef.current) {
          pctRef.current.textContent = `${String(pct).padStart(2, "0")}%`;
        }
        const shouldShow = self.progress > 0.08;
        if (shouldShow !== lastShown) {
          lastShown = shouldShow;
          setShowTop(shouldShow);
        }
        if (bar) {
          if (prefersReduced) {
            bar.style.transform = `scaleX(${self.progress})`;
          } else {
            gsap.set(bar, { scaleX: self.progress });
          }
        }
      },
    });

    const sectionTriggers = sectionMeta.map((sec, idx) =>
      ScrollTrigger.create({
        trigger: `#${sec.id}`,
        start: "top 48%",
        end: "bottom 48%",
        onEnter: () => setActiveIndex(idx),
        onEnterBack: () => setActiveIndex(idx),
      })
    );

    return () => {
      mainTrigger.kill();
      sectionTriggers.forEach((st) => st.kill());
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeSec = sectionMeta[activeIndex] ?? sectionMeta[0];

  return (
    <>
      <div className="scroll-progress-rail" aria-hidden="true">
        <div ref={progressBarRef} className="scroll-progress-fill" />
      </div>

      <aside
        className={`telemetry-dock ${showTop ? "dock-visible" : ""}`}
        aria-label={lang === "id" ? "Navigasi cepat dan progres halaman" : "Page progress and quick top"}
      >
        <div className="telemetry-pill">
          <span className="telemetry-dot" />
          <span className="telemetry-code">{activeSec.code}</span>
          <span className="telemetry-name">{activeSec.label[lang]}</span>
          <span className="telemetry-sep">/</span>
          <span ref={pctRef} className="telemetry-pct">
            00%
          </span>
        </div>

        {showTop && (
          <button
            type="button"
            onClick={scrollToTop}
            className="telemetry-top-btn"
            aria-label={lang === "id" ? "Kembali ke atas" : "Back to top"}
            title={lang === "id" ? "Kembali ke atas" : "Back to top"}
          >
            <ArrowUp size={13} />
          </button>
        )}
      </aside>
    </>
  );
}
