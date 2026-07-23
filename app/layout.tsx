import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alexrivera.dev"),
  title: {
    default: "Alex Rivera — Systems & Full-Stack Engineer",
    template: "%s | Alex Rivera",
  },
  description: "Show the work first. Explain later. Portfolio of Alex Rivera, Systems & Full-Stack Engineer.",
  keywords: ["Software Engineer", "Systems", "Rust", "Next.js", "TypeScript", "Distributed Systems", "Full-Stack"],
  authors: [{ name: "Alex Rivera" }],
  creator: "Alex Rivera",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alexrivera.dev",
    title: "Alex Rivera — Systems & Full-Stack Engineer",
    description: "Show the work first. Explain later. High-performance software engineering showcase.",
    siteName: "Alex Rivera Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Rivera — Systems & Full-Stack Engineer",
    description: "Show the work first. Explain later. High-performance software engineering showcase.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Alex Rivera",
    jobTitle: "Systems & Full-Stack Engineer",
    url: "https://alexrivera.dev",
    sameAs: [
      "https://github.com",
      "https://linkedin.com",
    ],
    knowsAbout: [
      "Rust",
      "TypeScript",
      "Next.js",
      "Distributed Systems",
      "Kubernetes",
      "PostgreSQL",
      "Linux",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} antialiased min-h-screen bg-background text-foreground`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
