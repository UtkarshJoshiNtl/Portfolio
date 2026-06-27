type Props = {
  label: string;
  className?: string;
};

export function SectionHeader({ label, className = "" }: Props) {
  return (
    <div className={`flex items-center gap-3 mb-5 ${className}`}>
      <span className="text-small font-mono text-foreground-secondary uppercase tracking-[0.15em]" style={{ fontVariationSettings: '"MONO" 1, "CASL" 0' }}>
        {label}
      </span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}
