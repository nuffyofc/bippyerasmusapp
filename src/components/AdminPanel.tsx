import { useState } from 'react';
import {
  Users as UsersIcon, Shield, Check, X, FileText, AlertTriangle,
  DollarSign, Award, TrendingUp, Eye, Ban, ChevronDown,
  Edit, Plus, MapPin, BarChart3, Globe, Copy
} from 'lucide-react';
import { users, cities, merchants, ambassadors, revenueStreams, reportedContent } from '../data';
import {
  MetricCard, BarChart, DonutChart, StatusBadge, SearchInput,
  StudentMap, LineChart, ProgressBar
} from './Shared';

// ============================================================
// ADMIN DASHBOARD
// ============================================================
function AdminDashboard() {
  const weeklyActive = [120, 180, 250, 310, 380, 420, 480, 520, 590, 640, 710, 780];
  const cityDistribution = cities.map(c => ({ value: c.studentCount, color: ['#6366f1', '#8b5cf6', '#a855f7', '#c084fc', '#d8b4fe', '#e9d5ff'][cities.indexOf(c) % 6], label: c.name }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Dashboard Overview</h2>
        <p className="text-sm text-slate-500">Welcome back. Here's your platform at a glance.</p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Users" value={users.length} change={12.5} icon={<UsersIcon className="w-5 h-5" />} color="indigo" />
        <MetricCard title="Active Cities" value={cities.length} change={0} icon={<Globe className="w-5 h-5" />} color="emerald" />
        <MetricCard title="Premium Members" value={users.filter(u => u.premium).length} change={8.3} icon={<Award className="w-5 h-5" />} color="amber" />
        <MetricCard title="Pending Verifications" value={users.filter(u => u.status === 'pending').length} change={-15} icon={<Shield className="w-5 h-5" />} color="rose" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly growth chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-1">Weekly Active Users</h3>
          <p className="text-xs text-slate-500 mb-4">Last 12 weeks</p>
          <LineChart data={weeklyActive} height={180} color="#6366f1" />
        </div>

        {/* City distribution */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-1">Students by City</h3>
          <p className="text-xs text-slate-500 mb-4">Current distribution</p>
          <DonutChart segments={cityDistribution} size={160} strokeWidth={28} />
        </div>
      </div>

      {/* Revenue streams bar chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="font-semibold text-slate-800 mb-1">Revenue by Stream (MTD)</h3>
        <p className="text-xs text-slate-500 mb-4">Current month to date</p>
        <BarChart data={revenueStreams.map(r => ({
          label: r.name,
          value: r.mtd,
          color: ['#6366f1', '#8b5cf6', '#a855f7', '#f59e0b', '#ef4444'][revenueStreams.indexOf(r) % 5]
        }))} height={200} />
      </div>
    </div>
  );
}

// ============================================================
// VERIFICATION QUEUE
// ============================================================
function VerificationQueue() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const pendingUsers = users.filter(u => u.status === 'pending' || u.verificationMethod === 'document');
  const selected = users.find(u => u.id === selectedUser);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Verification Queue</h2>
        <p className="text-sm text-slate-500">Review and approve student document uploads</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Queue list */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <span className="font-semibold text-sm text-slate-800">{pendingUsers.length} Pending</span>
            <SearchInput value="" onChange={() => {}} placeholder="Filter queue..." />
          </div>
          {pendingUsers.map(user => (
            <button key={user.id} onClick={() => setSelectedUser(user.id)}
              className={`w-full p-4 text-left hover:bg-slate-50 transition-colors flex items-center gap-3 ${
                selectedUser === user.id ? 'bg-indigo-50' : ''
              }`}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-violet-400 flex items-center justify-center text-lg">
                {user.flag}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-slate-800 truncate">{user.name}</div>
                <div className="text-xs text-slate-500 truncate">{user.email}</div>
                <div className="flex items-center gap-2 mt-1">
                  <StatusBadge status={user.status} />
                  <span className="text-[10px] text-slate-400">{user.verificationMethod === 'document' ? '📄 Document' : '📧 Email'}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Document viewer */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200">
          {selected ? (
            <div>
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-800">{selected.name}</h3>
                  <p className="text-xs text-slate-500">{selected.email} · {selected.country}</p>
                </div>
                <StatusBadge status={selected.status} />
              </div>

              {/* Simulated document viewer */}
              <div className="p-6">
                <div className="bg-slate-50 rounded-lg p-8 text-center border-2 border-dashed border-slate-200 mb-4">
                  <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="font-medium text-slate-700">acceptance_letter_{selected.name.split(' ')[0].toLowerCase()}.pdf</p>
                  <p className="text-sm text-slate-500 mt-1">PDF · 245 KB · Uploaded {selected.joinedDate}</p>
                  <div className="mt-4 bg-white rounded-lg p-4 border border-slate-200 text-left max-w-md mx-auto">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong>Erasmus+ Acceptance Letter</strong><br /><br />
                      This confirms that <strong>{selected.name}</strong> has been accepted into the exchange programme at the University of {selected.city} for the academic year 2025/2026. Student ID: ERASM-{selected.id.toUpperCase()}-2025.<br /><br />
                      Programme: European Exchange Partnership<br />
                      Duration: September 2025 – June 2026<br />
                      Faculty: International Relations
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-semibold text-sm hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" /> Approve
                  </button>
                  <button className="flex-1 py-3 bg-rose-500 text-white rounded-xl font-semibold text-sm hover:bg-rose-600 transition-colors flex items-center justify-center gap-2">
                    <X className="w-4 h-4" /> Reject
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center">
              <Shield className="w-12 h-12 text-slate-200 mx-auto mb-3" />
              <p className="text-slate-500">Select a student to review their documents</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// USER MANAGEMENT MATRIX
// ============================================================
function UserManagement() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const filtered = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()) || u.city.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'all' || u.status === filterStatus;
    return matchesSearch && matchesStatus;
  });
  const selected = users.find(u => u.id === selectedUser);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">User Management</h2>
        <p className="text-sm text-slate-500">{users.length} registered users</p>
      </div>

      <div className="flex gap-3 items-center">
        <div className="flex-1">
          <SearchInput value={search} onChange={setSearch} placeholder="Search by name, email, or city..." />
        </div>
        <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
          {['all', 'active', 'pending', 'banned'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${
                filterStatus === s ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">City</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Verified</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Plan</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Joined</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(user => (
                <tr key={user.id} className={`border-b border-slate-50 hover:bg-slate-50/50 cursor-pointer transition-colors ${
                  selectedUser === user.id ? 'bg-indigo-50/50' : ''
                }`} onClick={() => setSelectedUser(user.id)}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-400 flex items-center justify-center text-sm">
                        {user.flag}
                      </div>
                      <div>
                        <div className="font-medium text-sm text-slate-800">{user.name}</div>
                        <div className="text-xs text-slate-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{user.flag} {user.city}</td>
                  <td className="px-4 py-3"><StatusBadge status={user.status} /></td>
                  <td className="px-4 py-3">
                    {user.verified ? (
                      <span className="text-emerald-500 flex items-center gap-1 text-sm"><Check className="w-4 h-4" /> Verified</span>
                    ) : (
                      <span className="text-amber-500 flex items-center gap-1 text-sm"><AlertTriangle className="w-4 h-4" /> Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {user.premium ? (
                      <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">⭐ Insider</span>
                    ) : (
                      <span className="text-xs text-slate-500">Free</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">{user.joinedDate}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="w-7 h-7 rounded-md hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="w-7 h-7 rounded-md hover:bg-rose-50 flex items-center justify-center text-slate-400 hover:text-rose-500">
                        <Ban className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-3">User Details: {selected.name}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div><p className="text-xs text-slate-500">Country</p><p className="text-sm font-medium text-slate-800">{selected.flag} {selected.country}</p></div>
            <div><p className="text-xs text-slate-500">City</p><p className="text-sm font-medium text-slate-800">{selected.city}</p></div>
            <div><p className="text-xs text-slate-500">Budget</p><p className="text-sm font-medium text-slate-800 capitalize">{selected.budgetTier}</p></div>
            <div><p className="text-xs text-slate-500">Verification</p><p className="text-sm font-medium text-slate-800 capitalize">{selected.verificationMethod}</p></div>
          </div>
          <div className="mt-3"><p className="text-xs text-slate-500">Bio</p><p className="text-sm text-slate-700">{selected.bio}</p></div>
          <div className="mt-3 flex gap-1 flex-wrap">
            {selected.hobbies.map(h => (
              <span key={h} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">{h}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// CITY CMS
// ============================================================
function CityCMS() {
  const [selectedCity, setSelectedCity] = useState('ljubljana');
  const [editingTip, setEditingTip] = useState<string | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);

  const city = cities.find(c => c.id === selectedCity)!;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">City Manager (CMS)</h2>
          <p className="text-sm text-slate-500">Manage city content, tips, and cheat codes</p>
        </div>
        <button onClick={() => setShowNewForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Tip
        </button>
      </div>

      {/* City selector */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {cities.map(c => (
          <button key={c.id} onClick={() => { setSelectedCity(c.id); setEditingTip(null); setShowNewForm(false); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              selectedCity === c.id ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}>
            <span>{c.flag}</span> {c.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tips list */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">{city.cheatCodes.length} Tips for {city.name}</h3>
            <span className="text-xs text-slate-500">Global schema active</span>
          </div>
          {city.cheatCodes.map(tip => (
            <div key={tip.id} className={`bg-white rounded-xl border p-4 transition-all ${
              editingTip === tip.id ? 'border-indigo-300 ring-2 ring-indigo-500/10' : 'border-slate-200'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full capitalize">{tip.category}</span>
                    {tip.pinned && <span className="text-xs font-medium bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full">📌 Pinned</span>}
                  </div>
                  <h4 className="font-semibold text-sm text-slate-800">{tip.title}</h4>
                  <p className="text-sm text-slate-600 mt-1 line-clamp-2">{tip.content}</p>
                </div>
                <div className="flex gap-1 ml-3 shrink-0">
                  <button onClick={() => { setEditingTip(tip.id); setShowNewForm(false); }}
                    className="w-8 h-8 rounded-lg hover:bg-indigo-50 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Editor panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 p-5 sticky top-4">
            <h3 className="font-semibold text-slate-800 mb-4">
              {showNewForm ? 'Create New Tip' : editingTip ? 'Edit Tip' : 'Tip Editor'}
            </h3>
            {editingTip || showNewForm ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1 block">Title</label>
                  <input type="text" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
                    defaultValue={showNewForm ? '' : city.cheatCodes.find(t => t.id === editingTip)?.title} />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1 block">Category</label>
                  <div className="relative">
                    <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 appearance-none"
                      defaultValue={showNewForm ? 'transport' : city.cheatCodes.find(t => t.id === editingTip)?.category}>
                      <option value="accommodation">🏠 Accommodation</option>
                      <option value="transport">🚌 Transport</option>
                      <option value="social">👥 Social</option>
                      <option value="freetime">☕ Free Time</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1 block">Content</label>
                  <textarea rows={4} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
                    defaultValue={showNewForm ? '' : city.cheatCodes.find(t => t.id === editingTip)?.content} />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="pinned" defaultChecked={showNewForm ? false : city.cheatCodes.find(t => t.id === editingTip)?.pinned || false}
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  <label htmlFor="pinned" className="text-sm text-slate-600">Pin to top</label>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                    {showNewForm ? 'Create' : 'Save Changes'}
                  </button>
                  <button onClick={() => { setEditingTip(null); setShowNewForm(false); }}
                    className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <Edit className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                <p className="text-sm text-slate-400">Select a tip to edit or create a new one</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MODERATION CONSOLE
// ============================================================
function ModerationConsole() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? reportedContent : reportedContent.filter(r => r.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Community Moderation</h2>
        <p className="text-sm text-slate-500">Review reported content and manage community safety</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard title="Pending Reports" value={reportedContent.filter(r => r.status === 'pending').length} icon={<AlertTriangle className="w-5 h-5" />} color="amber" />
        <MetricCard title="Resolved Today" value={2} icon={<Check className="w-5 h-5" />} color="emerald" />
        <MetricCard title="Active Bans" value={users.filter(u => u.status === 'banned').length} icon={<Ban className="w-5 h-5" />} color="rose" />
      </div>

      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
        {['all', 'pending', 'resolved', 'dismissed'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${
              filter === s ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'
            }`}>
            {s}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(report => (
          <div key={report.id} className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${
                    report.reason === 'Harassment' ? 'bg-rose-50 text-rose-600' :
                    report.reason === 'Spam' ? 'bg-amber-50 text-amber-600' :
                    report.reason === 'Scam' ? 'bg-red-50 text-red-600' :
                    'bg-violet-50 text-violet-600'
                  }`}>{report.reason}</span>
                  <StatusBadge status={report.status} />
                  <span className="text-xs text-slate-400">{report.timestamp}</span>
                </div>
                <div className="mb-2">
                  <span className="text-xs text-slate-500">Reporter: <strong className="text-slate-700">{report.reporterName}</strong></span>
                  <span className="text-xs text-slate-400 mx-2">→</span>
                  <span className="text-xs text-slate-500">Target: <strong className="text-slate-700">{report.targetName}</strong></span>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                  <p className="text-sm text-slate-700">"{report.message}"</p>
                </div>
              </div>
              {report.status === 'pending' && (
                <div className="flex flex-col gap-2 ml-4 shrink-0">
                  <button className="px-3 py-1.5 bg-rose-500 text-white rounded-lg text-xs font-medium hover:bg-rose-600 transition-colors flex items-center gap-1">
                    <Ban className="w-3 h-3" /> Ban User
                  </button>
                  <button className="px-3 py-1.5 bg-amber-500 text-white rounded-lg text-xs font-medium hover:bg-amber-600 transition-colors flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Warn
                  </button>
                  <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-1">
                    <X className="w-3 h-3" /> Dismiss
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// MERCHANT / B2B DASHBOARD
// ============================================================
function MerchantDashboard() {
  const [selectedMerchant, setSelectedMerchant] = useState<string | null>(null);
  const selected = merchants.find(m => m.id === selectedMerchant);

  const totalImpressions = merchants.reduce((a, m) => a + m.impressions, 0);
  const totalClicks = merchants.reduce((a, m) => a + m.clicks, 0);
  const totalConversions = merchants.reduce((a, m) => a + m.conversions, 0);
  const totalRevenue = merchants.reduce((a, m) => a + m.revenue, 0);

  const clicksData = merchants.slice(0, 6).map(m => ({
    label: m.name.split(' ')[0],
    value: m.clicks,
    color: ['#6366f1', '#8b5cf6', '#a855f7', '#f59e0b', '#10b981', '#ef4444'][merchants.indexOf(m) % 6]
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Merchant Dashboard</h2>
        <p className="text-sm text-slate-500">B2B partner management and analytics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Impressions" value={totalImpressions} change={18.2} icon={<Eye className="w-5 h-5" />} color="indigo" />
        <MetricCard title="Total Clicks" value={totalClicks} change={12.5} icon={<BarChart3 className="w-5 h-5" />} color="violet" />
        <MetricCard title="Conversions" value={totalConversions} change={9.1} icon={<TrendingUp className="w-5 h-5" />} color="emerald" />
        <MetricCard title="Revenue" value={`€${totalRevenue.toLocaleString()}`} change={22.3} icon={<DollarSign className="w-5 h-5" />} color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Click chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-1">Clicks by Merchant</h3>
          <p className="text-xs text-slate-500 mb-4">Last 30 days</p>
          <BarChart data={clicksData} height={200} />
        </div>

        {/* Offer creator */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Quick Offer Creator</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">Offer Title</label>
              <input type="text" placeholder="e.g. 20% Off Dinner"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">Discount</label>
              <input type="text" placeholder="e.g. 20%"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">Valid Until</label>
              <input type="date"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">Target City</label>
              <div className="relative">
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none appearance-none">
                  {cities.map(c => <option key={c.id}>{c.name}</option>)}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <button className="w-full py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Create Offer
            </button>
          </div>
        </div>
      </div>

      {/* Merchant list */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-800">All Merchants</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Merchant</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Plan</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Offers</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Impressions</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">CTR</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Conversions</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {merchants.map(m => (
                <tr key={m.id} className="border-b border-slate-50 hover:bg-slate-50/50 cursor-pointer" onClick={() => setSelectedMerchant(m.id)}>
                  <td className="px-4 py-3">
                    <div><div className="font-medium text-sm text-slate-800">{m.name}</div><div className="text-xs text-slate-500">{m.category} · {m.city}</div></div>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={m.plan} /></td>
                  <td className="px-4 py-3 text-sm text-slate-600">{m.offersActive}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{m.impressions.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{((m.clicks / m.impressions) * 100).toFixed(1)}%</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{m.conversions}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-slate-800">€{m.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-4">{selected.name} — Foot-Traffic Analytics</h3>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div><p className="text-xs text-slate-500">Impressions</p><p className="text-lg font-bold text-slate-800">{selected.impressions.toLocaleString()}</p></div>
            <div><p className="text-xs text-slate-500">Clicks</p><p className="text-lg font-bold text-slate-800">{selected.clicks.toLocaleString()}</p></div>
            <div><p className="text-xs text-slate-500">QR Scans</p><p className="text-lg font-bold text-slate-800">{selected.conversions}</p></div>
            <div><p className="text-xs text-slate-500">Revenue</p><p className="text-lg font-bold text-emerald-600">€{selected.revenue.toLocaleString()}</p></div>
          </div>
          <LineChart data={[selected.impressions * 0.7, selected.impressions * 0.8, selected.impressions * 0.6, selected.impressions * 0.9, selected.impressions * 0.85, selected.impressions]} height={120} color="#6366f1" />
        </div>
      )}
    </div>
  );
}

// ============================================================
// ANALYTICS PLATFORM
// ============================================================
function AnalyticsPlatform() {
  const engagementData = [45, 52, 58, 62, 70, 75, 68, 82, 88, 92, 95, 98];
  const categoryData = [
    { value: 3200, color: '#6366f1', label: 'Transport' },
    { value: 2800, color: '#8b5cf6', label: 'Accommodation' },
    { value: 4500, color: '#a855f7', label: 'Social' },
    { value: 2100, color: '#f59e0b', label: 'Free Time' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Analytics Platform</h2>
        <p className="text-sm text-slate-500">Platform-wide engagement and performance metrics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Daily Active Users" value={847} change={14.2} icon={<UsersIcon className="w-5 h-5" />} color="indigo" />
        <MetricCard title="Avg. Session Duration" value="12m 34s" change={5.8} icon={<BarChart3 className="w-5 h-5" />} color="violet" />
        <MetricCard title="Tips Read Today" value={3421} change={18.5} icon={<FileText className="w-5 h-5" />} color="emerald" />
        <MetricCard title="QR Codes Scanned" value={156} change={22.1} icon={<MapPin className="w-5 h-5" />} color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-1">User Engagement Trend</h3>
          <p className="text-xs text-slate-500 mb-4">Daily engagement score (30 days)</p>
          <LineChart data={engagementData} height={200} color="#6366f1" />
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-1">Content Category Views</h3>
          <p className="text-xs text-slate-500 mb-4">Breakdown by section</p>
          <DonutChart segments={categoryData} size={160} strokeWidth={28} />
        </div>
      </div>

      {/* City performance */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="font-semibold text-slate-800 mb-4">City Performance Matrix</h3>
        <div className="grid gap-4">
          {cities.map(city => (
            <div key={city.id} className="flex items-center gap-4">
              <div className="w-24 flex items-center gap-2">
                <span>{city.flag}</span>
                <span className="text-sm font-medium text-slate-800">{city.name}</span>
              </div>
              <div className="flex-1">
                <ProgressBar value={city.studentCount} max={1500} color={
                  ['indigo', 'violet', 'emerald', 'amber', 'sky', 'rose'][cities.indexOf(city) % 6]
                } showLabel={false} />
              </div>
              <span className="text-sm font-semibold text-slate-800 w-16 text-right">{city.studentCount}</span>
              <span className="text-xs text-slate-500 w-16">students</span>
            </div>
          ))}
        </div>
      </div>

      {/* Geo-fencing configurator */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="font-semibold text-slate-800 mb-1">Geo-Fencing Configurator</h3>
        <p className="text-xs text-slate-500 mb-4">Define student zones and partner venue boundaries</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cities.slice(0, 4).map(city => (
            <div key={city.id}>
              <p className="text-sm font-medium text-slate-700 mb-2">{city.flag} {city.name}</p>
              <StudentMap cityId={city.id} showUsers={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// REVENUE LEDGER
// ============================================================
function RevenueLedger() {
  const totalMTD = revenueStreams.reduce((a, r) => a + r.mtd, 0);
  const totalTarget = revenueStreams.reduce((a, r) => a + r.target, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Executive Revenue Ledger</h2>
        <p className="text-sm text-slate-500">Consolidated financial overview — all revenue streams</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard title="Total MTD Revenue" value={`€${totalMTD.toLocaleString()}`} change={13.2} icon={<DollarSign className="w-5 h-5" />} color="emerald" />
        <MetricCard title="Monthly Target" value={`€${totalTarget.toLocaleString()}`} icon={<TrendingUp className="w-5 h-5" />} color="indigo" />
        <MetricCard title="Target Achievement" value={`${((totalMTD / totalTarget) * 100).toFixed(1)}%`} change={3.8} icon={<BarChart3 className="w-5 h-5" />} color="amber" />
      </div>

      {/* Revenue streams table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-emerald-500" />
          <h3 className="font-semibold text-slate-800">Revenue Streams — Month to Date</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Stream</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Data Source</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">MTD Revenue</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Target</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Progress</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Growth</th>
              </tr>
            </thead>
            <tbody>
              {revenueStreams.map(stream => (
                <tr key={stream.name} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <span className="font-semibold text-sm text-slate-800">{stream.name}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">{stream.source}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-slate-800">€{stream.mtd.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-slate-500">€{stream.target.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <ProgressBar value={stream.mtd} max={stream.target} color={
                        stream.mtd / stream.target > 0.9 ? 'emerald' : stream.mtd / stream.target > 0.7 ? 'amber' : 'rose'
                      } showLabel={false} />
                      <span className="text-xs text-slate-500 w-10">{Math.round((stream.mtd / stream.target) * 100)}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-medium ${stream.growth >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {stream.growth >= 0 ? '↑' : '↓'} {stream.growth}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50 font-semibold">
                <td className="px-4 py-3 text-sm" colSpan={2}>Total</td>
                <td className="px-4 py-3 text-sm text-emerald-700">€{totalMTD.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-slate-600">€{totalTarget.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <ProgressBar value={totalMTD} max={totalTarget} color="indigo" />
                </td>
                <td className="px-4 py-3 text-sm text-emerald-600">↑ 12.8%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Revenue chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="font-semibold text-slate-800 mb-1">Revenue Trend (6 Months)</h3>
        <p className="text-xs text-slate-500 mb-4">Monthly revenue across all streams</p>
        <LineChart data={[12500, 15200, 16800, 18400, 19200, totalMTD]} height={200} color="#10b981" />
      </div>

      {/* University portal */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-slate-800">University Portal</h3>
            <p className="text-xs text-slate-500">Welcome Pack Link Builder & Cohort Health</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-slate-800 mb-2">🔗 Welcome Pack Link Builder</h4>
            <div className="space-y-2">
              <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm">
                <option>University of Ljubljana</option>
                <option>Charles University Prague</option>
                <option>University of Barcelona</option>
                <option>HU Berlin</option>
              </select>
              <div className="flex gap-2">
                <div className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-600 truncate">
                  bippy.app/join/ULJU-2025-FALL
                </div>
                <button className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-xs hover:bg-indigo-700 transition-colors flex items-center gap-1">
                  <Copy className="w-3 h-3" /> Copy
                </button>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-slate-800 mb-2">📊 Anonymized Cohort Health</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Engagement Score</span>
                <span className="font-semibold text-emerald-600">87%</span>
              </div>
              <ProgressBar value={87} max={100} color="emerald" showLabel={false} />
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Integration Index</span>
                <span className="font-semibold text-indigo-600">72%</span>
              </div>
              <ProgressBar value={72} max={100} color="indigo" showLabel={false} />
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Satisfaction Vector</span>
                <span className="font-semibold text-amber-600">91%</span>
              </div>
              <ProgressBar value={91} max={100} color="amber" showLabel={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// AMBASSADOR METRICS
// ============================================================
function AmbassadorMetrics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Ambassador Performance</h2>
        <p className="text-sm text-slate-500">Track content creation, engagement, and satisfaction metrics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard title="Total Ambassadors" value={ambassadors.length} icon={<Award className="w-5 h-5" />} color="indigo" />
        <MetricCard title="Tips Created" value={ambassadors.reduce((a, b) => a + b.tipsCreated, 0)} icon={<FileText className="w-5 h-5" />} color="emerald" />
        <MetricCard title="Avg Satisfaction" value={`${(ambassadors.reduce((a, b) => a + b.satisfaction, 0) / ambassadors.length).toFixed(1)}/5`} icon={<TrendingUp className="w-5 h-5" />} color="amber" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ambassadors.map(amb => (
          <div key={amb.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-violet-400 flex items-center justify-center text-xl">
                {amb.avatar}
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">{amb.name}</h4>
                <p className="text-xs text-slate-500">{amb.city} Ambassador</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-slate-50 rounded-lg p-2.5 text-center">
                <p className="text-lg font-bold text-indigo-600">{amb.tipsCreated}</p>
                <p className="text-[10px] text-slate-500">Tips Created</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-2.5 text-center">
                <p className="text-lg font-bold text-emerald-600">{amb.activeStudents}</p>
                <p className="text-[10px] text-slate-500">Students</p>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-600">Satisfaction</span>
                  <span className="font-medium text-slate-800">{amb.satisfaction}/5</span>
                </div>
                <ProgressBar value={amb.satisfaction} max={5} color="emerald" showLabel={false} />
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-600">Content Score</span>
                  <span className="font-medium text-slate-800">{amb.contentScore}/100</span>
                </div>
                <ProgressBar value={amb.contentScore} max={100} color="indigo" showLabel={false} />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 py-2 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                View Profile
              </button>
              <button className="flex-1 py-2 text-xs font-medium text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                Activity Log
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// ADMIN PANEL - Main Router
// ============================================================
export default function AdminPanel({ view }: { view: string }) {
  switch (view) {
    case 'dashboard': return <AdminDashboard />;
    case 'verification': return <VerificationQueue />;
    case 'users': return <UserManagement />;
    case 'cms': return <CityCMS />;
    case 'moderation': return <ModerationConsole />;
    case 'merchants': return <MerchantDashboard />;
    case 'analytics': return <AnalyticsPlatform />;
    case 'revenue': return <RevenueLedger />;
    case 'ambassadors': return <AmbassadorMetrics />;
    default: return <AdminDashboard />;
  }
}
