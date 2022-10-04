import { AudioThumbnail } from './AudioThumbnail'
import { DropsContractProvider } from '@public-assembly/zora-drops-utils'
import { usePlaylistProvider } from '@/context/PlaylistProvider'

export function AudioGrid() {
  const { gridLayout, playList } = usePlaylistProvider()
  return (
    <div className="mx-auto pb-28 px-6">
      <div className={`neosound__playlist--wrapper ${gridLayout ? 'neosound__playlist--grid-view' : 'neosound__playlist--list-view'}`}>
        {playList.map((address: any) => (
          <DropsContractProvider key={address} collectionAddress={address}>
            <AudioThumbnail />
          </DropsContractProvider>
        ))}
      </div>
    </div>
  )
}
