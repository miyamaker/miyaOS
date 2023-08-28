import styled from 'styled-components/macro'

import { HighlightButton } from '@/components/Button'

export const OneInchWindow = styled.div`
  height: calc(100% - 28px);
  width: 100%;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 0 10%;
`

export const SwapFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`

export const SwapRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
`

// export const SwitchButton = styled.div`
//   max-width: 30%;
// `

export const SwitchButton = styled.div<{ switched: boolean }>`
  height: 40px;
  width: 20px;
  display: flex;
  flex-direction: ${({ switched }) => (switched ? 'column' : 'column-reverse')};
  padding: 2px;
  /* border: 2px solid black; */

  background-color: #a9a3c9;

  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset 1px 1px grey, inset -2px -2px grey,
    inset 1px 1px #dfdfdf;
  &:active {
    box-shadow: inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -1px -1px #dfdfdf, inset 2px 2px #808080;
  }
`

export const SwitchLinesFlex = styled.div`
  height: 18px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const SwitchLine = styled.div`
  height: 4px;
  width: 100%;
  background: #a9a3c9;
  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset 1px 1px grey, inset -2px -2px grey,
    inset 1px 1px #dfdfdf;
`

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`

export const TokenButtonFlex = styled(FlexCol)`
  p {
    max-width: 60px;
    font-size: 14px;
    margin: 0;
  }
`

export const TokenButton = styled(HighlightButton)<{ isActive: boolean }>`
  background-color: ${({ isActive }) => isActive && '#7c7894'};
  box-shadow: ${({ isActive }) =>
    isActive && 'inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -1px -1px #dfdfdf, inset 2px 2px #808080;'};
  img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
    background: white;
  }
  height: 37px;
`

export const InputFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  input {
    margin: 0;
    height: 37px;
  }

  p {
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    margin: 0;
    border-bottom: 1px solid blue;
    color: blue;
    width: fit-content;
  }
`

export const PoweredBy = styled.p`
  position: absolute;
  bottom: 0;
  left: 0;

  font-size: 14px;
`
