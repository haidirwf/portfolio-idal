import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar, ShieldCheck, CheckCircle2 } from "lucide-react";

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  link: string;
  tags: string[];
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2024",
    credentialId: "AWS-ASA-1234",
    link: "#",
    tags: ["Cloud", "Infrastructure"],
  },
  {
    id: 2,
    title: "Meta Front-End Developer Professional",
    issuer: "Meta / Coursera",
    date: "2023",
    credentialId: "META-FE-990",
    link: "#",
    tags: ["React", "UX"],
  },
  {
    id: 3,
    title: "Cisco Certified Network Associate (CCNA)",
    issuer: "Cisco",
    date: "2023",
    credentialId: "CCNA-200-301",
    link: "#",
    tags: ["Networking", "Security"],
  },
  {
    id: 4,
    title: "Google Cloud Digital Leader",
    issuer: "Google",
    date: "2022",
    credentialId: "GCP-DL-552",
    link: "#",
    tags: ["Cloud", "Data"],
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const CertificatesView = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      className="w-full max-w-5xl mx-auto px-5 pt-28 pb-20"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-12">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white leading-[0.85] mb-6">
          daftar sertifikat<span className="text-blue-500">.</span>
        </h1>
        <p className="text-zinc-500 text-lg max-w-md font-normal lowercase tracking-tight">
          / credential directory — {certificates.length} verified documents
        </p>
      </motion.div>

      {/* Certificates Table/List */}
      <div className="flex flex-col border border-white/10 bg-[#0a0a0a]">
        {/* Table Header - Desktop Only */}
        <div className="hidden md:flex items-center px-8 py-4 border-b border-white/10 bg-white/5 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">
          <div className="flex-1">Credential Name</div>
          <div className="w-48">Issuer</div>
          <div className="w-32">Date</div>
          <div className="w-12 text-right">Link</div>
        </div>

        {/* List Items */}
        {certificates.map((cert) => (
          <motion.div
            key={cert.id}
            variants={itemVariants}
            className="group relative flex flex-col md:flex-row md:items-center px-6 md:px-8 py-6 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
          >
            {/* Title & Tag Mobile */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-blue-500 shrink-0" />
                <h3 className="text-white font-bold text-sm md:text-base tracking-tight uppercase group-hover:text-blue-400 transition-colors">
                  {cert.title}
                </h3>
              </div>
              <div className="flex gap-2">
                {cert.tags.map((tag) => (
                  <span key={tag} className="text-[9px] font-mono text-zinc-600 uppercase tracking-tighter border border-white/5 px-1.5 py-0.5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Issuer */}
            <div className="mt-4 md:mt-0 md:w-48 flex items-center gap-2 text-zinc-400">
              <ShieldCheck size={14} className="md:hidden text-zinc-600" />
              <span className="text-xs font-medium md:font-normal">{cert.issuer}</span>
            </div>

            {/* Date */}
            <div className="mt-2 md:mt-0 md:w-32 flex items-center gap-2 text-zinc-500">
              <Calendar size={14} className="md:hidden text-zinc-600" />
              <span className="text-[11px] font-mono">{cert.date}</span>
            </div>

            {/* Link */}
            <div className="mt-6 md:mt-0 md:w-12 flex justify-end">
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 md:p-2 bg-zinc-900 border border-white/10 rounded-md text-zinc-400 hover:text-white hover:border-blue-500 transition-all text-xs md:text-base w-full md:w-auto justify-center"
              >
                <span className="md:hidden uppercase font-bold tracking-widest text-[10px]">Verify Credential</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CertificatesView;