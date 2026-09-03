import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/projects";
import { MainWrapper } from "@/components/portfolio/main-wrapper";
import { ProjectDetailContent } from "@/components/portfolio/project-detail-content";

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

// Optimized titles (<= 55 chars) & rich search keywords targeted for search engines
const SEO_CONFIG_MAP: Record<string, { title: string; descId: string; keywords: string[] }> = {
  "standard-acl-access-control": {
    title: "Konfigurasi Standard ACL Cisco Packet Tracer",
    descId: "Tutorial langkah-demi-langkah konfigurasi Standard Access Control List (ACL 1-99) Cisco Packet Tracer & router IOS lengkap skrip CLI dan uji ping.",
    keywords: [
      "konfigurasi acl",
      "konfigurasi standard acl",
      "konfigurasi acl cisco",
      "cara konfigurasi acl di cisco packet tracer",
      "standard acl cisco packet tracer",
      "network security acl cisco",
    ],
  },
  "enterprise-vlan-inter-vlan-routing": {
    title: "Konfigurasi EIGRP, OSPF & Inter-VLAN Enterprise",
    descId: "Panduan konfigurasi routing enterprise: EIGRP 10, OSPF 100, Route Redistribution Switch 3560, Router-on-a-Stick VLAN, dan ACL Cisco Packet Tracer.",
    keywords: [
      "konfigurasi eigrp",
      "konfigurasi routing eigrp",
      "konfigurasi eigrp cisco",
      "konfigurasi vlan",
      "konfigurasi inter-vlan routing",
      "konfigurasi router on a stick",
      "redistribusi ospf eigrp multilayer switch",
    ],
  },
  "ospf-rip-route-redistribution": {
    title: "Konfigurasi OSPF & Redistribusi RIPv2 Cisco IOS",
    descId: "Tutorial lengkap konfigurasi routing OSPF, RIPv2, dan mutual route redistribution router ASBR Cisco IOS beserta penjelasan seed metric dan verifikasi.",
    keywords: [
      "konfigurasi ospf",
      "konfigurasi routing ospf",
      "konfigurasi rip",
      "konfigurasi redistribusi routing",
      "redistribute ospf to rip",
      "asbr router cisco configuration",
    ],
  },
  "nat-overload-pat-public-gateway": {
    title: "Konfigurasi NAT Overload PAT Cisco Packet Tracer",
    descId: "Panduan setting NAT Overload (Port Address Translation / PAT) Cisco IOS. Konfigurasi Standard ACL, ip nat inside outside, dan verifikasi translasi IP.",
    keywords: [
      "konfigurasi nat",
      "konfigurasi nat overload",
      "konfigurasi pat cisco",
      "cara setting nat di cisco packet tracer",
      "ip nat inside source list overload",
      "port address translation cisco tutorial",
    ],
  },
  "stp-pvst-loop-prevention": {
    title: "Konfigurasi Spanning Tree Protocol STP Cisco",
    descId: "Tutorial konfigurasi Spanning Tree Protocol (STP & PVST+) switch Cisco: setting Root Bridge priority, Root Port, dan Alternate Blocking port anti-loop.",
    keywords: [
      "konfigurasi stp",
      "konfigurasi stp cisco",
      "konfigurasi spanning tree protocol",
      "setting pvst+ cisco switch",
      "cara menentukan root bridge stp",
      "alternate blocking port stp",
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
