import type { NextPage } from 'next'
import Head from 'next/head'
import { EditionsAudioPlayer } from '@public-assembly/audio-player-ui'
import { AudioGrid, GridToggle } from '@/components/Playlist'

const Home: NextPage = () => {
  const COLLECTIONS = [
    '0x47191cb94c0b6925db9f15e000cf8e3e8864fc9b',
    '0x674fb9ed86b847db9aee0a19e9055d5d2c0e6cc4',
    '0x77927bedd1e19d10405ce787eed3e96dc1d048b6',
    '0x02238b7ac19b331780fddb8d002a501a2631d3e2',
  ]

  return (
    <>
      <Head>
        <title>Neosound</title>
        <meta name="description" content="Neosound" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GridToggle />
      <AudioGrid collectionAddresses={COLLECTIONS} />
      <EditionsAudioPlayer contractAddresses={COLLECTIONS as string[]} />
    </>
  )
}

export default Home
