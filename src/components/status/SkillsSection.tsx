import { ChevronRight } from 'lucide-react';
import { SkillPreview } from './types';

interface SkillsSectionProps {
  inProgress: SkillPreview[];
  mastered: SkillPreview[];
  onExpand: () => void;
}

export default function SkillsSection({ inProgress, mastered, onExpand }: SkillsSectionProps) {
  const displayInProgress = inProgress.slice(0, 2);
  const moreInProgress = inProgress.length - 2;
  const displayMastered = mastered.slice(0, 2);
  const moreMastered = mastered.length - 2;

  return (
    <div className="w-full">
      {/* Header */}
      <button
        onClick={onExpand}
        className="w-full flex items-center justify-between py-2 px-3 hover:bg-secondary/30 transition-colors rounded-md"
      >
        <span className="font-system text-xs tracking-wider text-foreground uppercase">
          SKILLS
        </span>
        <ChevronRight className="w-4 h-4 text-primary/60" />
      </button>

      {/* Preview content */}
      <div className="px-3 pb-2 space-y-3">
        {/* In Progress */}
        <div>
          <span className="font-system text-[10px] text-muted-foreground tracking-wide block mb-1.5">
            IN PROGRESS
          </span>
          <div className="flex flex-wrap gap-2">
            {displayInProgress.map(skill => (
              <div
                key={skill.id}
                className="flex items-center gap-2 bg-secondary/30 px-2 py-1 rounded"
              >
                <span className="text-[11px] text-foreground/80">{skill.name}</span>
                <div className="w-8 h-1 bg-secondary/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary/60 rounded-full"
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
              </div>
            ))}
            {moreInProgress > 0 && (
              <span className="text-[10px] text-primary/60 self-center">
                +{moreInProgress} more
              </span>
            )}
          </div>
        </div>

        {/* Mastered */}
        {mastered.length > 0 && (
          <div>
            <span className="font-system text-[10px] text-muted-foreground tracking-wide block mb-1.5">
              MASTERED
            </span>
            <div className="flex flex-wrap gap-2">
              {displayMastered.map(skill => (
                <div
                  key={skill.id}
                  className="flex items-center gap-1.5 bg-warning/10 border border-warning/30 px-2 py-1 rounded"
                >
                  <span className="text-[11px] text-warning/90">{skill.name}</span>
                  <span className="text-warning text-[10px]">✓</span>
                </div>
              ))}
              {moreMastered > 0 && (
                <span className="text-[10px] text-warning/60 self-center">
                  +{moreMastered} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
