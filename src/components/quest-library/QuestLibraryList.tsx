import { LibraryQuest, QuestCategory, QuestDifficulty } from "./QuestLibrary";
import { ScrollArea } from "@/components/ui/scroll-area";

interface QuestLibraryListProps {
  quests: LibraryQuest[];
  onSelect: (quest: LibraryQuest) => void;
}

const categoryColors: Record<QuestCategory, string> = {
  core: "bg-primary/20 text-primary border-primary/40",
  optional: "bg-warning/20 text-warning border-warning/40",
  special: "bg-accent/20 text-accent border-accent/40",
};

const categoryLabels: Record<QuestCategory, string> = {
  core: "CORE",
  optional: "OPTIONAL",
  special: "SPECIAL",
};

const DifficultyIndicator = ({ level }: { level: QuestDifficulty }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`w-1.5 h-1.5 rounded-full transition-colors ${
            i <= level ? "bg-primary" : "bg-primary/20"
          }`}
        />
      ))}
    </div>
  );
};

const QuestLibraryList = ({ quests, onSelect }: QuestLibraryListProps) => {
  if (quests.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="font-system text-muted-foreground text-sm">
          No quests found in this category
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full pr-4">
      <div className="space-y-2">
        {quests.map((quest) => (
          <button
            key={quest.id}
            onClick={() => onSelect(quest)}
            className="w-full p-4 bg-secondary/30 border border-primary/20 rounded-lg transition-all hover:bg-secondary/50 hover:border-primary/40 hover:shadow-glow-sm group text-left"
          >
            <div className="flex items-center justify-between">
              {/* Left: Title & Category */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <h3 className="font-system text-sm text-foreground tracking-wide truncate group-hover:text-primary transition-colors">
                  {quest.title}
                </h3>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-system tracking-wider border shrink-0 ${categoryColors[quest.category]}`}
                >
                  {categoryLabels[quest.category]}
                </span>
              </div>

              {/* Right: Difficulty & XP */}
              <div className="flex items-center gap-6 shrink-0 ml-4">
                <DifficultyIndicator level={quest.difficulty} />
                <span className="font-system text-xs text-primary/80 tracking-wider min-w-[60px] text-right">
                  +{quest.xp} XP
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
};

export default QuestLibraryList;
