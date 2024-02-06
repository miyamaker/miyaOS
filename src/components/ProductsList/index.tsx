import { useEffect } from 'react'
import styled from 'styled-components/macro'
import type { Address } from 'viem'

import AuctionProduct from '@/components/ProductsList/AuctionProduct'
import { useTokenIds } from '@/pages/Auction/useTokenIds'
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

  const { tokenIds, tokenURIs } = useTokenIds({
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
