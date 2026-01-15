// ═══════════════════════════════════════════════════════════════════════════
// INVENTORY TYPES - Asset Management System
// ═══════════════════════════════════════════════════════════════════════════

export type ItemStatus = 'active' | 'stored' | 'archived';

export type ItemCategory = 
  | 'wearables'
  | 'tools'
  | 'digital'
  | 'health'
  | 'documents';

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
  { id: 'wearables', label: 'WEARABLES', icon: 'Flask' },
  { id: 'tools', label: 'TOOLS', icon: 'Shield' },
  { id: 'digital', label: 'DIGITAL', icon: 'Gem' },
  { id: 'health', label: 'HEALTH', icon: 'Key' },
  { id: 'documents', label: 'DOCUMENTS', icon: 'Star' },
];

// Sample inventory data
export const SAMPLE_INVENTORY: InventoryItem[] = [
  { id: '1', name: 'Smart Watch', category: 'wearables', status: 'active', usagePercent: 80 },
  { id: '2', name: 'Fitness Band', category: 'wearables', status: 'active', usagePercent: 60 },
  { id: '3', name: 'Laptop', category: 'tools', status: 'active', usagePercent: 90 },
  { id: '4', name: 'Tablet', category: 'tools', status: 'stored', usagePercent: 40 },
  { id: '5', name: 'Cloud Storage', category: 'digital', status: 'active', usagePercent: 75 },
  { id: '6', name: 'Software License', category: 'digital', status: 'active', usagePercent: 100 },
  { id: '7', name: 'Gym Membership', category: 'health', status: 'active', usagePercent: 50 },
  { id: '8', name: 'Insurance Policy', category: 'health', status: 'stored', usagePercent: 30 },
  { id: '9', name: 'Tax Records', category: 'documents', status: 'archived', usagePercent: 10 },
  { id: '10', name: 'Contracts', category: 'documents', status: 'active', usagePercent: 85 },
  { id: '11', name: 'Headphones', category: 'wearables', status: 'stored', usagePercent: 20 },
  { id: '12', name: 'Backup Drive', category: 'digital', status: 'active', usagePercent: 65 },
];
