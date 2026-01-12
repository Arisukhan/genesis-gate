import { motion } from 'framer-motion';
import { Skill, DIFFICULTY_COLORS, MASTERED_COLOR } from './types';

interface EnergyLineProps {
  from: Skill;
  to: Skill;
}

const EnergyLine = ({ from, to }: EnergyLineProps) => {
  const isMastered = to.level >= 10;
  const colorConfig = isMastered ? MASTERED_COLOR : DIFFICULTY_COLORS[to.difficulty];
  
  // Calculate line path
  const dx = to.position.x - from.position.x;
  const dy = to.position.y - from.position.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  // Offset to account for node radius
  const nodeRadius = 40;
  const startOffset = nodeRadius;
  const endOffset = nodeRadius;
  const adjustedLength = length - startOffset - endOffset;

  if (adjustedLength <= 0) return null;

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: from.position.x,
        top: from.position.y,
        width: adjustedLength,
        height: 2,
        transform: `rotate(${angle}deg)`,
        transformOrigin: '0 50%',
        marginLeft: startOffset,
      }}
    >
      {/* Base line */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `hsl(${colorConfig.glow})`,
        }}
      />
      
      {/* Animated energy flow */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0.4 }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="absolute h-full w-8"
          style={{
            background: `linear-gradient(90deg, transparent, hsl(${colorConfig.glow}), transparent)`,
            boxShadow: `0 0 10px hsl(${colorConfig.glow} / 0.5)`,
          }}
          animate={{
            x: [-32, adjustedLength + 32],
          }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 2,
          }}
        />
      </motion.div>

      {/* Glow effect */}
      <div 
        className="absolute inset-0 blur-sm opacity-50"
        style={{
          background: `hsl(${colorConfig.glow})`,
        }}
      />
    </div>
  );
};

export default EnergyLine;
