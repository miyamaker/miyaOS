import CollectionsImage from 'assets/explorer/sample/collections.jpeg'
import styled from 'styled-components/macro'

import SearchIcon from '@/assets/explorer/icon/search.svg'
import NFT1 from '@/assets/explorer/sample/nft_1.png'
import NFT2 from '@/assets/explorer/sample/nft_2.png'
import ConnectButton from '@/pages/Explorer/Button/ConnectButton'
import { EXPLORER_PAGE_SECTION } from '@/pages/Explorer/constants'

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;

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
  padding: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const ImageItem = styled.img`
  border-radius: 8px;
  width: 75%;
  height: 40%;
  border: none;
  margin: 0;

  :hover {
    border: none;
  }
`
const CollectionTitle = styled.h1`
  display: flex;
  text-transform: uppercase;
  margin-bottom: 0.8rem;
`

const CollectionDescription = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > p {
    text-align: center;
    color: white;
    text-transform: uppercase;
    background-color: rgba(39, 37, 38, 0.8);
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.6);
    margin-top: 1rem;
    padding: 0.5rem;
    border-radius: 8px;
    text-shadow: 2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000,
      -1px 1px #000;
  }
`

const CollectionListContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  padding: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const CollectionListWrapper = styled.div`
  width: 90%;
  height: 80%;
  border: none;
  background: rgba(39, 37, 38, 0.9);
  box-shadow: 0px 0px 0.7rem 0.7rem rgba(0, 0, 0, 0.6);
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
  text-wrap: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: bolder;
  text-shadow: 2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000,
    -1px 1px #000;
`

const CollectionCommunityName = styled.p`
  color: rgba(158, 240, 26, 1);
`

const CollectionApprovedName = styled.p`
  color: rgba(130, 106, 237, 1);
`

const CollectionItemIcon = styled.div`
  width: 30%;
  > img {
    width: 50%;
    height: 50%;
    border: none;
  }
`

export default function Collections({ setPageSection }: { setPageSection: (section: string) => void }) {
  return (
    <Wrapper>
      <CollectionsInfoContainer>
        <CollectionTitle>WHO IS THE MIYAMAKER</CollectionTitle>
        <ImageItem src={CollectionsImage} />
        <CollectionDescription>
          <p> MINT BY selecting a collection from the list at right</p>
        </CollectionDescription>
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
            {Array.from({ length: 5 }).map((_, index) => (
              <CollectionListItemWrapper>
                <CollectionItemIcon>
                  <img src={NFT1} alt="NFT" />
                </CollectionItemIcon>
                <CollectionItemNameWrapper>
                  <CollectionApprovedName>collection approved {index + 1}</CollectionApprovedName>
                </CollectionItemNameWrapper>
              </CollectionListItemWrapper>
            ))}

            {Array.from({ length: 5 }).map((_, index) => (
              <CollectionListItemWrapper>
                <CollectionItemIcon>
                  <img src={NFT2} alt="NFT" />
                </CollectionItemIcon>
                <CollectionItemNameWrapper>
                  <CollectionCommunityName>
                    collection community collection community {index + 1}
                  </CollectionCommunityName>
                </CollectionItemNameWrapper>
              </CollectionListItemWrapper>
            ))}
          </CollectionListItemContainer>
        </CollectionListWrapper>
      </CollectionListContainer>
    </Wrapper>
  )
}
