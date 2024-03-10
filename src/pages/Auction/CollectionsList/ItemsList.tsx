import styled from 'styled-components/macro'
import type { Address } from 'viem'

import { AUCTION_PAGE_SECTION } from '@/pages/Auction/constants'
import { useNFT } from '@/pages/Auction/useNFT'
import { setCurrentNFT } from '@/store/collections/actions'
import { useAppDispatch } from '@/store/hooks'

const Items = styled.div`
  height: 16.6666%;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  cursor: pointer;

  :hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  @media only screen and (max-width: 640px) {
    flex-direction: column;
    height: 50%;
  }
`
const Item = styled.div`
  width: 40%;
  display: flex;
  padding: 0.5rem;
  overflow-x: auto;
  font-size: 0.85rem;
  line-height: 1rem;

  @media only screen and (max-width: 640px) {
    width: 100%;
    text-align: justify;
  }
`
const LinkItem = styled.a`
  width: 25%;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  text-decoration: none;

  @media only screen and (max-width: 640px) {
    width: 100%;
    justify-content: center;
  }
`

const ImageItem = styled.div`
  width: 35%;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  font-weight: bolder;

  > img {
    width: 8rem;
    height: 4.5rem;
    margin: 0;
    border: none;
  }
  > img:hover {
    border: none;
  }
  > * + * {
    margin-left: 1rem;
  }

  @media only screen and (max-width: 640px) {
    width: 100%;
    flex-direction: column;
    justify-content: center;
    height: 50%;

    > img {
      width: 90%;
      height: 80%;
    }

    > * + * {
      margin-top: 0.5rem;
      margin-left: 0;
    }
  }
`

export default function ItemsList({ nft, setPageSection }: { nft: string; setPageSection: (section: string) => void }) {
  const dispatch = useAppDispatch()

  const { name, symbol, description, image, externalLink, collaborators } = useNFT({ address: nft as Address })

  const handleClick = () => {
    setPageSection(AUCTION_PAGE_SECTION.PRODUCT_SECTION)
    dispatch(
      setCurrentNFT({
        nft: nft as Address,
        metadata: { name, description, image, external_link: externalLink, collaborators },
      })
    )
  }

  return (
    <Items onClick={handleClick}>
      <ImageItem>
        <img src={image} alt={name} />
        <div>
          {name} ({symbol})
        </div>
      </ImageItem>
      <Item>{description}</Item>
      <LinkItem href={externalLink} target="_blank" rel="noreferrer noopener">
        {externalLink.replace('https://', '')}
      </LinkItem>
    </Items>
  )
}
