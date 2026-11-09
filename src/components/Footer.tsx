import { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, ArrowRight, X, AlertCircle } from 'lucide-react';
import GhanaGamesLogo from './GhanaGamesLogo';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  isAuthenticated: boolean;
  onAdminLoginSuccess: () => void;
}

export default function Footer({ setCurrentTab, isAuthenticated, onAdminLoginSuccess }: FooterProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAdminClick = () => {
    if (isAuthenticated) {
      setCurrentTab('admin');
    } else {
      setPassword('');
      setErrorMsg('');
      setShowLoginModal(true);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '12341234') {
      onAdminLoginSuccess();
      setShowLoginModal(false);
      setCurrentTab('admin');
    } else {
      setErrorMsg('Incorrect administrative passcode. Access denied.');
    }
  };

  return (
    <footer className="glass-panel border-t border-[#2C261F]/70 mt-20">
      {/* Kente color accent top bar */}
      <div className="kente-border-top w-full"></div>

      <div className="max-w-[1440px] mx-auto px-5 lg:px-12 py-12 flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-[#2C261F]/60">
        {/* Logo & Ghana Heritage Tag */}
        <div className="shrink-0">
          <GhanaGamesLogo size="md" showSubtitle={true} />
        </div>

        {/* Navigation Links for Public Users */}
        <nav className="flex flex-wrap justify-center items-center text-xs text-[#F5F1EA] gap-7">
          <button onClick={() => setCurrentTab('home')} className="hover:text-[#E5A93C] transition-colors cursor-pointer font-medium">Welcome Home</button>
          <button onClick={() => setCurrentTab('games')} className="hover:text-[#E5A93C] transition-colors cursor-pointer font-medium">Ghanaian Games</button>
          <button onClick={() => setCurrentTab('stories')} className="hover:text-[#E5A93C] transition-colors cursor-pointer font-medium">Heritage Stories</button>
          <button onClick={() => setCurrentTab('elder')} className="hover:text-[#E5A93C] transition-colors cursor-pointer font-medium">Nana Kwame (AI Elder)</button>
        </nav>

        {/* Tagline */}
        <div className="flex items-center gap-3">
          <div className="text-right leading-tight">
            <div className="text-[#F7D070] text-[12px] font-semibold">Preserving Ghana’s Heritage</div>
            <div className="text-[#A39B8E] text-[11px] mt-0.5">Living Traditions Across Generations</div>
          </div>
        </div>
      </div>

      {/* Discreet Subfooter: Admin link placed discreetly below the website */}
      <div className="max-w-[1440px] mx-auto px-5 lg:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A39B8E]">
        <p>© 2026 Ghana Games — Republic of Ghana Cultural & Traditional Games Archive. All rights reserved.</p>

        {/* Discreet Curator / Admin Lock below the website */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleAdminClick}
            className="inline-flex items-center gap-1.5 text-[#A39B8E] hover:text-[#E5A93C] transition-colors text-[10px] font-mono cursor-pointer"
            title="Curator Access"
          >
            <Lock className="w-3 h-3 text-[#E5A93C]/70" />
            <span>Admin Portal</span>
          </button>
          <span>·</span>
          <span className="text-[#E5A93C]">Nyansapo Wisdom Knot</span>
        </div>
      </div>

      {/* Admin Protected Password Login Modal with Glassmorphism */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel border border-[#E5A93C]/30 rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl relative animate-in fade-in-0 zoom-in-95">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-[#A39B8E] hover:text-[#F5F1EA] cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-full bg-[#E5A93C]/10 border border-[#E5A93C]/30 text-[#E5A93C] flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(229,169,60,0.2)]">
              <Shield className="w-6 h-6" />
            </div>

            <h3 className="font-serif font-bold text-xl text-[#F7D070]">
              Curator Authentication
            </h3>
            <p className="text-xs text-[#A39B8E] mt-1.5 leading-relaxed">
              Enter the administrative security password to access and manage the Ghanaian games registry.
            </p>

            <form onSubmit={handleLoginSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs text-[#A39B8E] mb-1.5 font-medium">
                  Admin Passcode
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter passcode..."
                    className="w-full glass-input focus:border-[#E5A93C] rounded-xl px-3.5 py-2.5 text-sm text-[#F5F1EA] outline-none pr-10"
                    autoFocus
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A39B8E] hover:text-[#F5F1EA] cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {errorMsg && (
                <div className="text-xs text-red-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#E5A93C] hover:bg-[#F7D070] text-[#0B0A08] font-bold text-xs py-3 rounded-xl transition-all shadow-md hover:scale-102 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Authenticate & Access</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
}
