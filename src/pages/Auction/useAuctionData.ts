import type { Address } from 'viem'
import { useContractReads } from 'wagmi'

import type { Auction } from '@/store/auction/reducer'

import { ADDRESS0 } from './constants'

export function useAuctionData({
  nft,
  tokenId,
  address,
  chainId,
}: {
  nft: Address
  tokenId: number
  address: Address
  chainId?: number
}) {
  const { data, refetch } = useContractReads({
    enabled: !!address && !!chainId,
    contracts: [
      {
        address,
        functionName: 'getAuction',
        abi: [
          {
            inputs: [
              {
                internalType: 'address',
                name: '_nft',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: '_tokenId',
                type: 'uint256',
              },
            ],
            name: 'getAuction',
            outputs: [
              {
                components: [
                  {
                    internalType: 'address',
                    name: 'bidder',
                    type: 'address',
                  },
                  {
                    internalType: 'uint96',
                    name: 'amount',
                    type: 'uint96',
                  },
                  {
                    internalType: 'uint96',
                    name: 'minPrice',
                    type: 'uint96',
                  },
                  {
                    internalType: 'uint40',
                    name: 'startTime',
                    type: 'uint40',
                  },
                  {
                    internalType: 'uint40',
                    name: 'endTime',
                    type: 'uint40',
                  },
                  {
                    internalType: 'bool',
                    name: 'settled',
                    type: 'bool',
                  },
                ],
                internalType: 'struct MiyaAuction.AuctionData',
                name: '',
                type: 'tuple',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
        ],
        args: [nft, tokenId],
      },
      {
        address,
        functionName: 'bidIncrement',
        abi: [
          {
            inputs: [],
            name: 'bidIncrement',
            outputs: [
              {
                internalType: 'uint96',
                name: '',
                type: 'uint96',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
        ],
      },
    ],
  })

  const auction = data?.[0]?.result as Auction
  const bidIncrement = data?.[1]?.result as bigint

  return {
    bidder: auction?.bidder || ADDRESS0,
    currentBid: (auction?.amount || 0n) as bigint,
    minPrice: (auction?.minPrice || 0n) as bigint,
    startTime: (auction?.startTime || 0) as number,
    endTime: (auction?.endTime || 0) as number,
    settled: (auction?.settled || false) as boolean,
    bidIncrement: bidIncrement || 0n,
    refetch,
  }
}
