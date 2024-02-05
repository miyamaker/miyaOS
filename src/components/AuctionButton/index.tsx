import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { MouseEventHandler } from 'react'

import { Button } from '@/components/ProductDetail/ImagesList'

import { HighlightButton } from '../Button'

export default function AuctionButton({
  handleBid,
  isConnected,
  transacting,
}: {
  handleBid: MouseEventHandler
  isConnected: boolean
  transacting: boolean
}) {
  if (isConnected) {
    return (
      <Button disabled={transacting} onClick={handleBid} style={{ padding: '0.7rem', fontSize: '0.65rem' }}>
        {transacting ? 'Transacting...' : `Place bid`}
      </Button>
    )
  }

  return (
    <>
      <ConnectButton.Custom>
        {({ account, chain, openChainModal, openConnectModal, mounted }) => {
          const ready = mounted
          const connected = ready && account && chain
          return (
            <div
              {...(!ready
                ? {
                    'aria-hidden': true,
                    style: {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  }
                : { style: { height: '100%' } })}
            >
              {connected && !chain?.unsupported && <></>}
              {(() => {
                if (!connected) {
                  return (
                    <HighlightButton
                      onClick={openConnectModal}
                      className="free-height free-width"
                      style={{ height: '100%', padding: '0.7rem', fontSize: '0.65rem' }}
                    >
                      <span style={{ marginTop: -1 }}>Connect wallet</span>
                    </HighlightButton>
                  )
                }

                if (chain.unsupported) {
                  return (
                    <HighlightButton
                      onClick={openChainModal}
                      className="free-height free-width"
                      style={{ height: '100%', padding: '0.7rem', fontSize: '0.65rem' }}
                    >
                      <span style={{ marginTop: -1 }}>Wrong network</span>
                    </HighlightButton>
                  )
                }

                return (
                  <div style={{ height: '100%' }}>
                    <HighlightButton
                      className="free-height free-width"
                      style={{ height: '100%', padding: '0.7rem', fontSize: '0.65rem' }}
                    >
                      <span style={{ marginTop: -1 }}>Connect wallet</span>
                    </HighlightButton>
                  </div>
                )
              })()}
            </div>
          )
        }}
      </ConnectButton.Custom>
    </>
  )
}
