import type { Address } from 'viem'
import { useContractReads } from 'wagmi'
import { useFetch } from 'usehooks-ts'

import type { ContractMetadata } from '@/store/auction/reducer'

export function useNFT({ address }: { address: Address }) {
  const { data } = useContractReads({
    enabled: !!address,
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
    ],
  })

  let contractUri = data?.[0]?.result as string | ''
  const symbol = data?.[1]?.result as string | ''

  if (contractUri.includes('ipfs://')) {
    const uri = contractUri.replace('ipfs://', '')
    const cid = uri.split('/')[0]
    const contractFile = uri.split('/')[1]
    contractUri = `https://${cid}.ipfs.nftstorage.link/${contractFile}`
  }

  const { data: contractMetadata, error } = useFetch<ContractMetadata>(contractUri)

  if (error) {
    return { name: '', symbol: '', description: '', image: '', externalLink: '', collaborators: [] }
  }

  let imageUri = (contractMetadata?.image || '').replace('ipfs://', '')
  const cid = imageUri.split('/')[0]
  const imageFile = imageUri.split('/')[1]
  imageUri = `https://${cid}.ipfs.nftstorage.link/${imageFile}`

  return {
    name: contractMetadata?.name || '',
    symbol,
    description: contractMetadata?.description || '',
    image: imageUri,
    externalLink: contractMetadata?.external_link || '',
    collaborators: contractMetadata?.collaborators || [],
  }
}
