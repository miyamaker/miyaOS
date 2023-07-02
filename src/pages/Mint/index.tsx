import Love from 'assets/love.jpg?preset=avatar&resize=true'
import { useState } from 'react'
import styled from 'styled-components/macro'

import { HighlightButton } from '@/components/Button'
import { Separator } from '@/components/Separator'
import TextInput from '@/components/TextInput'
import TitleBar from '@/components/TitleBar'
import WindowWrapper from '@/components/WindowWrapper'
import Pages from '@/constants/pages'
import { useAppDispatch } from '@/store/hooks'
import { closeWindow, minimizeWindow } from '@/store/windows/actions'
import { useFullscreen } from '@/store/windows/hooks'

const page = Pages.mint

const TextContainer = styled.div`
  padding: 8px;
  font-size: 14px;
`

const ResponsiveImage = styled.img`
  ${({ theme }) => theme.mediaWidth.upToMedium`
  display: none;
`}
`

export default function MintPage() {
  const [fullscreen, toggleFullscreen] = useFullscreen('mint')
  const dispatch = useAppDispatch()
  const close = () => dispatch(closeWindow({ value: 'mint' }))
  const minimize = () => dispatch(minimizeWindow({ value: 'mint' }))

  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState(false)

  return (
    <WindowWrapper>
      <TitleBar
        closeBtn
        onClose={(e) => {
          e.stopPropagation()
          close()
        }}
        fullscreen={fullscreen}
        fullscreenBtn
        onFullscreen={() => toggleFullscreen()}
        minimizeBtn
        onMinimize={(e) => {
          e.stopPropagation()
          minimize()
        }}
      >
        {page?.label}
      </TitleBar>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '0.5rem', gap: '1rem' }}>
        <div style={{ display: 'flex', marginBottom: '0.5rem' }}>
          <ResponsiveImage
            src={Love[0]?.src}
            alt="SchizoPoster #4760"
            width={240}
            height={360}
            style={{ maxWidth: '240px', margin: '0' }}
          />
          <TextContainer>
            <p>Welcome to the MiyaMints Setup wizard.</p>
            <p>&nbsp;</p>
            <p>
              This wizard will help you set up a collection with{' '}
              <a href="https://github.com/Zodomo/ERC721M" target="_blank" rel="noopener noreferrer">
                ERC-721M
              </a>
              .
            </p>
            <p>The software is currently undergoing development and testing.</p>
            <p>&nbsp;</p>

            <p>Input the activation key to continue:</p>
            <TextInput
              value={inputValue}
              placeholder="BRG-000-000-000"
              onChange={(e) => setInputValue(e.target.value)}
            ></TextInput>
            {error && (
              <p style={{ color: 'red', fontSize: '12px' }}>
                Invalid activation key, if you think this is wrong please contact your{' '}
                <a href="https://discord.gg/SekBTQARMk" target="_blank" rel="noopener noreferrer">
                  software vendor
                </a>
                .
              </p>
            )}
          </TextContainer>
        </div>
        <Separator />
        <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', gap: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
            <HighlightButton
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              disabled
            >
              <span>{'<'}</span> Prev
            </HighlightButton>
            <HighlightButton
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              disabled={!inputValue}
              onClick={() => setError(true)}
            >
              <span>Next</span> <span>{'>'}</span>
            </HighlightButton>
          </div>
          <HighlightButton className="heavy" onClick={() => close()}>
            Cancel
          </HighlightButton>
        </div>
      </div>
    </WindowWrapper>
  )
}
