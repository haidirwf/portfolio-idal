import { motion } from "framer-motion";
import {
  LayoutGrid,
  Folder,
  User,
  Send,
  Plus,
  X,
  type LucideIcon,
} from "lucide-react";

export type TabType = "home" | "projects" | "profile" | "contact";

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

interface TabItem {
  id: TabType;
  label: string;
  icon: LucideIcon;
}

const tabs: TabItem[] = [
  { id: "home", label: "Home", icon: LayoutGrid },
  { id: "projects", label: "Projects", icon: Folder },
  { id: "profile", label: "Profile", icon: User },
  { id: "contact", label: "Contact", icon: Send },
];

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f] pt-2 px-2 border-b border-white/5">
      <div className="flex items-end max-w-7xl mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group relative flex items-center gap-2 px-4 py-2 min-w-[120px] rounded-t-xl transition-all duration-300
                ${
                  isActive
                    ? "bg-[#1a1a1a] text-white shadow-[0_-4px_10px_rgba(0,0,0,0.3)]"
                    : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
                }`}
            >
              <Icon
                size={14}
                className={isActive ? "text-blue-400" : "text-zinc-500"}
              />

              <span className="text-xs font-medium lowercase tracking-tight">
                {tab.label}.tsx
              </span>

              <X
                size={12}
                className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
              />

              {isActive && (
                <motion.div
                  layoutId="active-tab-indicator"
                  className="absolute -top-[2px] left-0 right-0 h-[2px] bg-blue-500"
                />
              )}
            </button>
          );
        })}

        <button
          onClick={() => setActiveTab("home")}
          className="p-2 mb-1 ml-1 text-zinc-600 hover:bg-white/5 rounded-md transition-colors"
        >
          <Plus size={16} />
        </button>

        <div className="flex-1 h-10" />
      </div>
    </nav>
  );
};

export default Navigation;
