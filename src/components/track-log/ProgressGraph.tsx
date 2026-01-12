import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { format, eachDayOfInterval, startOfMonth, endOfMonth, setMonth, startOfYear, isAfter } from 'date-fns';
import { useTrackLogStore } from './useTrackLogStore';

interface ProgressGraphProps {
  currentDate: Date;
  viewMode: 'month' | 'year';
}

export default function ProgressGraph({ currentDate, viewMode }: ProgressGraphProps) {
  const { getDayCompletionRate, getMonthCompletionRate } = useTrackLogStore();
  
  const data = useMemo(() => {
    if (viewMode === 'month') {
      const start = startOfMonth(currentDate);
      const end = endOfMonth(currentDate);
      const today = new Date();
      
      return eachDayOfInterval({ start, end }).map(day => ({
        label: format(day, 'd'),
        value: isAfter(day, today) ? 0 : getDayCompletionRate(day),
        isFuture: isAfter(day, today),
      }));
    } else {
      return Array.from({ length: 12 }, (_, i) => {
        const monthDate = setMonth(startOfYear(currentDate), i);
        return {
          label: format(monthDate, 'MMM'),
          value: getMonthCompletionRate(monthDate),
          isFuture: false,
        };
      });
    }
  }, [currentDate, viewMode, getDayCompletionRate, getMonthCompletionRate]);

  const maxValue = 100;

  return (
    <div className="system-card system-card-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <span className="font-system text-xs text-muted-foreground tracking-wider">
          {viewMode === 'month' ? 'DAILY COMPLETION' : 'MONTHLY COMPLETION'}
        </span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Completion %</span>
          </div>
        </div>
      </div>
      
      {/* Graph */}
      <div className="relative h-32 flex items-end gap-[2px]">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-[10px] text-muted-foreground font-system">
          <span>100</span>
          <span>50</span>
          <span>0</span>
        </div>
        
        {/* Bars container */}
        <div className="flex-1 ml-10 flex items-end gap-[1px] h-full">
          {data.map((item, index) => (
            <motion.div
              key={index}
              className="flex-1 flex flex-col items-center justify-end h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.02 }}
            >
              {/* Bar */}
              <motion.div
                className={`w-full rounded-t-sm ${item.isFuture ? 'bg-secondary/30' : ''}`}
                style={{
                  background: item.isFuture 
                    ? undefined 
                    : `linear-gradient(to top, hsl(var(--primary) / 0.8), hsl(var(--primary) / 0.4))`,
                  boxShadow: item.value > 0 && !item.isFuture
                    ? '0 0 10px hsl(var(--primary) / 0.3)'
                    : undefined,
                }}
                initial={{ height: 0 }}
                animate={{ height: `${(item.value / maxValue) * 100}%` }}
                transition={{ delay: index * 0.02, duration: 0.4, ease: 'easeOut' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* X-axis labels */}
      <div className="flex ml-10 mt-2">
        {data.map((item, index) => (
          <div 
            key={index} 
            className="flex-1 text-center text-[8px] sm:text-[10px] text-muted-foreground font-system"
          >
            {/* Show every nth label based on data length */}
            {viewMode === 'year' || index % 5 === 0 ? item.label : ''}
          </div>
        ))}
      </div>
    </div>
  );
}
