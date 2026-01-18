// ============= CORE DATA MODELS =============

// User Identity
export interface PlayerIdentity {
  name: string;
  job: string;
  title: string;
}

// User Level (Global XP)
export interface PlayerLevel {
  current: number;
  currentXP: number;
  requiredXP: number;
}

// Stat Entity
export interface Stat {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  value: number;
  currentXP: number;
  requiredXP: number;
  lastUpdated: number; // timestamp
}

// Skill Stage (optional progression indicator)
export type SkillStage = 'learning' | 'practicing' | 'refining';

// Skill Category
export type SkillCategory = 'progressive' | 'mastered';

// Skill Entity (for Status Card integration)
export interface StatusSkill {
  id: string;
  name: string;
  description?: string;
  category: SkillCategory;
  currentXP: number;
  requiredXP: number;
  stage?: SkillStage;
  linkedStat?: string; // stat id
  isVisible: boolean;
  masteredAt?: number; // timestamp when mastered
}

// Skill Preview (for UI display)
export interface SkillPreview {
  id: string;
  name: string;
  description?: string;
  progress: number; // 0-100, calculated from XP
  isMastered: boolean;
  stage?: SkillStage;
  linkedStat?: string;
  currentXP: number;
  requiredXP: number;
}

// Complete Player Status
export interface PlayerStatus {
  identity: PlayerIdentity;
  level: PlayerLevel;
  stats: Stat[];
  skills: StatusSkill[];
}

// ============= DEFAULT DATA =============

// Default stats template
export const DEFAULT_STATS: Stat[] = [
  { id: 'str', name: 'Strength', shortName: 'STR', icon: '💪', value: 10, currentXP: 45, requiredXP: 100, lastUpdated: Date.now() },
  { id: 'agi', name: 'Agility', shortName: 'AGI', icon: '⚡', value: 8, currentXP: 72, requiredXP: 100, lastUpdated: Date.now() },
  { id: 'int', name: 'Intelligence', shortName: 'INT', icon: '🧠', value: 15, currentXP: 88, requiredXP: 100, lastUpdated: Date.now() },
  { id: 'vit', name: 'Vitality', shortName: 'VIT', icon: '❤️', value: 12, currentXP: 33, requiredXP: 100, lastUpdated: Date.now() },
  { id: 'wis', name: 'Wisdom', shortName: 'WIS', icon: '📖', value: 11, currentXP: 60, requiredXP: 100, lastUpdated: Date.now() },
  { id: 'per', name: 'Perception', shortName: 'PER', icon: '👁️', value: 9, currentXP: 15, requiredXP: 100, lastUpdated: Date.now() },
];

// Default skills
export const DEFAULT_SKILLS: StatusSkill[] = [
  { id: '1', name: 'React Mastery', description: 'Building modern React applications', category: 'progressive', currentXP: 68, requiredXP: 100, stage: 'practicing', linkedStat: 'int', isVisible: true },
  { id: '2', name: 'TypeScript', description: 'Type-safe JavaScript development', category: 'progressive', currentXP: 45, requiredXP: 100, stage: 'learning', linkedStat: 'int', isVisible: true },
  { id: '3', name: 'System Design', description: 'Architecting scalable systems', category: 'progressive', currentXP: 22, requiredXP: 100, stage: 'learning', linkedStat: 'wis', isVisible: true },
  { id: '4', name: 'HTML/CSS', description: 'Web fundamentals', category: 'mastered', currentXP: 100, requiredXP: 100, isVisible: true, masteredAt: Date.now() - 30 * 24 * 60 * 60 * 1000 },
  { id: '5', name: 'JavaScript', description: 'Core programming language', category: 'mastered', currentXP: 100, requiredXP: 100, isVisible: true, masteredAt: Date.now() - 60 * 24 * 60 * 60 * 1000 },
];

export const DEFAULT_PLAYER_STATUS: PlayerStatus = {
  identity: {
    name: 'PLAYER',
    job: 'Aspiring Developer',
    title: 'The Persistent',
  },
  level: {
    current: 45,
    currentXP: 6500,
    requiredXP: 10000,
  },
  stats: DEFAULT_STATS,
  skills: DEFAULT_SKILLS,
};

// ============= UTILITY FUNCTIONS =============

// Convert StatusSkill to SkillPreview for UI
export function skillToPreview(skill: StatusSkill): SkillPreview {
  return {
    id: skill.id,
    name: skill.name,
    description: skill.description,
    progress: Math.floor((skill.currentXP / skill.requiredXP) * 100),
    isMastered: skill.category === 'mastered',
    stage: skill.stage,
    linkedStat: skill.linkedStat,
    currentXP: skill.currentXP,
    requiredXP: skill.requiredXP,
  };
}

// Get progressive skills sorted by highest completion %
export function getProgressivePreview(skills: StatusSkill[], limit: number = 2): SkillPreview[] {
  return skills
    .filter(s => s.category === 'progressive' && s.isVisible)
    .sort((a, b) => (b.currentXP / b.requiredXP) - (a.currentXP / a.requiredXP))
    .slice(0, limit)
    .map(skillToPreview);
}

// Get mastered skills sorted by completion date
export function getMasteredPreview(skills: StatusSkill[], limit: number = 2): SkillPreview[] {
  return skills
    .filter(s => s.category === 'mastered' && s.isVisible)
    .sort((a, b) => (b.masteredAt || 0) - (a.masteredAt || 0))
    .slice(0, limit)
    .map(skillToPreview);
}

// Calculate required XP for next level (soft scaling)
export function calculateRequiredXP(level: number): number {
  return Math.floor(10000 * Math.pow(1.1, level - 1));
}

// Calculate required XP for next stat level (softer scaling)
export function calculateStatRequiredXP(statValue: number): number {
  return Math.floor(100 * Math.pow(1.05, statValue - 1));
}
