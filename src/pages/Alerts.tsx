import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { alerts, alertIcons, alertColors } from '../data/alertsData'

export default function Alerts() {
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const [alertList, setAlertList] = useState(alerts)

  const filtered = filter === 'all' ? alertList : alertList.filter((a) => !a.read)
  const unreadCount = alertList.filter((a) => !a.read).length

  const markRead = (id: string) => {
    setAlertList((prev) => prev.map((a) => a.id === id ? { ...a, read: true } : a))
  }

  const dismiss = (id: string) => {
    setAlertList((prev) => prev.filter((a) => a.id !== id))
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 sm:pt-24 pb-12 px-3 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-6 sm:mb-8"
          >
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-wave-white">Alerts</h1>
              <p className="text-xs sm:text-sm text-muted mt-1">
                {unreadCount > 0
                  ? `${unreadCount} unread alert${unreadCount !== 1 ? 's' : ''}`
                  : 'All caught up ✅'}
              </p>
            </div>
            <div className="flex gap-1 bg-deep-navy rounded-full p-1">
              {(['all', 'unread'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-all capitalize ${
                    filter === f ? 'bg-electric-teal text-deep-navy' : 'text-muted hover:text-wave-white'
                  }`}
                >
                  {f === 'all' ? 'All' : `Unread (${unreadCount})`}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-[30px] sm:rounded-[40px] overflow-hidden"
          >
            {filtered.length === 0 ? (
              <div className="text-center py-16 sm:py-20">
                <span className="text-4xl block mb-3">✅</span>
                <p className="text-muted text-sm sm:text-base">No alerts to show</p>
              </div>
            ) : (
              <AnimatePresence>
                {filtered.map((alert) => {
                  const timeAgo = Math.floor((Date.now() - alert.timestamp) / 3600000)
                  return (
                    <motion.div
                      key={alert.id}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`flex items-start gap-3 sm:gap-4 p-4 sm:p-5 transition-colors ${
                        !alert.read ? 'bg-electric-teal/[0.03] border-l-2 border-electric-teal' : 'hover:bg-white/5'
                      }`}
                    >
                      <div className={`w-8 sm:w-10 h-8 sm:h-10 rounded-xl flex items-center justify-center text-base sm:text-lg bg-white/5 shrink-0 ${alertColors[alert.type]}`}>
                        {alertIcons[alert.type]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-wave-white">{alert.title}</p>
                        <p className="text-[10px] sm:text-xs text-muted mt-0.5">{alert.description}</p>
                        <div className="flex items-center gap-2 mt-1.5 text-[10px] sm:text-[11px] text-muted">
                          <span>{timeAgo}h ago</span>
                          {!alert.read && (
                            <span className="w-1.5 h-1.5 rounded-full bg-electric-teal" />
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 sm:gap-2 shrink-0">
                        {!alert.read && (
                          <button
                            onClick={() => markRead(alert.id)}
                            className="text-[10px] sm:text-xs text-electric-teal hover:underline"
                          >
                            Read
                          </button>
                        )}
                        <button
                          onClick={() => dismiss(alert.id)}
                          className="text-[10px] sm:text-xs text-muted hover:text-coral"
                        >
                          ✕
                        </button>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            )}
          </motion.div>

          {/* Create Alert Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-[30px] sm:rounded-[40px] p-6 sm:p-8 mt-4 sm:mt-6"
          >
            <h2 className="text-base sm:text-lg font-bold text-wave-white mb-4">Create Custom Alert</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <select className="w-full sm:w-auto px-3 sm:px-4 py-2.5 sm:py-3 bg-deep-navy border border-white/10 rounded-2xl text-xs sm:text-sm text-wave-white focus:outline-none focus:border-electric-teal/50">
                <option>Price alert</option>
                <option>Whale movement</option>
                <option>Gas fee</option>
                <option>Position health</option>
              </select>
              <input
                type="text"
                placeholder="Token (e.g. ETH)"
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-deep-navy border border-white/10 rounded-2xl text-xs sm:text-sm text-wave-white placeholder-muted focus:outline-none focus:border-electric-teal/50"
              />
              <button className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-electric-teal text-deep-navy rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap">
                + Create Alert
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
