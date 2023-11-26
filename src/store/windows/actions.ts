import { createAction } from '@reduxjs/toolkit'

import type { PageKey } from './reducer'

export const openWindow = createAction<{ value: PageKey; position: { x: number; y: number } }>('windows/openWindow')
export const closeWindow = createAction<{ value: PageKey }>('windows/closeWindow')
export const updateWindowPosition = createAction<{ value: PageKey; position: { x: number; y: number } }>(
  'windows/updateWindowPosition'
)
export const toggleFullscreen = createAction<{ value: PageKey }>('windows/toggleFullscreen')
export const setToFront = createAction<{ value: PageKey }>('windows/setToFront')
export const minimizeWindow = createAction<{ value: PageKey }>('windows/minimizeWindow')
export const createUploadOrder = createAction<{
  requestFrom: string
  timestamp: number
  label?: string
  value?: string
}>('windows/createUploadOrder')
export const finalizeUploadOrder = createAction<{ requestFrom: string; result: string }>('windows/finalizeUploadOrder')
export const deleteUploadOrder = createAction<{ requestFrom: string }>('windows/deleteUploadOrder')
