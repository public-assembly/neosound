import { useAuth } from 'hooks/useAuth'
import { Connect } from './Connect'

export function AuthCheck({ formUI }: { formUI?: JSX.Element }) {
  const { isConnected } = useAuth()
  return <div className={`ns-surfacePrimary`}>{!isConnected ? <Connect /> : formUI}</div>
}
