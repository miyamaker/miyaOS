import { useFetch } from 'usehooks-ts'

import type { ContractMetadata } from '@/store/collections/reducer'

export function useContractMetadata({ metadataUri }: { metadataUri: string }) {
  let contractUri = metadataUri
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

  let imageUri = contractMetadata?.image || ''
  if (imageUri.includes('ipfs://')) {
    imageUri = (contractMetadata?.image || '').replace('ipfs://', '')
    const cid = imageUri.split('/')[0]
    const imageFile = imageUri.split('/')[1]
    imageUri = `https://${cid}.ipfs.nftstorage.link/${imageFile}`
  }

  return {
    description: contractMetadata?.description || '',
    image: imageUri,
    externalLink: contractMetadata?.external_link || '',
    collaborators: contractMetadata?.collaborators || [],
  }
}
