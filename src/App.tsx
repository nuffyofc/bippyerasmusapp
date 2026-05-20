import { useState } from 'react';
import {
  Shield, Map, Tag, Users, Calendar, Crown, UserPlus,
  LayoutDashboard, FileText, AlertTriangle, DollarSign, Award,
  Menu, X, Sparkles, ChevronRight, BarChart3, Store, Eye
} from 'lucide-react';
import UserApp from './components/UserApp';
import AdminPanel from './components/AdminPanel';

type AppMode = 'user' | 'admin';

const userNavItems = [
  { id: 'auth', label: 'Verification Gate', icon: Shield, phase: 1 },
  { id: 'onboarding', label: 'Onboarding', icon: UserPlus, phase: 1 },
  { id: 'guide', label: 'City Guide', icon: Map, phase: 2 },
  { id: 'discounts', label: 'Discount Locker', icon: Tag, phase: 2 },
  { id: 'connect', label: 'Connect', icon: Users, phase: 3 },
  { id: 'events', label: 'Events', icon: Calendar, phase: 4 },
  { id: 'premium', label: 'Insider', icon: Crown, phase: 4 },
];

const adminNavItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, phase: 1 },
  { id: 'verification', label: 'Verification Queue', icon: Shield, phase: 1 },
  { id: 'users', label: 'User Management', icon: Users, phase: 1 },
  { id: 'cms', label: 'City CMS', icon: FileText, phase: 2 },
  { id: 'moderation', label: 'Moderation', icon: AlertTriangle, phase: 3 },
  { id: 'merchants', label: 'Merchants', icon: Store, phase: 4 },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, phase: 4 },
  { id: 'revenue', label: 'Revenue Ledger', icon: DollarSign, phase: 5 },
  { id: 'ambassadors', label: 'Ambassadors', icon: Award, phase: 5 },
];

const phaseColors: Record<number, string> = {
  1: 'bg-indigo-500',
  2: 'bg-violet-500',
  3: 'bg-emerald-500',
  4: 'bg-amber-500',
  5: 'bg-rose-500',
};

