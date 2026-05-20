import { useState } from 'react';
import {
  Shield, Mail, Upload, Check, ChevronRight, MapPin, Home, Bus, Users as UsersIcon,
  Coffee, Star, Crown, Eye, EyeOff, Send, Calendar, Ticket, ExternalLink,
  Lock, AlertCircle, Sparkles, Heart, MessageSquare
} from 'lucide-react';
import {
  cities, discounts, events, chatMessages, channelList, hobbyOptions, budgetTiers,
} from '../data';
import { QRCode, TabBar, StudentMap, TypingIndicator } from './Shared';

// ============================================================
// AUTH GATE - Verification Screen
// ============================================================
function AuthGate({ onVerified }: { onVerified: () => void }) {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'email' | 'code' | 'upload' | 'success'>('email');
  const [codeDigits, setCodeDigits] = useState(['', '', '', '', '', '']);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleSendCode = () => {
    if (email.includes('@')) setStep('code');
  };

  const handleVerifyCode = () => {
    const fullCode = codeDigits.join('');
    if (fullCode.length === 6) {
      setStep('success');
      setTimeout(onVerified, 1500);
    }
  };

  const handleUpload = () => {
    setUploadedFile('acceptance_letter_bippy.pdf');
    setTimeout(onVerified, 1500);
  };

  return (
    <div className="min-h-full flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
            <span className="text-3xl font-black text-white">B</span>
          </div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">BIPPY</h1>
          <p className="text-slate-500 mt-1">Your City Cheat Code 🗺️</p>
        </div>

        {step === 'email' && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 animate-[fadeIn_0.3s_ease]">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-5 h-5 text-indigo-500" />
              <h2 className="text-lg font-bold text-slate-800">Student Verification</h2>
            </div>
            <p className="text-sm text-slate-500 mb-6">Bippy is a vetted community. Verify your student status to access the platform.</p>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Path A: University Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="your.name@university.edu"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400" />
                </div>
              </div>
              <button onClick={handleSendCode} disabled={!email.includes('@')}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-indigo-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                Send Verification Code
              </button>

              <div className="flex items-center gap-3 my-2">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-xs text-slate-400">OR</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Path B: Upload Document</label>
                <button onClick={() => setStep('upload')}
                  className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-sm text-slate-600 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Acceptance Letter (PDF/Image)
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'code' && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 animate-[fadeIn_0.3s_ease]">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-indigo-500" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">Check Your Email</h2>
              <p className="text-sm text-slate-500 mt-1">We sent a 6-digit code to <strong>{email}</strong></p>
            </div>
            <div className="flex gap-2 justify-center mb-6">
              {codeDigits.map((d, i) => (
                <input key={i} type="text" maxLength={1} value={d}
                  onChange={e => {
                    const newDigits = [...codeDigits];
                    newDigits[i] = e.target.value;
                    setCodeDigits(newDigits);
                    setCode(newDigits.join(''));
                    if (e.target.value && i < 5) {
                      const next = e.target.parentElement?.querySelectorAll('input')[i + 1] as HTMLInputElement;
                      next?.focus();
                    }
                  }}
                  className="w-12 h-14 text-center text-xl font-bold border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400" />
              ))}
            </div>
            <button onClick={handleVerifyCode} disabled={code.length < 6}
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-indigo-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              Verify & Enter
            </button>
            <button onClick={() => setStep('email')} className="w-full mt-3 py-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors">
              ← Back to email entry
            </button>
          </div>
        )}

        {step === 'upload' && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 animate-[fadeIn_0.3s_ease]">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-3">
                <Upload className="w-6 h-6 text-amber-500" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">Upload Document</h2>
              <p className="text-sm text-slate-500 mt-1">Upload your BIP acceptance letter for manual review</p>
            </div>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center mb-4 cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/30 transition-all"
              onClick={handleUpload}>
              {uploadedFile ? (
                <div className="space-y-2">
                  <Check className="w-8 h-8 text-emerald-500 mx-auto" />
                  <p className="text-sm font-medium text-emerald-600">{uploadedFile}</p>
                  <p className="text-xs text-slate-500">Submitted for review</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-sm text-slate-500">Click to upload PDF or Image</p>
                </div>
              )}
            </div>
            <button onClick={handleUpload}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2">
              Submit for Review
            </button>
            <p className="text-xs text-slate-400 text-center mt-3">
              <AlertCircle className="w-3 h-3 inline mr-1" />
              Manual review typically takes 24-48 hours
            </p>
          </div>
        )}

        {step === 'success' && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center animate-[fadeIn_0.3s_ease]">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-emerald-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Verified! ✨</h2>
            <p className="text-slate-500">Welcome to the Bippy community. Loading your city guide...</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// ONBOARDING PROFILER
// ============================================================
export function OnboardingProfiler({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [accommodation, setAccommodation] = useState('');

  const steps = ['City', 'Budget', 'Hobbies', 'Housing'];

  const toggleHobby = (h: string) => {
    setSelectedHobbies(prev => prev.includes(h) ? prev.filter(x => x !== h) : [...prev, h]);
  };

  return (
    <div className="min-h-full flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-6">
          {steps.map((_, i) => (
            <div key={i} className="flex-1 flex items-center gap-2">
              <div className={`flex-1 h-1.5 rounded-full transition-all ${i <= step ? 'bg-indigo-500' : 'bg-slate-200'}`} />
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 mb-1 text-center">Step {step + 1} of 4</p>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          {step === 0 && (
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">Where are you headed? 🌍</h2>
              <p className="text-sm text-slate-500 mb-4">Select your arrival city</p>
              <div className="grid grid-cols-2 gap-3">
                {cities.map(city => (
                  <button key={city.id} onClick={() => setSelectedCity(city.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedCity === city.id ? 'border-indigo-400 bg-indigo-50' : 'border-slate-100 hover:border-slate-200'
                    }`}>
                    <div className="text-2xl mb-1">{city.flag}</div>
                    <div className="font-semibold text-sm text-slate-800">{city.name}</div>
                    <div className="text-xs text-slate-500">{city.country} · {city.studentCount} students</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">What's your budget tier? 💰</h2>
              <p className="text-sm text-slate-500 mb-4">This helps us tailor recommendations</p>
              <div className="space-y-3">
                {budgetTiers.map(tier => (
                  <button key={tier.id} onClick={() => setSelectedBudget(tier.id)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      selectedBudget === tier.id ? 'border-indigo-400 bg-indigo-50' : 'border-slate-100 hover:border-slate-200'
                    }`}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{tier.icon}</span>
                      <div>
                        <div className="font-semibold text-sm text-slate-800">{tier.label} · {tier.range}</div>
                        <div className="text-xs text-slate-500">{tier.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">Pick your interests 🎯</h2>
              <p className="text-sm text-slate-500 mb-4">Select at least 3 to personalize your feed</p>
              <div className="flex flex-wrap gap-2">
                {hobbyOptions.map(hobby => (
                  <button key={hobby} onClick={() => toggleHobby(hobby)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedHobbies.includes(hobby) ? 'bg-indigo-100 text-indigo-700 border border-indigo-300' : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}>
                    {selectedHobbies.includes(hobby) ? '✓ ' : ''}{hobby}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-3">{selectedHobbies.length} selected</p>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">Accommodation status 🏠</h2>
              <p className="text-sm text-slate-500 mb-4">Have you sorted housing yet?</p>
              <div className="space-y-3">
                {[
                  { id: 'sorted', label: 'Already sorted! ✅', desc: 'I have my accommodation lined up' },
                  { id: 'looking', label: 'Still looking 🔍', desc: 'Help me find housing options' },
                  { id: 'dorm', label: 'University dormitory 🏛️', desc: 'Applying through the university' },
                ].map(opt => (
                  <button key={opt.id} onClick={() => setAccommodation(opt.id)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      accommodation === opt.id ? 'border-indigo-400 bg-indigo-50' : 'border-slate-100 hover:border-slate-200'
                    }`}>
                    <div className="font-semibold text-sm text-slate-800">{opt.label}</div>
                    <div className="text-xs text-slate-500">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            {step > 0 && (
              <button onClick={() => setStep(step - 1)}
                className="flex-1 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
                Back
              </button>
            )}
            <button onClick={() => {
              if (step < 3) setStep(step + 1);
              else onComplete();
            }} className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-indigo-200 transition-all flex items-center justify-center gap-2">
              {step === 3 ? 'Launch Bippy 🚀' : 'Continue'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CITY GUIDE - The Big Four
// ============================================================
export function CityGuide() {
  const [selectedCity, setSelectedCity] = useState('ljubljana');
  const [activeTab, setActiveTab] = useState('all');
  const [isPremium] = useState(true);

  const city = cities.find(c => c.id === selectedCity)!;
  const tabs = [
    { id: 'all', label: 'All Tips', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'accommodation', label: 'Stay', icon: <Home className="w-3.5 h-3.5" /> },
    { id: 'transport', label: 'Move', icon: <Bus className="w-3.5 h-3.5" /> },
    { id: 'social', label: 'Social', icon: <UsersIcon className="w-3.5 h-3.5" /> },
    { id: 'freetime', label: 'Free Time', icon: <Coffee className="w-3.5 h-3.5" /> },
  ];

  const filteredTips = activeTab === 'all' ? city.cheatCodes : city.cheatCodes.filter(c => c.category === activeTab);
  const pinnedTips = filteredTips.filter(t => t.pinned);
  const otherTips = filteredTips.filter(t => !t.pinned);

  return (
    <div className="space-y-6">
      {/* City selector */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-1">City Guide</h2>
        <p className="text-sm text-slate-500 mb-4">Your hyper-local cheat codes</p>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {cities.map(c => (
            <button key={c.id} onClick={() => { setSelectedCity(c.id); setActiveTab('all'); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                selectedCity === c.id ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}>
              <span>{c.flag}</span> {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* City header card */}
      <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute right-4 top-4 text-6xl opacity-20">{city.image}</div>
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{city.flag}</span>
            <h3 className="text-2xl font-bold">{city.name}</h3>
          </div>
          <p className="text-indigo-100 text-sm">{city.country} · {city.studentCount} Bippy students</p>
          <div className="flex gap-4 mt-3">
            <div className="bg-white/20 backdrop-blur rounded-lg px-3 py-1.5 text-xs">
              <strong>{city.cheatCodes.length}</strong> cheat codes
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg px-3 py-1.5 text-xs">
              <strong>{city.cheatCodes.filter(c => c.pinned).length}</strong> pinned
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <TabBar tabs={tabs} active={activeTab} onChange={setActiveTab} />

      {/* Pinned Cheat Codes */}
      {pinnedTips.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-amber-500" /> Pinned Cheat Codes
          </h4>
          {pinnedTips.map(tip => (
            <div key={tip.id} className="bg-amber-50/50 border border-amber-200/50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                  {tip.category === 'transport' ? <Bus className="w-4 h-4" /> :
                   tip.category === 'accommodation' ? <Home className="w-4 h-4" /> :
                   tip.category === 'social' ? <UsersIcon className="w-4 h-4" /> :
                   <Coffee className="w-4 h-4" />}
                </div>
                <div>
                  <h5 className="font-semibold text-slate-800 text-sm">{tip.title}</h5>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">{tip.content}</p>
                  <span className="inline-block mt-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full capitalize">{tip.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Other Tips */}
      {otherTips.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">More Tips</h4>
          {otherTips.map(tip => (
            <div key={tip.id} className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                  {tip.category === 'transport' ? <Bus className="w-4 h-4" /> :
                   tip.category === 'accommodation' ? <Home className="w-4 h-4" /> :
                   tip.category === 'social' ? <UsersIcon className="w-4 h-4" /> :
                   <Coffee className="w-4 h-4" />}
                </div>
                <div>
                  <h5 className="font-semibold text-slate-800 text-sm">{tip.title}</h5>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">{tip.content}</p>
                  <span className="inline-block mt-2 text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full capitalize">{tip.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Premium upsell */}
      {!isPremium && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-5 text-center">
          <Crown className="w-8 h-8 text-amber-500 mx-auto mb-2" />
          <h4 className="font-bold text-slate-800">Unlock Premium Cheat Codes</h4>
          <p className="text-sm text-slate-600 mt-1">Get exclusive insider tips, hidden gems, and VIP discounts</p>
          <button className="mt-3 px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all">
            Upgrade to Insider ✨
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// DISCOUNT LOCKER
// ============================================================
export function DiscountLocker() {
  const [selectedDiscount, setSelectedDiscount] = useState<string | null>(null);
  const [filterCity, setFilterCity] = useState('All');

  const filtered = filterCity === 'All' ? discounts : discounts.filter(d => d.city === filterCity);
  const selected = discounts.find(d => d.id === selectedDiscount);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-1">Discount Locker 🎟️</h2>
        <p className="text-sm text-slate-500">Exclusive deals from verified partners</p>
      </div>

      {/* City filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {['All', ...cities.map(c => c.name)].map(city => (
          <button key={city} onClick={() => setFilterCity(city)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              filterCity === city ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}>
            {city}
          </button>
        ))}
      </div>

      {/* Discount cards */}
      <div className="grid gap-3">
        {filtered.map(d => (
          <div key={d.id}
            className={`bg-white rounded-xl border transition-all cursor-pointer hover:shadow-md ${
              d.premiumOnly ? 'border-amber-200 bg-gradient-to-r from-white to-amber-50/30' : 'border-slate-200'
            }`}
            onClick={() => setSelectedDiscount(d.id)}>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{d.category}</span>
                    {d.premiumOnly && (
                      <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Crown className="w-3 h-3" /> Insider
                      </span>
                    )}
                  </div>
                  <h4 className="font-semibold text-slate-800">{d.title}</h4>
                  <p className="text-sm text-slate-500 mt-0.5">{d.merchantName} · {d.city}</p>
                  <p className="text-sm text-slate-600 mt-1">{d.description}</p>
                  <p className="text-xs text-slate-400 mt-2">Valid until {d.validUntil}</p>
                </div>
                <div className="shrink-0 ml-4">
                  <div className="text-2xl font-black text-emerald-600">{d.discount}</div>
                  <span className="text-xs text-slate-400">OFF</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* QR Code Modal */}
      {selectedDiscount && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedDiscount(null)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedDiscount(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400">✕</button>
            <h3 className="text-lg font-bold text-slate-800 mb-1">{selected.title}</h3>
            <p className="text-sm text-slate-500 mb-4">{selected.merchantName}</p>
            <div className="bg-white p-4 rounded-xl border border-slate-100 inline-block mb-4">
              <QRCode data={selected.qrData} size={160} />
            </div>
            <p className="text-sm text-slate-600 mb-4">Show this QR code at the venue</p>
            <div className="flex gap-2">
              <button className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1.5">
                <ExternalLink className="w-4 h-4" /> Book Online
              </button>
              <button className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                Copy Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// CONNECT HUB - Social + Map
// ============================================================
export function ConnectHub() {
  const [activeChannel, setActiveChannel] = useState('Ljubljana General');
  const [newMessage, setNewMessage] = useState('');
  const [showRadar, setShowRadar] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const channelMessages = chatMessages.filter(m => m.channel === activeChannel);
  const profile = selectedProfile ? { name: 'Emma Johansson', flag: '🇸🇪', country: 'Sweden', city: 'Ljubljana', bio: 'Exchange student from Lund University. Love exploring new cities through food and photography.', hobbies: ['Photography', 'Hiking', 'Cooking'], premium: true } : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-1">Connect 💬</h2>
          <p className="text-sm text-slate-500">Cohort channels & student radar</p>
        </div>
        <button onClick={() => setShowRadar(!showRadar)}
          className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${
            showRadar ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}>
          {showRadar ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          Student Radar
        </button>
      </div>

      {showRadar ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">Student Radar 📍</h3>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <div className="w-10 h-6 bg-indigo-500 rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all" />
              </div>
              Show Me on Map
            </label>
          </div>
          <StudentMap cityId="ljubljana" showUsers={true} />
          <div className="flex gap-2 flex-wrap">
            {['🇸🇪 Emma', '🇰🇷 Hana', '🇮🇹 Marco', '🇯🇵 Yuki', '🇱🇧 Sara'].map((name, i) => (
              <button key={i} onClick={() => setSelectedProfile(name)}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium hover:bg-indigo-50 hover:border-indigo-200 transition-all">
                {name} · 0.{i + 2}km
              </button>
            ))}
          </div>
          {profile && (
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-violet-400 flex items-center justify-center text-xl">
                  {profile.flag}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-slate-800">{profile.name}</h4>
                    {profile.premium && <Crown className="w-4 h-4 text-amber-500" />}
                  </div>
                  <p className="text-xs text-slate-500">{profile.country} · {profile.city}</p>
                  <p className="text-sm text-slate-600 mt-2">{profile.bio}</p>
                  <div className="flex gap-1 mt-2">
                    {profile.hobbies.map(h => (
                      <span key={h} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">{h}</span>
                    ))}
                  </div>
                  <button className="mt-3 px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-medium hover:bg-indigo-700 transition-colors">
                    Add Socials
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Channel list */}
          <div className="lg:col-span-1 space-y-1">
            {channelList.map(ch => (
              <button key={ch.name} onClick={() => setActiveChannel(ch.name)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                  activeChannel === ch.name ? 'bg-indigo-50 text-indigo-700 font-medium' : 'hover:bg-slate-50 text-slate-600'
                }`}>
                <div className="flex items-center justify-between">
                  <span className="truncate">{ch.name}</span>
                  {ch.unread > 0 && (
                    <span className="bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0 ml-1">{ch.unread}</span>
                  )}
                </div>
                <span className="text-xs text-slate-400">{ch.members} members</span>
              </button>
            ))}
          </div>

          {/* Chat area */}
          <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 flex flex-col" style={{ height: '400px' }}>
            <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-500" />
              <span className="font-semibold text-sm text-slate-800">{activeChannel}</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {channelMessages.map(msg => (
                <div key={msg.id} className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-400 flex items-center justify-center text-sm shrink-0">
                    {msg.userFlag}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-slate-800">{msg.userName}</span>
                      <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                    </div>
                    <p className="text-sm text-slate-700 mt-0.5">{msg.message}</p>
                  </div>
                </div>
              ))}
              <TypingIndicator />
            </div>
            <div className="p-3 border-t border-slate-100">
              <div className="flex gap-2">
                <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400" />
                <button className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white hover:bg-indigo-700 transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// EVENTS MARKETPLACE
// ============================================================
export function EventsMarketplace() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [filterCity, setFilterCity] = useState('All');

  const filtered = filterCity === 'All' ? events : events.filter(e => e.city === filterCity);
  const selected = events.find(e => e.id === selectedEvent);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-1">Events 🎉</h2>
        <p className="text-sm text-slate-500">Upcoming events across all cities</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {['All', ...cities.map(c => c.name)].map(city => (
          <button key={city} onClick={() => setFilterCity(city)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              filterCity === city ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}>
            {city}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map(ev => (
          <div key={ev.id}
            className={`bg-white rounded-xl border transition-all hover:shadow-md cursor-pointer ${
              ev.sponsored ? 'border-indigo-200' : 'border-slate-200'
            }`}
            onClick={() => setSelectedEvent(ev.id)}>
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 flex items-center justify-center text-2xl shrink-0">
                  {ev.image}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {ev.sponsored && <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">SPONSORED</span>}
                  </div>
                  <h4 className="font-semibold text-slate-800 text-sm truncate">{ev.title}</h4>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {ev.date}</span>
                    <span>{ev.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {ev.city}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">{ev.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-bold text-slate-800">{ev.price === 0 ? 'FREE' : `€${ev.price}`}</span>
                    <span className="text-xs text-slate-500">{ev.attendees}/{ev.maxAttendees} spots</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1.5">
                    <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${(ev.attendees / ev.maxAttendees) * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Event detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedEvent(null)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400">✕</button>
            <div className="text-center mb-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 flex items-center justify-center text-4xl mx-auto mb-3">{selected.image}</div>
              <h3 className="text-xl font-bold text-slate-800">{selected.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{selected.location} · {selected.city}</p>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-slate-50 rounded-lg p-3 text-center">
                <p className="text-xs text-slate-500">Date</p>
                <p className="font-semibold text-sm text-slate-800">{selected.date}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 text-center">
                <p className="text-xs text-slate-500">Time</p>
                <p className="font-semibold text-sm text-slate-800">{selected.time}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 text-center">
                <p className="text-xs text-slate-500">Price</p>
                <p className="font-semibold text-sm text-slate-800">{selected.price === 0 ? 'FREE' : `€${selected.price}`}</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-4">{selected.description}</p>
            <div className="flex items-center justify-between text-sm mb-4">
              <span className="text-slate-500">{selected.attendees}/{selected.maxAttendees} attending</span>
              <span className="text-slate-400">{selected.maxAttendees - selected.attendees} spots left</span>
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-indigo-200 transition-all flex items-center justify-center gap-2">
              <Ticket className="w-4 h-4" /> Book Ticket
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// PREMIUM SHOWCASE
// ============================================================
export function PremiumShowcase() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute -right-4 -top-4 text-8xl opacity-20">👑</div>
        <div className="relative">
          <h2 className="text-2xl font-bold mb-2">Bippy Insider ✨</h2>
          <p className="text-amber-100 text-sm max-w-md">Unlock exclusive premium features designed to supercharge your city experience.</p>
          <div className="mt-4 flex gap-3">
            <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2 text-sm font-medium">€4.99/month</div>
            <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2 text-sm font-medium">€49.99/year</div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          { icon: <Star className="w-6 h-6" />, title: 'Exclusive Cheat Codes', desc: 'Access premium-only insider tips curated by local ambassadors', color: 'from-amber-400 to-amber-500' },
          { icon: <Crown className="w-6 h-6" />, title: 'VIP Discounts', desc: 'Higher-tier deals and early access to limited promotions', color: 'from-violet-400 to-violet-500' },
          { icon: <MapPin className="w-6 h-6" />, title: 'Premium Map Markers', desc: 'Hidden gem locations, secret spots, and curated walking routes', color: 'from-emerald-400 to-emerald-500' },
          { icon: <Ticket className="w-6 h-6" />, title: 'Priority Event Access', desc: 'Early booking window for sponsored events and exclusive meetups', color: 'from-sky-400 to-sky-500' },
          { icon: <Heart className="w-6 h-6" />, title: 'Verified Badge', desc: 'Show your verified status with a premium profile badge', color: 'from-rose-400 to-rose-500' },
          { icon: <Lock className="w-4 h-4" />, title: 'And More Coming...', desc: 'We\'re always adding new premium features', color: 'from-slate-400 to-slate-500' },
        ].map((feature, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-3`}>
              {feature.icon}
            </div>
            <h4 className="font-semibold text-slate-800">{feature.title}</h4>
            <p className="text-sm text-slate-500 mt-1">{feature.desc}</p>
          </div>
        ))}
      </div>

      <button className="w-full py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-amber-200 transition-all">
        Start 7-Day Free Trial →
      </button>
    </div>
  );
}

// ============================================================
// USER APP - Main Router
// ============================================================
export default function UserApp({ view, isLoggedIn, onLogin }: {
  view: string;
  isLoggedIn: boolean;
  onLogin: () => void;
}) {
  if (!isLoggedIn) {
    if (view === 'onboarding') {
      return <OnboardingProfiler onComplete={onLogin} />;
    }
    return <AuthGate onVerified={() => {}} />;
  }

  switch (view) {
    case 'onboarding': return <OnboardingProfiler onComplete={onLogin} />;
    case 'guide': return <CityGuide />;
    case 'discounts': return <DiscountLocker />;
    case 'connect': return <ConnectHub />;
    case 'events': return <EventsMarketplace />;
    case 'premium': return <PremiumShowcase />;
    default: return <CityGuide />;
  }
}
