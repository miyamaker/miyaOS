import DiscordIcon from 'assets/explorer/icon/discord.svg'
import TelegramIcon from 'assets/explorer/icon/telegram.svg'
import TwitterIcon from 'assets/explorer/icon/twitter.svg'
import WebsiteIcon from 'assets/explorer/icon/website.svg'
import NFTImage from 'assets/explorer/sample/milady.png'
import type { CSSProperties } from 'react'
import styled from 'styled-components/macro'

import Dialog from '@/components/Dialog'
import ConnectButton from '@/pages/Explorer/Button/ConnectButton'
import MintButton from '@/pages/Explorer/Button/MintButton'
import { EXPLORER_PAGE_SECTION } from '@/pages/Explorer/constants'

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`

const ImageDetailContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ImageDetailWrapper = styled.div`
  width: 60%;
  height: 70%;

  > * + * {
    margin-top: 0.5rem;
  }
`

const MintDetail = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;

  > * + * {
    margin-top: 0.75rem;
  }
`

const CollectionName = styled.div`
  font-size: 0.75rem;
  text-align: center;
  text-transform: uppercase;
`

const CollectionImage = styled.img`
  width: 100%;
  height: 80%;
  border-radius: 5%;
  border: none;

  :hover {
    border: none;
  }
`

const SocialList = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;

  > * + * {
    margin-left: 0.25rem;
  }
`

const SocialItem = styled.a``

const Icon = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  width: 1rem;
  height: 1rem;

  :hover {
    border: none;
  }
`

const ConnectButtonWrapper = styled.div`
  width: 60%;
  height: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const MintWrapper = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;

  > * + * {
    margin-top: 0.75rem;
  }
`

const MintInfoWrapper = styled.div`
  height: 40%;
  padding: 0.55rem;
`

const socialLinks = [
  {
    name: 'twitter',
    image: TwitterIcon,
    link: 'https://x.com',
  },
  {
    name: 'discord',
    image: DiscordIcon,
    link: 'https://discord.com',
  },
  {
    name: 'website',
    image: WebsiteIcon,
    link: 'https://miyamaker.com',
  },
  {
    name: 'telegram',
    image: TelegramIcon,
    link: 'https://telegram.com',
  },
]

export default function CollectionDetail({
  style,
  setPageSection,
}: {
  style?: CSSProperties
  setPageSection: (section: string) => void
}) {
  return (
    <Container style={style}>
      <ImageDetailContainer>
        <ImageDetailWrapper>
          <CollectionName>RADBRO WEBRING</CollectionName>
          <CollectionImage src={NFTImage} alt="RADBRO WEBRING" />
          <SocialList>
            {socialLinks.map(({ name, image, link }, index) => (
              <SocialItem href={link} target="_blank" key={index}>
                <Icon src={image} alt={name} />
              </SocialItem>
            ))}
          </SocialList>
        </ImageDetailWrapper>
        <ConnectButtonWrapper>
          <ConnectButton text="Back" handleClick={() => setPageSection(EXPLORER_PAGE_SECTION.COLLECTIONS_SECTION)} />
          <ConnectButton text="Connect" handleClick={() => {}} />
        </ConnectButtonWrapper>
      </ImageDetailContainer>
      <MintDetail>
        <MintWrapper>
          {[1, 5, 10, 100].map((item, index) => (
            <MintButton text={item > 1 ? `Mint x${item}` : 'Mint'} key={index} />
          ))}
        </MintWrapper>
        <MintInfoWrapper>
          <Dialog>
            <p>Radbro Webring</p>
            <p>Radbro Webring</p>
            <p>Radbro Webring</p>
            <p>Radbro Webring</p>
          </Dialog>
        </MintInfoWrapper>
      </MintDetail>
    </Container>
  )
}
