import { ReactNode, useState, useCallback } from 'react'
import { createContext, useContext } from 'react'
import { useCurationFunctions } from '@public-assembly/assemble-curation-functions'
import { addIPFSGateway } from '@public-assembly/zora-drops-utils'
import { useMemo } from 'react'

export type PlaylistProps = {
  children?: ReactNode
  curationContractAddress?: string
  networkId?: '1' | '5'
}

export type PlaylistReturnTypes = {
  toggleLayout?: () => void
  setTrack?: (track?: any) => void
  trackIndex?: number,
  trackThumbnail?: string,
  gridLayout?: boolean
  curationPlaylist?: any
  playListContracts?: string[]
  networkId?: '1' | '5'
  curationContractAddress?: string
}

const PlaylistContext = createContext<PlaylistReturnTypes>({
  toggleLayout: () => { },
  setTrack: () => { },
  trackIndex: 0,
  gridLayout: false,
})

export function usePlaylistProvider() {
  return useContext(PlaylistContext)
}

export function PlaylistProvider({ children, curationContractAddress, networkId }: PlaylistProps) {
  const [gridLayout, setGridLayout] = useState(false)
  const [trackIndex, setTrackIndex] = useState(0)
  const [trackThumbnail, setTrackThumbnail] = useState('')

  const toggleLayout = useCallback(() => {
    console.log('gird', gridLayout)
    setGridLayout(!gridLayout)
  }, [gridLayout, setGridLayout])

  const { 
    getListingsRead: playlistData,
    // getListingsError,
    // getListingsLoading,
  } = useCurationFunctions({
    curationContractAddress
  })

  const santizedPlaylist = useMemo(() => {
    const curationTargetTypes = {
      '0': 'CURATION_TYPE_GENERIC',
      '1': 'CURATION_TYPE_NFT_CONTRACT',
      '2': 'CURATION_TYPE_CURATION_CONTRACT',
      '3': 'CURATION_TYPE_CONTRACT',
      '4': 'CURATION_TYPE_NFT_ITEM',
      '5': 'CURATION_TYPE_EOA_WALLET',
    }

    function returnCurationType(key: keyof typeof curationTargetTypes) {
      return curationTargetTypes[key]
    }
    if (playlistData) {
      return playlistData.map((entry) => {
        try {
          return {
            curatedContract: entry['curatedContract'],
            curationTargetType: returnCurationType(entry['curationTargetType'].toString()),
            hasTokenId: entry['hasTokenId'],
            tokenId: entry['tokenId']?.toString(),
            curator: entry['curator'],
            sortOrder: entry['sortOrder'],
          }
        } catch (err) {
          console.error(err)
        }
      })
    } else {
      return []
    }
  }, [playlistData])

  const playListContracts = useMemo(() => {
    if (santizedPlaylist.length) {
      try {
        const contracts = santizedPlaylist.map((item: any) => item?.curatedContract?.toLowerCase())
        return contracts
      } catch (err) {
        console.error(err)
      }
    } else {
      return []
    }
  }, [santizedPlaylist])

  const setTrack = useCallback((track: any) => {
    const item = (contract?: string) => contract === track?.address
    const index = playListContracts?.findIndex(item)
    const thumbnail = track?.editionMetadata?.imageURI
    setTrackIndex(index)
    setTrackThumbnail(addIPFSGateway(thumbnail))
  }, [setTrackIndex, playListContracts])

  return (
    <PlaylistContext.Provider
      value={{
        toggleLayout,
        gridLayout,
        curationPlaylist: santizedPlaylist,
        playListContracts,
        networkId: networkId || '1',
        trackIndex,
        setTrack,
        trackThumbnail,
        curationContractAddress,
      }}>
      {children}
    </PlaylistContext.Provider>
  )
}
