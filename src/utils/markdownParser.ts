import { marked } from "marked"

export interface ParsedMarkdown {
  prompt?: string
  approach?: string[]
  tools?: string[]
  solution?: string
}

export function parseMarkdownSections(content: string): ParsedMarkdown {
  const tokens = marked.lexer(content)
  const result: ParsedMarkdown = {}

  let currentSection: string | null = null
  let currentContent: string[] = []

  for (const token of tokens) {
    if (token.type === "heading" && token.depth === 2) {
      if (currentSection && currentContent.length > 0) {
        processSection(result, currentSection, currentContent)
      }
      currentSection = token.text.toLowerCase()
      currentContent = []
    } else if (currentSection) {
      if (token.type === "list") {
        currentContent.push(
          ...token.items.map((item: { text: string }) => item.text)
        )
      } else if (token.type === "paragraph") {
        currentContent.push(token.text)
      }
    }
  }

  if (currentSection && currentContent.length > 0) {
    processSection(result, currentSection, currentContent)
  }

  return result
}

function processSection(
  result: ParsedMarkdown,
  section: string,
  content: string[]
) {
  switch (section) {
    case "prompt":
      result.prompt = content.join("\n\n")
      break
    case "approach":
      result.approach = content
      break
    case "tools":
      result.tools = content
      break
    case "solution":
      result.solution = content.join("\n\n")
      break
  }
}
