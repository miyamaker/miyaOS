import { values } from 'lodash'
import type { Address } from 'viem'
import { useContractRead } from 'wagmi'

import { abi } from './constants'

export function useNFTsList({ address }: { address: Address }) {
  const { data } = useContractRead({
    address,
    enabled: !!address,
    functionName: 'getNfts',
    abi,
  })

  const list = data || []
  const nfts = values(list)

  return {
    nftsList: [...nfts] as string[],
  }
}
