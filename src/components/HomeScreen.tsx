import { useState } from "react";
import { Home, BookOpen, GitBranch, Activity, Settings, Package, User } from "lucide-react";
import QuestWindow from "./quest/QuestWindow";
import HabitWindow from "./habit/HabitWindow";
import {
  SystemCard,
  SystemCardTitle,
  SystemCardDivider,
  SystemCardContent,
  SystemCardFooter,
  SystemCardHint,
} from "./ui/system-card";
import { useTheme, themeMetadata, ThemeName } from "@/hooks/useTheme";

interface NavItem {
  icon: React.ElementType;
  label: string;
  id: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "HOME", id: "home" },
  { icon: BookOpen, label: "QUEST LIBRARY", id: "quests" },
  { icon: GitBranch, label: "SKILL TREE", id: "skills" },
  { icon: Activity, label: "TRACK LOG", id: "tracking" },
];

const sampleHabits = [
  { id: 1, name: "Drink Water", completed: true },
  { id: 2, name: "Read a Chapter", completed: true },
  { id: 3, name: "Meditation", completed: true },
];

const HomeScreen = () => {
  const [activeNav, setActiveNav] = useState("home");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [playerLevel] = useState(45);
  const [playerXP] = useState(65);
  const [isQuestWindowOpen, setIsQuestWindowOpen] = useState(false);
  const [isHabitWindowOpen, setIsHabitWindowOpen] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const codename = localStorage.getItem("userCodename") || "PLAYER";
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="fixed inset-0 system-background overflow-hidden">
      {/* Quest Window Overlay */}
      <QuestWindow isOpen={isQuestWindowOpen} onClose={() => setIsQuestWindowOpen(false)} />
      
      {/* Habit Window Overlay */}
      <HabitWindow isOpen={isHabitWindowOpen} onClose={() => setIsHabitWindowOpen(false)} />

      {/* Ambient particle effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/2 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/1 rounded-full blur-3xl" />
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          TOP HUD - PLAYER STATUS (LEFT)
      ═══════════════════════════════════════════════════════════════ */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-4">
        {/* Profile Avatar */}
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-secondary/50 border-2 border-primary/40 flex items-center justify-center overflow-hidden shadow-glow-md">
            <User className="w-7 h-7 text-primary/60" />
          </div>
        </div>

        {/* Level & XP */}
        <div className="flex flex-col gap-1">
          <span className="font-system text-foreground text-lg tracking-wider font-bold">
            LVL {playerLevel}
          </span>
          <div className="flex items-center gap-2">
            <span className="font-system text-primary/60 text-xs tracking-wide">XP</span>
            <div className="w-24 h-2 bg-secondary/50 rounded-full overflow-hidden border border-primary/20">
              <div 
                className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full transition-all duration-slow shadow-glow-sm"
                style={{ width: `${playerXP}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          TOP RIGHT - UTILITY ICONS
      ═══════════════════════════════════════════════════════════════ */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-4">
        {/* Settings with Theme Selector */}
        <div className="relative">
          <button 
            className="group flex flex-col items-center gap-1"
            onClick={() => setShowThemeSelector(!showThemeSelector)}
          >
            <div className="w-12 h-12 rounded-full bg-secondary/40 border border-primary/30 flex items-center justify-center transition-all duration-normal group-hover:border-primary/60 group-hover:shadow-glow-md group-hover:scale-105">
              <Settings className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
            </div>
            <span className="font-system text-[10px] text-primary/60 tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
              SETTINGS
            </span>
          </button>
          
          {/* Theme Selector Dropdown */}
          {showThemeSelector && (
            <div className="absolute top-16 right-0 system-card p-3 min-w-[140px] animate-fade-in z-50">
              <span className="font-system text-[10px] text-muted-foreground tracking-wider block mb-2">
                THEME
              </span>
              <div className="flex flex-col gap-1">
                {themes.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTheme(t);
                      setShowThemeSelector(false);
                    }}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded transition-colors ${
                      theme === t ? "bg-primary/20" : "hover:bg-secondary/50"
                    }`}
                  >
                    <div
                      className="w-3 h-3 rounded-full border border-white/20"
                      style={{ backgroundColor: themeMetadata[t].color }}
                    />
                    <span className="font-system text-xs text-foreground">
                      {themeMetadata[t].label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Inventory */}
        <button className="group flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-full bg-secondary/40 border border-primary/30 flex items-center justify-center transition-all duration-normal group-hover:border-primary/60 group-hover:shadow-glow-md group-hover:scale-105">
            <Package className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
          </div>
          <span className="font-system text-[10px] text-primary/60 tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
            INVENTORY
          </span>
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          LEFT NAVIGATION PANEL
      ═══════════════════════════════════════════════════════════════ */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          const isHovered = hoveredNav === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              onMouseEnter={() => setHoveredNav(item.id)}
              onMouseLeave={() => setHoveredNav(null)}
              className="group flex items-center gap-3"
            >
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-normal border ${
                  isActive
                    ? "bg-primary/20 border-primary/60 shadow-glow-lg"
                    : "bg-secondary/40 border-primary/30 hover:border-primary/50 hover:shadow-glow-sm"
                }`}
              >
                <Icon
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                    isActive ? "text-primary" : "text-primary/60 group-hover:text-primary/80"
                  }`}
                />
              </div>
              <span
                className={`font-system text-xs tracking-wider whitespace-nowrap transition-all duration-normal absolute left-14 sm:left-16 bg-secondary/80 px-2 py-1 rounded ${
                  isHovered
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2 pointer-events-none"
                } ${isActive ? "text-primary" : "text-primary/70"}`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          CENTER MAIN AREA - ACTION ZONE
      ═══════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 flex items-center justify-center pt-20 sm:pt-16 pl-16 sm:pl-20 pr-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 max-w-5xl w-full px-4 sm:px-0">
          {/* DAILY QUESTS CARD */}
          <button className="flex-1 group cursor-pointer" onClick={() => setIsQuestWindowOpen(true)}>
            <SystemCard interactive className="min-h-[200px] sm:h-80 flex flex-col">
              <SystemCardTitle className="group-hover:text-primary transition-colors">
                DAILY QUESTS
              </SystemCardTitle>
              <SystemCardDivider />
              <SystemCardContent className="items-start justify-start gap-3 sm:gap-4 px-2 sm:px-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border border-primary/40 rounded-sm" />
                  <span className="text-muted-foreground/40 text-xs sm:text-sm">Quest placeholder</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border border-primary/30 rounded-sm" />
                  <span className="text-muted-foreground/30 text-xs sm:text-sm">Quest placeholder</span>
                </div>
              </SystemCardContent>
              <SystemCardFooter>
                <SystemCardHint>TAP TO EXPAND</SystemCardHint>
              </SystemCardFooter>
            </SystemCard>
          </button>

          {/* HABITS CARD */}
          <button className="flex-1 group cursor-pointer" onClick={() => setIsHabitWindowOpen(true)}>
            <SystemCard interactive className="min-h-[200px] sm:h-80 flex flex-col">
              <SystemCardTitle className="group-hover:text-primary transition-colors">
                HABITS
              </SystemCardTitle>
              <SystemCardDivider />
              <SystemCardContent className="items-start justify-start gap-3 sm:gap-4 px-2 sm:px-4">
                {sampleHabits.map((habit) => (
                  <div key={habit.id} className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 sm:w-5 sm:h-5 rounded-sm flex items-center justify-center ${
                        habit.completed
                          ? "bg-success/20 border border-success/60"
                          : "border border-primary/40"
                      }`}
                    >
                      {habit.completed && (
                        <svg
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-success"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-xs sm:text-sm ${habit.completed ? "text-foreground/80" : "text-muted-foreground/60"}`}>
                      {habit.name}
                    </span>
                  </div>
                ))}
              </SystemCardContent>
              <SystemCardFooter>
                <SystemCardHint>TAP TO EXPAND</SystemCardHint>
              </SystemCardFooter>
            </SystemCard>
          </button>
        </div>
      </div>

      {/* Codename display (subtle) */}
      <div className="absolute bottom-4 left-4 z-20">
        <span className="font-system text-xs text-primary/30 tracking-widest uppercase">
          {codename}
        </span>
      </div>
      
      {/* Click outside to close theme selector */}
      {showThemeSelector && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowThemeSelector(false)}
        />
      )}
    </div>
  );
};

export default HomeScreen;
