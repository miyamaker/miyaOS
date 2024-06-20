type CollectionBaseInfo = {
  name: string
  symbol: string
  address: string
  metadataUri: string
  maxSupply: string
}
type CollectionUserOwnedToken = {
  collection: CollectionBaseInfo
}

export type { CollectionBaseInfo, CollectionUserOwnedToken }
