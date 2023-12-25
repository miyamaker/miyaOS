import type { Address } from 'viem'
import { useContractRead } from 'wagmi'

export function useName({ address }: { address?: Address }) {
  const { data: name, refetch } = useContractRead({
    address,
    enabled: !!address,
    functionName: 'name',
    abi: [
      {
        inputs: [],
        name: 'name',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
  })

  return { realName: name as string, setRealName: () => null, refetch }
}
