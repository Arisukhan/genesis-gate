import { useState, useEffect } from "react";
import { LibraryQuest, QuestCategory, QuestDifficulty } from "./QuestLibrary";
import { Save, X, Plus, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface QuestLibraryFormProps {
  quest: LibraryQuest | null;
  onSave: (quest: Omit<LibraryQuest, "id">) => void;
  onCancel: () => void;
}

const categories: { value: QuestCategory; label: string }[] = [
  { value: "core", label: "CORE" },
  { value: "optional", label: "OPTIONAL" },
  { value: "special", label: "SPECIAL" },
];

const difficulties: QuestDifficulty[] = [1, 2, 3, 4, 5];

const QuestLibraryForm = ({ quest, onSave, onCancel }: QuestLibraryFormProps) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<QuestCategory>("core");
  const [difficulty, setDifficulty] = useState<QuestDifficulty>(1);
  const [xp, setXp] = useState(100);
  const [description, setDescription] = useState("");
  const [rules, setRules] = useState<string[]>([""]);
  const [linkedSkills, setLinkedSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    if (quest) {
      setTitle(quest.title);
      setCategory(quest.category);
      setDifficulty(quest.difficulty);
      setXp(quest.xp);
      setDescription(quest.description);
      setRules(quest.rules.length > 0 ? quest.rules : [""]);
      setLinkedSkills(quest.linkedSkills || []);
    }
  }, [quest]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredRules = rules.filter((r) => r.trim() !== "");
    onSave({
      title,
      category,
      difficulty,
      xp,
      description,
      rules: filteredRules,
      linkedSkills: linkedSkills.length > 0 ? linkedSkills : undefined,
    });
  };

  const addRule = () => {
    setRules([...rules, ""]);
  };

  const updateRule = (index: number, value: string) => {
    const newRules = [...rules];
    newRules[index] = value;
    setRules(newRules);
  };

  const removeRule = (index: number) => {
    if (rules.length > 1) {
      setRules(rules.filter((_, i) => i !== index));
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !linkedSkills.includes(newSkill.trim())) {
      setLinkedSkills([...linkedSkills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setLinkedSkills(linkedSkills.filter((s) => s !== skill));
  };

  const isValid = title.trim() && description.trim();

  return (
    <div className="h-full flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/60 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Form Card */}
      <div className="relative z-10 w-full max-w-2xl system-card p-0 animate-fade-in">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="p-6 border-b border-primary/20 flex items-center justify-between">
            <h2 className="font-system text-lg text-foreground tracking-wide">
              {quest ? "EDIT QUEST" : "ADD NEW QUEST"}
            </h2>
            <button
              type="button"
              onClick={onCancel}
              className="w-8 h-8 rounded-full bg-secondary/40 border border-primary/30 flex items-center justify-center transition-all hover:border-primary/60"
            >
              <X className="w-4 h-4 text-primary/70" />
            </button>
          </div>

          {/* Form Content */}
          <ScrollArea className="max-h-[60vh]">
            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block font-system text-xs text-muted-foreground tracking-wider mb-2">
                  QUEST TITLE *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-secondary/30 border border-primary/30 rounded-lg font-system text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
                  placeholder="Enter quest title..."
                />
              </div>

              {/* Category */}
              <div>
                <label className="block font-system text-xs text-muted-foreground tracking-wider mb-2">
                  CATEGORY *
                </label>
                <div className="flex gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setCategory(cat.value)}
                      className={`px-4 py-2 rounded-lg font-system text-xs tracking-wider transition-all ${
                        category === cat.value
                          ? "bg-primary/20 border border-primary/60 text-primary"
                          : "bg-secondary/30 border border-primary/20 text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty & XP Row */}
              <div className="grid grid-cols-2 gap-6">
                {/* Difficulty */}
                <div>
                  <label className="block font-system text-xs text-muted-foreground tracking-wider mb-2">
                    DIFFICULTY *
                  </label>
                  <div className="flex gap-2">
                    {difficulties.map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDifficulty(d)}
                        className={`w-10 h-10 rounded-lg font-system text-sm transition-all ${
                          difficulty === d
                            ? "bg-primary/20 border border-primary/60 text-primary"
                            : "bg-secondary/30 border border-primary/20 text-muted-foreground hover:border-primary/40"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* XP */}
                <div>
                  <label className="block font-system text-xs text-muted-foreground tracking-wider mb-2">
                    XP REWARD *
                  </label>
                  <input
                    type="number"
                    value={xp}
                    onChange={(e) => setXp(parseInt(e.target.value) || 0)}
                    min={0}
                    step={25}
                    className="w-full px-4 py-3 bg-secondary/30 border border-primary/30 rounded-lg font-system text-sm text-foreground focus:outline-none focus:border-primary/60 transition-colors"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-system text-xs text-muted-foreground tracking-wider mb-2">
                  DESCRIPTION *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-secondary/30 border border-primary/30 rounded-lg font-system text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors resize-none"
                  placeholder="Describe the quest..."
                />
              </div>

              {/* Rules */}
              <div>
                <label className="block font-system text-xs text-muted-foreground tracking-wider mb-2">
                  RULES / CONDITIONS
                </label>
                <div className="space-y-2">
                  {rules.map((rule, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={rule}
                        onChange={(e) => updateRule(index, e.target.value)}
                        className="flex-1 px-4 py-2 bg-secondary/30 border border-primary/30 rounded-lg font-system text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
                        placeholder="Enter a rule..."
                      />
                      <button
                        type="button"
                        onClick={() => removeRule(index)}
                        className="w-10 h-10 rounded-lg bg-secondary/30 border border-primary/20 flex items-center justify-center transition-all hover:border-danger/40 hover:bg-danger/10"
                      >
                        <Trash2 className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addRule}
                    className="flex items-center gap-2 text-primary/70 hover:text-primary transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="font-system text-xs tracking-wider">
                      ADD RULE
                    </span>
                  </button>
                </div>
              </div>

              {/* Linked Skills */}
              <div>
                <label className="block font-system text-xs text-muted-foreground tracking-wider mb-2">
                  LINKED SKILLS (optional)
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {linkedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-secondary/50 border border-primary/30 rounded-full text-xs text-foreground/70 font-system tracking-wide flex items-center gap-2"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="hover:text-danger transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addSkill();
                      }
                    }}
                    className="flex-1 px-4 py-2 bg-secondary/30 border border-primary/30 rounded-lg font-system text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
                    placeholder="Add a skill..."
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="px-4 py-2 bg-secondary/30 border border-primary/30 rounded-lg transition-all hover:border-primary/60"
                  >
                    <Plus className="w-4 h-4 text-primary/70" />
                  </button>
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Footer Actions */}
          <div className="p-6 border-t border-primary/20 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-secondary/30 border border-primary/30 rounded-lg font-system text-xs text-muted-foreground tracking-wider transition-all hover:border-primary/50"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-system text-xs tracking-wider transition-all ${
                isValid
                  ? "bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30 hover:border-primary/60"
                  : "bg-secondary/20 border border-primary/10 text-muted-foreground/50 cursor-not-allowed"
              }`}
            >
              <Save className="w-4 h-4" />
              SAVE QUEST
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestLibraryForm;
