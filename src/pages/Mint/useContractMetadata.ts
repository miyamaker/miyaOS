import { useFetch } from 'usehooks-ts'

import type { ContractMetadata } from '@/store/collections/reducer'

export function useContractMetadata({ metadataUri }: { metadataUri: string }) {
  let contractUri = metadataUri
  if (contractUri.includes('ipfs://')) {
    const imageCID = contractUri.replace('ipfs://', '')
    contractUri = `https://nftstorage.link/ipfs/${imageCID}`
  }

  if (contractUri.includes('ar://')) {
    const imageCID = contractUri.replace('ar://', '')
    contractUri = `https://gateway.irys.xyz/${imageCID}`
  }

  const { data: contractMetadata, error } = useFetch<ContractMetadata>(contractUri)

  if (error) {
    return { name: '', symbol: '', description: '', image: '', externalLink: '', collaborators: [] }
  }

  let imageUri = contractMetadata?.image || ''
  if (imageUri.includes('ipfs://')) {
    const imageCID = (contractMetadata?.image || '').replace('ipfs://', '')
    imageUri = `https://nftstorage.link/ipfs/${imageCID}`
  }

  if (imageUri.includes('ar://')) {
    const imageCID = (contractMetadata?.image || '').replace('ar://', '')
    imageUri = `https://gateway.irys.xyz/${imageCID}`
  }

  return {
    description: contractMetadata?.description || '',
    image: imageUri,
    externalLink: contractMetadata?.external_link || '',
    collaborators: contractMetadata?.collaborators || [],
  }
}
