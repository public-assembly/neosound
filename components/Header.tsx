import { DisconnectButton } from './auth'
import { Nav } from './Nav'

export function Header() {
  return (
    <header className="sticky top-0 flex w-full flex-row items-center justify-between px-6 sm:px-12">
      <Nav />
      <DisconnectButton />
    </header>
  )
}
