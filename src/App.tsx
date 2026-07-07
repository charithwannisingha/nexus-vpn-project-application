import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { VpnProvider } from './context/VpnContext';
import HomeScreen from './screens/HomeScreen';
import ServerListScreen from './screens/ServerListScreen';
import ActivityScreen from './screens/ActivityScreen';
import SettingsScreen from './screens/SettingsScreen';
import BottomNav from './components/BottomNav';
import { Shield } from 'lucide-react';

type Tab = 'home' | 'servers' | 'activity' | 'settings';

function AppContent() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [showServerList, setShowServerList] = useState(false);

  const handleTabChange = useCallback((tab: Tab) => {
    if (tab === 'servers') {
      setShowServerList(true);
    } else {
      setActiveTab(tab);
    }
  }, []);

  const handleOpenServerList = useCallback(() => {
    setShowServerList(true);
  }, []);

  const handleCloseServerList = useCallback(() => {
    setShowServerList(false);
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center bg-dark-900">
      {/* Phone frame wrapper for desktop — full width on mobile */}
      <div className="relative w-full h-full max-w-md mx-auto sm:h-[780px] sm:rounded-[2rem] sm:border sm:border-dark-500/30 sm:shadow-2xl sm:shadow-black/50 overflow-hidden flex flex-col bg-dark-900">
        {/* Header */}
        <div className="flex-shrink-0 px-4 sm:px-6 pt-3 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-neon-green to-neon-blue flex items-center justify-center">
              <Shield className="w-4 h-4 text-dark-900" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white tracking-tight">NexusVPN</h1>
              <p className="text-[10px] text-gray-500 -mt-0.5 tracking-wider uppercase">Secure • Fast • Private</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-neon-green/60" />
            <span className="text-[10px] text-gray-500 font-mono">v2.1.0</span>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col"
              >
                <HomeScreen onOpenServerList={handleOpenServerList} />
              </motion.div>
            )}
            {activeTab === 'activity' && (
              <motion.div
                key="activity"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col"
              >
                <ActivityScreen />
              </motion.div>
            )}
            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col"
              >
                <SettingsScreen />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Server list overlay */}
          <AnimatePresence>
            {showServerList && (
              <ServerListScreen onClose={handleCloseServerList} />
            )}
          </AnimatePresence>
        </div>

        {/* Bottom navigation */}
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <VpnProvider>
      <AppContent />
    </VpnProvider>
  );
}
