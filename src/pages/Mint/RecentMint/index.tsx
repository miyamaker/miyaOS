import { useQuery } from '@apollo/client'
import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { useAccount } from 'wagmi'

import { Spinner } from '@/components/Spinner'
import type { Token } from '@/pages/Mint'
import { GET_NFTS_OF_USER } from '@/pages/Mint/gql/NFTs'
import NFTItem from '@/pages/Mint/RecentMint/NFTItem'
import Pagination from '@/pages/Mint/RecentMint/Pagination'
import type { Collection } from '@/pages/Mint/types/collection'

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

  overflow-y: auto;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
`

const ITEM_PER_PAGE = 8

type NFT = {
  metadataUri: string
  token_id: string
  owner_id: string
  collection: Collection
}

export default function RecentMint({
  style,
  setPageSection,
  selectedCollection,
  setSelectedToken,
  toggleFetchRecentMint,
}: {
  style?: CSSProperties
  setPageSection: (section: string) => void
  selectedCollection: Collection
  setSelectedToken: (token: Token) => void
  toggleFetchRecentMint: boolean
}) {
  const [currentCounter, setCurrentCounter] = useState<number>(1)
  const [isEndPage, setIsEndPage] = useState<boolean>(true)

  const { address } = useAccount()

  const { loading, error, data, refetch } = useQuery(GET_NFTS_OF_USER, {
    variables: {
      offset: (currentCounter - 1) * ITEM_PER_PAGE,
      limit: ITEM_PER_PAGE,
      collectionAddress: selectedCollection.address,
      ownerAddress: address || '',
    },
  })

  useEffect(() => {
    if (data) {
      if ((data.Token as NFT[]).length < ITEM_PER_PAGE) {
        setIsEndPage(true)
      } else {
        setIsEndPage(false)
      }
    }
  }, [data])

  useEffect(() => {
    refetch()
  }, [toggleFetchRecentMint])

  return (
    <Container style={style}>
      <Title>Recent Mints</Title>
      {loading || error ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <Spinner />
        </div>
      ) : (
        <>
          <NFTList>
            {(data.Token as NFT[]).map(({ token_id, collection }, index) => (
              <NFTItem
                collectionAddress={collection.address}
                tokenId={token_id}
                key={index}
                setPageSection={setPageSection}
                setSelectedToken={setSelectedToken}
              />
            ))}
          </NFTList>
          <Pagination isEndPage={isEndPage} currentPage={currentCounter} setCurrentCounter={setCurrentCounter} />
        </>
      )}
    </Container>
  )
}
