import WarningIcon from 'assets/icon/warning.png'
import { useState } from 'react'

import { NormalButton } from '@/components/Button/NormalButton'
import { ErrorButtonWrapper, ErrorContent, ErrorMessage, ErrorWindow, ErrorWrapper } from '@/components/Errors'
import TitleBar from '@/components/TitleBar'
import WindowWrapper from '@/components/WindowWrapper'
import Pages from '@/constants/pages'
import Collection from '@/pages/Explorer/Collection'
import { EXPLORER_PAGE_SECTION } from '@/pages/Explorer/constants'
import { useAppDispatch } from '@/store/hooks'
import { closeWindow, minimizeWindow } from '@/store/windows/actions'
import type { PageKey } from '@/store/windows/reducer'

const page = Pages.explorer
const pageId = page?.id as PageKey

export default function ExplorerPage() {
  // Window mgmt
  const dispatch = useAppDispatch()
  const close = () => dispatch(closeWindow({ value: pageId }))
  const minimize = () => dispatch(minimizeWindow({ value: pageId }))

  const [errorMessage, setErrorMessage] = useState('')
  const [errorName, setErrorName] = useState('MiyaExplorer Error')
  const [pageSection, setPageSection] = useState(EXPLORER_PAGE_SECTION.COLLECTION_SECTION)

  const handleCloseErrorPopup = () => {
    setErrorName('MiyaExplorer Error')
    setErrorMessage('')
  }

  const renderSection = () => {
    switch (pageSection) {
      case EXPLORER_PAGE_SECTION.COLLECTIONS_SECTION:
        return (
          <div>
            <h1>Collections section</h1>
            <button onClick={() => setPageSection(EXPLORER_PAGE_SECTION.COLLECTION_SECTION)}>Collection detail</button>
            <button onClick={() => setPageSection(EXPLORER_PAGE_SECTION.NFT_SECTION)}>NFT detail</button>
          </div>
        )
      case EXPLORER_PAGE_SECTION.COLLECTION_SECTION:
        return <Collection />
      case EXPLORER_PAGE_SECTION.NFT_SECTION:
        return (
          <div>
            <h1>NFT section</h1>
            <button onClick={() => setPageSection(EXPLORER_PAGE_SECTION.COLLECTIONS_SECTION)}>
              Collections section
            </button>
            <button onClick={() => setPageSection(EXPLORER_PAGE_SECTION.COLLECTION_SECTION)}>Collection detail</button>
          </div>
        )
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
