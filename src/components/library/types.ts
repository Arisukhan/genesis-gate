export type QuestCategory = "core" | "optional" | "special";
export type QuestDifficulty = 1 | 2 | 3 | 4 | 5;
export type HabitFrequency = "daily" | "weekly";

export interface LibraryQuest {
  id: string;
  title: string;
  category: QuestCategory;
  difficulty: QuestDifficulty;
  xp: number;
  description: string;
  rules: string[];
  linkedSkills?: string[];
  linkedInventory?: string[];
}

export interface LibraryHabit {
  id: string;
  title: string;
  frequency: HabitFrequency;
  streak: number;
  xpPerCompletion: number;
  description: string;
  linkedSkills?: string[];
}

export interface MasteredQuest {
  id: string;
  title: string;
  completedDate: string;
  totalXpEarned: number;
  timesCompleted: number;
  difficulty: QuestDifficulty;
  description: string;
}
