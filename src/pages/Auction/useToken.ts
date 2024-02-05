import { useFetch } from 'usehooks-ts'

import type { TokenMetadata } from '@/store/collections/reducer'

export function useToken({ tokenURI, isFetch }: { tokenURI: string; isFetch: boolean }) {
  if (!isFetch) {
    return {
      name: '',
      description: '',
      image: '',
      externalURL: '',
      attributes: [],
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: tokenMetadata, error } = useFetch<TokenMetadata>(tokenURI)

  if (error) {
    return { name: '', description: '', image: '', externalURL: '', attributes: [] }
  }

  let imageUri = (tokenMetadata?.image || '').replace('ipfs://', '')
  const cid = imageUri.split('/')[0]
  const imageFile = imageUri.split('/')[1]
  imageUri = `https://${cid}.ipfs.nftstorage.link/${imageFile}`

  return {
    name: tokenMetadata?.name || '',
    description: tokenMetadata?.description || '',
    image: imageUri,
    externalURL: tokenMetadata?.external_url || '',
    attributes: tokenMetadata?.attributes || [],
  }
}
