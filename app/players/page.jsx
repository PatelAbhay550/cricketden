import PlayersPage from '@/components/Players'
import React from 'react'

const metaMetadata = {
  title: 'Players - CricketDen ',
  description: 'Explore player profiles, stats, and achievements in the world of cricket. Stay updated with the latest player information and performance metrics.',
  keywords: ['Cricket Players', 'Player Profiles', 'Cricket Stats', 'Cricket Achievements', 'Player Information'],
  openGraph: {
    title: 'Players - CricketDen',
    description: 'Explore player profiles, stats, and achievements in the world of cricket. Stay updated with the latest player information and performance metrics.',
    url: 'https://cricketden.live/players',
    siteName: 'CricketDen',
    images: [
      {
        url: 'https://cricketden.live/og-image-players.jpg',
        width: 1200,
        height: 630,
        alt: 'Players - CricketDen',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}
const page = () => {
  return (
    <PlayersPage/>
  )
}

export default page