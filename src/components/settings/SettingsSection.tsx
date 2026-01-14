import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════════
   SETTINGS SECTION - Expandable section container for settings groups
═══════════════════════════════════════════════════════════════════════════ */

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export const SettingsSection = ({ title, children, defaultExpanded = false }: SettingsSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="w-full border-b border-primary/10 last:border-b-0">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-3 group"
      >
        <span className="font-system text-[11px] text-foreground/80 tracking-wider uppercase group-hover:text-primary transition-colors">
          {title}
        </span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors" />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4 space-y-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
