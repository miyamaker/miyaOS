/**
 * Helper function to return the RPC URL associated with the given currency.
 * All values are pulled from the .env.local file
 *
 * @param currency The name of the currency used.
 * @returns
 */
function getIrysToken(chainId: number): string | undefined {
  const RPC_URLS: Record<number, string | undefined> = {
    42161: 'arbitrum',
    1: 'ethereum',
    137: 'matic',
  }

  return RPC_URLS[chainId]
}

export default getIrysToken
