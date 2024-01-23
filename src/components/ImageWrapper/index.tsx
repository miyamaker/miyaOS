import type { ReactNode } from 'react'
import styled from 'styled-components/macro'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: inset -1px -1px #fff, inset 1px 1px grey, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a;
  background-color: #ffffff;
  padding: 1rem 2rem;
`

export default function ImageWrapper({ style, children }: { style: object; children: ReactNode }) {
  return <Wrapper style={style}>{children}</Wrapper>
}
