import { useState, useTransition } from 'react';
import { GAMES, STORIES } from './data/games';
import { GameItem, StoryItem } from './types';
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
import { Sparkles } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [gamesData, setGamesData] = useState<GameItem[]>(GAMES);
  const [selectedGame, setSelectedGame] = useState<GameItem | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light' | 'kente'>('dark');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const [, startTransition] = useTransition();

  // Function to navigate between tabs with an authentic Ghanaian loading moment
  const navigateToTab = (newTab: string) => {
    if (newTab === currentTab) return;
    setIsPageLoading(true);
    // Smooth loading moment to create polished transition
    setTimeout(() => {
      startTransition(() => {
        setCurrentTab(newTab);
        setIsPageLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }, 320);
  };

  const handlePlayGame = (gameId: string) => {
    if (gameId === 'oware') navigateToTab('play-oware');
    else if (gameId === 'ampe') navigateToTab('play-ampe');
    else if (gameId === 'pilolo') navigateToTab('play-pilolo');
    else if (gameId === 'chaskele') navigateToTab('play-chaskele');
    else {
      const found = gamesData.find(g => g.id === gameId);
      if (found) setSelectedGame(found);
    }
  };

  const themeClass =
    theme === 'light'
      ? 'theme-light bg-[#FAF6ED] text-[#1C1712]'
      : theme === 'kente'
      ? 'theme-kente bg-[#0E0705] text-[#FAF4EB]'
      : 'bg-[#0B0A08] text-[#F5F1EA]';

  return (
    <div className={`min-h-screen font-body transition-colors duration-300 selection:bg-[#E5A93C] selection:text-[#0B0A08] ${themeClass}`}>
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

      {/* Loading moment transition overlay */}
      {isPageLoading && (
        <div className="fixed inset-0 z-50 bg-[#0B0A08]/75 backdrop-blur-md flex flex-col items-center justify-center pointer-events-none animate-in fade-in-0 duration-200">
          <div className="glass-panel p-8 rounded-3xl border border-[#E5A93C]/40 flex flex-col items-center shadow-2xl text-center max-w-xs">
            {/* Rotating Adinkra emblem spinner */}
            <div className="relative w-16 h-16 flex items-center justify-center mb-4">
              <div className="absolute inset-0 rounded-full border-2 border-[#E5A93C]/20 border-t-[#E5A93C] animate-spin"></div>
              <svg viewBox="0 0 40 40" className="w-8 h-8 text-[#E5A93C]" fill="none" stroke="currentColor">
                <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="2" fill="rgba(229,169,60,0.3)" />
                <circle cx="26" cy="14" r="4" stroke="currentColor" strokeWidth="2" fill="rgba(229,169,60,0.3)" />
                <circle cx="14" cy="26" r="4" stroke="currentColor" strokeWidth="2" fill="rgba(229,169,60,0.3)" />
                <circle cx="26" cy="26" r="4" stroke="currentColor" strokeWidth="2" fill="rgba(229,169,60,0.3)" />
                <circle cx="20" cy="20" r="2.5" fill="#E5A93C" />
              </svg>
            </div>
            <div className="font-serif font-bold text-lg text-[#F7D070]">
              Ghana Games
            </div>
            <p className="text-xs text-[#A39B8E] mt-1 flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3 h-3 text-[#E5A93C]" />
              <span>Unfolding heritage...</span>
            </p>
          </div>
        </div>
      )}

      <main className="relative min-h-[75vh]">
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

        {/* Welcoming HomePage - strictly pure landing page with full image background */}
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

      {selectedGame && (
        <GameDetailModal
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
          onPlay={handlePlayGame}
        />
      )}

      {/* Footer with discreet admin link below the website protected by password */}
      <Footer
        setCurrentTab={navigateToTab}
        isAuthenticated={isAdminAuthenticated}
        onAdminLoginSuccess={() => setIsAdminAuthenticated(true)}
      />
    </div>
  );
}
