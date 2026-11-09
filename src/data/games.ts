import { GameItem, StoryItem, CommunityPost } from '../types';

export const GAMES: GameItem[] = [
  {
    id: 'oware',
    name: 'Oware',
    category: 'board',
    subcategory: 'Asante Royal Strategy',
    country: 'Ghana (Akan / Asante)',
    culturalOrigin: 'Ashanti Empire & Akan Traditional Kingdoms',
    description: 'Ghana’s premier national game of mathematical precision, strategic sowing, and deep royal wisdom.',
    longDescription: 'Oware is an ancestral Mancala game rooted deeply among the Akan and Ga communities of Ghana. Carved from native sacred hardwoods such as Osese (Holarrhena wulfsbergii) or Mahogany, players sow grey nickar tree seeds (Oware aba) across 12 pits. In traditional Akan courtyards, Oware matches were played under baobab trees or palace verandas, testing royal advisors’ foresight, self-control, and mathematical calculation.',
    history: 'Originating among the Akan people of Ghana, oral history credits the Asante royal courts with codifying Oware tournaments. The game is celebrated worldwide for training mental calculation without pencil or paper. King Prempeh I and Akan leaders prized Oware for honing strategic patience before diplomacy. It was considered improper to play at night in ancient times, so as not to disturb the spirits who also gathered to play.',
    equipment: [
      'Carved solid hardwood board with 12 pits (6 per player) and 2 storage end-cups (Kalo)',
      '48 grey nickar tree seeds (Caesalpinia bonduc, known in Twi as Oware aba)',
      'Traditionally sculpted from Osese, Mahogany, or Tweneboa wood adorned with Adinkra symbols'
    ],
    rules: [
      'The board has 12 pits (6 on your side, 6 on your opponent’s side) with 4 seeds placed in each pit at the start (48 total).',
      'Players take turns picking up all seeds from any pit on their own side and sowing them one-by-one counter-clockwise into subsequent pits.',
      'If a pit contains 12 or more seeds (a "Kroo"), the starting pit is skipped during the lap of sowing.',
      'If your final sown seed lands in an opponent’s pit bringing the seed count to exactly 2 or 3 seeds, you capture them immediately.',
      'Consecutive preceding pits on the opponent side also containing 2 or 3 seeds are captured in a single sweeping harvest.',
      'Starvation Rule: You must never intentionally leave your opponent with no seeds to move if an alternative move is possible.',
      'First player to collect 25 or more seeds wins the match; 24-24 is a honorable draw.'
    ],
    scoringDetails: 'First to 25 captured seeds wins. Captures occur only on the opponent side when the final seed brings a pit to 2 or 3 seeds.',
    proverb: {
      text: 'Wo firi kuro mu a, w’adwene firi w’akyi.',
      meaning: 'When you step forward into the world, leave wisdom and thoughtful paths behind you.'
    },
    tactics: [
      'The Grand March: Accumulate 12+ seeds in your rightmost pit to execute a full board lap and surprise your rival.',
      'Seed Starvation Defense: Keep your opponent’s pits sparse while protecting your home storage.',
      'Trap Pits: Leave pits with 1 seed on your opponent’s side to bait them into sowing into your capture zones.'
    ],
    akanTerminology: [
      { term: 'Oware aba', meaning: 'Nickar seeds used as game pieces' },
      { term: 'Kalo', meaning: 'The large end-bowl where harvested seeds are stored' },
      { term: 'Kroo', meaning: 'A pit with 12 or more seeds that loops the entire board' },
      { term: 'Mpete', meaning: 'Sowing or distributing seeds smoothly' }
    ],
    players: '2 Players',
    difficulty: 'Medium',
    image: '/src/assets/images/ghana_oware_carved_1794255704478.jpg',
    isFeatured: true,
    playableType: 'none'
  },
  {
    id: 'ampe',
    name: 'Ampe',
    category: 'active',
    subcategory: 'Rhythm, Song & Footwork',
    country: 'Ghana (National)',
    culturalOrigin: 'Akan, Ga, and Ewe Communities Across Ghana',
    description: 'A vibrant Ghanaian jumping and rhythmic clapping game celebrating synchronization, speed, and agility.',
    longDescription: 'Ampe is Ghana’s most celebrated traditional energetic sport played across school compounds, church courtyards, and neighborhood lanes from Accra to Tamale. Players clap their hands in tandem, jump together, and thrust either their left or right foot forward upon landing. In competitive school games, entire groups form cheering circles chanting rhythmic songs.',
    history: 'Practiced across Ghana for centuries, Ampe is renowned for cultivating peer camaraderie, split-second reflexes, and joyful aerobic endurance. While historically championed by young girls, it is now played across Ghana by youth of all ages and featured in national cultural festivals and school athletic competitions.',
    equipment: [
      'Open ground, school compound, or paved courtyard',
      'No physical equipment needed—just rhythm, fast reflexes, and voice',
      'Optional chalk circle for marking tournament boundaries'
    ],
    rules: [
      'Two players face each other, clap hands, and leap into the air synchronously in time with the chant.',
      'Upon landing, each player simultaneously thrusts either their left foot or right foot forward.',
      'In "Ohyi" mode: The leader scores if matching feet land forward (e.g., leader’s right meets opponent’s right).',
      'In "Otwene" mode: The opponent scores or takes the leadership when non-matching feet are extended.',
      'Tournament rounds are played until the first player or team reaches 10 points.'
    ],
    scoringDetails: 'First to reach 10 points wins the crown. In team elimination format, the victor stays on to face the next challenger.',
    proverb: {
      text: 'Baako huru a, ɛnyɛ fɛ.',
      meaning: 'When one leaps alone, the dance lacks beauty; true joy is found in unison.'
    },
    tactics: [
      'Rhythm Disruption: Vary your jump height slightly to bait the opponent into committing their foot early.',
      'Peripheral Vision: Watch your opponent’s hip shift rather than their foot to predict their landing leg.',
      'Psychological Confidence: Loud hand claps and confident chants unsettle hesitation in challengers.'
    ],
    akanTerminology: [
      { term: 'Ampe! Ebie! Ebie!', meaning: 'The classic opening chant initiating the rhythm' },
      { term: 'Ohyi', meaning: 'Scoring when matching feet meet' },
      { term: 'Otwene', meaning: 'Scoring when opposite/cross feet meet' },
      { term: 'Simpa', meaning: 'The team line-up elimination tournament style' }
    ],
    players: '2+ Players',
    difficulty: 'Easy',
    image: '/src/assets/images/ghana_ampe_girls_1794255706526.jpg',
    isFeatured: true,
    playableType: 'ampe'
  },
  {
    id: 'pilolo',
    name: 'Pilolo',
    category: 'active',
    subcategory: 'Observation, Stealth & Sprint',
    country: 'Ghana (Ga & Akan)',
    culturalOrigin: 'Ga Coastal & Greater Accra Neighborhoods',
    description: 'Ghana’s timeless twilight hide-and-seek sprint where keen eyes and rapid dashing win the prize.',
    longDescription: 'Pilolo (from the Ga dialect meaning "searching for what was hidden") is played in village squares and suburban compounds as dusk approaches. One designated referee or hider secretly conceals sticks, stones, or coins while competitors face a wall with eyes covered. When the call "Pilolo!" rings out, runners dash to discover the item and sprint past the finish marker.',
    history: 'A foundational childhood experience in Ghanaian neighborhoods, Pilolo taught young hunters and scouts spatial awareness, quiet tracking, and sudden explosive sprinting. It brings communities of all ages together under the evening moon.',
    equipment: [
      'Small tokens: carved wooden sticks, polished stones, or coins',
      'Designated boundary area (compound, courtyard, or open field)',
      'A defined finish line or home tree (safe zone)'
    ],
    rules: [
      'The Game Master (Maa) secretly hides tokens in bushes, crevices, or compound corners while players face the wall.',
      'Upon hearing the command shout "PILOLO!", all players turn and frantically search the area.',
      'The moment you spot your token, snatch it and sprint at top speed toward the finish line.',
      'While sprinting to the finish line, you must shout "Bleoo!" (carefully/slowly) to declare your run.',
      'First player to cross the finish line with an authentic token wins the round.'
    ],
    scoringDetails: '1 point per round for the first seeker across the finish line with a verified token.',
    proverb: {
      text: 'Nea ɔhwehwɛ no na ɔhunu.',
      meaning: 'He who diligently searches with keen eyes is the one who discovers the treasure.'
    },
    tactics: [
      'Deceptive Searching: When you spot the item, pretend to search elsewhere for a second so other players do not swarm your path.',
      'Angle of Approach: Approach from an angle that leaves you a direct, unobstructed sprint back to the finish line.',
      'Stealth Grab: Snatch the token smoothly without breaking your running stride.'
    ],
    akanTerminology: [
      { term: 'Pilolo', meaning: 'Ga phrase for "Search for the hidden thing"' },
      { term: 'Bleoo', meaning: 'Twi/Ga cry of "Slow down!" or "Carefully!" as you cross the line' },
      { term: 'Maa', meaning: 'The trusted game director or referee' }
    ],
    players: '3+ Players',
    difficulty: 'Easy',
    image: '/src/assets/images/ghana_pilolo_game_1794255706173.jpg',
    isFeatured: true,
    playableType: 'pilolo'
  },
  {
    id: 'chaskele',
    name: 'Chaskele',
    category: 'active',
    subcategory: 'Ghanaian Street Cricket',
    country: 'Ghana (Ashanti & Greater Accra)',
    culturalOrigin: 'Urban Ghanaian Neighborhoods (Kumasi, Takoradi, Accra)',
    description: 'Ghana’s legendary improvised street cricket played with a flattened tin can wicket and wooden bat.',
    longDescription: 'Chaskele is an extraordinary testament to Ghanaian ingenuity. Utilizing recycled tin cans (such as Geisha mackerel or tomato puree tins) stacked atop a stone and a hand-whittled wooden stave or wooden plank, kids in Kumasi, Takoradi, and Accra transform dusty alleys into lively sports stadiums.',
    history: 'Born from spontaneous neighborhood creativity, Chaskele has entertained generations of Ghanaians. It develops extraordinary hand-eye coordination, quick batting reflexes, and sportsmanship without the need for expensive imported equipment.',
    equipment: [
      'Flattened tin can (traditionally empty Geisha mackerel or tomato tin)',
      'Whittled wooden plank or tree-branch bat',
      'Wicket base: a flat stone or brick upon which the tin can is balanced',
      'Small rubber ball, tennis ball, or tightly rolled sock ball'
    ],
    rules: [
      'The batter stands guard defending the balanced tin can wicket.',
      'The bowler bowls from 8 to 10 paces away aiming directly to knock down the tin can.',
      'If the tin can is struck down by the bowler, the batter is out immediately.',
      'If the batter hits the ball into the field, they sprint back and forth between markers to score runs.',
      'Fielders attempt to retrieve the ball and hit the tin can before the batter completes their sprint.'
    ],
    scoringDetails: '1 run for each sprint between the strike stone and bowler line. Batter is dismissed if the can is knocked over or ball caught on the fly.',
    proverb: {
      text: 'Adwene da nsa mu.',
      meaning: 'Craftsmanship and genius reside within our own hands.'
    },
    tactics: [
      'Low Ground Defense: Keep the bat low near the stone base to block yorkers aimed at the can.',
      'Placement over Power: Tap the ball into alley crevices to allow time for two full sprints.',
      'Quick Field Throwing: Fielders relay the ball quickly to the closest defender at the wicket.'
    ],
    akanTerminology: [
      { term: 'Chaskele', meaning: 'Street cricket game named after the distinctive sound of striking the tin' },
      { term: 'Geisha tin', meaning: 'The classic cylindrical tin can used as the target wicket' },
      { term: 'Bɔ mu', meaning: 'The cheer for a clean strike' }
    ],
    players: '4+ Players',
    difficulty: 'Medium',
    image: '/src/assets/images/ghana_chaskele_street_1794255706037.jpg',
    isFeatured: true,
    playableType: 'chaskele'
  },
  {
    id: 'dame',
    name: 'Dame (Ghanaian Draughts)',
    category: 'board',
    subcategory: 'Mastermind Board Strategy',
    country: 'Ghana (National)',
    culturalOrigin: 'Akan, Ga & Urban Trading Hubs',
    description: 'The electrifying Ghanaian draughts variant famous for flying kings, thunderous piece slams, and packed spectator benches.',
    longDescription: 'In Ghana, Dame is more than a board game—it is high theater. Carved wooden boards set on simple wooden benches attract crowds in bustling bus terminals, chop bars, and neighborhood spots across Accra and Kumasi. Players slam wooden checkers pieces down with theatrical flair, executing breathtaking multi-jump sweeps.',
    history: 'Ghana is internationally famous in the draughts world, having produced multiple African and world draughts grandmasters. The game is celebrated for its demanding tactical traps, flying kings, and tactical sacrifices.',
    equipment: [
      'Hand-crafted 10x10 or 8x8 checkered wooden board',
      '40 carved wooden pieces (20 dark pieces, 20 light pieces)',
      'Spectator bench and bustling shade tree'
    ],
    rules: [
      'Played on checkered board; pieces move diagonally forward one square.',
      'Capturing is strictly mandatory—if an opponent piece can be jumped, you must jump it.',
      'The "Majority Capture" rule: if multiple capture paths exist, you must choose the path that takes the highest number of pieces.',
      'A piece that reaches the opponent’s back rank is crowned a "Flying King" (Dam).',
      'A Flying King can glide diagonally across multiple open squares and capture from a distance.',
      'The match is won when all opponent pieces are captured or completely blocked from moving.'
    ],
    scoringDetails: 'Win by elimination or entrapment. Drawn only by agreement or 3-fold repetition of moves.',
    proverb: {
      text: 'Nyansa nni baako tirim.',
      meaning: 'Wisdom does not sit in one single head alone; every match teaches both master and apprentice.'
    },
    tactics: [
      'The Sacrificial Gambit: Offer 1 piece to lure the opponent into a corridor where your king can sweep 4 pieces.',
      'Center Control: Maintain control of the 4 central squares to dominate diagonal diagonals.',
      'The Slam Psychology: Striking your piece firmly on the board unsettles an indecisive rival.'
    ],
    akanTerminology: [
      { term: 'Dam', meaning: 'A crowned Flying King' },
      { term: 'Bɔ no!', meaning: 'Hit/Take him! (Spectator cheer during a mandatory capture)' },
      { term: 'Soufflé', meaning: 'The traditional penalty for failing to take an available capture' }
    ],
    players: '2 Players',
    difficulty: 'Hard',
    image: '/src/assets/images/ghana_dame_drafts_1794255742924.jpg',
    isFeatured: true,
    playableType: 'none'
  },
  {
    id: 'ludo',
    name: 'Ludo (Ghana Veranda Edition)',
    category: 'board',
    subcategory: 'Evening Family Gathering',
    country: 'Ghana & West Africa',
    culturalOrigin: 'Urban Ghanaian Verandas & Compound Houses',
    description: 'The beloved social dice race that brings families together on evening verandas across Ghana.',
    longDescription: 'Across Ghana, evening verandas and compound houses are filled with the clatter of dice in wooden cups and triumphant shouts of "Six!" as players race their tokens home. Ghanaian Ludo rules feature spirited banter, tactical blocking, and celebratory laughs.',
    history: 'Embraced across Ghanaian towns since the mid-20th century, Ludo boards—often hand-painted by local sign-board artists with Adinkra motifs—are prized family heirlooms.',
    equipment: [
      'Hand-painted wooden or plywood Ludo board with 4 colored quadrants (Red, Green, Yellow, Blue)',
      '16 tokens (4 per player) and 1 or 2 standard six-sided dice',
      'Small wooden or plastic shaker cup'
    ],
    rules: [
      'Roll a 6 on the die to release a token from the yard into your starting track.',
      'Navigate all 4 tokens clockwise around the perimeter of the board toward your home column.',
      'Landing on an opponent’s token captures it, sending it back to their starting yard.',
      'Safe squares marked with stars protect tokens from capture.',
      'Two tokens of the same color on a single square form an impassable barrier (blockade).',
      'The first player to pilot all 4 tokens into the central home triangle wins the match.'
    ],
    scoringDetails: 'First player with all 4 tokens home wins 1st place; subsequent players compete for 2nd and 3rd.',
    proverb: {
      text: 'Nkabom mu na tumi wɔ.',
      meaning: 'In unity and patience lies true strength.'
    },
    tactics: [
      'The Barrier Formation: Move two tokens in tandem to block the narrow home stretch.',
      'Hunter Strategy: Keep one token roaming in the rear to ambush opponent tokens entering the board.',
      'Patience over Rashness: Do not advance vulnerable tokens if an opponent is within 6 squares behind.'
    ],
    akanTerminology: [
      { term: 'Pue!', meaning: 'Emerge! (Shouted when rolling a 6 to bring a piece onto the board)' },
      { term: 'Bɔ no kɔ fie', meaning: 'Knock them back home!' },
      { term: 'Pampam', meaning: 'Forming a dual-token blockade' }
    ],
    players: '2-4 Players',
    difficulty: 'Easy',
    image: '/src/assets/images/ghana_ludo_evening_1794255743222.jpg',
    isFeatured: true,
    playableType: 'none'
  }
];

