import { EditionsAudioPlayer } from '@public-assembly/audio-player-ui'
import { usePlaylistProvider } from '@/context/PlaylistProvider'

export function AudioPlayer() {
  const { networkId, trackIndex, sanitizedListingsData } = usePlaylistProvider()
  if (!sanitizedListingsData?.data?.contractAddresses) return null
  return (
    <EditionsAudioPlayer
      contractAddresses={sanitizedListingsData?.data?.contractAddresses as string[]}
      networkId={networkId}
      nftId={trackIndex}
    />
  )
}
