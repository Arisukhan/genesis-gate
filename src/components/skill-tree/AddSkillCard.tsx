import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import { Skill, SkillDifficulty, DIFFICULTY_COLORS } from './types';
import { SystemCard, SystemCardTitle, SystemCardDivider, SystemCardContent } from '@/components/ui/system-card';

interface AddSkillCardProps {
  onClose: () => void;
  onSave: (skill: Omit<Skill, 'id' | 'position' | 'level' | 'currentXP' | 'requiredXP'>) => void;
  existingSkill?: Skill | null;
  isEditing?: boolean;
  onUpdate?: (id: string, updates: Partial<Skill>) => void;
}

const EMOJI_OPTIONS = ['⚡', '💪', '🎯', '🔥', '❤️', '📚', '🧠', '⚔️', '🛡️', '🏃', '🧘', '💡', '🎨', '🎵', '💻', '🌟', '🔮', '🗡️', '🏆', '💎'];

const AddSkillCard = ({ onClose, onSave, existingSkill, isEditing, onUpdate }: AddSkillCardProps) => {
  const [name, setName] = useState(existingSkill?.name || '');
  const [description, setDescription] = useState(existingSkill?.description || '');
  const [difficulty, setDifficulty] = useState<SkillDifficulty>(existingSkill?.difficulty || 'medium');
  const [icon, setIcon] = useState(existingSkill?.icon || '⚡');
  const [tagsInput, setTagsInput] = useState(existingSkill?.tags.join(', ') || '');
  const [questsInput, setQuestsInput] = useState(existingSkill?.linkedQuests.join(', ') || '');

  const handleSubmit = () => {
    if (!name.trim()) return;

    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const linkedQuests = questsInput.split(',').map(q => q.trim()).filter(Boolean);

    if (isEditing && existingSkill && onUpdate) {
      onUpdate(existingSkill.id, {
        name,
        description,
        difficulty,
        icon,
        tags,
        linkedQuests,
      });
      onClose();
    } else {
      onSave({
        name,
        description,
        difficulty,
        icon,
        tags,
        linkedQuests,
        parentId: 'root',
      });
    }
  };

  const difficultyOptions: { value: SkillDifficulty; label: string }[] = [
    { value: 'easy', label: 'EASY' },
    { value: 'medium', label: 'MEDIUM' },
    { value: 'hard', label: 'HARD' },
  ];

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Card */}
      <motion.div
        className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-md max-h-[85vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
        animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
        exit={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <SystemCard className="p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary/50 border border-primary/30 flex items-center justify-center hover:border-primary/60 hover:bg-secondary transition-all"
          >
            <X className="w-4 h-4 text-primary/70" />
          </button>

          <SystemCardTitle className="mb-4">
            {isEditing ? 'EDIT SKILL' : 'ADD NEW SKILL'}
          </SystemCardTitle>
          
          <SystemCardDivider />

          <SystemCardContent className="flex flex-col gap-4 pt-4">
            {/* Icon Selector */}
            <div>
              <label className="font-system text-xs text-muted-foreground block mb-2">ICON</label>
              <div className="flex flex-wrap gap-2">
                {EMOJI_OPTIONS.map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => setIcon(emoji)}
                    className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center border transition-all ${
                      icon === emoji
                        ? 'bg-primary/20 border-primary/60 shadow-glow-sm'
                        : 'bg-secondary/30 border-primary/20 hover:border-primary/40'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="font-system text-xs text-muted-foreground block mb-2">SKILL NAME *</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter skill name..."
                className="w-full px-4 py-2 rounded bg-secondary/30 border border-primary/20 text-foreground font-system text-sm placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none transition-colors"
              />
            </div>

            {/* Description */}
            <div>
              <label className="font-system text-xs text-muted-foreground block mb-2">DESCRIPTION</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe this skill..."
                rows={3}
                className="w-full px-4 py-2 rounded bg-secondary/30 border border-primary/20 text-foreground font-system text-sm placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Difficulty */}
            <div>
              <label className="font-system text-xs text-muted-foreground block mb-2">DIFFICULTY</label>
              <div className="flex gap-2">
                {difficultyOptions.map(opt => {
                  const colors = DIFFICULTY_COLORS[opt.value];
                  const isSelected = difficulty === opt.value;
                  
                  return (
                    <button
                      key={opt.value}
                      onClick={() => setDifficulty(opt.value)}
                      className={`flex-1 px-3 py-2 rounded font-system text-xs tracking-wider border transition-all ${
                        isSelected
                          ? 'border-opacity-60'
                          : 'border-primary/20 hover:border-primary/40'
                      }`}
                      style={{
                        background: isSelected ? colors.bg : 'hsl(220 50% 12% / 0.5)',
                        borderColor: isSelected ? `hsl(${colors.glow})` : undefined,
                        color: isSelected ? `hsl(${colors.glow})` : 'hsl(var(--muted-foreground))',
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="font-system text-xs text-muted-foreground block mb-2">
                TAGS <span className="text-muted-foreground/50">(comma separated)</span>
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={e => setTagsInput(e.target.value)}
                placeholder="physical, mental, focus..."
                className="w-full px-4 py-2 rounded bg-secondary/30 border border-primary/20 text-foreground font-system text-sm placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none transition-colors"
              />
            </div>

            {/* Linked Quests */}
            <div>
              <label className="font-system text-xs text-muted-foreground block mb-2">
                LINKED QUESTS <span className="text-muted-foreground/50">(comma separated)</span>
              </label>
              <input
                type="text"
                value={questsInput}
                onChange={e => setQuestsInput(e.target.value)}
                placeholder="Quest Name 1, Quest Name 2..."
                className="w-full px-4 py-2 rounded bg-secondary/30 border border-primary/20 text-foreground font-system text-sm placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none transition-colors"
              />
            </div>
          </SystemCardContent>

          <SystemCardDivider />

          {/* Save button */}
          <div className="pt-4">
            <button
              onClick={handleSubmit}
              disabled={!name.trim()}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded bg-primary/20 border border-primary/40 text-primary font-system text-sm tracking-wider hover:bg-primary/30 hover:border-primary/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              {isEditing ? 'SAVE CHANGES' : 'ADD SKILL'}
            </button>
          </div>
        </SystemCard>
      </motion.div>
    </>
  );
};

export default AddSkillCard;
