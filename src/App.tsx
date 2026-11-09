import { useState, useTransition } from 'react';
import { GAMES, STORIES } from './data/games';
import { GameItem } from './types';
import Header from './components/Header';
import WelcomeHome from './components/WelcomeHome';
import GameList from './components/GameList';
import StoriesSection from './components/StoriesSection';
import AiElderChat from './components/AiElderChat';
import AdminDashboard from './components/AdminDashboard';
import GameDetailModal from './components/GameDetailModal';
import PlayableOware from './components/PlayableOware';
import PlayableAmpe from './components/PlayableAmpe';
import PlayablePilolo from './components/PlayablePilolo';
import PlayableChaskele from './components/PlayableChaskele';
import Footer from './components/Footer';
import { Sparkles, Home, Trophy, BookOpen, Compass, Bot } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [gamesData, setGamesData] = useState<GameItem[]>(GAMES);
  const [selectedGame, setSelectedGame] = useState<GameItem | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light' | 'kente'>('dark');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const [, startTransition] = useTransition();

  // Function to navigate between tabs with authentic Ghanaian moment transition
  const navigateToTab = (newTab: string) => {
    if (newTab === currentTab) return;
    setIsPageLoading(true);
    setTimeout(() => {
      startTransition(() => {
        setCurrentTab(newTab);
        setIsPageLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }, 280);
  };

  const handlePlayGame = (gameId: string) => {
    if (gameId === 'oware') navigateToTab('play-oware');
    else if (gameId === 'ampe') navigateToTab('play-ampe');
    else if (gameId === 'pilolo') navigateToTab('play-pilolo');
    else if (gameId === 'chaskele') navigateToTab('play-chaskele');
    else {
      const found = gamesData.find((g) => g.id === gameId);
      if (found) setSelectedGame(found);
    }
  };

  const themeClass =
    theme === 'light'
      ? 'theme-light bg-[#FAF6ED] text-[#1C1712]'
      : theme === 'kente'
      ? 'theme-kente bg-[#0E0705] text-[#FAF4EB]'
      : 'bg-[#0B0A08] text-[#F5F1EA]';

  // Mobile Bottom Navigation Bar Items
  const mobileNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'play-oware', label: 'Oware 3D', icon: Trophy },
    { id: 'games', label: 'Games', icon: Compass },
    { id: 'stories', label: 'Stories', icon: BookOpen },
    { id: 'elder', label: 'Elder AI', icon: Bot },
  ];

  return (
    <div
      className={`min-h-screen font-body transition-colors duration-300 selection:bg-[#E5A93C] selection:text-[#0B0A08] flex flex-col justify-between ${themeClass}`}
    >
      <div>
        <Header
          currentTab={currentTab}
          setCurrentTab={navigateToTab}
          searchQuery={searchQuery}
          setSearchQuery={(q) => {
            setSearchQuery(q);
            if (currentTab !== 'games') navigateToTab('games');
          }}
          theme={theme}
          setTheme={setTheme}
        />

        {/* Loading Moment Transition with 3D rotating Adinkra emblem */}
        {isPageLoading && (
          <div className="fixed inset-0 z-50 bg-[#0B0A08]/80 backdrop-blur-md flex flex-col items-center justify-center pointer-events-none animate-in fade-in-0 duration-200">
            <div className="glass-panel p-8 rounded-3xl border border-[#E5A93C]/40 flex flex-col items-center shadow-2xl text-center max-w-xs scale-100 animate-in zoom-in-90 duration-250">
              <div className="relative w-16 h-16 flex items-center justify-center mb-4">
                <div className="absolute inset-0 rounded-full border-2 border-[#E5A93C]/20 border-t-[#E5A93C] animate-spin" />
                <svg viewBox="0 0 40 40" className="w-8 h-8 text-[#E5A93C]" fill="none" stroke="currentColor">
                  <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="2" fill="rgba(229,169,60,0.3)" />
                  <circle cx="26" cy="14" r="4" stroke="currentColor" strokeWidth="2" fill="rgba(229,169,60,0.3)" />
                  <circle cx="14" cy="26" r="4" stroke="currentColor" strokeWidth="2" fill="rgba(229,169,60,0.3)" />
                  <circle cx="26" cy="26" r="4" stroke="currentColor" strokeWidth="2" fill="rgba(229,169,60,0.3)" />
                  <circle cx="20" cy="20" r="2.5" fill="#E5A93C" />
                </svg>
              </div>
              <div className="font-serif font-bold text-lg text-[#F7D070]">Ghana Games</div>
              <p className="text-xs text-[#A39B8E] mt-1 flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3 h-3 text-[#E5A93C]" />
                <span>Entering sanctuary...</span>
              </p>
            </div>
          </div>
        )}

        <main className="relative min-h-[75vh] pb-24 md:pb-8">
          {currentTab === 'play-oware' && (
            <PlayableOware onBack={() => navigateToTab('games')} />
          )}
          {currentTab === 'play-ampe' && (
            <PlayableAmpe onBack={() => navigateToTab('games')} />
          )}
          {currentTab === 'play-pilolo' && (
            <PlayablePilolo onBack={() => navigateToTab('games')} />
          )}
          {currentTab === 'play-chaskele' && (
            <PlayableChaskele onBack={() => navigateToTab('games')} />
          )}

          {/* Welcoming HomePage */}
          {currentTab === 'home' && (
            <WelcomeHome
              onExploreGames={() => navigateToTab('games')}
              onPlayGame={handlePlayGame}
              onConsultElder={() => navigateToTab('elder')}
              onOpenStories={() => navigateToTab('stories')}
            />
          )}

          {currentTab === 'games' && (
            <GameList
              games={gamesData}
              searchQuery={searchQuery}
              onSelectGame={(game) => setSelectedGame(game)}
              onPlayGame={handlePlayGame}
            />
          )}

          {currentTab === 'stories' && (
            <div className="py-4">
              <StoriesSection stories={STORIES} />
            </div>
          )}

          {currentTab === 'elder' && (
            <div className="py-4">
              <AiElderChat />
            </div>
          )}

          {/* Admin Page protected by authentication */}
          {currentTab === 'admin' && (
            isAdminAuthenticated ? (
              <AdminDashboard
                games={gamesData}
                onBack={() => navigateToTab('home')}
                onUpdateGames={(updated) => setGamesData(updated)}
              />
            ) : (
              <div className="max-w-md mx-auto my-20 p-8 rounded-3xl glass-panel text-center">
                <h3 className="font-serif font-bold text-xl text-[#F7D070]">Curator Authentication Required</h3>
                <p className="text-xs text-[#A39B8E] mt-2 mb-6">
                  Please unlock the admin portal using the passcode link located below the website.
                </p>
                <button
                  onClick={() => navigateToTab('home')}
                  className="bg-[#E5A93C] hover:bg-[#F7D070] text-[#0B0A08] font-bold text-xs px-7 py-2.5 rounded-full shadow-md cursor-pointer"
                >
                  Return Home
                </button>
              </div>
            )
          )}
        </main>
      </div>

      {selectedGame && (
        <GameDetailModal
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
          onPlay={handlePlayGame}
        />
      )}

      {/* Responsive Glassmorphism Mobile Bottom Navigation Bar */}
      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-3 left-4 right-4 z-40 md:hidden glass-panel border border-[#E5A93C]/35 rounded-2xl p-1.5 flex items-center justify-around shadow-[0_12px_36px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
      >
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigateToTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#E5A93C] text-[#0B0A08] font-bold shadow-md scale-105'
                  : 'text-[#A39B8E] hover:text-[#F5F1EA]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#0B0A08]' : 'text-[#E5A93C]'}`} />
              <span className="text-[10px] mt-0.5 whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <Footer
        setCurrentTab={navigateToTab}
        isAuthenticated={isAdminAuthenticated}
        onAdminLoginSuccess={() => setIsAdminAuthenticated(true)}
      />
    </div>
  );
}
