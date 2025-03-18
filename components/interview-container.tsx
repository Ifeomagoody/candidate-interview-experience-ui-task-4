
"use client"

import { useState, useEffect } from "react"
import Question from "@/components/question"
import Timer from "@/components/timer"
import { questions } from "@/lib/questions"

export default function InterviewContainer() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(60) // it takes 60 seconds for each question
  const [isCompleted, setIsCompleted] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]

  useEffect(() => {
   
    setTimeRemaining(60)  // the timer is reset when the user moves to a new question
  }, [currentQuestionIndex])

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setIsCompleted(true)
    }
  }

  if (isCompleted) {
    return (
      <div className="max-w-2xl w-full mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Interview has been Completed</h2>
        <p className="text-center text-gray-600 mb-6">Thank you for completing the interview.</p>
        <button
          onClick={() => {
            setCurrentQuestionIndex(0)
            setIsCompleted(false)
          }}
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Restart Interview
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl w-full mx-auto p-8 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-gray-800">Candidate Interview</h1>
        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-2">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <Timer timeRemaining={timeRemaining} setTimeRemaining={setTimeRemaining} onTimeUp={handleNextQuestion} />
        </div>
      </div>

      <Question question={currentQuestion.text} questionNumber={currentQuestionIndex + 1} />

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleNextQuestion}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
        </button>
      </div>
    </div>
  )
}

