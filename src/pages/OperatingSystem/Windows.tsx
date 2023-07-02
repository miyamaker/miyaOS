import type { ReactNode, RefObject } from 'react'
import { useEffect, useRef, useState } from 'react'
import type { DraggableData } from 'react-draggable'
import Draggable from 'react-draggable'
import { useDebounce } from 'usehooks-ts'

import { useWindowPosition } from '@/store/windows/hooks'

const DummyWindow = ({
  innerRef,
  children,
  style,
  className,
  onClick,
  onMouseDown,
  onMouseUp,
  onTouchStart,
  onTouchEnd,
}: {
  innerRef?: RefObject<HTMLDivElement>
  children: ReactNode
  style?: React.CSSProperties
  className?: string
  onClick?: () => void
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onMouseUp?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onTouchStart?: (e: React.TouchEvent<HTMLDivElement>) => void
  onTouchEnd?: (e: React.TouchEvent<HTMLDivElement>) => void
}) => {
  return (
    <div
      ref={innerRef}
      style={style}
      className={className}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </div>
  )
}

const DraggableWrapper = ({
  className,
  dragPosition,
  onDragWindow,
  onStopDrag,
  children,
}: {
  className: string
  dragPosition: { x: number; y: number }
  onDragWindow: (x: number, y: number) => void
  onStopDrag: () => void
  children: ReactNode
}) => {
  const handleDrag = (ui: DraggableData) => {
    const { x, y } = dragPosition
    onDragWindow(x + ui.deltaX, y + ui.deltaY)
  }

  const activate = () => {}

  const deactivate = () => {
    onStopDrag()
  }

  return (
    <Draggable
      defaultClassName={`react-draggable ${className}`}
      axis="both"
      handle=".title-bar"
      defaultPosition={{ x: 0, y: 0 }}
      bounds=".bwindow"
      position={dragPosition}
      scale={1}
      onStart={() => activate()}
      onDrag={(_, ui) => handleDrag(ui)}
      onStop={() => deactivate()}
    >
      {children}
    </Draggable>
  )
}

export default function Windows({
  children,
  baseSize,
  onClick,
  mobile,
  minimized,
  identifier = 'program',
  baseDepth = 2000,
}: {
  children: ReactNode
  baseSize: { width: number; height: number }
  onClick: () => void
  mobile?: boolean
  minimized?: boolean
  identifier?: string
  baseDepth?: number
}) {
  // in-component state
  const [dragPosition, setDragPosition] = useState<{ x: number; y: number } | undefined>()
  const debouncedDragPosition = useDebounce(dragPosition, 5_000)

  useEffect(() => {
    if (dragPosition && (dragPosition.x < 0 || dragPosition.y < 0)) {
      setDragPosition({ x: 0, y: 0 })
    }
  }, [minimized])
  // global state (redux w/ localstorage)
  const [position, updatePosition] = useWindowPosition(identifier)

  // after a debounce of 5 seconds, update the global state
  useEffect(() => {
    if (!debouncedDragPosition) return
    updatePosition(debouncedDragPosition.x, debouncedDragPosition.y)
  }, [debouncedDragPosition])

  const ref = useRef<HTMLDivElement>(null)
  const [initialized, setInitialized] = useState(false)

  const [dummyWindowsArray, setdummyWindowsArray] = useState<{ x: number; y: number; i: number }[]>([])

  const cleanUp = (length: number) => {
    if (dummyWindowsArray.length > length) {
      const reducedArr = dummyWindowsArray
      reducedArr.shift()
      setdummyWindowsArray([...reducedArr])
    }
  }

  const moveIt = (x: number, y: number) => {
    setDragPosition({ x, y })
    const lastWindow = dummyWindowsArray[dummyWindowsArray.length - 1]
    if (dummyWindowsArray.length < 100)
      setdummyWindowsArray((prev) => [...prev, { x: x + 5, y: y + 5, i: lastWindow ? lastWindow.i + 1 : 1 }])
    cleanUp(500)
  }

  const clearTrial = (timeout?: number) => {
    const timer = setInterval(() => {
      cleanUp(0)
      if (dummyWindowsArray.length === 0) {
        clearInterval(timer)
      }
    }, timeout || 10)
  }

  useEffect(() => {
    if (!initialized && position) {
      setInitialized(true)
      setDragPosition(position)
    }
  }, [position])

  return position && dragPosition ? (
    <>
      <DraggableWrapper
        className={[mobile ? 'fullscreen' : '', minimized ? 'minimized' : ''].filter(Boolean).join(' ')}
        dragPosition={mobile ? { x: 0, y: 0 } : dragPosition}
        onDragWindow={(x, y) => moveIt(x, y)}
        onStopDrag={() => {
          clearTrial()
        }}
      >
        <DummyWindow
          innerRef={ref}
          onClick={onClick}
          style={{
            height: mobile ? 'auto' : baseSize.height,
            width: mobile ? 'auto' : baseSize.width,
            position: 'absolute',
            pointerEvents: 'all',
            zIndex: baseDepth + 101,
            visibility: initialized ? 'visible' : 'hidden',
            overflow: 'hidden',
          }}
        >
          {children}
        </DummyWindow>
      </DraggableWrapper>
      {!mobile &&
        dummyWindowsArray.map((element, i) => {
          return (
            <DummyWindow
              key={`${identifier}-trail-${i}`}
              style={{
                position: 'absolute',
                height: mobile ? 'auto' : baseSize.height,
                width: mobile ? 'auto' : baseSize.width,
                zIndex: baseDepth + i,
                transform: `translateX(${element.x}px) translateY(${element.y}px)`,
                userSelect: 'none',
                pointerEvents: 'none',
                visibility: initialized ? 'visible' : 'hidden',
                overflow: 'hidden',
              }}
            >
              {children}
            </DummyWindow>
          )
        })}
    </>
  ) : (
    <div style={{ visibility: 'hidden' }}>{children}</div>
  )
}
