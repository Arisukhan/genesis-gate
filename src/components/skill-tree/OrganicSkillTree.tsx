import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Skill } from './types';
import TreeBackground from './TreeBackground';
import TreeRoots from './TreeRoots';
import TreeBranch from './TreeBranch';
import TreeCore from './TreeCore';
import TreeSkillNode from './TreeSkillNode';

interface OrganicSkillTreeProps {
  skills: Skill[];
  selectedSkillId: string | null;
  onSelectSkill: (id: string) => void;
  onOpenAdd: () => void;
}

const OrganicSkillTree = ({ skills, selectedSkillId, onSelectSkill, onOpenAdd }: OrganicSkillTreeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const [startMouse, setStartMouse] = useState({ x: 0, y: 0 });

  // Core position (bottom center of view)
  const corePosition = { x: 0, y: 200 };
  
  // Get root skill
  const rootSkill = skills.find(s => s.parentId === null);
  const childSkills = skills.filter(s => s.parentId !== null);

  // Recalculate skill positions for tree layout
  const positionedSkills = childSkills.map((skill, index) => {
    const totalSkills = childSkills.length;
    const angleRange = Math.PI * 0.8; // 144 degrees spread
    const startAngle = -Math.PI / 2 - angleRange / 2;
    const angleStep = totalSkills > 1 ? angleRange / (totalSkills - 1) : 0;
    const angle = startAngle + angleStep * index;
    
    const tier = 1; // Could expand for sub-skills
    const baseDistance = 180;
    const distance = baseDistance * tier + Math.sin(index * 0.5) * 30;
    
    return {
      ...skill,
      position: {
        x: corePosition.x + Math.cos(angle) * distance,
        y: corePosition.y + Math.sin(angle) * distance - 50,
      },
    };
  });

  // Center the tree on mount
  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setPan({ x: width / 2, y: height * 0.65 });
    }
  }, []);

  // Mouse wheel zoom with smooth inertia
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.08 : 0.08;
    setZoom(prev => Math.min(2, Math.max(0.4, prev + delta)));
  }, []);

  // Touch/Mouse pan
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;
    
    setIsPanning(true);
    setStartPan(pan);
    setStartMouse({ x: e.clientX, y: e.clientY });
  }, [pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning) return;
    const dx = e.clientX - startMouse.x;
    const dy = e.clientY - startMouse.y;
    setPan({ x: startPan.x + dx, y: startPan.y + dy });
  }, [isPanning, startMouse, startPan]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden cursor-grab active:cursor-grabbing"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background with particles */}
      <TreeBackground />

      {/* Transformed tree content */}
      <motion.div
        className="absolute"
        style={{
          transformOrigin: '0 0',
        }}
        animate={{ 
          x: pan.x, 
          y: pan.y, 
          scale: zoom 
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Roots (decorative) */}
        <TreeRoots coreX={corePosition.x} coreY={corePosition.y} />

        {/* Branches connecting core to skills */}
        {positionedSkills.map((skill, index) => (
          <TreeBranch
            key={`branch-${skill.id}`}
            from={corePosition}
            to={skill}
            index={index}
          />
        ))}

        {/* Main Core Node */}
        <TreeCore
          x={corePosition.x}
          y={corePosition.y}
          isSelected={selectedSkillId === rootSkill?.id}
          onClick={() => rootSkill && onSelectSkill(rootSkill.id)}
          onAddBranch={onOpenAdd}
        />

        {/* Skill Nodes (leaves) */}
        {positionedSkills.map((skill, index) => (
          <TreeSkillNode
            key={skill.id}
            skill={skill}
            isSelected={skill.id === selectedSkillId}
            onClick={() => onSelectSkill(skill.id)}
            index={index}
          />
        ))}
      </motion.div>

      {/* Zoom indicator */}
      <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded bg-secondary/50 border border-primary/20 font-system text-xs text-primary/60 backdrop-blur-sm">
        {Math.round(zoom * 100)}%
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 font-system text-[10px] text-primary/40 tracking-wider">
        SCROLL TO ZOOM • DRAG TO PAN • TAP NODES TO VIEW
      </div>
    </div>
  );
};

export default OrganicSkillTree;
