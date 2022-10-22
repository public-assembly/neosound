import { CHAIN_ID } from './chains'

export const CONTRACT_ADDRESS: string | undefined =
  CHAIN_ID === '1'
    ? process.env.NEXT_PUBLIC_CONTRACT_MAINNET
    : CHAIN_ID === '5'
    ? process.env.NEXT_PUBLIC_CONTRACT_GOERLI
    : undefined
