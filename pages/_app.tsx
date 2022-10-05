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
      <PlaylistProvider>
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
