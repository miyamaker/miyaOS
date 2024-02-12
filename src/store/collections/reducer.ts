import { createReducer } from '@reduxjs/toolkit'
import type { Address } from 'viem'
import { mainnet } from 'wagmi'

import { DEFAULT_NFT_CONTRACT } from '@/constants/contracts'
import { setCurrentNFT, setCurrentToken, setNFTsList } from '@/store/collections/actions'

export type Attribute = {
  trait_type: string
  value: string
}

export type TokenMetadata = {
  name: string
  description: string
  image: string
  external_url: string
  attributes: Attribute[]
}

export type ContractMetadata = {
  name: string
  description: string
  image: string
  external_link: string
  collaborators: Address[]
}

export interface CollectionsState {
  nfts: Address[]
  currentNFTContract: Address
  currentNFT: ContractMetadata
  currentTokenId: number
  currentToken: TokenMetadata
}

export const initialState: CollectionsState = {
  nfts: [],
  currentNFTContract: DEFAULT_NFT_CONTRACT[mainnet.id] as Address,
  currentNFT: { name: '', description: '', image: '', external_link: '', collaborators: [] },
  currentTokenId: 1,
  currentToken: { name: '', description: '', image: '', external_url: '', attributes: [] },
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(setNFTsList, (state, action) => {
      state.nfts = action.payload.nfts
    })
    .addCase(setCurrentNFT, (state, action) => {
      state.currentNFTContract = action.payload.nft
      state.currentNFT = action.payload.metadata as ContractMetadata
    })
    .addCase(setCurrentToken, (state, action) => {
      state.currentTokenId = action.payload.tokenId
      state.currentToken = action.payload.metadata as TokenMetadata
    })
)
