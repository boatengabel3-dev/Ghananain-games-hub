import { useState } from 'react';
import { RefreshCcw, Trophy, User, Bot, ArrowLeft } from 'lucide-react';

interface PlayableOwareProps {
  onBack: () => void;
}

export default function PlayableOware({ onBack }: PlayableOwareProps) {
  // Oware board: 12 pits (0-5 for Player 1 (bottom), 6-11 for Player 2 (top))
  // Initial seeds per pit: 4
  const [pits, setPits] = useState<number[]>([4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]);
  const [scores, setScores] = useState<[number, number]>([0, 0]); // [Player 1, Player 2 / AI]
  const [turn, setTurn] = useState<1 | 2>(1); // 1 = Player, 2 = Opponent/AI
  const [message, setMessage] = useState<string>("Your turn! Choose a pit on your side (bottom row) to sow seeds.");
  const [isAiMode, setIsAiMode] = useState<boolean>(true);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const resetGame = () => {
    setPits([4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]);
    setScores([0, 0]);
    setTurn(1);
    setMessage("New game started. Your turn!");
    setGameOver(false);
  };

  const handlePitClick = (pitIndex: number) => {
    if (gameOver) return;
    if (turn === 1 && (pitIndex < 0 || pitIndex > 5)) {
      setMessage("Please choose a pit on your side (bottom row: 0 to 5).");
      return;
    }
    if (turn === 2 && !isAiMode && (pitIndex < 6 || pitIndex > 11)) {
      setMessage("Player 2's turn (top row: 6 to 11).");
      return;
    }
    if (pits[pitIndex] === 0) {
      setMessage("That pit is empty! Choose another one.");
      return;
    }

    executeSow(pitIndex);
  };

  const executeSow = (startIndex: number) => {
    const newPits = [...pits];
    let seeds = newPits[startIndex];
    newPits[startIndex] = 0;
    let currentIndex = startIndex;

    while (seeds > 0) {
      currentIndex = (currentIndex + 1) % 12;
      // Skip starting pit if more than 12 seeds (standard oware rule simplified)
      if (currentIndex === startIndex && seeds >= 12) {
        currentIndex = (currentIndex + 1) % 12;
      }
      newPits[currentIndex]++;
      seeds--;
    }

    // Capture check: if last seed lands on opponent side and results in 2 or 3 seeds
    let currentScores = [...scores] as [number, number];
    const isPlayer1Turn = turn === 1;
    const isLandingOnOpponentSide = isPlayer1Turn ? (currentIndex >= 6 && currentIndex <= 11) : (currentIndex >= 0 && currentIndex <= 5);

    if (isLandingOnOpponentSide && (newPits[currentIndex] === 2 || newPits[currentIndex] === 3)) {
      // Capture seeds backwards
      let captureIdx = currentIndex;
      let capturedCount = 0;
      while (
        (isPlayer1Turn && captureIdx >= 6 && captureIdx <= 11 && (newPits[captureIdx] === 2 || newPits[captureIdx] === 3)) ||
        (!isPlayer1Turn && captureIdx >= 0 && captureIdx <= 5 && (newPits[captureIdx] === 2 || newPits[captureIdx] === 3))
      ) {
        capturedCount += newPits[captureIdx];
        newPits[captureIdx] = 0;
        captureIdx = (captureIdx - 1 + 12) % 12;
      }

      if (isPlayer1Turn) {
        currentScores[0] += capturedCount;
        setMessage(`Great move! You captured ${capturedCount} seeds!`);
      } else {
        currentScores[1] += capturedCount;
        setMessage(`Opponent captured ${capturedCount} seeds.`);
      }
    } else {
      setMessage(isPlayer1Turn ? "Seeds sown. Opponent's turn..." : "Opponent sowed seeds. Your turn!");
    }

    setPits(newPits);
    setScores(currentScores);

    // Check Win condition (total captured >= 25 or all pits empty)
    if (currentScores[0] >= 25 || currentScores[1] >= 25 || newPits.every(p => p === 0)) {
      setGameOver(true);
      if (currentScores[0] > currentScores[1]) {
        setMessage(`🎉 Congratulations! You won with ${currentScores[0]} seeds!`);
      } else if (currentScores[1] > currentScores[0]) {
        setMessage(`Game Over! Opponent wins with ${currentScores[1]} seeds.`);
      } else {
        setMessage(`It's a tie game! Both have ${currentScores[0]} seeds.`);
      }
      return;
    }

    const nextTurn = turn === 1 ? 2 : 1;
    setTurn(nextTurn);

    if (nextTurn === 2 && isAiMode && !gameOver) {
      setTimeout(() => {
        aiTurn(newPits, currentScores);
      }, 900);
    }
  };

  const aiTurn = (currentPits: number[], currentScores: [number, number]) => {
    // AI chooses valid non-empty pit on top row (6 to 11)
    const validPits = [6, 7, 8, 9, 10, 11].filter(idx => currentPits[idx] > 0);
    if (validPits.length === 0) {
      setGameOver(true);
      setMessage("No moves left for opponent. You win!");
      return;
    }
    // Prefer pit that captures if possible, or random
    const chosenPit = validPits[Math.floor(Math.random() * validPits.length)];
    
    const newPits = [...currentPits];
    let seeds = newPits[chosenPit];
    newPits[chosenPit] = 0;
    let currentIndex = chosenPit;

    while (seeds > 0) {
      currentIndex = (currentIndex + 1) % 12;
      if (currentIndex === chosenPit && seeds >= 12) {
        currentIndex = (currentIndex + 1) % 12;
      }
      newPits[currentIndex]++;
      seeds--;
    }

    let updatedScores = [...currentScores] as [number, number];
    // AI is Player 2, landing on bottom side (0-5)
    if (currentIndex >= 0 && currentIndex <= 5 && (newPits[currentIndex] === 2 || newPits[currentIndex] === 3)) {
      let captureIdx = currentIndex;
      let capturedCount = 0;
      while (captureIdx >= 0 && captureIdx <= 5 && (newPits[captureIdx] === 2 || newPits[captureIdx] === 3)) {
        capturedCount += newPits[captureIdx];
        newPits[captureIdx] = 0;
        captureIdx = (captureIdx - 1 + 12) % 12;
      }
      updatedScores[1] += capturedCount;
      setMessage(`AI chose pit ${chosenPit - 5} and captured ${capturedCount} seeds! Your turn.`);
    } else {
      setMessage("AI made its move. Your turn!");
    }

    setPits(newPits);
    setScores(updatedScores);
    setTurn(1);

    if (updatedScores[0] >= 25 || updatedScores[1] >= 25 || newPits.every(p => p === 0)) {
      setGameOver(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-[#F5A623] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Games
        </button>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsAiMode(!isAiMode)}
            className="flex items-center gap-2 bg-[#1A1A1A] border border-[#2A2A2A] px-4 py-2 rounded-full text-xs text-white hover:border-[#F5A623]"
          >
            {isAiMode ? <Bot className="w-4 h-4 text-[#F5A623]" /> : <User className="w-4 h-4 text-[#F5A623]" />}
            Mode: {isAiMode ? "vs AI" : "2 Player Local"}
          </button>
          <button
            onClick={resetGame}
            className="flex items-center gap-2 bg-[#F5A623] text-[#0A0A0A] px-4 py-2 rounded-full text-xs font-semibold hover:scale-105 transition-transform"
          >
            <RefreshCcw className="w-3.5 h-3.5" /> Restart
          </button>
        </div>
      </div>

      <div className="glass-panel border border-[#E5A93C]/30 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10">
          <Trophy className="w-32 h-32 text-[#E5A93C]" />
        </div>

        <div className="text-center mb-6">
          <span className="text-xs tracking-widest text-[#E5A93C] uppercase font-semibold">🇬🇭 Royal Asante Board Game</span>
          <h2 className="font-serif font-bold text-3xl text-[#F7D070] mt-1">Oware (Akan Mancala)</h2>
          <p className="text-sm text-[#F5F1EA]/85 mt-2 max-w-xl mx-auto">{message}</p>
        </div>

        {/* Score Board */}
        <div className="flex justify-center items-center gap-8 mb-8 glass-card border border-[#E5A93C]/25 rounded-2xl py-4 px-6 max-w-md mx-auto shadow-md">
          <div className="text-center">
            <div className="text-xs text-[#A39B8E]">You (Player 1)</div>
            <div className="text-2xl font-bold text-[#F7D070]">{scores[0]} seeds</div>
          </div>
          <div className="h-8 w-[1px] bg-[#2C261F]"></div>
          <div className="text-center">
            <div className="text-xs text-[#A39B8E]">{isAiMode ? "AI Opponent" : "Player 2"}</div>
            <div className="text-2xl font-bold text-[#E5A93C]">{scores[1]} seeds</div>
          </div>
        </div>

        {/* Wooden Board Representation */}
        <div className="bg-[#1F1409] border-4 border-[#3D2314] rounded-2xl p-6 shadow-[inset_0_10px_20px_rgba(0,0,0,0.8)]">
          {/* Opponent Row (Pits 11 down to 6) */}
          <div className="text-xs text-[#E8C87A] text-center mb-2 font-medium">
            {isAiMode ? "AI Opponent's Pits (6 - 11)" : "Player 2's Pits (6 - 11)"} {turn === 2 && "⏳ Thinking..."}
          </div>
          <div className="grid grid-cols-6 gap-3 mb-6">
            {[11, 10, 9, 8, 7, 6].map((pitIdx) => (
              <button
                key={pitIdx}
                disabled={turn === 1 || gameOver || (!isAiMode && turn === 2)}
                onClick={() => handlePitClick(pitIdx)}
                className={`aspect-square rounded-full bg-[#2C190D] border-2 ${
                  turn === 2 && !isAiMode ? 'border-[#F5A623] animate-pulse' : 'border-[#4E2D18]'
                } flex flex-col items-center justify-center p-2 shadow-[inset_0_4px_8px_rgba(0,0,0,0.8)] hover:border-[#F5A623] transition-all cursor-pointer`}
              >
                <span className="text-xs text-gray-400 mb-1">#{pitIdx + 1}</span>
                <div className="w-8 h-8 rounded-full bg-[#F5A623] text-[#0A0A0A] font-bold text-sm flex items-center justify-center shadow-md">
                  {pits[pitIdx]}
                </div>
              </button>
            ))}
          </div>

          <div className="h-[2px] bg-[#4E2D18] my-4"></div>

          {/* Player Row (Pits 0 to 5) */}
          <div className="grid grid-cols-6 gap-3 mt-6">
            {[0, 1, 2, 3, 4, 5].map((pitIdx) => (
              <button
                key={pitIdx}
                disabled={turn === 2 || gameOver}
                onClick={() => handlePitClick(pitIdx)}
                className={`aspect-square rounded-full bg-[#2C190D] border-2 ${
                  turn === 1 ? 'border-[#F5A623] shadow-[0_0_12px_rgba(245,166,35,0.3)]' : 'border-[#4E2D18]'
                } flex flex-col items-center justify-center p-2 shadow-[inset_0_4px_8px_rgba(0,0,0,0.8)] hover:border-[#F5A623] hover:scale-105 transition-all cursor-pointer`}
              >
                <span className="text-xs text-gray-400 mb-1">#{pitIdx + 1}</span>
                <div className="w-8 h-8 rounded-full bg-[#F5C45A] text-[#0A0A0A] font-bold text-sm flex items-center justify-center shadow-md">
                  {pits[pitIdx]}
                </div>
              </button>
            ))}
          </div>
          <div className="text-xs text-[#E8C87A] text-center mt-2 font-medium">
            Your Pits (1 - 6) {turn === 1 && "✨ Your Turn (Click a pit to sow)"}
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-400">
          Tip: Sow seeds counter-clockwise. Land on 2 or 3 seeds in an opponent pit to capture them! First to 25 seeds wins.
        </div>
      </div>
    </div>
  );
}
