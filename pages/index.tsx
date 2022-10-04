import type { NextPage } from 'next'
import Head from 'next/head'
import { AudioGrid, GridToggle } from '@/components/Playlist'

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
