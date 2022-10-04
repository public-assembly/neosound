import { ReactNode, useState, useCallback } from 'react'
import { createContext, useContext } from 'react'
import { useCurationFunctions } from '@public-assembly/assemble-curation-functions'
import { useMemo } from 'react'

export type PlaylistProps = {
  children?: ReactNode
  curationContractAddress?: string
  networkId?: '1' | '5'
}

export type PlaylistReturnTypes = {
  toggleLayout?: () => void
  gridLayout?: boolean
  curationPlaylist?: any
  playListContracts?: string[]
  networkId?: '1' | '5'
}

const PlaylistContext = createContext<PlaylistReturnTypes>({
  toggleLayout: () => {},
  gridLayout: false,
})

export function usePlaylistProvider() {
  return useContext(PlaylistContext)
}

export function PlaylistProvider({ children, curationContractAddress, networkId }: PlaylistProps) {
  const [gridLayout, setGridLayout] = useState(false)

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
      const contracts = santizedPlaylist.map((item: any) => item?.curatedContract)
      return contracts
    } else {
      return []
    }
  }, [santizedPlaylist])

  return (
    <PlaylistContext.Provider
      value={{
        toggleLayout,
        gridLayout,
        curationPlaylist: santizedPlaylist,
        playListContracts,
        networkId: networkId || '1',
      }}>
      {children}
    </PlaylistContext.Provider>
  )
}
