import type { ReactNode } from 'react'
import styled from 'styled-components/macro'

import { HighlightButton } from '../Button'

const StyledTitleBar = styled.div`
  background: #d97ada;
  color: white;
  padding: 2px 4px;
  user-select: none;
  cursor: grab;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 2px;
`

export default function TitleBar({
  minimizeBtn,
  fullscreenBtn,
  closeBtn,
  fullscreen,
  onClose,
  onFullscreen,
  onMinimize,
  className = 'title-bar',
  children,
}: {
  minimizeBtn?: boolean
  fullscreenBtn?: boolean
  closeBtn?: boolean
  onClose?: (e: any) => void
  onFullscreen?: () => void
  onMinimize?: (e: any) => void
  fullscreen?: boolean
  className?: string
  children?: ReactNode
}) {
  return (
    <StyledTitleBar className={className}>
      {children}
      <ButtonContainer>
        <div style={{ display: 'flex', gap: '0' }}>
          {minimizeBtn && (
            <HighlightButton
              className="free-width free-height"
              onClick={onMinimize}
              style={{ width: '24px', height: '22px' }}
            >
              _
            </HighlightButton>
          )}
          {fullscreenBtn && (
            <HighlightButton
              className="free-width free-height"
              onClick={onFullscreen}
              style={{ width: '24px', height: '22px' }}
            >
              {!fullscreen ? 'F' : 'f'}
            </HighlightButton>
          )}
        </div>
        {closeBtn && (
          <HighlightButton
            className="free-width free-height"
            onClick={onClose}
            style={{ width: '24px', height: '22px' }}
          >
            X
          </HighlightButton>
        )}
      </ButtonContainer>
    </StyledTitleBar>
  )
}
