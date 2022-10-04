import { useAuth } from 'hooks/useAuth'
import { Connect } from './Connect'

export function AuthCheck({ formUI }: { formUI?: JSX.Element }) {
  const { isConnected } = useAuth()
  return (
    <div className={`ns-surfacePrimary p-4`}>
      {!isConnected ? (
        <div>
          <Connect />
        </div>
      ) : (
        <div>{formUI}</div>
      )}
    </div>
  )
}
