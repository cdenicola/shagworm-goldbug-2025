import { TPuzzle } from "../puzzle"
import { Switch } from "./ui/switch"

interface PuzzleNavigationProps {
  puzzles: TPuzzle[]
  currentPuzzleIndex: number
  isSolvedOrder: boolean
  onToggleOrder: () => void
  onNavigateToPuzzle: (index: number) => void
}

export function PuzzleNavigation({
  puzzles,
  currentPuzzleIndex,
  isSolvedOrder,
  onToggleOrder,
  onNavigateToPuzzle,
}: PuzzleNavigationProps) {
  return (
    <nav className="sticky top-0 z-40 bg-green-900/95 backdrop-blur-sm border-b border-green-600/40 p-3">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-yellow-300 font-mono text-sm">
              {isSolvedOrder ? "🕰️ Solved Order" : "🗺️ Site Order"}
            </span>
            <Switch
              checked={isSolvedOrder}
              onCheckedChange={onToggleOrder}
              className="data-[state=checked]:bg-yellow-500 data-[state=unchecked]:bg-green-600"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-1">
          {puzzles.map((puzzle, index) => (
            <button
              key={puzzle.code}
              onClick={() => onNavigateToPuzzle(index)}
              className={`px-2 py-1 border rounded-sm font-mono text-xs transition-colors ${
                puzzle.isWrittenUp === false ? 'opacity-50' : ''
              } ${
                index === currentPuzzleIndex
                  ? "border-yellow-400 text-yellow-300 bg-yellow-900/20"
                  : `border-green-600/40 hover:bg-green-900/20 ${
                      puzzle.isWrittenUp === false ? 'text-gray-400' : 'text-green-200'
                    }`
              }`}
            >
              {puzzle.code}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
