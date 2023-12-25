import { useState } from 'react'

import ProgressBar from '@/components/ProgressBar'
import Radio from '@/components/Radio'
import Select from '@/components/Select'
import Slider from '@/components/Slider'
import Tabs from '@/components/Tabs'
import TitleBar from '@/components/TitleBar'
import WindowWrapper from '@/components/WindowWrapper'
import Pages from '@/constants/pages'
import { useAppDispatch } from '@/store/hooks'
import { closeWindow, minimizeWindow } from '@/store/windows/actions'
import { useFullscreen } from '@/store/windows/hooks'
import type { PageKey } from '@/store/windows/reducer'

const page = Pages.components
const pageId = page?.id as PageKey

export default function MintPage() {
  const [fullscreen, toggleFullscreen] = useFullscreen(pageId)
  const dispatch = useAppDispatch()
  const close = () => dispatch(closeWindow({ value: pageId }))
  const minimize = () => dispatch(minimizeWindow({ value: pageId }))

  const [slider, setSlider] = useState('0')
  const [select, setSelect] = useState('1')
  const [radio, setRadio] = useState(false)
  return (
    <WindowWrapper>
      <TitleBar
        closeBtn
        onClose={(e) => {
          if (e.cancelable) e.stopPropagation()
          close()
        }}
        fullscreen={fullscreen}
        fullscreenBtn
        onFullscreen={() => toggleFullscreen()}
        minimizeBtn
        onMinimize={(e) => {
          if (e.cancelable) e.stopPropagation()
          minimize()
        }}
      >
        {page?.label}
      </TitleBar>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '0.5rem', gap: '1rem' }}>
        <ProgressBar width={17} />
        <Slider
          value={slider}
          onChange={(e) => {
            setSlider(e.target.value)
          }}
        />
        <Select
          options={[
            { value: '1', label: '1' },
            { value: '2', label: '2' },
          ]}
          value={select}
          onChange={(e) => setSelect(e.target.value)}
        />
        <Radio checked={radio} onChange={(e) => setRadio(e.target.value === 'on')} />
        <Tabs>a</Tabs>
      </div>
    </WindowWrapper>
  )
}
