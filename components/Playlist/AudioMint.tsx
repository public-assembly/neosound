import { DropsComponents } from '@public-assembly/erc721-drops-minter'
import { useModal } from '@/hooks/useModal'
import { useAuth } from '@/hooks/useAuth'
import { AuthCheck } from '../auth'

export function AudioMint() {
  const { requestClose } = useModal()
  const { ensName, isConnected } = useAuth()

  return (
    <div className="px-6 pb-6">
      <div className="flex w-full flex-row justify-between py-3">
        {isConnected ? (
          <div className="border-1 border border-black px-2 py-1">{ensName}</div>
        ) : (
          <div />
        )}
        <div className="border-1 border border-black px-2 py-1">
          <button onClick={requestClose}>Close</button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <DropsComponents.Thumbnail />
        <div className="flex h-full flex-col justify-between overflow-x-hidden">
          <div className="flex flex-col gap-2">
            <div className="flex w-full flex-row justify-between">
              <DropsComponents.Inventory label={false} />
              <DropsComponents.TotalPrice label="price" ethSymbol="Eth" />
            </div>
            <div className="flex flex-col gap-2">
              <DropsComponents.MetadataName label={false} />
              <div>
                <DropsComponents.MetadataCreator label="Artist:" />
                <DropsComponents.EtherscanLink truncateAddress label={false} />
              </div>
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
