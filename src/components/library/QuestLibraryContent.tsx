import { useState } from "react";
import { Plus } from "lucide-react";
import QuestLibraryList from "../quest-library/QuestLibraryList";
import QuestLibraryDetail from "../quest-library/QuestLibraryDetail";
import QuestLibraryForm from "../quest-library/QuestLibraryForm";
import { LibraryQuest, QuestCategory, QuestDifficulty } from "./types";

const sampleQuests: LibraryQuest[] = [
  {
    id: "1",
    title: "Morning Workout",
    category: "core",
    difficulty: 3,
    xp: 150,
    description: "Complete a full morning workout routine to start your day with energy and focus.",
    rules: ["Must be done before 10 AM", "Minimum 30 minutes", "Include cardio and strength"],
    linkedSkills: ["Fitness", "Discipline"],
  },
  {
    id: "2",
    title: "Read 30 Pages",
    category: "core",
    difficulty: 2,
    xp: 100,
    description: "Read at least 30 pages from your current book to build consistent learning habits.",
    rules: ["Non-fiction or approved fiction", "Take notes on key insights"],
    linkedSkills: ["Knowledge", "Focus"],
  },
  {
    id: "3",
    title: "Deep Work Session",
    category: "core",
    difficulty: 4,
    xp: 200,
    description: "Complete a focused deep work session without distractions.",
    rules: ["Minimum 2 hours", "No phone", "No social media", "Single task focus"],
    linkedSkills: ["Focus", "Productivity"],
  },
  {
    id: "4",
    title: "Cold Shower",
    category: "optional",
    difficulty: 2,
    xp: 75,
    description: "Take a cold shower to build mental resilience.",
    rules: ["Minimum 2 minutes cold", "End on cold"],
    linkedSkills: ["Discipline", "Resilience"],
  },
  {
    id: "5",
    title: "Weekly Review",
    category: "special",
    difficulty: 3,
    xp: 250,
    description: "Complete a comprehensive weekly review of goals and progress.",
    rules: ["Review all completed quests", "Set next week priorities", "Identify blockers"],
    linkedSkills: ["Planning", "Self-awareness"],
  },
  {
    id: "6",
    title: "Social Connection",
    category: "optional",
    difficulty: 1,
    xp: 50,
    description: "Reach out to a friend or family member.",
    rules: ["Meaningful conversation", "No business talk"],
    linkedSkills: ["Social", "Emotional Intelligence"],
  },
];

type FilterType = "all" | "core" | "optional" | "special";
type ViewState = "list" | "detail" | "add" | "edit";

const QuestLibraryContent = () => {
  const [quests, setQuests] = useState<LibraryQuest[]>(sampleQuests);
  const [filter, setFilter] = useState<FilterType>("all");
  const [viewState, setViewState] = useState<ViewState>("list");
  const [selectedQuest, setSelectedQuest] = useState<LibraryQuest | null>(null);

  const filteredQuests = quests.filter((quest) => {
    if (filter === "all") return true;
    return quest.category === filter;
  });

  const handleQuestSelect = (quest: LibraryQuest) => {
    setSelectedQuest(quest);
    setViewState("detail");
  };

  const handleEdit = () => {
    setViewState("edit");
  };

  const handleDelete = () => {
    if (selectedQuest) {
      setQuests(quests.filter((q) => q.id !== selectedQuest.id));
      setSelectedQuest(null);
      setViewState("list");
    }
  };

  const handleSave = (quest: Omit<LibraryQuest, "id">) => {
    if (viewState === "edit" && selectedQuest) {
      setQuests(
        quests.map((q) =>
          q.id === selectedQuest.id ? { ...quest, id: selectedQuest.id } : q
        )
      );
    } else {
      const newQuest: LibraryQuest = {
        ...quest,
        id: Date.now().toString(),
      };
      setQuests([...quests, newQuest]);
    }
    setViewState("list");
    setSelectedQuest(null);
  };

  const handleBack = () => {
    if (viewState === "detail" || viewState === "add") {
      setViewState("list");
      setSelectedQuest(null);
    } else if (viewState === "edit") {
      setViewState("detail");
    }
  };

  const filters: { id: FilterType; label: string }[] = [
    { id: "all", label: "ALL" },
    { id: "core", label: "CORE" },
    { id: "optional", label: "OPTIONAL" },
    { id: "special", label: "SPECIAL" },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* SUB HEADER */}
      <div className="flex items-center justify-between mb-4">
        {viewState === "list" ? (
          <>
            <div className="flex gap-2">
              {filters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`px-3 py-1.5 rounded-full font-system text-[10px] tracking-wider transition-all ${
                    filter === f.id
                      ? "bg-primary/20 border border-primary/60 text-primary shadow-glow-sm"
                      : "bg-secondary/40 border border-primary/20 text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setViewState("add")}
              className="flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/40 rounded-lg transition-all hover:bg-primary/30 hover:border-primary/60 hover:shadow-glow-md"
            >
              <Plus className="w-4 h-4 text-primary" />
              <span className="font-system text-xs text-primary tracking-wider">
                ADD QUEST
              </span>
            </button>
          </>
        ) : (
          <button
            onClick={handleBack}
            className="font-system text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to list
          </button>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-hidden">
        {viewState === "list" && (
          <QuestLibraryList
            quests={filteredQuests}
            onSelect={handleQuestSelect}
          />
        )}

        {viewState === "detail" && selectedQuest && (
          <QuestLibraryDetail
            quest={selectedQuest}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onBack={handleBack}
          />
        )}

        {(viewState === "add" || viewState === "edit") && (
          <QuestLibraryForm
            quest={viewState === "edit" ? selectedQuest : null}
            onSave={handleSave}
            onCancel={handleBack}
          />
        )}
      </div>
    </div>
  );
};

export default QuestLibraryContent;
