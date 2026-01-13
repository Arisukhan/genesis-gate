import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stat } from './types';

interface StatRowProps {
  stat: Stat;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function StatRow({ stat, isExpanded, onToggle }: StatRowProps) {
  const xpPercentage = (stat.currentXP / stat.requiredXP) * 100;

  return (
    <div className="w-full">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-2 px-3 rounded-md hover:bg-secondary/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span 
            className={`text-lg transition-all duration-300 ${
              isExpanded ? 'scale-110 filter drop-shadow-[0_0_8px_hsl(var(--primary))]' : ''
            }`}
          >
            {stat.icon}
          </span>
          <span className="font-system text-xs tracking-wider text-muted-foreground">
            {stat.shortName}
          </span>
        </div>
        <span className="font-system text-sm text-foreground font-bold">
          {stat.value}
        </span>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 pt-1">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-system text-[10px] text-muted-foreground tracking-wide">
                  {stat.name} XP
                </span>
                <span className="font-system text-[10px] text-primary/70">
                  {stat.currentXP} / {stat.requiredXP}
                </span>
              </div>
              <div className="h-1.5 bg-secondary/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${xpPercentage}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
