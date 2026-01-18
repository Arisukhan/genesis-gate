import { useState } from "react";
import { Plus } from "lucide-react";
import { LibraryHabit, HabitFrequency } from "./types";
import { ScrollArea } from "@/components/ui/scroll-area";
import HabitMiniCard from "./HabitMiniCard";
import HabitDetailCard from "./HabitDetailCard";
import HabitFormCard from "./HabitFormCard";

const sampleHabits: LibraryHabit[] = [
  {
    id: "1",
    title: "Morning Stretch",
    description: "5-minute stretching routine to wake up the body.",
    howToDo: "Neck rolls, shoulder shrugs, toe touches, arm circles. Hold each stretch for 15 seconds.",
    frequency: "daily",
    status: "active",
    frequencyDetail: "Once per day, morning",
    difficulty: "low",
    linkedSkill: "Fitness",
    icon: "🌅",
  },
  {
    id: "2",
    title: "Read 20 Pages",
    description: "Read at least 20 pages of a non-fiction book.",
    howToDo: "Set a timer. Find a quiet spot. No phone nearby. Take notes on key insights.",
    frequency: "daily",
    status: "active",
    frequencyDetail: "Once per day",
    difficulty: "low",
    linkedSkill: "Learning",
    icon: "📖",
  },
  {
    id: "3",
    title: "Walk 10,000 Steps",
    description: "Hit the daily step goal for cardiovascular health.",
    howToDo: "Use a pedometer or phone. Take stairs. Walk during calls. Evening walk if needed.",
    frequency: "daily",
    status: "active",
    difficulty: "medium",
    linkedSkill: "Fitness",
    icon: "🚶",
  },
  {
    id: "4",
    title: "Weekly Review",
    description: "Reflect on the week and plan ahead.",
    howToDo: "Review completed tasks. Note wins and lessons. Set 3 priorities for next week.",
    frequency: "weekly",
    status: "active",
    frequencyDetail: "Sunday evening",
    difficulty: "medium",
    linkedSkill: "Productivity",
    icon: "📋",
  },
  {
    id: "5",
    title: "No Phone First Hour",
    description: "Avoid screens for the first hour after waking.",
    howToDo: "Charge phone outside bedroom. Use analog alarm. Morning routine before checking messages.",
    frequency: "daily",
    status: "active",
    difficulty: "high",
    linkedSkill: "Mindfulness",
    icon: "📵",
  },
];

type FilterType = "all" | "daily" | "weekly" | "active" | "inactive";
type ViewState = "list" | "detail" | "add" | "edit";

const HabitLibraryContent = () => {
  const [habits, setHabits] = useState<LibraryHabit[]>(sampleHabits);
  const [filter, setFilter] = useState<FilterType>("all");
  const [viewState, setViewState] = useState<ViewState>("list");
  const [selectedHabit, setSelectedHabit] = useState<LibraryHabit | null>(null);

  const filteredHabits = habits.filter((habit) => {
    if (filter === "all") return true;
    if (filter === "active" || filter === "inactive") return habit.status === filter;
    return habit.frequency === filter;
  });

  const filters: { id: FilterType; label: string }[] = [
    { id: "all", label: "ALL" },
    { id: "daily", label: "DAILY" },
    { id: "weekly", label: "WEEKLY" },
    { id: "active", label: "ACTIVE" },
    { id: "inactive", label: "INACTIVE" },
  ];

  const handleHabitSelect = (habit: LibraryHabit) => {
    setSelectedHabit(habit);
    setViewState("detail");
  };

  const handleEdit = () => {
    setViewState("edit");
  };

  const handleDelete = () => {
    if (selectedHabit) {
      setHabits(habits.filter((h) => h.id !== selectedHabit.id));
      setSelectedHabit(null);
      setViewState("list");
    }
  };

  const handleSave = (habitData: Omit<LibraryHabit, "id">) => {
    if (viewState === "edit" && selectedHabit) {
      setHabits(
        habits.map((h) =>
          h.id === selectedHabit.id ? { ...habitData, id: selectedHabit.id } : h
        )
      );
    } else {
      const newHabit: LibraryHabit = {
        ...habitData,
        id: Date.now().toString(),
      };
      setHabits([...habits, newHabit]);
    }
    setViewState("list");
    setSelectedHabit(null);
  };

  const handleCloseDetail = () => {
    setViewState("list");
    setSelectedHabit(null);
  };

  const handleCloseForm = () => {
    if (viewState === "edit") {
      setViewState("detail");
    } else {
      setViewState("list");
      setSelectedHabit(null);
    }
  };

  // Check if habit can be deleted (not active today - simplified check)
  const canDeleteHabit = selectedHabit?.status !== "active";

  return (
    <div className="h-full flex flex-col">
      {/* SUB HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2 flex-wrap">
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
            ADD HABIT
          </span>
        </button>
      </div>

      {/* HABIT LIST - Mini Cards */}
      <ScrollArea className="flex-1">
        <div className="space-y-2 pr-4">
          {filteredHabits.map((habit) => (
            <HabitMiniCard
              key={habit.id}
              habit={habit}
              onClick={() => handleHabitSelect(habit)}
            />
          ))}
          {filteredHabits.length === 0 && (
            <div className="text-center py-12">
              <p className="font-system text-sm text-muted-foreground">
                No habits found
              </p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Detail Card */}
      {selectedHabit && (
        <HabitDetailCard
          habit={selectedHabit}
          isOpen={viewState === "detail"}
          onClose={handleCloseDetail}
          onEdit={handleEdit}
          onDelete={handleDelete}
          canDelete={canDeleteHabit}
        />
      )}

      {/* Add/Edit Form Card */}
      <HabitFormCard
        habit={viewState === "edit" ? selectedHabit : null}
        isOpen={viewState === "add" || viewState === "edit"}
        onClose={handleCloseForm}
        onSave={handleSave}
      />
    </div>
  );
};

export default HabitLibraryContent;
