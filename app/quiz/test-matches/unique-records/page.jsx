import ShareQuiz from '@/components/quiz/ShareQuiz'
import StartQuiz from '@/components/quiz/StartQuiz'
import React from 'react'

export const metadata = {
  title: 'Test Cricket Unique Records Quiz - Test your Knowledge',
  description:
    'Test your knowledge of unique records in Test cricket with our interactive quiz. Challenge yourself and learn more about the game!',
  keywords:
    'Test cricket, unique records, quiz, interactive quiz, cricket trivia',
    openGraph: {
        title: 'Test Cricket Unique Records Quiz - Test your Knowledge',
        description:
            'Test your knowledge of unique records in Test cricket with our interactive quiz. Challenge yourself and learn more about the game!',
        url: 'https://cricketden.live/quiz/test-matches/unique-records',
        images: [
            {
            url: 'https://github.com/PatelAbhay550/cricketden/blob/main/public/terecordsunique.png?raw=true',
            width: 1200,
            height: 630,
            },
        ],
        },
}

const page = () => {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark p-4 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 max-w-3xl w-full border border-gray-200 dark:border-gray-700 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3">
            Test Cricket Unique Records Quiz
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Think you know Test cricket? Take this quiz and explore some of the most unique records in the game's history.
          </p>
        </div>

        {/* Fix: use a flex row container and remove grid-related styles */}
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <StartQuiz />
          <ShareQuiz />
        </div>
      </div>
    </main>
  )
}

export default page
