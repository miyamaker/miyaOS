import { createAction } from '@reduxjs/toolkit'
import type { Address } from 'viem'

import type { ContractMetadata, TokenMetadata } from '@/store/collections/reducer'

export const setNFTsList = createAction<{ nfts: Address[] }>('collection/setNFTsList')
export const setCurrentNFT = createAction<{ nft: Address; metadata: ContractMetadata }>(
  'collection/setCurrentNFTContract'
)
export const setCurrentToken = createAction<{ tokenId: number; metadata: TokenMetadata }>('collection/setCurrentToken')
