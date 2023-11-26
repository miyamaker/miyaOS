import { createReducer } from '@reduxjs/toolkit'

import Pages from '@/constants/pages'
import { globalNavigate } from '@/GlobalHistory'

import {
  closeWindow,
  createUploadOrder,
  deleteUploadOrder,
  finalizeUploadOrder,
  minimizeWindow,
  openWindow,
  setToFront,
  toggleFullscreen,
  updateWindowPosition,
} from './actions'

export type PageKey = Extract<keyof typeof Pages, string>

export interface UserState {
  active: PageKey[]
  zIndex: PageKey[]
  fullScreen: PageKey[]
  minimized: PageKey[]
  position: { [key: PageKey]: { x: number; y: number } }
  uploadRequests: Record<string, { requestFrom: string; timestamp: number; label?: string; result?: any; value?: any }>
}

export const initialState: UserState = {
  active: [],
  zIndex: [],
  fullScreen: [],
  minimized: [],
  position: {},
  uploadRequests: {},
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(openWindow, (state, action) => {
      if (state.active.includes(action.payload.value)) return
      const { value: page, position } = action.payload
      state.position[page] = position
      state.active.push(page)
      state.zIndex.push(page)
      const { path } = Pages[page]!
      globalNavigate(path)
    })
    .addCase(closeWindow, (state, action) => {
      const { value } = action.payload
      state.active = state.active.filter((page) => page !== value)
      state.zIndex = state.zIndex.filter((id) => id !== value)
      state.fullScreen = state.fullScreen.filter((id) => id !== value)
      delete state.position[value]

      const path = Pages[state.zIndex[state.zIndex.length - 1] || '']?.path
      globalNavigate(path || '/')
    })
    .addCase(createUploadOrder, (state, action) => {
      if (state.active.includes('uploader')) return
      const { requestFrom, label, timestamp } = action.payload
      if (state.position[requestFrom]) {
        state.position.uploader = state.position[requestFrom]!
      } else {
        state.position.uploader = { x: 0, y: 0 }
      }

      state.active.push('uploader')
      state.zIndex.push('uploader')
      if (state.fullScreen.includes('requestFrom')) {
        state.fullScreen.push('uploader')
      }

      state.uploadRequests[requestFrom] = { requestFrom, label, timestamp }
      const { path } = Pages.uploader!
      globalNavigate(path)
    })
    .addCase(finalizeUploadOrder, (state, action) => {
      const { requestFrom, result } = action.payload
      state.active = state.active.filter((page) => page !== 'uploader')
      state.zIndex = state.zIndex.filter((id) => id !== 'uploader')
      state.fullScreen = state.fullScreen.filter((id) => id !== 'uploader')
      delete state.position.uploader
      if (state.uploadRequests[requestFrom]) {
        state.uploadRequests[requestFrom]!.result = result
      }

      const path = Pages[requestFrom || '']?.path
      globalNavigate(path || '/')
    })
    .addCase(deleteUploadOrder, (state, action) => {
      const { requestFrom } = action.payload
      delete state.uploadRequests[requestFrom]
    })
    .addCase(updateWindowPosition, (state, action) => {
      const { value: page, position } = action.payload
      if (position && (position.x < 0 || position.y < 0)) return
      state.position[page] = position
    })
    .addCase(toggleFullscreen, (state, action) => {
      const { value: page } = action.payload
      state.fullScreen = state.fullScreen.includes(page)
        ? state.fullScreen.filter((id) => id !== page)
        : [...state.fullScreen, page]
    })
    .addCase(setToFront, (state, action) => {
      const { value: page } = action.payload
      if (state.minimized.includes(page)) {
        state.minimized = state.minimized.filter((id) => id !== page)
      }

      state.zIndex = state.zIndex.filter((id) => id !== page)
      state.zIndex.push(page)

      const { path } = Pages[page]!
      globalNavigate(path)
    })
    .addCase(minimizeWindow, (state, action) => {
      const { value: page } = action.payload
      state.zIndex = state.zIndex.filter((id) => id !== page)
      state.minimized = state.minimized.includes(page)
        ? state.minimized.filter((id) => id !== page)
        : [...state.minimized, page]

      const path = Pages[state.zIndex[state.zIndex.length - 1] || '']?.path
      globalNavigate(path || '/')
    })
)
