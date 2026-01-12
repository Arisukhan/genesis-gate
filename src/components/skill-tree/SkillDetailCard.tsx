import { motion } from 'framer-motion';
import { X, Edit2, Trash2, Zap } from 'lucide-react';
import { Skill, DIFFICULTY_COLORS, MASTERED_COLOR } from './types';
import { SystemCard, SystemCardTitle, SystemCardDivider, SystemCardContent } from '@/components/ui/system-card';

interface SkillDetailCardProps {
  skill: Skill;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onAddXP: (amount: number) => void;
}

const SkillDetailCard = ({ skill, onClose, onEdit, onDelete, onAddXP }: SkillDetailCardProps) => {
  const isMastered = skill.level >= 10;
  const isRoot = skill.parentId === null;
  const colorConfig = isMastered ? MASTERED_COLOR : DIFFICULTY_COLORS[skill.difficulty];
  const xpProgress = (skill.currentXP / skill.requiredXP) * 100;

  const difficultyLabels = {
    easy: 'EASY',
    medium: 'MEDIUM',
    hard: 'HARD',
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Card */}
      <motion.div
        className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-md"
        initial={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
        animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
        exit={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <SystemCard className="p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary/50 border border-primary/30 flex items-center justify-center hover:border-primary/60 hover:bg-secondary transition-all"
          >
            <X className="w-4 h-4 text-primary/70" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-3xl border-2"
              style={{
                background: colorConfig.bg,
                borderColor: `hsl(${colorConfig.glow})`,
                boxShadow: `0 0 20px hsl(${colorConfig.glow} / 0.4)`,
              }}
            >
              {skill.icon}
            </div>
            <div className="flex-1">
              <SystemCardTitle className="mb-1">{skill.name.toUpperCase()}</SystemCardTitle>
              <div className="flex items-center gap-2">
                <span
                  className="px-2 py-0.5 text-[10px] font-system tracking-wider rounded"
                  style={{
                    background: colorConfig.bg,
                    color: `hsl(${colorConfig.glow})`,
                    border: `1px solid hsl(${colorConfig.glow} / 0.5)`,
                  }}
                >
                  {difficultyLabels[skill.difficulty]}
                </span>
                {isMastered && (
                  <span className="px-2 py-0.5 text-[10px] font-system tracking-wider rounded bg-amber-500/20 text-amber-400 border border-amber-500/50">
                    ★ MASTERED
                  </span>
                )}
              </div>
            </div>
          </div>

          <SystemCardDivider />

          <SystemCardContent className="flex flex-col gap-4 pt-4">
            {/* Level & XP */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-system text-sm text-muted-foreground">LEVEL</span>
                <span 
                  className="font-system text-lg font-bold"
                  style={{ color: `hsl(${colorConfig.glow})` }}
                >
                  {skill.level} / 10
                </span>
              </div>
              
              {!isMastered && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>XP</span>
                    <span>{skill.currentXP} / {skill.requiredXP}</span>
                  </div>
                  <div className="w-full h-2 bg-secondary/50 rounded-full overflow-hidden border border-primary/20">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, hsl(${colorConfig.glow} / 0.6), hsl(${colorConfig.glow}))`,
                        boxShadow: `0 0 10px hsl(${colorConfig.glow} / 0.5)`,
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${xpProgress}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <span className="font-system text-xs text-muted-foreground block mb-1">DESCRIPTION</span>
              <p className="text-sm text-foreground/80">{skill.description}</p>
            </div>

            {/* Tags */}
            {skill.tags.length > 0 && (
              <div>
                <span className="font-system text-xs text-muted-foreground block mb-2">TAGS</span>
                <div className="flex flex-wrap gap-2">
                  {skill.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-system bg-secondary/50 border border-primary/20 rounded text-primary/70"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Linked Quests */}
            {skill.linkedQuests.length > 0 && (
              <div>
                <span className="font-system text-xs text-muted-foreground block mb-2">LINKED QUESTS</span>
                <div className="flex flex-wrap gap-2">
                  {skill.linkedQuests.map(quest => (
                    <span
                      key={quest}
                      className="px-2 py-1 text-xs font-system bg-primary/10 border border-primary/30 rounded text-primary/80"
                    >
                      {quest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </SystemCardContent>

          <SystemCardDivider />

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            {!isMastered && (
              <button
                onClick={() => onAddXP(25)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded bg-primary/20 border border-primary/40 text-primary font-system text-sm hover:bg-primary/30 hover:border-primary/60 transition-all"
              >
                <Zap className="w-4 h-4" />
                +25 XP
              </button>
            )}
            
            <button
              onClick={onEdit}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded bg-secondary/50 border border-primary/30 text-primary/70 font-system text-sm hover:border-primary/50 hover:text-primary transition-all"
            >
              <Edit2 className="w-4 h-4" />
              EDIT
            </button>
            
            {!isRoot && (
              <button
                onClick={onDelete}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded bg-destructive/10 border border-destructive/30 text-destructive font-system text-sm hover:bg-destructive/20 hover:border-destructive/50 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </SystemCard>
      </motion.div>
    </>
  );
};

export default SkillDetailCard;
