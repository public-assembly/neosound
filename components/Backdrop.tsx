import { useState, useCallback } from 'react'
import { usePlaylistProvider } from '@/context/PlaylistProvider'

export function Backdrop() {
  const [loaded, setLoaded] = useState(false)

  const { trackThumbnail } = usePlaylistProvider()

  const imgLoaded = useCallback(() => {
    setLoaded(true)
  }, [])
  return (
    <div
      className={`neosound--backdrop pointer-events-none fixed inset-0 z-0  overflow-hidden`}>
      <img
        className="absolute h-full w-full object-cover"
        style={{ opacity: loaded ? 0.75 : 0, filter: 'blur(10px)' }}
        onLoad={imgLoaded}
        src={trackThumbnail}
        alt="backdrop"
      />
    </div>
  )
}
