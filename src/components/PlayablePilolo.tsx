import { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCcw, Search, Clock, Award } from 'lucide-react';

interface PlayablePiloloProps {
  onBack: () => void;
}

export default function PlayablePilolo({ onBack }: PlayablePiloloProps) {
  const [gameState, setGameState] = useState<'idle' | 'hiding' | 'searching' | 'found' | 'timeout'>('idle');
  const [tokenIndex, setTokenIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [score, setScore] = useState<number>(0);
  const [boxes, setBoxes] = useState<boolean[]>([false, false, false, false, false, false]);
  const [message, setMessage] = useState<string>("Press 'Start Pilolo' to begin the hidden token search!");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'searching' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('timeout');
            setMessage("⏰ Time's up! The token was missed.");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const startGame = () => {
    const hiddenIn = Math.floor(Math.random() * 6);
    const newBoxes = [false, false, false, false, false, false];
    newBoxes[hiddenIn] = true;
    setBoxes(newBoxes);
    setTokenIndex(hiddenIn);
    setTimeLeft(10);
    setGameState('searching');
    setMessage("🔍 Pilolo! Search the hiding spots quickly before time runs out!");
  };

  const handleBoxClick = (index: number) => {
    if (gameState !== 'searching') return;

    if (boxes[index]) {
      setGameState('found');
      setScore(prev => prev + 10);
      setMessage("🎉 Found it! You shouted 'Bleoo!' and won the round!");
    } else {
      setMessage("❌ Empty spot! Keep searching!");
    }
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
          onClick={startGame}
          className="flex items-center gap-2 bg-[#F5A623] text-[#0A0A0A] px-4 py-2 rounded-full text-xs font-semibold hover:scale-105 transition-transform"
        >
          <RefreshCcw className="w-3.5 h-3.5" /> New Round
        </button>
      </div>

      <div className="glass-panel border border-[#E5A93C]/30 rounded-3xl p-6 lg:p-8 shadow-2xl text-center">
        <span className="text-xs tracking-widest text-[#E5A93C] uppercase font-semibold">🇬🇭 Traditional Observation & Sprint</span>
        <h2 className="font-serif font-bold text-3xl text-[#F7D070] mt-1">Pilolo</h2>
        <p className="text-sm text-[#F5F1EA]/80 mt-2">{message}</p>

        {/* Stats */}
        <div className="flex justify-center items-center gap-6 my-6 glass-card border border-[#E5A93C]/25 rounded-2xl py-3 px-6 max-w-md mx-auto shadow-md">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#F7D070]" />
            <span className="text-xs text-[#A39B8E]">Score: <strong className="text-[#F7D070] text-base">{score}</strong></span>
          </div>
          <div className="h-5 w-[1px] bg-[#2C261F]"></div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#E5A93C]" />
            <span className="text-xs text-[#A39B8E]">Time: <strong className="text-[#F5F1EA] text-base">{timeLeft}s</strong></span>
          </div>
        </div>

        {/* Search Grid */}
        <div className="grid grid-cols-3 gap-4 my-8 max-w-md mx-auto">
          {[0, 1, 2, 3, 4, 5].map((idx) => (
            <button
              key={idx}
              disabled={gameState !== 'searching'}
              onClick={() => handleBoxClick(idx)}
              className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                gameState === 'found' && boxes[idx]
                  ? 'bg-green-900/60 border-green-500 scale-105 shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                  : 'glass-card border-[#2C261F] hover:border-[#E5A93C] hover:scale-105 cursor-pointer'
              }`}
            >
              <Search className={`w-8 h-8 ${gameState === 'found' && boxes[idx] ? 'text-green-400' : 'text-[#E5A93C]'}`} />
              <span className="text-xs text-[#A39B8E] mt-2">Spot #{idx + 1}</span>
              {gameState === 'found' && boxes[idx] && (
                <span className="text-[10px] text-green-300 font-bold mt-1">Token Found!</span>
              )}
            </button>
          ))}
        </div>

        {gameState === 'idle' && (
          <button
            onClick={startGame}
            className="bg-[#E5A93C] hover:bg-[#F7D070] text-[#0B0A08] font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform cursor-pointer shadow-lg"
          >
            Start Pilolo 🚀
          </button>
        )}

        {(gameState === 'found' || gameState === 'timeout') && (
          <button
            onClick={startGame}
            className="bg-[#E5A93C] hover:bg-[#F7D070] text-[#0B0A08] font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform cursor-pointer shadow-lg"
          >
            Play Again 🔄
          </button>
        )}
      </div>
    </div>
  );
}
