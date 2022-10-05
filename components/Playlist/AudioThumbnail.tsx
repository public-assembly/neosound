import Image from 'next/image'
import { DropsComponents } from '@public-assembly/erc721-drops-minter'
import { useDropsContractProvider } from '@public-assembly/zora-drops-utils'
import { usePlaylistProvider } from '@/context/PlaylistProvider'
import { useHover } from '@/hooks/useHover'
import { Modal } from '../modal/Modal'
import { AudioMint } from './AudioMint'

export function PlayIconRow() {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
      <Image
        src={'/neosound-icons/player/play/play-default.svg'}
        alt="Play"
        width={48}
        height={48}
        layout="fixed"
        className="cursor-pointer"
      />
    </div>
  )
}

export function AudioThumbnail() {
  const { gridLayout, setTrack } = usePlaylistProvider()
  const [hoverRef, isHovered] = useHover<HTMLDivElement>()
  const { collectionData } = useDropsContractProvider()
  console.log(collectionData)
  return (
    <div
      className={`neosound__playlist--item ${
        gridLayout ? 'neosound__playlist--grid-item' : 'neosound__playlist--row-item'
      } `}
      ref={hoverRef}>
      <div
        className={`${
          gridLayout ? 'w-full' : 'h-20 w-20'
        } relative h-full cursor-pointer `}>
        <button onClick={() => setTrack(collectionData)} className="inset-0 h-20 w-20">
          {!gridLayout && isHovered && <PlayIconRow />}
          <DropsComponents.Thumbnail className="h-full w-full" />
        </button>
      </div>
      {gridLayout && (
        <div className="absolute inset-0 z-10 flex flex-col justify-between bg-[rgba(0,0,0,0.4)] p-6 font-semibold text-stone-300 opacity-0 duration-300 hover:opacity-100">
          <div className="h-full">
            <div className="mb-4 text-xs font-thin uppercase sm:text-sm">
              Curated by: DYNAMIC{' '}
            </div>
            <div className="title flex flex-row">
              <DropsComponents.MetadataCreator />
              <DropsComponents.MetadataName />
            </div>
            <Modal
              modalName={`${collectionData?.address}${collectionData?.symbol}`}
              trigger={
                <div className="relative z-50 mt-4 h-6 w-6 cursor-pointer sm:block">
                  {isHovered && (
                    <Image
                      src={'/neosound-icons/UI/moreDetails/moreDetails-default.svg'}
                      alt="More details"
                      layout="responsive"
                      width={24}
                      height={24}
                      objectFit="cover"
                    />
                  )}
                </div>
              }
              content={<AudioMint />}
            />
          </div>
          <div className="flex items-center justify-end">
            <button onClick={() => setTrack(collectionData)}>
              <Image
                src={'/neosound-icons/player/play/play-default.svg'}
                alt="Play"
                width={48}
                height={48}
                layout="fixed"
                className="cursor-pointer"
              />
            </button>
          </div>
        </div>
      )}
      <div className=" flex w-full flex-col justify-between px-0 md:flex-row md:items-center md:pr-6">
        <div className="flex items-center gap-4">
          {!gridLayout && (
            <>
              <div
                className={`neosound__playlist--row-title flex flex-row items-center justify-between`}>
                <DropsComponents.MetadataCreator label={false} />
                <span>&nbsp;-&nbsp;</span>
                <DropsComponents.MetadataName label={false} />
              </div>
              <Modal
                modalName={`${collectionData?.address}${collectionData?.symbol}`}
                trigger={
                  <div className="relative z-50  h-6 w-6 cursor-pointer sm:block">
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
                content={<AudioMint />}
              />
            </>
          )}
        </div>
        {!gridLayout && (
          <div className="text-xs font-thin uppercase  sm:text-sm">
            Curated by: DYNAMIC{' '}
          </div>
        )}
      </div>
    </div>
  )
}
