import { useState } from "react";
import { Trophy, Star, Calendar, Zap } from "lucide-react";
import { MasteredQuest } from "./types";
import { ScrollArea } from "@/components/ui/scroll-area";

const sampleMasteredQuests: MasteredQuest[] = [
  {
    id: "1",
    title: "100 Day Fitness Challenge",
    completedDate: "2024-01-15",
    totalXpEarned: 5000,
    timesCompleted: 100,
    difficulty: 4,
    description: "Completed 100 consecutive days of morning workouts.",
  },
  {
    id: "2",
    title: "Reading Marathon",
    completedDate: "2024-02-01",
    totalXpEarned: 3000,
    timesCompleted: 30,
    difficulty: 3,
    description: "Read 30 books in a single month.",
  },
  {
    id: "3",
    title: "Deep Work Master",
    completedDate: "2024-01-20",
    totalXpEarned: 8000,
    timesCompleted: 50,
    difficulty: 5,
    description: "Completed 50 deep work sessions of 4+ hours each.",
  },
  {
    id: "4",
    title: "Early Riser",
    completedDate: "2023-12-01",
    totalXpEarned: 2500,
    timesCompleted: 90,
    difficulty: 2,
    description: "Woke up before 6 AM for 90 consecutive days.",
  },
  {
    id: "5",
    title: "Social Butterfly",
    completedDate: "2024-01-10",
    totalXpEarned: 1500,
    timesCompleted: 30,
    difficulty: 2,
    description: "Made meaningful connections with 30 new people.",
  },
];

const MasteredQuestContent = () => {
  const [masteredQuests] = useState<MasteredQuest[]>(sampleMasteredQuests);

  const totalXp = masteredQuests.reduce((acc, q) => acc + q.totalXpEarned, 0);
  const totalCompleted = masteredQuests.length;

  return (
    <div className="h-full flex flex-col">
      {/* STATS HEADER */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 p-4 bg-secondary/40 border border-primary/20 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="font-system text-[10px] text-muted-foreground tracking-wider">
              MASTERED QUESTS
            </span>
          </div>
          <p className="font-system text-2xl text-foreground">{totalCompleted}</p>
        </div>
        <div className="flex-1 p-4 bg-secondary/40 border border-primary/20 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-primary" />
            <span className="font-system text-[10px] text-muted-foreground tracking-wider">
              TOTAL XP EARNED
            </span>
          </div>
          <p className="font-system text-2xl text-primary">{totalXp.toLocaleString()}</p>
        </div>
      </div>

      {/* MASTERED LIST */}
      <ScrollArea className="flex-1">
        <div className="space-y-3 pr-4">
          {masteredQuests.map((quest) => (
            <div
              key={quest.id}
              className="p-4 bg-secondary/40 border border-yellow-500/20 rounded-lg transition-all hover:border-yellow-500/40 hover:shadow-[0_0_20px_rgba(234,179,8,0.1)] group"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-system text-sm text-foreground tracking-wide group-hover:text-yellow-400 transition-colors">
                      {quest.title}
                    </h3>
                    <p className="font-system text-xs text-muted-foreground mt-0.5">
                      {quest.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: quest.difficulty }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  ))}
                  {Array.from({ length: 5 - quest.difficulty }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400/30" />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 mt-3 pl-13">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="font-system text-[10px] text-muted-foreground">
                    Mastered {new Date(quest.completedDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-primary/70" />
                  <span className="font-system text-[10px] text-muted-foreground">
                    +{quest.totalXpEarned.toLocaleString()} XP total
                  </span>
                </div>
                <div className="font-system text-[10px] text-muted-foreground">
                  ×{quest.timesCompleted} completions
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MasteredQuestContent;
