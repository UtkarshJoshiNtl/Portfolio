type Props = {
  letter: string;
  className?: string;
};

export function OrnamentalDropCap({ letter, className = "" }: Props) {
  return <span className={`ornament-dropcap ${className}`}>{letter}</span>;
}
