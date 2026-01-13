// Status Card Types

export interface PlayerIdentity {
  name: string;
  job: string;
  title: string;
}

export interface PlayerLevel {
  current: number;
  currentXP: number;
  requiredXP: number;
}

export interface Stat {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  value: number;
  currentXP: number;
  requiredXP: number;
}

export interface SkillPreview {
  id: string;
  name: string;
  progress: number; // 0-100
  isMastered: boolean;
}

export interface PlayerStatus {
  identity: PlayerIdentity;
  level: PlayerLevel;
  stats: Stat[];
  skills: {
    inProgress: SkillPreview[];
    mastered: SkillPreview[];
  };
}

// Default stats template
export const DEFAULT_STATS: Stat[] = [
  { id: 'str', name: 'Strength', shortName: 'STR', icon: '💪', value: 10, currentXP: 45, requiredXP: 100 },
  { id: 'agi', name: 'Agility', shortName: 'AGI', icon: '⚡', value: 8, currentXP: 72, requiredXP: 100 },
  { id: 'int', name: 'Intelligence', shortName: 'INT', icon: '🧠', value: 15, currentXP: 88, requiredXP: 100 },
  { id: 'vit', name: 'Vitality', shortName: 'VIT', icon: '❤️', value: 12, currentXP: 33, requiredXP: 100 },
  { id: 'wis', name: 'Wisdom', shortName: 'WIS', icon: '📖', value: 11, currentXP: 60, requiredXP: 100 },
  { id: 'per', name: 'Perception', shortName: 'PER', icon: '👁️', value: 9, currentXP: 15, requiredXP: 100 },
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
  skills: {
    inProgress: [
      { id: '1', name: 'React Mastery', progress: 68, isMastered: false },
      { id: '2', name: 'TypeScript', progress: 45, isMastered: false },
      { id: '3', name: 'System Design', progress: 22, isMastered: false },
    ],
    mastered: [
      { id: '4', name: 'HTML/CSS', progress: 100, isMastered: true },
      { id: '5', name: 'JavaScript', progress: 100, isMastered: true },
    ],
  },
};
