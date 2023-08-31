import Miya from 'assets/134321870.png?preset=avatar&resize=true'
import SwapBanner from 'assets/SwapBanner.jpg'
import axios from 'axios'
import console from 'console'
import { useEffect, useState } from 'react'
import { formatEther, parseEther } from 'viem'
import { useBalance, useFeeData } from 'wagmi'

import StartButton from '@/components/TaskBar/StartButton'
import TextInput from '@/components/TextInput'
import TitleBar from '@/components/TitleBar'
import TokenImage from '@/components/TokenImage'
import type { Token } from '@/components/TokenSelect'
import TokenSelect from '@/components/TokenSelect'
import WindowWrapper from '@/components/WindowWrapper'
import Pages from '@/constants/pages'
import { useAccount } from '@/context/AccountProvider'
import { useAppDispatch } from '@/store/hooks'
import { closeWindow, minimizeWindow } from '@/store/windows/actions'
import { useFullscreen } from '@/store/windows/hooks'
import type { PriceResponse } from '@/types/matcha'

import ApproveOrReviewButton from './ApproveOrReviewButton'
import * as S from './Swap.styles'

const page = Pages.swap
const ZERO_EX_API_KEY = import.meta.env.VITE_ZERO_EX_API_KEY

export default function SwapPage() {
  const [fullscreen, toggleFullscreen] = useFullscreen('swap')
  const dispatch = useAppDispatch()
  const close = () => dispatch(closeWindow({ value: 'swap' }))
  const minimize = () => dispatch(minimizeWindow({ value: 'swap' }))

  const [switched, setSwitched] = useState<boolean>(false)
  const [tokens, setTokens] = useState<Token[] | null>(null)
  const [sellToken, setSellToken] = useState<Token>()
  const [buyToken, setBuyToken] = useState<Token>()
  const [sellAmount, setSellAmount] = useState<string | undefined>()
  const [price, setPrice] = useState<PriceResponse | undefined>()
  const { account, balance } = useAccount()

  // Should maybe setup to use preview mode after approvals for a confirm swap stage, where it fetches the quote
  // const [previewMode, setPreviewMode] = useState(false)
  const { data: gasData } = useFeeData()

  const headers = { '0x-api-key': ZERO_EX_API_KEY }

  const [selectAOpen, setSelectAOpen] = useState<boolean>(false)
  const [selectBOpen, setSelectBOpen] = useState<boolean>(false)

  function handleSelectTokens(side: 'A' | 'B') {
    if (side === 'A') {
      setSelectBOpen(false)
      setSelectAOpen(true)
    } else if (side === 'B') {
      setSelectBOpen(true)
      setSelectAOpen(false)
    } else {
      setSelectBOpen(false)
      setSelectAOpen(false)
    }
  }

  // const searchTokens = async () => {
  //   return axios.get(`${baseUrl}/search?query=${searchQuery}`)
  // }

  useEffect(() => {
    const getAllTokens = async () => {
      const response = await axios.get('https://gateway.ipfs.io/ipns/tokens.uniswap.org')

      // Filter tokens for chainId === 1
      const filteredTokens = response.data.tokens.filter((token: any) => token.chainId === 1)

      setTokens([
        {
          address: '0xa358491CA72B793ddf21cF46C7289CC6e0ce9e5A',
          chainId: 1,
          decimals: 18,
          logoURI: Miya[0]?.src,
          name: 'Black Hearted Cyber Baby Angel Token',
          symbol: 'MIYA',
        },
        {
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          chainId: 1,
          decimals: 18,
          logoURI: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
          name: 'Ethereum',
          symbol: 'ETH',
        },
        ...filteredTokens,
      ])
    }

    // If tokens have not been fetched, fetch them
    if (!tokens) {
      getAllTokens()
    }

    if (tokens && (!sellToken || !buyToken)) {
      setSellToken(tokens.find((token) => token.symbol === 'ETH'))
      setBuyToken(tokens.find((token) => token.symbol === 'MIYA'))
    }
  }, [tokens]) // dependency array. Will re-run the effect if the tokens state changes

  const fetchPrice = async () => {
    if (sellAmount === '0') {
      setPrice(undefined)
      return
    }

    if (buyToken && sellToken) {
      const params = {
        sellToken: sellToken.address, // DAI
        buyToken: buyToken.address, // WETH
        sellAmount: parseEther(sellAmount || '0'),
        takerAddress: account?.address,
      }

      const res = await axios.get('https://api.0x.org/swap/v1/price', {
        params,
        headers,
      })
      setPrice(res.data)
    }
  }

  const switchTokens = () => {
    // setTokenOneAmount(0)
    // setTokenTwoAmount(0)
    setSellToken(buyToken)
    setBuyToken(sellToken)

    if (sellAmount && price) {
      setSellAmount(formatEther(BigInt(price.buyAmount)))
    } else {
      setSellAmount('0')
    }

    setSwitched(!switched)
  }

  const handleSellTokenChange = (newToken?: Token) => {
    if (buyToken && newToken?.address === buyToken.address) {
      switchTokens()
    } else {
      setSellToken(newToken)
    }
  }

  const handleBuyTokenChange = (newToken?: Token) => {
    if (sellToken && newToken?.address === sellToken.address) {
      switchTokens()
    } else {
      setBuyToken(newToken)
    }
  }

  useEffect(() => {
    if (sellAmount) {
      fetchPrice()
    } else if (sellAmount === '0') {
      setPrice(undefined)
    }
  }, [sellAmount, sellToken, buyToken])

  const isEth = (token: Token) => {
    return token && token.symbol === 'ETH'
  }

  const { data: sellTokenBalance } = useBalance({ address: account?.address, chainId: 1, token: sellToken?.address })
  const { data: buyTokenBalance } = useBalance({ address: account?.address, chainId: 1, token: buyToken?.address })

  const getBalanceForToken = (token: Token, tokenBalance: any) => {
    if (token) return isEth(token) ? balance?.formatted : tokenBalance?.formatted
  }

  const balanceA = (sellTokenBalance || balance) && sellToken ? getBalanceForToken(sellToken, sellTokenBalance) : null
  const balanceB = (buyTokenBalance || balance) && buyToken ? getBalanceForToken(buyToken, buyTokenBalance) : null

  function setMax() {
    if (sellToken && isEth(sellToken) && balance && gasData && gasData.gasPrice) {
      const ethAfterGas = balance.value - BigInt(Number(price?.gas ?? 155770) * 1.8) * gasData.gasPrice
      setSellAmount(formatEther(ethAfterGas))
    }
    // setSellAmount()
    else if (sellToken) setSellAmount(balanceA)
    else setSellAmount('0')
  }

  // console.log('balance', sellToken?.symbol, buyToken?.symbol, balance)
  // console.log(gasData?.gasPrice)
  // console.log(sellAmount)
  if (price) console.log(formatEther(BigInt(price.buyAmount)))

  return (
    // <WindowWrapper color="#2b3342">
    <WindowWrapper>
      <TitleBar
        closeBtn
        onClose={(e) => {
          if (e.cancelable) e.stopPropagation()
          close()
        }}
        fullscreen={fullscreen}
        fullscreenBtn
        onFullscreen={() => toggleFullscreen()}
        minimizeBtn
        onMinimize={(e) => {
          if (e.cancelable) e.stopPropagation()
          minimize()
        }}
        color="#29b433"
      >
        {page?.label}
      </TitleBar>
      <S.OneInchWindow>
        {tokens && (
          <>
            <S.LeftFlex>
              <S.BannerSwap src={SwapBanner} />

              <S.SwapFlex>
                <S.SwapRow>
                  <S.InputFlex>
                    <TextInput
                      name="amountTokenA"
                      placeholder="0"
                      onChange={(e) => setSellAmount(e.target.value || '0')}
                      value={sellAmount}
                    />
                    <p onClick={setMax} style={{ cursor: 'pointer' }}>
                      Max
                    </p>
                  </S.InputFlex>
                  <S.TokenButtonFlex>
                    <S.TokenButton onClick={() => handleSelectTokens('A')} isActive={selectAOpen}>
                      <TokenImage src={sellToken?.logoURI} name={sellToken?.symbol ?? ''} />
                      <p>{sellToken?.symbol}</p>
                    </S.TokenButton>
                    <p>{balanceA && parseFloat(balanceA).toFixed(4)}</p>
                  </S.TokenButtonFlex>
                </S.SwapRow>
                {/* <S.SwitchButton>
              <HighlightButton onClick={switchTokens}>Switch</HighlightButton>
            </SwitchButton> */}
                <S.SwitchButton switched={switched} onClick={switchTokens} style={{ cursor: 'pointer' }}>
                  <S.SwitchLinesFlex>
                    <S.SwitchLine />
                    <S.SwitchLine />
                    <S.SwitchLine />
                  </S.SwitchLinesFlex>
                </S.SwitchButton>

                <S.SwapRow>
                  <S.InputFlex>
                    <TextInput
                      name="amountTokenB"
                      placeholder="0"
                      disabled={true}
                      value={sellAmount !== '0' && price ? formatEther(BigInt(price.buyAmount)) : '0'}
                    />
                  </S.InputFlex>
                  <S.TokenButtonFlex>
                    <S.TokenButton onClick={() => handleSelectTokens('B')} isActive={selectBOpen}>
                      <TokenImage src={buyToken?.logoURI} name={buyToken?.symbol ?? ''} />
                      <p>{buyToken?.symbol}</p>
                    </S.TokenButton>
                    <p>{balanceB && parseFloat(balanceB).toFixed(4)}</p>
                  </S.TokenButtonFlex>
                </S.SwapRow>

                {account?.address ? (
                  <ApproveOrReviewButton
                    //
                    price={price}
                    // previewMode={previewMode}
                    takerAddress={account.address}
                  />
                ) : (
                  <StartButton />
                )}
                <S.PoweredBy>Powered by Matcha API</S.PoweredBy>
              </S.SwapFlex>
            </S.LeftFlex>

            {selectAOpen && (
              <TokenSelect selectedToken={sellToken} tokens={tokens} onSelectChange={handleSellTokenChange} />
            )}
            {selectBOpen && (
              <TokenSelect selectedToken={buyToken} tokens={tokens} onSelectChange={handleBuyTokenChange} />
            )}
          </>
        )}
      </S.OneInchWindow>
    </WindowWrapper>
  )
}
