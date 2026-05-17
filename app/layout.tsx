import { Inter, JetBrains_Mono } from "next/font/google";
import "../src/styles.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata = {
  metadataBase: new URL("https://utkarshportfolio.com"),
  title: "Utkarsh Joshi - Technical Projects & Systems Work",
  description:
    "Software engineer focusing on GPU computing, high-performance systems, and technical projects. C++, CUDA, simulation, and low-level systems work.",
  keywords: ["GPU Computing", "CUDA", "C++", "Systems Engineering", "Simulation", "Performance"],
  authors: [{ name: "Utkarsh Joshi" }],
  creator: "Utkarsh Joshi",
  openGraph: {
    title: "Utkarsh Joshi - Technical Projects & Systems Work",
    description: "Cool technical projects. Fast code. GPU curiosity.",
    type: "website",
    locale: "en_US",
    url: "https://utkarshportfolio.com",
    siteName: "Utkarsh Joshi Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Utkarsh Joshi - Technical Projects Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Utkarsh Joshi - Technical Projects",
    description: "GPU computing, systems work, and cool technical projects.",
    creator: "@UtkarshJoshiNtl",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0f0f0f",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Utkarsh Joshi",
  url: "https://utkarshportfolio.com",
  jobTitle: "Software Engineer",
  description: "GPU computing, systems engineering, and performance optimization",
  sameAs: [
    "https://github.com/UtkarshJoshiNtl",
    "https://linkedin.com/in/utkarsh-joshi",
    "https://codeforces.com/profile/BakedRajma",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
