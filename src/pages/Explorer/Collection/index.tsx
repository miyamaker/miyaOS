import styled from 'styled-components/macro'
import { useWindowSize } from 'usehooks-ts'

import CollectionDetail from '@/pages/Explorer/Collection/CollectionDetail'
import RecentMint from '@/pages/Explorer/RecentMint'
import type { Collection } from '@/pages/Explorer/types/collection'

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
}: {
  isConnected: boolean
  setPageSection: (section: string) => void
  selectedCollection: Collection
  setErrorMessage: (value: string) => void
  setErrorName: (value: string) => void
}) {
  const { width } = useWindowSize()
  return (
    <CollectionContainer>
      <CollectionDetail
        style={{ height: width > 640 ? '58%' : '65%' }}
        isConnected={isConnected}
        setPageSection={setPageSection}
        selectedCollection={selectedCollection}
        setErrorMessage={setErrorMessage}
        setErrorName={setErrorName}
      />
      <RecentMint
        style={{ height: width > 640 ? '42%' : '35%' }}
        setPageSection={setPageSection}
        selectedCollection={selectedCollection}
      />
    </CollectionContainer>
  )
}
