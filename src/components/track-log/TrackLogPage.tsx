import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home, BookOpen, GitBranch, Activity, Settings, Package, User } from 'lucide-react';
import { format, addMonths, subMonths, addYears, subYears } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import CalendarGrid from './CalendarGrid';
import YearGrid from './YearGrid';
import ProgressGraph from './ProgressGraph';
import DayDetailCard from './DayDetailCard';
import { useTrackLogStore } from './useTrackLogStore';
import { useTheme, themeMetadata } from '@/hooks/useTheme';

interface NavItem {
  icon: React.ElementType;
  label: string;
  id: string;
  path?: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "HOME", id: "home", path: "/" },
  { icon: BookOpen, label: "QUEST LIBRARY", id: "quests", path: "/" },
  { icon: GitBranch, label: "SKILL TREE", id: "skills", path: "/" },
  { icon: Activity, label: "TRACK LOG", id: "tracking", path: "/track-log" },
];

export default function TrackLogPage() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'year'>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  
  const { records, getRecord } = useTrackLogStore();
  const { theme, setTheme, themes } = useTheme();
  
  const codename = localStorage.getItem("userCodename") || "PLAYER";
  const playerLevel = 45;
  const playerXP = 65;

  const handlePrevious = () => {
    if (viewMode === 'month') {
      setCurrentDate(prev => subMonths(prev, 1));
    } else {
      setCurrentDate(prev => subYears(prev, 1));
    }
  };

  const handleNext = () => {
    if (viewMode === 'month') {
      setCurrentDate(prev => addMonths(prev, 1));
    } else {
      setCurrentDate(prev => addYears(prev, 1));
    }
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleMonthClick = (month: Date) => {
    setCurrentDate(month);
    setViewMode('month');
  };

  const handleTitleClick = () => {
    setViewMode(prev => prev === 'month' ? 'year' : 'month');
  };

  const handleNavClick = (id: string) => {
    if (id === 'tracking') return;
    navigate('/');
  };

  return (
    <div className="fixed inset-0 system-background overflow-hidden">
      {/* Blur overlay when detail card is open */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-md"
            onClick={() => setSelectedDate(null)}
          />
        )}
      </AnimatePresence>

      {/* Detail Card */}
      <AnimatePresence>
        {selectedDate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <DayDetailCard
              date={selectedDate}
              record={getRecord(selectedDate)}
              onClose={() => setSelectedDate(null)}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Ambient particle effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/2 rounded-full blur-3xl" />
      </div>

      {/* TOP HUD - PLAYER STATUS */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-4">
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-secondary/50 border-2 border-primary/40 flex items-center justify-center overflow-hidden shadow-glow-md">
            <User className="w-7 h-7 text-primary/60" />
          </div>
        </div>
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

      {/* TOP RIGHT - UTILITY ICONS */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-4">
        <div className="relative">
          <button 
            className="group flex flex-col items-center gap-1"
            onClick={() => setShowThemeSelector(!showThemeSelector)}
          >
            <div className="w-12 h-12 rounded-full bg-secondary/40 border border-primary/30 flex items-center justify-center transition-all duration-normal group-hover:border-primary/60 group-hover:shadow-glow-md group-hover:scale-105">
              <Settings className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
            </div>
          </button>
          
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

        <button className="group flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-full bg-secondary/40 border border-primary/30 flex items-center justify-center transition-all duration-normal group-hover:border-primary/60 group-hover:shadow-glow-md group-hover:scale-105">
            <Package className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
          </div>
        </button>
      </div>

      {/* LEFT NAVIGATION PANEL */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === 'tracking';
          const isHovered = hoveredNav === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
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

      {/* MAIN CONTENT */}
      <div className="absolute inset-0 pl-20 sm:pl-24 pt-20 pb-4 pr-4 flex flex-col">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePrevious}
            className="p-2 hover:bg-secondary/50 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>
          
          <button
            onClick={handleTitleClick}
            className="font-system text-xl sm:text-2xl text-foreground tracking-wider hover:text-primary transition-colors"
          >
            {viewMode === 'month' 
              ? format(currentDate, 'MMMM yyyy').toUpperCase()
              : format(currentDate, 'yyyy')
            }
          </button>
          
          <button
            onClick={handleNext}
            className="p-2 hover:bg-secondary/50 rounded-lg transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </button>
        </div>

        {/* Calendar / Year Grid */}
        <div className="flex-1 min-h-0 mb-4">
          <div className="system-card h-full p-4 flex flex-col">
            <AnimatePresence mode="wait">
              {viewMode === 'month' ? (
                <motion.div
                  key="month"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex-1 flex flex-col"
                >
                  <CalendarGrid
                    currentMonth={currentDate}
                    records={records}
                    onDateClick={handleDateClick}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="year"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1"
                >
                  <YearGrid
                    currentYear={currentDate}
                    onMonthClick={handleMonthClick}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Progress Graph */}
        <ProgressGraph currentDate={currentDate} viewMode={viewMode} />
      </div>

      {/* Codename display */}
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
}
