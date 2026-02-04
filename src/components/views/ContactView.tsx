import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Linkedin, Github, Mail, ArrowUpRight } from "lucide-react";

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

const socialLinks = [
  {
    icon: Linkedin,
    title: "LinkedIn",
    subtitle: "@johndoe",
    action: "Connect",
    href: "https://linkedin.com",
  },
  {
    icon: Github,
    title: "GitHub",
    subtitle: "@johndoe",
    action: "Follow",
    href: "https://github.com",
  },
  {
    icon: Mail,
    title: "Email",
    subtitle: "hello@example.com",
    action: "Message",
    href: "mailto:hello@example.com",
  },
];

const ContactView = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
          Let's Connect
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have a project in mind or just want to say hello? I'd love to hear from you.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-12"
      >
        {/* Contact Form - Left Side */}
        <motion.div variants={itemVariants}>
          <div className="flat-card p-8">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-muted-foreground mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="input-flat w-full"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-muted-foreground mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="input-flat w-full"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-muted-foreground mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="input-flat w-full resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-md bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                <Send size={16} />
                Send Message
              </button>
            </form>
          </div>
        </motion.div>

        {/* Social Links - Right Side */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-xl font-bold text-foreground mb-6">
            Or Reach Out Directly
          </h2>
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                className="social-card justify-between transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-md bg-secondary border border-border flex items-center justify-center">
                    <Icon size={20} className="text-foreground" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-base font-semibold text-foreground">
                      {link.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {link.subtitle}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground font-medium">
                  {link.action}
                  <ArrowUpRight size={16} />
                </div>
              </motion.a>
            );
          })}

          {/* Availability Card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flat-card p-6 mt-8"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rounded-full bg-foreground" />
              <span className="text-foreground font-medium text-sm">
                Available for new projects
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              I'm currently open to freelance work and full-time opportunities.
              Let's discuss how I can help bring your ideas to life.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ContactView;
