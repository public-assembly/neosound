import NextNProgress from 'nextjs-progressbar'
import { getDefaultWallets, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit'
import { WagmiConfig, configureChains, createClient, defaultChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { SWRConfig } from 'swr'
import '@rainbow-me/rainbowkit/styles.css'
import { ModalProvider } from '@/context/ModalProvider'
import { CHAIN_ID, ALCHEMY_KEY } from '../utils'

const { chains, provider } = configureChains(
  [defaultChains.find((chain) => chain.id.toString() === CHAIN_ID)!],
  [
    alchemyProvider({
      apiKey: ALCHEMY_KEY,
      priority: 0,
    }),
    publicProvider(),
  ]
)
const { connectors } = getDefaultWallets({
  appName: 'NeoSound',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export function AppWrapper({ children }: { children: JSX.Element }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        coolMode
        theme={lightTheme({
          accentColor: 'black',
          borderRadius: 'large',
        })}>
        <SWRConfig
          value={{
            fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
          }}>
          <NextNProgress
            color="rgba(0,0,0,.5)"
            startPosition={0.125}
            stopDelayMs={200}
            height={2}
            showOnShallow={true}
            options={{ showSpinner: false }}
          />
          <ModalProvider>{children}</ModalProvider>
        </SWRConfig>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
