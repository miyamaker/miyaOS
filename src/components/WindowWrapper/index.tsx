import type { ReactNode } from 'react'
import styled from 'styled-components/macro'

const WindowBorder = styled.div`
  border-left: 2px solid #a9a3c9;
  border-top: 2px solid #a9a3c9;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  height: 100%;
  background-color: #a9a3c9;
  > .inner-border {
    border-left: 1px solid white;
    border-top: 1px solid white;
    border-right: 2px solid #808080;
    height: 100%;
    > .inner-border-two {
      height: 100%;
      border: 2px solid #a9a3c9;
    }
  }
`

export default function WindowWrapper({ children }: { children: ReactNode }) {
  return (
    <WindowBorder>
      <div className="inner-border">
        <div className="inner-border-two">{children}</div>
      </div>
    </WindowBorder>
  )
}
