import NFT1 from 'assets/explorer/sample/nft_1.png'
import NFT2 from 'assets/explorer/sample/nft_2.png'
import NFT3 from 'assets/explorer/sample/nft_3.png'
import NFT4 from 'assets/explorer/sample/nft_4.png'
import type { CSSProperties } from 'react'
import { useState } from 'react'
import styled from 'styled-components/macro'

import NFTItem from '@/pages/Explorer/RecentMint/NFTItem'
import Pagination from '@/pages/Explorer/RecentMint/Pagination'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  font-size: large;
  text-transform: uppercase;
`

const NFTList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;

  overflow-y: scroll;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
`

const sample = [
  {
    tokenId: 1133,
    image: NFT1,
    name: 'RADBRO',
  },
  {
    tokenId: 2324,
    image: NFT2,
    name: 'RADBRO',
  },
  {
    tokenId: 4893,
    image: NFT3,
    name: 'RADBRO',
  },
  {
    tokenId: 1238,
    image: NFT4,
    name: 'RADBRO',
  },
  {
    tokenId: 5153,
    image: NFT1,
    name: 'RADBRO',
  },
  {
    tokenId: 2123,
    image: NFT2,
    name: 'RADBRO',
  },
  {
    tokenId: 231,
    image: NFT3,
    name: 'RADBRO',
  },
  {
    tokenId: 4156,
    image: NFT4,
    name: 'RADBRO',
  },
  {
    tokenId: 213,
    image: NFT2,
    name: 'RADBRO',
  },
  {
    tokenId: 45241,
    image: NFT3,
    name: 'RADBRO',
  },
  {
    tokenId: 1234,
    image: NFT4,
    name: 'RADBRO',
  },
]

const ITEM_PER_PAGE = 8

export default function RecentMint({ style }: { style?: CSSProperties }) {
  const totalPages = Math.ceil(sample.length / ITEM_PER_PAGE)
  const [currentCounter, setCurrentCounter] = useState<number>(1)
  return (
    <Container style={style}>
      <Title>Recent Mints</Title>
      <NFTList>
        {sample
          .slice(ITEM_PER_PAGE * (currentCounter - 1), ITEM_PER_PAGE * currentCounter)
          .map(({ tokenId, image, name }, index) => (
            <NFTItem tokenId={tokenId} image={image} name={name} key={index} />
          ))}
      </NFTList>
      <Pagination totalPages={totalPages} currentPage={currentCounter} setCurrentCounter={setCurrentCounter} />
    </Container>
  )
}
