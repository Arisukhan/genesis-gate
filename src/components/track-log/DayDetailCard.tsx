import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Check, XIcon, Zap, Package, GitBranch } from 'lucide-react';
import { format } from 'date-fns';
import { DayRecord, getDayStatus, getStatusColor, getStatusLabel, QuestRecord } from './types';
import { useTrackLogStore } from './useTrackLogStore';

interface DayDetailCardProps {
  date: Date;
  record: DayRecord | undefined;
  onClose: () => void;
}

type CardView = 'main' | 'quests';

export default function DayDetailCard({ date, record, onClose }: DayDetailCardProps) {
  const [view, setView] = useState<CardView>('main');
  const { getQuestsForDay } = useTrackLogStore();
  
  const status = getDayStatus(record);
  const statusColor = getStatusColor(status);
  const quests = getQuestsForDay(date);
  
  const coreQuests = quests.filter(q => q.category === 'core');
  const optionalQuests = quests.filter(q => q.category === 'optional');
  const specialQuests = quests.filter(q => q.category === 'special');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="system-card w-[90vw] max-w-lg max-h-[80vh] overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-primary/20">
        <div className="flex items-center gap-3">
          {view === 'quests' && (
            <button
              onClick={() => setView('main')}
              className="p-1 hover:bg-secondary/50 rounded transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-primary" />
            </button>
          )}
          <div>
            <h2 className="font-system text-lg text-foreground tracking-wider">
              {view === 'main' ? format(date, 'dd MMMM yyyy').toUpperCase() : 'QUEST HUB'}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: statusColor }}
              />
              <span 
                className="font-system text-xs tracking-wider"
                style={{ color: statusColor }}
              >
                {getStatusLabel(status)}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-secondary/50 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence mode="wait">
          {view === 'main' ? (
            <motion.div
              key="main"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {/* Quest Hub Section */}
              <button
                onClick={() => setView('quests')}
                className="w-full system-card system-card-sm p-4 flex items-center justify-between hover:scale-[1.02] transition-transform"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <span className="font-system text-sm text-foreground tracking-wider block">
                      QUEST HUB
                    </span>
                    {record && (
                      <div className="flex gap-4 mt-1">
                        <span className="text-xs text-muted-foreground">
                          Core: <span className={record.quests.core.completed === record.quests.core.total ? 'text-success' : 'text-destructive'}>
                            {record.quests.core.completed}/{record.quests.core.total}
                          </span>
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Optional: <span className={record.quests.optional.completed === record.quests.optional.total ? 'text-success' : 'text-warning'}>
                            {record.quests.optional.completed}/{record.quests.optional.total}
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-primary/60" />
              </button>

              {/* Habit Summary */}
              <div className="system-card system-card-sm p-4">
                <h3 className="font-system text-xs text-muted-foreground tracking-wider mb-3">
                  HABIT SUMMARY
                </h3>
                {record?.habits && record.habits.length > 0 ? (
                  <div className="space-y-2">
                    {record.habits.map(habit => (
                      <div 
                        key={habit.id}
                        className="flex items-center justify-between py-2 border-b border-primary/10 last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded flex items-center justify-center ${
                            habit.done ? 'bg-success/20' : 'bg-destructive/20'
                          }`}>
                            {habit.done 
                              ? <Check className="w-4 h-4 text-success" />
                              : <XIcon className="w-4 h-4 text-destructive" />
                            }
                          </div>
                          <span className="text-sm text-foreground">{habit.name}</span>
                        </div>
                        <span className={`text-xs font-system ${
                          habit.streakImpact > 0 ? 'text-success' : 'text-destructive'
                        }`}>
                          {habit.streakImpact > 0 ? `+${habit.streakImpact} STREAK` : 'BROKEN'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No habit data recorded.</p>
                )}
              </div>

              {/* System Summary */}
              <div className="system-card system-card-sm p-4">
                <h3 className="font-system text-xs text-muted-foreground tracking-wider mb-3">
                  SYSTEM SUMMARY
                </h3>
                <div className="space-y-3">
                  {/* Total XP */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground">Total XP Earned</span>
                    </div>
                    <span className="font-system text-primary">
                      +{record?.totalXP || 0}
                    </span>
                  </div>
                  
                  {/* Inventory Bonus */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-warning" />
                      <span className="text-sm text-foreground">Inventory Bonus</span>
                    </div>
                    <span className={`font-system text-xs ${
                      record?.inventoryBonusApplied ? 'text-success' : 'text-muted-foreground'
                    }`}>
                      {record?.inventoryBonusApplied ? 'APPLIED' : 'NONE'}
                    </span>
                  </div>
                  
                  {/* Linked Skill XP */}
                  {record?.linkedSkillXP && record.linkedSkillXP.length > 0 && (
                    <div className="pt-2 border-t border-primary/10">
                      <div className="flex items-center gap-2 mb-2">
                        <GitBranch className="w-4 h-4 text-accent" />
                        <span className="text-xs text-muted-foreground">SKILL XP GAINED</span>
                      </div>
                      {record.linkedSkillXP.map(skill => (
                        <div key={skill.skillId} className="flex items-center justify-between pl-6">
                          <span className="text-sm text-foreground">{skill.skillName}</span>
                          <span className="font-system text-xs text-accent">+{skill.xp}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="quests"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              {/* Core Quests */}
              <QuestSection title="CORE QUESTS" quests={coreQuests} color="text-destructive" />
              
              {/* Optional Quests */}
              <QuestSection title="OPTIONAL QUESTS" quests={optionalQuests} color="text-warning" />
              
              {/* Special Quests */}
              {specialQuests.length > 0 && (
                <QuestSection title="SPECIAL QUESTS" quests={specialQuests} color="text-primary" />
              )}
              
              {quests.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No quest data for this day.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function QuestSection({ title, quests, color }: { title: string; quests: QuestRecord[]; color: string }) {
  if (quests.length === 0) return null;
  
  return (
    <div className="system-card system-card-sm p-4">
      <h3 className={`font-system text-xs tracking-wider mb-3 ${color}`}>
        {title}
      </h3>
      <div className="space-y-2">
        {quests.map(quest => (
          <div 
            key={quest.id}
            className="flex items-center justify-between py-2 border-b border-primary/10 last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded flex items-center justify-center ${
                quest.completed ? 'bg-success/20' : 'bg-destructive/20'
              }`}>
                {quest.completed 
                  ? <Check className="w-4 h-4 text-success" />
                  : <XIcon className="w-4 h-4 text-destructive" />
                }
              </div>
              <span className="text-sm text-foreground">{quest.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-system ${
                quest.completed ? 'text-success' : 'text-destructive'
              }`}>
                {quest.completed ? 'COMPLETED' : 'MISSED'}
              </span>
              {quest.xpGained > 0 && (
                <span className="text-xs text-primary font-system">+{quest.xpGained} XP</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
