export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface VpnServer {
  id: string;
  country: string;
  city: string;
  flag: string;
  ip: string;
  ping: number;
  load: number; // percentage 0-100
  premium: boolean;
  protocol: string;
  region: string;
}

export interface ConnectionStats {
  downloadSpeed: number; // MB/s
  uploadSpeed: number;   // MB/s
  totalDownload: number; // MB
  totalUpload: number;   // MB
  connectedTime: number; // seconds
  ipAddress: string;
}

export interface VpnConfig {
  configData: string;
  serverAddress: string;
  port: number;
  protocol: 'UDP' | 'TCP';
}
