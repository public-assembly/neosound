import { CHAIN_ID } from './chains'

export const ALCHEMY_KEY: string | undefined =
  CHAIN_ID === '1'
    ? process.env.NEXT_PUBLIC_ALCHEMY_KEY_MAINNET
    : CHAIN_ID === '5'
    ? process.env.NEXT_PUBLIC_ALCHEMY_KEY_GOERLI
    : undefined
