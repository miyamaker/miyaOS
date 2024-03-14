import styled from 'styled-components/macro'

import { NormalButton } from '@/components/Button/NormalButton'
import ImageWrapper from '@/pages/Auction/ImageWrapper'
import { useToken } from '@/pages/Auction/useToken'
import { setCurrentToken } from '@/store/collections/actions'
import { useAppDispatch } from '@/store/hooks'
import { getTokenAttribute } from '@/utils/getTokenAttribute'

const ProductWrapper = styled.div`
  width: 25%;
  padding: 0.5rem;

  @media only screen and (max-width: 640px) {
    width: 50%;
  }
`

const ImageDetail = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  > * + * {
    margin-top: 0.5rem;
  }
`

const Wrapper = styled.div`
  width: 100%;
  height: 80%;

  display: flex;
  justify-content: center;
  align-items: center;
`

const Image = styled.img`
  height: auto;
  width: auto;
  max-height: 100%;
  max-width: 100%;
  border: none;

  :hover {
    border: none;
  }
`

const Description = styled.div`
  font-size: 0.5rem;
  font-weight: bolder;
`

export default function AuctionProduct({ tokenId, tokenURI }: { tokenId: number; tokenURI: string }) {
  const dispatch = useAppDispatch()

  const { name, description, image, externalURL, attributes } = useToken({ tokenURI, isFetch: true })

  const handleBid = () => {
    dispatch(
      setCurrentToken({
        tokenId,
        metadata: { name, description, image, external_url: externalURL, attributes },
      })
    )
  }

  return (
    <ProductWrapper>
      <ImageWrapper style={{ padding: '0.75rem', height: '80%' }}>
        <ImageDetail>
          <Wrapper>
            <Image src={image} alt={name} />
          </Wrapper>
          <Description>{name}</Description>
          <Description>{getTokenAttribute(attributes, 'Artist')}</Description>
          {/* <Description> */}
          {/*  Current bid: {product.currentBid} {product.currency} */}
          {/* </Description> */}
        </ImageDetail>
      </ImageWrapper>
      <NormalButton onClick={handleBid} style={{ width: '100%', marginTop: '0.25rem' }}>
        Bid
      </NormalButton>
    </ProductWrapper>
  )
}
