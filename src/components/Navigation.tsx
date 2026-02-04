import { motion } from "framer-motion";
import {
  LayoutGrid,
  Folder,
  User,
  Send,
  Award, // Icon baru untuk Sertifikat
  Plus,
  X,
  type LucideIcon,
} from "lucide-react";

// Update Type untuk menyertakan certificates
export type TabType = "home" | "projects" | "certificates" | "profile" | "contact";

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const tabs: { id: TabType; label: string; icon: LucideIcon }[] = [
  { id: "home", label: "home", icon: LayoutGrid },
  { id: "projects", label: "projects", icon: Folder },
  { id: "certificates", label: "certs", icon: Award }, // Tab baru
  { id: "profile", label: "profile", icon: User },
  { id: "contact", label: "contact", icon: Send },
];

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#0a0a0a] border-b border-white/5">
      <div className="flex items-center max-w-7xl mx-auto">
        <div className="flex items-end overflow-x-auto no-scrollbar touch-pan-x flex-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group flex items-center gap-2 px-4 py-3.5 sm:py-3 min-w-fit transition-all relative border-r border-white/5
                  ${isActive ? "bg-[#141414] text-white" : "text-zinc-500 hover:bg-white/5"}`}
              >
                <Icon size={14} className={isActive ? "text-blue-500" : "text-zinc-500"} />
                <span className="text-[11px] font-medium lowercase tracking-tighter whitespace-nowrap font-mono">
                  {tab.label}.tsx
                </span>
                
                <X 
                  size={10} 
                  className={`ml-1 transition-opacity ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"}`} 
                />

                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute top-0 left-0 right-0 h-[2px] bg-blue-500"
                  />
                )}
              </button>
            );
          })}
          <div className="min-w-[40px] h-full" />
        </div>

        <div className="px-3 border-l border-white/5 bg-[#0a0a0a] hidden sm:block">
          <Plus size={16} className="text-zinc-600" />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;