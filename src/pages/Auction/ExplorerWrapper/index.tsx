import type { CSSProperties, ReactNode } from 'react'
import styled from 'styled-components/macro'

const Wrapper = styled.fieldset`
  display: flex;
  border: 1px solid #fff;
  box-shadow: rgb(128, 128, 128) 0 0 0 1.5px;
  padding: 0.5rem 1.5rem 1rem 1.5rem;

  > legend {
    font-size: 0.75rem;
    display: flex;

    > div:nth-child(odd) {
      cursor: pointer;

      :hover {
        color: blue;
      }
    }

    > * + * {
      margin-left: 0.5rem;
    }
  }

  * {
    font-family: 'W95FA', sans-serif;
    letter-spacing: 1px;
  }
`

export default function ExplorerWrapper({
  style,
  title,
  setPageSection,
  children,
}: {
  style?: CSSProperties
  title: string
  setPageSection?: (section: string) => void
  children: ReactNode
}) {
  const handleClick = (item: string) => {
    if (setPageSection) setPageSection(item)
  }

  const renderTitle = () => {
    const titleSeparate = title.split('>').map((item) => item.trim())
    if (titleSeparate.length < 2) return <legend style={{ backgroundColor: '#a9a3c9' }}>{title}</legend>

    return (
      <legend style={{ backgroundColor: '#a9a3c9' }}>
        {titleSeparate.map((item, index) => {
          if (index === titleSeparate.length - 1) return <div key={index}>{item}</div>
          return (
            <>
              <div key={index} onClick={() => handleClick(item)}>
                {item}
              </div>
              <div> &gt; </div>
            </>
          )
        })}
      </legend>
    )
  }

  return (
    <Wrapper style={style}>
      {renderTitle()}
      {children}
    </Wrapper>
  )
}
