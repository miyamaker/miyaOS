import type { Address } from 'viem'
import { parseEther } from 'viem'
import { useContractWrite } from 'wagmi'

import { abi } from './constants'

export function useBidTees({ address, bidAmount = '0.01' }: { address: Address; bidAmount: string }) {
  const { writeAsync } = useContractWrite({
    address,
    functionName: 'bidTees',
    abi,
    value: parseEther(bidAmount),
  })

  const bidTees = async (nftId: string) => writeAsync({ args: [nftId] })

  return { bidTees }
}
