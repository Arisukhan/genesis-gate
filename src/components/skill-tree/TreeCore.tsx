import { motion } from 'framer-motion';
import { useState } from 'react';

interface TreeCoreProps {
  x: number;
  y: number;
  isSelected: boolean;
  onClick: () => void;
  onAddBranch: () => void;
}

const TreeCore = ({ x, y, isSelected, onClick, onAddBranch }: TreeCoreProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const nodeSize = 80;

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddBranch();
  };

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: x,
        top: y,
        width: nodeSize,
        height: nodeSize,
        marginLeft: -nodeSize / 2,
        marginTop: -nodeSize / 2,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer pulsing glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(45 100% 50% / 0.4) 0%, transparent 70%)',
          transform: 'scale(2.5)',
        }}
        animate={{
          scale: isHovered ? [3, 3.5, 3] : [2.5, 3, 2.5],
          opacity: isHovered ? [0.7, 0.9, 0.7] : [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: isHovered ? 1.5 : 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(45 100% 60% / 0.3) 30%, transparent 70%)',
          transform: 'scale(1.8)',
        }}
        animate={{
          scale: isHovered ? [2, 2.4, 2] : [1.8, 2.2, 1.8],
          opacity: isHovered ? [0.6, 0.8, 0.6] : [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: isHovered ? 1 : 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />

      {/* Selection ring */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 rounded-full border-2"
          style={{
            borderColor: 'hsl(45 100% 60%)',
            transform: 'scale(1.4)',
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1.4, 1.5, 1.4],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        />
      )}

      {/* Core body */}
      <motion.button
        className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, hsl(45 80% 50% / 0.4) 0%, transparent 50%),
            linear-gradient(135deg, hsl(220 50% 12%) 0%, hsl(220 50% 8%) 100%)
          `,
          border: isHovered ? '3px solid hsl(45 100% 60%)' : '2px solid hsl(45 100% 50% / 0.8)',
          boxShadow: isHovered 
            ? `0 0 50px hsl(45 100% 50% / 0.6), inset 0 0 30px hsl(45 100% 50% / 0.2)`
            : `0 0 30px hsl(45 100% 50% / 0.4), inset 0 0 20px hsl(45 100% 50% / 0.1)`,
        }}
        onClick={onClick}
        onDoubleClick={handleDoubleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Inner highlight */}
        <div
          className="absolute inset-2 rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle at 30% 30%, hsl(45 100% 70% / 0.5), transparent 60%)',
          }}
        />

        {/* Diamond icon */}
        <span className="text-3xl z-10">💎</span>
      </motion.button>

      {/* Label */}
      <div
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap"
      >
        <div
          className="px-3 py-1 rounded font-system text-xs tracking-widest text-center"
          style={{
            background: 'hsl(220 50% 8% / 0.95)',
            border: isHovered ? '1px solid hsl(45 100% 60%)' : '1px solid hsl(45 100% 50% / 0.5)',
            color: 'hsl(45 100% 60%)',
            boxShadow: isHovered ? '0 0 20px hsl(45 100% 50% / 0.4)' : '0 0 15px hsl(45 100% 50% / 0.2)',
          }}
        >
          MANA CORE
        </div>
      </div>

      {/* Hover hint */}
      {isHovered && (
        <motion.div
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 whitespace-nowrap"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="px-3 py-1.5 rounded font-system text-[10px] tracking-wider text-center"
            style={{
              background: 'hsl(220 50% 10% / 0.95)',
              border: '1px solid hsl(45 100% 50% / 0.4)',
              color: 'hsl(45 100% 50%)',
            }}
          >
            Double-click to add branch
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TreeCore;
