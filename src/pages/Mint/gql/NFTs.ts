import { gql } from '@apollo/client'

export const GET_NFTS_OF_USER = gql`
  query GetNFTsOfUser($limit: Int, $offset: Int, $collectionAddress: String, $ownerAddress: String) {
    Token(
      offset: $offset
      limit: $limit
      where: { collection: { address: { _eq: $collectionAddress } }, owner_id: { _eq: $ownerAddress } }
    ) {
      metadataUri
      token_id
      owner_id
      collection {
        address
        name
        symbol
      }
    }
  }
`
