import type { Metadata, Viewport } from "next";
import { Space_Grotesk, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
  weight: ["400", "500"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://andrianbaros.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Andrian Baros — Informatics Engineer · Web & Mobile Developer",
    template: "%s | Andrian Baros",
  },
  description:
    "Portofolio profesional Andrian Baros — mahasiswa Teknik Informatika UNIKOM dan Web & Mobile Developer yang berfokus membangun produk digital bermanfaat dengan Next.js, Flutter, Laravel, dan applied AI.",
  applicationName: "Andrian Baros Portfolio",
  authors: [{ name: "Andrian Baros", url: siteUrl }],
  creator: "Andrian Baros",
  keywords: [
    "Andrian Baros",
    "Informatics Engineer",
    "Web Developer",
    "Mobile Developer",
    "Flutter Developer",
    "React",
    "Next.js",
    "Laravel",
    "TensorFlow Lite",
    "UNIKOM",
    "Universitas Komputer Indonesia",
    "Bandung",
    "Teknik Informatika",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "id-ID": "/",
      "en-US": "/",
    },
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Andrian Baros — Informatics Engineer · Web & Mobile Developer",
    description: "Membangun produk digital fungsional dengan teknologi andal, kode solid, dan antarmuka bersih.",
    url: siteUrl,
    siteName: "Andrian Baros Portfolio",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrian Baros — Informatics Engineer · Web & Mobile Developer",
    description: "Building digital experiences that combine technology, functionality, and thoughtful user experiences.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Andrian Baros",
      jobTitle: "Informatics Engineer · Web & Mobile Developer",
      description:
        "Informatics Engineering student at Universitas Komputer Indonesia (UNIKOM) and Web & Mobile Developer based in Bandung, Indonesia.",
      email: "andrianbaros10@gmail.com",
      url: siteUrl,
      sameAs: [
        "https://github.com/andrianbaros",
        "https://www.linkedin.com/in/andrian-baros-99a208251",
        "https://instagram.com/andrianbaros_",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bandung",
        addressRegion: "West Java",
        addressCountry: "ID",
      },
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "Universitas Komputer Indonesia (UNIKOM)",
          sameAs: "https://email.unikom.ac.id",
        },
        {
          "@type": "EducationalOrganization",
          name: "SMK TI Garuda Nusantara",
        },
      ],
      knowsAbout: [
        "Web Development",
        "Mobile App Development",
        "Flutter",
        "Dart",
        "React",
        "Next.js",
        "TypeScript",
        "PHP",
        "Laravel",
        "Applied Machine Learning",
        "TensorFlow Lite",
        "Speech Recognition",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Andrian Baros Portfolio",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${spaceGrotesk.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
