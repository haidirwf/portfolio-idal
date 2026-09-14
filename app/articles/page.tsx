import { Metadata } from "next";
import { Suspense } from "react";
import { MainWrapper } from "@/components/portfolio/main-wrapper";
import { AllAchievementsContent } from "@/components/portfolio/all-achievements-content";

export const metadata: Metadata = {
  title: "Artikel & Catatan Dokumentasi",
  description: "Arsip dokumentasi kegiatan, kompetisi, dan catatan perjalanan oleh Muhammad Haidar Rauf Prayogo.",
  alternates: {
    canonical: "https://haidarwf.vercel.app/articles",
  },
  openGraph: {
    title: "Artikel & Catatan Dokumentasi — Muhammad Haidar Rauf Prayogo",
    description: "Arsip dokumentasi kegiatan, kompetisi, dan catatan perjalanan oleh Muhammad Haidar Rauf Prayogo.",
    type: "website",
    url: "https://haidarwf.vercel.app/articles",
    images: [
      {
        url: "/haidarphoto.webp",
        width: 1200,
        height: 630,
        alt: "Artikel & Dokumentasi Muhammad Haidar Rauf Prayogo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Artikel & Catatan Dokumentasi — Muhammad Haidar Rauf Prayogo",
    description: "Arsip dokumentasi kegiatan, kompetisi, dan catatan perjalanan oleh Muhammad Haidar Rauf Prayogo.",
    images: ["/haidarphoto.webp"],
  },
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
