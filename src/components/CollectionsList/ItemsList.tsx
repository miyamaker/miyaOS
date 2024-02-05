import styled from 'styled-components/macro'
import type { Address } from 'viem'

import { AUCTION_PAGE_SECTION } from '@/pages/Auction/constants'
import { useNFT } from '@/pages/Auction/useNFT'
import { setCurrentNFT } from '@/store/auction/actions'
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
`
const Item = styled.div`
  display: flex;
  padding: 0.5rem;
  overflow-x: auto;
  font-size: 0.85rem;
  line-height: 1rem;
`
const LinkItem = styled.a`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  text-decoration: none;
`

const ImageItem = styled.a`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  text-decoration: none;
  font-weight: bolder;

  > img {
    width: 3rem;
    height: 3rem;
    margin: 0;
    border: none;
  }
  > img:hover {
    border: none;
  }
  > * + * {
    margin-left: 1rem;
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
      <ImageItem style={{ width: '35%' }}>
        <img src={image} alt={name} />
        <div>
          {name} ({symbol})
        </div>
      </ImageItem>
      <Item style={{ width: '40%' }}>{description}</Item>
      <LinkItem style={{ width: '25%' }} href={externalLink} target="_blank" rel="noreferrer noopener">
        {externalLink.replace('https://', '')}
      </LinkItem>
    </Items>
  )
}
