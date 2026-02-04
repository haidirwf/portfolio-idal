import { motion } from "framer-motion";
import { Code2, Smartphone, Palette, Network, ArrowRight, Folder, Send, User } from "lucide-react";

const pillars = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Building modern, responsive web applications with cutting-edge technologies.",
    tab: "projects"
  },
  {
    icon: Smartphone,
    title: "App Development",
    description: "Creating cross-platform mobile experiences that users love.",
    tab: "projects"
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Crafting intuitive interfaces with a focus on user experience.",
    tab: "projects"
  },
  {
    icon: Network,
    title: "Network Engineering",
    description: "Designing robust network infrastructure and security solutions.",
    tab: "projects"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const HomeView = ({ setActiveTab }: { setActiveTab: (tab: any) => void }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-6xl mx-auto px-6 pt-32 pb-20"
    >
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-center">
        <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
            Available for Freelance
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-foreground leading-[1.1] tracking-tight">
            Engineering <span className="text-muted-foreground">Digital</span> Solutions.
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            I'm a full-stack developer and network engineer who builds high-performance applications with a focus on clean design.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={() => setActiveTab("projects")}
              className="group px-6 py-3 bg-foreground text-background rounded-2xl font-bold flex items-center gap-2 hover:bg-foreground/90 transition-all"
            >
              Check My Work 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => setActiveTab("contact")}
              className="px-6 py-3 bg-secondary border border-border rounded-2xl font-bold hover:bg-border transition-all"
            >
              Let's Talk
            </button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-5 flex justify-center">
          <div className="relative group shadow-2xl rounded-[2.5rem] overflow-hidden rotate-2 hover:rotate-0 transition-all duration-500 border-8 border-card">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop"
              alt="Profile"
              className="w-full h-80 lg:h-[450px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </motion.div>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              onClick={() => setActiveTab(pillar.tab)}
              className="group cursor-pointer p-8 rounded-[2rem] bg-card border border-border hover:border-primary/40 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Icon size={22} />
              </div>
              <h3 className="text-lg font-bold mb-3">{pillar.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Footer Navigation */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col md:flex-row items-center justify-between p-8 rounded-[2rem] bg-secondary/30 border border-border border-dashed"
      >
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center border border-border">
            <User size={18} />
          </div>
          <p className="font-medium">Curious about my journey and technical stack?</p>
        </div>
        <button 
          onClick={() => setActiveTab("profile")}
          className="text-primary font-bold flex items-center gap-2 hover:underline underline-offset-4"
        >
          Read Full Profile <ArrowRight size={16} />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default HomeView;