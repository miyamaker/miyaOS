import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import type { Address } from 'wagmi'
import { useToken } from 'wagmi'

import TextInput from '../TextInput'
import TokenImage from '../TokenImage'

export interface Token {
  address: Address
  chainId?: number
  decimals: number
  logoURI?: string
  name: string
  symbol: string
  balance?: number
}

export interface UserToken extends Token {
  contractAddress: Address
}

const ErrorFlex = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  p {
    text-align: center;
    &:nth-child(1) {
      color: #912f2f;
      font-size: 16px;
      font-weight: 700;
    }

    &:last-child {
      color: #333;
      font-size: 10px;
    }
  }
`

const OptionContainer = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 16px;
  width: 100%;
  cursor: pointer;
  background: ${({ isActive }) => (isActive ? '#000080' : 'transparent')};

  p {
    color: ${({ isActive }) => (isActive ? 'white' : 'black')};
    margin: 0 0 2px 0;
  }
  &:hover {
    background: #000080;

    p {
      color: white;
    }
  }

  .bal {
    color: ${({ isActive }) => (isActive ? '#777' : '#333')};
    margin: 0 0 0 auto;
    text-overflow: ellipsis;
    font-size: 12px;
    max-width: 42px;
    overflow: hidden;
    white-space: nowrap;
  }
`

const OptionImage = styled(TokenImage)`
  width: 24px;
  height: 24px;
  margin: 0 8px 0 0;
  border-radius: 50%;
  background: white;
`

const OptionLabel = styled.p`
  width: fit-content;
`

const TokenList = styled.section`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  box-sizing: border-box;
  background: white;
  height: 100%;

  padding: 0 0 8px 0;
  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset 1px 1px grey, inset -2px -2px grey,
    inset 1px 1px #dfdfdf;
`

const InputWrapper = styled.div`
  background: #000080;
  width: 100%;
  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset 1px 1px grey, inset -2px -2px grey,
    inset 1px 1px #dfdfdf;
  input {
    padding: 0 8px;
  }
  margin-bottom: 4px;
  position: sticky;
  top: 0;
`

const SelectWrapper = styled.div`
  position: relative;
  right: 0;

  width: 35%;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 35%;
  height: 100%;
`

interface TokenSelectProps {
  tokens: Token[]
  onSelectChange: (selectedToken: Token | undefined) => void
  selectedToken?: Token
}

const TokenSelect: React.FC<TokenSelectProps> = ({ tokens, onSelectChange, selectedToken }) => {
  const [filteredTokens, setFilteredTokens] = useState(tokens)
  const [tokenQuery, setTokenQuery] = useState<string | undefined>()

  // Call the useTokenBalance hook at the top level

  const isEthereumAddress = (query: string): query is Address => {
    return query.startsWith('0x') && query.length === 42
  }

  const {
    data: wagmiToken,
    // isError,
    isLoading: searchingForToken,
  } = useToken({
    address: isEthereumAddress(tokenQuery || '') ? (tokenQuery as Address) : undefined,
  })
  useEffect(() => {
    if (!tokenQuery) {
      setFilteredTokens(tokens)
      return
    }

    const filtered = tokens.filter(
      (token) =>
        token.symbol.toLowerCase().startsWith(tokenQuery.toLowerCase()) ||
        token.name.toLowerCase().startsWith(tokenQuery.toLowerCase())
    )
    setFilteredTokens(filtered)
  }, [tokens, tokenQuery])

  const addTokenToList = (newToken: Token) => {
    if (!filteredTokens.some((token) => token.address === newToken.address)) {
      setFilteredTokens((prevTokens) => [...prevTokens, newToken])
    }
  }

  useEffect(() => {
    if (tokenQuery && tokenQuery.startsWith('0x') && tokenQuery.length === 42) {
      if (wagmiToken) {
        addTokenToList(wagmiToken)
      }
    }
  }, [wagmiToken])

  const handleChange = (token: Token) => {
    onSelectChange(token)
  }

  // useEffect(() => {
  //   onSelectChange(selectedToken)
  // }, [selectedToken])

  return (
    <SelectWrapper>
      <InputWrapper>
        <TextInput
          name="tokenSearch"
          placeholder="Search a token/address"
          onChange={(e) => setTokenQuery(e.target.value)}
          value={tokenQuery}
        />
      </InputWrapper>
      <TokenList>
        {filteredTokens.map((token) => (
          <OptionContainer
            key={token.address}
            onClick={() => handleChange(token)}
            isActive={token.address === selectedToken?.address}
          >
            <OptionImage src={token.logoURI} name={token.symbol} />
            <OptionLabel>{token.symbol}</OptionLabel>
            {token.balance && <p className="bal">{token.balance}</p>}
          </OptionContainer>
        ))}
        {filteredTokens.length === 0 && !searchingForToken && (
          <ErrorFlex>
            <p>No Tokens Found</p>
            <p>If you believe this is incorrect, reach out to Bill Gates and tell him to ape MIYA.</p>
          </ErrorFlex>
        )}
        {searchingForToken && <p>Loading</p>}
      </TokenList>
    </SelectWrapper>
  )
}

export default TokenSelect
