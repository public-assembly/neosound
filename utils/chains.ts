export const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID as '1' | '5' | undefined

if (!CHAIN_ID) {
  throw new Error('ChainID is required.')
}
