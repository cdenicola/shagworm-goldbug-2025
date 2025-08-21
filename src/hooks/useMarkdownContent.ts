import { useState, useEffect } from "react"

export function useMarkdownContent(
  puzzleCode: string,
  markdownFile?: string
): string | null {
  const [content, setContent] = useState<string | null>(null)

  useEffect(() => {
    if (!markdownFile) {
      setContent(null)
      return
    }

    const loadMarkdown = async () => {
      try {
        const response = await fetch(`/shagworm-goldbug-2025/${markdownFile}`)
        if (!response.ok) {
          throw new Error(`Failed to fetch ${markdownFile}: ${response.status}`)
        }
        const markdownContent = await response.text()
        setContent(markdownContent)
      } catch (error) {
        console.warn(`Failed to load markdown for ${puzzleCode}:`, error)
        setContent(null)
      }
    }

    loadMarkdown()
  }, [puzzleCode, markdownFile])

  return content
}
