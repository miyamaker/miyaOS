import { type Address } from 'viem'
import { useContractRead } from 'wagmi'

export function useTotalSupply({ address }: { address?: Address }) {
  const { data: totalSupply } = useContractRead({
    address,
    enabled: !!address,
    functionName: 'totalSupply',
    abi: [
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
  })

  return (totalSupply as bigint) || 0n
}
