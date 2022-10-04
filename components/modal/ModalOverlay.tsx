import PreventOutsideScroll from 'react-prevent-outside-scroll'
import { useModal } from '@/hooks/useModal'
import { motion, AnimatePresence } from 'framer-motion'

export function ModalOverlay({ modalName }: { modalName: string }) {
  const { modalType, requestClose } = useModal()

  return (
    <AnimatePresence>
      {modalName === modalType && (
        <PreventOutsideScroll>
          <motion.div
            transition={{ duration: 0.5 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 1000,
              backdropFilter: 'blur(5px)',
            }}
            onClick={requestClose}
          />
        </PreventOutsideScroll>
      )}
    </AnimatePresence>
  )
}
