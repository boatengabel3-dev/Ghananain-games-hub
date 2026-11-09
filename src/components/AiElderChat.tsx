import { useState } from 'react';
import { Send, Sparkles, User, Heart, MessageCircle } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AiElderChatProps {
  elderAvatar?: string;
}

export default function AiElderChat({ elderAvatar }: AiElderChatProps = {}) {
  const avatarUrl = elderAvatar || '/src/assets/images/ghana_adinkra_elder_1794255756821.jpg';

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Akwaaba, my dear friend! 🇬🇭 I am Nana Kwame, your elder and companion in Ghanaian heritage. Whether you are curious about the royal math of Oware, the joyful chants and footwork of Ampe, street rules of Chaskele, or the deep wisdom behind Akan proverbs, please ask freely! How may I enlighten your day today?"
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const suggestedQuestions = [
    "How does Oware teach Akan leadership and mathematics?",
    "What are the chants and jump rules in Ampe?",
    "How do we set up an authentic Chaskele street wicket?",
    "Why are Ghanaian draughts (Dame) players famous for board slamming?",
    "What does Pilolo mean in the Ga dialect?",
    "What is the story behind the Nyansapo wisdom knot?"
  ];

  const getKnowledgeableFallback = (rawQuery: string): string => {
    const q = rawQuery.toLowerCase();
    
    if (q.includes('oware') || q.includes('mancala') || q.includes('seed') || q.includes('board')) {
      return "Akwaaba, my child! Ah, Oware—the crowning jewel of Akan strategy! Codified in the ancient courts of the Asante Kingdom, Oware is played on a carved Osese wooden board with 12 pits and 48 smooth grey nickar seeds ('Oware aba'). Each player begins with 4 seeds in each of their 6 pits.\n\nThe sacred rule is continuous counter-clockwise sowing: you lift all seeds from any pit on your side and deposit them one by one. If your final seed lands in an opponent's pit and makes exactly 2 or 3 seeds, you harvest them! But remember the ancient Akan wisdom: you must never starve your rival of seeds if you can avoid it. True victory is won with patience, foresight, and restraint.";
    }
    
    if (q.includes('ampe') || q.includes('jump') || q.includes('chant') || q.includes('girl')) {
      return "Yaa! Ampe is pure sunshine and rhythm! When Ghanaian youth gather on the school compound, you hear the electric clap and the famous call: 'Ampe! Ebie! Ebie!'. Two players jump simultaneously high into the air, clapping hands. Upon landing, each shoots one foot forward.\n\nIn 'Ohyi' style, if matching feet meet (leader's right meets challenger's right), the leader scores! In 'Otwene' style, opposing feet score. Ampe builds explosive leg strength, razor-sharp cardiovascular stamina, and teaches young people to leap with pride and grace!";
    }
    
    if (q.includes('chaskele') || q.includes('cricket') || q.includes('tin') || q.includes('can')) {
      return "Ah, Chaskele! Nothing demonstrates the sparkling ingenuity of Ghanaian children like Chaskele. In the bustling neighborhoods of Kumasi and Accra, kids gather empty Geisha mackerel or tomato tins, flatten them slightly, and balance them atop a stone wicket.\n\nA bowler delivers from 8 to 10 paces away. The batter, armed with a hand-whittled cedar stave, defends the wicket with quick reflexes. If you smash the ball, you sprint back and forth to score runs while fielders scramble! It has honed the reflexes of Ghana's greatest athletes.";
    }

    if (q.includes('dame') || q.includes('draught') || q.includes('checkers') || q.includes('slam')) {
      return "Walk under any neem tree in Kumasi or Accra, and you will hear: CLACK! That is Ghanaian Dame! Played on 10x10 or 8x8 checkered boards, Dame is master-level theater. Capturing is strictly mandatory—if you miss an available capture, the spectators will shout 'Bɔ no!' (Take him!).\n\nWhen a piece reaches the opponent's back rank, it becomes a 'Dam'—a Flying King that can soar diagonally across the entire board. And that thunderous piece slam? It is psychological warfare, meant to assert mastery over the board!";
    }

    if (q.includes('pilolo') || q.includes('hide') || q.includes('ga') || q.includes('seek')) {
      return "Pilolo! The very name comes from the Ga language meaning 'searching for what was hidden'. As the sun sets and the tropical evening cools, the Game Master ('Maa') secretly hides small carved sticks or polished pebbles while players turn their backs to a wall.\n\nWhen the shout 'PILOLO!' rings out, everyone sprints into action! When you find the token, you must dash at full speed across the finish line shouting 'Bleoo!' (carefully/slowly!). It teaches spatial stealth, keen observation, and sudden explosive speed.";
    }

    if (q.includes('ludo') || q.includes('dice') || q.includes('veranda')) {
      return "Ludo on a Ghanaian evening veranda is family bonding at its warmest! Hand-painted wooden boards decorated with colorful geometric patterns sit between elders and grandchildren. You must roll a 6 to shout 'Pue!' (Emerge!) and enter your token.\n\nLanding on an opponent knocks them all the way home ('Bɔ no kɔ fie!'). Pairing two tokens creates a blockade ('Pampam'). It is a joyful game of suspense, tactical banter, and good-natured laughter.";
    }

    if (q.includes('nyansapo') || q.includes('adinkra') || q.includes('symbol') || q.includes('proverb')) {
      return "The Nyansapo—the Knot of Wisdom—is one of our most treasured Akan Adinkra symbols. It signifies intelligence, ingenuity, and patience. An Akan proverb says: 'Nyansa nni baako tirim' (Wisdom does not abide in one single head alone). Just like untangling a complex knot requires gentle patience rather than brutal force, so too does mastering traditional Ghanaian games and navigating life's challenges.";
    }

    return `Akwaaba, my dear friend! What a thoughtful question about our Ghanaian traditions. In Ghana, our games—from Oware and Ampe to Pilolo and Chaskele—are not mere entertainment; they are living libraries of character, solidarity, and joy. As our elders say: "Nkabom mu na tumi wɔ" (In unity and patience lies true strength). What specific aspect of our games would you like to explore deeper together?`;
  };

  const handleSend = async (e?: React.FormEvent, customQuestion?: string) => {
    if (e) e.preventDefault();
    const query = customQuestion || input;
    if (!query.trim() || loading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: query.trim() }]);
    setLoading(true);

    try {
      const res = await fetch('/api/elder-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: query.trim() }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply && typeof data.reply === 'string') {
          setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
          return;
        }
      }

      // If server signals fallback or key isn't provided, use rich cultural fallback
      const fallback = getKnowledgeableFallback(query);
      setMessages((prev) => [...prev, { role: 'assistant', content: fallback }]);
    } catch (err) {
      console.warn('Using cultural fallback:', err);
      const fallback = getKnowledgeableFallback(query);
      setMessages((prev) => [...prev, { role: 'assistant', content: fallback }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="elder" className="max-w-4xl mx-auto px-4 py-8">
      <div className="glass-panel border border-[#E5A93C]/30 rounded-3xl overflow-hidden shadow-2xl">
        {/* Header with authentic Ghanaian Elder portrait and Glass styling */}
        <div className="glass-header p-6 flex items-center justify-between border-b border-[#2C261F]/70">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#E5A93C] shadow-[0_0_20px_rgba(229,169,60,0.35)] shrink-0">
              <img
                src={avatarUrl}
                alt="Nana Kwame - Akan Cultural Elder"
                className="w-full h-full object-cover historical-sepia-img"
                referrerPolicy="no-referrer"
              />
              <div className="grain-overlay"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-2xl text-[#F7D070]">
                  Nana Kwame
                </h3>
                <span className="text-[10px] text-[#E5A93C] font-semibold glass-pill px-2.5 py-0.5 rounded-full border border-[#E5A93C]/40">
                  🇬🇭 Kumasi Heritage Elder
                </span>
              </div>
              <p className="text-xs text-[#A39B8E] mt-0.5">
                Guardian of Akan Wisdom, Traditional Games & Living Proverbs
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-[#E5A93C] glass-pill px-3 py-1.5 rounded-full">
            <Sparkles className="w-4 h-4 text-[#E5A93C]" />
            <span className="font-semibold">Friendly Cultural AI</span>
          </div>
        </div>

        {/* Message Container */}
        <div className="p-6 space-y-5 max-h-[460px] overflow-y-auto">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {msg.role === 'assistant' ? (
                <div className="w-10 h-10 rounded-full overflow-hidden border border-[#E5A93C] shrink-0 shadow-sm">
                  <img
                    src={avatarUrl}
                    alt="Nana Kwame"
                    className="w-full h-full object-cover historical-sepia-img"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#E5A93C] text-[#0B0A08] flex items-center justify-center font-bold text-xs shrink-0 shadow-md">
                  <User className="w-5 h-5" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-5 py-4 text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-[#E5A93C] text-[#0B0A08] font-medium rounded-tr-none shadow-md'
                    : 'glass-card border border-[#E5A93C]/20 text-[#F5F1EA] rounded-tl-none shadow-lg'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-[#E5A93C]">
                <img
                  src={avatarUrl}
                  alt="Nana Kwame"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="glass-card px-4 py-3 rounded-2xl text-xs text-[#E5A93C] animate-pulse flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Nana Kwame is recalling ancient oral proverbs for you...</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Queries */}
        <div className="px-6 py-3.5 bg-black/30 border-t border-[#2C261F]/60 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[#A39B8E] shrink-0 text-[11px] font-semibold flex items-center gap-1">
            <MessageCircle className="w-3 h-3 text-[#E5A93C]" />
            Ask Nana:
          </span>
          {suggestedQuestions.map((sq, i) => (
            <button
              key={i}
              onClick={() => handleSend(undefined, sq)}
              className="text-[#E5A93C] hover:text-[#F7D070] glass-pill hover:border-[#E5A93C] px-3.5 py-1.5 rounded-full whitespace-nowrap shrink-0 transition-all cursor-pointer font-medium hover:scale-102"
            >
              {sq}
            </button>
          ))}
        </div>

        {/* Input Form with Glass Styling */}
        <form onSubmit={handleSend} className="p-4 sm:p-5 glass-header border-t border-[#2C261F]/60 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Nana Kwame about Oware tactics, Ampe songs, Chaskele rules, or Akan wisdom..."
            className="flex-1 glass-input rounded-xl px-4 py-3.5 text-sm text-[#F5F1EA] placeholder:text-[#A39B8E] outline-none focus:border-[#E5A93C]"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-[#E5A93C] hover:bg-[#F7D070] text-[#0B0A08] font-bold px-6 py-3.5 rounded-xl transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer shadow-md hover:scale-105 shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Inquire</span>
          </button>
        </form>
      </div>
    </section>
  );
}
