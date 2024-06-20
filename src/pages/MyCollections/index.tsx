import BackgroundImage from 'assets/explorer/background/background.png'
import { useState } from 'react'
import styled from 'styled-components/macro'

import TitleBar from '@/components/TitleBar'
import WindowWrapper from '@/components/WindowWrapper'
import Pages from '@/constants/pages'
import { MINT_PAGE_SECTION } from '@/pages/Mint/constants'
import CollectionInfo from '@/pages/MyCollections/Collection'
import NFTDetail from '@/pages/MyCollections/Collection/NFTs/NFTDetail'
import Collections from '@/pages/MyCollections/Collections'
import { MY_COLLECTIONS_PAGE_SECTION } from '@/pages/MyCollections/constants'
import type { CollectionBaseInfo } from '@/pages/MyCollections/types/token'
import type { TokenMetadata } from '@/store/collections/reducer'
import { useAppDispatch } from '@/store/hooks'
import { closeWindow, minimizeWindow } from '@/store/windows/actions'
import type { PageKey } from '@/store/windows/reducer'

const page = Pages.myCollections
const pageId = page?.id as PageKey

const Background = styled.div`
  height: calc(100% - 1.5rem);
  width: 100%;

  position: relative;
  overflow: hidden;

  :before {
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.6;
    background-image: url(${BackgroundImage});
    background-repeat: no-repeat;
    background-position: 50% 0;
    background-size: cover;
  }

  * {
    font-family: 'Revalia', sans-serif;
    letter-spacing: 1px;
  }
`
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 1rem;
  height: 100%;
`

export type Token = {
  metadata: TokenMetadata
  tokenId: string
  collectionAddress: string
}

export default function MyCollectionsPage() {
  // Window mgmt
  const dispatch = useAppDispatch()
  const close = () => dispatch(closeWindow({ value: pageId }))
  const minimize = () => dispatch(minimizeWindow({ value: pageId }))

  const [pageSection, setPageSection] = useState<string>(MY_COLLECTIONS_PAGE_SECTION.COLLECTIONS_SECTION)
  const [selectedCollection, setSelectedCollection] = useState<CollectionBaseInfo>({
    name: '',
    symbol: '',
    metadataUri: '',
    address: '',
    maxSupply: '0',
  })
  const [selectedToken, setSelectedToken] = useState<Token>({
    metadata: {
      name: '',
      description: '',
      image: '',
      external_url: '',
      attributes: [],
    },
    tokenId: '',
    collectionAddress: '',
  })

  const renderSection = () => {
    switch (pageSection) {
      case MINT_PAGE_SECTION.COLLECTIONS_SECTION:
        return <Collections setPageSection={setPageSection} setSelectedCollection={setSelectedCollection} />
      case MINT_PAGE_SECTION.COLLECTION_SECTION:
        return (
          <CollectionInfo
            setPageSection={setPageSection}
            selectedCollection={selectedCollection}
            setSelectedToken={setSelectedToken}
          />
        )
      case MINT_PAGE_SECTION.NFT_SECTION:
        return <NFTDetail setPageSection={setPageSection} selectedToken={selectedToken} />
      default:
        return <></>
    }
  }

  return (
    <WindowWrapper>
      <TitleBar
        closeBtn
        onClose={(e) => {
          if (e.cancelable) e.stopPropagation()
          close()
        }}
        minimizeBtn
        onMinimize={(e) => {
          if (e.cancelable) e.stopPropagation()
          minimize()
        }}
      >
        {page?.label}
      </TitleBar>
      <Background>
        <Container>{renderSection()}</Container>
      </Background>
    </WindowWrapper>
  )
}
