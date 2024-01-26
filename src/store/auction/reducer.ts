import { createReducer } from '@reduxjs/toolkit'
// eslint-disable-next-line no-restricted-imports
import { ethers } from 'ethers'
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

export type Auction = {
  bidder: string
  miyaNFTId: string
  amount: number
  withdrawable: number
  settled: boolean
  miyaNFT: string
  reservePercentage: number
  bidIncrement: number
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
      const list: Product[] = []
      auctions.map(async (auction) => {
        const nftId = Number(auction?.miyaNFTId ?? '1')
        const tokenURI = `${NFT_BASE_URI}${nftId}.json`

        const response = await fetch(tokenURI)
        const data = await response.json()

        list.push({
          id: nftId.toString(),
          product: get(data, 'name') || '',
          description: get(data, 'description') || '',
          artist: get(data, 'artist') || '',
          currency: get(data, 'currency') || '',
          images: [get(data, 'image') || ''],
          currentBid: Number(ethers.formatEther(get(auction, 'amount') || 0)),
        })

        console.log(list)
      })

      const current = list.pop()
      if (current) state.currentProduct = current
      state.productsList = [...list]
    })
)
