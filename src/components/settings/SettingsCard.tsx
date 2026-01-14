import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus } from "lucide-react";
import {
  SystemCard,
  SystemCardTitle,
  SystemCardDivider,
} from "@/components/ui/system-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSettingsStore } from "./useSettingsStore";
import { SettingsSection } from "./SettingsSection";
import { SettingsRow } from "./SettingsRow";
import { SettingsToggle } from "./SettingsToggle";
import { DifficultyMode, CardDesign } from "./types";

/* ═══════════════════════════════════════════════════════════════════════════
   SETTINGS CARD - Complete settings interface as floating system card
   Settings define operating parameters. They do not rewrite laws, erase 
   history, or provide emotional comfort.
═══════════════════════════════════════════════════════════════════════════ */

interface SettingsCardProps {
  isOpen: boolean;
  onClose: () => void;
}

const difficultyOptions: { value: DifficultyMode; label: string }[] = [
  { value: 'standard', label: 'Standard' },
  { value: 'strict', label: 'Strict' },
  { value: 'custom', label: 'Custom' },
];

const cardDesignOptions: { value: CardDesign; label: string; description: string }[] = [
  { value: 'designA', label: 'Design A', description: 'Classic angular corners' },
  { value: 'designB', label: 'Design B', description: 'Rounded edges style' },
  { value: 'designC', label: 'Design C', description: 'Minimal clean borders' },
];

