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
    id: "pengajar-vibe-coding-smp",
    slug: "pengajar-vibe-coding-smp",
    titleId: "Pengajar Vibe Coding & Dasar Software Development",
    titleEn: "Vibe Coding & Modern Software Development Instructor",
    organization: "SMP (Sekolah Menengah Pertama)",
    category: "work",
    categoryLabelId: "Pengajaran & Mentoring",
    categoryLabelEn: "Teaching & Mentoring",
    positionId: "Instruktur & Pengajar Tamu",
    positionEn: "Guest Instructor & Mentor",
    periodId: "Sep 2026 – Okt 2026",
    periodEn: "Sep 2026 – Oct 2026",
    locationId: "Surakarta / Solo, Indonesia",
    locationEn: "Surakarta / Solo, Indonesia",
    descriptionId: "Memperkenalkan dasar-dasar pengembangan perangkat lunak modern dan vibe coding kepada siswa sekolah menengah pertama dengan materi praktis menggunakan Lovable.",
    descriptionEn: "Introducing the fundamentals of modern software development and vibe coding to middle school students with hands-on sessions using Lovable.",
    articleContentId: `
      ## Pengajar Vibe Coding & Dasar Software Development

      Pada periode September hingga Oktober 2026, saya berkesempatan untuk menjadi instruktur dan mengajar adik-adik siswa Sekolah Menengah Pertama (SMP). Fokus utama kegiatan ini adalah mengenalkan dasar-dasar pengembangan perangkat lunak modern serta paradigma *vibe coding* yang sedang berkembang pesat di industri teknologi.

      Materi yang diajarkan berpusat pada penggunaan tools AI modern seperti Lovable untuk merancang dan mewujudkan ide aplikasi web interaktif secara cepat. Para siswa diajak memahami bagaimana menyusun instruksi yang terstruktur (prompt engineering), memahami antarmuka pengguna (UI/UX), hingga melihat hasil coding yang langsung berjalan.

      Melihat antusiasme siswa SMP yang begitu besar saat berhasil membuat proyek web pertama mereka merupakan pengalaman yang sangat berharga dan memuaskan bagi saya. Ini membuktikan bahwa dengan pendekatan yang tepat, teknologi modern dan coding dapat dipahami dengan menyenangkan oleh generasi muda sedini mungkin.
    `,
    articleContentEn: `
      ## Vibe Coding & Modern Software Development Instructor

      Between September and October 2026, I had the privilege of serving as an instructor and mentor for junior high school (SMP) students. The primary focus was introducing modern software development concepts and the rapidly evolving "vibe coding" paradigm.

      The curriculum centered around leveraging modern AI-assisted tools like Lovable to design and prototype interactive web applications rapidly. Students were guided through crafting structured technical prompts, understanding intuitive UI/UX principles, and deploying functional web applications.

      Witnessing the tremendous excitement of young students as they built and launched their very first web projects was an immensely rewarding journey. It reinforced that with the right pedagogy, modern software engineering can be accessible, inspiring, and engaging from an early age.
    `,
    highlightsId: [
      "Memperkenalkan konsep dasar pengembangan perangkat lunak modern dan paradigma vibe coding",
      "Praktik langsung pembuatan dan prototyping web app menggunakan tools Lovable",
      "Membimbing siswa SMP dalam eksplorasi logika komputasi dan implementasi ide digital"
    ],
    highlightsEn: [
      "Introduced modern software development concepts and the vibe coding paradigm",
      "Hands-on web application building and prototyping sessions with Lovable",
      "Mentored middle school students in computational thinking and digital idea execution"
    ],
    cover: "/articles/dokumentasingajar3.webp",
    gallery: [
      "/articles/dokumentasingajar3.webp"
    ],
    tags: ["Teaching", "Mentoring", "Vibe Coding", "Lovable", "Software Development", "Pendidikan"],
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
