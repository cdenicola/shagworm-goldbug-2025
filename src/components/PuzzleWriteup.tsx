import { TPuzzle } from "../puzzle"
import { Badge } from "./ui/badge"
import { DifficultyStars } from "../App"

interface PuzzleWriteupProps {
  puzzle: TPuzzle
  onBackToIndex: () => void
  onNavigateToPuzzle: (puzzleCode: string) => void
  allPuzzles: TPuzzle[]
}

export function PuzzleWriteup({
  puzzle,
  onBackToIndex,
  onNavigateToPuzzle,
  allPuzzles,
}: PuzzleWriteupProps) {
  const currentIndex = allPuzzles.findIndex((p) => p.code === puzzle.code)
  const prevPuzzle = currentIndex > 0 ? allPuzzles[currentIndex - 1] : null
  const nextPuzzle =
    currentIndex < allPuzzles.length - 1 ? allPuzzles[currentIndex + 1] : null

  const defaultContent = `# ${puzzle.title} Puzzle Writeup

We will write up this puzzle later. If you want the writeup sooner, message us on Discord!`

  return (
    <div className={`mx-auto max-w-4xl px-4 py-6 ${
      puzzle.isWrittenUp === false ? 'opacity-60' : ''
    }`}>
      <div className="mb-6">
        <button
          onClick={onBackToIndex}
          className="text-pink-400 hover:text-yellow-300 underline mb-4"
        >
          ← Back to Index
        </button>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Badge>{puzzle.code}</Badge>
            <h1 className={`text-3xl ${
              puzzle.isWrittenUp === false ? 'text-gray-400' : 'text-green-200'
            }`}>{puzzle.title}</h1>
            <Badge color="bg-blue-500/20 text-blue-300 border-blue-400/40">
              {puzzle.theme}
            </Badge>
          </div>
          <DifficultyStars level={puzzle.difficulty} size="text-xl" />
        </div>
      </div>

      <article className="prose prose-invert max-w-none">
        <div className="space-y-4 text-green-200">
          <div className="whitespace-pre-line">{defaultContent}</div>
        </div>
      </article>

      <nav className="mt-8 flex justify-between items-center border-t border-green-600/40 pt-4">
        <div>
          {prevPuzzle && (
            <button
              onClick={() => onNavigateToPuzzle(prevPuzzle.code)}
              className="text-pink-400 hover:text-yellow-300 underline"
            >
              ← {prevPuzzle.code}: {prevPuzzle.title}
            </button>
          )}
        </div>
        <div>
          {nextPuzzle && (
            <button
              onClick={() => onNavigateToPuzzle(nextPuzzle.code)}
              className="text-pink-400 hover:text-yellow-300 underline"
            >
              {nextPuzzle.code}: {nextPuzzle.title} →
            </button>
          )}
        </div>
      </nav>
    </div>
  )
}
