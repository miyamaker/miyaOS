import BackgroundButton from 'assets/explorer/background/background_button.png'
import styled from 'styled-components/macro'

const Button = styled.button`
  background-color: #f36391;
  background-image: url(${BackgroundButton});
  background-blend-mode: overlay;
  background-size: 100% 100%;
  cursor: pointer;

  width: 30%;
  height: 25%;

  color: white;
  text-shadow: 2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000,
    -1px 1px #000;
  text-transform: uppercase;
  font-size: 0.65rem;

  border: none;
  border-radius: 10px;
  box-shadow: 4px 6px #272526;

  :hover {
    filter: brightness(120%);
  }
  :disabled {
    cursor: not-allowed;
    filter: brightness(60%);
  }
`

export default function MintButton({
  disabled,
  text,
  className,
  onClick,
}: {
  disabled?: boolean
  text: string
  className?: string
  onClick?: () => void
}) {
  return (
    <Button disabled={disabled} className={className} onClick={onClick}>
      {text}
    </Button>
  )
}
