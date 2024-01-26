import Coat from 'assets/products/kool-skull/coat.png'
import Hoodies from 'assets/products/kool-skull/hoodies.png'
import TShirt from 'assets/products/kool-skull/t-shirt.png'

export const abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_miyaTees',
        type: 'address',
      },
      {
        internalType: 'uint96',
        name: 'reservePrice',
        type: 'uint96',
      },
      {
        internalType: 'uint8',
        name: 'reservePercentage',
        type: 'uint8',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'NotOwner',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ZeroAddress',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
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
        indexed: false,
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
        indexed: false,
        internalType: 'uint256',
        name: 'reservePercentage',
        type: 'uint256',
      },
    ],
    name: 'AuctionReservePercentageUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'reservePrice',
        type: 'uint256',
      },
    ],
    name: 'AuctionReservePriceUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'nftId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'winner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'AuctionSettled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'endTime',
        type: 'uint256',
      },
    ],
    name: 'AuctionStarted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'nftId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'BidPlaced',
    type: 'event',
  },
  {
    stateMutability: 'payable',
    type: 'fallback',
    payable: true,
  },
  {
    inputs: [],
    name: 'AUCTION_DURATION',
    outputs: [
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'BID_INCREMENT',
    outputs: [
      {
        internalType: 'uint96',
        name: '',
        type: 'uint96',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'nft',
    outputs: [
      {
        internalType: 'contract IERC721',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    stateMutability: 'payable',
    type: 'receive',
    payable: true,
  },
  {
    inputs: [],
    name: 'hasEnded',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'auctionData',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'bidder',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'miyaTeeId',
            type: 'uint256',
          },
          {
            internalType: 'uint96',
            name: 'amount',
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
            internalType: 'uint96',
            name: 'withdrawable',
            type: 'uint96',
          },
          {
            internalType: 'bool',
            name: 'settled',
            type: 'bool',
          },
          {
            internalType: 'address',
            name: 'miyaTees',
            type: 'address',
          },
          {
            internalType: 'uint8',
            name: 'reservePercentage',
            type: 'uint8',
          },
          {
            internalType: 'uint96',
            name: 'reservePrice',
            type: 'uint96',
          },
          {
            internalType: 'uint96',
            name: 'bidIncrement',
            type: 'uint96',
          },
          {
            internalType: 'uint32',
            name: 'duration',
            type: 'uint32',
          },
        ],
        internalType: 'struct MiyaTeesAuction.AuctionData',
        name: 'data',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'bidTees',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
    payable: true,
  },
  {
    inputs: [],
    name: 'settleAuction',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdrawETH',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'reservePrice',
        type: 'uint8',
      },
    ],
    name: 'setReservePrice',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint96',
        name: 'bidIncrement',
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
        name: 'duration',
        type: 'uint32',
      },
    ],
    name: 'setDuration',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'reservePercentage',
        type: 'uint8',
      },
    ],
    name: 'setReservePercentage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const product = {
  id: '3',
  product: 'Miya Hoodie',
  description: 'a standard piece of clothing with no special features, just like any other hoodie you might find',
  artist: 'KoolSkull',
  currentBid: 0.05,
  currency: 'ETH',
  images: [Hoodies, Hoodies],
}

export const products = [
  {
    id: '4',
    product: 'Miya Coat',
    description: 'a standard piece of clothing with no special features, just like any other coat you might find',
    artist: 'KoolSkull',
    currentBid: 0.0,
    currency: 'ETH',
    images: [Coat, Coat],
  },
  {
    id: '5',
    product: 'Miya T-Shirt',
    description: 'a standard piece of clothing with no special features, just like any other t-shirt you might find',
    artist: 'KoolSkull',
    currentBid: 0.0,
    currency: 'ETH',
    images: [TShirt, TShirt],
  },
]

export const NFT_BASE_URI = ''
