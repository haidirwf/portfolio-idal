import { motion } from "framer-motion";
import { Briefcase, GraduationCap, ChevronRight, Zap } from "lucide-react";

const experiences = [
  {
    year: "2023 - PRES",
    title: "Senior Full Stack Developer",
    company: "Tech Innovations Inc.",
    description: "Leading development of enterprise web applications and architecture.",
    icon: Briefcase,
  },
  {
    year: "2021 - 2023",
    title: "Mobile App Developer",
    company: "Digital Solutions Ltd.",
    description: "Built cross-platform mobile experiences using Flutter and React Native.",
    icon: Briefcase,
  },
  {
    year: "2015 - 2019",
    title: "CS Degree",
    company: "University of Tech",
    description: "Specialized in software engineering and network security.",
    icon: GraduationCap,
  },
];

const skills = {
  Dev: ["React", "Next.js", "Node.js", "TS", "Python"],
  Design: ["Figma", "UI/UX", "Prototyping"],
  Net: ["MikroTik", "Cisco", "Security", "Server"],
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
} as const;

const ProfileView = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      className="w-full max-w-5xl mx-auto px-5 pt-28 pb-20"
    >
      {/* --- HEADER --- */}
      <motion.div variants={itemVariants} className="mb-16">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white leading-[0.85] mb-6">
          profile<span className="text-blue-500">.</span>
        </h1>
        <p className="text-zinc-500 text-sm font-mono lowercase tracking-tight max-w-md">
          / professional_log_v2.0 — mapping technical growth and career milestones.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* --- LEFT: JOURNEY (TIMELINE) --- */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center gap-3 mb-8">
             <div className="h-px w-8 bg-blue-500" />
             <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400">Career Path</h2>
          </div>

          <div className="space-y-0 border-l border-white/10 ml-2">
            {experiences.map((exp, index) => (
              <motion.div key={index} variants={itemVariants} className="relative pl-8 pb-10 last:pb-0">
                {/* Timeline Node */}
                <div className="absolute left-[-4.5px] top-1.5 w-2 h-2 bg-blue-500 rotate-45" />
                
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{exp.year}</span>
                  <h3 className="text-white font-bold uppercase text-sm tracking-tight flex items-center gap-2">
                    {exp.title}
                  </h3>
                  <p className="text-blue-500 text-[11px] font-bold uppercase tracking-wider">{exp.company}</p>
                  <p className="text-zinc-500 text-xs leading-relaxed max-w-md mt-2 font-light italic">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- RIGHT: SKILLS & STATS --- */}
        <div className="lg:col-span-5 space-y-12">
          {/* Skills Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
               <div className="h-px w-8 bg-blue-500" />
               <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400">Tech Stack</h2>
            </div>
            
            <div className="space-y-6">
              {Object.entries(skills).map(([category, list]) => (
                <motion.div key={category} variants={itemVariants} className="space-y-3">
                  <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-widest flex items-center gap-2">
                    <ChevronRight size={12} className="text-blue-500" /> {category}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {list.map((s) => (
                      <span key={s} className="px-2 py-1 bg-white/5 border border-white/5 text-[10px] text-zinc-400 font-mono uppercase">
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats Section (Grid 3 Column) */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-3 gap-[1px] bg-white/10 border border-white/10"
          >
            {[
              { val: "5+", label: "EXP" },
              { val: "50+", label: "WORK" },
              { val: "30+", label: "CLIENTS" },
            ].map((stat, i) => (
              <div key={i} className="bg-[#0a0a0a] p-4 text-center">
                <div className="text-lg font-bold text-white mb-0.5">{stat.val}</div>
                <div className="text-[9px] text-zinc-600 font-bold tracking-widest uppercase">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileView;