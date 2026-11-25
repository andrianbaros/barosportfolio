"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUp,
  ArrowUpRight,
  AtSign,
  Check,
  FileDown,
  FileText,
  Github,
  Instagram,
  Linkedin,
  Menu,
  X,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profileData } from "@/data/portfolio";
import { translations, Language } from "@/data/translations";
import { ProjectArtwork } from "@/components/ProjectArtwork";
import { Preloader } from "@/components/Preloader";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollTelemetry } from "@/components/ScrollTelemetry";
import { Magnetic } from "@/components/Magnetic";
import { TiltCard } from "@/components/TiltCard";
import { ScrambleText } from "@/components/ScrambleText";

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const tickerTrackRef = useRef<HTMLDivElement>(null);
  const expSpineRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);
  const gpaCounterRef = useRef<HTMLSpanElement>(null);

  const [lang, setLang] = useState<Language>("id");
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroStart, setHeroStart] = useState(false);
  const [preloaderGone, setPreloaderGone] = useState(false);
  const isFirstRender = useRef(true);

  const email = profileData.email;

  const updateTitle = (selectedLang: Language) => {
    document.title =
      selectedLang === "id"
        ? "Andrian Baros — Informatics Engineer · Web & Mobile Developer"
        : "Andrian Baros — Informatics Engineer · Web & Mobile Developer";
  };

  useEffect(() => {
    const saved = localStorage.getItem("preferred_lang") as Language | null;
    const initialLang: Language = saved === "id" || saved === "en" ? saved : "id";
    setLang(initialLang);
    document.documentElement.lang = initialLang;
    updateTitle(initialLang);
  }, []);

  const switchLang = (newLang: Language) => {
    if (newLang === lang) return;
    setLang(newLang);
    localStorage.setItem("preferred_lang", newLang);
    document.documentElement.lang = newLang;
    updateTitle(newLang);
  };

  const handleStartReveal = useCallback(() => {
    setHeroStart(true);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderGone(true);
  }, []);

  const t = translations[lang];

  // Smooth micro-morph when toggling ID | EN without resetting scroll reveals
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced) {
      gsap.fromTo(
        "[data-lang-morph]",
        { opacity: 0.45, y: 5 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.012, ease: "power2.out", clearProps: "transform" }
      );
    }
    const id = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 80);
    return () => window.clearTimeout(id);
  }, [lang]);

  // Hero entrance choreography synchronized with Preloader curtain lift
  useEffect(() => {
    if (!heroStart) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-crosshair",
        { scale: 0, rotate: -45, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 0.65, stagger: 0.05, ease: "back.out(1.7)" }
      )
        .fromTo(
          ".hero-line",
          { yPercent: 118, skewY: 4, opacity: 0 },
          {
            yPercent: 0,
            skewY: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.1,
            ease: "power4.out",
          },
          "-=0.45"
        )
        .fromTo(
          ".hero-period",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.55, ease: "back.out(2.6)" },
          "-=0.45"
        )
        .fromTo(
          ".hero-meta",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, stagger: 0.08, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          ".hero-index",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        );
    }, root);

    return () => ctx.revert();
  }, [heroStart]);

  // Master ScrollTrigger, Parallax, Velocity Marquee, Timeline Spine & Spotlight System
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    let heroRaf = 0;
    let contactRaf = 0;

    const onHeroMove = (e: MouseEvent) => {
      const hero = heroSectionRef.current;
      if (!hero || heroRaf) return;
      heroRaf = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        hero.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        hero.style.setProperty("--my", `${e.clientY - rect.top}px`);
        heroRaf = 0;
      });
    };

    const onContactMove = (e: MouseEvent) => {
      const contact = contactSectionRef.current;
      if (!contact || contactRaf) return;
      contactRaf = requestAnimationFrame(() => {
        const rect = contact.getBoundingClientRect();
        contact.style.setProperty("--cmx", `${e.clientX - rect.left}px`);
        contact.style.setProperty("--cmy", `${e.clientY - rect.top}px`);
        contactRaf = 0;
      });
    };

    const heroEl = heroSectionRef.current;
    const contactEl = contactSectionRef.current;
    heroEl?.addEventListener("mousemove", onHeroMove, { passive: true });
    contactEl?.addEventListener("mousemove", onContactMove, { passive: true });

    const ctx = gsap.context(() => {
      // Sticky topbar state morph
      ScrollTrigger.create({
        start: "30px top",
        onEnter: () => setScrolled(true),
        onLeaveBack: () => setScrolled(false),
      });

      // Scroll-driven parallax on Hero typography
      gsap.to(".hero-title", {
        yPercent: 18,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Architectural section hairline reveals
      gsap.utils.toArray<HTMLElement>(".section-label").forEach((label) => {
        gsap.fromTo(
          label,
          { "--line-scale": 0 } as gsap.TweenVars,
          {
            "--line-scale": 1,
            duration: 0.9,
            ease: "power3.inOut",
            scrollTrigger: { trigger: label, start: "top 88%", once: true },
          } as gsap.TweenVars
        );
      });

      // General section / card staggered reveal
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 34, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      // Skill pill wave cascade per group
      gsap.utils.toArray<HTMLElement>(".skill-group").forEach((group) => {
        const pills = group.querySelectorAll(".skill-items span");
        if (!pills.length) return;
        gsap.fromTo(
          pills,
          { y: 14, opacity: 0, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.45,
            stagger: 0.035,
            ease: "back.out(1.4)",
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
          }
        );
      });

      // Inner device subtle parallax scrub inside mockups
      gsap.utils.toArray<HTMLElement>("[data-parallax-device]").forEach((device) => {
        const card = device.closest(".project-card");
        if (!card) return;
        gsap.fromTo(
          device,
          { y: -14 },
          {
            y: 14,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7,
            },
          }
        );
      });

      // About GPA count-up
      if (gpaCounterRef.current) {
        const score = { val: 0 };
        gsap.to(score, {
          val: 3.45,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: ".about-facts", start: "top 86%", once: true },
          onUpdate: () => {
            if (gpaCounterRef.current) {
              const formatted = score.val.toFixed(2);
              gpaCounterRef.current.textContent = formatted;
            }
          },
        });
      }

      // Scroll-velocity reactive infinite marquee
      if (tickerTrackRef.current) {
        const marqueeTween = gsap.to(tickerTrackRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: 24,
          ease: "none",
        });

        const clampVelocity = gsap.utils.clamp(-3.5, 3.5);

        ScrollTrigger.create({
          onUpdate: (self) => {
            const v = clampVelocity(self.getVelocity() / 420);
            const targetScale = 1 + Math.abs(v);
            const dirScale = v < -0.15 ? -targetScale : targetScale;
            gsap.to(marqueeTween, {
              timeScale: dirScale,
              duration: 0.25,
              overwrite: true,
              onComplete: () => {
                gsap.to(marqueeTween, {
                  timeScale: v < -0.15 ? -1 : 1,
                  duration: 0.8,
                  ease: "power2.out",
                });
              },
            });
          },
        });

        const tickerWrap = tickerTrackRef.current.parentElement;
        tickerWrap?.addEventListener("mouseenter", () =>
          gsap.to(marqueeTween, { timeScale: 0.15, duration: 0.4 })
        );
        tickerWrap?.addEventListener("mouseleave", () =>
          gsap.to(marqueeTween, { timeScale: 1, duration: 0.4 })
        );
      }

      // Experience Vertical Timeline Progress Spine
      if (expSpineRef.current) {
        gsap.fromTo(
          expSpineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".experience-list",
              start: "top 72%",
              end: "bottom 72%",
              scrub: 0.4,
            },
          }
        );
      }

      gsap.utils.toArray<HTMLElement>(".experience-item").forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 68%",
          onEnter: () => item.classList.add("exp-active"),
          onLeaveBack: () => item.classList.remove("exp-active"),
        });
      });

      // Certification strips slide-reveal
      gsap.utils.toArray<HTMLElement>(".cert-strip").forEach((strip, idx) => {
        gsap.fromTo(
          strip,
          { x: -24, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            delay: idx * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: strip, start: "top 88%", once: true },
          }
        );
      });
    }, root);

    return () => {
      ctx.revert();
      heroEl?.removeEventListener("mousemove", onHeroMove);
      contactEl?.removeEventListener("mousemove", onContactMove);
      if (heroRaf) cancelAnimationFrame(heroRaf);
      if (contactRaf) cancelAnimationFrame(contactRaf);
    };
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {!preloaderGone && (
        <Preloader onStartReveal={handleStartReveal} onComplete={handlePreloaderComplete} />
      )}

      <CustomCursor lang={lang} />
      <ScrollTelemetry lang={lang} />

      {/* Screen Reader & Keyboard Skip Link */}
      <a href="#home" className="skip-link">
        {lang === "id" ? "Lewati ke konten utama" : "Skip to main content"}
      </a>

      <main ref={root} className="site-shell">
        <header className={`topbar ${scrolled ? "topbar-scrolled" : ""}`}>
          <a className="brand" href="#home" aria-label={`${profileData.name} home`}>
            AB<span>®</span>
          </a>
          <div className="topbar-status" data-lang-morph>
            <span className="status-dot" /> {t.topbar.status}
          </div>

          <nav
            className={`desktop-nav ${menuOpen ? "nav-open" : ""}`}
            aria-label={lang === "id" ? "Navigasi utama" : "Main navigation"}
          >
            <a href="#work" onClick={closeMenu} className="nav-link-kinetic">
              {t.nav.work} <span>06</span>
            </a>
            <a href="#about" onClick={closeMenu} className="nav-link-kinetic">
              {t.nav.about}
            </a>
            <a href="#experience" onClick={closeMenu} className="nav-link-kinetic">
              {t.nav.journey}
            </a>
            <a href="#contact" onClick={closeMenu} className="nav-link-kinetic">
              {t.nav.contact} <ArrowUpRight size={13} />
            </a>
            <a
              href={lang === "id" ? "/portfolio-andrian-baros.pdf" : "/portfolio-andrian-baros-en.pdf"}
              download={lang === "id" ? "Portofolio_Andrian_Baros.pdf" : "Portfolio_Andrian_Baros_EN.pdf"}
              className="nav-cv-btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={lang === "id" ? "Unduh Portofolio format PDF" : "Download Portfolio in PDF format"}
              data-cursor="action"
            >
              <FileDown size={13} /> {t.nav.portfolioPdf}
            </a>

            {/* Desktop Language Switcher */}
            <div
              className="lang-switcher"
              aria-label={lang === "id" ? "Pilihan bahasa" : "Language selector"}
            >
              <button
                type="button"
                onClick={() => switchLang("id")}
                className={`lang-btn ${lang === "id" ? "active" : ""}`}
                aria-label="Ganti ke Bahasa Indonesia"
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => switchLang("en")}
                className={`lang-btn ${lang === "en" ? "active" : ""}`}
                aria-label="Switch to English"
              >
                EN
              </button>
            </div>

            {/* Mobile view extra row */}
            {menuOpen && (
              <div className="mobile-lang-row">
                <span className="eyebrow">{lang === "id" ? "PILIHAN BAHASA" : "LANGUAGE"}</span>
                <div className="lang-switcher">
                  <button
                    type="button"
                    onClick={() => {
                      switchLang("id");
                      closeMenu();
                    }}
                    className={`lang-btn ${lang === "id" ? "active" : ""}`}
                  >
                    ID
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      switchLang("en");
                      closeMenu();
                    }}
                    className={`lang-btn ${lang === "en" ? "active" : ""}`}
                  >
                    EN
                  </button>
                </div>
              </div>
            )}
          </nav>

          {/* Mobile backdrop for easy dismissal */}
          {menuOpen && <div className="menu-backdrop" onClick={closeMenu} aria-hidden="true" />}

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Tutup menu" : "Buka menu navigasi"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </header>

        <section id="home" ref={heroSectionRef} className="hero section-pad">
          {/* Interactive Blueprint Grid + Mouse Spotlight */}
          <div className="hero-blueprint-grid" aria-hidden="true" />
          <span className="hero-crosshair ch-tl" aria-hidden="true">+</span>
          <span className="hero-crosshair ch-tr" aria-hidden="true">+</span>
          <span className="hero-crosshair ch-bl" aria-hidden="true">+</span>
          <span className="hero-crosshair ch-br" aria-hidden="true">+</span>

          <div className="hero-kicker hero-meta" data-lang-morph>
            <span>
              <ScrambleText text={t.hero.kickerYear} />
            </span>
            <span>{t.hero.kickerScope}</span>
          </div>

          <h1
            className="hero-title"
            data-lang-morph
            aria-label={
              lang === "id"
                ? "Saya merancang dan membangun karya digital"
                : "Building digital experiences that matter"
            }
          >
            <span className="hero-line-wrap">
              <span className="hero-line">{t.hero.titleLine1}</span>
            </span>
            <span className="hero-line-wrap">
              <span className="hero-line">{t.hero.titleLine2}</span>
            </span>
            <span className="hero-line-wrap hero-last">
              <span className="hero-line">
                {t.hero.titleLine3Word1} <em>{t.hero.titleLine3Word2}</em>
              </span>
              <span className="hero-period">.</span>
            </span>
          </h1>

          <div className="hero-bottom">
            <div className="hero-intro-wrapper hero-meta" data-lang-morph>
              <p className="hero-intro">{t.hero.intro}</p>
              <div className="hero-actions-row">
                <Magnetic strength={0.22}>
                  <a
                    href={lang === "id" ? "/portfolio-andrian-baros.pdf" : "/portfolio-andrian-baros-en.pdf"}
                    download={lang === "id" ? "Portofolio_Andrian_Baros.pdf" : "Portfolio_Andrian_Baros_EN.pdf"}
                    className="hero-cv-btn hero-primary-btn btn-sheen"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={lang === "id" ? "Unduh Portofolio lengkap format PDF" : "Download full portfolio PDF"}
                    data-cursor="action"
                  >
                    <FileDown size={14} /> {t.hero.downloadPortfolio}
                  </a>
                </Magnetic>
                <Magnetic strength={0.22}>
                  <a
                    href={lang === "id" ? "/cv-andrian-baros.pdf" : "/cv-andrian-baros-en.pdf"}
                    download={lang === "id" ? "CV_Andrian_Baros.pdf" : "CV_Andrian_Baros_EN.pdf"}
                    className="hero-cv-btn hero-secondary-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={lang === "id" ? "Unduh CV format PDF" : "Download CV in PDF format"}
                    data-cursor="action"
                  >
                    <FileText size={14} /> {t.hero.downloadCv}
                  </a>
                </Magnetic>
              </div>
            </div>

            <Magnetic strength={0.38}>
              <a
                className="round-link hero-meta"
                href="#work"
                aria-label={lang === "id" ? "Lihat karya pilihan" : "View selected work"}
                data-cursor="action"
              >
                <svg className="round-link-orbit" viewBox="0 0 64 64" aria-hidden="true">
                  <circle
                    cx="32"
                    cy="32"
                    r="30"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.35"
                  />
                </svg>
                <ArrowDownRight size={23} />
              </a>
            </Magnetic>

            <div className="hero-location hero-meta" data-lang-morph>
              <span>{t.hero.basedIn}</span>
              <strong>{t.hero.location}</strong>
              <span>
                {t.hero.availableFor}
                <br />
                {t.hero.availableSub}
              </span>
            </div>
          </div>

          <div className="hero-index" data-lang-morph>
            <span className="hero-scroll-prompt">
              <span className="scroll-pulse-bar" aria-hidden="true" />
              {t.hero.scrollPrompt}
            </span>
            <span>
              00 — 06 <ArrowDown size={13} className="arrow-bob" />
            </span>
          </div>
        </section>

        <section id="about" className="about-section section-pad">
          <div className="section-label" data-reveal data-lang-morph>
            <span>
              <ScrambleText text={t.about.labelNo} />
            </span>
            <span>{t.about.labelSub}</span>
          </div>
          <div className="about-grid">
            <h2 data-reveal data-lang-morph>
              {t.about.heading1}
              <br />
              {t.about.heading2}
              <span className="accent-dot">.</span>
            </h2>
            <div className="about-copy" data-reveal data-lang-morph>
              <p className="about-lead">{t.about.lead}</p>
              <p>{t.about.p1}</p>
              <div className="about-facts">
                <div>
                  <span>{t.about.eduLabel}</span>
                  <strong>
                    {lang === "id" ? (
                      <>
                        S1 Teknik Informatika (IPK <span ref={gpaCounterRef}>3,45</span>)
                      </>
                    ) : (
                      <>
                        B.Sc. Informatics Engineering (GPA <span ref={gpaCounterRef}>3.45</span>)
                      </>
                    )}
                  </strong>
                  <small>{t.about.eduSchool}</small>
                </div>
                <div>
                  <span>{t.about.focusLabel}</span>
                  <strong>{t.about.focusVal}</strong>
                  <small>{t.about.focusSub}</small>
                </div>
              </div>
            </div>
          </div>
          <div
            className="ticker"
            aria-label={lang === "id" ? "Bidang keahlian dan minat" : "Core competencies"}
          >
            <div ref={tickerTrackRef} className="ticker-track">
              <span>{t.about.ticker}</span>
              <span>{t.about.ticker}</span>
            </div>
          </div>
        </section>

        <section id="work" className="work-section section-pad">
          <div className="section-label" data-reveal data-lang-morph>
            <span>
              <ScrambleText text={t.work.labelNo} />
            </span>
            <span>{t.work.labelSub}</span>
          </div>
          <div className="work-heading" data-reveal data-lang-morph>
            <h2>
              {t.work.heading1}
              <br />
              <em>{t.work.heading2}</em>
            </h2>
            <p>{t.work.subtitle}</p>
          </div>
          <div className="project-list">
            {t.work.projects.map((project) => (
              <article
                className={`project-card project-${project.visual} ${
                  project.featured ? "project-card-featured" : ""
                }`}
                key={project.number}
                data-reveal
              >
                <TiltCard className="project-art-wrap">
                  <ProjectArtwork kind={project.visual} lang={lang} />
                  <span className="project-count">
                    {project.number} / {String(t.work.projects.length).padStart(2, "0")}
                  </span>
                </TiltCard>
                <div className="project-info" data-lang-morph>
                  {project.featured && project.featuredBadge && (
                    <div className="featured-badge">
                      <span className="featured-badge-dot" />
                      <span>{project.featuredBadge}</span>
                    </div>
                  )}
                  <div className="project-title-row">
                    <div>
                      <span className="eyebrow">{project.type}</span>
                      <h3>{project.name}</h3>
                    </div>
                    <span className="project-year">{project.year}</span>
                  </div>
                  <p>{project.description}</p>
                  {project.highlights && (
                    <ul className="project-highlights">
                      {project.highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  <div className="project-tags">
                    {project.stack.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="project-foot">
                    <span>{project.note}</span>
                    {project.url ? (
                      <Magnetic strength={0.35}>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={
                            lang === "id"
                              ? `Buka tautan ${project.name}`
                              : `Open ${project.name} website`
                          }
                          data-cursor="view"
                        >
                          <ArrowUpRight size={19} />
                        </a>
                      </Magnetic>
                    ) : (
                      <span className="project-arrow">
                        <ArrowUpRight size={19} />
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="toolkit" className="capabilities-section section-pad">
          <div className="section-label" data-reveal data-lang-morph>
            <span>
              <ScrambleText text={t.toolkit.labelNo} />
            </span>
            <span>{t.toolkit.labelSub}</span>
          </div>
          <div className="capabilities-intro" data-reveal data-lang-morph>
            <h2>
              {t.toolkit.heading1}
              <br />
              <em>{t.toolkit.heading2}</em>
            </h2>
            <p>{t.toolkit.subtitle}</p>
          </div>
          <div className="skill-grid">
            {t.toolkit.skills.map((skill, i) => (
              <div className="skill-group" data-reveal key={skill.group} data-lang-morph>
                <span className="skill-index">
                  0{i + 1} / {skill.group}
                </span>
                <div className="skill-items">
                  {skill.items.map((item) => (
                    <span key={item} data-cursor="action">
                      {item}
                      <ArrowUpRight size={13} className="skill-arrow-icon" />
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {t.toolkit.certifications.map((cert) => (
            <div className="cert-strip" key={cert.name} data-lang-morph>
              <div>
                <span className="eyebrow">{cert.dateInfo}</span>
                <strong>{cert.name}</strong>
                <small>{cert.issuer}</small>
              </div>
              <span className="cert-mark">{cert.code}</span>
            </div>
          ))}
        </section>

        <section id="experience" className="experience-section section-pad">
          <div className="section-label" data-reveal data-lang-morph>
            <span>
              <ScrambleText text={t.journey.labelNo} />
            </span>
            <span>{t.journey.labelSub}</span>
          </div>
          <div className="experience-heading" data-reveal data-lang-morph>
            <h2>
              {t.journey.heading1}
              <br />
              <em>{t.journey.heading2}</em>
              <br />
              {t.journey.heading3}
            </h2>
            <p>{t.journey.subtitle}</p>
          </div>
          <div className="experience-list">
            <div className="experience-spine-track" aria-hidden="true">
              <div ref={expSpineRef} className="experience-spine-fill" />
            </div>

            {t.journey.experience.map((item, i) => (
              <article
                className="experience-item"
                data-reveal
                data-lang-morph
                key={`${item.company}-${item.date}`}
              >
                <span className="experience-no">
                  <span className="experience-node" aria-hidden="true" />
                  0{i + 1}
                </span>
                <div className="experience-main">
                  <h3>{item.role}</h3>
                  <div className="experience-company">
                    {item.company} <span>· {item.kind}</span>
                  </div>
                  <p>{item.description}</p>
                  <span className="experience-location">{item.location}</span>
                </div>
                <span className="experience-date">{item.date}</span>
              </article>
            ))}
          </div>
          {t.journey.education.map((edu, i) => (
            <div className="education-card" data-reveal data-lang-morph key={edu.institution}>
              <span className="eyebrow">
                {lang === "id" ? "PENDIDIKAN" : "EDUCATION"} / 0{i + 1}
              </span>
              <div>
                <h3>{edu.institution}</h3>
                <p>{edu.degree}</p>
              </div>
              <strong>{edu.period}</strong>
              {edu.gpa && <span className="education-gpa">{edu.gpa}</span>}
            </div>
          ))}
        </section>

        <section id="contact" ref={contactSectionRef} className="contact-section section-pad">
          <div className="contact-spotlight" aria-hidden="true" />
          <div className="section-label" data-reveal data-lang-morph>
            <span>
              <ScrambleText text={t.contact.labelNo} />
            </span>
            <span>{t.contact.labelSub}</span>
          </div>
          <div className="contact-content" data-reveal data-lang-morph>
            <span className="contact-pre">{t.contact.pre}</span>
            <h2>
              {t.contact.heading1}
              <br />
              <em>{t.contact.heading2}</em>
            </h2>
            <p>{t.contact.paragraph}</p>
            <div className="contact-actions">
              <Magnetic strength={0.2}>
                <a
                  className="contact-primary btn-sheen"
                  href={`mailto:${email}?subject=${encodeURIComponent(
                    lang === "id" ? "Mari Berkolaborasi" : "Let's collaborate"
                  )}`}
                  data-cursor="action"
                >
                  {t.contact.startBtn} <ArrowUpRight size={18} />
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <button
                  className={`copy-email ${copied ? "email-copied-state" : ""}`}
                  onClick={copyEmail}
                  aria-label={lang === "id" ? "Salin alamat email" : "Copy email address"}
                  data-cursor="action"
                >
                  {copied ? <Check size={16} /> : <AtSign size={16} />}
                  {copied ? t.contact.copiedBtn : t.contact.copyBtn}
                </button>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a
                  href={lang === "id" ? "/portfolio-andrian-baros.pdf" : "/portfolio-andrian-baros-en.pdf"}
                  download={lang === "id" ? "Portofolio_Andrian_Baros.pdf" : "Portfolio_Andrian_Baros_EN.pdf"}
                  className="contact-cv-btn contact-portfolio-btn btn-sheen"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="action"
                >
                  <FileDown size={15} />
                  {t.contact.downloadPortfolio}
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a
                  href={lang === "id" ? "/cv-andrian-baros.pdf" : "/cv-andrian-baros-en.pdf"}
                  download={lang === "id" ? "CV_Andrian_Baros.pdf" : "CV_Andrian_Baros_EN.pdf"}
                  className="contact-cv-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="action"
                >
                  <FileText size={15} />
                  {t.contact.downloadCv}
                </a>
              </Magnetic>
            </div>
          </div>
        </section>

        <footer className="footer section-pad">
          <a className="brand footer-brand" href="#home" aria-label={`${profileData.name} home`}>
            AB<span>®</span>
          </a>
          <span data-lang-morph>{t.footer.tagline}</span>
          <div className="footer-links">
            <Magnetic strength={0.35}>
              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile (andrian-baros)"
                title="LinkedIn"
                data-cursor="action"
              >
                <Linkedin size={17} />
              </a>
            </Magnetic>
            <Magnetic strength={0.35}>
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile (andrianbaros)"
                title="GitHub"
                data-cursor="action"
              >
                <Github size={17} />
              </a>
            </Magnetic>
            <Magnetic strength={0.35}>
              <a
                href={profileData.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile (@andrianbaros_)"
                title="Instagram"
                data-cursor="action"
              >
                <Instagram size={17} />
              </a>
            </Magnetic>
            <Magnetic strength={0.35}>
              <button
                onClick={copyEmail}
                aria-label={lang === "id" ? "Salin email" : "Copy email"}
                title="Copy email address"
                data-cursor="action"
              >
                <AtSign size={17} />
              </button>
            </Magnetic>
            <Magnetic strength={0.35}>
              <a
                href="#home"
                aria-label={lang === "id" ? "Kembali ke atas" : "Back to top"}
                title={lang === "id" ? "Kembali ke atas" : "Back to top"}
                className="footer-top-link"
                data-cursor="action"
              >
                <ArrowUp size={17} />
              </a>
            </Magnetic>
          </div>
          <span className="footer-year">© 2026 {profileData.name.toUpperCase()}</span>
        </footer>
      </main>
    </>
  );
}
