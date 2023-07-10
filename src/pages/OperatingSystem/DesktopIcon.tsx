import type { Property } from 'csstype'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import styled from 'styled-components/macro'

const BaseIcon = styled.div<{ normalState?: string }>`
  background-image: url(${({ normalState }) => normalState || ''});
  background-size: contain;
  background-position: bottom center;
  background-repeat: no-repeat;
  height: 50px;
  width: 60px;
`

const BaseWrapper = styled.div`
  cursor: pointer;
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
`

const HoverIconWrapper = styled(BaseWrapper)<{ isActive?: boolean; hoverState?: string; normalState?: string }>`
  ${BaseIcon} {
    ${({ isActive, hoverState }) => isActive && `background-image: url(${hoverState || ''});`}
  }
  &:hover ${BaseIcon} {
    background-image: url(${({ hoverState }) => hoverState || ''});
    ${({ isActive, normalState }) => isActive && `background-image: url(${normalState || ''});`}
  }
`

export default function DesktopIcon({
  isActive,
  hoverState,
  normalState,
  children,
  onClick,
  realignment = '',
}: {
  isActive?: boolean
  hoverState?: string | undefined
  normalState: string | undefined
  children: ReactNode
  onClick: () => void
  realignment?: Property.Margin<string | number> | undefined
}) {
  const child = useMemo(
    () => (
      <>
        <div>
          <BaseIcon style={{ margin: realignment }} normalState={normalState} />
        </div>
        <div style={{ textAlign: 'center' }}>{children}</div>
      </>
    ),
    [children, normalState]
  )

  if (hoverState)
    return (
      <HoverIconWrapper isActive={isActive} hoverState={hoverState} normalState={normalState} onClick={onClick}>
        {child}
      </HoverIconWrapper>
    )

  return <BaseWrapper onClick={onClick}>{child}</BaseWrapper>
}
