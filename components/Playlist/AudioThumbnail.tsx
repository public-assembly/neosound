import Image from 'next/image'
import { DropsComponents } from '@public-assembly/erc721-drops-minter'
import { useDropsContractProvider } from "@public-assembly/zora-drops-utils"
import { usePlaylistProvider } from '@/context/PlaylistProvider'
import { useHover } from '@/hooks/useHover'
import { Modal } from '../modal/Modal'
import { AudioMint } from './AudioMint';

export function PlayIconRow() {
  return (
    <div className="z-10 absolute inset-0 w-full h-full flex flex-col items-center justify-center">
      <Image
        src={'/neosound-icons/player/play/play-default.svg'}
        alt="Play"
        width={48}
        height={48}
        layout="fixed"
      />
    </div>
  )
}

export function AudioThumbnail() {
  const { gridLayout, setTrack } = usePlaylistProvider()
  const [hoverRef, isHovered] = useHover<HTMLDivElement>()
  const { collectionData } = useDropsContractProvider()
  return (
    <div
      className={`neosound__playlist--item ${gridLayout ? 'neosound__playlist--grid-item' : 'neosound__playlist--row-item'}`}
      ref={hoverRef}
    >
      <div className={`${gridLayout ? 'w-full' : 'w-20 h-20'} relative cursor-pointer`}>
        <button
          onClick={() => setTrack(collectionData)}
          className="w-full"
        >
          {!gridLayout && isHovered && <PlayIconRow />}
          <DropsComponents.Thumbnail />
        </button>
      </div>
      {!gridLayout &&
        <div className={`flex flex-row justify-start`}>
          <DropsComponents.MetadataCreator />
          <span>&nbsp;-&nbsp;</span>
          <DropsComponents.MetadataName />
        </div>
      }
      <Modal
        modalName={`${collectionData?.address}${collectionData?.symbol}`}
        trigger={
          <div className="w-6 h-6 hidden sm:block relative">
            <Image
              src={'/neosound-icons/UI/moreDetails/moreDetails-default.svg'}
              alt="More details"
              layout="responsive"
              width={24}
              height={24}
              objectFit="cover"
            />
          </div>
        }
        content={
          <AudioMint />
        }
      />
    </div>
  )
}
