import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import WalletConnectModal from './components/WalletConnectModal'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Assets from './pages/Assets'
import Nfts from './pages/Nfts'
import History from './pages/History'
import Settings from './pages/Settings'
import Alerts from './pages/Alerts'

export default function App() {
  const location = useLocation()
  const [walletOpen, setWalletOpen] = useState(false)

  return (
    <div className="min-h-screen bg-deep-navy">
      <Navbar onConnectClick={() => setWalletOpen(true)} />
      <WalletConnectModal open={walletOpen} onClose={() => setWalletOpen(false)} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/nfts" element={<Nfts />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/alerts" element={<Alerts />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}
