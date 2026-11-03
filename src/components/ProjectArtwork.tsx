"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Heart,
  Plus,
  Send,
  ShieldCheck,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface ProjectArtworkProps {
  kind: "qread" | "bunnies" | "haven" | "garden" | "village" | string;
  lang?: "id" | "en";
}

interface ScreenshotItem {
  src: string;
  title: { id: string; en: string };
  tag: { id: string; en: string };
  type?: "desktop" | "mobile" | "widget";
}

const qreadScreenshots: ScreenshotItem[] = [
  {
    src: "/projects/qread/qread-dashboard.jpg",
    title: { id: "Beranda & Progress Belajar", en: "Home & Learning Progress" },
    tag: { id: "01 · BERANDA", en: "01 · DASHBOARD" },
    type: "mobile",
  },
  {
    src: "/projects/qread/qread-practice.jpg",
    title: { id: "Deteksi Suara / ML Audio Terapan", en: "Speech Recognition / Applied Audio ML" },
    tag: { id: "02 · AUDIO ML", en: "02 · AUDIO ML" },
    type: "mobile",
  },
  {
    src: "/projects/qread/qread-path.jpg",
    title: { id: "Jalur Belajar Huruf Hijaiyah", en: "Hijaiyah Learning Path" },
    tag: { id: "03 · JALUR BELAJAR", en: "03 · LEARNING PATH" },
    type: "mobile",
  },
  {
    src: "/projects/qread/qread-intro.jpg",
    title: { id: "Pengantar & Maskot Interaktif", en: "Intro & Interactive Mascot" },
    tag: { id: "04 · PANDUAN VISUAL", en: "04 · VISUAL GUIDE" },
    type: "mobile",
  },
  {
    src: "/projects/qread/qread-welcome.jpg",
    title: { id: "Pilih Teman Belajar (Onboarding)", en: "Avatar Selection (Onboarding)" },
    tag: { id: "05 · ONBOARDING", en: "05 · ONBOARDING" },
    type: "mobile",
  },
];

const bunniesScreenshots: ScreenshotItem[] = [
  {
    src: "/projects/bunnies-world/bunnies-desktop-hero.png",
    title: { id: "Beranda & Portal Retro Y2K", en: "Hero & Retro Y2K Portal" },
    tag: { id: "01 · BERANDA DESKTOP", en: "01 · DESKTOP HERO" },
    type: "desktop",
  },
  {
    src: "/projects/bunnies-world/bunnies-desktop-members.png",
    title: { id: "Profil Member NewJeans Interaktif", en: "Interactive Member Profiles" },
    tag: { id: "02 · PROFIL", en: "02 · PROFILES" },
    type: "desktop",
  },
  {
    src: "/projects/bunnies-world/bunnies-community.png",
    title: { id: "Bunnies Fan Wall (Live Community)", en: "Bunnies Fan Wall (Live Community)" },
    tag: { id: "03 · KOMUNITAS", en: "03 · COMMUNITY" },
    type: "desktop",
  },
  {
    src: "/projects/bunnies-world/bunnies-ai-assistant.png",
    title: { id: "Bunny AI Assistant Interaktif", en: "Interactive Bunny AI Assistant" },
    tag: { id: "04 · AI ASSISTANT", en: "04 · AI ASSISTANT" },
    type: "widget",
  },
  {
    src: "/projects/bunnies-world/bunnies-mobile-hero.png",
    title: { id: "Tampilan Mobile Responsif", en: "Mobile Responsive Viewport" },
    tag: { id: "05 · MOBILE VIEW", en: "05 · MOBILE VIEW" },
    type: "mobile",
  },
];

