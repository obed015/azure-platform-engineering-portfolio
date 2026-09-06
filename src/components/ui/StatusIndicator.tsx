type StatusTone =
  | "success"
  | "warning"
  | "critical"
  | "azure";

interface StatusIndicatorProps {
  label: string;
  tone?: StatusTone;
}

export function StatusIndicator({
  label,
  tone = "success",
}: StatusIndicatorProps) {
  return (
    <span className="status-indicator">
      <span
        className={`status-indicator-dot status-${tone}`}
      />

      <span>{label}</span>
    </span>
  );
}