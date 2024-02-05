import type { Address } from 'viem'
import { useContractRead } from 'wagmi'

export function useBaseURI({ address, chainId }: { address: Address; chainId?: number }) {
  const { data: baseURI } = useContractRead({
    address,
    enabled: !!address && !!chainId,
    functionName: 'baseURI',
    abi: [
      {
        address,
        functionName: 'baseURI',
        abi: [
          {
            inputs: [],
            name: 'baseURI',
            outputs: [{ internalType: 'string', name: '', type: 'string' }],
            stateMutability: 'view',
            type: 'function',
          },
        ],
      },
    ],
  })

  return {
    baseURI: baseURI as string | '',
  }
}
