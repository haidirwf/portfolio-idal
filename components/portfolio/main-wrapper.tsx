"use client";

import * as React from "react";
import { Navbar } from "@/components/portfolio/navbar";
import { Footer } from "@/components/portfolio/footer";
import { CommandPalette } from "@/components/portfolio/command-palette";
import { Project } from "@/lib/projects";

export function MainWrapper({
  children,
  projects
}: {
  children: React.ReactNode;
  projects?: Project[];
}) {
  const [cmdOpen, setCmdOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background font-sans antialiased border-x border-dashed border-border/60 max-w-6xl mx-auto">
      <Navbar onOpenCommand={() => setCmdOpen(true)} />
      <main>{children}</main>
      <Footer />
      <CommandPalette open={cmdOpen} setOpen={setCmdOpen} />
    </div>
  );
}
