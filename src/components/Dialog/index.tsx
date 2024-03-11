import type { CSSProperties, ReactNode } from 'react'
import styled from 'styled-components/macro'

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  background-color: #272526;
  color: #fff;
  padding: 0.5rem;
  border-radius: 5px;
  border: 5px solid rgba(93, 90, 90, 0.1);

  > * + * {
    margin-top: 0.75rem;
  }
`

export default function Dialog({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <Container style={style}>{children}</Container>
}
