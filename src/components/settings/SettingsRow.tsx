/* ═══════════════════════════════════════════════════════════════════════════
   SETTINGS ROW - Individual setting item with label and control
═══════════════════════════════════════════════════════════════════════════ */

interface SettingsRowProps {
  label: string;
  description?: string;
  children: React.ReactNode;
}

export const SettingsRow = ({ label, description, children }: SettingsRowProps) => {
  return (
    <div className="flex items-center justify-between gap-4 px-1">
      <div className="flex-1 min-w-0">
        <span className="font-system text-[10px] text-foreground/70 tracking-wide block">
          {label}
        </span>
        {description && (
          <span className="font-system text-[9px] text-muted-foreground/60 tracking-wide block mt-0.5">
            {description}
          </span>
        )}
      </div>
      <div className="flex-shrink-0">
        {children}
      </div>
    </div>
  );
};
