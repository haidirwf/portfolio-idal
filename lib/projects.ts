export interface Project {
  title: string;
  slug: string;
  descriptionId: string;
  descriptionEn: string;
  overviewId: string;
  overviewEn: string;
  problemId: string;
  problemEn: string;
  solutionId: string;
  solutionEn: string;
  cover: string;
  gallery: string[];
  year: string;
  stack: string[];
  github: string;
  demo?: string;
  featured: boolean;
  tags: string[];
  architectureId?: string;
  architectureEn?: string;
  resultId?: string;
  resultEn?: string;
}

export const PROJECTS: Project[] = [
  {
    title: "Multi-Area OSPF Enterprise Topology",
    slug: "multi-area-ospf-enterprise",
    descriptionId: "Desain dan simulasi topologi jaringan skala besar dengan Multi-Area OSPF, Area 0 Backbone, dan Inter-VLAN Routing pada Cisco Packet Tracer.",
    descriptionEn: "Design and simulation of large-scale enterprise network topology with Multi-Area OSPF, Area 0 Backbone, and Inter-VLAN Routing on Cisco Packet Tracer.",
    overviewId: "Simulasi arsitektur jaringan enterprise yang memisahkan traffic jaringan ke dalam beberapa area OSPF (Area 0, Area 10, Area 20) untuk mengoptimalkan tabel routing dan mengurangi overhead LSDB (Link-State Database).",
    overviewEn: "Enterprise network architecture simulation segmenting traffic into multiple OSPF areas (Area 0, Area 10, Area 20) to optimize routing tables and reduce LSDB overhead.",
    problemId: "Jaringan skala besar tanpa pembagian area OSPF mengalami lonjakan pembengkakan tabel routing dan banjir LSA yang memperlambat pemrosesan router.",
    problemEn: "Flat single-area networks suffer from bloated routing tables and LSA flooding that choke router CPU under topology changes.",
    solutionId: "Mengimplementasikan pembagian OSPF Multi-Area, summarization subnet pada ABR (Area Border Router), serta otentikasi MD5 antar router.",
    solutionEn: "Implemented Multi-Area OSPF, subnet summarization at ABRs, and MD5 router authentication for secure fast convergence.",
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
    architectureId: "Core Switch Layer 3 -> ABR (Area Border Router) -> OSPF Area 0 Backbone -> Edge Access Switches & VLANs.",
    architectureEn: "Layer 3 Core Switch -> ABR (Area Border Router) -> OSPF Area 0 Backbone -> Edge Access Switches & VLANs.",
    resultId: "Efisiensi tabel routing meningkat hingga 60% dan konvergensi jalur cadangan tercapai dalam waktu <1 detik.",
    resultEn: "Routing table efficiency improved by 60% with sub-second failover convergence time."
  },
  {
    title: "EIGRP Dual-Stack & Route Redistribution",
    slug: "eigrp-dual-stack-redistribution",
    descriptionId: "Topologi EIGRP berperforma tinggi dengan redistribusi rute dinamis antara IPv4/IPv6 dan optimasi metric bandwidth.",
    descriptionEn: "High-performance EIGRP topology featuring dynamic IPv4/IPv6 route redistribution and composite metric optimization.",
    overviewId: "Konfigurasi EIGRP Autonomous System (AS) 100 terintegrasi dengan kriteria DUAL algorithm untuk menyediakan rute bebas loop (Feasible Successor) secara instan.",
    overviewEn: "EIGRP AS 100 configuration leveraging DUAL algorithm to provide loop-free Feasible Successor routes for instantaneous backup switching.",
    problemId: "Terjadinya downtime komunikasi antar cabang ketika link ISP utama terputus karena belum adanya sistem penentuan jalur cadangan otomatis.",
    problemEn: "Inter-branch communication downtime occurred during primary ISP link failures due to lack of automated path calculation.",
    solutionId: "Mengatur EIGRP K-values, redistribusi rute statis ke EIGRP, serta mengaktifkan EIGRP Named Mode untuk mendukung dual-stack IPv4/IPv6.",
    solutionEn: "Tuned EIGRP K-values, configured static route redistribution, and deployed EIGRP Named Mode for seamless dual-stack IPv4/IPv6 operation.",
    cover: "/projects/vortex-analytics.svg",
    gallery: [
      "/projects/vortex-analytics.svg"
    ],
    year: "2025",
    stack: ["Cisco Packet Tracer", "EIGRP", "IPv6 Dual-Stack", "Cisco IOS", "Mikrotik"],
    github: "https://github.com/haidirwf/portfolio-idal",
    featured: true,
    tags: ["Networking", "EIGRP", "Routing"],
    architectureId: "AS 100 EIGRP Mesh Core -> Redistribution Border Router -> Dual-Stack IPv4/IPv6 Gateway.",
    architectureEn: "AS 100 EIGRP Mesh Core -> Redistribution Border Router -> Dual-Stack IPv4/IPv6 Gateway.",
    resultId: "Failover otomatis tanpa drop paket saat simulasi link terputus (Zero packet loss during failover).",
    resultEn: "Zero packet loss during simulated link failure via instant Feasible Successor path activation."
  },
  {
    title: "Enterprise VLAN, STP & EtherChannel Bond",
    slug: "vlan-stp-etherchannel",
    descriptionId: "Perancangan switching jaringan enterprise menggunakan Rapid Spanning Tree (RSTP), LACP EtherChannel, dan VTP.",
    descriptionEn: "Enterprise Layer 2 switching design incorporating Rapid Spanning Tree (RSTP), LACP EtherChannel bonding, and VTP trunking.",
    overviewId: "Infrastruktur Layer 2 terpadu yang memadukan penggabungan port EtherChannel (LACP) untuk meningkatkan agregasi bandwidth dan redundancy switch link.",
    overviewEn: "Unified Layer 2 infrastructure bundling switch ports via LACP EtherChannel to multiply bandwidth and ensure link redundancy.",
    problemId: "Bottleneck bandwidth antar switch distribution dan risiko looping jaringan (broadcast storm) akibat keterbatasan port tunggal.",
    problemEn: "Inter-switch bandwidth bottlenecks and switching loop risks (broadcast storms) from single link topology limits.",
    solutionId: "Konfigurasi Port-Channel 802.3ad (LACP), Per-VLAN Spanning Tree (PVST+), serta penerapan VTP Server/Client untuk kemudahan manajemen VLAN.",
    solutionEn: "Configured 802.3ad LACP Port-Channels, PVST+ Rapid Spanning Tree, and VTP Server/Client domain management.",
    cover: "/projects/kubecraft.svg",
    gallery: [
      "/projects/kubecraft.svg"
    ],
    year: "2025",
    stack: ["Cisco Packet Tracer", "Switching", "VLAN", "STP", "EtherChannel"],
    github: "https://github.com/haidirwf/portfolio-idal",
    featured: false,
    tags: ["Switching", "L2 Infrastructure", "Cisco"],
    architectureId: "Dual Distribution Switches (LACP Trunk) -> RSTP Root Bridge -> Access Switches (Port Security).",
    architectureEn: "Dual Distribution Switches (LACP Trunk) -> RSTP Root Bridge -> Access Switches (Port Security).",
    resultId: "Penggandaan kapasitas throughput antar-switch hingga 2Gbps dengan proteksi anti-looping 100% aktif.",
    resultEn: "Doubled inter-switch throughput to 2Gbps with 100% active loop prevention."
  },
  {
    title: "Mikrotik RouterOS Edge Gateway & Firewall",
    slug: "mikrotik-edge-firewall",
    descriptionId: "Konfigurasi Mikrotik RouterOS untuk manajemen bandwidth Queues, NAT, MANGLE, dan IPSec VPN Site-to-Site.",
    descriptionEn: "MikroTik RouterOS edge configuration featuring PCQ bandwidth queues, NAT, MANGLE traffic marking, and Site-to-Site IPSec VPN.",
    overviewId: "Penerapan edge router Mikrotik untuk mengamankan jaringan internal, membatasi kecepatan bandwidth pengguna secara adil (PCQ Queue), serta menghubungkan 2 kantor cabang via VPN Tunnel.",
    overviewEn: "Deployment of MikroTik edge router to secure internal LAN, enforce fair PCQ bandwidth queues, and link branch offices via encrypted VPN tunnel.",
    problemId: "Penggunaan internet yang tidak terkontrol oleh klien internal serta kerentanan lalu lintas data antar kantor cabang melalui jaringan publik.",
    problemEn: "Uncontrolled client bandwidth consumption and vulnerable inter-branch communication over public internet links.",
    solutionId: "Membangun firewall filter rules, NAT masquerade, Simple & Tree Queues dengan algoritma PCQ, serta enkripsi IPSec IKEv2.",
    solutionEn: "Engineered firewall filter rules, NAT masquerade, Tree Queues with PCQ, and IKEv2 IPSec VPN tunnel.",
    cover: "/projects/hyperscale.svg",
    gallery: [
      "/projects/hyperscale.svg"
    ],
    year: "2024",
    stack: ["Mikrotik", "RouterOS", "Firewall", "IPSec", "Linux"],
    github: "https://github.com/haidirwf/portfolio-idal",
    featured: false,
    tags: ["Mikrotik", "Security", "Firewall"],
    architectureId: "ISP Connection -> Mikrotik Gateway (Firewall + Mangle) -> IPSec Site-to-Site Tunnel -> Local LAN Switches.",
    architectureEn: "ISP Connection -> Mikrotik Gateway (Firewall + Mangle) -> IPSec Site-to-Site Tunnel -> Local LAN Switches.",
    resultId: "Pengaturan alokasi bandwidth merata untuk 100+ pengguna simultan dan koneksi antar cabang terenkripsi penuh.",
    resultEn: "Fair bandwidth allocation for 100+ concurrent users with fully encrypted inter-branch data tunnel."
  },
  {
    title: "BGP Autonomous System Inter-Domain Topology",
    slug: "bgp-inter-domain-topology",
    descriptionId: "Simulasi BGP (Border Gateway Protocol) eBGP dan iBGP antar Autonomous System (AS) ISP global pada Packet Tracer.",
    descriptionEn: "BGP (Border Gateway Protocol) eBGP and iBGP simulation connecting global ISP Autonomous Systems on Packet Tracer.",
    overviewId: "Desain jaringan routing tingkat ISP menggunakan BGP untuk pertukaran rute eksternal antar AS yang berbeda serta pengaturan BGP Local Preference & AS-Path Prepend.",
    overviewEn: "ISP-grade routing design utilizing BGP for inter-AS route exchange, Local Preference tuning, and AS-Path Prepend traffic engineering.",
    problemId: "Kesulitan dalam mengatur jalur lalu lintas internet utama dan cadangan (inbound/outbound traffic engineering) pada multi-homed ISP.",
    problemEn: "Inbound and outbound traffic engineering difficulties across multi-homed ISP connections.",
    solutionId: "Mengonfigurasi peering eBGP antar AS, iBGP dengan Route Reflector di internal AS, serta manipulasi atribut BGP Path Selection.",
    solutionEn: "Configured eBGP inter-AS peering, iBGP with Route Reflectors, and manipulated BGP path attributes for deterministic traffic routing.",
    cover: "/projects/pulse-monitoring.svg",
    gallery: [
      "/projects/pulse-monitoring.svg"
    ],
    year: "2024",
    stack: ["Cisco Packet Tracer", "BGP", "eBGP/iBGP", "Cisco IOS", "Networking"],
    github: "https://github.com/haidirwf/portfolio-idal",
    featured: false,
    tags: ["BGP", "ISP", "Routing"],
    architectureId: "AS 100 (Primary ISP) <-> eBGP Peering <-> AS 200 (Enterprise Edge) -> iBGP Mesh -> Internal Core Routers.",
    architectureEn: "AS 100 (Primary ISP) <-> eBGP Peering <-> AS 200 (Enterprise Edge) -> iBGP Mesh -> Internal Core Routers.",
    resultId: "Kemampuan kontrol penuh terhadap traffic engineering kustom untuk jalur utama dan failover backup otomatis.",
    resultEn: "Complete custom traffic engineering control with deterministic primary/backup path failover."
  }
];

export function getProjects(): Project[] {
  return PROJECTS;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
