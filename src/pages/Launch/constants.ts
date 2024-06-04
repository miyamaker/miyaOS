import { mainnet } from 'wagmi'

import { DEFAULT_PARENT, DEFAULT_VAULT, FACTORY_CONTRACT } from '@/constants/contracts'

export const BASE_FORM = [
  'name', // Name
  'SYMBOL', // Symbol
  '', // baseURI
  '', // contractURI
  1n, // maxSupply
  0n, // royalty
  500n, // allocation
  FACTORY_CONTRACT[mainnet.id], // owner
  DEFAULT_PARENT[mainnet.id], // alignedNft
  0n, // price
  0n, // vaultId
]

export const DEFAULT_FORM = {
  standard: {
    name: '',
    description: '',
    image: '',
    externalLink: '',
    symbol: '',
    baseURI: '',
    maxSupply: '',
    royalty: '',
    allocation: '5',
    owner: '',
    alignedNft: '',
    tokenPrice: '',
    vaultId: '0',
  },
  advanced: {
    name: '',
    description: '',
    image: '',
    externalLink: '',
    symbol: '',
    baseURI: '',
    maxSupply: '',
    royalty: '',
    allocation: '5',
    owner: '',
    alignedNft: '',
    tokenPrice: '',
    vaultId: '',
  },
  milady: {
    name: '',
    description: '',
    image: '',
    externalLink: '',
    symbol: '',
    baseURI: '',
    maxSupply: '',
    royalty: '',
    allocation: '5',
    owner: '',
    alignedNft: DEFAULT_PARENT[mainnet.id],
    tokenPrice: '',
    vaultId: DEFAULT_VAULT[mainnet.id],
  },
}

export const abi = [
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_symbol',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_baseURI',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_contractURI',
        type: 'string',
      },
      {
        internalType: 'uint40',
        name: '_maxSupply',
        type: 'uint40',
      },
      {
        internalType: 'uint16',
        name: '_royalty',
        type: 'uint16',
      },
      {
        internalType: 'uint16',
        name: '_allocation',
        type: 'uint16',
      },
      {
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_alignedNft',
        type: 'address',
      },
      {
        internalType: 'uint80',
        name: '_price',
        type: 'uint80',
      },
      {
        internalType: 'uint256',
        name: '_vaultId',
        type: 'uint256',
      },
    ],
    name: 'deploy',
    outputs: [
      {
        internalType: 'address',
        name: 'deployment',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { inputs: [], name: 'Invalid', type: 'error' },
  { inputs: [], name: 'NewOwnerIsZeroAddress', type: 'error' },
  { inputs: [], name: 'NoHandoverRequest', type: 'error' },
  { inputs: [], name: 'TransferFailed', type: 'error' },
  { inputs: [], name: 'Unauthorized', type: 'error' },
  { inputs: [], name: 'AccountBalanceOverflow', type: 'error' },
  { inputs: [], name: 'AlreadyLocked', type: 'error' },
  { inputs: [], name: 'ArrayLengthMismatch', type: 'error' },
  { inputs: [], name: 'BalanceQueryForZeroAddress', type: 'error' },
  { inputs: [], name: 'Blacklisted', type: 'error' },
  {
    inputs: [
      { internalType: 'uint256', name: 'numerator', type: 'uint256' },
      { internalType: 'uint256', name: 'denominator', type: 'uint256' },
    ],
    name: 'ERC2981InvalidDefaultRoyalty',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'address', name: 'receiver', type: 'address' }],
    name: 'ERC2981InvalidDefaultRoyaltyReceiver',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'uint256', name: 'numerator', type: 'uint256' },
      { internalType: 'uint256', name: 'denominator', type: 'uint256' },
    ],
    name: 'ERC2981InvalidTokenRoyalty',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'address', name: 'receiver', type: 'address' },
    ],
    name: 'ERC2981InvalidTokenRoyaltyReceiver',
    type: 'error',
  },
  { inputs: [], name: 'InsufficientPayment', type: 'error' },
  { inputs: [], name: 'Invalid', type: 'error' },
  { inputs: [], name: 'InvalidInitialization', type: 'error' },
  { inputs: [], name: 'LockerStillApproved', type: 'error' },
  { inputs: [], name: 'MintCap', type: 'error' },
  { inputs: [], name: 'MintClosed', type: 'error' },
  { inputs: [], name: 'NewOwnerIsZeroAddress', type: 'error' },
  { inputs: [], name: 'NoHandoverRequest', type: 'error' },
  { inputs: [], name: 'NotAligned', type: 'error' },
  { inputs: [], name: 'NotApprovedLocker', type: 'error' },
  { inputs: [], name: 'NotInitializing', type: 'error' },
  { inputs: [], name: 'NotMinted', type: 'error' },
  { inputs: [], name: 'NotOwnerNorApproved', type: 'error' },
  { inputs: [], name: 'Overdraft', type: 'error' },
  { inputs: [], name: 'ReentrancyGuardReentrantCall', type: 'error' },
  { inputs: [], name: 'RoyaltiesDisabled', type: 'error' },
  { inputs: [], name: 'TokenAlreadyExists', type: 'error' },
  { inputs: [], name: 'TokenDoesNotExist', type: 'error' },
  { inputs: [], name: 'TokenLock', type: 'error' },
  { inputs: [], name: 'TokenNotLocked', type: 'error' },
  { inputs: [], name: 'TransferFailed', type: 'error' },
  { inputs: [], name: 'TransferFromIncorrectOwner', type: 'error' },
  { inputs: [], name: 'TransferToNonERC721ReceiverImplementer', type: 'error' },
  { inputs: [], name: 'TransferToZeroAddress', type: 'error' },
  { inputs: [], name: 'URILocked', type: 'error' },
  { inputs: [], name: 'Unauthorized', type: 'error' },
]
