const metrics = [
  { value: "05", label: "PROJECTS" },
  { value: "06", label: "CAPABILITIES" },
  { value: "20+", label: "TECHNOLOGIES" },
];

export function RightRail() {
  return (
    <aside className="hud-right-rail" aria-label="Portfolio metrics">
      {metrics.map((metric) => (
        <div key={metric.label} className="hud-metric">
          <span className="hud-metric-value">
            {metric.value}
          </span>

          <span className="hud-metric-label">
            {metric.label}
          </span>
        </div>
      ))}
    </aside>
  );
}