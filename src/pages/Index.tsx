import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation, { TabType } from "@/components/Navigation";

// Import Views
import HomeView from "@/components/views/HomeView";
import ProjectsView from "@/components/views/ProjectsView";
import CertificatesView from "@/components/views/CertificatesView";
import ProfileView from "@/components/views/ProfileView";
import ContactView from "@/components/views/ContactView";

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.15 },
  },
} as const;

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>("home");

  const views: Record<TabType, JSX.Element> = {
    home: <HomeView setActiveTab={setActiveTab} />,
    projects: <ProjectsView />,
    certificates: <CertificatesView />,
    profile: <ProfileView />,
    contact: <ContactView />,
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30 selection:text-blue-200">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="relative min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {views[activeTab]}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Noise Overlay */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none z-[-1]" />
    </div>
  );
};

export default Index;