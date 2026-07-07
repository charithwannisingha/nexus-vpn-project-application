import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { ConnectionStatus, VpnServer, ConnectionStats } from '../types';
import { servers } from '../data/servers';

interface VpnState {
  status: ConnectionStatus;
  selectedServer: VpnServer;
  stats: ConnectionStats;
  servers: VpnServer[];
}

interface VpnContextType extends VpnState {
  connect: () => void;
  disconnect: () => void;
  selectServer: (server: VpnServer) => void;
  toggleConnection: () => void;
}

const defaultStats: ConnectionStats = {
  downloadSpeed: 0,
  uploadSpeed: 0,
  totalDownload: 0,
  totalUpload: 0,
  connectedTime: 0,
  ipAddress: '---',
};

const VpnContext = createContext<VpnContextType | null>(null);

export function VpnProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [selectedServer, setSelectedServer] = useState<VpnServer>(servers[0]);
  const [stats, setStats] = useState<ConnectionStats>(defaultStats);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const statsRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (statsRef.current) {
      clearInterval(statsRef.current);
      statsRef.current = null;
    }
  }, []);

  const startStatsSimulation = useCallback(() => {
    // Simulate connection stats
    const baseDown = 25 + Math.random() * 60;
    const baseUp = 8 + Math.random() * 25;

    setStats({
      downloadSpeed: baseDown,
      uploadSpeed: baseUp,
      totalDownload: 0,
      totalUpload: 0,
      connectedTime: 0,
      ipAddress: selectedServer.ip,
    });

    statsRef.current = setInterval(() => {
      setStats(prev => {
        const dlFluctuation = (Math.random() - 0.5) * 10;
        const ulFluctuation = (Math.random() - 0.5) * 4;
        const newDl = Math.max(5, prev.downloadSpeed + dlFluctuation);
        const newUl = Math.max(1, prev.uploadSpeed + ulFluctuation);
        return {
          downloadSpeed: newDl,
          uploadSpeed: newUl,
          totalDownload: prev.totalDownload + newDl / 10,
          totalUpload: prev.totalUpload + newUl / 10,
          connectedTime: prev.connectedTime + 1,
          ipAddress: prev.ipAddress,
        };
      });
    }, 1000);
  }, [selectedServer]);

  const connect = useCallback(() => {
    setStatus('connecting');
    clearTimers();

    // Simulate connection delay
    const connectTime = 1500 + Math.random() * 2000;
    timerRef.current = setTimeout(() => {
      // Small chance of error for realism
      if (Math.random() < 0.05) {
        setStatus('error');
        setTimeout(() => setStatus('disconnected'), 3000);
      } else {
        setStatus('connected');
        startStatsSimulation();
      }
    }, connectTime) as unknown as ReturnType<typeof setInterval>;
  }, [clearTimers, startStatsSimulation]);

  const disconnect = useCallback(() => {
    clearTimers();
    setStatus('disconnected');
    setStats(defaultStats);
  }, [clearTimers]);

  const toggleConnection = useCallback(() => {
    if (status === 'connected' || status === 'connecting') {
      disconnect();
    } else {
      connect();
    }
  }, [status, connect, disconnect]);

  const selectServer = useCallback((server: VpnServer) => {
    const wasConnected = status === 'connected';
    if (wasConnected) {
      disconnect();
    }
    setSelectedServer(server);
    if (wasConnected) {
      // Auto-reconnect after a brief pause
      setTimeout(() => connect(), 300);
    }
  }, [status, disconnect, connect]);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  return (
    <VpnContext.Provider
      value={{
        status,
        selectedServer,
        stats,
        servers,
        connect,
        disconnect,
        selectServer,
        toggleConnection,
      }}
    >
      {children}
    </VpnContext.Provider>
  );
}

export function useVpn() {
  const context = useContext(VpnContext);
  if (!context) {
    throw new Error('useVpn must be used within a VpnProvider');
  }
  return context;
}
