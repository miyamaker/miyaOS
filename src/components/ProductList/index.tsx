import styled from 'styled-components/macro'

import ImageWrapper from '@/components/ImageWrapper'
import type { Product } from '@/components/ProductDetail'
import { Button } from '@/components/ProductDetail/ImagesList'

const ProductListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  overflow-y: scroll;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
`

const ProductWrapper = styled.div`
  width: 25%;
  padding: 0.5rem;
`

const ImageDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > img {
    border: none;
  }

  > img:hover {
    border: none;
  }

  > * + * {
    margin-top: 0.5rem;
  }
`

const Image = styled.img`
  height: 30%;
`

const Description = styled.div`
  font-size: 0.5rem;
  font-weight: bolder;
`

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <ProductListWrapper>
      {products.map((product: Product, index: number) => (
        <ProductWrapper key={index}>
          <ImageWrapper style={{ padding: '0.75rem' }}>
            <ImageDetail>
              <Image src={product.images[0]} alt="Product Image" />
              <Description>{product.product}</Description>
              <Description>
                Current bid: {product.currentBid} {product.currency}
              </Description>
            </ImageDetail>
          </ImageWrapper>
          <Button style={{ width: '100%', marginTop: '0.25rem' }}>Place bid</Button>
        </ProductWrapper>
      ))}
    </ProductListWrapper>
  )
}