const SettingsCard = ({ isOpen, onClose }: SettingsCardProps) => {
  const {
    settings,
    toggleSystemStatus,
    setDifficultyMode,
    setCoreQuestsPerDay,
    setOptionalQuestsPerDay,
    togglePenaltyForDailyQuests,
    togglePenaltyForCalorieCount,
    toggleAIQuestSuggestions,
    toggleAIPenaltyQuestSuggestions,
    toggleHighPerformanceMode,
    setColorTheme,
    setCardDesign,
  } = useSettingsStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <SystemCard className="w-full max-w-sm p-5 max-h-[90vh] flex flex-col overflow-hidden">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-1 text-muted-foreground/60 hover:text-primary transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <SystemCardTitle className="mb-4 flex-shrink-0">SETTINGS</SystemCardTitle>
              <SystemCardDivider className="my-0 mb-2 flex-shrink-0" />

              {/* Scrollable Content */}
              <ScrollArea className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 100px)' }}>
                <div className="pr-2 space-y-0">
                  
                  {/* SECTION 1: System Status & Difficulty */}
                  <SettingsSection title="System Status & Difficulty" defaultExpanded>
                    <SettingsRow 
                      label="System Status"
                      description={settings.systemStatus 
                        ? "Quest generation, tracking, XP active" 
                        : "All systems paused (nothing rewinds)"
                      }
                    >
                      <SettingsToggle
                        checked={settings.systemStatus}
                        onCheckedChange={toggleSystemStatus}
                      />
                    </SettingsRow>

                    <SettingsRow label="Difficulty Mode" description="Affects future behavior only">
                      <div className="flex gap-1">
                        {difficultyOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setDifficultyMode(option.value)}
                            className={`
                              px-2 py-1 rounded text-[9px] font-system tracking-wider transition-all
                              ${settings.difficultyMode === option.value
                                ? 'bg-primary/30 border border-primary/60 text-primary'
                                : 'bg-secondary/30 border border-primary/20 text-muted-foreground hover:border-primary/40'
                              }
                            `}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </SettingsRow>
                  </SettingsSection>

                  {/* SECTION 2: Quest Generation Controls */}
                  <SettingsSection title="Quest Generation">
                    <SettingsRow label="Core Quests per Day" description="Minimum enforced by system">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setCoreQuestsPerDay(settings.coreQuestsPerDay - 1)}
                          disabled={settings.coreQuestsPerDay <= 1}
                          className="w-6 h-6 rounded bg-secondary/40 border border-primary/20 flex items-center justify-center hover:border-primary/50 disabled:opacity-40 transition-all"
                        >
                          <Minus className="w-3 h-3 text-primary/70" />
                        </button>
                        <span className="font-system text-sm text-foreground w-6 text-center">
                          {settings.coreQuestsPerDay}
                        </span>
                        <button
                          onClick={() => setCoreQuestsPerDay(settings.coreQuestsPerDay + 1)}
                          disabled={settings.coreQuestsPerDay >= 10}
                          className="w-6 h-6 rounded bg-secondary/40 border border-primary/20 flex items-center justify-center hover:border-primary/50 disabled:opacity-40 transition-all"
                        >
                          <Plus className="w-3 h-3 text-primary/70" />
                        </button>
                      </div>
                    </SettingsRow>

                    <SettingsRow label="Optional Quests per Day" description="Can be zero">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setOptionalQuestsPerDay(settings.optionalQuestsPerDay - 1)}
                          disabled={settings.optionalQuestsPerDay <= 0}
                          className="w-6 h-6 rounded bg-secondary/40 border border-primary/20 flex items-center justify-center hover:border-primary/50 disabled:opacity-40 transition-all"
                        >
                          <Minus className="w-3 h-3 text-primary/70" />
                        </button>
                        <span className="font-system text-sm text-foreground w-6 text-center">
                          {settings.optionalQuestsPerDay}
                        </span>
                        <button
                          onClick={() => setOptionalQuestsPerDay(settings.optionalQuestsPerDay + 1)}
                          disabled={settings.optionalQuestsPerDay >= 10}
                          className="w-6 h-6 rounded bg-secondary/40 border border-primary/20 flex items-center justify-center hover:border-primary/50 disabled:opacity-40 transition-all"
                        >
                          <Plus className="w-3 h-3 text-primary/70" />
                        </button>
                      </div>
                    </SettingsRow>

                    <div className="px-1 py-2 bg-secondary/20 rounded border border-primary/10">
                      <span className="font-system text-[9px] text-muted-foreground/70 tracking-wide">
                        Special Quests appear via AI suggestions or system triggers (repeated misses, pattern stagnation, streak collapse). They cannot be manually created.
                      </span>
                    </div>
                  </SettingsSection>

                  {/* SECTION 3: Penalty Rule Toggles */}
                  <SettingsSection title="Penalty Rules">
                    <SettingsRow 
                      label="Penalty for Daily Quests"
                      description={settings.penaltyForDailyQuests 
                        ? "Missed quests trigger penalty logic" 
                        : "Missed quests give zero XP only"
                      }
                    >
                      <SettingsToggle
                        checked={settings.penaltyForDailyQuests}
                        onCheckedChange={togglePenaltyForDailyQuests}
                      />
                    </SettingsRow>

                    <SettingsRow 
                      label="Penalty for Calorie Count"
                      description={!settings.calorieTrackingEnabled 
                        ? "Calorie tracking disabled" 
                        : settings.penaltyForCalorieCount 
                          ? "Exceeding limits triggers penalty" 
                          : "No penalty for calorie excess"
                      }
                    >
                      <SettingsToggle
                        checked={settings.penaltyForCalorieCount}
                        onCheckedChange={togglePenaltyForCalorieCount}
                        disabled={!settings.calorieTrackingEnabled}
                      />
                    </SettingsRow>

                    <div className="px-1 py-2 bg-secondary/20 rounded border border-primary/10">
                      <span className="font-system text-[9px] text-muted-foreground/70 tracking-wide">
                        Penalties affect future state only. Past logs remain untouched.
                      </span>
                    </div>
                  </SettingsSection>

                  {/* SECTION 4: AI Suggestions */}
                  <SettingsSection title="AI Suggestions">
                    <SettingsRow 
                      label="AI Quest Suggestions"
                      description="AI can analyze patterns and suggest quests"
                    >
                      <SettingsToggle
                        checked={settings.aiQuestSuggestions}
                        onCheckedChange={toggleAIQuestSuggestions}
                      />
                    </SettingsRow>

                    <SettingsRow 
                      label="AI Penalty Quest Suggestions"
                      description="AI can suggest penalty quests for recovery"
                    >
                      <SettingsToggle
                        checked={settings.aiPenaltyQuestSuggestions}
                        onCheckedChange={toggleAIPenaltyQuestSuggestions}
                      />
                    </SettingsRow>

                    <div className="px-1 py-2 bg-secondary/20 rounded border border-primary/10">
                      <span className="font-system text-[9px] text-muted-foreground/70 tracking-wide">
                        AI is an advisor. System enforces. User acts. AI cannot change rules, auto-add quests, remove penalties, or complete tasks.
                      </span>
                    </div>
                  </SettingsSection>

                  {/* SECTION 5: Performance Mode */}
                  <SettingsSection title="Performance Mode">
                    <SettingsRow 
                      label="High Performance (Anime Mode)"
                      description={settings.highPerformanceMode 
                        ? "Full effects, animated backgrounds, higher GPU" 
                        : "Reduced particles, static backgrounds"
                      }
                    >
                      <SettingsToggle
                        checked={settings.highPerformanceMode}
                        onCheckedChange={toggleHighPerformanceMode}
                      />
                    </SettingsRow>

                    <div className="px-1 py-2 bg-secondary/20 rounded border border-primary/10">
                      <span className="font-system text-[9px] text-muted-foreground/70 tracking-wide">
                        May require soft reload for changes to take full effect.
                      </span>
                    </div>
                  </SettingsSection>

                  {/* SECTION 6: System Color Theme */}
                  <SettingsSection title="System Color Theme">
                    <SettingsRow label="Color Theme" description="Applies globally to all UI elements">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setColorTheme('blue')}
                          className={`
                            w-8 h-8 rounded-full flex items-center justify-center transition-all
                            ${settings.colorTheme === 'blue'
                              ? 'ring-2 ring-offset-2 ring-offset-background ring-[hsl(195,100%,50%)]'
                              : 'hover:scale-110'
                            }
                          `}
                        >
                          <div 
                            className="w-5 h-5 rounded-full border border-white/20"
                            style={{ backgroundColor: 'hsl(195, 100%, 50%)' }}
                          />
                        </button>
                        <button
                          onClick={() => setColorTheme('violet')}
                          className={`
                            w-8 h-8 rounded-full flex items-center justify-center transition-all
                            ${settings.colorTheme === 'violet'
                              ? 'ring-2 ring-offset-2 ring-offset-background ring-[hsl(270,70%,60%)]'
                              : 'hover:scale-110'
                            }
                          `}
                        >
                          <div 
                            className="w-5 h-5 rounded-full border border-white/20"
                            style={{ backgroundColor: 'hsl(270, 70%, 60%)' }}
                          />
                        </button>
                      </div>
                    </SettingsRow>

                    <div className="px-1 py-2 bg-secondary/20 rounded border border-primary/10">
                      <span className="font-system text-[9px] text-muted-foreground/70 tracking-wide">
                        Theme affects glows, borders, XP bars, and highlights. No dark/light mode. No custom colors.
                      </span>
                    </div>
                  </SettingsSection>

                  {/* SECTION 7: System Card Design */}
                  <SettingsSection title="System Card Design">
                    <SettingsRow label="Card Style" description="Applies globally to all system cards">
                      <div className="w-full" />
                    </SettingsRow>
                    
                    {/* Mini Live Previews Grid */}
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      {cardDesignOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setCardDesign(option.value)}
                          className={`
                            relative flex flex-col items-center p-2 rounded transition-all
                            ${settings.cardDesign === option.value
                              ? 'ring-2 ring-primary bg-primary/10'
                              : 'bg-secondary/30 hover:bg-secondary/50 border border-primary/20'
                            }
                          `}
                        >
                          {/* Mini Card Preview */}
                          <div 
                            className={`
                              w-full aspect-[3/4] mb-1.5 relative overflow-hidden
                              ${option.value === 'designA' 
                                ? 'bg-card/80 border border-primary/40 shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)]' 
                                : option.value === 'designB'
                                  ? 'bg-card/80 border border-primary/30 rounded-lg shadow-md'
                                  : 'bg-card/80 border border-primary/20'
                              }
                            `}
                            style={{
                              clipPath: option.value === 'designA' 
                                ? 'polygon(0 8px, 8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)'
                                : option.value === 'designB'
                                  ? 'none'
                                  : 'none',
                              borderRadius: option.value === 'designB' ? '8px' : option.value === 'designC' ? '2px' : '0'
                            }}
                          >
                            {/* Mini content lines */}
                            <div className="absolute inset-2 flex flex-col gap-1">
                              <div className="h-1 w-2/3 mx-auto bg-primary/40 rounded-full" />
                              <div className="h-px w-full bg-primary/20 mt-1" />
                              <div className="flex-1 flex flex-col gap-0.5 mt-1">
                                <div className="h-0.5 w-3/4 bg-muted-foreground/30 rounded-full" />
                                <div className="h-0.5 w-1/2 bg-muted-foreground/20 rounded-full" />
                                <div className="h-0.5 w-2/3 bg-muted-foreground/30 rounded-full" />
                              </div>
                            </div>
                            
                            {/* Glow effect for Design A */}
                            {option.value === 'designA' && (
                              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
                            )}
                          </div>
                          
                          {/* Label */}
                          <span className="font-system text-[8px] text-foreground/80 tracking-wider">
                            {option.label}
                          </span>
                          
                          {/* Selected indicator */}
                          {settings.cardDesign === option.value && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                              <div className="w-1.5 h-1.5 bg-background rounded-full" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="px-1 py-2 mt-2 bg-secondary/20 rounded border border-primary/10">
                      <span className="font-system text-[9px] text-muted-foreground/70 tracking-wide">
                        Selection is saved as a system-level visual parameter. All cards re-render instantly. No per-screen overrides.
                      </span>
                    </div>
                  </SettingsSection>

                </div>
              </ScrollArea>
            </SystemCard>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsCard;
