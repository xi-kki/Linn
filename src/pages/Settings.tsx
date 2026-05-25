import { useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { useTheme } from '../context/ThemeContext'
import { usePrivacy } from '../context/PrivacyContext'
import { Gem } from 'lucide-react'

const currencies = ['USD', 'EUR', 'BTC', 'ETH']

export default function Settings() {
  const [currency, setCurrency] = useState('USD')
  const [notifications, setNotifications] = useState(true)
  const { theme, toggle: toggleTheme } = useTheme()
  const { privacy, toggle: togglePrivacy } = usePrivacy()

  const wallets = [
    { name: 'MetaMask', address: '0x8f3E...7b21', chains: ['Ethereum', 'Polygon', 'Arbitrum', 'Base'] },
    { name: 'Phantom', address: 'G5xP...3aBc', chains: ['Solana'] },
    { name: 'Sui Wallet', address: '0x9d2F...8eF4', chains: ['Sui'] },
  ]

  const Toggle = ({ on, onClick }: { on: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`w-12 h-6 rounded-full transition-colors relative ${on ? 'bg-electric-teal' : 'bg-white/10'}`}
    >
      <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${on ? 'translate-x-6' : 'translate-x-0.5'}`} />
    </button>
  )

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 sm:pt-24 pb-12 px-3 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl font-black text-wave-white mb-8 sm:mb-10"
          >
            Settings
          </motion.h1>

          <div className="space-y-4 sm:space-y-6">
            {/* Wallets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-[30px] sm:rounded-[40px] p-6 sm:p-8"
            >
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <h2 className="text-base sm:text-lg font-bold text-wave-white">Connected Wallets</h2>
                <button className="px-4 sm:px-5 py-2 bg-electric-teal text-deep-navy rounded-full text-xs sm:text-sm font-bold hover:bg-electric-teal/90">
                  + Add Wallet
                </button>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {wallets.map((w) => (
                  <div key={w.name} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-xl bg-white/10 flex items-center justify-center text-base sm:text-lg shrink-0">
                      {w.name === 'MetaMask' ? '🦊' : w.name === 'Phantom' ? '👻' : '◉'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-wave-white">{w.name}</p>
                      <p className="text-[10px] sm:text-xs text-muted font-mono truncate">{w.address}</p>
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {w.chains.map((c) => (
                          <span key={c} className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 text-muted">{c}</span>
                        ))}
                      </div>
                    </div>
                    <button className="text-[10px] sm:text-xs text-coral hover:underline shrink-0">Remove</button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-[30px] sm:rounded-[40px] p-6 sm:p-8"
            >
              <h2 className="text-base sm:text-lg font-bold text-wave-white mb-5 sm:mb-6">Preferences</h2>
              <div className="space-y-5 sm:space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-wave-white">Default Currency</p>
                    <p className="text-[10px] sm:text-xs text-muted">Display all values in</p>
                  </div>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="px-3 sm:px-4 py-2 bg-deep-navy border border-white/10 rounded-full text-xs sm:text-sm text-wave-white focus:outline-none focus:border-electric-teal/50 shrink-0"
                  >
                    {currencies.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="border-t border-white/5" />

                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-wave-white">Notifications</p>
                    <p className="text-[10px] sm:text-xs text-muted">Price alerts, large transactions, health warnings</p>
                  </div>
                  <Toggle on={notifications} onClick={() => setNotifications(!notifications)} />
                </div>

                <div className="border-t border-white/5" />

                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-wave-white">Privacy Mode</p>
                    <p className="text-[10px] sm:text-xs text-muted">Blur all balances when sharing your screen</p>
                  </div>
                  <Toggle on={privacy} onClick={togglePrivacy} />
                </div>

                <div className="border-t border-white/5" />

                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-wave-white">Theme</p>
                    <p className="text-[10px] sm:text-xs text-muted">{theme === 'dark' ? 'Dark mode — easy on the eyes' : 'Light mode — crisp and clean'}</p>
                  </div>
                  <Toggle on={theme === 'light'} onClick={toggleTheme} />
                </div>
              </div>
            </motion.div>

            {/* Account */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-[30px] sm:rounded-[40px] p-6 sm:p-8"
            >
              <h2 className="text-base sm:text-lg font-bold text-wave-white mb-5 sm:mb-6">Account</h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between gap-4 p-3 sm:p-4 rounded-2xl bg-white/5">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-xl bg-electric-teal/20 flex items-center justify-center text-electric-teal text-base sm:text-lg shrink-0">
                      <Gem className="w-5 h-5 text-electric-teal" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-wave-white">Free Plan</p>
                      <p className="text-[10px] sm:text-xs text-muted">2 wallets · Basic tracking</p>
                    </div>
                  </div>
                  <button className="px-4 sm:px-5 py-2 bg-gradient-to-r from-electric-teal to-seafoam text-deep-navy rounded-full text-xs sm:text-sm font-bold shrink-0">
                    Upgrade
                  </button>
                </div>
                <button className="w-full p-3 sm:p-4 rounded-2xl bg-coral/10 text-coral text-xs sm:text-sm font-medium hover:bg-coral/20 transition-colors">
                  Disconnect All Wallets
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
