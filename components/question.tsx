
interface QuestionProps {
    question: string
    questionNumber: number
  }
  
  export default function Question({ question, questionNumber }: QuestionProps) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Question {questionNumber}</h2>
        <p className="text-gray-700">{question}</p>
      </div>
    )
  }
  
  