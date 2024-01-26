import type { Address } from 'viem'
import { useContractRead } from 'wagmi'

import { abi } from './constants'

export function useAuctionsList({ address, chainId }: { address: Address; chainId?: number }) {
  const { data, refetch } = useContractRead({
    address,
    enabled: !!address && !!chainId,
    functionName: 'auctionsList',
    abi,
  })

  return {
    auctionsList: data || [],
    refetch,
  }
}
