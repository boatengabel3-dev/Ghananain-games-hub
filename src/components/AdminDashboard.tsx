import { useState } from 'react';
import { GameItem } from '../types';
import { ArrowLeft, Plus, Trash2, Edit3, Save, Shield, CheckCircle, RefreshCcw } from 'lucide-react';

interface AdminDashboardProps {
  games: GameItem[];
  onBack: () => void;
  onUpdateGames: (updated: GameItem[]) => void;
}

export default function AdminDashboard({ games, onBack, onUpdateGames }: AdminDashboardProps) {
  const [gameList, setGameList] = useState<GameItem[]>(games);
  const [selectedGame, setSelectedGame] = useState<GameItem | null>(games[0] || null);
  const [isEditing, setIsEditing] = useState(false);
  const [saveNotification, setSaveNotification] = useState<string | null>(null);

  // Form states for selected game
  const [formData, setFormData] = useState<Partial<GameItem>>({});

  const handleSelectGame = (game: GameItem) => {
    setSelectedGame(game);
    setFormData(game);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof GameItem, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGame || !formData.id) return;

    const updated = gameList.map(g => g.id === selectedGame.id ? { ...g, ...formData } as GameItem : g);
    setGameList(updated);
    onUpdateGames(updated);
    setSelectedGame({ ...selectedGame, ...formData } as GameItem);
    setIsEditing(false);
    setSaveNotification(`Successfully updated "${formData.name}" archive entry!`);

    setTimeout(() => {
      setSaveNotification(null);
    }, 3000);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-5 lg:px-12 py-12">
      {/* Top Bar Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#2C261F]">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs text-[#E5A93C] hover:text-[#F7D070] font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Site</span>
          </button>
          <span className="text-[#A39B8E]">|</span>
          <div className="flex items-center gap-2 text-xs text-[#E5A93C] font-semibold uppercase tracking-wider">
            <Shield className="w-4 h-4 text-[#E5A93C]" />
            <span>Curator & Archive Administration Console</span>
          </div>
        </div>

        <div className="text-xs text-[#A39B8E]">
          Active Curator Session: <strong className="text-[#F5F1EA]">Ghana National Heritage Registry</strong>
        </div>
      </div>

      {saveNotification && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2.5">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{saveNotification}</span>
        </div>
      )}

      {/* Main Admin Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Game List (4 cols) */}
        <div className="lg:col-span-4 bg-[#14120E] border border-[#2C261F] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif font-bold text-lg text-[#F7D070]">
              Registered Games ({gameList.length})
            </h3>
          </div>

          <div className="space-y-2">
            {gameList.map(game => (
              <button
                key={game.id}
                onClick={() => handleSelectGame(game)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                  selectedGame?.id === game.id
                    ? 'bg-[#1C1914] border-[#E5A93C] text-[#F7D070]'
                    : 'bg-[#0B0A08] border-[#2C261F] text-[#F5F1EA] hover:border-[#E5A93C]/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-10 h-10 rounded-lg object-cover border border-[#2C261F]"
                  />
                  <div>
                    <div className="text-xs font-semibold">{game.name}</div>
                    <div className="text-[11px] text-[#A39B8E]">{game.country} · {game.category}</div>
                  </div>
                </div>
                {game.playableType && game.playableType !== 'none' && (
                  <span className="text-[10px] text-[#0B0A08] bg-[#E5A93C] font-bold px-2 py-0.5 rounded-full">
                    Playable
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Game Editor / Inspector (8 cols) */}
        <div className="lg:col-span-8 bg-[#14120E] border border-[#2C261F] rounded-2xl p-6 lg:p-8">
          {selectedGame ? (
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#2C261F] mb-6">
                <div>
                  <div className="text-xs text-[#E5A93C] font-semibold uppercase tracking-wider">
                    Archive Record #{selectedGame.id}
                  </div>
                  <h2 className="font-serif font-bold text-2xl text-[#F7D070] mt-1">
                    {selectedGame.name}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  {!isEditing ? (
                    <button
                      onClick={() => {
                        setFormData(selectedGame);
                        setIsEditing(true);
                      }}
                      className="inline-flex items-center gap-1.5 bg-[#E5A93C] text-[#0B0A08] text-xs font-bold px-4 py-2 rounded-full hover:bg-[#F7D070] transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Entry</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(false)}
                      className="text-xs text-[#A39B8E] hover:text-[#F5F1EA] px-3 py-1.5"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              {isEditing ? (
                <form onSubmit={handleSave} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#A39B8E] mb-1 font-medium">Game Name</label>
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full bg-[#0B0A08] border border-[#2C261F] rounded-xl px-3.5 py-2.5 text-xs text-[#F5F1EA] focus:border-[#E5A93C] outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#A39B8E] mb-1 font-medium">Region / Country</label>
                      <input
                        type="text"
                        value={formData.country || ''}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className="w-full bg-[#0B0A08] border border-[#2C261F] rounded-xl px-3.5 py-2.5 text-xs text-[#F5F1EA] focus:border-[#E5A93C] outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-[#A39B8E] mb-1 font-medium">Category</label>
                      <select
                        value={formData.category || 'board'}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full bg-[#0B0A08] border border-[#2C261F] rounded-xl px-3 py-2.5 text-xs text-[#F5F1EA] focus:border-[#E5A93C] outline-none"
                      >
                        <option value="board">Board Game</option>
                        <option value="active">Active & Physical</option>
                        <option value="children">Children's Game</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-[#A39B8E] mb-1 font-medium">Subcategory</label>
                      <input
                        type="text"
                        value={formData.subcategory || ''}
                        onChange={(e) => handleInputChange('subcategory', e.target.value)}
                        className="w-full bg-[#0B0A08] border border-[#2C261F] rounded-xl px-3.5 py-2.5 text-xs text-[#F5F1EA] focus:border-[#E5A93C] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#A39B8E] mb-1 font-medium">Difficulty Level</label>
                      <select
                        value={formData.difficulty || 'Easy'}
                        onChange={(e) => handleInputChange('difficulty', e.target.value)}
                        className="w-full bg-[#0B0A08] border border-[#2C261F] rounded-xl px-3 py-2.5 text-xs text-[#F5F1EA] focus:border-[#E5A93C] outline-none"
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#A39B8E] mb-1 font-medium">Summary Description</label>
                    <textarea
                      rows={2}
                      value={formData.description || ''}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="w-full bg-[#0B0A08] border border-[#2C261F] rounded-xl p-3 text-xs text-[#F5F1EA] focus:border-[#E5A93C] outline-none resize-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#A39B8E] mb-1 font-medium">Historical Context & Lore</label>
                    <textarea
                      rows={4}
                      value={formData.history || ''}
                      onChange={(e) => handleInputChange('history', e.target.value)}
                      className="w-full bg-[#0B0A08] border border-[#2C261F] rounded-xl p-3 text-xs text-[#F5F1EA] focus:border-[#E5A93C] outline-none"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-[#2C261F]">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-5 py-2.5 rounded-full text-xs text-[#A39B8E] hover:text-[#F5F1EA]"
                    >
                      Discard Changes
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 bg-[#E5A93C] hover:bg-[#F7D070] text-[#0B0A08] font-bold text-xs px-6 py-2.5 rounded-full shadow-md"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save to Archive</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-[#0B0A08] border border-[#2C261F] text-xs">
                    <div>
                      <span className="text-[#A39B8E] block">Tradition</span>
                      <strong className="text-[#F5F1EA]">{selectedGame.country}</strong>
                    </div>
                    <div>
                      <span className="text-[#A39B8E] block">Format</span>
                      <strong className="text-[#F5F1EA]">{selectedGame.category} ({selectedGame.subcategory})</strong>
                    </div>
                    <div>
                      <span className="text-[#A39B8E] block">Complexity</span>
                      <strong className="text-[#F5F1EA]">{selectedGame.difficulty}</strong>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-[#E5A93C] uppercase tracking-wider mb-2">Description</h4>
                    <p className="text-sm leading-relaxed text-[#F5F1EA]/90">{selectedGame.longDescription || selectedGame.description}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-[#E5A93C] uppercase tracking-wider mb-2">Oral History</h4>
                    <p className="text-sm leading-relaxed text-[#F5F1EA]/90">{selectedGame.history}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-[#E5A93C] uppercase tracking-wider mb-2">Rules ({selectedGame.rules.length})</h4>
                    <ul className="space-y-1.5 list-disc list-inside text-xs text-[#F5F1EA]/85">
                      {selectedGame.rules.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-20 text-[#A39B8E] text-xs">
              Select a game from the left to inspect or edit records.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
