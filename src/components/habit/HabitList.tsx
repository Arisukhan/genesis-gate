import { Check, Flame } from "lucide-react";
import type { Habit } from "./HabitWindow";

interface HabitListProps {
  habits: Habit[];
  onHabitSelect: (habit: Habit) => void;
  onComplete: (habitId: string) => void;
}

const HabitList = ({ habits, onHabitSelect, onComplete }: HabitListProps) => {
  return (
    <div className="space-y-3">
      {habits.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground/60 font-system tracking-wider">
            NO HABITS CONFIGURED
          </p>
        </div>
      ) : (
        habits.map((habit) => (
          <div
            key={habit.id}
            className={`group w-full glass-panel rounded-lg p-4 sm:p-5 border transition-all duration-200 ${
              habit.completed
                ? "border-emerald-500/30"
                : "border-primary/20 hover:border-primary/40 hover:shadow-[0_0_15px_hsl(var(--primary)/0.15)]"
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Checkbox - Complete Area */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onComplete(habit.id);
                }}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                  habit.completed
                    ? "bg-emerald-500/20 border-2 border-emerald-500/60 shadow-[0_0_10px_hsl(142_71%_45%/0.3)]"
                    : "border-2 border-primary/40 hover:border-primary/60 hover:shadow-[0_0_8px_hsl(var(--primary)/0.3)]"
                }`}
              >
                {habit.completed && (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                )}
              </button>

              {/* Info Area - Clickable to open detail */}
              <button
                onClick={() => onHabitSelect(habit)}
                className="flex-1 text-left min-w-0"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3
                    className={`font-system text-sm sm:text-base tracking-wider truncate transition-colors ${
                      habit.completed
                        ? "text-muted-foreground"
                        : "text-foreground group-hover:text-primary"
                    }`}
                  >
                    {habit.name}
                  </h3>

                  {/* Streak indicator */}
                  {habit.streak > 0 && (
                    <div className="flex items-center gap-1 shrink-0">
                      <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400/80" />
                      <span className="font-system text-xs sm:text-sm text-orange-400/80">
                        {habit.streak}
                      </span>
                    </div>
                  )}
                </div>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default HabitList;
