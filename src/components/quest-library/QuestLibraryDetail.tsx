import { LibraryQuest, QuestCategory, QuestDifficulty } from "./QuestLibrary";
import { Pencil, Trash2, X, Target, Zap, FileText, List, Link2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface QuestLibraryDetailProps {
  quest: LibraryQuest;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
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
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full transition-colors ${
            i <= level ? "bg-primary shadow-glow-sm" : "bg-primary/20"
          }`}
        />
      ))}
    </div>
  );
};

const QuestLibraryDetail = ({
  quest,
  onEdit,
  onDelete,
  onBack,
}: QuestLibraryDetailProps) => {
  return (
    <div className="h-full flex items-center justify-center">
      {/* Backdrop blur */}
      <div
        className="absolute inset-0 bg-background/60 backdrop-blur-sm"
        onClick={onBack}
      />

      {/* Detail Card */}
      <div className="relative z-10 w-full max-w-2xl system-card p-0 animate-fade-in">
        {/* Header */}
        <div className="p-6 border-b border-primary/20">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-system tracking-wider border ${categoryColors[quest.category]}`}
                >
                  {categoryLabels[quest.category]}
                </span>
              </div>
              <h2 className="font-system text-xl text-foreground tracking-wide">
                {quest.title}
              </h2>
            </div>
            <button
              onClick={onBack}
              className="w-8 h-8 rounded-full bg-secondary/40 border border-primary/30 flex items-center justify-center transition-all hover:border-primary/60"
            >
              <X className="w-4 h-4 text-primary/70" />
            </button>
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="max-h-[60vh]">
          <div className="p-6 space-y-6">
            {/* Stats Row */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <Target className="w-4 h-4 text-primary/60" />
                <span className="font-system text-xs text-muted-foreground tracking-wider">
                  DIFFICULTY
                </span>
                <DifficultyIndicator level={quest.difficulty} />
              </div>
              <div className="flex items-center gap-3">
                <Zap className="w-4 h-4 text-primary/60" />
                <span className="font-system text-xs text-muted-foreground tracking-wider">
                  REWARD
                </span>
                <span className="font-system text-sm text-primary tracking-wider">
                  +{quest.xp} XP
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-primary/60" />
                <span className="font-system text-xs text-muted-foreground tracking-wider">
                  DESCRIPTION
                </span>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed pl-6">
                {quest.description}
              </p>
            </div>

            {/* Rules */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <List className="w-4 h-4 text-primary/60" />
                <span className="font-system text-xs text-muted-foreground tracking-wider">
                  RULES / CONDITIONS
                </span>
              </div>
              <ul className="space-y-2 pl-6">
                {quest.rules.map((rule, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-foreground/70"
                  >
                    <span className="text-primary/60 mt-1">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Linked Skills */}
            {quest.linkedSkills && quest.linkedSkills.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Link2 className="w-4 h-4 text-primary/60" />
                  <span className="font-system text-xs text-muted-foreground tracking-wider">
                    LINKED SKILLS
                  </span>
                </div>
                <div className="flex gap-2 pl-6">
                  {quest.linkedSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-secondary/50 border border-primary/30 rounded-full text-xs text-foreground/70 font-system tracking-wide"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Linked Inventory */}
            {quest.linkedInventory && quest.linkedInventory.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Link2 className="w-4 h-4 text-primary/60" />
                  <span className="font-system text-xs text-muted-foreground tracking-wider">
                    LINKED INVENTORY
                  </span>
                </div>
                <div className="flex gap-2 pl-6">
                  {quest.linkedInventory.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-secondary/50 border border-primary/30 rounded-full text-xs text-foreground/70 font-system tracking-wide"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer Actions */}
        <div className="p-6 border-t border-primary/20 flex justify-end gap-3">
          <button
            onClick={onDelete}
            className="flex items-center gap-2 px-4 py-2 bg-danger/10 border border-danger/30 rounded-lg transition-all hover:bg-danger/20 hover:border-danger/50"
          >
            <Trash2 className="w-4 h-4 text-danger" />
            <span className="font-system text-xs text-danger tracking-wider">
              DELETE
            </span>
          </button>
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/40 rounded-lg transition-all hover:bg-primary/30 hover:border-primary/60"
          >
            <Pencil className="w-4 h-4 text-primary" />
            <span className="font-system text-xs text-primary tracking-wider">
              EDIT QUEST
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestLibraryDetail;
