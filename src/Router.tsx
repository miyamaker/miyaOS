import { Route, Routes } from 'react-router-dom'

import OperatingSystem from './pages/OperatingSystem'

export default function Router() {
  return (
    <Routes>
      <Route path="*" element={<OperatingSystem />} />
    </Routes>
  )
}
