import { createAction } from '@reduxjs/toolkit'
import type { Address } from 'viem'

import type { ContractMetadata, Product } from '@/store/auction/reducer'

export const getCurrentNFT = createAction<{ id: number }>('auction/getCurrentNFT')
export const updateAuctionsList = createAction<{ auctions: Product[] }>('auction/updateAuctionsList')
export const setCurrentNFT = createAction<{ nft: Address; metadata: ContractMetadata }>('auction/setCurrentNFTContract')
export const setCurrentTokenIdsList = createAction<{ tokenIds: number[] }>('auction/setCurrentTokenIdsList')
