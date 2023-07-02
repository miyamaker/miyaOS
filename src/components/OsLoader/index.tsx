import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/macro'

import Typewriter from '@/components/Typewriter'
import { load } from '@/store/experience/actions'

const asciiArt: FixedLengthArray<{ content: string; chars: number; speed: number }, 48> = [
  { content: '                             .-=+*#%%@@@@@@%%#*+=-:                             ', chars: 6, speed: 0 },
  { content: '                       .-=*%@@@@@@@@@@@@@@@@@@@@@@@@@#+-.                       ', chars: 6, speed: 0 },
  { content: '                    :+#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*-                    ', chars: 6, speed: 0 },
  { content: '                 -*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#=.                ', chars: 6, speed: 0 },
  { content: '              :*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#-              ', chars: 6, speed: 0 },
  { content: '            -%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@=            ', chars: 6, speed: 0 },
  { content: '          -%@@@@@@@@@@@@@@@@@@%=::-+%@@@@@*=:..-=#@@@@@@@@@@@@@@@@@@%=          ', chars: 6, speed: 0 },
  { content: '        .#@@@@@@@@@@@@@@@@@@%:       .+@-         +@@@@@@@@@@@@@@@@@@@%:        ', chars: 6, speed: 0 },
  { content: '       =@@@@@@@@@@@@@@@@@@@@                      :@@@@@@@@@@@@@@@@@@@@@*       ', chars: 6, speed: 0 },
  { content: '      *@@@@@@@@@@@@@@@@@@@@@                      #@@@@@@@@@@@@@@@@@@@@@@#.     ', chars: 6, speed: 0 },
  { content: '    .%@@@@@@@@@@@@@@@@@@@@@@%.                   +@@@@@@@@@@@@@@@@@@##*@@@@:    ', chars: 6, speed: 0 },
  { content: '   .%@@@@@@@@@@@@@@@@@@@@@@@@@+                .%@@@@@@@@@@@@@@@@@=:  -@@@@@:   ', chars: 6, speed: 0 },
  { content: '   #@@@@@@@@@@@@@@@@@@@@@@@@@@@@+.            +@@@@@@@@@@@@@@@@%%=    :@@@@@%   ', chars: 6, speed: 0 },
  { content: '  +@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#-        +@@@@@@@@@@@@@@@@@* .      @@@@@@#  ', chars: 6, speed: 0 },
  { content: ' :@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%-    :%@@@@@@@@@@@@@@@@=.        .%@@@@@@= ', chars: 6, speed: 0 },
  { content: ' %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%. +@@@@@@@@@@@@@@@%=     . :.+.-*@@@@@@@ ', chars: 6, speed: 0 },
  { content: ':@@@@@@%++=*+####%@@@@@@@@@@@@@@@@@@@@@@%@@@@@@@@@@@@@%*-.     .*+@%@@%%@@@@@@@-', chars: 6, speed: 0 },
  { content: '*@@@@@@*         -*##%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%-.     :+#@@@@@@*.=@@@@@@@*', chars: 6, speed: 0 },
  { content: '%@@@@@@+            .:.=#*#@@@@@@@@@@@@@@@@@@@@@@@#=      :*@@@@@-  *@@+@@@@@@@%', chars: 6, speed: 0 },
  { content: '@@@@@@@*..= -            . :---*@%@@@@@@@@@@@@@#+:      :+@@@@- .   .@@@@@@@@@@@', chars: 6, speed: 0 },
  { content: '@@@@@@@%=**#**--===--..         =+%@@@@@@@@@%*=        .#@@@@%      +@@@@@@@@@@@', chars: 6, speed: 0 },
  { content: '%@@@@@@@@@@@@@@@@@@@@@#+=:         :##%@#%@@+.        .*@@@@@@%+.. .%*#@@@@@@@@%', chars: 6, speed: 0 },
  { content: '*@@@@@@#@@@@@@@@@@@@@@%*@%+.          .  :=-         .+@@@@@@@@@@@==#*@@@@@@@@@*', chars: 6, speed: 0 },
  { content: '-@@@@@@@@@@@@%%@@@@%..: =@@@*.                       .@@@@@@%%@%#=+*+@@@@@@@@@@=', chars: 6, speed: 0 },
  { content: ' %@@@@@%#@@@@@%@@@@@@==:*@@@%@*                      =@@@@@@#%%*-=*#@%-@@@@@@@@ ', chars: 6, speed: 0 },
  { content: ' -@@@@@@#@@@@@@%@@@@@*#%@#*@.-%%:                    #%%@%@#*=-+*%@#: -@@@@@@@+ ', chars: 6, speed: 0 },
  { content: '  *@@@@@##@@@@@%#+++--**=-+%   +%+                   @+ :+#####*=:.   *@@@@@@%  ', chars: 6, speed: 0 },
  { content: '   %@@@@@:#@%#%%@%=-  :--#%:     +#:                 *.              .%@@@@@@.  ', chars: 6, speed: 0 },
  { content: '   .@@@@@* :+%*=-:.:-+#%%+.       .*:                                =@@@@@@:   ', chars: 6, speed: 0 },
  { content: '    .%@@@%.   .:=+++++-.                                             *@@@@@:    ', chars: 6, speed: 0 },
  { content: '      #@@@-                                                         .@@@@%.     ', chars: 6, speed: 0 },
  { content: '       +@@*                                                         -@@@#       ', chars: 6, speed: 0 },
  { content: '        :%@.                                    -:                  %@%-        ', chars: 6, speed: 0 },
  { content: '          =-                                    :=                 .@+          ', chars: 6, speed: 0 },
  { content: '                                                :                  .            ', chars: 6, speed: 0 },
  { content: '                                                                                ', chars: 20, speed: 0 },
  { content: '                                                                                ', chars: 20, speed: 0 },
  { content: 'Milady BIOS v1.00', chars: 1, speed: 30 },
  { content: 'Decentralized for BRG R2 CPU', chars: 1, speed: 30 },
  { content: 'Processor : BRG Engineering', chars: 1, speed: 30 },
  { content: '<MilaID:8266>', chars: 1, speed: 30 },
  { content: 'Random Access Milady : At Least 8', chars: 1, speed: 30 },
  { content: 'Milady Testing: OK', chars: 1, speed: 30 },
  { content: '                                                                                ', chars: 20, speed: 0 },
  { content: 'IDK Channel 0 Master : RemiliacorpCD/DVDW RE-S14H', chars: 1, speed: 30 },
  { content: 'Finished searching for IDK drives', chars: 1, speed: 30 },
  { content: '                                                                                ', chars: 20, speed: 0 },
  { content: 'System boot finished successfully, press any key to continue...', chars: 1, speed: 30 },
]

