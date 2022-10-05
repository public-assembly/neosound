import { EditionsAudioPlayer } from '@public-assembly/audio-player-ui'
import { usePlaylistProvider } from '@/context/PlaylistProvider'
import { isClientSide } from '@/utils/window'

export function AudioPlayer() {
  const { playListContracts, networkId, trackIndex } = usePlaylistProvider()
  if (!isClientSide) return null
  return (
    <EditionsAudioPlayer
      contractAddresses={playListContracts as string[]}
      networkId={networkId}
      nftId={trackIndex}
    />
  )
}
