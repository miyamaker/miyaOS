import { createAction } from '@reduxjs/toolkit'

import type { Product } from '@/store/auction/reducer'

export const getCurrentNFT = createAction<{ id: string }>('auction/getCurrentNFT')
export const updateAuctionsList = createAction<{ auctions: Product[] }>('auction/updateAuctionsList')
