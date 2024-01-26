import { createReducer } from '@reduxjs/toolkit'
import { get, remove } from 'lodash'

import { NFT_BASE_URI, product, products } from '@/pages/Auction/constants'
import { getCurrentNFT, updateAuctionsList } from '@/store/auction/actions'

export type Product = {
  id: string
  product: string
  description: string
  artist: string
  currentBid: number
  currency: string
  images: string[]
}

export interface AuctionState {
  productsList: Product[]
  currentProduct: Product
}

export const initialState: AuctionState = {
  productsList: products,
  currentProduct: product,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(getCurrentNFT, (state, action) => {
      const nftId = action.payload.id
      const current = state.currentProduct
      const list = state.productsList

      list.forEach((item: Product) => {
        if (item.id === nftId) {
          state.currentProduct = item
        }
      })

      remove(list, (item: Product) => item.id === nftId)
      state.productsList = [current, ...list]
    })
    .addCase(updateAuctionsList, (state, action) => {
      const { auctions } = action.payload

      // eslint-disable-next-line array-callback-return
      const list = []
      let p: Product
      auctions.map(async (auction) => {
        const tokenURI = `${NFT_BASE_URI}${get(auction, 'miyaNFTId')}.json`

        const data = await fetch(tokenURI)
        p.id = get(data, 'data.id') || ''
        p.product = get(data, 'data.product') || ''
        p.description = get(data, 'data.description') || ''
        p.artist = get(data, 'data.artist') || ''
        p.currency = get(data, 'data.currency') || ''
        p.images = get(data, 'data.images') || []

        p.currentBid = get(auction, 'amount') || 0

        list.push(p)
      })

      state.currentProduct = list.pop()
      state.productsList = [...list]
    })
)
