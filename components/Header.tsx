import dynamic from 'next/dynamic'

const DisconnectButton = dynamic(() => import('./auth/DisconnectButton'), {
  ssr: false,
})

const Nav = dynamic(() => import('./Nav'), {
  ssr: false,
})

export function Header() {
  return (
    <header className="sticky top-0 flex w-full flex-row items-center justify-between px-6 sm:px-12">
      <Nav />
      <DisconnectButton />
    </header>
  )
}
