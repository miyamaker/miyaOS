import styled from 'styled-components/macro'

const Container = styled.div`
  width: 25%;
  padding: 0.75rem;

  @media only screen and (max-width: 640px) {
    width: 50%;
  }
`

const Wrapper = styled.div`
  border-radius: 5%;
  background-color: #262626;
`

const Image = styled.img`
  height: 80%;
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

export default function NFTItem({ tokenId, image, name }: { tokenId: number; image: string; name: string }) {
  return (
    <Container>
      <Wrapper>
        <Image src={image} alt={name} />
        <DescriptionWrapper>
          <Description>#{tokenId}</Description>
          <Description>{name}</Description>
        </DescriptionWrapper>
      </Wrapper>
    </Container>
  )
}