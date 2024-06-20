import styled from 'styled-components/macro'
import type { Address } from 'viem'

import type { Token } from '@/pages/Mint'
import { useTokenMetadata } from '@/pages/Mint/useTokenMetadata'
import { MY_COLLECTIONS_PAGE_SECTION } from '@/pages/MyCollections/constants'

const Container = styled.div`
  width: 25%;
  padding: 0.75rem;
  cursor: pointer;

  @media only screen and (max-width: 640px) {
    width: 50%;
  }
`

const Wrapper = styled.div`
  border-radius: 5%;
  background-color: #262626;
`

const ImageWrapper = styled.div`
  height: 80%;
  width: 100%;
`
const Image = styled.img`
  height: auto;
  width: auto;
  max-height: 100%;
  max-width: 100%;
  border: none;
  border-top-left-radius: 5%;
  border-top-right-radius: 5%;

  :hover {
    border: none;
  }
`

const DescriptionWrapper = styled.div`
  padding: 0.5rem;
`

const Description = styled.div`
  color: #fff;
  font-size: 0.5rem;
  font-weight: bolder;
`

export default function NFTItem({
  tokenId,
  collectionAddress,
  setPageSection,
  setSelectedToken,
}: {
  tokenId: string
  collectionAddress: string
  setPageSection: (section: string) => void
  setSelectedToken: (token: Token) => void
}) {
  const { name, image, description, attributes, externalURL } = useTokenMetadata({
    address: collectionAddress as Address,
    tokenId,
  })

  const handleClick = () => {
    setSelectedToken({
      tokenId,
      collectionAddress,
      metadata: { name, image, description, attributes, external_url: externalURL },
    })
    setPageSection(MY_COLLECTIONS_PAGE_SECTION.NFT_SECTION)
  }

  return (
    <Container onClick={handleClick}>
      <Wrapper>
        <ImageWrapper>
          <Image src={image} alt={name} />
        </ImageWrapper>
        <DescriptionWrapper>
          <Description>#{tokenId}</Description>
          <Description>{name}</Description>
        </DescriptionWrapper>
      </Wrapper>
    </Container>
  )
}