const Row = styled.div`
  z-index: ${99_000};
  background-color: #000;
  color: #fff;
  font-family: monospace !important;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 1rem;
  s span {
    font-family: monospace !important;
    font-size: 1rem;
    ${({ theme }) => theme.mediaWidth.upToMedium`
      font-size: 2rem;
    `}
  }
`

const Container = styled.pre`
  display: flex;
  flex-direction: column;
  margin: 0;
  justify-content: end;
  > span {
    font-family: monospace !important;
    font-size: 1rem;
    ${({ theme }) => theme.mediaWidth.upToMedium`
      font-size: 2rem;
    `}
  }
`

export default function OsLoader() {
  const [booted, setBooted] = useState(false)
  const [currentLine, setLine] = useState(-1)
  const dispatch = useDispatch()

  const close = (code?: string) => {
    if (code === 'KeyS') {
      dispatch(load())
      return
    }

    if (booted) {
      dispatch(load())
    }
  }

  // we assign a key to the typewriter component so that it remounts when the line changes
  return (
    <Row onKeyDownCapture={(e) => close(e.code)} tabIndex={0} onClick={() => close()}>
      <Container>
        {asciiArt.map((line, i) => (
          <span key={`line-${i}`} style={{ display: i <= currentLine ? 'block' : 'none' }}>
            {line.content}
          </span>
        ))}
        {currentLine < asciiArt.length - 1 && (
          <Typewriter
            key={`typewriter-${currentLine + 1}`}
            text={asciiArt[currentLine + 1]?.content || ''}
            charsPerTick={asciiArt[currentLine + 1]?.chars}
            speed={asciiArt[currentLine + 1]?.speed}
            onFinished={() => {
              if (currentLine === asciiArt.length - 2) {
                setBooted(true)
              }

              setLine((prev) => prev + 1)
            }}
          />
        )}
      </Container>
      <span onClick={() => close('KeyS')}>[Press S to Skip]</span>
    </Row>
  )
}
