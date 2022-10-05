import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  ReactNode,
} from 'react'

export type ModalType = string | undefined

export type ModalState = {
  modalType?: ModalType
}

export type ModalContextType = [ModalState, Dispatch<SetStateAction<ModalState>>]

export const ModalContext = createContext<ModalContextType>([
  { modalType: undefined },
  () => null,
] as ModalContextType)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalState, setModalState] = useState<ModalState>({
    modalType: undefined,
  })

  return (
    <ModalContext.Provider value={[modalState, setModalState]}>
      <div id="modal-root" style={{ zIndex: 9000, position: 'fixed', top: 0, left: 0 }} />
      {children}
    </ModalContext.Provider>
  )
}
