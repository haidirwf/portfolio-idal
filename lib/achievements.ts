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
  }
];

export function getAchievements(): Achievement[] {
  return ACHIEVEMENTS;
}

export function getAchievementBySlug(slug: string): Achievement | undefined {
  return ACHIEVEMENTS.find((a) => a.slug === slug);
}
