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
        curationContractAddress="0xe61787247Dac262c4394b457c958C69BA7080501"
        networkId={process.env.NEXT_PUBLIC_CHAIN_ID as '1' | '5'}
      >
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
