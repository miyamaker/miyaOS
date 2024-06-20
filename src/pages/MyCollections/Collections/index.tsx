import { useQuery } from '@apollo/client'
import styled from 'styled-components/macro'
import { useAccount } from 'wagmi'

// import SearchIcon from '@/assets/explorer/icon/search.svg'
import { Spinner } from '@/components/Spinner'
import CollectionsItem from '@/pages/MyCollections/Collections/CollectionsItem'
import { MY_COLLECTIONS_PAGE_SECTION } from '@/pages/MyCollections/constants'
import { GET_USER_COLLECTIONS } from '@/pages/MyCollections/gql/collections'
import type { CollectionBaseInfo, CollectionUserOwnedToken } from '@/pages/MyCollections/types/token'

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
`

const CollectionListContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
`

const CollectionListItemContainer = styled.div`
  width: 100%;
  height: calc(100% - 1.3rem);

  overflow-y: auto;
  overflow-x: hidden;
  padding-left: 2rem;
  padding-right: 2rem;
`

// const CollectionSearch = styled.input`
//   width: 100%;
//   height: 1.3rem;
//   margin-bottom: 0.5rem;
//   background: url(${SearchIcon}) no-repeat scroll 0.3rem 0.3rem;
//   background-size: 5%;
//   padding-left: 30px;
//   border: none;
//   color: white;
//
//   :focus {
//     outline: none;
//   }
// `

export default function Collections({
  setPageSection,
  setSelectedCollection,
}: {
  setPageSection: (section: string) => void
  setSelectedCollection: (collection: CollectionBaseInfo) => void
}) {
  const { address } = useAccount()

  const { loading, error, data } = useQuery(GET_USER_COLLECTIONS, {
    variables: { offset: 0, limit: 100, ownerAddress: address || '' },
  })

  const handleClickCollection = (collection: CollectionBaseInfo) => {
    setPageSection(MY_COLLECTIONS_PAGE_SECTION.COLLECTION_SECTION)
    setSelectedCollection(collection)
  }

  return (
    <Wrapper>
      <CollectionListContainer>
        {/* <CollectionSearch type="text" placeholder="Search for collection..." /> */}
        <CollectionListItemContainer>
          {loading || error ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: 'calc(100% - 1.3rem)',
              }}
            >
              <Spinner />
            </div>
          ) : (
            (data.Token as CollectionUserOwnedToken[]).map((collectionUserOwnedToken, index) => (
              <CollectionsItem
                key={index}
                collection={collectionUserOwnedToken.collection}
                handleClick={() => handleClickCollection(collectionUserOwnedToken.collection)}
                address={address}
              />
            ))
          )}
        </CollectionListItemContainer>
      </CollectionListContainer>
    </Wrapper>
  )
}
