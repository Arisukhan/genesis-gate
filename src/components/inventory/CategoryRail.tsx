import { motion } from "framer-motion";
import { Grid3X3, FlaskConical, Shield, Gem, Key, Star, Zap } from "lucide-react";
import { CategoryOption, ItemCategory } from "./types";

interface CategoryRailProps {
  categories: CategoryOption[];
  activeCategory: ItemCategory | 'all';
  onCategoryChange: (category: ItemCategory | 'all') => void;
}

const iconMap: Record<string, React.ElementType> = {
  Grid3X3,
  Flask: FlaskConical,
  Shield,
  Gem,
  Key,
  Star,
  Zap,
};

const CategoryRail = ({ categories, activeCategory, onCategoryChange }: CategoryRailProps) => {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide py-2">
      <div className="flex gap-2 px-2 min-w-max">
        {categories.map((category) => {
          const Icon = iconMap[category.icon];
          const isActive = activeCategory === category.id;

          return (
            <motion.button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`
                relative flex items-center gap-2 px-4 py-2 rounded-full
                font-system text-xs tracking-wider uppercase
                transition-all duration-300
                backdrop-blur-md border
                ${isActive
                  ? 'bg-primary/20 border-primary/60 text-primary shadow-glow-md'
                  : 'bg-secondary/30 border-primary/20 text-muted-foreground hover:border-primary/40 hover:text-primary/80'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Active pulse animation */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/10"
                  animate={{ 
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
              
              {/* Animated border for active state */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full border border-primary/40"
                  animate={{ 
                    boxShadow: [
                      '0 0 10px hsl(var(--primary) / 0.2)',
                      '0 0 20px hsl(var(--primary) / 0.4)',
                      '0 0 10px hsl(var(--primary) / 0.2)',
                    ]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}

              <Icon className="w-4 h-4 relative z-10" />
              <span className="relative z-10 hidden sm:inline">{category.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryRail;
