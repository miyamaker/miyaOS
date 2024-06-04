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
import CollectionInfo from '@/pages/Mint/Collection'
import Collections from '@/pages/Mint/Collections'
import { EXPLORER_PAGE_SECTION } from '@/pages/Mint/constants'
import NFTDetail from '@/pages/Mint/NFT'
import type { Collection } from '@/pages/Mint/types/collection'
import type { TokenMetadata } from '@/store/collections/reducer'
import { useAppDispatch } from '@/store/hooks'
import { closeWindow, minimizeWindow } from '@/store/windows/actions'
import type { PageKey } from '@/store/windows/reducer'

const page = Pages.mint
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

export default function MintPage() {
  // Window mgmt
  const dispatch = useAppDispatch()
  const close = () => dispatch(closeWindow({ value: pageId }))
  const minimize = () => dispatch(minimizeWindow({ value: pageId }))

  const { isConnected } = useAccount()

  const [errorMessage, setErrorMessage] = useState<string>('')
  const [errorName, setErrorName] = useState<string>('Mint Error')
  const [pageSection, setPageSection] = useState<string>(EXPLORER_PAGE_SECTION.COLLECTIONS_SECTION)
  const [selectedCollection, setSelectedCollection] = useState<Collection>({
    name: '',
    metadataUri: '',
    address: '',
    createdAt: '',
    symbol: '',
    totalSupply: 0,
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

  const handleCloseErrorPopup = () => {
    setErrorName('Mint Error')
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
            setSelectedToken={setSelectedToken}
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
