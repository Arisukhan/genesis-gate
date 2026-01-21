import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

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
  onAddBranch: () => void;
}

const TreeRoots = ({ coreX, coreY, onAddBranch }: TreeRootsProps) => {
  const [hoveredRoot, setHoveredRoot] = useState<number | null>(null);

  const roots = useMemo<Root[]>(() => {
    const generatedRoots: Root[] = [];
    const numRoots = 7;
    
    for (let i = 0; i < numRoots; i++) {
      const angle = (Math.PI / 2) + (Math.PI * (i / (numRoots - 1)) - Math.PI / 2) * 0.8;
      const mainLength = 120 + Math.random() * 80;
      
      const endX = coreX + Math.cos(angle) * mainLength;
      const endY = coreY + Math.sin(angle) * mainLength + 50;
      
      const cp1x = coreX + Math.cos(angle) * (mainLength * 0.3) + (Math.random() - 0.5) * 30;
      const cp1y = coreY + Math.sin(angle) * (mainLength * 0.3) + 20;
      const cp2x = coreX + Math.cos(angle) * (mainLength * 0.7) + (Math.random() - 0.5) * 40;
      const cp2y = coreY + Math.sin(angle) * (mainLength * 0.7) + 30;
      
      generatedRoots.push({
        id: i,
        path: `M ${coreX} ${coreY + 35} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`,
        strokeWidth: 4 - (i % 2) * 0.8,
        opacity: 0.6 - (i % 3) * 0.08,
        delay: i * 0.1,
      });
      
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
          strokeWidth: 2.5,
          opacity: 0.45,
          delay: i * 0.1 + 0.3,
        });
      }
    }
    
    return generatedRoots;
  }, [coreX, coreY]);

  const handleDoubleClick = () => {
    onAddBranch();
  };

  return (
    <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="rootGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(190 70% 45%)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="hsl(200 60% 25%)" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="rootGradientHover" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(45 100% 60%)" stopOpacity="1" />
          <stop offset="100%" stopColor="hsl(45 80% 40%)" stopOpacity="0.6" />
        </linearGradient>
        <filter id="rootGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="rootGlowHover">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {roots.map((root) => (
        <g key={root.id}>
          {/* Invisible wider hit area */}
          <motion.path
            d={root.path}
            fill="none"
            stroke="transparent"
            strokeWidth={20}
            strokeLinecap="round"
            className="cursor-pointer"
            onMouseEnter={() => setHoveredRoot(root.id)}
            onMouseLeave={() => setHoveredRoot(null)}
            onDoubleClick={handleDoubleClick}
          />
          {/* Visible root */}
          <motion.path
            d={root.path}
            fill="none"
            stroke={hoveredRoot === root.id ? "url(#rootGradientHover)" : "url(#rootGradient)"}
            strokeWidth={hoveredRoot === root.id ? root.strokeWidth + 2 : root.strokeWidth}
            strokeLinecap="round"
            opacity={hoveredRoot === root.id ? 1 : root.opacity}
            filter={hoveredRoot === root.id ? "url(#rootGlowHover)" : "url(#rootGlow)"}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: hoveredRoot === root.id ? 1 : root.opacity,
            }}
            transition={{
              pathLength: { duration: 1.5, delay: root.delay, ease: 'easeOut' },
              opacity: { duration: 0.3 },
            }}
            className="pointer-events-none"
          />
        </g>
      ))}

      {/* Hint tooltip */}
      {hoveredRoot !== null && (
        <g>
          <rect
            x={coreX - 70}
            y={coreY + 160}
            width={140}
            height={24}
            rx={4}
            fill="hsl(220 50% 10% / 0.95)"
            stroke="hsl(45 100% 50% / 0.5)"
            strokeWidth={1}
          />
          <text
            x={coreX}
            y={coreY + 176}
            textAnchor="middle"
            fill="hsl(45 100% 60%)"
            fontSize={10}
            fontFamily="system-ui"
          >
            Double-click to add branch
          </text>
        </g>
      )}
    </svg>
  );
};

export default TreeRoots;
