import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════════════
   SETTINGS TOGGLE - Consistent toggle switch for settings
═══════════════════════════════════════════════════════════════════════════ */

interface SettingsToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const SettingsToggle = ({ checked, onCheckedChange, disabled }: SettingsToggleProps) => {
  return (
    <button
      onClick={() => !disabled && onCheckedChange(!checked)}
      disabled={disabled}
      className={`
        relative w-10 h-5 rounded-full transition-all duration-normal
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
        ${checked 
          ? 'bg-primary/30 border border-primary/60' 
          : 'bg-secondary/50 border border-primary/20'
        }
      `}
    >
      <motion.div
        initial={false}
        animate={{ x: checked ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`
          absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full transition-colors
          ${checked ? 'bg-primary shadow-glow-sm' : 'bg-muted-foreground/60'}
        `}
      />
    </button>
  );
};
