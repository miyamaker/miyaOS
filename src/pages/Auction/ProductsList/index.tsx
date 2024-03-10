import { useEffect } from 'react'
import styled from 'styled-components/macro'
import type { Address } from 'viem'

import AuctionProduct from '@/pages/Auction/ProductsList/AuctionProduct'
import { useAllTokenIds } from '@/pages/Auction/useAllTokenIds'
import { setCurrentTokenIdsList } from '@/store/auction/actions'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

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

export default function ProductsList({ auctionContract }: { auctionContract: Address }) {
  const dispatch = useAppDispatch()

  const nftContract = useAppSelector((state) => state.collections.currentNFTContract)

  const { tokenIds, tokenURIs } = useAllTokenIds({
    nft: nftContract,
    address: auctionContract,
  })

  useEffect(() => {
    dispatch(setCurrentTokenIdsList({ tokenIds, tokenURIs }))
  }, [dispatch, tokenIds, tokenURIs])

  return (
    <ProductsListWrapper>
      {tokenIds.map((tokenId: number, index: number) => (
        <AuctionProduct key={index} tokenId={tokenId} tokenURI={tokenURIs[index] || ''} />
      ))}
    </ProductsListWrapper>
  )
}
