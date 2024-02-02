import { ConnectButton } from '@rainbow-me/rainbowkit'

import { HighlightButton } from '../Button'

export default function StartButton() {
  // const { disconnect } = useDisconnect();

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
                const buttonStyle = {
                  height: '100%',
                  paddingLeft: 6,
                  paddingRight: 10,
                  width: '100%', // Set the width to 100% for a wider button
                }

                if (!connected) {
                  return (
                    <HighlightButton onClick={openConnectModal} className="free-height free-width" style={buttonStyle}>
                      <span style={{ marginTop: -1 }}>🖤 Start</span>
                    </HighlightButton>
                  )
                }

                if (chain.unsupported) {
                  return (
                    <HighlightButton onClick={openChainModal} className="free-height free-width" style={buttonStyle}>
                      <span style={{ marginTop: -1 }}>Wrong network</span>
                    </HighlightButton>
                  )
                }

                return (
                  <div style={{ height: '100%' }}>
                    <HighlightButton className="free-height free-width" style={buttonStyle}>
                      <span style={{ marginTop: -1 }}>🖤 Start</span>
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
