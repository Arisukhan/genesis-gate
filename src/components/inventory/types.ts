// ═══════════════════════════════════════════════════════════════════════════
// INVENTORY TYPES - Asset Management System
// ═══════════════════════════════════════════════════════════════════════════

export type ItemStatus = 'active' | 'stored' | 'archived';

export type ItemCategory = 
  | 'consumable'
  | 'equipment'
  | 'material'
  | 'key'
  | 'special'
  | 'buff';

export interface InventoryItem {
  id: string;
  name: string;
  category: ItemCategory;
  status: ItemStatus;
  usagePercent: number; // 0-100 visual indicator
  quantity?: number;
}

export interface CategoryOption {
  id: ItemCategory | 'all';
  label: string;
  icon: string;
}

export const CATEGORIES: CategoryOption[] = [
  { id: 'all', label: 'ALL', icon: 'Grid3X3' },
  { id: 'consumable', label: 'CONSUMABLE', icon: 'Flask' },
  { id: 'equipment', label: 'EQUIPMENT', icon: 'Shield' },
  { id: 'material', label: 'MATERIAL', icon: 'Gem' },
  { id: 'key', label: 'KEY ITEMS', icon: 'Key' },
  { id: 'special', label: 'SPECIAL', icon: 'Star' },
  { id: 'buff', label: 'BUFFS', icon: 'Zap' },
];

// Sample inventory data
export const SAMPLE_INVENTORY: InventoryItem[] = [
  { id: '1', name: 'Focus Potion', category: 'consumable', status: 'active', usagePercent: 80, quantity: 3 },
  { id: '2', name: 'Energy Drink', category: 'consumable', status: 'active', usagePercent: 60, quantity: 5 },
  { id: '3', name: 'Study Notes', category: 'material', status: 'stored', usagePercent: 40 },
  { id: '4', name: 'Discipline Shield', category: 'equipment', status: 'active', usagePercent: 100 },
  { id: '5', name: 'Progress Key', category: 'key', status: 'active', usagePercent: 90 },
  { id: '6', name: 'Streak Token', category: 'special', status: 'active', usagePercent: 75 },
  { id: '7', name: 'Morning Boost', category: 'buff', status: 'active', usagePercent: 50 },
  { id: '8', name: 'Old Journal', category: 'material', status: 'archived', usagePercent: 10 },
  { id: '9', name: 'Motivation Gem', category: 'special', status: 'stored', usagePercent: 30 },
  { id: '10', name: 'Rest Tonic', category: 'consumable', status: 'stored', usagePercent: 20, quantity: 2 },
  { id: '11', name: 'Willpower Ring', category: 'equipment', status: 'active', usagePercent: 85 },
  { id: '12', name: 'Secret Map', category: 'key', status: 'archived', usagePercent: 5 },
];
