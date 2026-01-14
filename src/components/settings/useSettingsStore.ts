import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SystemSettings, DEFAULT_SETTINGS, DifficultyMode, CardDesign } from './types';

/* ═══════════════════════════════════════════════════════════════════════════
   SETTINGS STORE - Persistent state management for system settings
   Changes apply forward only - no retroactive effects
═══════════════════════════════════════════════════════════════════════════ */

interface SettingsStore {
  settings: SystemSettings;
  
  // System Status
  toggleSystemStatus: () => void;
  
  // Difficulty
  setDifficultyMode: (mode: DifficultyMode) => void;
  
  // Quest Generation
  setCoreQuestsPerDay: (count: number) => void;
  setOptionalQuestsPerDay: (count: number) => void;
  
  // Penalties
  togglePenaltyForDailyQuests: () => void;
  togglePenaltyForCalorieCount: () => void;
  
  // AI
  toggleAIQuestSuggestions: () => void;
  toggleAIPenaltyQuestSuggestions: () => void;
  
  // Performance
  toggleHighPerformanceMode: () => void;
  
  // Theme
  setColorTheme: (theme: 'blue' | 'violet') => void;
  
  // Card Design
  setCardDesign: (design: CardDesign) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: DEFAULT_SETTINGS,
      
      toggleSystemStatus: () => set((state) => ({
        settings: { ...state.settings, systemStatus: !state.settings.systemStatus }
      })),
      
      setDifficultyMode: (mode) => set((state) => ({
        settings: { ...state.settings, difficultyMode: mode }
      })),
      
      setCoreQuestsPerDay: (count) => set((state) => ({
        settings: { ...state.settings, coreQuestsPerDay: Math.max(1, count) }
      })),
      
      setOptionalQuestsPerDay: (count) => set((state) => ({
        settings: { ...state.settings, optionalQuestsPerDay: Math.max(0, count) }
      })),
      
      togglePenaltyForDailyQuests: () => set((state) => ({
        settings: { ...state.settings, penaltyForDailyQuests: !state.settings.penaltyForDailyQuests }
      })),
      
      togglePenaltyForCalorieCount: () => set((state) => ({
        settings: { ...state.settings, penaltyForCalorieCount: !state.settings.penaltyForCalorieCount }
      })),
      
      toggleAIQuestSuggestions: () => set((state) => ({
        settings: { ...state.settings, aiQuestSuggestions: !state.settings.aiQuestSuggestions }
      })),
      
      toggleAIPenaltyQuestSuggestions: () => set((state) => ({
        settings: { ...state.settings, aiPenaltyQuestSuggestions: !state.settings.aiPenaltyQuestSuggestions }
      })),
      
      toggleHighPerformanceMode: () => set((state) => ({
        settings: { ...state.settings, highPerformanceMode: !state.settings.highPerformanceMode }
      })),
      
      setColorTheme: (theme) => set((state) => ({
        settings: { ...state.settings, colorTheme: theme }
      })),
      
      setCardDesign: (design) => set((state) => ({
        settings: { ...state.settings, cardDesign: design }
      })),
    }),
    {
      name: 'system-settings-storage',
    }
  )
);
