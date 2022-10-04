import { AudioThumbnail } from './AudioThumbnail'
import { DropsContractProvider } from '@public-assembly/zora-drops-utils'
import { usePlaylistProvider } from '@/context/PlaylistContext'

export function AudioGrid({ collectionAddresses }: { collectionAddresses: string[] }) {
  const { gridLayout } = usePlaylistProvider()
  return (
    <div className="mx-auto pb-8 px-6">
      <div className={`neosound__playlist--wrapper ${gridLayout ? 'neosound__playlist--grid-view' : 'neosound__playlist--list-view'}`}>
        {collectionAddresses.map((address: any) => (
          <DropsContractProvider key={address} collectionAddress={address}>
            <AudioThumbnail />
          </DropsContractProvider>
        ))}
      </div>
    </div>
  )
}
