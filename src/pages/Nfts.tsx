import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import AnimatedNumber from '../components/AnimatedNumber'
import { usePrivacy } from '../context/PrivacyContext'
import { nfts, chains } from '../data/mockData'
import type { ChainId } from '../data/mockData'

export default function Nfts() {
  const [chainFilter, setChainFilter] = useState<ChainId | 'all'>('all')
  const [selectedNft, setSelectedNft] = useState<string | null>(null)
  const { blurClass } = usePrivacy()

  const filtered = chainFilter === 'all' ? nfts : nfts.filter((n) => n.chain === chainFilter)
  const totalFloor = filtered.reduce((s, n) => s + n.floorPrice, 0)

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
              <h1 className="text-2xl sm:text-3xl font-black text-wave-white">NFT Gallery</h1>
              <p className="text-xs sm:text-sm text-muted mt-1">
                {filtered.length} NFTs ·{' '}
                <span className={`text-seafoam ${blurClass}`}>
                  <AnimatedNumber value={totalFloor} suffix=" ETH" decimals={1} /> total floor
                </span>
              </p>
            </div>
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
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <AnimatePresence>
              {filtered.map((nft, i) => {
                const chain = chains[nft.chain]
                return (
                  <motion.div
                    key={nft.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedNft(selectedNft === nft.id ? null : nft.id)}
                    className="glass rounded-[30px] sm:rounded-[40px] overflow-hidden cursor-pointer hover:border-electric-teal/20 transition-all duration-300"
                  >
                    <div className="aspect-square bg-deep-navy-light overflow-hidden">
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] sm:text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${chain.color}20`, color: chain.color }}>
                          {chain.name}
                        </span>
                        <span className="text-[10px] sm:text-xs text-muted truncate ml-2">{nft.collection}</span>
                      </div>
                      <h3 className="text-sm font-bold text-wave-white mb-2 sm:mb-3 truncate">{nft.name}</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] sm:text-xs text-muted">Floor Price</p>
                          <p className={`text-sm font-semibold text-wave-white ${blurClass}`}>
                            <AnimatedNumber value={nft.floorPrice} suffix=" ETH" decimals={1} />
                          </p>
                        </div>
                        {nft.lastPrice && (
                          <div className="text-right">
                            <p className="text-[10px] sm:text-xs text-muted">Last Sale</p>
                            <p className={`text-sm font-semibold text-wave-white ${blurClass}`}>
                              <AnimatedNumber value={nft.lastPrice} suffix=" ETH" decimals={1} />
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {selectedNft === nft.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="border-t border-white/5 p-4 sm:p-5 bg-white/5"
                      >
                        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm flex-wrap">
                          <span className="text-muted">Floor vs Last:</span>
                          {nft.lastPrice && (
                            <span className={nft.floorPrice >= nft.lastPrice ? 'text-seafoam' : 'text-coral'}>
                              {((nft.floorPrice - nft.lastPrice) / nft.lastPrice * 100).toFixed(1)}%{' '}
                              {nft.floorPrice >= nft.lastPrice ? '↑' : '↓'}
                            </span>
                          )}
                          <span className="text-muted">|</span>
                          <span className="text-muted">Collection: </span>
                          <span className="text-wave-white font-medium">{nft.collection}</span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <span className="text-4xl block mb-4">🖼️</span>
              <p className="text-muted text-lg">No NFTs found on this chain</p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
