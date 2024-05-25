import type { ReactNode } from 'react'

import TitleBar from '@/components/TitleBar'
import WindowWrapper from '@/components/WindowWrapper'

export default function NotificationWindow({
  notificationLabel,
  handleClose,
  children,
}: {
  notificationLabel: string
  handleClose: () => void
  children: ReactNode
}) {
  return (
    <WindowWrapper>
      <TitleBar
        closeBtn
        onClose={(e) => {
          if (e.cancelable) e.stopPropagation()
          handleClose()
        }}
      >
        {notificationLabel}
      </TitleBar>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0.5rem',
          gap: '1rem',
          height: 'calc(100% - 1.5rem)',
        }}
      >
        {children}
      </div>
    </WindowWrapper>
  )
}
