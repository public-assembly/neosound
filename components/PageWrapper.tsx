import { Header } from './Header'
import { Backdrop } from './Backdrop'

export function PageWrapper({ children, ...props }: { children?: JSX.Element }) {
  return (
    <>
      <Header />
      <main {...props} className="z-10 relative">{children}</main>
      <Backdrop />
    </>
  )
}
