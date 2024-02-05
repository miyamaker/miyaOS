import type { FetchBalanceResult } from '@wagmi/core'
import { get } from 'lodash'
import { useEffect, useState } from 'react'
import Countdown, { zeroPad } from 'react-countdown'
import styled from 'styled-components/macro'
import type { Address, ChainFormatters } from 'viem'
import { formatUnits } from 'viem'
import type { ChainConfig, ChainConstants } from 'viem/_types/types/chain'
import { useAccount, useWaitForTransaction } from 'wagmi'

import AuctionButton from '@/components/AuctionButton'
import ImagesList from '@/components/ProductDetail/ImagesList'
import { useAuctionData } from '@/pages/Auction/useAuctionData'
import { usePlaceBid } from '@/pages/Auction/usePlaceBid'
import { useToken } from '@/pages/Auction/useToken'
import { useAppSelector } from '@/store/hooks'
import { getTokenAttribute } from '@/utils/getTokenAttribute'

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

const SettleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
  margin-top: 1rem;
`

export default function ProductDetail({
  setErrorMessage,
  setErrorName,
  balance,
  chain,
  auctionContract,
}: {
  setErrorMessage: (value: string) => void
  setErrorName: (value: string) => void
  balance: FetchBalanceResult | undefined
  chain: (ChainConstants & ChainConfig<ChainFormatters | undefined> & { unsupported?: boolean }) | undefined
  auctionContract: Address
}) {
  // Account
  const { isConnected } = useAccount()

  const nft = useAppSelector((state) => state.collections.currentNFT)
  const currentAuctionToken = useAppSelector((state) => state.collections.currentToken)
  const tokenId = useAppSelector((state) => state.collections.currentTokenId)
  const nftContract = useAppSelector((state) => state.collections.currentNFTContract)
  const tokenIds = useAppSelector((state) => state.auction.currentTokenIds)
  const tokenURIs = useAppSelector((state) => state.auction.currentTokenURIs)

  const [transacting, setTransacting] = useState(false)
  const [txHash, setTxHash] = useState('')
  const [bidAmount, setBidAmount] = useState('0.0')

  // Get contract data
  const { currentBid, endTime, refetch } = useAuctionData({
    nft: nftContract,
    tokenId: tokenId || tokenIds[0] || 1,
    address: auctionContract,
    chainId: chain?.id,
  })
  const { placeBid } = usePlaceBid({ address: auctionContract, bidAmount })
  const { name, description, image, attributes } = useToken({ tokenURI: tokenURIs[0] || '', isFetch: !!tokenId })

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
    const re = /(^[0-9]+\.?[0-9]*$)|(^\.[0-9]+$)/
    if (!re.test(value)) return
    setBidAmount(value)
  }

  const handleBid = async () => {
    if (!isConnected) return
    setTransacting(true)
    try {
      const result = await placeBid(nftContract, tokenId)
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
  }, [currentAuctionToken, refetch])

  return (
    <>
      <ImagesListWrapper>
        <ImagesList images={[currentAuctionToken.image || image]} />
      </ImagesListWrapper>
      <ImageDetailWrapper>
        <DetailWrapper>
          <Fields>Collection:</Fields>
          <Detail style={{ fontWeight: 'bolder' }}>{nft.name}</Detail>
        </DetailWrapper>
        {/* <DetailWrapper> */}
        {/*  <Fields>Product:</Fields> */}
        {/*  <Detail style={{ fontWeight: 'bolder' }}> */}
        {/*    {getTokenAttribute( */}
        {/*      currentAuctionToken.attributes.length > 0 ? currentAuctionToken.attributes : attributes, */}
        {/*      'Group' */}
        {/*    )} */}
        {/*  </Detail> */}
        {/* </DetailWrapper> */}
        <DetailWrapper>
          <Fields>Name:</Fields>
          <Detail style={{ fontWeight: 'bolder' }}>{currentAuctionToken.name || name}</Detail>
        </DetailWrapper>
        <DetailWrapper>
          <Fields>Description:</Fields>
          <Detail>{currentAuctionToken.description || description}</Detail>
        </DetailWrapper>
        <DetailWrapper>
          <Fields>Dimensions:</Fields>
          <Detail>
            {getTokenAttribute(
              currentAuctionToken.attributes.length > 0 ? currentAuctionToken.attributes : attributes,
              'Dimensions'
            )}
          </Detail>
        </DetailWrapper>
        <DetailWrapper>
          <Fields>Current bid:</Fields>
          <Detail>
            {formatUnits(currentBid, 18)}{' '}
            {getTokenAttribute(
              currentAuctionToken.attributes.length > 0 ? currentAuctionToken.attributes : attributes,
              'Currency'
            )}
          </Detail>
        </DetailWrapper>
        <DetailWrapper>
          <Fields>Artist:</Fields>
          <Detail style={{ textTransform: 'uppercase', fontWeight: 'bolder' }}>
            {getTokenAttribute(
              currentAuctionToken.attributes.length > 0 ? currentAuctionToken.attributes : attributes,
              'Artist'
            )}
          </Detail>
        </DetailWrapper>
        {endTime * 1000 > new Date().getTime() ? (
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
                <Countdown date={endTime * 1000} renderer={renderTimer} />
              </ActionWrapper>
            </BidWrapper>
            <div style={{ width: '50%', fontSize: '0.75rem', textAlign: 'end' }}>
              Wallet Balance: {balance ? Number(balance.formatted).toFixed(3) : 0.0} ETH
            </div>
          </>
        ) : (
          <SettleWrapper>This auction has yet to start.</SettleWrapper>
        )}
      </ImageDetailWrapper>
    </>
  )
}
