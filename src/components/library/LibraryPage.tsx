import { useState } from "react";
import { ArrowLeft, Scroll, Repeat, Trophy } from "lucide-react";
import QuestLibraryContent from "./QuestLibraryContent";
import HabitLibraryContent from "./HabitLibraryContent";
import MasteredQuestContent from "./MasteredQuestContent";

type LibraryTab = "quests" | "habits" | "mastered";

interface LibraryPageProps {
  onBack: () => void;
}

const LibraryPage = ({ onBack }: LibraryPageProps) => {
  const [activeTab, setActiveTab] = useState<LibraryTab>("quests");

  const tabs: { id: LibraryTab; label: string; icon: React.ReactNode }[] = [
    { id: "quests", label: "QUESTS", icon: <Scroll className="w-4 h-4" /> },
    { id: "habits", label: "HABITS", icon: <Repeat className="w-4 h-4" /> },
    { id: "mastered", label: "MASTERED", icon: <Trophy className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 system-background overflow-hidden">
      {/* Ambient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/2 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col p-6 max-w-6xl mx-auto">
        {/* TOP BAR */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-secondary/40 border border-primary/30 flex items-center justify-center transition-all hover:border-primary/60 hover:shadow-glow-md"
          >
            <ArrowLeft className="w-5 h-5 text-primary/70" />
          </button>
          <div>
            <h1 className="font-system text-xl text-foreground tracking-wider font-bold">
              LIBRARY
            </h1>
            <p className="font-system text-xs text-muted-foreground tracking-wide">
              KNOWLEDGE ARCHIVE SYSTEM
            </p>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-system text-xs tracking-wider transition-all ${
                activeTab === tab.id
                  ? "bg-primary/20 border border-primary/60 text-primary shadow-glow-sm"
                  : "bg-secondary/40 border border-primary/20 text-muted-foreground hover:border-primary/40"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-hidden">
          {activeTab === "quests" && <QuestLibraryContent />}
          {activeTab === "habits" && <HabitLibraryContent />}
          {activeTab === "mastered" && <MasteredQuestContent />}
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;
