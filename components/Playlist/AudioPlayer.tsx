import { EditionsAudioPlayer } from '@public-assembly/audio-player-ui'
import { usePlaylistProvider } from '@/context/PlaylistProvider'
import { useMemo } from 'react'

export function AudioPlayer() {
  const { curationPlaylist } = usePlaylistProvider()

  const playList = useMemo(() => {
    const contracts = curationPlaylist.map((item: any) => item?.curatedContract)
    console.log(contracts)
    return contracts
  }, [curationPlaylist])

  return (
    <EditionsAudioPlayer contractAddresses={playList as string[]} />
  )
}