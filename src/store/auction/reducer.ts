import { createReducer } from '@reduxjs/toolkit'
import { remove } from 'lodash'

import { product, products } from '@/pages/Auction/constants'
import { getCurrentNFT } from '@/store/auction/actions'

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
  builder.addCase(getCurrentNFT, (state, action) => {
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
)
