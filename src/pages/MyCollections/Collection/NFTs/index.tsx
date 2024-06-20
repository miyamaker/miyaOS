import { useQuery } from '@apollo/client'
import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { useAccount } from 'wagmi'

import { Spinner } from '@/components/Spinner'
import type { Token } from '@/pages/Mint'
import { GET_NFTS_OF_USER } from '@/pages/Mint/gql/NFTs'
import type { Collection } from '@/pages/Mint/types/collection'
import NFTItem from '@/pages/MyCollections/Collection/NFTs/NFTItem'
import Pagination from '@/pages/MyCollections/Collection/NFTs/Pagination'
import type { CollectionBaseInfo } from '@/pages/MyCollections/types/token'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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

export default function NFTs({
  style,
  setPageSection,
  selectedCollection,
  setSelectedToken,
}: {
  style?: CSSProperties
  setPageSection: (section: string) => void
  selectedCollection: CollectionBaseInfo
  setSelectedToken: (token: Token) => void
}) {
  const [currentCounter, setCurrentCounter] = useState<number>(1)
  const [isEndPage, setIsEndPage] = useState<boolean>(true)

  const { address } = useAccount()

  const { loading, error, data } = useQuery(GET_NFTS_OF_USER, {
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

  return (
    <Container style={style}>
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
