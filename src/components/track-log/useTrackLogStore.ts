import { useState, useEffect } from 'react';
import { DayRecord, QuestRecord } from './types';
import { format, subDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

const STORAGE_KEY = 'track-log-records';

// Generate sample data for demo purposes
function generateSampleData(): Record<string, DayRecord> {
  const records: Record<string, DayRecord> = {};
  const today = new Date();
  
  for (let i = 1; i <= 60; i++) {
    const date = subDays(today, i);
    const dateStr = format(date, 'yyyy-MM-dd');
    
    // Random completion rates
    const coreTotal = 3;
    const coreCompleted = Math.floor(Math.random() * 4);
    const optionalTotal = 2;
    const optionalCompleted = Math.floor(Math.random() * 3);
    const specialTotal = Math.random() > 0.7 ? 1 : 0;
    const specialCompleted = specialTotal > 0 && Math.random() > 0.5 ? 1 : 0;
    
    records[dateStr] = {
      date: dateStr,
      quests: {
        core: { total: coreTotal, completed: coreCompleted },
        optional: { total: optionalTotal, completed: optionalCompleted },
        special: { total: specialTotal, completed: specialCompleted },
      },
      habits: [
        { id: '1', name: 'Morning Exercise', done: Math.random() > 0.3, streakImpact: Math.random() > 0.3 ? 1 : -1 },
        { id: '2', name: 'Read 30 mins', done: Math.random() > 0.4, streakImpact: Math.random() > 0.4 ? 1 : -1 },
        { id: '3', name: 'Meditate', done: Math.random() > 0.5, streakImpact: Math.random() > 0.5 ? 1 : -1 },
      ],
      totalXP: (coreCompleted * 50) + (optionalCompleted * 25) + (specialCompleted * 100),
      inventoryBonusApplied: Math.random() > 0.7,
      linkedSkillXP: coreCompleted > 0 ? [
        { skillId: '1', skillName: 'Discipline', xp: coreCompleted * 10 },
      ] : [],
    };
  }
  
  return records;
}

export function useTrackLogStore() {
  const [records, setRecords] = useState<Record<string, DayRecord>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRecords(JSON.parse(stored));
      } catch {
        // Generate sample data if corrupted
        const sampleData = generateSampleData();
        setRecords(sampleData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData));
      }
    } else {
      // Generate sample data for first load
      const sampleData = generateSampleData();
      setRecords(sampleData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData));
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isLoaded && Object.keys(records).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    }
  }, [records, isLoaded]);

  const getRecord = (date: Date): DayRecord | undefined => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return records[dateStr];
  };

  const getMonthRecords = (month: Date): DayRecord[] => {
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    const days = eachDayOfInterval({ start, end });
    
    return days.map(day => {
      const dateStr = format(day, 'yyyy-MM-dd');
      return records[dateStr];
    }).filter(Boolean) as DayRecord[];
  };

  const getMonthCompletionRate = (month: Date): number => {
    const monthRecords = getMonthRecords(month);
    if (monthRecords.length === 0) return 0;
    
    const totalCore = monthRecords.reduce((sum, r) => sum + r.quests.core.total, 0);
    const completedCore = monthRecords.reduce((sum, r) => sum + r.quests.core.completed, 0);
    
    if (totalCore === 0) return 0;
    return Math.round((completedCore / totalCore) * 100);
  };

  const getDayCompletionRate = (date: Date): number => {
    const record = getRecord(date);
    if (!record) return 0;
    
    const total = record.quests.core.total + record.quests.optional.total;
    const completed = record.quests.core.completed + record.quests.optional.completed;
    
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  };

  const getQuestsForDay = (date: Date): QuestRecord[] => {
    const record = getRecord(date);
    if (!record) return [];
    
    // Generate quest records from the summary
    const quests: QuestRecord[] = [];
    
    // Core quests
    for (let i = 0; i < record.quests.core.total; i++) {
      quests.push({
        id: `core-${i}`,
        name: `Core Quest ${i + 1}`,
        category: 'core',
        completed: i < record.quests.core.completed,
        xpGained: i < record.quests.core.completed ? 50 : 0,
      });
    }
    
    // Optional quests
    for (let i = 0; i < record.quests.optional.total; i++) {
      quests.push({
        id: `optional-${i}`,
        name: `Optional Quest ${i + 1}`,
        category: 'optional',
        completed: i < record.quests.optional.completed,
        xpGained: i < record.quests.optional.completed ? 25 : 0,
      });
    }
    
    // Special quests
    for (let i = 0; i < record.quests.special.total; i++) {
      quests.push({
        id: `special-${i}`,
        name: `Special Quest ${i + 1}`,
        category: 'special',
        completed: i < record.quests.special.completed,
        xpGained: i < record.quests.special.completed ? 100 : 0,
      });
    }
    
    return quests;
  };

  return {
    records,
    isLoaded,
    getRecord,
    getMonthRecords,
    getMonthCompletionRate,
    getDayCompletionRate,
    getQuestsForDay,
  };
}
