import type { FetchBalanceResult, GetAccountResult } from '@wagmi/core'
import { createContext, type ReactNode, useContext, useState } from 'react'
import type { PublicClient } from 'wagmi'
import { useAccount as useWagmiAccount, useBalance, useBlockNumber, useWatchPendingTransactions } from 'wagmi'

type AccountContextType = {
  block: string
  account: GetAccountResult<PublicClient> | undefined
  balance: FetchBalanceResult | undefined
  pendingTransactions: string[]
}

const AccountContext = createContext<AccountContextType>({
  block: '',
  account: undefined,
  balance: undefined,
  pendingTransactions: [],
})

export const useAccount = () => useContext(AccountContext)

export default function AccountProvider({ children }: { children: ReactNode }) {
  const [pendingTransactions, setPendingTransactions] = useState<string[]>([])

  const block = useBlockNumber({ cacheTime: 10_000, watch: true })
  const account = useWagmiAccount()
  const balance = useBalance({
    address: account.address,
    cacheTime: 10_000,
    watch: true,
    scopeKey: 'eth_balance',
    enabled: !!account.address,
  })

  useWatchPendingTransactions({ listener: (hashes) => setPendingTransactions(hashes), enabled: !!account.address })

  return (
    <AccountContext.Provider
      value={{ block: block.data?.toString() || '', account, balance: balance.data, pendingTransactions }}
    >
      {children}
    </AccountContext.Provider>
  )
}
