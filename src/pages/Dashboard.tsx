import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import AnimatedNumber from '../components/AnimatedNumber'
import { SkeletonTable } from '../components/SkeletonLoader'
import { usePrivacy } from '../context/PrivacyContext'
import {
  totalNetWorth, change24h, change24hPercent, chainDistribution,
  portfolioHistory, transactions, chains, tokens
} from '../data/mockData'
import type { ChainId } from '../data/mockData'

const timeRanges = ['24h', '7d', '30d', '1y'] as const
type TimeRange = typeof timeRanges[number]

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d')
  const [selectedChain, setSelectedChain] = useState<ChainId | null>(null)
  const [loading, setLoading] = useState(true)
  const { blurClass } = usePrivacy()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  const filteredTxns = transactions.slice(0, 5)

  const bestAsset = [...tokens].sort((a, b) => b.change24h - a.change24h)[0]
  const worstAsset = [...tokens].sort((a, b) => a.change24h - b.change24h)[0]

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 sm:pt-24 pb-12 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto">

          {/* Net Worth Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-[30px] sm:rounded-[40px] p-6 sm:p-10 mb-4 sm:mb-6"
          >
            {loading ? (
              <div className="space-y-3 animate-pulse">
                <div className="h-4 bg-white/10 rounded-full w-24" />
                <div className="h-10 sm:h-12 bg-white/10 rounded-full w-48 sm:w-64" />
                <div className="h-5 bg-white/10 rounded-full w-36 sm:w-48" />
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                  <p className="text-muted text-xs sm:text-sm mb-1">Total Net Worth</p>
                  <h1 className={`text-4xl sm:text-5xl md:text-6xl font-black text-wave-white tracking-tight ${blurClass}`}>
                    <AnimatedNumber value={totalNetWorth} prefix="$" decimals={0} />
                  </h1>
                  <div className="flex items-center gap-2 sm:gap-3 mt-2">
                    <span className={`text-base sm:text-lg font-semibold ${change24h >= 0 ? 'text-seafoam' : 'text-coral'} ${blurClass}`}>
                      {change24h >= 0 ? '+' : ''}<AnimatedNumber value={change24h} prefix="$" /> USD
                    </span>
                    <span className={`text-xs sm:text-sm px-2 py-0.5 rounded-full ${change24hPercent >= 0 ? 'bg-seafoam/10 text-seafoam' : 'bg-coral/10 text-coral'}`}>
                      {change24hPercent >= 0 ? '+' : ''}{change24hPercent}%
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 sm:flex-none px-5 sm:px-6 py-2.5 sm:py-3 bg-electric-teal text-deep-navy rounded-full text-xs sm:text-sm font-bold hover:bg-electric-teal/90">
                    + Add Wallet
                  </button>
                  <button className="flex-1 sm:flex-none px-5 sm:px-6 py-2.5 sm:py-3 border border-white/10 text-muted rounded-full text-xs sm:text-sm font-medium hover:text-wave-white hover:border-white/20">
                    Refresh
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Chart + Chain Cards Row */}
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
            {/* Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 glass rounded-[30px] sm:rounded-[40px] p-4 sm:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
                <h2 className="text-base sm:text-lg font-bold text-wave-white">Portfolio Value</h2>
                <div className="flex gap-1 bg-deep-navy rounded-full p-1 self-start sm:self-auto overflow-x-auto">
                  {timeRanges.map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                        timeRange === range
                          ? 'bg-electric-teal text-deep-navy'
                          : 'text-muted hover:text-wave-white'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
              {loading ? (
                <div className="h-48 sm:h-64 bg-white/5 rounded-2xl animate-pulse" />
              ) : (
                <div className="h-48 sm:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={portfolioHistory}>
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00D4FF" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#00D4FF" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 10 }} />
                      <YAxis hide domain={['dataMin - 5000', 'dataMax + 5000']} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#111827',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '12px',
                          color: '#F0F8FF',
                          fontSize: '12px',
                        }}
                        formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Value']}
                      />
                      <Area type="monotone" dataKey="value" stroke="#00D4FF" strokeWidth={2} fill="url(#chartGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </motion.div>

            {/* Chain Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-[30px] sm:rounded-[40px] p-4 sm:p-8"
            >
              <h2 className="text-base sm:text-lg font-bold text-wave-white mb-4 sm:mb-6">Chain Breakdown</h2>
              {loading ? (
                <div className="space-y-3 animate-pulse">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-2 sm:p-3">
                      <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-xl bg-white/10" />
                      <div className="flex-1 space-y-1">
                        <div className="h-3 bg-white/10 rounded-full w-16 sm:w-20" />
                        <div className="h-2 bg-white/10 rounded-full w-10 sm:w-14" />
                      </div>
                      <div className="h-4 bg-white/10 rounded-full w-12 sm:w-16" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {chainDistribution.map((chain) => (
                    <motion.button
                      key={chain.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedChain(selectedChain === chain.id ? null : chain.id)}
                      className={`w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-2xl transition-all ${
                        selectedChain === chain.id
                          ? 'bg-electric-teal/10 border border-electric-teal/20'
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div
                        className="w-8 sm:w-10 h-8 sm:h-10 rounded-xl flex items-center justify-center text-base sm:text-lg font-bold"
                        style={{ backgroundColor: `${chain.color}20`, color: chain.color }}
                      >
                        {chain.logo}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-xs sm:text-sm font-medium text-wave-white">{chain.name}</p>
                        <p className="text-[10px] sm:text-xs text-muted">{chain.percentage}% of portfolio</p>
                      </div>
                      <div className={`text-right ${blurClass}`}>
                        <p className="text-xs sm:text-sm font-semibold text-wave-white">
                          <AnimatedNumber value={chain.balanceUsd} prefix="$" />
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Performance Analytics + Pie Chart Row */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
            {/* Best / Worst */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="glass rounded-[30px] sm:rounded-[40px] p-4 sm:p-8"
            >
              <h2 className="text-base sm:text-lg font-bold text-wave-white mb-4 sm:mb-6">Top Performers</h2>
              {loading ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-14 sm:h-16 bg-white/5 rounded-2xl" />
                  <div className="h-14 sm:h-16 bg-white/5 rounded-2xl" />
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  <div className="p-3 sm:p-4 rounded-2xl bg-seafoam/5 border border-seafoam/10">
                    <p className="text-[10px] sm:text-xs text-muted mb-1">Best performer</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs sm:text-sm font-bold text-seafoam">{bestAsset.name} ({bestAsset.symbol})</p>
                      <p className="text-xs sm:text-sm font-bold text-seafoam">+{bestAsset.change24h}%</p>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 rounded-2xl bg-coral/5 border border-coral/10">
                    <p className="text-[10px] sm:text-xs text-muted mb-1">Worst performer</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs sm:text-sm font-bold text-coral">{worstAsset.name} ({worstAsset.symbol})</p>
                      <p className="text-xs sm:text-sm font-bold text-coral">{worstAsset.change24h}%</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <p className="text-[10px] sm:text-xs text-muted mb-1">Benchmarks</p>
                    <div className="space-y-1">
                      {[
                        { name: 'ETH', value: '+2.4%', color: '#627EEA' },
                        { name: 'BTC', value: '+1.8%', color: '#F7931A' },
                        { name: 'SOL', value: '-1.2%', color: '#00D18C' },
                      ].map((b) => (
                        <div key={b.name} className="flex items-center justify-between text-[11px] sm:text-xs">
                          <span className="text-muted">{b.name}</span>
                          <span className={b.value.startsWith('+') ? 'text-seafoam' : 'text-coral'}>{b.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Pie Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-[30px] sm:rounded-[40px] p-4 sm:p-8"
            >
              <h2 className="text-base sm:text-lg font-bold text-wave-white mb-3 sm:mb-4">Chain Allocation</h2>
              {loading ? (
                <div className="h-40 sm:h-56 bg-white/5 rounded-full animate-pulse mx-auto w-40 sm:w-56" />
              ) : (
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                  <div className="w-36 h-36 sm:w-48 sm:h-48 mx-auto sm:mx-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chainDistribution}
                          dataKey="percentage"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={65}
                          paddingAngle={2}
                        >
                          {chainDistribution.map((entry) => (
                            <Cell key={entry.id} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#111827',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            color: '#F0F8FF',
                            fontSize: '12px',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 sm:block gap-1 sm:space-y-1.5">
                    {chainDistribution.map((c) => (
                      <div key={c.id} className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                        <span className="text-muted truncate">{c.name}</span>
                        <span className="text-wave-white font-medium">{c.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Asset Class Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="glass rounded-[30px] sm:rounded-[40px] p-4 sm:p-8"
            >
              <h2 className="text-base sm:text-lg font-bold text-wave-white mb-4 sm:mb-6">Asset Classes</h2>
              {loading ? (
                <div className="space-y-4 animate-pulse">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-12 bg-white/5 rounded-2xl" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-5">
                  {[
                    { name: 'Tokens', value: 98500, color: '#00D4FF', pct: 66 },
                    { name: 'NFTs', value: 15000, color: '#5c4ade', pct: 10 },
                    { name: 'DeFi Positions', value: 35750, color: '#00FFB3', pct: 24 },
                  ].map((cls) => (
                    <div key={cls.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs sm:text-sm text-wave-white font-medium">{cls.name}</span>
                        <span className={`text-xs sm:text-sm font-semibold text-wave-white ${blurClass}`}>
                          <AnimatedNumber value={cls.value} prefix="$" />
                        </span>
                      </div>
                      <div className="h-1.5 sm:h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${cls.pct}%`, backgroundColor: cls.color }}
                        />
                      </div>
                      <p className="text-[10px] sm:text-xs text-muted mt-0.5">{cls.pct}% of portfolio</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Recent Transactions + Quick Actions */}
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 glass rounded-[30px] sm:rounded-[40px] p-4 sm:p-8"
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-base sm:text-lg font-bold text-wave-white">Recent Activity</h2>
                <Link to="/history" className="text-xs sm:text-sm text-electric-teal hover:underline">View all</Link>
              </div>
              {loading ? (
                <SkeletonTable rows={5} />
              ) : (
                <div className="space-y-1 sm:space-y-2">
                  {filteredTxns.map((tx) => {
                    const chain = chains[tx.chain]
                    const isReceive = tx.type === 'receive'
                    const isSend = tx.type === 'send'
                    const icon = isReceive ? '↓' : isSend ? '↑' : '⇄'
                    const color = isReceive ? 'text-seafoam' : isSend ? 'text-coral' : 'text-electric-teal'
                    const timeAgo = Math.floor((Date.now() - tx.timestamp) / 3600000)
                    return (
                      <div key={tx.id} className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-2xl hover:bg-white/5 transition-colors">
                        <div className={`w-8 sm:w-10 h-8 sm:h-10 rounded-xl flex items-center justify-center text-base sm:text-lg ${color} bg-white/5 shrink-0`}>
                          {icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-medium text-wave-white truncate">
                            {tx.type === 'swap'
                              ? `Swapped ${tx.amountA} ${tx.tokenA} for ${tx.amountB} ${tx.tokenB}`
                              : `${isReceive ? 'Received' : 'Sent'} ${tx.amountA} ${tx.tokenA}`}
                          </p>
                          <p className="text-[10px] sm:text-xs text-muted">{chain.name} · {timeAgo}h ago</p>
                        </div>
                        <div className={`text-right shrink-0 ${blurClass}`}>
                          <p className={`text-xs sm:text-sm font-semibold ${isReceive ? 'text-seafoam' : isSend ? 'text-coral' : 'text-wave-white'}`}>
                            {isReceive ? '+' : isSend ? '-' : ''}<AnimatedNumber value={tx.usdValue} prefix="$" />
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="glass rounded-[30px] sm:rounded-[40px] p-4 sm:p-8"
            >
              <h2 className="text-base sm:text-lg font-bold text-wave-white mb-4 sm:mb-6">Quick Actions</h2>
              <div className="grid grid-cols-3 sm:grid-cols-1 gap-2 sm:gap-3">
                {[
                  { icon: '↑', label: 'Send', color: 'text-coral', desc: 'Transfer tokens' },
                  { icon: '↓', label: 'Receive', color: 'text-seafoam', desc: 'Get deposit address' },
                  { icon: '⇄', label: 'Swap', color: 'text-electric-teal', desc: 'Exchange tokens' },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5"
                  >
                    <div className={`w-8 sm:w-10 h-8 sm:h-10 rounded-xl flex items-center justify-center text-base sm:text-lg ${action.color} bg-white/5`}>
                      {action.icon}
                    </div>
                    <div className="text-center sm:text-left">
                      <span className="text-xs sm:text-sm font-medium text-wave-white block">{action.label}</span>
                      <span className="hidden sm:block text-[10px] text-muted">{action.desc}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/5">
                <h3 className="text-[10px] sm:text-xs font-medium text-muted mb-2 sm:mb-3">Connected Wallets</h3>
                <div className="space-y-1.5 sm:space-y-2">
                  {[
                    { name: 'MetaMask', chain: 'Ethereum', logo: '🦊' },
                    { name: 'Phantom', chain: 'Solana', logo: '👻' },
                    { name: 'Sui Wallet', chain: 'Sui', logo: '◉' },
                  ].map((w) => (
                    <div key={w.name} className="flex items-center gap-2 text-xs sm:text-sm">
                      <span>{w.logo}</span>
                      <span className="text-wave-white truncate">{w.name}</span>
                      <span className="text-muted text-[10px] sm:text-xs ml-auto">{w.chain}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
