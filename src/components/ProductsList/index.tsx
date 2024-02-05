import { useCallback, useEffect, useMemo } from 'react'
import styled from 'styled-components/macro'
import type { Address, ChainFormatters } from 'viem'
import type { ChainConfig, ChainConstants } from 'viem/_types/types/chain'

import AuctionProduct from '@/components/ProductsList/AuctionProduct'
import { useTokenIds } from '@/pages/Auction/useTokenIds'
import { setCurrentTokenIdsList } from '@/store/auction/actions'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useToken } from '@/pages/Auction/useToken'

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

export default function ProductsList({
  auctionContract,
  chain,
}: {
  auctionContract: Address
  chain: (ChainConstants & ChainConfig<ChainFormatters | undefined> & { unsupported?: boolean }) | undefined
}) {
  const dispatch = useAppDispatch()

  const nftContract = useAppSelector((state) => state.collections.currentNFTContract)

  const { tokenIds, tokenURIs } = useTokenIds({
    nft: nftContract,
    address: auctionContract,
    chainId: chain?.id,
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
