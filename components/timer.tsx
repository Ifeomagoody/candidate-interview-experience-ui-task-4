
"use client"

import { Dispatch, SetStateAction, useEffect } from "react"

interface TimerProps {
  timeRemaining: number
  setTimeRemaining: Dispatch<SetStateAction<number>>;
  onTimeUp: () => void
}

export default function Timer({ timeRemaining, setTimeRemaining, onTimeUp }: TimerProps) {
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime: number) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          onTimeUp()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [setTimeRemaining, onTimeUp])

  
  const minutes = Math.floor(timeRemaining / 60)  //the format for the time is MM:SS
  const seconds = timeRemaining % 60
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

 
  const percentage = (timeRemaining / 60) * 100  // the progress bar percentage is Calculated here 

  return (
    <div className="flex flex-col items-center">
      <div className="text-sm font-medium mb-1">{formattedTime}</div>
      <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-1000 ease-linear"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

