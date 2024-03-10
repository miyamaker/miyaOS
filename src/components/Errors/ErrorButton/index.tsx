import styled from 'styled-components/macro'

export const ErrorButtonWrapper = styled.div`
  height: calc(100% / 3);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ErrorButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  background-color: #a9a3c9;
  border: none;
  padding: 0.2rem;
  text-shadow: 0 0 #222;

  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset 1px 1px grey, inset -2px -2px grey,
    inset 1px 1px #dfdfdf;
  &:active {
    box-shadow: inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -1px -1px #dfdfdf, inset 2px 2px #808080;
  }

  &.free-width {
    min-width: auto;
    padding-left: unset;
    padding-right: unset;
  }

  &.free-height {
    min-height: auto;
  }

  &.heavy {
    box-shadow: inset -2px -2px #0a0a0a, inset 1px 1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px grey,
      inset 2px 2px #dfdfdf;
    &:active {
      box-shadow: inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080;
    }
  }

  &:disabled {
    cursor: not-allowed;
    color: #5a5a5a;
    text-shadow: 1px 1px #fff;
    filter: brightness(80%);
    &:active {
      box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset 1px 1px grey, inset -2px -2px grey,
        inset 1px 1px #dfdfdf;
    }
  }
`
