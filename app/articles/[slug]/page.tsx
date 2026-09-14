import { Metadata } from "next";
import { notFound } from "next/navigation";
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

  const title = `${item.titleId} — Muhammad Haidar Rauf Prayogo`;
  const description = item.descriptionId || item.descriptionEn;

  return {
    title,
    description,
    keywords: [
      ...item.tags,
      item.organization,
      "Dokumentasi Kegiatan",
      "Muhammad Haidar Rauf Prayogo",
      "Haidar Rauf",
    ],
    alternates: {
      canonical: `https://haidarwf.vercel.app/articles/${item.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://haidarwf.vercel.app/articles/${item.slug}`,
      images: [
        {
          url: item.cover,
          alt: item.titleId,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [item.cover],
    },
  };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getAchievementBySlug(slug);
  if (!item) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.titleId,
    description: item.descriptionId || item.descriptionEn,
    image: `https://haidarwf.vercel.app${item.cover}`,
    author: {
      "@type": "Person",
      name: "Muhammad Haidar Rauf Prayogo",
      url: "https://haidarwf.vercel.app",
    },
    publisher: {
      "@type": "Person",
      name: "Muhammad Haidar Rauf Prayogo",
    },
    inLanguage: ["id-ID", "en-US"],
    keywords: item.tags.join(", "),
    mainEntityOfPage: `https://haidarwf.vercel.app/articles/${item.slug}`,
  };

  return (
    <MainWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AchievementDetailContent slug={slug} />
    </MainWrapper>
  );
}
