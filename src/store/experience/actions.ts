import { createAction } from '@reduxjs/toolkit'
import type { Address } from 'viem'

export const load = createAction('experience/load')
export const updateStickyState = createAction('experience/updateStickyState')
export const updateWaveState = createAction('experience/updateWaveState')
export const updateManagedCollection = createAction<{ value: Address | undefined }>(
  'experience/updateManagedCollection'
)
