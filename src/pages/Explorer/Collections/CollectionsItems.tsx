import CollectionsImage from 'assets/explorer/sample/collections.jpeg'
import styled from 'styled-components/macro'

import SearchIcon from '@/assets/explorer/icon/search.svg'
import NFT1 from '@/assets/explorer/sample/nft_1.png'
import NFT2 from '@/assets/explorer/sample/nft_2.png'
import ConnectButton from '@/pages/Explorer/Button/ConnectButton'
import { EXPLORER_PAGE_SECTION } from '@/pages/Explorer/constants'

const CollectionListItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  :hover {
    cursor: pointer;
  }
`

const CollectionItemNameWrapper = styled.div`
  width: 70%;
  font-size: 0.6rem;
  font-weight: bolder;
  text-shadow: 2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000,
    -1px 1px #000;
  > p {
    text-wrap: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 0;
  }
`

const CollectionApprovedName = styled.p`
  color: rgba(130, 106, 237, 1);
`

const CollectionCommunityName = styled.p`
  color: rgba(158, 240, 26, 1);
`

const CollectionItemIcon = styled.div`
  width: 30%;
  > img {
    width: 50%;
    height: 50%;
    border: none;
  }
`

export default function CollectionsItems({
  collectionImage,
  collectionName,
  isApprovedCollection,
  setPageSection,
}: {
  collectionImage: string
  collectionName: string
  isApprovedCollection: boolean
  setPageSection: (section: string) => void
}) {
  console.log('CollectionsItems')
  return (
    <CollectionListItemWrapper>
      <CollectionItemIcon>
        <img src={collectionImage} alt="NFT" />
      </CollectionItemIcon>
      <CollectionItemNameWrapper onClick={() => setPageSection(EXPLORER_PAGE_SECTION.COLLECTION_SECTION)}>
        {isApprovedCollection ? (
          <CollectionApprovedName>{collectionName}</CollectionApprovedName>
        ) : (
          <CollectionCommunityName>{collectionName}</CollectionCommunityName>
        )}
      </CollectionItemNameWrapper>
    </CollectionListItemWrapper>
  )
}
