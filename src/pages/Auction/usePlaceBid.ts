import type { Address } from 'viem'
import { parseEther } from 'viem'
import { useContractWrite } from 'wagmi'

import { abi } from './constants'

export function usePlaceBid({ address, bidAmount = '0.01' }: { address: Address; bidAmount: string }) {
  const { writeAsync } = useContractWrite({
    address,
    functionName: 'placeBid',
    abi,
    value: parseEther(bidAmount),
  })

  const placeBid = async (nft: Address, tokenId: number) => writeAsync({ args: [nft, tokenId] })

  return { placeBid }
}
