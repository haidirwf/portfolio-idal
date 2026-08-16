import { Metadata } from "next";
import { MainWrapper } from "@/components/portfolio/main-wrapper";
import { AllProjectsContent } from "@/components/portfolio/all-projects-content";

export const metadata: Metadata = {
  title: "All Network Projects — Topologies & Labs",
  description: "Comprehensive portfolio of enterprise network topologies, Cisco Packet Tracer simulations, and MikroTik edge management by Muhammad Haidar Rauf Prayogo.",
};

export default function AllProjectsPage() {
  return (
    <MainWrapper>
      <AllProjectsContent />
    </MainWrapper>
  );
}
