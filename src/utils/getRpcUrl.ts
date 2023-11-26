/**
 * Helper function to return the RPC URL associated with the given currency.
 * All values are pulled from the .env.local file
 *
 * @param currency The name of the currency used.
 * @returns
 */
function getRpcUrl(currency: string): string | undefined {
  const RPC_URLS: Record<string, string | undefined> = {
    arbitrum: 'https://arb1.arbitrum.io/rpc',
    chainlink: 'https://rpc.sepolia.dev', // For Chainlink, return Ethereum RPC
    ethereum: 'https://rpc.sepolia.dev',
    matic: 'https://rpc-mumbai.maticvigil.com',
  }

  return RPC_URLS[currency]
}

export default getRpcUrl
