import type { CSSProperties, ReactNode } from 'react'
import styled from 'styled-components/macro'

const Container = styled.div`
  height: 100%;
  overflow-y: auto;
  background-color: #272526;
  color: #fff;
  padding: 0.5rem;
  border: 5px solid rgba(93, 90, 90, 0.1);
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.6);
  font-size: 0.7rem;

  > * + * {
    margin-top: 0.75rem;
  }
`

export default function Dialog({
  children,
  className,
  style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  return (
    <Container className={className} style={style}>
      {children}
    </Container>
  )
}
