import { Metadata } from "next";
import { MainWrapper } from "@/components/portfolio/main-wrapper";
import { AllProjectsContent } from "@/components/portfolio/all-projects-content";

export const metadata: Metadata = {
  title: "Semua Proyek Jaringan — Network Topologies Showcase",
  description: "Daftar lengkap topologi jaringan enterprise, simulasi Cisco Packet Tracer, dan manajemen edge MikroTik oleh Muhammad Haidar Rauf Prayogo.",
};

export default function AllProjectsPage() {
  return (
    <MainWrapper>
      <AllProjectsContent />
    </MainWrapper>
  );
}
