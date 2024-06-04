import BackgroundButton from 'assets/explorer/background/background_button.png'
import styled from 'styled-components/macro'

const Button = styled.button`
  background-color: #f36391;
  background-image: url(${BackgroundButton});
  background-blend-mode: overlay;
  background-size: 100% 100%;

  width: 5.5rem;
  height: 5.5rem;

  color: white;
  text-shadow: 2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000,
    -1px 1px #000;
  text-transform: uppercase;
  font-size: 0.65rem;

  border: none;
  border-radius: 50%;
  box-shadow: 4px 2px #272526;
  cursor: pointer;

  :hover {
    filter: brightness(120%);
  }
`

export default function BackButton({ text, handleClick }: { text: string; handleClick: () => void }) {
  return <Button onClick={handleClick}>{text}</Button>
}
