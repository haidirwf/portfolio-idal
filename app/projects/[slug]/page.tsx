import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/projects";
import { MainWrapper } from "@/components/portfolio/main-wrapper";
import { ProjectDetailContent } from "@/components/portfolio/project-detail-content";

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  // Optimized titles targeted for search engines (ranking #1 for each configuration keyword)
  const seoConfigMap: Record<string, { title: string; descId: string; keywords: string[] }> = {
    "standard-acl-access-control": {
      title: "Konfigurasi Standard ACL Cisco Packet Tracer — Tutorial Lengkap & Skrip Lab",
      descId: "Panduan tutorial langkah-demi-langkah konfigurasi Standard ACL (Access Control List 1-99) pada Cisco Packet Tracer & router IOS. Dilengkapi tabel IP, CLI commands, dan uji verifikasi ping.",
      keywords: ["Konfigurasi ACL", "Konfigurasi Standard ACL", "Cara setting ACL Cisco", "Standard ACL Cisco Packet Tracer", "Access Control List Tutorial", "Filter Server Access ACL"],
    },
    "enterprise-vlan-inter-vlan-routing": {
      title: "Konfigurasi Enterprise Inter-VLAN & Hybrid OSPF EIGRP — Tutorial Cisco Packet Tracer",
      descId: "Panduan konfigurasi jaringan enterprise lengkap: Router-on-a-Stick 802.1Q VLAN /28, DHCP Pool, Mutual Route Redistribution OSPF 100 & EIGRP 10 pada Core Multilayer Switch 3560, GRE Tunnel, dan Extended ACL.",
      keywords: ["Konfigurasi VLAN", "Konfigurasi Inter-VLAN Routing", "Router on a stick cisco", "Redistribusi OSPF EIGRP", "Multilayer Switch 3560", "GRE Tunnel Cisco", "Extended ACL Cisco"],
    },
    "ospf-rip-route-redistribution": {
      title: "Konfigurasi Redistribusi Routing OSPF & RIPv2 Cisco IOS — Tutorial & Seed Metric",
      descId: "Tutorial lengkap cara konfigurasi mutual route redistribution OSPF dan RIPv2 pada router ASBR Cisco IOS. Penjelasan detail metric cost OSPF, hop count RIP, dan uji ping antar-domain.",
      keywords: ["Konfigurasi Redistribusi Routing", "Redistribute OSPF to RIP", "Redistribute RIP to OSPF", "Route redistribution Cisco", "Seed metric EIGRP OSPF RIP", "ASBR Router Cisco"],
    },
    "nat-overload-pat-public-gateway": {
      title: "Konfigurasi NAT Overload (PAT) Cisco Packet Tracer — Tutorial Gateway Internet",
      descId: "Panduan langkah-demi-langkah setting NAT Overload (Port Address Translation / PAT) pada Cisco IOS. Dilengkapi Standard ACL, ip nat inside outside, dan verifikasi show ip nat translations.",
      keywords: ["Konfigurasi NAT Overload", "Konfigurasi PAT Cisco", "Cara setting NAT Cisco Packet Tracer", "ip nat inside source list overload", "NAT Pool Gateway", "Translasi IP Privat ke Publik"],
    },
    "stp-pvst-loop-prevention": {
      title: "Konfigurasi Spanning Tree Protocol (STP PVST+) Cisco — Mencegah Switching Loop",
      descId: "Tutorial lengkap konfigurasi Spanning Tree Protocol (STP & PVST+) pada switch Cisco. Cara menentukan Root Bridge priority, memeriksa Root Port & Alternate Blocking port untuk mencegah broadcast storm.",
      keywords: ["Konfigurasi STP Cisco", "Konfigurasi Spanning Tree Protocol", "Setting PVST+ Cisco", "Cara menentukan Root Bridge", "Alternate Blocking Port STP", "Mencegah Broadcast Storm Layer 2"],
    },
  };

  const currentSeo = seoConfigMap[project.slug];
  const title = currentSeo ? currentSeo.title : `${project.title} — Network Topology & Lab Guide`;
  const description = currentSeo ? currentSeo.descId : `${project.descriptionEn} | ${project.descriptionId}`;
  const customKeywords = currentSeo ? currentSeo.keywords : [];

  return {
    title,
    description,
    keywords: [
      ...customKeywords,
      ...project.stack,
      ...project.tags,
      "Cisco Packet Tracer",
      "Cisco IOS CLI",
      "Network Engineering Lab",
    ],
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://haidarwf.vercel.app/projects/${project.slug}`,
      images: [
        {
          url: project.cover,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.cover],
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: project.title,
    description: project.descriptionId || project.descriptionEn,
    image: `https://haidarwf.vercel.app${project.cover}`,
    author: {
      "@type": "Person",
      name: "Muhammad Haidar Rauf Prayogo",
      url: "https://haidarwf.vercel.app",
    },
    publisher: {
      "@type": "Person",
      name: "Muhammad Haidar Rauf Prayogo",
    },
    inLanguage: ["id", "en"],
    keywords: [
      "Konfigurasi ACL",
      "Standard ACL",
      "Cisco Packet Tracer",
      "Access Control List",
      "Cisco IOS Configuration",
    ],
  };

  return (
    <MainWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetailContent slug={slug} />
    </MainWrapper>
  );
}
