import { Metadata } from "next";
import { Suspense } from "react";
import { MainWrapper } from "@/components/portfolio/main-wrapper";
import { AllAchievementsContent } from "@/components/portfolio/all-achievements-content";

export const metadata: Metadata = {
  title: "Pencapaian & Artikel Kegiatan — Muhammad Haidar Rauf Prayogo",
  description: "Arsip lengkap pengalaman lomba jaringan komputer, posisi kepemimpinan OSIS, dan artikel ulasan kegiatan oleh Muhammad Haidar Rauf Prayogo.",
};

export default function AllAchievementsPage() {
  return (
    <MainWrapper>
      <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-xs font-mono text-muted-foreground">Loading achievements...</div>}>
        <AllAchievementsContent />
      </Suspense>
    </MainWrapper>
  );
}
