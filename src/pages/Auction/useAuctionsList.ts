import type { Address } from 'viem'
import { useContractRead } from 'wagmi'

import type { Auction } from '@/store/auction/reducer'

import { abi } from './constants'

export function useAuctionsList({ address, chainId }: { address: Address; chainId?: number }) {
  const { data, refetch } = useContractRead({
    address,
    enabled: !!address && !!chainId,
    functionName: 'auctionsList',
    abi,
  })

  const list = data || []

  return {
    auctionsList: [...[list]] as Auction[],
    refetch,
  }
}
