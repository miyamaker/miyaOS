import ChevronLeftIcon from 'assets/chevron-left-icon.svg'
import ChevronRightIcon from 'assets/chevron-right-icon.svg'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components/macro'

import { Button } from '@/components/ProductDetail/ImagesList'

const PaginateWrapper = styled.div`
  height: 10%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 0.75rem;

  > * + * {
    margin-left: 1rem;
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

const Counter = styled.div`
  text-align: center;
  font-weight: 900;
`

export default function Pagination({
  totalPages,
  currentPage,
  setCurrentCounter,
}: {
  totalPages: number
  currentPage: number
  setCurrentCounter: (counter: number) => void
}) {
  const previousButtonRef = useRef<HTMLButtonElement>(null)
  const nextButtonRef = useRef<HTMLButtonElement>(null)

  const handleClickButton = (type: string) => {
    let current = currentPage
    if (type === 'next') {
      if (current === 1 && previousButtonRef.current) {
        previousButtonRef.current.disabled = false
      }

      if (current < totalPages) {
        current += 1
        setCurrentCounter(current)
      }

      if (current === totalPages && nextButtonRef.current) {
        nextButtonRef.current.disabled = true
      }

      return
    }

    if (current === totalPages && nextButtonRef.current) {
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
    <PaginateWrapper>
      <Counter>
        {currentPage} of {totalPages}
      </Counter>
      <ButtonContainer>
        <Button ref={previousButtonRef} onClick={() => handleClickButton('previous')}>
          <Icon src={ChevronLeftIcon} alt="Chevron Left Icon" />
        </Button>
        <Button ref={nextButtonRef} onClick={() => handleClickButton('next')}>
          <Icon src={ChevronRightIcon} alt="Chevron Right Icon" />
        </Button>
      </ButtonContainer>
    </PaginateWrapper>
  )
}
