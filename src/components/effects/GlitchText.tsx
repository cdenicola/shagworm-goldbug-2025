import type { ReactNode, ElementType } from "react";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  text?: string;
};

export default function GlitchText({ as: Tag = "span", children, className, text }: Props) {
  const content = typeof text === "string" ? text : (typeof children === "string" ? (children as string) : "");
  return (
    <Tag className={`glitch ${className || ""}`} data-glitch={content}>
      {children}
    </Tag>
  );
}
