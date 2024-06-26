import ChevronLeftIcon from 'assets/chevron-left-icon.svg'
import ChevronRightIcon from 'assets/chevron-right-icon.svg'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components/macro'

import { NormalButton } from '@/components/Button/NormalButton'
import ImageWrapper from '@/pages/Auction/ImageWrapper'

const ImagesListWrapper = styled.div`
  width: 100%;

  @media only screen and (max-width: 640px) {
    width: 60%;
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
  width: 100%;
  height: 90%;
  border: none;

  > img {
    border: none;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
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
          <img src={images[currentCounter - 1]} alt="Images" />
        </Images>
        <Counter>
          {currentCounter} of {totalImages}
        </Counter>
      </ImageWrapper>
      <ButtonContainer>
        <NormalButton ref={previousButtonRef} onClick={() => handleClickButton('previous')}>
          <Icon src={ChevronLeftIcon} alt="Chevron Left Icon" />
        </NormalButton>
        <NormalButton ref={nextButtonRef} onClick={() => handleClickButton('next')}>
          <Icon src={ChevronRightIcon} alt="Chevron Right Icon" />
        </NormalButton>
      </ButtonContainer>
    </ImagesListWrapper>
  )
}
