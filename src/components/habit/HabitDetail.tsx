import { ChevronLeft, Flame, Calendar, AlertCircle, Link } from "lucide-react";
import type { Habit } from "./HabitWindow";

interface HabitDetailProps {
  habit: Habit;
  onBack: () => void;
}

const HabitDetail = ({ habit, onBack }: HabitDetailProps) => {
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-primary/70 hover:text-primary transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="font-system text-sm tracking-wider">BACK</span>
      </button>

      {/* Habit Card */}
      <div className="glow-border glass-panel rounded-lg p-6 sm:p-8 space-y-6">
        {/* Title */}
        <div className="text-center">
          <h2 className="font-system text-foreground text-xl sm:text-2xl tracking-[0.15em] uppercase mb-4">
            {habit.name}
          </h2>

          {/* Status Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
            habit.completed 
              ? "bg-emerald-500/10 border border-emerald-500/40" 
              : "bg-primary/10 border border-primary/30"
          }`}>
            <span className={`font-system text-xs tracking-wider ${
              habit.completed ? "text-emerald-400" : "text-primary"
            }`}>
              {habit.completed ? "COMPLETED TODAY" : "PENDING"}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        {/* Stats Row */}
        <div className="flex items-center justify-center gap-8 sm:gap-12">
          <div className="text-center">
            <p className="font-system text-muted-foreground/60 text-xs tracking-wider mb-2">
              FREQUENCY
            </p>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary/60" />
              <span className="font-system text-primary text-sm tracking-wider">
                {habit.frequency}
              </span>
            </div>
          </div>

          <div className="text-center">
            <p className="font-system text-muted-foreground/60 text-xs tracking-wider mb-2">
              STREAK
            </p>
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="font-system text-orange-400 text-xl tracking-wider">
                {habit.streak}
              </span>
              <span className="font-system text-orange-400/60 text-sm">days</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        {/* Description */}
        <div>
          <h4 className="font-system text-foreground/80 text-sm tracking-wider mb-3">
            PURPOSE
          </h4>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            {habit.description}
          </p>
        </div>

        {/* Conditions */}
        {habit.conditions.length > 0 && (
          <div>
            <h4 className="font-system text-foreground/80 text-sm tracking-wider mb-3">
              RULES
            </h4>
            <ul className="space-y-2">
              {habit.conditions.map((condition, index) => (
                <li key={index} className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-primary/60 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground text-sm">{condition}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Linked Quests */}
        {habit.linkedQuests && habit.linkedQuests.length > 0 && (
          <>
            <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div>
              <h4 className="font-system text-foreground/80 text-sm tracking-wider mb-3">
                LINKED QUESTS
              </h4>
              <div className="flex flex-wrap gap-2">
                {habit.linkedQuests.map((quest, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/40 border border-primary/20"
                  >
                    <Link className="w-3 h-3 text-primary/60" />
                    <span className="text-muted-foreground text-xs">{quest}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HabitDetail;
