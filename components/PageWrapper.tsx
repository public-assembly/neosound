import { Header } from './Header'
import { Footer } from './Footer'

export function PageWrapper({ children, ...props }: {children?: JSX.Element}) {
  return (
    <>
      <Header />
      <main {...props}>
        {children}
      </main>
      <Footer />
    </>
  )
}
