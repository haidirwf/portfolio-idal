import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug, getProjects } from "@/lib/projects";
import { MainWrapper } from "@/components/portfolio/main-wrapper";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowLeft, GitBranch, ExternalLink, Cpu, AlertTriangle, CheckCircle2, Award } from "lucide-react";

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} — Project Showcase`,
    description: project.description,
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
      <div className="py-20 max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Navigation back */}
        <div>
          <Link
            href="/#projects"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "font-mono text-xs gap-2")}
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Showcase</span>
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="font-mono text-xs">
              {project.year}
            </Badge>
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-mono text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-sans tracking-tight">
            {project.title}
          </h1>

          <p className="text-lg text-muted-foreground font-sans max-w-3xl leading-relaxed">
            {project.description}
          </p>

          <div className="flex items-center gap-3 pt-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "default", size: "sm" }), "font-mono text-xs gap-2")}
              >
                <GitBranch className="size-4" />
                <span>GitHub Repository</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "font-mono text-xs gap-2")}
              >
                <ExternalLink className="size-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-border bg-secondary/30 shadow-lg">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Tech Stack Bar */}
        <Card className="p-6 border-border bg-card/40 space-y-3">
          <h3 className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
            Tech Stack & Tooling
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="px-2.5 py-1 rounded-md font-mono text-xs bg-muted text-foreground border border-border/50"
              >
                {item}
              </span>
            ))}
          </div>
        </Card>

        {/* Breakdown: Overview, Problem, Solution */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border-border bg-card/30 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase">
              <Cpu className="size-4 text-primary" />
              <span>Overview</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {project.overview}
            </p>
          </Card>

          <Card className="p-6 border-border bg-card/30 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase">
              <AlertTriangle className="size-4 text-amber-500" />
              <span>The Problem</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {project.problem}
            </p>
          </Card>

          <Card className="p-6 border-border bg-card/30 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase">
              <CheckCircle2 className="size-4 text-emerald-500" />
              <span>The Solution</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {project.solution}
            </p>
          </Card>
        </div>

        {/* System Architecture & Results */}
        {(project.architecture || project.result) && (
          <div className="space-y-6 pt-4">
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.architecture && (
                <div className="space-y-2">
                  <h3 className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
                    Architecture
                  </h3>
                  <p className="text-sm font-mono text-foreground/90 bg-muted/30 p-4 rounded-lg border border-border/40 leading-relaxed">
                    {project.architecture}
                  </p>
                </div>
              )}

              {project.result && (
                <div className="space-y-2">
                  <h3 className="text-xs font-mono tracking-widest text-muted-foreground uppercase flex items-center gap-2">
                    <Award className="size-3.5 text-primary" />
                    <span>Quantified Result</span>
                  </h3>
                  <p className="text-sm font-mono text-foreground/90 bg-muted/30 p-4 rounded-lg border border-border/40 leading-relaxed">
                    {project.result}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="space-y-4 pt-4">
            <h3 className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
              Project Blueprint & System Visuals
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.gallery.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-video rounded-lg overflow-hidden border border-border/60 bg-secondary/20"
                >
                  <Image src={img} alt={`${project.title} visual ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainWrapper>
  );
}
