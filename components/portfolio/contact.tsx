"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  Mail,
  GitBranch,
  Link2,
  Share2,
  Copy,
  Check,
  ArrowUpRight,
  Download,
  Phone,
  Router,
  Server,
  Cpu,
  Globe,
  Wifi,
  ShieldCheck,
  Layers,
  Terminal,
  Activity,
  Radio,
  Lock,
  Cable
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";

// Floating background icons pattern for Network Engineering theme in Contact section
const FLOATING_ICONS = [
  { Icon: Router, top: "12%", left: "6%", size: "size-5 sm:size-6" },
  { Icon: Server, top: "14%", right: "8%", size: "size-5 sm:size-6" },
  { Icon: Cpu, top: "35%", left: "10%", size: "size-4 sm:size-5" },
  { Icon: Globe, top: "40%", right: "12%", size: "size-5 sm:size-6" },
  { Icon: Wifi, top: "65%", left: "8%", size: "size-4 sm:size-5" },
  { Icon: ShieldCheck, top: "70%", right: "9%", size: "size-5 sm:size-6" },
  { Icon: Layers, top: "82%", left: "15%", size: "size-4 sm:size-5" },
  { Icon: Activity, top: "85%", right: "16%", size: "size-4 sm:size-5" },
  { Icon: Lock, top: "22%", left: "22%", size: "size-3.5 sm:size-4" },
  { Icon: Cable, top: "25%", right: "24%", size: "size-3.5 sm:size-4" },
  { Icon: Terminal, top: "78%", left: "28%", size: "size-4" },
  { Icon: Radio, top: "76%", right: "30%", size: "size-4" }
];

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
        <Card className="border-border/80 bg-card/60 rounded-xl p-6 sm:p-14 text-center space-y-6 sm:space-y-8 w-full shadow-xs relative overflow-hidden">
          {/* Background grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

          {/* Floating Subtle Network Icons (Hidden on mobile to keep card clean) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none hidden sm:block">
            {FLOATING_ICONS.map((item, idx) => {
              const IconComponent = item.Icon;
              return (
                <motion.div
                  key={idx}
                  className="absolute text-foreground/20 dark:text-foreground/15"
                  style={{
                    top: item.top,
                    left: item.left,
                    right: item.right
                  }}
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 4 + (idx % 3),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.2
                  }}
                >
                  <IconComponent className={item.size} />
                </motion.div>
              );
            })}
          </div>

          <div className="relative space-y-3 max-w-lg mx-auto">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground font-sans">
              {t("Mari Bekerja Sama.", "Let's build something together.")}
            </h2>
            <p className="text-xs sm:text-base font-sans text-muted-foreground">
              {t(
                "Open untuk proyek jaringan, konsultasi MikroTik/Cisco, dan pengerasan keamanan sistem.",
                "Open for network infrastructure projects, MikroTik/Cisco consulting, and network security hardening."
              )}
            </p>
          </div>

          <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 pt-2 w-full max-w-md mx-auto">
            <Button
              onClick={handleCopyEmail}
              variant="default"
              size="lg"
              className="rounded-full font-sans text-xs sm:text-sm px-6 gap-2 w-full sm:w-auto justify-center"
            >
              <Mail className="size-4" />
              <span className="truncate">{copiedEmail ? t("Email Tersalin!", "Email Copied!") : email}</span>
              {copiedEmail ? <Check className="size-3.5 text-emerald-400 shrink-0" /> : <Copy className="size-3.5 shrink-0" />}
            </Button>

            <Button
              onClick={handleCopyPhone}
              variant="outline"
              size="lg"
              className="rounded-full font-sans text-xs sm:text-sm px-6 gap-2 bg-background w-full sm:w-auto justify-center"
            >
              <Phone className="size-4" />
              <span className="truncate">{copiedPhone ? t("Nomor Tersalin!", "Phone Copied!") : phone}</span>
              {copiedPhone ? <Check className="size-3.5 text-emerald-400 shrink-0" /> : <Copy className="size-3.5 shrink-0" />}
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
