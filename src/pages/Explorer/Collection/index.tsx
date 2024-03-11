import styled from 'styled-components/macro'
import { useWindowSize } from 'usehooks-ts'

import CollectionDetail from '@/pages/Explorer/Collection/CollectionDetail'
import RecentMint from '@/pages/Explorer/RecentMint'

const CollectionContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Collection({ setPageSection }: { setPageSection: (section: string) => void }) {
  const { width } = useWindowSize()
  return (
    <CollectionContainer>
      <CollectionDetail style={{ height: width > 640 ? '55%' : '65%' }} setPageSection={setPageSection} />
      <RecentMint style={{ height: width > 640 ? '45%' : '35%' }} setPageSection={setPageSection} />
    </CollectionContainer>
  )
}
