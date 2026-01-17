import { useState } from "react";
import { Plus, Flame, Zap, Clock } from "lucide-react";
import { LibraryHabit } from "./types";
import { ScrollArea } from "@/components/ui/scroll-area";

const sampleHabits: LibraryHabit[] = [
  {
    id: "1",
    title: "Morning Meditation",
    frequency: "daily",
    streak: 45,
    xpPerCompletion: 25,
    description: "Start each day with 10 minutes of mindfulness meditation.",
    linkedSkills: ["Focus", "Mental Clarity"],
  },
  {
    id: "2",
    title: "Hydration Check",
    frequency: "daily",
    streak: 120,
    xpPerCompletion: 10,
    description: "Drink 8 glasses of water throughout the day.",
    linkedSkills: ["Health", "Discipline"],
  },
  {
    id: "3",
    title: "Journal Entry",
    frequency: "daily",
    streak: 30,
    xpPerCompletion: 20,
    description: "Write a reflection on the day's events and learnings.",
    linkedSkills: ["Self-awareness", "Writing"],
  },
  {
    id: "4",
    title: "Weekly Planning",
    frequency: "weekly",
    streak: 12,
    xpPerCompletion: 50,
    description: "Plan the upcoming week's goals and priorities.",
    linkedSkills: ["Planning", "Organization"],
  },
  {
    id: "5",
    title: "Skill Practice",
    frequency: "daily",
    streak: 60,
    xpPerCompletion: 30,
    description: "Dedicate 30 minutes to practicing a chosen skill.",
    linkedSkills: ["Learning", "Mastery"],
  },
];

type FilterType = "all" | "daily" | "weekly";

const HabitLibraryContent = () => {
  const [habits, setHabits] = useState<LibraryHabit[]>(sampleHabits);
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedHabit, setSelectedHabit] = useState<LibraryHabit | null>(null);

  const filteredHabits = habits.filter((habit) => {
    if (filter === "all") return true;
    return habit.frequency === filter;
  });

  const filters: { id: FilterType; label: string }[] = [
    { id: "all", label: "ALL" },
    { id: "daily", label: "DAILY" },
    { id: "weekly", label: "WEEKLY" },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* SUB HEADER */}
      <div className="flex items-center justify-between mb-4">
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
          className="flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/40 rounded-lg transition-all hover:bg-primary/30 hover:border-primary/60 hover:shadow-glow-md"
        >
          <Plus className="w-4 h-4 text-primary" />
          <span className="font-system text-xs text-primary tracking-wider">
            ADD HABIT
          </span>
        </button>
      </div>

      {/* HABIT LIST */}
      <ScrollArea className="flex-1">
        <div className="space-y-3 pr-4">
          {filteredHabits.map((habit) => (
            <div
              key={habit.id}
              onClick={() => setSelectedHabit(habit)}
              className="p-4 bg-secondary/40 border border-primary/20 rounded-lg cursor-pointer transition-all hover:border-primary/40 hover:bg-secondary/60 hover:shadow-glow-sm group"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-system text-sm text-foreground tracking-wide group-hover:text-primary transition-colors">
                    {habit.title}
                  </h3>
                  <p className="font-system text-xs text-muted-foreground mt-1">
                    {habit.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-full">
                  <Clock className="w-3 h-3 text-primary/70" />
                  <span className="font-system text-[10px] text-primary/70 uppercase">
                    {habit.frequency}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span className="font-system text-xs text-orange-400">
                    {habit.streak} day streak
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-primary/70" />
                  <span className="font-system text-xs text-muted-foreground">
                    +{habit.xpPerCompletion} XP
                  </span>
                </div>
              </div>

              {habit.linkedSkills && habit.linkedSkills.length > 0 && (
                <div className="flex gap-2 mt-3">
                  {habit.linkedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 bg-primary/10 border border-primary/20 rounded-full font-system text-[10px] text-primary/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default HabitLibraryContent;
