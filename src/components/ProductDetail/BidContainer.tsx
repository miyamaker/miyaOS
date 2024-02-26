import type { FetchBalanceResult } from '@wagmi/core'
import Countdown, { zeroPad } from 'react-countdown'
import styled from 'styled-components/macro'
import { useWindowSize } from 'usehooks-ts'

import AuctionButton from '@/components/AuctionButton'
import type { Attribute, TokenMetadata } from '@/store/collections/reducer'
import { getTokenAttribute } from '@/utils/getTokenAttribute'

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

const SettleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
  margin-top: 1rem;
`

export default function BidContainer({
  handleCheckBidAmount,
  handleBid,
  isConnected,
  transacting,
  endTime,
  balance,
  currentAuctionToken,
  attributes,
}: {
  handleCheckBidAmount: (value: string) => void
  handleBid: () => void
  isConnected: boolean
  transacting: boolean
  endTime: number | undefined
  balance: FetchBalanceResult | undefined
  currentAuctionToken: TokenMetadata
  attributes: Attribute[]
}) {
  const { width } = useWindowSize()

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

  if (endTime * 1000 <= new Date().getTime()) {
    return <SettleWrapper>This auction has ended.</SettleWrapper>
  }

  if (width > 640) {
    return (
      <>
        <div style={{ width: '100%', fontSize: '0.75rem', textAlign: 'end', paddingRight: '1rem' }}>Time left:</div>
        <BidWrapper>
          <InputWrapper>
            <TextInput
              onChange={(event) => handleCheckBidAmount(event.target.value)}
              style={{ width: '70%' }}
              placeholder="Type price..."
            />
            <Text style={{ width: '30%' }}>
              {getTokenAttribute(
                currentAuctionToken.attributes.length > 0 ? currentAuctionToken.attributes : attributes,
                'Currency'
              )}
            </Text>
          </InputWrapper>
          <ActionWrapper>
            <AuctionButton handleBid={handleBid} isConnected={isConnected} transacting={transacting} />
            <Countdown date={endTime ? endTime * 1000 : 0} renderer={renderTimer} />
          </ActionWrapper>
        </BidWrapper>
        <div style={{ width: '50%', fontSize: '0.75rem', textAlign: 'end' }}>
          Total offer amount: {balance ? Number(balance.formatted).toFixed(3) : 0.0} ETH
        </div>
      </>
    )
  }

  return (
    <>
      <div style={{ width: '100%', fontSize: '0.75rem', textAlign: 'end', paddingRight: '1rem' }}>Time left:</div>
      <BidWrapper>
        <InputWrapper>
          <TextInput
            onChange={(event) => handleCheckBidAmount(event.target.value)}
            style={{ width: '70%' }}
            placeholder="Type price..."
          />
          <Text style={{ width: '30%' }}>
            {getTokenAttribute(
              currentAuctionToken.attributes.length > 0 ? currentAuctionToken.attributes : attributes,
              'Currency'
            )}
          </Text>
        </InputWrapper>
        <ActionWrapper>
          <Countdown date={endTime ? endTime * 1000 : 0} renderer={renderTimer} />
        </ActionWrapper>
      </BidWrapper>
      <div style={{ width: '50%', fontSize: '0.75rem', textAlign: 'end' }}>
        Total offer amount: {balance ? Number(balance.formatted).toFixed(3) : 0.0} ETH
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '1rem' }}>
        <AuctionButton handleBid={handleBid} isConnected={isConnected} transacting={transacting} />
      </div>
    </>
  )
}
