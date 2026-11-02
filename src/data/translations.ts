export type Language = "id" | "en";

export interface ProjectTranslation {
  number: string;
  name: string;
  type: string;
  year: string;
  description: string;
  stack: string[];
  visual: "qread" | "bunnies" | "haven" | "garden" | "village";
  note: string;
  url?: string;
  featured?: boolean;
  featuredBadge?: string;
  highlights?: string[];
}

export interface ExperienceTranslation {
  role: string;
  company: string;
  kind: string;
  date: string;
  location: string;
  description: string;
}

export interface EducationTranslation {
  institution: string;
  degree: string;
  period: string;
  gpa?: string;
  location?: string;
}

export interface CertificationTranslation {
  name: string;
  issuer: string;
  dateInfo: string;
  code: string;
}

export interface SkillCategoryTranslation {
  group: string;
  items: string[];
}

export const translations = {
  id: {
    nav: {
      work: "KARYA",
      about: "TENTANG",
      journey: "PENGALAMAN",
      contact: "KONTAK",
    },
    topbar: {
      status: "INFORMATICS ENGINEER · BANDUNG, ID",
    },
    hero: {
      kickerYear: "PORTOFOLIO / 2026",
      kickerScope: "WEB · MOBILE · APPLIED AI",
      titleLine1: "SAYA MERANCANG",
      titleLine2: "& MEMBANGUN",
      titleLine3Word1: "KARYA",
      titleLine3Word2: "DIGITAL",
      intro:
        "Halo, saya Andrian Baros — mahasiswa Teknik Informatika sekaligus Web & Mobile Developer yang berfokus membangun produk digital bermanfaat lewat kode yang solid, antarmuka yang bersih, dan fungsionalitas nyata.",
      basedIn: "BERBASIS DI",
      location: "BANDUNG, ID",
      availableFor: "TERBUKA UNTUK",
      availableSub: "KOLABORASI & PELUANG BARU",
      scrollPrompt: "GULIR KE BAWAH",
    },
    about: {
      labelNo: "01 / TENTANG SAYA",
      labelSub: "MAHASISWA & DEVELOPER",
      heading1: "TEKNOLOGI,",
      heading2: "BERMAKNA.",
      lead: "Saya senang membangun produk digital yang memadukan keandalan teknologi, fungsionalitas, dan pengalaman pengguna yang nyaman.",
      p1: "Pengalaman saya mencakup pengembangan web, aplikasi mobile, serta teknologi edukasi melalui pekerjaan profesional, proyek freelance, dan riset skripsi. Saya memiliki ketertarikan besar dalam mengeksplorasi teknologi baru, memecahkan masalah dunia nyata, serta memanfaatkan AI tools untuk mengoptimalkan alur kerja pengembangan software.",
      eduLabel: "PENDIDIKAN",
      eduDegree: "S1 Teknik Informatika (IPK 3,45)",
      eduSchool: "Universitas Komputer Indonesia (UNIKOM) · 2022–2026",
      focusLabel: "FOKUS UTAMA",
      focusVal: "Web & Mobile Development · Educational Tech",
      focusSub: "Membangun solusi nyata dengan kode andal dan integrasi AI",
      ticker:
        "WEB DEVELOPMENT — MOBILE APPS — APPLIED MACHINE LEARNING — EDUCATIONAL TECH — NEXT.JS — FLUTTER — LARAVEL — TENSORFLOW LITE — ",
    },
    work: {
      labelNo: "02 / KARYA PILIHAN",
      labelSub: "PROYEK NYATA & PRODUK DIGITAL",
      heading1: "DIBANGUN DENGAN",
      heading2: "TUJUAN.",
      subtitle:
        "Cuplikan karya utama saya di bidang mobile app dengan applied machine learning, portal web interaktif, platform AI, dan e-commerce.",
      featuredBadge: "PROYEK UTAMA · TUGAS AKHIR",
      projects: [
        {
          number: "01",
          name: "QREAD",
          type: "MOBILE APP · APPLIED ML & EDUTECH",
          year: "2026",
          description:
            "Aplikasi pembelajaran membaca huruf Hijaiyah berbasis Android untuk anak usia 4–6 tahun dengan fitur Speech Recognition langsung di perangkat, tracing menulis huruf interaktif, serta kuis gamifikasi.",
          stack: ["Flutter", "Dart", "TensorFlow Lite", "On-Device ML", "Speech Recognition"],
          visual: "qread" as const,
          note: "Tugas Akhir (Skripsi) · Universitas Komputer Indonesia",
          featured: true,
          featuredBadge: "PROYEK UTAMA · TUGAS AKHIR",
          highlights: [
            "Deteksi pelafalan suara on-device lewat model TensorFlow Lite",
            "Panduan goresan (stroke tracing) interaktif untuk huruf Hijaiyah",
            "Jalur belajar bertingkat dengan maskot dan audio feedback anak",
          ],
        },
        {
          number: "02",
          name: "BUNNIES WORLD",
          type: "WEB · INTERACTIVE FAN PORTAL",
          year: "2026",
          description:
            "Interactive fan portal dengan pendekatan visual Y2K, Dreamcore, dan Glassmorphism untuk NewJeans & Bunnies, dilengkapi live fan community wall terintegrasi dan Bunny AI Assistant.",
          stack: ["React", "Vite", "PWA", "Tailwind CSS", "AI Assistant", "Live Community"],
          visual: "bunnies" as const,
          note: "Website live · bunniesworld.my.id",
          url: "https://www.bunniesworld.my.id/",
        },
        {
          number: "03",
          name: "HAVENGPT",
          type: "WEB · AI CONVERSATIONAL PLATFORM",
          year: "2026",
          description:
            "Aplikasi percakapan berbasis AI dengan riwayat chat lokal dan pengalaman yang berfokus pada privasi. Menghadirkan ruang aman untuk berdiskusi dan mendapatkan sudut pandang baru tanpa pelacakan data server.",
          stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "AI / LLM", "Local Storage"],
          visual: "haven" as const,
          note: "Website live · havengpt.vercel.app",
          url: "https://havengpt.vercel.app/",
        },
        {
          number: "04",
          name: "ILMIS GARDEN",
          type: "WEB · E-COMMERCE & ATELIER",
          year: "2025—2026",
          description:
            "Website e-commerce dan katalog digital untuk flower atelier di Bandung, dilengkapi etalase produk artisan, filter kategori bunga, keranjang belanja, serta profil brand interaktif.",
          stack: ["PHP", "Laravel", "MySQL", "E-Commerce", "Responsive Web"],
          visual: "garden" as const,
          note: "Website live · ilmisgarden.com",
          url: "https://ilmisgarden.com/",
        },
        {
          number: "05",
          name: "VILLAGE COMPLAINT APP",
          type: "MOBILE APP · CIVIC TECH",
          year: "2021",
          description:
            "Aplikasi pengaduan desa yang dikembangkan saat pengalaman PKL di QIVA Project untuk memfasilitasi warga dalam menyampaikan aspirasi, aduan pelayanan publik, dan laporan fasilitas desa.",
          stack: ["Flutter", "Android", "MySQL", "REST API", "Community Service"],
          visual: "village" as const,
          note: "Proyek PKL · QIVA Project Cimahi",
        },
      ],
    },
    toolkit: {
      labelNo: "03 / KEAHLIAN TEKNIS",
      labelSub: "STACK & ALAT BANTU",
      heading1: "KEAHLIAN &",
      heading2: "TEKNOLOGI.",
      subtitle:
        "Alat bantu dan bahasa pemrograman yang rutin saya gunakan untuk mengembangkan aplikasi web, mobile, dan integrasi AI.",
      skills: [
        {
          group: "WEB & FRONTEND",
          items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "PHP", "Laravel", "HTML & CSS"],
        },
        {
          group: "MOBILE APPS",
          items: ["Flutter", "Dart", "Android Development", "Java", "Mobile UI"],
        },
        {
          group: "AI & MACHINE LEARNING",
          items: ["TensorFlow Lite", "Speech Recognition", "Python", "Gemini & AI Tools", "AI Coding Agents"],
        },
        {
          group: "DATABASE & TOOLS",
          items: ["MySQL", "SQL", "Git", "GitHub", "Postman", "REST API"],
        },
      ],
      certifications: [
        {
          name: "Pengembang Web — BNSP",
          issuer: "Badan Nasional Sertifikasi Profesi · Terbit Februari 2026",
          dateInfo: "SERTIFIKASI / 2026",
          code: "ID / 01",
        },
        {
          name: "Cisco CCNA: Routing & Switching",
          issuer: "Cisco Networking Academy · Terbit Oktober 2023",
          dateInfo: "SERTIFIKASI / 2023",
          code: "ID / 02",
        },
      ],
    },
    journey: {
      labelNo: "04 / PERJALANAN",
      labelSub: "PENGALAMAN KERJA & EDUKASI",
      heading1: "BELAJAR.",
      heading2: "BERKARYA.",
      heading3: "ULANGI.",
      subtitle:
        "Rekam jejak pengalaman dari pengembangan website klien, kerja praktik teknologi, hingga magang mobile development.",
      experience: [
        {
          role: "Web Developer",
          company: "Ilmis Garden",
          kind: "Freelance",
          date: "AGU 2025 — SEP 2026",
          location: "Bandung, Indonesia",
          description:
            "Pengembangan dan pemeliharaan website e-commerce, implementasi fitur dan antarmuka katalog florist, serta debugging dan perbaikan fungsionalitas secara berkala.",
        },
        {
          role: "Web Developer",
          company: "PT Pusat Gamer Nusantara",
          kind: "Kerja Praktik",
          date: "SEP 2025 — JAN 2026",
          location: "Tangerang, Indonesia",
          description:
            "Membantu pengembangan landing page untuk program top-up game serta implementasi tampilan website yang responsif dan performan.",
        },
        {
          role: "Mobile Apps Developer",
          company: "QIVA Project",
          kind: "PKL (Internship)",
          date: "FEB 2021 — MAR 2021",
          location: "Cimahi, Indonesia",
          description:
            "Terlibat aktif dalam perancangan dan pengembangan aplikasi pengaduan desa berbasis mobile serta sistem pelaporan warga.",
        },
        {
          role: "Operator Administrasi",
          company: "TK Tunas Harapan Konengsari",
          kind: "Pengalaman Kerja",
          date: "PENGALAMAN KERJA",
          location: "Bandung, Indonesia",
          description:
            "Pengelolaan data administrasi sekolah, data entry, dan pengelolaan sistem Dapodik secara berkala dan terstruktur.",
        },
      ],
      education: [
        {
          institution: "Universitas Komputer Indonesia (UNIKOM)",
          degree: "S1 Teknik Informatika",
          period: "2022 — 2026",
          gpa: "IPK 3,45 / 4.00",
          location: "Bandung, Indonesia",
        },
        {
          institution: "SMK TI Garuda Nusantara",
          degree: "Rekayasa Perangkat Lunak (RPL)",
          period: "2018 — 2021",
          location: "Cimahi, Indonesia",
        },
      ],
    },
    contact: {
      labelNo: "05 / KONTAK",
      labelSub: "MARI TERHUBUNG",
      pre: "PUNYA IDE ATAU PELUANG PROYEK?",
      heading1: "MARI KITA",
      heading2: "WUJUDKAN.",
      paragraph:
        "Ada peluang proyek web/mobile, kolaborasi riset, atau sekadar ingin berdiskusi seputar software engineering dan AI? Jangan ragu untuk menghubungi saya.",
      startBtn: "KIRIM PESAN",
      copyBtn: "SALIN EMAIL",
      copiedBtn: "EMAIL TERSALIN!",
    },
    footer: {
      tagline: "INFORMATICS ENGINEER · WEB & MOBILE DEVELOPER",
    },
  },

  en: {
    nav: {
      work: "WORK",
      about: "ABOUT",
      journey: "JOURNEY",
      contact: "CONTACT",
    },
    topbar: {
      status: "INFORMATICS ENGINEER · BANDUNG, ID",
    },
    hero: {
      kickerYear: "PORTFOLIO / 2026",
      kickerScope: "WEB · MOBILE · APPLIED AI",
      titleLine1: "BUILDING",
      titleLine2: "DIGITAL",
      titleLine3Word1: "EXPERIENCES",
      titleLine3Word2: "MATTER",
      intro:
        "I'm Andrian Baros, an Informatics Engineering student and Web & Mobile Developer based in Bandung, Indonesia. I enjoy building digital products that combine technology, functionality, and thoughtful user experiences.",
      basedIn: "BASED IN",
      location: "BANDUNG, ID",
      availableFor: "AVAILABLE FOR",
      availableSub: "NEW OPPORTUNITIES & COLLABORATIONS",
      scrollPrompt: "SCROLL TO EXPLORE",
    },
    about: {
      labelNo: "01 / A LITTLE ABOUT ME",
      labelSub: "STUDENT & DEVELOPER",
      heading1: "TECHNOLOGY,",
      heading2: "WITH PURPOSE.",
      lead: "I enjoy building digital products that combine technology, functionality, and thoughtful user experiences.",
      p1: "My experience spans web development, mobile application development, and educational technology, through professional work, freelance projects, and academic development. I'm particularly interested in exploring new technologies, solving real-world problems, and leveraging AI tools to improve development workflows. I believe technology should not only work well but also serve a meaningful purpose.",
      eduLabel: "EDUCATION",
      eduDegree: "B.Sc. Informatics Engineering (GPA 3.45)",
      eduSchool: "Universitas Komputer Indonesia (UNIKOM) · 2022–2026",
      focusLabel: "PRIMARY FOCUS",
      focusVal: "Web & Mobile Development · Educational Tech",
      focusSub: "Building real-world solutions with solid code & AI tools",
      ticker:
        "WEB DEVELOPMENT — MOBILE EXPERIENCES — APPLIED MACHINE LEARNING — EDUCATIONAL TECH — NEXT.JS — FLUTTER — LARAVEL — TENSORFLOW LITE — ",
    },
    work: {
      labelNo: "02 / SELECTED WORK",
      labelSub: "REAL BUILDS & DIGITAL PRODUCTS",
      heading1: "MADE WITH",
      heading2: "INTENTION.",
      subtitle:
        "A curated selection of my work spanning mobile apps with applied ML, interactive web portals, AI platforms, and e-commerce.",
      featuredBadge: "FEATURED FLAGSHIP · THESIS",
      projects: [
        {
          number: "01",
          name: "QREAD",
          type: "MOBILE APP · APPLIED ML & EDUTECH",
          year: "2026",
          description:
            "An Android-based Hijaiyah reading learning application for children aged 4–6 featuring on-device Speech Recognition, guided stroke tracing, and interactive gamified quizzes.",
          stack: ["Flutter", "Dart", "TensorFlow Lite", "On-Device ML", "Speech Recognition"],
          visual: "qread" as const,
          note: "Final Thesis Project · Universitas Komputer Indonesia",
          featured: true,
          featuredBadge: "FEATURED FLAGSHIP · THESIS",
          highlights: [
            "On-device speech recognition via lightweight TensorFlow Lite model",
            "Interactive stroke tracing for Arabic alphabet acquisition",
            "Gamified multi-level learning journey with audio feedback",
          ],
        },
        {
          number: "02",
          name: "BUNNIES WORLD",
          type: "WEB · INTERACTIVE FAN PORTAL",
          year: "2026",
          description:
            "An interactive digital fan portal for NewJeans & Bunnies with Y2K, Dreamcore, and Glassmorphism aesthetics, featuring a live community fan wall and an interactive Bunny AI Assistant.",
          stack: ["React", "Vite", "PWA", "Tailwind CSS", "AI Assistant", "Live Community"],
          visual: "bunnies" as const,
          note: "Live website · bunniesworld.my.id",
          url: "https://www.bunniesworld.my.id/",
        },
        {
          number: "03",
          name: "HAVENGPT",
          type: "WEB · AI CONVERSATIONAL PLATFORM",
          year: "2026",
          description:
            "AI-powered conversational web application featuring local chat history and a privacy-focused experience. Designed as a safe space for dialogue and fresh perspectives without server tracking.",
          stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "AI / LLM", "Local Storage"],
          visual: "haven" as const,
          note: "Live website · havengpt.vercel.app",
          url: "https://havengpt.vercel.app/",
        },
        {
          number: "04",
          name: "ILMIS GARDEN",
          type: "WEB · E-COMMERCE & ATELIER",
          year: "2025—2026",
          description:
            "An e-commerce and digital catalog website for a flower atelier in Bandung, featuring artisan product showcases, categorized floral collections, shopping cart, and brand storytelling.",
          stack: ["PHP", "Laravel", "MySQL", "E-Commerce", "Responsive Web"],
          visual: "garden" as const,
          note: "Live website · ilmisgarden.com",
          url: "https://ilmisgarden.com/",
        },
        {
          number: "05",
          name: "VILLAGE COMPLAINT APP",
          type: "MOBILE APP · CIVIC TECH",
          year: "2021",
          description:
            "A civic complaint application developed during an internship at QIVA Project, streamlining citizen reporting for community feedback, services, and local infrastructure.",
          stack: ["Flutter", "Android", "MySQL", "REST API", "Community Service"],
          visual: "village" as const,
          note: "Internship Project · QIVA Project Cimahi",
        },
      ],
    },
    toolkit: {
      labelNo: "03 / TOOLKIT",
      labelSub: "STACK & DISCIPLINES",
      heading1: "SKILLS &",
      heading2: "TECHNOLOGIES.",
      subtitle:
        "The technologies, languages, and tools I use regularly to build robust web, mobile, and AI-enabled software.",
      skills: [
        {
          group: "WEB & FRONTEND",
          items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "PHP", "Laravel", "HTML & CSS"],
        },
        {
          group: "MOBILE APPS",
          items: ["Flutter", "Dart", "Android Development", "Java", "Mobile UI"],
        },
        {
          group: "AI & MACHINE LEARNING",
          items: ["TensorFlow Lite", "Speech Recognition", "Python", "Gemini & AI Tools", "AI Coding Agents"],
        },
        {
          group: "DATABASE & TOOLS",
          items: ["MySQL", "SQL", "Git", "GitHub", "Postman", "REST API"],
        },
      ],
      certifications: [
        {
          name: "Pengembang Web — BNSP",
          issuer: "National Professional Certification Board (BNSP) · Issued Feb 2026",
          dateInfo: "CERTIFICATION / 2026",
          code: "ID / 01",
        },
        {
          name: "Cisco CCNA: Routing & Switching",
          issuer: "Cisco Networking Academy · Issued Oct 2023",
          dateInfo: "CERTIFICATION / 2023",
          code: "ID / 02",
        },
      ],
    },
    journey: {
      labelNo: "04 / THE JOURNEY",
      labelSub: "EXPERIENCE & EDUCATION",
      heading1: "LEARN.",
      heading2: "MAKE.",
      heading3: "REPEAT.",
      subtitle:
        "A proven track record spanning client e-commerce development, gaming practical work, and mobile civic technology.",
      experience: [
        {
          role: "Web Developer",
          company: "Ilmis Garden",
          kind: "Freelance",
          date: "AUG 2025 — SEP 2026",
          location: "Bandung, Indonesia",
          description:
            "E-commerce web development and maintenance, florist catalog feature & UI implementation, and ongoing functionality debugging.",
        },
        {
          role: "Web Developer",
          company: "PT Pusat Gamer Nusantara",
          kind: "Practical Work",
          date: "SEP 2025 — JAN 2026",
          location: "Tangerang, Indonesia",
          description:
            "Assisted in landing page development for gaming top-up programs and implemented responsive, high-performance web interfaces.",
        },
        {
          role: "Mobile Apps Developer",
          company: "QIVA Project",
          kind: "Internship (PKL)",
          date: "FEB 2021 — MAR 2021",
          location: "Cimahi, Indonesia",
          description:
            "Actively contributed to mobile app design and development for village public complaint systems and citizen reporting.",
        },
        {
          role: "Administrative Operator",
          company: "TK Tunas Harapan Konengsari",
          kind: "Professional Experience",
          date: "PROFESSIONAL WORK",
          location: "Bandung, Indonesia",
          description:
            "Managed school administrative records, performed data entry, and maintained the Dapodik educational database system.",
        },
      ],
      education: [
        {
          institution: "Universitas Komputer Indonesia (UNIKOM)",
          degree: "Bachelor of Informatics Engineering",
          period: "2022 — 2026",
          gpa: "GPA 3.45 / 4.00",
          location: "Bandung, Indonesia",
        },
        {
          institution: "SMK TI Garuda Nusantara",
          degree: "Software Engineering (RPL)",
          period: "2018 — 2021",
          location: "Cimahi, Indonesia",
        },
      ],
    },
    contact: {
      labelNo: "05 / GET IN TOUCH",
      labelSub: "LET'S BUILD TOGETHER",
      pre: "HAVE A PROJECT OR OPPORTUNITY IN MIND?",
      heading1: "LET'S MAKE",
      heading2: "IT HAPPEN.",
      paragraph:
        "Interested in collaborating on a web or mobile project, research opportunity, or simply want to connect over software engineering and AI? Feel free to reach out.",
      startBtn: "SEND AN EMAIL",
      copyBtn: "COPY EMAIL",
      copiedBtn: "EMAIL COPIED!",
    },
    footer: {
      tagline: "INFORMATICS ENGINEER · WEB & MOBILE DEVELOPER",
    },
  },
};
