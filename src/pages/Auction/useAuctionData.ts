import { ethers } from 'ethers'
import type { Address } from 'viem'
import { useContractRead } from 'wagmi'

import { abi } from './constants'

export function useAuctionData({ address, chainId }: { address: Address; chainId?: number }) {
  const { data, refetch } = useContractRead({
    address,
    enabled: !!address && !!chainId,
    functionName: 'auctionData',
    abi,
  })

  return {
    currentBid: ethers.formatEther(data?.amount || 0) as number,
    endTime: (data?.endTime || 0) as number,
    bidIncrement: ethers.formatEther(data?.bidIncrement || 0) as number,
    reservePrice: ethers.formatEther(data?.reservePrice || 0) as number,
    refetch,
  }
}
