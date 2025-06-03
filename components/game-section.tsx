"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/context/language-context"

const GameSection = () => {
  const { translations } = useLanguage()
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [targets, setTargets] = useState<{ id: number; x: number; y: number }[]>([])
  const gameAreaRef = useRef<HTMLDivElement>(null)

  const startGame = () => {
    setGameStarted(true)
    setScore(0)
    setTimeLeft(30)
    setTargets([])
  }

  const handleTargetClick = (id: number) => {
    setScore((prevScore) => prevScore + 1)
    setTargets((prevTargets) => prevTargets.filter((target) => target.id !== id))
  }

  useEffect(() => {
    if (!gameStarted) return

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          setGameStarted(false)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStarted])

  useEffect(() => {
    if (!gameStarted || !gameAreaRef.current) return

    const createTarget = () => {
      if (!gameAreaRef.current) return

      const { width, height } = gameAreaRef.current.getBoundingClientRect()

      const newTarget = {
        id: Date.now(),
        x: Math.random() * (width - 50),
        y: Math.random() * (height - 50),
      }

      setTargets((prevTargets) => [...prevTargets, newTarget])
    }

    const targetInterval = setInterval(createTarget, 1000)

    return () => clearInterval(targetInterval)
  }, [gameStarted])

  return (
    <div className="container">
      <div className="mb-10 text-center">
        <h2 className="mb-2 text-3xl font-bold">{translations.game.title}</h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">{translations.game.subtitle}</p>
      </div>

      <Card className="mx-auto max-w-3xl overflow-hidden">
        <CardHeader className="bg-black text-primary-foreground">
          <div className="flex items-center justify-between">
            <CardTitle className="text-primary">{translations.game.name}</CardTitle>
            <div className="flex items-center gap-4">
              <div>
                {translations.game.score}: <span className="font-bold">{score}</span>
              </div>
              <div>
                {translations.game.time}: <span className="font-bold">{timeLeft}s</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div
            ref={gameAreaRef}
            className="relative h-[400px] w-full bg-gray-100 dark:bg-gray-800"
            style={{ cursor: gameStarted ? "crosshair" : "default" }}
          >
            {!gameStarted ? (
              <div className="flex h-full flex-col items-center justify-center">
                <p className="mb-4 text-center text-lg">{translations.game.instructions}</p>
                <Button onClick={startGame}>{translations.game.start}</Button>
              </div>
            ) : (
              targets.map((target) => (
                <div
                  key={target.id}
                  className="absolute h-10 w-10 animate-pulse rounded-full bg-primary"
                  style={{ left: `${target.x}px`, top: `${target.y}px` }}
                  onClick={() => handleTargetClick(target.id)}
                />
              ))
            )}

            {!gameStarted && score > 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-primary-foreground">
                <h3 className="mb-2 text-2xl font-bold">{translations.game.gameOver}</h3>
                <p className="mb-4 text-xl">
                  {translations.game.finalScore}: <span className="text-primary">{score}</span>
                </p>
                <Button onClick={startGame}>{translations.game.playAgain}</Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default GameSection

