import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://haidarwf.vercel.app"),
  applicationName: "Haidar Portfolio",
  title: {
    default: "Muhammad Haidar Rauf Prayogo — Network Engineer Portfolio",
    template: "%s | Haidar Portfolio",
  },
  description: "Portfolio of Muhammad Haidar Rauf Prayogo, Network Engineer specializing in MikroTik, Cisco Topologies, and Security Hardening.",
  keywords: ["Network Engineer", "TKJ", "MikroTik", "MTCNA", "MTCRE", "Cisco", "OSPF", "EIGRP", "BGP", "VLAN", "Linux"],
  authors: [{ name: "Muhammad Haidar Rauf Prayogo" }],
  creator: "Muhammad Haidar Rauf Prayogo",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://haidarwf.vercel.app",
    title: "Muhammad Haidar Rauf Prayogo — Network Engineer",
    description: "Portfolio of Muhammad Haidar Rauf Prayogo, Network Engineer specializing in MikroTik, Cisco Topologies, and Security Hardening.",
    siteName: "Haidar Portfolio",
    images: [
      {
        url: "/experience/haidarphoto.webp",
        width: 1200,
        height: 630,
        alt: "Muhammad Haidar Rauf Prayogo — Network Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Haidar Rauf Prayogo — Network Engineer",
    description: "Portfolio of Muhammad Haidar Rauf Prayogo, Network Engineer specializing in MikroTik, Cisco Topologies, and Security Hardening.",
    images: ["/experience/haidarphoto.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "Yt9g-sAkOHGZYo2YeLQogZkOl-FMSxcYvdIkqcB6aos",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://haidarwf.vercel.app/#website",
        url: "https://haidarwf.vercel.app",
        name: "Haidar Portfolio",
        alternateName: ["Haidar Rauf Portfolio", "Muhammad Haidar Rauf Prayogo"],
      },
      {
        "@type": "Person",
        "@id": "https://haidarwf.vercel.app/#person",
        name: "Muhammad Haidar Rauf Prayogo",
        jobTitle: "Network Engineer",
        url: "https://haidarwf.vercel.app",
        sameAs: [
          "https://github.com/haidirwf",
          "https://www.linkedin.com/in/haidar-rauf/",
        ],
        knowsAbout: [
          "MikroTik",
          "MTCNA",
          "MTCRE",
          "Cisco Packet Tracer",
          "OSPF",
          "EIGRP",
          "BGP",
          "VLAN",
          "IPSec VPN",
          "Linux",
        ],
      },
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
