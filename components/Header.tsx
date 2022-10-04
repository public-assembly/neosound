import { DisconnectButton } from './auth'
import { Nav } from './Nav'

export function Header() {
  return (
    <header className="flex w-full flex-row items-center justify-between px-8 sticky top-0">
      <Nav />
      <DisconnectButton />
    </header>
  )
}
