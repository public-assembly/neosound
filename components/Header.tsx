import { DisconnectButton } from './auth'

export function Header() {
  return (
    <header className="flex w-full flex-row items-center justify-between px-8">
      <DisconnectButton />
    </header>
  )
}
