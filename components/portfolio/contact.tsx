"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Mail, GitBranch, Link2, Share2, Copy, Check, ArrowUpRight, Download, Phone } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";

export function Contact() {
  const { t } = useLanguage();
  const [copiedEmail, setCopiedEmail] = React.useState(false);
  const [copiedPhone, setCopiedPhone] = React.useState(false);

  const email = "raufidnn@gmail.com";
  const phone = "+6282173662010";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/haidirwf", icon: GitBranch },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/haidar-rauf/", icon: Link2 },
    { name: "Instagram", href: "https://instagram.com/haidarwf", icon: Share2 }
  ];

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-border/80 bg-card/60 rounded-3xl p-8 sm:p-14 text-center space-y-8 w-full shadow-xs relative overflow-hidden">
          {/* Background grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

          <div className="relative space-y-3 max-w-lg mx-auto">
            <h2 className="text-3xl sm:text-5xl font-extrabold font-sans tracking-tight">
              {t("Mari Bekerja Sama.", "Let's build something together.")}
            </h2>
            <p className="text-sm sm:text-base font-sans text-muted-foreground">
              {t(
                "Open untuk proyek jaringan, konsultasi MikroTik/Cisco, dan pengerasan keamanan sistem.",
                "Open for network infrastructure projects, MikroTik/Cisco consulting, and network security hardening."
              )}
            </p>
          </div>

          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              onClick={handleCopyEmail}
              variant="default"
              size="lg"
              className="rounded-full font-sans text-xs sm:text-sm px-6 gap-2"
            >
              <Mail className="size-4" />
              <span>{copiedEmail ? t("Email Tersalin!", "Email Copied!") : email}</span>
              {copiedEmail ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
            </Button>

            <Button
              onClick={handleCopyPhone}
              variant="outline"
              size="lg"
              className="rounded-full font-sans text-xs sm:text-sm px-6 gap-2 bg-background"
            >
              <Phone className="size-4" />
              <span>{copiedPhone ? t("Nomor Tersalin!", "Phone Copied!") : phone}</span>
              {copiedPhone ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
            </Button>
          </div>

          <div className="relative flex items-center justify-center gap-6 pt-6 border-t border-border/40">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-sans font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon className="size-4" />
                  <span>{social.name}</span>
                  <ArrowUpRight className="size-3.5" />
                </a>
              );
            })}
          </div>
        </Card>
      </motion.div>
    </section>
  );
}
