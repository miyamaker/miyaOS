// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components/macro'
import { useNetwork } from 'wagmi'

import SearchDirectory from '@/assets/search_directory.png'
import { ConnectedButton, LinkButton } from '@/components/Button'
import { Spinner } from '@/components/Spinner'
import { formatBytes } from '@/utils/formatBytes'
import { fundAndUpload } from '@/utils/fundAndUpload'
import getIrysToken from '@/utils/getIrysToken'

import ProgressBar from '../ProgressBar'

interface ProgressBarUploaderProps {
  showImageView?: boolean
  showReceiptView?: boolean
  request?: { requestFrom: string; timestamp: number; label?: string; result?: any }
  onRequest?: (value: string) => void
}

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  align-items: center;
  gap: 1rem;
`
const DashedBorderContainer = styled.div`
  border-width: 1px;
  border-style: dotted;
  background-color: rgba(238, 240, 246, 0.4);
  border-color: black;
  padding: 1rem;
  text-align: center;
  z-index: 50;
`

const FileRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`

const FileButtonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`
export const ProgressBarUploader = ({
  showImageView = true,
  showReceiptView = true,
  request,
  onRequest,
}: ProgressBarUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined)
  const [fileUrl, setFileUrl] = useState<string>('')
  const [progress, setProgress] = useState<number>(0)
  const [txProcessing, setTxProcessing] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const [receipt, setReceipt] = useState<string>('')
  const [uploadTxId, setUploadTxId] = useState<string | null>(null)

  const totalChunks = useRef<number>(0)

  const { chain } = useNetwork()

  const GATEWAY_BASE = (import.meta.env.VITE_IRYS_GATEWAY || 'https://gateway.irys.xyz/').endsWith('/')
    ? import.meta.env.VITE_IRYS_GATEWAY || 'https://gateway.irys.xyz/'
    : `${import.meta.env.VITE_IRYS_GATEWAY || 'https://gateway.irys.xyz/'}/`

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage('')
    setProgress(0)
    setSelectedFile(undefined)
    setFileUrl('')

    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0])
    }
  }

  useEffect(() => {
    if (request?.label) {
      setMessage(request.label)
    }
  }, [request])

  const handleUpload = async () => {
    setMessage('')
    // handle your file upload logic here
    if (!selectedFile) {
      setMessage('Please select a file first')
      return
    }

    setTxProcessing(true)
    // Reset the progress bar
    setProgress(0)

    // Get a reference to our Bundlr singleton
    const res = await fundAndUpload(
      selectedFile,
      [
        { name: 'Content-Type', value: selectedFile.type },
        { name: 'application-id', value: 'MiyaOS' },
      ],
      undefined,
      getIrysToken(chain?.id || 1),
      chain
    )

    setUploadTxId(res)
    setFileUrl(`${GATEWAY_BASE}${res}`)
    if (request && onRequest) {
      onRequest(res)
    }

    /*
    const irys = await getIrys()
    const uploader = irys.uploader.chunkedUploader
    // Change the batch size to 1 to make testing easier (default is 5)
    uploader.setBatchSize(1)
    // Change the chunk size to something small to make testing easier (default is 25MB)
    const chunkSize = 2000000
    uploader.setChunkSize(chunkSize)

    // Get a create a streamed reader
    const dataStream = fileReaderStream(selectedFile)
    // save a reference to the file size

    // Divide the total file size by the size of each chunk we'll upload
    if (selectedFile?.size < chunkSize) totalChunks.current = 1
    else {
      totalChunks.current = Math.floor((selectedFile?.size || 0) / chunkSize)
    }

    // Event callback chunkUpload: called for every chunk uploaded
    uploader.on('chunkUpload', (chunkInfo) => {
      console.log(chunkInfo)
      console.log(
        `Uploaded Chunk number ${chunkInfo.id}, offset of ${chunkInfo.offset}, size ${chunkInfo.size} Bytes, with a total of ${chunkInfo.totalUploaded} bytes uploaded.`
      )

      const chunkNumber = chunkInfo.id + 1
      // update the progress bar based on how much has been uploaded
      if (chunkNumber >= totalChunks.current) setProgress(100)
      else setProgress((chunkNumber / totalChunks.current) * 100)
    })

    // Event callback: called if an error happens
    uploader.on('chunkError', (e) => {
      console.error(`Error uploading chunk number ${e.id} - ${e.res.statusText}`)
    })

    // Event callback: called when file is fully uploaded
    uploader.on('done', (finishRes) => {
      console.log(`Upload completed with ID ${finishRes.id}`)
      // Set the progress bar to 100
      setProgress(100)
    })

    // Upload the file
    await uploader
      .uploadData(dataStream, {
        tags: [{ name: 'Content-Type', value: fileType }],
        upload: { getReceiptSignature: true },
      })
      .then((res) => {
        console.log(res)
        setUploadTxId(res.data.id)
        setFileUrl(`${GATEWAY_BASE}${res.data.id}`)
      })
      .catch((e) => {
        setMessage(`Upload error ${e.message}`)
        console.log('error on upload, ', e)
      })
      */
    setTxProcessing(false)
  }

  return (
    <FlexContainer>
      <TextContainer>
        <p>
          Infinite Uploader lets you upload your files <b>permanently</b> on Arweave through Irys Network
        </p>
        <p>
          Uploading on Arweave is very cheap! But remember to switch to a L2 chain like Arbitrum or Polygon for lower
          gas fees and faster transaction times
        </p>
      </TextContainer>
      <DashedBorderContainer
        className={``}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault()
          const droppedFiles = Array.from(event.dataTransfer.files)
          setSelectedFile(droppedFiles[0])
        }}
      >
        <p className="text-gray-400 mb-2">Drag and drop files here</p>
        <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
        <button
          onClick={() => {
            const input = document.querySelector('input[type="file"]') as HTMLInputElement
            if (input) {
              input.click()
            }
          }}
        >
          Browse Files
        </button>
      </DashedBorderContainer>

      {selectedFile && (
        <>
          <FileRow>
            <div key="1" className="flex items-center mb-2 text-background-contrast">
              <span className="mr-2">
                {selectedFile.name} {formatBytes(selectedFile.size)}
              </span>
            </div>
            <FileButtonRow>
              {fileUrl && (
                <>
                  {showImageView && (
                    <LinkButton target="_blank" href={fileUrl} style={{ gap: '0.5rem' }}>
                      <img src={SearchDirectory} alt="Search file" style={{ width: '16px', border: 'none' }} /> Check
                      upload
                    </LinkButton>
                  )}
                </>
              )}
            </FileButtonRow>
          </FileRow>
        </>
      )}
      <div style={{ marginTop: 'auto' }}>
        <ProgressBar width={progress} />
      </div>
      <ButtonContainer>
        {message && <div className="text-red-500" dangerouslySetInnerHTML={{ __html: message }} />}
        <ConnectedButton onClick={handleUpload} disabled={txProcessing}>
          {txProcessing ? (
            <>
              <Spinner /> Uploading
            </>
          ) : (
            'Upload'
          )}
        </ConnectedButton>
      </ButtonContainer>
    </FlexContainer>
  )
}

export default ProgressBarUploader

/* 
USAGE:
- Default (shows the preview): 
  <ProgressBarUploader />

- To hide the preview:
  <ProgressBarUploader showPreview={false} />

Note:
* If `showPreview` is not provided, the component defaults to showing the preview.
*/
