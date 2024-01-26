import Coat from 'assets/products/kool-skull/coat.png'
import Hoodies from 'assets/products/kool-skull/hoodies.png'
import TShirt from 'assets/products/kool-skull/t-shirt.png'

export const abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_miyaNFT',
        type: 'address',
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
        indexed: true,
        internalType: 'uint256',
        name: 'nftId',
        type: 'uint256',
      },
    ],
    name: 'AuctionCreated',
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
        name: 'startTime',
        type: 'uint256',
      },
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
    name: 'auctionDuration',
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
    constant: true,
  },
  {
    inputs: [],
    name: 'endTime',
    outputs: [
      {
        internalType: 'uint40',
        name: '',
        type: 'uint40',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'isStart',
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
    inputs: [],
    name: 'startTime',
    outputs: [
      {
        internalType: 'uint40',
        name: '',
        type: 'uint40',
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
    inputs: [
      {
        internalType: 'uint256',
        name: '_nftId',
        type: 'uint256',
      },
    ],
    name: 'auctionById',
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
            name: 'miyaNFTId',
            type: 'uint256',
          },
          {
            internalType: 'uint96',
            name: 'amount',
            type: 'uint96',
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
            name: 'miyaNFT',
            type: 'address',
          },
          {
            internalType: 'uint8',
            name: 'reservePercentage',
            type: 'uint8',
          },
          {
            internalType: 'uint96',
            name: 'bidIncrement',
            type: 'uint96',
          },
        ],
        internalType: 'struct MiyaAuction.AuctionData',
        name: 'data',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'auctionsList',
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
            name: 'miyaNFTId',
            type: 'uint256',
          },
          {
            internalType: 'uint96',
            name: 'amount',
            type: 'uint96',
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
            name: 'miyaNFT',
            type: 'address',
          },
          {
            internalType: 'uint8',
            name: 'reservePercentage',
            type: 'uint8',
          },
          {
            internalType: 'uint96',
            name: 'bidIncrement',
            type: 'uint96',
          },
        ],
        internalType: 'struct MiyaAuction.AuctionData[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'startAuction',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_nftId',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: '_reservePercentage',
        type: 'uint8',
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
        internalType: 'uint256',
        name: '_nftId',
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
]

export const product = {
  id: '3',
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
    id: '4',
    name: 'Miya Coat',
    product: 'Coat',
    description: 'a standard piece of clothing with no special features, just like any other coat you might find',
    artist: 'KoolSkull',
    currentBid: 0.0,
    currency: 'ETH',
    images: [Coat, Coat],
  },
  {
    id: '5',
    name: 'Miya T-Shirt',
    product: 'T-Shirt',
    description: 'a standard piece of clothing with no special features, just like any other t-shirt you might find',
    artist: 'KoolSkull',
    currentBid: 0.0,
    currency: 'ETH',
    images: [TShirt, TShirt],
  },
]

export const NFT_BASE_URI = 'https://d3d6dljqjizsii.cloudfront.net/'
