import React, { useState, useEffect, useMemo } from "react"

interface DecryptedTextProps {
  text: string
  isVisible: boolean
  speed?: number
  scrambleChars?: string
  className?: string
  onComplete?: () => void
}

const DEFAULT_SCRAMBLE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"

export function DecryptedText({
  text,
  isVisible,
  speed = 60,
  scrambleChars = DEFAULT_SCRAMBLE_CHARS,
  className = "",
  onComplete,
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [revealedCount, setRevealedCount] = useState(0)

  const scrambledChars = useMemo(() => {
    return Array.from(
      { length: text.length },
      () => scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
    )
  }, [text, scrambleChars])

  useEffect(() => {
    if (!isVisible) {
      setDisplayText("")
      setRevealedCount(0)
      return
    }

    setDisplayText(scrambledChars.join(""))
    setRevealedCount(0)

    const revealInterval = setInterval(() => {
      setRevealedCount((prev) => {
        const next = prev + 1
        if (next >= text.length) {
          clearInterval(revealInterval)
          onComplete?.()
          return text.length
        }
        return next
      })
    }, speed)

    return () => clearInterval(revealInterval)
  }, [isVisible, text, scrambledChars, speed, onComplete])

  useEffect(() => {
    if (revealedCount > 0) {
      const revealed = text.slice(0, revealedCount)
      const stillScrambled = scrambledChars.slice(revealedCount).join("")
      setDisplayText(revealed + stillScrambled)
    }
  }, [revealedCount, text, scrambledChars])

  if (!isVisible && !displayText) {
    return null
  }

  return (
    <span className={`decrypted-text ${className}`}>
      {Array.from(displayText).map((char, index) => (
        <span
          key={`${text}-${index}`}
          className={`decrypted-char ${index < revealedCount ? "revealed" : "scrambled"}`}
          style={{
            animationDelay: `${index * (speed / 1000)}s`,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  )
}
