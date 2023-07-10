import { lazy, Suspense, useMemo } from 'react'

const Mint = lazy(() => import('@/pages/Mint'))
const Home = lazy(() => import('@/pages/Home'))

export default function DynamicWrapper({ identifier }: { identifier: string }) {
  const component = useMemo(() => {
    switch (identifier) {
      case 'mint':
        return <Mint />
      case 'home':
        return <Home />
      default:
        return <></>
    }
  }, [identifier])
  return <Suspense fallback={<></>}>{component}</Suspense>
}
