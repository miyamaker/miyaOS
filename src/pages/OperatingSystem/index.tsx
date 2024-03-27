/* eslint-disable @typescript-eslint/no-non-null-assertion */
import MiyaLogo from 'assets/134321870.png'
import Folder from 'assets/folder.png?preset=thumbnail&resize=true'
import FolderOpen from 'assets/folder_open.png?preset=thumbnail&resize=true'
import CreateNew from 'assets/miyamints1.png?preset=thumbnail&resize=true'
import { debounce } from 'lodash'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'
import { useWindowSize } from 'usehooks-ts'

import CustomBottomBar from '@/components/CustomBottomBar'
import DynamicWrapper from '@/components/DynamicWrapper'
import OsLoader from '@/components/OsLoader'
import TaskBar from '@/components/TaskBar'
import Pages from '@/constants/pages'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { minimizeWindow, openWindow, setToFront } from '@/store/windows/actions'
import { useWindows } from '@/store/windows/hooks'
import type { PageKey } from '@/store/windows/reducer'
import getMediaKey from '@/utils/getMediaKey'

import Background from './Background'
import DesktopIcon from './DesktopIcon'
import FourthWall from './FourthWall'
import Windows from './Windows'

const Foreground = styled.div`
  position: relative;
  z-index: 1;
  height: calc(100svh - 32px);
  pointer-events: none;
  * {
    pointer-events: auto;
  }
`

const WindowContainer = styled.div<{ mobile?: boolean }>`
  position: absolute;
  z-index: 1000;
  height: 100%;
  width: 100%;
  pointer-events: none;
  > * {
    pointer-events: auto;
  }
  > .fullscreen {
    transform: translate(0, 0) !important;
    width: 100% !important;
    height: 100% !important;
  }

  > .minimized {
    display: none;
  }

  ${({ mobile }) =>
    mobile &&
    `
  > .react-draggable {
    transform: translate(0, 0) !important;
    width: 100% !important;
    height: 100% !important;
  }
  `}
`

const Icons = styled.div`
  position: relative;
  z-index: 999;
  height: 100%;
  width: 100%;
  pointer-events: none;
  * {
    pointer-events: auto;
  }
`

// const ComponentPage = Pages.components
const UploaderPage = Pages.uploader
const ManagePage = Pages.manager
const AuctionPage = Pages.auction
const ExplorerPage = Pages.explorer

