import { motion } from "framer-motion";
import { 
  Code2, 
  Smartphone, 
  Palette, 
  Network, 
  ArrowUpRight, 
  LayoutGrid, 
  User, 
  Send,
  ExternalLink 
} from "lucide-react";

const skills = [
  { icon: Code2, title: "Web Dev", desc: "React, Next.js, TS" },
  { icon: Smartphone, title: "Mobile", desc: "React Native, Expo" },
  { icon: Palette, title: "UI/UX", desc: "Figma, Framer" },
  { icon: Network, title: "Network", desc: "Security, Infrastructure" },
];

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const HomeView = ({ setActiveTab }: { setActiveTab: (tab: any) => void }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className="w-full max-w-5xl mx-auto px-4 sm:px-8 pt-24 pb-16"
    >
      {/* --- HERO SECTION --- */}
      <section className="flex flex-col-reverse md:flex-row gap-6 mb-12 items-start justify-between">
        <motion.div variants={itemVariants} className="space-y-4">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.85] text-white">
            Haidar Rauf Prayogo<span className="text-blue-500">.</span>
          </h1>
          <p className="text-zinc-500 text-sm md:text-lg max-w-md font-normal leading-snug">
            Technical precision meets clean execution. Specialized in high-performance applications.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="w-16 h-16 md:w-44 md:h-44 rounded-xl border border-white/10 overflow-hidden grayscale bg-zinc-900">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" 
              alt="Profile" 
              className="w-full h-full object-cover opacity-60" 
            />
          </div>
        </motion.div>
      </section>

      {/* --- SKILLS GRID (Brutalist Style) --- */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/10 border border-white/10 mb-12"
      >
        {skills.map((skill, index) => (
          <div key={index} className="p-5 md:p-8 bg-[#0a0a0a] group hover:bg-[#0f0f0f] transition-colors">
            <skill.icon size={18} className="text-zinc-500 group-hover:text-blue-500 mb-4 transition-colors" />
            <h3 className="text-white text-[10px] md:text-xs font-bold uppercase tracking-widest">{skill.title}</h3>
            <p className="text-zinc-600 text-[10px] md:text-xs mt-1 leading-tight">{skill.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* --- SIMPLE NAV BARS --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {[
          { id: "projects", label: "Projects", icon: LayoutGrid },
          { id: "profile", label: "Profile", icon: User },
          { id: "contact", label: "Contact", icon: Send },
          { id: "home", label: "Resume", icon: ExternalLink },
        ].map((item) => (
          <motion.button
            key={item.id}
            variants={itemVariants}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab(item.id)}
            className="flex items-center justify-between p-4 bg-zinc-900/40 border border-white/5 rounded-lg hover:border-white/10 hover:bg-white/5 transition-all group"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <item.icon size={16} className="text-zinc-500 group-hover:text-white transition-colors shrink-0" />
              <span className="text-xs font-medium text-zinc-400 group-hover:text-white truncate uppercase tracking-tighter">
                {item.label}
              </span>
            </div>
            <ArrowUpRight size={12} className="text-zinc-800 group-hover:text-white transition-colors shrink-0" />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default HomeView;