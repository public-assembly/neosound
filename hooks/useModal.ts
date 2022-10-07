import { ModalContext, ModalContextType, ModalType } from '@/context/ModalProvider'
import { useCallback, useContext } from 'react'

export function useModal() {
  const [state, setState] = useContext<ModalContextType>(ModalContext)
  const { modalType } = state

  const requestClose = useCallback(async () => {
    setState({ modalType: undefined })
  }, [setState])

  const requestOpen = useCallback(
    async (nextModalType: ModalType) => {
      if (nextModalType === modalType) {
        return
      }
      return setState({
        modalType: nextModalType,
      })
    },
    [modalType, setState]
  )

  const setModalType = useCallback(
    (modalType: ModalType) => setState({ modalType }),
    [setState]
  )

  return {
    modalType,
    setModalType,
    requestClose,
    requestOpen,
  }
}
