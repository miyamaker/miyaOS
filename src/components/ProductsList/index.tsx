import { difference } from 'lodash'
import { useEffect } from 'react'
import styled from 'styled-components/macro'
import type { Address, ChainFormatters } from 'viem'
import type { ChainConfig, ChainConstants } from 'viem/_types/types/chain'

import ImageWrapper from '@/components/ImageWrapper'
import { Button } from '@/components/ProductDetail/ImagesList'
import { useBaseURI } from '@/pages/Auction/useBaseURI'
import { useTokenIds } from '@/pages/Auction/useTokenIds'
import { getCurrentNFT, setCurrentTokenIdsList, updateAuctionsList } from '@/store/auction/actions'
import type { Product } from '@/store/auction/reducer'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getAuctionsListDetail } from '@/utils/getAuctionsListDetail'

const ProductsListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  overflow-y: scroll;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
`

const ProductWrapper = styled.div`
  width: 25%;
  padding: 0.5rem;
`

const ImageDetail = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  > img {
    border: none;
  }

  > img:hover {
    border: none;
  }

  > * + * {
    margin-top: 0.5rem;
  }
`

const Image = styled.img`
  height: 80%;
`

const Description = styled.div`
  font-size: 0.5rem;
  font-weight: bolder;
`

export default function ProductsList({
  auctionContract,
  chain,
}: {
  auctionContract: Address
  chain: (ChainConstants & ChainConfig<ChainFormatters | undefined> & { unsupported?: boolean }) | undefined
}) {
  const dispatch = useAppDispatch()

  const nftContract = useAppSelector((state) => state.auction.currentNFTContract)
  const products = useAppSelector((state) => state.auction.productsList)
  const currentTokenIds = useAppSelector((state) => state.auction.currentTokenIds)

  const { baseURI } = useBaseURI({
    address: nftContract,
    chainId: chain?.id,
  })
  const { tokenIds } = useTokenIds({
    nft: nftContract,
    address: auctionContract,
    chainId: chain?.id,
  })

  const handleBid = (id: number) => {
    dispatch(getCurrentNFT({ id }))
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleGetAuctionsListDetail = async () => {
    const result = await getAuctionsListDetail(tokenIds, baseURI)
    dispatch(updateAuctionsList({ auctions: result as Product[] }))
  }

  useEffect(() => {
    if (difference(tokenIds, currentTokenIds).length > 0) {
      dispatch(setCurrentTokenIdsList({ tokenIds }))
      handleGetAuctionsListDetail()
    }
  }, [currentTokenIds, dispatch, handleGetAuctionsListDetail, tokenIds])

  return (
    <ProductsListWrapper>
      {products.map((product: Product, index: number) => (
        <ProductWrapper key={index}>
          <ImageWrapper style={{ padding: '0.75rem', height: '80%' }}>
            <ImageDetail>
              <Image src={product.images[0]} alt="Product Image" />
              <Description>{product.product}</Description>
              {/* <Description> */}
              {/*  Current bid: {product.currentBid} {product.currency} */}
              {/* </Description> */}
            </ImageDetail>
          </ImageWrapper>
          <Button onClick={() => handleBid(product.id)} style={{ width: '100%', marginTop: '0.25rem' }}>
            Bid
          </Button>
        </ProductWrapper>
      ))}
    </ProductsListWrapper>
  )
}
