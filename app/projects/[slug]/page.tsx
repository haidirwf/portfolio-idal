import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/projects";
import { MainWrapper } from "@/components/portfolio/main-wrapper";
import { ProjectDetailContent } from "@/components/portfolio/project-detail-content";

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  const isAcl = project.slug === "standard-acl-access-control";
  const title = isAcl
    ? "Konfigurasi Standard ACL Cisco Packet Tracer — Tutorial Lengkap & Skrip Lab"
    : `${project.title} — Network Topology & Lab Guide`;

  const description = isAcl
    ? "Panduan tutorial langkah-demi-langkah konfigurasi Standard ACL (Access Control List 1-99) pada Cisco Packet Tracer & router IOS. Dilengkapi tabel IP, CLI commands, dan uji verifikasi ping."
    : `${project.descriptionEn} | ${project.descriptionId}`;

  return {
    title,
    description,
    keywords: [
      "Konfigurasi ACL",
      "Konfigurasi ACL Cisco",
      "Standard ACL Cisco Packet Tracer",
      "Access Control List Tutorial",
      "Cisco Packet Tracer Lab",
      "Filter Server Access ACL",
      "Cara setting ACL Cisco",
      "Network Security ACL",
      ...project.stack,
      ...project.tags,
    ],
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://haidarwf.vercel.app/projects/${project.slug}`,
      images: [
        {
          url: project.cover,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.cover],
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: project.title,
    description: project.descriptionId || project.descriptionEn,
    image: `https://haidarwf.vercel.app${project.cover}`,
    author: {
      "@type": "Person",
      name: "Muhammad Haidar Rauf Prayogo",
      url: "https://haidarwf.vercel.app",
    },
    publisher: {
      "@type": "Person",
      name: "Muhammad Haidar Rauf Prayogo",
    },
    inLanguage: ["id", "en"],
    keywords: [
      "Konfigurasi ACL",
      "Standard ACL",
      "Cisco Packet Tracer",
      "Access Control List",
      "Cisco IOS Configuration",
    ],
  };

  return (
    <MainWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetailContent slug={slug} />
    </MainWrapper>
  );
}
