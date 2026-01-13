'use client'
import React, { useState } from 'react'

const questions = [
  {
    question: 'Who is the only player to score 400* in a Test match?',
    options: ['Don Bradman', 'Virender Sehwag', 'Brian Lara', 'Kumar Sangakkara'],
    answer: 'Brian Lara',
  },
  {
    question: 'Which bowler has taken all 10 wickets in a Test innings?',
    options: ['Anil Kumble', 'Jim Laker', 'Ajaz Patel', 'All of the above'],
    answer: 'All of the above',
  },
  {
    question: 'Which country played the first ever Test match?',
    options: ['India', 'England', 'Australia', 'South Africa'],
    answer: 'England',
  },
  {
    question: 'Who has the most Test runs?',
    options: ['Ricky Ponting', 'Sachin Tendulkar', 'Jacques Kallis', 'Alastair Cook'],
    answer: 'Sachin Tendulkar',
  },
  {
    question: 'Which team holds the record for highest team total in Test cricket?',
    options: ['India', 'Sri Lanka', 'Australia', 'England'],
    answer: 'Sri Lanka',
  },
]

const UniqueRecords = () => {
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const handleOptionClick = (option) => {
    setSelected(option)
  }

  const handleNext = () => {
    if (selected === questions[currentQ].answer) {
      setScore(score + 1)
    }

    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1)
      setSelected(null)
    } else {
      setShowResult(true)
    }
  }

  const handleRestart = () => {
    setCurrentQ(0)
    setSelected(null)
    setScore(0)
    setShowResult(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark flex items-center justify-center px-4 py-10">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 w-full max-w-2xl space-y-6 border border-gray-200 dark:border-gray-700">
        {!showResult ? (
          <>
            <h2 className="text-2xl font-bold text-primary dark:text-accent-light">
              Question {currentQ + 1} of {questions.length}
            </h2>
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">{questions[currentQ].question}</p>

            <div className="space-y-3">
              {questions[currentQ].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(option)}
                  className={`w-full text-left px-4 py-2 rounded-lg border transition ${
                    selected === option
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white dark:bg-gray-700 hover:bg-primary/10 border-gray-300 dark:border-gray-600 dark:text-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={!selected}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
            >
              {currentQ === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </>
        ) : (
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-green-600 dark:text-green-400">🎉 Quiz Completed!</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              You scored <span className="font-semibold">{score}</span> out of{' '}
              <span className="font-semibold">{questions.length}</span>
            </p>
            <button
              onClick={handleRestart}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition"
            >
              Retake Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default UniqueRecords
