import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import CategoryRail from "./CategoryRail";
import InventoryGridItem from "./InventoryGridItem";
import { CATEGORIES, SAMPLE_INVENTORY, ItemCategory, InventoryItem } from "./types";

interface InventoryPageProps {
  onClose: () => void;
}

const InventoryPage = ({ onClose }: InventoryPageProps) => {
  const [activeCategory, setActiveCategory] = useState<ItemCategory | 'all'>('all');

  const filteredItems = activeCategory === 'all' 
    ? SAMPLE_INVENTORY 
    : SAMPLE_INVENTORY.filter(item => item.category === activeCategory);

  const handleItemClick = (item: InventoryItem) => {
    // Future: Open detail card
    console.log('Item clicked:', item.name);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 system-background overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/2 rounded-full blur-3xl" />
        </div>

        {/* Main content container */}
        <div className="relative z-10 h-full flex flex-col">
          {/* ═══════════════════════════════════════════════════════════════
              HEADER
          ═══════════════════════════════════════════════════════════════ */}
          <motion.header
            className="flex-shrink-0 pt-4 px-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {/* Back button */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 group flex items-center gap-2 z-20"
            >
              <div className="w-10 h-10 rounded-full bg-secondary/40 border border-primary/30 flex items-center justify-center transition-all duration-300 group-hover:border-primary/60 group-hover:shadow-glow-md">
                <ArrowLeft className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
              </div>
            </button>

            {/* Title section */}
            <div className="text-center pt-2 pb-4">
              <motion.h1
                className="font-system text-2xl sm:text-3xl text-foreground tracking-widest uppercase"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                INVENTORY
              </motion.h1>
              
              {/* Animated divider */}
              <motion.div
                className="w-32 sm:w-48 h-px mx-auto mt-3 bg-gradient-to-r from-transparent via-primary/60 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
              
              <motion.p
                className="font-system text-[10px] sm:text-xs text-primary/50 tracking-wider mt-2 uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Asset Management System
              </motion.p>
            </div>
          </motion.header>

          {/* ═══════════════════════════════════════════════════════════════
              CATEGORY RAIL
          ═══════════════════════════════════════════════════════════════ */}
          <motion.div
            className="flex-shrink-0 px-2 sm:px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <CategoryRail
              categories={CATEGORIES}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </motion.div>

          {/* ═══════════════════════════════════════════════════════════════
              INVENTORY GRID
          ═══════════════════════════════════════════════════════════════ */}
          <motion.div
            className="flex-1 overflow-y-auto px-4 py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ 
                      delay: index * 0.03,
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }}
                    layout
                  >
                    <InventoryGridItem
                      item={item}
                      onClick={() => handleItemClick(item)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Empty state */}
            {filteredItems.length === 0 && (
              <motion.div
                className="flex flex-col items-center justify-center h-64"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-16 h-16 rounded-full bg-secondary/30 border border-primary/20 flex items-center justify-center mb-4">
                  <span className="text-2xl">📦</span>
                </div>
                <p className="font-system text-sm text-muted-foreground tracking-wider">
                  NO ITEMS IN THIS CATEGORY
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* ═══════════════════════════════════════════════════════════════
              FOOTER INFO
          ═══════════════════════════════════════════════════════════════ */}
          <motion.footer
            className="flex-shrink-0 px-4 py-3 border-t border-primary/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-system text-[10px] sm:text-xs text-primary/40 tracking-wider">
                {filteredItems.length} ITEMS
              </span>
              <span className="font-system text-[10px] sm:text-xs text-primary/30 tracking-wider">
                {activeCategory === 'all' ? 'ALL CATEGORIES' : activeCategory.toUpperCase()}
              </span>
            </div>
          </motion.footer>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InventoryPage;