const ilmisScreenshots: ScreenshotItem[] = [
  {
    src: "/projects/ilmis-garden/ilmis-hero.png",
    title: { id: "Beranda Atelier Bunga & Produk Artisan", en: "Floral Atelier Hero & Artisan Collections" },
    tag: { id: "01 · BERANDA", en: "01 · HERO" },
    type: "desktop",
  },
  {
    src: "/projects/ilmis-garden/ilmis-catalog.png",
    title: { id: "Katalog E-Commerce & Filter Produk", en: "E-Commerce Catalog & Product Filters" },
    tag: { id: "02 · KATALOG", en: "02 · CATALOG" },
    type: "desktop",
  },
  {
    src: "/projects/ilmis-garden/ilmis-categories.png",
    title: { id: "Eksplorasi Koleksi & Kategori Acara", en: "Floral Collections & Event Categories" },
    tag: { id: "03 · KATEGORI", en: "03 · CATEGORIES" },
    type: "desktop",
  },
  {
    src: "/projects/ilmis-garden/ilmis-about.png",
    title: { id: "Kisah Brand & Profil Ilmisgarden", en: "Brand Story & Atelier Vision" },
    tag: { id: "04 · TENTANG KAMI", en: "04 · ABOUT" },
    type: "desktop",
  },
  {
    src: "/projects/ilmis-garden/ilmis-mobile.png",
    title: { id: "Tampilan Mobile Responsif", en: "Mobile Responsive Viewport" },
    tag: { id: "05 · MOBILE VIEW", en: "05 · MOBILE VIEW" },
    type: "mobile",
  },
];

const toeflScreenshots: ScreenshotItem[] = [
  {
    src: "/projects/ab-toefl/toefl-dashboard.png",
    title: { id: "Dashboard TOEFL ITP & Statistik Skor", en: "TOEFL ITP Dashboard & Score Analytics" },
    tag: { id: "01 · BERANDA & TARGET", en: "01 · DASHBOARD & TARGET" },
    type: "desktop",
  },
  {
    src: "/projects/ab-toefl/toefl-desktop.png",
    title: { id: "Simulasi 140 Soal & Kategori Latihan", en: "140Q Simulation & Practice Hub" },
    tag: { id: "02 · SIMULASI 140 SOAL", en: "02 · 140Q SIMULATION" },
    type: "desktop",
  },
  {
    src: "/projects/ab-toefl/toefl-mobile.png",
    title: { id: "Tampilan Mobile Responsif", en: "Mobile Responsive Viewport" },
    tag: { id: "03 · MOBILE RESPONSIVE", en: "03 · MOBILE RESPONSIVE" },
    type: "mobile",
  },
];

