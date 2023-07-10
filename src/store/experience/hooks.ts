import { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from '../hooks'
import { updateStickyState, updateWaveState } from './actions'

export function useWaves(): [boolean, () => void] {
  const waves = useAppSelector((state) => state.experience.waves)
  const dispatch = useAppDispatch()

  const toggle = useCallback(() => dispatch(updateWaveState()), [dispatch])

  return [waves, toggle]
}

export function useSticky(): [boolean, () => void] {
  const sticky = useAppSelector((state) => state.experience.sticky)
  const dispatch = useAppDispatch()

  const toggle = useCallback(() => dispatch(updateStickyState()), [dispatch])

  return [sticky, toggle]
}
