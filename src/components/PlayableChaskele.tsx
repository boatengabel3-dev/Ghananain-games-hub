import { useState } from 'react';
import { ArrowLeft, RefreshCcw, Target, Trophy, Zap } from 'lucide-react';

interface PlayableChaskeleProps {
  onBack: () => void;
}

export default function PlayableChaskele({ onBack }: PlayableChaskeleProps) {
  const [score, setScore] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(5);
  const [targetPos, setTargetPos] = useState<number>(Math.floor(Math.random() * 5));
  const [hitStatus, setHitStatus] = useState<'idle' | 'hit' | 'miss'>('idle');
  const [message, setMessage] = useState<string>("Aim carefully at the tin can target and swing your bat!");

  const swingBat = (pos: number) => {
    if (attempts <= 0) return;

    if (pos === targetPos) {
      setScore(prev => prev + 20);
      setHitStatus('hit');
      setMessage("🎯 Direct Hit! You knocked down the tin can!");
    } else {
      setHitStatus('miss');
      setMessage("💨 Missed! The ball flew past the can.");
    }

    setAttempts(prev => prev - 1);

    setTimeout(() => {
      if (attempts > 1) {
        setTargetPos(Math.floor(Math.random() * 5));
        setHitStatus('idle');
        setMessage("Next pitch! Choose your swing position (0 - 4).");
      } else {
        setMessage(`Game Over! Final Score: ${score + (pos === targetPos ? 20 : 0)} points.`);
      }
    }, 1200);
  };

  const restartGame = () => {
    setScore(0);
    setAttempts(5);
    setTargetPos(Math.floor(Math.random() * 5));
    setHitStatus('idle');
    setMessage("Aim carefully at the tin can target and swing your bat!");
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
        <span className="text-xs tracking-widest text-[#E5A93C] uppercase font-semibold">🇬🇭 Street Cricket Simulation</span>
        <h2 className="font-serif font-bold text-3xl text-[#F7D070] mt-1">Chaskele</h2>
        <p className="text-sm text-[#F5F1EA]/80 mt-2">{message}</p>

        {/* Stats */}
        <div className="flex justify-center items-center gap-6 my-6 glass-card border border-[#E5A93C]/25 rounded-2xl py-3 px-6 max-w-md mx-auto shadow-md">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#F7D070]" />
            <span className="text-xs text-[#A39B8E]">Score: <strong className="text-[#F7D070] text-base">{score}</strong></span>
          </div>
          <div className="h-5 w-[1px] bg-[#2C261F]"></div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[#E5A93C]" />
            <span className="text-xs text-[#A39B8E]">Swings Left: <strong className="text-[#F5F1EA] text-base">{attempts}</strong></span>
          </div>
        </div>

        {/* Target Arena */}
        <div className="bg-[#18120B]/80 border-2 border-[#3D2314] rounded-2xl p-8 my-6 relative overflow-hidden min-h-[180px] flex items-center justify-center shadow-inner">
          <div className="flex gap-4">
            {[0, 1, 2, 3, 4].map((pos) => (
              <button
                key={pos}
                disabled={attempts <= 0}
                onClick={() => swingBat(pos)}
                className={`w-14 h-24 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                  hitStatus === 'hit' && pos === targetPos
                    ? 'bg-green-900/60 border-green-500 scale-110 shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                    : 'glass-card border-[#2C261F] hover:border-[#E5A93C] hover:scale-105 cursor-pointer'
                }`}
              >
                <span className="text-xs text-[#A39B8E] mb-2">#{pos + 1}</span>
                <span className="text-2xl">{pos === targetPos ? '🥫' : '🪵'}</span>
              </button>
            ))}
          </div>
        </div>

        {attempts <= 0 && (
          <button
            onClick={restartGame}
            className="inline-flex items-center gap-2 bg-[#E5A93C] hover:bg-[#F7D070] text-[#0B0A08] font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform mt-4 cursor-pointer shadow-lg"
          >
            <Zap className="w-4 h-4" /> Play Again
          </button>
        )}
      </div>
    </div>
  );
}
