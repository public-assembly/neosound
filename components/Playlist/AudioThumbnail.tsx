import { useEffect, useMemo } from 'react'
import Image from 'next/image'
import { DropsComponents } from '@public-assembly/erc721-drops-minter'
import { useDropsContractProvider } from '@public-assembly/zora-drops-utils'
import { usePlaylistProvider, PlayListReturn } from '@/context/PlaylistProvider'
import { useHover } from '@/hooks/useHover'
import { useEnsName } from 'wagmi'
import { shortenAddress } from '@/utils/shortenAddress'
import { Modal } from '../modal/Modal'
import { AudioMint } from './AudioMint'
import useWindowSize from '@/hooks/useWindowSize'

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

export function AudioThumbnail({ playListItem }: { playListItem?: PlayListReturn }) {
  const { gridLayout, setTrack, toggleLayout } = usePlaylistProvider()
  const [hoverRef, isHovered] = useHover<HTMLDivElement>()
  const { collectionData } = useDropsContractProvider()
  const { width } = useWindowSize()

  useEffect(() => {
    if (width < 768 && !gridLayout) {
      toggleLayout()
    }
  }, [width, gridLayout])

  const { data: ensName } = useEnsName({ address: playListItem?.curator })

  const curatorName = useMemo(() => {
    if (ensName) {
      return ensName
    } else {
      return shortenAddress(playListItem?.curator)
    }
  }, [ensName, playListItem?.curator])

  if (!collectionData) return null

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
        <div className="absolute inset-0 z-10 flex flex-col justify-between bg-[rgba(0,0,0,0.4)] p-6 font-semibold text-stone-300 duration-300 hover:opacity-100 md:opacity-0">
          <div className="h-full">
            <div className="mb-4 text-xs font-thin uppercase sm:text-sm">
              Curated by: {curatorName}
            </div>
            <div className="neosound__playlist--item__title">
              <DropsComponents.MetadataName label={false} />
            </div>
            <div className="neosound__playlist--item__artist">
              <DropsComponents.MetadataCreator label={false} />
            </div>
            <Modal
              modalName={`${collectionData?.address}${collectionData?.symbol}`}
              trigger={
                <div className="relative z-50 mt-4 h-6 w-6 cursor-pointer sm:block">
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
      <div className="flex  w-full flex-col justify-between px-0 md:flex-row md:items-center md:pr-6">
        <div className="flex items-center gap-4">
          {!gridLayout && (
            <>
              <div
                className={`neosound__playlist--row-title flex flex-row items-center justify-between`}>
                <DropsComponents.MetadataCreator label={false} />
                <span>&nbsp;-&nbsp;</span>
                <div className="neosound__playlist--item-title__list">
                  <DropsComponents.MetadataName label={false} />
                </div>
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
          <div className="items center flex  text-xs font-thin uppercase sm:text-sm">
            Curated by: <span className="text-bold ">{curatorName}</span>
          </div>
        )}
      </div>
    </div>
  )
}
