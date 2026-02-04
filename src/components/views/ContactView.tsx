import { motion } from "framer-motion";
import { Linkedin, Github, Mail, ArrowUpRight, MessageSquare, Globe, Hash } from "lucide-react";

const socialLinks = [
  {
    icon: Linkedin,
    title: "LinkedIn",
    subtitle: "Professional Network",
    action: "Connect",
    href: "https://linkedin.com",
    color: "group-hover:text-blue-500"
  },
  {
    icon: Github,
    title: "GitHub",
    subtitle: "Source Code & Projects",
    action: "Follow",
    href: "https://github.com",
    color: "group-hover:text-white"
  },
  {
    icon: MessageSquare,
    title: "WhatsApp",
    subtitle: "Quick Chat",
    action: "Message",
    href: "https://wa.me/yournumber",
    color: "group-hover:text-emerald-500"
  },
  {
    icon: Mail,
    title: "Email",
    subtitle: "hello@example.com",
    action: "Send",
    href: "mailto:hello@example.com",
    color: "group-hover:text-orange-400"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.05 } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.3 } 
  },
};

const ContactView = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl mx-auto px-5 pt-28 pb-20"
    >
      {/* Header - Minimalist & Edgy */}
      <motion.div variants={itemVariants} className="mb-16">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white leading-[0.85] mb-6">
          get in touch<span className="text-blue-500">.</span>
        </h1>
        <p className="text-zinc-500 text-lg max-w-md font-normal leading-relaxed">
          Looking for a collaborator or just want to discuss a project? 
          Reach out through any of these platforms.
        </p>
      </motion.div>

      {/* Social Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/10 border border-white/10 mb-12">
        {socialLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <motion.a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="group flex items-center justify-between p-8 bg-[#0a0a0a] hover:bg-[#0f0f0f] transition-all"
            >
              <div className="flex items-center gap-5">
                <div className={`transition-colors duration-300 text-zinc-600 ${link.color}`}>
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm uppercase tracking-wider">
                    {link.title}
                  </h3>
                  <p className="text-zinc-600 text-xs mt-1 lowercase font-mono">
                    {link.subtitle}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-700 group-hover:text-white transition-colors">
                {link.action}
                <ArrowUpRight size={14} />
              </div>
            </motion.a>
          );
        })}
      </div>

      {/* Footer Info / Status Section */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-white/5"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-zinc-500 uppercase text-[10px] font-bold tracking-[0.2em]">
            <Globe size={12} /> Location
          </div>
          <p className="text-zinc-300 text-sm italic">Jakarta, Indonesia (GMT+7)</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-zinc-500 uppercase text-[10px] font-bold tracking-[0.2em]">
            <Hash size={12} /> Availability
          </div>
          <p className="text-zinc-300 text-sm italic">Open for New Projects</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-zinc-500 uppercase text-[10px] font-bold tracking-[0.2em]">
            <MessageSquare size={12} /> Response Time
          </div>
          <p className="text-zinc-300 text-sm italic">Within 24 Hours</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactView;