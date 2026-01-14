/* ═══════════════════════════════════════════════════════════════════════════
   SETTINGS TYPES - All configurable system parameters
   Note: These define operating parameters, not laws or history rewrites
═══════════════════════════════════════════════════════════════════════════ */

export type DifficultyMode = 'standard' | 'strict' | 'custom';
export type CardDesign = 'designA' | 'designB' | 'designC';

export interface SystemSettings {
  // SECTION 1: System Status & Difficulty
  systemStatus: boolean; // ON/OFF - controls quest gen, tracking, XP
  difficultyMode: DifficultyMode;
  
  // SECTION 2: Quest Generation Controls
  coreQuestsPerDay: number; // minimum enforced
  optionalQuestsPerDay: number; // can be zero
  
  // SECTION 3: Penalty Rule Toggles
  penaltyForDailyQuests: boolean;
  penaltyForCalorieCount: boolean;
  calorieTrackingEnabled: boolean; // if false, calorie penalty toggle is disabled
  
  // SECTION 4: AI Suggestions
  aiQuestSuggestions: boolean;
  aiPenaltyQuestSuggestions: boolean;
  
  // SECTION 5: Performance Mode
  highPerformanceMode: boolean; // Anime mode - full effects vs reduced
  
  // SECTION 6: System Color Theme (only blue/violet as per spec)
  colorTheme: 'blue' | 'violet';
  
  // SECTION 7: System Card Design
  cardDesign: CardDesign;
}

export const DEFAULT_SETTINGS: SystemSettings = {
  systemStatus: true,
  difficultyMode: 'standard',
  coreQuestsPerDay: 3,
  optionalQuestsPerDay: 2,
  penaltyForDailyQuests: true,
  penaltyForCalorieCount: false,
  calorieTrackingEnabled: false,
  aiQuestSuggestions: true,
  aiPenaltyQuestSuggestions: false,
  highPerformanceMode: true,
  colorTheme: 'blue',
  cardDesign: 'designA',
};
