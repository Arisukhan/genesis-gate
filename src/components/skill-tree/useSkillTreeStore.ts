import { useState, useEffect, useCallback } from 'react';
import { Skill, SkillTreeState } from './types';

const STORAGE_KEY = 'skill-tree-data';

const generateId = () => Math.random().toString(36).substring(2, 9);

const calculatePosition = (skills: Skill[], parentId: string | null): { x: number; y: number } => {
  if (!parentId) {
    return { x: 0, y: 0 }; // Root is center
  }

  const parent = skills.find(s => s.id === parentId);
  if (!parent) return { x: 0, y: 0 };

  const siblings = skills.filter(s => s.parentId === parentId);
  const siblingCount = siblings.length;
  
  // Calculate angle for this new child
  const angleStep = (2 * Math.PI) / Math.max(siblingCount + 1, 3);
  const baseAngle = -Math.PI / 2; // Start from top
  const angle = baseAngle + angleStep * siblingCount;
  
  const distance = 180 + Math.random() * 40;
  
  return {
    x: parent.position.x + Math.cos(angle) * distance,
    y: parent.position.y + Math.sin(angle) * distance,
  };
};

const defaultSkills: Skill[] = [
  {
    id: 'root',
    name: 'Core',
    description: 'The source of all power. Your journey begins here.',
    difficulty: 'medium',
    level: 5,
    currentXP: 50,
    requiredXP: 100,
    icon: '⚡',
    tags: ['foundation'],
    linkedQuests: [],
    position: { x: 0, y: 0 },
    parentId: null,
  },
  {
    id: 'strength',
    name: 'Strength',
    description: 'Physical power and endurance.',
    difficulty: 'medium',
    level: 3,
    currentXP: 75,
    requiredXP: 100,
    icon: '💪',
    tags: ['physical'],
    linkedQuests: [],
    position: { x: -160, y: -140 },
    parentId: 'root',
  },
  {
    id: 'focus',
    name: 'Focus',
    description: 'Mental clarity and concentration.',
    difficulty: 'hard',
    level: 2,
    currentXP: 30,
    requiredXP: 100,
    icon: '🎯',
    tags: ['mental'],
    linkedQuests: [],
    position: { x: 160, y: -140 },
    parentId: 'root',
  },
  {
    id: 'discipline',
    name: 'Discipline',
    description: 'Consistency and self-control.',
    difficulty: 'hard',
    level: 10,
    currentXP: 100,
    requiredXP: 100,
    icon: '🔥',
    tags: ['mental', 'foundation'],
    linkedQuests: [],
    position: { x: 0, y: -200 },
    parentId: 'root',
  },
  {
    id: 'vitality',
    name: 'Vitality',
    description: 'Health and wellness awareness.',
    difficulty: 'easy',
    level: 4,
    currentXP: 60,
    requiredXP: 100,
    icon: '❤️',
    tags: ['physical'],
    linkedQuests: [],
    position: { x: -180, y: 100 },
    parentId: 'root',
  },
  {
    id: 'wisdom',
    name: 'Wisdom',
    description: 'Knowledge and understanding.',
    difficulty: 'medium',
    level: 1,
    currentXP: 20,
    requiredXP: 100,
    icon: '📚',
    tags: ['mental'],
    linkedQuests: [],
    position: { x: 180, y: 100 },
    parentId: 'root',
  },
];

export const useSkillTreeStore = () => {
  const [state, setState] = useState<SkillTreeState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          skills: parsed.skills || defaultSkills,
          selectedSkillId: null,
          isAddingSkill: false,
          isEditingSkill: false,
        };
      }
    } catch (e) {
      console.error('Failed to load skill tree:', e);
    }
    return {
      skills: defaultSkills,
      selectedSkillId: null,
      isAddingSkill: false,
      isEditingSkill: false,
    };
  });

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ skills: state.skills }));
    } catch (e) {
      console.error('Failed to save skill tree:', e);
    }
  }, [state.skills]);

  const selectSkill = useCallback((id: string | null) => {
    setState(prev => ({ ...prev, selectedSkillId: id, isAddingSkill: false, isEditingSkill: false }));
  }, []);

  const openAddSkill = useCallback(() => {
    setState(prev => ({ ...prev, isAddingSkill: true, isEditingSkill: false, selectedSkillId: null }));
  }, []);

  const openEditSkill = useCallback(() => {
    setState(prev => ({ ...prev, isEditingSkill: true, isAddingSkill: false }));
  }, []);

  const closeModals = useCallback(() => {
    setState(prev => ({ ...prev, isAddingSkill: false, isEditingSkill: false, selectedSkillId: null }));
  }, []);

  const addSkill = useCallback((skill: Omit<Skill, 'id' | 'position' | 'level' | 'currentXP' | 'requiredXP'>) => {
    const id = generateId();
    const position = calculatePosition(state.skills, skill.parentId || 'root');
    
    const newSkill: Skill = {
      ...skill,
      id,
      position,
      level: 0,
      currentXP: 0,
      requiredXP: 100,
      parentId: skill.parentId || 'root',
    };

    setState(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill],
      isAddingSkill: false,
    }));
  }, [state.skills]);

  const updateSkill = useCallback((id: string, updates: Partial<Skill>) => {
    setState(prev => ({
      ...prev,
      skills: prev.skills.map(s => s.id === id ? { ...s, ...updates } : s),
    }));
  }, []);

  const deleteSkill = useCallback((id: string) => {
    if (id === 'root') return; // Can't delete root
    
    // Also delete children recursively
    const getAllDescendants = (skillId: string): string[] => {
      const children = state.skills.filter(s => s.parentId === skillId);
      return children.flatMap(c => [c.id, ...getAllDescendants(c.id)]);
    };

    const toDelete = new Set([id, ...getAllDescendants(id)]);
    
    setState(prev => ({
      ...prev,
      skills: prev.skills.filter(s => !toDelete.has(s.id)),
      selectedSkillId: null,
    }));
  }, [state.skills]);

  const addXP = useCallback((id: string, amount: number) => {
    setState(prev => ({
      ...prev,
      skills: prev.skills.map(s => {
        if (s.id !== id || s.level >= 10) return s;
        
        let newXP = s.currentXP + amount;
        let newLevel = s.level;
        
        // Level up logic with overflow
        while (newXP >= s.requiredXP && newLevel < 10) {
          newXP -= s.requiredXP;
          newLevel++;
        }
        
        if (newLevel >= 10) {
          newXP = s.requiredXP; // Cap at max
        }
        
        return { ...s, currentXP: newXP, level: newLevel };
      }),
    }));
  }, []);

  const selectedSkill = state.skills.find(s => s.id === state.selectedSkillId) || null;

  return {
    skills: state.skills,
    selectedSkill,
    selectedSkillId: state.selectedSkillId,
    isAddingSkill: state.isAddingSkill,
    isEditingSkill: state.isEditingSkill,
    selectSkill,
    openAddSkill,
    openEditSkill,
    closeModals,
    addSkill,
    updateSkill,
    deleteSkill,
    addXP,
  };
};
