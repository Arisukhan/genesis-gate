import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { format, setMonth, startOfYear } from 'date-fns';
import { DayRecord, getDayStatus } from './types';
import { useTrackLogStore } from './useTrackLogStore';

interface YearGridProps {
  currentYear: Date;
  onMonthClick: (month: Date) => void;
}

const MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
];

export default function YearGrid({ currentYear, onMonthClick }: YearGridProps) {
  const { getMonthCompletionRate } = useTrackLogStore();
  
  const monthData = useMemo(() => {
    return MONTHS.map((_, index) => {
      const monthDate = setMonth(startOfYear(currentYear), index);
      const completionRate = getMonthCompletionRate(monthDate);
      return { monthDate, completionRate };
    });
  }, [currentYear, getMonthCompletionRate]);

  const getColorForRate = (rate: number): string => {
    if (rate === 0) return 'hsl(220 20% 20%)';
    if (rate >= 90) return 'hsl(142 76% 45%)';
    if (rate >= 70) return 'hsl(50 100% 50%)';
    if (rate >= 50) return 'hsl(30 100% 50%)';
    return 'hsl(0 100% 50%)';
  };

  return (
    <div className="flex-1 grid grid-cols-3 sm:grid-cols-4 gap-4 p-4">
      {monthData.map(({ monthDate, completionRate }, index) => (
        <motion.button
          key={MONTHS[index]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
          onClick={() => onMonthClick(monthDate)}
          className="system-card system-card-sm p-4 sm:p-6 flex flex-col items-center justify-center gap-2 hover:scale-105 transition-transform cursor-pointer"
          style={{
            background: `linear-gradient(135deg, ${getColorForRate(completionRate)}15, ${getColorForRate(completionRate)}05)`,
          }}
        >
          {/* Month name */}
          <span className="font-system text-lg sm:text-xl text-foreground tracking-wider">
            {MONTHS[index]}
          </span>
          
          {/* Completion rate */}
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getColorForRate(completionRate) }}
            />
            <span 
              className="font-system text-sm"
              style={{ color: getColorForRate(completionRate) }}
            >
              {completionRate}%
            </span>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
