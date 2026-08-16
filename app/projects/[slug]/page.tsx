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

  return {
    title: `${project.title} — Network Topology`,
    description: project.descriptionEn,
    openGraph: {
      title: `${project.title} — Network Topology Showcase`,
      description: project.descriptionEn,
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
      title: `${project.title} — Network Topology Showcase`,
      description: project.descriptionEn,
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

  return (
    <MainWrapper>
      <ProjectDetailContent slug={slug} />
    </MainWrapper>
  );
}
