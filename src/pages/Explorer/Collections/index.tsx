import CollectionsImage from 'assets/explorer/sample/collections.jpeg'
import styled from 'styled-components/macro'

import SearchIcon from '@/assets/explorer/icon/search.svg'
import NFT1 from '@/assets/explorer/sample/nft_1.png'
import NFT2 from '@/assets/explorer/sample/nft_2.png'
import ConnectButton from '@/pages/Explorer/Button/ConnectButton'
import { EXPLORER_PAGE_SECTION } from '@/pages/Explorer/constants'
import CollectionsItems from './CollectionsItems'

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;

  * {
    font-family: Revalia;
    font-size: 0.8rem;
    line-height: 1rem;
  }
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

  > button {
    width: 90px;
    height: 90px;
  }
`

const CollectionImage = styled.img`
  border: none;
  width: 75%;
  height: 75%;
  object-fit: contain;
  border: none;
  border-radius: 5%;

  :hover {
    border: none;
  }
`
const CollectionTitle = styled.h1`
  font-weight: bolder;
  text-transform: uppercase;
  margin-bottom: 1rem;
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
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.6);
    padding: 1rem;
    border-radius: 5%;
    text-shadow: 2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000,
      -1px 1px #000;
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
  background: rgba(39, 37, 38, 0.9);
  box-shadow: 0px 0px 0.7rem 0.7rem rgba(0, 0, 0, 0.6);
  margin-bottom: 4rem;
`

const CollectionListItemContainer = styled.div`
  width: 100%;
  height: 90%;
  margin-bottom: 3rem;

  overflow-y: scroll;
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

export default function Collections({ setPageSection }: { setPageSection: (section: string) => void }) {
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
          <ConnectButton text="Exit" handleClick={() => console.log('click')}></ConnectButton>
          <ConnectButton
            text="Connect"
            handleClick={() => setPageSection(EXPLORER_PAGE_SECTION.COLLECTION_SECTION)}
          ></ConnectButton>
        </ConnectButtonWrapper>
      </CollectionsInfoContainer>
      <CollectionListContainer>
        <CollectionListWrapper>
          <CollectionSearch type="text" placeholder="Search for collection..." />
          <CollectionListItemContainer>
            {Array.from({ length: 20 }).map((_, index) => (
              <CollectionsItems
                key={index}
                collectionImage={index % 2 === 0 ? NFT1 : NFT2}
                collectionName={
                  index % 2 === 0 ? `approved collection ${index + 1}` : `community collection ${index + 1}`
                }
                isApprovedCollection={index % 2 === 0}
                setPageSection={() => setPageSection(EXPLORER_PAGE_SECTION.COLLECTION_SECTION)}
              ></CollectionsItems>
            ))}
          </CollectionListItemContainer>
        </CollectionListWrapper>
      </CollectionListContainer>
    </Wrapper>
  )
}
