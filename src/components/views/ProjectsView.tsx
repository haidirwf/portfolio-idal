import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

type FilterType = "all" | "web" | "app" | "design" | "network";

const filters: { id: FilterType; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "app", label: "App" },
  { id: "design", label: "Design" },
  { id: "network", label: "Networking" },
];

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with real-time inventory management.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    category: "web",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    title: "Fitness Tracker App",
    description: "Cross-platform mobile app for tracking workouts and nutrition.",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&h=400&fit=crop",
    category: "app",
    tags: ["Flutter", "Firebase", "Dart"],
  },
  {
    id: 3,
    title: "Brand Identity System",
    description: "Complete visual identity for a tech startup including logo and guidelines.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    category: "design",
    tags: ["Figma", "Illustrator", "Branding"],
  },
  {
    id: 4,
    title: "Enterprise Network Setup",
    description: "Multi-site network infrastructure with VPN and security protocols.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    category: "network",
    tags: ["Cisco", "MikroTik", "VPN"],
  },
  {
    id: 5,
    title: "Dashboard Analytics",
    description: "Real-time analytics dashboard with interactive data visualizations.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    category: "web",
    tags: ["Next.js", "D3.js", "PostgreSQL"],
  },
  {
    id: 6,
    title: "Food Delivery App",
    description: "Feature-rich mobile application for food ordering and delivery tracking.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop",
    category: "app",
    tags: ["React Native", "Redux", "Maps API"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.15 },
  },
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
      className="w-full max-w-6xl mx-auto px-4"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
          Featured Projects
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A curated selection of my work across web development, mobile apps, design, and networking.
        </p>
      </motion.div>

      {/* Filter Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05 }}
        className="flex justify-center gap-2 mb-10 flex-wrap"
      >
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`filter-btn ${
              activeFilter === filter.id ? "filter-btn-active" : ""
            }`}
          >
            {filter.label}
          </button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              layout
              className="flat-card flat-card-hover overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-9 h-9 rounded-md bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                    <Github size={16} className="text-foreground" />
                  </button>
                  <button className="w-9 h-9 rounded-md bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                    <ExternalLink size={16} className="text-foreground" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectsView;
