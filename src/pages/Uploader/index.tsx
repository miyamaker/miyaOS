import ProgressBarUploader from '@/components/ProgressUploader'
import TitleBar from '@/components/TitleBar'
import WindowWrapper from '@/components/WindowWrapper'
import Pages from '@/constants/pages'
import { useAppDispatch } from '@/store/hooks'
import { closeWindow, deleteUploadOrder, finalizeUploadOrder, minimizeWindow } from '@/store/windows/actions'
import { useFullscreen, useLastUploadRequest } from '@/store/windows/hooks'
import type { PageKey } from '@/store/windows/reducer'

const page = Pages.uploader
const pageId = page?.id as PageKey

export default function MintPage() {
  const uploadRequest = useLastUploadRequest()

  const [fullscreen, toggleFullscreen] = useFullscreen(pageId)
  const dispatch = useAppDispatch()
  const close = () => {
    if (uploadRequest) {
      dispatch(deleteUploadOrder({ requestFrom: uploadRequest.requestFrom }))
    }

    dispatch(closeWindow({ value: pageId }))
  }

  const minimize = () => dispatch(minimizeWindow({ value: pageId }))

  const finalize = (result: string) =>
    dispatch(finalizeUploadOrder({ requestFrom: uploadRequest?.requestFrom || '', result }))

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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0.5rem',
          gap: '1rem',
          height: 'calc(100% - 1.5rem)',
        }}
      >
        <ProgressBarUploader request={uploadRequest} onRequest={(value) => finalize(value)} />
      </div>
    </WindowWrapper>
  )
}
