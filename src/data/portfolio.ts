export interface ProjectItem {
  number: string;
  name: string;
  type: string;
  year: string;
  description: string;
  stack: string[];
  visual: "qread" | "bunnies" | "haven" | "garden" | "village" | "toefl";
  note: string;
  url?: string;
  featured?: boolean;
  highlights?: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  kind: string;
  date: string;
  location: string;
  description: string;
}

export interface SkillCategory {
  group: string;
  items: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  gpa?: string;
  location?: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  dateInfo: string;
  code: string;
}

export const profileData = {
  name: "Andrian Baros",
  title: "Informatics Engineer · Web & Mobile Developer",
  status: "INFORMATICS ENGINEER · BANDUNG, ID",
  location: "Bandung, West Java, Indonesia",
  email: "andrianbaros10@gmail.com",
  socials: {
    github: "https://github.com/andrianbaros",
    linkedin: "https://www.linkedin.com/in/andrian-baros-99a208251",
    instagram: "https://instagram.com/andrianbaros_",
  },
  bio: {
    lead: "I like turning complicated ideas into clear, useful digital experiences.",
    body: "I'm Andrian Baros, an Informatics Engineering student and Web & Mobile Developer based in Bandung, Indonesia. I enjoy building digital products that combine technology, functionality, and thoughtful user experiences across web development, mobile applications, and educational technology.",
    educationSummary: "Universitas Komputer Indonesia (UNIKOM) · 2022–2026",
    focus: "Web & Mobile Development · Educational Tech · Applied AI",
  },
};

export const projectsData: ProjectItem[] = [
  {
    number: "01",
    name: "QREAD",
    type: "MOBILE APP · APPLIED ML & EDUTECH",
    year: "2026",
    description:
      "Aplikasi pembelajaran membaca huruf Hijaiyah berbasis Android untuk anak usia 4–6 tahun dengan fitur Speech Recognition, tracing menulis interaktif, dan kuis gamifikasi.",
    stack: ["Flutter", "Dart", "TensorFlow Lite", "On-Device ML", "Speech Recognition"],
    visual: "qread",
    note: "Tugas Akhir (Skripsi) · Universitas Komputer Indonesia",
    featured: true,
    highlights: [
      "On-device speech recognition via TensorFlow Lite",
      "Interactive stroke tracing for Arabic letters",
      "Gamified learning path and auditory feedback",
    ],
  },
  {
    number: "02",
    name: "AB TOEFL TRAINING",
    type: "WEB · EDUTECH & EXAM SIMULATION",
    year: "2026",
    description:
      "Platform latihan mandiri TOEFL ITP komprehensif: simulasi ujian penuh 140 soal, Listening dengan mode Examiner manual, Structure & Written Expression, Reading split-screen akademik, dan Vocabulary practice.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Edutech", "Exam Simulation"],
    visual: "toefl",
    note: "Live website · ab-toefl-training.vercel.app",
    url: "https://ab-toefl-training.vercel.app/",
    highlights: [
      "Full 140-question official TOEFL ITP simulation mode",
      "Manual Examiner Reader screen for listening proctors",
      "Reading split-screen view & vocabulary flashcards",
    ],
  },
  {
    number: "03",
    name: "BUNNIES WORLD",
    type: "WEB · INTERACTIVE FAN PORTAL",
    year: "2026",
    description:
      "Interactive fan portal dengan pendekatan visual Y2K, Dreamcore, dan Glassmorphism untuk NewJeans & Bunnies, dilengkapi live fan community wall dan Bunny AI Assistant.",
    stack: ["React", "Vite", "PWA", "Tailwind CSS", "AI Assistant", "Live Community"],
    visual: "bunnies",
    note: "Live website · bunniesworld.my.id",
    url: "https://www.bunniesworld.my.id/",
  },
  {
    number: "04",
    name: "HAVENGPT",
    type: "WEB · AI CONVERSATIONAL PLATFORM",
    year: "2026",
    description:
      "AI-powered conversational application dengan local chat history dan privacy-focused experience. Ruang aman untuk bercerita, berdiskusi, dan mendapatkan sudut pandang baru tanpa pelacakan server.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "AI / LLM", "Local Storage"],
    visual: "haven",
    note: "Live website · havengpt.vercel.app",
    url: "https://havengpt.vercel.app/",
  },
  {
    number: "05",
    name: "ILMIS GARDEN",
    type: "WEB · E-COMMERCE & ATELIER",
    year: "2025—2026",
    description:
      "Website e-commerce dan katalog digital untuk flower atelier di Bandung, dilengkapi etalase produk artisan, filter kategori bunga, keranjang belanja, serta profil brand interaktif.",
    stack: ["PHP", "Laravel", "MySQL", "E-Commerce", "Responsive Web"],
    visual: "garden",
    note: "Live website · ilmisgarden.com",
    url: "https://ilmisgarden.com/",
  },
  {
    number: "06",
    name: "VILLAGE COMPLAINT APP",
    type: "MOBILE APP · CIVIC TECH",
    year: "2021",
    description:
      "Aplikasi pengaduan desa yang dikembangkan saat pengalaman PKL di QIVA Project untuk memfasilitasi warga dalam menyampaikan aspirasi, aduan pelayanan, dan laporan infrastruktur desa.",
    stack: ["Flutter", "Android", "MySQL", "REST API", "Community Service"],
    visual: "village",
    note: "Proyek PKL · QIVA Project Cimahi",
  },
];

export const experienceData: ExperienceItem[] = [
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
];

export const skillsData: SkillCategory[] = [
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
];

export const educationData: EducationItem[] = [
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
];

export const certificationData: CertificationItem[] = [
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
];
