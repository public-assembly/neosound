import { AudioThumbnail } from './AudioThumbnail'
import { DropsContractProvider } from '@public-assembly/zora-drops-utils'
import { usePlaylistProvider } from '@/context/PlaylistProvider'
import { isClientSide } from '@/utils/window'

export function AudioGrid() {
  const { gridLayout, playListContracts } = usePlaylistProvider()
  if (!isClientSide) return null
  return (
    <div className="mx-auto pb-28 px-6">
      <div className={`neosound__playlist--wrapper ${gridLayout ? 'neosound__playlist--grid-view' : 'neosound__playlist--list-view'}`}>
        {playListContracts.map((address: any) => (
          <DropsContractProvider
            key={address}
            collectionAddress={address}
            networkId={process.env.NEXT_PUBLIC_CHAIN_ID as '1' | '5'}
          >
            <AudioThumbnail />
          </DropsContractProvider>
        ))}
      </div>
    </div>
  )
}
