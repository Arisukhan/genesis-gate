import { ChevronLeft, Check } from "lucide-react";
import type { Quest } from "./QuestWindow";

interface QuestListProps {
  quests: Quest[];
  onQuestSelect: (quest: Quest) => void;
  onBack: () => void;
}

const DifficultyIndicator = ({ level }: { level: number }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${
            i <= level
              ? "bg-primary shadow-[0_0_4px_hsl(var(--primary)/0.6)]"
              : "bg-secondary/60"
          }`}
        />
      ))}
    </div>
  );
};

const QuestList = ({ quests, onQuestSelect, onBack }: QuestListProps) => {
  return (
    <div className="space-y-4">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-primary/70 hover:text-primary transition-colors mb-4"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="font-system text-sm tracking-wider">BACK</span>
      </button>

      {/* Quest List */}
      <div className="space-y-3">
        {quests.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground/60 font-system tracking-wider">
              NO QUESTS AVAILABLE
            </p>
          </div>
        ) : (
          quests.map((quest) => (
            <button
              key={quest.id}
              onClick={() => onQuestSelect(quest)}
              disabled={quest.completed}
              className={`group w-full text-left glass-panel rounded-lg p-4 sm:p-5 border transition-all duration-300 ${
                quest.completed
                  ? "border-emerald-500/30 opacity-70"
                  : "border-primary/20 hover:border-primary/40 hover:shadow-[0_0_15px_hsl(var(--primary)/0.2)]"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    {quest.completed && (
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/60 flex items-center justify-center">
                        <Check className="w-3 h-3 text-emerald-400" />
                      </div>
                    )}
                    <h3
                      className={`font-system text-sm sm:text-base tracking-wider truncate ${
                        quest.completed
                          ? "text-muted-foreground line-through"
                          : "text-foreground group-hover:text-primary"
                      } transition-colors`}
                    >
                      {quest.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4">
                    <DifficultyIndicator level={quest.difficulty} />
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-system text-primary text-lg sm:text-xl tracking-wider">
                    +{quest.xp}
                  </span>
                  <span className="font-system text-primary/60 text-xs ml-1">
                    XP
                  </span>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default QuestList;