export default function App() {
  const [mode, setMode] = useState<AppMode>('user');
  const [userView, setUserView] = useState('auth');
  const [adminView, setAdminView] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = mode === 'user' ? userNavItems : adminNavItems;
  const currentView = mode === 'user' ? userView : adminView;
  const setCurrentView = mode === 'user' ? setUserView : setAdminView;

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserView('guide');
  };

  const handleModeSwitch = (newMode: AppMode) => {
    setMode(newMode);
    setMobileSidebarOpen(false);
  };

  const handleNavClick = (id: string) => {
    setCurrentView(id);
    setMobileSidebarOpen(false);
    // If clicking auth/onboarding when not logged in, handle accordingly
    if (mode === 'user' && (id === 'auth' || id === 'onboarding')) {
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-[Inter,system-ui,sans-serif]">
      {/* ==================== TOP BAR ==================== */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/80">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500">
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 flex items-center justify-center shadow-sm">
                <span className="text-sm font-black text-white">B</span>
              </div>
              <span className="text-lg font-black bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent hidden sm:block">BIPPY</span>
            </div>
          </div>

          {/* Mode switcher */}
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
            <button onClick={() => handleModeSwitch('user')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
                mode === 'user' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Student App</span>
            </button>
            <button onClick={() => handleModeSwitch('admin')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
                mode === 'admin' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}>
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Admin Panel</span>
            </button>
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-2">
            {mode === 'user' && isLoggedIn && (
              <div className="flex items-center gap-2 text-sm">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-violet-400 flex items-center justify-center text-xs">🇸🇪</div>
                <span className="hidden sm:block text-sm font-medium text-slate-700">Emma J.</span>
              </div>
            )}
            {mode === 'user' && !isLoggedIn && (
              <span className="text-xs text-slate-400">Not verified</span>
            )}
            {mode === 'admin' && (
              <span className="text-xs text-slate-400 hidden sm:block">Super Admin</span>
            )}
          </div>
        </div>
      </header>

      {/* ==================== SIDEBAR + CONTENT ==================== */}
      <div className="flex pt-14">
        {/* Sidebar overlay (mobile) */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setMobileSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <aside className={`fixed lg:sticky top-14 left-0 z-30 lg:z-10 w-64 h-[calc(100vh-3.5rem)] bg-white border-r border-slate-200 overflow-y-auto transition-transform duration-200 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${!sidebarOpen && !mobileSidebarOpen ? 'lg:w-16' : 'lg:w-64'}`}>
          
          {/* Collapse button (desktop) */}
          <div className="hidden lg:flex justify-end p-2">
            <button onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-7 h-7 rounded-md hover:bg-slate-100 flex items-center justify-center text-slate-400">
              <ChevronRight className={`w-4 h-4 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <nav className="px-2 pb-4">
            {mode === 'user' && (
              <div className="mb-3 px-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Build Phase Timeline</p>
              </div>
            )}

            {(() => {
              let lastPhase = 0;
              return navItems.map(item => {
                const showPhaseHeader = mode === 'user' && item.phase !== lastPhase;
                lastPhase = item.phase;
                const Icon = item.icon;
                const isActive = currentView === item.id;
                
                return (
                  <div key={item.id}>
                    {showPhaseHeader && sidebarOpen && (
                      <div className="px-2 py-2 flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${phaseColors[item.phase]}`} />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phase {item.phase}</span>
                      </div>
                    )}
                    <button onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-0.5 ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                      }`}>
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                      {(sidebarOpen || mobileSidebarOpen) && <span className="truncate">{item.label}</span>}
                      {isActive && (sidebarOpen || mobileSidebarOpen) && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      )}
                    </button>
                  </div>
                );
              });
            })()}

            {mode === 'admin' && sidebarOpen && (
              <>
                <div className="mt-4 px-2 py-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Quick Stats</p>
                </div>
                <div className="mx-2 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl p-3 border border-indigo-100">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div>
                      <p className="text-lg font-bold text-indigo-700">4.2K</p>
                      <p className="text-[10px] text-slate-500">Users</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-emerald-600">€19K</p>
                      <p className="text-[10px] text-slate-500">MTD Rev</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-violet-600">6</p>
                      <p className="text-[10px] text-slate-500">Cities</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-amber-600">8</p>
                      <p className="text-[10px] text-slate-500">Merchants</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </nav>
        </aside>

        {/* ==================== MAIN CONTENT ==================== */}
        <main className="flex-1 min-h-[calc(100vh-3.5rem)]">
          <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
              <span>Bippy</span>
              <ChevronRight className="w-3 h-3" />
              <span className="capitalize">{mode === 'user' ? 'Student App' : 'Admin Panel'}</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-600 font-medium">
                {navItems.find(n => n.id === currentView)?.label}
              </span>
            </div>

            {/* Content */}
            {mode === 'user' ? (
              <UserApp view={userView} isLoggedIn={isLoggedIn} onLogin={handleLogin} />
            ) : (
              <AdminPanel view={adminView} />
            )}
          </div>

          {/* Footer */}
          <footer className="border-t border-slate-200 mt-8">
            <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                    <span className="text-[10px] font-black text-white">B</span>
                  </div>
                  <span className="text-sm font-bold text-slate-700">Bippy</span>
                  <span className="text-xs text-slate-400">— Your City Cheat Code</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span>Build Plan v1.0</span>
                  <span>·</span>
                  <span>9 Phases</span>
                  <span>·</span>
                  <span>6 Cities</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { phase: 1, label: 'Foundation & Security', months: 'M1-M2' },
                    { phase: 2, label: 'City Guide & CMS', months: 'M3-M4' },
                    { phase: 3, label: 'Social & Geo-Engine', months: 'M5-M6' },
                    { phase: 4, label: 'B2B Marketplace', months: 'M7-M8' },
                    { phase: 5, label: 'Business View', months: 'M9' },
                  ].map(p => (
                    <div key={p.phase} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${phaseColors[p.phase]}`} />
                      <div>
                        <p className="text-[10px] font-medium text-slate-600">{p.label}</p>
                        <p className="text-[10px] text-slate-400">{p.months}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
