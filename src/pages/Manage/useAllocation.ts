import { type Address } from 'viem'
import { useContractRead, useContractWrite } from 'wagmi'

export function useAllocation({ address }: { address?: Address }) {
  const { data: allocation, refetch } = useContractRead({
    address,
    enabled: !!address,
    functionName: 'allocation',
    abi: [
      {
        inputs: [],
        name: 'allocation',
        outputs: [{ internalType: 'uint16', name: '', type: 'uint16' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
  })

  const { writeAsync } = useContractWrite({
    address,
    functionName: 'increaseAlignment',
    abi: [
      {
        inputs: [{ internalType: 'uint16', name: '_allocation', type: 'uint16' }],
        name: 'decreaseSupply',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
  })

  const increaseAllocation = async (input: bigint) => writeAsync({ args: [input] })

  return { allocation: (allocation as bigint) || 0n, increaseAllocation, refetch }
}
