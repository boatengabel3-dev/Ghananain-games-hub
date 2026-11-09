import React, { useState } from 'react';
import { GameItem, StoryItem } from '../types';
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Save,
  Shield,
  CheckCircle,
  RefreshCcw,
  Sparkles,
  Edit3,
  Layers,
  BookOpen,
  Camera,
  RotateCcw,
} from 'lucide-react';

interface AdminDashboardProps {
  games: GameItem[];
  stories: StoryItem[];
  heroImage: string;
  elderAvatar: string;
  onBack: () => void;
  onUpdateGames: (updated: GameItem[]) => void;
  onUpdateStories: (updated: StoryItem[]) => void;
  onUpdateHeroImage: (url: string) => void;
  onUpdateElderAvatar: (url: string) => void;
}

// Curated authentic Ghanaian cultural photography gallery presets
const GALLERY_PRESETS = [
  {
    id: 'hero-default',
    title: 'Sunlit Courtyard Children',
    category: 'Home Hero',
    url: '/src/assets/images/ghana_hero_banner_1794255705201.jpg',
  },
  {
    id: 'oware-carved',
    title: 'Royal Carved Oware & Nickar Seeds',
    category: 'Board Game',
    url: '/src/assets/images/ghana_oware_carved_1794255704478.jpg',
  },
  {
    id: 'ampe-girls',
    title: 'Schoolgirls Jumping Ampe in Unison',
    category: 'Active Sport',
    url: '/src/assets/images/ghana_ampe_girls_1794255706526.jpg',
  },
  {
    id: 'chaskele-street',
    title: 'Kumasi Street Chaskele with Tin Wicket',
    category: 'Street Game',
    url: '/src/assets/images/ghana_chaskele_street_1794255706037.jpg',
  },
  {
    id: 'dame-drafts',
    title: 'Ghanaian Dame Draughts Masters',
    category: 'Board Game',
    url: '/src/assets/images/ghana_dame_drafts_1794255742924.jpg',
  },
  {
    id: 'ludo-evening',
    title: 'Veranda Family Ludo Tournament',
    category: 'Board Game',
    url: '/src/assets/images/ghana_ludo_evening_1794255743222.jpg',
  },
  {
    id: 'pilolo-twilight',
    title: 'Children Searching for Pilolo Token',
    category: 'Children Game',
    url: '/src/assets/images/ghana_pilolo_game_1794255706173.jpg',
  },
  {
    id: 'elder-nana',
    title: 'Elder Nana Kwame with Adinkra Robe',
    category: 'Avatar & Lore',
    url: '/src/assets/images/ghana_adinkra_elder_1794255756821.jpg',
  },
];

