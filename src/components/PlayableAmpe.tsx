import { useState } from 'react';
import { ArrowLeft, RefreshCcw, Zap, Heart, Trophy } from 'lucide-react';

interface PlayableAmpeProps {
  onBack: () => void;
}

export default function PlayableAmpe({ onBack }: PlayableAmpeProps) {
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [round, setRound] = useState<number>(1);
  const [status, setStatus] = useState<'ready' | 'jumping' | 'success' | 'fail' | 'gameover'>('ready');
  const [playerChoice, setPlayerChoice] = useState<'left' | 'right' | null>(null);
  const [aiChoice, setAiChoice] = useState<'left' | 'right' | null>(null);
  const [feedback, setFeedback] = useState<string>("Choose Left or Right foot as you jump in rhythm!");

  const makeChoice = (choice: 'left' | 'right') => {
    if (status !== 'ready') return;

    setPlayerChoice(choice);
    setStatus('jumping');
    setFeedback("Jumping and clapping...");

    setTimeout(() => {
      const choices: ('left' | 'right')[] = ['left', 'right'];
      const computer = choices[Math.floor(Math.random() * choices.length)];
      setAiChoice(computer);

      let isGameOver = false;
      let nextLives = lives;

      if (choice === computer) {
        setScore(prev => prev + 1);
        setStatus('success');
        setFeedback(`✨ Match! Both showed ${choice.toUpperCase()}. You scored!`);
      } else {
        nextLives = lives - 1;
        setLives(nextLives);
        if (nextLives <= 0) {
          isGameOver = true;
          setStatus('gameover');
          setFeedback("Game Over! Out of lives.");
        } else {
          setStatus('fail');
          setFeedback(`❌ Mismatch! You showed ${choice.toUpperCase()}, AI showed ${computer.toUpperCase()}.`);
        }
      }

      if (!isGameOver) {
        setTimeout(() => {
          setStatus('ready');
          setRound(prev => prev + 1);
          setPlayerChoice(null);
          setAiChoice(null);
        }, 1400);
      }
    }, 800);
  };

  const restartGame = () => {
    setScore(0);
    setLives(3);
    setRound(1);
    setStatus('ready');
    setPlayerChoice(null);
    setAiChoice(null);
    setFeedback("Choose Left or Right foot as you jump in rhythm!");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-[#F5A623] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Games
        </button>
        <button
          onClick={restartGame}
          className="flex items-center gap-2 bg-[#F5A623] text-[#0A0A0A] px-4 py-2 rounded-full text-xs font-semibold hover:scale-105 transition-transform"
        >
          <RefreshCcw className="w-3.5 h-3.5" /> Restart
        </button>
      </div>

      <div className="glass-panel border border-[#E5A93C]/30 rounded-3xl p-6 lg:p-8 shadow-2xl text-center">
        <span className="text-xs tracking-widest text-[#E5A93C] uppercase font-semibold">🇬🇭 Traditional Jumping Sport</span>
        <h2 className="font-serif font-bold text-3xl text-[#F7D070] mt-1">Ampe</h2>
        <p className="text-sm text-[#F5F1EA]/80 mt-2">Test your timing, jump rhythm, and synchronization!</p>

        {/* Stats */}
        <div className="flex justify-center items-center gap-6 my-6 glass-card border border-[#E5A93C]/25 rounded-2xl py-3 px-6 max-w-md mx-auto shadow-md">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#F7D070]" />
            <span className="text-xs text-[#A39B8E]">Score: <strong className="text-[#F7D070] text-base">{score}</strong></span>
          </div>
          <div className="h-5 w-[1px] bg-[#2C261F]"></div>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span className="text-xs text-[#A39B8E]">Lives: <strong className="text-[#F5F1EA] text-base">{lives}</strong></span>
          </div>
          <div className="h-5 w-[1px] bg-[#2C261F]"></div>
          <div className="text-xs text-[#A39B8E]">Round: <strong className="text-[#F5F1EA] text-base">{round}</strong></div>
        </div>

        {/* Arena Animation View */}
        <div className="bg-[#18120B]/80 border-2 border-[#3D2314] rounded-2xl p-8 my-6 relative overflow-hidden min-h-[220px] flex flex-col items-center justify-center shadow-inner">
          <div className={`transition-all duration-300 ${status === 'jumping' ? 'animate-bounce scale-110' : ''}`}>
            <div className="text-5xl mb-2">👯‍♀️</div>
          </div>
          <p className="text-base font-semibold text-[#F7D070] mt-2">{feedback}</p>

          {playerChoice && aiChoice && (
            <div className="flex items-center gap-6 mt-4 text-xs">
              <span className="glass-pill px-3.5 py-1.5 rounded-full text-[#F7D070]">Your Foot: <strong>{playerChoice.toUpperCase()}</strong></span>
              <span className="glass-pill px-3.5 py-1.5 rounded-full text-[#E5A93C]">AI Foot: <strong>{aiChoice.toUpperCase()}</strong></span>
            </div>
          )}
        </div>

        {/* Controls */}
        {status !== 'gameover' ? (
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              onClick={() => makeChoice('left')}
              disabled={status === 'jumping'}
              className="glass-card hover:bg-[#E5A93C] hover:text-[#0B0A08] border-2 border-[#E5A93C]/50 text-[#F5F1EA] font-semibold py-4 rounded-2xl transition-all text-base shadow-lg cursor-pointer"
            >
              Left Foot 👈
            </button>
            <button
              onClick={() => makeChoice('right')}
              disabled={status === 'jumping'}
              className="glass-card hover:bg-[#E5A93C] hover:text-[#0B0A08] border-2 border-[#E5A93C]/50 text-[#F5F1EA] font-semibold py-4 rounded-2xl transition-all text-base shadow-lg cursor-pointer"
            >
              👉 Right Foot
            </button>
          </div>
        ) : (
          <div className="mt-6">
            <button
              onClick={restartGame}
              className="inline-flex items-center gap-2 bg-[#E5A93C] hover:bg-[#F7D070] text-[#0B0A08] font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform cursor-pointer shadow-lg"
            >
              <Zap className="w-4 h-4" /> Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
