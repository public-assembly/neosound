import { ReactNode, useState, useCallback } from 'react'
import { createContext, useContext } from 'react'
import { useCurationFunctions } from '@public-assembly/curation-interactions'
import { addIPFSGateway, dropsFetcher } from '@public-assembly/zora-drops-utils'
import { useMemo } from 'react'
import { AddressZero } from '@ethersproject/constants'
import { shuffle } from 'lodash'

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
  playList?: PlayListReturn[]
  playListContracts?: string[]
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

  const { getListingsReturn: playlistData } = useCurationFunctions({
    curationContractAddress,
  })

  const playList = useMemo(() => {
    function removeDuplicates(array: any, key: any) {
      return [
        ...new Map(
          /* @ts-ignore */
          array.map((x) => [key(x), x])
        ).values(),
      ]
    }

    const curationTargetTypes = {
      '0': 'CURATION_TYPE_GENERIC',
      '1': 'CURATION_TYPE_NFT_CONTRACT',
      '2': 'CURATION_TYPE_CONTRACT',
      '3': 'CURATION_TYPE_CURATION_CONTRACT',
      '4': 'CURATION_TYPE_NFT_ITEM',
      '5': 'CURATION_TYPE_WALLET',
      '6': 'CURATION_TYPE_ZORA_EDITION',
    }

    function returnCurationType(key: keyof typeof curationTargetTypes) {
      return curationTargetTypes[key]
    }

    function getCurationList() {
      if (playlistData) {
        const allData = playlistData.map((entry) => {
          // console.log(entry)
          try {
            const curationEntry = {
              curatedAddress: entry['curatedAddress']?.toLowerCase(),
              curationTargetType: returnCurationType(
                entry['curationTargetType'].toString()
              ),
              hasTokenId: entry['hasTokenId'],
              tokenId: entry['tokenId']?.toString(),
              curator: entry['curator'],
              sortOrder: entry['sortOrder'],
              chainId: entry['chainId']?.toString(),
            }

            return curationEntry
          } catch (err) {
            console.error(err)
          }
        })
        try {
          const removeZeroAddress = allData.filter(
            (item) =>
              item?.curatedAddress !== AddressZero && item?.curator !== AddressZero
          )
          const uniqeListings = removeDuplicates(
            removeZeroAddress,
            (item: any) => item.curatedAddress
          )
          return shuffle(uniqeListings) as PlayListReturn[]
        } catch (err) {
          console.error(err)
          return []
        }
      } else {
        return []
      }
    }
    return getCurationList()
  }, [playlistData])

  const playListContracts = useMemo(() => {
    if (playList.length) {
      try {
        const contracts = playList.map((item: any) => item?.curatedAddress?.toLowerCase())
        return contracts
      } catch (err) {
        console.error(err)
      }
    } else {
      return []
    }
  }, [playList])

  const setTrack = useCallback(
    (track: any) => {
      const item = (contract?: string) => contract === track?.address
      const index = playListContracts?.findIndex(item)
      const thumbnail = track?.editionMetadata?.imageURI
      setTrackIndex(index)
      setTrackThumbnail(addIPFSGateway(thumbnail))
    },
    [setTrackIndex, playListContracts]
  )

  return (
    <PlaylistContext.Provider
      value={{
        /* Layout */
        toggleLayout,
        gridLayout,
        /* Data */
        curationContractAddress,
        playList,
        playListContracts,
        networkId: networkId || '1',
        trackIndex,
        setTrack,
        trackThumbnail,
      }}>
      {children}
    </PlaylistContext.Provider>
  )
}
