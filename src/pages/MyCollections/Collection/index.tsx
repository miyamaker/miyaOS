import BackgroundButton from 'assets/explorer/background/background_button.png'
import styled from 'styled-components/macro'

import type { Token } from '@/pages/MyCollections'
import NFTs from '@/pages/MyCollections/Collection/NFTs'
import { MY_COLLECTIONS_PAGE_SECTION } from '@/pages/MyCollections/constants'
import type { CollectionBaseInfo } from '@/pages/MyCollections/types/token'

const CollectionContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  > * + * {
    margin-top: 0.5rem;
  }
`

const TitleContainer = styled.div`
  height: 10%;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const BackButtonContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
const BackButton = styled.button`
  background-color: #f36391;
  background-image: url(${BackgroundButton});
  background-blend-mode: overlay;
  background-size: 100% 100%;

  width: 3.5rem;
  height: 3.5rem;

  color: white;
  text-shadow: 2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000,
    -1px 1px #000;
  text-transform: uppercase;
  font-size: 0.65rem;

  border: none;
  border-radius: 50%;
  box-shadow: 4px 2px #272526;
  cursor: pointer;

  :hover {
    filter: brightness(120%);
  }
`

const Title = styled.div`
  text-shadow: 1px 0 #000, -1px 0 #000, 0 1px #000, 0 -1px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000,
    -1px 1px #000;
  color: white;
  font-weight: bolder;
`

export default function CollectionInfo({
  setPageSection,
  selectedCollection,
  setSelectedToken,
}: {
  setPageSection: (section: string) => void
  selectedCollection: CollectionBaseInfo
  setSelectedToken: (value: Token) => void
}) {
  return (
    <CollectionContainer>
      <TitleContainer>
        <BackButtonContainer>
          <BackButton onClick={() => setPageSection(MY_COLLECTIONS_PAGE_SECTION.COLLECTIONS_SECTION)}>Back</BackButton>
        </BackButtonContainer>
        <Title>Minted NFTs</Title>
      </TitleContainer>
      <NFTs
        // style={{ height: width > 640 ? '42%' : '35%' }}
        setPageSection={setPageSection}
        selectedCollection={selectedCollection}
        setSelectedToken={setSelectedToken}
      />
    </CollectionContainer>
  )
}
