import { createAction } from '@reduxjs/toolkit'

export const getCurrentNFT = createAction<{ id: string }>('auction/getCurrentNFT')
