interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  barClassName?: string;
}

/**
 * Base primitive for progress bars with dynamic width.
 * Inline styles allowed here per STYLING.md - base uikit layer handles visual styling.
 */
export function ProgressBar({
  value,
  max = 100,
  className = '',
  barClassName = '',
}: ProgressBarProps) {
  const percentage = Math.min(100, (value / max) * 100);

  return (
    <div className={`w-full bg-muted rounded-full h-1.5 ${className}`.trim()}>
      <div
        className={`h-1.5 rounded-full ${barClassName}`.trim()}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
