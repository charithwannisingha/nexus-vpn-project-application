import { motion } from 'framer-motion';
import { Shield, ShieldCheck, ShieldAlert, Wifi } from 'lucide-react';
import { useVpn } from '../context/VpnContext';
import { ConnectionStatus } from '../types';

const statusStyles: Record<ConnectionStatus, {
  bg: string;
  text: string;
  dot: string;
  icon: React.ReactNode;
  label: string;
}> = {
  disconnected: {
    bg: 'bg-gray-500/10 border-gray-500/20',
    text: 'text-gray-400',
    dot: 'bg-gray-500',
    icon: <Shield className="w-3.5 h-3.5" />,
    label: 'Not Protected',
  },
  connecting: {
    bg: 'bg-amber-500/10 border-amber-500/20',
    text: 'text-amber-400',
    dot: 'bg-amber-500',
    icon: <Wifi className="w-3.5 h-3.5 animate-pulse" />,
    label: 'Connecting...',
  },
  connected: {
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    text: 'text-emerald-400',
    dot: 'bg-emerald-400',
    icon: <ShieldCheck className="w-3.5 h-3.5" />,
    label: 'Protected',
  },
  error: {
    bg: 'bg-red-500/10 border-red-500/20',
    text: 'text-red-400',
    dot: 'bg-red-500',
    icon: <ShieldAlert className="w-3.5 h-3.5" />,
    label: 'Connection Error',
  },
};

export default function StatusBar() {
  const { status } = useVpn();
  const style = statusStyles[status];

  return (
    <motion.div
      key={status}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${style.bg} ${style.text}
      `}
    >
      <span className="relative flex h-2 w-2">
        {status === 'connected' && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${style.dot} opacity-75`} />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${style.dot}`} />
      </span>
      {style.icon}
      <span className="text-xs font-semibold uppercase tracking-wider">{style.label}</span>
    </motion.div>
  );
}
