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

export function CommandPalette({
  open,
  setOpen
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const router = useRouter();

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
      <CommandInput placeholder="Type a command or search project..." className="font-mono text-xs" />
      <CommandList className="font-mono text-xs">
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => router.push("/#projects"))}>
            <Folder className="mr-2 size-3.5" />
            <span>Projects</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/#about"))}>
            <User className="mr-2 size-3.5" />
            <span>About</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/#experience"))}>
            <Briefcase className="mr-2 size-3.5" />
            <span>Experience</span>
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
