import type { ReactNode } from 'react'
import styled from 'styled-components/macro'

const Wrapper = styled.fieldset`
  display: flex;
  border: 1px solid #fff;
  box-shadow: rgb(128, 128, 128) 0 0 0 1.5px;
  padding: 0.5rem 1.5rem 1rem 1.5rem;
`

export default function ExplorerWrapper({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Wrapper>
      <legend style={{ backgroundColor: '#a9a3c9' }}>{title}</legend>
      {children}
    </Wrapper>
  )
}
