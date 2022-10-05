import { useCallback } from 'react'
import { useModal } from '@/hooks/useModal'
import { motion, AnimatePresence } from 'framer-motion'
import { ModalPortal } from './ModalPortal'
import { ModalOverlay } from './ModalOverlay'

export type ModalProps = {
  /** Unique identifier / key for the modal */
  modalName: string
  /** Content housed inside of modal */
  content: JSX.Element
  /** Contents that will be wrapped by an unstyled button element to open the modal */
  trigger: JSX.Element
}

export function Modal({ modalName, content, trigger }: ModalProps) {
  const { modalType, requestClose, requestOpen } = useModal()

  const modalHandler = useCallback(() => {
    requestOpen(modalName)
  }, [modalName, requestOpen])

  return (
    <>
      <div className="flex">
        <button onClick={modalHandler}>{trigger}</button>
      </div>
      <ModalPortal>
        <AnimatePresence>
          {modalName === modalType && (
            <>
              <motion.div
                id={`popout-${modalName}`}
                transition={{ duration: 0.25 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="neosound__modal--wrapper">
                <div className="neosound__modal--inner">{content}</div>
              </motion.div>
              <ModalOverlay modalName={modalName} />
            </>
          )}
        </AnimatePresence>
      </ModalPortal>
    </>
  )
}
