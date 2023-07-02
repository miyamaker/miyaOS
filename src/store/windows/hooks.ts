import { useCallback } from 'react'

import type { Page } from '@/constants/pages'
import Pages from '@/constants/pages'

import { useAppDispatch, useAppSelector } from '../hooks'
import { toggleFullscreen, updateWindowPosition } from './actions'
import type { PageKey } from './reducer'

export function useWindows(): [PageKey[], PageKey[], PageKey[], PageKey[]] {
  const pages = useAppSelector((state) => state.windows.active)
  const zIndex = useAppSelector((state) => state.windows.zIndex)
  const fullScreen = useAppSelector((state) => state.windows.fullScreen)
  const minimized = useAppSelector((state) => state.windows.minimized)
  return [pages, zIndex, fullScreen, minimized]
}

export function useWindow(id: PageKey): Page | undefined {
  const isActive = useAppSelector((state) => state.windows.active).includes(id)
  if (!isActive) return undefined
  const page = Pages[id]
  return page
}

export function useWindowPosition(id: PageKey): [{ x: number; y: number } | undefined, (x: number, y: number) => void] {
  const position = useAppSelector((state) => state.windows.position[id])
  const dispatch = useAppDispatch()

  const updatePosition = useCallback(
    (x: number, y: number) => dispatch(updateWindowPosition({ value: id, position: { x, y } })),
    [id]
  )

  return [position, updatePosition]
}

export function useFullscreen(id: PageKey): [boolean, () => void] {
  const isFullscreen = useAppSelector((state) => state.windows.fullScreen.includes(id))
  const dispatch = useAppDispatch()

  const onToggleFullscreen = useCallback(() => dispatch(toggleFullscreen({ value: id })), [id])

  return [isFullscreen, onToggleFullscreen]
}
