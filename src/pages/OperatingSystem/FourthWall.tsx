import styled from 'styled-components/macro'

import { useSticky } from '@/store/experience/hooks'

import Sticky from '../../assets/sticky.png'

const FourthWallStyled = styled.div`
  display: flex;
  justify-content: end;
  align-items: start;
  position: absolute;
  z-index: ${100_000};
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
  pointer-events: none;
  > * {
    pointer-events: auto;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: none;
  `}
`

const StickyNote = styled.div<{ fell?: boolean }>`
  position: relative;
  pointer-events: none;
  transition: all 5s cubic-bezier(0.25, 1, 0.5, 1);
  > img {
    pointer-events: visible !important;
  }
  ${({ fell }) => fell && `transform: translate(0, 200vh) rotate(-80deg);`}
`

export default function FourthWall() {
  const [sticky, toggleSticky] = useSticky()
  return (
    <FourthWallStyled>
      <StickyNote fell={!sticky}>
        <img
          useMap="#sticky-map"
          src={Sticky}
          style={{
            userSelect: 'none',
            width: '400px',
            maxWidth: '100%',
            height: 'auto',
            border: '0px solid transparent',
          }}
        />
        <map id="sticky-map">
          <area
            alt="0118 999 881 999 119 725...3 (Tech Support!)"
            title="Miya Heaven Discord Server"
            href="https://discord.gg/SekBTQARMk"
            target="_blank"
            rel="noopener noreferrer"
            coords="37,127 267,38 279,69 311,58 375,220 105,321 "
            shape="polygon"
          />
          <area
            alt=""
            title="Throw away note"
            coords="299,26 267,38 279,69 311,58 "
            shape="polygon"
            style={{ cursor: 'no-drop' }}
            onClick={() => toggleSticky()}
          />
        </map>
      </StickyNote>
    </FourthWallStyled>
  )
}
