import { ConnectButton } from './ConnectButton'

export function Header() {
  return (
    <header className="flex flex-row justify-between items-center w-full px-8">
      <span className="text-2xl">Header</span>
      <ConnectButton />
    </header>
  )
}
