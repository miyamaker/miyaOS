/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable no-underscore-dangle */
import { WebIrys } from '@irys/sdk'
import type { Chain } from '@rainbow-me/rainbowkit'
import { getAccount } from '@wagmi/core'
import type { Address } from 'viem'
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'wagmi'

interface WindowWithEthereum extends Window {
  ethereum?: any
}

/**
 * Creates a new Irys object with the specified configuration.
 *
 * @param {string} url - The Irys network URL.
 * @param {string} token - The currency to use (e.g., "matic").
 * @param {string} providerUrl - The provider URL for the Ethereum network.
 * @returns {Promise<WebIrys>} - A reference to the initialized Irys object.
 */
const getIrys = async (
  url: string = import.meta.env.VITE_IRYS_NODE || '',
  token: string = import.meta.env.VITE_IRYS_TOKEN || '',
  chain: Chain = mainnet
): Promise<WebIrys> => {
  await (window as WindowWithEthereum).ethereum.enable()
  const account = getAccount()
  const provider = createWalletClient({
    account: account.address,
    chain,
    transport: custom(window.ethereum),
  })
  // @ts-expect-error injected
  provider.getSigner = () => provider

  // @ts-expect-error injected
  provider.getAddress = async () => provider.getAddresses().then((a) => a[0])
  const wallet = { name: 'viem', provider }
  const webIrys = new WebIrys({ url, token, wallet })
  await webIrys.ready()

  // @ts-expect-error injected
  webIrys.tokenConfig.getFee = async (_amount, _to): Promise<number> => {
    return 0
  }

  // Otherwise
  webIrys.tokenConfig.sendTx = async (data): Promise<string> => {
    const hash = await provider.sendTransaction({
      to: data.to,
      value: data.amount,
      account: webIrys.address as `0x${string}`,
    })
    return hash
  }

  webIrys.tokenConfig.createTx = async (amount, to, fee): Promise<{ txId: string | undefined; tx: any }> => {
    // dummy value/method
    return { txId: undefined, tx: { amount, to, fee } }
  }

  await webIrys.ready()

  // @ts-expect-error injected
  provider._signTypedData = async (domain, types, message) => {
    message['Transaction hash'] = `0x${Buffer.from(message['Transaction hash']).toString('hex')}`
    return await provider.signTypedData({
      domain,
      message,
      types,
      account: webIrys.address! as Address,
      primaryType: 'Bundlr',
    })
  }

  console.log(`Conected to webIrys from ${webIrys.address}`)
  return webIrys
}

export default getIrys
