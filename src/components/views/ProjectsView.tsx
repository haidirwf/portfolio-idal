import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Folder, Hash } from "lucide-react";

type FilterType = "all" | "web" | "app" | "design" | "network";

const filters: { id: FilterType; label: string }[] = [
  { id: "all", label: "all" },
  { id: "web", label: "web" },
  { id: "app", label: "app" },
  { id: "design", label: "design" },
  { id: "network", label: "networking" },
];

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack solution with real-time inventory management.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    category: "web",
    tags: ["React", "Node.js"],
  },
  {
    id: 2,
    title: "Fitness Tracker App",
    description: "Cross-platform mobile app for tracking workouts.",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&h=400&fit=crop",
    category: "app",
    tags: ["Flutter", "Firebase"],
  },
  {
    id: 3,
    title: "Enterprise Setup",
    description: "Multi-site network infrastructure with VPN protocols.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    category: "network",
    tags: ["Cisco", "MikroTik"],
  },
  {
    id: 4,
    title: "Dashboard Analytics",
    description: "Interactive data visualizations and real-time analytics.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    category: "web",
    tags: ["Next.js", "D3.js"],
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const ProjectsView = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-5xl mx-auto px-5 pt-28 pb-20"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} initial="hidden" animate="visible" className="mb-12">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white leading-[0.85] mb-6">
          projek kami<span className="text-blue-500">.</span>
        </h1>
        <p className="text-zinc-500 text-lg max-w-md font-normal lowercase tracking-tight">
          / {activeFilter} projects — showing {filteredProjects.length} items
        </p>
      </motion.div>

      {/* Filter Bar - Technical / Tab Style */}
      <div className="flex overflow-x-auto no-scrollbar border-b border-white/10 mb-10">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-6 py-3 text-[11px] uppercase tracking-[0.2em] font-bold transition-all whitespace-nowrap border-b-2 
              ${activeFilter === filter.id 
                ? "border-blue-500 text-white bg-white/5" 
                : "border-transparent text-zinc-600 hover:text-zinc-400"
              }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: 10 }}
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/10 border border-white/10"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="bg-[#0a0a0a] group relative overflow-hidden"
            >
              {/* Image Container */}
              <div className="aspect-video overflow-hidden bg-zinc-900 border-b border-white/5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 opacity-60 group-hover:opacity-100"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                       <Folder size={12} className="text-blue-500" />
                       <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">{project.category}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight leading-tight">
                      {project.title}
                    </h3>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="p-2 bg-zinc-900 border border-white/5 hover:border-white/20 text-zinc-400 hover:text-white transition-all rounded-md">
                      <Github size={16} />
                    </button>
                    <button className="p-2 bg-zinc-900 border border-white/5 hover:border-white/20 text-zinc-400 hover:text-white transition-all rounded-md">
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>

                <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-2 font-light">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-zinc-400">
                      <Hash size={10} className="text-blue-500/50" />
                      <span className="text-[10px] font-mono uppercase tracking-tighter">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover Effect Bar */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectsView;