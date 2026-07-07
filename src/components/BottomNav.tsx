import { motion } from 'framer-motion';
import { Shield, Server, Settings, Activity } from 'lucide-react';

type Tab = 'home' | 'servers' | 'activity' | 'settings';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs: { id: Tab; icon: typeof Shield; label: string }[] = [
  { id: 'home', icon: Shield, label: 'VPN' },
  { id: 'servers', icon: Server, label: 'Servers' },
  { id: 'activity', icon: Activity, label: 'Activity' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="flex-shrink-0 bg-dark-800/90 backdrop-blur-xl border-t border-dark-600/50">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl cursor-pointer transition-colors
                ${isActive ? 'text-neon-green' : 'text-gray-500 hover:text-gray-400'}
              `}
              whileTap={{ scale: 0.9 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-neon-green/10 rounded-xl"
                  transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                />
              )}
              <Icon className="w-5 h-5 relative z-10" />
              <span className="text-[10px] font-medium relative z-10">{tab.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
