// import { useAccount } from 'wagmi'

import Hoodies from 'assets/products/kool-skull/hoodies.png'

import ExplorerWrapper from '@/components/ExplorerWrapper'
import ProductDetail from '@/components/ProductDetail'
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

const product = {
  product: 'Miya Hoodie',
  description: 'a standard piece of clothing with no special features, just like any other hoodie you might find',
  artist: 'KoolSkull',
  currentBid: 0.05,
  currency: 'ETH',
  images: [Hoodies, Hoodies],
}

const products = [product, product, product, product, product, product, product]

export default function AuctionPage() {
  // Account
  // const { isConnected, address } = useAccount()

  // Window mgmt
  const [fullscreen, toggleFullscreen] = useFullscreen(pageId)
  const dispatch = useAppDispatch()
  const close = () => dispatch(closeWindow({ value: pageId }))
  const minimize = () => dispatch(minimizeWindow({ value: pageId }))
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
          <ProductDetail product={product} />
        </ExplorerWrapper>
        <ExplorerWrapper style={{ height: '40%' }} title={'Active lots'}>
          <ProductList products={products} />
        </ExplorerWrapper>
      </div>
    </WindowWrapper>
  )
}
