import BackgroundImage from 'assets/explorer/background/background.png'
import WarningIcon from 'assets/icon/warning.png'
import { useState } from 'react'
import styled from 'styled-components/macro'
import { useAccount } from 'wagmi'

import { NormalButton } from '@/components/Button/NormalButton'
import { ErrorButtonWrapper, ErrorContent, ErrorMessage, ErrorWindow, ErrorWrapper } from '@/components/Errors'
import TitleBar from '@/components/TitleBar'
import WindowWrapper from '@/components/WindowWrapper'
import Pages from '@/constants/pages'
import CollectionInfo from '@/pages/Explorer/Collection'
import Collections from '@/pages/Explorer/Collections'
import { EXPLORER_PAGE_SECTION } from '@/pages/Explorer/constants'
import NFTDetail from '@/pages/Explorer/NFT'
import type { Collection } from '@/pages/Explorer/types/collection'
import { useAppDispatch } from '@/store/hooks'
import { closeWindow, minimizeWindow } from '@/store/windows/actions'
import type { PageKey } from '@/store/windows/reducer'
import { TokenMetadata } from '@/store/collections/reducer'

const page = Pages.explorer
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

export type NFT = {
  metadata: TokenMetadata
  tokenId: string
  collection: Collection
}

export default function ExplorerPage() {
  // Window mgmt
  const dispatch = useAppDispatch()
  const close = () => dispatch(closeWindow({ value: pageId }))
  const minimize = () => dispatch(minimizeWindow({ value: pageId }))

  const { isConnected } = useAccount()

  const [errorMessage, setErrorMessage] = useState<string>('')
  const [errorName, setErrorName] = useState<string>('MiyaLaunchpad Error')
  const [pageSection, setPageSection] = useState<string>(EXPLORER_PAGE_SECTION.COLLECTIONS_SECTION)
  const [selectedCollection, setSelectedCollection] = useState<Collection>({
    name: '',
    metadataUri: '',
    address: '',
    createdAt: '',
    symbol: '',
    totalSupply: 0,
  })
  const [selectedToken, setSelectedToken] = useState<NFT>({
    metadata: {
      name: '',
      description: '',
      image: '',
      external_url: '',
      attributes: [],
    },
    tokenId: '',
    collection: {
      name: '',
      metadataUri: '',
      address: '',
      createdAt: '',
      symbol: '',
      totalSupply: 0,
    },
  })

  const handleCloseErrorPopup = () => {
    setErrorName('MiyaLaunchpad Error')
    setErrorMessage('')
  }

  const renderSection = () => {
    switch (pageSection) {
      case EXPLORER_PAGE_SECTION.COLLECTIONS_SECTION:
        return (
          <Collections
            isConnected={isConnected}
            setPageSection={setPageSection}
            closeWindow={close}
            setSelectedCollection={setSelectedCollection}
          />
        )
      case EXPLORER_PAGE_SECTION.COLLECTION_SECTION:
        return (
          <CollectionInfo
            setErrorMessage={setErrorMessage}
            setErrorName={setErrorName}
            isConnected={isConnected}
            setPageSection={setPageSection}
            selectedCollection={selectedCollection}
          />
        )
      case EXPLORER_PAGE_SECTION.NFT_SECTION:
        return <NFTDetail selectedToken={selectedToken} setPageSection={setPageSection} />
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
        <Container>
          {renderSection()}
          {errorMessage && (
            <ErrorWrapper>
              <ErrorWindow errorLabel={errorName} handleClose={handleCloseErrorPopup}>
                <ErrorContent>
                  <ErrorMessage>
                    <img src={WarningIcon} alt="Error icon" />
                    <div>{errorMessage}</div>
                  </ErrorMessage>
                  <ErrorButtonWrapper>
                    <NormalButton style={{ width: '30%' }} onClick={handleCloseErrorPopup}>
                      OK
                    </NormalButton>
                  </ErrorButtonWrapper>
                </ErrorContent>
              </ErrorWindow>
            </ErrorWrapper>
          )}
        </Container>
      </Background>
    </WindowWrapper>
  )
}
