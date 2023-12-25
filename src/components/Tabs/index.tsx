import type { ReactNode } from 'react'
import styled from 'styled-components/macro'

const Menu = styled.menu`
  position: relative;
  margin: 0 0 -2px 0;
  text-indent: 0;
  list-style-type: none;
  display: flex;
  padding-left: 3px;

  > li {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    box-shadow: inset -1px 0 #0a0a0a, inset 1px 1px #dfdfdf, inset -2px 0 #808080, inset 2px 2px #ffffff;
    z-index: 1;
    cursor: pointer;
  }

  > li[aria-selected='true'] {
    padding-bottom: 2px;
    margin-top: -2px;
    background-color: #9991c7;
    position: relative;
    z-index: 8;
    margin-left: -3px;
  }

  > li > p {
    display: block;
    color: #222;
    margin: 6px;
    text-decoration: none;
  }
  > li[aria-selected='true'] > a:focus {
    outline: none;
  }
  > li > a:focus {
    outline: 1px dotted #222;
  }

  menu[role='tablist'].multirows > li {
    flex-grow: 1;
    text-align: center;
  }
`

const Window = styled.div`
  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff;
  background: #9991c7;
  padding: 3px;
  position: relative;
  z-index: 2;
`

const WindowBody = styled.div`
  margin: 8px;
`

export default function Tabs({
  active,
  fillWidth,
  fillHeight,
  tabs = [],
  onChange,
}: {
  active: string
  fillWidth: boolean
  fillHeight: boolean
  tabs: { title: string; id: string; children: ReactNode }[]
  onChange: (t: string) => void
}) {
  return (
    <div style={{ width: fillWidth ? '100%' : 'auto', height: fillHeight ? '100%' : 'auto' }}>
      <Menu role="tablist">
        {tabs.map((tab) => (
          <li role="tab" key={tab.id} aria-selected={tab.id === active} onClick={() => onChange(tab.id)}>
            <p>{tab.title}</p>
          </li>
        ))}
      </Menu>
      <Window role="tabpanel" style={{ height: fillHeight ? '100%' : 'auto' }}>
        <WindowBody>{tabs.find((tab) => tab.id === active)?.children}</WindowBody>
      </Window>
    </div>
  )
}
