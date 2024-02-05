import { values } from 'lodash'
import type { Address } from 'viem'
import { useContractRead } from 'wagmi'

import { abi } from './constants'

export function useNFTsList({ address, chainId }: { address: Address; chainId?: number }) {
  const { data } = useContractRead({
    address,
    enabled: !!address && !!chainId,
    functionName: 'getNfts',
    abi,
  })

  const list = data || []
  const nfts = values(list)

  return {
    nftsList: [...nfts] as string[],
  }
}
