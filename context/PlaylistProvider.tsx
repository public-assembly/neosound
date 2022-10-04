import { ReactNode, useState, useCallback } from 'react'
import { createContext, useContext } from 'react'
import { useContractRead } from 'wagmi'
import Contract from './../abi/CurationManager.json'

export type PlaylistProps = {
  children?: ReactNode
}

export type PlaylistReturnTypes = {
  toggleLayout?: () => void
  gridLayout?: boolean
  playList?: any[]
}

const PlaylistContext = createContext<PlaylistReturnTypes>({
  toggleLayout: () => {},
  gridLayout: false,
})

export function usePlaylistProvider() {
  return useContext(PlaylistContext)
}

export function PlaylistProvider({ children }: PlaylistProps) {
  const [gridLayout, setGridLayout] = useState(false)

  const toggleLayout = useCallback(() => {
    console.log('gird', gridLayout)
    setGridLayout(!gridLayout)
  }, [gridLayout, setGridLayout])

  const { data } = useContractRead({
    addressOrName: "0x6422Bf82Ab27F121a043d6DE88b55FA39e2ea292", 
    contractInterface: Contract.abi,
    functionName: 'viewAllListings',
  })

  return (
    <PlaylistContext.Provider
      value={{
        toggleLayout,
        gridLayout,
        /* @ts-ignore */
        playList: data && data.length ? data : []
      }}>
      {children}
    </PlaylistContext.Provider>
  )
}
