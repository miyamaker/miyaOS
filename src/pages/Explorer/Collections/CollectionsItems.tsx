import styled from 'styled-components/macro'

import { EXPLORER_PAGE_SECTION } from '@/pages/Explorer/constants'

const CollectionListItemWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  padding: 0.5rem;

  > * + * {
    margin-left: 0.5rem;
  }

  :hover {
    background-color: rgba(39, 37, 38, 0.75);
  }
`

const CollectionItemNameWrapper = styled.div`
  width: 75%;
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
  width: 25%;
  > img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    border: none;
    margin: 0;
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
  return (
    <CollectionListItemWrapper onClick={() => setPageSection(EXPLORER_PAGE_SECTION.COLLECTION_SECTION)}>
      <CollectionItemIcon>
        <img src={collectionImage} alt="NFT" />
      </CollectionItemIcon>
      <CollectionItemNameWrapper>
        {isApprovedCollection ? (
          <CollectionApprovedName>{collectionName}</CollectionApprovedName>
        ) : (
          <CollectionCommunityName>{collectionName}</CollectionCommunityName>
        )}
      </CollectionItemNameWrapper>
    </CollectionListItemWrapper>
  )
}
