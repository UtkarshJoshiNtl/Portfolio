import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
};

export function OrnamentRule({ children, className = "" }: Props) {
  return (
    <div className={`ornament-rule ${className}`}>
      {children && <span className="ornament-rule-icon">{children}</span>}
    </div>
  );
}
