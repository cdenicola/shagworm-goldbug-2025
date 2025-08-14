import * as React from "react"

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ")
}

export interface CitationAsideProps
  extends React.HTMLAttributes<HTMLDivElement> {
  side: "left" | "right"
  children: React.ReactNode
}

const CitationAside = React.forwardRef<HTMLDivElement, CitationAsideProps>(
  ({ side, className, children, ...props }, ref) => {
    const sideClasses =
      side === "left" ? "left-4 md:left-8" : "right-4 md:right-8"

    return (
      <div
        ref={ref}
        className={cn(
          "fixed top-1/2 -translate-y-1/2 z-10 max-w-xs w-64",
          "border border-green-600/40 rounded-sm p-3 bg-green-900/10",
          "text-green-200 font-mono text-sm leading-relaxed",
          "shadow-lg backdrop-blur-sm",
          "hidden lg:block",
          sideClasses,
          className
        )}
        {...props}
      >
        <div className="text-yellow-300 text-xs mb-2 uppercase tracking-wide">
          Citation
        </div>
        {children}
      </div>
    )
  }
)

CitationAside.displayName = "CitationAside"

export { CitationAside }