export function ProjectArtwork({ kind, lang = "id" }: ProjectArtworkProps) {
  const [currentQread, setCurrentQread] = useState(0);
  const [currentToefl, setCurrentToefl] = useState(0);
  const [currentBunnies, setCurrentBunnies] = useState(0);
  const [currentGarden, setCurrentGarden] = useState(0);
  const [modalImage, setModalImage] = useState<{ src?: string; title: string; isCustom?: boolean; customType?: string } | null>(null);

  // Close modal on Escape key and manage body overflow
  useEffect(() => {
    if (!modalImage) return;
    document.body.classList.add("modal-open");
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalImage]);

  const labels = {
    zoomTitle: lang === "id" ? "Perbesar tampilan" : "Enlarge preview",
    prevBtn: lang === "id" ? "Screenshot sebelumnya" : "Previous screenshot",
    nextBtn: lang === "id" ? "Screenshot berikutnya" : "Next screenshot",
    closeModal: lang === "id" ? "Tutup preview" : "Close preview",
  };

  if (kind === "qread") {
    const active = qreadScreenshots[currentQread];
    const activeTitle = active.title[lang];
    const activeTag = active.tag[lang];

    const prevScreen = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentQread((prev) => (prev === 0 ? qreadScreenshots.length - 1 : prev - 1));
    };

    const nextScreen = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentQread((prev) => (prev === qreadScreenshots.length - 1 ? 0 : prev + 1));
    };

    const openPreview = (e: React.MouseEvent) => {
      e.stopPropagation();
      setModalImage({ src: active.src, title: activeTitle });
    };

    return (
      <>
        <div className="artwork artwork-qread-mockup" aria-label="QREAD mobile app interactive mockup">
          <div className="mockup-header">
            <span>QREAD APP</span>
            <span>/</span>
            <span>{activeTag}</span>
            <button
              type="button"
              onClick={openPreview}
              className="browser-zoom-btn"
              title={labels.zoomTitle}
              aria-label={labels.zoomTitle}
              style={{ marginLeft: 4 }}
            >
              <Maximize2 size={11} />
            </button>
          </div>

          <button
            type="button"
            onClick={prevScreen}
            className="mockup-nav-btn mockup-nav-prev"
            aria-label={labels.prevBtn}
          >
            <ChevronLeft size={16} />
          </button>

          <div className="phone-mockup cursor-zoom-in" onClick={openPreview}>
            <div className="phone-notch">
              <div className="phone-camera" />
            </div>

            <div className="phone-screen">
              <Image
                src={active.src}
                alt={`QREAD screenshot: ${activeTitle}`}
                fill
                sizes="(max-width: 640px) 200px, 300px"
                priority={currentQread === 0}
                className="object-cover"
              />
              <div className="phone-glare" />
            </div>

            <div className="phone-home-indicator" />
          </div>

          <button
            type="button"
            onClick={nextScreen}
            className="mockup-nav-btn mockup-nav-next"
            aria-label={labels.nextBtn}
          >
            <ChevronRight size={16} />
          </button>

          <div className="mockup-footer">
            <div className="mockup-dots">
              {qreadScreenshots.map((screen, idx) => (
                <button
                  key={screen.src}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentQread(idx);
                  }}
                  className={`mockup-dot ${idx === currentQread ? "active" : ""}`}
                  aria-label={`Slide ${idx + 1}: ${screen.title[lang]}`}
                />
              ))}
            </div>
            <span className="mockup-caption">{activeTitle}</span>
          </div>
        </div>

        {modalImage && modalImage.src && (
          <div
            className="screenshot-modal-backdrop"
            onClick={() => setModalImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label={modalImage.title}
          >
            <div className="screenshot-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="screenshot-modal-bar">
                <span>{modalImage.title}</span>
                <button
                  type="button"
                  onClick={() => setModalImage(null)}
                  className="screenshot-modal-close"
                  aria-label={labels.closeModal}
                >
                  <X size={18} />
                </button>
              </div>
              <div className="screenshot-modal-body" style={{ display: "flex", justifyContent: "center", padding: "16px" }}>
                <Image
                  src={modalImage.src}
                  alt={modalImage.title}
                  width={480}
                  height={960}
                  className="screenshot-modal-img"
                  style={{ maxHeight: "80vh", width: "auto", borderRadius: 12 }}
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  if (kind === "toefl") {
    const active = toeflScreenshots[currentToefl];
    const activeTitle = active.title[lang];
    const activeTag = active.tag[lang];

    const prevScreen = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentToefl((prev) => (prev === 0 ? toeflScreenshots.length - 1 : prev - 1));
    };

    const nextScreen = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentToefl((prev) => (prev === toeflScreenshots.length - 1 ? 0 : prev + 1));
    };

    const openPreview = (e: React.MouseEvent) => {
      e.stopPropagation();
      setModalImage({ src: active.src, title: activeTitle });
    };

    return (
      <>
        <div className="artwork artwork-toefl-mockup" aria-label="AB TOEFL TRAINING interactive showcase">
          <div className="mockup-header">
            <span>AB TOEFL TRAINING</span>
            <span>/</span>
            <span>{activeTag}</span>
          </div>

          <button
            type="button"
            onClick={prevScreen}
            className="mockup-nav-btn mockup-nav-prev"
            aria-label={labels.prevBtn}
          >
            <ChevronLeft size={16} />
          </button>

          <div className="browser-mockup">
            <div className="browser-topbar">
              <div className="browser-traffic-lights" aria-hidden="true">
                <span className="tl-dot" />
                <span className="tl-dot" />
                <span className="tl-dot" />
              </div>
              <div className="browser-address-bar">
                <span className="browser-lock">🔒</span>
                <span className="browser-url">ab-toefl-training.vercel.app</span>
              </div>
              <button
                type="button"
                onClick={openPreview}
                className="browser-zoom-btn"
                title={labels.zoomTitle}
                aria-label={labels.zoomTitle}
              >
                <Maximize2 size={12} />
              </button>
            </div>

            <div className="browser-screen" onClick={openPreview}>
              {active.type === "mobile" ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", padding: "12px 0" }}>
                  <div style={{ width: 180, height: 260, borderRadius: 14, overflow: "hidden", border: "2px solid #0f172a", position: "relative", boxShadow: "0 8px 24px rgba(15,23,42,0.15)" }}>
                    <Image
                      src={active.src}
                      alt={`AB TOEFL TRAINING mobile: ${activeTitle}`}
                      fill
                      sizes="(max-width: 640px) 180px, 240px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              ) : (
                <Image
                  src={active.src}
                  alt={`AB TOEFL TRAINING desktop: ${activeTitle}`}
                  fill
                  sizes="(max-width: 640px) 320px, 600px"
                  priority={currentToefl === 0}
                  className="object-cover object-top cursor-zoom-in"
                />
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={nextScreen}
            className="mockup-nav-btn mockup-nav-next"
            aria-label={labels.nextBtn}
          >
            <ChevronRight size={16} />
          </button>

          <div className="mockup-footer">
            <div className="mockup-dots">
              {toeflScreenshots.map((screen, idx) => (
                <button
                  key={screen.src}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentToefl(idx);
                  }}
                  className={`mockup-dot ${idx === currentToefl ? "active" : ""}`}
                  aria-label={`Slide ${idx + 1}: ${screen.title[lang]}`}
                />
              ))}
            </div>
            <span className="mockup-caption">{activeTitle}</span>
          </div>
        </div>

        {modalImage && modalImage.src && (
          <div
            className="screenshot-modal-backdrop"
            onClick={() => setModalImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label={modalImage.title}
          >
            <div className="screenshot-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="screenshot-modal-bar">
                <span>{modalImage.title}</span>
                <button
                  type="button"
                  onClick={() => setModalImage(null)}
                  className="screenshot-modal-close"
                  aria-label={labels.closeModal}
                >
                  <X size={18} />
                </button>
              </div>
              <div className="screenshot-modal-body" style={{ display: "flex", justifyContent: "center", padding: "16px" }}>
                <Image
                  src={modalImage.src}
                  alt={modalImage.title}
                  width={1280}
                  height={800}
                  className="screenshot-modal-img"
                  style={{ maxHeight: "80vh", width: "auto", borderRadius: 8 }}
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  if (kind === "bunnies") {
    const active = bunniesScreenshots[currentBunnies];
    const activeTitle = active.title[lang];
    const activeTag = active.tag[lang];

    const prevScreen = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentBunnies((prev) => (prev === 0 ? bunniesScreenshots.length - 1 : prev - 1));
    };

    const nextScreen = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentBunnies((prev) => (prev === bunniesScreenshots.length - 1 ? 0 : prev + 1));
    };

    const openPreview = (e: React.MouseEvent) => {
      e.stopPropagation();
      setModalImage({ src: active.src, title: activeTitle });
    };

    return (
      <>
        <div className="artwork artwork-bunnies-mockup" aria-label="BUNNIES WORLD interactive showcase">
          <div className="mockup-header bunnies-header-accent">
            <span>BUNNIES WORLD</span>
            <span>/</span>
            <span>{activeTag}</span>
          </div>

          <button
            type="button"
            onClick={prevScreen}
            className="mockup-nav-btn mockup-nav-prev"
            aria-label={labels.prevBtn}
          >
            <ChevronLeft size={16} />
          </button>

          <div className="browser-mockup">
            <div className="browser-topbar">
              <div className="browser-traffic-lights" aria-hidden="true">
                <span className="tl-dot" />
                <span className="tl-dot" />
                <span className="tl-dot" />
              </div>
              <div className="browser-address-bar">
                <span className="browser-lock">🔒</span>
                <span className="browser-url">bunniesworld.my.id</span>
              </div>
              <button
                type="button"
                onClick={openPreview}
                className="browser-zoom-btn"
                title={labels.zoomTitle}
                aria-label={labels.zoomTitle}
              >
                <Maximize2 size={12} />
              </button>
            </div>

            <div className="browser-screen" onClick={openPreview}>
              {active.type === "mobile" ? (
                <div className="bunnies-mobile-wrapper">
                  <div className="bunnies-mobile-phone">
                    <Image
                      src={active.src}
                      alt={`BUNNIES WORLD mobile: ${activeTitle}`}
                      fill
                      sizes="(max-width: 640px) 200px, 300px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              ) : active.type === "widget" ? (
                <div className="bunnies-widget-wrapper">
                  <div className="bunnies-ai-widget">
                    <Image
                      src={active.src}
                      alt={`BUNNIES WORLD: ${activeTitle}`}
                      fill
                      sizes="(max-width: 640px) 240px, 360px"
                      className="object-contain"
                    />
                  </div>
                </div>
              ) : (
                <Image
                  src={active.src}
                  alt={`BUNNIES WORLD desktop: ${activeTitle}`}
                  fill
                  sizes="(max-width: 640px) 320px, 600px"
                  priority={currentBunnies === 0}
                  className="object-cover object-top cursor-zoom-in"
                />
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={nextScreen}
            className="mockup-nav-btn mockup-nav-next"
            aria-label={labels.nextBtn}
          >
            <ChevronRight size={16} />
          </button>

          <div className="mockup-footer">
            <div className="mockup-dots bunnies-dots">
              {bunniesScreenshots.map((screen, idx) => (
                <button
                  key={screen.src}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentBunnies(idx);
                  }}
                  className={`mockup-dot ${idx === currentBunnies ? "active" : ""}`}
                  aria-label={`Slide ${idx + 1}: ${screen.title[lang]}`}
                />
              ))}
            </div>
            <span className="mockup-caption bunnies-caption">{activeTitle}</span>
          </div>
        </div>

        {modalImage && modalImage.src && (
          <div
            className="screenshot-modal-backdrop"
            onClick={() => setModalImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label={modalImage.title}
          >
            <div className="screenshot-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="screenshot-modal-bar">
                <span>{modalImage.title}</span>
                <button
                  type="button"
                  onClick={() => setModalImage(null)}
                  className="screenshot-modal-close"
                  aria-label={labels.closeModal}
                >
                  <X size={18} />
                </button>
              </div>
              <div className="screenshot-modal-body">
                <Image
                  src={modalImage.src}
                  alt={modalImage.title}
                  width={1440}
                  height={900}
                  className="screenshot-modal-img"
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Kind === "haven" (HAVENGPT Interactive AI Platform Mockup)
  if (kind === "haven") {
    const havenTitle = lang === "id" ? "Haven — Ruang Aman Bercerita" : "Haven — Safe Space Dialogue";
    const havenTag = lang === "id" ? "AI & PRIVASI LOKAL" : "AI & LOCAL PRIVACY";

    const openHavenModal = () => {
      setModalImage({ title: havenTitle, isCustom: true, customType: "haven" });
    };

    return (
      <>
        <div className="artwork artwork-haven-mockup" aria-label="HavenGPT interactive showcase">
          <div className="mockup-header haven-header-accent">
            <span>HAVENGPT</span>
            <span>/</span>
            <span>{havenTag}</span>
            <button
              type="button"
              onClick={openHavenModal}
              className="browser-zoom-btn"
              title={labels.zoomTitle}
              aria-label={labels.zoomTitle}
              style={{ marginLeft: 4 }}
            >
              <Maximize2 size={11} />
            </button>
          </div>

          <div className="browser-mockup haven-browser-frame">
            <div className="browser-topbar">
              <div className="browser-traffic-lights" aria-hidden="true">
                <span className="tl-dot" />
                <span className="tl-dot" />
                <span className="tl-dot" />
              </div>
              <div className="browser-address-bar">
                <span className="browser-lock">🔒</span>
                <span className="browser-url">havengpt.vercel.app</span>
              </div>
              <button
                type="button"
                onClick={openHavenModal}
                className="browser-zoom-btn"
                title={labels.zoomTitle}
                aria-label={labels.zoomTitle}
              >
                <Maximize2 size={12} />
              </button>
            </div>

            <div className="haven-screen cursor-zoom-in" onClick={openHavenModal}>
              {/* Mini Sidebar */}
              <div className="haven-sidebar">
                <div className="haven-brand-row">
                  <div className="haven-logo-box">
                    <Heart size={12} className="text-blue-500 fill-blue-500/20" />
                  </div>
                  <div className="haven-brand-text">
                    <strong>Haven</strong>
                    <span>{lang === "id" ? "Ruang Aman" : "Safe Space"}</span>
                  </div>
                </div>
                <div className="haven-new-btn">
                  <Plus size={11} />
                  <span>{lang === "id" ? "Curhat Baru" : "New Chat"}</span>
                </div>
                <div className="haven-history-list">
                  <div className="haven-history-item active">
                    <span className="haven-dot" />
                    <span>{lang === "id" ? "Refleksi Tugas Akhir" : "Thesis Reflection"}</span>
                  </div>
                  <div className="haven-history-item">
                    <span className="haven-dot" />
                    <span>{lang === "id" ? "Fokus & Produktivitas" : "Focus & Flow"}</span>
                  </div>
                </div>
                <div className="haven-privacy-badge">
                  <ShieldCheck size={11} />
                  <span>{lang === "id" ? "Histori Lokal (Aman)" : "Local Storage Only"}</span>
                </div>
              </div>

              {/* Main Chat Canvas */}
              <div className="haven-main-chat">
                <div className="haven-chat-feed">
                  <div className="haven-bubble-user">
                    <p>{lang === "id" ? "Halo Haven, belakangan ini saya merasa sedikit overwhelmed dengan target skripsi." : "Hi Haven, lately I've been feeling slightly overwhelmed by thesis targets."}</p>
                  </div>
                  <div className="haven-bubble-ai">
                    <div className="haven-ai-header">
                      <Heart size={10} className="text-blue-400" />
                      <span>Haven AI</span>
                    </div>
                    <p>
                      {lang === "id"
                        ? "Wajar sekali merasa begitu saat mengejar milestone besar. Kamu sudah melangkah sejauh ini. Mari kita urai hal ini menjadi 3 langkah paling manageable untuk hari ini..."
                        : "It is completely normal to feel that way when chasing big milestones. You've come this far already. Let's break this down into 3 actionable steps today..."}
                    </p>
                  </div>
                </div>

                {/* Interactive Input Bar */}
                <div className="haven-input-bar">
                  <span>{lang === "id" ? "Tulis apa yang kamu rasakan..." : "Write what you are thinking..."}</span>
                  <div className="haven-send-icon">
                    <Send size={11} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mockup-footer">
            <span className="mockup-caption haven-caption">
              {lang === "id" ? "Privasi Terjaga · Penyimpanan Chat di Browser Lokal" : "Privacy-First · Zero Server Tracking"}
            </span>
          </div>
        </div>

        {/* Modal Preview */}
        {modalImage && modalImage.isCustom && modalImage.customType === "haven" && (
          <div
            className="screenshot-modal-backdrop"
            onClick={() => setModalImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label={modalImage.title}
          >
            <div className="screenshot-modal-content haven-modal-container" onClick={(e) => e.stopPropagation()}>
              <div className="screenshot-modal-bar">
                <span>{modalImage.title} · Live Architecture</span>
                <button
                  type="button"
                  onClick={() => setModalImage(null)}
                  className="screenshot-modal-close"
                  aria-label={labels.closeModal}
                >
                  <X size={18} />
                </button>
              </div>
              <div className="haven-modal-body">
                <div className="haven-modal-hero">
                  <div className="haven-modal-badge">
                    <ShieldCheck size={14} />
                    <span>NEXT.JS + TAILWIND CSS + LOCAL CHAT PERSISTENCE</span>
                  </div>
                  <h3>Haven — Ruang Aman Bercerita</h3>
                  <p>
                    {lang === "id"
                      ? "Aplikasi percakapan berbasis AI yang dirancang sebagai ruang aman untuk berdiskusi, refleksi pikiran, dan mencari sudut pandang baru dengan jaminan privasi penuh (chat history hanya tersimpan di perangkat pengguna)."
                      : "An AI conversational platform engineered as a confidential space for reflection, stress relief, and constructive perspectives with zero server tracking."}
                  </p>
                </div>
                <div className="haven-modal-features">
                  <div className="haven-feat-card">
                    <h4>🔒 Privacy-First Architecture</h4>
                    <p>{lang === "id" ? "Seluruh percakapan dienkripsi dan disimpan di local storage peramban pengguna, tanpa logs ke database luar." : "Entire conversation logs are stored securely in browser local storage without external database telemetry."}</p>
                  </div>
                  <div className="haven-feat-card">
                    <h4>⚡ Next.js & React Streaming</h4>
                    <p>{lang === "id" ? "Antarmuka responsif dengan respons real-time streaming, mode gelap/terang, dan manajemen histori modular." : "Real-time streaming responses, dark/light theme switching, and fluid modular conversation management."}</p>
                  </div>
                </div>
                <div className="haven-modal-cta">
                  <a href="https://havengpt.vercel.app/" target="_blank" rel="noopener noreferrer" className="contact-primary">
                    {lang === "id" ? "Buka Website Langsung (havengpt.vercel.app)" : "Visit Live Application"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Kind === "garden" (ILMIS GARDEN real showcase)
  if (kind === "garden") {
    const activeGarden = ilmisScreenshots[currentGarden];
    const activeGardenTitle = activeGarden.title[lang];
    const activeGardenTag = activeGarden.tag[lang];

    const prevGarden = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentGarden((prev) => (prev === 0 ? ilmisScreenshots.length - 1 : prev - 1));
    };

    const nextGarden = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentGarden((prev) => (prev === ilmisScreenshots.length - 1 ? 0 : prev + 1));
    };

    const openGardenPreview = (e: React.MouseEvent) => {
      e.stopPropagation();
      setModalImage({ src: activeGarden.src, title: activeGardenTitle });
    };

    return (
      <>
        <div className="artwork artwork-garden-mockup" aria-label="ILMIS GARDEN interactive showcase">
          <div className="mockup-header garden-header-accent">
            <span>ILMIS GARDEN</span>
            <span>/</span>
            <span>{activeGardenTag}</span>
          </div>

          <button
            type="button"
            onClick={prevGarden}
            className="mockup-nav-btn mockup-nav-prev"
            aria-label={labels.prevBtn}
          >
            <ChevronLeft size={16} />
          </button>

          <div className="browser-mockup">
            <div className="browser-topbar">
              <div className="browser-traffic-lights" aria-hidden="true">
                <span className="tl-dot" />
                <span className="tl-dot" />
                <span className="tl-dot" />
              </div>
              <div className="browser-address-bar">
                <span className="browser-lock">🔒</span>
                <span className="browser-url">ilmisgarden.com</span>
              </div>
              <button
                type="button"
                onClick={openGardenPreview}
                className="browser-zoom-btn"
                title={labels.zoomTitle}
                aria-label={labels.zoomTitle}
              >
                <Maximize2 size={12} />
              </button>
            </div>

            <div className="browser-screen" onClick={openGardenPreview}>
              {activeGarden.type === "mobile" ? (
                <div className="bunnies-mobile-wrapper">
                  <div className="bunnies-mobile-phone">
                    <Image
                      src={activeGarden.src}
                      alt={`ILMIS GARDEN mobile: ${activeGardenTitle}`}
                      fill
                      sizes="(max-width: 640px) 200px, 300px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              ) : (
                <Image
                  src={activeGarden.src}
                  alt={`ILMIS GARDEN desktop: ${activeGardenTitle}`}
                  fill
                  sizes="(max-width: 640px) 320px, 600px"
                  priority={currentGarden === 0}
                  className="object-cover object-top cursor-zoom-in"
                />
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={nextGarden}
            className="mockup-nav-btn mockup-nav-next"
            aria-label={labels.nextBtn}
          >
            <ChevronRight size={16} />
          </button>

          <div className="mockup-footer">
            <div className="mockup-dots garden-dots">
              {ilmisScreenshots.map((screen, idx) => (
                <button
                  key={screen.src}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentGarden(idx);
                  }}
                  className={`mockup-dot ${idx === currentGarden ? "active" : ""}`}
                  aria-label={`Slide ${idx + 1}: ${screen.title[lang]}`}
                />
              ))}
            </div>
            <span className="mockup-caption garden-caption">{activeGardenTitle}</span>
          </div>
        </div>

        {modalImage && modalImage.src && (
          <div
            className="screenshot-modal-backdrop"
            onClick={() => setModalImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label={modalImage.title}
          >
            <div className="screenshot-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="screenshot-modal-bar">
                <span>{modalImage.title}</span>
                <button
                  type="button"
                  onClick={() => setModalImage(null)}
                  className="screenshot-modal-close"
                  aria-label={labels.closeModal}
                >
                  <X size={18} />
                </button>
              </div>
              <div className="screenshot-modal-body">
                <Image
                  src={modalImage.src}
                  alt={modalImage.title}
                  width={1440}
                  height={900}
                  className="screenshot-modal-img"
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Kind === "village" (Village Complaint App Mockup)
  const villageTitle = lang === "id" ? "Aplikasi Pengaduan Desa — QIVA Project" : "Village Complaint App — QIVA Project";
  const villageTag = lang === "id" ? "MOBILE · CIVIC TECH" : "MOBILE · CIVIC TECH";

  const openVillageModal = () => {
    setModalImage({ title: villageTitle, isCustom: true, customType: "village" });
  };

  return (
    <>
      <div className="artwork artwork-village-mockup" aria-label="Village complaint app interactive showcase">
        <div className="mockup-header village-header-accent">
          <span>QIVA PROJECT</span>
          <span>/</span>
          <span>{villageTag}</span>
          <button
            type="button"
            onClick={openVillageModal}
            className="browser-zoom-btn"
            title={labels.zoomTitle}
            aria-label={labels.zoomTitle}
            style={{ marginLeft: 4 }}
          >
            <Maximize2 size={11} />
          </button>
        </div>

        <div className="phone-mockup village-phone-frame cursor-zoom-in" onClick={openVillageModal}>
          <div className="phone-notch">
            <div className="phone-camera" />
          </div>

          <div className="phone-screen village-screen">
            {/* App Bar */}
            <div className="village-app-bar">
              <span className="village-app-title">{lang === "id" ? "Aspirasi Desa" : "Civic Complaint"}</span>
              <span className="village-badge">Cimahi</span>
            </div>

            {/* Quick Action Cards */}
            <div className="village-quick-grid">
              <div className="village-action-card">
                <FileText size={14} className="text-blue-500" />
                <span>{lang === "id" ? "Buat Laporan" : "New Report"}</span>
              </div>
              <div className="village-action-card">
                <Clock size={14} className="text-amber-500" />
                <span>{lang === "id" ? "Status Aduan" : "Status"}</span>
              </div>
            </div>

            {/* Complaint List Feed */}
            <div className="village-feed">
              <span className="village-feed-title">{lang === "id" ? "LAPORAN TERBARU" : "RECENT REPORTS"}</span>
              <div className="village-feed-card">
                <div className="village-feed-header">
                  <strong>{lang === "id" ? "Perbaikan Lampu RT 03" : "Streetlight Repair RT 03"}</strong>
                  <span className="village-status-pill status-done">
                    <CheckCircle2 size={9} />
                    <span>{lang === "id" ? "Selesai" : "Resolved"}</span>
                  </span>
                </div>
                <small>{lang === "id" ? "Fasilitas Publik · 2 jam lalu" : "Public Facility · 2h ago"}</small>
              </div>

              <div className="village-feed-card">
                <div className="village-feed-header">
                  <strong>{lang === "id" ? "Aspal Berlubang RW 05" : "Road Pothole RW 05"}</strong>
                  <span className="village-status-pill status-process">
                    <AlertCircle size={9} />
                    <span>{lang === "id" ? "Diproses" : "In Progress"}</span>
                  </span>
                </div>
                <small>{lang === "id" ? "Infrastruktur · Kemarin" : "Infrastructure · Yesterday"}</small>
              </div>
            </div>
          </div>

          <div className="phone-home-indicator" />
        </div>

        <div className="mockup-footer">
          <span className="mockup-caption village-caption">
            {lang === "id" ? "Pengembangan Sistem Pengaduan Masyarakat · PKL 2021" : "Civic Complaint System · Internship 2021"}
          </span>
        </div>
      </div>

      {/* Modal Preview for Village App */}
      {modalImage && modalImage.isCustom && modalImage.customType === "village" && (
        <div
          className="screenshot-modal-backdrop"
          onClick={() => setModalImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={modalImage.title}
        >
          <div className="screenshot-modal-content haven-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="screenshot-modal-bar">
              <span>{modalImage.title} · Case Study</span>
              <button
                type="button"
                onClick={() => setModalImage(null)}
                className="screenshot-modal-close"
                aria-label={labels.closeModal}
              >
                <X size={18} />
              </button>
            </div>
            <div className="haven-modal-body">
              <div className="haven-modal-hero">
                <div className="haven-modal-badge">
                  <span>FLUTTER + ANDROID + REST API + MYSQL</span>
                </div>
                <h3>Aplikasi Pengaduan Desa (QIVA Project)</h3>
                <p>
                  {lang === "id"
                    ? "Sistem informasi berbasis mobile untuk mempermudah warga desa dalam melaporkan kendala infrastruktur, keluhan layanan masyarakat, dan transparansi tindak lanjut dari aparatur desa setempat."
                    : "Mobile-based civic system streamlining resident complaints regarding public facilities and local village infrastructure with transparent status tracking."}
                </p>
              </div>
              <div className="haven-modal-features">
                <div className="haven-feat-card">
                  <h4>📱 Fitur Pelaporan & Foto Lampiran</h4>
                  <p>{lang === "id" ? "Warga dapat mengambil foto bukti kendala langsung dari ponsel dan melampirkan titik koordinat lokasi." : "Residents can capture photo evidence directly and submit structured reports."}</p>
                </div>
                <div className="haven-feat-card">
                  <h4>📊 Pemantauan Status Real-Time</h4>
                  <p>{lang === "id" ? "Dashboard pelacakan status: Menunggu Verifikasi → Sedang Diproses → Selesai Ditangani." : "Real-time ticket tracking from Pending Review to Work In Progress and Resolved."}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
