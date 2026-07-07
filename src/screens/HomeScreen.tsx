import ConnectButton from '../components/ConnectButton';
import ConnectionStats from '../components/ConnectionStats';
import ServerSelector from '../components/ServerSelector';
import StatusBar from '../components/StatusBar';
import GlobeVisualization from '../components/GlobeVisualization';
import { useVpn } from '../context/VpnContext';
import { formatTime } from '../utils/helpers';
import { motion } from 'framer-motion';
import { Clock, Fingerprint } from 'lucide-react';

interface HomeScreenProps {
  onOpenServerList: () => void;
}

export default function HomeScreen({ onOpenServerList }: HomeScreenProps) {
  const { status, stats, selectedServer } = useVpn();
  const isConnected = status === 'connected';

  return (
    <div className="flex-1 flex flex-col relative overflow-y-auto">
      {/* Background */}
      <GlobeVisualization />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center px-4 sm:px-6 py-4 gap-4 sm:gap-6">
        {/* Top status */}
        <div className="flex flex-col items-center gap-3 pt-2">
          <StatusBar />
          {isConnected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-4 text-xs text-gray-500"
            >
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatTime(stats.connectedTime)}
              </span>
              <span className="flex items-center gap-1">
                <Fingerprint className="w-3 h-3" />
                {selectedServer.ip}
              </span>
            </motion.div>
          )}
        </div>

        {/* Connect Button — centered */}
        <div className="flex-1 flex items-center justify-center min-h-[240px] sm:min-h-[300px]">
          <ConnectButton />
        </div>

        {/* Connection stats */}
        <ConnectionStats />

        {/* Server selector */}
        <div className="w-full">
          <ServerSelector onOpenServerList={onOpenServerList} />
        </div>
      </div>
    </div>
  );
}
