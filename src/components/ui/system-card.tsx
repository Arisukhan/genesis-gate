import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════════════════════
   SYSTEM CARD - Base card component with theme-aware variants
   All styling comes from design tokens - no hardcoded values
═══════════════════════════════════════════════════════════════════════════ */

const systemCardVariants = cva(
  "system-card p-card-padding sm:p-card-padding transition-all",
  {
    variants: {
      variant: {
        default: "",
        warning: "system-card-warning",
        danger: "system-card-danger",
        success: "system-card-success",
        muted: "system-card-muted",
      },
      size: {
        sm: "p-card-padding-sm",
        md: "p-card-padding",
        lg: "p-6 sm:p-8",
      },
      cornerSize: {
        sm: "system-card-sm",
        md: "",
        lg: "system-card-lg",
        xl: "system-card-xl",
      },
      interactive: {
        true: "cursor-pointer hover:scale-[1.01]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      cornerSize: "md",
      interactive: false,
    },
  }
);

export interface SystemCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof systemCardVariants> {
  asChild?: boolean;
}

const SystemCard = React.forwardRef<HTMLDivElement, SystemCardProps>(
  ({ className, variant, size, cornerSize, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(systemCardVariants({ variant, size, cornerSize, interactive }), className)}
      {...props}
    />
  )
);
SystemCard.displayName = "SystemCard";

/* ═══════════════════════════════════════════════════════════════════════════
   SYSTEM CARD HEADER
═══════════════════════════════════════════════════════════════════════════ */

const SystemCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1.5 mb-4", className)}
    {...props}
  />
));
SystemCardHeader.displayName = "SystemCardHeader";

/* ═══════════════════════════════════════════════════════════════════════════
   SYSTEM CARD TITLE
═══════════════════════════════════════════════════════════════════════════ */

const SystemCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-system text-foreground text-lg sm:text-xl tracking-system uppercase text-center",
      className
    )}
    {...props}
  />
));
SystemCardTitle.displayName = "SystemCardTitle";

/* ═══════════════════════════════════════════════════════════════════════════
   SYSTEM CARD DIVIDER
═══════════════════════════════════════════════════════════════════════════ */

const SystemCardDivider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("system-divider my-4 sm:my-6", className)}
    {...props}
  />
));
SystemCardDivider.displayName = "SystemCardDivider";

/* ═══════════════════════════════════════════════════════════════════════════
   SYSTEM CARD CONTENT
═══════════════════════════════════════════════════════════════════════════ */

const SystemCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 flex flex-col", className)}
    {...props}
  />
));
SystemCardContent.displayName = "SystemCardContent";

/* ═══════════════════════════════════════════════════════════════════════════
   SYSTEM CARD FOOTER
═══════════════════════════════════════════════════════════════════════════ */

const SystemCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-auto pt-4 text-center", className)}
    {...props}
  />
));
SystemCardFooter.displayName = "SystemCardFooter";

/* ═══════════════════════════════════════════════════════════════════════════
   SYSTEM CARD HINT - "TAP TO EXPAND" style hints
═══════════════════════════════════════════════════════════════════════════ */

const SystemCardHint = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "text-primary/40 text-[10px] sm:text-xs font-system tracking-wider opacity-0 group-hover:opacity-100 transition-opacity",
      className
    )}
    {...props}
  />
));
SystemCardHint.displayName = "SystemCardHint";

export {
  SystemCard,
  SystemCardHeader,
  SystemCardTitle,
  SystemCardDivider,
  SystemCardContent,
  SystemCardFooter,
  SystemCardHint,
  systemCardVariants,
};
