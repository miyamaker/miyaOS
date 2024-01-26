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

    const attributes = get(data, 'attributes') || []

    let artist = ''
    let currency = 'ETH'
    let product = ''

    // eslint-disable-next-line no-restricted-syntax
    for (const item of attributes) {
      if (item.trait_type === 'Product') {
        product = item.value
      }

      if (item.trait_type === 'Artist') {
        artist = item.value
      }

      if (item.trait_type === 'Currency') {
        currency = item.value
      }
    }

    return {
      id: nftId.toString(),
      name: get(data, 'name') || '',
      product,
      description: get(data, 'description') || '',
      artist,
      currency,
      images: [get(data, 'image') || ''],
      currentBid: Number(ethers.formatEther(get(auction, 'amount') || 0)),
    }
  })

  return Promise.all(d)
}
