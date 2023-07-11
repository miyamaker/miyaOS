import Banner from 'assets/banner1.jpg?preset=banner&resize=true'
import styled from 'styled-components/macro'

import { Bar, BoxContent, MBox } from '@/theme/common'

import Logo from './Logo'

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const AudioContainer = styled.div`
  margin: 1rem 0;
`

export default function Header() {
  return (
    <>
      <HeaderContainer>
        <Logo source={Banner[0]?.src || ''} />
        <MBox>
          <Bar>
            <h2>
              BLACK HEARTED CYBER ANGEL BABY TOKEN! 🖤🖤🖤🖤🖤🖤
              <br />
              ミヤ ブラックハート サイバーエンジェルベイビー! 🖤🖤🖤🖤🖤🖤
            </h2>
          </Bar>
          <BoxContent>
            <p>
              BPD+AUTISM | +4STD IQ | 🎌 1/2 JP 🎌 | she/her | 19 | MOG QUEEN OF #FROGTWITTER | Noosphere God |
              #teknodiety | #cyberdaoist | ☸️ | DMS OPEN.
            </p>
          </BoxContent>
        </MBox>
        <AudioContainer>
          <audio controls title="Return of ☸️ Miya Black Hearted Cyber Angel Baby ☸️ (61621) [YIFY COMPRESSED EDIT]">
            <source src={'sounds/61621.mp3'} type="audio/mpeg" />
          </audio>
        </AudioContainer>
      </HeaderContainer>
    </>
  )
}
