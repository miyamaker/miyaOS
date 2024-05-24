// import DiscordIcon from 'assets/explorer/icon/discord.svg'
// import TelegramIcon from 'assets/explorer/icon/telegram.svg'
// import TwitterIcon from 'assets/explorer/icon/twitter.svg'
// import WebsiteIcon from 'assets/explorer/icon/website.svg'
import NFTImage from 'assets/explorer/sample/milady.png'
import { get } from 'lodash'
import numeral from 'numeral'
import type { CSSProperties } from 'react'
import { useState } from 'react'
import styled from 'styled-components/macro'
import type { Address } from 'viem'
import { formatUnits } from 'viem'
import { useWaitForTransaction } from 'wagmi'

import Dialog from '@/components/Dialog'
import BackButton from '@/pages/Explorer/Button/BackButton'
import ConnectWalletButton from '@/pages/Explorer/Button/ConnectWalletButton'
import MintButton from '@/pages/Explorer/Button/MintButton'
import { EXPLORER_PAGE_SECTION } from '@/pages/Explorer/constants'
import type { Collection } from '@/pages/Explorer/types/collection'
import { useContractMetadata } from '@/pages/Explorer/useContractMetadata'
import { useMintWithFee } from '@/pages/Explorer/useMintWithFee'
import { useNFTPrice } from '@/pages/Explorer/useNFTPrice'

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;

  @media only screen and (max-width: 640px) {
    flex-direction: column;
    overflow-y: auto;

    ::-webkit-scrollbar {
      display: none;
    }
  }
`

const ImageDetailContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-width: 640px) {
    width: 100%;
  }
`

const ImageDetailWrapper = styled.div`
  width: 60%;
  height: 75%;

  > * + * {
    margin-top: 0.5rem;
  }

  @media only screen and (max-width: 640px) {
    display: flex;
    width: 100%;
  }
`
const ImageDetailGroup = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 640px) {
    width: 100%;
    height: 100%;
  }
`
const ImageWrapper = styled.div`
  width: 100%;
  height: 90%;
`

const MintDetail = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;

  > * + * {
    margin-top: 0.75rem;
  }

  @media only screen and (max-width: 640px) {
    width: 100%;
  }
`

const CollectionName = styled.div`
  font-size: 0.85rem;
  text-align: center;
  text-transform: uppercase;
  font-weight: bolder;
  text-wrap: nowrap;
  padding-bottom: 0.5rem;
`

const CollectionImage = styled.img`
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 5%;
  border: none;

  :hover {
    border: none;
  }
`

// const SocialList = styled.div`
//   display: flex;
//   justify-content: start;
//   align-items: center;
//
//   > * + * {
//     margin-left: 0.25rem;
//   }
//
//   @media only screen and (max-width: 640px) {
//     width: 15%;
//     flex-direction: column;
//     justify-content: center;
//
//     > * + * {
//       margin-left: 0;
//       margin-top: 0.5rem;
//     }
//   }
// `
//
// const SocialItem = styled.a``
//
// const Icon = styled.img`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border: none;
//   width: 1rem;
//   height: 1rem;
//
//   :hover {
//     border: none;
//   }
//
//   @media only screen and (max-width: 640px) {
//     width: 2rem;
//     height: 2rem;
//   }
// `

const ConnectButtonWrapper = styled.div`
  width: 60%;
  height: 25%;
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
    margin-top: 1rem;
  }

  @media only screen and (max-width: 640px) {
    > * + * {
      margin-top: 0;
    }
  }
`

const MintInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  > * + * {
    margin-top: 0.5rem;
  }
`
const MintInputWrapper = styled.div`
  display: flex;
  width: 100%;
  > * + * {
    margin-left: 0.5rem;
  }
`
const Label = styled.div`
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
`
const MintPriceDetail = styled.div`
  display: flex;
  font-size: 0.65rem;
  > * + * {
    margin-left: 0.5rem;
  }
  > span {
    color: #fff;
    text-shadow: 2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000,
      -1px 1px #000;
  }
`
const MintInput = styled.input`
  flex-grow: 1;
  padding: 0.5rem;
  background-color: #272526;
  color: #fff;
  outline: 2px solid transparent;
  outline-offset: 2px;
`
const Button = styled(MintButton)`
  width: fit-content;
  height: 100%;
`

const MintInfoWrapper = styled.div`
  height: 40%;
  padding: 0.55rem;
