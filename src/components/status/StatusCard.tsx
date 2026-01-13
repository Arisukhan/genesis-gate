import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import {
  SystemCard,
  SystemCardTitle,
  SystemCardDivider,
  SystemCardContent,
} from '@/components/ui/system-card';
import { useStatusStore } from './useStatusStore';
import StatRow from './StatRow';
import SkillsSection from './SkillsSection';
import SkillsCard from './SkillsCard';
import { ScrollArea } from '@/components/ui/scroll-area';

interface StatusCardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StatusCard({ isOpen, onClose }: StatusCardProps) {
  const { status, updateName } = useStatusStore();
  const [expandedStat, setExpandedStat] = useState<string | null>(null);
  const [showSkillsCard, setShowSkillsCard] = useState(false);

  // Sync with codename
  useEffect(() => {
    const codename = localStorage.getItem('userCodename');
    if (codename && codename !== status.identity.name) {
      updateName(codename);
    }
  }, [isOpen]);

  const xpPercentage = (status.level.currentXP / status.level.requiredXP) * 100;
  const glowIntensity = Math.min(0.3 + (xpPercentage / 100) * 0.4, 0.7);

  if (!isOpen) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop with blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-background/70 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Status Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-sm"
        >
        <SystemCard className="p-5 max-h-[90vh] flex flex-col overflow-hidden">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 rounded hover:bg-secondary/50 transition-colors z-10"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>

            {/* Header - Fixed */}
            <SystemCardTitle className="mb-4 flex-shrink-0">STATUS</SystemCardTitle>
            <SystemCardDivider className="my-0 mb-4 flex-shrink-0" />

            {/* Scrollable Content */}
            <ScrollArea className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 120px)' }}>
              <SystemCardContent className="gap-4 pb-4">
                {/* Identity + Level Section */}
                <div className="flex items-start justify-between w-full">
                  {/* Left: Identity */}
                  <div className="flex flex-col gap-0.5">
                    <span className="font-system text-lg text-foreground tracking-wider">
                      {status.identity.name}
                    </span>
                    <span className="font-system text-xs text-muted-foreground">
                      {status.identity.job}
                    </span>
                    <span className="font-system text-[10px] text-primary/50 italic">
                      "{status.identity.title}"
                    </span>
                  </div>

                  {/* Right: Level */}
                  <div className="flex flex-col items-end">
                    <span className="font-system text-[10px] text-muted-foreground tracking-wider">
                      LEVEL
                    </span>
                    <span className="font-system text-4xl text-foreground font-bold leading-none">
                      {status.level.current}
                    </span>
                  </div>
                </div>

                {/* XP Bar */}
                <div className="w-full mt-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-system text-[10px] text-muted-foreground tracking-wider">
                      EXPERIENCE
                    </span>
                    <span className="font-system text-[10px] text-primary/70">
                      XP: {status.level.currentXP.toLocaleString()} / {status.level.requiredXP.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2.5 bg-secondary/50 rounded-full overflow-hidden border border-primary/20">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${xpPercentage}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full"
                      style={{
                        boxShadow: `0 0 ${8 + xpPercentage / 5}px hsl(var(--primary) / ${glowIntensity})`,
                      }}
                    />
                  </div>
                </div>

                <SystemCardDivider className="my-3" />

                {/* Stats Section */}
                <div className="w-full">
                  <span className="font-system text-[10px] text-muted-foreground tracking-wider block mb-2 px-3">
                    STATS
                  </span>
                  <div className="space-y-0.5">
                    {status.stats.map(stat => (
                      <StatRow
                        key={stat.id}
                        stat={stat}
                        isExpanded={expandedStat === stat.id}
                        onToggle={() =>
                          setExpandedStat(expandedStat === stat.id ? null : stat.id)
                        }
                      />
                    ))}
                  </div>
                </div>

                <SystemCardDivider className="my-3" />

                {/* Skills Preview */}
                <SkillsSection
                  inProgress={status.skills.inProgress}
                  mastered={status.skills.mastered}
                  onExpand={() => setShowSkillsCard(true)}
                />
              </SystemCardContent>
            </ScrollArea>
          </SystemCard>
        </motion.div>
      </motion.div>

      {/* Skills Card Overlay */}
      <AnimatePresence>
        {showSkillsCard && (
          <SkillsCard
            isOpen={showSkillsCard}
            onClose={() => setShowSkillsCard(false)}
            inProgress={status.skills.inProgress}
            mastered={status.skills.mastered}
          />
        )}
      </AnimatePresence>
    </>
  );
}
