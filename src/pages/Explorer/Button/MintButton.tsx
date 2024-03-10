import styled from 'styled-components/macro'
import BackgroundButton from 'assets/explorer/background/background_button.png'

const Button = styled.button`
  background-color: #ff407d;
  background-image: url(${BackgroundButton});
  background-blend-mode: overlay;
  background-size: 100% 100%;

  width: 30%;
  height: 25%;

  color: white;
  text-shadow: 2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000,
    -1px 1px #000;
  text-transform: uppercase;
  font-size: 0.65rem;

  border-radius: 10px;
  box-shadow: 4px 6px #272526;
`

export default function MintButton({ text }: { text: string }) {
  return <Button>{text}</Button>
}
