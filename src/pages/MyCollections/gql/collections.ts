import { gql } from '@apollo/client'

const GET_USER_COLLECTIONS = gql`
  query GetUserOwnedNFTCollections($limit: Int, $offset: Int, $ownerAddress: String) {
    Token(distinct_on: collection_id, offset: $offset, limit: $limit, where: { owner_id: { _eq: $ownerAddress } }) {
      collection {
        name
        symbol
        address
        metadataUri
        maxSupply
      }
    }
  }
`

const GET_USER_NFTS_BY_COLLECTION = gql`
  query GetUserNFTsByCollection($ownerAddress: String, $collectionAddress: String) {
    Token(where: { owner_id: { _eq: $ownerAddress }, collection: { address: { _eq: $collectionAddress } } }) {
      metadataUri
      token_id
    }
  }
`
export { GET_USER_COLLECTIONS, GET_USER_NFTS_BY_COLLECTION }
