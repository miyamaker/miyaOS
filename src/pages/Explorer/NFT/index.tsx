import NFTImage from 'assets/explorer/sample/milady.png'
import styled from 'styled-components/macro'
import { useWindowSize } from 'usehooks-ts'

import Dialog from '@/components/Dialog'
import ConnectButton from '@/pages/Explorer/Button/ConnectButton'
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
`
const Image = styled.img`
  width: 40%;
  height: 55%;
  border: none;
  margin: 0;

  :hover {
    border: none;
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
  width: calc(100% / 3);
  height: 100%;
  padding: 0.5rem;

  overflow-y: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    display: none;
  }
`
const Trait = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;

  border-radius: 8px;
  border: 1px solid #8d8d8d;
`
const TraitTitle = styled.div`
  text-align: center;
  color: #808080;
`
const TraitValue = styled.div`
  text-align: center;
  color: #fff;

  overflow-x: scroll;

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
        <Image src={NFTImage} alt="NFT" />
        <Dialog style={{ width: '60%', height: '60%', fontSize: '0.75rem' }}>
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
        </Dialog>
      </DetailWrapper>
      <ButtonWrapper style={{ height: width > 640 ? '25%' : '15%' }}>
        <ConnectButton text="Exit" handleClick={() => setPageSection(EXPLORER_PAGE_SECTION.COLLECTION_SECTION)} />
      </ButtonWrapper>
    </Container>
  )
}
