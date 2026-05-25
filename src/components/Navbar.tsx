import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Gem } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/assets', label: 'Assets' },
  { to: '/nfts', label: 'NFTs' },
  { to: '/history', label: 'History' },
  { to: '/alerts', label: 'Alerts' },
  { to: '/settings', label: 'Settings' },
]

interface Props {
  onConnectClick: () => void
}

export default function Navbar({ onConnectClick }: Props) {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Gem className="w-7 h-7 text-electric-teal" style={{ animation: 'float 6s ease-in-out infinite' }} />
            <span className="text-xl font-bold text-gradient">LINN</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive ? 'text-electric-teal' : 'text-muted hover:text-wave-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-electric-teal/10 rounded-full border border-electric-teal/20"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onConnectClick}
              className="hidden sm:block px-5 py-2 bg-electric-teal text-deep-navy rounded-full text-sm font-bold hover:bg-electric-teal/90 transition-all hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]"
            >
              Connect Wallet
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-muted hover:text-wave-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-white/5 p-4"
        >
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-medium ${
                location.pathname === link.to
                  ? 'text-electric-teal bg-electric-teal/10'
                  : 'text-muted hover:text-wave-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => { onConnectClick(); setMobileOpen(false) }}
            className="w-full mt-3 px-5 py-3 bg-electric-teal text-deep-navy rounded-full text-sm font-bold"
          >
            Connect Wallet
          </button>
        </motion.div>
      )}
    </nav>
  )
}
