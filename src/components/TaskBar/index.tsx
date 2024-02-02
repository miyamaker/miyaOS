import Waves from 'assets/waves.png?preset=icon&resize=true'
import WavesBw from 'assets/waves_bw.png?preset=icon&resize=true'
import styled from 'styled-components/macro'

import Pages from '@/constants/pages'
import { useAccount } from '@/context/AccountProvider'
import { useWaves } from '@/store/experience/hooks'

import { ButtonIcon, HighlightButton } from '../Button'
import { VerticalSeparator } from '../Separator'

const NoScroll = styled.div`
  overflow: hidden;
`

const TaskBarStyled = styled.div`
  position: relative;
  z-index: 10;
  background-color: #a9a3c9;
  height: 30px;
  padding: 2px 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  font-weight: 600;
  box-shadow: 0 0 0px 1px white, 0 1px 0px 1px #a9a3c9;
  overflow: auto;
  margin-top: 2px;
`

const Row = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  height: 100%;
`

const ButtonContainer = styled.div`
  height: 100%;
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  gap: 3px;
  align-items: start;
`

const InsetContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: end;
  height: 100%;
  padding: 0 4px;
  box-shadow: inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -1px -1px #dfdfdf, inset 2px 2px #808080;
  font-size: 12px;
`

const BlockNumber = styled.div`
  padding: 0 8px 0 12px;
`

export default function TaskBar({
  active,
  focus,
  onClick,
  toggleBottomBar, // Add this prop
}: {
  active: string[]
  focus: string | undefined
  onClick: (id: string) => void
  toggleBottomBar: () => void // Add this prop type
}) {
  const [waves, toggleWaves] = useWaves()
  const { block } = useAccount()

  return (
    <NoScroll>
      <TaskBarStyled>
        <HighlightButton
          onClick={toggleBottomBar}
          className="free-height free-width"
          style={{ height: '100%', paddingLeft: 6, paddingRight: 10 }}
        >
          <span style={{ marginTop: -1 }}>🖤 Start</span>
        </HighlightButton>
        <Row>
          <VerticalSeparator />

          <ButtonContainer>
            {active.map((id) => {
              const page = Pages[id]!
              return (
                <HighlightButton
                  key={`${id}-taskbar`}
                  className={`free-height free-width ${focus === id ? 'focus-taskbar' : ''}`}
                  style={{ height: '100%', paddingLeft: 6, paddingRight: 10 }}
                  onClick={() => onClick(id)}
                >
                  <img
                    src={page.icon?.src}
                    srcSet={page.icon?.srcset}
                    sizes="(min-width: 1px) 16px, 60px"
                    width={16}
                    height={16}
                    style={{ minWidth: 16, width: 16, border: 'none' }}
                    alt=""
                  />
                  {page.label}
                </HighlightButton>
              )
            })}
          </ButtonContainer>
        </Row>

        <Row>
          <VerticalSeparator />
          <InsetContainer>
            <ButtonIcon onClick={() => toggleWaves()}>
              <img
                src={waves ? Waves[0]?.src : WavesBw[0]?.src}
                srcSet={waves ? Waves[0]?.srcset : WavesBw[0]?.srcset}
                sizes="(min-width: 1px) 16px, 60px"
                width={16}
                height={16}
                style={{ minWidth: 16, width: 16, border: 'none' }}
                alt=""
              />
            </ButtonIcon>
            {block && <BlockNumber>{block}</BlockNumber>}
          </InsetContainer>
        </Row>
      </TaskBarStyled>
    </NoScroll>
  )
}
