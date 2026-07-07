import { motion } from 'framer-motion';
import { Signal, Crown, Check, Zap } from 'lucide-react';
import { VpnServer } from '../types';
import { getPingColor, getLoadColor } from '../utils/helpers';

interface ServerCardProps {
  server: VpnServer;
  isSelected: boolean;
  isConnected: boolean;
  onSelect: (server: VpnServer) => void;
  index: number;
}

export default function ServerCard({ server, isSelected, isConnected, onSelect, index }: ServerCardProps) {
  const pingColor = getPingColor(server.ping);
  const loadColor = getLoadColor(server.load);

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      onClick={() => onSelect(server)}
      className={`
        w-full p-3 sm:p-4 rounded-2xl border transition-all duration-300
        flex items-center gap-3 sm:gap-4 text-left cursor-pointer
        ${isSelected
          ? 'bg-dark-600/90 border-neon-green/40 shadow-[0_0_20px_rgba(0,255,135,0.08)]'
          : 'bg-dark-700/50 border-dark-500/30 hover:bg-dark-600/60 hover:border-dark-400/50'
        }
      `}
    >
      {/* Flag */}
      <div className="text-3xl sm:text-4xl flex-shrink-0 select-none">{server.flag}</div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm sm:text-base text-white truncate">
            {server.city}
          </span>
          {server.premium && (
            <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30">
              <Crown className="w-2.5 h-2.5 text-amber-400" />
              <span className="text-[9px] font-bold text-amber-400 uppercase">Pro</span>
            </span>
          )}
          {isSelected && isConnected && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-neon-green/15 border border-neon-green/30"
            >
              <Zap className="w-2.5 h-2.5 text-neon-green" />
              <span className="text-[9px] font-bold text-neon-green uppercase">Live</span>
            </motion.span>
          )}
        </div>
        <span className="text-xs text-gray-400">{server.country}</span>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-[10px] text-gray-500">{server.protocol}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        {/* Ping */}
        <div className="flex items-center gap-1">
          <Signal className="w-3 h-3" style={{ color: pingColor }} />
          <span className="text-xs font-mono font-medium" style={{ color: pingColor }}>
            {server.ping}ms
          </span>
        </div>

        {/* Load bar */}
        <div className="flex items-center gap-1.5">
          <div className="w-12 h-1.5 bg-dark-500 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: loadColor }}
              initial={{ width: 0 }}
              animate={{ width: `${server.load}%` }}
              transition={{ delay: index * 0.03 + 0.2, duration: 0.5 }}
            />
          </div>
          <span className="text-[10px] text-gray-500 font-mono">{server.load}%</span>
        </div>
      </div>

      {/* Selection indicator */}
      <div className={`
        w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300
        ${isSelected
          ? 'border-neon-green bg-neon-green/20'
          : 'border-dark-400'
        }
      `}>
        {isSelected && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <Check className="w-3 h-3 text-neon-green" />
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}