export default function AdminDashboard({
  games,
  stories,
  heroImage,
  elderAvatar,
  onBack,
  onUpdateGames,
  onUpdateStories,
  onUpdateHeroImage,
  onUpdateElderAvatar,
}: AdminDashboardProps) {
  const [activeAdminTab, setActiveAdminTab] = useState<'hero' | 'games' | 'stories'>('hero');
  const [saveNotification, setSaveNotification] = useState<string | null>(null);

  // Home Screen & Elder Image State
  const [currentHeroUrl, setCurrentHeroUrl] = useState<string>(heroImage);
  const [heroInputUrl, setHeroInputUrl] = useState<string>('');
  const [currentElderAvatar, setCurrentElderAvatar] = useState<string>(elderAvatar);
  const [elderInputUrl, setElderInputUrl] = useState<string>('');

  // Games State
  const [gameList, setGameList] = useState<GameItem[]>(games);
  const [selectedGame, setSelectedGame] = useState<GameItem>(games[0] || null);
  const [gameFormData, setGameFormData] = useState<Partial<GameItem>>(games[0] || {});
  const [gameImageInputUrl, setGameImageInputUrl] = useState<string>('');

  // Stories State
  const [storyList, setStoryList] = useState<StoryItem[]>(stories);
  const [selectedStory, setSelectedStory] = useState<StoryItem>(stories[0] || null);
  const [storyFormData, setStoryFormData] = useState<Partial<StoryItem>>(stories[0] || {});
  const [storyImageInputUrl, setStoryImageInputUrl] = useState<string>('');

  const triggerNotification = (msg: string) => {
    setSaveNotification(msg);
    setTimeout(() => setSaveNotification(null), 3500);
  };

  // Generic file upload to Base64 Data URL
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onComplete: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WEBP, or SVG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onComplete(result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Save Home Hero Image
  const handleSaveHeroImage = (urlToSave?: string) => {
    const finalUrl = urlToSave || heroInputUrl.trim() || currentHeroUrl;
    setCurrentHeroUrl(finalUrl);
    setHeroInputUrl('');
    onUpdateHeroImage(finalUrl);
    triggerNotification('Home Screen Hero image updated and published live!');
  };

  // Reset Home Hero Image
  const handleResetHeroImage = () => {
    const defaultUrl = '/src/assets/images/ghana_hero_banner_1794255705201.jpg';
    setCurrentHeroUrl(defaultUrl);
    setHeroInputUrl('');
    onUpdateHeroImage(defaultUrl);
    triggerNotification('Home Screen Hero image restored to authentic default.');
  };

  // Save Nana Kwame Avatar
  const handleSaveElderAvatar = (urlToSave?: string) => {
    const finalUrl = urlToSave || elderInputUrl.trim() || currentElderAvatar;
    setCurrentElderAvatar(finalUrl);
    setElderInputUrl('');
    onUpdateElderAvatar(finalUrl);
    triggerNotification('Nana Kwame Elder avatar updated across the website!');
  };

  // Reset Elder Avatar
  const handleResetElderAvatar = () => {
    const defaultUrl = '/src/assets/images/ghana_adinkra_elder_1794255756821.jpg';
    setCurrentElderAvatar(defaultUrl);
    setElderInputUrl('');
    onUpdateElderAvatar(defaultUrl);
    triggerNotification('Nana Kwame avatar restored to authentic default.');
  };

  // Handle Game selection
  const handleSelectGame = (game: GameItem) => {
    setSelectedGame(game);
    setGameFormData(game);
    setGameImageInputUrl('');
  };

  // Save Game and its Image
  const handleSaveGame = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedGame || !gameFormData.id) return;

    const finalImage = gameImageInputUrl.trim() || gameFormData.image || selectedGame.image;
    const updatedGame: GameItem = {
      ...selectedGame,
      ...gameFormData,
      image: finalImage,
    } as GameItem;

    const updated = gameList.map((g) => (g.id === selectedGame.id ? updatedGame : g));
    setGameList(updated);
    onUpdateGames(updated);
    setSelectedGame(updatedGame);
    setGameFormData(updatedGame);
    setGameImageInputUrl('');
    triggerNotification(`Updated "${updatedGame.name}" cover image and details!`);
  };

  // Handle Story selection
  const handleSelectStory = (story: StoryItem) => {
    setSelectedStory(story);
    setStoryFormData(story);
    setStoryImageInputUrl('');
  };

  // Save Story and its Image
  const handleSaveStory = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedStory || !storyFormData.id) return;

    const finalImage = storyImageInputUrl.trim() || storyFormData.image || selectedStory.image;
    const updatedStory: StoryItem = {
      ...selectedStory,
      ...storyFormData,
      image: finalImage,
    } as StoryItem;

    const updated = storyList.map((s) => (s.id === selectedStory.id ? updatedStory : s));
    setStoryList(updated);
    onUpdateStories(updated);
    setSelectedStory(updatedStory);
    setStoryFormData(updatedStory);
    setStoryImageInputUrl('');
    triggerNotification(`Updated "${updatedStory.title}" cover image and essay!`);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 pb-24">
      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#2C261F]">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs text-[#E5A93C] hover:text-[#F7D070] font-medium glass-pill px-3.5 py-1.5 rounded-full cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Sanctuary</span>
          </button>
          <span className="text-[#A39B8E] hidden sm:inline">|</span>
          <div className="flex items-center gap-2 text-xs text-[#E5A93C] font-semibold uppercase tracking-wider">
            <Shield className="w-4 h-4 text-[#E5A93C]" />
            <span>Curator & Media Administration Console</span>
          </div>
        </div>

        {/* Tab Switchers */}
        <div className="flex items-center gap-1.5 glass-panel p-1 rounded-full text-xs self-start sm:self-auto">
          <button
            onClick={() => setActiveAdminTab('hero')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer font-medium flex items-center gap-1.5 ${
              activeAdminTab === 'hero'
                ? 'bg-[#E5A93C] text-[#0B0A08] font-bold shadow-sm'
                : 'text-[#A39B8E] hover:text-[#F5F1EA]'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Home Hero & Avatars</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('games')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer font-medium flex items-center gap-1.5 ${
              activeAdminTab === 'games'
                ? 'bg-[#E5A93C] text-[#0B0A08] font-bold shadow-sm'
                : 'text-[#A39B8E] hover:text-[#F5F1EA]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Game Artwork ({gameList.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('stories')}
            className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer font-medium flex items-center gap-1.5 ${
              activeAdminTab === 'stories'
                ? 'bg-[#E5A93C] text-[#0B0A08] font-bold shadow-sm'
                : 'text-[#A39B8E] hover:text-[#F5F1EA]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Stories Imagery ({storyList.length})</span>
          </button>
        </div>
      </div>

      {/* Save Toast Notification */}
      {saveNotification && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2.5 shadow-xl animate-in fade-in-0 slide-in-from-top-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{saveNotification}</span>
        </div>
      )}

      {/* TAB 1: Home Screen Hero Banner & Elder Avatar Manager */}
      {activeAdminTab === 'hero' && (
        <div className="space-y-8">
          {/* Section A: Home Screen Hero Banner */}
          <div className="glass-panel border border-[#E5A93C]/30 rounded-3xl p-6 lg:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#2C261F]">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#F7D070] flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-[#E5A93C]" />
                  <span>Home Screen Hero Background Banner</span>
                </h3>
                <p className="text-xs text-[#A39B8E] mt-1">
                  Change the primary background photo that welcomes every visitor to Ghana Games Sanctuary.
                </p>
              </div>

              <button
                onClick={handleResetHeroImage}
                className="inline-flex items-center gap-1.5 text-xs text-[#A39B8E] hover:text-rose-400 glass-pill px-3 py-1.5 rounded-full cursor-pointer self-start sm:self-auto"
                title="Restore original default hero"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Default</span>
              </button>
            </div>

            {/* Live Interactive Preview */}
            <div className="relative aspect-[21/9] sm:aspect-[21/8] w-full rounded-2xl overflow-hidden border-2 border-[#E5A93C]/40 shadow-2xl bg-[#14120E]">
              <img
                src={currentHeroUrl}
                alt="Current Home Hero Preview"
                className="w-full h-full object-cover object-center historical-sepia-img"
              />
              <div className="grain-overlay" />
              <div className="warm-vignette" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

              {/* Watermark preview tag */}
              <div className="absolute bottom-4 left-5 z-10 flex items-center gap-2">
                <span className="glass-pill text-[#F7D070] text-[11px] font-semibold px-3 py-1 rounded-full shadow-md">
                  🇬🇭 Live Home Screen Preview
                </span>
              </div>
            </div>

            {/* Change Methods: Upload or URL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Option 1: Upload from Device */}
              <div className="glass-card p-5 rounded-2xl space-y-3 border border-[#E5A93C]/20">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#F7D070]">
                  <Upload className="w-4 h-4 text-[#E5A93C]" />
                  <span>Method 1: Upload Image from Your Device</span>
                </div>
                <p className="text-xs text-[#A39B8E] leading-relaxed">
                  Select any high-resolution JPG, PNG, or WEBP photo from your computer or phone. It will be converted and stored securely.
                </p>

                <label className="inline-flex items-center gap-2 bg-[#E5A93C] hover:bg-[#F7D070] text-[#0B0A08] font-bold text-xs px-5 py-2.5 rounded-full cursor-pointer shadow-md transition-all hover:scale-102">
                  <Camera className="w-4 h-4" />
                  <span>Choose Photo from Device</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileUpload(e, (dataUrl) => {
                        handleSaveHeroImage(dataUrl);
                      })
                    }
                    className="hidden"
                  />
                </label>
              </div>

              {/* Option 2: Enter Custom URL */}
              <div className="glass-card p-5 rounded-2xl space-y-3 border border-[#E5A93C]/20">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#F7D070]">
                  <ImageIcon className="w-4 h-4 text-[#E5A93C]" />
                  <span>Method 2: Paste Direct Image URL</span>
                </div>
                <p className="text-xs text-[#A39B8E] leading-relaxed">
                  Provide a direct link to any hosted photo or CDN asset.
                </p>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="https://example.com/ghana-sunset.jpg"
                    value={heroInputUrl}
                    onChange={(e) => setHeroInputUrl(e.target.value)}
                    className="flex-1 glass-input rounded-xl px-3.5 py-2 text-xs text-[#F5F1EA] outline-hidden focus:border-[#E5A93C]"
                  />
                  <button
                    onClick={() => handleSaveHeroImage()}
                    disabled={!heroInputUrl.trim()}
                    className="bg-[#E5A93C] hover:bg-[#F7D070] disabled:opacity-40 text-[#0B0A08] font-bold text-xs px-5 py-2 rounded-xl transition-all cursor-pointer shrink-0"
                  >
                    Apply URL
                  </button>
                </div>
              </div>
            </div>

            {/* Quick-Pick Cultural Gallery Presets */}
            <div className="pt-4 border-t border-[#2C261F]">
              <div className="text-xs text-[#E5A93C] font-semibold uppercase tracking-wider mb-3">
                Or Quick-Pick From Curated Ghanaian Heritage Presets:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {GALLERY_PRESETS.slice(0, 4).map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSaveHeroImage(preset.url)}
                    className={`relative rounded-xl overflow-hidden border aspect-[16/9] group cursor-pointer transition-all ${
                      currentHeroUrl === preset.url
                        ? 'border-[#E5A93C] ring-2 ring-[#E5A93C]/50 scale-102'
                        : 'border-[#2C261F] hover:border-[#E5A93C]/60'
                    }`}
                  >
                    <img src={preset.url} alt={preset.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors flex items-end p-2 text-left">
                      <span className="text-[10px] font-bold text-white leading-tight drop-shadow-md">
                        {preset.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section B: Cultural AI Elder (Nana Kwame) Avatar */}
          <div className="glass-panel border border-[#E5A93C]/30 rounded-3xl p-6 lg:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#2C261F]">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#F7D070] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#E5A93C]" />
                  <span>Nana Kwame (AI Cultural Elder) Portrait Avatar</span>
                </h3>
                <p className="text-xs text-[#A39B8E] mt-1">
                  Update the wisdom keeper portrait displayed in the AI Elder chat and knowledge discussions.
                </p>
              </div>

              <button
                onClick={handleResetElderAvatar}
                className="inline-flex items-center gap-1.5 text-xs text-[#A39B8E] hover:text-rose-400 glass-pill px-3 py-1.5 rounded-full cursor-pointer self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Default</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar Live Circular Preview */}
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-[#E5A93C] shadow-[0_0_30px_rgba(229,169,60,0.35)] shrink-0">
                <img
                  src={currentElderAvatar}
                  alt="Current Elder Avatar Preview"
                  className="w-full h-full object-cover historical-sepia-img"
                />
                <div className="grain-overlay" />
              </div>

              {/* Controls */}
              <div className="flex-1 space-y-4 w-full">
                <div className="flex flex-wrap items-center gap-3">
                  <label className="inline-flex items-center gap-2 bg-[#E5A93C] hover:bg-[#F7D070] text-[#0B0A08] font-bold text-xs px-5 py-2.5 rounded-full cursor-pointer shadow-md transition-all hover:scale-102">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Elder Portrait</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileUpload(e, (dataUrl) => {
                          handleSaveElderAvatar(dataUrl);
                        })
                      }
                      className="hidden"
                    />
                  </label>
                  <span className="text-xs text-[#A39B8E]">or enter URL below:</span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="https://example.com/elder-portrait.jpg"
                    value={elderInputUrl}
                    onChange={(e) => setElderInputUrl(e.target.value)}
                    className="flex-1 glass-input rounded-xl px-3.5 py-2 text-xs text-[#F5F1EA] outline-hidden focus:border-[#E5A93C]"
                  />
                  <button
                    onClick={() => handleSaveElderAvatar()}
                    disabled={!elderInputUrl.trim()}
                    className="bg-[#E5A93C] hover:bg-[#F7D070] disabled:opacity-40 text-[#0B0A08] font-bold text-xs px-5 py-2 rounded-xl transition-all cursor-pointer shrink-0"
                  >
                    Apply URL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Game Registry & Cover Artwork Manager */}
      {activeAdminTab === 'games' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Game List on Left (4 cols) */}
          <div className="lg:col-span-4 bg-[#14120E] border border-[#2C261F] rounded-2xl p-5 space-y-3">
            <h3 className="font-serif font-bold text-lg text-[#F7D070] pb-2 border-b border-[#2C261F]">
              Traditional Games ({gameList.length})
            </h3>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {gameList.map((game) => (
                <button
                  key={game.id}
                  onClick={() => handleSelectGame(game)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    selectedGame.id === game.id
                      ? 'bg-[#1C1914] border-[#E5A93C] text-[#F7D070] shadow-md'
                      : 'bg-[#0B0A08] border-[#2C261F] text-[#F5F1EA] hover:border-[#E5A93C]/50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-12 h-12 rounded-lg object-cover border border-[#2C261F] shrink-0"
                    />
                    <div className="truncate">
                      <div className="text-xs font-semibold truncate">{game.name}</div>
                      <div className="text-[11px] text-[#A39B8E] truncate">
                        {game.country} · {game.category}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] text-[#E5A93C] font-mono shrink-0 ml-2">Edit</span>
                </button>
              ))}
            </div>
          </div>

          {/* Game Artwork & Details Editor on Right (8 cols) */}
          <div className="lg:col-span-8 bg-[#14120E] border border-[#2C261F] rounded-2xl p-6 lg:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#2C261F]">
              <div>
                <span className="text-xs text-[#E5A93C] font-semibold uppercase tracking-wider">
                  Game #{selectedGame.id} Artwork & Registry
                </span>
                <h2 className="font-serif font-bold text-2xl text-[#F7D070] mt-0.5">
                  {gameFormData.name || selectedGame.name}
                </h2>
              </div>

              <button
                onClick={handleSaveGame}
                className="inline-flex items-center gap-1.5 bg-[#E5A93C] hover:bg-[#F7D070] text-[#0B0A08] font-bold text-xs px-5 py-2.5 rounded-full shadow-md transition-all hover:scale-102 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save All Changes</span>
              </button>
            </div>

            {/* Image Manager Box */}
            <div className="glass-card p-5 rounded-2xl border border-[#E5A93C]/25 space-y-4">
              <div className="text-xs text-[#F7D070] font-semibold uppercase tracking-wider flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#E5A93C]" />
                <span>Game Card Cover Image</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-center">
                {/* Current Image Preview */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-[#E5A93C]/40 bg-[#0B0A08]">
                  <img
                    src={gameImageInputUrl.trim() || gameFormData.image || selectedGame.image}
                    alt={selectedGame.name}
                    className="w-full h-full object-cover historical-sepia-img"
                  />
                  <div className="absolute top-2 left-2 z-10 glass-pill text-[10px] text-[#F7D070] px-2 py-0.5 rounded-full">
                    Current Artwork
                  </div>
                </div>

                {/* Upload or URL Controls */}
                <div className="sm:col-span-2 space-y-3 text-xs">
                  <div>
                    <label className="block text-[#A39B8E] mb-1 font-medium">Upload Image from Device:</label>
                    <label className="inline-flex items-center gap-2 bg-[#1C1914] border border-[#E5A93C]/40 hover:border-[#E5A93C] text-[#F7D070] font-semibold px-4 py-2 rounded-xl cursor-pointer transition-all">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Choose New Cover File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleFileUpload(e, (dataUrl) => {
                            setGameFormData((prev) => ({ ...prev, image: dataUrl }));
                            setGameImageInputUrl('');
                            triggerNotification('Image loaded into editor! Click Save to publish.');
                          })
                        }
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-[#A39B8E] mb-1 font-medium">Or Direct Image URL:</label>
                    <input
                      type="text"
                      placeholder="https://example.com/artwork.jpg"
                      value={gameImageInputUrl}
                      onChange={(e) => {
                        setGameImageInputUrl(e.target.value);
                        setGameFormData((prev) => ({ ...prev, image: e.target.value }));
                      }}
                      className="w-full glass-input rounded-xl px-3 py-2 text-xs text-[#F5F1EA] outline-hidden focus:border-[#E5A93C]"
                    />
                  </div>
                </div>
              </div>

              {/* Gallery Presets Pick */}
              <div className="pt-3 border-t border-[#2C261F]/60">
                <span className="text-[11px] text-[#A39B8E] block mb-2 font-medium">
                  Quick-Pick Gallery Preset:
                </span>
                <div className="flex flex-wrap gap-2">
                  {GALLERY_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setGameFormData((prev) => ({ ...prev, image: preset.url }));
                        setGameImageInputUrl(preset.url);
                      }}
                      className="px-2.5 py-1 text-[11px] glass-pill hover:border-[#E5A93C] rounded-lg text-[#F5F1EA] cursor-pointer"
                    >
                      {preset.title.split(' ')[0]} {preset.title.split(' ')[1]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Game Info Form Fields */}
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A39B8E] mb-1 font-medium">Game Name</label>
                  <input
                    type="text"
                    value={gameFormData.name || ''}
                    onChange={(e) => setGameFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-[#0B0A08] border border-[#2C261F] rounded-xl px-3.5 py-2 text-xs text-[#F5F1EA] focus:border-[#E5A93C] outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[#A39B8E] mb-1 font-medium">Country / Traditional Community</label>
                  <input
                    type="text"
                    value={gameFormData.country || ''}
                    onChange={(e) => setGameFormData((prev) => ({ ...prev, country: e.target.value }))}
                    className="w-full bg-[#0B0A08] border border-[#2C261F] rounded-xl px-3.5 py-2 text-xs text-[#F5F1EA] focus:border-[#E5A93C] outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#A39B8E] mb-1 font-medium">Summary Description</label>
                <textarea
                  rows={2}
                  value={gameFormData.description || ''}
                  onChange={(e) => setGameFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full bg-[#0B0A08] border border-[#2C261F] rounded-xl p-3 text-xs text-[#F5F1EA] focus:border-[#E5A93C] outline-hidden resize-none"
                />
              </div>

              <div>
                <label className="block text-[#A39B8E] mb-1 font-medium">Historical Context & Lore</label>
                <textarea
                  rows={3}
                  value={gameFormData.history || ''}
                  onChange={(e) => setGameFormData((prev) => ({ ...prev, history: e.target.value }))}
                  className="w-full bg-[#0B0A08] border border-[#2C261F] rounded-xl p-3 text-xs text-[#F5F1EA] focus:border-[#E5A93C] outline-hidden"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Heritage Stories Images Manager */}
      {activeAdminTab === 'stories' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Story List on Left (4 cols) */}
          <div className="lg:col-span-4 bg-[#14120E] border border-[#2C261F] rounded-2xl p-5 space-y-3">
            <h3 className="font-serif font-bold text-lg text-[#F7D070] pb-2 border-b border-[#2C261F]">
              Heritage Essays ({storyList.length})
            </h3>

            <div className="space-y-2">
              {storyList.map((story) => (
                <button
                  key={story.id}
                  onClick={() => handleSelectStory(story)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    selectedStory.id === story.id
                      ? 'bg-[#1C1914] border-[#E5A93C] text-[#F7D070] shadow-md'
                      : 'bg-[#0B0A08] border-[#2C261F] text-[#F5F1EA] hover:border-[#E5A93C]/50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-12 h-12 rounded-lg object-cover border border-[#2C261F] shrink-0"
                    />
                    <div className="truncate">
                      <div className="text-xs font-semibold truncate">{story.title}</div>
                      <div className="text-[11px] text-[#A39B8E]">{story.category}</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#E5A93C] font-mono shrink-0 ml-2">Edit</span>
                </button>
              ))}
            </div>
          </div>

          {/* Story Editor on Right (8 cols) */}
          <div className="lg:col-span-8 bg-[#14120E] border border-[#2C261F] rounded-2xl p-6 lg:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#2C261F]">
              <div>
                <span className="text-xs text-[#E5A93C] font-semibold uppercase tracking-wider">
                  Story #{selectedStory.id} Image & Essay
                </span>
                <h2 className="font-serif font-bold text-2xl text-[#F7D070] mt-0.5">
                  {storyFormData.title || selectedStory.title}
                </h2>
              </div>

              <button
                onClick={handleSaveStory}
                className="inline-flex items-center gap-1.5 bg-[#E5A93C] hover:bg-[#F7D070] text-[#0B0A08] font-bold text-xs px-5 py-2.5 rounded-full shadow-md transition-all hover:scale-102 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Story Artwork</span>
              </button>
            </div>

            {/* Story Image Box */}
            <div className="glass-card p-5 rounded-2xl border border-[#E5A93C]/25 space-y-4">
              <div className="text-xs text-[#F7D070] font-semibold uppercase tracking-wider flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#E5A93C]" />
                <span>Story Header Image</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-center">
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden border-2 border-[#E5A93C]/40 bg-[#0B0A08]">
                  <img
                    src={storyImageInputUrl.trim() || storyFormData.image || selectedStory.image}
                    alt={selectedStory.title}
                    className="w-full h-full object-cover historical-sepia-img"
                  />
                  <div className="absolute top-2 left-2 z-10 glass-pill text-[10px] text-[#F7D070] px-2 py-0.5 rounded-full">
                    Story Cover
                  </div>
                </div>

                <div className="sm:col-span-2 space-y-3 text-xs">
                  <div>
                    <label className="block text-[#A39B8E] mb-1 font-medium">Upload Story Image:</label>
                    <label className="inline-flex items-center gap-2 bg-[#1C1914] border border-[#E5A93C]/40 hover:border-[#E5A93C] text-[#F7D070] font-semibold px-4 py-2 rounded-xl cursor-pointer transition-all">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Choose New Story Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleFileUpload(e, (dataUrl) => {
                            setStoryFormData((prev) => ({ ...prev, image: dataUrl }));
                            setStoryImageInputUrl('');
                            triggerNotification('Story photo loaded into editor! Click Save to publish.');
                          })
                        }
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-[#A39B8E] mb-1 font-medium">Or Direct Image URL:</label>
                    <input
                      type="text"
                      placeholder="https://example.com/story-banner.jpg"
                      value={storyImageInputUrl}
                      onChange={(e) => {
                        setStoryImageInputUrl(e.target.value);
                        setStoryFormData((prev) => ({ ...prev, image: e.target.value }));
                      }}
                      className="w-full glass-input rounded-xl px-3 py-2 text-xs text-[#F5F1EA] outline-hidden focus:border-[#E5A93C]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Story Content Form Fields */}
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[#A39B8E] mb-1 font-medium">Story Title</label>
                <input
                  type="text"
                  value={storyFormData.title || ''}
                  onChange={(e) => setStoryFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-[#0B0A08] border border-[#2C261F] rounded-xl px-3.5 py-2 text-xs text-[#F5F1EA] focus:border-[#E5A93C] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[#A39B8E] mb-1 font-medium">Summary</label>
                <textarea
                  rows={2}
                  value={storyFormData.summary || ''}
                  onChange={(e) => setStoryFormData((prev) => ({ ...prev, summary: e.target.value }))}
                  className="w-full bg-[#0B0A08] border border-[#2C261F] rounded-xl p-3 text-xs text-[#F5F1EA] focus:border-[#E5A93C] outline-hidden resize-none"
                />
              </div>

              <div>
                <label className="block text-[#A39B8E] mb-1 font-medium">Essay Narrative</label>
                <textarea
                  rows={5}
                  value={storyFormData.content || ''}
                  onChange={(e) => setStoryFormData((prev) => ({ ...prev, content: e.target.value }))}
                  className="w-full bg-[#0B0A08] border border-[#2C261F] rounded-xl p-3 text-xs text-[#F5F1EA] focus:border-[#E5A93C] outline-hidden leading-relaxed"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