`

// const socialLinks = [
//   {
//     name: 'twitter',
//     image: TwitterIcon,
//     link: 'https://x.com',
//   },
//   {
//     name: 'discord',
//     image: DiscordIcon,
//     link: 'https://discord.com',
//   },
//   {
//     name: 'website',
//     image: WebsiteIcon,
//     link: 'https://miyamaker.com',
//   },
//   {
//     name: 'telegram',
//     image: TelegramIcon,
//     link: 'https://telegram.com',
//   },
// ]

export default function CollectionDetail({
  style,
  setPageSection,
  isConnected,
  selectedCollection,
  setErrorMessage,
  setErrorName,
}: {
  style?: CSSProperties
  setPageSection: (section: string) => void
  isConnected: boolean
  selectedCollection: Collection
  setErrorMessage: (value: string) => void
  setErrorName: (value: string) => void
}) {
  const [freeMintAmount, setFreeMintAmount] = useState<number>(1)
  const [payMintAmount, setPayMintAmount] = useState<number>(1)
  const [transacting, setTransacting] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>('')

  const { image, description } = useContractMetadata({ metadataUri: selectedCollection.metadataUri })
  const { price } = useNFTPrice({ address: selectedCollection.address as Address })

  const { mint } = useMintWithFee({
    address: selectedCollection.address as Address,
    payAmount: (payMintAmount * Number(formatUnits(price, 18))).toString(),
  })

  useWaitForTransaction({
    hash: (txHash as Address) || '0x',
    enabled: !!txHash,
    onSuccess: () => {
      setTransacting(false)
      setTxHash('')
    },
    onReplaced: () => {
      setTransacting(false)
      setTxHash('')
    },
  })

  const calculateTotalPayment = () => {
    return numeral(payMintAmount * Number(formatUnits(price, 18))).format('0,0.[00000]')
  }

  const handlePayMint = async () => {
    if (!isConnected) return
    setTransacting(true)
    try {
      const result = await mint(payMintAmount)
      setTxHash(result.hash)
    } catch (e) {
      setTransacting(false)
      // warn message
      setErrorMessage(get(e, 'shortMessage') || '')
      setErrorName(get(e, 'name') || '')
    }
  }

  return (
    <Container style={style}>
      <ImageDetailContainer>
        <CollectionName>{selectedCollection ? selectedCollection.name : 'RADBRO WEBRING'}</CollectionName>
        <ImageDetailWrapper>
          <ImageDetailGroup>
            <ImageWrapper>
              <CollectionImage
                src={image || NFTImage}
                alt={selectedCollection ? selectedCollection.name : 'RADBRO WEBRING'}
              />
            </ImageWrapper>
          </ImageDetailGroup>
          {/* <SocialList> */}
          {/*  {socialLinks.map(({ name, image, link }, index) => ( */}
          {/*    <SocialItem href={link} target="_blank" key={index}> */}
          {/*      <Icon src={image} alt={name} /> */}
          {/*    </SocialItem> */}
          {/*  ))} */}
          {/* </SocialList> */}
        </ImageDetailWrapper>
        <ConnectButtonWrapper>
          <BackButton text="Back" handleClick={() => setPageSection(EXPLORER_PAGE_SECTION.COLLECTIONS_SECTION)} />
          <ConnectWalletButton isConnected={isConnected} />
        </ConnectButtonWrapper>
      </ImageDetailContainer>
      <MintDetail>
        <MintWrapper>
          <MintInputContainer>
            <Label>Free Mint</Label>
            <MintPriceDetail>
              <span>{freeMintAmount}</span>
              <span>*</span>
              <span>0</span>
              <span>=</span>
              <span style={{ color: '#00ba7c' }}>0 ETH</span>
            </MintPriceDetail>
            <MintInputWrapper>
              <MintInput
                type="number"
                min={1}
                value={freeMintAmount}
                onChange={(e) => setFreeMintAmount(Number(e.target.value))}
              />
              <Button text={'Mint'} />
            </MintInputWrapper>
          </MintInputContainer>
          <MintInputContainer>
            <Label>Pay Mint</Label>
            <MintPriceDetail>
              <span>{payMintAmount}</span>
              <span>*</span>
              <span>{formatUnits(price, 18)}</span>
              <span>=</span>
              <span style={{ color: '#00ba7c' }}>{calculateTotalPayment()} ETH</span>
            </MintPriceDetail>
            <MintInputWrapper>
              <MintInput
                type="number"
                min={1}
                value={payMintAmount}
                onChange={(e) => setPayMintAmount(Number(e.target.value))}
              />
              <Button disabled={transacting} text={transacting ? 'Minting...' : `Mint`} onClick={handlePayMint} />
            </MintInputWrapper>
          </MintInputContainer>
        </MintWrapper>
        <MintInfoWrapper>
          <Dialog>
            {description ? (
              <p>{description}</p>
            ) : (
              <p
                style={{ display: 'flex', width: '95%', height: '84%', justifyContent: 'center', alignItems: 'center' }}
              >
                Have no Description
              </p>
            )}
          </Dialog>
        </MintInfoWrapper>
      </MintDetail>
    </Container>
  )
}
