import { LibraryHabit } from "./types";

interface HabitMiniCardProps {
  habit: LibraryHabit;
  onClick: () => void;
}

const HABIT_ICONS: Record<string, string> = {
  "🧘": "🧘",
  "💧": "💧",
  "📖": "📖",
  "✍️": "✍️",
  "🏃": "🏃",
  "💪": "💪",
  "🎯": "🎯",
  "⏰": "⏰",
  "🌅": "🌅",
  "🌙": "🌙",
};

const HabitMiniCard = ({ habit, onClick }: HabitMiniCardProps) => {
  const displayIcon = habit.icon || "🎯";

  return (
    <button
      onClick={onClick}
      className="w-full p-4 bg-secondary/40 border border-primary/20 rounded-lg cursor-pointer transition-all hover:border-primary/40 hover:bg-secondary/60 hover:shadow-glow-sm group text-left"
    >
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-lg group-hover:border-primary/40 transition-all">
          {displayIcon}
        </div>

        {/* Title */}
        <div className="flex-1 min-w-0">
          <h3 className="font-system text-sm text-foreground tracking-wide group-hover:text-primary transition-colors truncate">
            {habit.title}
          </h3>
        </div>

        {/* Status Indicator */}
        <div
          className={`px-2 py-1 rounded-full font-system text-[10px] tracking-wider uppercase ${
            habit.status === "active"
              ? "bg-success/20 border border-success/40 text-success"
              : "bg-muted/20 border border-muted/40 text-muted-foreground"
          }`}
        >
          {habit.status}
        </div>
      </div>
    </button>
  );
};

export default HabitMiniCard;
