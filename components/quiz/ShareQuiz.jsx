'use client'

import React from 'react'

const ShareQuiz = ({ link }) => {
  const handleShare = async () => {
    const title = 'Test Cricket Unique Records Quiz'
    const text = 'Check out this cool quiz on test cricket records!'
    const url = link

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url })
      } catch (err) {
        console.error('Error sharing:', err)
      }
    } else {
      // Fallback for unsupported browsers
      const fallback = `
        WhatsApp: https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}\n
        Email: mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + ' ' + url)}\n
        Copied to clipboard.
      `
      try {
        await navigator.clipboard.writeText(url)
        alert('Link copied! You can also share via WhatsApp or Email:\n\n' + fallback)
      } catch {
        alert('Failed to copy. You can manually copy this link:\n' + url)
      }
    }
  }

  return (
    <div className="text-center">
      <button
        onClick={handleShare}
        className="bg-white text-blue-600 border border-blue-600 px-5 py-2 rounded-full shadow-sm hover:bg-blue-600 hover:text-white transition-all font-semibold"
      >
        🔗 Share Quiz
      </button>
    </div>
  )
}

export default ShareQuiz
