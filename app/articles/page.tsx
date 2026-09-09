import { Metadata } from "next";
import { Suspense } from "react";
import { MainWrapper } from "@/components/portfolio/main-wrapper";
import { AllAchievementsContent } from "@/components/portfolio/all-achievements-content";

export const metadata: Metadata = {
  title: "Artikel & Catatan Dokumentasi",
  description: "Arsip dokumentasi kegiatan, kompetisi, dan catatan perjalanan oleh Muhammad Haidar Rauf Prayogo.",
};

export default function ArticlesPage() {
  return (
    <MainWrapper>
      <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-xs font-mono text-muted-foreground">Loading articles...</div>}>
        <AllAchievementsContent />
      </Suspense>
    </MainWrapper>
  );
}
