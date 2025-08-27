import { DifficultyStars } from "./App"
import { Badge } from "./components/ui/badge"
import { useMarkdownContent } from "./hooks/useMarkdownContent"
import Markdown from "react-markdown"
import { useState } from "react"
import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"
import rehypeRaw from "rehype-raw"
import rehypeSanitize, { defaultSchema } from "rehype-sanitize"
import { ChevronDown } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./components/ui/collapsible"

export type TPuzzle = {
  code: string
  title: string
  theme: string
  anchor: string
  difficulty: number
  markdownFile?: string
  isWrittenUp?: boolean
}

const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, "") // "" in dev, "/shagworm-goldbug-2025" in preview/prod

function withUrlBase(url: string | undefined) {
  if (!url) return url
  if (/^https?:\/\//i.test(url)) return url // external
  const cleaned = url.replace(/^(\.\/|\/)/, "") // strip "./" or leading "/"
  return `${BASE_URL}/${cleaned}`
}

// allow a tiny set of tags/attrs you care about
const schema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames || []), "br", "div", "span", "img"],
  attributes: {
    ...(defaultSchema.attributes || {}),
    img: [
      ...(defaultSchema.attributes?.img || []),
      ["src"],
      ["alt"],
      ["width"],
      ["height"],
      ["style"],
      ["className"],
    ],
    div: [["style"], ["className"]],
    span: [["style"], ["className"]],
  },
}

export function PuzzleSection({ p }: { p: TPuzzle }) {
  const markdownContent = useMarkdownContent(p.code, p.markdownFile)
  const [isRawDialogOpen, setIsRawDialogOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const defaultContent = `# ${p.title} Puzzle Writeup

We will write up this puzzle later. If you want the writeup sooner, message us on Discord!`

  const contentToRender = markdownContent || defaultContent
  return (
    <Collapsible
      open={!isCollapsed}
      onOpenChange={(open) => setIsCollapsed(!open)}
    >
      <article
        id={p.anchor}
        key={p.code}
        className={`border border-green-600/40 rounded-sm p-4 bg-green-900/10 ${
          p.isWrittenUp === false ? "opacity-60" : ""
        }`}
      >
        <header className="mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{p.code}</Badge>
            <h3 className="text-3xl text-green-200">{p.title}</h3>
            <span className="px-2 py-0.5 border bg-blue-500/20 text-blue-300 border-blue-400/40 rounded-sm font-mono text-xs">
              {p.theme}
            </span>
            <div className="ml-auto flex items-center gap-2">
              <CollapsibleTrigger asChild>
                <button
                  className="text-xs text-yellow-300 hover:text-pink-400 underline flex items-center gap-1"
                  aria-label={
                    isCollapsed
                      ? "Expand puzzle writeup"
                      : "Collapse puzzle writeup"
                  }
                >
                  {isCollapsed ? "Expand" : "Collapse"}
                  <ChevronDown
                    className={`h-3 w-3 transition-transform duration-200 ${
                      isCollapsed ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </CollapsibleTrigger>
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

        <CollapsibleContent className="CollapsibleContent">
          <div
            className={`space-y-4 ${
              p.isWrittenUp === false ? "max-h-32 overflow-hidden" : ""
            }`}
          >
            <div className="prose prose-invert max-w-none">
              <Markdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                rehypePlugins={[rehypeRaw, [rehypeSanitize, schema]]}
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
                    <ul className="list-disc pl-6 ml-4 space-y-1 text-green-200 mb-4 last:mb-0">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-6 ml-4 space-y-1 text-green-200 mb-4 last:mb-0">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-green-200">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-green-100 font-bold">
                      {children}
                    </strong>
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
                  a: ({ href, children, ...props }) => (
                    <a
                      className="underline text-pink-400 hover:text-yellow-300 mb-3"
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    >
                      {children}
                    </a>
                  ),
                  img: ({ src = "", alt = "", className = "", ...props }) => (
                    <img
                      src={withUrlBase(src)}
                      alt={alt}
                      title={alt}
                      {...props}
                      className={
                        className || "block mx-auto w-full max-w-[32rem] h-auto"
                      }
                    />
                  ),
                  table: ({ ...props }) => (
                    <div className="overflow-x-auto">
                      <table
                        className="table-auto border-collapse border border-gray-400 mx-auto my-4 text-sm"
                        {...props}
                      />
                    </div>
                  ),
                  th: ({ ...props }) => (
                    <th
                      className="border border-gray-400 px-3 py-2 font-semibold bg-transparent"
                      {...props}
                    />
                  ),
                  td: ({ ...props }) => (
                    <td
                      className="border border-gray-400 px-3 py-2"
                      {...props}
                    />
                  ),
                }}
              >
                {contentToRender}
              </Markdown>
            </div>
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
        </CollapsibleContent>
      </article>
    </Collapsible>
  )
}
