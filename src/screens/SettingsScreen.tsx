import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Shield,
  Zap,
  Globe,
  Bell,
  Moon,
  Lock,
  Key,
  HelpCircle,
  Info,
  ChevronRight,
  ToggleLeft,
  ToggleRight,
  FileText,
  Cpu,
} from 'lucide-react';

interface ToggleSettingProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  color: string;
  delay: number;
}

function ToggleSetting({ icon, label, description, enabled, onToggle, color, delay }: ToggleSettingProps) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      onClick={onToggle}
      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-dark-600/40 transition-colors cursor-pointer"
    >
      <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}15` }}>
        <div style={{ color }}>{icon}</div>
      </div>
      <div className="flex-1 text-left">
        <span className="text-sm font-medium text-white">{label}</span>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
      {enabled ? (
        <ToggleRight className="w-7 h-7 text-neon-green flex-shrink-0" />
      ) : (
        <ToggleLeft className="w-7 h-7 text-gray-600 flex-shrink-0" />
      )}
    </motion.button>
  );
}

function LinkSetting({
  icon,
  label,
  value,
  color,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-dark-600/40 transition-colors cursor-pointer"
    >
      <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}15` }}>
        <div style={{ color }}>{icon}</div>
      </div>
      <div className="flex-1 text-left">
        <span className="text-sm font-medium text-white">{label}</span>
      </div>
      {value && <span className="text-xs text-gray-500 mr-1">{value}</span>}
      <ChevronRight className="w-4 h-4 text-gray-600 flex-shrink-0" />
    </motion.button>
  );
}

export default function SettingsScreen() {
  const [killSwitch, setKillSwitch] = useState(true);
  const [autoConnect, setAutoConnect] = useState(false);
  const [splitTunnel, setSplitTunnel] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [dns, setDns] = useState(true);

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-5 h-5 text-neon-purple" />
        <h1 className="text-xl font-bold text-white">Settings</h1>
      </div>

      {/* Security Section */}
      <div className="mb-6">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
          Security & Privacy
        </h2>
        <div className="bg-dark-700/40 rounded-2xl border border-dark-500/20 overflow-hidden">
          <ToggleSetting
            icon={<Shield className="w-4 h-4" />}
            label="Kill Switch"
            description="Block internet if VPN disconnects"
            enabled={killSwitch}
            onToggle={() => setKillSwitch(!killSwitch)}
            color="#ff4757"
            delay={0}
          />
          <ToggleSetting
            icon={<Lock className="w-4 h-4" />}
            label="DNS Leak Protection"
            description="Prevent DNS queries outside tunnel"
            enabled={dns}
            onToggle={() => setDns(!dns)}
            color="#00d4ff"
            delay={0.05}
          />
          <LinkSetting
            icon={<Key className="w-4 h-4" />}
            label="Encryption Protocol"
            value="AES-256"
            color="#a855f7"
            delay={0.1}
          />
        </div>
      </div>

      {/* Connection Section */}
      <div className="mb-6">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
          Connection
        </h2>
        <div className="bg-dark-700/40 rounded-2xl border border-dark-500/20 overflow-hidden">
          <ToggleSetting
            icon={<Zap className="w-4 h-4" />}
            label="Auto-Connect"
            description="Connect on app launch"
            enabled={autoConnect}
            onToggle={() => setAutoConnect(!autoConnect)}
            color="#ffd32a"
            delay={0.15}
          />
          <ToggleSetting
            icon={<Globe className="w-4 h-4" />}
            label="Split Tunneling"
            description="Choose which apps use VPN"
            enabled={splitTunnel}
            onToggle={() => setSplitTunnel(!splitTunnel)}
            color="#00ff87"
            delay={0.2}
          />
          <LinkSetting
            icon={<Cpu className="w-4 h-4" />}
            label="VPN Protocol"
            value="OpenVPN"
            color="#ff6b35"
            delay={0.25}
          />
          <LinkSetting
            icon={<FileText className="w-4 h-4" />}
            label="Import .ovpn Config"
            color="#00d4ff"
            delay={0.3}
          />
        </div>
      </div>

      {/* General Section */}
      <div className="mb-6">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
          General
        </h2>
        <div className="bg-dark-700/40 rounded-2xl border border-dark-500/20 overflow-hidden">
          <ToggleSetting
            icon={<Bell className="w-4 h-4" />}
            label="Notifications"
            description="Connection status alerts"
            enabled={notifications}
            onToggle={() => setNotifications(!notifications)}
            color="#00d4ff"
            delay={0.35}
          />
          <ToggleSetting
            icon={<Moon className="w-4 h-4" />}
            label="Dark Mode"
            description="Always enabled for VPN apps"
            enabled={darkMode}
            onToggle={() => setDarkMode(!darkMode)}
            color="#a855f7"
            delay={0.4}
          />
        </div>
      </div>

      {/* About Section */}
      <div className="mb-8">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
          About
        </h2>
        <div className="bg-dark-700/40 rounded-2xl border border-dark-500/20 overflow-hidden">
          <LinkSetting
            icon={<HelpCircle className="w-4 h-4" />}
            label="Help & Support"
            color="#ffd32a"
            delay={0.45}
          />
          <LinkSetting
            icon={<Info className="w-4 h-4" />}
            label="App Version"
            value="v2.1.0"
            color="#5a6590"
            delay={0.5}
          />
        </div>
      </div>
    </div>
  );
}
