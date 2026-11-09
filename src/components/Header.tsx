import { useState } from 'react';
import { Search, Palette, Menu, X, Sparkles } from 'lucide-react';
import GhanaGamesLogo from './GhanaGamesLogo';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  theme: 'dark' | 'light' | 'kente';
  setTheme: (theme: 'dark' | 'light' | 'kente') => void;
}

export default function Header({
  currentTab,
  setCurrentTab,
  searchQuery,
  setSearchQuery,
  theme,
  setTheme,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const themeLabels = {
    dark: 'Dark Heritage',
    light: 'Ivory Sun (Light)',
    kente: 'Royal Kente',
  };

  return (
    <header className="sticky top-0 z-50 glass-header border-b border-[#2C261F]/60">
      {/* Authentic Kente Color Accent Line across top of page */}
      <div className="kente-border-top w-full"></div>

      <div className="max-w-[1440px] mx-auto px-5 lg:px-12 h-[72px] flex items-center justify-between gap-6">
        {/* Zone 1: Official Ghana Games Logo */}
        <button
          onClick={() => setCurrentTab('home')}
          className="cursor-pointer focus:outline-none"
          title="Ghana Games Home"
        >
          <GhanaGamesLogo size="md" showSubtitle={true} />
        </button>

        {/* Zone 2: Navigation Links for Public Users */}
        <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium h-full">
          {[
            { id: 'home', label: 'Welcome Home' },
            { id: 'games', label: 'Ghanaian Games' },
            { id: 'stories', label: 'Heritage Stories' },
            { id: 'elder', label: 'Nana Kwame (AI)' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`relative h-full flex items-center transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentTab === item.id ? 'text-[#E5A93C] font-semibold' : 'text-[#F5F1EA] hover:text-[#E5A93C]'
              }`}
            >
              {item.label}
              {currentTab === item.id && (
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-6 h-[2.5px] bg-[#E5A93C] rounded-full shadow-[0_0_8px_rgba(229,169,60,0.8)]"></span>
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: Actions (Search, Theme Selector, Consult Elder CTA) */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden lg:flex items-center gap-2 glass-input rounded-full px-3.5 h-9 w-[190px] focus-within:border-[#E5A93C]/70 transition-colors">
            <Search className="w-3.5 h-3.5 text-[#E5A93C]" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-[#F5F1EA] placeholder:text-[#A39B8E] outline-none flex-1 min-w-0"
            />
          </div>

          {/* Theme Switcher with Light Theme */}
          <div className="relative">
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="flex items-center gap-1.5 glass-pill hover:border-[#E5A93C] rounded-full px-3 h-8.5 text-xs text-[#F5F1EA] transition-all cursor-pointer shadow-sm"
              title="Change Theme (Dark / Light / Kente)"
            >
              <Palette className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span className="hidden sm:inline font-medium">{themeLabels[theme]}</span>
            </button>

            {themeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 glass-panel border border-[#E5A93C]/30 rounded-xl shadow-2xl p-1.5 z-50 text-xs animate-in fade-in-0 zoom-in-95">
                {(['dark', 'light', 'kente'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTheme(t);
                      setThemeDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                      theme === t ? 'bg-[#E5A93C] text-[#0B0A08] font-bold shadow-sm' : 'text-[#F5F1EA] hover:bg-[#E5A93C]/15'
                    }`}
                  >
                    <span>{themeLabels[t]}</span>
                    {t === 'light' && <span className="text-[10px]">☀️</span>}
                    {t === 'dark' && <span className="text-[10px]">🌙</span>}
                    {t === 'kente' && <span className="text-[10px]">🇬🇭</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setCurrentTab('elder')}
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#E5A93C] hover:bg-[#F7D070] text-[#0B0A08] font-bold text-xs px-4 h-8.5 rounded-full transition-all whitespace-nowrap shadow-md hover:scale-105 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consult Elder</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#F5F1EA] hover:text-[#E5A93C] p-1.5 rounded-lg glass-pill"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-header border-b border-[#2C261F] px-5 py-4 space-y-3 animate-in fade-in-0">
          <div className="flex items-center gap-2 glass-input rounded-full px-3.5 h-10 mb-3">
            <Search className="w-4 h-4 text-[#E5A93C]" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-[#F5F1EA] placeholder:text-[#A39B8E] outline-none flex-1"
            />
          </div>
          {[
            { id: 'home', label: 'Welcome Home' },
            { id: 'games', label: 'Ghanaian Games' },
            { id: 'stories', label: 'Heritage Stories' },
            { id: 'elder', label: 'Nana Kwame (AI Elder)' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2.5 px-4 rounded-xl text-sm font-medium transition-colors ${
                currentTab === item.id ? 'bg-[#E5A93C] text-[#0B0A08] font-bold' : 'text-[#F5F1EA] hover:bg-[#14120E]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
