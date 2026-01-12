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

  return (
    <div className="flex-1 flex flex-col">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map(day => (
          <div 
            key={day} 
            className="text-center font-system text-xs text-muted-foreground tracking-wider py-2"
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 flex-1">
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
              transition={{ delay: index * 0.01, duration: 0.2 }}
              onClick={() => !isFutureDay && onDateClick(day)}
              disabled={isFutureDay}
              className={`
                relative aspect-square flex flex-col items-center justify-center
                rounded-lg transition-all duration-200
                ${isCurrentMonth ? 'opacity-100' : 'opacity-30'}
                ${isFutureDay ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
                ${isCurrentDay ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
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
                  className="absolute top-1 right-1 w-2 h-2 rounded-full"
                  style={{ backgroundColor: statusColor }}
                />
              )}
              
              {/* Day number */}
              <span className={`
                font-system text-sm sm:text-base
                ${isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'}
                ${isCurrentDay ? 'font-bold text-primary' : ''}
              `}>
                {format(day, 'd')}
              </span>
              
              {/* XP indicator for days with data */}
              {record && record.totalXP > 0 && (
                <span className="text-[10px] text-primary/70 font-system">
                  +{record.totalXP}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
