// Track Log Types

export interface DayRecord {
  date: string; // ISO date string (YYYY-MM-DD)
  quests: {
    core: { total: number; completed: number };
    optional: { total: number; completed: number };
    special: { total: number; completed: number };
  };
  habits: HabitRecord[];
  totalXP: number;
  inventoryBonusApplied: boolean;
  linkedSkillXP: { skillId: string; skillName: string; xp: number }[];
}

export interface HabitRecord {
  id: string;
  name: string;
  done: boolean;
  streakImpact: number; // positive if maintained, negative if broken
}

export interface QuestRecord {
  id: string;
  name: string;
  category: 'core' | 'optional' | 'special';
  completed: boolean;
  xpGained: number;
}

export type DayStatus = 'green' | 'yellow' | 'orange' | 'red' | 'none';

export function getDayStatus(record: DayRecord | undefined): DayStatus {
  if (!record) return 'none';
  
  const { core, optional } = record.quests;
  
  // No core quests defined
  if (core.total === 0) return 'none';
  
  // All core completed
  if (core.completed === core.total) {
    // Check optional
    if (optional.total === 0 || optional.completed === optional.total) {
      return 'green'; // All done
    }
    return 'yellow'; // Core done, optional missed
  }
  
  // Some core completed
  if (core.completed > 0) {
    return 'orange';
  }
  
  // No core completed
  return 'red';
}

export function getStatusColor(status: DayStatus): string {
  switch (status) {
    case 'green': return 'hsl(142 76% 45%)';
    case 'yellow': return 'hsl(50 100% 50%)';
    case 'orange': return 'hsl(30 100% 50%)';
    case 'red': return 'hsl(0 100% 50%)';
    case 'none': return 'hsl(220 20% 20%)';
  }
}

export function getStatusLabel(status: DayStatus): string {
  switch (status) {
    case 'green': return 'ALL COMPLETE';
    case 'yellow': return 'CORE DONE';
    case 'orange': return 'PARTIAL';
    case 'red': return 'FAILED';
    case 'none': return 'NO DATA';
  }
}
