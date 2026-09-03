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
      title: "Article Not Found",
    };
  }

  return {
    title: item.titleEn,
    description: item.descriptionEn,
    openGraph: {
      title: `${item.titleEn} — Muhammad Haidar Rauf Prayogo`,
      description: item.descriptionEn,
      type: "article",
      url: `https://haidarwf.vercel.app/achievements/${item.slug}`,
      images: [
        {
          url: item.cover,
          alt: item.titleEn,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.titleEn} — Muhammad Haidar Rauf Prayogo`,
      description: item.descriptionEn,
      images: [item.cover],
    },
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
