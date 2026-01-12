export type SkillDifficulty = 'easy' | 'medium' | 'hard';

export interface Skill {
  id: string;
  name: string;
  description: string;
  difficulty: SkillDifficulty;
  level: number; // 0-10
  currentXP: number;
  requiredXP: number; // default 100
  icon: string; // emoji
  tags: string[];
  linkedQuests: string[];
  position: { x: number; y: number };
  parentId: string | null; // null for root
}

export interface SkillTreeState {
  skills: Skill[];
  selectedSkillId: string | null;
  isAddingSkill: boolean;
  isEditingSkill: boolean;
}

export const DIFFICULTY_COLORS: Record<SkillDifficulty, { glow: string; bg: string }> = {
  easy: { glow: '142 76% 45%', bg: 'hsl(142 76% 45% / 0.2)' },
  medium: { glow: '210 100% 50%', bg: 'hsl(210 100% 50% / 0.2)' },
  hard: { glow: '270 70% 60%', bg: 'hsl(270 70% 60% / 0.2)' },
};

export const MASTERED_COLOR = { glow: '45 100% 50%', bg: 'hsl(45 100% 50% / 0.3)' };
