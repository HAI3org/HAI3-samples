import type { ReactNode } from 'react';

interface PositionedTooltipProps {
  children: ReactNode;
  /** Horizontal position as percentage (0-100) */
  leftPercent: number;
  className?: string;
}

/**
 * Base primitive for tooltips with dynamic horizontal positioning.
 * Inline styles allowed here per STYLING.md - base uikit layer handles visual styling.
 */
export function PositionedTooltip({
  children,
  leftPercent,
  className = '',
}: PositionedTooltipProps) {
  return (
    <div
      className={`absolute bottom-full mb-2 -translate-x-1/2 px-2 py-1 bg-popover border border-border rounded shadow-lg text-xs whitespace-nowrap z-10 pointer-events-none ${className}`.trim()}
      style={{ left: `${leftPercent}%` }}
    >
      {children}
    </div>
  );
}
