import { useCallback, useEffect, useState } from 'react'
import type { Address } from 'viem'

import { useTokenURI } from '@/pages/Mint/useTokenURI'
import type { TokenMetadata } from '@/store/collections/reducer'

export function useTokenMetadata({ address, tokenId }: { address: Address; tokenId: string }) {
  const [NFTMetadata, setNFTMetadata] = useState<TokenMetadata>({
    name: '',
    description: '',
    image: '',
    external_url: '',
    attributes: [],
  } as TokenMetadata)
  const { tokenURI, status } = useTokenURI({ address, tokenId })

  const fetchData = useCallback(async () => {
    if (tokenURI && status === 'success') {
      try {
        const uri = tokenURI as string
        let link = uri
        if (uri.includes('ipfs://')) {
          const cid = uri.replace('ipfs://', '')
          link = `https://nftstorage.link/ipfs/${cid}`
        }

        if (uri.includes('ar://')) {
          const cid = uri.replace('ar://', '')
          link = `https://gateway.irys.xyz/${cid}`
        }

        const response = await fetch(link)
        const data = await response.json()
        setNFTMetadata(data as TokenMetadata)
      } catch (_) {
        setNFTMetadata({
          name: '',
          description: '',
          image: '',
          external_url: '',
          attributes: [],
        })
      }
    }
  }, [status, tokenURI])

  useEffect(() => {
    fetchData()
  }, [])

  let imageUri = NFTMetadata?.image || ''
  if (imageUri.includes('ipfs://')) {
    const cid = imageUri.replace('ipfs://', '')
    imageUri = `https://nftstorage.link/ipfs/${cid}`
  }

  if (imageUri.includes('ar://')) {
    const cid = imageUri.replace('ar://', '')
    imageUri = `https://gateway.irys.xyz/${cid}`
  }

  return {
    name: NFTMetadata?.name || '',
    description: NFTMetadata?.description || '',
    image: imageUri,
    externalURL: NFTMetadata?.external_url || '',
    attributes: NFTMetadata?.attributes || [],
  }
}