export const STORIES: StoryItem[] = [
  {
    id: 'history-oware',
    title: 'The Akan Roots of Oware: Royal Wisdom in Solid Mahogany',
    summary: 'How ancient Asante sovereigns codified Oware as a noble test of diplomacy, mathematics, and tactical patience.',
    content: 'In Akan oral tradition, Oware is known as the "game of kings." Master carvers in the Asante region sculpted elaborate boards from holy trees, inscribing Adinkra symbols of wisdom like Nyansapo (the knot of wisdom) into the wood. The game’s 48 seeds represented the stewardship of resources: a leader who takes without planning leaves their pits barren, while one who sows thoughtfully reaps a bountiful harvest. Legends tell of King Osei Tutu I using Oware matches to evaluate prospective ambassadors on their patience, honesty, and mental agility.',
    category: 'Akan History',
    readTime: '4 min read',
    image: '/src/assets/images/ghana_oware_carved_1794255704478.jpg'
  },
  {
    id: 'ampe-culture',
    title: 'The Rhythm of Ampe: Joy, Sisterhood, and Athleticism',
    summary: 'The songs, hand-clapping rhythms, and competitive spirit that make Ampe Ghana’s vibrant playground crown jewel.',
    content: 'Step onto any Ghanaian school compound during recess and you will hear the sharp rhythmic clap followed by the song "Ampe! Ebie! Ebie!". Two players face each other, eye-to-eye, smiling yet deeply concentrated. In a split second, both leap into the warm air. Ampe teaches young people to trust their instincts, celebrate the victories of their friends, and bounce back instantly from a stumble. It represents the living spirit of Ghanaian community: energetic, musical, and thoroughly communal.',
    category: 'Ghanaian Culture',
    readTime: '3 min read',
    image: '/src/assets/images/ghana_ampe_girls_1794255706526.jpg'
  },
  {
    id: 'chaskele-story',
    title: 'Chaskele: Kumasi Alleys, Geisha Tins, and Masterful Batting',
    summary: 'How Ghanaian children transformed everyday tin cans into an electrifying street sport that rivaled international cricket.',
    content: 'Before smartphones or gaming consoles, the sound of a hollow tin can being struck by a sturdy wooden bat in an alley in Kumasi meant only one thing: Chaskele tournament season. With empty Geisha mackerel tins as wickets and hand-carved cedar staves as bats, Ghanaian kids developed reflexes, teamwork, and quick decision-making that produced some of West Africa’s most gifted athletes.',
    category: 'Ghana Heritage',
    readTime: '3 min read',
    image: '/src/assets/images/ghana_chaskele_street_1794255706037.jpg'
  },
  {
    id: 'dame-masters',
    title: 'Under the Neem Tree: The Masters of Ghanaian Dame',
    summary: 'Why Ghanaian draughts champions are feared worldwide for their lightning-fast multi-jump tactical combinations.',
    content: 'Walk into any Ghanaian marketplace or taxi rank in the afternoon, and you will see a crowd surrounding a wooden table. Two players sit in deep silence, their eyes scanning the board. Suddenly, a hand moves: CLACK! CLACK! CLACK! Three opponent pieces are swept off the board in one lightning-fast diagonal jump. This is Ghanaian Dame, where mental calculation meets street theater.',
    category: 'Master Mind',
    readTime: '5 min read',
    image: '/src/assets/images/ghana_dame_drafts_1794255742924.jpg'
  }
];

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'cp-1',
    author: 'Kwesi Asamoah',
    location: 'Kumasi, Ghana',
    avatar: '/src/assets/images/ghana_adinkra_elder_1794255756821.jpg',
    content: 'Just finished playing an intense game of Oware with my uncle under the mango tree in Bantama. He taught me the "Grand March" defense. Nothing beats the sound of smooth nickar seeds dropping into carved wood!',
    gameTag: 'Oware',
    likes: 54,
    comments: 11,
    timestamp: '1 hour ago'
  },
  {
    id: 'cp-2',
    author: 'Esi Frimpong',
    location: 'Cape Coast, Ghana',
    avatar: '/src/assets/images/ghana_ampe_girls_1794255706526.jpg',
    content: 'Organized an Ampe championship for our primary school girls today in Cape Coast. The energy, synchronization, and joy brought back so many golden memories of our own childhood.',
    gameTag: 'Ampe',
    likes: 72,
    comments: 16,
    timestamp: '5 hours ago'
  },
  {
    id: 'cp-3',
    author: 'Kofi Mensah',
    location: 'Osu, Accra',
    avatar: '/src/assets/images/ghana_chaskele_street_1794255706037.jpg',
    content: 'Who still remembers the rules of Pilolo when we used to hide the stick behind the big water barrel? Best memories of growing up in Accra!',
    gameTag: 'Pilolo',
    likes: 98,
    comments: 24,
    timestamp: 'Yesterday'
  }
];
