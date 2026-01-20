import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isToday,
  isFuture
} from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DayRecord, getDayStatus, getStatusColor } from './types';

interface CalendarGridProps {
  currentMonth: Date;
  records: Record<string, DayRecord>;
  onDateClick: (date: Date) => void;
}

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export default function CalendarGrid({ currentMonth, records, onDateClick }: CalendarGridProps) {
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);
    
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [currentMonth]);

  // Calculate number of weeks for proper grid sizing
  const numWeeks = Math.ceil(calendarDays.length / 7);

  return (
    <div className="flex flex-col h-full">
      {/* Weekday headers - sticky */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 flex-shrink-0">
        {WEEKDAYS.map(day => (
          <div 
            key={day} 
            className="text-center font-system text-[10px] sm:text-xs text-muted-foreground tracking-wider py-1 sm:py-2"
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Scrollable calendar grid */}
      <ScrollArea className="flex-1">
        <div 
          className="grid grid-cols-7 gap-1 sm:gap-2 pb-2"
        >
          {calendarDays.map((day, index) => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const record = records[dateStr];
            const status = getDayStatus(record);
            const statusColor = getStatusColor(status);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isCurrentDay = isToday(day);
            const isFutureDay = isFuture(day);
            
            return (
              <motion.button
                key={dateStr}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.005, duration: 0.15 }}
                onClick={() => !isFutureDay && onDateClick(day)}
                disabled={isFutureDay}
                className={`
                  relative flex flex-col items-center justify-center
                  rounded-md sm:rounded-lg transition-all duration-200
                  h-[48px] sm:h-[56px] md:h-[64px]
                  ${isCurrentMonth ? 'opacity-100' : 'opacity-30'}
                  ${isFutureDay ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-[1.02] sm:hover:scale-105'}
                  ${isCurrentDay ? 'ring-1 sm:ring-2 ring-primary ring-offset-1 sm:ring-offset-2 ring-offset-background' : ''}
                `}
                style={{
                  backgroundColor: isCurrentMonth && !isFutureDay 
                    ? `${statusColor}20` 
                    : 'hsl(var(--secondary) / 0.3)',
                }}
              >
                {/* Status indicator */}
                {isCurrentMonth && !isFutureDay && status !== 'none' && (
                  <div 
                    className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                    style={{ backgroundColor: statusColor }}
                  />
                )}
                
                {/* Day number */}
                <span className={`
                  font-system text-xs sm:text-sm md:text-base
                  ${isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'}
                  ${isCurrentDay ? 'font-bold text-primary' : ''}
                `}>
                  {format(day, 'd')}
                </span>
                
                {/* XP indicator for days with data */}
                {record && record.totalXP > 0 && (
                  <span className="text-[8px] sm:text-[10px] text-primary/70 font-system">
                    +{record.totalXP}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
