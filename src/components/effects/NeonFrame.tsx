import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function NeonFrame({ children, className }: Props) {
  return (
    <div className={`neon-frame ${className || ""}`}>
      {children}
    </div>
  );
}
