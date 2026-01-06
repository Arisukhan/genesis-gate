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
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-stretch">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className="group flex-1 min-h-[180px] sm:min-h-[220px] glow-border glass-panel rounded-lg p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:scale-[1.02]"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center transition-all duration-300 group-hover:border-primary/60 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]">
              <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary/70 group-hover:text-primary transition-colors" />
            </div>

            <div className="text-center">
              <h3 className="font-system text-foreground text-sm sm:text-base tracking-[0.15em] uppercase mb-2 group-hover:text-primary transition-colors">
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
