import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, X, Server, Filter } from 'lucide-react';
import { useVpn } from '../context/VpnContext';
import ServerCard from '../components/ServerCard';
import { regions } from '../data/servers';

interface ServerListScreenProps {
  onClose: () => void;
}

export default function ServerListScreen({ onClose }: ServerListScreenProps) {
  const { servers, selectedServer, selectServer, status } = useVpn();
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);

  const isConnected = status === 'connected';

  const filteredServers = useMemo(() => {
    return servers.filter(s => {
      const matchesSearch =
        s.country.toLowerCase().includes(search.toLowerCase()) ||
        s.city.toLowerCase().includes(search.toLowerCase());
      const matchesRegion = selectedRegion === 'All' || s.region === selectedRegion;
      const matchesPremium = !showPremiumOnly || s.premium;
      return matchesSearch && matchesRegion && matchesPremium;
    });
  }, [servers, search, selectedRegion, showPremiumOnly]);

  const handleSelect = (server: typeof servers[0]) => {
    selectServer(server);
    onClose();
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 z-50 bg-dark-900 flex flex-col"
    >
      {/* Header */}
      <div className="flex-shrink-0 px-4 sm:px-6 pt-4 pb-3 border-b border-dark-600/50">
        <div className="flex items-center gap-3 mb-4">
          <motion.button
            onClick={onClose}
            className="p-2 rounded-xl bg-dark-700/80 hover:bg-dark-600 transition-colors cursor-pointer"
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="w-5 h-5 text-gray-300" />
          </motion.button>
          <div className="flex-1">
            <h1 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-neon-blue" />
              Server Locations
            </h1>
            <p className="text-xs text-gray-500">{filteredServers.length} servers available</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search country or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-dark-700/80 border border-dark-500/50 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue/50 transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Region tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
          {regions.map(region => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`
                px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex-shrink-0
                ${selectedRegion === region
                  ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                  : 'bg-dark-700/60 text-gray-400 border border-dark-500/30 hover:text-gray-300'
                }
              `}
            >
              {region}
            </button>
          ))}
          <button
            onClick={() => setShowPremiumOnly(!showPremiumOnly)}
            className={`
              px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 flex-shrink-0
              ${showPremiumOnly
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-dark-700/60 text-gray-400 border border-dark-500/30 hover:text-gray-300'
              }
            `}
          >
            <Filter className="w-3 h-3" />
            Premium
          </button>
        </div>
      </div>

      {/* Server list */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-3 space-y-2">
        <AnimatePresence>
          {filteredServers.map((server, idx) => (
            <ServerCard
              key={server.id}
              server={server}
              isSelected={selectedServer.id === server.id}
              isConnected={isConnected && selectedServer.id === server.id}
              onSelect={handleSelect}
              index={idx}
            />
          ))}
        </AnimatePresence>

        {filteredServers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Search className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No servers found</p>
            <p className="text-gray-600 text-xs mt-1">Try adjusting your filters</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
