import { useConnectModal } from '@rainbow-me/rainbowkit'
import PatternBg from 'assets/bg_pattern.png?preset=pattern&resize=true'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import styled from 'styled-components/macro'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HighlightButton = styled.button<any>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  background-color: #a9a3c9;
  border: none;
  padding: 0 12px;
  text-shadow: 0 0 #222;
  min-height: 23px;
  min-width: 75px;

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

  &.focus-taskbar {
    background-image: url(${PatternBg[0]?.src});
    background-repeat: repeat;
    box-shadow: inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -1px -1px #dfdfdf, inset 2px 2px #808080;
  }

  &:disabled {
    cursor: not-allowed;
    color: #5a5a5a;
    text-shadow: 1px 1px #fff;
    &:active {
      box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset 1px 1px grey, inset -2px -2px grey,
        inset 1px 1px #dfdfdf;
    }
  }
`

export const LinkButton = styled.a<any>`
  color: unset;
  text-decoration: unset;
  font-size: 13.3px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  background-color: #a9a3c9;
  border: none;
  padding: 0 12px;
  text-shadow: 0 0 #222;
  min-height: 23px;
  min-width: 75px;

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

  &.focus-taskbar {
    background-image: url(${PatternBg[0]?.src});
    background-repeat: repeat;
    box-shadow: inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -1px -1px #dfdfdf, inset 2px 2px #808080;
  }

  &:disabled {
    cursor: not-allowed;
    color: #5a5a5a;
    text-shadow: 1px 1px #fff;
    &:active {
      box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset 1px 1px grey, inset -2px -2px grey,
        inset 1px 1px #dfdfdf;
    }
  }
`

export const ButtonIcon = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
`

export const ConnectedButton = ({
  style,
  children,
  withChain,
  disabled,
  onClick,
}: {
  style?: any
  children: ReactNode
  withChain?: number[]
  disabled?: boolean
  onClick: () => void
}) => {
  const { openConnectModal } = useConnectModal()
  const { isConnected } = useAccount()
  const { chain, chains } = useNetwork()

  const { switchNetwork } = useSwitchNetwork()
  const correctChain = useMemo(() => {
    if (withChain !== undefined) {
      if (!chain?.id) return false
      return withChain.includes(chain.id)
    }

    return true
  }, [withChain, chain])

  const handleClick = () => {
    if (!isConnected && openConnectModal) {
      openConnectModal()
      return
    }

    if (withChain && !correctChain && switchNetwork) {
      switchNetwork(withChain[0])
      return
    }

    onClick()
  }

  const buttonText = useMemo(() => {
    if (!isConnected) return 'Connect wallet'
    if (!correctChain) {
      if (withChain?.length === 1) return `Switch to ${chains.find((el) => el.id === withChain?.[0])?.name}`
      return 'Switch to a supported chain'
    }

    return children
  }, [chains, children, correctChain, isConnected, withChain])

  const supportedChainNames = useMemo(() => {
    return withChain?.map((chainId) => chains.find((el) => el.id === chainId)?.name || chainId) || []
  }, [chains, withChain])

  return (
    <HighlightButton
      style={style}
      onClick={() => handleClick()}
      disabled={disabled}
      title={
        withChain?.length ? `This service supports the following chains: ${supportedChainNames.join(', ')} ` : undefined
      }
    >
      {buttonText}
    </HighlightButton>
  )
}
