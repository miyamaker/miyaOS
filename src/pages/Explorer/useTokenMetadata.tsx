import { useFetch } from 'usehooks-ts'
import type { Address } from 'viem'

import { useTokenURI } from '@/pages/Explorer/useTokenURI'
import type { TokenMetadata } from '@/store/collections/reducer'

export function useTokenMetadata({ address, tokenId }: { address: Address; tokenId: string }) {
  const { tokenURI, status } = useTokenURI({ address, tokenId })
  if (!tokenURI || status !== 'success') {
    return { name: '', description: '', image: '', externalURL: '', attributes: [] }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: tokenMetadata, error } = useFetch<TokenMetadata>(tokenURI)

  if (error) {
    return { name: '', description: '', image: '', externalURL: '', attributes: [] }
  }

  let imageUri = tokenMetadata?.image || ''
  if (imageUri.includes('ipfs://')) {
    imageUri = (tokenMetadata?.image || '').replace('ipfs://', '')
    const cid = imageUri.split('/')[0]
    const imageFile = imageUri.split('/')[1]
    imageUri = `https://${cid}.ipfs.nftstorage.link/${imageFile}`
  }

  return {
    name: tokenMetadata?.name || '',
    description: tokenMetadata?.description || '',
    image: imageUri,
    externalURL: tokenMetadata?.external_url || '',
    attributes: tokenMetadata?.attributes || [],
  }
}
