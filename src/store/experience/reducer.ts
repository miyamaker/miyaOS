import { createReducer } from '@reduxjs/toolkit'
import type { Address } from 'viem'

import { load, updateManagedCollection, updateStickyState, updateWaveState } from './actions'

export interface UserState {
  firstLoad: boolean
  sticky: boolean
  waves: boolean
  managedCollection: Address | undefined
}

export const initialState: UserState = {
  firstLoad: true,
  sticky: true,
  waves: true,
  managedCollection: undefined,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateStickyState, (state) => {
      state.sticky = !state.sticky
    })
    .addCase(updateWaveState, (state) => {
      state.waves = !state.waves
    })
    .addCase(updateManagedCollection, (state, action) => {
      state.managedCollection = action.payload.value
    })
    .addCase(load, (state) => {
      state.firstLoad = false
    })
)
