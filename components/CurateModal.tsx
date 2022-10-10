import { CurationInterface } from '@public-assembly/curation-interactions'
import { Modal } from '@/components/modal/Modal'
import { useModal } from '@/hooks/useModal'
import { isClientSide } from '@/utils/window'
import { AuthCheck } from './auth'
import { Connect } from './auth/Connect'

export function CurateModal({ trigger }: { trigger?: JSX.Element }) {
  const { requestClose } = useModal()
  if (!isClientSide) return null
  return (
    <>
      
      <Modal
        modalName="curation-interface"
        content={
          <AuthCheck
            formUI={
              <CurationInterface
                curationContractAddress={process.env.NEXT_PUBLIC_CURATION_CONTRACT}
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
    </>
  )
}
