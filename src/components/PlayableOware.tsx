import React, { useState, useEffect, useRef, useTransition } from 'react';
import {
  ArrowLeft,
  RefreshCcw,
  Volume2,
  VolumeX,
  Sparkles,
  HelpCircle,
  Eye,
  RotateCcw,
  Play,
  Pause,
  Bot,
  User,
  Zap,
  Info,
  ChevronRight,
  Trophy,
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface PlayableOwareProps {
  onBack: () => void;
}

// Personas for opponent AI
interface OpponentPersona {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  difficulty: 'Novice' | 'Master' | 'Grandmaster';
}

const PERSONAS: OpponentPersona[] = [
  {
    id: 'kofi',
    name: 'Elder Kofi Mensah',
    title: 'Kumasi Cultural Centre Grandmaster',
    bio: 'Champion of Asante Abapa tournaments for 40 years. Sows with deep strategic foresight and Akan proverbs.',
    avatar: '/src/assets/images/ghana_adinkra_elder_1794255756821.jpg',
    difficulty: 'Grandmaster',
  },
  {
    id: 'serwaa',
    name: 'Ama Serwaa',
    title: 'Kejetia Market Tactician',
    bio: 'Quick-thinking trader who mastered Oware on the wooden veranda benches of Kumasi.',
    avatar: '/src/assets/images/ghana_ampe_girls_1794255706526.jpg',
    difficulty: 'Master',
  },
  {
    id: 'kwame',
    name: 'Apprentice Kwame',
    title: 'Keen Student of the Game',
    bio: 'Learning the sacred mathematics of nickar seeds. Friendly and encourages new players.',
    avatar: '/src/assets/images/ghana_chaskele_street_1794255706037.jpg',
    difficulty: 'Novice',
  },
];

// Seed coordinate offsets for natural organic clustering inside each pit
const SEED_POSITIONS: { x: number; y: number; r: number }[] = [
  { x: 0, y: 0, r: 12 },
  { x: -14, y: -6, r: 45 },
  { x: 12, y: -8, r: -30 },
  { x: -8, y: 12, r: 15 },
  { x: 10, y: 10, r: -60 },
  { x: -18, y: 4, r: 80 },
  { x: 16, y: 2, r: -15 },
  { x: -2, y: -16, r: 90 },
  { x: 4, y: 16, r: -45 },
  { x: -12, y: -14, r: 30 },
  { x: 14, y: -16, r: -75 },
  { x: 0, y: 8, r: 20 },
];

export default function PlayableOware({ onBack }: PlayableOwareProps) {
  // Pits: 0-5 for Player 1 (South / Bottom), 6-11 for Player 2 / Elder (North / Top)
  // Standard starting configuration: 4 seeds per pit (48 total)
  const [pits, setPits] = useState<number[]>([4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]);
  const [scores, setScores] = useState<[number, number]>([0, 0]); // [Player 1, Opponent]
  const [turn, setTurn] = useState<1 | 2>(1); // 1 = Player 1, 2 = Opponent/AI
  const [gameMode, setGameMode] = useState<'ai' | 'pass_and_play' | 'demo'>('ai');
  const [selectedPersona, setSelectedPersona] = useState<OpponentPersona>(PERSONAS[0]);

  // Visual & 3D interaction state
  const [is3DView, setIs3DView] = useState<boolean>(true);
  const [boardTilt, setBoardTilt] = useState<{ x: number; y: number }>({ x: 14, y: 0 });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [animSpeed, setAnimSpeed] = useState<'normal' | 'fast' | 'instant'>('normal');

  // Animation active state
  const [isSowing, setIsSowing] = useState<boolean>(false);
  const [activePitIndex, setActivePitIndex] = useState<number | null>(null);
  const [droppingPitIndex, setDroppingPitIndex] = useState<number | null>(null);
  const [lastCapturedPits, setLastCapturedPits] = useState<number[]>([]);
  const [capturedAnimation, setCapturedAnimation] = useState<{ count: number; player: 1 | 2 } | null>(null);

  // Gameplay metadata
  const [message, setMessage] = useState<string>("Akwaaba! Select any of your houses (1-6) on the bottom row to sow.");
  const [elderCommentary, setElderCommentary] = useState<string>(
    "A patient mind sees the harvest before the seeds leave the palm."
  );
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [previousStates, setPreviousStates] = useState<{ pits: number[]; scores: [number, number]; turn: 1 | 2 }[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<'player1' | 'opponent' | 'draw' | null>(null);
  const [showRulesModal, setShowRulesModal] = useState<boolean>(false);
  const [hintPit, setHintPit] = useState<number | null>(null);

  const boardRef = useRef<HTMLDivElement>(null);
  const [, startTransition] = useTransition();

  // Sync sounds singleton
  useEffect(() => {
    sounds.enabled = soundEnabled;
  }, [soundEnabled]);

  // 3D Parallax tilt effect on mouse movement / touch drag
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!is3DView || !boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
    const yRatio = (e.clientY - rect.top) / rect.height - 0.5;
    setBoardTilt({
      x: 14 - yRatio * 12,
      y: xRatio * 12,
    });
  };

  const resetTilt = () => {
    setBoardTilt({ x: 14, y: 0 });
  };

  // Reset Game
  const resetGame = () => {
    setPits([4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]);
    setScores([0, 0]);
    setTurn(1);
    setGameOver(false);
    setWinner(null);
    setMoveHistory([]);
    setPreviousStates([]);
    setLastCapturedPits([]);
    setCapturedAnimation(null);
    setHintPit(null);
    setMessage("Fresh game commenced. Your turn to open the tournament!");
    setElderCommentary("Wo firi kuro mu a, w’adwene firi w’akyi — Let your opening move carve a path of honor.");
    sounds.playScoop();
  };

  // Undo move
  const handleUndo = () => {
    if (isSowing || previousStates.length === 0) return;
    const last = previousStates[previousStates.length - 1];
    setPits(last.pits);
    setScores(last.scores);
    setTurn(last.turn);
    setPreviousStates((prev) => prev.slice(0, -1));
    setGameOver(false);
    setWinner(null);
    setMessage("Move undone. Review your tactics.");
    sounds.playScoop();
  };

  // Provide a tactical hint from Elder Kofi
  const handleHint = () => {
    if (turn !== 1 || isSowing || gameOver) return;
    // Find optimal legal move for Player 1
    const validMoves = [0, 1, 2, 3, 4, 5].filter((idx) => pits[idx] > 0);
    if (validMoves.length === 0) return;

    let bestMove = validMoves[0];
    let maxCapture = -1;

    for (const move of validMoves) {
      const simulatedPits = [...pits];
      let seeds = simulatedPits[move];
      simulatedPits[move] = 0;
      let curr = move;
      while (seeds > 0) {
        curr = (curr + 1) % 12;
        if (curr === move && simulatedPits[move] >= 12) {
          curr = (curr + 1) % 12;
        }
        simulatedPits[curr]++;
        seeds--;
      }

      let captured = 0;
      if (curr >= 6 && curr <= 11 && (simulatedPits[curr] === 2 || simulatedPits[curr] === 3)) {
        let testIdx = curr;
        while (testIdx >= 6 && testIdx <= 11 && (simulatedPits[testIdx] === 2 || simulatedPits[testIdx] === 3)) {
          captured += simulatedPits[testIdx];
          testIdx = (testIdx - 1 + 12) % 12;
        }
      }

      if (captured > maxCapture) {
        maxCapture = captured;
        bestMove = move;
      }
    }

    setHintPit(bestMove);
    const houseName = ['A', 'B', 'C', 'D', 'E', 'F'][bestMove];
    if (maxCapture > 0) {
      setElderCommentary(`Consider House ${houseName} (${bestMove + 1}) — it promises an immediate harvest of ${maxCapture} seeds!`);
    } else {
      setElderCommentary(`House ${houseName} (${bestMove + 1}) strengthens your board presence without overexposing your houses.`);
    }
  };

  // Pit click handler
  const handlePitClick = (pitIndex: number) => {
    if (isSowing || gameOver) return;

    // Turn validations
    if (turn === 1 && (pitIndex < 0 || pitIndex > 5)) {
      setMessage("It is your turn! Choose a pit from your side (Houses 1-6).");
      return;
    }
    if (turn === 2 && gameMode === 'pass_and_play' && (pitIndex < 6 || pitIndex > 11)) {
      setMessage("Player 2's turn! Choose from the top row (Houses 7-12).");
      return;
    }
    if (turn === 2 && gameMode === 'ai') {
      return; // AI is thinking
    }
    if (pits[pitIndex] === 0) {
      setMessage("That house is empty! In Akan tradition, you cannot sow from an empty granary.");
      return;
    }

    // Feeding rule check: If opponent has 0 seeds, must choose a move that feeds them if possible
    const opponentPits = turn === 1 ? [6, 7, 8, 9, 10, 11] : [0, 1, 2, 3, 4, 5];
    const opponentTotal = opponentPits.reduce((acc, idx) => acc + pits[idx], 0);

    if (opponentTotal === 0) {
      const willFeed = pitIndex + pits[pitIndex] >= (turn === 1 ? 6 : 12);
      if (!willFeed) {
        setMessage("The Sacred Akan Rule of Hospitality: You must sow seeds to your opponent if their side is empty!");
        return;
      }
    }

    // Save previous state for undo
    setPreviousStates((prev) => [...prev, { pits: [...pits], scores: [...scores], turn }]);
    setHintPit(null);

    executeAnimatedSow(pitIndex, turn);
  };

  // Step-by-step 3D animated sowing with procedural acoustic clacks
  const executeAnimatedSow = async (startIndex: number, currentTurn: 1 | 2) => {
    setIsSowing(true);
    setActivePitIndex(startIndex);
    setLastCapturedPits([]);
    setCapturedAnimation(null);

    sounds.playScoop();

    const currentPits = [...pits];
    let seedsInHand = currentPits[startIndex];
    currentPits[startIndex] = 0;
    setPits([...currentPits]);

    const stepDelay = animSpeed === 'instant' ? 0 : animSpeed === 'fast' ? 140 : 280;

    let currentIndex = startIndex;
    let stepCount = 0;

    while (seedsInHand > 0) {
      currentIndex = (currentIndex + 1) % 12;

      // Abapa rule: skip starting pit if seeds were >= 12 (Kroo loop)
      if (currentIndex === startIndex && seedsInHand >= 12) {
        currentIndex = (currentIndex + 1) % 12;
      }

      currentPits[currentIndex]++;
      seedsInHand--;
      stepCount++;

      setDroppingPitIndex(currentIndex);
      setPits([...currentPits]);
      sounds.playSeedDrop(stepCount);

      if (stepDelay > 0) {
        await new Promise((r) => setTimeout(r, stepDelay));
      }
    }

    setDroppingPitIndex(null);
    setActivePitIndex(null);

    // Capture Evaluation
    // Under Abapa rules: Capturing happens if last seed landed in opponent territory and made count 2 or 3
    const isPlayer1 = currentTurn === 1;
    const isLandingInOpponent = isPlayer1
      ? currentIndex >= 6 && currentIndex <= 11
      : currentIndex >= 0 && currentIndex <= 5;

    let updatedScores = [...scores] as [number, number];
    let capturedCount = 0;
    const capturedIndices: number[] = [];

    if (isLandingInOpponent && (currentPits[currentIndex] === 2 || currentPits[currentIndex] === 3)) {
      // Check backwards in opponent territory
      let checkIdx = currentIndex;
      while (
        (isPlayer1 && checkIdx >= 6 && checkIdx <= 11 && (currentPits[checkIdx] === 2 || currentPits[checkIdx] === 3)) ||
        (!isPlayer1 && checkIdx >= 0 && checkIdx <= 5 && (currentPits[checkIdx] === 2 || currentPits[checkIdx] === 3))
      ) {
        capturedIndices.push(checkIdx);
        checkIdx = (checkIdx - 1 + 12) % 12;
      }

      // Check Grand Slam Starvation exception: A move cannot capture ALL opponent seeds leaving them starved
      const remainingOpponentSeeds = (isPlayer1 ? [6, 7, 8, 9, 10, 11] : [0, 1, 2, 3, 4, 5]).reduce((acc, idx) => {
        return capturedIndices.includes(idx) ? acc : acc + currentPits[idx];
      }, 0);

      if (remainingOpponentSeeds > 0 || currentPits.every((p, idx) => (capturedIndices.includes(idx) ? 0 : p) === 0)) {
        // Legal harvest!
        for (const idx of capturedIndices) {
          capturedCount += currentPits[idx];
          currentPits[idx] = 0;
        }

        if (isPlayer1) {
          updatedScores[0] += capturedCount;
        } else {
          updatedScores[1] += capturedCount;
        }

        setLastCapturedPits(capturedIndices);
        setCapturedAnimation({ count: capturedCount, player: currentTurn });
        sounds.playCapture();

        if (isPlayer1) {
          setMessage(`Magnificent harvest! You captured ${capturedCount} seeds into your Kalo store.`);
          setElderCommentary(
            capturedCount >= 4
              ? "A royal sweep! You have outmaneuvered the court with that harvest."
              : "A steady harvest; every seed in your Kalo strengthens your diplomatic standing."
          );
        } else {
          setMessage(`${selectedPersona.name} captured ${capturedCount} seeds!`);
          setElderCommentary("Observe how the seeds were drawn into the capture trap. Plan your rebuttal carefully.");
        }
      } else {
        // Grand slam illegal: cannot starve opponent
        setMessage("The Grand Slam Rule: You cannot capture all opponent seeds and starve them. No seeds taken.");
        setElderCommentary("Ewo se woma wo yonko nso bi — An Akan sovereign leaves food for their fellow traveler.");
      }
    } else {
      if (isPlayer1) {
        setMessage("Seeds sown peacefully. Opponent prepares their reply...");
      } else {
        setMessage(`${selectedPersona.name} completed the sow. Your turn!`);
      }
    }

    setPits([...currentPits]);
    setScores(updatedScores);

    // Record Move in history
    const houseLetter = ['A', 'B', 'C', 'D', 'E', 'F', '12', '11', '10', '9', '8', '7'][startIndex];
    const moveLog = `${isPlayer1 ? 'You' : selectedPersona.name} sowed from ${houseLetter}${
      capturedCount > 0 ? ` (+${capturedCount} seeds)` : ''
    }`;
    setMoveHistory((prev) => [moveLog, ...prev.slice(0, 7)]);

    // Check Win / End Condition (Abapa standard: 25+ seeds captured)
    if (updatedScores[0] >= 25 || updatedScores[1] >= 25 || currentPits.every((p) => p === 0)) {
      setGameOver(true);
      setIsSowing(false);
      sounds.playVictory();

      if (updatedScores[0] >= 25) {
        setWinner('player1');
        setMessage(`👑 Victory! You captured ${updatedScores[0]} seeds and attained the Ashanti Oware Crown!`);
        setElderCommentary("A champion’s performance! The elders in Kumasi would rise to applaud your arithmetic.");
      } else if (updatedScores[1] >= 25) {
        setWinner('opponent');
        setMessage(`Game concluded! ${selectedPersona.name} captured ${updatedScores[1]} seeds to claim the match.`);
        setElderCommentary("A hard-fought contest. Even the greatest king was once an apprentice at the board.");
      } else {
        setWinner('draw');
        setMessage("An honorable 24-24 draw! A harmonious conclusion celebrated in Akan lore.");
        setElderCommentary("Equal wisdom shared between equals — the finest outcome in sacred diplomacy.");
      }
      return;
    }

    // Advance turn
    const nextTurn = currentTurn === 1 ? 2 : 1;
    setTurn(nextTurn);
    setIsSowing(false);

    // Trigger AI opponent if in AI mode and it's turn 2
    if (nextTurn === 2 && (gameMode === 'ai' || gameMode === 'demo')) {
      triggerAiMove(currentPits, updatedScores);
    } else if (nextTurn === 1 && gameMode === 'demo') {
      triggerDemoPlayer1Move(currentPits, updatedScores);
    }
  };

  // AI Logic implementing Abapa minimax & heuristic strategy
  const triggerAiMove = (currentPits: number[], currentScores: [number, number]) => {
    const aiThinkTime = animSpeed === 'instant' ? 50 : 850;

    setTimeout(() => {
      // Valid AI pits: houses 6 to 11
      const validPits = [6, 7, 8, 9, 10, 11].filter((idx) => currentPits[idx] > 0);
      if (validPits.length === 0) {
        setGameOver(true);
        setWinner('player1');
        setMessage("Opponent has no legal moves remaining. You win by containment!");
        return;
      }

      // Check if Player 1 has 0 seeds; AI MUST choose a move that feeds Player 1 if possible
      const p1Total = [0, 1, 2, 3, 4, 5].reduce((acc, idx) => acc + currentPits[idx], 0);
      let candidatePits = validPits;

      if (p1Total === 0) {
        const feedingPits = validPits.filter((idx) => (idx + currentPits[idx]) % 12 <= 5);
        if (feedingPits.length > 0) {
          candidatePits = feedingPits;
        }
      }

      // Minimax evaluation based on persona difficulty
      let chosenPit = candidatePits[0];

      if (selectedPersona.difficulty === 'Novice') {
        // Random move with slight preference for non-empty
        chosenPit = candidatePits[Math.floor(Math.random() * candidatePits.length)];
      } else {
        // Tactical evaluation: look for immediate captures, kroo building, or trap setups
        let bestScore = -999;

        for (const pitIdx of candidatePits) {
          let moveScore = 0;
          const sim = [...currentPits];
          let seeds = sim[pitIdx];
          sim[pitIdx] = 0;
          let curr = pitIdx;

          while (seeds > 0) {
            curr = (curr + 1) % 12;
            if (curr === pitIdx && sim[pitIdx] >= 12) curr = (curr + 1) % 12;
            sim[curr]++;
            seeds--;
          }

          // Capture potential
          if (curr >= 0 && curr <= 5 && (sim[curr] === 2 || sim[curr] === 3)) {
            let temp = curr;
            let cap = 0;
            while (temp >= 0 && temp <= 5 && (sim[temp] === 2 || sim[temp] === 3)) {
              cap += sim[temp];
              temp = (temp - 1 + 12) % 12;
            }
            moveScore += cap * 10;
          }

          // Bonus for setting up a Kroo loop (12 seeds)
          if (currentPits[pitIdx] >= 11) moveScore += 5;

          // Bonus if Grandmaster avoids leaving high vulnerability on their side
          if (selectedPersona.difficulty === 'Grandmaster') {
            const vulnerableHouses = [6, 7, 8, 9, 10, 11].filter((idx) => sim[idx] === 1 || sim[idx] === 2).length;
            moveScore -= vulnerableHouses * 2;
          }

          if (moveScore > bestScore) {
            bestScore = moveScore;
            chosenPit = pitIdx;
          }
        }
      }

      executeAnimatedSow(chosenPit, 2);
    }, aiThinkTime);
  };

  // Automated Demo mode player 1
  const triggerDemoPlayer1Move = (currentPits: number[], currentScores: [number, number]) => {
    setTimeout(() => {
      const valid = [0, 1, 2, 3, 4, 5].filter((idx) => currentPits[idx] > 0);
      if (valid.length === 0) return;
      const pick = valid[Math.floor(Math.random() * valid.length)];
      executeAnimatedSow(pick, 1);
    }, 900);
  };

  // Helper to render individual 3D seeds inside a pit
  const renderSeeds = (count: number) => {
    if (count === 0) return null;
    const displayCount = Math.min(count, 12);

    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {Array.from({ length: displayCount }).map((_, i) => {
          const pos = SEED_POSITIONS[i % SEED_POSITIONS.length];
          // Organic mottled nickar seed styling (brown, khaki, olive-grey hues)
          const seedGradients = [
            'from-[#4A3B2C] via-[#63503C] to-[#2E2419]',
            'from-[#5C4D38] via-[#756349] to-[#3B3020]',
            'from-[#3E3832] via-[#544C44] to-[#24211D]',
            'from-[#68533E] via-[#856C51] to-[#453728]',
          ];
          const seedStyle = seedGradients[i % seedGradients.length];

          return (
            <div
              key={i}
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px) rotate(${pos.r}deg)`,
                width: '18px',
                height: '14px',
              }}
              className={`absolute rounded-full bg-gradient-to-br ${seedStyle} shadow-[1px_2px_4px_rgba(0,0,0,0.85)] border-[0.5px] border-amber-200/30 flex items-center justify-center transition-all duration-300 animate-in zoom-in-75`}
            >
              {/* Specular 3D pebble glint */}
              <div className="w-1.5 h-1 bg-white/45 rounded-full -mt-1 -ml-1 blur-[0.3px]" />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 pb-20">
      {/* Navigation and Quick Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#F7D070] hover:text-[#E5A93C] transition-colors glass-pill px-4 py-2 rounded-full cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Games Sanctuary</span>
        </button>

        {/* Tactical Controls & Viewport Switchers */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 glass-pill hover:border-[#E5A93C] rounded-full text-xs text-[#F5F1EA] cursor-pointer shadow-sm"
            title={soundEnabled ? 'Mute Wooden Clacks' : 'Unmute Sound'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#E5A93C]" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* 3D Perspective Toggle */}
          <button
            onClick={() => setIs3DView(!is3DView)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all shadow-sm ${
              is3DView
                ? 'bg-[#E5A93C] text-[#0B0A08] font-bold shadow-[0_0_15px_rgba(229,169,60,0.4)]'
                : 'glass-pill text-[#F5F1EA] hover:border-[#E5A93C]'
            }`}
            title="Toggle 3D Physical Board Tilt"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{is3DView ? '3D View' : '2D Tactical'}</span>
          </button>

          {/* Sowing Speed */}
          <button
            onClick={() => {
              if (animSpeed === 'normal') setAnimSpeed('fast');
              else if (animSpeed === 'fast') setAnimSpeed('instant');
              else setAnimSpeed('normal');
            }}
            className="flex items-center gap-1.5 glass-pill px-3 py-1.5 rounded-full text-xs text-[#F5F1EA] hover:border-[#E5A93C] cursor-pointer"
            title="Adjust Sowing Animation Speed"
          >
            <Zap className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span className="capitalize">{animSpeed}</span>
          </button>

          {/* Undo Move */}
          <button
            onClick={handleUndo}
            disabled={previousStates.length === 0 || isSowing || gameOver}
            className="p-2 glass-pill disabled:opacity-40 hover:border-[#E5A93C] rounded-full text-[#F5F1EA] cursor-pointer shadow-sm"
            title="Undo Last Move"
            aria-label="Undo Last Move"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Hint */}
          <button
            onClick={handleHint}
            disabled={turn !== 1 || isSowing || gameOver}
            className="flex items-center gap-1.5 glass-pill border-[#E5A93C]/40 text-[#F7D070] hover:border-[#E5A93C] px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer shadow-sm disabled:opacity-40"
            title="Ask Elder Kofi for a Tactical Move Hint"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span className="hidden sm:inline">Ask Hint</span>
          </button>

          {/* Rules Guide */}
          <button
            onClick={() => setShowRulesModal(true)}
            className="p-2 glass-pill hover:border-[#E5A93C] rounded-full text-[#F5F1EA] cursor-pointer shadow-sm"
            title="Abapa Tournament Rules"
            aria-label="Abapa Tournament Rules"
          >
            <HelpCircle className="w-4 h-4 text-[#F7D070]" />
          </button>

          {/* Restart */}
          <button
            onClick={resetGame}
            className="flex items-center gap-1.5 bg-[#E5A93C] hover:bg-[#F7D070] text-[#0B0A08] font-bold text-xs px-3.5 py-1.5 rounded-full shadow-md cursor-pointer transition-transform hover:scale-105"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>Restart</span>
          </button>
        </div>
      </div>

      {/* Main Glassmorphic Game Arena */}
      <div className="glass-panel rounded-3xl p-4 sm:p-7 border border-[#E5A93C]/30 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
        {/* Subtle Adinkra background watermark */}
        <div className="absolute -top-12 -right-12 w-80 h-80 opacity-5 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#E5A93C]" fill="currentColor">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="4" fill="none" />
            <path d="M50 15 L50 85 M15 50 L85 50" stroke="currentColor" strokeWidth="3" />
          </svg>
        </div>

        {/* Persona & Match Banner */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-5 border-b border-[#2C261F]/70">
          <div className="flex items-center gap-3.5">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#E5A93C] shadow-md shrink-0">
              <img
                src={selectedPersona.avatar}
                alt={selectedPersona.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border border-black" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#F7D070]">
                  {gameMode === 'pass_and_play' ? '2-Player Local Pass & Play' : selectedPersona.name}
                </h3>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#E5A93C]/15 border border-[#E5A93C]/30 text-[#E5A93C]">
                  {gameMode === 'pass_and_play' ? 'Local Duo' : selectedPersona.difficulty}
                </span>
              </div>
              <p className="text-xs text-[#A39B8E] max-w-md line-clamp-1">
                {gameMode === 'pass_and_play'
                  ? 'Two players sharing the screen. South (1-6) vs North (7-12).'
                  : selectedPersona.bio}
              </p>
            </div>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-1.5 p-1 glass-pill rounded-full text-xs">
            <button
              onClick={() => {
                setGameMode('ai');
                resetGame();
              }}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                gameMode === 'ai' ? 'bg-[#E5A93C] text-[#0B0A08] font-bold shadow-sm' : 'text-[#A39B8E] hover:text-[#F5F1EA]'
              }`}
            >
              vs Elder
            </button>
            <button
              onClick={() => {
                setGameMode('pass_and_play');
                resetGame();
              }}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                gameMode === 'pass_and_play' ? 'bg-[#E5A93C] text-[#0B0A08] font-bold shadow-sm' : 'text-[#A39B8E] hover:text-[#F5F1EA]'
              }`}
            >
              Pass & Play
            </button>
            <button
              onClick={() => {
                setGameMode('demo');
                resetGame();
              }}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                gameMode === 'demo' ? 'bg-[#E5A93C] text-[#0B0A08] font-bold shadow-sm' : 'text-[#A39B8E] hover:text-[#F5F1EA]'
              }`}
            >
              Auto Demo
            </button>
          </div>
        </div>

        {/* Live Status Message & Elder Commentary */}
        <div className="my-5 flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl glass-card border border-[#E5A93C]/20 text-xs">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                turn === 1 ? 'bg-amber-400 animate-pulse shadow-[0_0_8px_#F5A623]' : 'bg-emerald-400 animate-pulse shadow-[0_0_8px_#10B981]'
              }`}
            />
            <span className="text-[#F5F1EA] font-medium">{message}</span>
          </div>

          <div className="text-[#F7D070] italic font-serif flex items-center gap-1.5 shrink-0 text-right">
            <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span>&ldquo;{elderCommentary}&rdquo;</span>
          </div>
        </div>

        {/* 3D Real Wooden Board Container */}
        <div
          ref={boardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTilt}
          style={{
            perspective: '1200px',
          }}
          className="my-6 py-4 flex justify-center items-center select-none"
        >
          <div
            style={{
              transform: is3DView
                ? `rotateX(${boardTilt.x}deg) rotateY(${boardTilt.y}deg) translateZ(10px)`
                : 'rotateX(0deg) rotateY(0deg)',
              transformStyle: 'preserve-3d',
              transition: isSowing ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="relative w-full max-w-4xl bg-gradient-to-b from-[#2B170B] via-[#3D2111] to-[#1E0F07] rounded-3xl p-5 sm:p-7 border-[6px] border-[#522D16] shadow-[0_30px_60px_rgba(0,0,0,0.9),0_10px_20px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.15),inset_0_-4px_8px_rgba(0,0,0,0.8)]"
          >
            {/* Real Wood Grain & Bevel Highlight Overlay */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-black/40" />

            {/* Layout: Left Store Bowl + 2x6 Grid + Right Store Bowl */}
            <div className="grid grid-cols-1 md:grid-cols-[90px_1fr_90px] gap-4 items-center">
              {/* Left End Bowl: Opponent's Store (Nam-Nam / Kalo) */}
              <div className="order-2 md:order-1 flex flex-col items-center">
                <div className="text-[11px] font-mono text-[#E5A93C] font-semibold mb-1">
                  {gameMode === 'pass_and_play' ? 'P2 Store' : 'Elder Store'}
                </div>
                <div className="relative w-20 h-28 sm:w-20 sm:h-36 rounded-full bg-gradient-to-b from-[#140B05] to-[#24130A] border-4 border-[#422412] shadow-[inset_0_12px_24px_rgba(0,0,0,0.95)] flex flex-col items-center justify-center p-2">
                  <div className="text-xl sm:text-2xl font-bold font-mono text-[#F7D070] drop-shadow-md">
                    {scores[1]}
                  </div>
                  <span className="text-[9px] font-mono text-[#A39B8E] mt-0.5">seeds</span>
                  {/* Visual seeds in store */}
                  <div className="mt-1 flex flex-wrap justify-center gap-0.5 max-w-[48px] max-h-[30px] overflow-hidden opacity-80">
                    {Array.from({ length: Math.min(scores[1], 10) }).map((_, i) => (
                      <span key={i} className="w-2 h-2 rounded-full bg-[#E5A93C] shadow-xs" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Center: 2 Rows of 6 Pits with Carved Akan Divider */}
              <div className="order-1 md:order-2 space-y-4">
                {/* Row 1: North (Opponent / Elder Houses 12 to 7 -> indices 11 down to 6) */}
                <div>
                  <div className="flex items-center justify-between text-xs text-[#E8C87A] px-2 mb-2 font-mono">
                    <span className="text-[11px] text-[#A39B8E]">
                      {gameMode === 'pass_and_play' ? 'Player 2 (North)' : `${selectedPersona.name}’s Granary`}
                    </span>
                    <span>Houses 12 → 7</span>
                  </div>

                  <div className="grid grid-cols-6 gap-2 sm:gap-3.5">
                    {[11, 10, 9, 8, 7, 6].map((pitIdx) => {
                      const seedCount = pits[pitIdx];
                      const isTarget = droppingPitIndex === pitIdx;
                      const isSource = activePitIndex === pitIdx;
                      const isCaptured = lastCapturedPits.includes(pitIdx);

                      return (
                        <button
                          key={pitIdx}
                          disabled={turn === 1 || isSowing || gameOver || (gameMode === 'ai' && turn === 2)}
                          onClick={() => handlePitClick(pitIdx)}
                          style={{ transformStyle: 'preserve-3d' }}
                          className={`relative aspect-square rounded-full transition-all duration-200 cursor-pointer flex flex-col items-center justify-center ${
                            isSource
                              ? 'border-2 border-amber-400 ring-4 ring-amber-400/40 shadow-[0_0_20px_#F5A623]'
                              : isTarget
                              ? 'border-2 border-emerald-400 ring-4 ring-emerald-400/40 scale-105'
                              : isCaptured
                              ? 'border-2 border-rose-500 ring-4 ring-rose-500/50 animate-pulse'
                              : 'border-2 border-[#542F17] hover:border-[#F7D070]/70'
                          } bg-gradient-to-b from-[#140B05] via-[#1E0F07] to-[#2B160B] shadow-[inset_0_10px_20px_rgba(0,0,0,0.95),inset_0_-2px_4px_rgba(255,255,255,0.08)]`}
                        >
                          {/* House Number Kicker */}
                          <span className="absolute top-1.5 text-[10px] font-mono text-[#8C6D4F]">
                            #{pitIdx + 1}
                          </span>

                          {/* Physical 3D Nickar Seeds inside pit */}
                          {renderSeeds(seedCount)}

                          {/* Numeric Counter Badge in center/bottom */}
                          <div
                            className={`z-10 mt-5 px-2 py-0.5 rounded-full font-mono text-xs font-bold ${
                              seedCount === 0
                                ? 'text-slate-500 opacity-40'
                                : 'bg-[#0B0A08]/85 text-[#F7D070] border border-[#E5A93C]/40 shadow-xs'
                            }`}
                          >
                            {seedCount}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Carved Central Akan Divider with Golden Inlaid Adinkra Symbols */}
                <div className="relative h-7 flex items-center justify-center border-y border-[#522D16] bg-[#221208]/90">
                  <div className="flex items-center gap-6 sm:gap-12 text-[#E5A93C] text-[11px] font-serif tracking-widest uppercase">
                    <span className="flex items-center gap-1.5 opacity-80">
                      <span className="text-xs">⚔️</span>
                      <span>Gye Nyame</span>
                    </span>
                    <span className="text-[#A39B8E] hidden sm:inline">· Abapa Sacred Rules ·</span>
                    <span className="flex items-center gap-1.5 opacity-80">
                      <span>Nyansapo</span>
                      <span className="text-xs">📜</span>
                    </span>
                  </div>
                </div>

                {/* Row 2: South (Player 1 Houses 1 to 6 -> indices 0 to 5) */}
                <div>
                  <div className="grid grid-cols-6 gap-2 sm:gap-3.5">
                    {[0, 1, 2, 3, 4, 5].map((pitIdx) => {
                      const seedCount = pits[pitIdx];
                      const isTarget = droppingPitIndex === pitIdx;
                      const isSource = activePitIndex === pitIdx;
                      const isCaptured = lastCapturedPits.includes(pitIdx);
                      const isHint = hintPit === pitIdx;
                      const isPlayable = turn === 1 && seedCount > 0 && !isSowing && !gameOver;

                      return (
                        <button
                          key={pitIdx}
                          disabled={!isPlayable}
                          onClick={() => handlePitClick(pitIdx)}
                          style={{ transformStyle: 'preserve-3d' }}
                          className={`relative aspect-square rounded-full transition-all duration-200 ${
                            isPlayable ? 'cursor-pointer hover:scale-105' : 'cursor-default'
                          } flex flex-col items-center justify-center ${
                            isSource
                              ? 'border-2 border-amber-400 ring-4 ring-amber-400/40 shadow-[0_0_20px_#F5A623]'
                              : isTarget
                              ? 'border-2 border-emerald-400 ring-4 ring-emerald-400/40 scale-105'
                              : isCaptured
                              ? 'border-2 border-rose-500 ring-4 ring-rose-500/50 animate-pulse'
                              : isHint
                              ? 'border-2 border-[#E5A93C] ring-4 ring-[#E5A93C]/50 animate-bounce'
                              : isPlayable
                              ? 'border-2 border-[#E5A93C]/60 hover:border-[#F7D070] shadow-[0_0_12px_rgba(229,169,60,0.25)]'
                              : 'border-2 border-[#542F17]'
                          } bg-gradient-to-b from-[#140B05] via-[#1E0F07] to-[#2B160B] shadow-[inset_0_10px_20px_rgba(0,0,0,0.95),inset_0_-2px_4px_rgba(255,255,255,0.08)]`}
                        >
                          {/* House Letter / Number Kicker */}
                          <span className="absolute top-1.5 text-[10px] font-mono text-[#E5A93C] font-semibold">
                            #{pitIdx + 1} ({['A', 'B', 'C', 'D', 'E', 'F'][pitIdx]})
                          </span>

                          {/* Physical 3D Nickar Seeds */}
                          {renderSeeds(seedCount)}

                          {/* Numeric Counter Badge in center/bottom */}
                          <div
                            className={`z-10 mt-5 px-2 py-0.5 rounded-full font-mono text-xs font-bold ${
                              seedCount === 0
                                ? 'text-slate-500 opacity-40'
                                : 'bg-[#0B0A08]/85 text-[#F7D070] border border-[#E5A93C]/50 shadow-md'
                            }`}
                          >
                            {seedCount}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#E8C87A] px-2 mt-2 font-mono">
                    <span className="text-[11px] text-[#A39B8E]">Your Granary (South)</span>
                    <span>Houses 1 → 6 (A-F) {turn === 1 && !isSowing && !gameOver && '✨ Tap to sow'}</span>
                  </div>
                </div>
              </div>

              {/* Right End Bowl: Player 1's Store (Nam-Nam / Kalo) */}
              <div className="order-3 flex flex-col items-center">
                <div className="text-[11px] font-mono text-[#E5A93C] font-semibold mb-1">
                  Your Store (Kalo)
                </div>
                <div className="relative w-20 h-28 sm:w-20 sm:h-36 rounded-full bg-gradient-to-b from-[#140B05] to-[#24130A] border-4 border-[#422412] shadow-[inset_0_12px_24px_rgba(0,0,0,0.95)] flex flex-col items-center justify-center p-2">
                  <div className="text-xl sm:text-2xl font-bold font-mono text-[#F7D070] drop-shadow-md">
                    {scores[0]}
                  </div>
                  <span className="text-[9px] font-mono text-[#A39B8E] mt-0.5">seeds</span>
                  {/* Visual seeds in store */}
                  <div className="mt-1 flex flex-wrap justify-center gap-0.5 max-w-[48px] max-h-[30px] overflow-hidden opacity-80">
                    {Array.from({ length: Math.min(scores[0], 10) }).map((_, i) => (
                      <span key={i} className="w-2 h-2 rounded-full bg-[#E5A93C] shadow-xs" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Capture Burst Animation Overlay */}
        {capturedAnimation && (
          <div className="my-2 p-3 rounded-2xl bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-amber-500/20 border border-[#E5A93C]/40 text-center animate-in zoom-in-95 duration-200">
            <span className="text-sm font-bold text-[#F7D070] flex items-center justify-center gap-2">
              <Trophy className="w-4 h-4 text-[#E5A93C]" />
              <span>
                {capturedAnimation.player === 1 ? 'You' : selectedPersona.name} collected +
                {capturedAnimation.count} Nickar seeds in harvest!
              </span>
            </span>
          </div>
        )}

        {/* Tactical Footer: Move Log & Ashanti Cultural Persona Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-5 border-t border-[#2C261F]/70 text-xs">
          {/* Opponent Selection (Kumasi Masters) */}
          <div className="glass-card p-4 rounded-2xl space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#F7D070] uppercase tracking-wider text-[11px]">
                Choose Opponent Persona
              </span>
              <span className="text-[#A39B8E] font-mono text-[10px]">Ashanti Masters</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {PERSONAS.map((persona) => (
                <button
                  key={persona.id}
                  onClick={() => {
                    setSelectedPersona(persona);
                    resetGame();
                  }}
                  className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                    selectedPersona.id === persona.id && gameMode === 'ai'
                      ? 'border-[#E5A93C] bg-[#E5A93C]/15 shadow-sm'
                      : 'border-[#2C261F] hover:border-[#E5A93C]/40'
                  }`}
                >
                  <div className="font-bold text-[#F5F1EA] truncate">{persona.name.split(' ')[1] || persona.name}</div>
                  <div className="text-[10px] text-[#A39B8E] font-mono">{persona.difficulty}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Move Log History */}
          <div className="glass-card p-4 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#F7D070] uppercase tracking-wider text-[11px]">
                Tactical Sowing History
              </span>
              <span className="text-[#A39B8E] font-mono text-[10px]">Target: 25 seeds</span>
            </div>

            <div className="space-y-1 font-mono text-[11px] text-[#A39B8E] max-h-24 overflow-y-auto">
              {moveHistory.length === 0 ? (
                <div className="text-slate-500 italic">No moves recorded yet.</div>
              ) : (
                moveHistory.map((log, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-[#E5A93C]">›</span>
                    <span>{log}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Abapa Tournament Rules & Heritage Modal */}
      {showRulesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in-0">
          <div className="glass-panel border border-[#E5A93C]/40 rounded-3xl max-w-lg w-full p-6 shadow-2xl text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#2C261F]">
              <div className="flex items-center gap-2">
                <span className="text-xl">🇬🇭</span>
                <h3 className="font-serif font-bold text-lg text-[#F7D070]">
                  Abapa Rules: The National Asante Code
                </h3>
              </div>
              <button
                onClick={() => setShowRulesModal(false)}
                className="text-[#A39B8E] hover:text-[#F5F1EA] text-sm p-1"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-[#F5F1EA]/85 space-y-2.5 leading-relaxed max-h-[60vh] overflow-y-auto">
              <p>
                <strong>The Board & Seeds:</strong> 12 houses (6 per player) carved from Osese or Mahogany wood, initially populated with exactly 4 nickar seeds each (48 total).
              </p>
              <p>
                <strong>Sowing:</strong> On your turn, pick up all seeds from any house on your side and sow them one-by-one counter-clockwise. If a pit holds 12+ seeds (a &ldquo;Kroo&rdquo;), the originating pit is skipped.
              </p>
              <p>
                <strong>Capturing:</strong> If your final seed lands in an opponent’s pit bringing the seed count to <strong>2 or 3 seeds</strong>, you harvest them. Preceding consecutive houses also containing 2 or 3 seeds are captured in a chain!
              </p>
              <p>
                <strong>Hospitality (Starvation Rule):</strong> You must never leave your opponent with zero seeds if a legal move can supply them with seeds.
              </p>
              <p>
                <strong>Victory:</strong> First player to collect <strong>25 seeds</strong> wins the crown. 24-24 is a royal draw.
              </p>
            </div>

            <div className="pt-3 border-t border-[#2C261F] flex justify-end">
              <button
                onClick={() => setShowRulesModal(false)}
                className="bg-[#E5A93C] hover:bg-[#F7D070] text-[#0B0A08] font-bold text-xs px-6 py-2 rounded-full cursor-pointer"
              >
                Understood, Return to Board
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
