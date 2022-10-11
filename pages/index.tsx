import type { NextPage } from 'next'
import React from 'react'
import { Seo } from '@/components/Seo'
import dynamic from 'next/dynamic'
import { GridToggle } from '@/components/Playlist'

const AudioGrid = dynamic(() => import('./../components/Playlist/AudioGrid'), {
  ssr: false,
})

const Home: NextPage = () => {
  return (
    <>
      <Seo />
      <GridToggle />
      <AudioGrid />
    </>
  )
}

export default Home
