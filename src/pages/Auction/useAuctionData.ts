// eslint-disable-next-line no-restricted-imports
import { ethers } from 'ethers'
import { get } from 'lodash'
import type { Address } from 'viem'
import { useContractRead } from 'wagmi'

import { abi } from './constants'

export function useAuctionData({ nftId, address, chainId }: { nftId: string; address: Address; chainId?: number }) {
  const { data, refetch } = useContractRead({
    address,
    enabled: !!address && !!chainId,
    functionName: 'auctionById',
    abi,
    args: [nftId],
  })

  return {
    currentBid: ethers.formatEther(get(data, 'amount') || 0),
    endTime: (get(data, 'endTime') || 0) as number,
    bidIncrement: ethers.formatEther(get(data, 'bidIncrement') || 0),
    bidder: get(data, 'bidder') || '0x',
    refetch,
  }
}
