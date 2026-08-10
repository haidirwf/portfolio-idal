"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem
} from "@/components/ui/command";
import { PROJECTS } from "@/lib/projects";
import { Folder, User, Briefcase, Mail, Cpu, ExternalLink } from "lucide-react";

import { useLanguage } from "@/components/language-provider";

export function CommandPalette({
  open,
  setOpen
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const router = useRouter();
  const { t } = useLanguage();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder={t("Ketik perintah atau cari topologi...", "Type a command or search project...")} className="font-mono text-xs" />
      <CommandList className="font-mono text-xs">
        <CommandEmpty>{t("Tidak ada hasil ditemukan.", "No results found.")}</CommandEmpty>

        <CommandGroup heading={t("Navigasi", "Navigation")}>
          <CommandItem onSelect={() => runCommand(() => router.push("/#projects"))}>
            <Folder className="mr-2 size-3.5" />
            <span>{t("Topologi & Proyek", "Projects & Topologies")}</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/#about"))}>
            <User className="mr-2 size-3.5" />
            <span>{t("Tentang Saya", "About Me")}</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/#experience"))}>
            <Briefcase className="mr-2 size-3.5" />
            <span>{t("Pengalaman", "Experience")}</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/#tech-stack"))}>
            <Cpu className="mr-2 size-3.5" />
            <span>Tech Stack</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/#contact"))}>
            <Mail className="mr-2 size-3.5" />
            <span>Contact</span>
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Projects">
          {PROJECTS.map((project) => (
            <CommandItem
              key={project.slug}
              onSelect={() => runCommand(() => router.push(`/projects/${project.slug}`))}
            >
              <ExternalLink className="mr-2 size-3.5 text-muted-foreground" />
              <span>{project.title}</span>
              <span className="ml-auto text-[10px] text-muted-foreground">{project.stack[0]}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
