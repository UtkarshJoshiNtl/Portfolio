type Props = {
  label: string;
  className?: string;
};

export function SectionHeader({ label, className = "" }: Props) {
  return (
    <div className={`section-header ${className}`}>
      <span className="section-header-label">{label}</span>
      <div className="section-header-line" />
    </div>
  );
}
