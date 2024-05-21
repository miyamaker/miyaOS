import { gql } from '@apollo/client'

export const GET_COLLECTIONS = gql`
  query GetCollections($first: Int, $skip: Int) {
    collections(first: $first, skip: $skip) {
      id
      creator
      owner
      collection
    }
  }
`
