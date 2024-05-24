import type { Address } from 'viem'
import { useContractRead } from 'wagmi'

export function useNFTPrice({ address }: { address: Address }) {
  const { data: price } = useContractRead({
    address,
    enabled: !!address,
    functionName: 'price',
    abi: [
      {
        inputs: [],
        name: 'price',
        outputs: [
          {
            internalType: 'uint80',
            name: '',
            type: 'uint80',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
  })

  return {
    price: (price as bigint) || 0n,
  }
}
