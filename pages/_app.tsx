import "@fontsource/barlow";
import 'styles/globals.css'
import 'styles/playlist.css'
import 'styles/audio-player.css'

import type { AppProps } from 'next/app'
import { AppWrapper, PageWrapper } from './../components'
import { PlaylistProvider } from '@/context/PlaylistContext'


function NetLabel({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <PageWrapper>
        <PlaylistProvider>
          <Component {...pageProps} />
        </PlaylistProvider>
      </PageWrapper>
    </AppWrapper>
  )
}

export default NetLabel
