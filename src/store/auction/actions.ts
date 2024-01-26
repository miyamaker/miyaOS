import { createAction } from '@reduxjs/toolkit'

import type { Auction } from '@/store/auction/reducer'

export const getCurrentNFT = createAction<{ id: string }>('auction/getCurrentNFT')
export const updateAuctionsList = createAction<{ auctions: Auction[] }>('auction/updateAuctionsList')
