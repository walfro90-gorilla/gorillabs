"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/context/language-context"

interface CountdownTimerProps {
  targetDate: Date
  title: string
}

const CountdownTimer = ({ targetDate, title }: CountdownTimerProps) => {
  const { translations } = useLanguage()
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const timeUnits = [
    { value: timeLeft.days, label: translations.countdown.days },
    { value: timeLeft.hours, label: translations.countdown.hours },
    { value: timeLeft.minutes, label: translations.countdown.minutes },
    { value: timeLeft.seconds, label: translations.countdown.seconds },
  ]

  return (
    <div className="container py-8">
      <div className="rounded-lg bg-black p-8 text-center text-white">
        <h2 className="mb-6 text-2xl font-bold text-primary">{title}</h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {timeUnits.map((unit, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-800 text-3xl font-bold text-primary">
                {unit.value.toString().padStart(2, "0")}
              </div>
              <span className="mt-2 text-sm">{unit.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CountdownTimer

