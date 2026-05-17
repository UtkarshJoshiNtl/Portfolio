import "../src/styles.css";

export const metadata = {
  title: "Utkarsh Joshi — Systems Engineer",
  description:
    "First-year CS undergraduate building high-performance systems from first principles. Orbital mechanics, CUDA, C++.",
  openGraph: {
    title: "Utkarsh Joshi — Systems Engineer",
    description:
      "First-year CS undergraduate building high-performance systems from first principles. Orbital mechanics, CUDA, C++.",
    type: "website",
  },
  twitter: {
    card: "summary",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
