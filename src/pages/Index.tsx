import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation, { TabType } from "@/components/Navigation";

import HomeView from "@/components/views/HomeView";
import ProjectsView from "@/components/views/ProjectsView";
import ProfileView from "@/components/views/ProfileView";
import ContactView from "@/components/views/ContactView";

const pageVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.15 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.1 },
  },
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>("home");

  const views: Record<TabType, JSX.Element> = {
    home: <HomeView setActiveTab={setActiveTab} />,
    projects: <ProjectsView />,
    profile: <ProfileView />,
    contact: <ContactView />,
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="pt-16 pb-12 px-4">
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
    </div>
  );
};

export default Index;