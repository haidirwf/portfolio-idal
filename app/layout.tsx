import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://haidar-rauf.dev"),
  title: {
    default: "Haidar Portfolio",
    template: "%s | Haidar Portfolio",
  },
  description: "Portfolio of Muhammad Haidar Rauf Prayogo, Network Engineer specializing in MikroTik, Cisco Topologies, and Security Hardening.",
  keywords: ["Network Engineer", "TKJ", "MikroTik", "MTCNA", "MTCRE", "Cisco", "OSPF", "EIGRP", "BGP", "VLAN", "Linux"],
  authors: [{ name: "Muhammad Haidar Rauf Prayogo" }],
  creator: "Muhammad Haidar Rauf Prayogo",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://haidar-rauf.dev",
    title: "Muhammad Haidar Rauf Prayogo — Network Engineer",
    description: "Portfolio of Muhammad Haidar Rauf Prayogo, Network Engineer specializing in MikroTik, Cisco Topologies, and Security Hardening.",
    siteName: "Haidar Rauf Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Haidar Rauf Prayogo — Network Engineer",
    description: "Portfolio of Muhammad Haidar Rauf Prayogo, Network Engineer specializing in MikroTik, Cisco Topologies, and Security Hardening.",
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
    name: "Muhammad Haidar Rauf Prayogo",
    jobTitle: "Network Engineer",
    url: "https://haidar-rauf.dev",
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
