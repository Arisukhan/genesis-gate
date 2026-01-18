import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  PlayerStatus, 
  DEFAULT_PLAYER_STATUS, 
  StatusSkill,
  SkillPreview,
  calculateRequiredXP,
  calculateStatRequiredXP,
  skillToPreview,
  getProgressivePreview,
  getMasteredPreview,
} from './types';

const STORAGE_KEY = 'player-status';

export interface LevelUpEvent {
  previousLevel: number;
  newLevel: number;
  timestamp: number;
}

export interface StatLevelUpEvent {
  statId: string;
  previousValue: number;
  newValue: number;
  timestamp: number;
}

export interface SkillMasteryEvent {
  skillId: string;
  skillName: string;
  timestamp: number;
}

// Migrate old skills format to new format
function migrateStatus(data: any): PlayerStatus {
  // Check if skills is old format (object with inProgress/mastered)
  if (data.skills && !Array.isArray(data.skills)) {
    const oldSkills = data.skills as { inProgress?: any[]; mastered?: any[] };
    const newSkills: StatusSkill[] = [];
    
    // Migrate in-progress skills
    if (oldSkills.inProgress) {
      oldSkills.inProgress.forEach((skill: any) => {
        newSkills.push({
          id: skill.id || `skill-${Date.now()}-${Math.random()}`,
          name: skill.name,
          description: skill.description,
          category: 'progressive',
          currentXP: skill.currentXP ?? Math.floor((skill.progress || 0)),
          requiredXP: skill.requiredXP ?? 100,
          stage: skill.stage || 'learning',
          linkedStat: skill.linkedStat,
          isVisible: true,
        });
      });
    }
    
    // Migrate mastered skills
    if (oldSkills.mastered) {
      oldSkills.mastered.forEach((skill: any) => {
        newSkills.push({
          id: skill.id || `skill-${Date.now()}-${Math.random()}`,
          name: skill.name,
          description: skill.description,
          category: 'mastered',
          currentXP: 100,
          requiredXP: 100,
          isVisible: true,
          masteredAt: skill.masteredAt || Date.now(),
        });
      });
    }
    
    return { ...data, skills: newSkills };
  }
  
  return data;
}

