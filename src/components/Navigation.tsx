import { motion } from "framer-motion";
import {
  LayoutGrid,
  Folder,
  User,
  Send,
  Award,
  Plus,
  type LucideIcon,
} from "lucide-react";

export type TabType = "home" | "projects" | "certificates" | "profile" | "contact";

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const tabs: { id: TabType; label: string; icon: LucideIcon }[] = [
  { id: "home", label: "home", icon: LayoutGrid },
  { id: "projects", label: "projects", icon: Folder },
  { id: "certificates", label: "certs", icon: Award },
  { id: "profile", label: "profile", icon: User },
  { id: "contact", label: "contact", icon: Send },
];

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#0a0a0a] border-b border-white/5">
      <div className="flex flex-wrap items-stretch max-w-7xl mx-auto">
        
        {/* Tabs Container - Flex Wrap buat Mobile */}
        <div className="flex flex-wrap flex-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 sm:py-3 transition-all relative border-r border-b border-white/5 flex-grow sm:flex-grow-0
                  ${isActive ? "bg-[#141414] text-white" : "text-zinc-500 hover:bg-white/5"}`}
              >
                <Icon size={14} className={isActive ? "text-blue-500" : "text-zinc-500"} />
                <span className="text-[11px] font-mono lowercase tracking-tighter whitespace-nowrap">
                  {tab.label}.tsx
                </span>
                
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute top-0 left-0 right-0 h-[2px] bg-blue-500"
                  />
                )}
              </button>
            );
          })}

          {/* Tombol Plus - Ikut nempel di akhir barisan tab */}
          <div className="flex items-center px-4 py-3 border-r border-b border-white/5 bg-[#0a0a0a]">
            <Plus size={16} className="text-zinc-700 hover:text-white transition-colors cursor-pointer" />
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navigation;