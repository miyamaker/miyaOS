import ShadertoyReact from 'shadertoy-react'
import styled from 'styled-components/macro'
import { useEnsName } from 'wagmi'

import { useAccount } from '@/context/AccountProvider'
import { useWaves } from '@/store/experience/hooks'

// import { fs } from './webgl'
import { fs } from './webgl'

const GradientBlock = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 5;
  top: 0;
  left: 0;
  background-image: linear-gradient(to bottom, #6873d3, #7c6ba0 45%, rgba(0, 0, 0, 0));
`

const ButtonContainer = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: end;
  bottom: 0;
  padding: 1rem;
  margin-bottom: 30px;

  button {
    font-family: inherit;
  }
`

const BackgroundStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background-color: #85669f;
`

const OSInfo = styled.div`
  color: white;
  text-align: right;
`

export default function Background() {
  const [waves] = useWaves()
  const { account, balance } = useAccount()
  const ens = useEnsName({ address: account?.address })

  return (
    <BackgroundStyled>
      <ButtonContainer>
        <OSInfo>
          <p>MiyaOS</p>
          <p>Version 1.0.0</p>
          {account?.isConnected && (
            <>
              {ens.data && <p>{ens.data}</p>}
              {balance && <p>{Number(balance.formatted).toFixed(3)} ETH</p>}
            </>
          )}
        </OSInfo>
      </ButtonContainer>
      <GradientBlock />
      {/* render the shader only if the user has enabled it */}
      {waves && (
        <ShadertoyReact fs={fs} devicePixelRatio={0.5} style={{ opacity: 0.1, position: 'relative', zIndex: 1 }} />
      )}
    </BackgroundStyled>
  )
}
