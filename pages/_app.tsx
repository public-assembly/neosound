import '@fontsource/barlow'
import 'styles/globals.css'
import 'styles/audio-player.css'
import 'styles/neosound.css'

import type { AppProps } from 'next/app'
import { AppWrapper, Header, Backdrop, AudioPlayer } from './../components'
import { PlaylistProvider } from '@/context/PlaylistProvider'

function NetLabel({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <PlaylistProvider
        curationContractAddress="0xEd824d01B337Fb423554185464dbF7D85034446B"
        networkId={process.env.NEXT_PUBLIC_CHAIN_ID as '1' | '5'}>
        <Header />
        <main className="relative z-10">
          <Component {...pageProps} />
          <AudioPlayer />
        </main>
        <Backdrop />
      </PlaylistProvider>
    </AppWrapper>
  )
}

export default NetLabel
