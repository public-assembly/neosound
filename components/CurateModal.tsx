// import { CurationInterface } from '@public-assembly/assemble-curation-interface'
import { CurationInterface } from '@public-assembly/curation-interactions'
import { usePlaylistProvider } from '../context'
import { useAuth } from '../hooks'
import { Modal } from '@/components/modal/Modal'
import { useModal } from '@/hooks/useModal'
import { isClientSide } from '@/utils/window'
import { AuthCheck } from './auth'
import { Connect } from './auth/Connect'
// import { ConnectButton } from '@rainbow-me/rainbowkit'

export function CurateModal({ trigger }: { trigger?: JSX.Element }) {
  const { curationContractAddress } = usePlaylistProvider()
  const { address, isConnected } = useAuth()
  const { requestClose } = useModal()
  if (!isClientSide) return null
  return (
    <Modal
      modalName="curation-interface"
      content={
        <AuthCheck
          formUI={
            <CurationInterface
              curationContractAddress={curationContractAddress}
              network={Number(process.env.NEXT_PUBLIC_CHAIN_ID)}
              closeButton={
                <button onClick={requestClose} className="justify-end">
                  Close
                </button>
              }
              connectButton={<Connect />}
            />
          }
        />
      }
      trigger={trigger}
    />
  )
}
