import type { FetchBalanceResult } from '@wagmi/core'
import { get } from 'lodash'
import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import type { Address } from 'viem'
import { formatUnits } from 'viem'
import { useAccount, useEnsName, useWaitForTransaction } from 'wagmi'

import BidContainer from '@/components/ProductDetail/BidContainer'
import ImagesList from '@/components/ProductDetail/ImagesList'
import { useAuctionData } from '@/pages/Auction/useAuctionData'
import { usePlaceBid } from '@/pages/Auction/usePlaceBid'
import { useToken } from '@/pages/Auction/useToken'
import { useAppSelector } from '@/store/hooks'
import { getTokenAttribute } from '@/utils/getTokenAttribute'

const ProductDetailWrapper = styled.div`
  display: flex;

  @media only screen and (max-width: 640px) {
    flex-direction: column;

    > * + * {
      margin-top: 0.5rem;
    }
  }
`

const ImagesListWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: transparent;
  width: 33.3333%;

  @media only screen and (max-width: 640px) {
    height: 30%;
    width: 100%;
  }
`
const ImageDetailWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 66.6666%;

  @media only screen and (max-width: 640px) {
    width: 100%;
  }
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

  @media only screen and (max-width: 640px) {
    width: 35%;
  }
`

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.9rem;
  width: 75%;
  padding-left: 1.5rem;
  line-height: 1rem;

  @media only screen and (max-width: 640px) {
    width: 65%;
  }
`

export default function ProductDetail({
  setErrorMessage,
  setErrorName,
  balance,
  auctionContract,
}: {
  setErrorMessage: (value: string) => void
  setErrorName: (value: string) => void
  balance: FetchBalanceResult | undefined
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
  const { currentBid, endTime, bidder, refetch } = useAuctionData({
    nft: nftContract,
    tokenId: tokenId || tokenIds[0] || 1,
    address: auctionContract,
  })
  const { placeBid } = usePlaceBid({ address: auctionContract, bidAmount })
  const { name, description, image, attributes } = useToken({ tokenURI: tokenURIs[0] || '', isFetch: !!tokenId })

  const highestBidderENS = useEnsName({
    address: bidder as Address,
  })

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

  useEffect(() => {
    refetch()
  }, [currentAuctionToken, refetch])

  // useEffect(() => {
  //   if (endTime * 1000 < new Date().getTime()) {
  //     setErrorMessage(ERROR_MESSAGES.AUCTION_ENDED)
  //     setErrorName('MiyaAuction Notice')
  //   }
  // }, [endTime, setErrorMessage, setErrorName])
  //
  // if (endTime * 1000 < new Date().getTime()) {
  //   return <ProductDetailWrapper />
  // }

  return (
    <ProductDetailWrapper>
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
          <Detail
            style={{
              height: '8vh',
              overflowX: 'scroll',
              justifyContent: 'start',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
            }}
          >
            {currentAuctionToken.description || description}
          </Detail>
        </DetailWrapper>
        <DetailWrapper>
          <Fields>Highest bidder:</Fields>
          <Detail style={{ fontWeight: 'bolder' }}>{highestBidderENS?.data || bidder}</Detail>
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
          <Fields>Final bid:</Fields>
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
        <BidContainer
          handleCheckBidAmount={handleCheckBidAmount}
          handleBid={handleBid}
          isConnected={isConnected}
          transacting={transacting}
          balance={balance}
          currentAuctionToken={currentAuctionToken}
          attributes={attributes}
          endTime={endTime}
        />
      </ImageDetailWrapper>
    </ProductDetailWrapper>
  )
}
