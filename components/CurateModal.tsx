import { CurationInterface } from '@public-assembly/assemble-curation-interface'
import { usePlaylistProvider } from '../context'
import { useAuth } from '../hooks'
import { Modal } from '@/components/modal/Modal'
import { useModal } from '@/hooks/useModal'
import { isClientSide } from '@/utils/window'
import { AuthCheck } from './auth'

export function CurateModal({ trigger }: { trigger?: JSX.Element }) {
  const { curationContractAddress } = usePlaylistProvider()
  const { address, isConnected } = useAuth()
  const { requestClose } = useModal()
  if (!isClientSide) return null
  return (
    <Modal
      modalName='curation-interface'
      content={
        <AuthCheck formUI={<CurationInterface
          connectionStatus={isConnected}
          userAddress={address}
          curationContractAddress={curationContractAddress}
          network={Number(process.env.NEXT_PUBLIC_CHAIN_ID)}
          closeButton={<button onClick={requestClose} className="justify-end">Close</button>}
        />}/>
      }
      trigger={trigger}
    />
  )
}