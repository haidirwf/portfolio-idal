import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/projects";
import { MainWrapper } from "@/components/portfolio/main-wrapper";
import { ProjectDetailContent } from "@/components/portfolio/project-detail-content";

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

// Optimized titles & rich search keywords targeted for search engines (ranking #1 for each configuration keyword)
const SEO_CONFIG_MAP: Record<string, { title: string; descId: string; keywords: string[] }> = {
  "standard-acl-access-control": {
    title: "Konfigurasi Standard ACL Cisco Packet Tracer — Tutorial Lengkap & Skrip Lab",
    descId: "Panduan tutorial langkah-demi-langkah konfigurasi Standard ACL (Access Control List 1-99) pada Cisco Packet Tracer & router IOS. Dilengkapi tabel IP, CLI commands, dan uji verifikasi ping.",
    keywords: [
      "konfigurasi acl",
      "konfigurasi standard acl",
      "konfigurasi acl cisco",
      "cara konfigurasi acl di cisco packet tracer",
      "konfigurasi access control list",
      "standard acl cisco packet tracer",
      "access control list tutorial cisco",
      "filter server access acl",
      "cara setting acl cisco",
      "network security acl cisco",
    ],
  },
  "enterprise-vlan-inter-vlan-routing": {
    title: "Konfigurasi EIGRP, OSPF & Inter-VLAN Enterprise — Tutorial Cisco Packet Tracer",
    descId: "Panduan konfigurasi jaringan enterprise lengkap: Konfigurasi EIGRP 10 & OSPF 100, Route Redistribution Multilayer Switch 3560, Router-on-a-Stick 802.1Q VLAN /28, DHCP Pool, GRE Tunnel, dan Extended ACL.",
    keywords: [
      "konfigurasi eigrp",
      "konfigurasi routing eigrp",
      "konfigurasi eigrp cisco",
      "cara konfigurasi eigrp cisco packet tracer",
      "konfigurasi vlan",
      "konfigurasi inter-vlan routing",
      "konfigurasi router on a stick",
      "konfigurasi redistribusi routing eigrp ospf",
      "redistribusi ospf eigrp multilayer switch",
      "konfigurasi gre tunnel cisco",
      "konfigurasi extended acl cisco",
      "cisco switch 3560 routing configuration",
    ],
  },
  "ospf-rip-route-redistribution": {
    title: "Konfigurasi OSPF & Redistribusi RIPv2 Cisco IOS — Tutorial & Seed Metric",
    descId: "Tutorial lengkap cara konfigurasi routing OSPF dan RIPv2 serta mutual route redistribution pada router ASBR Cisco IOS. Penjelasan detail metric cost OSPF, hop count RIP, dan uji ping antar-domain.",
    keywords: [
      "konfigurasi ospf",
      "konfigurasi routing ospf",
      "konfigurasi rip",
      "konfigurasi redistribusi routing",
      "redistribute ospf to rip",
      "redistribute rip to ospf",
      "cara konfigurasi ospf cisco packet tracer",
      "route redistribution cisco",
      "seed metric eigrp ospf rip",
      "asbr router cisco configuration",
    ],
  },
  "nat-overload-pat-public-gateway": {
    title: "Konfigurasi NAT Overload (PAT) Cisco Packet Tracer — Tutorial Gateway Internet",
    descId: "Panduan langkah-demi-langkah setting NAT Overload (Port Address Translation / PAT) pada Cisco IOS. Dilengkapi Standard ACL, ip nat inside outside, dan verifikasi show ip nat translations.",
    keywords: [
      "konfigurasi nat",
      "konfigurasi nat overload",
      "konfigurasi pat cisco",
      "cara setting nat di cisco packet tracer",
      "cara konfigurasi nat overload cisco",
      "ip nat inside source list overload",
      "nat pool gateway cisco",
      "translasi ip privat ke publik pat",
      "port address translation cisco tutorial",
    ],
  },
  "stp-pvst-loop-prevention": {
    title: "Konfigurasi Spanning Tree Protocol (STP & PVST+) Cisco — Mencegah Switching Loop",
    descId: "Tutorial lengkap konfigurasi Spanning Tree Protocol (STP & PVST+) pada switch Cisco. Cara menentukan Root Bridge priority, memeriksa Root Port & Alternate Blocking port untuk mencegah broadcast storm.",
    keywords: [
      "konfigurasi stp",
      "konfigurasi stp cisco",
      "konfigurasi spanning tree protocol",
      "setting pvst+ cisco switch",
      "cara menentukan root bridge stp",
      "alternate blocking port stp",
      "mencegah broadcast storm layer 2",
      "cisco spanning tree priority configuration",
      "spanning-tree vlan priority",
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  const currentSeo = SEO_CONFIG_MAP[project.slug];
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

  const currentSeo = SEO_CONFIG_MAP[project.slug];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: currentSeo ? currentSeo.title : project.title,
    description: currentSeo ? currentSeo.descId : project.descriptionId || project.descriptionEn,
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
    inLanguage: ["id-ID", "en-US"],
    proficiencyLevel: "Beginner to Advanced Network Engineering",
    keywords: currentSeo ? currentSeo.keywords.join(", ") : project.stack.join(", "),
    mainEntityOfPage: `https://haidarwf.vercel.app/projects/${project.slug}`,
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
