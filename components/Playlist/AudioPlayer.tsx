import { EditionsAudioPlayer } from '@public-assembly/audio-player-ui'
import { usePlaylistProvider } from '@/context/PlaylistProvider'

export function AudioPlayer() {
  const { playList } = usePlaylistProvider()
  return (
    <EditionsAudioPlayer contractAddresses={playList as string[]} />
  )
}