"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({ children, className = "", maxTilt = 4.5 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || prefersReduced) return;

    const rxTo = gsap.quickTo(card, "rotationX", { duration: 0.45, ease: "power3.out" });
    const ryTo = gsap.quickTo(card, "rotationY", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      const rotY = (px - 0.5) * (maxTilt * 2);
      const rotX = -(py - 0.5) * (maxTilt * 2);

      rxTo(rotX);
      ryTo(rotY);

      glare.style.opacity = "1";
      glare.style.background = `radial-gradient(520px circle at ${px * 100}% ${py * 100}%, rgba(255, 255, 255, 0.22), rgba(56, 189, 248, 0.08) 38%, transparent 70%)`;
    };

    const onLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.65,
        ease: "power3.out",
      });
      glare.style.opacity = "0";
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, [maxTilt]);

  return (
    <div
      ref={cardRef}
      className={`tilt-card-surface ${className}`}
      data-cursor="zoom"
    >
      {children}
      <div ref={glareRef} className="tilt-glare" aria-hidden="true" />
    </div>
  );
}
