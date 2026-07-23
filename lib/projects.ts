export interface Project {
  title: string;
  slug: string;
  description: string;
  overview: string;
  problem: string;
  solution: string;
  cover: string;
  gallery: string[];
  year: string;
  stack: string[];
  github: string;
  demo?: string;
  featured: boolean;
  tags: string[];
  architecture?: string;
  result?: string;
}

export const PROJECTS: Project[] = [
  {
    title: "Multi-Area OSPF Enterprise Topology",
    slug: "multi-area-ospf-enterprise",
    description: "Desain dan simulasi topologi jaringan skala besar dengan Multi-Area OSPF, Area 0 Backbone, dan Inter-VLAN Routing pada Cisco Packet Tracer.",
    overview: "Simulasi arsitektur jaringan enterprise yang memisahkan traffic jaringan ke dalam beberapa area OSPF (Area 0, Area 10, Area 20) untuk mengoptimalkan tabel routing dan mengurangi overhead LSDB (Link-State Database).",
    problem: "Jaringan skala besar tanpa pembagian area OSPF mengalami lonjakan pembengkakan tabel routing dan banjir LSA yang memperlambat pemrosesan router.",
    solution: "Mengimplementasikan pembagian OSPF Multi-Area, summarization subnet pada ABR (Area Border Router), serta otentikasi MD5 antar router.",
    cover: "/projects/aether-engine.svg",
    gallery: [
      "/projects/aether-engine.svg",
      "/projects/aether-engine-arch.svg"
    ],
    year: "2026",
    stack: ["Cisco Packet Tracer", "OSPFv2", "Inter-VLAN", "Mikrotik", "Cisco IOS"],
    github: "https://github.com/haidirwf/portfolio-idal",
    featured: true,
    tags: ["Networking", "Cisco", "OSPF"],
    architecture: "Core Switch Layer 3 -> ABR (Area Border Router) -> OSPF Area 0 Backbone -> Edge Access Switches & VLANs.",
    result: "Efisiensi tabel routing meningkat hingga 60% dan konvergensi jalur cadangan tercapai dalam waktu <1 detik."
  },
  {
    title: "EIGRP Dual-Stack & Route Redistribution",
    slug: "eigrp-dual-stack-redistribution",
    description: "Topologi EIGRP berperforma tinggi dengan redistribusi rute dinamis antara IPv4/IPv6 dan optimasi metric bandwidth.",
    overview: "Konfigurasi EIGRP Autonomous System (AS) 100 terintegrasi dengan kriteria DUAL algorithm untuk menyediakan rute bebas loop (Feasible Successor) secara instan.",
    problem: "Terjadinya downtime komunikasi antar cabang ketika link ISP utama terputus karena belum adanya sistem penentuan jalur cadangan otomatis.",
    solution: "Mengatur EIGRP K-values, redistribusi rute statis ke EIGRP, serta mengaktifkan EIGRP Named Mode untuk mendukung dual-stack IPv4/IPv6.",
    cover: "/projects/vortex-analytics.svg",
    gallery: [
      "/projects/vortex-analytics.svg"
    ],
    year: "2025",
    stack: ["Cisco Packet Tracer", "EIGRP", "IPv6 Dual-Stack", "Cisco IOS", "Mikrotik"],
    github: "https://github.com/haidirwf/portfolio-idal",
    featured: true,
    tags: ["Networking", "EIGRP", "Routing"],
    architecture: "AS 100 EIGRP Mesh Core -> Redistribution Border Router -> Dual-Stack IPv4/IPv6 Gateway.",
    result: "Failover otomatis tanpa drop paket saat simulasi link terputus (Zero packet loss during failover)."
  },
  {
    title: "Enterprise VLAN, STP & EtherChannel Bond",
    slug: "vlan-stp-etherchannel",
    description: "Perancangan switching jaringan enterprise menggunakan Rapid Spanning Tree (RSTP), LACP EtherChannel, dan VTP.",
    overview: "Infrastruktur Layer 2 terpadu yang memadukan penggabungan port EtherChannel (LACP) untuk meningkatkan agregasi bandwidth dan redundancy switch link.",
    problem: "Bottleneck bandwidth antar switch distribution dan risiko looping jaringan (broadcast storm) akibat keterbatasan port tunggal.",
    solution: "Konfigurasi Port-Channel 802.3ad (LACP), Per-VLAN Spanning Tree (PVST+), serta penerapan VTP Server/Client untuk kemudahan manajemen VLAN.",
    cover: "/projects/kubecraft.svg",
    gallery: [
      "/projects/kubecraft.svg"
    ],
    year: "2025",
    stack: ["Cisco Packet Tracer", "Switching", "VLAN", "STP", "EtherChannel"],
    github: "https://github.com/haidirwf/portfolio-idal",
    featured: false,
    tags: ["Switching", "L2 Infrastructure", "Cisco"],
    architecture: "Dual Distribution Switches (LACP Trunk) -> RSTP Root Bridge -> Access Switches (Port Security).",
    result: "Penggandaan kapasitas throughput antar-switch hingga 2Gbps dengan proteksi anti-looping 100% aktif."
  },
  {
    title: "Mikrotik RouterOS Edge Gateway & Firewall",
    slug: "mikrotik-edge-firewall",
    description: "Konfigurasi Mikrotik RouterOS untuk manajemen bandwidth Queues, NAT, MANGLE, dan IPSec VPN Site-to-Site.",
    overview: "Penerapan edge router Mikrotik untuk mengamankan jaringan internal, membatasi kecepatan bandwidth pengguna secara adil (PCQ Queue), serta menghubungkan 2 kantor cabang via VPN Tunnel.",
    problem: "Penggunaan internet yang tidak terkontrol oleh klien internal serta kerentanan lalu lintas data antar kantor cabang melalui jaringan publik.",
    solution: "Membangun firewall filter rules, NAT masquerade, Simple & Tree Queues dengan algoritma PCQ, serta enkripsi IPSec IKEv2.",
    cover: "/projects/hyperscale.svg",
    gallery: [
      "/projects/hyperscale.svg"
    ],
    year: "2024",
    stack: ["Mikrotik", "RouterOS", "Firewall", "IPSec", "Linux"],
    github: "https://github.com/haidirwf/portfolio-idal",
    featured: false,
    tags: ["Mikrotik", "Security", "Firewall"],
    architecture: "ISP Connection -> Mikrotik Gateway (Firewall + Mangle) -> IPSec Site-to-Site Tunnel -> Local LAN Switches.",
    result: "Pengaturan alokasi bandwidth merata untuk 100+ pengguna simultan dan koneksi antar cabang terenkripsi penuh."
  },
  {
    title: "BGP Autonomous System Inter-Domain Topology",
    slug: "bgp-inter-domain-topology",
    description: "Simulasi BGP (Border Gateway Protocol) eBGP dan iBGP antar Autonomous System (AS) ISP global pada Packet Tracer.",
    overview: "Desain jaringan routing tingkat ISP menggunakan BGP untuk pertukaran rute eksternal antar AS yang berbeda serta pengaturan BGP Local Preference & AS-Path Prepend.",
    problem: "Kesulitan dalam mengatur jalur lalu lintas internet utama dan cadangan (inbound/outbound traffic engineering) pada multi-homed ISP.",
    solution: "Mengonfigurasi peering eBGP antar AS, iBGP dengan Route Reflector di internal AS, serta manipulasi atribut BGP Path Selection.",
    cover: "/projects/pulse-monitoring.svg",
    gallery: [
      "/projects/pulse-monitoring.svg"
    ],
    year: "2024",
    stack: ["Cisco Packet Tracer", "BGP", "eBGP/iBGP", "Cisco IOS", "Networking"],
    github: "https://github.com/haidirwf/portfolio-idal",
    featured: false,
    tags: ["BGP", "ISP", "Routing"],
    architecture: "AS 100 (Primary ISP) <-> eBGP Peering <-> AS 200 (Enterprise Edge) -> iBGP Mesh -> Internal Core Routers.",
    result: "Kemampuan kontrol penuh terhadap traffic engineering kustom untuk jalur utama dan failover backup otomatis."
  }
];

export function getProjects(): Project[] {
  return PROJECTS;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
