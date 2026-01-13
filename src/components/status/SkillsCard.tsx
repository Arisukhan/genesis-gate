import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ChevronRight, ArrowLeft } from 'lucide-react';
import {
  SystemCard,
  SystemCardTitle,
  SystemCardDivider,
  SystemCardContent,
} from '@/components/ui/system-card';
import { SkillPreview } from './types';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SkillsCardProps {
  isOpen: boolean;
  onClose: () => void;
  inProgress: SkillPreview[];
  mastered: SkillPreview[];
}

export default function SkillsCard({ isOpen, onClose, inProgress, mastered }: SkillsCardProps) {
  const [showMastered, setShowMastered] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<SkillPreview | null>(null);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/60" onClick={onClose} />

      {/* Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative z-10 w-full max-w-md"
      >
        <SystemCard className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            {selectedSkill ? (
              <button
                onClick={() => setSelectedSkill(null)}
                className="flex items-center gap-2 text-primary/70 hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-system text-xs tracking-wider">BACK</span>
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-secondary/50 transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <SystemCardTitle>
            {selectedSkill ? selectedSkill.name : 'SKILLS'}
          </SystemCardTitle>
          <SystemCardDivider />

          <SystemCardContent>
            <AnimatePresence mode="wait">
              {selectedSkill ? (
                <motion.div
                  key="skill-detail"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="text-center py-4">
                    <div className={`text-4xl mb-3 ${selectedSkill.isMastered ? 'text-warning' : ''}`}>
                      {selectedSkill.isMastered ? '🏆' : '📚'}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {selectedSkill.isMastered ? 'Mastered' : 'In Progress'}
                    </p>
                    
                    {!selectedSkill.isMastered && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Progress</span>
                          <span className="text-primary">{selectedSkill.progress}%</span>
                        </div>
                        <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${selectedSkill.progress}%` }}
                            transition={{ duration: 0.5 }}
                            className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="skill-list"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <ScrollArea className="h-[300px] pr-2">
                    {/* In Progress Section */}
                    <div className="mb-4">
                      <span className="font-system text-[10px] text-muted-foreground tracking-wider block mb-2">
                        IN PROGRESS ({inProgress.length})
                      </span>
                      <div className="space-y-2">
                        {inProgress.map(skill => (
                          <button
                            key={skill.id}
                            onClick={() => setSelectedSkill(skill)}
                            className="w-full flex items-center justify-between p-2 rounded hover:bg-secondary/30 transition-colors"
                          >
                            <span className="text-sm text-foreground/90">{skill.name}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 bg-secondary/50 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary/60 rounded-full"
                                  style={{ width: `${skill.progress}%` }}
                                />
                              </div>
                              <span className="text-[10px] text-primary/70 w-8">
                                {skill.progress}%
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Mastered Section */}
                    {mastered.length > 0 && (
                      <div>
                        <button
                          onClick={() => setShowMastered(!showMastered)}
                          className="flex items-center gap-2 mb-2"
                        >
                          {showMastered ? (
                            <ChevronDown className="w-3 h-3 text-warning/60" />
                          ) : (
                            <ChevronRight className="w-3 h-3 text-warning/60" />
                          )}
                          <span className="font-system text-[10px] text-warning/70 tracking-wider">
                            MASTERED ({mastered.length})
                          </span>
                        </button>
                        
                        <AnimatePresence>
                          {showMastered && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden space-y-2"
                            >
                              {mastered.map(skill => (
                                <button
                                  key={skill.id}
                                  onClick={() => setSelectedSkill(skill)}
                                  className="w-full flex items-center justify-between p-2 rounded hover:bg-warning/10 transition-colors border border-warning/20"
                                >
                                  <span className="text-sm text-warning/90">{skill.name}</span>
                                  <span className="text-warning">🏆</span>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </ScrollArea>
                </motion.div>
              )}
            </AnimatePresence>
          </SystemCardContent>
        </SystemCard>
      </motion.div>
    </motion.div>
  );
}
