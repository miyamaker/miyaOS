import { createAction } from '@reduxjs/toolkit'

export const setCurrentTokenIdsList = createAction<{ tokenIds: number[]; tokenURIs: string[] }>(
  'auction/setCurrentTokenIdsList'
)
