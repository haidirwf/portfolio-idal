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
  { id: "home", label: "home", icon: LayoutGrid },
  { id: "projects", label: "projects", icon: Folder },
  { id: "profile", label: "profile", icon: User },
  { id: "contact", label: "contact", icon: Send },
];

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f] border-b border-white/5">
      <div className="flex items-end max-w-7xl mx-auto">
        {/* Scroll Container */}
        <div className="flex items-end overflow-x-auto no-scrollbar scroll-smooth">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative flex items-center gap-2 px-4 py-3 sm:py-2.5 min-w-fit flex-shrink-0 transition-all duration-200
                  ${
                    isActive
                      ? "bg-[#1a1a1a] text-white"
                      : "text-zinc-500 hover:text-zinc-300 active:bg-white/5"
                  }`}
              >
                {/* Icon - Ukuran sedikit lebih besar di mobile agar mudah dilihat */}
                <Icon
                  size={14}
                  className={`${isActive ? "text-blue-400" : "text-zinc-500"}`}
                />

                {/* Label .tsx */}
                <span className="text-[11px] sm:text-xs font-medium lowercase tracking-tight whitespace-nowrap">
                  {tab.label}.tsx
                </span>

                {/* Tombol X - Di mobile hanya muncul jika aktif agar tidak penuh */}
                <X
                  size={12}
                  className={`ml-2 transition-opacity duration-200 
                    ${isActive ? "opacity-60" : "opacity-0 md:group-hover:opacity-60"}
                  `}
                />

                {/* Active Indicator (Bar Atas) */}
                {isActive && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    className="absolute top-0 left-0 right-0 h-[2px] bg-blue-500"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                
                {/* Border kanan antar tab yang halus */}
                <div className="absolute right-0 top-1/4 bottom-1/4 w-[1px] bg-white/5" />
              </button>
            );
          })}
        </div>

        {/* Action Buttons (Sticky at the end) */}
        <div className="flex items-center px-2 mb-1 bg-[#0f0f0f]">
          <button
            onClick={() => console.log("New Tab")}
            className="p-2 text-zinc-600 hover:text-zinc-300 hover:bg-white/5 rounded-md transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;