export default function OperatingSystem() {
  const [bottomBarVisible, setBottomBarVisible] = useState(false)
  const location = useLocation()
  /* Responsiveness stuff */
  const { width, height } = useWindowSize()
  const [, isMobile] = useMemo(() => {
    const result = getMediaKey(width)
    return [result, ['upToExtraSmall', 'upToSmall'].includes(result)]
  }, [width])

  /* Redux stuff */
  const dispatch = useAppDispatch()
  const [windows, zindex, fullScreen, minimized] = useWindows()
  const firstLoad = useAppSelector((state) => state.experience.firstLoad)

  const handleOpen = (id: string) => {
    if (windows.includes(id)) {
      dispatch(setToFront({ value: id }))
      return
    }

    const page = Pages[id]
    if (!page) return
    dispatch(
      openWindow({
        value: id,
        position: { x: width / 2 - page.minSize.width / 2, y: height / 2 - page.minSize.height / 2 },
      })
    )
  }

  const handleToggleBottomBar = debounce(() => {
    setBottomBarVisible((prevVisible) => !prevVisible)
  }, 300) // Adjust the debounce time as needed

  useEffect(() => {
    const page = Object.values(Pages).find((p) => p.path === location.pathname)
    if (!page || !width) return
    if (!windows.includes(page.id)) {
      handleOpen(page.id)
      return
    }

    const index = zindex.indexOf(page.id)
    if (index !== zindex.length - 1 || index === -1) {
      dispatch(setToFront({ value: page.id }))
    }
  }, [location, width])

  const handleTaskbar = (id: string) => {
    if (minimized.includes(id) || zindex[zindex.length - 1] !== id) {
      dispatch(setToFront({ value: id }))
      return
    }

    dispatch(minimizeWindow({ value: id }))
  }

  const MemoizedWindows = useMemo(() => {
    return windows.map((window) => {
      const page = Pages[window]!
      return (
        <Fragment key={`${window}-window`}>
          <Windows
            minimized={minimized.includes(window)}
            mobile={isMobile || fullScreen.includes(window)}
            baseDepth={zindex.indexOf(window) * 1000 + 2000}
            identifier={window}
            baseSize={page.minSize}
            onClick={() => zindex.indexOf(window) !== zindex.length - 1 && dispatch(setToFront({ value: window }))}
          >
            <DynamicWrapper identifier={window} />
          </Windows>
        </Fragment>
      )
    })
  }, [windows, zindex, fullScreen, isMobile, minimized])

  return (
    <div className="bwindow" style={{ height: '100%', overflow: 'hidden', position: 'relative', zIndex: 0 }}>
      <Helmet>
        {zindex[zindex.length - 1] ? (
          <title>🖤{Pages[zindex[zindex.length - 1] || '']?.label}🖤</title>
        ) : (
          <title>🖤🖤🖤🖤🖤🖤🖤🖤🖤🖤🖤🖤</title>
        )}
      </Helmet>
      {firstLoad && <OsLoader />}
      <Background />
      <Foreground>
        <WindowContainer mobile={isMobile}>{MemoizedWindows}</WindowContainer>
        <Icons>
          <div
            style={{
              zIndex: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
              padding: '1rem',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '0 0', gap: '2rem' }}>
                <DesktopIcon normalState={MiyaLogo} onClick={() => handleOpen(ExplorerPage?.id as PageKey)}>
                  MiyaNet
                  <br />
                  Explorer
                </DesktopIcon>
                <DesktopIcon
                  normalState={UploaderPage?.icon?.src}
                  onClick={() => handleOpen(UploaderPage?.id as PageKey)}
                >
                  {UploaderPage?.label}
                </DesktopIcon>
                <DesktopIcon normalState={ManagePage?.icon?.src} onClick={() => handleOpen(ManagePage?.id as PageKey)}>
                  {' '}
                  {ManagePage?.label}{' '}
                </DesktopIcon>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', padding: '0 0', gap: '2rem' }}>
                <DesktopIcon
                  normalState={CreateNew[0]?.src}
                  onClick={() => handleOpen('mint')}
                  realignment={'0 -10px 0 0'}
                >
                  MiyaMints.exe
                </DesktopIcon>
                {/*
                <DesktopIcon
                  normalState={ComponentPage?.icon?.src}
                  onClick={() => handleOpen(ComponentPage?.id as PageKey)}
                >
                  {ComponentPage?.label}
                </DesktopIcon>
                */}
                <DesktopIcon normalState={Folder[0]?.src} hoverState={FolderOpen[0]?.src} onClick={() => null}>
                  My collections
                </DesktopIcon>
                <DesktopIcon
                  normalState={AuctionPage?.icon?.src}
                  onClick={() => handleOpen(AuctionPage?.id as PageKey)}
                >
                  {AuctionPage?.label}
                </DesktopIcon>
              </div>
            </div>
          </div>
          {bottomBarVisible && (
            <CustomBottomBar
              bottomBarVisible={bottomBarVisible}
              setSelected={(selectedItem) => console.log(`Selected: ${selectedItem}`)}
            />
          )}
        </Icons>
      </Foreground>
      <TaskBar
        active={windows}
        focus={zindex[zindex.length - 1]}
        onClick={(id) => handleTaskbar(id)}
        toggleBottomBar={handleToggleBottomBar} // Pass the toggle function to TaskBar
      />
      <FourthWall />
    </div>
  )
}
