import { Metadata } from "next";
import { MainWrapper } from "@/components/portfolio/main-wrapper";
import { AllProjectsContent } from "@/components/portfolio/all-projects-content";

export const metadata: Metadata = {
  title: "Proyek & Lab Jaringan Komputer",
  description: "Arsip lengkap topologi jaringan enterprise, simulasi Cisco Packet Tracer, dan konfigurasi MikroTik oleh Muhammad Haidar Rauf Prayogo.",
};

export default function AllProjectsPage() {
  return (
    <MainWrapper>
      <AllProjectsContent />
    </MainWrapper>
  );
}
