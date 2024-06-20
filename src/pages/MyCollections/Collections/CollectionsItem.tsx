import { useQuery } from '@apollo/client'
import millify from 'millify'
import styled from 'styled-components/macro'

import SampleImage from '@/assets/explorer/sample/nft_2.png'
import { useContractMetadata } from '@/pages/Mint/useContractMetadata'
import { GET_USER_NFTS_BY_COLLECTION } from '@/pages/MyCollections/gql/collections'
import type { CollectionBaseInfo } from '@/pages/MyCollections/types/token'

const CollectionListItemWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  padding: 0.5rem;
  border-radius: 0.75rem;

  > * + * {
    margin-left: 0.5rem;
  }

  :hover {
    background-color: rgba(204, 144, 204, 0.7);
  }
`

const CollectionItemNameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 75%;
  font-weight: bolder;
  text-shadow: 1px 0 #fff, -1px 0 #fff, 0 1px #fff, 0 -1px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff,
    -1px 1px #fff;

  > p {
    text-wrap: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 0;
  }
`

const CollectionApprovedName = styled.p`
  font-size: 0.75rem;
  color: rgb(59, 48, 107);
`

const NFTsOwnedSection = styled.div`
  font-size: 0.75rem;
  display: flex;
  align-items: center;

  > * + * {
    margin-left: 0.5rem;
  }
`

const CollectionItemIcon = styled.div`
  width: 25%;

  > img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    border: none;
    margin: 0;
    border-radius: 5%;
  }
`

export default function CollectionsItem({
  collection,
  handleClick,
  address,
}: {
  collection: CollectionBaseInfo
  handleClick: () => void
  address: `0x${string}` | undefined
}) {
  const { image } = useContractMetadata({ metadataUri: collection.metadataUri })
  const { loading, error, data } = useQuery(GET_USER_NFTS_BY_COLLECTION, {
    variables: { ownerAddress: address || '', collectionAddress: collection.address },
  })

  return (
    <CollectionListItemWrapper onClick={handleClick}>
      <CollectionItemIcon>
        <img src={image || SampleImage} alt={collection.name} />
      </CollectionItemIcon>
      <CollectionItemNameWrapper>
        <CollectionApprovedName>{collection.name}</CollectionApprovedName>
        <NFTsOwnedSection>
          <div title={loading || error ? 0 : data.Token.length} style={{ color: 'rgb(148,7,28)' }}>
            {millify(loading || error ? 0 : data.Token.length)} owned
          </div>
          <span>/</span>
          <div title={collection.maxSupply} style={{ color: 'rgb(28,110,9)' }}>
            {millify(Number(collection.maxSupply))} supplies
          </div>
        </NFTsOwnedSection>
      </CollectionItemNameWrapper>
    </CollectionListItemWrapper>
  )
}
