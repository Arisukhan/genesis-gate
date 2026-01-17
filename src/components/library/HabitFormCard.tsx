import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { LibraryHabit, HabitFrequency, HabitStatus, HabitDifficulty } from "./types";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

interface HabitFormCardProps {
  habit?: LibraryHabit | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (habit: Omit<LibraryHabit, "id">) => void;
}

const HABIT_ICONS = ["🎯", "🧘", "💧", "📖", "✍️", "🏃", "💪", "⏰", "🌅", "🌙", "🧠", "💡"];

const HabitFormCard = ({ habit, isOpen, onClose, onSave }: HabitFormCardProps) => {
  const isEditing = !!habit;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [howToDo, setHowToDo] = useState("");
  const [frequency, setFrequency] = useState<HabitFrequency>("daily");
  const [status, setStatus] = useState<HabitStatus>("active");
  const [frequencyDetail, setFrequencyDetail] = useState("");
  const [difficulty, setDifficulty] = useState<HabitDifficulty | "">("");
  const [linkedSkill, setLinkedSkill] = useState("");
  const [linkedInventory, setLinkedInventory] = useState("");
  const [icon, setIcon] = useState("🎯");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (habit) {
      setTitle(habit.title);
      setDescription(habit.description);
      setHowToDo(habit.howToDo);
      setFrequency(habit.frequency);
      setStatus(habit.status);
      setFrequencyDetail(habit.frequencyDetail || "");
      setDifficulty(habit.difficulty || "");
      setLinkedSkill(habit.linkedSkill || "");
      setLinkedInventory(habit.linkedInventory || "");
      setIcon(habit.icon || "🎯");
      setNotes(habit.notes || "");
    } else {
      // Reset form
      setTitle("");
      setDescription("");
      setHowToDo("");
      setFrequency("daily");
      setStatus("active");
      setFrequencyDetail("");
      setDifficulty("");
      setLinkedSkill("");
      setLinkedInventory("");
      setIcon("🎯");
      setNotes("");
    }
  }, [habit, isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSave = () => {
    if (!title.trim() || !description.trim() || !howToDo.trim()) return;

    onSave({
      title: title.trim(),
      description: description.trim(),
      howToDo: howToDo.trim(),
      frequency,
      status,
      frequencyDetail: frequencyDetail.trim() || undefined,
      difficulty: difficulty || undefined,
      linkedSkill: linkedSkill.trim() || undefined,
      linkedInventory: linkedInventory.trim() || undefined,
      icon,
      notes: notes.trim() || undefined,
    });
  };

  const isValid = title.trim() && description.trim() && howToDo.trim();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg bg-secondary/90 border border-primary/30 rounded-lg shadow-glow-lg overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-primary/20">
              <div className="flex items-center justify-between">
                <h2 className="font-system text-lg text-foreground tracking-wide font-bold">
                  {isEditing ? "EDIT HABIT" : "ADD HABIT"}
                </h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-secondary/60 border border-primary/20 flex items-center justify-center hover:border-primary/40 transition-all"
                >
                  <X className="w-4 h-4 text-primary/60" />
                </button>
              </div>
            </div>

            {/* Form Content */}
            <ScrollArea className="max-h-[60vh]">
              <div className="p-6 space-y-5">
                {/* Icon Selection */}
                <div>
                  <label className="font-system text-[10px] text-muted-foreground tracking-wider uppercase mb-2 block">
                    Icon
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {HABIT_ICONS.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setIcon(emoji)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-all ${
                          icon === emoji
                            ? "bg-primary/20 border-2 border-primary/60"
                            : "bg-secondary/60 border border-primary/20 hover:border-primary/40"
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title - Required */}
                <div>
                  <label className="font-system text-[10px] text-muted-foreground tracking-wider uppercase mb-2 block">
                    Habit Title <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter habit title..."
                    className="w-full px-4 py-3 bg-secondary/60 border border-primary/20 rounded-lg font-system text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>

                {/* Description - Required */}
                <div>
                  <label className="font-system text-[10px] text-muted-foreground tracking-wider uppercase mb-2 block">
                    Description <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What is this habit about..."
                    rows={2}
                    className="w-full px-4 py-3 bg-secondary/60 border border-primary/20 rounded-lg font-system text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-all resize-none"
                  />
                </div>

                {/* How to Do - Required */}
                <div>
                  <label className="font-system text-[10px] text-muted-foreground tracking-wider uppercase mb-2 block">
                    How to Do <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    value={howToDo}
                    onChange={(e) => setHowToDo(e.target.value)}
                    placeholder="Clear execution instructions..."
                    rows={3}
                    className="w-full px-4 py-3 bg-secondary/60 border border-primary/20 rounded-lg font-system text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-all resize-none"
                  />
                </div>

                {/* Habit Type */}
                <div>
                  <label className="font-system text-[10px] text-muted-foreground tracking-wider uppercase mb-2 block">
                    Habit Type <span className="text-destructive">*</span>
                  </label>
                  <div className="flex gap-2">
                    {(["daily", "weekly"] as HabitFrequency[]).map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setFrequency(f)}
                        className={`flex-1 px-4 py-2.5 rounded-lg font-system text-xs tracking-wider uppercase transition-all ${
                          frequency === f
                            ? "bg-primary/20 border border-primary/60 text-primary"
                            : "bg-secondary/60 border border-primary/20 text-muted-foreground hover:border-primary/40"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Activation Status */}
                <div>
                  <label className="font-system text-[10px] text-muted-foreground tracking-wider uppercase mb-2 block">
                    Activation Status <span className="text-destructive">*</span>
                  </label>
                  <div className="flex gap-2">
                    {(["active", "inactive"] as HabitStatus[]).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setStatus(s)}
                        className={`flex-1 px-4 py-2.5 rounded-lg font-system text-xs tracking-wider uppercase transition-all ${
                          status === s
                            ? s === "active"
                              ? "bg-success/20 border border-success/60 text-success"
                              : "bg-muted/20 border border-muted/60 text-muted-foreground"
                            : "bg-secondary/60 border border-primary/20 text-muted-foreground hover:border-primary/40"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Frequency Detail - Optional */}
                <div>
                  <label className="font-system text-[10px] text-muted-foreground tracking-wider uppercase mb-2 block">
                    Frequency Detail <span className="text-muted-foreground/50">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={frequencyDetail}
                    onChange={(e) => setFrequencyDetail(e.target.value)}
                    placeholder="e.g., 3 times per day, Mon/Wed/Fri..."
                    className="w-full px-4 py-3 bg-secondary/60 border border-primary/20 rounded-lg font-system text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>

                {/* Difficulty - Optional */}
                <div>
                  <label className="font-system text-[10px] text-muted-foreground tracking-wider uppercase mb-2 block">
                    Difficulty <span className="text-muted-foreground/50">(optional)</span>
                  </label>
                  <div className="flex gap-2">
                    {(["low", "medium", "high"] as HabitDifficulty[]).map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDifficulty(difficulty === d ? "" : d)}
                        className={`flex-1 px-4 py-2.5 rounded-lg font-system text-xs tracking-wider uppercase transition-all ${
                          difficulty === d
                            ? "bg-primary/20 border border-primary/60 text-primary"
                            : "bg-secondary/60 border border-primary/20 text-muted-foreground hover:border-primary/40"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Linked Skill - Optional */}
                <div>
                  <label className="font-system text-[10px] text-muted-foreground tracking-wider uppercase mb-2 block">
                    Linked Skill <span className="text-muted-foreground/50">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={linkedSkill}
                    onChange={(e) => setLinkedSkill(e.target.value)}
                    placeholder="e.g., Focus, Discipline..."
                    className="w-full px-4 py-3 bg-secondary/60 border border-primary/20 rounded-lg font-system text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>

                {/* Linked Inventory - Optional */}
                <div>
                  <label className="font-system text-[10px] text-muted-foreground tracking-wider uppercase mb-2 block">
                    Linked Inventory <span className="text-muted-foreground/50">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={linkedInventory}
                    onChange={(e) => setLinkedInventory(e.target.value)}
                    placeholder="e.g., Meditation cushion, Journal..."
                    className="w-full px-4 py-3 bg-secondary/60 border border-primary/20 rounded-lg font-system text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>

                {/* Notes - Optional */}
                <div>
                  <label className="font-system text-[10px] text-muted-foreground tracking-wider uppercase mb-2 block">
                    Notes <span className="text-muted-foreground/50">(optional)</span>
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Private guidance or reminders..."
                    rows={2}
                    className="w-full px-4 py-3 bg-secondary/60 border border-primary/20 rounded-lg font-system text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-all resize-none"
                  />
                </div>
              </div>
            </ScrollArea>

            {/* Actions */}
            <div className="p-6 border-t border-primary/20 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-secondary/60 border border-primary/20 rounded-lg font-system text-xs text-muted-foreground tracking-wider hover:border-primary/40 transition-all"
              >
                CANCEL
              </button>
              <button
                onClick={handleSave}
                disabled={!isValid}
                className={`flex-1 px-4 py-3 rounded-lg font-system text-xs tracking-wider transition-all ${
                  isValid
                    ? "bg-primary/20 border border-primary/60 text-primary hover:bg-primary/30"
                    : "bg-muted/20 border border-muted/30 text-muted-foreground cursor-not-allowed opacity-50"
                }`}
              >
                SAVE
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HabitFormCard;
