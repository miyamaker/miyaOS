import TitleBar from '@/components/TitleBar'
import WindowWrapper from '@/components/WindowWrapper'
import Pages from '@/constants/pages'
import { useAppDispatch } from '@/store/hooks'
import { closeWindow, minimizeWindow } from '@/store/windows/actions'
import { useFullscreen } from '@/store/windows/hooks'

import Home from './page'

const page = Pages.home

export default function MintPage() {
  const [fullscreen, toggleFullscreen] = useFullscreen('home')
  const dispatch = useAppDispatch()
  const close = () => dispatch(closeWindow({ value: 'home' }))
  const minimize = () => dispatch(minimizeWindow({ value: 'home' }))

  return (
    <WindowWrapper>
      <TitleBar
        closeBtn
        onClose={(e) => {
          if (e.cancelable) e.stopPropagation()
          close()
        }}
        fullscreen={fullscreen}
        fullscreenBtn
        onFullscreen={() => toggleFullscreen()}
        minimizeBtn
        onMinimize={(e) => {
          if (e.cancelable) e.stopPropagation()
          minimize()
        }}
      >
        {page?.label}
      </TitleBar>
      <Home />
    </WindowWrapper>
  )
}
