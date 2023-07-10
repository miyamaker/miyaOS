/* eslint-disable import/no-mutable-exports */
import type { NavigateFunction } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export let globalNavigate: NavigateFunction

/* hack to access react-router-dom's navigate from everywhere */
export const GlobalHistory = () => {
  globalNavigate = useNavigate()

  return null
}
