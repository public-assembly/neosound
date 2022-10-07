import { AudioThumbnail } from './AudioThumbnail'
import { DropsContractProvider } from '@public-assembly/zora-drops-utils'
import { usePlaylistProvider } from '@/context/PlaylistProvider'
import { isClientSide } from '@/utils/window'

export function AudioGrid() {
  const { gridLayout, playList } = usePlaylistProvider()
  if (!isClientSide) return null
  return (
    <div className="mx-auto px-6 pb-28 pt-16 sm:px-12">
      <div
        className={`neosound__playlist--wrapper ${
          gridLayout ? 'neosound__playlist--grid-view' : 'neosound__playlist--list-view'
        }`}>
        {playList.map((playListItem) => (
          <DropsContractProvider
            key={`${playListItem?.curatedContract}${playListItem?.curator}`}
            collectionAddress={playListItem?.curatedContract}
            networkId={process.env.NEXT_PUBLIC_CHAIN_ID as '1' | '5'}>
            <AudioThumbnail playListItem={playListItem} />
          </DropsContractProvider>
        ))}
      </div>
    </div>
  )
}
