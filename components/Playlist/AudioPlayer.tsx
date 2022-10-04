import { EditionsAudioPlayer } from '@public-assembly/audio-player-ui'
import { usePlaylistProvider } from '@/context/PlaylistProvider'

export function AudioPlayer() {
  const { playListContracts, networkId } = usePlaylistProvider()

  return (
    <EditionsAudioPlayer contractAddresses={playListContracts as string[]} networkId={networkId} />
  )
}