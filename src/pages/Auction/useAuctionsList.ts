import { values } from 'lodash'
import type { Address } from 'viem'
import { useContractRead } from 'wagmi'

import type { Auction } from '@/store/auction/reducer'

import { abi } from './constants'

export function useAuctionsList({ nft, address, chainId }: { nft: Address; address: Address; chainId?: number }) {
  const { data, refetch } = useContractRead({
    address,
    enabled: !!address && !!chainId,
    functionName: 'getActiveAuctionsList',
    abi,
    args: [nft],
  })

  const list = data || []
  const auctions = values(list)

  return {
    auctionsList: [...auctions] as Auction[],
    refetch,
  }
}
