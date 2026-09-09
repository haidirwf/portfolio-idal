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
    titleId: "48 Jam Hackathon yang Meaningful",
    titleEn: "A Meaningful 48-Hour Hackathon",
    organization: "KOMDIGI x Jagoan Hosting",
    category: "competition",
    categoryLabelId: "Kompetisi & Hackathon",
    categoryLabelEn: "Competition & Hackathon",
    positionId: "Peserta Hackathon 48-Jam",
    positionEn: "48-Hour Hackathon Participant",
    periodId: "2026",
    periodEn: "2026",
    locationId: "DNCC, Yogyakarta, Indonesia",
    locationEn: "DNCC, Yogyakarta, Indonesia",
    descriptionId: "Pengalaman mengikuti HackAIthon 48 jam kolaborasi KOMDIGI dan Jagoan Hosting di DNCC Yogyakarta bersama Faiz, Nain, dan Kevin. Menjelajahi vibe coding dan tantangan pembuatan produk inovatif.",
    descriptionEn: "A 48-hour HackAIthon experience collaborating with KOMDIGI and Jagoan Hosting at DNCC Yogyakarta alongside Faiz, Nain, and Kevin. Exploring vibe coding and rapid product development.",
    articleContentId: `
      ### 48 Jam Hackathon yang Meaningful

      Flashback ke beberapa bulan lalu, Februari 2026. Saya diajak teman saya Faiz mengikuti perlombaan HackAIthon yang diselenggarakan atas kolaborasi antara KOMDIGI dan Jagoan Hosting di Yogyakarta, tepatnya DNCC. Saya mengikuti lomba ini bersama Faiz, Nain dan Kevin. Bersaing melawan puluhan tim dari SMA/K dan Mahasiswa lain.

      Hackathon kali ini kami diberi waktu 48 jam—24 jam pertama kami gunakan untuk mengikuti seminar yang sangat daging oleh mas Haqqi Hasan dari DAGADU, beliau membahas tentang bagaimana kreativitas pada industri sangat berpengaruh. Dilanjut seminar dari mas Rizqinofa, CEO dari Skyshi yang membahas banyak tentang industri, teknologi, serta cara *vibe coding* yang menjadi inti dari hackathon ini—semua peserta wajib untuk *vibe coding*, yang mana belum cukup lazim di beberapa hackathon pada saat itu.

      Setelah mengikuti seminar, kami diberi satu tema dan masalah, sayangnya saya lupa apa temanya. Kurang lebih tentang Yogyakarta. Sisa waktu kami gunakan untuk brainstorming produk apa yang akan kami buat. Dan 24 jam berikutnya digunakan untuk implementasi produknya.

      Saat itu kami lumayan tertekan karena deadline semakin mepet dan produk kami belum selesai. Kami begadang dan alhamdulillah besoknya sudah tinggal presentasi dan tunggu menang aja. Yang saya dapatkan besok harinya adalah rasa kantuk yang luar biasa dan pengalaman yang berharga—karena kami belum beruntung untuk membawa kemenangan.

      Overall sangat menyenangkan dan saya merasa keren karena saya adalah TKJ di antara puluhan orang RPL atau jurusan ngoding gitu.
    `,
    articleContentEn: `
      ### A Meaningful 48-Hour Hackathon

      Looking back a few months ago, February 2026. I was invited by my friend Faiz to join the HackAIthon competition organized collaboratively by KOMDIGI and Jagoan Hosting in Yogyakarta, specifically at DNCC. I participated in this contest with Faiz, Nain, and Kevin, competing against dozens of teams from high schools, vocational schools, and universities.

      In this hackathon, we were given 48 hours—the first 24 hours were spent attending rich, insightful seminars. One was delivered by Mas Haqqi Hasan from DAGADU, discussing how crucial creativity is in industry. This was followed by a seminar from Mas Rizqinofa, CEO of Skyshi, who shared extensive insights on industry, technology, and "vibe coding" as the core theme of this hackathon—where every participant was required to practice vibe coding, which was still relatively uncommon in many hackathons at the time.

      After the seminars, we were given a central theme and problem statement—unfortunately I don't recall the exact prompt, but it broadly revolved around Yogyakarta. We used our remaining prep time to brainstorm what product to build, followed by 24 hours dedicated to implementing the product.

      We felt quite pressured as the deadline grew closer and our product was not yet completed. We pulled an all-nighter, and thankfully by the next morning all that was left was delivering the presentation and hoping for victory. What I gained the next day was overwhelming exhaustion and an invaluable experience—even though we were not fortunate enough to bring home the win.

      Overall it was an extremely fun journey, and I felt proud being a Computer & Network Engineering (TKJ) student among dozens of Software Engineering (RPL) and coding majors.
    `,
    highlightsId: [
      "Mengikuti maraton 48 jam HackAIthon kolaborasi KOMDIGI x Jagoan Hosting di DNCC Yogyakarta",
      "Seminar industri kreatif bersama Mas Haqqi Hasan (DAGADU) & vibe coding bersama Mas Rizqinofa (Skyshi)",
      "Membangun dan mempresentasikan produk berbasis vibe coding bersama Faiz, Nain, dan Kevin"
    ],
    highlightsEn: [
      "Participated in the 48-hour HackAIthon collaboration between KOMDIGI and Jagoan Hosting at DNCC Yogyakarta",
      "Creative industry seminar with Mas Haqqi Hasan (DAGADU) & vibe coding insights with Mas Rizqinofa (Skyshi)",
      "Built and pitched a vibe-coding product prototype alongside teammates Faiz, Nain, and Kevin"
    ],
    cover: "/experience/hackaton.webp",
    tags: ["HackAIthon", "KOMDIGI", "Jagoan Hosting", "Vibe Coding", "DNCC Yogyakarta"],
    featured: true
  }
];

export function getAchievements(): Achievement[] {
  return ACHIEVEMENTS;
}

export function getAchievementBySlug(slug: string): Achievement | undefined {
  return ACHIEVEMENTS.find((a) => a.slug === slug);
}
