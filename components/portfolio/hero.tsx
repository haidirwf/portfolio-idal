"use client";

import { motion } from "motion/react";
import { ArrowDown, Mail, ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="pt-24 pb-8 max-w-6xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Card className="overflow-hidden border-border bg-card/50 p-6 sm:p-10 hover:bg-card transition-all duration-300">
          <div className="space-y-5 max-w-3xl">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground font-sans">
                Alex Rivera
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground font-medium font-sans leading-relaxed">
                Systems & Full-Stack Engineer crafting distributed tools & low-latency cloud architectures.
              </p>
            </div>

            <p className="text-sm text-muted-foreground/80 font-sans max-w-2xl leading-relaxed">
              Show the work first. Explain later. Clean engineering, zero bloat.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className={cn(buttonVariants({ variant: "default", size: "default" }), "font-sans text-xs gap-2")}
              >
                <span>View Projects</span>
                <ArrowDown className="size-3.5" />
              </a>

              <a
                href="#contact"
                className={cn(buttonVariants({ variant: "outline", size: "default" }), "font-sans text-xs gap-2")}
              >
                <Mail className="size-3.5" />
                <span>Contact</span>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "ghost", size: "default" }), "font-sans text-xs gap-1.5 text-muted-foreground")}
              >
                <span>GitHub</span>
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}
