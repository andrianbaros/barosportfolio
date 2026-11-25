"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { Language } from "@/data/translations";

interface CustomCursorProps {
  lang: Language;
}

export function CustomCursor({ lang }: CustomCursorProps) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || prefersReduced) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const labelEl = labelRef.current;
    if (!dot || !ring || !labelEl) return;

    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.34, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.34, ease: "power3.out" });

    let isVisible = false;
    let currentLabel = "";

    const setCursorMode = (mode: "default" | "interactive" | "badge", text = "") => {
      ring.classList.remove("cursor-interactive", "cursor-badge");
      dot.classList.remove("cursor-dot-hidden");
      if (mode === "interactive") {
        ring.classList.add("cursor-interactive");
      } else if (mode === "badge") {
        ring.classList.add("cursor-badge");
        dot.classList.add("cursor-dot-hidden");
      }
      if (currentLabel !== text) {
        labelEl.textContent = text;
        currentLabel = text;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        isVisible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.25 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isDark = Boolean(
        target.closest(".about-section, .contact-section, .screenshot-modal-backdrop, .artwork-haven-mockup")
      );
      ring.classList.toggle("cursor-on-dark", isDark);
      dot.classList.toggle("cursor-on-dark", isDark);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTrigger = target.closest<HTMLElement>("[data-cursor]");
      if (cursorTrigger) {
        const mode = cursorTrigger.dataset.cursor;
        if (mode === "zoom") {
          setCursorMode("badge", lang === "id" ? "PERBESAR" : "ZOOM");
          return;
        }
        if (mode === "view") {
          setCursorMode("badge", lang === "id" ? "BUKA" : "OPEN");
          return;
        }
        if (mode === "action") {
          setCursorMode("interactive");
          return;
        }
      }

      const clickable = target.closest("a, button, [role='button'], .skill-items span");
      if (clickable) {
        setCursorMode("interactive");
        return;
      }

      setCursorMode("default");
    };

    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.82, duration: 0.14, ease: "power2.out" });
      gsap.to(dot, { scale: 1.6, duration: 0.14, ease: "power2.out" });
    };

    const onMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.35, ease: "elastic.out(1, 0.5)" });
      gsap.to(dot, { scale: 1, duration: 0.25, ease: "power2.out" });
    };

    const onMouseLeave = () => {
      isVisible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [enabled, lang]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true">
        <span ref={labelRef} className="custom-cursor-label" />
      </div>
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
    </>
  );
}
