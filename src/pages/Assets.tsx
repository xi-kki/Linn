import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import AnimatedNumber from '../components/AnimatedNumber'
import { usePrivacy } from '../context/PrivacyContext'
import { tokens, chains } from '../data/mockData'
import type { ChainId } from '../data/mockData'

type SortKey = 'name' | 'balance' | 'price' | 'valueUsd' | 'change24h'
type SortDir = 'asc' | 'desc'

export default function Assets() {
  const [sortKey, setSortKey] = useState<SortKey>('valueUsd')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [search, setSearch] = useState('')
  const [chainFilter, setChainFilter] = useState<ChainId | 'all'>('all')
  const [expanded, setExpanded] = useState<string | null>(null)
  const { blurClass } = usePrivacy()

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('desc') }
  }

  const filtered = tokens
    .filter((t) => chainFilter === 'all' || t.chain === chainFilter)
    .filter((t) => t.name.toLowerCase().includes(search.toLowerCase()) || t.symbol.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const mul = sortDir === 'asc' ? 1 : -1
      if (sortKey === 'name') return a.name.localeCompare(b.name) * mul
      return (a[sortKey] - b[sortKey]) * mul
    })

  const totalValue = filtered.reduce((s, t) => s + t.valueUsd, 0)

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return null
    return <span className="text-[10px] ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 sm:pt-24 pb-12 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8"
          >
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-wave-white">Assets</h1>
              <p className="text-xs sm:text-sm text-muted mt-1">
                {filtered.length} tokens · <span className={blurClass}><AnimatedNumber value={totalValue} prefix="$" /></span> total value
              </p>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search tokens..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 bg-deep-navy border border-white/10 rounded-full text-xs sm:text-sm text-wave-white placeholder-muted focus:outline-none focus:border-electric-teal/50 w-32 sm:w-48"
              />
              <select
                value={chainFilter}
                onChange={(e) => setChainFilter(e.target.value as ChainId | 'all')}
                className="px-3 sm:px-4 py-2.5 bg-deep-navy border border-white/10 rounded-full text-xs sm:text-sm text-wave-white focus:outline-none focus:border-electric-teal/50"
              >
                <option value="all">All Chains</option>
                {Object.entries(chains).map(([id, c]) => (
                  <option key={id} value={id}>{c.name}</option>
                ))}
              </select>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-[30px] sm:rounded-[40px] overflow-hidden"
          >
            {/* Table Header — hidden on mobile, show as sticky row */}
            <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_0.5fr] gap-4 p-5 border-b border-white/5 text-xs font-medium text-muted">
              {(['name', 'balance', 'price', 'valueUsd', 'change24h'] as SortKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => toggleSort(key)}
                  className={`flex items-center gap-1 text-left hover:text-wave-white transition-colors ${
                    sortKey === key ? 'text-electric-teal' : ''
                  }`}
                >
                  {key === 'name' && 'Token'}
                  {key === 'balance' && 'Balance'}
                  {key === 'price' && 'Price'}
                  {key === 'valueUsd' && 'Value'}
                  {key === 'change24h' && '24h'}
                  <SortIcon col={key} />
                </button>
              ))}
              <div />
            </div>

            {/* Table Rows */}
            <AnimatePresence>
              {filtered.map((token) => {
                const chain = chains[token.chain]
                const isExpanded = expanded === token.id
                return (
                  <motion.div
                    key={token.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <button
                      onClick={() => setExpanded(isExpanded ? null : token.id)}
                      className="w-full sm:grid sm:grid-cols-[2fr_1fr_1fr_1fr_1fr_0.5fr] sm:gap-4 p-3 sm:p-5 items-center hover:bg-white/5 transition-colors text-left"
                    >
                      {/* Mobile layout */}
                      <div className="flex items-center gap-3 sm:gap-3">
                        <div
                          className="w-9 h-9 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
                          style={{ backgroundColor: `${chain.color}20`, color: chain.color }}
                        >
                          {token.logo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-medium text-wave-white">{token.name}</p>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${chain.color}15`, color: chain.color }}>
                              {chain.name}
                            </span>
                          </div>
                          <div className="flex sm:hidden items-center gap-3 mt-1">
                            <span className="text-xs text-muted">{token.balance.toLocaleString()} {token.symbol}</span>
                            <span className={`text-xs font-medium ${token.change24h >= 0 ? 'text-seafoam' : 'text-coral'}`}>
                              {token.change24h >= 0 ? '+' : ''}{token.change24h}%
                            </span>
                          </div>
                        </div>
                        <div className="text-right sm:hidden">
                          <p className={`text-sm font-semibold text-wave-white ${blurClass}`}>
                            <AnimatedNumber value={token.valueUsd} prefix="$" />
                          </p>
                          <p className="text-[10px] text-muted">${token.price.toLocaleString()}</p>
                        </div>
                        <span className={`text-xs sm:hidden transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▾</span>
                      </div>

                      {/* Desktop values */}
                      <p className="hidden sm:block text-sm text-wave-white font-medium">{token.balance.toLocaleString()}</p>
                      <p className="hidden sm:block text-sm text-muted">${token.price.toLocaleString()}</p>
                      <p className={`hidden sm:block text-sm font-semibold text-wave-white ${blurClass}`}>
                        <AnimatedNumber value={token.valueUsd} prefix="$" />
                      </p>
                      <p className={`hidden sm:block text-sm font-medium ${token.change24h >= 0 ? 'text-seafoam' : 'text-coral'}`}>
                        {token.change24h >= 0 ? '+' : ''}{token.change24h}%
                      </p>
                      <div className="hidden sm:flex justify-end">
                        <span className={`text-xs transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▾</span>
                      </div>
                    </button>

                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-white/5"
                      >
                        <div className="p-3 sm:p-5 bg-white/5">
                          <div className="grid grid-cols-2 sm:flex items-center gap-3 sm:gap-6 text-xs sm:text-sm">
                            <div>
                              <span className="text-muted">Chain: </span>
                              <span className="text-wave-white font-medium">{chain.name}</span>
                            </div>
                            <div>
                              <span className="text-muted">Price 24h ago: </span>
                              <span className="text-wave-white font-medium">${(token.price * (1 - token.change24h / 100)).toFixed(2)}</span>
                            </div>
                            <div>
                              <span className="text-muted">Portfolio share: </span>
                              <span className="text-wave-white font-medium">
                                {totalValue > 0 ? ((token.valueUsd / totalValue) * 100).toFixed(1) : 0}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
