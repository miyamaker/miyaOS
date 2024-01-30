import type { Address } from 'viem'
import { useContractReads } from 'wagmi'

import type { ContractMetadata } from '@/store/auction/reducer'

export function useNFT({ address, chainId }: { address: Address; chainId?: number }) {
  const { data } = useContractReads({
    enabled: !!address && !!chainId,
    contracts: [
      {
        address,
        functionName: 'contractURI',
        abi: [
          {
            inputs: [],
            name: 'contractURI',
            outputs: [
              {
                internalType: 'string',
                name: '',
                type: 'string',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
        ],
      },
      {
        address,
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
      },
      {
        address,
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
      },
    ],
  })

  const contractUri = data?.[0]?.result as string | ''
  const symbol = data?.[1]?.result as string | ''
  const supply = data?.[2]?.result as bigint | 0n

  if (contractUri) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { name, description, image, external_link, collaborators } = JSON.parse(
      (contractUri as string).split('data:application/json;utf8,')[1] as string
    ) as ContractMetadata

    return { name, symbol, description, image, externalLink: external_link, collaborators, supply }
  }

  return { name: '', symbol: '', description: '', image: '', externalLink: '', collaborators: [], supply: 0n }
}
