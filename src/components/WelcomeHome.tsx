import { ArrowRight, Sparkles, BookOpen, Compass, Shield } from 'lucide-react';

interface WelcomeHomeProps {
  onExploreGames: () => void;
  onPlayGame: (id: string) => void;
  onConsultElder: () => void;
  onOpenStories: () => void;
  heroImage?: string;
}

export default function WelcomeHome({
  onExploreGames,
  onPlayGame,
  onConsultElder,
  onOpenStories,
  heroImage,
}: WelcomeHomeProps) {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Full Hero Welcoming Section with Warm Image Background & Film Grain */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroImage || "/src/assets/images/ghana_hero_banner_1794255705201.jpg"}
          alt="Ghanaian traditional games banner"
          className="w-full h-full object-cover object-center scale-105 transform duration-1000 ease-out historical-sepia-img"
          referrerPolicy="no-referrer"
        />
        {/* Subtle Analog Film Grain Texture Overlay */}
        <div className="grain-overlay" />
        {/* Warm Vignette and Multi-layered Scrim */}
        <div className="warm-vignette" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08] via-[#0B0A08]/75 to-[#0B0A08]/85" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0B0A08]/40 to-[#0B0A08]/90" />
      </div>

      {/* Hero Welcoming Content - Pure Landing Page with Glassmorphism Template */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20 lg:py-24 flex flex-col items-center text-center">
        {/* Simplified, Clean Akwaaba Badge (Replaces cluttered writing from image) */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-pill text-xs font-medium tracking-wide mb-6 sm:mb-8 shadow-xl border border-[#E5A93C]/35 backdrop-blur-xl animate-in fade-in-0 duration-500">
          <span className="text-sm">🇬🇭</span>
          <span className="text-[#F7D070] font-semibold">Akwaaba · Ghana Traditional Games</span>
        </div>

        <h1 className="font-serif font-bold text-3xl sm:text-5xl lg:text-7xl leading-[1.12] text-[#F5F1EA] tracking-tight max-w-4xl">
          <span>Play Ghana’s Soul.</span>
          <br />
          <span className="text-[#F7D070] italic">Preserve Our Living Heritage.</span>
        </h1>

        <p className="text-sm sm:text-lg leading-relaxed text-[#F5F1EA]/85 mt-5 sm:mt-6 max-w-2xl font-light px-2">
          Welcome to Ghana’s living cultural digital sanctuary of traditional games. Step into the tactical Akan royal courts of <strong className="text-[#F7D070] font-medium">Oware</strong>, feel the rhythmic leaps of <strong className="text-[#F7D070] font-medium">Ampe</strong>, master the street strategy of <strong className="text-[#F7D070] font-medium">Chaskele</strong>, and rediscover the timeless wisdom of Ghanaian childhood.
        </p>

        {/* Action CTAs with Glass Highlights (Play Oware button removed per user request) */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mt-8 sm:mt-10">
          <button
            onClick={onExploreGames}
            className="inline-flex items-center gap-2.5 bg-[#E5A93C] hover:bg-[#F7D070] text-[#0B0A08] font-bold text-xs sm:text-sm px-7 sm:px-8 h-12 sm:h-13 rounded-full transition-all hover:scale-105 shadow-[0_0_30px_rgba(229,169,60,0.4)] cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#0B0A08]" />
            <span>Explore All Traditional Games</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onConsultElder}
            className="inline-flex items-center gap-2 glass-pill border-[#E5A93C]/40 hover:border-[#E5A93C] text-[#F7D070] text-xs sm:text-sm font-medium px-6 h-12 sm:h-13 rounded-full transition-all cursor-pointer shadow-lg hover:scale-102 backdrop-blur-xl"
          >
            <Sparkles className="w-4 h-4 text-[#E5A93C]" />
            <span>Consult Nana Kwame (AI Elder)</span>
          </button>
        </div>

        {/* 3D Glassmorphic Cultural Pillars Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 pt-10 sm:pt-14 mt-10 sm:mt-12 border-t border-[#2C261F]/70 w-full text-left">
          <div
            onClick={onExploreGames}
            className="glass-card glass-card-interactive p-4 sm:p-5 rounded-2xl cursor-pointer hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-[10px] sm:text-[11px] text-[#E5A93C] font-semibold uppercase tracking-wider">Akan Royal Origin</div>
            <div className="font-serif text-base sm:text-lg font-bold text-[#F5F1EA] mt-1">Oware & Dame</div>
            <div className="text-xs text-[#A39B8E] mt-1">Sacred nickar seeds, tactical arithmetic & flying kings</div>
          </div>

          <div
            onClick={onExploreGames}
            className="glass-card glass-card-interactive p-4 sm:p-5 rounded-2xl cursor-pointer hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-[10px] sm:text-[11px] text-[#E5A93C] font-semibold uppercase tracking-wider">Rhythm & Athleticism</div>
            <div className="font-serif text-base sm:text-lg font-bold text-[#F5F1EA] mt-1">Ampe & Pilolo</div>
            <div className="text-xs text-[#A39B8E] mt-1">Chants, synchronized jumps & twilight sprints</div>
          </div>

          <div
            onClick={onExploreGames}
            className="glass-card glass-card-interactive p-4 sm:p-5 rounded-2xl cursor-pointer hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-[10px] sm:text-[11px] text-[#E5A93C] font-semibold uppercase tracking-wider">Street Ingenuity</div>
            <div className="font-serif text-base sm:text-lg font-bold text-[#F5F1EA] mt-1">Chaskele</div>
            <div className="text-xs text-[#A39B8E] mt-1">Geisha mackerel tins & hand-whittled bats</div>
          </div>

          <div
            onClick={onOpenStories}
            className="glass-card glass-card-interactive p-4 sm:p-5 rounded-2xl cursor-pointer hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-[10px] sm:text-[11px] text-[#E5A93C] font-semibold uppercase tracking-wider">Oral Heritage</div>
            <div className="font-serif text-base sm:text-lg font-bold text-[#F5F1EA] mt-1">Akan Proverbs</div>
            <div className="text-xs text-[#A39B8E] mt-1">Nyansapo wisdom & historical essays</div>
          </div>
        </div>
      </div>
    </div>
  );
}
