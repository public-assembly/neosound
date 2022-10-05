import Image from 'next/image'
import { usePlaylistProvider } from '@/context/PlaylistProvider'
import { useState } from 'react'

export const GridToggle = () => {
  const { gridLayout, toggleLayout } = usePlaylistProvider()
  const [hoverGrid, setHoverGrid] = useState(false)
  const [hoverList, setHoverList] = useState(false)

  return (
    <div className="ns_views-toggle z-20 box-border flex w-full justify-end px-6 pb-4 sm:px-12">
      <div className="flex items-center">
        {!gridLayout ? (
          <button
            onClick={toggleLayout}
            className="pa_views-toggle__grid"
            onMouseEnter={() => setHoverGrid(true)}
            onMouseLeave={() => setHoverGrid(false)}>
            <Image
              src={`${
                gridLayout
                  ? '/neosound-icons/navIcons/grid-current.svg'
                  : hoverGrid == true
                  ? '/neosound-icons/navIcons/grid-hover.svg'
                  : '/neosound-icons/navIcons/grid-default.svg'
              }`}
              alt="Grid View"
              width={32}
              height={32}
              layout="fixed"
            />
          </button>
        ) : (
          <button
            onClick={toggleLayout}
            className="pa_views-toggle__list hidden md:block"
            onMouseEnter={() => setHoverList(true)}
            onMouseLeave={() => setHoverList(false)}>
            <Image
              src={`${
                !gridLayout
                  ? '/neosound-icons/navIcons/list-pressed.svg'
                  : hoverList == true
                  ? '/neosound-icons/navIcons/list-hover.svg'
                  : '/neosound-icons/navIcons/list-default.svg'
              }`}
              alt="List View"
              width={32}
              height={32}
            />
          </button>
        )}
      </div>
    </div>
  )
}
