import { type Address } from 'viem'
import { useContractRead, useContractWrite } from 'wagmi'

export function useMaxSupply({ address }: { address?: Address }) {
  const { data: maxSupply, refetch } = useContractRead({
    address,
    enabled: !!address,
    functionName: 'maxSupply',
    abi: [
      {
        inputs: [],
        name: 'maxSupply',
        outputs: [{ internalType: 'uint40', name: '', type: 'uint40' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
  })

  const { writeAsync } = useContractWrite({
    address,
    functionName: 'decreaseSupply',
    abi: [
      {
        inputs: [{ internalType: 'uint40', name: '_maxSupply', type: 'uint40' }],
        name: 'decreaseSupply',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
  })

  const decreaseSupply = async (input: bigint) => writeAsync({ args: [input] })

  return { maxSupply: (maxSupply as bigint) || 0n, decreaseSupply, refetch }
}
