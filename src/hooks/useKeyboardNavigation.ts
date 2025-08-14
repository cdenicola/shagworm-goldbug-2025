import { useState, useEffect, useCallback } from "react"
import { TPuzzle } from "../puzzle"

interface UseKeyboardNavigationProps {
  puzzles: TPuzzle[]
}

interface UseKeyboardNavigationReturn {
  showHelp: boolean
  hasScrolled: boolean
  handleKeyDown: (event: KeyboardEvent) => void
  handleKeyUp: (event: KeyboardEvent) => void
  handleScroll: () => void
  navigateToFirstPuzzle: () => void
  navigateToPuzzle: (index: number) => void
}

export function useKeyboardNavigation({
  puzzles,
}: UseKeyboardNavigationProps): UseKeyboardNavigationReturn {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [keySequence, setKeySequence] = useState("")
  const [keySequenceTimeout, setKeySequenceTimeout] =
    useState<NodeJS.Timeout | null>(null)
  const [showHelp, setShowHelp] = useState(false)
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set())
  const [scrollAnimationId, setScrollAnimationId] = useState<number | null>(
    null
  )

  const navigateToFirstPuzzle = useCallback(() => {
    const firstPuzzleAnchor = puzzles[0]?.anchor
    if (firstPuzzleAnchor) {
      const element = document.getElementById(firstPuzzleAnchor)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [puzzles])

  const navigateToPuzzle = useCallback(
    (index: number) => {
      if (index >= 0 && index < puzzles.length) {
        const puzzleAnchor = puzzles[index]?.anchor
        if (puzzleAnchor) {
          const element = document.getElementById(puzzleAnchor)
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
          }
        }
      }
    },
    [puzzles]
  )

  const showHelpToast = useCallback(() => {
    setShowHelp(true)
    setTimeout(() => setShowHelp(false), 4000)
  }, [])

  const getCurrentVisiblePuzzleIndex = useCallback(() => {
    const viewportCenter = window.scrollY + window.innerHeight / 2

    for (let i = 0; i < puzzles.length; i++) {
      const element = document.getElementById(puzzles[i].anchor)
      if (element) {
        const rect = element.getBoundingClientRect()
        const elementTop = window.scrollY + rect.top
        const elementBottom = elementTop + rect.height

        if (viewportCenter >= elementTop && viewportCenter <= elementBottom) {
          return i
        }
      }
    }

    let closestIndex = 0
    let closestDistance = Infinity

    for (let i = 0; i < puzzles.length; i++) {
      const element = document.getElementById(puzzles[i].anchor)
      if (element) {
        const rect = element.getBoundingClientRect()
        const elementTop = window.scrollY + rect.top
        const distance = Math.abs(viewportCenter - elementTop)

        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = i
        }
      }
    }

    return closestIndex
  }, [puzzles])

  const startSmoothScroll = useCallback(
    (direction: "up" | "down") => {
      if (scrollAnimationId) {
        cancelAnimationFrame(scrollAnimationId)
      }

      const scroll = () => {
        const scrollAmount = direction === "down" ? 25 : -25
        window.scrollBy(0, scrollAmount)

        if (pressedKeys.has("j") || pressedKeys.has("k")) {
          const newAnimationId = requestAnimationFrame(scroll)
          setScrollAnimationId(newAnimationId)
        }
      }

      const animationId = requestAnimationFrame(scroll)
      setScrollAnimationId(animationId)
    },
    [pressedKeys, scrollAnimationId]
  )

  const stopSmoothScroll = useCallback(() => {
    if (scrollAnimationId) {
      cancelAnimationFrame(scrollAnimationId)
      setScrollAnimationId(null)
    }
  }, [scrollAnimationId])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (showHelp) {
        setShowHelp(false)
        return
      }

      if (!hasScrolled && event.key === "Enter") {
        navigateToFirstPuzzle()
        setHasScrolled(true)
        return
      }

      if (event.key === "G") {
        event.preventDefault()
        const maxHeight = Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight
        )
        window.scrollTo({
          top: maxHeight,
          behavior: "smooth",
        })
        setKeySequence("")
        if (keySequenceTimeout) {
          clearTimeout(keySequenceTimeout)
          setKeySequenceTimeout(null)
        }
        return
      }

      const key = event.key.toLowerCase()

      switch (key) {
        case "j":
          event.preventDefault()
          if (!pressedKeys.has("j")) {
            setPressedKeys((prev) => new Set(prev).add("j"))
            startSmoothScroll("down")
          }
          break
        case "k":
          event.preventDefault()
          if (!pressedKeys.has("k")) {
            setPressedKeys((prev) => new Set(prev).add("k"))
            startSmoothScroll("up")
          }
          break
        case "h": {
          event.preventDefault()
          const currentIndex = getCurrentVisiblePuzzleIndex()
          navigateToPuzzle(Math.max(0, currentIndex - 1))
          break
        }
        case "l": {
          event.preventDefault()
          const currentIndexL = getCurrentVisiblePuzzleIndex()
          navigateToPuzzle(Math.min(puzzles.length, currentIndexL + 1))
          break
        }
        case "g":
          if (keySequenceTimeout) {
            clearTimeout(keySequenceTimeout)
          }

          if (keySequence === "g") {
            event.preventDefault()
            window.scrollTo({ top: 0, behavior: "smooth" })
            setKeySequence("")
            setKeySequenceTimeout(null)
          } else {
            setKeySequence("g")
            const timeout = setTimeout(() => {
              setKeySequence("")
              setKeySequenceTimeout(null)
            }, 1000)
            setKeySequenceTimeout(timeout)
          }
          break
        case "?":
          event.preventDefault()
          showHelpToast()
          break
        default:
          setKeySequence("")
          if (keySequenceTimeout) {
            clearTimeout(keySequenceTimeout)
            setKeySequenceTimeout(null)
          }
          break
      }
    },
    [
      hasScrolled,
      keySequence,
      keySequenceTimeout,
      navigateToFirstPuzzle,
      getCurrentVisiblePuzzleIndex,
      navigateToPuzzle,
      showHelpToast,
      showHelp,
      pressedKeys,
      startSmoothScroll,
      puzzles.length,
    ]
  )

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()

      if (key === "j" || key === "k") {
        setPressedKeys((prev) => {
          const newSet = new Set(prev)
          newSet.delete(key)
          return newSet
        })

        if (!pressedKeys.has("j") && !pressedKeys.has("k")) {
          stopSmoothScroll()
        }
      }
    },
    [pressedKeys, stopSmoothScroll]
  )

  const handleScroll = useCallback(() => {
    if (!hasScrolled && window.scrollY > 0) {
      setHasScrolled(true)
    }
  }, [hasScrolled])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      window.removeEventListener("scroll", handleScroll)
      if (keySequenceTimeout) {
        clearTimeout(keySequenceTimeout)
      }
      if (scrollAnimationId) {
        cancelAnimationFrame(scrollAnimationId)
      }
    }
  }, [
    handleKeyDown,
    handleKeyUp,
    handleScroll,
    keySequenceTimeout,
    scrollAnimationId,
  ])

  return {
    showHelp,
    hasScrolled,
    handleKeyDown,
    handleKeyUp,
    handleScroll,
    navigateToFirstPuzzle,
    navigateToPuzzle,
  }
}
