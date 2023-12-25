import { type Address } from 'viem'
import { useContractRead, useContractWrite } from 'wagmi'

export function usePrice({ address }: { address?: Address }) {
  const { data: price, refetch } = useContractRead({
    address,
    enabled: !!address,
    functionName: 'price',
    abi: [
      {
        inputs: [],
        name: 'price',
        outputs: [{ internalType: 'uint80', name: '', type: 'uint80' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
  })

  const { writeAsync } = useContractWrite({
    address,
    functionName: 'setPrice',
    abi: [
      {
        inputs: [{ internalType: 'uint80', name: '_price', type: 'uint80' }],
        name: 'setPrice',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
  })

  const setPrice = async (input: bigint) => writeAsync({ args: [input] })

  return { price: (price as bigint) || 0n, setPrice, refetch }
}
