import NFTImage from 'assets/explorer/sample/milady.png'
import styled from 'styled-components/macro'
import { useWindowSize } from 'usehooks-ts'

import Dialog from '@/components/Dialog'
import BackButton from '@/pages/Explorer/Button/BackButton'
import { EXPLORER_PAGE_SECTION } from '@/pages/Explorer/constants'

const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const DetailWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  > * + * {
    margin-left: 1rem;
  }

  @media only screen and (max-width: 640px) {
    flex-direction: column;
    > * + * {
      margin-left: 0;
      margin-top: 1rem;
    }
  }
`
const ImageWrapper = styled.div`
  width: 40%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 640px) {
    width: 80%;
    height: 40%;
    align-items: start;
  }
`
const Image = styled.img`
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border: none;
  margin: 0;
  border-radius: 5px;

  :hover {
    border: none;
  }
`

const MetadataWrapper = styled(Dialog)`
  width: 60%;
  height: 90%;

  @media only screen and (max-width: 640px) {
    width: 100%;
    height: 60%;
  }
`

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

const Traits = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const TraitWrapper = styled.div`
  width: calc(100% / 2);
  height: 100%;
  padding: 0.5rem;

  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    display: none;
  }

  //@media only screen and (max-width: 640px) {
  //  width: calc(100% / 2);
  //}
`
const Trait = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;

  border-radius: 8px;
  border: 1px solid #8d8d8d;

  > * + * {
    margin-top: 0.25rem;
  }
`
const TraitTitle = styled.div`
  text-align: center;
  color: #808080;
  font-size: 0.85rem;
`
const TraitValue = styled.div`
  text-align: center;
  color: #fff;
  font-size: 0.75rem;

  overflow-x: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`

const TraitsSample = [
  {
    trait: 'badge',
    value: 'communicator',
  },
  {
    trait: 'environment',
    value: 'lounge lizards',
  },
  {
    trait: 'logo',
    value: 'cyberbro',
  },
  {
    trait: 'remilio',
    value: 'remilio-2305',
  },
]

export default function NFTDetail({ setPageSection }: { setPageSection: (section: string) => void }) {
  const { width } = useWindowSize()
  return (
    <Container>
      <DetailWrapper style={{ height: width > 640 ? '75%' : '85%' }}>
        <ImageWrapper>
          <Image src={NFTImage} alt="NFT" />
        </ImageWrapper>
        <MetadataWrapper>
          <div>Radbro #123</div>
          <div>By RadBroDeployer</div>
          <div>Radbros on chain. Just tell to check the chain. Radbros get $RAD.</div>
          <Traits>
            {TraitsSample.map(({ trait, value }, index) => (
              <TraitWrapper key={index}>
                <Trait>
                  <TraitTitle>{trait}</TraitTitle>
                  <TraitValue>{value}</TraitValue>
                </Trait>
              </TraitWrapper>
            ))}
          </Traits>
        </MetadataWrapper>
      </DetailWrapper>
      <ButtonWrapper style={{ height: width > 640 ? '25%' : '15%' }}>
        <BackButton text="Back" handleClick={() => setPageSection(EXPLORER_PAGE_SECTION.COLLECTION_SECTION)} />
      </ButtonWrapper>
    </Container>
  )
}
