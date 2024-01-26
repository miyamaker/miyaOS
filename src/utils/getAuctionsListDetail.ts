// eslint-disable-next-line no-restricted-imports
import { ethers } from 'ethers'
import { get } from 'lodash'

import { NFT_BASE_URI } from '@/pages/Auction/constants'
import type { Auction } from '@/store/auction/reducer'

export async function getAuctionsListDetail(auctions: Auction[]) {
  const d = auctions.map(async (auction) => {
    const nftId = Number(auction?.miyaNFTId ?? '1')
    const tokenURI = `${NFT_BASE_URI}${nftId}.json`

    const response = await fetch(tokenURI)
    const data = await response.json()

    return {
      id: nftId.toString(),
      product: get(data, 'name') || '',
      description: get(data, 'description') || '',
      artist: get(data, 'artist') || '',
      currency: get(data, 'currency') || 'ETH',
      images: [get(data, 'image') || ''],
      currentBid: Number(ethers.formatEther(get(auction, 'amount') || 0)),
    }
  })

  return Promise.all(d)
}
