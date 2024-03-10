import WarningIcon from 'assets/icon/warning.png'
import { useEffect, useState } from 'react'
import { useWindowSize } from 'usehooks-ts'
import type { Address } from 'viem'
import { mainnet, useNetwork } from 'wagmi'

import { NormalButton } from '@/components/Button/NormalButton'
import { ErrorButtonWrapper, ErrorContent, ErrorMessage, ErrorWindow, ErrorWrapper } from '@/components/Errors'
import TitleBar from '@/components/TitleBar'
import WindowWrapper from '@/components/WindowWrapper'
import { AUCTION_CONTRACT } from '@/constants/contracts'
import Pages from '@/constants/pages'
import { useAccount } from '@/context/AccountProvider'
import CollectionsList from '@/pages/Auction/CollectionsList'
import { AUCTION_PAGE_SECTION, ERROR_MESSAGES } from '@/pages/Auction/constants'
import ExplorerWrapper from '@/pages/Auction/ExplorerWrapper'
import ProductDetail from '@/pages/Auction/ProductDetail'
import ProductsList from '@/pages/Auction/ProductsList'
import { useNFTsList } from '@/pages/Auction/useNFTsList'
import { setNFTsList } from '@/store/collections/actions'
import { useAppDispatch } from '@/store/hooks'
import { closeWindow, minimizeWindow } from '@/store/windows/actions'
import type { PageKey } from '@/store/windows/reducer'

const page = Pages.auction
const pageId = page?.id as PageKey

export default function AuctionPage() {
  // Window mgmt
  const { width } = useWindowSize()
  const dispatch = useAppDispatch()
  const close = () => dispatch(closeWindow({ value: pageId }))
  const minimize = () => dispatch(minimizeWindow({ value: pageId }))

  const { balance } = useAccount()

  const [errorMessage, setErrorMessage] = useState('')
  const [errorName, setErrorName] = useState('MiyaAuction Error')
  const [pageSection, setPageSection] = useState(AUCTION_PAGE_SECTION.COLLECTIONS_SECTION)

  // Network
  const { chain } = useNetwork()
  const auctionContract = AUCTION_CONTRACT[chain?.id || mainnet.id] || AUCTION_CONTRACT[mainnet.id]!

  // Get contract data
  const { nftsList } = useNFTsList({
    address: auctionContract as Address,
  })

  const handleCloseErrorPopup = () => {
    setErrorName('MiyaAuction Error')
    setErrorMessage('')

    if (errorMessage === ERROR_MESSAGES.AUCTION_ENDED) {
      setPageSection(AUCTION_PAGE_SECTION.COLLECTIONS_SECTION)
    }
  }

  const renderSection = () => {
    switch (pageSection) {
      case AUCTION_PAGE_SECTION.COLLECTIONS_SECTION:
        return (
          <ExplorerWrapper style={{ height: '100%' }} title={'Collections'}>
            <CollectionsList nfts={nftsList} setPageSection={setPageSection} />
          </ExplorerWrapper>
        )
      case AUCTION_PAGE_SECTION.PRODUCT_SECTION:
        return (
          <>
            <ExplorerWrapper
              style={{ height: width > 640 ? '60%' : '70%' }}
              title={'Collections > Detail'}
              setPageSection={setPageSection}
            >
              <ProductDetail
                balance={balance}
                setErrorMessage={setErrorMessage}
                setErrorName={setErrorName}
                auctionContract={auctionContract as Address}
              />
            </ExplorerWrapper>
            <ExplorerWrapper style={{ height: width > 640 ? '40%' : '30%' }} title={'Active lots'}>
              <ProductsList auctionContract={auctionContract as Address} />
            </ExplorerWrapper>
          </>
        )
      default:
        return <></>
    }
  }

  useEffect(() => {
    dispatch(setNFTsList({ nfts: nftsList as Address[] }))
  }, [dispatch, nftsList])

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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0.5rem',
          gap: '1rem',
          height: 'calc(100% - 1.5rem)',
        }}
      >
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
      </div>
    </WindowWrapper>
  )
}
