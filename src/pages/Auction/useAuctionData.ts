import { ethers } from 'ethers'
import type { Address } from 'viem'
import { useContractRead } from 'wagmi'

import { get } from 'lodash'
import { abi } from './constants'

export function useAuctionData({ address, chainId }: { address: Address; chainId?: number }) {
  const { data, refetch } = useContractRead({
    address,
    enabled: !!address && !!chainId,
    functionName: 'auctionData',
    abi,
  })

  return {
    currentBid: ethers.formatEther(get(data, 'amount') || 0),
    endTime: (get(data, 'endTime') || 0) as number,
    bidIncrement: ethers.formatEther(get(data, 'bidIncrement') || 0),
    reservePrice: ethers.formatEther(get(data, 'reservePrice') || 0),
    refetch,
  }
}
