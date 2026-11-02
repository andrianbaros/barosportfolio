"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  AtSign,
  Check,
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

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const [lang, setLang] = useState<Language>("id");
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
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
    setLang(newLang);
    localStorage.setItem("preferred_lang", newLang);
    document.documentElement.lang = newLang;
    updateTitle(newLang);
  };

  const t = translations[lang];

  // GSAP animation with reduced motion support
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-line",
        { yPercent: 115, rotate: 1.5, opacity: 0 },
        { yPercent: 0, rotate: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power4.out", delay: 0.1 }
      );
      gsap.fromTo(
        ".hero-meta",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.65, ease: "power2.out" }
      );
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
        const artwork = card.querySelector(".artwork");
        if (!artwork) return;
        card.addEventListener("mouseenter", () => gsap.to(artwork, { scale: 1.02, duration: 0.4, ease: "power2.out" }));
        card.addEventListener("mouseleave", () => gsap.to(artwork, { scale: 1, duration: 0.4, ease: "power2.out" }));
      });
    }, root);
    return () => ctx.revert();
  }, [lang]);

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
      {/* Screen Reader & Keyboard Skip Link */}
      <a href="#home" className="skip-link">
        {lang === "id" ? "Lewati ke konten utama" : "Skip to main content"}
      </a>

      <main ref={root} className="site-shell">
        <header className="topbar">
          <a className="brand" href="#home" aria-label={`${profileData.name} home`}>
            AB<span>®</span>
          </a>
          <div className="topbar-status">
            <span className="status-dot" /> {t.topbar.status}
          </div>

          <nav
            className={`desktop-nav ${menuOpen ? "nav-open" : ""}`}
            aria-label={lang === "id" ? "Navigasi utama" : "Main navigation"}
          >
            <a href="#work" onClick={closeMenu}>
              {t.nav.work} <span>05</span>
            </a>
            <a href="#about" onClick={closeMenu}>
              {t.nav.about}
            </a>
            <a href="#experience" onClick={closeMenu}>
              {t.nav.journey}
            </a>
            <a href="#contact" onClick={closeMenu}>
              {t.nav.contact} <ArrowUpRight size={13} />
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

        <section id="home" className="hero section-pad">
          <div className="hero-kicker hero-meta">
            <span>{t.hero.kickerYear}</span>
            <span>{t.hero.kickerScope}</span>
          </div>
          <h1
            className="hero-title"
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
            <p className="hero-intro hero-meta">{t.hero.intro}</p>
            <a
              className="round-link hero-meta"
              href="#work"
              aria-label={lang === "id" ? "Lihat karya pilihan" : "View selected work"}
            >
              <ArrowDownRight size={23} />
            </a>
            <div className="hero-location hero-meta">
              <span>{t.hero.basedIn}</span>
              <strong>{t.hero.location}</strong>
              <span>
                {t.hero.availableFor}
                <br />
                {t.hero.availableSub}
              </span>
            </div>
          </div>
          <div className="hero-index">
            <span>{t.hero.scrollPrompt}</span>
            <span>
              00 — 05 <ArrowDown size={13} />
            </span>
          </div>
        </section>

        <section id="about" className="about-section section-pad">
          <div className="section-label" data-reveal>
            <span>{t.about.labelNo}</span>
            <span>{t.about.labelSub}</span>
          </div>
          <div className="about-grid">
            <h2 data-reveal>
              {t.about.heading1}
              <br />
              {t.about.heading2}
              <span className="accent-dot">.</span>
            </h2>
            <div className="about-copy" data-reveal>
              <p className="about-lead">{t.about.lead}</p>
              <p>{t.about.p1}</p>
              <div className="about-facts">
                <div>
                  <span>{t.about.eduLabel}</span>
                  <strong>{t.about.eduDegree}</strong>
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
            <div className="ticker-track">
              <span>{t.about.ticker}</span>
              <span>{t.about.ticker}</span>
            </div>
          </div>
        </section>

        <section id="work" className="work-section section-pad">
          <div className="section-label" data-reveal>
            <span>{t.work.labelNo}</span>
            <span>{t.work.labelSub}</span>
          </div>
          <div className="work-heading" data-reveal>
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
                <div className="project-art-wrap">
                  <ProjectArtwork kind={project.visual} lang={lang} />
                  <span className="project-count">
                    {project.number} / {String(t.work.projects.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="project-info">
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
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={
                          lang === "id"
                            ? `Buka tautan ${project.name}`
                            : `Open ${project.name} website`
                        }
                      >
                        <ArrowUpRight size={19} />
                      </a>
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

        <section className="capabilities-section section-pad">
          <div className="section-label" data-reveal>
            <span>{t.toolkit.labelNo}</span>
            <span>{t.toolkit.labelSub}</span>
          </div>
          <div className="capabilities-intro" data-reveal>
            <h2>
              {t.toolkit.heading1}
              <br />
              <em>{t.toolkit.heading2}</em>
            </h2>
            <p>{t.toolkit.subtitle}</p>
          </div>
          <div className="skill-grid">
            {t.toolkit.skills.map((skill, i) => (
              <div className="skill-group" data-reveal key={skill.group}>
                <span className="skill-index">
                  0{i + 1} / {skill.group}
                </span>
                <div className="skill-items">
                  {skill.items.map((item) => (
                    <span key={item}>
                      {item}
                      <ArrowUpRight size={13} />
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {t.toolkit.certifications.map((cert) => (
            <div className="cert-strip" data-reveal key={cert.name}>
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
          <div className="section-label" data-reveal>
            <span>{t.journey.labelNo}</span>
            <span>{t.journey.labelSub}</span>
          </div>
          <div className="experience-heading" data-reveal>
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
            {t.journey.experience.map((item, i) => (
              <article
                className="experience-item"
                data-reveal
                key={`${item.company}-${item.date}`}
              >
                <span className="experience-no">0{i + 1}</span>
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
            <div className="education-card" data-reveal key={edu.institution}>
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

        <section id="contact" className="contact-section section-pad">
          <div className="section-label" data-reveal>
            <span>{t.contact.labelNo}</span>
            <span>{t.contact.labelSub}</span>
          </div>
          <div className="contact-content" data-reveal>
            <span className="contact-pre">{t.contact.pre}</span>
            <h2>
              {t.contact.heading1}
              <br />
              <em>{t.contact.heading2}</em>
            </h2>
            <p>{t.contact.paragraph}</p>
            <div className="contact-actions">
              <a
                className="contact-primary"
                href={`mailto:${email}?subject=${encodeURIComponent(
                  lang === "id" ? "Mari Berkolaborasi" : "Let's collaborate"
                )}`}
              >
                {t.contact.startBtn} <ArrowUpRight size={18} />
              </a>
              <button
                className="copy-email"
                onClick={copyEmail}
                aria-label={lang === "id" ? "Salin alamat email" : "Copy email address"}
              >
                {copied ? <Check size={16} /> : <AtSign size={16} />}
                {copied ? t.contact.copiedBtn : t.contact.copyBtn}
              </button>
            </div>
          </div>
        </section>

        <footer className="footer section-pad">
          <a className="brand footer-brand" href="#home" aria-label={`${profileData.name} home`}>
            AB<span>®</span>
          </a>
          <span>{t.footer.tagline}</span>
          <div className="footer-links">
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile (andrian-baros)"
              title="LinkedIn"
            >
              <Linkedin size={17} />
            </a>
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile (andrianbaros)"
              title="GitHub"
            >
              <Github size={17} />
            </a>
            <a
              href={profileData.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile (@andrianbaros_)"
              title="Instagram"
            >
              <Instagram size={17} />
            </a>
            <button
              onClick={copyEmail}
              aria-label={lang === "id" ? "Salin email" : "Copy email"}
              title="Copy email address"
            >
              <AtSign size={17} />
            </button>
          </div>
          <span className="footer-year">© 2026 {profileData.name.toUpperCase()}</span>
        </footer>
      </main>
    </>
  );
}
