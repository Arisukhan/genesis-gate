import { AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Search, Filter } from 'lucide-react';
import { useState } from 'react';
import { useSkillTreeStore } from './useSkillTreeStore';
import SkillGraph from './SkillGraph';
import SkillDetailCard from './SkillDetailCard';
import AddSkillCard from './AddSkillCard';

interface SkillTreePageProps {
  onBack: () => void;
}

const SkillTreePage = ({ onBack }: SkillTreePageProps) => {
  const {
    skills,
    selectedSkill,
    selectedSkillId,
    isAddingSkill,
    isEditingSkill,
    selectSkill,
    openAddSkill,
    openEditSkill,
    closeModals,
    addSkill,
    updateSkill,
    deleteSkill,
    addXP,
  } = useSkillTreeStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);

  // Filter skills based on search and difficulty
  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          skill.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDifficulty = !difficultyFilter || skill.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  const handleDelete = () => {
    if (selectedSkillId) {
      deleteSkill(selectedSkillId);
    }
  };

  const handleAddXP = (amount: number) => {
    if (selectedSkillId) {
      addXP(selectedSkillId, amount);
    }
  };

  return (
    <div className="fixed inset-0 system-background overflow-hidden">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-30 px-4 py-4 flex items-center justify-between">
        {/* Back button and title */}
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-secondary/40 border border-primary/30 flex items-center justify-center hover:border-primary/50 hover:bg-secondary/60 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-primary/70" />
          </button>
          <div>
            <h1 className="font-system text-lg text-foreground tracking-wider">SKILL TREE</h1>
            <p className="font-system text-[10px] text-muted-foreground tracking-wide">
              {skills.length} skills • {skills.filter(s => s.level >= 10).length} mastered
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search skills..."
              className="pl-9 pr-4 py-2 w-48 rounded bg-secondary/40 border border-primary/20 text-sm text-foreground font-system placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none transition-colors"
            />
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
              showFilters || difficultyFilter
                ? 'bg-primary/20 border-primary/50'
                : 'bg-secondary/40 border-primary/30 hover:border-primary/50'
            }`}
          >
            <Filter className="w-4 h-4 text-primary/70" />
          </button>

          {/* Add button */}
          <button
            onClick={openAddSkill}
            className="flex items-center gap-2 px-4 py-2 rounded bg-primary/20 border border-primary/40 text-primary font-system text-sm tracking-wider hover:bg-primary/30 hover:border-primary/60 transition-all"
          >
            <Plus className="w-4 h-4" />
            ADD SKILL
          </button>
        </div>
      </div>

      {/* Filter bar */}
      <AnimatePresence>
        {showFilters && (
          <div className="absolute top-20 left-0 right-0 z-20 px-4 py-3 bg-secondary/80 backdrop-blur-sm border-b border-primary/20">
            <div className="flex items-center gap-4">
              <span className="font-system text-xs text-muted-foreground">DIFFICULTY:</span>
              <div className="flex gap-2">
                {['all', 'easy', 'medium', 'hard'].map(diff => (
                  <button
                    key={diff}
                    onClick={() => setDifficultyFilter(diff === 'all' ? null : diff)}
                    className={`px-3 py-1 rounded font-system text-xs tracking-wider border transition-all ${
                      (diff === 'all' && !difficultyFilter) || diff === difficultyFilter
                        ? 'bg-primary/20 border-primary/50 text-primary'
                        : 'bg-secondary/50 border-primary/20 text-muted-foreground hover:border-primary/40'
                    }`}
                  >
                    {diff.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Skill Graph */}
      <SkillGraph
        skills={searchQuery || difficultyFilter ? filteredSkills : skills}
        selectedSkillId={selectedSkillId}
        onSelectSkill={selectSkill}
        onOpenAdd={openAddSkill}
      />

      {/* Modals */}
      <AnimatePresence>
        {selectedSkill && !isEditingSkill && (
          <SkillDetailCard
            key="detail"
            skill={selectedSkill}
            onClose={closeModals}
            onEdit={openEditSkill}
            onDelete={handleDelete}
            onAddXP={handleAddXP}
          />
        )}

        {isAddingSkill && (
          <AddSkillCard
            key="add"
            onClose={closeModals}
            onSave={addSkill}
          />
        )}

        {isEditingSkill && selectedSkill && (
          <AddSkillCard
            key="edit"
            onClose={closeModals}
            onSave={addSkill}
            existingSkill={selectedSkill}
            isEditing
            onUpdate={updateSkill}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillTreePage;
