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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl w-full border space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            🏏 Test Cricket Unique Records Quiz
          </h1>
          <p className="text-lg text-gray-600">
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
