import { ArrowRight, Trophy, Sparkles, BookOpen, Compass } from 'lucide-react';

interface WelcomeHomeProps {
  onExploreGames: () => void;
  onPlayGame: (id: string) => void;
  onConsultElder: () => void;
  onOpenStories: () => void;
}

export default function WelcomeHome({
  onExploreGames,
  onPlayGame,
  onConsultElder,
  onOpenStories,
}: WelcomeHomeProps) {
  return (
    <div className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Full Hero Welcoming Section with Full Image Background & Subtle Historical Grain & Sepia */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/src/assets/images/ghana_hero_banner_1794255705201.jpg"
          alt="Ghanaian children playing traditional games in a sunlit courtyard"
          className="w-full h-full object-cover object-center scale-105 transform duration-1000 ease-out historical-sepia-img"
          referrerPolicy="no-referrer"
        />
        {/* Subtle Authentic Analog Film Grain Texture Overlay */}
        <div className="grain-overlay"></div>
        {/* Warm Vignette and Multi-layered Scrim */}
        <div className="warm-vignette"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08] via-[#0B0A08]/75 to-[#0B0A08]/85"></div>
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0B0A08]/40 to-[#0B0A08]/90"></div>
      </div>

      {/* Hero Welcoming Content - Pure Landing Page */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 py-20 lg:py-28 flex flex-col items-center text-center">
        {/* Akwaaba Badge with Glassmorphism */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-pill text-[#E5A93C] text-xs font-semibold uppercase tracking-widest mb-8 shadow-xl">
          <span className="text-sm">🇬🇭</span>
          <span className="text-[#F7D070]">Akwaaba! Welcome to Ghana Games</span>
          <span aria-hidden="true" className="text-[#A39B8E]">·</span>
          <span className="text-[#E5A93C]">Heritage Archive</span>
        </div>

        <h1 className="font-serif font-bold text-4xl sm:text-6xl lg:text-7xl leading-[1.08] text-[#F5F1EA] tracking-tight">
          <span>Play Ghana’s Soul.</span>
          <br />
          <span className="text-[#F7D070] italic">Preserve Our Living Heritage.</span>
        </h1>

        <p className="text-base sm:text-xl leading-relaxed text-[#F5F1EA]/90 mt-6 max-w-2xl font-light">
          Welcome to the definitive cultural digital home of traditional Ghanaian games. Step into the tactical Akan royal courts of <strong className="text-[#F7D070] font-medium">Oware</strong>, feel the rhythmic leaps of <strong className="text-[#F7D070] font-medium">Ampe</strong>, master the street strategy of <strong className="text-[#F7D070] font-medium">Chaskele</strong>, and rediscover the golden joy of Ghanaian childhood.
        </p>

        {/* Action CTAs with Glass Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <button
            onClick={() => onPlayGame('oware')}
            className="inline-flex items-center gap-2.5 bg-[#E5A93C] hover:bg-[#F7D070] text-[#0B0A08] font-bold text-sm px-8 h-13 rounded-full transition-all hover:scale-105 shadow-[0_0_35px_rgba(229,169,60,0.45)] cursor-pointer"
          >
            <Trophy className="w-4 h-4 text-[#0B0A08]" />
            <span>Play Oware (Mancala) Online</span>
          </button>

          <button
            onClick={onExploreGames}
            className="inline-flex items-center gap-2 glass-pill hover:border-[#E5A93C] text-[#F5F1EA] hover:text-[#F7D070] text-sm font-semibold px-7 h-13 rounded-full transition-all cursor-pointer shadow-lg hover:scale-102"
          >
            <Compass className="w-4 h-4 text-[#E5A93C]" />
            <span>Explore All Ghanaian Games</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onConsultElder}
            className="inline-flex items-center gap-2 glass-pill border-[#E5A93C]/40 hover:border-[#E5A93C] text-[#F7D070] text-sm font-medium px-6 h-13 rounded-full transition-all cursor-pointer shadow-lg hover:scale-102"
          >
            <Sparkles className="w-4 h-4 text-[#E5A93C]" />
            <span>Ask Nana Kwame (AI Elder)</span>
          </button>
        </div>

        {/* Glassmorphic Cultural Pillars Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-12 mt-12 border-t border-[#2C261F]/70 w-full text-left">
          <div
            onClick={onExploreGames}
            className="glass-card glass-card-interactive p-4 sm:p-5 rounded-2xl cursor-pointer"
          >
            <div className="text-[11px] text-[#E5A93C] font-semibold uppercase tracking-wider">Akan Royal Origin</div>
            <div className="font-serif text-lg font-bold text-[#F5F1EA] mt-1">Oware & Dame</div>
            <div className="text-xs text-[#A39B8E] mt-1">Kings, Nickar seeds & tactical arithmetic</div>
          </div>

          <div
            onClick={onExploreGames}
            className="glass-card glass-card-interactive p-4 sm:p-5 rounded-2xl cursor-pointer"
          >
            <div className="text-[11px] text-[#E5A93C] font-semibold uppercase tracking-wider">Rhythm & Athleticism</div>
            <div className="font-serif text-lg font-bold text-[#F5F1EA] mt-1">Ampe & Pilolo</div>
            <div className="text-xs text-[#A39B8E] mt-1">Chants, synchronized jumps & twilight sprints</div>
          </div>

          <div
            onClick={onExploreGames}
            className="glass-card glass-card-interactive p-4 sm:p-5 rounded-2xl cursor-pointer"
          >
            <div className="text-[11px] text-[#E5A93C] font-semibold uppercase tracking-wider">Street Ingenuity</div>
            <div className="font-serif text-lg font-bold text-[#F5F1EA] mt-1">Chaskele</div>
            <div className="text-xs text-[#A39B8E] mt-1">Geisha mackerel tins & hand-whittled bats</div>
          </div>

          <div
            onClick={onOpenStories}
            className="glass-card glass-card-interactive p-4 sm:p-5 rounded-2xl cursor-pointer"
          >
            <div className="text-[11px] text-[#E5A93C] font-semibold uppercase tracking-wider">Oral Heritage</div>
            <div className="font-serif text-lg font-bold text-[#F5F1EA] mt-1">Akan Proverbs</div>
            <div className="text-xs text-[#A39B8E] mt-1">Nyansapo wisdom & historical essays</div>
          </div>
        </div>
      </div>
    </div>
  );
}
