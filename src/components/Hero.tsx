import { ArrowRight, Trophy, Sparkles } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onPlayOware: () => void;
}

export default function Hero({ onExplore, onPlayOware }: HeroProps) {
  return (
    <section className="relative bg-[#0B0A08] overflow-hidden border-b border-[#2C261F]">
      {/* Background Ghanaian Courtyard Imagery with refined radial gradient overlay */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[62%]">
        <img
          src="/src/assets/images/ghana_hero_banner_1794255705201.jpg"
          alt="Authentic Ghanaian children and youth playing traditional games in courtyard"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Editorial Scrim to preserve full readability on left while showing beautiful Ghanaian scene */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0A08] via-[#0B0A08]/85 lg:via-[#0B0A08]/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08] via-transparent to-transparent lg:hidden"></div>
      </div>

      <div className="relative max-w-[1440px] mx-auto px-5 lg:px-12 py-20 lg:py-28 flex items-center min-h-[520px]">
        <div className="max-w-[640px]">
          {/* Metadata kicker: clean unboxed text */}
          <div className="flex items-center gap-2 text-xs text-[#E5A93C] font-semibold tracking-widest uppercase mb-4">
            <span>Ghanaian Traditional Games</span>
            <span aria-hidden="true" className="text-[#A39B8E]">·</span>
            <span className="text-[#F7D070]">Akan, Ga, Ewe & Dagbon Heritage</span>
          </div>

          <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-[60px] leading-[1.08] text-[#F5F1EA]">
            <span>Timeless Games.</span>
            <br />
            <span className="text-[#F7D070] italic">Endless Heritage.</span>
          </h1>

          <p className="text-base sm:text-lg leading-relaxed text-[#F5F1EA]/90 mt-5 max-w-xl">
            From the strategic Akan courts of <strong className="text-[#F7D070] font-semibold">Oware</strong> and the rhythmic leaps of <strong className="text-[#F7D070] font-semibold">Ampe</strong> to the high-energy street wickets of <strong className="text-[#F7D070] font-semibold">Chaskele</strong>—experience Ghana’s ancestral games in vivid detail.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-8">
            <button
              onClick={onPlayOware}
              className="inline-flex items-center gap-2 bg-[#E5A93C] hover:bg-[#F7D070] text-[#0B0A08] font-semibold text-sm px-7 h-12 rounded-full transition-all hover:scale-105 shadow-[0_0_25px_rgba(229,169,60,0.4)] cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-[#0B0A08]" />
              <span>Play Oware Online</span>
            </button>

            <button
              onClick={onExplore}
              className="inline-flex items-center gap-2 border border-[#E5A93C]/70 hover:border-[#E5A93C] text-[#F7D070] hover:text-[#F5F1EA] text-sm font-medium px-6 h-12 rounded-full transition-all hover:bg-[#14120E] cursor-pointer"
            >
              <span>Explore All Games</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick cultural trust stats */}
          <div className="grid grid-cols-3 gap-6 pt-8 mt-8 border-t border-[#2C261F]/80 max-w-lg">
            <div>
              <div className="font-serif text-2xl font-bold text-[#F7D070] tabular-nums">48</div>
              <div className="text-xs text-[#A39B8E] mt-0.5">Oware Nickar Seeds</div>
            </div>
            <div>
              <div className="font-serif text-2xl font-bold text-[#E5A93C] tabular-nums">100%</div>
              <div className="text-xs text-[#A39B8E] mt-0.5">Ghanaian Authenticity</div>
            </div>
            <div>
              <div className="font-serif text-2xl font-bold text-[#F7D070] tabular-nums">6+</div>
              <div className="text-xs text-[#A39B8E] mt-0.5">Classic Sports & Puzzles</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
