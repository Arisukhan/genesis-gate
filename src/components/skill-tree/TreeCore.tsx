import { motion } from 'framer-motion';

interface TreeCoreProps {
  x: number;
  y: number;
  isSelected: boolean;
  onClick: () => void;
  onAddBranch: () => void;
}

const TreeCore = ({ x, y, isSelected, onClick, onAddBranch }: TreeCoreProps) => {
  const nodeSize = 80;

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
    >
      {/* Outer pulsing glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(45 100% 50% / 0.3) 0%, transparent 70%)',
          transform: 'scale(2.5)',
        }}
        animate={{
          scale: [2.5, 3, 2.5],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(45 100% 60% / 0.2) 30%, transparent 70%)',
          transform: 'scale(1.8)',
        }}
        animate={{
          scale: [1.8, 2.2, 1.8],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 2,
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
            radial-gradient(circle at 30% 30%, hsl(45 80% 40% / 0.3) 0%, transparent 50%),
            linear-gradient(135deg, hsl(220 50% 10%) 0%, hsl(220 50% 8%) 100%)
          `,
          border: '2px solid hsl(45 100% 50% / 0.8)',
          boxShadow: `
            0 0 30px hsl(45 100% 50% / 0.4),
            inset 0 0 20px hsl(45 100% 50% / 0.1)
          `,
        }}
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Inner highlight */}
        <div
          className="absolute inset-2 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle at 30% 30%, hsl(45 100% 70% / 0.4), transparent 60%)',
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
            background: 'hsl(220 50% 8% / 0.9)',
            border: '1px solid hsl(45 100% 50% / 0.5)',
            color: 'hsl(45 100% 60%)',
            boxShadow: '0 0 15px hsl(45 100% 50% / 0.2)',
          }}
        >
          MANA CORE
        </div>
      </div>
    </motion.div>
  );
};

export default TreeCore;
