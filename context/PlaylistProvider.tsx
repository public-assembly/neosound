import { ReactNode, useState, useCallback } from 'react'
import { createContext, useContext } from 'react'
import { useGetEditionsListings } from '@public-assembly/curation-interactions'
import { addIPFSGateway } from '@public-assembly/zora-drops-utils'

export type PlaylistProps = {
  children?: ReactNode
  curationContractAddress?: string
  networkId?: '1' | '5'
}

export type CurationTargetTypes =
  | 'CURATION_TYPE_GENERIC'
  | 'CURATION_TYPE_NFT_CONTRACT'
  | 'CURATION_TYPE_CONTRACT'
  | 'CURATION_TYPE_CURATION_CONTRACT'
  | 'CURATION_TYPE_NFT_ITEM'
  | 'CURATION_TYPE_WALLET'
  | 'CURATION_TYPE_ZORA_EDITION'

export type PlayListReturn = {
  curatedAddress?: string
  curationTargetType?: CurationTargetTypes
  hasTokenId?: boolean
  tokenId?: string
  curator?: string
  sortOrder?: number
  chainId?: number
}

export type PlaylistReturnTypes = {
  toggleLayout?: () => void
  setTrack?: (track?: any) => void
  trackIndex?: number
  trackThumbnail?: string
  gridLayout?: boolean
  sanitizedListingsData?: any
  networkId?: '1' | '5'
  curationContractAddress?: string
}

const PlaylistContext = createContext<PlaylistReturnTypes>({
  toggleLayout: () => {},
  setTrack: () => {},
  trackIndex: 0,
  gridLayout: false,
})

export function usePlaylistProvider() {
  return useContext(PlaylistContext)
}

export function PlaylistProvider({
  children,
  curationContractAddress,
  networkId,
}: PlaylistProps): JSX.Element {
  const [gridLayout, setGridLayout] = useState(false)
  const [trackIndex, setTrackIndex] = useState(0)
  const [trackThumbnail, setTrackThumbnail] = useState('')

  const toggleLayout = useCallback(() => {
    setGridLayout(!gridLayout)
  }, [gridLayout, setGridLayout])

  const { sanitizedListingsData } = useGetEditionsListings(
    curationContractAddress,
    networkId
  )

  const setTrack = useCallback(
    (track: any) => {
      const item = (contract?: string) => contract === track?.address
      const index = sanitizedListingsData?.data?.contractAddresses.findIndex(item)
      const thumbnail = track?.editionMetadata?.imageURI
      setTrackIndex(index)
      setTrackThumbnail(addIPFSGateway(thumbnail))
    },
    [setTrackIndex, sanitizedListingsData, sanitizedListingsData?.data?.contractAddresses]
  )

  return (
    <PlaylistContext.Provider
      value={{
        /* Layout */
        toggleLayout,
        gridLayout,
        /* Data */
        curationContractAddress,
        networkId: networkId || '1',
        trackIndex,
        setTrack,
        trackThumbnail,
        sanitizedListingsData,
      }}>
      {children}
    </PlaylistContext.Provider>
  )
}