export function useStatusStore() {
  const [status, setStatus] = useState<PlayerStatus>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return migrateStatus(parsed);
      } catch {
        return DEFAULT_PLAYER_STATUS;
      }
    }
    return DEFAULT_PLAYER_STATUS;
  });

  // Event callbacks (can be used for animations/notifications)
  const [levelUpEvent, setLevelUpEvent] = useState<LevelUpEvent | null>(null);
  const [statLevelUpEvent, setStatLevelUpEvent] = useState<StatLevelUpEvent | null>(null);
  const [skillMasteryEvent, setSkillMasteryEvent] = useState<SkillMasteryEvent | null>(null);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(status));
  }, [status]);

  // Update player name (synced with codename)
  const updateName = useCallback((name: string) => {
    setStatus(prev => ({
      ...prev,
      identity: { ...prev.identity, name },
    }));
  }, []);

  // ============= LEVEL XP LOGIC =============
  // Add XP to global level with proper overflow handling
  const addLevelXP = useCallback((xp: number) => {
    setStatus(prev => {
      let newXP = prev.level.currentXP + xp;
      let newLevel = prev.level.current;
      let requiredXP = prev.level.requiredXP;
      const previousLevel = newLevel;

      // Level up logic - handle multiple level-ups
      while (newXP >= requiredXP) {
        newXP -= requiredXP;
        newLevel++;
        requiredXP = calculateRequiredXP(newLevel);
      }

      // Trigger level up event if leveled
      if (newLevel > previousLevel) {
        setLevelUpEvent({
          previousLevel,
          newLevel,
          timestamp: Date.now(),
        });
      }

      return {
        ...prev,
        level: {
          current: newLevel,
          currentXP: newXP,
          requiredXP,
        },
      };
    });
  }, []);

  // ============= STAT XP LOGIC =============
  // Add XP to a specific stat with proper overflow handling
  const addStatXP = useCallback((statId: string, xp: number) => {
    setStatus(prev => {
      const newStats = prev.stats.map(stat => {
        if (stat.id !== statId) return stat;

        let newXP = stat.currentXP + xp;
        let newValue = stat.value;
        let requiredXP = stat.requiredXP;
        const previousValue = newValue;

        // Level up stat - handle multiple level-ups
        while (newXP >= requiredXP) {
          newXP -= requiredXP;
          newValue++;
          requiredXP = calculateStatRequiredXP(newValue);
        }

        // Trigger stat level up event if leveled
        if (newValue > previousValue) {
          setStatLevelUpEvent({
            statId,
            previousValue,
            newValue,
            timestamp: Date.now(),
          });
        }

        return {
          ...stat,
          value: newValue,
          currentXP: newXP,
          requiredXP,
          lastUpdated: Date.now(),
        };
      });

      return { ...prev, stats: newStats };
    });
  }, []);

  // ============= SKILL XP LOGIC =============
  // Add XP to a skill with mastery transition
  const addSkillXP = useCallback((skillId: string, xp: number) => {
    setStatus(prev => {
      const newSkills = prev.skills.map(skill => {
        if (skill.id !== skillId) return skill;
        if (skill.category === 'mastered') return skill; // Already mastered

        let newXP = skill.currentXP + xp;

        // Check for mastery
        if (newXP >= skill.requiredXP) {
          // Skill is now mastered
          setSkillMasteryEvent({
            skillId,
            skillName: skill.name,
            timestamp: Date.now(),
          });

          return {
            ...skill,
            currentXP: skill.requiredXP, // Cap at required (or allow overflow for prestige)
            category: 'mastered' as const,
            masteredAt: Date.now(),
            stage: undefined, // Clear stage on mastery
          };
        }

        // Update stage based on progress
        const progress = newXP / skill.requiredXP;
        let stage = skill.stage;
        if (progress < 0.33) stage = 'learning';
        else if (progress < 0.66) stage = 'practicing';
        else stage = 'refining';

        return {
          ...skill,
          currentXP: newXP,
          stage,
        };
      });

      return { ...prev, skills: newSkills };
    });
  }, []);

  // ============= SKILL MANAGEMENT =============
  // Add a new skill
  const addSkill = useCallback((skill: Omit<StatusSkill, 'id' | 'currentXP' | 'category'>) => {
    const newSkill: StatusSkill = {
      ...skill,
      id: `skill-${Date.now()}`,
      currentXP: 0,
      category: 'progressive',
    };

    setStatus(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  }, []);

  // Update a skill
  const updateSkill = useCallback((skillId: string, updates: Partial<StatusSkill>) => {
    setStatus(prev => ({
      ...prev,
      skills: prev.skills.map(s => 
        s.id === skillId ? { ...s, ...updates } : s
      ),
    }));
  }, []);

  // Delete a skill
  const deleteSkill = useCallback((skillId: string) => {
    setStatus(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== skillId),
    }));
  }, []);

  // Update identity
  const updateIdentity = useCallback((identity: Partial<PlayerStatus['identity']>) => {
    setStatus(prev => ({
      ...prev,
      identity: { ...prev.identity, ...identity },
    }));
  }, []);

  // ============= COMPUTED VALUES =============
  // Get skills organized for UI
  const skillsForUI = useMemo(() => {
    const progressiveSkills = status.skills
      .filter(s => s.category === 'progressive' && s.isVisible)
      .map(skillToPreview);
    
    const masteredSkills = status.skills
      .filter(s => s.category === 'mastered' && s.isVisible)
      .map(skillToPreview);

    return {
      inProgress: progressiveSkills,
      mastered: masteredSkills,
    };
  }, [status.skills]);

  // Get preview for Status Card (limited count)
  const skillsPreview = useMemo(() => ({
    inProgress: getProgressivePreview(status.skills, 2),
    mastered: getMasteredPreview(status.skills, 2),
    hiddenProgressiveCount: Math.max(0, status.skills.filter(s => s.category === 'progressive' && s.isVisible).length - 2),
    hiddenMasteredCount: Math.max(0, status.skills.filter(s => s.category === 'mastered' && s.isVisible).length - 2),
  }), [status.skills]);

  // Clear events (for animation completion)
  const clearLevelUpEvent = useCallback(() => setLevelUpEvent(null), []);
  const clearStatLevelUpEvent = useCallback(() => setStatLevelUpEvent(null), []);
  const clearSkillMasteryEvent = useCallback(() => setSkillMasteryEvent(null), []);

  return {
    status,
    skillsForUI,
    skillsPreview,
    
    // Events
    levelUpEvent,
    statLevelUpEvent,
    skillMasteryEvent,
    clearLevelUpEvent,
    clearStatLevelUpEvent,
    clearSkillMasteryEvent,
    
    // Actions
    updateName,
    addLevelXP,
    addStatXP,
    addSkillXP,
    addSkill,
    updateSkill,
    deleteSkill,
    updateIdentity,
  };
}
