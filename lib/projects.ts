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
    cover: "/projects/redistribute_ospf_rip.webp",
    gallery: [
      "/projects/redistribute_ospf_rip.webp"
    ],
    year: "2026",
    stack: ["Cisco Packet Tracer", "OSPFv2", "RIPv2", "Route Redistribution", "Cisco IOS"],
    github: "https://github.com/haidirwf/portfolio-idal",
    featured: true,
    tags: ["Routing", "OSPF", "RIPv2"],
    architectureId: "Router0 (OSPF Area 0, Gig0/0: 10.10.10.1/30, Gig0/1: 192.168.10.1/24) <-> Router1 (ASBR - OSPF Area 0 Gig0/0 & RIPv2 Gig0/1, Gig0/2: 192.168.20.1/24) <-> Router2 (RIPv2, Gig0/0: 10.10.20.2/30, Gig0/1: 192.168.30.1/24).",
    architectureEn: "Router0 (OSPF Area 0, Gig0/0: 10.10.10.1/30, Gig0/1: 192.168.10.1/24) <-> Router1 (ASBR - OSPF Area 0 Gig0/0 & RIPv2 Gig0/1, Gig0/2: 192.168.20.1/24) <-> Router2 (RIPv2, Gig0/0: 10.10.20.2/30, Gig0/1: 192.168.30.1/24).",
    resultId: "Konektivitas full-mesh 100% antar wilayah OSPF (Router0 & PC0) dan RIPv2 (Router2 & PC2) melalui Router1 ASBR dengan mutual redistribution.",
    resultEn: "100% full-mesh connectivity between OSPF domain (Router0 & PC0) and RIPv2 domain (Router2 & PC2) via Router1 ASBR mutual redistribution.",
    downloadPkt: "/downloads/redistribute_ospf_rip.pkt",
    rawConfig: `! ==========================================
! ROUTER 0 (OSPF Domain)
! ==========================================
hostname Router0
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
 router-id 1.1.1.1
 network 10.10.10.0 0.0.0.3 area 0
 network 192.168.10.0 0.0.0.255 area 0
 passive-interface GigabitEthernet0/1

! ==========================================
! ROUTER 1 (ASBR - Redistribution Gateway)
! ==========================================
hostname Router1
!
interface GigabitEthernet0/0
 ip address 10.10.10.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1
 ip address 10.10.20.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/2
 ip address 192.168.20.1 255.255.255.0
 no shutdown
!
! OSPF: Membawa link Router0, LAN PC1, dan hasil redistribusi dari RIP
router ospf 1
 router-id 2.2.2.2
 network 10.10.10.0 0.0.0.3 area 0
 network 192.168.20.0 0.0.0.255 area 0
 passive-interface GigabitEthernet0/2
 redistribute rip subnets metric-type 2 metric 20
!
! RIP: Mengaktifkan link Router2 dan mendistribusikan OSPF ke RIP
router rip
 version 2
 no auto-summary
 network 10.0.0.0
 passive-interface GigabitEthernet0/0
 redistribute ospf 1 metric 5

! ==========================================
! ROUTER 2 (RIPv2 Domain)
! ==========================================
hostname Router2
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
 network 10.0.0.0
 network 192.168.30.0
 passive-interface GigabitEthernet0/1`
  },
  {
    title: "Standard ACL for Granular Network Access Control",
    slug: "standard-acl-access-control",
    descriptionId: "Implementasi Standard Access Control List (ACL 1–99) untuk memfilter hak akses host PC0 (DITERIMA) dan memblokir host PC1 (DITOLAK) menuju Server0.",
    descriptionEn: "Standard Access Control List (ACL 1–99) implementation permitting host PC0 access while strictly denying host PC1 access to Server0.",
    overviewId: "Perancangan perimeter security Layer 3 dengan Standard ACL untuk mengontrol akses antarsegmen LAN (192.168.10.0/24) menuju Server0 (192.168.20.10).",
    overviewEn: "Layer 3 security design with Standard ACL controlling access from LAN subnet (192.168.10.0/24) to target Server0 (192.168.20.10).",
    problemId: "Perangkat PC1 (192.168.10.20) tidak diizinkan mengakses Server0 (192.168.20.10), sedangkan PC0 (192.168.10.10) harus tetap memiliki akses penuh.",
    problemEn: "Host PC1 (192.168.10.20) must be prevented from accessing Server0 (192.168.20.10), while host PC0 (192.168.10.10) retains full access.",
    solutionId: "Menerapkan Standard ACL pada Router1 (Gig0/1 Outbound menuju Server0) dengan rule deny host 192.168.10.20 diikuti permit any.",
    solutionEn: "Applied Standard ACL on Router1 (Gig0/1 Outbound facing Server0) with rule deny host 192.168.10.20 followed by permit any.",
    cover: "/projects/acl.webp",
    gallery: [
      "/projects/acl.webp"
    ],
    year: "2026",
    stack: ["Cisco Packet Tracer", "Standard ACL", "Network Security", "Cisco IOS"],
    github: "https://github.com/haidirwf/portfolio-idal",
    featured: true,
    tags: ["Security", "ACL", "Cisco"],
    architectureId: "LAN Subnet (PC0: 192.168.10.10 - DITERIMA, PC1: 192.168.10.20 - DITOLAK) -> Router0 (10.10.10.0/30) -> Router1 (ACL Filter on Gig0/1 Out) -> Server0 (192.168.20.10).",
    architectureEn: "LAN Subnet (PC0: 192.168.10.10 - PERMITTED, PC1: 192.168.10.20 - DENIED) -> Router0 (10.10.10.0/30) -> Router1 (ACL Filter on Gig0/1 Out) -> Server0 (192.168.20.10).",
    resultId: "Akses PC0 (192.168.10.10) DITERIMA 100% dan PC1 (192.168.10.20) DITOLAK secara presisi oleh Standard ACL pada Router1.",
    resultEn: "Host PC0 (192.168.10.10) PERMITTED 100% while PC1 (192.168.10.20) DENIED precisely by Standard ACL on Router1.",
    downloadPkt: "/downloads/acl_topology.pkt",
    rawConfig: `! ==========================================
! ROUTER 0 CONFIGURATION (LAN Gateway)
! ==========================================
hostname Router0
!
interface GigabitEthernet0/0
 ip address 10.10.10.1 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1
 ip address 192.168.10.1 255.255.255.0
 no shutdown
!
ip route 192.168.20.0 255.255.255.0 10.10.10.2

! ==========================================
! ROUTER 1 CONFIGURATION (ACL Security Filter)
! ==========================================
hostname Router1
!
interface GigabitEthernet0/0
 ip address 10.10.10.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1
 ip address 192.168.20.1 255.255.255.0
 ip access-group FILTER-SERVER-ACCESS out
 no shutdown
!
ip route 192.168.10.0 255.255.255.0 10.10.10.1
!
! Standard Access Control List Policy
! Deny PC1 (192.168.10.20) & Permit PC0 (192.168.10.10 / any)
ip access-list standard FILTER-SERVER-ACCESS
 deny host 192.168.10.20
 permit any`
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
    cover: "/projects/natoverload.webp",
    gallery: [
      "/projects/natoverload.webp"
    ],
    year: "2028",
    stack: ["Cisco Packet Tracer", "NAT Overload", "PAT", "Cisco IOS", "Edge Security"],
    github: "https://github.com/haidirwf/portfolio-idal",
    featured: false,
    tags: ["NAT", "PAT", "Networking"],
    architectureId: "Local LAN (PC0: 192.168.10.10, PC1: 192.168.10.20) -> Router-NAT (Gig0/1 Inside: 192.168.10.1, Gig0/0 Outside: 1.1.1.1/30) -> Router-ISP (Gig0/0: 1.1.1.2/30, Gig0/1: 192.168.20.1) -> Server-INTERNET (192.168.20.0/24).",
    architectureEn: "Local LAN (PC0: 192.168.10.10, PC1: 192.168.10.20) -> Router-NAT (Gig0/1 Inside: 192.168.10.1, Gig0/0 Outside: 1.1.1.1/30) -> Router-ISP (Gig0/0: 1.1.1.2/30, Gig0/1: 192.168.20.1) -> Server-INTERNET (192.168.20.0/24).",
    resultId: "Seluruh pengguna lokal di subnet 192.168.10.0/24 (PC0 & PC1) berhasil mengakses Server-INTERNET melalui translasi PAT IP publik 1.1.1.1.",
    resultEn: "All local hosts in 192.168.10.0/24 subnet (PC0 & PC1) successfully access Server-INTERNET via public IP 1.1.1.1 PAT translation.",
    rawConfig: `! ==========================================
! ROUTER-NAT (Edge Gateway - NAT Overload / PAT)
! ==========================================
hostname Router-NAT
!
interface GigabitEthernet0/1
 ip address 192.168.10.1 255.255.255.0
 ip nat inside
 no shutdown
!
interface GigabitEthernet0/0
 ip address 1.1.1.1 255.255.255.252
 ip nat outside
 no shutdown
!
! Standard ACL for Local Network Subnet
access-list 1 permit 192.168.10.0 0.0.0.255
!
! NAT Overload (PAT) binding list 1 to Outside Interface
ip nat inside source list 1 interface GigabitEthernet0/0 overload
!
! Default Route towards ISP
ip route 0.0.0.0 0.0.0.0 1.1.1.2

! ==========================================
! ROUTER-ISP (Internet Service Provider Core)
! ==========================================
hostname Router-ISP
!
interface GigabitEthernet0/0
 ip address 1.1.1.2 255.255.255.252
 no shutdown
!
interface GigabitEthernet0/1
 ip address 192.168.20.1 255.255.255.0
 no shutdown
!
! Static route back to Router-NAT public IP / subnet
ip route 1.1.1.0 255.255.255.252 1.1.1.1`
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
    architectureId: "Switch1 (Root Bridge, Priority 4096, Fa0/1 & Fa0/2 Designated) <-> Switch2 (Backup Root, Priority 8192, Fa0/1 Root, Fa0/2 Designated) <-> Switch3 (Non-Root, Priority 32768, Fa0/1 Root, Fa0/2 Alternate/Blocking).",
    architectureEn: "Switch1 (Root Bridge, Priority 4096, Fa0/1 & Fa0/2 Designated) <-> Switch2 (Backup Root, Priority 8192, Fa0/1 Root, Fa0/2 Designated) <-> Switch3 (Non-Root, Priority 32768, Fa0/1 Root, Fa0/2 Alternate/Blocking).",
    resultId: "Topologi segitiga 3 switch 100% bebas dari Layer 2 loop/broadcast storm dengan 1 port otomatis diblokir (Blocking state) & failover sub-detik jika link terputus.",
    resultEn: "3-switch triangle topology 100% free from Layer 2 loops/broadcast storms with 1 port automatically blocked and sub-second failover on link failure.",
    rawConfig: `! ==========================================
! SWITCH 1 (Root Bridge Primary)
! ==========================================
hostname Switch1
!
spanning-tree mode pvst
spanning-tree vlan 1 priority 4096
!
interface FastEthernet0/1
 switchport mode trunk
!
interface FastEthernet0/2
 switchport mode trunk

! ==========================================
! SWITCH 2 (Secondary / Backup Root Bridge)
! ==========================================
hostname Switch2
!
spanning-tree mode pvst
spanning-tree vlan 1 priority 8192
!
interface FastEthernet0/1
 switchport mode trunk
!
interface FastEthernet0/2
 switchport mode trunk

! ==========================================
! SWITCH 3 (Standard Access Switch - Non-Root)
! ==========================================
hostname Switch3
!
spanning-tree mode pvst
spanning-tree vlan 1 priority 32768
!
interface FastEthernet0/1
 switchport mode trunk
!
interface FastEthernet0/2
 switchport mode trunk
!
! Catatan Operasional STP:
! Port Fa0/2 pada Switch3 otomatis berstatus Alternate/Blocking (BLK)
! untuk mencegah Layer 2 Loop / Broadcast Storm.`
  }
];

export function getProjects(): Project[] {
  return PROJECTS;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
