import { motion } from 'framer-motion';
import { Activity, ArrowDown, ArrowUp, Clock, Globe, Shield, TrendingUp } from 'lucide-react';
import { useVpn } from '../context/VpnContext';
import { formatSpeed, formatTime, formatData } from '../utils/helpers';
import { useState, useEffect } from 'react';

interface SpeedDataPoint {
  time: number;
  download: number;
  upload: number;
}

export default function ActivityScreen() {
  const { status, stats } = useVpn();
  const isConnected = status === 'connected';
  const [speedHistory, setSpeedHistory] = useState<SpeedDataPoint[]>([]);

  useEffect(() => {
    if (isConnected) {
      setSpeedHistory(prev => {
        const newPoint = {
          time: Date.now(),
          download: stats.downloadSpeed,
          upload: stats.uploadSpeed,
        };
        const updated = [...prev, newPoint].slice(-30);
        return updated;
      });
    } else {
      setSpeedHistory([]);
    }
  }, [stats.connectedTime, isConnected]);

  const maxSpeed = Math.max(...speedHistory.map(p => p.download), 1);

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-neon-blue" />
        <h1 className="text-xl font-bold text-white">Network Activity</h1>
      </div>

      {isConnected ? (
        <div className="space-y-4">
          {/* Speed graph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-700/60 rounded-2xl border border-dark-500/30 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-300 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-neon-green" />
                Live Speed
              </span>
              <span className="text-xs text-gray-500">Last 30s</span>
            </div>

            {/* Mini chart */}
            <div className="h-24 flex items-end gap-0.5">
              {speedHistory.map((point, i) => {
                const height = (point.download / maxSpeed) * 100;
                return (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t"
                    style={{
                      background: 'linear-gradient(to top, #00ff87, #00d4ff)',
                      opacity: 0.3 + (i / speedHistory.length) * 0.7,
                    }}
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max(height, 2)}%` }}
                    transition={{ duration: 0.3 }}
                  />
                );
              })}
              {speedHistory.length === 0 && (
                <div className="flex-1 flex items-center justify-center text-gray-600 text-xs">
                  Collecting data...
                </div>
              )}
            </div>
          </motion.div>

          {/* Current speeds */}
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-dark-700/60 rounded-2xl border border-dark-500/30 p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-neon-green/10">
                  <ArrowDown className="w-4 h-4 text-neon-green" />
                </div>
                <span className="text-xs text-gray-400">Download</span>
              </div>
              <span className="text-2xl font-bold font-mono text-neon-green">
                {formatSpeed(stats.downloadSpeed)}
              </span>
              <div className="text-xs text-gray-500 mt-1">
                Total: {formatData(stats.totalDownload)}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-dark-700/60 rounded-2xl border border-dark-500/30 p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-neon-blue/10">
                  <ArrowUp className="w-4 h-4 text-neon-blue" />
                </div>
                <span className="text-xs text-gray-400">Upload</span>
              </div>
              <span className="text-2xl font-bold font-mono text-neon-blue">
                {formatSpeed(stats.uploadSpeed)}
              </span>
              <div className="text-xs text-gray-500 mt-1">
                Total: {formatData(stats.totalUpload)}
              </div>
            </motion.div>
          </div>

          {/* Session info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-dark-700/60 rounded-2xl border border-dark-500/30 p-4 space-y-3"
          >
            <h3 className="text-sm font-medium text-gray-300">Session Details</h3>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs text-gray-400">
                  <Clock className="w-3.5 h-3.5" /> Duration
                </span>
                <span className="text-sm font-mono text-white">{formatTime(stats.connectedTime)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs text-gray-400">
                  <Globe className="w-3.5 h-3.5" /> IP Address
                </span>
                <span className="text-sm font-mono text-white">{stats.ipAddress}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs text-gray-400">
                  <Shield className="w-3.5 h-3.5" /> Encryption
                </span>
                <span className="text-sm font-mono text-neon-green">AES-256-GCM</span>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-dark-700/60 flex items-center justify-center mb-4">
            <Activity className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-400 mb-2">No Active Session</h3>
          <p className="text-sm text-gray-600 max-w-xs">
            Connect to a VPN server to view real-time network activity and statistics.
          </p>
        </motion.div>
      )}
    </div>
  );
}
