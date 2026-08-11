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
      "/projects/aether-engine.svg",
      "/projects/aether-engine-arch.svg"
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
    downloadPkt: "/downloads/ospf-rip-redistribution.pkt",
    downloadGns3: "/downloads/ospf-rip-redistribution.gns3project",
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
    downloadPkt: "/downloads/standard-acl-control.pkt",
    downloadGns3: "/downloads/standard-acl-control.gns3project",
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
    year: "2025",
    stack: ["Cisco Packet Tracer", "NAT Overload", "PAT", "Cisco IOS", "Edge Security"],
    github: "https://github.com/haidirwf/portfolio-idal",
    featured: false,
    tags: ["NAT", "PAT", "Networking"],
    architectureId: "Internal LAN (192.168.0.0/16) -> Edge Router NAT Engine (PAT) -> ISP Gateway (Public IP 203.0.113.1).",
    architectureEn: "Internal LAN (192.168.0.0/16) -> Edge Router NAT Engine (PAT) -> ISP Gateway (Public IP 203.0.113.1).",
    resultId: "Seluruh pengguna lokal (200+ host) berhasil terhubung ke internet menggunakan 1 IP publik tunggal tanpa kendala port exhaustion.",
    resultEn: "200+ internal hosts successfully sharing 1 single public IP address for internet access without port exhaustion.",
    downloadPkt: "/downloads/nat-overload-pat.pkt",
    downloadGns3: "/downloads/nat-overload-pat.gns3project",
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
    title: "Enterprise VLAN & Inter-VLAN Router-on-a-Stick",
    slug: "enterprise-vlan-inter-vlan-routing",
    descriptionId: "Segmentasi domain broadcast Layer 2 menggunakan 802.1Q VLAN Trunking dan Inter-VLAN Routing (Router-on-a-Stick subinterfaces).",
    descriptionEn: "Layer 2 broadcast domain segmentation utilizing 802.1Q VLAN Trunking and Inter-VLAN Routing via Router-on-a-Stick subinterfaces.",
    overviewId: "Perancangan infrastruktur LAN enterprise dengan memisahkan grup departemen (HR, IT, Finance) ke dalam VLAN terisolasi untuk meningkatkan keamanan dan performa.",
    overviewEn: "Enterprise LAN infrastructure design isolating departmental groups (HR, IT, Finance) into dedicated VLANs for security and performance optimization.",
    problemId: "Broadcast storm dan risiko kebocoran data antar departemen akibat seluruh komputer berada dalam satu broadcast domain yang sama.",
    problemEn: "Broadcast storms and data leakage risks across departments due to a flat, single broadcast domain environment.",
    solutionId: "Membuat VLAN 10, 20, 30 pada Switch Layer 2, mengonfigurasi 802.1Q Trunking, dan membangun subinterfaces (.10, .20, .30) pada Router gateway.",
    solutionEn: "Created VLANs 10, 20, 30 on Layer 2 Switches, configured 802.1Q Trunking, and engineered Router-on-a-Stick subinterfaces.",
    cover: "/projects/kubecraft.svg",
    gallery: [
      "/projects/kubecraft.svg"
    ],
    year: "2025",
    stack: ["Cisco Packet Tracer", "VLAN", "802.1Q Trunking", "Inter-VLAN", "Cisco IOS"],
    github: "https://github.com/haidirwf/portfolio-idal",
    featured: false,
    tags: ["VLAN", "Switching", "Cisco"],
    architectureId: "Access Switch (VLAN 10/20/30) <-> 802.1Q Trunk Link <-> Gateway Router Subinterfaces (G0/0.10, G0/0.20, G0/0.30).",
    architectureEn: "Access Switch (VLAN 10/20/30) <-> 802.1Q Trunk Link <-> Gateway Router Subinterfaces (G0/0.10, G0/0.20, G0/0.30).",
    resultId: "Isolasi broadcast domain 100% terjamin dengan kontrol penuh lalu lintas komunikasi antar-VLAN.",
    resultEn: "100% broadcast domain isolation achieved with full administrative control over inter-VLAN communication.",
    downloadPkt: "/downloads/vlan-inter-vlan.pkt",
    downloadGns3: "/downloads/vlan-inter-vlan.gns3project",
    rawConfig: `! Switch VLAN Trunking & Router-on-a-Stick Subinterfaces
! --- Switch Configuration ---
vlan 10
 name HR_DEPT
vlan 20
 name IT_DEPT
!
interface FastEthernet0/1
 switchport mode trunk
 switchport trunk allowed vlan 10,20
!
! --- Router Configuration ---
interface GigabitEthernet0/0.10
 encapsulation dot1Q 10
 ip address 192.168.10.1 255.255.255.0
!
interface GigabitEthernet0/0.20
 encapsulation dot1Q 20
 ip address 192.168.20.1 255.255.255.0`
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
    downloadPkt: "/downloads/stp-pvst-prevention.pkt",
    downloadGns3: "/downloads/stp-pvst-prevention.gns3project",
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
