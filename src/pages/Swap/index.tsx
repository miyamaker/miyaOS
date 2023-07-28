import { setup1inchWidget } from '@1inch/embedded-widget'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components/macro'

import TitleBar from '@/components/TitleBar'
import WindowWrapper from '@/components/WindowWrapper'
import Pages from '@/constants/pages'
import { useAppDispatch } from '@/store/hooks'
import { closeWindow, minimizeWindow } from '@/store/windows/actions'
import { useFullscreen } from '@/store/windows/hooks'

const page = Pages.swap

const TextContainer = styled.div`
  padding: 8px;
  font-size: 14px;
`
const OneInchWindow = styled.div`
  height: 100%;
  width: 100%;
  iframe {
    height: 95%;
    width: 100%;
  }
`

export default function MintPage() {
  const hostRef = useRef(null)

  useEffect(() => {
    if (hostRef.current) {
      const iframeJsonRpcManager = setup1inchWidget({
        chainId: 1,
        sourceTokenSymbol: '1INCH',
        destinationTokenSymbol: '0xa358491CA72B793ddf21cF46C7289CC6e0ce9e5A',
        hostElement: hostRef.current,
        provider: window.ethereum,
        theme: 'light',
        sourceTokenAmount: '15',
      })
    }
  }, [])

  const [fullscreen, toggleFullscreen] = useFullscreen('swap')
  const dispatch = useAppDispatch()
  const close = () => dispatch(closeWindow({ value: 'swap' }))
  const minimize = () => dispatch(minimizeWindow({ value: 'swap' }))

  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState(false)

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
      {/* <div style={{ display: 'flex', flexDirection: 'column', padding: '0.5rem', gap: '1rem', width: '100%' }}> */}
      {/* <div style={{ display: 'flex', marginBottom: '0.5rem', width: '100%' }}> */}
      <OneInchWindow ref={hostRef} />
      {/* </div> */}
      {/* </div> */}
    </WindowWrapper>
  )
}
