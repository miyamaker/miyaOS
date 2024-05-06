import { lazy, Suspense, useMemo } from 'react'

const Mint = lazy(() => import('@/pages/Mint'))
const Home = lazy(() => import('@/pages/Home'))
const Components = lazy(() => import('@/pages/Components'))
const Uploader = lazy(() => import('@/pages/Uploader'))
const Manager = lazy(() => import('@/pages/Manage'))
const Auction = lazy(() => import('@/pages/Auction'))
const Explorer = lazy(() => import('@/pages/Explorer'))

export default function DynamicWrapper({ identifier }: { identifier: string }) {
  const component = useMemo(() => {
    switch (identifier) {
      case 'mint':
        return <Mint />
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
      case 'launchpad':
        return <Explorer />
      default:
        return <></>
    }
  }, [identifier])
  return <Suspense fallback={<></>}>{component}</Suspense>
}
