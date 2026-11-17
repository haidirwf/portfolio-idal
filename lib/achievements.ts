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
  gallery?: string[];
  tags: string[];
  url?: string;
  featured: boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "it-mentor-smp-hang-tuah-1-surabaya",
    slug: "it-mentor-smp-hang-tuah-1-surabaya",
    titleId: "IT Mentor at SMP Hang Tuah 1 Surabaya",
    titleEn: "IT Mentor at SMP Hang Tuah 1 Surabaya",
    organization: "SMP Hang Tuah 1 Surabaya · IDN Mengajar",
    category: "work",
    categoryLabelId: "Pengajaran & Mentoring (IDN Mengajar)",
    categoryLabelEn: "Teaching & Mentoring (IDN Mengajar)",
    positionId: "IT Mentor (Program IDN Mengajar)",
    positionEn: "IT Mentor (IDN Mengajar Program)",
    periodId: "Sep 2026 – Okt 2026",
    periodEn: "Sep 2026 – Oct 2026",
    locationId: "Surabaya, Jawa Timur, Indonesia",
    locationEn: "Surabaya, East Java, Indonesia",
    descriptionId: "Menjadi IT Mentor dalam program pengabdian IDN Mengajar di SMP Hang Tuah 1 Surabaya, mengenalkan dasar-dasar pengembangan perangkat lunak modern dan vibe coding berbasis Lovable kepada siswa.",
    descriptionEn: "Served as an IT Mentor under the IDN Mengajar community program at SMP Hang Tuah 1 Surabaya, introducing modern software development fundamentals and vibe coding with Lovable to middle school students.",
    articleContentId: `
      ## IT Mentor at SMP Hang Tuah 1 Surabaya (IDN Mengajar)

      Pada periode September hingga Oktober 2026, saya berkesempatan menjadi IT Mentor dalam kegiatan **IDN Mengajar** yang bertempat di SMP Hang Tuah 1 Surabaya. IDN Mengajar merupakan program pengabdian sosial dan edukasi dari IDN Boarding School untuk berbagi ilmu teknologi informasi kepada para pelajar di berbagai sekolah.

      Dalam agenda ini, saya membimbing adik-adik siswa SMP Hang Tuah 1 Surabaya untuk mengenal dasar-dasar pengembangan perangkat lunak modern serta paradigma baru dalam pemrograman yaitu *vibe coding*. Kami mengeksplorasi bagaimana kecerdasan buatan dapat dimanfaatkan untuk memvisualisasikan dan mewujudkan ide aplikasi web dengan cepat menggunakan platform **Lovable**.

      Para siswa diajak mempraktikkan langsung alur pembuatan proyek dari nol: menyusun kebutuhan logika aplikasi (prompt engineering), memahami antarmuka pengguna (UI/UX), hingga menguji aplikasi web yang langsung siap digunakan. Melihat antusiasme serta rasa ingin tahu yang tinggi dari para siswa menjadi pengalaman yang sangat berharga dan memotivasi saya untuk terus berbagi ilmu di bidang teknologi.
    `,
    articleContentEn: `
      ## IT Mentor at SMP Hang Tuah 1 Surabaya (IDN Mengajar)

      Between September and October 2026, I served as an IT Mentor as part of the **IDN Mengajar** educational outreach initiative held at SMP Hang Tuah 1 Surabaya. IDN Mengajar is an impactful community-driven program organized by IDN Boarding School students to share cutting-edge IT knowledge with younger students.

      During this program, I mentored students at SMP Hang Tuah 1 Surabaya in understanding the essentials of modern software development and the emerging "vibe coding" paradigm. We explored how AI-assisted tooling can be harnessed to rapidly conceptualize and deploy web applications using **Lovable**.

      Students engaged in end-to-end hands-on prototyping: translating computational ideas into structured prompts, understanding responsive UI/UX principles, and testing live functional web apps. Experiencing their vibrant curiosity and seeing them build their first working projects was an immensely fulfilling milestone in my journey.
    `,
    highlightsId: [
      "Menjadi IT Mentor dalam program pengabdian IDN Mengajar di SMP Hang Tuah 1 Surabaya",
      "Memperkenalkan konsep dasar pengembangan software modern dan paradigma vibe coding",
      "Praktik langsung pembuatan dan prototyping web app interaktif menggunakan platform Lovable"
    ],
    highlightsEn: [
      "Served as an IT Mentor under the IDN Mengajar outreach initiative at SMP Hang Tuah 1 Surabaya",
      "Introduced modern software engineering concepts and the vibe coding paradigm",
      "Hands-on guided interactive application building and prototyping sessions with Lovable"
    ],
    cover: "/articles/dokumentasingajar3.webp",
    gallery: [
      "/articles/dokumentasingajar3.webp"
    ],
    tags: ["IDN Mengajar", "SMP Hang Tuah 1 Surabaya", "IT Mentor", "Vibe Coding", "Lovable", "Software Development", "Mentoring"],
    featured: true
  },
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
    cover: "/articles/hackaton.webp",
    tags: ["HackAIthon", "KOMDIGI", "Jagoan Hosting", "Vibe Coding", "DNCC Yogyakarta"],
    featured: true
  },
  {
    id: "juara-3-popda-karate-karanganyar",
    slug: "juara-3-popda-karate-karanganyar",
    titleId: "Juara 3 POPDA Karate Karanganyar",
    titleEn: "3rd Place POPDA Karate Karanganyar",
    organization: "POPDA Kabupaten Karanganyar",
    category: "competition",
    categoryLabelId: "Kompetisi & Kejuaraan",
    categoryLabelEn: "Competition & Championship",
    positionId: "Juara 3 Karate (Kategori 60 kg)",
    positionEn: "3rd Place Karate (60 kg Category)",
    periodId: "2026",
    periodEn: "2026",
    locationId: "Karanganyar, Jawa Tengah, Indonesia",
    locationEn: "Karanganyar, Central Java, Indonesia",
    descriptionId: "Menyabet Juara 3 dalam kompetisi POPDA Karate Kabupaten Karanganyar kategori 60 kg bersama tim IDN Solo setelah belajar basic karate bersama Pak Isworo.",
    descriptionEn: "Won 3rd place in the Karanganyar Regency POPDA Karate competition (60 kg category) representing IDN Solo after training under Pak Isworo.",
    articleContentId: `
      ### Juara 3 POPDA Karate Karanganyar

      Terhitung saya masuk IDN Solo, kurang lebih sudah satu tahun setengah saya belajar basic-basic karate bersama Pak Isworo. Alhamdulillah pada tanggal 23 Mei lalu saya menyabet juara 3 dalam kompetisi POPDA karate kabupaten Karanganyar.

      Jujur saya kurang minat pada cabang olahraga satu ini, malahan sabuk saya masih putih. Pada babak pertama saya langsung dihadapkan dengan lawan yang pakai sabuk coklat. Tapi Alhamdulillah saya dan beberapa teman bisa membawa pulang piala juara— saya sendiri juara 3 dalam kategori 60 kg, ada beberapa teman saya yang juara 1 dan 2 pada kategorinya masing masing. Sebuah pengalaman yang sangat berharga mengingat saya seorang pemula. Terimakasih atas banyak insightnya, Pak Isworo.
    `,
    articleContentEn: `
      ### 3rd Place POPDA Karate Karanganyar

      Since joining IDN Solo, I have spent roughly a year and a half learning the fundamentals of karate under the mentorship of Pak Isworo. Alhamdulillah, on May 23rd, I secured 3rd place in the Karanganyar Regency POPDA karate championship.

      To be honest, martial arts wasn't my primary interest, and I was still holding a white belt. In the very first round, I was immediately matched against an opponent with a brown belt. Yet Alhamdulillah, my teammates and I were able to bring home championship trophies—I earned 3rd place in the 60 kg category, while several of my friends took 1st and 2nd place in their respective divisions. An extraordinarily valuable journey, especially considering I was a beginner. Many thanks for all the guidance and insights, Pak Isworo.
    `,
    highlightsId: [
      "Menyabet Juara 3 kategori 60 kg pada kompetisi POPDA Karate Kabupaten Karanganyar",
      "Bertanding melawan praktisi sabuk coklat di babak awal sebagai pemegang sabuk putih",
      "Membawa pulang piala bersama kontingen IDN Solo di bawah bimbingan Pak Isworo"
    ],
    highlightsEn: [
      "Secured 3rd place in the 60 kg division at the Karanganyar Regency POPDA Karate championship",
      "Faced advanced brown belt opponents in opening rounds while competing as a white belt",
      "Brought home trophies alongside the IDN Solo team under the mentorship of Pak Isworo"
    ],
    cover: "/articles/karate_1.webp",
    gallery: [
      "/articles/karate_1.webp",
      "/articles/karate_2.webp"
    ],
    tags: ["POPDA", "Karate", "Karanganyar", "IDN Solo", "Olahraga", "Kompetisi"],
    featured: true
  }
];

export function getAchievements(): Achievement[] {
  return ACHIEVEMENTS;
}

export function getAchievementBySlug(slug: string): Achievement | undefined {
  return ACHIEVEMENTS.find((a) => a.slug === slug);
}
