import { useAuth } from 'hooks/useAuth'
import { isClientSide } from '@/utils/window'

export default function DisconnectButton() {
  const { logout, isConnected } = useAuth()
  if (!isClientSide || !isConnected) return null
  return (
    <button
      className="ns-textLight flex items-center border border-white px-4 py-1  hover:text-white"
      onClick={() => logout()}>
      Disconnect
    </button>
  )
}
