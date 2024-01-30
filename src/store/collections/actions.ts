import { createAction } from '@reduxjs/toolkit'
import type { Address } from 'viem'

export const setNFTsList = createAction<{ nfts: Address[] }>('collection/setNFTsList')
