
type Props = {
  className?: string;
};

export default function CRTOverlay({ className }: Props) {
  return (
    <div
      className={`crt scanlines vignette ${className || ""}`}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1
      }}
      aria-hidden="true"
    />
  );
}
