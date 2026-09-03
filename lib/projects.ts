export interface ProjectSummary {
  title: string;
  slug: string;
  descriptionId: string;
  descriptionEn: string;
  cover: string;
  year: string;
  stack: string[];
  github: string;
  demo?: string;
  featured: boolean;
  tags: string[];
}

export interface Project extends ProjectSummary {
  overviewId: string;
  overviewEn: string;
  problemId: string;
  problemEn: string;
  solutionId: string;
  solutionEn: string;
  gallery: string[];
  architectureId?: string;
  architectureEn?: string;
  resultId?: string;
  resultEn?: string;
  downloadPkt?: string;
  downloadGns3?: string;
  rawConfig?: string;
  articleContentId?: string;
  articleContentEn?: string;
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
 ip access-group BLOCK-PING-ONLY in`,
    articleContentId: `
### 1. Pendahuluan & Konsep Arsitektur Enterprise Hybrid

Topologi **Enterprise Multi-Segment & Hybrid Routing** ini menggabungkan beberapa teknologi fundamental dalam satu infrastruktur terintegrasi:
* **VLAN & Router-on-a-Stick (802.1Q)**: Memisahkan traffic broadcast departemen ke dalam VLAN 10, 20, 21, 30, dan 40 dengan prefix efisien \`/28\` (14 host per subnet).
* **DHCP Service**: Alokasi IP dinamis otomatis via DHCP Server lokal (\`192.168.10.2\`) dengan \`ip helper-address\` serta DHCP Pool onboard pada Router.
* **Hybrid Dynamic Routing**: Menghubungkan domain routing **OSPF 100** dan **EIGRP 10** melalui **Mutual Route Redistribution** pada Core Multilayer Switch 3560.
* **Site-to-Site GRE Tunnel**: Menghubungkan jaringan cabang privat melalui antarmuka virtual Tunnel (\`100.100.100.0/30\`).
* **Extended ACL Security Policy**: Mengontrol akses spesifik (membedakan izin traffic Web HTTP port 80 dan PING ICMP ke Server Pusat).

---

### 2. Skenario & Tabel Pengalamatan IP (Addressing Table)

| Perangkat | Interface / VLAN | IP Address | Subnet Mask | Default Gateway | Fungsi / Keterangan |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Branch-Left** | Gig0/0.10 | 192.168.10.1 | 255.255.255.240 (/28) | - | Gateway VLAN 10 (DHCP Server LAN) |
| **Branch-Left** | Gig0/0.20 | 192.168.20.1 | 255.255.255.240 (/28) | - | Gateway VLAN 20 (Staff LAN) |
| **Branch-Left** | Gig0/0.21 | 192.168.21.1 | 255.255.255.240 (/28) | - | Gateway VLAN 21 (Management LAN) |
| **Branch-Left** | Gig0/1 | 10.10.10.2 | 255.255.255.248 (/29) | - | Uplink ke Core MLS (OSPF 100) |
| **Core-MLS 3560**| Gig1/0/1 | 10.10.10.1 | 255.255.255.248 (/29) | - | Link ke Branch-Left (OSPF 100) |
| **Core-MLS 3560**| Gig1/0/2 | 11.11.11.1 | 255.255.255.248 (/29) | - | Link ke Transit Router (OSPF 100) |
| **Core-MLS 3560**| Gig1/0/3 | 21.21.21.1 | 255.255.255.248 (/29) | - | Link ke Branch-Right Link 2 (EIGRP 10) |
| **Core-MLS 3560**| Gig1/0/4 | 20.20.20.1 | 255.255.255.248 (/29) | - | Link ke Branch-Right Link 1 (EIGRP 10) |
| **Core-MLS 3560**| Gig1/0/5 | 8.8.8.1 | 255.255.255.240 (/28) | - | Central Google/Web Server Gateway |
| **Branch-Right**| Gig0/0 | 20.20.20.2 | 255.255.255.248 (/29) | - | Uplink ke Core MLS (EIGRP 10) |
| **Branch-Right**| Gig0/1.30 | 192.168.30.1 | 255.255.255.240 (/28) | - | Gateway VLAN 30 (Block Web Only) |
| **Branch-Right**| Gig0/1.40 | 192.168.40.1 | 255.255.255.240 (/28) | - | Gateway VLAN 40 (Block Ping Only) |
| **Central Server**| FastEthernet0 | 8.8.8.8 | 255.255.255.240 (/28) | 8.8.8.1 | Central HTTP & DNS Server |

---

### 3. Langkah-Langkah Konfigurasi (Step-by-Step Configuration)

#### Langkah 1: Subinterfaces Router-on-a-Stick & DHCP Relay pada Branch-Router-Left
\`\`\`bash
Router> enable
Router# configure terminal
Router(config)# hostname Branch-Router-Left

! Subinterface VLAN 10
Branch-Router-Left(config)# interface GigabitEthernet0/0.10
Branch-Router-Left(config-subif)# encapsulation dot1Q 10
Branch-Router-Left(config-subif)# ip address 192.168.10.1 255.255.255.240
Branch-Router-Left(config-subif)# ip helper-address 192.168.10.2
Branch-Router-Left(config-subif)# exit

! Subinterface VLAN 20
Branch-Router-Left(config)# interface GigabitEthernet0/0.20
Branch-Router-Left(config-subif)# encapsulation dot1Q 20
Branch-Router-Left(config-subif)# ip address 192.168.20.1 255.255.255.240
Branch-Router-Left(config-subif)# ip helper-address 192.168.10.2
Branch-Router-Left(config-subif)# exit

! Subinterface VLAN 21
Branch-Router-Left(config)# interface GigabitEthernet0/0.21
Branch-Router-Left(config-subif)# encapsulation dot1Q 21
Branch-Router-Left(config-subif)# ip address 192.168.21.1 255.255.255.240
Branch-Router-Left(config-subif)# ip helper-address 192.168.10.2
Branch-Router-Left(config-subif)# exit

! Aktifkan Interface Fisik
Branch-Router-Left(config)# interface GigabitEthernet0/0
Branch-Router-Left(config-if)# no shutdown
Branch-Router-Left(config-if)# exit

! Uplink & OSPF Routing
Branch-Router-Left(config)# interface GigabitEthernet0/1
Branch-Router-Left(config-if)# ip address 10.10.10.2 255.255.255.248
Branch-Router-Left(config-if)# no shutdown
Branch-Router-Left(config-if)# exit

Branch-Router-Left(config)# router ospf 100
Branch-Router-Left(config-router)# router-id 2.2.2.2
Branch-Router-Left(config-router)# network 10.10.10.0 0.0.0.7 area 0
Branch-Router-Left(config-router)# network 192.168.10.0 0.0.0.15 area 0
Branch-Router-Left(config-router)# network 192.168.20.0 0.0.0.15 area 0
Branch-Router-Left(config-router)# network 192.168.21.0 0.0.0.15 area 0
Branch-Router-Left(config-router)# exit
\`\`\`

#### Langkah 2: Konfigurasi Core Multilayer Switch 3560 (Redistribution OSPF & EIGRP)
\`\`\`bash
Switch> enable
Switch# configure terminal
Switch(config)# hostname Core-MultilayerSwitch
Switch(config)# ip routing

! Konfigurasi Port Routed (no switchport)
Switch(config)# interface GigabitEthernet1/0/1
Switch(config-if)# no switchport
Switch(config-if)# ip address 10.10.10.1 255.255.255.248
Switch(config-if)# exit

Switch(config)# interface GigabitEthernet1/0/4
Switch(config-if)# no switchport
Switch(config-if)# ip address 20.20.20.1 255.255.255.248
Switch(config-if)# exit

Switch(config)# interface GigabitEthernet1/0/5
Switch(config-if)# no switchport
Switch(config-if)# ip address 8.8.8.1 255.255.255.240
Switch(config-if)# exit

! OSPF 100 dengan Redistribusi EIGRP
Switch(config)# router ospf 100
Switch(config-router)# router-id 1.1.1.1
Switch(config-router)# network 10.10.10.0 0.0.0.7 area 0
Switch(config-router)# network 8.8.8.0 0.0.0.15 area 0
Switch(config-router)# redistribute eigrp 10 subnets
Switch(config-router)# exit

! EIGRP 10 dengan Redistribusi OSPF
Switch(config)# router eigrp 10
Switch(config-router)# network 20.20.20.0 0.0.0.7
Switch(config-router)# redistribute ospf 100 metric 10000 100 255 1 1500
Switch(config-router)# exit
\`\`\`

#### Langkah 3: Konfigurasi Branch-Router-Right (DHCP Onboard & Extended ACL)
\`\`\`bash
Router> enable
Router# configure terminal
Router(config)# hostname Branch-Router-Right

! DHCP Pool Onboard
Branch-Router-Right(config)# ip dhcp pool VLAN30_RIGHT
Branch-Router-Right(dhcp-config)# network 192.168.30.0 255.255.255.240
Branch-Router-Right(dhcp-config)# default-router 192.168.30.1
Branch-Router-Right(dhcp-config)# exit

Branch-Router-Right(config)# ip dhcp pool VLAN40_RIGHT
Branch-Router-Right(dhcp-config)# network 192.168.40.0 255.255.255.240
Branch-Router-Right(dhcp-config)# default-router 192.168.40.1
Branch-Router-Right(dhcp-config)# exit

! Extended ACL Policies
Branch-Router-Right(config)# ip access-list extended BLOCK-WEB-ONLY
Branch-Router-Right(config-ext-nacl)# permit icmp any host 8.8.8.8
Branch-Router-Right(config-ext-nacl)# deny tcp any host 8.8.8.8 eq 80
Branch-Router-Right(config-ext-nacl)# permit ip any any
Branch-Router-Right(config-ext-nacl)# exit

Branch-Router-Right(config)# ip access-list extended BLOCK-PING-ONLY
Branch-Router-Right(config-ext-nacl)# permit tcp any host 8.8.8.8 eq 80
Branch-Router-Right(config-ext-nacl)# deny icmp any host 8.8.8.8
Branch-Router-Right(config-ext-nacl)# permit ip any any
Branch-Router-Right(config-ext-nacl)# exit

! Penerapan ke Subinterface
Branch-Router-Right(config)# interface GigabitEthernet0/1.30
Branch-Router-Right(config-subif)# encapsulation dot1Q 30
Branch-Router-Right(config-subif)# ip address 192.168.30.1 255.255.255.240
Branch-Router-Right(config-subif)# ip access-group BLOCK-WEB-ONLY in
Branch-Router-Right(config-subif)# exit

Branch-Router-Right(config)# interface GigabitEthernet0/1.40
Branch-Router-Right(config-subif)# encapsulation dot1Q 40
Branch-Router-Right(config-subif)# ip address 192.168.40.1 255.255.255.240
Branch-Router-Right(config-subif)# ip access-group BLOCK-PING-ONLY in
Branch-Router-Right(config-subif)# exit
\`\`\`

---

### 4. Pengujian & Verifikasi (Testing & Verification)

#### A. Verifikasi Tabel Routing OSPF & EIGRP pada Core-MLS
\`\`\`bash
Core-MultilayerSwitch# show ip route
Gateway of last resort is not set

      8.0.0.0/28 is subnetted, 1 subnets
C        8.8.8.0 is directly connected, GigabitEthernet1/0/5
      10.0.0.0/29 is subnetted, 1 subnets
C        10.10.10.0 is directly connected, GigabitEthernet1/0/1
      20.0.0.0/29 is subnetted, 1 subnets
C        20.20.20.0 is directly connected, GigabitEthernet1/0/4
O     192.168.10.0/28 [110/2] via 10.10.10.2, GigabitEthernet1/0/1
O     192.168.20.0/28 [110/2] via 10.10.10.2, GigabitEthernet1/0/1
D EX  192.168.30.0/28 [170/2560512] via 20.20.20.2, GigabitEthernet1/0/4
D EX  192.168.40.0/28 [170/2560512] via 20.20.20.2, GigabitEthernet1/0/4
\`\`\`
*(Rute dari OSPF masuk sebagai \`O\` dan rute dari EIGRP masuk sebagai \`D EX\` External).*

#### B. Pengujian Policy ACL pada VLAN 30 & VLAN 40
1. **Host di VLAN 30 (\`BLOCK-WEB-ONLY\`)**:
   - PING ke \`8.8.8.8\` -> **SUCCESS (Reply received)**
   - Akses Web Browser HTTP \`http://8.8.8.8\` -> **BLOCKED (Request Timeout)**
2. **Host di VLAN 40 (\`BLOCK-PING-ONLY\`)**:
   - PING ke \`8.8.8.8\` -> **BLOCKED (Destination host unreachable)**
   - Akses Web Browser HTTP \`http://8.8.8.8\` -> **SUCCESS (Webpage Loaded)**

---

### 5. Analisis Teknis & Kesimpulan

1. **Efisiensi Prefix /28**: Penggunaan subnet mask \`255.255.255.240\` menghemat 87.5% alamat IP dibanding menggunakan \`/24\` konvensional di setiap segmen departemen.
2. **Mutual Route Redistribution**: Penggunaan seed metric yang presisi pada EIGRP (\`bandwidth delay reliability load mtu\`) mencegah inkonsistensi routing table antar protokol.
`,
    articleContentEn: `
### 1. Enterprise Multi-Segment & Hybrid Architecture Fundamentals

This **Enterprise Hybrid Routing & Multi-Segment Topology** consolidates enterprise-grade networking paradigms into one cohesive environment:
* **VLAN & Router-on-a-Stick (802.1Q)**: Segregates broadcast domains into VLANs 10, 20, 21, 30, and 40 using compact \`/28\` prefix addressing (14 usable host addresses per segment).
* **Automated DHCP Distribution**: Implements local DHCP relay via \`ip helper-address\` on subinterfaces and native router-based DHCP pools.
* **Hybrid Routing Redistribution**: Bridges **OSPF 100** and **EIGRP 10** routing domains through **Mutual Route Redistribution** on Core Multilayer Switch 3560.
* **Private GRE Tunnel**: Transports private branch traffic across an isolated virtual tunnel link (\`100.100.100.0/30\`).
* **Extended ACL Security Policies**: Enforces distinct application-layer rules (differentiating HTTP port 80 and ICMP PING toward central servers).

---

### 2. IP Addressing & Subnet Table

| Device | Interface / VLAN | IP Address | Subnet Mask | Default Gateway | Function / Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Branch-Left** | Gig0/0.10 | 192.168.10.1 | 255.255.255.240 (/28) | - | VLAN 10 Gateway (DHCP Server LAN) |
| **Branch-Left** | Gig0/0.20 | 192.168.20.1 | 255.255.255.240 (/28) | - | VLAN 20 Gateway (Staff LAN) |
| **Branch-Left** | Gig0/0.21 | 192.168.21.1 | 255.255.255.240 (/28) | - | VLAN 21 Gateway (Management LAN) |
| **Branch-Left** | Gig0/1 | 10.10.10.2 | 255.255.255.248 (/29) | - | Uplink to Core MLS (OSPF 100) |
| **Core-MLS 3560**| Gig1/0/1 | 10.10.10.1 | 255.255.255.248 (/29) | - | Link to Branch-Left (OSPF 100) |
| **Core-MLS 3560**| Gig1/0/2 | 11.11.11.1 | 255.255.255.248 (/29) | - | Transit Router Link (OSPF 100) |
| **Core-MLS 3560**| Gig1/0/3 | 21.21.21.1 | 255.255.255.248 (/29) | - | Branch-Right Link 2 (EIGRP 10) |
| **Core-MLS 3560**| Gig1/0/4 | 20.20.20.1 | 255.255.255.248 (/29) | - | Branch-Right Link 1 (EIGRP 10) |
| **Core-MLS 3560**| Gig1/0/5 | 8.8.8.1 | 255.255.255.240 (/28) | - | Central Google/Web Server Gateway |
| **Branch-Right**| Gig0/0 | 20.20.20.2 | 255.255.255.248 (/29) | - | Uplink to Core MLS (EIGRP 10) |
| **Branch-Right**| Gig0/1.30 | 192.168.30.1 | 255.255.255.240 (/28) | - | VLAN 30 Gateway (Block Web Only) |
| **Branch-Right**| Gig0/1.40 | 192.168.40.1 | 255.255.255.240 (/28) | - | VLAN 40 Gateway (Block Ping Only) |
| **Central Server**| FastEthernet0 | 8.8.8.8 | 255.255.255.240 (/28) | 8.8.8.1 | Central HTTP & DNS Server |

---

### 3. Step-by-Step CLI Configuration

#### Step 1: Subinterfaces Router-on-a-Stick & DHCP Relay on Branch-Router-Left
\`\`\`bash
Router> enable
Router# configure terminal
Router(config)# hostname Branch-Router-Left

! VLAN 10 Subinterface
Branch-Router-Left(config)# interface GigabitEthernet0/0.10
Branch-Router-Left(config-subif)# encapsulation dot1Q 10
Branch-Router-Left(config-subif)# ip address 192.168.10.1 255.255.255.240
Branch-Router-Left(config-subif)# ip helper-address 192.168.10.2
Branch-Router-Left(config-subif)# exit

! VLAN 20 Subinterface
Branch-Router-Left(config)# interface GigabitEthernet0/0.20
Branch-Router-Left(config-subif)# encapsulation dot1Q 20
Branch-Router-Left(config-subif)# ip address 192.168.20.1 255.255.255.240
Branch-Router-Left(config-subif)# ip helper-address 192.168.10.2
Branch-Router-Left(config-subif)# exit

! Enable Physical Interface
Branch-Router-Left(config)# interface GigabitEthernet0/0
Branch-Router-Left(config-if)# no shutdown
Branch-Router-Left(config-if)# exit

! Uplink & OSPF Routing
Branch-Router-Left(config)# interface GigabitEthernet0/1
Branch-Router-Left(config-if)# ip address 10.10.10.2 255.255.255.248
Branch-Router-Left(config-if)# no shutdown
Branch-Router-Left(config-if)# exit

Branch-Router-Left(config)# router ospf 100
Branch-Router-Left(config-router)# router-id 2.2.2.2
Branch-Router-Left(config-router)# network 10.10.10.0 0.0.0.7 area 0
Branch-Router-Left(config-router)# network 192.168.10.0 0.0.0.15 area 0
Branch-Router-Left(config-router)# network 192.168.20.0 0.0.0.15 area 0
Branch-Router-Left(config-router)# network 192.168.21.0 0.0.0.15 area 0
\`\`\`

#### Step 2: Core Multilayer Switch 3560 (OSPF & EIGRP Route Redistribution)
\`\`\`bash
Switch> enable
Switch# configure terminal
Switch(config)# hostname Core-MultilayerSwitch
Switch(config)# ip routing

! Routed Port Setup (no switchport)
Switch(config)# interface GigabitEthernet1/0/1
Switch(config-if)# no switchport
Switch(config-if)# ip address 10.10.10.1 255.255.255.248
Switch(config-if)# exit

Switch(config)# interface GigabitEthernet1/0/4
Switch(config-if)# no switchport
Switch(config-if)# ip address 20.20.20.1 255.255.255.248
Switch(config-if)# exit

Switch(config)# interface GigabitEthernet1/0/5
Switch(config-if)# no switchport
Switch(config-if)# ip address 8.8.8.1 255.255.255.240
Switch(config-if)# exit

! OSPF 100 Redistribution with EIGRP
Switch(config)# router ospf 100
Switch(config-router)# router-id 1.1.1.1
Switch(config-router)# network 10.10.10.0 0.0.0.7 area 0
Switch(config-router)# network 8.8.8.0 0.0.0.15 area 0
Switch(config-router)# redistribute eigrp 10 subnets
Switch(config-router)# exit

! EIGRP 10 Redistribution with OSPF
Switch(config)# router eigrp 10
Switch(config-router)# network 20.20.20.0 0.0.0.7
Switch(config-router)# redistribute ospf 100 metric 10000 100 255 1 1500
Switch(config-router)# exit
\`\`\`

#### Step 3: Branch-Router-Right (DHCP Pools & Extended ACL Policies)
\`\`\`bash
Router> enable
Router# configure terminal
Router(config)# hostname Branch-Router-Right

! Onboard DHCP Pools
Branch-Router-Right(config)# ip dhcp pool VLAN30_RIGHT
Branch-Router-Right(dhcp-config)# network 192.168.30.0 255.255.255.240
Branch-Router-Right(dhcp-config)# default-router 192.168.30.1
Branch-Router-Right(dhcp-config)# exit

Branch-Router-Right(config)# ip dhcp pool VLAN40_RIGHT
Branch-Router-Right(dhcp-config)# network 192.168.40.0 255.255.255.240
Branch-Router-Right(dhcp-config)# default-router 192.168.40.1
Branch-Router-Right(dhcp-config)# exit

! Extended ACL Policies
Branch-Router-Right(config)# ip access-list extended BLOCK-WEB-ONLY
Branch-Router-Right(config-ext-nacl)# permit icmp any host 8.8.8.8
Branch-Router-Right(config-ext-nacl)# deny tcp any host 8.8.8.8 eq 80
Branch-Router-Right(config-ext-nacl)# permit ip any any
Branch-Router-Right(config-ext-nacl)# exit

Branch-Router-Right(config)# ip access-list extended BLOCK-PING-ONLY
Branch-Router-Right(config-ext-nacl)# permit tcp any host 8.8.8.8 eq 80
Branch-Router-Right(config-ext-nacl)# deny icmp any host 8.8.8.8
Branch-Router-Right(config-ext-nacl)# permit ip any any
Branch-Router-Right(config-ext-nacl)# exit

! Attach to Subinterfaces
Branch-Router-Right(config)# interface GigabitEthernet0/1.30
Branch-Router-Right(config-subif)# encapsulation dot1Q 30
Branch-Router-Right(config-subif)# ip address 192.168.30.1 255.255.255.240
Branch-Router-Right(config-subif)# ip access-group BLOCK-WEB-ONLY in
Branch-Router-Right(config-subif)# exit

Branch-Router-Right(config)# interface GigabitEthernet0/1.40
Branch-Router-Right(config-subif)# encapsulation dot1Q 40
Branch-Router-Right(config-subif)# ip address 192.168.40.1 255.255.255.240
Branch-Router-Right(config-subif)# ip access-group BLOCK-PING-ONLY in
Branch-Router-Right(config-subif)# exit
\`\`\`

---

### 4. Verification & Testing

#### A. Routing Table Validation on Core MLS
\`\`\`bash
Core-MultilayerSwitch# show ip route
O     192.168.10.0/28 [110/2] via 10.10.10.2, GigabitEthernet1/0/1
D EX  192.168.30.0/28 [170/2560512] via 20.20.20.2, GigabitEthernet1/0/4
\`\`\`

#### B. ACL Policy Testing
* **VLAN 30 Host**: PING 8.8.8.8 **PERMITTED**, HTTP Web Port 80 **BLOCKED**.
* **VLAN 40 Host**: HTTP Web Port 80 **PERMITTED**, PING 8.8.8.8 **BLOCKED**.
`
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
 passive-interface GigabitEthernet0/1`,
    articleContentId: `
### 1. Pendahuluan & Konsep Dasar Route Redistribution

**Route Redistribution** adalah proses mentranslasikan dan menginjeksi rute yang dipelajari dari satu protokol routing (seperti **RIPv2**) ke dalam protokol routing lain (seperti **OSPF**) dan sebaliknya.

Tantangan utama dalam redistribusi routing adalah **ketidakcocokan metrik (Metric Mismatch)**:
* **OSPF Metric (Cost)**: Dihitung berbasis bandwidth (\`10^8 / Bandwidth in bps\`).
* **RIPv2 Metric (Hop Count)**: Dihitung berbasis jumlah lompatan router (maksimal 15 hop, 16 = unreachable).
* **Seed Metric (Default Metric)**: Saat rute diinjeksi ke protokol baru, metrik aslinya hilang dan harus diberikan nilai awal (*seed metric*). Rute OSPF yang masuk ke RIP wajib diberi metrik manual (\`metric 1–15\`), sedangkan rute RIP yang masuk ke OSPF secara default diberi metric cost 20 (Type 2 / E2).
* **Autonomous System Boundary Router (ASBR)**: Router yang menjalankan kedua protokol sekaligus dan bertindak sebagai jembatan redistribusi.

---

### 2. Skenario & Tabel Pengalamatan IP (Addressing Table)

| Perangkat | Interface | IP Address | Subnet Mask | Default Gateway | Domain Protokol |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Router0** | Gig0/0 | 10.10.10.1 | 255.255.255.252 (/30) | - | OSPF Area 0 (Link ke ASBR) |
| **Router0** | Gig0/1 | 192.168.10.1 | 255.255.255.0 (/24) | - | OSPF Area 0 (LAN PC0) |
| **Router1 (ASBR)** | Gig0/0 | 10.10.10.2 | 255.255.255.252 (/30) | - | OSPF Area 0 (Link ke Router0) |
| **Router1 (ASBR)** | Gig0/1 | 10.10.20.1 | 255.255.255.252 (/30) | - | RIPv2 (Link ke Router2) |
| **Router1 (ASBR)** | Gig0/2 | 192.168.20.1 | 255.255.255.0 (/24) | - | Gateway LAN PC1 (Shared) |
| **Router2** | Gig0/0 | 10.10.20.2 | 255.255.255.252 (/30) | - | RIPv2 (Link ke ASBR) |
| **Router2** | Gig0/1 | 192.168.30.1 | 255.255.255.0 (/24) | - | RIPv2 (LAN PC2) |
| **PC0** | FastEthernet0 | 192.168.10.10 | 255.255.255.0 (/24) | 192.168.10.1 | Client Domain OSPF |
| **PC2** | FastEthernet0 | 192.168.30.10 | 255.255.255.0 (/24) | 192.168.30.1 | Client Domain RIPv2 |

---

### 3. Langkah-Langkah Konfigurasi (Step-by-Step Configuration)

#### Langkah 1: Konfigurasi Router0 (OSPF Area 0)
\`\`\`bash
Router> enable
Router# configure terminal
Router(config)# hostname Router0

Router0(config)# interface GigabitEthernet0/0
Router0(config-if)# ip address 10.10.10.1 255.255.255.252
Router0(config-if)# no shutdown
Router0(config-if)# exit

Router0(config)# interface GigabitEthernet0/1
Router0(config-if)# ip address 192.168.10.1 255.255.255.0
Router0(config-if)# no shutdown
Router0(config-if)# exit

! Konfigurasi Routing OSPF Area 0
Router0(config)# router ospf 1
Router0(config-router)# router-id 1.1.1.1
Router0(config-router)# network 10.10.10.0 0.0.0.3 area 0
Router0(config-router)# network 192.168.10.0 0.0.0.255 area 0
Router0(config-router)# passive-interface GigabitEthernet0/1
Router0(config-router)# exit
\`\`\`

#### Langkah 2: Konfigurasi Router1 (ASBR - Gateway Redistribusi Dua Arah)
\`\`\`bash
Router> enable
Router# configure terminal
Router(config)# hostname Router1

Router1(config)# interface GigabitEthernet0/0
Router1(config-if)# ip address 10.10.10.2 255.255.255.252
Router1(config-if)# no shutdown
Router1(config-if)# exit

Router1(config)# interface GigabitEthernet0/1
Router1(config-if)# ip address 10.10.20.1 255.255.255.252
Router1(config-if)# no shutdown
Router1(config-if)# exit

Router1(config)# interface GigabitEthernet0/2
Router1(config-if)# ip address 192.168.20.1 255.255.255.0
Router1(config-if)# no shutdown
Router1(config-if)# exit

! 1. Konfigurasi OSPF & Redistribusikan RIP ke OSPF
Router1(config)# router ospf 1
Router1(config-router)# router-id 2.2.2.2
Router1(config-router)# network 10.10.10.0 0.0.0.3 area 0
Router1(config-router)# network 192.168.20.0 0.0.0.255 area 0
Router1(config-router)# passive-interface GigabitEthernet0/2
Router1(config-router)# redistribute rip subnets metric-type 2 metric 20
Router1(config-router)# exit

! 2. Konfigurasi RIPv2 & Redistribusikan OSPF ke RIP (Seed Metric = 5)
Router1(config)# router rip
Router1(config-router)# version 2
Router1(config-router)# no auto-summary
Router1(config-router)# network 10.0.0.0
Router1(config-router)# passive-interface GigabitEthernet0/0
Router1(config-router)# redistribute ospf 1 metric 5
Router1(config-router)# exit
\`\`\`

#### Langkah 3: Konfigurasi Router2 (RIPv2 Domain)
\`\`\`bash
Router> enable
Router# configure terminal
Router(config)# hostname Router2

Router2(config)# interface GigabitEthernet0/0
Router2(config-if)# ip address 10.10.20.2 255.255.255.252
Router2(config-if)# no shutdown
Router2(config-if)# exit

Router2(config)# interface GigabitEthernet0/1
Router2(config-if)# ip address 192.168.30.1 255.255.255.0
Router2(config-if)# no shutdown
Router2(config-if)# exit

! Konfigurasi RIPv2
Router2(config)# router rip
Router2(config-router)# version 2
Router2(config-router)# no auto-summary
Router2(config-router)# network 10.0.0.0
Router2(config-router)# network 192.168.30.0
Router2(config-router)# passive-interface GigabitEthernet0/1
Router2(config-router)# exit
\`\`\`

---

### 4. Pengujian & Verifikasi (Testing & Verification)

#### A. Verifikasi Tabel Routing pada Router0 (OSPF)
\`\`\`bash
Router0# show ip route
Gateway of last resort is not set

      10.0.0.0/30 is subnetted, 1 subnets
C        10.10.10.0 is directly connected, GigabitEthernet0/0
O     10.10.20.0/30 [110/20] via 10.10.10.2, GigabitEthernet0/0
C     192.168.10.0/24 is directly connected, GigabitEthernet0/1
O     192.168.20.0/24 [110/2] via 10.10.10.2, GigabitEthernet0/0
O E2  192.168.30.0/24 [110/20] via 10.10.10.2, GigabitEthernet0/0
\`\`\`
*(Rute network RIP \`192.168.30.0/24\` berhasil dipelajari oleh OSPF dengan kode \`O E2\` - OSPF External Type 2).*

#### B. Verifikasi Tabel Routing pada Router2 (RIP)
\`\`\`bash
Router2# show ip route
Gateway of last resort is not set

R     10.10.10.0/30 [120/5] via 10.10.20.1, GigabitEthernet0/0
C     10.10.20.0/30 is directly connected, GigabitEthernet0/0
R     192.168.10.0/24 [120/5] via 10.10.20.1, GigabitEthernet0/0
R     192.168.20.0/24 [120/1] via 10.10.20.1, GigabitEthernet0/0
C     192.168.30.0/24 is directly connected, GigabitEthernet0/1
\`\`\`
*(Rute network OSPF \`192.168.10.0/24\` berhasil dipelajari oleh RIP dengan metrik \`5\`).*

#### C. Uji Ping End-to-End (PC0 ke PC2)
\`\`\`bash
PC0> ping 192.168.30.10

Pinging 192.168.30.10 with 32 bytes of data:
Reply from 192.168.30.10: bytes=32 time<1ms TTL=126
Reply from 192.168.30.10: bytes=32 time<1ms TTL=126
Reply from 192.168.30.10: bytes=32 time<1ms TTL=126
Reply from 192.168.30.10: bytes=32 time<1ms TTL=126

Ping statistics for 192.168.30.10:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)
\`\`\`
*(Hasil: **100% SUKSES**)*

---

### 5. Analisis Teknis & Kesimpulan

1. **Pentingnya Keyword \`subnets\`**: Pada Cisco IOS, perintah \`redistribute rip subnets\` wajib menyertakan kata \`subnets\`. Tanpa kata ini, OSPF hanya akan mendistribusikan rute classful (Class A/B/C standar) dan membuang subnet ber-prefix variable (VLSM).
2. **Penetapan Seed Metric**: Karena RIPv2 tidak dapat membaca cost bandwidth OSPF, jika kita lupa menyetel \`metric\` saat redistribusi ke RIP, RIP akan menganggap metrik bernilai infinity (16) dan rute tidak akan pernah masuk ke tabel routing.
`,
    articleContentEn: `
### 1. Introduction & Route Redistribution Fundamentals

**Route Redistribution** is the process of translating and injecting routing information learned from one dynamic routing protocol (e.g. **RIPv2**) into another (e.g. **OSPF**) and vice versa.

The core engineering challenge in multi-protocol routing is **Metric Incompatibility**:
* **OSPF Metric (Cost)**: Bandwidth-derived calculation (\`10^8 / Bandwidth in bps\`).
* **RIPv2 Metric (Hop Count)**: Distance-vector hop tally (maximum 15 hops; 16 represents infinity/unreachable).
* **Seed Metric**: When injecting foreign routes, native metrics are stripped and must be assigned an initial seed metric. OSPF routes redistributed into RIP require manual metric assignment (\`metric 1–15\`), whereas RIP routes into OSPF default to Cost 20 (External Type 2 / E2).
* **Autonomous System Boundary Router (ASBR)**: The dual-stack router running both routing processes simultaneously.

---

### 2. IP Addressing & Subnet Table

| Device | Interface | IP Address | Subnet Mask | Default Gateway | Routing Domain |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Router0** | Gig0/0 | 10.10.10.1 | 255.255.255.252 (/30) | - | OSPF Area 0 (Link to ASBR) |
| **Router0** | Gig0/1 | 192.168.10.1 | 255.255.255.0 (/24) | - | OSPF Area 0 (PC0 LAN) |
| **Router1 (ASBR)** | Gig0/0 | 10.10.10.2 | 255.255.255.252 (/30) | - | OSPF Area 0 (Link to Router0) |
| **Router1 (ASBR)** | Gig0/1 | 10.10.20.1 | 255.255.255.252 (/30) | - | RIPv2 (Link to Router2) |
| **Router1 (ASBR)** | Gig0/2 | 192.168.20.1 | 255.255.255.0 (/24) | - | Gateway PC1 LAN (Shared) |
| **Router2** | Gig0/0 | 10.10.20.2 | 255.255.255.252 (/30) | - | RIPv2 (Link to ASBR) |
| **Router2** | Gig0/1 | 192.168.30.1 | 255.255.255.0 (/24) | - | RIPv2 (PC2 LAN) |
| **PC0** | FastEthernet0 | 192.168.10.10 | 255.255.255.0 (/24) | 192.168.10.1 | OSPF Client Host |
| **PC2** | FastEthernet0 | 192.168.30.10 | 255.255.255.0 (/24) | 192.168.30.1 | RIPv2 Client Host |

---

### 3. Step-by-Step CLI Configuration

#### Step 1: Configure Router0 (OSPF Area 0)
\`\`\`bash
Router> enable
Router# configure terminal
Router(config)# hostname Router0

Router0(config)# interface GigabitEthernet0/0
Router0(config-if)# ip address 10.10.10.1 255.255.255.252
Router0(config-if)# no shutdown
Router0(config-if)# exit

Router0(config)# interface GigabitEthernet0/1
Router0(config-if)# ip address 192.168.10.1 255.255.255.0
Router0(config-if)# no shutdown
Router0(config-if)# exit

Router0(config)# router ospf 1
Router0(config-router)# router-id 1.1.1.1
Router0(config-router)# network 10.10.10.0 0.0.0.3 area 0
Router0(config-router)# network 192.168.10.0 0.0.0.255 area 0
Router0(config-router)# passive-interface GigabitEthernet0/1
\`\`\`

#### Step 2: Configure Router1 (Dual-Protocol ASBR Gateway)
\`\`\`bash
Router> enable
Router# configure terminal
Router(config)# hostname Router1

Router1(config)# interface GigabitEthernet0/0
Router1(config-if)# ip address 10.10.10.2 255.255.255.252
Router1(config-if)# no shutdown
Router1(config-if)# exit

Router1(config)# interface GigabitEthernet0/1
Router1(config-if)# ip address 10.10.20.1 255.255.255.252
Router1(config-if)# no shutdown
Router1(config-if)# exit

Router1(config)# interface GigabitEthernet0/2
Router1(config-if)# ip address 192.168.20.1 255.255.255.0
Router1(config-if)# no shutdown
Router1(config-if)# exit

! 1. OSPF Process & RIP Redistribution
Router1(config)# router ospf 1
Router1(config-router)# router-id 2.2.2.2
Router1(config-router)# network 10.10.10.0 0.0.0.3 area 0
Router1(config-router)# network 192.168.20.0 0.0.0.255 area 0
Router1(config-router)# passive-interface GigabitEthernet0/2
Router1(config-router)# redistribute rip subnets metric-type 2 metric 20
Router1(config-router)# exit

! 2. RIPv2 Process & OSPF Redistribution (Seed Metric = 5)
Router1(config)# router rip
Router1(config-router)# version 2
Router1(config-router)# no auto-summary
Router1(config-router)# network 10.0.0.0
Router1(config-router)# passive-interface GigabitEthernet0/0
Router1(config-router)# redistribute ospf 1 metric 5
Router1(config-router)# exit
\`\`\`

#### Step 3: Configure Router2 (RIPv2 Domain)
\`\`\`bash
Router> enable
Router# configure terminal
Router(config)# hostname Router2

Router2(config)# interface GigabitEthernet0/0
Router2(config-if)# ip address 10.10.20.2 255.255.255.252
Router2(config-if)# no shutdown
Router2(config-if)# exit

Router2(config)# interface GigabitEthernet0/1
Router2(config-if)# ip address 192.168.30.1 255.255.255.0
Router2(config-if)# no shutdown
Router2(config-if)# exit

Router2(config)# router rip
Router2(config-router)# version 2
Router2(config-router)# no auto-summary
Router2(config-router)# network 10.0.0.0
Router2(config-router)# network 192.168.30.0
Router2(config-router)# passive-interface GigabitEthernet0/1
\`\`\`

---

### 4. Verification & Testing

#### A. OSPF Routing Table Check on Router0
\`\`\`bash
Router0# show ip route
O E2  192.168.30.0/24 [110/20] via 10.10.10.2, GigabitEthernet0/0
\`\`\`
*(RIP network is properly imported with code \`O E2\` and metric 20).*

#### B. RIP Routing Table Check on Router2
\`\`\`bash
Router2# show ip route
R     192.168.10.0/24 [120/5] via 10.10.20.1, GigabitEthernet0/0
\`\`\`
*(OSPF network is properly imported with hop count 5).*

#### C. End-to-End Ping Test (PC0 to PC2)
\`\`\`bash
PC0> ping 192.168.30.10
Reply from 192.168.30.10: bytes=32 time<1ms TTL=126
\`\`\`
*(Result: **100% SUCCESS**)*
`
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
 permit any`,
    articleContentId: `
### 1. Pendahuluan & Konsep Dasar Standard ACL

**Access Control List (ACL)** adalah kumpulan aturan (*rule filtering*) sekuensial yang diterapkan pada antarmuka router untuk mengontrol paket data yang masuk (*inbound*) maupun keluar (*outbound*). 

Pada arsitektur jaringan Cisco IOS, **Standard ACL** beroperasi pada **Layer 3 (Network Layer)** dengan karakteristik utama:
* **Hanya memeriksa IP Address Sumber (Source IP Address)** dari paket yang melintas.
* **Rentang Nomor ACL**: Berada di rentang standar \`1 – 99\` atau rentang diperluas \`1300 – 1999\`, serta mendukung **Named Standard ACL** (\`ip access-list standard <NAME>\`).
* **Prinsip Penempatan (Golden Rule)**: Standard ACL harus ditempatkan **sedekat mungkin dengan tujuan (closest to the destination)**. Jika ditempatkan di dekat sumber, ia berisiko memblokir akses host tersebut ke seluruh tujuan lain yang sah.
* **Implicit Deny Any**: Secara default di baris paling akhir setiap ACL selalu terdapat aturan tersembunyi \`deny any\`. Jika tidak ada \`permit\`, semua paket lainnya akan terbuang (*dropped*).

---

### 2. Skenario & Tabel Pengalamatan IP (Addressing Table)

Dalam lab simulasi ini, kita ingin mengamankan akses ke **Server0 (192.168.20.10)** yang berada di belakang **Router1**:
1. **PC0 (192.168.10.10)**: Diizinkan mengakses Server0 (**PERMIT / DITERIMA**).
2. **PC1 (192.168.10.20)**: Diblokir total dari Server0 (**DENY / DITOLAK**).

| Perangkat | Antarmuka / Interface | IP Address | Subnet Mask | Default Gateway | Keterangan |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Router0** | Gig0/1 | 192.168.10.1 | 255.255.255.0 (/24) | - | Gateway Segmen LAN Klien |
| **Router0** | Gig0/0 | 10.10.10.1 | 255.255.255.252 (/30) | - | Inter-Router Link (ke Router1) |
| **Router1** | Gig0/0 | 10.10.10.2 | 255.255.255.252 (/30) | - | Inter-Router Link (ke Router0) |
| **Router1** | Gig0/1 | 192.168.20.1 | 255.255.255.0 (/24) | - | Gateway Segmen Server (Filter ACL) |
| **PC0** | FastEthernet0 | 192.168.10.10 | 255.255.255.0 (/24) | 192.168.10.1 | Klien Diizinkan (*Permitted*) |
| **PC1** | FastEthernet0 | 192.168.10.20 | 255.255.255.0 (/24) | 192.168.10.1 | Klien Diblokir (*Denied*) |
| **Server0** | FastEthernet0 | 192.168.20.10 | 255.255.255.0 (/24) | 192.168.20.1 | Target Resource Terproteksi |

---

### 3. Langkah-Langkah Konfigurasi (Step-by-Step Configuration)

#### Langkah 1: Konfigurasi Interface & Routing Static pada Router0
\`\`\`bash
Router> enable
Router# configure terminal
Router(config)# hostname Router0

! Konfigurasi link penghubung antar-router
Router0(config)# interface GigabitEthernet0/0
Router0(config-if)# ip address 10.10.10.1 255.255.255.252
Router0(config-if)# no shutdown
Router0(config-if)# exit

! Konfigurasi gateway LAN klien (PC0 & PC1)
Router0(config)# interface GigabitEthernet0/1
Router0(config-if)# ip address 192.168.10.1 255.255.255.0
Router0(config-if)# no shutdown
Router0(config-if)# exit

! Routing statik menuju network server di Router1
Router0(config)# ip route 192.168.20.0 255.255.255.0 10.10.10.2
Router0(config)# exit
Router0# write memory
\`\`\`

#### Langkah 2: Konfigurasi Interface & Routing Static pada Router1
\`\`\`bash
Router> enable
Router# configure terminal
Router(config)# hostname Router1

! Konfigurasi link penghubung antar-router
Router1(config)# interface GigabitEthernet0/0
Router1(config-if)# ip address 10.10.10.2 255.255.255.252
Router1(config-if)# no shutdown
Router1(config-if)# exit

! Konfigurasi gateway segmen Server
Router1(config)# interface GigabitEthernet0/1
Router1(config-if)# ip address 192.168.20.1 255.255.255.0
Router1(config-if)# no shutdown
Router1(config-if)# exit

! Routing statik balik menuju network klien di Router0
Router1(config)# ip route 192.168.10.0 255.255.255.0 10.10.10.1
\`\`\`

#### Langkah 3: Membuat & Menerapkan Named Standard ACL pada Router1
Kita membuat ACL bernama \`FILTER-SERVER-ACCESS\` yang secara eksplisit menolak IP PC1 (\`192.168.10.20\`) dan mengizinkan traffic lainnya (\`permit any\`).

\`\`\`bash
! Membuat Named Standard ACL
Router1(config)# ip access-list standard FILTER-SERVER-ACCESS
Router1(config-std-nacl)# deny host 192.168.10.20
Router1(config-std-nacl)# permit any
Router1(config-std-nacl)# exit

! Menerapkan ACL pada interface Gig0/1 arah OUTBOUND (menuju Server0)
Router1(config)# interface GigabitEthernet0/1
Router1(config-if)# ip access-group FILTER-SERVER-ACCESS out
Router1(config-if)# exit
Router1(config)# exit
Router1# write memory
\`\`\`

> **Catatan Teknis**: Kita menggunakan arah \`out\` pada \`GigabitEthernet0/1\` karena paket yang datang dari Router0 (\`Gig0/0\`) menuju Server0 keluar melewati antarmuka \`Gig0/1\`.

---

### 4. Pengujian & Verifikasi (Testing & Verification)

#### A. Verifikasi Status ACL & Counter Paket pada Router1
Jalankan perintah \`show access-lists\` untuk melihat kecocokan (*matches*) paket pada aturan:
\`\`\`bash
Router1# show access-lists
Standard IP access list FILTER-SERVER-ACCESS
    10 deny 192.168.10.20 (4 matches)
    20 permit any (8 matches)
\`\`\`

#### B. Pengujian Konektivitas dari PC0 (192.168.10.10)
Buka Terminal / Command Prompt pada **PC0** lalu jalankan ping ke Server:
\`\`\`bash
PC0> ping 192.168.20.10

Pinging 192.168.20.10 with 32 bytes of data:
Reply from 192.168.20.10: bytes=32 time<1ms TTL=126
Reply from 192.168.20.10: bytes=32 time<1ms TTL=126
Reply from 192.168.20.10: bytes=32 time<1ms TTL=126
Reply from 192.168.20.10: bytes=32 time<1ms TTL=126

Ping statistics for 192.168.20.10:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)
\`\`\`
*(Hasil: **SUCCESS / DITERIMA**)*

#### C. Pengujian Pemblokiran dari PC1 (192.168.10.20)
Buka Terminal / Command Prompt pada **PC1** lalu jalankan ping ke Server:
\`\`\`bash
PC1> ping 192.168.20.10

Pinging 192.168.20.10 with 32 bytes of data:
Reply from 10.10.10.2: Destination host unreachable.
Reply from 10.10.10.2: Destination host unreachable.
Reply from 10.10.10.2: Destination host unreachable.
Reply from 10.10.10.2: Destination host unreachable.

Ping statistics for 192.168.20.10:
    Packets: Sent = 4, Received = 0, Lost = 4 (100% loss)
\`\`\`
*(Hasil: **DENIED / DITOLAK** - Router1 merespons dengan *Destination host unreachable*).*

---

### 5. Analisis & Kesimpulan Teknis

1. **Efektivitas Filtering**: Standard ACL berhasil membedakan hak akses berdasarkan Source IP Address tanpa membebani overhead CPU router secara signifikan.
2. **Kelemahan Standard ACL**: Standard ACL tidak dapat memfilter berdasarkan jenis protokol (misalnya mengizinkan Web HTTP port 80 tetapi memblokir PING ICMP). Untuk kebutuhan filtrasi berbasis port & protokol Layer 4, solusi yang tepat adalah mengimplementasikan **Extended ACL (100–199)**.
3. **Best Practice Urutan Rule**: Aturan spesifik (\`deny host 192.168.10.20\`) wajib ditempatkan sebelum aturan umum (\`permit any\`), karena evaluasi ACL berjalan dari atas ke bawah (*top-to-bottom*) dan berhenti pada kecocokan pertama.
`,
    articleContentEn: `
### 1. Introduction & Standard ACL Fundamentals

An **Access Control List (ACL)** is an ordered series of filtering rules applied to router interfaces to inspect and manage inbound or outbound network traffic.

Within the Cisco IOS environment, **Standard Access Control Lists** operate at **Layer 3 (Network Layer)** with specific key behaviors:
* **Source IP Address Filtering Only**: Inspects exclusively the source IPv4 address of incoming/outgoing packets.
* **Numbered & Named Ranges**: Uses standard numbered ranges \`1 – 99\` (expanded \`1300 – 1999\`) or human-readable **Named Standard ACLs** (\`ip access-list standard <NAME>\`).
* **Golden Placement Rule**: Standard ACLs must always be positioned **closest to the destination**. Placing standard ACLs near the source risks inadvertently blocking that host from accessing other valid destinations.
* **Implicit Deny Any**: An invisible \`deny any\` rule is automatically appended at the bottom of every ACL. Any traffic not explicitly permitted will be dropped.

---

### 2. Topology Scenario & IP Addressing Table

In this simulation lab, our objective is to secure access towards **Server0 (192.168.20.10)** hosted behind **Router1**:
1. **PC0 (192.168.10.10)**: Granted full access to Server0 (**PERMITTED**).
2. **PC1 (192.168.10.20)**: Strictly blocked from Server0 (**DENIED**).

| Device | Interface | IP Address | Subnet Mask | Default Gateway | Function / Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Router0** | Gig0/1 | 192.168.10.1 | 255.255.255.0 (/24) | - | Client LAN Segment Gateway |
| **Router0** | Gig0/0 | 10.10.10.1 | 255.255.255.252 (/30) | - | Point-to-Point Link (to Router1) |
| **Router1** | Gig0/0 | 10.10.10.2 | 255.255.255.252 (/30) | - | Point-to-Point Link (to Router0) |
| **Router1** | Gig0/1 | 192.168.20.1 | 255.255.255.0 (/24) | - | Server Segment Gateway (ACL Filter) |
| **PC0** | FastEthernet0 | 192.168.10.10 | 255.255.255.0 (/24) | 192.168.10.1 | Permitted Client Host |
| **PC1** | FastEthernet0 | 192.168.10.20 | 255.255.255.0 (/24) | 192.168.10.1 | Denied / Blocked Client Host |
| **Server0** | FastEthernet0 | 192.168.20.10 | 255.255.255.0 (/24) | 192.168.20.1 | Protected Target Server |

---

### 3. Step-by-Step CLI Configuration

#### Step 1: Configure Interfaces and Static Routing on Router0
\`\`\`bash
Router> enable
Router# configure terminal
Router(config)# hostname Router0

! Inter-router point-to-point interface
Router0(config)# interface GigabitEthernet0/0
Router0(config-if)# ip address 10.10.10.1 255.255.255.252
Router0(config-if)# no shutdown
Router0(config-if)# exit

! Client LAN gateway interface
Router0(config)# interface GigabitEthernet0/1
Router0(config-if)# ip address 192.168.10.1 255.255.255.0
Router0(config-if)# no shutdown
Router0(config-if)# exit

! Static route to target server subnet
Router0(config)# ip route 192.168.20.0 255.255.255.0 10.10.10.2
Router0(config)# exit
Router0# write memory
\`\`\`

#### Step 2: Configure Interfaces and Static Routing on Router1
\`\`\`bash
Router> enable
Router# configure terminal
Router(config)# hostname Router1

! Inter-router point-to-point interface
Router1(config)# interface GigabitEthernet0/0
Router1(config-if)# ip address 10.10.10.2 255.255.255.252
Router1(config-if)# no shutdown
Router1(config-if)# exit

! Server segment gateway interface
Router1(config)# interface GigabitEthernet0/1
Router1(config-if)# ip address 192.168.20.1 255.255.255.0
Router1(config-if)# no shutdown
Router1(config-if)# exit

! Static return route to client subnet
Router1(config)# ip route 192.168.10.0 255.255.255.0 10.10.10.1
\`\`\`

#### Step 3: Define & Apply Named Standard ACL on Router1
Create a Named Standard ACL named \`FILTER-SERVER-ACCESS\` denying PC1 (\`192.168.10.20\`) while permitting all other traffic (\`permit any\`).

\`\`\`bash
! Define Named Standard ACL
Router1(config)# ip access-list standard FILTER-SERVER-ACCESS
Router1(config-std-nacl)# deny host 192.168.10.20
Router1(config-std-nacl)# permit any
Router1(config-std-nacl)# exit

! Apply ACL outbound on GigabitEthernet0/1 facing Server0
Router1(config)# interface GigabitEthernet0/1
Router1(config-if)# ip access-group FILTER-SERVER-ACCESS out
Router1(config-if)# exit
Router1(config)# exit
Router1# write memory
\`\`\`

---

### 4. Verification & Testing

#### A. Inspect ACL Matches on Router1
Run \`show access-lists\` to verify packet match counters:
\`\`\`bash
Router1# show access-lists
Standard IP access list FILTER-SERVER-ACCESS
    10 deny 192.168.10.20 (4 matches)
    20 permit any (8 matches)
\`\`\`

#### B. Test Connectivity from Permitted Host PC0 (192.168.10.10)
Execute ping command to Server0 from **PC0**:
\`\`\`bash
PC0> ping 192.168.20.10

Pinging 192.168.20.10 with 32 bytes of data:
Reply from 192.168.20.10: bytes=32 time<1ms TTL=126
Reply from 192.168.20.10: bytes=32 time<1ms TTL=126
Reply from 192.168.20.10: bytes=32 time<1ms TTL=126
Reply from 192.168.20.10: bytes=32 time<1ms TTL=126

Ping statistics for 192.168.20.10:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)
\`\`\`
*(Result: **SUCCESS / PERMITTED**)*

#### C. Test Blocked Connectivity from Denied Host PC1 (192.168.10.20)
Execute ping command to Server0 from **PC1**:
\`\`\`bash
PC1> ping 192.168.20.10

Pinging 192.168.20.10 with 32 bytes of data:
Reply from 10.10.10.2: Destination host unreachable.
Reply from 10.10.10.2: Destination host unreachable.
Reply from 10.10.10.2: Destination host unreachable.
Reply from 10.10.10.2: Destination host unreachable.

Ping statistics for 192.168.20.10:
    Packets: Sent = 4, Received = 0, Lost = 4 (100% loss)
\`\`\`
*(Result: **BLOCKED / DENIED** - Router1 returns *Destination host unreachable*).*

---

### 5. Technical Takeaways & Architecture Notes

1. **Granular Layer 3 Filtering**: Standard ACL successfully isolates single problematic or unauthorized endpoints based on Source IP without requiring expensive specialized firewall hardware.
2. **Standard vs Extended Limitations**: Standard ACL cannot differentiate application protocols (e.g. allow HTTP port 80 while blocking ICMP PING). For Layer 4 protocol-aware policies, **Extended ACLs (100–199)** are recommended.
3. **Sequential Rule Processing**: Specific rules (\`deny host 192.168.10.20\`) must precede generic rules (\`permit any\`) due to Cisco IOS top-to-bottom first-match evaluation logic.
`
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
    downloadPkt: "/downloads/natoverload_topology.pkt",
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
 ip address 192.168.20.1 255.255.2! Static route back to Router-NAT public IP / subnet
ip route 1.1.1.0 255.255.255.252 1.1.1.1`,
    articleContentId: `
### 1. Pendahuluan & Konsep Dasar NAT Overload (PAT)

**Network Address Translation (NAT)** adalah teknologi yang mentranslasikan alamat IP privat (RFC 1918) di jaringan internal menjadi alamat IP publik yang dapat dirutekan di internet global.

**NAT Overload (Port Address Translation / PAT)**:
* **Mekanisme Translasi**: Memetakan banyak IP privat ke **satu IP publik tunggal** dengan memanfaatkan nomor port Layer 4 unik (TCP/UDP source port).
* **Efisiensi Alamat**: Satu alamat IP publik dapat menangani hingga lebih dari 60.000 koneksi simultan.
* **Komponen Konfigurasi Cisco**:
  1. Menentukan interface \`ip nat inside\` (menghadap LAN) dan \`ip nat outside\` (menghadap ISP/Internet).
  2. Mendefinisikan **Standard ACL** untuk menentukan subnet LAN yang diizinkan ditranslasikan.
  3. Mengaktifkan binding NAT dengan perintah \`ip nat inside source list <ACL> interface <OUTSIDE_INT> overload\`.

---

### 2. Skenario & Tabel Pengalamatan IP (Addressing Table)

| Perangkat | Interface | IP Address | Subnet Mask | Default Gateway | Peran / Deskripsi |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Router-NAT** | Gig0/1 (Inside) | 192.168.10.1 | 255.255.255.0 (/24) | - | Gateway LAN Privat |
| **Router-NAT** | Gig0/0 (Outside) | 1.1.1.1 | 255.255.255.252 (/30) | - | IP Publik Edge (NAT Pool) |
| **Router-ISP** | Gig0/0 | 1.1.1.2 | 255.255.255.252 (/30) | - | Gateway ISP Provider |
| **Router-ISP** | Gig0/1 | 192.168.20.1 | 255.255.255.0 (/24) | - | Gateway Server Internet |
| **PC0** | FastEthernet0 | 192.168.10.10 | 255.255.255.0 (/24) | 192.168.10.1 | Klien LAN Lokal |
| **PC1** | FastEthernet0 | 192.168.10.20 | 255.255.255.0 (/24) | 192.168.10.1 | Klien LAN Lokal |
| **Server-WEB** | FastEthernet0 | 192.168.20.10 | 255.255.255.0 (/24) | 192.168.20.1 | Web/DNS Server Internet |

---

### 3. Langkah-Langkah Konfigurasi (Step-by-Step Configuration)

#### Langkah 1: Konfigurasi Interface Inside & Outside pada Router-NAT
\`\`\`bash
Router> enable
Router# configure terminal
Router(config)# hostname Router-NAT

! 1. Konfigurasi Interface LAN Privat (Inside)
Router-NAT(config)# interface GigabitEthernet0/1
Router-NAT(config-if)# ip address 192.168.10.1 255.255.255.0
Router-NAT(config-if)# ip nat inside
Router-NAT(config-if)# no shutdown
Router-NAT(config-if)# exit

! 2. Konfigurasi Interface WAN Publik (Outside)
Router-NAT(config)# interface GigabitEthernet0/0
Router-NAT(config-if)# ip address 1.1.1.1 255.255.255.252
Router-NAT(config-if)# ip nat outside
Router-NAT(config-if)# no shutdown
Router-NAT(config-if)# exit
\`\`\`

#### Langkah 2: Konfigurasi ACL & Perintah NAT Overload (PAT)
\`\`\`bash
! Membuat Standard ACL untuk Subnet LAN 192.168.10.0/24
Router-NAT(config)# access-list 1 permit 192.168.10.0 0.0.0.255

! Mengaktifkan PAT Overload ke antarmuka Gig0/0
Router-NAT(config)# ip nat inside source list 1 interface GigabitEthernet0/0 overload

! Default Route ke ISP
Router-NAT(config)# ip route 0.0.0.0 0.0.0.0 1.1.1.2
Router-NAT(config)# exit
Router-NAT# write memory
\`\`\`

#### Langkah 3: Konfigurasi Router-ISP
\`\`\`bash
Router> enable
Router# configure terminal
Router(config)# hostname Router-ISP

Router-ISP(config)# interface GigabitEthernet0/0
Router-ISP(config-if)# ip address 1.1.1.2 255.255.255.252
Router-ISP(config-if)# no shutdown
Router-ISP(config-if)# exit

Router-ISP(config)# interface GigabitEthernet0/1
Router-ISP(config-if)# ip address 192.168.20.1 255.255.255.0
Router-ISP(config-if)# no shutdown
Router-ISP(config-if)# exit

! Routing statik balik ke IP publik Router-NAT
Router-ISP(config)# ip route 1.1.1.0 255.255.255.252 1.1.1.1
Router-ISP(config)# exit
\`\`\`

---

### 4. Pengujian & Verifikasi (Testing & Verification)

#### A. Verifikasi Tabel Translasi NAT (\`show ip nat translations\`)
Jalankan ping atau buka web dari PC0/PC1 ke Server Internet, lalu periksa tabel translasi:
\`\`\`bash
Router-NAT# show ip nat translations
Pro Inside global      Inside local       Outside local      Outside global
icmp 1.1.1.1:1         192.168.10.10:1    192.168.20.10:1    192.168.20.10:1
icmp 1.1.1.1:2         192.168.10.20:2    192.168.20.10:2    192.168.20.10:2
tcp  1.1.1.1:1025      192.168.10.10:1025 192.168.20.10:80   192.168.20.10:80
\`\`\`
*(Perhatikan bahwa kedua IP privat \`192.168.10.10\` dan \`192.168.10.20\` berhasil ditranslasikan ke alamat publik yang sama \`1.1.1.1\` dengan nomor port berbeda).*

#### B. Pengujian Akses Internet dari PC Klien
\`\`\`bash
PC0> ping 192.168.20.10
Reply from 192.168.20.10: bytes=32 time<1ms TTL=126
\`\`\`
*(Hasil: **100% SUKSES**)*

---

### 5. Analisis Teknis & Kesimpulan

1. **Efisiensi IPv4 Publik**: Ratusan perangkat dalam kantor cabang dapat berbagi 1 alamat IPv4 publik tanpa perlu membeli blok IP tambahan dari penyedia ISP.
2. **Keamanan Alami (Security Obscurity)**: Alamat IP internal tidak terekspos ke internet luar karena router membuang koneksi inbound yang tidak diinisiasi oleh host internal.
`,
    articleContentEn: `
### 1. Introduction & NAT Overload (PAT) Fundamentals

**Network Address Translation (NAT)** translates private IP address spaces (RFC 1918) within internal local area networks into globally routable public IP addresses.

**NAT Overload (Port Address Translation / PAT)**:
* **Mechanism**: Maps multiple internal private IPs to a **single public IP address** by tracking distinct Layer 4 source port numbers (TCP/UDP).
* **Address Scalability**: A single public IPv4 address comfortably multiplexes tens of thousands of concurrent connections.
* **Key Configuration Steps**:
  1. Define \`ip nat inside\` (LAN side) and \`ip nat outside\` (WAN/ISP side).
  2. Create a Standard ACL matching the permitted internal subnet.
  3. Bind the ACL to the egress interface with \`ip nat inside source list <ACL> interface <INT> overload\`.

---

### 2. IP Addressing & Subnet Table

| Device | Interface | IP Address | Subnet Mask | Default Gateway | Function / Role |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Router-NAT** | Gig0/1 (Inside) | 192.168.10.1 | 255.255.255.0 (/24) | - | Private LAN Gateway |
| **Router-NAT** | Gig0/0 (Outside) | 1.1.1.1 | 255.255.255.252 (/30) | - | Public WAN Edge IP |
| **Router-ISP** | Gig0/0 | 1.1.1.2 | 255.255.255.252 (/30) | - | ISP Gateway Interface |
| **Router-ISP** | Gig0/1 | 192.168.20.1 | 255.255.255.0 (/24) | - | Internet Server Gateway |
| **PC0** | FastEthernet0 | 192.168.10.10 | 255.255.255.0 (/24) | 192.168.10.1 | Internal LAN Client |
| **PC1** | FastEthernet0 | 192.168.10.20 | 255.255.255.0 (/24) | 192.168.10.1 | Internal LAN Client |
| **Server-WEB** | FastEthernet0 | 192.168.20.10 | 255.255.255.0 (/24) | 192.168.20.1 | Public Target Server |

---

### 3. Step-by-Step CLI Configuration

#### Step 1: Configure Inside & Outside Interfaces on Router-NAT
\`\`\`bash
Router> enable
Router# configure terminal
Router(config)# hostname Router-NAT

Router-NAT(config)# interface GigabitEthernet0/1
Router-NAT(config-if)# ip address 192.168.10.1 255.255.255.0
Router-NAT(config-if)# ip nat inside
Router-NAT(config-if)# no shutdown
Router-NAT(config-if)# exit

Router-NAT(config)# interface GigabitEthernet0/0
Router-NAT(config-if)# ip address 1.1.1.1 255.255.255.252
Router-NAT(config-if)# ip nat outside
Router-NAT(config-if)# no shutdown
Router-NAT(config-if)# exit
\`\`\`

#### Step 2: Configure Access-List and Enable PAT Overload
\`\`\`bash
Router-NAT(config)# access-list 1 permit 192.168.10.0 0.0.0.255
Router-NAT(config)# ip nat inside source list 1 interface GigabitEthernet0/0 overload
Router-NAT(config)# ip route 0.0.0.0 0.0.0.0 1.1.1.2
Router-NAT(config)# exit
Router-NAT# write memory
\`\`\`

#### Step 3: Configure Router-ISP
\`\`\`bash
Router> enable
Router# configure terminal
Router(config)# hostname Router-ISP

Router-ISP(config)# interface GigabitEthernet0/0
Router-ISP(config-if)# ip address 1.1.1.2 255.255.255.252
Router-ISP(config-if)# no shutdown
Router-ISP(config-if)# exit

Router-ISP(config)# interface GigabitEthernet0/1
Router-ISP(config-if)# ip address 192.168.20.1 255.255.255.0
Router-ISP(config-if)# no shutdown
Router-ISP(config-if)# exit

Router-ISP(config)# ip route 1.1.1.0 255.255.255.252 1.1.1.1
\`\`\`

---

### 4. Verification & Testing

#### A. Validate Active NAT Translations
\`\`\`bash
Router-NAT# show ip nat translations
Pro Inside global      Inside local       Outside local      Outside global
icmp 1.1.1.1:1         192.168.10.10:1    192.168.20.10:1    192.168.20.10:1
tcp  1.1.1.1:1025      192.168.10.10:1025 192.168.20.10:80   192.168.20.10:80
\`\`\`

#### B. Ping Test from Client PC
\`\`\`bash
PC0> ping 192.168.20.10
Reply from 192.168.20.10: bytes=32 time<1ms TTL=126
\`\`\`
*(Result: **100% SUCCESS**)*
`
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
    cover: "/projects/stp.webp",
    gallery: [
      "/projects/stp.webp"
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
    downloadPkt: "/downloads/stp_topology.pkt",
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
! untuk mencegah Layer 2 Loop / Broadcast Storm.`,
    articleContentId: `
### 1. Pendahuluan & Konsep Dasar Spanning Tree Protocol (STP)

**Spanning Tree Protocol (IEEE 802.1D / PVST+)** adalah protokol manajemen Layer 2 yang dirancang khusus untuk menciptakan topologi bebas loop (*loop-free switching topology*) pada jaringan ethernet redundan.

**Masalah Ketiadaan STP pada Jalur Redundan**:
1. **Broadcast Storm**: Frame broadcast berputar tanpa henti (*infinite loop*) karena frame Ethernet tidak memiliki mekanisme TTL (Time-to-Live) seperti paket IP Layer 3.
2. **Multiple Frame Transmission**: Salinan frame yang sama diterima oleh host berkali-kali.
3. **MAC Database Instability**: Switch terus-menerus mengubah tabel MAC address karena frame yang sama tiba dari port berbeda secara bersamaan.

**Mekanisme Pemilihan Root Bridge & Port States**:
* **Bridge ID (BID)**: Gabungan antara \`Bridge Priority\` (kelipatan 4096) dan \`MAC Address\` switch. Switch dengan BID terendah terpilih sebagai **Root Bridge**.
* **Root Port (RP)**: Port pada non-root switch dengan path cost terendah menuju Root Bridge.
* **Designated Port (DP)**: Port yang aktif meneruskan traffic pada setiap segmen link.
* **Alternate / Blocking Port (BLK)**: Port yang dinonaktifkan sementara dari transmisi data untuk memutus rantai loop.

---

### 2. Skenario & Tabel Konfigurasi Switch

Dalam lab segitiga 3 switch (*Switch1 - Switch2 - Switch3*):
* **Switch1**: Ditunjuk sebagai **Primary Root Bridge** (Priority \`4096\`).
* **Switch2**: Ditunjuk sebagai **Secondary/Backup Root Bridge** (Priority \`8192\`).
* **Switch3**: Berperan sebagai **Non-Root Access Switch** (Priority default \`32768\`).

| Switch | Peran STP | Spanning-Tree Priority | Interface Fa0/1 Role & State | Interface Fa0/2 Role & State |
| :--- | :--- | :--- | :--- | :--- |
| **Switch1** | Primary Root Bridge | 4096 | Designated (FWD) | Designated (FWD) |
| **Switch2** | Backup Root Bridge | 8192 | Root Port (FWD) | Designated (FWD) |
| **Switch3** | Non-Root Switch | 32768 (Default) | Root Port (FWD) | Alternate (BLK - Blocking) |

---

### 3. Langkah-Langkah Konfigurasi (Step-by-Step Configuration)

#### Langkah 1: Konfigurasi Switch1 (Primary Root Bridge)
\`\`\`bash
Switch> enable
Switch# configure terminal
Switch(config)# hostname Switch1

! Mengatur mode Per-VLAN Spanning Tree Plus (PVST+)
Switch1(config)# spanning-tree mode pvst

! Menyetel priority terendah agar menjadi Root Bridge pasti
Switch1(config)# spanning-tree vlan 1 priority 4096

! Konfigurasi Trunking pada link antar switch
Switch1(config)# interface range FastEthernet0/1 - 2
Switch1(config-if-range)# switchport mode trunk
Switch1(config-if-range)# exit
Switch1(config)# exit
Switch1# write memory
\`\`\`

#### Langkah 2: Konfigurasi Switch2 (Secondary / Backup Root Bridge)
\`\`\`bash
Switch> enable
Switch# configure terminal
Switch(config)# hostname Switch2

Switch2(config)# spanning-tree mode pvst
Switch2(config)# spanning-tree vlan 1 priority 8192

Switch2(config)# interface range FastEthernet0/1 - 2
Switch2(config-if-range)# switchport mode trunk
Switch2(config-if-range)# exit
Switch2(config)# exit
Switch2# write memory
\`\`\`

#### Langkah 3: Konfigurasi Switch3 (Non-Root Access Switch)
\`\`\`bash
Switch> enable
Switch# configure terminal
Switch(config)# hostname Switch3

Switch3(config)# spanning-tree mode pvst
Switch3(config)# spanning-tree vlan 1 priority 32768

Switch3(config)# interface range FastEthernet0/1 - 2
Switch3(config-if-range)# switchport mode trunk
Switch3(config-if-range)# exit
Switch3(config)# exit
Switch3# write memory
\`\`\`

---

### 4. Pengujian & Verifikasi (Testing & Verification)

#### A. Verifikasi Status Root Bridge pada Switch1
\`\`\`bash
Switch1# show spanning-tree vlan 1

VLAN0001
  Spanning tree enabled protocol ieee
  Root ID    Priority    4097
             Address     0001.42A1.1111
             This bridge is the root
             Hello Time   2 sec  Max Age 20 sec  Forward Delay 15 sec

  Bridge ID  Priority    4097  (priority 4096 sys-id-ext 1)
             Address     0001.42A1.1111

Interface        Role Sts Cost      Prio.Nbr Type
---------------- ---- --- --------- -------- --------------------------------
Fa0/1            Desg FWD 19        128.1    P2p 
Fa0/2            Desg FWD 19        128.2    P2p 
\`\`\`
*(Perhatikan keterangan **This bridge is the root**, seluruh port berstatus \`Desg FWD\` - Designated Forwarding).*

#### B. Verifikasi Blocking Port pada Switch3
\`\`\`bash
Switch3# show spanning-tree vlan 1

VLAN0001
  Spanning tree enabled protocol ieee
  Root ID    Priority    4097
             Address     0001.42A1.1111
             Cost        19
             Port        1 (FastEthernet0/1)

Interface        Role Sts Cost      Prio.Nbr Type
---------------- ---- --- --------- -------- --------------------------------
Fa0/1            Root FWD 19        128.1    P2p 
Fa0/2            Altn BLK 19        128.2    P2p 
\`\`\`
*(Port \`Fa0/2\` secara otomatis berada dalam status **Altn BLK (Alternate Blocking)**, memutus siklus loop fisik).*

---

### 5. Analisis Teknis & Kesimpulan

1. **Loop Prevention Sukses**: Topologi segitiga berhasil terlindungi dari broadcast storm yang berpotensi melumpuhkan switch CPU.
2. **Failover Otomatis**: Jika link utama \`Fa0/1\` pada Switch3 terputus, STP akan otomatis mentransisikan port \`Fa0/2\` dari \`BLK\` -> \`Listening\` -> \`Learning\` -> \`Forwarding (FWD)\` dalam ~30-50 detik (atau sub-detik jika menggunakan Rapid-PVST / RSTP 802.1w).
`,
    articleContentEn: `
### 1. Introduction & Spanning Tree Protocol (STP) Fundamentals

**Spanning Tree Protocol (IEEE 802.1D / PVST+)** is a foundational Layer 2 control protocol engineered to guarantee a **loop-free active switching topology** across physically redundant Ethernet links.

**Hazards of Switching Loops**:
1. **Broadcast Storms**: Loops circulate broadcast frames indefinitely due to the absence of a Time-to-Live (TTL) field in Layer 2 Ethernet headers.
2. **MAC Table Thrashing**: Rapid frame re-arrival across alternate ports causes switch CAM tables to constantly overwrite MAC-to-port bindings.
3. **Multiple Frame Copies**: Duplicate unicast frames arrive at recipient workstations simultaneously.

**STP Decision Sequence & Port Roles**:
* **Root Bridge Selection**: Deterministically elects the switch with the lowest **Bridge ID (Priority + MAC)**.
* **Root Port (RP)**: The single lowest path-cost port toward the Root Bridge on non-root switches.
* **Designated Port (DP)**: Active forwarding port per segment link.
* **Alternate / Blocking Port (BLK)**: Logically disabled from data forwarding to break the loop circuit.

---

### 2. Switch Topology & Addressing Table

| Switch | STP Role | Configured Priority | Interface Fa0/1 | Interface Fa0/2 |
| :--- | :--- | :--- | :--- | :--- |
| **Switch1** | Primary Root Bridge | 4096 | Designated (FWD) | Designated (FWD) |
| **Switch2** | Backup Root Bridge | 8192 | Root Port (FWD) | Designated (FWD) |
| **Switch3** | Access Switch (Non-Root) | 32768 (Default) | Root Port (FWD) | Alternate (BLK - Blocking) |

---

### 3. Step-by-Step CLI Configuration

#### Step 1: Configure Switch1 (Primary Root Bridge)
\`\`\`bash
Switch> enable
Switch# configure terminal
Switch(config)# hostname Switch1

Switch1(config)# spanning-tree mode pvst
Switch1(config)# spanning-tree vlan 1 priority 4096
Switch1(config)# interface range FastEthernet0/1 - 2
Switch1(config-if-range)# switchport mode trunk
Switch1(config-if-range)# exit
Switch1(config)# exit
Switch1# write memory
\`\`\`

#### Step 2: Configure Switch2 (Backup Root Bridge)
\`\`\`bash
Switch> enable
Switch# configure terminal
Switch(config)# hostname Switch2

Switch2(config)# spanning-tree mode pvst
Switch2(config)# spanning-tree vlan 1 priority 8192
Switch2(config)# interface range FastEthernet0/1 - 2
Switch2(config-if-range)# switchport mode trunk
Switch2(config-if-range)# exit
\`\`\`

#### Step 3: Configure Switch3 (Non-Root Switch)
\`\`\`bash
Switch> enable
Switch# configure terminal
Switch(config)# hostname Switch3

Switch3(config)# spanning-tree mode pvst
Switch3(config)# spanning-tree vlan 1 priority 32768
Switch3(config)# interface range FastEthernet0/1 - 2
Switch3(config-if-range)# switchport mode trunk
Switch3(config-if-range)# exit
\`\`\`

---

### 4. Verification & Testing

#### A. Verify Root Status on Switch1
\`\`\`bash
Switch1# show spanning-tree vlan 1
This bridge is the root
Fa0/1            Desg FWD
Fa0/2            Desg FWD
\`\`\`

#### B. Verify Alternate Blocking Port on Switch3
\`\`\`bash
Switch3# show spanning-tree vlan 1
Fa0/1            Root FWD
Fa0/2            Altn BLK
\`\`\`
*(Port Fa0/2 is placed in **Altn BLK** state, successfully preventing network loops).*
`
  }
];

export function getProjects(): Project[] {
  return PROJECTS;
}

export function getProjectSummaries(): ProjectSummary[] {
  return PROJECTS.map((p) => ({
    title: p.title,
    slug: p.slug,
    descriptionId: p.descriptionId,
    descriptionEn: p.descriptionEn,
    cover: p.cover,
    year: p.year,
    stack: p.stack,
    github: p.github,
    demo: p.demo,
    featured: p.featured,
    tags: p.tags,
  }));
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
