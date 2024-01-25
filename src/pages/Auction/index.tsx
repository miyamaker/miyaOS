import WarningIcon from 'assets/icon/warning.png'
import Hoodies from 'assets/products/kool-skull/hoodies.png'
import { useState } from 'react'
import styled from 'styled-components/macro'

import ErrorWindow from '@/components/ErrorWindow'
import ExplorerWrapper from '@/components/ExplorerWrapper'
import ProductDetail from '@/components/ProductDetail'
import { Button } from '@/components/ProductDetail/ImagesList'
import ProductList from '@/components/ProductList'
import TitleBar from '@/components/TitleBar'
import WindowWrapper from '@/components/WindowWrapper'
import Pages from '@/constants/pages'
import { useAppDispatch } from '@/store/hooks'
import { closeWindow, minimizeWindow } from '@/store/windows/actions'
import { useFullscreen } from '@/store/windows/hooks'
import type { PageKey } from '@/store/windows/reducer'

const page = Pages.auction
const pageId = page?.id as PageKey

const ErrorWrapper = styled.div`
  width: 50%;
  height: 26%;
  position: absolute;
  top: 37%;
  left: 25%;
`

const ErrorContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ErrorMessage = styled.div`
  height: calc(200% / 3);
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.5rem;

  > img {
    width: 3rem;
    height: 3rem;
    border: none;
    margin: 0;
  }

  > div {
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    overflow: scroll;
  }

  > * + * {
    margin-left: 1rem;
  }
`

const ErrorButton = styled.div`
  height: calc(100% / 3);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const product = {
  id: 3,
  product: 'Miya Hoodie',
  description: 'a standard piece of clothing with no special features, just like any other hoodie you might find',
  artist: 'KoolSkull',
  currentBid: 0.05,
  currency: 'ETH',
  images: [Hoodies, Hoodies],
}

const products = [product, product, product, product, product, product, product]

export default function AuctionPage() {
  // Window mgmt
  const [fullscreen, toggleFullscreen] = useFullscreen(pageId)
  const dispatch = useAppDispatch()
  const close = () => dispatch(closeWindow({ value: pageId }))
  const minimize = () => dispatch(minimizeWindow({ value: pageId }))

  const [errorMessage, setErrorMessage] = useState('')
  const [errorName, setErrorName] = useState('MiyaAuction Error')

  const handleCloseErrorPopup = () => {
    setErrorName('MiyaAuction Error')
    setErrorMessage('')
  }

  return (
    <WindowWrapper>
      <TitleBar
        closeBtn
        onClose={(e) => {
          if (e.cancelable) e.stopPropagation()
          close()
        }}
        fullscreen={fullscreen}
        fullscreenBtn
        onFullscreen={() => toggleFullscreen()}
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
        <ExplorerWrapper style={{ height: '60%' }} title={'Miya Hoodie'}>
          <ProductDetail product={product} setErrorMessage={setErrorMessage} setErrorName={setErrorName} />
        </ExplorerWrapper>
        <ExplorerWrapper style={{ height: '40%' }} title={'Active lots'}>
          <ProductList products={products} />
        </ExplorerWrapper>
        {errorMessage && (
          <ErrorWrapper>
            <ErrorWindow errorLabel={errorName} handleClose={handleCloseErrorPopup}>
              <ErrorContent>
                <ErrorMessage>
                  <img src={WarningIcon} alt="Error icon" />
                  <div>{errorMessage}</div>
                </ErrorMessage>
                <ErrorButton>
                  <Button style={{ width: '30%' }} onClick={handleCloseErrorPopup}>
                    OK
                  </Button>
                </ErrorButton>
              </ErrorContent>
            </ErrorWindow>
          </ErrorWrapper>
        )}
      </div>
    </WindowWrapper>
  )
}
