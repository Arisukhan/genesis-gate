import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, Shield, Gem, Key, Star } from "lucide-react";
import { InventoryItem, ItemCategory, ItemStatus } from "./types";

interface InventoryGridItemProps {
  item: InventoryItem;
  onClick?: () => void;
}

const categoryIcons: Record<ItemCategory, React.ElementType> = {
  wearables: FlaskConical,
  tools: Shield,
  digital: Gem,
  health: Key,
  documents: Star,
};

const statusColors: Record<ItemStatus, { bg: string; text: string; border: string }> = {
  active: { 
    bg: 'bg-success/20', 
    text: 'text-success', 
    border: 'border-success/40' 
  },
  stored: { 
    bg: 'bg-warning/20', 
    text: 'text-warning', 
    border: 'border-warning/40' 
  },
  archived: { 
    bg: 'bg-muted-foreground/20', 
    text: 'text-muted-foreground', 
    border: 'border-muted-foreground/40' 
  },
};

const InventoryGridItem = ({ item, onClick }: InventoryGridItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showName, setShowName] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const Icon = categoryIcons[item.category];
  const statusStyle = statusColors[item.status];

  // Long press handlers for mobile
  const handleTouchStart = useCallback(() => {
    longPressTimer.current = setTimeout(() => {
      setShowName(true);
    }, 400);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    setShowName(false);
  }, []);

  // Desktop hover shows name
  const handleMouseEnter = () => {
    setIsHovered(true);
    setShowName(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowName(false);
  };

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className="relative w-full aspect-square group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98, y: 2 }}
    >
      {/* Card container with parallax effect */}
      <motion.div
        className="
          absolute inset-0 rounded-lg overflow-hidden
          bg-gradient-to-br from-secondary/60 to-secondary/30
          border border-primary/20
          backdrop-blur-sm
          transition-shadow duration-300
        "
        style={{
          boxShadow: isHovered 
            ? '0 8px 32px hsl(var(--primary) / 0.2), inset 0 1px 0 hsl(var(--primary) / 0.1)'
            : '0 4px 16px hsl(0 0% 0% / 0.3), inset 0 1px 0 hsl(var(--primary) / 0.05)',
        }}
        animate={{
          rotateX: isHovered ? -2 : 0,
          rotateY: isHovered ? 2 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Inner gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-50" />
        
        {/* Animated border trace on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.rect
                x="1"
                y="1"
                width="98"
                height="98"
                rx="6"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="0.5"
                strokeDasharray="200"
                initial={{ strokeDashoffset: 200 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ opacity: 0.6 }}
              />
            </svg>
          </motion.div>
        )}
        
        {/* Edge glow */}
        <div 
          className={`
            absolute inset-0 rounded-lg transition-opacity duration-300
            ${isHovered ? 'opacity-100' : 'opacity-40'}
          `}
          style={{
            boxShadow: 'inset 0 0 20px hsl(var(--primary) / 0.15)',
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-2 sm:p-3">
        {/* Category Icon */}
        <motion.div
          className="mb-2"
          animate={{
            scale: isHovered ? 1.1 : 1,
            y: isHovered ? -2 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <Icon 
            className={`
              w-6 h-6 sm:w-8 sm:h-8
              transition-colors duration-300
              ${isHovered ? 'text-primary' : 'text-primary/60'}
            `}
          />
        </motion.div>

        {/* Status Chip */}
        <div 
          className={`
            px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-system uppercase tracking-wider
            border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}
          `}
        >
          {item.status}
        </div>

        {/* Quantity badge if applicable */}
        {item.quantity && item.quantity > 1 && (
          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary/80 flex items-center justify-center">
            <span className="text-[10px] font-system text-primary-foreground font-bold">
              {item.quantity}
            </span>
          </div>
        )}

        {/* Name label - appears on hover/long-press */}
        <AnimatePresence>
          {showName && (
            <motion.div
              className="absolute bottom-6 left-1 right-1 text-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <span className="text-[10px] sm:text-xs font-light text-muted-foreground/70 truncate block">
                {item.name}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Usage indicator bar */}
        <div className="absolute bottom-2 left-2 right-2">
          <div className="h-1 bg-secondary/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full"
              initial={{ width: `${item.usagePercent}%` }}
              animate={{ 
                width: `${item.usagePercent}%`,
                opacity: isHovered ? 1 : 0.6,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </motion.button>
  );
};

export default InventoryGridItem;
