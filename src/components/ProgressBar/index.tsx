import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { setInterval } from 'timers'

const ProgressBarOuter = styled.div`
  height: 32px;
  position: relative;
  box-shadow: inset -2px -2px #dfdfdf, inset 2px 2px #808080;
  padding: 4px 4px;
  border: none;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0;
`

const Indicator = styled.span`
  display: block;
  height: 100%;
  background-color: transparent; /* resets the background color which is set to blue in the non-segmented selector */
  background-image: linear-gradient(90deg, #e901b7 0 16px, transparent 0 2px);
  background-repeat: repeat;
  background-size: 18px 100%;
`

export default function ProgressBar({ width = 0 }: { width: number }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timeout = setInterval(() => {
      setCurrent((prev) => {
        if (prev >= width) {
          clearInterval(timeout)
          return prev
        }

        return prev + 1
      })
    }, 100)
  }, [width])

  return (
    <ProgressBarOuter>
      <Indicator style={{ width: `${current}%` }} />
    </ProgressBarOuter>
  )
}
