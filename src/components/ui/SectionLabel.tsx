interface SectionLabelProps {
  number: string;
  children: string;
}

export function SectionLabel({
  number,
  children,
}: SectionLabelProps) {
  return (
    <div className="section-label">
      <span className="section-number">{number}</span>

      <span className="section-label-text">
        {children}
      </span>
    </div>
  );
}