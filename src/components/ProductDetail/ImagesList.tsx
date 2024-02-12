import ChevronLeftIcon from 'assets/chevron-left-icon.svg'
import ChevronRightIcon from 'assets/chevron-right-icon.svg'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components/macro'

import ImageWrapper from '@/components/ImageWrapper'

const ImagesListWrapper = styled.div`
  width: 100%;

  @media only screen and (max-width: 640px) {
    width: 40%;
    height: 100%;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 0.75rem;

  > * + * {
    margin-left: 0.5rem;
  }
`

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  background-color: #a9a3c9;
  border: none;
  padding: 0.2rem;
  text-shadow: 0 0 #222;

  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset 1px 1px grey, inset -2px -2px grey,
    inset 1px 1px #dfdfdf;
  &:active {
    box-shadow: inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -1px -1px #dfdfdf, inset 2px 2px #808080;
  }

  &.free-width {
    min-width: auto;
    padding-left: unset;
    padding-right: unset;
  }

  &.free-height {
    min-height: auto;
  }

  &.heavy {
    box-shadow: inset -2px -2px #0a0a0a, inset 1px 1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px grey,
      inset 2px 2px #dfdfdf;
    &:active {
      box-shadow: inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080;
    }
  }

  &:disabled {
    cursor: not-allowed;
    color: #5a5a5a;
    text-shadow: 1px 1px #fff;
    filter: brightness(80%);
    &:active {
      box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset 1px 1px grey, inset -2px -2px grey,
        inset 1px 1px #dfdfdf;
    }
  }
`

const Icon = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  width: 1rem;
  height: 1rem;

  :hover {
    border: none;
  }
`

const Images = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: none;

  > img {
    border: none;
  }

  > img:hover {
    border: none;
  }
`

const Counter = styled.div`
  text-align: center;
  font-size: 0.65rem;
`

export default function ImagesList({ images }: { images: string[] }) {
  const totalImages = images.length
  const previousButtonRef = useRef<HTMLButtonElement>(null)
  const nextButtonRef = useRef<HTMLButtonElement>(null)
  const [currentCounter, setCurrentCounter] = useState<number>(1)

  const handleClickButton = (type: string) => {
    let current = currentCounter
    if (type === 'next') {
      if (current === 1 && previousButtonRef.current) {
        previousButtonRef.current.disabled = false
      }

      if (current < totalImages) {
        current += 1
        setCurrentCounter(current)
      }

      if (current === totalImages && nextButtonRef.current) {
        nextButtonRef.current.disabled = true
      }

      return
    }

    if (current === totalImages && nextButtonRef.current) {
      nextButtonRef.current.disabled = false
    }

    if (current > 1) {
      current -= 1
      setCurrentCounter(current)
    }

    if (current === 1 && previousButtonRef.current) {
      previousButtonRef.current.disabled = true
    }
  }

  useEffect(() => {
    if (previousButtonRef.current) {
      previousButtonRef.current.disabled = true
    }
  }, [])

  return (
    <ImagesListWrapper>
      <ImageWrapper>
        <Images>
          {/*<img src={images[currentCounter - 1]} alt="Images" />*/}
          <img
            src="https://png.pngtree.com/png-clipart/20230511/ourmid/pngtree-isolated-cat-on-white-background-png-image_7094927.png"
            alt="Images"
          />
          <Counter>
            {currentCounter} of {totalImages}
          </Counter>
        </Images>
      </ImageWrapper>
      <ButtonContainer>
        <Button ref={previousButtonRef} onClick={() => handleClickButton('previous')}>
          <Icon src={ChevronLeftIcon} alt="Chevron Left Icon" />
        </Button>
        <Button ref={nextButtonRef} onClick={() => handleClickButton('next')}>
          <Icon src={ChevronRightIcon} alt="Chevron Right Icon" />
        </Button>
      </ButtonContainer>
    </ImagesListWrapper>
  )
}
