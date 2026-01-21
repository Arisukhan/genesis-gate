import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { Skill } from './types';

interface TreeBranchProps {
  from: { x: number; y: number };
  to: Skill;
  index: number;
}

const TreeBranch = ({ from, to, index }: TreeBranchProps) => {
  const path = useMemo(() => {
    const dx = to.position.x - from.x;
    const dy = to.position.y - from.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Create organic bezier curve
    // Control points for smooth S-curve
    const curveFactor = 0.3 + Math.random() * 0.2;
    const perpX = -dy / distance * 30 * (index % 2 === 0 ? 1 : -1);
    const perpY = dx / distance * 30 * (index % 2 === 0 ? 1 : -1);
    
    const cp1x = from.x + dx * curveFactor + perpX;
    const cp1y = from.y + dy * curveFactor + perpY;
    const cp2x = from.x + dx * (1 - curveFactor) - perpX * 0.5;
    const cp2y = from.y + dy * (1 - curveFactor) - perpY * 0.5;
    
    return `M ${from.x} ${from.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${to.position.x} ${to.position.y}`;
  }, [from, to, index]);

  const isMastered = to.level >= 10;
  const glowColor = isMastered 
    ? 'hsl(45 100% 50%)' 
    : 'hsl(190 100% 50%)';
  const glowOpacity = 0.3 + (to.level / 10) * 0.4;

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`branchGrad-${to.id}`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="hsl(190 80% 35%)" stopOpacity="0.8" />
          <stop offset="50%" stopColor={glowColor} stopOpacity={glowOpacity} />
          <stop offset="100%" stopColor={glowColor} stopOpacity={glowOpacity * 0.6} />
        </linearGradient>
        <filter id={`branchGlow-${to.id}`}>
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Glow layer */}
      <motion.path
        d={path}
        fill="none"
        stroke={glowColor}
        strokeWidth={8}
        strokeLinecap="round"
        opacity={glowOpacity * 0.3}
        filter={`url(#branchGlow-${to.id})`}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: index * 0.1, ease: 'easeOut' }}
      />
      
      {/* Main branch */}
      <motion.path
        d={path}
        fill="none"
        stroke={`url(#branchGrad-${to.id})`}
        strokeWidth={3 - (to.level > 5 ? 0 : 0.5)}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
      />
      
      {/* Energy flow animation */}
      <motion.circle
        r={3}
        fill={glowColor}
        opacity={0}
        filter={`url(#branchGlow-${to.id})`}
      >
        <animateMotion
          dur={`${2 + Math.random()}s`}
          repeatCount="indefinite"
          path={path}
          begin={`${index * 0.2}s`}
        />
        <animate
          attributeName="opacity"
          values="0;0.8;0"
          dur={`${2 + Math.random()}s`}
          repeatCount="indefinite"
          begin={`${index * 0.2}s`}
        />
      </motion.circle>
    </svg>
  );
};

export default TreeBranch;
