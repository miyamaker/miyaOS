import { gql } from '@apollo/client'

export const GET_COLLECTIONS = gql`
  query GetCollections($limit: Int, $offset: Int) {
    Collection(limit: $limit, offset: $offset, where: { isErc721m: { _eq: true } }) {
      name
      symbol
      address
      metadataUri
      createdAt
    }
  }
`
