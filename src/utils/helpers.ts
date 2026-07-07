export function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function formatSpeed(mbps: number): string {
  if (mbps >= 1000) {
    return `${(mbps / 1000).toFixed(1)} GB/s`;
  }
  return `${mbps.toFixed(1)} MB/s`;
}

export function formatData(mb: number): string {
  if (mb >= 1024) {
    return `${(mb / 1024).toFixed(2)} GB`;
  }
  return `${mb.toFixed(1)} MB`;
}

export function getPingColor(ping: number): string {
  if (ping < 30) return '#00ff87';
  if (ping < 60) return '#ffd32a';
  if (ping < 100) return '#ff6b35';
  return '#ff4757';
}

export function getPingLabel(ping: number): string {
  if (ping < 30) return 'Excellent';
  if (ping < 60) return 'Good';
  if (ping < 100) return 'Fair';
  return 'Poor';
}

export function getLoadColor(load: number): string {
  if (load < 40) return '#00ff87';
  if (load < 70) return '#ffd32a';
  return '#ff4757';
}
