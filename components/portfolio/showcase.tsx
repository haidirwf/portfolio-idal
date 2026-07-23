"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { GitBranch, ExternalLink } from "lucide-react";
import { Project } from "@/lib/projects";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

export function Showcase({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-12 max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
      <h2 className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
        Projects
      </h2>

      {/* Responsive Grid: Desktop 3 col, Tablet 2 col, Mobile 1 col */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
          >
            <Card className="h-full flex flex-col justify-between overflow-hidden border-border bg-card/40 hover:bg-card hover:-translate-y-1 hover:shadow-lg transition-all duration-250 group">
              <div className="space-y-4 p-5">
                <div className="relative aspect-video rounded-md bg-secondary/30 overflow-hidden">
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                    <span>{project.year}</span>
                    <div className="flex gap-1">
                      {project.tags.slice(0, 2).map((t) => (
                        <span key={t}>#{t.toLowerCase()}</span>
                      ))}
                    </div>
                  </div>

                  <CardTitle className="text-lg font-bold font-sans tracking-tight">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="hover:underline flex items-center justify-between group-hover:text-primary transition-colors"
                    >
                      <span>{project.title}</span>
                    </Link>
                  </CardTitle>

                  <CardDescription className="text-xs text-muted-foreground line-clamp-2">
                    {project.description}
                  </CardDescription>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-4">
                <div className="flex flex-wrap gap-1">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-muted/60 text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border/40 text-xs font-mono">
                  <div className="flex items-center gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                      >
                        <GitBranch className="size-3.5" />
                        <span>Code</span>
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                      >
                        <ExternalLink className="size-3.5" />
                        <span>Demo</span>
                      </a>
                    )}
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Read →
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
