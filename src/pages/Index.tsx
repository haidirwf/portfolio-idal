import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import HomeView from "@/components/views/HomeView";
import ProjectsView from "@/components/views/ProjectsView";
import ProfileView from "@/components/views/ProfileView";
import ContactView from "@/components/views/ContactView";

type TabType = "home" | "projects" | "profile" | "contact";

const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.15,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
};

const views: Record<TabType, React.ReactNode> = {
  home: <HomeView />,
  projects: <ProjectsView />,
  profile: <ProfileView />,
  contact: <ContactView />,
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>("home");

  return (
    <div className="min-h-screen">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
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
