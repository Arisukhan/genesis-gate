import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Skill } from './types';
import SkillNode from './SkillNode';
import EnergyLine from './EnergyLine';

interface SkillGraphProps {
  skills: Skill[];
  selectedSkillId: string | null;
  onSelectSkill: (id: string) => void;
  onOpenAdd: () => void;
}

const SkillGraph = ({ skills, selectedSkillId, onSelectSkill, onOpenAdd }: SkillGraphProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const [startMouse, setStartMouse] = useState({ x: 0, y: 0 });

  // Center the tree on mount
  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setPan({ x: width / 2, y: height / 2 });
    }
  }, []);

  // Mouse wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(prev => Math.min(2, Math.max(0.3, prev + delta)));
  }, []);

  // Pan start
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === containerRef.current || (e.target as HTMLElement).classList.contains('skill-graph-bg')) {
      setIsPanning(true);
      setStartPan(pan);
      setStartMouse({ x: e.clientX, y: e.clientY });
    }
  }, [pan]);

  // Pan move
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning) return;
    const dx = e.clientX - startMouse.x;
    const dy = e.clientY - startMouse.y;
    setPan({ x: startPan.x + dx, y: startPan.y + dy });
  }, [isPanning, startMouse, startPan]);

  // Pan end
  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Handle click on empty space
  const handleBackgroundClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('skill-graph-bg')) {
      onOpenAdd();
    }
  }, [onOpenAdd]);

  // Get connections between nodes
  const connections = skills
    .filter(s => s.parentId)
    .map(s => ({
      from: skills.find(p => p.id === s.parentId)!,
      to: s,
    }))
    .filter(c => c.from);

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
      {/* Background grid */}
      <div 
        className="skill-graph-bg absolute inset-0"
        onClick={handleBackgroundClick}
        style={{
          backgroundImage: `
            radial-gradient(circle at center, hsl(var(--primary) / 0.03) 0%, transparent 70%),
            linear-gradient(hsl(var(--primary) / 0.03) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 50px 50px, 50px 50px',
        }}
      />

      {/* Ambient fog */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ background: 'hsl(var(--primary) / 0.03)' }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: 'hsl(var(--primary) / 0.02)' }}
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Transformed content */}
      <div
        className="absolute"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0',
        }}
      >
        {/* Energy lines */}
        {connections.map(({ from, to }) => (
          <EnergyLine key={`${from.id}-${to.id}`} from={from} to={to} />
        ))}

        {/* Skill nodes */}
        {skills.map(skill => (
          <SkillNode
            key={skill.id}
            skill={skill}
            isSelected={skill.id === selectedSkillId}
            onClick={() => onSelectSkill(skill.id)}
          />
        ))}
      </div>

      {/* Zoom indicator */}
      <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded bg-secondary/50 border border-primary/20 font-system text-xs text-primary/60">
        {Math.round(zoom * 100)}%
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 font-system text-[10px] text-primary/40 tracking-wider">
        SCROLL TO ZOOM • DRAG TO PAN • CLICK EMPTY SPACE TO ADD
      </div>
    </div>
  );
};

export default SkillGraph;
