import { AudioThumbnail } from './AudioThumbnail'
import { DropsContractProvider } from '@public-assembly/zora-drops-utils'
import { usePlaylistProvider } from '@/context/PlaylistProvider'
import { PlayListReturn } from '@public-assembly/curation-interactions'

export default function AudioGrid() {
  const { gridLayout, sanitizedListingsData } = usePlaylistProvider()
  if (!sanitizedListingsData?.data?.full) return null
  return (
    <div className="mx-auto px-6 pb-28 pt-16 sm:px-12">
      <div
        className={`neosound__playlist--wrapper ${
          gridLayout ? 'neosound__playlist--grid-view' : 'neosound__playlist--list-view'
        }`}>
        {sanitizedListingsData?.data?.full.map((playListItem: PlayListReturn) => {
          return (
            <DropsContractProvider
              key={`${playListItem?.curatedAddress}${playListItem?.curator}`}
              collectionAddress={playListItem?.curatedAddress}
              networkId={process.env.NEXT_PUBLIC_CHAIN_ID as '1' | '5'}>
              <AudioThumbnail playListItem={playListItem} />
            </DropsContractProvider>
          )
        })}
      </div>
    </div>
  )
}
