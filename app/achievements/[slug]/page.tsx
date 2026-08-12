import { Metadata } from "next";
import { getAchievements, getAchievementBySlug } from "@/lib/achievements";
import { MainWrapper } from "@/components/portfolio/main-wrapper";
import { AchievementDetailContent } from "@/components/portfolio/achievement-detail-content";

export async function generateStaticParams() {
  const achievements = getAchievements();
  return achievements.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getAchievementBySlug(slug);
  if (!item) {
    return {
      title: "Artikel Tidak Ditemukan",
    };
  }

  return {
    title: `${item.titleEn} — Artikel & Pencapaian`,
    description: item.descriptionEn,
  };
}

export default async function AchievementDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <MainWrapper>
      <AchievementDetailContent slug={slug} />
    </MainWrapper>
  );
}
