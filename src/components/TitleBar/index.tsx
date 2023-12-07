import type { ReactNode } from 'react'
import styled from 'styled-components/macro'

import { HighlightButton } from '../Button'

const StyledTitleBar = styled.div<{ color?: string }>`
  background: ${({ color }) => color ?? '#d97ada'};
  color: white;
  cursor: grab;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TitleContainer = styled.div`
  padding: 2px 4px;
  flex-grow: 1;
  height: 100%;
`

const ButtonContainer = styled.div`
  padding: 2px 4px;
  display: flex;
  gap: 2px;
  pointer-events: all;
  user-select: all;
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
  color,
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
  color?: string
}) {
  return (
    <StyledTitleBar color={color}>
      <TitleContainer className={className}>{children}</TitleContainer>
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
