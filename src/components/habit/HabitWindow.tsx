import { useState, useEffect } from "react";
import { X } from "lucide-react";
import HabitList from "./HabitList";
import HabitDetail from "./HabitDetail";

export interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: string;
  conditions: string[];
  streak: number;
  completed: boolean;
  linkedQuests?: string[];
}

// Sample habit data
export const sampleHabits: Habit[] = [
  {
    id: "habit-1",
    name: "Drink Water",
    description: "Stay hydrated by drinking at least 8 glasses of water throughout the day.",
    frequency: "Daily",
    conditions: ["8 glasses minimum", "Track each glass"],
    streak: 12,
    completed: false,
  },
  {
    id: "habit-2",
    name: "Read a Chapter",
    description: "Read at least one chapter from your current book to build consistent reading habits.",
    frequency: "Daily",
    conditions: ["Physical or e-book", "Minimum 15 minutes"],
    streak: 7,
    completed: true,
  },
  {
    id: "habit-3",
    name: "Meditation",
    description: "Practice mindfulness meditation to improve focus and reduce stress.",
    frequency: "Daily",
    conditions: ["Minimum 10 minutes", "Quiet environment"],
    streak: 21,
    completed: true,
    linkedQuests: ["Morning Routine"],
  },
  {
    id: "habit-4",
    name: "Journal",
    description: "Write in your journal to reflect on the day and capture thoughts.",
    frequency: "Daily",
    conditions: ["At least 5 minutes", "Before bed"],
    streak: 3,
    completed: false,
  },
];

interface HabitWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

type Level = "list" | "detail";

const HabitWindow = ({ isOpen, onClose }: HabitWindowProps) => {
  const [level, setLevel] = useState<Level>("list");
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [habits, setHabits] = useState<Habit[]>(sampleHabits);

  // Reset state when window closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setLevel("list");
        setSelectedHabit(null);
      }, 300);
    }
  }, [isOpen]);

  const handleHabitSelect = (habit: Habit) => {
    setSelectedHabit(habit);
    setLevel("detail");
  };

  const handleBack = () => {
    if (level === "detail") {
      setLevel("list");
      setSelectedHabit(null);
    } else {
      onClose();
    }
  };

  const handleComplete = (habitId: string) => {
    setHabits(prev =>
      prev.map(h =>
        h.id === habitId ? { ...h, completed: !h.completed, streak: h.completed ? h.streak : h.streak + 1 } : h
      )
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-250 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop - clicking this closes everything */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm cursor-pointer" 
        onClick={onClose}
      />

      {/* Main Window */}
      <div
        className={`relative w-[90%] max-w-2xl max-h-[80vh] glow-border glass-panel rounded-lg overflow-hidden transition-all duration-250 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-secondary/60 border border-primary/30 flex items-center justify-center transition-all duration-300 hover:border-primary/60 hover:shadow-[0_0_15px_hsl(var(--primary)/0.4)]"
        >
          <X className="w-5 h-5 text-primary/70 hover:text-primary" />
        </button>

        {/* Header */}
        <div className="p-6 pb-4 border-b border-primary/20">
          <h1 className="font-system text-foreground text-2xl tracking-[0.2em] uppercase text-center">
            {level === "list" ? "HABITS" : "HABIT DETAIL"}
          </h1>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
          {level === "list" && (
            <HabitList
              habits={habits}
              onHabitSelect={handleHabitSelect}
              onComplete={handleComplete}
            />
          )}

          {level === "detail" && selectedHabit && (
            <HabitDetail
              habit={selectedHabit}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HabitWindow;
