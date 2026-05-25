import { useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { transactions, chains } from '../data/mockData'
import type { ChainId } from '../data/mockData'

type FilterType = 'all' | 'send' | 'receive' | 'swap'

export default function History() {
  const [chainFilter, setChainFilter] = useState<ChainId | 'all'>('all')
  const [typeFilter, setTypeFilter] = useState<FilterType>('all')
  const [dateRange, setDateRange] = useState<'all' | '7d' | '30d' | '90d'>('all')

  const now = Date.now()
  const dateCutoff = dateRange === 'all' ? 0
    : dateRange === '7d' ? now - 7 * 86400000
    : dateRange === '30d' ? now - 30 * 86400000
    : now - 90 * 86400000

  const filtered = transactions
    .filter((t) => chainFilter === 'all' || t.chain === chainFilter)
    .filter((t) => typeFilter === 'all' || t.type === typeFilter)
    .filter((t) => t.timestamp >= dateCutoff)

  const exportCsv = () => {
    const header = 'Type,Chain,Token,Amount,USD Value,Date,Status\n'
    const rows = filtered.map((t) =>
      `${t.type},${chains[t.chain].name},${t.tokenA}${t.tokenB ? '/' + t.tokenB : ''},${t.amountA},${t.usdValue},${new Date(t.timestamp).toISOString()},${t.status}`
    ).join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'linn-transactions.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const filterBtns = (opts: { label: string; value: string }[], current: string, set: (v: any) => void) => (
    <div className="flex gap-1 bg-deep-navy rounded-full p-1 overflow-x-auto">
      {opts.map((o) => (
        <button
          key={o.value}
          onClick={() => set(o.value)}
          className={`px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-all whitespace-nowrap ${
            current === o.value
              ? 'bg-electric-teal text-deep-navy'
              : 'text-muted hover:text-wave-white'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )

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
              <h1 className="text-2xl sm:text-3xl font-black text-wave-white">Transaction History</h1>
              <p className="text-xs sm:text-sm text-muted mt-1">
                {filtered.length} transaction{filtered.length !== 1 ? 's' : ''}
                {dateRange !== 'all' && ` in the last ${dateRange}`}
              </p>
            </div>
            <button
              onClick={exportCsv}
              className="self-start px-4 sm:px-5 py-2 bg-white/5 border border-white/10 text-muted rounded-full text-xs sm:text-sm font-medium hover:text-wave-white hover:border-white/20 transition-all"
            >
              Export CSV ↗
            </button>
          </motion.div>

          {/* Filters row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6"
          >
            {filterBtns([
              { label: 'All Time', value: 'all' },
              { label: '7 Days', value: '7d' },
              { label: '30 Days', value: '30d' },
              { label: '90 Days', value: '90d' },
            ], dateRange, setDateRange)}

            {filterBtns([
              { label: 'All Types', value: 'all' },
              { label: 'Received', value: 'receive' },
              { label: 'Sent', value: 'send' },
              { label: 'Swaps', value: 'swap' },
            ], typeFilter, setTypeFilter)}

            <select
              value={chainFilter}
              onChange={(e) => setChainFilter(e.target.value as ChainId | 'all')}
              className="px-3 sm:px-4 py-2 bg-deep-navy border border-white/10 rounded-full text-xs sm:text-sm text-wave-white focus:outline-none focus:border-electric-teal/50"
            >
              <option value="all">All Chains</option>
              {Object.entries(chains).map(([id, c]) => (
                <option key={id} value={id}>{c.name}</option>
              ))}
            </select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-[30px] sm:rounded-[40px] overflow-hidden"
          >
            {filtered.length === 0 ? (
              <div className="text-center py-16 sm:py-24">
                <span className="text-4xl block mb-3">📭</span>
                <p className="text-muted text-base">No transactions match your filters</p>
                <button
                  onClick={() => { setChainFilter('all'); setTypeFilter('all'); setDateRange('all') }}
                  className="mt-3 text-xs text-electric-teal hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {filtered.map((tx) => {
                  const chain = chains[tx.chain]
                  const isReceive = tx.type === 'receive'
                  const isSend = tx.type === 'send'
                  const icon = isReceive ? '↓' : isSend ? '↑' : '⇄'
                  const color = isReceive ? 'seafoam' : isSend ? 'coral' : 'electric-teal'

                  return (
                    <div key={tx.id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-5 hover:bg-white/5 transition-colors">
                      <div className={`w-8 sm:w-10 h-8 sm:h-10 rounded-xl flex items-center justify-center text-base sm:text-lg bg-white/5 shrink-0`}
                        style={{ color: `var(--color-${color})` }}
                      >
                        {icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-wave-white">
                          {tx.type === 'swap'
                            ? `Swapped ${tx.amountA} ${tx.tokenA} → ${tx.amountB} ${tx.tokenB}`
                            : `${isReceive ? 'Received' : 'Sent'} ${tx.amountA} ${tx.tokenA}`}
                        </p>
                        <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted mt-0.5 flex-wrap">
                          <span>{chain.name}</span>
                          <span>·</span>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] ${
                            tx.status === 'confirmed' ? 'bg-seafoam/10 text-seafoam' :
                            tx.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                            'bg-coral/10 text-coral'
                          }`}>
                            {tx.status}
                          </span>
                          <span>·</span>
                          <span>{new Date(tx.timestamp).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className={`text-xs sm:text-sm font-semibold ${isReceive ? 'text-seafoam' : isSend ? 'text-coral' : 'text-wave-white'}`}>
                          {isReceive ? '+' : isSend ? '-' : ''}${tx.usdValue.toLocaleString()}
                        </p>
                        {tx.type === 'swap' && tx.amountB && (
                          <p className="text-[9px] sm:text-xs text-muted">@ {tx.amountB} {tx.tokenB}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
