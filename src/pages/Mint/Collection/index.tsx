import { useState } from 'react'
import styled from 'styled-components/macro'
import { useWindowSize } from 'usehooks-ts'

import type { Token } from '@/pages/Mint'
import CollectionDetail from '@/pages/Mint/Collection/CollectionDetail'
import RecentMint from '@/pages/Mint/RecentMint'
import type { Collection } from '@/pages/Mint/types/collection'

const CollectionContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > * + * {
    margin-top: 0.5rem;
  }
`

export default function CollectionInfo({
  isConnected,
  setPageSection,
  selectedCollection,
  setErrorMessage,
  setErrorName,
  setSelectedToken,
}: {
  isConnected: boolean
  setPageSection: (section: string) => void
  selectedCollection: Collection
  setErrorMessage: (value: string) => void
  setErrorName: (value: string) => void
  setSelectedToken: (value: Token) => void
}) {
  const [toggleFetchRecentMint, setToggleFetchRecentMint] = useState<boolean>(false)

  const { width } = useWindowSize()
  return (
    <CollectionContainer>
      <CollectionDetail
        setToggleFetchRecentMint={setToggleFetchRecentMint}
        toggleFetchRecentMint={toggleFetchRecentMint}
        style={{ height: width > 640 ? '58%' : '65%' }}
        isConnected={isConnected}
        setPageSection={setPageSection}
        selectedCollection={selectedCollection}
        setErrorMessage={setErrorMessage}
        setErrorName={setErrorName}
      />
      <RecentMint
        toggleFetchRecentMint={toggleFetchRecentMint}
        style={{ height: width > 640 ? '42%' : '35%' }}
        setPageSection={setPageSection}
        selectedCollection={selectedCollection}
        setSelectedToken={setSelectedToken}
      />
    </CollectionContainer>
  )
}
