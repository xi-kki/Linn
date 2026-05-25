import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface WalletOption {
  id: string
  name: string
  icon: string
  chains: string[]
  type: 'evm' | 'solana' | 'sui'
}

const walletOptions: WalletOption[] = [
  { id: 'metamask', name: 'MetaMask', icon: '🦊', chains: ['Ethereum', 'Polygon', 'Arbitrum', 'Base', 'Optimism'], type: 'evm' },
  { id: 'rainbow', name: 'Rainbow', icon: '🌈', chains: ['Ethereum', 'Polygon', 'Arbitrum', 'Base'], type: 'evm' },
  { id: 'coinbase', name: 'Coinbase Wallet', icon: '🔵', chains: ['Ethereum', 'Polygon', 'Base'], type: 'evm' },
  { id: 'phantom', name: 'Phantom', icon: '👻', chains: ['Solana', 'Ethereum'], type: 'solana' },
  { id: 'backpack', name: 'Backpack', icon: '🎒', chains: ['Solana'], type: 'solana' },
  { id: 'sui-wallet', name: 'Sui Wallet', icon: '◉', chains: ['Sui'], type: 'sui' },
  { id: 'martian', name: 'Martian', icon: '🔴', chains: ['Sui', 'Aptos'], type: 'sui' },
]

interface Props {
  open: boolean
  onClose: () => void
}

export default function WalletConnectModal({ open, onClose }: Props) {
  const [viewOnly, setViewOnly] = useState(false)
  const [address, setAddress] = useState('')
  const [connecting, setConnecting] = useState<string | null>(null)
  const [connected, setConnected] = useState<string[]>([])

  const handleConnect = async (wallet: WalletOption) => {
    setConnecting(wallet.id)
    await new Promise((r) => setTimeout(r, 1200))
    setConnected((prev) => [...prev, wallet.id])
    setConnecting(null)
  }

  const handleViewOnly = () => {
    if (address.length >= 10) {
      setConnected((prev) => [...prev, `view-${address.slice(0, 6)}`])
      setAddress('')
      setViewOnly(false)
      onClose()
    }
  }

  const disconnect = (id: string) => {
    setConnected((prev) => prev.filter((w) => w !== id))
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[460px] z-50 max-h-[85vh]"
          >
            <div className="glass rounded-[30px] sm:rounded-[40px] p-6 sm:p-8 overflow-y-auto max-h-full">
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-wave-white">
                  {viewOnly ? 'View-Only Mode' : 'Connect Wallet'}
                </h2>
                <button onClick={onClose} className="text-muted hover:text-wave-white text-lg">✕</button>
              </div>

              {!viewOnly ? (
                <>
                  <div className="space-y-2 mb-5 sm:mb-6">
                    {walletOptions.map((w) => {
                      const isConnected = connected.includes(w.id)
                      const isConnecting = connecting === w.id
                      return (
                        <button
                          key={w.id}
                          onClick={() => !isConnected && handleConnect(w)}
                          className={`w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl transition-all ${
                            isConnected
                              ? 'bg-seafoam/10 border border-seafoam/20'
                              : 'bg-white/5 hover:bg-white/10 border border-white/5'
                          }`}
                        >
                          <span className="text-xl sm:text-2xl">{w.icon}</span>
                          <div className="flex-1 text-left min-w-0">
                            <p className="text-xs sm:text-sm font-medium text-wave-white">{w.name}</p>
                            <p className="text-[10px] sm:text-xs text-muted truncate">{w.chains.join(' · ')}</p>
                          </div>
                          {isConnecting ? (
                            <span className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-electric-teal border-t-transparent rounded-full animate-spin" />
                          ) : isConnected ? (
                            <button
                              onClick={(e) => { e.stopPropagation(); disconnect(w.id) }}
                              className="text-[10px] sm:text-xs text-coral hover:underline"
                            >
                              Disconnect
                            </button>
                          ) : (
                            <span className="text-[10px] sm:text-xs text-electric-teal font-medium">Connect</span>
                          )}
                        </button>
                      )
                    })}
                  </div>

                  <div className="relative my-5 sm:my-6">
                    <div className="border-t border-white/5" />
                    <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-deep-navy px-3 text-[10px] sm:text-xs text-muted">or</span>
                  </div>

                  <button
                    onClick={() => setViewOnly(true)}
                    className="w-full p-3 sm:p-4 rounded-2xl border border-dashed border-white/10 text-xs sm:text-sm text-muted hover:text-wave-white hover:border-electric-teal/30 transition-all"
                  >
                    👀 View only — paste any wallet address
                  </button>

                  {connected.length > 0 && (
                    <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-white/5">
                      <div className="flex flex-wrap gap-2">
                        {connected.map((id) => (
                          <span key={id} className="px-2 sm:px-3 py-1 rounded-full bg-seafoam/10 text-seafoam text-[10px] sm:text-xs flex items-center gap-1">
                            {id.startsWith('view-') ? `👀 ${id.replace('view-', '')}...` : walletOptions.find((w) => w.id === id)?.name || id}
                            <button onClick={() => disconnect(id)} className="ml-1 hover:text-coral">✕</button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div>
                  <button onClick={() => setViewOnly(false)} className="text-xs sm:text-sm text-muted hover:text-wave-white mb-4 flex items-center gap-1">
                    ← Back to wallets
                  </button>
                  <p className="text-[10px] sm:text-xs text-muted mb-3">Enter any wallet address to view its portfolio. No signing required.</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="0x... or any address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-deep-navy border border-white/10 rounded-2xl text-xs sm:text-sm text-wave-white placeholder-muted focus:outline-none focus:border-electric-teal/50"
                    />
                    <button
                      onClick={handleViewOnly}
                      disabled={address.length < 10}
                      className="px-4 sm:px-6 py-2.5 sm:py-3 bg-electric-teal text-deep-navy rounded-2xl text-xs sm:text-sm font-bold disabled:opacity-50"
                    >
                      View
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
