import { motion } from 'framer-motion';
import { Power, Loader2, ShieldCheck, ShieldAlert } from 'lucide-react';
import { useVpn } from '../context/VpnContext';
import { ConnectionStatus } from '../types';

const statusConfig: Record<ConnectionStatus, {
  gradient: string;
  shadow: string;
  ringColor: string;
  icon: React.ReactNode;
  label: string;
  sublabel: string;
}> = {
  disconnected: {
    gradient: 'from-gray-600 to-gray-700',
    shadow: '0 0 40px rgba(100, 100, 120, 0.3)',
    ringColor: 'rgba(100, 100, 120, 0.3)',
    icon: <Power className="w-10 h-10 sm:w-12 sm:h-12" />,
    label: 'Connect',
    sublabel: 'Tap to secure your connection',
  },
  connecting: {
    gradient: 'from-amber-500 to-orange-500',
    shadow: '0 0 60px rgba(255, 165, 0, 0.4)',
    ringColor: 'rgba(255, 165, 0, 0.3)',
    icon: <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 animate-spin" />,
    label: 'Connecting',
    sublabel: 'Establishing secure tunnel...',
  },
  connected: {
    gradient: 'from-emerald-400 to-green-500',
    shadow: '0 0 80px rgba(0, 255, 135, 0.35)',
    ringColor: 'rgba(0, 255, 135, 0.25)',
    icon: <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12" />,
    label: 'Connected',
    sublabel: 'Your connection is secured',
  },
  error: {
    gradient: 'from-red-500 to-rose-600',
    shadow: '0 0 60px rgba(255, 71, 87, 0.4)',
    ringColor: 'rgba(255, 71, 87, 0.3)',
    icon: <ShieldAlert className="w-10 h-10 sm:w-12 sm:h-12" />,
    label: 'Error',
    sublabel: 'Connection failed. Try again.',
  },
};

export default function ConnectButton() {
  const { status, toggleConnection } = useVpn();
  const config = statusConfig[status];
  const isConnected = status === 'connected';
  const isConnecting = status === 'connecting';

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6">
      {/* Button container with rings */}
      <div className="relative flex items-center justify-center">
        {/* Pulsing rings when connected */}
        {isConnected && (
          <>
            <div
              className="absolute w-40 h-40 sm:w-52 sm:h-52 rounded-full pulse-ring-1"
              style={{ border: `2px solid ${config.ringColor}` }}
            />
            <div
              className="absolute w-40 h-40 sm:w-52 sm:h-52 rounded-full pulse-ring-2"
              style={{ border: `2px solid ${config.ringColor}` }}
            />
            <div
              className="absolute w-40 h-40 sm:w-52 sm:h-52 rounded-full pulse-ring-3"
              style={{ border: `1px solid ${config.ringColor}` }}
            />
          </>
        )}

        {/* Connecting spinner ring */}
        {isConnecting && (
          <motion.div
            className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full"
            style={{
              border: '2px solid transparent',
              borderTopColor: '#ff6b35',
              borderRightColor: '#ffd32a',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        )}

        {/* Outer glow ring */}
        <motion.div
          className="absolute w-36 h-36 sm:w-48 sm:h-48 rounded-full"
          style={{
            background: `radial-gradient(circle, ${config.ringColor} 0%, transparent 70%)`,
          }}
          animate={{
            scale: isConnected ? [1, 1.05, 1] : 1,
            opacity: isConnected ? [0.5, 0.8, 0.5] : 0.3,
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Main Button */}
        <motion.button
          onClick={toggleConnection}
          disabled={status === 'error'}
          className={`
            relative z-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full
            bg-gradient-to-br ${config.gradient}
            flex items-center justify-center
            text-white cursor-pointer
            transition-all duration-300
            disabled:cursor-not-allowed
          `}
          style={{ boxShadow: config.shadow }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={isConnecting ? { scale: [1, 1.03, 1] } : {}}
          transition={isConnecting ? { duration: 1, repeat: Infinity } : {}}
        >
          {/* Inner glass effect */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/20 to-transparent" />

          {/* Icon */}
          <div className="relative z-10">
            {config.icon}
          </div>
        </motion.button>
      </div>

      {/* Status label */}
      <motion.div
        className="text-center"
        key={status}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl sm:text-2xl font-bold tracking-wide">
          {config.label}
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          {config.sublabel}
        </p>
      </motion.div>
    </div>
  );
}
