import React from 'react'
import { createPortal } from 'react-dom'
import { isClientSide } from '@/utils/window'

export const ModalPortal: React.FC<{children?: React.ReactNode}> = ({ children }) => {
  const el = React.useRef(document.createElement('div'))

  React.useEffect(() => {
    const popoutRoot = document.querySelector('#modal-root') as HTMLElement
    popoutRoot!.appendChild(el.current)
    return () => void popoutRoot!.removeChild(el.current)
  }, [])

  if (!isClientSide) return null

  return createPortal(children, el.current)
}
