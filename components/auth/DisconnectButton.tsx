import { useAuth } from 'hooks/useAuth'

export function DisconnectButton() {
  const { logout, isConnected } = useAuth()
  if (!isConnected) return null
  return (
    <button
      className="ns-textLight flex items-center border border-white px-4 py-1  hover:text-white"
      onClick={() => logout()}>
      Disconnect
    </button>
  )
}
