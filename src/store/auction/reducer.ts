import { createReducer } from '@reduxjs/toolkit'

import { setCurrentTokenIdsList } from '@/store/auction/actions'

export type Auction = {
  bidder: string
  amount: number
  minPrice: number
  startTime: number
  endTime: number
  settled: boolean
}

export interface AuctionState {
  currentTokenIds: number[]
  currentTokenURIs: string[]
}

export const initialState: AuctionState = {
  currentTokenIds: [],
  currentTokenURIs: [],
}

export default createReducer(initialState, (builder) =>
  builder.addCase(setCurrentTokenIdsList, (state, action) => {
    const { tokenIds, tokenURIs } = action.payload
    state.currentTokenIds = [...tokenIds]
    state.currentTokenURIs = [...tokenURIs]
  })
)
