import { TPuzzle } from "../puzzle"
import { Badge } from "./ui/badge"
import { DifficultyStars } from "../App"

interface PuzzleIndexProps {
  puzzles: TPuzzle[]
  onNavigateToWriteup: (puzzleCode: string) => void
  onBackToMain: () => void
}

export function PuzzleIndex({
  puzzles,
  onNavigateToWriteup,
  onBackToMain,
}: PuzzleIndexProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-6">
        <button
          onClick={onBackToMain}
          className="text-pink-400 hover:text-yellow-300 underline mb-4"
        >
          ← Back to Main Page
        </button>
        <h1 className="text-3xl text-green-200 mb-2">
          <span className="inline mr-2 text-yellow-300" aria-hidden>
            📚
          </span>
          Puzzle Writeups Index
        </h1>
        <p className="text-green-200">
          Click on any puzzle below to read the detailed writeup.
        </p>
      </div>

      <div className="grid gap-3">
        {puzzles.map((puzzle) => (
          <button
            key={puzzle.code}
            onClick={() => onNavigateToWriteup(puzzle.code)}
            className={`text-left border border-green-600/40 rounded-sm p-4 bg-green-900/10 hover:bg-green-900/20 transition-colors ${
              puzzle.isWrittenUp === false ? 'opacity-50' : ''
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Badge>{puzzle.code}</Badge>
                <div>
                  <h3 className={`text-xl ${
                    puzzle.isWrittenUp === false ? 'text-gray-400' : 'text-green-200'
                  }`}>{puzzle.title}</h3>
                  <p className={`text-sm ${
                    puzzle.isWrittenUp === false ? 'text-gray-500' : 'text-green-300'
                  }`}>Theme: {puzzle.theme}</p>
                </div>
              </div>
              <DifficultyStars level={puzzle.difficulty} size="text-lg" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
