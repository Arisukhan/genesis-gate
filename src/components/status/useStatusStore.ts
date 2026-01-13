import { useState, useEffect } from 'react';
import { PlayerStatus, DEFAULT_PLAYER_STATUS, Stat } from './types';

const STORAGE_KEY = 'player-status';

export function useStatusStore() {
  const [status, setStatus] = useState<PlayerStatus>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return DEFAULT_PLAYER_STATUS;
      }
    }
    return DEFAULT_PLAYER_STATUS;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(status));
  }, [status]);

  // Update player name (synced with codename)
  const updateName = (name: string) => {
    setStatus(prev => ({
      ...prev,
      identity: { ...prev.identity, name },
    }));
  };

  // Add XP to global level
  const addLevelXP = (xp: number) => {
    setStatus(prev => {
      let newXP = prev.level.currentXP + xp;
      let newLevel = prev.level.current;
      let requiredXP = prev.level.requiredXP;

      // Level up logic
      while (newXP >= requiredXP) {
        newXP -= requiredXP;
        newLevel++;
        requiredXP = calculateRequiredXP(newLevel);
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
  };

  // Add XP to a specific stat
  const addStatXP = (statId: string, xp: number) => {
    setStatus(prev => {
      const newStats = prev.stats.map(stat => {
        if (stat.id !== statId) return stat;

        let newXP = stat.currentXP + xp;
        let newValue = stat.value;

        // Level up stat
        while (newXP >= stat.requiredXP) {
          newXP -= stat.requiredXP;
          newValue++;
        }

        return {
          ...stat,
          value: newValue,
          currentXP: newXP,
        };
      });

      return { ...prev, stats: newStats };
    });
  };

  // Update identity
  const updateIdentity = (identity: Partial<PlayerStatus['identity']>) => {
    setStatus(prev => ({
      ...prev,
      identity: { ...prev.identity, ...identity },
    }));
  };

  return {
    status,
    updateName,
    addLevelXP,
    addStatXP,
    updateIdentity,
  };
}

function calculateRequiredXP(level: number): number {
  // XP required increases with level
  return Math.floor(10000 * Math.pow(1.1, level - 1));
}
