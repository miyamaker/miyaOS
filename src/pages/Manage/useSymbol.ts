import type { Address } from 'viem'
import { useContractRead } from 'wagmi'

export function useSymbol({ address }: { address?: Address }) {
  const { data: symbol } = useContractRead({
    address,
    enabled: !!address,
    functionName: 'symbol',
    abi: [
      {
        inputs: [],
        name: 'symbol',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
  })

  return symbol as string
}
