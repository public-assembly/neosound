import { ConnectButton } from '@rainbow-me/rainbowkit'

export function Connect() {
  return (
    <ConnectButton.Custom>
      {({ account, chain, mounted, openAccountModal, openConnectModal }) => {
        if (!mounted || !account || !chain) {
          return (
            <button
              onClick={openConnectModal}
              className="ns-textLight flex items-center border border-white px-4 py-1  hover:text-white">
              Connect Wallet
            </button>
          )
        }
        if (chain?.unsupported) {
          return <div className="text-sm text-red-400">&#x26A0; Wrong Network</div>
        }
        return (
          <button onClick={openAccountModal}>
            <div className="flex items-center gap-2 text-sm">{account.displayName}</div>
          </button>
        )
      }}
    </ConnectButton.Custom>
  )
}
