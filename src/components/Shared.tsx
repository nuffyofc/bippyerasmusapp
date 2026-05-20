import { useState } from 'react';

// ============================================================
// QR CODE Component
// ============================================================
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

export function QRCode({ data, size = 120 }: { data: string; size?: number }) {
  const gridSize = 21;
  const cellSize = size / gridSize;
  const hash = hashString(data);
  
  const cells: { x: number; y: number; filled: boolean }[] = [];
  let h = hash;
  
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      let filled = false;
      // Finder patterns (top-left, top-right, bottom-left)
      if ((row < 7 && col < 7) || (row < 7 && col >= gridSize - 7) || (row >= gridSize - 7 && col < 7)) {
        const r = row < 7 ? row : row - (gridSize - 7);
        const c = col < 7 ? col : col - (gridSize - 7);
        if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
          filled = true;
        }
      } else if (row === gridSize - 8 && col === 8) {
        filled = true; // Dark module
      } else {
        h = ((h << 5) - h) + row * 31 + col * 17;
        h |= 0;
        filled = Math.abs(h % 3) === 0;
      }
      cells.push({ x: col, y: row, filled });
    }
  }
  
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">
      <rect width={size} height={size} fill="white" rx={4} />
      {cells.map((cell, i) => cell.filled ? (
        <rect key={i} x={cell.x * cellSize} y={cell.y * cellSize} width={cellSize} height={cellSize} fill="#1e1b4b" />
      ) : null)}
    </svg>
  );
}

