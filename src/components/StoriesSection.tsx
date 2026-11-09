import { useState } from 'react';
import { StoryItem } from '../types';
import { ArrowRight, BookOpen, X, Sparkles } from 'lucide-react';

interface StoriesSectionProps {
  stories: StoryItem[];
  onSelectStory?: (story: StoryItem) => void;
}

export default function StoriesSection({ stories, onSelectStory }: StoriesSectionProps) {
  const [activeStoryModal, setActiveStoryModal] = useState<StoryItem | null>(null);

  const handleCardClick = (story: StoryItem) => {
    setActiveStoryModal(story);
    if (onSelectStory) onSelectStory(story);
  };

  return (
    <section id="stories" className="max-w-[1440px] mx-auto px-5 lg:px-12 py-16 border-t border-[#2C261F]/60">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#2C261F]/60">
        <div>
          <div className="text-xs text-[#E5A93C] font-semibold tracking-widest uppercase mb-1 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Oral Tradition & Historical Records</span>
          </div>
          <h2 className="font-serif font-bold text-3xl lg:text-4xl text-[#F5F1EA]">
            The Stories Behind the Games
          </h2>
          <p className="text-sm text-[#A39B8E] mt-2 max-w-xl">
            Each game carries the soul of a people—passed down through Akan royal palaces, Ga coastal villages, and lively urban courtyards.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stories.map(story => (
          <article
            key={story.id}
            onClick={() => handleCardClick(story)}
            className="group rounded-2xl overflow-hidden glass-card glass-card-interactive flex flex-col cursor-pointer"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#1C1914]">
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 historical-sepia-img"
                referrerPolicy="no-referrer"
              />
              <div className="grain-overlay"></div>
              <div className="warm-vignette"></div>
              <div className="absolute top-3 left-3 z-10">
                <span className="glass-pill text-[#F7D070] text-[10px] font-semibold px-2.5 py-1 rounded-full">
                  {story.category}
                </span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#E5A93C] mb-2 font-medium">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{story.readTime}</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-[#F7D070] group-hover:text-[#E5A93C] transition-colors leading-snug">
                  {story.title}
                </h3>
                <p className="text-xs text-[#F5F1EA]/80 mt-2.5 line-clamp-3 leading-relaxed">
                  {story.summary}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#2C261F]/60 flex items-center justify-between text-xs text-[#E5A93C]">
                <span className="text-[#A39B8E] text-[11px] font-medium">Cultural Essay</span>
                <span className="font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0">
                  Read Essay <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Full Glass Essay Reading Modal */}
      {activeStoryModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-panel border border-[#E5A93C]/30 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative animate-in fade-in-0 zoom-in-95">
            <button
              onClick={() => setActiveStoryModal(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#0B0A08]/90 border border-[#2C261F] text-[#F5F1EA] flex items-center justify-center hover:bg-[#E5A93C] hover:text-[#0B0A08] transition-colors"
              aria-label="Close story"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-2xl bg-[#1C1914]">
              <img
                src={activeStoryModal.image}
                alt={activeStoryModal.title}
                className="w-full h-full object-cover historical-sepia-img"
                referrerPolicy="no-referrer"
              />
              <div className="grain-overlay"></div>
              <div className="warm-vignette"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08] via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-6 z-10">
                <span className="glass-pill text-[#F7D070] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  🇬🇭 {activeStoryModal.category} · {activeStoryModal.readTime}
                </span>
                <h3 className="font-serif font-bold text-2xl lg:text-3xl text-[#F7D070] mt-2">
                  {activeStoryModal.title}
                </h3>
              </div>
            </div>

            <div className="p-6 lg:p-8 space-y-4">
              <p className="text-base text-[#F7D070] font-serif italic border-l-2 border-[#E5A93C] pl-4 leading-relaxed">
                "{activeStoryModal.summary}"
              </p>
              <div className="text-sm leading-relaxed text-[#F5F1EA]/90 space-y-4 pt-2">
                <p>{activeStoryModal.content}</p>
              </div>
              <div className="pt-6 border-t border-[#2C261F] flex justify-end">
                <button
                  onClick={() => setActiveStoryModal(null)}
                  className="bg-[#E5A93C] hover:bg-[#F7D070] text-[#0B0A08] font-bold text-xs px-6 py-2.5 rounded-full transition-all"
                >
                  Close Story
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
