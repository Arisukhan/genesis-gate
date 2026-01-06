import { Sword, Sparkles, Star } from "lucide-react";
import type { QuestCategory } from "./QuestWindow";

interface QuestCategorySelectionProps {
  onSelect: (category: QuestCategory) => void;
}

const categories = [
  {
    id: "core" as QuestCategory,
    label: "CORE QUESTS",
    icon: Sword,
    description: "Essential daily objectives",
  },
  {
    id: "optional" as QuestCategory,
    label: "OPTIONAL QUESTS",
    icon: Sparkles,
    description: "Bonus challenges",
  },
  {
    id: "special" as QuestCategory,
    label: "SPECIAL QUESTS",
    icon: Star,
    description: "Rare high-value missions",
  },
];

const QuestCategorySelection = ({ onSelect }: QuestCategorySelectionProps) => {
  return (
    <div className="flex flex-col gap-3 w-full max-w-md mx-auto">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className="group w-full glow-border glass-panel rounded-lg p-4 sm:p-5 flex items-center gap-4 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:scale-[1.01]"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:border-primary/60 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]">
              <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary/70 group-hover:text-primary transition-colors" />
            </div>

            <div className="text-left flex-1">
              <h3 className="font-system text-foreground text-sm sm:text-base tracking-[0.15em] uppercase mb-1 group-hover:text-primary transition-colors">
                {category.label}
              </h3>
              <p className="text-muted-foreground/60 text-xs sm:text-sm">
                {category.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default QuestCategorySelection;
