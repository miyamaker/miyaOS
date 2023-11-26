import '@rainbow-me/rainbowkit/styles.css'

import type { Theme } from '@rainbow-me/rainbowkit'
import { connectorsForWallets, lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import {
  coinbaseWallet,
  injectedWallet,
  metaMaskWallet,
  rabbyWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'
import merge from 'lodash.merge'
import { Provider } from 'react-redux'
import { goerli } from 'viem/chains'
import { configureChains, createConfig, mainnet, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

import AccountProvider from './context/AccountProvider'
import Router from './Router'
import store from './store'
import ThemeProvider, { ThemedGlobalStyle } from './theme'

const { chains, publicClient } = configureChains([mainnet, goerli], [publicProvider()], {
  pollingInterval: 10_000,
  stallTimeout: 5000,
})

const readTheme = merge(lightTheme(), {
  colors: {
    modalBackground: '#a9a3c9',
    accentColor: '#d97ada',
    selectedOptionBorder: '#000',
  },
  fonts: {
    body: 'inherit',
  },
  radii: {
    actionButton: '0',
    connectButton: '0',
    menuButton: '0',
    modal: '0',
    modalMobile: '0',
  },
  shadows: {
    connectButton: '0',
    dialog: '0',
    profileDetailsAction: '0',
    selectedOption: '0',
    selectedWallet: '0',
    walletLogo: '0',
  },
} as Theme)

const walletConfig = {
  appName: 'miya.wtf',
  projectId: import.meta.env.PROD ? import.meta.env.VITE_WC_KEY_PROD : import.meta.env.VITE_WC_KEY_DEV,
  chains,
}

const recommendedConnectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet(walletConfig),
      rabbyWallet(walletConfig),
      coinbaseWallet(walletConfig),
      injectedWallet(walletConfig),
    ],
  },
  {
    groupName: 'Other wallets',
    wallets: [rainbowWallet(walletConfig), walletConnectWallet(walletConfig)],
  },
])
const wagmiClient = createConfig({
  autoConnect: true,
  connectors: recommendedConnectors,
  publicClient,
})

export default function App() {
  return (
    <>
      <Provider store={store}>
        <WagmiConfig config={wagmiClient}>
          <AccountProvider>
            <RainbowKitProvider chains={chains} theme={readTheme}>
              <ThemeProvider>
                <ThemedGlobalStyle />
                <Router />
              </ThemeProvider>
            </RainbowKitProvider>
          </AccountProvider>
        </WagmiConfig>
      </Provider>
    </>
  )
}
