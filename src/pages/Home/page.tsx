import BannerImage from 'assets/banner.jpg?preset=banner&resize=true'
import Love from 'assets/love.jpg?preset=avatar&resize=true'
import Miya from 'assets/miya.png?preset=avatar&resize=true'
import MiyaG from 'assets/miyagod.jpg?preset=avatar&resize=true'
import styled from 'styled-components/macro'

import Banner from '@/components/Banner'
import Header from '@/components/Header'
import Logo from '@/components/Header/Logo'
import About from '@/components/Home/About'
import ApprovedCollections from '@/components/Home/ApprovedCollections'
import Hero from '@/components/Home/Hero'
import MiladyBox from '@/components/Home/MiladyBox'
import License from '@/components/License'
import { Bar, BorderContainer, MBox } from '@/theme/common'

const Bg = styled.div`
  height: calc(100% - 26px);
  background-image: linear-gradient(black, black, white, black, black);
  overflow: hidden;
`
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  height: 100%;
  > div {
    width: 100%;
    max-width: 42rem;
  }
`

const Container = styled.div`
  padding: 1rem 3rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  padding: 1rem;
  `}
`

const TextWrapper = styled.div`
  padding: 0.5rem;
  p {
    text-align: justify;
    margin-left: 0.5rem;
  }
`

const Explanation = styled.div`
  padding: 1rem;
`
const Caption = styled.p<{ color?: string }>`
  color: ${({ color }) => color || 'inherit'};
  margin-top: 1rem;
`

const ImageContainer = styled.div`
  padding: 2rem 2rem 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export default function Home() {
  return (
    <Bg>
      <AppContainer>
        <Banner>
          *DISCLAIMER: Black Hearted Cyber Angel Baby Token has no affiliation with Remilia Corporation or Radbro
          Webring. It is an experiment on social structures within a decentralized financial system. DO NOT RISK MORE
          THAN YOU ARE WILLING TO LOSE!
        </Banner>
        <div>
          <Header />
          <hr />
          <Container>
            <Hero />
            <Explanation>
              <MBox>
                <Bar>
                  <h2 id="lifestyle_experiences">Network Spirituality - 無条件加速主義</h2>
                </Bar>
                <TextWrapper>
                  <p>
                    Miya was an attempt to make network spirituality real. Milady is an aesthetic, a lifestyle and a
                    community. Both spawn derivatives that conceptualize and develop their own extensions of the
                    respective art. $MIYA is an experimental ERC-20 token that attempts to connect various
                    manifestations of network spirituality into one asset.
                  </p>
                  <hr />

                  <p>
                    <b>$MIYA:</b> Black Hearted Cyber Angel Baby Token works by checking to see if the wallet that is
                    sending the transfer holds any of the approved NFT collections. It is an out of the box ERC-20 token
                    that is capable of being used for any DeFi purpose. It is now possible to create protocols that are
                    gated by $MIYA and her NFTs. Special thanks to{' '}
                    <a href="https://twitter.com/10xdegendev">10xdegendev</a> and the Radbro Webring`s creation
                    “BroCoin”, which is where this mechanism is originally forked. <br />
                    <br />
                    <em>*You only need to hold 1 NFT from an approved collection in order to trade!*</em>
                  </p>
                  <ImageContainer>
                    <img src={Miya[0]?.src} alt="Miya" />
                    <Caption>
                      <i>&quot;Hello Frens! Welcome to the Daily Miya!!&quot;</i>
                    </Caption>
                  </ImageContainer>
                </TextWrapper>
              </MBox>
              <ImageContainer>
                <BorderContainer style={{ width: '100%' }}>
                  <img src={MiyaG[0]?.src} alt="" />
                </BorderContainer>
              </ImageContainer>
            </Explanation>
            <hr />
            <MiladyBox />
          </Container>
          <ApprovedCollections />
          <hr />
          <Logo source={BannerImage[0]?.src || ''} />
          <About />
          <ImageContainer style={{ marginBottom: '1.5rem' }}>
            <BorderContainer style={{ width: '100%' }}>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://opensea.io/assets/ethereum/0xbfe47d6d4090940d1c7a0066b63d23875e3e2ac5/4760"
              >
                <img src={Love[0]?.src} alt="SchizoPoster #4760" />
              </a>
              <Caption color="#ffffff">
                <i>I HATE THE ANTICHRIST</i>
              </Caption>
            </BorderContainer>
          </ImageContainer>
          <hr />
          <License />
        </div>
      </AppContainer>
    </Bg>
  )
}
