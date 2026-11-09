export type GameCategory = 'all' | 'board' | 'active' | 'children';

export interface GameItem {
  id: string;
  name: string;
  category: 'board' | 'active' | 'children';
  subcategory: string;
  country: string;
  description: string;
  longDescription: string;
  history: string;
  rules: string[];
  players: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  image: string;
  isFeatured?: boolean;
  playableType?: 'oware' | 'ampe' | 'pilolo' | 'chaskele' | 'none';
  equipment?: string[];
  culturalOrigin?: string;
  scoringDetails?: string;
  proverb?: { text: string; meaning: string };
  tactics?: string[];
  akanTerminology?: { term: string; meaning: string }[];
}

export interface StoryItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  readTime: string;
  image: string;
  author?: string;
  date?: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  location: string;
  avatar: string;
  content: string;
  gameTag: string;
  likes: number;
  comments: number;
  timestamp: string;
}
