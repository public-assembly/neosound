import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { GridToggle } from '@/components/Playlist'

const AudioGrid = dynamic(() => import('./../components/Playlist/AudioGrid'), {
  ssr: false,
})

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Neosound</title>
        <meta name="description" content="Neosound" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GridToggle />
      <AudioGrid />
    </>
  )
}

export default Home
