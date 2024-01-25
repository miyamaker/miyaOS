import type { FetchBalanceResult } from '@wagmi/core'
import { get } from 'lodash'
import { useEffect, useState } from 'react'
import Countdown, { zeroPad } from 'react-countdown'
import styled from 'styled-components/macro'
import type { Address } from 'viem'
import { mainnet, useAccount, useNetwork, useWaitForTransaction } from 'wagmi'

import AuctionButton from '@/components/AuctionButton'
import ImagesList from '@/components/ProductDetail/ImagesList'
import { MIYATEES_AUCTION_CONTRACT } from '@/constants/contracts'
import { useAuctionData } from '@/pages/Auction/useAuctionData'
import { useBidTees } from '@/pages/Auction/useBidTees'
import type { Product } from '@/store/auction/reducer'

const ImagesListWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: transparent;
  width: 33.3333%;
`
const ImageDetailWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 66.6666%;
`

const DetailWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.75rem 0.75rem 0.75rem;
`

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.9rem;
  width: 25%;
  padding-left: 0.5rem;
`

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.9rem;
  width: 75%;
  padding-left: 1.5rem;
  line-height: 1rem;
`

const BidWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem 0 1rem;
`

const InputWrapper = styled.div`
  width: 50%;
  display: flex;
`

const ActionWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: end;
  align-items: center;

  > * + * {
    margin-left: 0.5rem;
  }
`

const TextInput = styled.input.attrs({ type: 'text' })`
  width: 100%;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border: none;
  box-shadow: inset -1px -1px #fff, inset 1px 1px grey, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a;
  background-color: #ffffff;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0;
  line-height: 2;

  &:disabled,
  &:read-only {
    background-color: #c0c0c0;
  }

  &:focus {
    outline: none;
  }
`

const Text = styled.div`
  width: 100%;
  border: none;
  box-shadow: inset -1px -1px #fff, inset 1px 1px grey, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a;
  background-color: #c0c0c0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Timer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.7rem;
  font-size: 0.7rem;
  box-shadow: inset -1px -1px #fff, inset 1px 1px grey, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a;
`

export default function ProductDetail({
  product,
  setErrorMessage,
  setErrorName,
  balance,
}: {
  product: Product
  setErrorMessage: (value: string) => void
  setErrorName: (value: string) => void
  balance: FetchBalanceResult | undefined
}) {
  // Network
  const { chain } = useNetwork()
  const miyaTeesAuction = MIYATEES_AUCTION_CONTRACT[chain?.id || mainnet.id] || MIYATEES_AUCTION_CONTRACT[mainnet.id]!

  // Account
  const { isConnected } = useAccount()

  const [transacting, setTransacting] = useState(false)
  const [txHash, setTxHash] = useState('')
  const [bidAmount, setBidAmount] = useState('0.0')

  // Get contract data
  const { currentBid, endTime, refetch } = useAuctionData({
    address: miyaTeesAuction as Address,
    chainId: chain?.id,
  })
  const { bidTees } = useBidTees({ address: miyaTeesAuction as Address, bidAmount })

  useWaitForTransaction({
    hash: (txHash as Address) || '0x',
    enabled: !!txHash,
    onSuccess: () => {
      setTransacting(false)
      setTxHash('')
      refetch()
    },
    onReplaced: () => {
      setTransacting(false)
      setTxHash('')
    },
  })

  const handleCheckBidAmount = (value: string) => {
    const re = /^[0-9]+\.?[0-9]*$/
    if (!re.test(value)) return

    setBidAmount(value)
  }

  const handleBid = async () => {
    if (!isConnected) return
    setTransacting(true)
    try {
      const result = await bidTees(product.id)
      setTxHash(result.hash)
    } catch (e) {
      setTransacting(false)
      // warn message
      setErrorMessage(get(e, 'shortMessage') || '')
      setErrorName(get(e, 'name') || '')
    }
  }

  const renderTimer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: {
    days: number
    hours: number
    minutes: number
    seconds: number
    completed: boolean
  }) => {
    if (completed) {
      // Render a completed state
      return <Timer>00h:00m:00s</Timer>
    }

    // Render a countdown
    return (
      <Timer>
        {zeroPad(days)}d:{zeroPad(hours)}h:{zeroPad(minutes)}m:{zeroPad(seconds)}s
      </Timer>
    )
  }

  useEffect(() => {
    refetch()
  }, [product, refetch])

  return (
    <>
      <ImagesListWrapper>
        <ImagesList images={product.images} />
      </ImagesListWrapper>
      <ImageDetailWrapper>
        <DetailWrapper>
          <Fields>Product:</Fields>
          <Detail style={{ fontWeight: 'bolder' }}>{product.product}</Detail>
        </DetailWrapper>
        <DetailWrapper>
          <Fields>Description:</Fields>
          <Detail>{product.description}</Detail>
        </DetailWrapper>
        <DetailWrapper>
          <Fields>Current bid:</Fields>
          <Detail>
            {currentBid} {product.currency}
          </Detail>
        </DetailWrapper>
        <DetailWrapper>
          <Fields>Artist:</Fields>
          <Detail style={{ textTransform: 'uppercase', fontWeight: 'bolder' }}>{product.artist}</Detail>
        </DetailWrapper>
        <div style={{ width: '100%', fontSize: '0.75rem', textAlign: 'end', paddingRight: '1rem' }}>Time left:</div>
        <BidWrapper>
          <InputWrapper>
            <TextInput
              onChange={(event) => handleCheckBidAmount(event.target.value)}
              style={{ width: '70%' }}
              placeholder="Type price..."
            />
            <Text style={{ width: '30%' }}>{product.currency}</Text>
          </InputWrapper>
          <ActionWrapper>
            <AuctionButton handleBid={handleBid} isConnected={isConnected} transacting={transacting} />
            <Countdown date={endTime * 1000} renderer={renderTimer} />
          </ActionWrapper>
        </BidWrapper>
        <div style={{ width: '50%', fontSize: '0.75rem', textAlign: 'end' }}>
          Total offer amount: {balance ? Number(balance.formatted).toFixed(3) : 0.0} ETH
        </div>
      </ImageDetailWrapper>
    </>
  )
}
