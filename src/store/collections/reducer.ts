import { createReducer } from '@reduxjs/toolkit'
import type { Address } from 'viem'

import { setNFTsList } from '@/store/collections/actions'

export type Collection = {
  name: string
  symbol: string
  image: string
  description: string
  website: string
  supply: number
}

export interface CollectionsState {
  nfts: Address[]
}

export const initialState: CollectionsState = {
  nfts: [],
}

export default createReducer(initialState, (builder) =>
  builder.addCase(setNFTsList, (state, action) => {
    state.nfts = action.payload.nfts
  })
)
