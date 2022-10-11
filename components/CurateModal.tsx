import { CurationInterface } from '@public-assembly/curation-interactions'
import { Connect } from './auth/Connect'
import { Modal } from '@/components/modal/Modal'
import { useModal } from '@/hooks/useModal'

export function CurateModal({ trigger }: { trigger?: JSX.Element }) {
  const { requestClose } = useModal()
  return (
    <>
      <Modal
        modalName="curation-interface"
        content={
          <div className="curation-interface">
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
          </div>
        }
        trigger={trigger}
      />
    </>
  )
}
