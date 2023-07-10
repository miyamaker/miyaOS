import { createReducer } from '@reduxjs/toolkit'

import { load, updateStickyState, updateWaveState } from './actions'

export interface UserState {
  firstLoad: boolean
  sticky: boolean
  waves: boolean
}

export const initialState: UserState = {
  firstLoad: true,
  sticky: true,
  waves: true,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateStickyState, (state) => {
      state.sticky = !state.sticky
    })
    .addCase(updateWaveState, (state) => {
      state.waves = !state.waves
    })
    .addCase(load, (state) => {
      state.firstLoad = false
    })
)
