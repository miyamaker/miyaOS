import type { DetailedHTMLProps } from 'react'
import styled from 'styled-components/macro'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StyledInput = styled.input<any>`
  background-color: white;
  box-shadow: inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -1px -1px #dfdfdf, inset 2px 2px #808080;
  border: none;
  outline: none;
  min-height: 23px;
  margin: 8px;
`

export default function TextInput(
  props: DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
) {
  return <StyledInput type="text" {...props}></StyledInput>
}
