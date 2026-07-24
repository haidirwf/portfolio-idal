import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/projects";
import { MainWrapper } from "@/components/portfolio/main-wrapper";
import { ProjectDetailContent } from "@/components/portfolio/project-detail-content";

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} — Topologi Showcase`,
    description: project.descriptionEn,
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
