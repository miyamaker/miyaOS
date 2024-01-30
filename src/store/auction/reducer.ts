import { createReducer } from '@reduxjs/toolkit'
import { remove } from 'lodash'
import type { Address } from 'viem'
import { mainnet } from 'wagmi'

import { DEFAULT_NFT_CONTRACT } from '@/constants/contracts'
import { product, products } from '@/pages/Auction/constants'
import { getCurrentNFT, setCurrentNFT, setCurrentTokenIdsList, updateAuctionsList } from '@/store/auction/actions'

export type Product = {
  id: number
  name: string
  product: string
  description: string
  artist: string
  currency: string
  images: string[]
}

export type Auction = {
  bidder: string
  amount: number
  minPrice: number
  startTime: number
  endTime: number
  settled: boolean
}

export type ContractMetadata = {
  name: string
  description: string
  image: string
  external_link: string
  collaborators: Address[]
}

export interface AuctionState {
  productsList: Product[]
  currentProduct: Product
  currentNFTContract: Address
  currentNFT: ContractMetadata
  currentTokenIds: number[]
  currentTokenId: number
}

export const initialState: AuctionState = {
  productsList: products,
  currentProduct: product,
  currentNFTContract: DEFAULT_NFT_CONTRACT[mainnet.id] as Address,
  currentNFT: { name: '', description: '', image: '', external_link: '', collaborators: [] },
  currentTokenIds: [],
  currentTokenId: 1,
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
      state.currentTokenId = nftId

      remove(list, (item: Product) => item.id === nftId)
      state.productsList = [current, ...list]
    })
    .addCase(updateAuctionsList, (state, action) => {
      const { auctions } = action.payload

      const current = auctions.pop()
      if (current) state.currentProduct = current
      state.productsList = [...auctions]
    })
    .addCase(setCurrentNFT, (state, action) => {
      state.currentNFTContract = action.payload.nft
      state.currentNFT = action.payload.metadata
    })
    .addCase(setCurrentTokenIdsList, (state, action) => {
      const { tokenIds } = action.payload
      if (tokenIds.length > 0 && tokenIds[0]) {
        // eslint-disable-next-line prefer-destructuring
        state.currentTokenId = tokenIds[0]
      }

      state.currentTokenIds = [...tokenIds]
    })
)
