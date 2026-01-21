import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface Root {
  id: number;
  path: string;
  strokeWidth: number;
  opacity: number;
  delay: number;
}

interface TreeRootsProps {
  coreX: number;
  coreY: number;
}

const TreeRoots = ({ coreX, coreY }: TreeRootsProps) => {
  const roots = useMemo<Root[]>(() => {
    const generatedRoots: Root[] = [];
    const numRoots = 7;
    
    for (let i = 0; i < numRoots; i++) {
      const angle = (Math.PI / 2) + (Math.PI * (i / (numRoots - 1)) - Math.PI / 2) * 0.8;
      const mainLength = 120 + Math.random() * 80;
      
      // Main root path with bezier curve
      const endX = coreX + Math.cos(angle) * mainLength;
      const endY = coreY + Math.sin(angle) * mainLength + 50;
      
      const cp1x = coreX + Math.cos(angle) * (mainLength * 0.3) + (Math.random() - 0.5) * 30;
      const cp1y = coreY + Math.sin(angle) * (mainLength * 0.3) + 20;
      const cp2x = coreX + Math.cos(angle) * (mainLength * 0.7) + (Math.random() - 0.5) * 40;
      const cp2y = coreY + Math.sin(angle) * (mainLength * 0.7) + 30;
      
      generatedRoots.push({
        id: i,
        path: `M ${coreX} ${coreY + 35} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`,
        strokeWidth: 3 - (i % 2) * 0.8,
        opacity: 0.3 - (i % 3) * 0.05,
        delay: i * 0.1,
      });
      
      // Add smaller branching roots
      if (i % 2 === 0) {
        const branchAngle = angle + (Math.random() - 0.5) * 0.4;
        const branchLength = mainLength * 0.5;
        const branchStartX = coreX + Math.cos(angle) * (mainLength * 0.5);
        const branchStartY = coreY + Math.sin(angle) * (mainLength * 0.5) + 30;
        const branchEndX = branchStartX + Math.cos(branchAngle) * branchLength;
        const branchEndY = branchStartY + Math.sin(branchAngle) * branchLength + 20;
        
        generatedRoots.push({
          id: numRoots + i,
          path: `M ${branchStartX} ${branchStartY} Q ${(branchStartX + branchEndX) / 2 + (Math.random() - 0.5) * 20} ${(branchStartY + branchEndY) / 2 + 10}, ${branchEndX} ${branchEndY}`,
          strokeWidth: 1.5,
          opacity: 0.2,
          delay: i * 0.1 + 0.3,
        });
      }
    }
    
    return generatedRoots;
  }, [coreX, coreY]);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="rootGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(190 60% 30%)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(200 50% 15%)" stopOpacity="0.1" />
        </linearGradient>
        <filter id="rootGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {roots.map((root) => (
        <motion.path
          key={root.id}
          d={root.path}
          fill="none"
          stroke="url(#rootGradient)"
          strokeWidth={root.strokeWidth}
          strokeLinecap="round"
          opacity={root.opacity}
          filter="url(#rootGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: root.opacity,
          }}
          transition={{
            pathLength: { duration: 1.5, delay: root.delay, ease: 'easeOut' },
            opacity: { duration: 1, delay: root.delay },
          }}
        />
      ))}
    </svg>
  );
};

export default TreeRoots;
