import { DifficultyStars } from "./App"
import { Badge } from "./components/ui/badge"
import { useMarkdownContent } from "./hooks/useMarkdownContent"
import Markdown from "react-markdown"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog"

export type TArtifact = {
  type: "image" | "file"
  url: string
  description?: string
}

export type TPuzzle = {
  code: string
  title: string
  theme: string
  anchor: string
  difficulty: number
  artifacts?: TArtifact[]
  markdownFile?: string
}

export function PuzzleSection({ p }: { p: TPuzzle }) {
  const markdownContent = useMarkdownContent(p.code, p.markdownFile)
  const [isRawDialogOpen, setIsRawDialogOpen] = useState(false)

  const defaultContent = `# ${p.title} Puzzle Writeup

## Prompt
Paste the puzzle prompt summary here (no copyrighted text verbatim).

## Approach
- Step 1: Describe the initial approach
- Step 2: Explain the methodology used
- Step 3: Detail any iterations or refinements

## Tools
- Tool 1: Description of tool usage
- Tool 2: Additional tools used
- Tool 3: Any other relevant tools

## Solution
Final answer phrase and steps to get there.`

  const contentToRender = markdownContent || defaultContent

  return (
    <article
      id={p.anchor}
      key={p.code}
      className="border border-green-600/40 rounded-sm p-4 bg-green-900/10"
    >
      <header className="mb-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{p.code}</Badge>
          <h3 className="text-3xl text-green-200">{p.title}</h3>
          <span className="px-2 py-0.5 border bg-blue-500/20 text-blue-300 border-blue-400/40 rounded-sm font-mono text-xs">
            {p.theme}
          </span>
          <div className="ml-auto flex items-center gap-2">
            <Dialog open={isRawDialogOpen} onOpenChange={setIsRawDialogOpen}>
              <DialogTrigger asChild>
                <button className="text-xs text-yellow-300 hover:text-pink-400 underline">
                  View Raw
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
                <DialogHeader>
                  <DialogTitle>{p.code} - Raw Markdown</DialogTitle>
                </DialogHeader>
                <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-4 rounded text-black">
                  {contentToRender}
                </pre>
              </DialogContent>
            </Dialog>
            <DifficultyStars level={p.difficulty} size="text-xl" />
          </div>
        </div>
      </header>

      <div className="space-y-4">
        <div className="prose prose-invert max-w-none">
          <Markdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-yellow-300 text-2xl font-bold mb-4">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-yellow-300 text-xl font-bold mb-3 mt-6">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-yellow-300 text-lg font-bold mb-2 mt-4">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-green-200 mb-3">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-6 space-y-1 text-green-200">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-6 space-y-1 text-green-200">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-green-200">{children}</li>
              ),
              strong: ({ children }) => (
                <strong className="text-green-100 font-bold">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="text-green-100 italic">{children}</em>
              ),
              code: ({ children }) => (
                <code className="bg-green-800/30 px-1 py-0.5 rounded text-green-100">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-green-800/30 p-3 rounded overflow-x-auto">
                  {children}
                </pre>
              ),
            }}
          >
            {contentToRender}
          </Markdown>
        </div>

        {p.artifacts && p.artifacts.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-yellow-300 text-xl mt-6">Artifacts</h4>
            <div className="text-green-200">
              {p.artifacts.map((a, i) => (
                <div key={a.url}>
                  Artifact {i + 1}:
                  {a.type === "image" && (
                    <img src={a.url} alt={a.description || a.url} />
                  )}
                  {a.description || a.url}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="mt-4 text-sm">
        Back to{" "}
        <a
          className="underline text-pink-400 hover:text-yellow-300"
          href="#top"
        >
          Top
        </a>{" "}
        •{" "}
        <a
          className="underline text-yellow-300 hover:text-pink-400"
          href="https://goldbug.cryptovillage.org"
          target="_blank"
          rel="noreferrer"
        >
          CPV BBS
        </a>
      </footer>
    </article>
  )
}
