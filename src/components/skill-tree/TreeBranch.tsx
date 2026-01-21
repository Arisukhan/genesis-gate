import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Skill } from './types';

interface TreeBranchProps {
  from: { x: number; y: number };
  to: Skill;
  index: number;
  onAddSkillToBranch: (branchSkillId: string) => void;
}

const TreeBranch = ({ from, to, index, onAddSkillToBranch }: TreeBranchProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const path = useMemo(() => {
    const dx = to.position.x - from.x;
    const dy = to.position.y - from.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    const curveFactor = 0.3 + Math.random() * 0.2;
    const perpX = -dy / distance * 30 * (index % 2 === 0 ? 1 : -1);
    const perpY = dx / distance * 30 * (index % 2 === 0 ? 1 : -1);
    
    const cp1x = from.x + dx * curveFactor + perpX;
    const cp1y = from.y + dy * curveFactor + perpY;
    const cp2x = from.x + dx * (1 - curveFactor) - perpX * 0.5;
    const cp2y = from.y + dy * (1 - curveFactor) - perpY * 0.5;
    
    return `M ${from.x} ${from.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${to.position.x} ${to.position.y}`;
  }, [from, to, index]);

  // Get midpoint for tooltip
  const midpoint = useMemo(() => {
    const dx = to.position.x - from.x;
    const dy = to.position.y - from.y;
    return {
      x: from.x + dx * 0.5,
      y: from.y + dy * 0.5,
    };
  }, [from, to]);

  const isMastered = to.level >= 10;
  const baseColor = isMastered 
    ? 'hsl(45 100% 50%)' 
    : 'hsl(190 100% 50%)';
  const hoverColor = 'hsl(45 100% 60%)';
  const glowOpacity = 0.4 + (to.level / 10) * 0.4;

  const handleDoubleClick = () => {
    onAddSkillToBranch(to.id);
  };

  return (
    <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`branchGrad-${to.id}`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="hsl(190 80% 45%)" stopOpacity="0.9" />
          <stop offset="50%" stopColor={isHovered ? hoverColor : baseColor} stopOpacity={glowOpacity + 0.2} />
          <stop offset="100%" stopColor={isHovered ? hoverColor : baseColor} stopOpacity={glowOpacity * 0.7} />
        </linearGradient>
        <filter id={`branchGlow-${to.id}`}>
          <feGaussianBlur stdDeviation={isHovered ? 5 : 3} result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Invisible wider hit area for interaction */}
      <motion.path
        d={path}
        fill="none"
        stroke="transparent"
        strokeWidth={24}
        strokeLinecap="round"
        className="cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onDoubleClick={handleDoubleClick}
      />

      {/* Glow layer */}
      <motion.path
        d={path}
        fill="none"
        stroke={isHovered ? hoverColor : baseColor}
        strokeWidth={isHovered ? 14 : 10}
        strokeLinecap="round"
        opacity={isHovered ? glowOpacity * 0.6 : glowOpacity * 0.4}
        filter={`url(#branchGlow-${to.id})`}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: index * 0.1, ease: 'easeOut' }}
        className="pointer-events-none"
      />
      
      {/* Main branch */}
      <motion.path
        d={path}
        fill="none"
        stroke={`url(#branchGrad-${to.id})`}
        strokeWidth={isHovered ? 5 : 4}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
        className="pointer-events-none"
      />
      
      {/* Energy flow animation */}
      <motion.circle
        r={4}
        fill={isHovered ? hoverColor : baseColor}
        opacity={0}
        filter={`url(#branchGlow-${to.id})`}
        className="pointer-events-none"
      >
        <animateMotion
          dur={`${2 + Math.random()}s`}
          repeatCount="indefinite"
          path={path}
          begin={`${index * 0.2}s`}
        />
        <animate
          attributeName="opacity"
          values="0;0.9;0"
          dur={`${2 + Math.random()}s`}
          repeatCount="indefinite"
          begin={`${index * 0.2}s`}
        />
      </motion.circle>

      {/* Hover tooltip */}
      {isHovered && (
        <g>
          <rect
            x={midpoint.x - 65}
            y={midpoint.y - 28}
            width={130}
            height={24}
            rx={4}
            fill="hsl(220 50% 10% / 0.95)"
            stroke="hsl(45 100% 50% / 0.6)"
            strokeWidth={1}
          />
          <text
            x={midpoint.x}
            y={midpoint.y - 12}
            textAnchor="middle"
            fill="hsl(45 100% 60%)"
            fontSize={10}
            fontFamily="system-ui"
          >
            Double-click to add skill
          </text>
        </g>
      )}
    </svg>
  );
};

export default TreeBranch;
