import { motion } from 'framer-motion';
import { ChevronRight, MapPin } from 'lucide-react';
import { useVpn } from '../context/VpnContext';

interface ServerSelectorProps {
  onOpenServerList: () => void;
}

export default function ServerSelector({ onOpenServerList }: ServerSelectorProps) {
  const { selectedServer, status } = useVpn();
  const isConnected = status === 'connected';

  return (
    <motion.button
      onClick={onOpenServerList}
      className={`
        w-full p-3 sm:p-4 rounded-2xl border transition-all duration-300
        flex items-center gap-3 sm:gap-4 cursor-pointer group
        ${isConnected
          ? 'bg-dark-600/60 border-neon-green/20 hover:border-neon-green/40'
          : 'bg-dark-700/60 border-dark-500/40 hover:border-dark-400/60'
        }
      `}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Flag */}
      <div className="text-3xl sm:text-4xl select-none">{selectedServer.flag}</div>

      {/* Server info */}
      <div className="flex-1 text-left">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3 h-3 text-gray-500" />
          <span className="text-xs text-gray-400 uppercase tracking-wider">Selected Server</span>
        </div>
        <div className="font-semibold text-base sm:text-lg text-white mt-0.5">
          {selectedServer.city}, {selectedServer.country}
        </div>
        <div className="text-xs text-gray-500 mt-0.5">
          {selectedServer.protocol} · {selectedServer.ping}ms · {selectedServer.ip}
        </div>
      </div>

      {/* Arrow */}
      <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-gray-300 transition-colors" />
    </motion.button>
  );
}
