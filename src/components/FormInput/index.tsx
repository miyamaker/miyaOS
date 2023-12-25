import { type ChangeEvent, useState } from 'react'
import styled from 'styled-components/macro'

const ColContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`

const Label = styled.label``

const TextInput = styled.input.attrs({ type: 'text' })`
  width: 100%;
  padding: 3px 4px;
  border: none;
  box-shadow: inset -1px -1px #fff, inset 1px 1px grey, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a;
  background-color: #ffffff;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0;
  height: 21px;
  line-height: 2;

  &:disabled,
  &:read-only {
    background-color: #c0c0c0;
  }

  &:focus {
    outline: none;
  }
`

const ErrorContainer = styled.div`
  height: 1.25rem;
`
const ErrorText = styled.div<{ show?: boolean }>`
  display: none;
  color: red;
  ${({ show }) =>
    show &&
    `
    display:block!important;
  `}
`

export default function FormInput({
  label,
  disabled,
  helpText,
  inputKey,
  value,
  error,
  onChange,
}: {
  label: string
  disabled?: boolean
  helpText?: string
  inputKey: string
  value: string
  error: string[] | undefined
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}) {
  const [everFocused, setEverFocused] = useState(false)
  const [focus, setFocus] = useState(false)

  return (
    <ColContainer>
      <Label htmlFor={inputKey}>{label}</Label>
      <TextInput
        id={inputKey}
        onFocus={() => {
          setFocus(true)
          setEverFocused(true)
        }}
        onBlur={() => setFocus(false)}
        onChange={(e) => onChange(e)}
        value={value}
        disabled={disabled}
      ></TextInput>
      {helpText && <small style={{ marginTop: '4px' }}>{helpText}</small>}
      <ErrorContainer>
        <ErrorText id={`${inputKey}-error-container`} show={everFocused && !focus}>
          {error && error.length && error.map((err, i) => <small key={`${inputKey}-error-${i}`}>{err}</small>)}
        </ErrorText>
      </ErrorContainer>
    </ColContainer>
  )
}
