import { motion } from 'framer-motion';
import { Skill, DIFFICULTY_COLORS, MASTERED_COLOR } from './types';

interface TreeSkillNodeProps {
  skill: Skill;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

const TreeSkillNode = ({ skill, isSelected, onClick, index }: TreeSkillNodeProps) => {
  const isMastered = skill.level >= 10;
  const colorConfig = isMastered ? MASTERED_COLOR : DIFFICULTY_COLORS[skill.difficulty];
  
  // Glow intensity based on level
  const glowIntensity = 0.3 + (skill.level / 10) * 0.7;
  const nodeSize = 64;

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: skill.position.x,
        top: skill.position.y,
        width: nodeSize,
        height: nodeSize,
        marginLeft: -nodeSize / 2,
        marginTop: -nodeSize / 2,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
      }}
      transition={{
        scale: { duration: 0.4, delay: 0.3 + index * 0.08, ease: 'easeOut' },
        opacity: { duration: 0.3, delay: 0.3 + index * 0.08 },
      }}
    >
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, hsl(${colorConfig.glow} / ${glowIntensity * 0.4}) 0%, transparent 70%)`,
          transform: 'scale(2)',
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [2, 2.3, 2],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: Math.random() * 2,
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

      {/* Node body */}
      <motion.button
        className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, hsl(220 50% 10%) 0%, hsl(220 50% 6%) 100%)`,
          border: `2px solid hsl(${colorConfig.glow} / ${glowIntensity})`,
          boxShadow: `
            0 0 ${15 + skill.level * 2}px hsl(${colorConfig.glow} / ${glowIntensity * 0.5}),
            inset 0 0 15px hsl(${colorConfig.glow} / 0.1)
          `,
        }}
        onClick={onClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Inner highlight */}
        <div
          className="absolute inset-2 rounded-full opacity-25"
          style={{
            background: `radial-gradient(circle at 30% 30%, hsl(${colorConfig.glow} / 0.5), transparent 60%)`,
          }}
        />

        {/* Icon */}
        <span className="text-2xl z-10">{skill.icon}</span>

        {/* Level indicator */}
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-system font-bold tracking-wider"
          style={{
            background: 'hsl(220 50% 5% / 0.95)',
            border: `1px solid hsl(${colorConfig.glow} / 0.7)`,
            color: `hsl(${colorConfig.glow})`,
            boxShadow: `0 0 8px hsl(${colorConfig.glow} / 0.3)`,
          }}
        >
          {isMastered ? '★' : `LV${skill.level}`}
        </div>
      </motion.button>

      {/* Skill name label */}
      <motion.div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 + index * 0.08 }}
      >
        <div
          className="px-2 py-0.5 rounded font-system text-[10px] tracking-wider"
          style={{
            background: 'hsl(220 50% 6% / 0.9)',
            border: `1px solid hsl(${colorConfig.glow} / 0.4)`,
            color: `hsl(${colorConfig.glow})`,
            textShadow: `0 0 10px hsl(${colorConfig.glow} / 0.5)`,
          }}
        >
          {skill.name.toUpperCase()}
        </div>
        {/* XP requirement */}
        <div
          className="text-center font-system text-[8px] tracking-wider mt-0.5"
          style={{
            color: `hsl(${colorConfig.glow} / 0.6)`,
          }}
        >
          {skill.currentXP}/{skill.requiredXP} XP
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TreeSkillNode;
