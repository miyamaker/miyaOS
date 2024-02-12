import Coat from 'assets/products/kool-skull/coat.png'
import Hoodies from 'assets/products/kool-skull/hoodies.png'
import TShirt from 'assets/products/kool-skull/t-shirt.png'

export const abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'ActiveAuction',
    type: 'error',
  },
  {
    inputs: [],
    name: 'AlreadyInitialized',
    type: 'error',
  },
  {
    inputs: [],
    name: 'EndedAuction',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InactiveAuction',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InsufficientBid',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidAuction',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidTimestamp',
    type: 'error',
  },
  {
    inputs: [],
    name: 'LockedAuction',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NewOwnerIsZeroAddress',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NoHandoverRequest',
    type: 'error',
  },
  {
    inputs: [],
    name: 'SettledAuction',
    type: 'error',
  },
  {
    inputs: [],
    name: 'Unauthorized',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'AuctionBidIncrementUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'nft',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint40',
        name: 'startTime',
        type: 'uint40',
      },
      {
        indexed: false,
        internalType: 'uint40',
        name: 'endTime',
        type: 'uint40',
      },
    ],
    name: 'AuctionCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'nft',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'AuctionDeleted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'AuctionDurationUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'nft',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'winner',
        type: 'address',
      },
    ],
    name: 'AuctionSettled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'nft',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'BidPlaced',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'LockAuction',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'pendingOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipHandoverCanceled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'pendingOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipHandoverRequested',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'oldOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [],
    name: 'auctionDuration',
    outputs: [
      {
        internalType: 'uint40',
        name: '',
        type: 'uint40',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'auctionFunds',
    outputs: [
      {
        internalType: 'uint96',
        name: '',
        type: 'uint96',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'auctioncore',
    outputs: [
      {
        internalType: 'contract MiyaAuctionNFT',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'bidIncrement',
    outputs: [
      {
        internalType: 'uint96',
        name: '',
        type: 'uint96',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'cancelOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'pendingOwner',
        type: 'address',
      },
    ],
    name: 'completeOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'onERC721Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: 'result',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'pendingOwner',
        type: 'address',
      },
    ],
    name: 'ownershipHandoverExpiresAt',
    outputs: [
      {
        internalType: 'uint256',
        name: 'result',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'requestOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_nft',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'getAuction',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'bidder',
            type: 'address',
          },
          {
            internalType: 'uint96',
            name: 'amount',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'minPrice',
            type: 'uint96',
          },
          {
            internalType: 'uint40',
            name: 'startTime',
            type: 'uint40',
          },
          {
            internalType: 'uint40',
            name: 'endTime',
            type: 'uint40',
          },
          {
            internalType: 'bool',
            name: 'settled',
            type: 'bool',
          },
        ],
        internalType: 'struct MiyaAuction.AuctionData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_nft',
        type: 'address',
      },
    ],
    name: 'getActiveAuctionsList',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'bidder',
            type: 'address',
          },
          {
            internalType: 'uint96',
            name: 'amount',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'minPrice',
            type: 'uint96',
          },
          {
            internalType: 'uint40',
            name: 'startTime',
            type: 'uint40',
          },
          {
            internalType: 'uint40',
            name: 'endTime',
            type: 'uint40',
          },
          {
            internalType: 'bool',
            name: 'settled',
            type: 'bool',
          },
        ],
        internalType: 'struct MiyaAuction.AuctionData[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_nft',
        type: 'address',
      },
    ],
    name: 'getSettledAuctionsList',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'bidder',
            type: 'address',
          },
          {
            internalType: 'uint96',
            name: 'amount',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'minPrice',
            type: 'uint96',
          },
          {
            internalType: 'uint40',
            name: 'startTime',
            type: 'uint40',
          },
          {
            internalType: 'uint40',
            name: 'endTime',
            type: 'uint40',
          },
          {
            internalType: 'bool',
            name: 'settled',
            type: 'bool',
          },
        ],
        internalType: 'struct MiyaAuction.AuctionData[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getNfts',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_nft',
        type: 'address',
      },
    ],
    name: 'getActiveTokenIds',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_nft',
        type: 'address',
      },
    ],
    name: 'getSettledTokenIds',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_nft',
        type: 'address',
      },
    ],
    name: 'getAllTokenIds',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_nft',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint96',
        name: '_minPrice',
        type: 'uint96',
      },
      {
        internalType: 'uint40',
        name: '_startTime',
        type: 'uint40',
      },
    ],
    name: 'createAuction',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_nft',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'deleteAuction',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_nft',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'placeBid',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'settleAllAuctions',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_nft',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'settleOneAuction',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
    ],
    name: 'withdrawETH',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint96',
        name: '_bidIncrement',
        type: 'uint96',
      },
    ],
    name: 'setBidIncrement',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: '_duration',
        type: 'uint32',
      },
    ],
    name: 'setDuration',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lockAuction',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'baseUri_',
        type: 'string',
      },
    ],
    name: 'updateAuctioncoreUri',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const product = {
  id: 3,
  name: 'Miya Hoodie',
  product: 'Hoodie',
  description: 'a standard piece of clothing with no special features, just like any other hoodie you might find',
  artist: 'KoolSkull',
  currentBid: 0.05,
  currency: 'ETH',
  images: [Hoodies, Hoodies],
}

export const products = [
  {
    id: 4,
    name: 'Miya Coat',
    product: 'Coat',
    description: 'a standard piece of clothing with no special features, just like any other coat you might find',
    artist: 'KoolSkull',
    currentBid: 0.0,
    currency: 'ETH',
    images: [Coat, Coat],
  },
  {
    id: 5,
    name: 'Miya T-Shirt',
    product: 'T-Shirt',
    description: 'a standard piece of clothing with no special features, just like any other t-shirt you might find',
    artist: 'KoolSkull',
    currentBid: 0.0,
    currency: 'ETH',
    images: [TShirt, TShirt],
  },
]

export const ADDRESS0 = '0x0000000000000000000000000000000000000000'

export const AUCTION_PAGE_SECTION = {
  COLLECTIONS_SECTION: 'Collections',
  PRODUCT_SECTION: 'Detail',
}

export const ERROR_MESSAGES = {
  AUCTION_ENDED: 'This auction has ended.',
}
