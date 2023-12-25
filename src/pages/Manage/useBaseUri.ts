import type { Address } from 'viem'
import { useContractReads, useContractWrite } from 'wagmi'

export function useBaseUri({ address }: { address?: Address }) {
  const { data, refetch } = useContractReads({
    enabled: !!address,
    contracts: [
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
      {
        address,
        functionName: 'uriLocked',
        abi: [
          {
            inputs: [],
            name: 'uriLocked',
            outputs: [{ internalType: 'boolean', name: '', type: 'boolean' }],
            stateMutability: 'view',
            type: 'function',
          },
        ],
      },
    ],
  })

  const baseUri = data?.[0]?.result as string | undefined
  const uriLocked = data?.[1]?.result as boolean | undefined

  const { writeAsync } = useContractWrite({
    address,
    functionName: 'setBaseURI',
    abi: [
      {
        inputs: [{ internalType: 'string', name: 'baseURI_', type: 'string' }],
        name: 'setBaseURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
  })

  const { writeAsync: writeAsyncLock } = useContractWrite({
    address,
    functionName: 'lockURI',
    abi: [
      {
        inputs: [],
        name: 'lockURI',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
  })

  const setBaseUri = async (input: string) => writeAsync({ args: [input] })
  const lockUri = async () => writeAsyncLock({ args: [] })

  return { baseUri: baseUri || '', uriLocked: uriLocked || false, setBaseUri, lockUri, refetch }
}
