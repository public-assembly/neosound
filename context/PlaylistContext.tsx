import { ReactNode, useState, useCallback } from 'react'
import { createContext, useContext } from 'react'

export type PlaylistProps = {
  children?: ReactNode
}

export type PlaylistReturnTypes = {
  toggleLayout?: () => void
  gridLayout?: boolean
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

  return (
    <PlaylistContext.Provider
      value={{
        toggleLayout,
        gridLayout,
      }}>
      {children}
    </PlaylistContext.Provider>
  )
}
