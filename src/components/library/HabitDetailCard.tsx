import { X, Edit2, Trash2, Clock, Gauge, Link, Package, FileText } from "lucide-react";
import { LibraryHabit } from "./types";
import { motion, AnimatePresence } from "framer-motion";

interface HabitDetailCardProps {
  habit: LibraryHabit;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  canDelete: boolean;
}

const HabitDetailCard = ({
  habit,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  canDelete,
}: HabitDetailCardProps) => {
  const displayIcon = habit.icon || "🎯";

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

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
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-2xl">
                    {displayIcon}
                  </div>
                  <div>
                    <h2 className="font-system text-lg text-foreground tracking-wide font-bold">
                      {habit.title}
                    </h2>
                    <div
                      className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full font-system text-[10px] tracking-wider uppercase ${
                        habit.status === "active"
                          ? "bg-success/20 border border-success/40 text-success"
                          : "bg-muted/20 border border-muted/40 text-muted-foreground"
                      }`}
                    >
                      {habit.status}
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-secondary/60 border border-primary/20 flex items-center justify-center hover:border-primary/40 transition-all"
                >
                  <X className="w-4 h-4 text-primary/60" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
              {/* Description */}
              <div>
                <label className="font-system text-[10px] text-muted-foreground tracking-wider uppercase mb-2 block">
                  Description
                </label>
                <p className="font-system text-sm text-foreground/90">
                  {habit.description}
                </p>
              </div>

              {/* How to Do */}
              <div>
                <label className="font-system text-[10px] text-muted-foreground tracking-wider uppercase mb-2 block">
                  How to Do
                </label>
                <p className="font-system text-sm text-foreground/90">
                  {habit.howToDo}
                </p>
              </div>

              {/* Type & Frequency */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="font-system text-[10px] text-muted-foreground tracking-wider uppercase mb-2 block">
                    Habit Type
                  </label>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary/60" />
                    <span className="font-system text-sm text-foreground capitalize">
                      {habit.frequency}
                    </span>
                  </div>
                </div>
                {habit.frequencyDetail && (
                  <div className="flex-1">
                    <label className="font-system text-[10px] text-muted-foreground tracking-wider uppercase mb-2 block">
                      Frequency Detail
                    </label>
                    <span className="font-system text-sm text-foreground">
                      {habit.frequencyDetail}
                    </span>
                  </div>
                )}
              </div>

              {/* Difficulty */}
              {habit.difficulty && (
                <div>
                  <label className="font-system text-[10px] text-muted-foreground tracking-wider uppercase mb-2 block">
                    Difficulty
                  </label>
                  <div className="flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-primary/60" />
                    <span className="font-system text-sm text-foreground capitalize">
                      {habit.difficulty}
                    </span>
                  </div>
                </div>
              )}

              {/* Linked Skill */}
              {habit.linkedSkill && (
                <div>
                  <label className="font-system text-[10px] text-muted-foreground tracking-wider uppercase mb-2 block">
                    Linked Skill
                  </label>
                  <div className="flex items-center gap-2">
                    <Link className="w-4 h-4 text-primary/60" />
                    <span className="px-2 py-1 bg-primary/10 border border-primary/20 rounded-full font-system text-xs text-primary/80">
                      {habit.linkedSkill}
                    </span>
                  </div>
                </div>
              )}

              {/* Linked Inventory */}
              {habit.linkedInventory && (
                <div>
                  <label className="font-system text-[10px] text-muted-foreground tracking-wider uppercase mb-2 block">
                    Linked Inventory
                  </label>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-primary/60" />
                    <span className="px-2 py-1 bg-primary/10 border border-primary/20 rounded-full font-system text-xs text-primary/80">
                      {habit.linkedInventory}
                    </span>
                  </div>
                </div>
              )}

              {/* Notes */}
              {habit.notes && (
                <div>
                  <label className="font-system text-[10px] text-muted-foreground tracking-wider uppercase mb-2 block">
                    Notes
                  </label>
                  <div className="flex items-start gap-2 p-3 bg-primary/5 border border-primary/10 rounded-lg">
                    <FileText className="w-4 h-4 text-primary/40 mt-0.5" />
                    <p className="font-system text-xs text-muted-foreground">
                      {habit.notes}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-6 border-t border-primary/20 flex gap-3">
              <button
                onClick={onEdit}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary/20 border border-primary/40 rounded-lg font-system text-xs text-primary tracking-wider hover:bg-primary/30 hover:border-primary/60 transition-all"
              >
                <Edit2 className="w-4 h-4" />
                EDIT
              </button>
              <button
                onClick={onDelete}
                disabled={!canDelete}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-system text-xs tracking-wider transition-all ${
                  canDelete
                    ? "bg-destructive/20 border border-destructive/40 text-destructive hover:bg-destructive/30 hover:border-destructive/60"
                    : "bg-muted/20 border border-muted/30 text-muted-foreground cursor-not-allowed opacity-50"
                }`}
              >
                <Trash2 className="w-4 h-4" />
                DELETE
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HabitDetailCard;
