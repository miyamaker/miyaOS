import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/macro'

import Typewriter from '@/components/Typewriter'
import { load } from '@/store/experience/actions'

const asciiArt: FixedLengthArray<{ content: string; className?: string; chars: number; speed: number }, 48> = [
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
  { content: 'Milady BIOS v1.00', className: 'mobile-none', chars: 1, speed: 30 },
  { content: 'Decentralized for BRG R2 CPU', className: 'mobile-none', chars: 1, speed: 30 },
  { content: 'Processor : BRG Engineering', className: 'mobile-none', chars: 1, speed: 30 },
  { content: '<MilaID:8266>', className: 'mobile-none', chars: 1, speed: 30 },
  { content: 'Random Access Milady : At Least 8', className: 'mobile-none', chars: 1, speed: 30 },
  { content: 'Milady Testing: OK', className: 'mobile-none', chars: 1, speed: 30 },
  {
    content: '                                                                                ',
    className: 'mobile-none',
    chars: 20,
    speed: 0,
  },
  { content: 'IDK Channel 0 Master : RemiliacorpCD/DVDW RE-S14H', className: 'mobile-none', chars: 1, speed: 30 },
  { content: 'Finished searching for IDK drives', className: 'mobile-none', chars: 1, speed: 30 },
  {
    content: '                                                                                ',
    className: 'mobile-none',
    chars: 20,
    speed: 0,
  },
  {
    content: 'System boot finished successfully, press any key to continue...',
    className: 'mobile-none',
    chars: 1,
    speed: 30,
  },
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
  span {
    font-family: monospace !important;
    font-size: 1rem;
  }
  #skipButton::before {
    content: '[Press S to Skip]';
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
  justify-content: center;
  align-items: center;
  .mobile-none {
    display: none!important;
  }
  #skipButton {
    background-color: #000;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    font-size: 1rem;
    padding:1rem;
    text-align: center;
    &::before {
      content: "[Press to Continue]";
    }
  }
  span {
    font-size: 0.5rem;
  }
  `}
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
      font-size: 0.40rem;
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
          <span
            key={`line-${i}`}
            style={{ display: i <= currentLine ? 'block' : 'none' }}
            className={line.className || ''}
          >
            {line.content}
          </span>
        ))}
        {currentLine < asciiArt.length - 1 && (
          <Typewriter
            key={`typewriter-${currentLine + 1}`}
            text={asciiArt[currentLine + 1]?.content || ''}
            className={asciiArt[currentLine + 1]?.className}
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
      <span id="skipButton" onClick={() => close('KeyS')}></span>
    </Row>
  )
}
