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
  downloadPkt?: string;
  downloadGns3?: string;
  rawConfig?: string;
}

export const PROJECTS: Project[] = [
  {
    title: "Enterprise VLAN & Inter-VLAN Router-on-a-Stick",
    slug: "enterprise-vlan-inter-vlan-routing",
    descriptionId: "Infrastruktur enterprise terpadu memadukan Inter-VLAN Subinterfaces, DHCP Dynamic Pool, OSPF 100 & EIGRP 10 Redistribution pada Multilayer Switch, GRE Tunnel 100.100.100.0/30, serta Standard & Extended ACL.",
    descriptionEn: "Unified enterprise infrastructure integrating Inter-VLAN Subinterfaces, Dynamic DHCP Pools, Multilayer Switch OSPF 100 & EIGRP 10 Redistribution, GRE Tunnel 100.100.100.0/30, and Standard & Extended ACL filtering.",
    overviewId: "Topologi jaringan enterprise skala besar berarsitektur hybrid yang mengisolasi segmen LAN ke dalam VLAN 10, 20, 21, 30, 40 (/28), mendistribusikan IP secara dinamis via DHCP Server lokal & Router, serta menghubungkan domain routing OSPF 100 dan EIGRP 10 melalui Multilayer Switch 3560 dan GRE Tunnel.",
    overviewEn: "Large-scale enterprise topology featuring segmented VLANs 10, 20, 21, 30, 40 (/28), local Server & Router DHCP pools, OSPF 100 & EIGRP 10 domain redistribution via Multilayer Switch 3560, and encrypted GRE Tunnel interconnection.",
    problemId: "Kebutuhan mengintegrasikan dua cabang jaringan berprotokol routing berbeda (OSPF 100 & EIGRP 10), menyediakan pengalamatan IP otomatis di tiap segmen VLAN /28, serta membatasi akses HTTP & PING ke server sensitif.",
    problemEn: "Integrating multi-branch networks across distinct routing domains (OSPF 100 & EIGRP 10), automating IP assignment for /28 VLAN subnets, and enforcing granular HTTP & PING access control via ACL.",
    solutionId: "Membangun 802.1Q Subinterfaces (Router-on-a-Stick), mengonfigurasi IP DHCP Pool /28, mengaktifkan Mutual Redistribution OSPF 100 <-> EIGRP 10 pada Multilayer Switch, mengonfigurasi GRE Tunnel 100.100.100.0/30, serta menerapkan Standard & Extended ACL (ICMP permit & HTTP deny / sebaliknya).",
    solutionEn: "Configured 802.1Q Subinterfaces (Router-on-a-Stick), dynamic /28 DHCP Pools, OSPF 100 <-> EIGRP 10 Mutual Redistribution on Multilayer Switch 3560, GRE Tunnel 100.100.100.0/30, and Standard/Extended ACL traffic policies.",
    cover: "/projects/enterprise.webp",
    gallery: [
      "/projects/enterprise.webp"
    ],
    year: "2026",
    stack: ["Cisco Packet Tracer", "Inter-VLAN 802.1Q", "DHCP Server /28", "OSPF 100", "EIGRP 10", "GRE Tunnel", "Extended ACL"],
    github: "https://github.com/haidirwf/portfolio-idal",
    featured: true,
    tags: ["Enterprise Network", "VLAN", "OSPF & EIGRP", "ACL Security"],
    architectureId: "VLAN 10/20/21/30/40 (/28) -> Router 802.1Q Subinterfaces & DHCP -> Core Multilayer Switch (OSPF 100 & EIGRP 10 Redistribution + Server 8.8.8.0/28) -> GRE Tunnel (100.100.100.0/30) -> Edge Branch Routers & Extended ACL.",
    architectureEn: "VLAN 10/20/21/30/40 (/28) -> Router 802.1Q Subinterfaces & DHCP -> Core Multilayer Switch (OSPF 100 & EIGRP 10 Redistribution + Server 8.8.8.0/28) -> GRE Tunnel (100.100.100.0/30) -> Edge Branch Routers & Extended ACL.",
    resultId: "Konektivitas terenkripsi antar-domain routing OSPF & EIGRP 100% stabil dengan alokasi DHCP /28 otomatis dan filtrasi keamanan ACL yang presisi.",
    resultEn: "100% stable encrypted inter-domain connectivity between OSPF & EIGRP with dynamic /28 DHCP pools and precise ACL security filtering.",
    downloadPkt: "/downloads/enterprise_topology.pkt",
    rawConfig: `! ======================================================================
! ENTERPRISE INTER-VLAN & HYBRID ROUTING COMPLETE CONFIGURATION
! ======================================================================

! ----------------------------------------------------------------------
! 1. LEFT BRANCH ROUTER (Router-on-a-Stick & Subinterfaces VLAN /28)
! ----------------------------------------------------------------------
hostname Branch-Router-Left
!
interface GigabitEthernet0/0
 no ip address
 duplex auto
 speed auto
!
interface GigabitEthernet0/0.10
 encapsulation dot1Q 10
 ip address 192.168.10.1 255.255.255.240
!
interface GigabitEthernet0/0.20
 encapsulation dot1Q 20
 ip address 192.168.20.1 255.255.255.240
!
interface GigabitEthernet0/0.21
 encapsulation dot1Q 21
 ip address 192.168.21.1 255.255.255.240
!
! Local Server DHCP Helper (Local Server 192.168.10.2)
interface GigabitEthernet0/0.10
 ip helper-address 192.168.10.2
!
interface GigabitEthernet0/1
 ip address 10.10.10.2 255.255.255.248
!
router ospf 100
 router-id 2.2.2.2
 network 10.10.10.0 0.0.0.7 area 0
 network 192.168.10.0 0.0.0.15 area 0
 network 192.168.20.0 0.0.0.15 area 0
 network 192.168.21.0 0.0.0.15 area 0

! ----------------------------------------------------------------------
! 2. CORE MULTILAYER SWITCH (3560 - OSPF 100 & EIGRP 10 Redistribution)
! ----------------------------------------------------------------------
hostname Core-MultilayerSwitch
ip routing
!
interface GigabitEthernet1/0/1
 no switchport
 ip address 10.10.10.1 255.255.255.248
!
interface GigabitEthernet1/0/2
 no switchport
 ip address 11.11.11.1 255.255.255.248
!
interface GigabitEthernet1/0/3
 no switchport
 ip address 21.21.21.1 255.255.255.248
!
interface GigabitEthernet1/0/4
 no switchport
 ip address 20.20.20.1 255.255.255.248
!
interface GigabitEthernet1/0/5
 description Central-Google-Server
 no switchport
 ip address 8.8.8.1 255.255.255.240
!
! OSPF 100 Domain Config
router ospf 100
 router-id 1.1.1.1
 network 10.10.10.0 0.0.0.7 area 0
 network 11.11.11.0 0.0.0.7 area 0
 network 8.8.8.0 0.0.0.15 area 0
 redistribute eigrp 10 subnets
!
! EIGRP 10 Domain Config
router eigrp 10
 network 20.20.20.0 0.0.0.7
 network 21.21.21.0 0.0.0.7
 redistribute ospf 100 metric 10000 100 255 1 1500

! ----------------------------------------------------------------------
! 3. GRE TUNNEL CONFIGURATION (Inter-Branch Private Tunnel)
! ----------------------------------------------------------------------
! On Left Edge Router:
interface Tunnel0
 ip address 100.100.100.1 255.255.255.252
 tunnel source GigabitEthernet0/1
 tunnel destination 21.21.21.2
!
! On Right Edge Router:
interface Tunnel0
 ip address 100.100.100.2 255.255.255.252
 tunnel source GigabitEthernet0/0
 tunnel destination 11.11.11.2

! ----------------------------------------------------------------------
! 4. RIGHT BRANCH ROUTER & SWITCH (DHCP Pools & Extended ACL)
! ----------------------------------------------------------------------
hostname Branch-Router-Right
!
! Router On-Board DHCP Pools (/28 - 14 usable IPs per subnet)
ip dhcp pool VLAN30_RIGHT
 network 192.168.30.0 255.255.255.240
 default-router 192.168.30.1
!
ip dhcp pool VLAN40_RIGHT
 network 192.168.40.0 255.255.255.240
 default-router 192.168.40.1
!
interface GigabitEthernet0/0
 ip address 20.20.20.2 255.255.255.248
!
interface GigabitEthernet0/1
 no ip address
!
interface GigabitEthernet0/1.30
 encapsulation dot1Q 30
 ip address 192.168.30.1 255.255.255.240
!
interface GigabitEthernet0/1.40
 encapsulation dot1Q 40
 ip address 192.168.40.1 255.255.255.240
!
router eigrp 10
 network 20.20.20.0 0.0.0.7
 network 192.168.30.0 0.0.0.15
 network 192.168.40.0 0.0.0.15
!
! ----------------------------------------------------------------------
! 5. ACL POLICIES (Standard & Extended Access Control Lists)
! ----------------------------------------------------------------------
! ACL Standard Policy (Block Host Access to LAN)
access-list 10 deny host 192.168.70.5
access-list 10 permit any
!
! ACL Extended Policy:
! 1. Permit ICMP PING but Deny HTTP Web Access (Port 80)
ip access-list extended BLOCK-WEB-ONLY
 permit icmp any host 8.8.8.8
 deny tcp any host 8.8.8.8 eq 80
 permit ip any any
!
! 2. Permit HTTP Web Access but Deny ICMP PING
ip access-list extended BLOCK-PING-ONLY
 permit tcp any host 8.8.8.8 eq 80
 deny icmp any host 8.8.8.8
 permit ip any any
!
interface GigabitEthernet0/1.30
 ip access-group BLOCK-WEB-ONLY in
!
interface GigabitEthernet0/1.40
 ip access-group BLOCK-PING-ONLY in`
  },
  {
    title: "OSPF & RIPv2 Dynamic Route Redistribution",
    slug: "ospf-rip-route-redistribution",
    descriptionId: "Arsitektur interoperabilitas dua protokol routing dinamis (OSPF & RIPv2) menggunakan mutual route redistribution dan seed metric tuning pada Cisco IOS.",
    descriptionEn: "Dual dynamic routing protocol interoperability architecture (OSPF & RIPv2) using mutual route redistribution and seed metric tuning on Cisco IOS.",
    overviewId: "Topologi hybrid enterprise yang menghubungkan jaringan inti berbasis OSPF dengan jaringan cabang legacy berbasis RIPv2 melalui router redistribusi (Autonomous System Boundary Router / ASBR).",
    overviewEn: "Enterprise hybrid topology connecting an OSPF-based core network with a legacy RIPv2 branch network via Autonomous System Boundary Router (ASBR) route redistribution.",
    problemId: "Perbedaan struktur metric antara OSPF (cost/bandwidth) dan RIPv2 (hop count) menyebabkan kegagalan pertukaran rute otomatis antar wilayah jaringan.",
    problemEn: "Metric mismatch between OSPF (cost/bandwidth) and RIPv2 (hop count) prevents automated route exchange across network boundaries.",
    solutionId: "Mengonfigurasi mutual redistribution pada ASBR dengan penetapan seed metric yang tepat (metric cost pada OSPF dan hop count pada RIP) serta filter prefix-list untuk mencegah routing loop.",
    solutionEn: "Configured mutual redistribution on the ASBR with explicit seed metrics (cost for OSPF, hop count for RIP) and prefix-list filtering to eliminate routing loops.",
    cover: "/projects/aether-engine.svg",
    gallery: [
      "/projects/aether-engine.svg"
    ],
    year: "2026",
    stack: ["Cisco Packet Tracer", "OSPFv2", "RIPv2", "Route Redistribution", "Cisco IOS"],
    github: "https://github.com/haidirwf/portfolio-idal",
    featured: true,
    tags: ["Routing", "OSPF", "RIPv2"],
    architectureId: "Router5 (OSPF Area 0, Gig0/0: 10.10.10.1/30, Gig0/1: 192.168.10.1/24) <-> Router6 (ASBR - OSPF Area 0 Gig0/0 & RIPv2 Gig0/2, Gig0/1: 192.168.20.1/24) <-> Router7 (RIPv2, Gig0/0: 10.10.20.2/30, Gig0/1: 192.168.30.1/24).",
    architectureEn: "Router5 (OSPF Area 0, Gig0/0: 10.10.10.1/30, Gig0/1: 192.168.10.1/24) <-> Router6 (ASBR - OSPF Area 0 Gig0/0 & RIPv2 Gig0/2, Gig0/1: 192.168.20.1/24) <-> Router7 (RIPv2, Gig0/0: 10.10.20.2/30, Gig0/1: 192.168.30.1/24).",
    resultId: "Konektivitas full-mesh 100% antar wilayah OSPF (Router5 & PC3) dan RIPv2 (Router7 & PC5) melalui Router6 ASBR dengan mutual redistribution.",
    resultEn: "100% full-mesh connectivity between OSPF domain (Router5 & PC3) and RIPv2 domain (Router7 & PC5) via Router6 ASBR mutual redistribution.",
    rawConfig: `! ==========================================
! ROUTER 5 (OSPF Domain - Area 0)
! ==========================================
hostname Router5
!
interface GigabitEthernet0/0
 ip address 10.10.10.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1
 ip address 192.168.10.1 255.255.255.0
 no shutdown
!
router ospf 1
 router-id 5.5.5.5
 network 10.10.10.0 0.0.0.3 area 0
 network 192.168.10.0 0.0.0.255 area 0

! ==========================================
! ROUTER 6 (ASBR - Redistribution Gateway)
! ==========================================
hostname Router6
!
interface GigabitEthernet0/0
 ip address 10.10.10.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1
 ip address 192.168.20.1 255.255.255.0
 no shutdown
!
interface GigabitEthernet0/2
 ip address 10.10.20.1 255.255.255.252
 no shutdown
!
router ospf 1
 router-id 6.6.6.6
 network 10.10.10.0 0.0.0.3 area 0
 network 192.168.20.0 0.0.0.255 area 0
 redistribute rip subnets metric-type 2 metric 20
!
router rip
 version 2
 no auto-summary
 network 10.10.20.0
 network 192.168.20.0
 redistribute ospf 1 metric 5

! ==========================================
! ROUTER 7 (RIPv2 Domain)
! ==========================================
hostname Router7
!
interface GigabitEthernet0/0
 ip address 10.10.20.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1
 ip address 192.168.30.1 255.255.255.0
 no shutdown
!
router rip
 version 2
 no auto-summary
 network 10.10.20.0
 network 192.168.30.0`
  },
  {
    title: "Standard ACL for Granular Network Access Control",
    slug: "standard-acl-access-control",
    descriptionId: "Implementasi Standard Access Control List (ACL 1–99) untuk mengamankan dan membatasi akses segmen jaringan internal dan server sensitif.",
    descriptionEn: "Standard Access Control List (ACL 1–99) implementation securing and restricting network segment access to sensitive internal servers.",
    overviewId: "Perancangan sistem keamanan dasar di tingkat Layer 3 untuk memblokir host atau subnet yang tidak diizinkan masuk ke server data internal dan gateway manajemen.",
    overviewEn: "Layer 3 perimeter security design blocking unauthorized hosts or subnets from accessing internal data servers and management gateways.",
    problemId: "Perangkat pengguna dari subnet publik/guest dapat secara bebas mengakses IP server database internal tanpa adanya pembatasan lalu lintas data.",
    problemEn: "Unrestricted host access allowed guest and public subnets to directly reach internal database servers without traffic filtering.",
    solutionId: "Menerapkan Standard ACL pada antarmuka terdekat dengan tujuan (closest to destination interface) dengan aturan deny spesifik dan permit explicit.",
    solutionEn: "Applied Standard ACL on the closest interface to the destination with specific host deny statements followed by explicit permit rules.",
    cover: "/projects/vortex-analytics.svg",
    gallery: [
      "/projects/vortex-analytics.svg"
    ],
    year: "2026",
    stack: ["Cisco Packet Tracer", "Standard ACL", "Network Security", "Cisco IOS"],
    github: "https://github.com/haidirwf/portfolio-idal",
    featured: true,
    tags: ["Security", "ACL", "Cisco"],
    architectureId: "Client Subnets (VLAN 10/20) -> Edge Router (ACL Filter on G0/0/1) -> Secure Server Subnet (VLAN 99).",
    architectureEn: "Client Subnets (VLAN 10/20) -> Edge Router (ACL Filter on G0/0/1) -> Secure Server Subnet (VLAN 99).",
    resultId: "Partisi hak akses jaringan 100% efektif; memblokir akses subnet terlarang sambil mempertahankan akses bagi staf terotorisasi.",
    resultEn: "100% effective network access segmentation; blocking unauthorized subnets while maintaining access for authorized personnel.",
    rawConfig: `! Cisco Standard Access Control List (ACL) Configuration
ip access-list standard RESTRICT-SERVER-ACCESS
 deny host 192.168.20.50
 deny 192.168.30.0 0.0.0.255
 permit any
!
interface GigabitEthernet0/0/1
 ip address 10.10.99.1 255.255.255.0
 ip access-group RESTRICT-SERVER-ACCESS out
!`
  },
  {
    title: "NAT Overload (PAT) Public IP Pool Gateway",
    slug: "nat-overload-pat-public-gateway",
    descriptionId: "Konfigurasi Network Address Translation Overload (Port Address Translation / PAT) untuk mentranslasikan ribuan IP privat ke satu/beberapa IP publik.",
    descriptionEn: "Network Address Translation Overload (Port Address Translation / PAT) configuration mapping internal private IPs to a single or pool of public IPs.",
    overviewId: "Implementasi NAT Overload pada Edge Router untuk menghemat penggunaan alokasi IP publik ISP dan memungkinkan seluruh perangkat LAN mengakses internet secara simultan.",
    overviewEn: "Edge Router NAT Overload deployment to conserve public IP address space while granting full internet access to internal LAN clients simultaneously.",
    problemId: "Keterbatasan jumlah alamat IPv4 publik dari ISP mencegah ratusan perangkat internal di kantor cabang untuk terkoneksi ke jaringan internet.",
    problemEn: "Limited public IPv4 address availability from the ISP prevented hundreds of internal LAN devices from connecting to the internet.",
    solutionId: "Membuat IP NAT Inside/Outside interfaces, mendefinisikan Standard ACL untuk IP privat LAN, dan mengaktifkan 'ip nat inside source list overload'.",
    solutionEn: "Configured NAT Inside/Outside interfaces, defined Standard ACL for private LAN ranges, and activated 'ip nat inside source list overload'.",
    cover: "/projects/hyperscale.svg",
    gallery: [
      "/projects/hyperscale.svg"
    ],
    year: "2028",
    stack: ["Cisco Packet Tracer", "NAT Overload", "PAT", "Cisco IOS", "Edge Security"],
    github: "https://github.com/haidirwf/portfolio-idal",
    featured: false,
    tags: ["NAT", "PAT", "Networking"],
    architectureId: "Internal LAN (192.168.0.0/16) -> Edge Router NAT Engine (PAT) -> ISP Gateway (Public IP 203.0.113.1).",
    architectureEn: "Internal LAN (192.168.0.0/16) -> Edge Router NAT Engine (PAT) -> ISP Gateway (Public IP 203.0.113.1).",
    resultId: "Seluruh pengguna lokal (200+ host) berhasil terhubung ke internet menggunakan 1 IP publik tunggal tanpa kendala port exhaustion.",
    resultEn: "200+ internal hosts successfully sharing 1 single public IP address for internet access without port exhaustion.",
    rawConfig: `! NAT Overload (PAT) Edge Router Configuration
interface GigabitEthernet0/0/0
 description LAN-Internal
 ip address 192.168.10.1 255.255.255.0
 ip nat inside
!
interface GigabitEthernet0/0/1
 description WAN-ISP
 ip address 203.0.113.2 255.255.255.252
 ip nat outside
!
access-list 10 permit 192.168.10.0 0.0.0.255
ip nat inside source list 10 interface GigabitEthernet0/0/1 overload
ip route 0.0.0.0 0.0.0.0 203.0.113.1`
  },
  {
    title: "Spanning Tree Protocol (STP & PVST+) Loop Prevention",
    slug: "stp-pvst-loop-prevention",
    descriptionId: "Penerapan Spanning Tree Protocol (STP/PVST+) untuk mencegah switching loop dan menyediakan redundant link failover otomatis.",
    descriptionEn: "Spanning Tree Protocol (STP/PVST+) deployment preventing switching loops while delivering automated redundant link failover.",
    overviewId: "Desain jaringan redundan Layer 2 dengan multiple switch link yang diatur secara otomatis oleh PVST+ untuk memblokir port cadangan (Blocking State) guna mencegah loop.",
    overviewEn: "Redundant Layer 2 network topology with multiple switch interconnects dynamically managed by PVST+ to block redundant links and prevent loops.",
    problemId: "Topologi fisik dengan jalur cadangan antar switch menyebabkan terjadinya loop Layer 2 (broadcast storm) yang melumpuhkan seluruh jaringan.",
    problemEn: "Physical redundant switch links caused Layer 2 loops and broadcast storms that completely paralyzed the network infrastructure.",
    solutionId: "Mengatur Spanning-Tree Mode PVST+, mengonfigurasi Root Bridge Primary & Secondary secara deterministik, serta mengaktifkan PortFast & BPDU Guard pada port akses.",
    solutionEn: "Configured PVST+ Spanning Tree mode, designated primary/secondary Root Bridges deterministically, and enabled PortFast & BPDU Guard on access ports.",
    cover: "/projects/pulse-monitoring.svg",
    gallery: [
      "/projects/pulse-monitoring.svg"
    ],
    year: "2024",
    stack: ["Cisco Packet Tracer", "STP", "PVST+", "BPDU Guard", "Switching"],
    github: "https://github.com/haidirwf/portfolio-idal",
    featured: false,
    tags: ["STP", "Switching", "L2 Infrastructure"],
    architectureId: "Core Switch 1 (Root Primary) <-> Core Switch 2 (Root Backup) <-> Access Switches (PortFast & BPDU Guard).",
    architectureEn: "Core Switch 1 (Root Primary) <-> Core Switch 2 (Root Backup) <-> Access Switches (PortFast & BPDU Guard).",
    resultId: "Perlindungan anti-looping 100% aktif dengan failover jalur redundan otomatis saat link utama terputus.",
    resultEn: "100% active anti-loop protection with seamless automated link failover during primary trunk failures.",
    rawConfig: `! PVST+ Spanning-Tree Priority & BPDU Guard Config
spanning-tree mode pvst
spanning-tree vlan 1,10,20 root primary
spanning-tree vlan 30,40 root secondary
!
interface FastEthernet0/10
 switchport mode access
 switchport access vlan 10
 spanning-tree portfast
 spanning-tree bpduguard enable`
  }
];

export function getProjects(): Project[] {
  return PROJECTS;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
