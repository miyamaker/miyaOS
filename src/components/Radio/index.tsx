import type { ChangeEvent } from 'react'
import styled from 'styled-components/macro'

import RadioBorder from '@/assets/radio_border.svg'
import RadioBorderDisabled from '@/assets/radio_border_disabled.svg'
import RadioDot from '@/assets/radio_dot.svg'
import RadioDotDisabled from '@/assets/radio_dot_disabled.svg'

const RadioContainer = styled.div`
  width: 12px;
  height: 12px;
  position: static;
`

const StyledRadio = styled.input.attrs({ type: 'radio' })`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  margin: 0;
  background: 0;
  position: fixed;
  opacity: 0;
  border: none;
  & + label {
    line-height: 13px;
    position: relative;
    margin-left: calc(12px+6px);
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -6px;
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-right: 6px;
      background: url(${RadioBorder});
    }
  }
  &:focus + label {
    outline: 1px dotted #000000;
  }

  &:active + label::before {
    background: url(${RadioBorderDisabled});
  }

  &:disabled + label::before {
    background: url(${RadioBorderDisabled});
  }

  &:disabled:checked + label::after {
    background: url(${RadioDotDisabled});
  }

  &:checked + label::after {
    content: '';
    display: block;
    width: 4px;
    height: 4px;
    top: calc(12px / 2 - 4px / 2);
    left: -2px;
    position: absolute;
    background: url(${RadioDot});
  }

  &:focus + label {
    outline: 1px dotted #000000;
  }
`

export default function Radio({
  identifier = 'radio',
  checked,
  onChange,
}: {
  identifier?: string
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <RadioContainer>
      <StyledRadio checked={checked} id={identifier} onChange={onChange} />
      <label htmlFor={identifier}></label>
    </RadioContainer>
  )
}
