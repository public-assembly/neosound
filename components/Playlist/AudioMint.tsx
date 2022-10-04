import { DropsComponents } from '@public-assembly/erc721-drops-minter'
import { useModal } from '@/hooks/useModal'
import { useAuth } from '@/hooks/useAuth'
import { AuthCheck } from '../auth'

export function AudioMint() {
  const { requestClose } = useModal()
  const { ensName, isConnected } = useAuth()
  
  return (
    <div className="px-6 pb-6">
      <div className="py-3 flex flex-row justify-between w-full">
        {isConnected
          ? <div className="px-2 py-1 border border-1 border-black">{ensName}</div>
          : <div />
        }
        <div className="px-2 py-1 border border-1 border-black">
          <button onClick={requestClose}>Close</button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <DropsComponents.Thumbnail />
        <div className="flex flex-col h-full overflow-x-hidden justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row w-full justify-between">
              <DropsComponents.Inventory />
              <DropsComponents.TotalPrice />
            </div>
            <div className="flex flex-col gap-2">
              <DropsComponents.MetadataName />
              <DropsComponents.MetadataCreator />
            </div>
          </div>
          <AuthCheck
            formUI={
              <div className="flex flex-col gap-4">
                <DropsComponents.MintQuantity />
                <DropsComponents.MintButton />
              </div>  
            }
          />
        </div>
      </div>
    </div>
  ) 
}