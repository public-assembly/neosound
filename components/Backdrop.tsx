import { useState, useCallback } from 'react'
import { usePlaylistProvider } from '@/context/PlaylistProvider'

export function Backdrop() {
  const [loaded, setLoaded] = useState(false)
  
  const {
    trackThumbnail
  } = usePlaylistProvider()
  
  const imgLoaded = useCallback(() => {
    setLoaded(true)
  }, [])
  return (
    <div className={`neosound--backdrop fixed pointer-events-none z-0 inset-0 overflow-hidden`}>
      <img
        className="inset-0 absolute object-cover w-full"
        style={{ opacity: loaded ? .75 : 0, filter: 'blur(10px)' }}
        onLoad={imgLoaded} src={trackThumbnail}
      />
    </div>
  )
}