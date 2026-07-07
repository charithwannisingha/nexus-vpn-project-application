import { useVpn } from '../context/VpnContext';

export default function GlobeVisualization() {
  const { status } = useVpn();
  const isConnected = status === 'connected';
  const isConnecting = status === 'connecting';

  const color = isConnected ? '#00ff87' : isConnecting ? '#ff6b35' : '#3a4570';
  const opacity = isConnected ? 0.15 : isConnecting ? 0.12 : 0.06;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Radial gradient background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
        }}
      />

      {/* Grid lines - horizontal */}
      <svg
        className="absolute inset-0 w-full h-full transition-opacity duration-1000"
        style={{ opacity: isConnected ? 0.08 : 0.03 }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={`${(i + 1) * 5}%`}
            x2="100%"
            y2={`${(i + 1) * 5}%`}
            stroke={color}
            strokeWidth="0.5"
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={`${(i + 1) * 5}%`}
            y1="0"
            x2={`${(i + 1) * 5}%`}
            y2="100%"
            stroke={color}
            strokeWidth="0.5"
          />
        ))}
      </svg>

      {/* Floating particles */}
      {isConnected && (
        <div className="absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-neon-green/40"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                animation: `float ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
