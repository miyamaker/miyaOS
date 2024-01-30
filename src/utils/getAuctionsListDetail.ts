type Attribute = {
  trait_type: string
  value: string
}

type NFTMetaData = {
  name: string
  description: string
  images: string[]
  attributes: Attribute[]
}

export async function getAuctionsListDetail(tokenIds: number[], baseURI: string) {
  return tokenIds.map((tokenId) => {
    const tokenURI = `${baseURI}${tokenId}`

    const { name, description, images, attributes } = JSON.parse(
      tokenURI.split('data:application/json;utf8,')[1] as string
    ) as NFTMetaData

    let artist = ''
    let currency = 'ETH'
    let product = ''

    // eslint-disable-next-line no-restricted-syntax
    for (const item of attributes) {
      if (item.trait_type === 'Product') {
        product = item.value
      }

      if (item.trait_type === 'Artist') {
        artist = item.value
      }

      if (item.trait_type === 'Currency') {
        currency = item.value
      }
    }

    return {
      id: tokenId,
      name,
      product,
      description,
      artist,
      currency,
      images,
    }
  })
}
