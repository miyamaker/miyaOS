import type { Address } from 'viem'
import { goerli, mainnet } from 'viem/chains'

interface ContractAddresses {
  [key: number]: Address | ''
}

export const FACTORY_CONTRACT: ContractAddresses = {
  [mainnet.id]: '0x37d2127ed8fc713cbb30c8dd2f6ef6d329e43420',
  [goerli.id]: '0x20422d2216c99306bba8a28309bf2abe9f9f2b27',
}

export const PARENTS = {
  [mainnet.id]: {
    milady_maker: '0x5af0d9827e0c53e4799bb226655a1de152a425a5',
  },
  [goerli.id]: {
    test_parent: '0xd5f9b858275c4573bd35d51efd6745472a2d07f7',
  },
}

export const DEFAULT_PARENT: ContractAddresses = {
  [mainnet.id]: PARENTS[mainnet.id].milady_maker as Address,
  [goerli.id]: PARENTS[goerli.id].test_parent as Address,
}

interface VaultIds {
  [key: number]: string
}

export const DEFAULT_VAULT: VaultIds = {
  [mainnet.id]: '392',
  [goerli.id]: '73',
}
