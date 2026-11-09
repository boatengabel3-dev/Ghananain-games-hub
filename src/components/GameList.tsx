import { useState } from 'react';
import { GameItem, GameCategory } from '../types';
import { Play, ArrowRight, BookOpen, Sparkles } from 'lucide-react';

interface GameListProps {
  games: GameItem[];
  searchQuery: string;
  onSelectGame: (game: GameItem) => void;
  onPlayGame: (gameId: string) => void;
}

export default function GameList({ games, searchQuery, onSelectGame, onPlayGame }: GameListProps) {
  const [activeCategory, setActiveCategory] = useState<GameCategory>('all');

  const filteredGames = games.filter(game => {
    const matchesCategory = activeCategory === 'all' || game.category === activeCategory;
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (game.subcategory && game.subcategory.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="games" className="max-w-[1440px] mx-auto px-5 lg:px-12 py-12">
      {/* Header and Filter segmented controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#2C261F]/60">
        <div>
          <div className="text-xs text-[#E5A93C] font-semibold tracking-widest uppercase mb-1 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span>Curated National Registry</span>
          </div>
          <h2 className="font-serif font-bold text-3xl lg:text-4xl text-[#F5F1EA]">
            Ghanaian Traditional Games
          </h2>
          <p className="text-sm text-[#A39B8E] mt-2 max-w-xl">
            Explore authentic rules, historical Akan & Ga roots, and interactive digital simulations designed to preserve Ghanaian living culture.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 glass-panel rounded-full self-start md:self-end">
          {[
            { id: 'all', label: 'All Ghanaian Games' },
            { id: 'board', label: 'Board & Mind Games' },
            { id: 'active', label: 'Active & Street Games' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as GameCategory)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-[#E5A93C] text-[#0B0A08] shadow-md hover:scale-102'
                  : 'text-[#A39B8E] hover:text-[#F5F1EA]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Games */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className="group rounded-3xl overflow-hidden glass-card glass-card-interactive flex flex-col"
          >
            {/* Visual Header with authentic Ghanaian photo + subtle grain & warm sepia overlay */}
            <div className="relative aspect-[4/3] overflow-hidden bg-[#1C1914]">
              <img
                src={game.image}
                alt={`${game.name} - Traditional Ghanaian Game`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 historical-sepia-img"
                referrerPolicy="no-referrer"
              />
              <div className="grain-overlay"></div>
              <div className="warm-vignette"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08] via-transparent to-transparent opacity-85"></div>
              
              <div className="absolute top-4 left-4 z-10">
                <span className="glass-pill text-[#F7D070] text-[11px] font-semibold px-3 py-1 rounded-full">
                  🇬🇭 {game.country}
                </span>
              </div>

              {game.playableType && game.playableType !== 'none' && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-[#E5A93C] text-[#0B0A08] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                    Interactive Simulation
                  </span>
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                {/* Clean unboxed metadata with separators */}
                <div className="flex items-center gap-2 text-xs text-[#A39B8E] mb-2 font-medium">
                  <span className="text-[#E5A93C]">{game.subcategory}</span>
                  <span aria-hidden="true">·</span>
                  <span>{game.players}</span>
                  <span aria-hidden="true">·</span>
                  <span>{game.difficulty}</span>
                </div>

                <h3 className="font-serif font-bold text-2xl text-[#F7D070] group-hover:text-[#E5A93C] transition-colors">
                  {game.name}
                </h3>

                <p className="text-sm text-[#F5F1EA]/85 mt-2.5 leading-relaxed line-clamp-3 font-light">
                  {game.description}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#2C261F]/60">
                <button
                  onClick={() => onSelectGame(game)}
                  className="text-xs font-semibold text-[#E5A93C] hover:text-[#F7D070] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Full Rules & Lore</span>
                </button>

                {game.playableType && game.playableType !== 'none' ? (
                  <button
                    onClick={() => onPlayGame(game.id)}
                    className="inline-flex items-center gap-1.5 bg-[#E5A93C] hover:bg-[#F7D070] text-[#0B0A08] font-bold text-xs px-4.5 py-2.5 rounded-full transition-all shadow-md hover:scale-105 cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-[#0B0A08]" />
                    <span>Play Now</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onSelectGame(game)}
                    className="text-xs text-[#A39B8E] hover:text-[#F5F1EA] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Read Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-20 glass-panel rounded-3xl">
          <p className="text-[#A39B8E] text-sm">No games found matching your search term.</p>
        </div>
      )}
    </section>
  );
}
