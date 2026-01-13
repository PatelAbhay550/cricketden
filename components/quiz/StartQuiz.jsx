"use client"

import { useState } from "react"
import UniqueRecords from "./UniqueRecords"

const StartQuiz = () => {
  const [showQuiz, setShowQuiz] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowQuiz(true)}
        className="bg-primary text-white px-6 py-3 rounded-lg shadow-md hover:bg-primary/90 transition-all font-medium"
      >
        🎯 Start Quiz
      </button>

      {showQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl max-w-xl w-full relative">
            <button
              onClick={() => setShowQuiz(false)}
              className="absolute top-16 text-2xl font-bold right-12 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✖
            </button>
            <UniqueRecords />
          </div>
        </div>
      )}
    </>
  )
}

export default StartQuiz
