import { X, Play, Globe, Users, Award, BookOpen, Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import { GameItem } from '../types';

interface GameDetailModalProps {
  game: GameItem;
  onClose: () => void;
  onPlay: (gameId: string) => void;
}

export default function GameDetailModal({ game, onClose, onPlay }: GameDetailModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="glass-panel border border-[#E5A93C]/35 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative animate-in fade-in-0 zoom-in-95">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#0B0A08]/90 border border-[#2C261F] text-[#F5F1EA] flex items-center justify-center hover:bg-[#E5A93C] hover:text-[#0B0A08] transition-colors cursor-pointer shadow-md"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Authentic Ghanaian Image Banner with Grain and Sepia */}
        <div className="relative aspect-[16/8] sm:aspect-[16/7] w-full overflow-hidden rounded-t-3xl bg-[#1C1914]">
          <img
            src={game.image}
            alt={game.name}
            className="w-full h-full object-cover historical-sepia-img"
            referrerPolicy="no-referrer"
          />
          <div className="grain-overlay"></div>
          <div className="warm-vignette"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08] via-[#0B0A08]/50 to-transparent"></div>
          
          <div className="absolute bottom-4 left-6 sm:bottom-6 sm:left-8 z-10">
            <span className="glass-pill text-[#F7D070] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#E5A93C]/40">
              🇬🇭 {game.country} · {game.subcategory}
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#F7D070] mt-2">
              {game.name}
            </h2>
          </div>
        </div>

        {/* Modal Details Content */}
        <div className="p-6 sm:p-8 space-y-7">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#A39B8E]">
            <div className="flex items-center gap-1.5 glass-pill px-3.5 py-1.5 rounded-full">
              <Globe className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span>Cultural Origin: <strong className="text-[#F5F1EA]">{game.culturalOrigin || game.country}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 glass-pill px-3.5 py-1.5 rounded-full">
              <Users className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span>Format: <strong className="text-[#F5F1EA]">{game.players}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 glass-pill px-3.5 py-1.5 rounded-full">
              <Award className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span>Tactical Mastery: <strong className="text-[#E5A93C]">{game.difficulty}</strong></span>
            </div>
          </div>

          {/* Cultural Proverb if available */}
          {game.proverb && (
            <div className="glass-card p-4 rounded-2xl border-l-4 border-l-[#E5A93C] flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#E5A93C] shrink-0 mt-0.5" />
              <div>
                <p className="font-serif italic text-sm sm:text-base text-[#F7D070]">
                  "{game.proverb.text}"
                </p>
                <p className="text-xs text-[#A39B8E] mt-1 font-sans">
                  Akan Proverb Wisdom: {game.proverb.meaning}
                </p>
              </div>
            </div>
          )}

          {/* Cultural Overview */}
          <div>
            <h3 className="text-xs font-semibold text-[#E5A93C] uppercase tracking-wider mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#E5A93C]" />
              <span>Cultural Overview & Provenance</span>
            </h3>
            <p className="text-sm leading-relaxed text-[#F5F1EA]/90 font-light">
              {game.longDescription}
            </p>
          </div>

          {/* History */}
          <div>
            <h3 className="text-xs font-semibold text-[#E5A93C] uppercase tracking-wider mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#E5A93C]" />
              <span>Historical Legacy & Living Significance</span>
            </h3>
            <p className="text-sm leading-relaxed text-[#F5F1EA]/90 font-light">
              {game.history}
            </p>
          </div>

          {/* Equipment Specifications */}
          {game.equipment && game.equipment.length > 0 && (
            <div className="glass-card p-4 sm:p-5 rounded-2xl">
              <h3 className="text-xs font-semibold text-[#E5A93C] uppercase tracking-wider mb-3">
                Traditional Equipment & Materials
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#F5F1EA]/90">
                {game.equipment.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E5A93C] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Complete Rules of Play */}
          <div>
            <h3 className="text-xs font-semibold text-[#E5A93C] uppercase tracking-wider mb-3">
              Official Traditional Rules of Play
            </h3>
            <ul className="space-y-2.5">
              {game.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[#F5F1EA]/90">
                  <span className="w-6 h-6 rounded-full bg-[#E5A93C]/20 border border-[#E5A93C]/40 text-[#E5A93C] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tactics & Strategy */}
          {game.tactics && game.tactics.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-[#E5A93C] uppercase tracking-wider mb-3">
                Master Tactics & Heritage Strategies
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {game.tactics.map((tactic, idx) => (
                  <div key={idx} className="glass-card p-3.5 rounded-xl text-xs text-[#F5F1EA]/85">
                    <p className="font-semibold text-[#F7D070] mb-1">{tactic.split(':')[0]}</p>
                    <p className="text-[11px] text-[#A39B8E] leading-normal">{tactic.split(':')[1] || tactic}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Akan / Ga Terminology */}
          {game.akanTerminology && game.akanTerminology.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-[#E5A93C] uppercase tracking-wider mb-3">
                Authentic Akan & Ga Terminology
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {game.akanTerminology.map((term, idx) => (
                  <div key={idx} className="glass-card p-3 rounded-xl">
                    <div className="font-bold text-[#E5A93C] text-xs">{term.term}</div>
                    <div className="text-[10px] text-[#A39B8E] mt-0.5 leading-tight">{term.meaning}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-4 border-t border-[#2C261F]/60 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full text-xs font-medium text-[#A39B8E] hover:text-[#F5F1EA] cursor-pointer"
            >
              Close Archive Details
            </button>
            {game.playableType && game.playableType !== 'none' && (
              <button
                onClick={() => {
                  onClose();
                  onPlay(game.id);
                }}
                className="inline-flex items-center gap-2 bg-[#E5A93C] hover:bg-[#F7D070] text-[#0B0A08] font-bold px-8 py-3 rounded-full hover:scale-105 transition-all shadow-[0_0_25px_rgba(229,169,60,0.45)] cursor-pointer"
              >
                <Play className="w-4 h-4 fill-[#0B0A08]" />
                <span>Launch Interactive Game</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
