import { ChevronLeft, Sword, Sparkles, Star, AlertCircle, Check } from "lucide-react";
import type { Quest } from "./QuestWindow";

interface QuestDetailProps {
  quest: Quest;
  onComplete: (questId: string) => void;
  onBack: () => void;
}

const categoryIcons = {
  core: Sword,
  optional: Sparkles,
  special: Star,
};

const categoryLabels = {
  core: "CORE",
  optional: "OPTIONAL",
  special: "SPECIAL",
};

const DifficultyIndicator = ({ level }: { level: number }) => {
  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`w-2.5 h-2.5 rounded-full transition-colors ${
            i <= level
              ? "bg-primary shadow-[0_0_6px_hsl(var(--primary)/0.6)]"
              : "bg-secondary/60"
          }`}
        />
      ))}
    </div>
  );
};

const QuestDetail = ({ quest, onComplete, onBack }: QuestDetailProps) => {
  const CategoryIcon = categoryIcons[quest.category];

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

      {/* Quest Card */}
      <div className="glow-border glass-panel rounded-lg p-6 sm:p-8 space-y-6">
        {/* Title */}
        <div className="text-center">
          <h2 className="font-system text-foreground text-xl sm:text-2xl tracking-[0.15em] uppercase mb-4">
            {quest.title}
          </h2>

          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
            <CategoryIcon className="w-4 h-4 text-primary" />
            <span className="font-system text-primary text-xs tracking-wider">
              {categoryLabels[quest.category]}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        {/* Stats Row */}
        <div className="flex items-center justify-center gap-8 sm:gap-12">
          <div className="text-center">
            <p className="font-system text-muted-foreground/60 text-xs tracking-wider mb-2">
              DIFFICULTY
            </p>
            <DifficultyIndicator level={quest.difficulty} />
          </div>

          <div className="text-center">
            <p className="font-system text-muted-foreground/60 text-xs tracking-wider mb-2">
              REWARD
            </p>
            <div className="flex items-baseline gap-1">
              <span className="font-system text-primary text-2xl tracking-wider">
                +{quest.xp}
              </span>
              <span className="font-system text-primary/60 text-sm">XP</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        {/* Description */}
        <div>
          <h4 className="font-system text-foreground/80 text-sm tracking-wider mb-3">
            DESCRIPTION
          </h4>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            {quest.description}
          </p>
        </div>

        {/* Conditions */}
        {quest.conditions.length > 0 && (
          <div>
            <h4 className="font-system text-foreground/80 text-sm tracking-wider mb-3">
              CONDITIONS
            </h4>
            <ul className="space-y-2">
              {quest.conditions.map((condition, index) => (
                <li key={index} className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-primary/60 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground text-sm">{condition}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        {/* Complete Button */}
        <div className="flex justify-center pt-2">
          {quest.completed ? (
            <div className="flex items-center gap-3 px-8 py-4 rounded-lg bg-emerald-500/10 border border-emerald-500/40">
              <Check className="w-5 h-5 text-emerald-400" />
              <span className="font-system text-emerald-400 tracking-[0.15em] uppercase">
                COMPLETED
              </span>
            </div>
          ) : (
            <button
              onClick={() => onComplete(quest.id)}
              className="group relative px-10 py-4 rounded-lg bg-primary/20 border border-primary/50 transition-all duration-300 hover:bg-primary/30 hover:border-primary/70 hover:shadow-[0_0_25px_hsl(var(--primary)/0.4)] active:scale-95"
            >
              <span className="font-system text-primary text-lg tracking-[0.2em] uppercase group-hover:text-foreground transition-colors">
                COMPLETE
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestDetail;