// ============================================================
// BAR CHART Component
// ============================================================
export function BarChart({ data, height = 200 }: { data: { label: string; value: number; color: string }[]; height?: number }) {
  const max = Math.max(...data.map(d => d.value));
  
  return (
    <div className="flex items-end gap-2" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center flex-1 gap-1">
          <span className="text-xs font-medium text-slate-600">{d.value.toLocaleString()}</span>
          <div
            className="w-full rounded-t-md transition-all duration-500"
            style={{ 
              height: `${(d.value / max) * (height - 40)}px`,
              backgroundColor: d.color,
              minHeight: '4px'
            }}
          />
          <span className="text-[10px] text-slate-500 text-center leading-tight">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// DONUT CHART Component
// ============================================================
export function DonutChart({ segments, size = 140, strokeWidth = 24 }: { 
  segments: { value: number; color: string; label: string }[];
  size?: number;
  strokeWidth?: number;
}) {
  const total = segments.reduce((a, b) => a + b.value, 0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  
  return (
    <div className="flex items-center gap-4">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth={strokeWidth} />
        {segments.map((seg, i) => {
          const segLen = (seg.value / total) * circumference;
          const dashArray = `${segLen} ${circumference - segLen}`;
          const dashOffset = -offset;
          offset += segLen;
          return (
            <circle key={i} cx={size/2} cy={size/2} r={radius} fill="none" 
              stroke={seg.color} strokeWidth={strokeWidth}
              strokeDasharray={dashArray} strokeDashoffset={dashOffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${size/2} ${size/2})`}
            />
          );
        })}
        <text x={size/2} y={size/2 - 8} textAnchor="middle" className="text-lg font-bold fill-slate-800" fontSize="18">{total.toLocaleString()}</text>
        <text x={size/2} y={size/2 + 10} textAnchor="middle" className="text-xs fill-slate-500" fontSize="10">total</text>
      </svg>
      <div className="flex flex-col gap-1">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: seg.color }} />
            <span className="text-slate-600">{seg.label}: <strong>{seg.value}</strong></span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// METRIC CARD Component
// ============================================================
export function MetricCard({ title, value, change, icon, color = 'indigo' }: {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color?: string;
}) {
  const colorMap: Record<string, string> = {
    indigo: 'from-indigo-500 to-indigo-600',
    emerald: 'from-emerald-500 to-emerald-600',
    amber: 'from-amber-500 to-amber-600',
    rose: 'from-rose-500 to-rose-600',
    violet: 'from-violet-500 to-violet-600',
    sky: 'from-sky-500 to-sky-600',
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorMap[color] || colorMap.indigo} flex items-center justify-center text-white`}>
          {icon}
        </div>
        {change !== undefined && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${change >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-slate-800">{typeof value === 'number' ? value.toLocaleString() : value}</p>
      <p className="text-sm text-slate-500 mt-1">{title}</p>
    </div>
  );
}

// ============================================================
// STUDENT MAP Component (Simplified SVG)
// ============================================================
export function StudentMap({ cityId, showUsers = true }: { cityId: string; showUsers?: boolean }) {
  const hash = hashString(cityId);
  const roads: { x1: number; y1: number; x2: number; y2: number }[] = [];
  
  // Generate pseudo-random roads
  let h = hash;
  for (let i = 0; i < 8; i++) {
    h = ((h << 5) - h) + i * 37;
    h |= 0;
    roads.push({
      x1: 20 + Math.abs(h % 260),
      y1: 20 + Math.abs((h >> 4) % 180),
      x2: 20 + Math.abs((h >> 8) % 260),
      y2: 20 + Math.abs((h >> 12) % 180),
    });
  }
  
  // Generate user dots
  const dots: { cx: number; cy: number; label: string }[] = [];
  if (showUsers) {
    let dh = hash + 42;
    const names = ['🇸🇪', '🇮🇹', '🇪🇸', '🇩🇪', '🇵🇱', '🇫🇷', '🇯🇵', '🇬🇧'];
    for (let i = 0; i < 8; i++) {
      dh = ((dh << 5) - dh) + i * 23;
      dh |= 0;
      dots.push({
        cx: 30 + Math.abs(dh % 250),
        cy: 30 + Math.abs((dh >> 4) % 170),
        label: names[i % names.length],
      });
    }
  }
  
  return (
    <svg viewBox="0 0 300 200" className="w-full rounded-lg bg-gradient-to-br from-emerald-50 to-sky-50 border border-slate-200">
      {/* Water/river */}
      <path d={`M ${80 + (hash % 40)},0 Q ${100 + (hash % 60)},100 ${60 + (hash % 80)},200`} 
        fill="none" stroke="#93c5fd" strokeWidth="12" opacity="0.5" />
      {/* Roads */}
      {roads.map((r, i) => (
        <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
      ))}
      {/* Green areas */}
      <circle cx={220} cy={40} r={25} fill="#86efac" opacity="0.3" />
      <circle cx={60} cy={160} r={20} fill="#86efac" opacity="0.3" />
      {/* User dots */}
      {dots.map((d, i) => (
        <g key={i}>
          <circle cx={d.cx} cy={d.cy} r={12} fill="#6366f1" opacity="0.2" />
          <circle cx={d.cx} cy={d.cy} r={6} fill="#6366f1" />
          <text x={d.cx} y={d.cy + 2} textAnchor="middle" fontSize="7">{d.label}</text>
        </g>
      ))}
      {/* Geofence circle */}
      <circle cx={150} cy={100} r={60} fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
      <text x={150} y={168} textAnchor="middle" fontSize="8" fill="#d97706">Student Zone</text>
    </svg>
  );
}

// ============================================================
// TAB Component
// ============================================================
export function TabBar({ tabs, active, onChange }: {
  tabs: { id: string; label: string; icon?: React.ReactNode }[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex gap-1 bg-slate-100 p-1 rounded-lg overflow-x-auto">
      {tabs.map(tab => (
        <button key={tab.id} onClick={() => onChange(tab.id)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
            active === tab.id 
              ? 'bg-white text-indigo-700 shadow-sm' 
              : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// ============================================================
// STATUS BADGE Component
// ============================================================
export function StatusBadge({ status }: { status: 'active' | 'pending' | 'banned' | 'verified' | 'resolved' | 'dismissed' | 'free' | 'pro' | 'enterprise' }) {
  const styles: Record<string, string> = {
    active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    banned: 'bg-rose-50 text-rose-700 border-rose-200',
    verified: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    resolved: 'bg-slate-50 text-slate-700 border-slate-200',
    dismissed: 'bg-slate-50 text-slate-500 border-slate-200',
    free: 'bg-slate-50 text-slate-700 border-slate-200',
    pro: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    enterprise: 'bg-violet-50 text-violet-700 border-violet-200',
  };
  
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.pending}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

// ============================================================
// PROGRESS BAR Component
// ============================================================
export function ProgressBar({ value, max, color = 'indigo', showLabel = true }: {
  value: number;
  max: number;
  color?: string;
  showLabel?: boolean;
}) {
  const pct = Math.min((value / max) * 100, 100);
  const colorMap: Record<string, string> = {
    indigo: 'bg-indigo-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    violet: 'bg-violet-500',
    sky: 'bg-sky-500',
  };
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${colorMap[color]}`} style={{ width: `${pct}%` }} />
      </div>
      {showLabel && <span className="text-xs text-slate-500 w-12 text-right">{Math.round(pct)}%</span>}
    </div>
  );
}

// ============================================================
// MODAL Component
// ============================================================
export function Modal({ open, onClose, title, children }: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">✕</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ============================================================
// SEARCH INPUT Component
// ============================================================
export function SearchInput({ value, onChange, placeholder = 'Search...' }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all" />
    </div>
  );
}

// ============================================================
// LINE CHART (SVG) Component
// ============================================================
export function LineChart({ data, height = 160, color = '#6366f1' }: {
  data: number[];
  height?: number;
  color?: string;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 300;
  const padding = 10;
  const points = data.map((v, i) => ({
    x: padding + (i / (data.length - 1)) * (w - 2 * padding),
    y: padding + (1 - (v - min) / range) * (height - 2 * padding),
  }));
  
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ');
  const areaD = pathD + ` L ${points[points.length - 1].x},${height - padding} L ${points[0].x},${height - padding} Z`;
  
  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full" style={{ height }}>
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#grad-${color.replace('#', '')})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="white" stroke={color} strokeWidth="2" />
      ))}
    </svg>
  );
}

// ============================================================
// TYPING INDICATOR Component
// ============================================================
export function TypingIndicator() {
  const [dots] = useState('●●●');
  return (
    <div className="flex items-center gap-2 text-slate-400 text-sm">
      <div className="flex gap-0.5">
        {dots.split('').map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
      <span>Someone is typing...</span>
    </div>
  );
}
