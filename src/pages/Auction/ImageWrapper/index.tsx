import type { CSSProperties, ReactNode } from 'react'
import styled from 'styled-components/macro'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: inset -1px -1px #fff, inset 1px 1px grey, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a;
  background-color: #ffffff;
  padding: 1rem 2rem;

  > * + * {
    margin-top: 0.5rem;
  }

  @media only screen and (max-width: 640px) {
    padding: 1rem 1rem 0.5rem 1rem;
  }
`

export default function ImageWrapper({ style, children }: { style?: CSSProperties; children: ReactNode }) {
  return <Wrapper style={style}>{children}</Wrapper>
}
