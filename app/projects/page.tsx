import { Metadata } from "next";
import { MainWrapper } from "@/components/portfolio/main-wrapper";
import { AllProjectsContent } from "@/components/portfolio/all-projects-content";

export const metadata: Metadata = {
  title: "Proyek & Lab Jaringan Komputer",
  description: "Arsip lengkap topologi jaringan enterprise, simulasi Cisco Packet Tracer, dan konfigurasi MikroTik oleh Muhammad Haidar Rauf Prayogo.",
  alternates: {
    canonical: "https://haidarwf.vercel.app/projects",
  },
  openGraph: {
    title: "Proyek & Lab Jaringan Komputer — Muhammad Haidar Rauf Prayogo",
    description: "Arsip lengkap topologi jaringan enterprise, simulasi Cisco Packet Tracer, dan konfigurasi MikroTik oleh Muhammad Haidar Rauf Prayogo.",
    type: "website",
    url: "https://haidarwf.vercel.app/projects",
    images: [
      {
        url: "/haidarphoto.webp",
        width: 1200,
        height: 630,
        alt: "Proyek Jaringan Komputer Muhammad Haidar Rauf Prayogo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Proyek & Lab Jaringan Komputer — Muhammad Haidar Rauf Prayogo",
    description: "Arsip lengkap topologi jaringan enterprise, simulasi Cisco Packet Tracer, dan konfigurasi MikroTik.",
    images: ["/haidarphoto.webp"],
  },
};

export default function AllProjectsPage() {
  return (
    <MainWrapper>
      <AllProjectsContent />
    </MainWrapper>
  );
}
