import React, { useMemo } from 'react'
import type { TextProps as TextPropsOriginal } from 'rebass'
import { Text } from 'rebass'
import type { DefaultTheme } from 'styled-components/macro'
import styled, { createGlobalStyle, css, ThemeProvider as StyledComponentsThemeProvider } from 'styled-components/macro'

import type { Colors } from './styled'

type TextProps = Omit<TextPropsOriginal, 'css'>

export const MEDIA_WIDTHS = {
  upToExtraSmall: 640,
  upToSmall: 768,
  upToMedium: 1024,
  upToLarge: 1280,
  upToExtraLarge: 1536,
}

// Migrating to a standard z-index system https://getbootstrap.com/docs/5.0/layout/z-index/
// Please avoid using deprecated numbers
export enum ZIndex {
  deprecated_zero = 0,
  deprecated_content = 1,
  dropdown = 1000,
  sticky = 1020,
  fixed = 1030,
  modalBackdrop = 1040,
  offcanvas = 1050,
  modal = 1060,
  popover = 1070,
  tooltip = 1080,
}

const mediaWidthTemplates = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
  ;(accumulator as Record<string, unknown>)[size] = (a: any, b: any, c: any) => css`
    @media (max-width: ${MEDIA_WIDTHS[size as keyof typeof MEDIA_WIDTHS]}px) {
      ${css(a, b, c)}
    }
  `
  return accumulator
}, {}) as { [width in keyof typeof MEDIA_WIDTHS]: typeof css }

const white = '#FFFFFF'
const black = '#000000'

function colors(darkMode: boolean): Colors {
  return {
    darkMode,
    white,
    black,
    bgGreen: '#ffffee',

    // backgrounds / greys
    neutral0: '#FFF',
    neutral100: '#F1F4F9',
    neutral200: '#E2E8F0',
    neutral300: '#CBD5E0',
    neutral500: '#8496AE',
    neutral600: '#68778D',
    neutral700: '#4A5568',
    neutral900: '#202327',
  }
}

function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    // media queries
    mediaWidth: mediaWidthTemplates,

    padding: {
      global: {
        horizontal: {
          xs: '8px',
          sm: '12px',
          md: '24px',
          lg: '20px',
        },
        vertical: {
          xs: '8px',
          sm: '12px',
          md: '24px',
          lg: '20px',
        },
      },
    },
    // radius
    cardRadius: '12px',
    pillRadius: '999px',

    // css snippets
    backdrop: css`
      backdrop-filter: blur(10px);
    `,
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = false

  const themeObject = useMemo(() => theme(darkMode), [darkMode])

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`

/**
 * Preset styles of the Rebass Text component
 */
export const ThemedText = {
  Body(props: TextProps) {
    return <TextWrapper fontSize="14px" fontWeight={400} color={'neutral900'} {...props} />
  },
  Header(props: TextProps) {
    return <TextWrapper fontSize="24px" fontWeight={500} color={'neutral900'} {...props} />
  },
  SubHeader(props: TextProps) {
    return <TextWrapper fontSize="18px" fontWeight={500} color={'neutral900'} {...props} />
  },
  Title(props: TextProps) {
    return <TextWrapper fontSize="14px" fontWeight={500} color={'neutral900'} {...props} />
  },
  Subtitle(props: TextProps) {
    return <TextWrapper fontSize="12px" fontWeight={500} color={'neutral900'} {...props} />
  },
  Small(props: TextProps) {
    return <TextWrapper fontSize="12px" fontWeight={400} color={'neutral900'} {...props} />
  },
  Helper(props: TextProps) {
    return <TextWrapper fontSize="12px" fontWeight={400} color={'neutral500'} {...props} />
  },
  Label(props: TextProps) {
    return <TextWrapper fontSize="10px" fontWeight={500} color={'neutral900'} {...props} />
  },
  Link(props: TextProps) {
    return <TextWrapper fontSize="12px" fontWeight={500} color={'primary2'} {...props} />
  },
}

export const ThemedGlobalStyle = createGlobalStyle`


* {
  box-sizing: border-box;
  font-family: 'Hiragino Kaku Gothic Pro W3', Osaka, Meiryo, 'MS PGothic', arial, helvetica, clean, sans-serif;
}

html {
  color: ${({ theme }) => theme.neutral900};
  background-repeat: no-repeat;
  height: 100%;
  //max-width: 43em;
}
body {
  margin: 0;
  z-index: 0;
  position: relative;
  // font-size: 1.2em;
  margin: auto;
  background-attachment: fixed;
  
}

h1,h2,h3,h4,h5,h6 {
  margin: 0;
}
p{
  margin: 0.5rem;
}

h2 {
  font-size: 1.1rem;
}

img {
  display: block;
  margin: auto;
  width: 100%;
  max-width: 20rem;
  border: 1px solid #777;
}

img:hover {
  border: 1px solid purple;
}
`
