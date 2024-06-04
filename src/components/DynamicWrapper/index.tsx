import { lazy, Suspense, useMemo } from 'react'

const Launch = lazy(() => import('@/pages/Launch'))
const Home = lazy(() => import('@/pages/Home'))
const Components = lazy(() => import('@/pages/Components'))
const Uploader = lazy(() => import('@/pages/Uploader'))
const Manager = lazy(() => import('@/pages/Manage'))
const Auction = lazy(() => import('@/pages/Auction'))
const Mint = lazy(() => import('@/pages/Mint'))

export default function DynamicWrapper({ identifier }: { identifier: string }) {
  const component = useMemo(() => {
    switch (identifier) {
      case 'launch':
        return <Launch />
      case 'home':
        return <Home />
      case 'components':
        return <Components />
      case 'uploader':
        return <Uploader />
      case 'manager':
        return <Manager />
      case 'auction':
        return <Auction />
      case 'mint':
        return <Mint />
      default:
        return <></>
    }
  }, [identifier])
  return <Suspense fallback={<></>}>{component}</Suspense>
}
