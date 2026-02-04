import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

const experiences = [
  {
    year: "2023 - Present",
    title: "Senior Full Stack Developer",
    company: "Tech Innovations Inc.",
    description: "Leading development of enterprise web applications and mentoring junior developers.",
    icon: Briefcase,
  },
  {
    year: "2021 - 2023",
    title: "Mobile App Developer",
    company: "Digital Solutions Ltd.",
    description: "Built cross-platform mobile applications using Flutter and React Native.",
    icon: Briefcase,
  },
  {
    year: "2019 - 2021",
    title: "Network Engineer",
    company: "NetSecure Systems",
    description: "Designed and implemented network infrastructure for enterprise clients.",
    icon: Briefcase,
  },
  {
    year: "2015 - 2019",
    title: "Bachelor's in Computer Science",
    company: "University of Technology",
    description: "Specialized in software engineering and network security.",
    icon: GraduationCap,
  },
];

const skills = {
  Development: ["React", "Next.js", "Node.js", "Flutter", "TypeScript", "Python"],
  Design: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "UI/UX", "Prototyping"],
  Network: ["MikroTik", "Cisco CCNA", "Wireshark", "Server Management", "VPN", "Firewall"],
};

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

const ProfileView = () => {
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
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
          Experience & Expertise
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          My professional journey and the skills I've developed along the way.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Timeline - Left Column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-xl font-bold text-foreground mb-8">Journey</h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-[3px] top-2 bottom-2 w-px bg-border" />

            <div className="space-y-6">
              {experiences.map((exp, index) => {
                const Icon = exp.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative pl-8"
                  >
                    {/* Timeline Dot */}
                    <div className="timeline-dot absolute left-0 top-2" />
                    
                    <div className="flat-card p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon size={14} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {exp.year}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-foreground mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {exp.company}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {exp.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Skills - Right Column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-xl font-bold text-foreground mb-8">Skills</h2>
          <div className="space-y-8">
            {Object.entries(skills).map(([category, skillList]) => (
              <motion.div key={category} variants={itemVariants}>
                <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill, i) => (
                    <span key={i} className="skill-badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 mt-10"
          >
            {[
              { value: "5+", label: "Years Experience" },
              { value: "50+", label: "Projects Completed" },
              { value: "30+", label: "Happy Clients" },
            ].map((stat, index) => (
              <div key={index} className="flat-card p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileView;
