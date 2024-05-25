import styled from 'styled-components/macro'
import type { Address } from 'viem'

import { EXPLORER_PAGE_SECTION } from '@/pages/Explorer/constants'
import { useTokenMetadata } from '@/pages/Explorer/useTokenMetadata'

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
}: {
  tokenId: string
  collectionAddress: string
  setPageSection: (section: string) => void
}) {
  const { name, image, description, attributes } = useTokenMetadata({ address: collectionAddress as Address, tokenId })

  return (
    <Container onClick={() => setPageSection(EXPLORER_PAGE_SECTION.NFT_SECTION)}>
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
