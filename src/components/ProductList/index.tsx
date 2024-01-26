import styled from 'styled-components/macro'

import ImageWrapper from '@/components/ImageWrapper'
import { Button } from '@/components/ProductDetail/ImagesList'
import { getCurrentNFT } from '@/store/auction/actions'
import type { Product } from '@/store/auction/reducer'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

const ProductListWrapper = styled.div`
  width: 100%;
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
  height: 100%;
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
  height: 80%;
`

const Description = styled.div`
  font-size: 0.5rem;
  font-weight: bolder;
`

export default function ProductList() {
  const dispatch = useAppDispatch()
  const products = useAppSelector((state) => state.auction.productsList)

  const handleBid = (id: string) => {
    dispatch(getCurrentNFT({ id }))
  }

  return (
    <ProductListWrapper>
      {products.map((product: Product, index: number) => (
        <ProductWrapper key={index}>
          <ImageWrapper style={{ padding: '0.75rem', height: '80%' }}>
            <ImageDetail>
              <Image src={product.images[0]} alt="Product Image" />
              <Description>{product.product}</Description>
              <Description>
                Current bid: {product.currentBid} {product.currency}
              </Description>
            </ImageDetail>
          </ImageWrapper>
          <Button onClick={() => handleBid(product.id)} style={{ width: '100%', marginTop: '0.25rem' }}>
            Bid
          </Button>
        </ProductWrapper>
      ))}
    </ProductListWrapper>
  )
}
