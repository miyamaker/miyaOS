import styled from 'styled-components/macro'

import ImagesList, { Button } from '@/components/ProductDetail/ImagesList'

type Product = {
  product: string
  description: string
  artist: string
  currentBid: number
  currency: string
  images: string[]
}

const ImagesListWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: transparent;
  width: 33.3333%;
`
const ImageDetailWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 66.6666%;
`

const DetailWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.5rem 0.5rem 0.5rem;
`

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.7rem;
  width: 25%;
  padding-left: 0.5rem;

  > * + * {
    margin-top: 0.5rem;
  }
`

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.7rem;
  width: 75%;
  padding-left: 0.5rem;

  > * + * {
    margin-top: 0.5rem;
  }
`

const BidWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem 0 1rem;
`

const InputWrapper = styled.div`
  width: 50%;
  display: flex;
`

const ActionWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: end;
  align-items: center;

  > * + * {
    margin-left: 0.5rem;
  }
`

const TextInput = styled.input.attrs({ type: 'text' })`
  width: 100%;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border: none;
  box-shadow: inset -1px -1px #fff, inset 1px 1px grey, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a;
  background-color: #ffffff;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0;
  line-height: 2;

  &:disabled,
  &:read-only {
    background-color: #c0c0c0;
  }

  &:focus {
    outline: none;
  }
`

const Timer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem;
  font-size: 0.6rem;
  box-shadow: inset -1px -1px #fff, inset 1px 1px grey, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a;
`

export default function ProductDetail({ product }: { product: Product }) {
  return (
    <>
      <ImagesListWrapper>
        <ImagesList images={product.images} />
      </ImagesListWrapper>
      <ImageDetailWrapper>
        <DetailWrapper>
          <Fields>Product:</Fields>
          <Detail>{product.product}</Detail>
        </DetailWrapper>
        <DetailWrapper>
          <Fields>Description:</Fields>
          <Detail>{product.description}</Detail>
        </DetailWrapper>
        <DetailWrapper>
          <Fields>Current bid:</Fields>
          <Detail>
            {product.currentBid} {product.currency}
          </Detail>
        </DetailWrapper>
        <DetailWrapper>
          <Fields>Artist:</Fields>
          <Detail style={{ textTransform: 'uppercase' }}>{product.artist}</Detail>
        </DetailWrapper>
        <div style={{ width: '100%', fontSize: '0.55rem', textAlign: 'end', paddingRight: '1rem' }}>Time left:</div>
        <BidWrapper>
          <InputWrapper>
            <TextInput style={{ width: '70%' }} placeholder="Type price..." />
            <TextInput style={{ width: '30%' }} value={product.currency} readOnly />
          </InputWrapper>
          <ActionWrapper>
            <Button style={{ padding: '0.4rem', fontSize: '0.6rem' }}>Place bid</Button>
            <Timer>10h:50m:35s</Timer>
          </ActionWrapper>
        </BidWrapper>
        <div style={{ width: '50%', fontSize: '0.55rem', textAlign: 'end' }}>Total offer amount: 0 ETH</div>
      </ImageDetailWrapper>
    </>
  )
}
