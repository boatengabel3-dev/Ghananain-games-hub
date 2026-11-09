interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export default function GhanaGamesLogo({ size = 'md', showSubtitle = true }: LogoProps) {
  const sizeMap = {
    sm: { container: 'w-8 h-8', text: 'text-sm', title: 'text-base', sub: 'text-[9px]' },
    md: { container: 'w-10 h-10', text: 'text-base', title: 'text-lg', sub: 'text-[10px]' },
    lg: { container: 'w-14 h-14', text: 'text-xl', title: 'text-2xl', sub: 'text-xs' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className="flex items-center gap-3 shrink-0 text-left group">
      {/* Handcrafted Ghanaian Emblem: Adinkra 'Nyansapo' Wisdom Knot / Board Game Icon */}
      <div className={`relative ${currentSize.container} rounded-xl p-[1.5px] bg-gradient-to-br from-[#E5A93C] via-[#A82D24] to-[#2B6940] shadow-[0_0_15px_rgba(229,169,60,0.35)] shrink-0`}>
        <div className="w-full h-full bg-[#0B0A08] rounded-[10px] flex items-center justify-center relative overflow-hidden backdrop-blur-md">
          {/* Adinkra-inspired geometric knot & seed icon SVG */}
          <svg viewBox="0 0 40 40" className="w-6 h-6 text-[#E5A93C]" fill="none" stroke="currentColor">
            {/* Oware board duality circles */}
            <circle cx="14" cy="14" r="4.5" stroke="currentColor" strokeWidth="2" fill="rgba(229, 169, 60, 0.2)" />
            <circle cx="26" cy="14" r="4.5" stroke="currentColor" strokeWidth="2" fill="rgba(229, 169, 60, 0.2)" />
            <circle cx="14" cy="26" r="4.5" stroke="currentColor" strokeWidth="2" fill="rgba(229, 169, 60, 0.2)" />
            <circle cx="26" cy="26" r="4.5" stroke="currentColor" strokeWidth="2" fill="rgba(229, 169, 60, 0.2)" />
            {/* Central Nyansapo wisdom knot center star */}
            <path d="M20 10 L20 30 M10 20 L30 20" stroke="#F7D070" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="20" cy="20" r="2.5" fill="#E5A93C" />
          </svg>
        </div>
      </div>

      <div className="leading-tight">
        <div className={`font-serif font-bold text-[#F7D070] ${currentSize.title} group-hover:text-[#E5A93C] transition-colors tracking-tight flex items-center gap-1.5`}>
          <span>Ghana Games</span>
          <span className="text-[10px] font-sans font-semibold text-[#E5A93C] bg-[#E5A93C]/10 px-1.5 py-0.2 rounded border border-[#E5A93C]/30">
            🇬🇭
          </span>
        </div>
        {showSubtitle && (
          <div className={`text-[#A39B8E] ${currentSize.sub} tracking-wide mt-0.5 font-medium`}>
            Traditional Games & Living Heritage
          </div>
        )}
      </div>
    </div>
  );
}
