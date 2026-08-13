export interface Achievement {
  id: string;
  slug: string;
  titleId: string;
  titleEn: string;
  organization: string;
  category: "competition" | "activity" | "organization" | "work";
  categoryLabelId: string;
  categoryLabelEn: string;
  positionId: string;
  positionEn: string;
  periodId: string;
  periodEn: string;
  locationId: string;
  locationEn: string;
  descriptionId: string;
  descriptionEn: string;
  articleContentId: string;
  articleContentEn: string;
  highlightsId: string[];
  highlightsEn: string[];
  cover: string;
  tags: string[];
  url?: string;
  featured: boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "exploraition-yogyakarta-hackathon",
    slug: "exploraition-yogyakarta-hackathon",
    titleId: "ExplorAItion Yogyakarta Hackathon",
    titleEn: "ExplorAItion Yogyakarta Hackathon",
    organization: "ExplorAItion Yogyakarta",
    category: "competition",
    categoryLabelId: "Kompetisi & Hackathon",
    categoryLabelEn: "Competition & Hackathon",
    positionId: "Peserta Hackathon 48-Jam",
    positionEn: "48-Hour Hackathon Participant",
    periodId: "2026",
    periodEn: "2026",
    locationId: "Yogyakarta, Indonesia",
    locationEn: "Yogyakarta, Indonesia",
    descriptionId: "ExplorAItion Yogyakarta Hackathon adalah mini-hackathon 48 jam. Bersama Kevin, Faiz, Nain, dan saya merancang aplikasi cerdas untuk membantu pengguna memahami dan mengeksplorasi Yogyakarta dengan lebih baik.",
    descriptionEn: "ExplorAItion Yogyakarta Hackathon is a 48-hour mini-hackathon. Kevin, Faiz, Nain, and I created an app to help users better understand Yogyakarta.",
    articleContentId: `
      ### Pengalaman di ExplorAItion Yogyakarta Hackathon

      ExplorAItion Yogyakarta Hackathon adalah ajang maraton inovasi 48 jam yang menguji kreativitas, kerjasama tim, dan kemampuan eksekusi cepat. Bersama tim (Kevin, Faiz, Nain, dan saya), kami merancang serta membangun aplikasi yang dirancang khusus untuk membantu wisatawan maupun warga lokal memahami seluk-beluk dan budaya Yogyakarta secara lebih mendalam.

      #### Ringkasan Kolaborasi & Pengembangan:
      1. **Ideasi & Konsep Produk**: Merumuskan solusi digital untuk menyajikan rekomendasi tempat, budaya, dan pengalaman unik di Yogyakarta secara intuitif.
      2. **Pengembangan Cepat (Sprint 48 Jam)**: Membagi peran tim antara desain UI/UX, integrasi data, dan arsitektur aplikasi agar siap dipresentasikan tepat waktu.
      3. **Kerjasama Tim**: Berkolaborasi secara intensif bersama Kevin, Faiz, dan Nain dalam menyempurnakan alur pengguna (*user journey*) dan memecahkan berbagai tantangan teknis selama hackathon berlangsung.

      #### Pembelajaran Utama:
      Melalui kegiatan ini, kami mengasah kemampuan pengembangan produk skala cepat di bawah batas waktu ketat, komunikasi tim yang solid, serta pemanfaatan teknologi untuk mengangkat potensi lokal daerah.
    `,
    articleContentEn: `
      ### Experience at ExplorAItion Yogyakarta Hackathon

      ExplorAItion Yogyakarta Hackathon was an intensive 48-hour innovation marathon testing creativity, teamwork, and rapid execution skills. Together with my team (Kevin, Faiz, Nain, and myself), we created an app specifically designed to help users better understand and explore the rich culture and destinations of Yogyakarta.

      #### Collaboration & Development Highlights:
      1. **Ideation & Product Concept**: Formulated a digital solution delivering intuitive recommendations for Yogyakarta's spots, culture, and local insights.
      2. **Rapid 48-Hour Sprint**: Efficiently divided roles across UI/UX design, data integration, and application architecture to deliver a functional demo on time.
      3. **Team Collaboration**: Worked closely alongside Kevin, Faiz, and Nain to refine user journeys and resolve technical bottlenecks during the intense hackathon window.

      #### Key Takeaways:
      This experience strengthened our rapid product development capabilities under tight deadlines, seamless team communication, and leveraging tech to enhance local culture and tourism.
    `,
    highlightsId: [
      "Mengikuti maraton inovasi dan pengembangan aplikasi 48 jam di Yogyakarta",
      "Bekerjasama erat dalam tim bersama Kevin, Faiz, Nain, dan Haidar",
      "Membangun solusi digital interaktif untuk membantu pengguna mengeksplorasi kota Yogyakarta"
    ],
    highlightsEn: [
      "Participated in an intensive 48-hour application development marathon in Yogyakarta",
      "Collaborated closely in a team with Kevin, Faiz, Nain, and Haidar",
      "Built an interactive digital solution helping users discover and navigate Yogyakarta"
    ],
    cover: "/experience/hackaton.webp",
    tags: ["ExplorAItion", "Hackathon", "Yogyakarta", "Team Project", "App Development"],
    featured: true
  },
  {
    id: "lks-network-administrator",
    slug: "lks-network-administrator",
    titleId: "Lomba Kompetensi Siswa (LKS) — Network Administrator",
    titleEn: "Student Competency Competition (LKS) — Network Administrator",
    organization: "Dinas Pendidikan & Komunitas IT Jaringan",
    category: "competition",
    categoryLabelId: "Kompetisi & Lomba",
    categoryLabelEn: "Competition & Contest",
    positionId: "Peserta Finalis & Juara Harapan",
    positionEn: "Finalist & Honorable Mention",
    periodId: "2025 – 2026",
    periodEn: "2025 – 2026",
    locationId: "Jawa Tengah, Indonesia",
    locationEn: "Central Java, Indonesia",
    descriptionId: "Kompetisi administrasi jaringan enterprise tingkat siswa yang menguji kemampuan konfigurasi routing dinamis, firewall MikroTik, VLAN trunking, dan pemecahan masalah jaringan skala besar.",
    descriptionEn: "High-stakes enterprise network administration contest evaluating dynamic routing design, MikroTik firewall configurations, VLAN trunking, and complex network troubleshooting.",
    articleContentId: `
      ### Pengalaman Mengikuti LKS Network Administrator

      Kompetisi LKS Network Administrator merupakan salah satu momen penting dalam perjalanan saya di bidang teknik jaringan komputer. Dalam ajang kompetisi ini, peserta dituntut untuk merancang dan mendesain topologi jaringan enterprise terintegrasi dalam waktu yang terbatas.

      #### Ringkasan Tantangan & Konfigurasi:
      1. **Routing Multi-Domain**: Mengonfigurasi redistribusi rute dinamis antara protokol OSPF 100 dan EIGRP 10 di switch multilayer Cisco.
      2. **Keamanan & Filtering**: Menerapkan Standard dan Extended Access Control Lists (ACL) untuk mengisolasi traffic ke server sensitif dan memperbolehkan layanan tertentu.
      3. **Tunnelling & VLAN**: Membangun GRE Tunnel 100.100.100.0/30 untuk menghubungkan dua cabang lokasi terpisah serta Inter-VLAN Subinterfaces 802.1Q.

      #### Pembelajaran Utama:
      Melalui kompetisi ini, saya mengasah kemampuan pemecahan masalah di bawah tekanan waktu, ketelitian perintah CLI pada perangkat Cisco IOS dan MikroTik RouterOS, serta pemahaman mendalam mengenai arsitektur jaringan yang andal (*high availability*).
    `,
    articleContentEn: `
      ### Experience in LKS Network Administrator Competition

      The LKS Network Administrator competition was a defining milestone in my computer networking journey. During this contest, participants were required to architect and deploy integrated enterprise topologies under strict time limits.

      #### Key Challenges & Technical Implementations:
      1. **Multi-Domain Routing**: Configured mutual route redistribution between OSPF 100 and EIGRP 10 on Cisco multilayer switches.
      2. **Security & Traffic Filtering**: Implemented Standard and Extended ACLs to secure sensitive server subnets while maintaining required service access.
      3. **Tunnelling & Inter-VLAN**: Built encrypted GRE Tunnel 100.100.100.0/30 connecting remote branches alongside 802.1Q Inter-VLAN Subinterfaces.

      #### Key Takeaways:
      This competition sharpened my troubleshooting speed under high-pressure scenarios, CLI precision across Cisco IOS and MikroTik RouterOS devices, and practical understanding of resilient enterprise network architecture.
    `,
    highlightsId: [
      "Mengonfigurasi OSPF/EIGRP redistribution pada Multilayer Switch Cisco",
      "Membuat kebijakan lalu lintas jaringan dengan Standard & Extended ACL",
      "Troubleshooting jaringan inter-VLAN dan GRE Tunnel secara akurat"
    ],
    highlightsEn: [
      "Configured Cisco Multilayer Switch OSPF/EIGRP redistribution",
      "Enforced granular traffic policies using Standard & Extended ACLs",
      "Accurately troubleshot inter-VLAN topologies and GRE Tunnels"
    ],
    cover: "/projects/enterprise.webp",
    tags: ["LKS", "Network Administrator", "Cisco IOS", "MikroTik", "OSPF"],
    featured: true
  },
  {
    id: "media-division-issc",
    slug: "media-division-issc",
    titleId: "Kepemimpinan Divisi Media — OSIS IDN Solo Student Council",
    titleEn: "Media Division Leadership — IDN Solo Student Council",
    organization: "IDN Boarding School Solo",
    category: "organization",
    categoryLabelId: "Organisasi Siswa",
    categoryLabelEn: "Student Organization",
    positionId: "Koordinator & Divisi Media",
    positionEn: "Coordinator & Media Division",
    periodId: "Mei 2026 – Sekarang",
    periodEn: "May 2026 – Present",
    locationId: "Karanganyar, Jawa Tengah",
    locationEn: "Karanganyar, Central Java",
    descriptionId: "Memimpin strategi komunikasi visual, mengelola publikasi media sosial resmi OSIS, dan mengoordinasikan liputan media untuk seluruh event utama sekolah.",
    descriptionEn: "Leading visual branding strategy, managing official student council social media channels, and coordinating live media coverage for major school events.",
    articleContentId: `
      ### Peran dan Kontribusi di Divisi Media OSIS

      Sebagai anggota aktif dan koordinator media di OSIS IDN Solo Student Council, saya bertanggung jawab menjaga citra publik dan kualitas komunikasi digital lembaga siswa sekolah.

      #### Tanggung Jawab Utama:
      - **Content Strategy & Management**: Merancang alur publikasi mingguan di Instagram & LinkedIn resmi organisasi.
      - **Visual Branding Guidelines**: Menetapkan standar estetika desain, typography, dan palet warna untuk setiap poster serta pengumuman kegiatan siswa.
      - **Event Live Documentation**: Memimpin tim dokumentasi foto/video untuk event seminar, kompetisi internal, dan kegiatan keagamaan sekolah.

      Melalui peran ini, saya mengembangkan keterampilan kepemimpinan (*leadership*), manajemen tim kreatif, dan komunikasi publik yang efektif.
    `,
    articleContentEn: `
      ### Role & Achievements in Student Council Media Division

      As an active member and media coordinator at IDN Solo Student Council, I oversee public image, visual branding, and digital communication streams across official channels.

      #### Core Responsibilities:
      - **Content Strategy & Management**: Designed weekly publication schedules for official Instagram & LinkedIn accounts.
      - **Visual Branding Guidelines**: Formulated design standards, typography rules, and color palettes for student event announcements.
      - **Event Live Documentation**: Led photography/videography documentation teams for school seminars and internal competitions.

      This experience significantly enhanced my leadership, creative project coordination, and public relations skills.
    `,
    highlightsId: [
      "Mengelola publikasi digital & branding visual resmi OSIS IDN Solo",
      "Mengoordinasikan liputan media dan dokumentasi event besar sekolah",
      "Menetapkan standar panduan desain komunikasi digital siswa"
    ],
    highlightsEn: [
      "Managed official IDN Solo Student Council digital publishing & branding",
      "Coordinated media coverage and documentation for major school events",
      "Established digital design guidelines for student communications"
    ],
    cover: "/experience/issc.webp",
    tags: ["OSIS", "Media Division", "Digital Branding", "Leadership"],
    url: "https://www.linkedin.com/company/idnsolostudentcouncil/",
    featured: true
  },
  {
    id: "founder-luncur-tech",
    slug: "founder-luncur-tech",
    titleId: "Pendiri Luncur Tech — Layanan Konsultasi & Arsitektur IT",
    titleEn: "Founder of Luncur Tech — IT Architecture & Consulting",
    organization: "Luncur Tech",
    category: "work",
    categoryLabelId: "Inisiatif Teknologi",
    categoryLabelEn: "Tech Initiative",
    positionId: "Pendiri (Founder)",
    positionEn: "Founder",
    periodId: "Jan 2026 – Sekarang",
    periodEn: "Jan 2026 – Present",
    locationId: "Indonesia · Hybrid",
    locationEn: "Indonesia · Hybrid",
    descriptionId: "Inisiatif membangun layanan perancangan arsitektur jaringan, konsultasi infrastruktur IT, serta solusi otomatisasi untuk membantu kebutuhan digitalisasi.",
    descriptionEn: "Tech initiative delivering network architecture engineering, IT infrastructure consulting, and automation solutions for digital transformation.",
    articleContentId: `
      ### Perjalanan Membangun Luncur Tech

      Luncur Tech didirikan sebagai wadah eksplorasi dan penyediaan solusi profesional di bidang konsultasi teknologi, infrastruktur jaringan komputer, dan sistem web modern.

      #### Layanan & Pilar Utama:
      1. **Arsitektur Jaringan & Security**: Membantu perancangan topologi jaringan lokal, pembatasan akses firewall, dan segmentasi VLAN.
      2. **Konsultasi & Integrasi Web**: Mengembangkan aplikasi web modern berbasis kerangka kerja teruji dengan kinerja tinggi.
      3. **Otomatisasi Sistem**: Mengurangi pekerjaan repetitif dalam manajemen server dan sistem operasional.

      Pengalaman mendirikan Luncur Tech memberikan wawasan mendalam mengenai arsitektur sistem end-to-end, manajemen proyek, dan kepuasan klien.
    `,
    articleContentEn: `
      ### The Journey of Building Luncur Tech

      Luncur Tech was established to provide professional technology consulting, network infrastructure design, and modern web engineering services.

      #### Core Offerings & Pillars:
      1. **Network Architecture & Security**: Designing LAN topologies, firewall access control, and VLAN segmentation.
      2. **Web Consulting & Integration**: Developing high-performance modern web platforms.
      3. **System Automation**: Streamlining repetitive server deployment and operational workflows.

      Building Luncur Tech provided invaluable insights into end-to-end system design, project governance, and client satisfaction.
    `,
    highlightsId: [
      "Merancang solusi arsitektur jaringan & konsultasi IT",
      "Mengintegrasikan otomatisasi dan pemantauan infrastruktur",
      "Mengembangkan platform digital modern teruji"
    ],
    highlightsEn: [
      "Engineered network architecture solutions & IT consulting",
      "Integrated infrastructure automation & monitoring systems",
      "Developed high-performance modern digital platforms"
    ],
    cover: "/experience/luncur.webp",
    tags: ["IT Consulting", "Infrastructure", "Web Architecture", "Founder"],
    url: "https://luncur.site/",
    featured: true
  }
];

export function getAchievements(): Achievement[] {
  return ACHIEVEMENTS;
}

export function getAchievementBySlug(slug: string): Achievement | undefined {
  return ACHIEVEMENTS.find((a) => a.slug === slug);
}
