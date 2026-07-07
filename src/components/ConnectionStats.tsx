import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUp, Clock, Globe } from 'lucide-react';
import { useVpn } from '../context/VpnContext';
import { formatSpeed, formatTime, formatData } from '../utils/helpers';

function StatCard({
  icon,
  label,
  value,
  color,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-dark-700/80 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-dark-500/50 flex flex-col items-center gap-1"
    >
      <div className="flex items-center gap-1.5" style={{ color }}>
        {icon}
        <span className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-400 font-medium">{label}</span>
      </div>
      <span className="text-sm sm:text-lg font-bold font-mono" style={{ color }}>
        {value}
      </span>
    </motion.div>
  );
}

export default function ConnectionStats() {
  const { status, stats } = useVpn();
  const isConnected = status === 'connected';

  return (
    <AnimatePresence mode="wait">
      {isConnected && (
        <motion.div
          key="stats"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full overflow-hidden"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 px-1">
            <StatCard
              icon={<ArrowDown className="w-3.5 h-3.5" />}
              label="Download"
              value={formatSpeed(stats.downloadSpeed)}
              color="#00ff87"
              delay={0}
            />
            <StatCard
              icon={<ArrowUp className="w-3.5 h-3.5" />}
              label="Upload"
              value={formatSpeed(stats.uploadSpeed)}
              color="#00d4ff"
              delay={0.1}
            />
            <StatCard
              icon={<Clock className="w-3.5 h-3.5" />}
              label="Duration"
              value={formatTime(stats.connectedTime)}
              color="#a855f7"
              delay={0.2}
            />
            <StatCard
              icon={<Globe className="w-3.5 h-3.5" />}
              label="Data Used"
              value={formatData(stats.totalDownload + stats.totalUpload)}
              color="#ffd32a"
              delay={0.3}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
