import { useState, useEffect } from "react";
import { X } from "lucide-react";
import QuestCategorySelection from "./QuestCategorySelection";
import QuestList from "./QuestList";
import QuestDetail from "./QuestDetail";

export type QuestCategory = "core" | "optional" | "special";
export type QuestDifficulty = 1 | 2 | 3 | 4 | 5;

export interface Quest {
  id: string;
  title: string;
  category: QuestCategory;
  difficulty: QuestDifficulty;
  xp: number;
  description: string;
  conditions: string[];
  completed: boolean;
  missed: boolean;
}

// Sample quest data
export const sampleQuests: Quest[] = [
  {
    id: "core-1",
    title: "Morning Workout",
    category: "core",
    difficulty: 3,
    xp: 50,
    description: "Complete a 30-minute workout session to strengthen your body and mind.",
    conditions: ["Must be done before 12:00 PM", "Minimum 30 minutes"],
    completed: false,
    missed: false,
  },
  {
    id: "core-2",
    title: "Deep Work Session",
    category: "core",
    difficulty: 4,
    xp: 80,
    description: "Focus on your most important task without interruption for 2 hours.",
    conditions: ["No phone", "No social media", "2 hour minimum"],
    completed: false,
    missed: false,
  },
  {
    id: "optional-1",
    title: "Read 20 Pages",
    category: "optional",
    difficulty: 2,
    xp: 30,
    description: "Read at least 20 pages from a non-fiction book.",
    conditions: ["Physical or e-book", "No audiobooks"],
    completed: true,
    missed: false,
  },
  {
    id: "optional-2",
    title: "Cold Exposure",
    category: "optional",
    difficulty: 3,
    xp: 40,
    description: "Take a cold shower for at least 2 minutes.",
    conditions: ["Minimum 2 minutes", "Water must be cold"],
    completed: false,
    missed: false,
  },
  {
    id: "special-1",
    title: "Weekly Review",
    category: "special",
    difficulty: 5,
    xp: 150,
    description: "Complete a comprehensive review of your week. Analyze wins, losses, and plan adjustments.",
    conditions: ["Sunday only", "Written format", "Minimum 30 minutes"],
    completed: false,
    missed: false,
  },
];

interface QuestWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

type Level = "category" | "list" | "detail";

const QuestWindow = ({ isOpen, onClose }: QuestWindowProps) => {
  const [level, setLevel] = useState<Level>("category");
  const [selectedCategory, setSelectedCategory] = useState<QuestCategory | null>(null);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [quests, setQuests] = useState<Quest[]>(sampleQuests);

  // Reset state when window closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setLevel("category");
        setSelectedCategory(null);
        setSelectedQuest(null);
      }, 300);
    }
  }, [isOpen]);

  const handleCategorySelect = (category: QuestCategory) => {
    setSelectedCategory(category);
    setLevel("list");
  };

  const handleQuestSelect = (quest: Quest) => {
    setSelectedQuest(quest);
    setLevel("detail");
  };

  const handleBack = () => {
    if (level === "detail") {
      setLevel("list");
      setSelectedQuest(null);
    } else if (level === "list") {
      setLevel("category");
      setSelectedCategory(null);
    } else {
      onClose();
    }
  };

  const handleComplete = (questId: string) => {
    setQuests(prev =>
      prev.map(q =>
        q.id === questId ? { ...q, completed: true } : q
      )
    );
    setSelectedQuest(null);
    setLevel("list");
  };

  // Outside click always exits to Home (Level 0)
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const filteredQuests = selectedCategory
    ? quests.filter(q => q.category === selectedCategory)
    : [];

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleOutsideClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      {/* Main Window */}
      <div
        className={`relative w-[90%] max-w-4xl max-h-[80vh] glow-border glass-panel rounded-lg overflow-hidden transition-all duration-300 ${
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
            {level === "category" && "QUEST HUB"}
            {level === "list" && selectedCategory?.toUpperCase() + " QUESTS"}
            {level === "detail" && "QUEST DETAIL"}
          </h1>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
          {level === "category" && (
            <QuestCategorySelection onSelect={handleCategorySelect} />
          )}

          {level === "list" && selectedCategory && (
            <QuestList
              quests={filteredQuests}
              onQuestSelect={handleQuestSelect}
              onBack={handleBack}
            />
          )}

          {level === "detail" && selectedQuest && (
            <QuestDetail
              quest={selectedQuest}
              onComplete={handleComplete}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestWindow;
