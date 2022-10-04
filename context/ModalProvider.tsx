import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  ReactNode,
} from 'react'
import { useEffect } from 'react'

export type ModalType = string | undefined

export type ModalState = {
  modalType?: ModalType
}

export type ModalContextType = [ModalState, Dispatch<SetStateAction<ModalState>>]

export const ModalContext = createContext<ModalContextType>([
  { modalType: undefined },
  () => null,
] as ModalContextType)

export const ModalProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const [modalState, setModalState] = useState<ModalState>({
    modalType: '0x47191cb94c0b6925db9f15e000cf8e3e8864fc9bTOE'
  })

  useEffect(() => {
    console.log('modalState', modalState)
  }, [modalState])

  return (
    <ModalContext.Provider
      value={[modalState, setModalState]}
    >
      <div
        id="modal-root"
        style={{ zIndex: 9000, position: 'fixed', top: 0, left: 0, }}
      />
      {children}
    </ModalContext.Provider>
  )
}
