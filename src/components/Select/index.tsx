import type { ChangeEvent } from 'react'
import styled from 'styled-components/macro'

import ButtonDown from '@/assets/button_down.svg'
import ButtonDownActive from '@/assets/button_down_active.svg'

const StyledSelect = styled.select`
  padding: 3px 4px;
  border: none;
  box-shadow: inset -1px -1px #ffffff, inset 1px 1px #808080, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a;
  background-color: #ffffff;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0;
  height: 21px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
  padding-right: 32px;
  background-image: url(${ButtonDown});
  background-position: top 2px right 2px;
  background-repeat: no-repeat;
  border-radius: 0;
  &:focus {
    outline: none;
    color: #ffffff;
    background-color: #000080;
    option {
      color: #000;
      background-color: #fff;
    }
  }
  &:active {
    background-image: url(${ButtonDownActive});
  }
`

export default function Select({
  options,
  value,
  onChange,
}: {
  options: { value: any; label: string }[]
  value: any
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}) {
  return (
    <StyledSelect value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={`option-select-${option.value}`} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  )
}
