import React from 'react'
import { createPortal } from 'react-dom'
import { isClientSide } from '@/utils/window'

export const ModalPortal: React.FC<{children?: React.ReactNode}> = ({ children }) => {
  if (!isClientSide) return null
  
  const el = React.useRef(document.createElement('div'))

  React.useEffect(() => {
    const popoutRoot = document.querySelector('#modal-root') as HTMLElement
    popoutRoot!.appendChild(el.current)
    return () => void popoutRoot!.removeChild(el.current)
  }, [])

  return createPortal(children, el.current)
}
