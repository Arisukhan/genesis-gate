import { motion } from 'framer-motion';
import { Skill, DIFFICULTY_COLORS, MASTERED_COLOR } from './types';

interface SkillNodeProps {
  skill: Skill;
  isSelected: boolean;
  onClick: () => void;
}

const SkillNode = ({ skill, isSelected, onClick }: SkillNodeProps) => {
  const isMastered = skill.level >= 10;
  const isRoot = skill.parentId === null;
  const colorConfig = isMastered ? MASTERED_COLOR : DIFFICULTY_COLORS[skill.difficulty];
  
  // Glow intensity based on level (0.2 to 1)
  const glowIntensity = 0.2 + (skill.level / 10) * 0.8;
  
  const nodeSize = isRoot ? 100 : 80;
  const iconSize = isRoot ? 'text-3xl' : 'text-2xl';

  return (
    <motion.button
      className="absolute flex items-center justify-center cursor-pointer"
      style={{
        left: skill.position.x,
        top: skill.position.y,
        width: nodeSize,
        height: nodeSize,
        marginLeft: -nodeSize / 2,
        marginTop: -nodeSize / 2,
      }}
      onClick={onClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        y: [0, -3, 0], // Gentle floating
      }}
      transition={{
        scale: { duration: 0.3, ease: 'easeOut' },
        opacity: { duration: 0.3 },
        y: { 
          duration: 3 + Math.random() * 2, 
          repeat: Infinity, 
          ease: 'easeInOut',
          delay: Math.random() * 2,
        },
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, hsl(${colorConfig.glow} / ${glowIntensity * 0.4}) 0%, transparent 70%)`,
          transform: 'scale(1.8)',
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1.8, 2, 1.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Selection ring */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 rounded-full border-2"
          style={{
            borderColor: `hsl(${colorConfig.glow})`,
            transform: 'scale(1.3)',
          }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ 
            opacity: [0.5, 1, 0.5], 
            scale: 1.3,
          }}
          transition={{
            opacity: { duration: 1.5, repeat: Infinity },
            scale: { duration: 0.2 },
          }}
        />
      )}

      {/* Main node body */}
      <div
        className="absolute inset-0 rounded-full border-2 flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, hsl(220 50% 8%) 0%, hsl(220 50% 12%) 100%)`,
          borderColor: `hsl(${colorConfig.glow} / ${glowIntensity})`,
          boxShadow: `
            0 0 ${10 + skill.level * 2}px hsl(${colorConfig.glow} / ${glowIntensity * 0.5}),
            inset 0 0 20px hsl(${colorConfig.glow} / 0.1)
          `,
        }}
      >
        {/* Inner glow */}
        <div 
          className="absolute inset-2 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle at 30% 30%, hsl(${colorConfig.glow} / 0.4), transparent 60%)`,
          }}
        />

        {/* Icon */}
        <span className={`${iconSize} z-10`} role="img" aria-label={skill.name}>
          {skill.icon}
        </span>

        {/* Level indicator */}
        <div 
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-system font-bold tracking-wider"
          style={{
            background: `hsl(220 50% 5% / 0.9)`,
            border: `1px solid hsl(${colorConfig.glow} / 0.6)`,
            color: `hsl(${colorConfig.glow})`,
            boxShadow: `0 0 8px hsl(${colorConfig.glow} / 0.3)`,
          }}
        >
          {isMastered ? '★' : `LV${skill.level}`}
        </div>
      </div>

      {/* Skill name label */}
      <div 
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-system text-xs tracking-wider"
        style={{
          color: `hsl(${colorConfig.glow})`,
          textShadow: `0 0 10px hsl(${colorConfig.glow} / 0.5)`,
        }}
      >
        {skill.name.toUpperCase()}
      </div>
    </motion.button>
  );
};

export default SkillNode;
