"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Mail, GitBranch, Link2, Share2, Copy, Check, ArrowUpRight, Download } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

export function Contact() {
  const [copied, setCopied] = React.useState(false);
  const email = "alex.rivera.engineering@example.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.85 }
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    { name: "GitHub", href: "https://github.com", icon: GitBranch },
    { name: "LinkedIn", href: "https://linkedin.com", icon: Link2 },
    { name: "Instagram", href: "https://instagram.com", icon: Share2 }
  ];

  return (
    <section id="contact" className="py-16 max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
      <h2 className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
        Contact
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-border bg-card/40 p-8 sm:p-12 text-center space-y-6">
          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight">
              Let's build something together.
            </h3>
            <p className="text-sm font-mono text-muted-foreground">
              Open for engineering leadership, systems architecture, and high-impact full-stack contracts.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              onClick={handleCopyEmail}
              variant="default"
              size="default"
              className="font-mono text-xs gap-2 min-w-[240px]"
            >
              <Mail className="size-4" />
              <span>{copied ? "Copied to Clipboard!" : email}</span>
              {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
            </Button>

            <a
              href="/resume.pdf"
              target="_blank"
              download
              className={cn(buttonVariants({ variant: "outline", size: "default" }), "font-mono text-xs gap-2")}
            >
              <Download className="size-4" />
              <span>Download CV</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-4 pt-6 border-t border-border/40">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon className="size-4" />
                  <span>{social.name}</span>
                  <ArrowUpRight className="size-3" />
                </a>
              );
            })}
          </div>
        </Card>
      </motion.div>
    </section>
  );
}
