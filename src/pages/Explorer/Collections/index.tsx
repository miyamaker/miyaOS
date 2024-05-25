import { useQuery } from '@apollo/client'
import CollectionsImage from 'assets/explorer/sample/collections.jpeg'
import styled from 'styled-components/macro'

import SearchIcon from '@/assets/explorer/icon/search.svg'
import { Spinner } from '@/components/Spinner'
import { GET_COLLECTIONS } from '@/pages/Explorer/gql/collections'
import BackButton from '@/pages/Explorer/Button/BackButton'
import ConnectWalletButton from '@/pages/Explorer/Button/ConnectWalletButton'
import CollectionsItem from '@/pages/Explorer/Collections/CollectionsItem'
import { EXPLORER_PAGE_SECTION } from '@/pages/Explorer/constants'
import type { Collection } from '@/pages/Explorer/types/collection'

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
`

const CollectionsInfoContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
`

const ConnectButtonWrapper = styled.div`
  width: 75%;
  height: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CollectionImage = styled.img`
  border: none;
  width: 75%;
  height: 75%;
  object-fit: contain;
  border-radius: 5%;

  :hover {
    border: none;
  }
`
const CollectionTitle = styled.div`
  font-weight: bolder;
  text-transform: uppercase;
  margin-bottom: 1rem;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 1);
`

const CollectionDescription = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;

  > p {
    text-align: center;
    color: white;
    text-transform: uppercase;
    background-color: rgba(39, 37, 38, 0.8);
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.6);
    padding: 1rem;
    border-radius: 5%;
    text-shadow: 2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000,
      -1px 1px #000;
    font-size: 0.8rem;
  }
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

const CollectionListWrapper = styled.div`
  width: 75%;
  height: 75%;
  border: none;
  padding: 0.5rem;
  background: rgba(39, 37, 38, 0.9);
  box-shadow: 0 0 0.7rem 0.7rem rgba(0, 0, 0, 0.6);
  margin-bottom: 4rem;
`

const CollectionListItemContainer = styled.div`
  width: 100%;
  height: calc(100% - 1.3rem);

  overflow-y: auto;
  overflow-x: hidden;
`

const CollectionSearch = styled.input`
  width: 100%;
  height: 1.3rem;
  margin-bottom: 0.5rem;
  background: url(${SearchIcon}) no-repeat scroll 0.3rem 0.3rem;
  background-size: 5%;
  padding-left: 30px;
  border: none;
  color: white;

  :focus {
    outline: none;
  }
`

const CollectionInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export default function Collections({
  setPageSection,
  closeWindow,
  isConnected,
  setSelectedCollection,
}: {
  setPageSection: (section: string) => void
  closeWindow: () => void
  isConnected: boolean
  setSelectedCollection: (collection: Collection) => void
}) {
  const { loading, error, data } = useQuery(GET_COLLECTIONS, { variables: { offset: 0, limit: 20 } })

  const handleClickCollection = (collection: Collection) => {
    setSelectedCollection(collection)
    setPageSection(EXPLORER_PAGE_SECTION.COLLECTION_SECTION)
  }

  return (
    <Wrapper>
      <CollectionsInfoContainer>
        <CollectionInfoWrapper>
          <CollectionTitle>WHO IS THE MIYAMAKER</CollectionTitle>
          <CollectionImage src={CollectionsImage} />
          <CollectionDescription>
            <p> MINT BY selecting a collection from the list at right</p>
          </CollectionDescription>
        </CollectionInfoWrapper>
        <ConnectButtonWrapper>
          <BackButton text="Exit" handleClick={closeWindow} />
          <ConnectWalletButton isConnected={isConnected} />
        </ConnectButtonWrapper>
      </CollectionsInfoContainer>
      <CollectionListContainer>
        <CollectionListWrapper>
          <CollectionSearch type="text" placeholder="Search for collection..." />
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
              (data.Collection as Collection[]).map((collection, index) => (
                <CollectionsItem
                  key={index}
                  collection={collection}
                  handleClick={() => handleClickCollection(collection)}
                />
              ))
            )}
          </CollectionListItemContainer>
        </CollectionListWrapper>
      </CollectionListContainer>
    </Wrapper>
  )
}
